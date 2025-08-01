/**
 * Analytics middleware for AIQBrain landing page
 * Handles redundant KV analytics storage alongside Plausible
 */
export async function analyticsMiddleware(request, env, response) {
  // Skip for asset requests
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/')) {
    return response;
  }
  
  // Basic analytics data
  const timestamp = new Date().toISOString();
  const visitorId = request.headers.get('cf-ray') || request.headers.get('cf-connecting-ip');
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || 'direct';
  const country = request.cf.country || 'unknown';
  const path = url.pathname;
  
  // Get tracking parameters
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  // Store page view in KV
  await env.AIQ_ANALYTICS.put(`pageview:${visitorId}:${timestamp}`, JSON.stringify({
    path,
    referrer,
    country,
    userAgent,
    params,
    timestamp
  }), {
    expirationTtl: 2592000 // 30 days
  });
  
  // For conversions (form submissions, specific page visits)
  if (path === '/request' || path === '/vault' || path.startsWith('/offers/')) {
    const conversionType = path === '/request' ? 'lead' : 
                          path === '/vault' ? 'vault_view' : 'offer_view';
    
    await env.AIQ_ANALYTICS.put(`conversion:${conversionType}:${visitorId}:${timestamp}`, JSON.stringify({
      type: conversionType,
      path,
      referrer,
      country,
      userAgent,
      params,
      timestamp
    }), {
      expirationTtl: 7776000 // 90 days - keep conversion data longer
    });
  }
  
  return response;
}
