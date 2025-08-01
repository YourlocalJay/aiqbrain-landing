/**
 * Routing middleware for AIQBrain landing page
 * Handles device, geo, and time-based routing
 */
export async function routingMiddleware(request, env) {
  const url = new URL(request.url);
  
  // Skip routing for static assets and api routes
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/api/')) {
    return null;
  }
  
  const userAgent = request.headers.get('user-agent') || '';
  const country = request.cf.country || 'US';
  const isMobile = /Mobile|Android/.test(userAgent);
  
  // Current time in user's timezone (approximate)
  const now = new Date();
  let userHour = now.getUTCHours();
  
  // Adjust for timezone based on country
  const timezoneOffsets = {
    'US': -5, // EST average
    'CA': -5, // EST average
    'GB': 0,  // GMT
    'UK': 0,  // GMT
    'AU': 10, // AEST
    'DE': 1,  // CET
  };
  
  if (timezoneOffsets[country]) {
    userHour = (userHour + timezoneOffsets[country] + 24) % 24;
  }
  
  const dayOfWeek = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Evening hours (typically higher conversion)
  const isEvening = userHour >= 18 && userHour < 23;
  
  // Apply routing logic if enabled
  if (env.GEO_ROUTING_ENABLED === 'true' || env.TIME_ROUTING_ENABLED === 'true' || env.DEVICE_ROUTING_ENABLED === 'true') {
    // Home page special routing
    if (url.pathname === '/' || url.pathname === '/index.html') {
      // Weekend + Evening boost for high-intent visitors
      if (env.TIME_ROUTING_ENABLED === 'true' && isWeekend && isEvening) {
        return Response.redirect(`${url.origin}/high-intent${url.search}`, 302);
      }
      
      // Device-specific landing for better conversions
      if (env.DEVICE_ROUTING_ENABLED === 'true' && isMobile) {
        return Response.redirect(`${url.origin}/mobile${url.search}`, 302);
      }
    }
    
    // Strategy page - show weekend special on weekends
    if (env.TIME_ROUTING_ENABLED === 'true' && url.pathname === '/strategy' && isWeekend) {
      return Response.redirect(`${url.origin}/strategy-weekend${url.search}`, 302);
    }
  }
  
  return null; // Continue to next middleware
}
