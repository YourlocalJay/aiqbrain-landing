
import { vaultHandler } from './vault';

// Known parking / placeholder hosts we should never redirect to
const BAD_HOSTS = new Set([
  'tracking.com',
  'www.tracking.com',
  'parkingcrew.net',
  'sedoparking.com',
  'parklogic.com',
  'dnparking.com',
]);

function uuid() {
  return (typeof crypto?.randomUUID === 'function')
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
}

function detectDevice(request) {
  const cfType = request.cf?.deviceType || '';
  const ua = request.headers.get('user-agent') || '';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  // Fallback: map Cloudflare type
  if (/mobile/i.test(cfType)) return 'Android';
  return 'Desktop';
}

function normalizeArray(val) {
  if (!val && val !== 0) return [];
  if (Array.isArray(val)) return val;
  return [val];
}

function isActiveOffer(o) {
  if (!o || !o.url) return false;
  if (o.active === false) return false;
  try {
    const u = new URL(o.url);
    if (BAD_HOSTS.has(u.hostname)) return false;
  } catch { return false; }
  return true;
}

function geoMatches(o, geo) {
  const geos = normalizeArray(o.geo).map(x => String(x).toUpperCase());
  return geos.includes('ALL') || geos.includes(String(geo).toUpperCase());
}

function deviceMatches(o, device) {
  const devs = normalizeArray(o.device).map(x => String(x).toLowerCase());
  const d = String(device).toLowerCase();
  return devs.length === 0 || devs.includes('all') || devs.includes(d);
}

function pickOffer(offers, geo, device) {
  const candidates = offers.filter(isActiveOffer);
  // 1) exact GEO + device
  let pool = candidates.filter(o => geoMatches(o, geo) && deviceMatches(o, device));
  if (pool.length === 0) {
    // 2) GEO match, any device
    pool = candidates.filter(o => geoMatches(o, geo));
  }
  if (pool.length === 0) {
    // 3) any active
    pool = candidates;
  }
  if (pool.length === 0) return null;
  // Highest payout wins if present
  pool.sort((a, b) => (Number(b.payout || 0) - Number(a.payout || 0)));
  return pool[0];
}

