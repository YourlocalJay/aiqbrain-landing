
import { accessPage } from './handlers/access';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const ua = request.headers.get('user-agent') || '';
    const host = url.hostname.toLowerCase();

    // --- Host allowlist ---
    const allowedHosts = (env.ALLOWED_HOSTS || '').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
    // During local dev, disable host check
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      allowedHosts.length = 0;
    }
    if (allowedHosts.length && !allowedHosts.includes(host)) {
      return new Response('Not found', { status: 404 });
    }

    // --- CF info + dev overrides ---
    const cf = request.cf || {};
    const geo = ((url.searchParams.get('geo') || cf.country || 'ALL') + '').toUpperCase();
    const asn = cf.asn || 0;
    const deviceParam = url.searchParams.get('device') || url.searchParams.get('d');
    const device = (deviceParam || deviceFromUA(ua));

    // --- Basic + ASN-based bot filtering ---
    const uaBot = /googlebot|bingbot|ahrefs|semrush|curl|headless|slurp|duckduck|baiduspider|yandex|facebookexternalhit|twitterbot|slackbot|discordbot|linkedinbot|redditbot/i.test(ua);
    const asnBot = inAsnDenylist(asn, env.BOT_ASN_DENYLIST);
    const isBot = uaBot || asnBot;

    // --- UTM & tracking context ---
    const utm = {
      utm_source: url.searchParams.get('utm_source') || '',
      utm_medium: url.searchParams.get('utm_medium') || '',
      utm_campaign: url.searchParams.get('utm_campaign') || '',
      utm_term: url.searchParams.get('utm_term') || '',
      utm_content: url.searchParams.get('utm_content') || ''
    };
    const persona = sanitize(utm.utm_campaign);
    const subreddit = sanitize(utm.utm_content);
    const ts = Date.now();
    const subid = buildSubid({ persona, subreddit, geo, device, ts });

    // --- Routes ---
    if (pathname === '/' || pathname === '/vault') {
      // Serve stealth HTML (inject webhook URL for client-side actions if needed)
      const assetRes = await fetch(new URL('/vault/index.html', request.url));
      let html = await assetRes.text();
      const inject = `<script>window.MAKE_WEBHOOK_URL=${JSON.stringify(env.MAKE_WEBHOOK_URL || '')};</script>`;
      html = html.replace('</body>', `${inject}</body>`);
      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'x-robots-tag': 'noindex, nofollow'
        }
      });
    }

    if (pathname === '/access') {
      return accessPage(url, env);
    }

    if (pathname === '/test') {
      const data = { geo, device, ua, utm, subid, asn };
      return new Response(JSON.stringify(data, null, 2), {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'no-store'
        }
      });
    }

    if (pathname === '/sv') {
      // For bots, show Claude-style human-check page (no redirect)
      if (isBot) {
        const payload = basePayload({ path: pathname, geo, device, ua, utm, subid, host });
        ctx.waitUntil(logAll(payload, env));
        return new Response(renderClaudeStyleFallback({ geo, device }), {
          status: 200,
          headers: htmlHeaders()
        });
      }

      // 1) Load dynamic offers JSON (fallback to env vars if missing)
      let offers = [];
      try {
        const offersPath = env.OFFERS_PATH || '/data/cloudflare_offers.json';
        const offersRes = await fetch(new URL(offersPath, request.url));
        if (offersRes.ok) {
          offers = await offersRes.json();
        }
      } catch (_) { /* ignore, fallback below */ }

      // 2) Pick best offer
      let offer;
      if (Array.isArray(offers) && offers.length) {
        offer = pickOffer(offers, geo, device);
      }
      if (!offer) {
        offer = pickEnvOffer(geo, device, env);
      }
      if (!offer) {
        return new Response('No offer', { status: 404 });
      }

      // 3) Build redirect target with tracking parameters
      const target = appendTrackingParams(offer.url || offer, {
        subid,
        ...utm,
        geo,
        device
      });

      // 4) Async logs (KV + Webhook with retry)
      const payload = basePayload({ path: pathname, geo, device, ua, utm, subid, host, offer: offer.name || 'ENV_OFFER', target });
      ctx.waitUntil(logAll(payload, env));

      // 5) Redirect
      return Response.redirect(target, 302);
    }

    return new Response('Not found', { status: 404 });
  }
};

// --- Helpers ---

function deviceFromUA(ua = '') {
  const u = ua.toLowerCase();
  if (/iphone|ipad|ipod|ios/.test(u)) return 'iOS';
  if (/android/.test(u) && /mobile/.test(u)) return 'Android';
  return 'Desktop';
}

function inAsnDenylist(asn, csv) {
  if (!asn || !csv) return false;
  const deny = csv.split(',').map(s => parseInt(s.trim(), 10)).filter(Boolean);
  return deny.includes(Number(asn));
}

function sanitize(s) {
  return (s || '').replace(/[^\w\-.]/g, '_').slice(0, 64);
}

function buildSubid({ persona, subreddit, geo, device, ts }) {
  const parts = [
    persona || 'anon',
    subreddit || 'nosub',
    (geo || 'ALL'),
    (device || 'Desktop'),
    Math.floor((ts || Date.now()) / 1000)
  ];
  return parts.join('-');
}

function basePayload({ path, geo, device, ua, utm, subid, host, offer, target }) {
  return {
    ts: new Date().toISOString(),
    path,
    geo,
    device,
    ua,
    utm,
    persona: sanitize(utm?.utm_campaign),
    subreddit: sanitize(utm?.utm_content),
    subid,
    host,
    offer,
    target
  };
}

