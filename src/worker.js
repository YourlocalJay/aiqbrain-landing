const ALLOWED_SCHEMES = new Set(['https:']);
const rateBuckets = new Map();

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
    // Root: Dev Panel (local testing shortcuts)
    if (pathname === '/') {
      return new Response(renderDevPanel({ origin: url.origin }), {
        status: 200,
        headers: htmlHeaders()
      });
    }

    // Stealth vault page (unchanged behavior)
    if (pathname === '/vault') {
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

    // Shortlink redirect: /go?t=<b64u(target)>&e=<epoch>&m=<b64u(json-meta)>&s=<sig>
    if (pathname === '/go') {
      const verdict = await verifyGoRequest(url, env.LINK_SECRET || '');
      if (!verdict.ok) {
        return new Response(JSON.stringify({ ok: false, error: verdict.reason }), {
          status: 400,
          headers: jsonHeadersNoIndex()
        });
      }

      const inbound = url.searchParams;
      const targetURL = new URL(verdict.target);
      for (const k of ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','sub1','sub2','sub3']) {
        if (inbound.has(k)) targetURL.searchParams.set(k, inbound.get(k));
      }
      const BLOCKLIST_HOSTS = (env.BLOCKLIST_HOSTS || '').split(',').map(s=>s.trim()).filter(Boolean);
      const fallback = env.FALLBACK_URL || `${url.origin}/vault`;
      if (BLOCKLIST_HOSTS.includes(targetURL.hostname)) {
        return Response.redirect(fallback, 302);
      }
      if (isEdgeOrWindows(ua) && env.EDGE_HARD_FALLBACK === 'true') {
        return Response.redirect(fallback, 302);
      }

      const fp = await sha256(
        (request.headers.get('cf-connecting-ip')||'') +
        (request.headers.get('user-agent')||'') +
        (request.headers.get('accept-language')||'')
      );
      ctx.waitUntil(env.CLICK_LOG?.fetch(env.CLICK_LOG, {
        method:'POST',
        headers:{'content-type':'application/json'},
        body: JSON.stringify({
          ts: new Date().toISOString(),
          linkMeta: verdict.meta,
          destHost: targetURL.hostname,
          fp, ua: request.headers.get('user-agent')||'',
          utm: Object.fromEntries(['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(k=>[k, url.searchParams.get(k)]))
        })
      }).catch(()=>{}));

      return Response.redirect(targetURL.toString(), 302);
    }

    // Dev-only link generator: /mk?t=<url>&ttl=<sec>&note=...&token=<env token>
    if (pathname === '/mk') {
      if (!(env.DEBUG_LIVE_LINKS === 'true')) {
        return new Response('Forbidden', { status: 403 });
      }
      const token = url.searchParams.get('token');
      if (!token || token !== (env.LINK_DEV_TOKEN || 'dev')) {
        return new Response('Forbidden', { status: 403 });
      }

      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const now = Date.now();
      let bucket = rateBuckets.get(ip) || { count: 0, ts: now };
      if (now - bucket.ts > 60000) bucket = { count: 0, ts: now };
      bucket.count++;
      rateBuckets.set(ip, bucket);
      if (bucket.count > 10) {
        return new Response('Rate limit', { status: 429 });
      }

      const target = url.searchParams.get('t');
      if (!target) return new Response('Missing t', { status: 400 });

      const MAX_TTL = parseInt(env.LINK_MAX_TTL || '604800', 10);
      const ttl = Math.min(
        parseInt(url.searchParams.get('ttl') || env.LINK_DEFAULT_TTL || '86400', 10),
        MAX_TTL
      );
      try {
        const test = new URL(target);
        if (!ALLOWED_SCHEMES.has(test.protocol)) return new Response('Bad scheme', { status: 400 });
      } catch { return new Response('Bad URL', { status: 400 }); }

      const meta = { note: url.searchParams.get('note') || '' };
      const unsigned = buildGoURL(url.origin, { target, expires: nowSec() + ttl, meta });
      const signed = await signGoURL(unsigned, env.LINK_SECRET || '');
      return new Response(JSON.stringify({ ok: true, link: signed }), { headers: jsonHeadersNoIndex() });
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

// --- Live Link helpers ---
const b64u = {
  enc: (u8) => btoa(String.fromCharCode(...u8)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''),
  dec: (s) => new Uint8Array([...atob(s.replace(/-/g,'+').replace(/_/g,'/'))].map(c=>c.charCodeAt(0))),
};

async function hmacSHA256(keyStr, msgStr) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(keyStr), { name: "HMAC", hash: "SHA-256" }, false, ["sign","verify"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msgStr));
  return b64u.enc(new Uint8Array(sig));
}

function nowSec(){ return Math.floor(Date.now()/1000); }

function buildGoURL(origin, { target, expires, meta = {} }) {
  const q = new URLSearchParams();
  q.set("t", b64u.enc(new TextEncoder().encode(target)));
  q.set("e", String(expires));
  const m = b64u.enc(new TextEncoder().encode(JSON.stringify(meta)));
  if (m !== b64u.enc(new Uint8Array())) q.set("m", m);
  return `${origin}/go?${q.toString()}`;
}

async function signGoURL(url, secret) {
  const u = new URL(url);
  const base = `/go?t=${u.searchParams.get("t")}&e=${u.searchParams.get("e")}${u.searchParams.get("m")?`&m=${u.searchParams.get("m")}`:''}`;
  const s = await hmacSHA256(secret, base);
  u.searchParams.set("s", s);
  return u.toString();
}

async function verifyGoRequest(u, secret) {
  const t = u.searchParams.get("t");
  const e = parseInt(u.searchParams.get("e") || "0", 10);
  const m = u.searchParams.get("m");
  const s = u.searchParams.get("s");
  if (!t || !e || !s) return { ok:false, reason:"missing_params" };
  if (Number.isNaN(e) || e <= 0) return { ok:false, reason:"bad_exp" };
  if (Math.floor(Date.now()/1000) > e) return { ok:false, reason:"expired" };

  const base = `/go?t=${t}&e=${e}${m?`&m=${m}`:''}`;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name:"HMAC", hash:"SHA-256" }, false, ["sign","verify"]
  );
  const sigBytes = b64u.dec(s);
  const ok = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(base));
  if (!ok) return { ok:false, reason:"bad_sig" };

  const target = new TextDecoder().decode(b64u.dec(t));
  let meta = {};
  if (m) { try { meta = JSON.parse(new TextDecoder().decode(b64u.dec(m))); } catch { meta = {}; } }

  let targetURL;
  try { targetURL = new URL(target); } catch { return { ok:false, reason:"bad_url" }; }
  if (!ALLOWED_SCHEMES.has(targetURL.protocol)) return { ok:false, reason:"disallowed_scheme" };

  return { ok:true, target, meta };
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

