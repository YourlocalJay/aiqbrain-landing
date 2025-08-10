export function accessPage(url, env) {
  const params = url.searchParams.toString();
  const redirectURL = `/sv?${params}`;
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="robots" content="noindex,nofollow" />
      <title>Vault Access</title>
      <style>
        body{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0e12;color:#eaecef;text-align:center;padding:3rem}
        a.btn{display:inline-block;margin-top:1rem;padding:0.75rem 1.25rem;background:#635BFF;color:#fff;text-decoration:none;border-radius:6px}
      </style>
    </head>
    <body>
      <h1>Almost there</h1>
      <p>Click below to unlock the vault.</p>
      <p><a class="btn" href="${redirectURL}">Unlock Vault →</a></p>
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
