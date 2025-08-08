export async function accessHandler(request, env, ctx) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const email = params.get('email') || '';

  const utm = {};
  for (const [key, value] of params) {
    if (key.startsWith('utm_')) {
      utm[key] = value;
    }
  }

  try {
    await env.BOT_LOG_KV.put(`access:${Date.now()}`, JSON.stringify({
      email,
      utm,
      ua: request.headers.get('user-agent'),
      ip: request.headers.get('cf-connecting-ip'),
      ts: new Date().toISOString()
    }));
  } catch (err) {
    console.error('Access log failed', err);
  }

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex,nofollow">
    <title>Vault Access</title>
  </head>
  <body>
    <h1>Access Granted</h1>
    <a href="/sv?${params.toString()}">Continue</a>
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
