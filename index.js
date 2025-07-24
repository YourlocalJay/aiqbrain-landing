// AIQBrain Cloudflare Worker - Enterprise Edition
// Features: A/B Testing, Geo-Targeting, Device Optimization, Time-Based Offers

const LANDING_PAGE = `<!DOCTYPE html>
<html lang="en">
<!-- [Previous HTML content remains exactly the same] -->
</html>`;

// Configuration Objects
const CONFIG = {
  // A/B Testing for /sv redirect
  AB_TESTS: {
    SV_OFFERS: {
      A: "https://singingfiles.com/show.php?l=0&u=2427730&id=68776",
      B: "https://singingfiles.com/show.php?l=0&u=2427730&id=68777",
      C: "https://singingfiles.com/show.php?l=0&u=2427730&id=68778"
    },
    LANDING_VARIANTS: {
      A: { title: "AIQBrain – Claude Prompt Tools", subtitle: "Accelerate your productivity with trusted AI unlocks" },
      B: { title: "🎯 Master Claude AI in Minutes", subtitle: "Get proven prompts that 10,000+ users trust" },
      C: { title: "💡 Claude Prompts That Actually Work", subtitle: "Stop wasting time with generic prompts" }
    }
  },

  // Geo-Specific Offers
  GEO_TARGETING: {
    DE: { vault: "https://de.aiqengage.com/vault", start: "https://de.aiqengage.com/start" },
    FR: { vault: "https://fr.aiqengage.com/vault" },
    ES: { vault: "https://es.aiqengage.com/vault" }
  },

  // Device-Specific Optimization
  DEVICE_OPTIMIZATION: {
    mobile: { vault: "https://m.aiqengage.com/vault", cta: "Get Mobile Access" },
    tablet: { cta: "Get Tablet Access" }
  },

  // Time-Based Offers
  TIME_OFFERS: {
    weekend: { banner: "🚀 Weekend Special: 40% OFF All Prompts!" },
    evening: { banner: "🌙 Night Owl Special: Bonus Prompts Included!" }
  }
};

