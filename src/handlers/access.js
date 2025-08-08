export async function accessHandler(request, env, ctx) {
  const url = new URL(request.url);
  const params = url.searchParams;

  // Normalize + validate inputs
  const rawEmail = (params.get('email') || '').trim();
  const email = rawEmail.toLowerCase();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // accept both ?exp= and ?experience=
  const exp = params.get('exp') || params.get('experience') || '';
  const utm_source = params.get('utm_source') || '';
  const utm_medium = params.get('utm_medium') || '';
  const utm_campaign = params.get('utm_campaign') || '';
  const utm_content = params.get('utm_content') || '';

  // Env-derived context
  const geo = request.cf?.country || 'UNK';
  const device = request.cf?.deviceType || (/mobile/i.test(request.headers.get('user-agent') || '') ? 'Mobile' : 'Desktop');

  // Stable session id for joining logs without exposing PII
  const session_id = (typeof crypto?.randomUUID === 'function')
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

  const payload = {
    email,
    exp,
    utm_source, utm_medium, utm_campaign, utm_content,
    ts: Date.now(),
    geo,
    device,
    session_id
  };

  // Non-blocking KV log (14 days). Always log, even if email invalid.
  try {
    if (env.BOT_LOG_KV) {
      ctx.waitUntil(
        env.BOT_LOG_KV.put(
          `access:${Date.now()}:${session_id}`,
          JSON.stringify({
            email_hash: email ? await sha256(email) : null,
            utm: { utm_source, utm_medium, utm_campaign, utm_content },
            geo, device,
            ua: request.headers.get('user-agent') || '',
            ip: request.headers.get('cf-connecting-ip') || '',
            ts: new Date().toISOString()
          }),
          { expirationTtl: 1209600 }
        )
      );
    }
  } catch (_) {}

  // Post to Make only when configured AND email looks valid.
  try {
    if (emailValid && env.MAKE_WEBHOOK_URL && env.MAKE_API_KEY) {
      ctx.waitUntil(
        fetch(env.MAKE_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-make-apikey': env.MAKE_API_KEY
          },
          body: JSON.stringify(payload)
        })
      );
    }
  } catch (_) {}

  // Interstitial that forwards to /sv with original params intact
  const passthrough = params.toString();
  const redirectURL = `/sv?${passthrough}`;
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Vault Unlocking…</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta http-equiv="refresh" content="2;url=${redirectURL}" />
    <style>
      :root { --bg:#0a0e12; --fg:#eaecef; --accent:#635BFF; }
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; text-align: center; padding: 3rem; background: var(--bg); color: var(--fg); }
      a.button { display: inline-block; margin-top: 1rem; padding: 0.75rem 1.25rem; background: var(--accent); color: #fff; text-decoration: none; border-radius: 8px; }
      .note { opacity:.85; max-width: 680px; margin: 0 auto; }
      .warn { color: #ffb4a8; }
    </style>
  </head>
  <body>
    <h1>Unlocking Claude Vault…</h1>
    <p class="note">${emailValid ? 'Redirecting to secure prompt preview.' : 'We could not validate that email. You can still continue to the next step.'}</p>
    <p><a class="button" href="${redirectURL}">Continue now →</a></p>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0'
    }
  });
}

// Small helper to hash email for KV (avoid storing raw PII)
async function sha256(str) {
  const data = new TextEncoder().encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
}
