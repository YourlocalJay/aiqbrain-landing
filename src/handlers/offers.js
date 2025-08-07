export async function offersHandler(request) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|facebook|twitter|linkedin|headless/i.test(ua);
  if (isBot) {
    return new Response('Not found', { status: 404 });
  }
  const params = new URLSearchParams(url.search);
  params.set('path', url.pathname);
  const target = `https://trkr.aiqbrain.com/redirect?${params.toString()}`;
  return Response.redirect(target, 302);
}
