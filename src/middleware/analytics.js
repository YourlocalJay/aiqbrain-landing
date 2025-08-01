/**
 * Analytics middleware for AIQBrain landing page
 * Handles server-side analytics storage alongside client-side tracking (GTM and Plausible)
 */
export async function analyticsMiddleware(request, env, response) {
  // Skip for asset requests
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets/')) {
    return response;
  }
  
  // Handle API analytics endpoint (used by client-side tracking)
  if (url.pathname === '/api/analytics' && request.method === 'POST') {
    try {
      const payload = await request.json();
      const { event, data } = payload;
      
      if (event && data) {
        // Store the event in KV
        await env.AIQ_ANALYTICS.put(
          `event:${event}:${Date.now()}`, 
          JSON.stringify(data),
          { expirationTtl: 2592000 } // 30 days
        );
      }
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // Basic analytics data for page views
  const timestamp = new Date().toISOString();
  const visitorId = request.headers.get('cf-ray') || request.headers.get('cf-connecting-ip');
  const userAgent = request.headers.get('user-agent') || '';
  const referrer = request.headers.get('referer') || 'direct';
  const country = request.cf?.country || 'unknown';
  const path = url.pathname;
  
  // Get tracking parameters
  const params = {};
  url.searchParams.forEach((value, key) => {
    // Collect standard UTM parameters and other tracking params
    if (key.startsWith('utm_') || ['ref', 'source', 'medium', 'campaign', 't', 'r', 'src', 'm', 'c', 'v'].includes(key)) {
      params[key] = value;
    }
  });
  
  // Prepare GTM compatible data structure
  const analyticsData = {
    path,
    page_path: path,
    page_url: url.toString(),
    referrer,
    country,
    userAgent,
    params,
    timestamp,
    // Add dataLayer compatible event data
    event_category: 'page_view',
    event_label: path
  };
  
  // Store page view in KV
  try {
    await env.AIQ_ANALYTICS.put(
      `pageview:${visitorId}:${timestamp}`, 
      JSON.stringify(analyticsData), 
      { expirationTtl: 2592000 } // 30 days
    );
  } catch (error) {
    // Silent fail for analytics - don't impact user experience
    console.error('Analytics storage error:', error);
  }
  
  // For conversions (form submissions, specific page visits)
  if (path === '/request' || path === '/vault' || path.startsWith('/sv') || path.startsWith('/offers/')) {
    const conversionType = path === '/request' ? 'lead' : 
                          path === '/vault' ? 'vault_view' : 
                          path.startsWith('/sv') ? 'survey_view' : 'offer_view';
    
    try {
      await env.AIQ_ANALYTICS.put(
        `conversion:${conversionType}:${visitorId}:${timestamp}`, 
        JSON.stringify({
          ...analyticsData,
          type: conversionType,
          event_category: 'conversion',
          event_label: conversionType
        }), 
        { expirationTtl: 7776000 } // 90 days - keep conversion data longer
      );
    } catch (error) {
      console.error('Conversion tracking error:', error);
    }
  }
  
  return response;
}
