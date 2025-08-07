export async function vaultHandler(request, env, ctx) {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Vault Access</title>
    <meta name="robots" content="noindex, nofollow">
  </head>
  <body>
    <h1>Restricted Area</h1>
    <form method="POST" action="/vault-unlock">
      <input type="email" name="email" required />
      <button type="submit">Request Access</button>
    </form>
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
