/**
 * Offer redirect handler for AIQBrain
 * Manages all offer clicks, tracking, and redirects
 */
import { offers } from '../data/offers.js';

export async function handleOfferRedirect(request, env) {
  const url = new URL(request.url);
  const offerSlug = url.pathname.replace('/offers/', '');
  
  // Get the offer data
  const offer = offers[offerSlug];
  
  if (!offer || !offer.active || new Date() > new Date(offer.expiry)) {
    // Offer not found, inactive, or expired
    return Response.redirect(url.origin, 302);
  }
  
  // Track the offer click in analytics
  const visitorId = request.headers.get('cf-ray') || request.headers.get('cf-connecting-ip');
  const timestamp = new Date().toISOString();
  
  await env.AIQ_ANALYTICS.put(`offer_click:${offerSlug}:${visitorId}:${timestamp}`, JSON.stringify({
    offer: offerSlug,
    referrer: request.headers.get('referer') || 'direct',
    country: request.cf.country,
    device: /Mobile|Android/.test(request.headers.get('user-agent')) ? 'mobile' : 'desktop',
    timestamp
  }), {
    expirationTtl: 2592000 // 30 days
  });
  
  // Send webhook if configured
  if (env.WEBHOOK_SECRET && env.WEBHOOK_URL) {
    fetch(env.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': env.WEBHOOK_SECRET
      },
      body: JSON.stringify({
        event: 'offer_click',
        offer: offerSlug,
        timestamp
      })
    }).catch(() => {}); // Ignore errors to prevent blocking the redirect
  }
  
  // Redirect to the offer URL
  return Response.redirect(offer.url, 302);
}