// Choose offer from JSON catalog
function pickOffer(offers, geo, device) {
  const fits = (o) => {
    const og = (o.geo || []);
    const mg = Array.isArray(og) ? og : String(og || '').split(',').map(s=>s.trim().toUpperCase());
    const okGeo = mg.includes(geo) || mg.includes('ALL');
    const okDev = (o.device === 'All') || (o.device === device);
    return okGeo && okDev;
  };
  const mobile = device !== 'Desktop';
  const order = mobile
    ? ['mobile-app', 'ai-tool', 'vpn', 'survey', 'download']
    : ['ai-tool', 'vpn', 'mobile-app', 'survey', 'download'];

  for (const t of order) {
    const candidates = offers
      .filter(o => fits(o) && o.type === t)
      .sort((a, b) => (b.priority - a.priority) || (b.payout - a.payout));
    if (candidates.length) return candidates[0];
  }
  const any = offers
    .filter(o => fits(o))
    .sort((a, b) => (b.priority - a.priority) || (b.payout - a.payout));
  return any[0];
}

// Fallback to environment-mapped offers
function pickEnvOffer(geo, device, env) {
  switch ((geo || '').toUpperCase()) {
    case 'US':
      return device === 'Android' ? { name: 'US_ANDROID', url: env.US_ANDROID }
           : device === 'iOS'     ? { name: 'US_IOS',     url: env.US_IOS }
           : { name: 'FALLBACK_OFFER', url: env.FALLBACK_OFFER };
    case 'UK':
      return device === 'Android' ? { name: 'UK_ANDROID', url: env.UK_ANDROID }
           : { name: 'FALLBACK_OFFER', url: env.FALLBACK_OFFER };
    case 'CA':
    case 'CAN':
      return device === 'Android' ? { name: 'CAN_ANDROID', url: env.CAN_ANDROID }
           : device === 'iOS'     ? { name: 'CAN_IOS',     url: env.CAN_IOS }
           : { name: 'FALLBACK_OFFER', url: env.FALLBACK_OFFER };
    default:
      return { name: 'FALLBACK_OFFER', url: env.FALLBACK_OFFER };
  }
}

// Append both subid + UTM passthrough + MyLead sub slots
function appendTrackingParams(url, ctx) {
  const u = new URL(url);
  const q = u.searchParams;

  // Core subid + UTMs
  if (ctx.subid) q.set('subid', ctx.subid);
  if (ctx.utm_source) q.set('utm_source', ctx.utm_source);
  if (ctx.utm_medium) q.set('utm_medium', ctx.utm_medium);
  if (ctx.utm_campaign) q.set('utm_campaign', ctx.utm_campaign);
  if (ctx.utm_term) q.set('utm_term', ctx.utm_term);
  if (ctx.utm_content) q.set('utm_content', ctx.utm_content);

  // MyLead-style sub slots (kept for network flexibility)
  q.set('ml_sub1', ctx.utm_source || 'reddit');
  q.set('ml_sub2', ctx.utm_medium || 'organic');
  q.set('ml_sub3', ctx.utm_campaign || 'banned_prompts');
  q.set('ml_sub4', ctx.geo || 'ALL');
  q.set('ml_sub5', ctx.device || 'Desktop');

  u.search = q.toString();
  return u.toString();
}

// Logging: KV + webhook (non-blocking with retry)
async function logAll(payload, env) {
  try {
    if (env.BOT_LOG_KV) {
      await env.BOT_LOG_KV.put(`clk:${payload.subid}:${Date.now()}`, JSON.stringify(payload), {
        expirationTtl: 60 * 60 * 24 * 14
      });
    }
  } catch (_) {}

  try {
    if (env.MAKE_WEBHOOK_URL) {
      await postWithRetry(env.MAKE_WEBHOOK_URL, payload, 3);
    }
  } catch (_) {}
}

async function postWithRetry(url, body, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) return;
      lastErr = new Error(`Webhook ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise(r => setTimeout(r, 150 * (i + 1)));
  }
  throw lastErr;
}

// Claude-style fallback HTML for bots
function renderClaudeStyleFallback({ geo, device }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AIQBrain • Claude Prompt Vault</title>
<style>
  :root{--bg:#0a0e12;--fg:#e6e6e6;--muted:#9aa0a6;--acc:#ff7b72;}
  html,body{height:100%} body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 Inter,ui-sans-serif,system-ui}
  .wrap{max-width:760px;margin:0 auto;padding:48px 24px}
  .card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:16px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,.3)}
  .acc{color:var(--acc);font-weight:600}
  .muted{color:var(--muted)}
  .pill{display:inline-block;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:4px 10px;margin-right:6px;color:var(--muted);font-size:12px}
</style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="acc">Human Check</div>
      <p class="muted">We couldn’t verify your client automatically. If you’re human, refresh and try again.</p>
      <div><span class="pill">GEO: ${geo}</span> <span class="pill">Device: ${device}</span></div>
      <p class="muted" style="font-size:12px">Bots & scrapers see this page; real users redirect to the vault offer.</p>
    </div>
  </div>
</body>
</html>`;
}

function htmlHeaders(){
  return {
    'content-type': 'text/html; charset=utf-8',
    'x-robots-tag': 'noindex, nofollow',
    'cache-control': 'no-store',
    'x-frame-options': 'DENY',
    'content-security-policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
  };
}
