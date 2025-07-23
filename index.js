// AIQBrain Cloudflare Worker - Optimized Version
const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<!-- [Previous HTML content remains exactly the same] -->
</html>`;

const REDIRECTS = {
  // Primary redirects
  '/sv': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/surveyvault': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/vault': 'https://aiqengage.com/vault',
  '/start': 'https://aiqengage.com/get-started',
  
  // Aliases
  '/prompts': '/sv',
  '/claude': '/sv',
  '/getstarted': '/start'
};

const TEXT_PAGES = {
  '/privacy': 'Privacy Policy - Coming Soon',
  '/terms': 'Terms of Service - Coming Soon',
  '/about': 'About AIQBrain - Coming Soon'
};

const SECURITY_HEADERS = {
  'Content-Type': 'text/html; charset=UTF-8',
  'Cache-Control': 'public, max-age=3600',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname.toLowerCase();
    
    // Set cache TTL from environment or default
    const headers = new Headers(SECURITY_HEADERS);
    if (env.CACHE_TTL) {
      headers.set('Cache-Control', `public, max-age=${env.CACHE_TTL}`);
    }

    try {
      // 1. Handle redirects
      if (REDIRECTS[path]) {
        const destination = env[`REDIRECT_${path.toUpperCase().replace(/\//g, '_')}`] 
                          || REDIRECTS[path];
        return Response.redirect(destination, 302);
      }

      // 2. Handle simple text pages
      if (TEXT_PAGES[path]) {
        return new Response(TEXT_PAGES[path], {
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // 3. Serve landing page for all other requests
      return new Response(LANDING_PAGE, { headers });

    } catch (error) {
      // Error handling with user-friendly message
      return new Response('An error occurred. Please try again later.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
}
