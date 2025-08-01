export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const ip = request.headers.get('cf-connecting-ip') || '';
      const country = request.cf?.country || 'US';
      const userAgent = request.headers.get('user-agent') || '';
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isBot = /bot|crawl|slurp|spider|google|bing|duckduckgo|yandex|baidu|facebot|facebook|twitterbot|linkedinbot|embedly|quora|pinterest|slack|whatsapp|telegram|vkShare|Screaming Frog|Site Auditor|Ahrefs|MJ12|Semrush/i.test(userAgent.toLowerCase());

      // ========== STATIC ASSET HANDLING ==========
      if (path === "/images/aiqbrain-logo.svg") {
        return handleSvgRequest();
      }

      // ========== SECURITY CHECKS ==========
      if (!isWhitelistedBot(userAgent) && isBot) {
        return generateBlockResponse('Bot detected');
      }

      // Check allowed countries (default: US,CA,UK if not set)
      const allowedCountries = (env.ALLOWED_COUNTRIES || 'US,CA,UK').split(',');
      if (!allowedCountries.includes(country)) {
        return Response.redirect(addTracking(env.REDIRECT_COMPLIANCE, {
          t: 'geo_block',
          country
        }), 302);
      }

      // ========== STEALTH HOMEPAGE ==========
      if (path === "/") {
        return generateHomepageResponse();
      }

      // ========== CORE ROUTING LOGIC ==========
      const response = await handleMainRoutes(path, request, env, {
        country,
        userAgent,
        ip,
        isMobile
      });
      if (response) return response;

      // ========== FALLBACK REDIRECT ==========
      return Response.redirect(addTracking(env.REDIRECT_START, {
        t: 'default_redirect',
        path
      }), 302);

    } catch (err) {
      console.error('Worker error:', err);
      return generate500Response();
    }
  }
};

// ========== UTILITY FUNCTIONS ==========

function handleSvgRequest() {
  const svg = `
  <svg width="164" height="48" viewBox="0 0 164 48" xmlns="http://www.w3.org/2000/svg">
    <rect width="164" height="48" rx="10" fill="#0A0E12"/>
    <text x="50%" y="50%" font-family="Space Mono, monospace" font-size="22" 
          font-weight="bold" fill="#ff7b72" text-anchor="middle" dominant-baseline="middle">
      AIQBrain
    </text>
  </svg>`.trim();

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=604800, immutable",
      "x-content-type-options": "nosniff"
    }
  });
}

function isWhitelistedBot(ua) {
  const whitelist = [
    'Google-InspectionTool',
    'Twitterbot',
    'LinkedInBot'
  ];
  return whitelist.some(bot => ua.includes(bot));
}

function generateBlockResponse(reason) {
  return new Response(`Access Denied: ${reason}`, {
    status: 403,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
      'Content-Type': 'text/plain',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

function generateHomepageResponse() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>AIQBrain | Claude Monetization Systems</title>
    <meta name="robots" content="noindex,nofollow">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="description" content="Advanced Claude monetization frameworks">
    <style>
      :root {
        --bg: #0a0e12;
        --text: #e6edf3;
        --accent: #ff7b72;
        --secondary: #58a6ff;
      }
      body {
        font-family: 'Inter Tight', sans-serif;
        background: var(--bg);
        color: var(--text);
        margin: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        line-height: 1.6;
      }
      .logo {
        max-width: 180px;
        margin-bottom: 1.5rem;
      }
      .status {
        background: rgba(88, 166, 255, 0.1);
        border: 1px solid rgba(88, 166, 255, 0.2);
        padding: 1.5rem;
        border-radius: 8px;
        max-width: 600px;
        margin: 2rem 0;
      }
      .footer {
        margin-top: 2rem;
        font-size: 0.875rem;
        color: rgba(230, 237, 243, 0.6);
      }
    </style>
  </head>
  <body>
    <img src="/images/aiqbrain-logo.svg" alt="AIQBrain" class="logo">
    <div class="status">
      <h2 style="color:var(--accent);font-family:'Space Mono',monospace;margin-bottom:0.5rem;">
        SYSTEM STATUS: OPERATIONAL
      </h2>
      <p>Platform undergoing scheduled maintenance. Access restricted to authorized partners.</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} AIQBrain Systems
    </div>
  </body>
  </html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex,nofollow",
      "x-frame-options": "DENY",
      "referrer-policy": "no-referrer",
      "x-content-type-options": "nosniff"
    }
  });
}

async function handleMainRoutes(path, request, env, { country, userAgent, ip, isMobile }) {
  // ========== CPA OFFER ROUTING ==========
  if (path === '/offer') {
    const variant = getAbVariant(ip, env.AB_TEST_SPLIT || '0.33,0.33,0.34');
    const offerUrl = env[`SV_OFFER_${variant}`] || env.SV_OFFER_A;
    return Response.redirect(addTracking(offerUrl, {
      t: 'neural_ops',
      src: 'direct',
      v: variant,
      country,
      device: isMobile ? 'mobile' : 'desktop'
    }), 302);
  }

  // ========== GEO-TARGETED OFFERS ==========
  if (path === '/geo') {
    if (country === 'DE' && env.GERMAN_OFFER) {
      return Response.redirect(addTracking(env.GERMAN_OFFER, {
        t: 'geo_de',
        src: 'direct'
      }), 302);
    }
    if (env.EU_OFFER && ['DE','FR','ES','IT','NL'].includes(country)) {
      return Response.redirect(addTracking(env.EU_OFFER, {
        t: 'geo_eu',
        src: 'direct'
      }), 302);
    }
  }

  // ========== CORE ROUTES ==========
  const routes = {
    '/vault': isMobile ? env.MOBILE_VAULT : env.DESKTOP_VAULT,
    '/start': isMobile ? env.MOBILE_START : env.DESKTOP_START,
    '/privacy': env.REDIRECT_PRIVACY,
    '/compliance': env.REDIRECT_COMPLIANCE,
    '/terms': env.REDIRECT_TERMS
  };

  if (routes[path]) {
    return Response.redirect(addTracking(routes[path], {
      t: path.slice(1),
      src: 'direct'
    }), 302);
  }

  return null;
}

function getAbVariant(userId, weightString) {
  const weights = weightString.split(',').map(parseFloat);
  const letters = ['A', 'B', 'C', 'D', 'E'];
  let hash = 0;
  
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  hash = Math.abs(hash) % 10000 / 10000; // 0-1 range

  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    cumulative += weights[i];
    if (hash < cumulative) return letters[i];
  }
  return letters[0];
}

function addTracking(baseUrl, params) {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

function generate500Response() {
  return new Response("Internal Server Error", {
    status: 500,
    headers: {
      "content-type": "text/plain",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
