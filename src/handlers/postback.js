export async function myleadPostbackHandler(request, env, ctx) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  try {
    await env.BOT_LOG_KV.put(`pb:${Date.now()}`, JSON.stringify(params));
  } catch (err) {
    console.error('Postback log failed', err);
  }
  return new Response('OK');
}
