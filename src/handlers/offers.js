/**
 * AIQBrain Survey Vault - Enhanced Offers Handler
 * Optimized brand-compliant traffic routing with advanced security and performance
 * Production: Secure external redirects with full attribution
 * Development: Branded operational dashboard with enhanced UX
 */
import { baseTemplate } from '../templates/base.js';

// Constants for maintainability
const BOT_PATTERNS = Object.freeze([
  /bot|crawler|spider|scraper|facebook|twitter|linkedin|headless|phantom|selenium/i
]);
const TRACKING_PARAMS = Object.freeze([
  't', 'r', 'src', 'm', 'c', 'v',
  'utm_source', 'utm_medium', 'utm_campaign'
]);
const SECURITY_HEADERS = Object.freeze({
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
});

export async function offersHandler(request, env) {
  const { url, headers } = request;
  const parsedUrl = new URL(url);
  const userAgent = headers.get('user-agent') || '';
  const host = headers.get('host') || '';

  // Optimized bot detection
  const isBot = BOT_PATTERNS.some(pattern => pattern.test(userAgent));

  // Enhanced device detection
  const deviceType = /mobile|android|iphone|ipad/i.test(userAgent)
    ? 'mobile'
    : 'desktop';

  // Environment detection
  const isDevelopment = env.ENVIRONMENT === 'development' ||
                       /localhost|127\.0\.0\.1|\.local/i.test(host);

  // Efficient tracking param extraction
  const trackingParams = new URLSearchParams();
  TRACKING_PARAMS.forEach(param => {
    if (parsedUrl.searchParams.has(param)) {
      trackingParams.set(param, parsedUrl.searchParams.get(param));
    }
  });

  // Early return for bots
  if (isBot && !isDevelopment) {
    return Response.redirect('/', 302);
  }

  // Development environment: Enhanced branded dashboard
  if (isDevelopment) {
    const content = `
      <div class="survey-vault-container" style="
        min-height: 100vh;
        background: #0a0e12;
        color: #e6edf3;
        font-family: 'Inter Tight', sans-serif;
        position: relative;
        overflow: hidden;
      ">
        <!-- Optimized neural pattern background -->
        <div class="neural-pattern" style="
          position: absolute;
          inset: 0;
          opacity: 0.05;
          pointer-events: none;
          background-image: url('data:image/svg+xml,%3Csvg width=\\'50\\' height=\\'50\\' viewBox=\\'0 0 50 50\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' stroke=\\'%2358a6ff\\' stroke-width=\\'0.5\\'%3E%3Ccircle cx=\\'25\\' cy=\\'25\\' r=\\'1.5\\'/%3E%3Ccircle cx=\\'10\\' cy=\\'10\\' r=\\'1.5\\'/%3E%3Ccircle cx=\\'40\\' cy=\\'10\\' r=\\'1.5\\'/%3E%3Ccircle cx=\\'10\\' cy=\\'40\\' r=\\'1.5\\'/%3E%3Ccircle cx=\\'40\\' cy=\\'40\\' r=\\'1.5\\'/%3E%3Cline x1=\\'25\\' y1=\\'25\\' x2=\\'10\\' y2=\\'10\\'/%3E%3Cline x1=\\'25\\' y1=\\'25\\' x2=\\'40\\' y2=\\'10\\'/%3E%3Cline x1=\\'25\\' y1=\\'25\\' x2=\\'10\\' y2=\\'40\\'/%3E%3Cline x1=\\'25\\' y1=\\'25\\' x2=\\'40\\' y2=\\'40\\'/%3E%3C/g%3E%3C/svg%3E');
          background-size: 50px 50px;
        "></div>

        <div class="container" style="
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        ">
          <!-- Security indicator -->
          <div style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            color: #f9c74f;
            font-size: 1.25rem;
          ">🔒</div>

          <!-- Optimized header section -->
          <header style="text-align: center; margin-bottom: 3rem; padding-top: 2rem;">
            <div class="stealth-badge" style="
              background: #f9c74f;
              color: #0a0e12;
              font-family: 'Space Mono', monospace;
              font-weight: 700;
              padding: 0.5rem 1.25rem;
              border-radius: 6px;
              display: inline-block;
              margin-bottom: 1.5rem;
              font-size: 0.875rem;
              letter-spacing: 0.05em;
              text-transform: uppercase;
            ">
              Survey Vault - Development Mode
            </div>

            <h1 style="
              font-family: 'Space Mono', monospace;
              font-weight: 700;
              font-size: clamp(2rem, 5vw, 3rem);
              color: #ff7b72;
              margin-bottom: 0.75rem;
              line-height: 1.1;
            ">
              Operator Access Portal
            </h1>

            <p style="
              font-weight: 400;
              font-size: 1.25rem;
              color: rgba(230, 237, 243, 0.8);
              margin-bottom: 2rem;
              line-height: 1.3;
              max-width: 600px;
              margin-inline: auto;
            ">
              Survey Vault offers deploy exclusively on authorized production domains.
              Advanced traffic routing and compliance protocols active.
            </p>
          </header>

          <!-- System metrics card -->
          <section style="
            background: #121820;
            border-radius: 8px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(88, 166, 255, 0.2);
          ">
            <h2 style="
              font-family: 'Space Mono', monospace;
              font-weight: 700;
              color: #ff7b72;
              margin-bottom: 1rem;
              font-size: 1.125rem;
            ">
              System Status
            </h2>

            <div class="metrics-grid" style="
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1.5rem;
              margin-bottom: 1.5rem;
            ">
              <div>
                <div style="color: #58a6ff; font-size: 0.875rem; margin-bottom: 0.25rem;">
                  Device Type
                </div>
                <div style="font-family: 'Space Mono', monospace; font-weight: 700; color: #e6edf3;">
                  ${deviceType.toUpperCase()}
                </div>
              </div>

              <div>
                <div style="color: #58a6ff; font-size: 0.875rem; margin-bottom: 0.25rem;">
                  Environment
                </div>
                <div style="font-family: 'Space Mono', monospace; font-weight: 700; color: #e6edf3;">
                  DEVELOPMENT
                </div>
              </div>

              <div>
                <div style="color: #58a6ff; font-size: 0.875rem; margin-bottom: 0.25rem;">
                  Access Level
                </div>
                <div style="font-family: 'Space Mono', monospace; font-weight: 700; color: #f9c74f;">
                  RESTRICTED
                </div>
              </div>
            </div>

            <div style="
              background: rgba(88, 166, 255, 0.1);
              border: 1px solid rgba(88, 166, 255, 0.2);
              border-radius: 6px;
              padding: 1rem;
              font-size: 0.875rem;
              line-height: 1.4;
            ">
              <strong>OPSEC Notice:</strong> Production Survey Vault implements geo-targeting,
              device fingerprinting, and real-time compliance verification. Offers execute
              through encrypted redirect chains with full attribution tracking.
            </div>
          </section>

          <!-- Action grid with improved semantics -->
          <section style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
          ">
            <article style="
              background: #121820;
              border-radius: 8px;
              padding: 1.5rem;
              border: 1px solid rgba(88, 166, 255, 0.2);
            ">
              <h3 style="
                font-family: 'Space Mono', monospace;
                font-weight: 700;
                color: #ff7b72;
                margin-bottom: 0.75rem;
                font-size: 1rem;
              ">
                Strategy Hub
              </h3>
              <p style="
                color: rgba(230, 237, 243, 0.8);
                margin-bottom: 1rem;
                font-size: 0.875rem;
                line-height: 1.4;
              ">
                Access core monetization frameworks and implementation guides.
              </p>
              <a href="/strategy" style="
                display: inline-block;
                background: transparent;
                border: 1px solid #ff7b72;
                color: #ff7b72;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.875rem;
              ">
                Access Systems
              </a>
            </article>

            <article style="
              background: #121820;
              border-radius: 8px;
              padding: 1.5rem;
              border: 1px solid rgba(88, 166, 255, 0.2);
            ">
              <h3 style="
                font-family: 'Space Mono', monospace;
                font-weight: 700;
                color: #ff7b72;
                margin-bottom: 0.75rem;
                font-size: 1rem;
              ">
                Vault Preview
              </h3>
              <p style="
                color: rgba(230, 237, 243, 0.8);
                margin-bottom: 1rem;
                font-size: 0.875rem;
                line-height: 1.4;
              ">
                Sample prompt systems and conversion optimization tools.
              </p>
              <a href="/vault" style="
                display: inline-block;
                background: transparent;
                border: 1px solid #ff7b72;
                color: #ff7b72;
                padding: 0.75rem 1.5rem;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                font-size: 0.875rem;
              ">
                Explore Vault
              </a>
            </article>
          </section>

          <!-- Optimized CTA -->
          <div style="text-align: center;">
            <a href="/" style="
              display: inline-block;
              background: #ff7b72;
              color: #0a0e12;
              padding: 1rem 2rem;
              border-radius: 6px;
              text-decoration: none;
              font-weight: 600;
              font-size: 1rem;
              box-shadow: 0 2px 8px rgba(255, 123, 114, 0.2);
            ">
              Return to Command Center
            </a>
          </div>
        </div>
      </div>
    `;

    return new Response(baseTemplate(content, {
      page: 'survey-vault',
      title: 'Survey Vault - AIQBrain',
      description: 'Exclusive operator access portal for AIQBrain monetization systems.'
    }), {
      headers: {
        'Content-Type': 'text/html',
        ...SECURITY_HEADERS
      }
    });
  }

  // Production environment: Optimized secure redirect
  const redirectParams = new URLSearchParams({
    source: 'sv',
    device: deviceType,
    timestamp: Date.now().toString(),
    ...Object.fromEntries(trackingParams)
  });

  const targetUrl = `https://trkr.aiqbrain.com/redirect?${redirectParams.toString()}`;

  return new Response(null, {
    status: 302,
    headers: {
      'Location': targetUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Robots-Tag': 'noindex, nofollow',
      ...SECURITY_HEADERS
    }
  });
}