// Security Headers Configuration
const SECURITY_HEADERS = {
  html: {
    'Content-Type': 'text/html; charset=UTF-8',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
  },
  text: {
    'Content-Type': 'text/plain'
  }
};

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const path = pathname.toLowerCase();

      // Extract request metadata
      const userAgent = request.headers.get('user-agent') || '';
      const cf = request.cf || {};
      const country = cf.country || 'US';
      const isMobile = /mobi|android|iphone|ipad/i.test(userAgent);
      const isTablet = /tablet|ipad/i.test(userAgent);
      const now = new Date();
      const isWeekend = [0, 6].includes(now.getUTCDay());
      const isEvening = now.getUTCHours() >= 18 || now.getUTCHours() <= 6;

      // Generate consistent user ID for A/B testing
      const ip = request.headers.get('cf-connecting-ip') || '';
      const userHash = await crypto.subtle.digest('SHA-256', 
        new TextEncoder().encode(`${ip}${userAgent}${country}`));
      const userScore = new Uint8Array(userHash)[0];

      // Bot detection and handling
      if (this.isBot(userAgent)) {
        return this.serveBotVersion();
      }

      // Handle redirect routes
      if (path === '/sv' || path === '/surveyvault') {
        return this.handleSurveyVaultRedirect(userScore, country, isMobile, isEvening);
      }

      if (path === '/vault') {
        return this.handleVaultRedirect(country, isMobile);
      }

      if (path === '/start') {
        return this.handleStartRedirect(country, isMobile);
      }

      // Handle static pages
      if (['/privacy', '/terms', '/about'].includes(path)) {
        return new Response(`${path.slice(1).toUpperCase()} Page - Coming Soon`, {
          headers: SECURITY_HEADERS.text
        });
      }

      // Serve optimized landing page
      return this.serveLandingPage(userScore, country, isMobile, isWeekend, isEvening);

    } catch (error) {
      // Error handling with logging
      console.error(`Error processing request: ${error.message}`);
      return new Response('An error occurred. Please try again later.', {
        status: 500,
        headers: SECURITY_HEADERS.text
      });
    }
  },

  // Helper Methods
  isBot(userAgent) {
    const botPatterns = [/bot/i, /crawl/i, /spider/i, /scraper/i, /facebookexternalhit/i];
    return botPatterns.some(pattern => pattern.test(userAgent));
  },

  serveBotVersion() {
    const cleanHTML = LANDING_PAGE.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
    return new Response(cleanHTML, {
      headers: {
        ...SECURITY_HEADERS.html,
        'Cache-Control': 'public, max-age=86400' // Longer cache for bots
      }
    });
  },

  handleSurveyVaultRedirect(userScore, country, isMobile, isEvening) {
    // 1. Check for geo-specific offer
    if (CONFIG.GEO_TARGETING[country]?.survey) {
      return Response.redirect(CONFIG.GEO_TARGETING[country].survey, 302);
    }

    // 2. Select A/B test variant
    const variantKey = ['A', 'B', 'C'][userScore % 3];
    let redirectUrl = CONFIG.AB_TESTS.SV_OFFERS[variantKey];

    // 3. Add tracking parameters
    const trackingParams = new URLSearchParams();
    trackingParams.set('variant', variantKey);
    trackingParams.set('country', country);
    trackingParams.set('device', isMobile ? 'mobile' : 'desktop');
    if (isEvening) trackingParams.set('time', 'evening');

    return Response.redirect(`${redirectUrl}?${trackingParams}`, 302);
  },

  handleVaultRedirect(country, isMobile) {
    // 1. Check for geo-specific vault
    if (CONFIG.GEO_TARGETING[country]?.vault) {
      return Response.redirect(CONFIG.GEO_TARGETING[country].vault, 302);
    }

    // 2. Check for mobile-optimized vault
    if (isMobile && CONFIG.DEVICE_OPTIMIZATION.mobile?.vault) {
      return Response.redirect(CONFIG.DEVICE_OPTIMIZATION.mobile.vault, 302);
    }

    // 3. Default vault
    return Response.redirect(env.REDIRECT_VAULT || 'https://aiqengage.com/vault', 302);
  },

  handleStartRedirect(country, isMobile) {
    // Similar logic to vault redirect
    if (CONFIG.GEO_TARGETING[country]?.start) {
      return Response.redirect(CONFIG.GEO_TARGETING[country].start, 302);
    }

    if (isMobile && CONFIG.DEVICE_OPTIMIZATION.mobile?.start) {
      return Response.redirect(CONFIG.DEVICE_OPTIMIZATION.mobile.start, 302);
    }

    return Response.redirect(env.REDIRECT_START || 'https://aiqengage.com/start', 302);
  },

  serveLandingPage(userScore, country, isMobile, isWeekend, isEvening) {
    // 1. Select A/B test variant
    const variantKey = ['A', 'B', 'C'][userScore % 3];
    const variant = CONFIG.AB_TESTS.LANDING_VARIANTS[variantKey];

    // 2. Apply variant to HTML
    let html = LANDING_PAGE
      .replace('AIQBrain – Claude Prompt Tools', variant.title)
      .replace('Accelerate your productivity with trusted AI unlocks', variant.subtitle);

    // 3. Apply geo-specific modifications
    if (['DE', 'AT', 'CH'].includes(country)) {
      html = html.replace('Unlock Claude Prompts', 'Jetzt freischalten');
    }

    // 4. Apply time-based modifications
    if (isWeekend) {
      html = html.replace('id="urgencyBanner" style="display: none;"', 
        'id="urgencyBanner"');
    }

    // 5. Set response headers
    const headers = new Headers(SECURITY_HEADERS.html);
    headers.set('Cache-Control', `public, max-age=${env.CACHE_TTL || 3600}`);
    headers.set('X-AB-Variant', variantKey);
    headers.set('X-Geo-Country', country);

    return new Response(html, { headers });
  }
};