async function sha256(s){
  const d=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return b64u.enc(new Uint8Array(d));
}

function isEdgeOrWindows(ua=''){
  return /Edg\//.test(ua) || /Windows NT/.test(ua);
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

function renderDevPanel({ origin }) {
  const base = origin.replace(/\/+$/, "");
  const ex1 = `${base}/sv?utm_source=reddit&utm_campaign=P01&utm_content=ChatGPT&geo=US&device=android`;
  const ex2 = `${base}/sv?utm_source=reddit&utm_campaign=P04&utm_content=ClaudeAI&geo=UK&device=ios`;
  const ex3 = `${base}/sv?utm_source=reddit&utm_campaign=P08&utm_content=Canva&geo=CA&device=android`;
  const tjson = `${base}/test?utm_source=reddit&utm_campaign=P10&utm_content=Futurology&geo=US&device=android`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AIQBrain • Dev Panel</title>
<style>
  :root{--bg:#0b1116;--fg:#e6e6e6;--muted:#9aa0a6;--acc:#7bffb2;}
  html,body{height:100%} body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.6 Inter,ui-sans-serif,system-ui}
  .wrap{max-width:780px;margin:0 auto;padding:36px 20px}
  .card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.35)}
  a.btn{display:inline-block;margin:8px 10px 0 0;padding:10px 14px;border:1px solid rgba(255,255,255,.2);border-radius:10px;color:var(--fg);text-decoration:none}
  a.btn:hover{border-color:var(--acc)}
  code{background:rgba(255,255,255,.06);padding:2px 6px;border-radius:6px}
  .muted{color:var(--muted)}
</style>
</head>
<body>
  <div class="wrap">
    <h2>AIQBrain • Dev Panel</h2>
    <p class="muted">Quick links to test redirect + logging. These include geo/device overrides for local dev.</p>
    <div class="card">
      <div>Examples:</div>
      <p>
        <a class="btn" href="${ex1}">US • Android • P01 / r/ChatGPT</a>
        <a class="btn" href="${ex2}">UK • iOS • P04 / r/ClaudeAI</a>
        <a class="btn" href="${ex3}">CA • Android • P08 / r/Canva</a>
      </p>
      <p>Debug JSON (no redirect): <a class="btn" href="${tjson}">/test</a></p>
      <p class="muted">Tip: open DevTools in Wrangler (press <code>d</code>) and tail logs in a second terminal: <code>wrangler tail --format=pretty</code></p>
    </div>
    <div class="card" style="margin-top:16px">
      <div>Create a live link</div>
      <p class="muted">Dev-only. Builds a signed /go link with TTL.</p>
      <form onsubmit="return mk(event)">
        <input id="t" placeholder="https://offer.example/path" style="width:60%"/>
        <input id="ttl" placeholder="ttl sec (e.g., 86400)" />
        <input id="note" placeholder="note (optional)" />
        <button class="btn" type="submit">Make link</button>
      </form>
      <p id="out"></p>
    </div>
  </div>
  <script>
  async function mk(e){
    e.preventDefault();
    const t=document.getElementById('t').value.trim();
    const ttl=(document.getElementById('ttl').value||'86400').trim();
    const note=document.getElementById('note').value||'';
    const u=new URL('/mk', location.origin);
    u.searchParams.set('t', t);
    u.searchParams.set('ttl', ttl);
    u.searchParams.set('note', note);
    u.searchParams.set('token','dev');
    const r=await fetch(u); const j=await r.json();
    const out=document.getElementById('out');
    if(!j.ok){ out.textContent='Error creating link'; return false; }
    out.innerHTML = '<a class="btn" href="'+j.link+'" target="_blank">Open Live Link</a> <code>'+j.link+'</code>';
    return false;
  }
  </script>
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

function jsonHeadersNoIndex(){
  return {
    'content-type':'application/json; charset=utf-8',
    'x-robots-tag':'noindex, nofollow'
  };
}
