/**
 * Header middleware for AIQBrain landing page
 * Sets security headers and handles robots/indexing
 */
export async function headerMiddleware(request, env, response) {
  // Clone the response to modify headers
  const newResponse = new Response(response.body, response);
  
  // Security headers
  newResponse.headers.set('X-Content-Type-Options', 'nosniff');
  newResponse.headers.set('X-Frame-Options', 'DENY');
  newResponse.headers.set('X-XSS-Protection', '1; mode=block');
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  newResponse.headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' https://plausible.io 'unsafe-inline'; " +
    "style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https://images.aiqbrain.com; " +
    "connect-src 'self' https://plausible.io https://api.aiqbrain.com; " +
    "frame-ancestors 'none';"
  );
  
  // Anti-crawler for stealth pages
  const url = new URL(request.url);
  if (url.pathname.includes('/strategy') || 
      url.pathname.includes('/lab') || 
      url.pathname.includes('/vault') ||
      url.pathname.includes('/request') ||
      url.pathname.includes('/results') ||
      url.pathname.includes('/ops')) {
    newResponse.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }
  
  return newResponse;
}