function appendSubs(baseUrl, params) {
  try {
    const u = new URL(baseUrl);
    // Map UTMs to MyLead-style ml_sub1..5
    const mapping = {
      ml_sub1: params.utm_source || '',
      ml_sub2: params.utm_medium || '',
      ml_sub3: params.utm_campaign || '',
      ml_sub4: params.geo || '',
      ml_sub5: params.device || ''
    };
    // Always add ml_* (harmless for other networks)
    for (const [k, v] of Object.entries(mapping)) {
      if (v) u.searchParams.set(k, v);
    }
    // Also forward utm_* if present (for analytics parity)
    for (const k of ['utm_source','utm_medium','utm_campaign','utm_content']) {
      const v = params[k];
      if (v) u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return baseUrl;
  }
}

function isLikelyBad(urlStr) {
  try {
    const u = new URL(urlStr);
    return BAD_HOSTS.has(u.hostname);
  } catch { return true; }
}

export async function offersHandler(request, env, ctx) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const cfScore = request.cf?.botManagement?.score;
  const botPattern = /bot|crawler|spider|facebook|twitter|linkedin|headless|preview|curl|wget/i;

  // Bot clamp: UA/referrer or low score → 404
  const looksLikeBot = botPattern.test(ua) || botPattern.test(referer) || (typeof cfScore === 'number' && cfScore < 30);
  if (looksLikeBot) {
    try {
      if (env.BOT_LOG_KV) {
        ctx.waitUntil(env.BOT_LOG_KV.put(`bot:${Date.now()}:${uuid()}`, JSON.stringify({
          path: url.pathname,
          ip: request.headers.get('cf-connecting-ip') || '',
          ua,
          referer,
          score: cfScore ?? null,
          country: request.cf?.country || request.headers.get('cf-ipcountry') || 'unknown',
          ts: new Date().toISOString()
        }), { expirationTtl: 1209600 }));
      }
    } catch {}
    return new Response('Not found', { status: 404, headers: { 'x-robots-tag': 'noindex, nofollow' } });
  }

  const device = detectDevice(request); // 'Android' | 'iOS' | 'Desktop'
  const geo = request.cf?.country || request.headers.get('cf-ipcountry') || 'US';

  // Load offers JSON from public path
  let offers = [];
  try {
    const resp = await fetch(new URL(env.OFFERS_PATH || '/data/cloudflare_offers.json', request.url));
    if (resp.ok) offers = await resp.json();
  } catch (err) {
    // fallthrough to no offers
  }

  const chosen = pickOffer(offers || [], geo, device);

  // Build final URL with subs/utms
  const utms = {
    utm_source: url.searchParams.get('utm_source') || '',
    utm_medium: url.searchParams.get('utm_medium') || '',
    utm_campaign: url.searchParams.get('utm_campaign') || '',
    utm_content: url.searchParams.get('utm_content') || '',
    geo,
    device
  };

  const finalUrl = chosen ? appendSubs(chosen.url, utms) : '';
  const qs = url.searchParams;
  const debug = qs.get('debug') === '1';

  const allowedHosts = (env.ALLOWED_HOSTS || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  let hostAllowed = true;
  try {
    const dest = new URL(finalUrl);
    const host = dest.hostname.toLowerCase();
    hostAllowed = allowedHosts.length === 0 || allowedHosts.some(h => host === h || host.endsWith('.' + h));
    if (!hostAllowed) {
      if (debug) {
        return new Response(JSON.stringify({
          error: 'destination host is not allowed',
          finalUrl,
          allowedHosts
        }, null, 2), { status: 200, headers: { 'content-type': 'application/json', 'x-robots-tag': 'noindex, nofollow' } });
      }
      return new Response('Blocked: destination host is not allowed.', { status: 404, headers: { 'x-robots-tag': 'noindex, nofollow' } });
    }
  } catch (e) {
    // fall through; existing error handling will catch bad URLs
  }

  if (debug) {
    const body = `<!doctype html><html><head><meta charset="utf-8"/>
<meta name="robots" content="noindex,nofollow"/>
<title>/sv debug</title>
<style>body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0e12;color:#eaecef;padding:24px}pre{background:#0f1318;padding:12px;border-radius:8px;overflow:auto}</style>
</head><body>
<h1>/sv debug</h1>
<p><strong>GEO:</strong> ${geo} &nbsp; <strong>Device:</strong> ${device}</p>
<p><strong>Chosen offer:</strong> ${chosen ? chosen.name : '<em>none</em>'}</p>
<p><strong>Final URL:</strong> ${finalUrl ? `<a href="${finalUrl}">${finalUrl}</a>` : '<em>n/a</em>'}</p>
<h3>UTMs</h3>
<pre>${JSON.stringify(utms, null, 2)}</pre>
<h3>Allowed Hosts</h3>
<pre>${JSON.stringify(allowedHosts, null, 2)}</pre>
<p><strong>Host allowed:</strong> ${hostAllowed}</p>
<h3>Raw offer</h3>
<pre>${JSON.stringify(chosen, null, 2)}</pre>
${finalUrl && hostAllowed && !isLikelyBad(finalUrl) ? `<p><a href="${finalUrl}">Proceed to offer →</a></p>` : '<p><strong>Blocked</strong>: destination host is not allowed.</p>'}
</body></html>`;
    return new Response(body, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' } });
  }

  // Log click decision (best-effort)
  try {
    if (env.BOT_LOG_KV) {
      ctx.waitUntil(env.BOT_LOG_KV.put(`clk:${Date.now()}:${uuid()}`, JSON.stringify({
        offer: chosen ? chosen.name : null,
        url: finalUrl || null,
        geo, device,
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_content: utms.utm_content,
        ts: new Date().toISOString()
      }), { expirationTtl: 1209600 }));
    }
  } catch {}

  // Redirect only if we have a sane destination
  if (chosen && finalUrl && !isLikelyBad(finalUrl)) {
    return new Response(null, { status: 302, headers: { 'Location': finalUrl, 'x-robots-tag': 'noindex, nofollow' } });
  }

  // No valid offer → fall back to vault
  return vaultHandler(request, env, ctx);
}
