import { vaultHandler } from './vault';

export async function offersHandler(request, env, ctx) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  const score = request.cf?.botManagement?.score;
  const isBot = /bot|crawler|spider|facebook|twitter|linkedin|headless/i.test(ua) ||
    (typeof score === 'number' && score < 30);

  if (isBot) {
    try {
      await env.BOT_LOG_KV.put(`bot:${Date.now()}`, JSON.stringify({
        path: url.pathname,
        ip: request.headers.get('cf-connecting-ip'),
        ua: request.headers.get('user-agent'),
        country: request.headers.get('cf-ipcountry') || 'unknown',
        ts: new Date().toISOString()
      }));
    } catch (err) {
      console.error('Bot log failed', err);
    }
    return vaultHandler(request, env, ctx);
  }

  const params = new URLSearchParams(url.search);
  params.set('path', url.pathname);
  const target = `https://trkr.aiqbrain.com/redirect?${params.toString()}`;
  return Response.redirect(target, 302);
}
