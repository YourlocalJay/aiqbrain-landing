import { accessPage } from './handlers/access';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    const ua = request.headers.get('user-agent') || '';
    const host = url.hostname.toLowerCase();

    const allowedHosts = (env.ALLOWED_HOSTS || '').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
    if (allowedHosts.length && !allowedHosts.includes(host)) {
      return new Response('Not found', { status: 404 });
    }

    if (/googlebot|bingbot|ahrefs|semrush|curl|headless/i.test(ua)) {
      return new Response('Not found', { status: 404 });
    }

    if (pathname === '/' || pathname === '/vault') {
      const assetRes = await fetch(new URL('/vault/index.html', request.url));
      let html = await assetRes.text();
      const inject = `<script>window.MAKE_WEBHOOK_URL=${JSON.stringify(env.MAKE_WEBHOOK_URL || '')};</script>`;
      html = html.replace('</body>', `${inject}</body>`);
      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'x-robots-tag': 'noindex, nofollow'
        }
      });
    }

    if (pathname === '/access') {
      return accessPage(url, env);
    }

    if (pathname === '/sv') {
      const offersRes = await fetch(new URL(env.OFFERS_PATH || '/data/cloudflare_offers.json', request.url));
      const offers = await offersRes.json();
      const geo = request.cf?.country || 'ALL';
      const device = deviceFromUA(ua);
      const utm = {
        utm_source: url.searchParams.get('utm_source') || '',
        utm_medium: url.searchParams.get('utm_medium') || '',
        utm_campaign: url.searchParams.get('utm_campaign') || '',
        utm_content: url.searchParams.get('utm_content') || ''
      };
      const offer = pickOffer(offers, geo, device);
      if (!offer) return new Response('No offer', { status: 404 });
      const target = appendSubs(offer.url, { ...utm, geo, device });
      try {
        await env.BOT_LOG_KV.put(`clk:${Date.now()}`, JSON.stringify({ geo, device, ua, offer: offer.name, utm }));
      } catch (_) {}
      return Response.redirect(target, 302);
    }

    return new Response('Not found', { status: 404 });
  }
};

function deviceFromUA(ua = '') {
  ua = ua.toLowerCase();
  if (/iphone|ios/.test(ua)) return 'iOS';
  if (/android/.test(ua)) return 'Android';
  return 'Desktop';
}

function pickOffer(offers, geo, device) {
  const fits = (o) => (o.geo?.includes(geo) || o.geo?.includes('ALL')) && (o.device === 'All' || o.device === device);
  const mobile = device !== 'Desktop';
  const order = mobile
    ? ['mobile-app','ai-tool','vpn','survey','download']
    : ['ai-tool','vpn','mobile-app','survey','download'];
  for (const t of order) {
    const b = offers.filter(o=>fits(o) && o.type===t).sort((a,b)=>(b.priority-a.priority)||(b.payout-a.payout));
    if (b.length) return b[0];
  }
  return offers.filter(fits).sort((a,b)=>(b.priority-a.priority)||(b.payout-a.payout))[0];
}

function appendSubs(url, ctx) {
  const u = new URL(url);
  const q = u.searchParams;
  q.set('ml_sub1', ctx.utm_source || 'reddit');
  q.set('ml_sub2', ctx.utm_medium || 'organic');
  q.set('ml_sub3', ctx.utm_campaign || 'banned_prompts');
  q.set('ml_sub4', ctx.geo || 'ALL');
  q.set('ml_sub5', ctx.device || 'Desktop');
  u.search = q.toString();
  return u.toString();
}
