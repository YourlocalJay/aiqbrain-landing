// AIQBrain Cloudflare Worker - Final Enhanced Version

const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to AIQBrain</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Inter, sans-serif;
      background: #0d0d0d;
      color: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      flex-direction: column;
    }
    h1 { font-size: 2rem; }
    a {
      color: #635BFF;
      text-decoration: none;
      margin-top: 1rem;
      display: inline-block;
    }
  </style>
</head>
<body>
  <h1>AIQBrain Routing System Active</h1>
  <a href="/start">Get Started</a>
</body>
</html>`;

const REDIRECTS = {
  '/sv': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/surveyvault': 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776',
  '/vault': 'https://aiqengage.com/vault',
  '/start': 'https://aiqengage.com/get-started',
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

const normalizePath = (path) => path.replace(/\/+$/, '').toLowerCase();

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const rawPath = url.pathname;
    const path = normalizePath(rawPath);

    const userAgent = request.headers.get('user-agent') || '';
    const headers = new Headers(SECURITY_HEADERS);

    // Set env-driven cache control
    if (env.CACHE_TTL) {
      headers.set('Cache-Control', `public, max-age=${env.CACHE_TTL}`);
    }

    // 1. Basic bot filtering
    const botPatterns = [/bot/i, /crawl/i, /spider/i, /facebookexternalhit/i, /Slackbot/i];
    if (botPatterns.some((p) => p.test(userAgent))) {
      return new Response(null, { status: 204 }); // No content
    }

    try {
      // 2. Handle redirect paths
      if (REDIRECTS[path]) {
        const envKey = `REDIRECT_${path.toUpperCase().replace(/\//g, '_')}`;
        const destination = env[envKey] || REDIRECTS[path];

        console.log(`Redirecting ${path} → ${destination}`);
        return Response.redirect(destination, 302);
      }

      // 3. Text-only placeholder pages
      if (TEXT_PAGES[path]) {
        return new Response(TEXT_PAGES[path], {
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // 4. Root or catch-all → landing
      if (path === '' || path === '/') {
        return new Response(LANDING_PAGE, { headers });
      }

      // 5. Fallback: 404
      return new Response('404 – Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });

    } catch (err) {
      console.error('⚠️ Worker error:', err);
      return new Response('An unexpected error occurred.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
