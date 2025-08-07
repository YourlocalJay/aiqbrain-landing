export async function vaultUnlockHandler(request, env, ctx) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'POST' }
    });
  }

  const formData = await request.formData();
  const email = formData.get('email');

  try {
    await env.BOT_LOG_KV.put(`unlock:${Date.now()}`, JSON.stringify({
      email,
      ua: request.headers.get('user-agent'),
      ip: request.headers.get('cf-connecting-ip'),
      ts: new Date().toISOString()
    }));
  } catch (err) {
    console.error('Unlock log failed', err);
  }

  const html = `<!DOCTYPE html>
<html>
  <body>
    <p>Request Received</p>
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
