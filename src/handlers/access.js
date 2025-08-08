


export async function accessPage(request) {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const passthrough = params.toString();
  const redirectURL = `/sv?${passthrough}`;

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Vault Unlocking…</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta http-equiv="refresh" content="3;url=${redirectURL}" />
      <style>
        body { font-family: sans-serif; text-align: center; padding: 3rem; background: #111; color: #eee; }
        a.button { display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background: #0af; color: white; text-decoration: none; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>Unlocking Claude Vault...</h1>
      <p>Redirecting to secure prompt preview</p>
      <a class="button" href="${redirectURL}">Continue</a>
    </body>
  </html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}
