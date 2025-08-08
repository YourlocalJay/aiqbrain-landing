export async function accessHandler(request, env, ctx) {
  const url = new URL(request.url);
  const params = url.searchParams;

  // Build payload for Make (server-side, safe)
  const payload = {
    email: params.get('email') || '',
    exp: params.get('exp') || '',
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
    ts: Date.now(),
    geo: request.cf?.country || 'UNK',
    device: request.cf?.deviceType || (/mobile/i.test(request.headers.get('user-agent')||'') ? 'Mobile' : 'Desktop')
  };

  // Best-effort log to KV
  try {
    if (env.BOT_LOG_KV) {
      await env.BOT_LOG_KV.put(`access:${Date.now()}`, JSON.stringify({
        email: payload.email,
        utm: {
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          utm_content: payload.utm_content
        },
        geo: payload.geo,
        device: payload.device,
        ua: request.headers.get('user-agent') || '',
        ip: request.headers.get('cf-connecting-ip') || '',
        ts: new Date().toISOString()
      }), { expirationTtl: 1209600 }); // 14 days
    }
  } catch (_) {}

  // Post to Make with API key auth if configured
  try {
    if (env.MAKE_WEBHOOK_URL && env.MAKE_API_KEY) {
      await fetch(env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-make-apikey': env.MAKE_API_KEY
        },
        body: JSON.stringify(payload)
      });
    }
  } catch (_) {}

  // Interstitial that forwards to /sv with all params intact
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
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; text-align: center; padding: 3rem; background: #0a0e12; color: #eaecef; }
      a.button { display: inline-block; margin-top: 1rem; padding: 0.75rem 1.25rem; background: #635BFF; color: #fff; text-decoration: none; border-radius: 8px; }
    </style>
  </head>
  <body>
    <h1>Unlocking Claude Vault…</h1>
    <p>Redirecting to secure prompt preview.</p>
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
