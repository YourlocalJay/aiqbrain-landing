// AIQBrain Cloudflare Worker - Enhanced Version
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<!-- [Previous HTML content remains exactly the same] -->
</html>`;

const REDIRECT_MAP = {
  // Primary redirects
  '/sv': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/surveyvault': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/vault': 'https://aiqengage.com/vault',
  '/start': 'https://aiqengage.com/get-started',
  
  // Additional redirects can be added here
  '/prompts': '/sv',
  '/claude': '/sv',
  '/getstarted': '/start'
};

const TEXT_RESPONSES = {
  '/privacy': 'Privacy Policy - Coming Soon',
  '/terms': 'Terms of Service - Coming Soon', 
  '/about': 'About AIQBrain - Coming Soon',
  '/contact': 'Contact Us - Coming Soon'
};

const SECURITY_HEADERS = {
  'content-type': 'text/html;charset=UTF-8',
  'cache-control': 'public, max-age=3600',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'x-xss-protection': '1; mode=block',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'geolocation=(), microphone=(), camera=()'
};

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname.toLowerCase();
      const userAgent = request.headers.get('user-agent') || '';

      // 1. Handle redirects
      if (REDIRECT_MAP[path]) {
        const destination = env[`REDIRECT_${path.toUpperCase().replace(/\//g, '_')}`] 
                          || REDIRECT_MAP[path];
        return Response.redirect(destination, 302);
      }

      // 2. Handle text responses (like policy pages)
      if (TEXT_RESPONSES[path]) {
        return new Response(TEXT_RESPONSES[path], {
          headers: { 'content-type': 'text/plain' }
        });
      }

      // 3. Serve landing page with security headers
      const headers = new Headers(SECURITY_HEADERS);
      
      // Cache control override from env
      if (env.CACHE_TTL) {
        headers.set('cache-control', `public, max-age=${env.CACHE_TTL}`);
      }

      // 4. Basic bot detection (optional)
      if (userAgent.includes('bot') && !userAgent.includes('Twitterbot')) {
        headers.set('content-type', 'text/plain');
        return new Response('Welcome to AIQBrain', { headers });
      }

      return new Response(HTML_CONTENT, { headers });

    } catch (error) {
      // Error handling
      return new Response(`An error occurred: ${error.message}`, {
        status: 500,
        headers: { 'content-type': 'text/plain' }
      });
    }
  }
}
