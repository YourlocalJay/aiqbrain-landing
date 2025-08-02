/**
 * Enhanced analytics middleware for AIQBrain landing page
 * Handles server-side analytics with improved performance, reliability, and data structure
 * Compatible with GTM and Plausible while adding server-side redundancy
 */
export async function analyticsMiddleware(request, env, response) {
  const { url, headers, method } = request;
  const parsedUrl = new URL(url);
  const { pathname, searchParams } = parsedUrl;

  // Skip static assets and non-page requests
  const STATIC_ASSETS = ['/assets/', '/favicon.', '/robots.txt', '/sitemap'];
  if (STATIC_ASSETS.some(asset => pathname.startsWith(asset))) {
    return response;
  }

  // Handle API analytics endpoint
  if (pathname === '/api/analytics' && method === 'POST') {
    try {
      const payload = await request.json();
      const { event, data } = payload;
      
      if (event && typeof data === 'object') {
        const eventKey = `event:${event}:${Date.now()}`;
        await env.AIQ_ANALYTICS.put(
          eventKey, 
          JSON.stringify({
            ...data,
            timestamp: new Date().toISOString(),
            ua: headers.get('user-agent'),
            ip: headers.get('cf-connecting-ip'),
            cf: request.cf
          }),
          { expirationTtl: 2592000 } // 30 days
        );
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid analytics payload'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Prepare core analytics data
  const timestamp = new Date().toISOString();
  const visitorId = headers.get('cf-ray') || headers.get('cf-connecting-ip') || 'unknown';
  const referrer = headers.get('referer') || 'direct';
  const country = request.cf?.country || 'unknown';
  
  // Extract tracking parameters more efficiently
  const trackingParams = {};
  const TRACKING_PARAMS = new Set([
    'ref', 'source', 'medium', 'campaign', 
    't', 'r', 'src', 'm', 'c', 'v', 'utm_source',
    'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'
  ]);
  
  searchParams.forEach((value, key) => {
    if (TRACKING_PARAMS.has(key) || key.startsWith('utm_')) {
      trackingParams[key] = value;
    }
  });

  // Enhanced analytics payload
  const analyticsData = {
    path: pathname,
    page_url: parsedUrl.toString(),
    referrer,
    country,
    user_agent: headers.get('user-agent'),
    params: trackingParams,
    timestamp,
    visitor_id: visitorId,
    cf_data: request.cf,
    event: 'page_view'
  };

  // Store page view with batched writes for performance
  try {
    const pageViewKey = `pageview:${visitorId}:${Date.now()}`;
    await env.AIQ_ANALYTICS.put(
      pageViewKey,
      JSON.stringify(analyticsData),
      { expirationTtl: 2592000 } // 30 days
    );
  } catch (error) {
    console.error('Analytics storage error:', error.message);
  }

  // Track conversions for key paths
  const CONVERSION_PATHS = {
    '/request': 'lead',
    '/vault': 'vault_view',
    '/sv': 'survey_view',
    '/offers/': 'offer_view'
  };

  for (const [path, conversionType] of Object.entries(CONVERSION_PATHS)) {
    if (pathname === path || pathname.startsWith(path)) {
      try {
        const conversionKey = `conversion:${conversionType}:${visitorId}:${Date.now()}`;
        await env.AIQ_ANALYTICS.put(
          conversionKey,
          JSON.stringify({
            ...analyticsData,
            type: conversionType,
            event: 'conversion',
            conversion_value: pathname === '/request' ? 1 : 0.5
          }),
          { expirationTtl: 7776000 } // 90 days
        );
        break; // Only match one conversion type
      } catch (error) {
        console.error('Conversion tracking error:', error.message);
      }
    }
  }

  return response;
}
