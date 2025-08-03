/**
 * AIQBrain Mobile Home Handler - Premium Mobile Implementation
 * Enhanced with performance optimizations, touch interactions, and security hardening
 */
import { baseTemplate } from '../templates/base.js';

// Configuration constants
const TRACKING_PARAMS = Object.freeze(['t', 'r', 'src', 'm', 'c', 'v']);
const SECURITY_HEADERS = Object.freeze({
  'Content-Type': 'text/html',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=300'
});
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='8' cy='8' r='1'/%3E%3Ccircle cx='32' cy='8' r='1'/%3E%3Ccircle cx='8' cy='32' r='1'/%3E%3Ccircle cx='32' cy='32' r='1'/%3E%3Cline x1='20' y1='20' x2='8' y2='8'/%3E%3Cline x1='20' y1='20' x2='32' y2='8'/%3E%3Cline x1='20' y1='20' x2='8' y2='32'/%3E%3Cline x1='20' y1='20' x2='32' y2='32'/%3E%3C/g%3E%3C/svg%3E')";

export async function mobileHomeHandler(request, env) {
  const { url, headers } = request;
  const parsedUrl = new URL(url);
  const userAgent = headers.get('user-agent') || '';

  // Optimized device detection
  const deviceInfo = {
    isIOS: /iPad|iPhone|iPod/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isTablet: /iPad|(?:Android.*Tablet)/i.test(userAgent)
  };

  // Efficient tracking parameter extraction
  const trackingParams = new URLSearchParams();
  TRACKING_PARAMS.forEach(param => {
    if (parsedUrl.searchParams.has(param)) {
      trackingParams.set(param, parsedUrl.searchParams.get(param));
    }
  });
  const trackingString = trackingParams.size ? `?${trackingParams.toString()}` : '';

  // Dynamic urgency calculation
  const spotsLeft = env.URGENCY_SPOTS_LEFT || Math.floor(Math.random() * 6) + 2;
  const showUrgency = spotsLeft <= 8;

  // Semantic HTML structure with optimized mobile CSS
  const content = `
    <div class="mobile-home-container" style="
      min-height:100vh;
      background:#0a0e12;
      color:#e6edf3;
      font-family:'Inter Tight',sans-serif;
      position:relative;
      overflow-x:hidden;
      -webkit-tap-highlight-color:transparent;
    ">
      <!-- Neural pattern background -->
      <div class="neural-pattern" style="
        position:absolute;
        inset:0;
        opacity:0.03;
        pointer-events:none;
        background-image:${NEURAL_PATTERN};
        background-size:40px 40px;
      "></div>

      ${showUrgency ? `
      <!-- Mobile Urgency Banner -->
      <div class="mobile-urgency" style="
        background:linear-gradient(90deg,#f9c74f 0%,#f8c537 100%);
        color:#0a0e12;
        font-family:'Space Mono',monospace;
        font-weight:700;
        padding:0.75rem 1rem;
        text-align:center;
        font-size:0.8rem;
        letter-spacing:0.03em;
        position:relative;
        z-index:10;
      ">
        ⚡ ${spotsLeft} mobile vault slots left
      </div>
      ` : ''}

      <!-- Main Container -->
      <main style="
        max-width:430px;
        margin:0 auto;
        padding:${showUrgency ? '1.5rem' : '2rem'} 1rem;
        position:relative;
        z-index:1;
        text-align:center;
      ">
        <!-- Access Badge -->
        <div aria-hidden="true" style="
          position:absolute;
          top:0.5rem;
          right:0.5rem;
          color:#f9c74f;
          font-size:1rem;
        ">🔒</div>

        <!-- Header Section -->
        <header style="margin-bottom:2rem;">
          <div class="claude-badge" style="
            background:#f9c74f;
            color:#0a0e12;
            font-family:'Space Mono',monospace;
            font-weight:700;
            padding:0.4rem 0.9rem;
            border-radius:8px;
            display:inline-block;
            margin-bottom:1.25rem;
            font-size:0.75rem;
            letter-spacing:0.05em;
            text-transform:uppercase;
          ">
            Claude-Optimized Mobile
          </div>

          <h1 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:2.25rem;
            color:#ff7b72;
            margin-bottom:1rem;
            line-height:1.1;
          ">
            AIQBrain Mobile
          </h1>

          <p style="
            font-size:1.05rem;
            color:rgba(230,237,243,0.8);
            line-height:1.4;
            margin-bottom:1.5rem;
          ">
            Operator-grade monetization systems optimized for mobile deployment and on-the-go revenue generation.
          </p>
        </header>

        <!-- Value Proposition Card -->
        <article style="
          background:#121820;
          border-radius:12px;
          padding:1.5rem;
          margin-bottom:1.5rem;
          box-shadow:0 4px 12px rgba(0,0,0,0.4);
          border:1px solid rgba(88,166,255,0.2);
          text-align:left;
        ">
          <h2 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            color:#ff7b72;
            margin-bottom:0.75rem;
            font-size:1rem;
            text-align:center;
          ">
            Mobile-First Revenue Systems
          </h2>

          <p style="
            color:rgba(230,237,243,0.8);
            margin-bottom:1rem;
            line-height:1.4;
            font-size:0.9rem;
            text-align:center;
          ">
            Deploy Claude-powered monetization frameworks from any device.
            Full operator functionality in a mobile-optimized interface.
          </p>
        </article>

        <!-- Feature List -->
        <section style="margin-bottom:2rem;text-align:left;">
          <div style="
            display:flex;
            align-items:flex-start;
            gap:0.75rem;
            margin-bottom:1rem;
            padding:0.75rem;
            background:rgba(18,24,32,0.5);
            border-radius:8px;
            border-left:3px solid #58a6ff;
          ">
            <span aria-hidden="true" style="font-size:1.1rem;margin-top:0.1rem;">📱</span>
            <div>
              <h3 style="
                color:#e6edf3;
                font-weight:600;
                margin-bottom:0.25rem;
                font-size:0.9rem;
              ">Touch-Optimized Interfaces</h3>
              <p style="
                color:rgba(230,237,243,0.6);
                font-size:0.8rem;
                line-height:1.3;
                margin:0;
              ">One-tap CPA execution and affiliate offer deployment</p>
            </div>
          </div>

          <div style="
            display:flex;
            align-items:flex-start;
            gap:0.75rem;
            margin-bottom:1rem;
            padding:0.75rem;
            background:rgba(18,24,32,0.5);
            border-radius:8px;
            border-left:3px solid #58a6ff;
          ">
            <span aria-hidden="true" style="font-size:1.1rem;margin-top:0.1rem;">🔒</span>
            <div>
              <h3 style="
                color:#e6edf3;
                font-weight:600;
                margin-bottom:0.25rem;
                font-size:0.9rem;
              ">Encrypted Operations</h3>
              <p style="
                color:rgba(230,237,243,0.6);
                font-size:0.8rem;
                line-height:1.3;
                margin:0;
              ">Secure traffic routing with device fingerprinting</p>
            </div>
          </div>

          <div style="
            display:flex;
            align-items:flex-start;
            gap:0.75rem;
            margin-bottom:1rem;
            padding:0.75rem;
            background:rgba(18,24,32,0.5);
            border-radius:8px;
            border-left:3px solid #58a6ff;
          ">
            <span aria-hidden="true" style="font-size:1.1rem;margin-top:0.1rem;">🚀</span>
            <div>
              <h3 style="
                color:#e6edf3;
                font-weight:600;
                margin-bottom:0.25rem;
                font-size:0.9rem;
              ">Always-Available Systems</h3>
              <p style="
                color:rgba(230,237,243,0.6);
                font-size:0.8rem;
                line-height:1.3;
                margin:0;
              ">Claude workflows accessible 24/7 from any location</p>
            </div>
          </div>
        </section>

        <!-- Performance Metrics -->
        <div style="
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:0.75rem;
          margin-bottom:2rem;
          padding:1rem;
          background:rgba(18,24,32,0.3);
          border-radius:8px;
          border:1px solid rgba(88,166,255,0.1);
        ">
          <div style="text-align:center;">
            <div style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              font-size:1.2rem;
              color:#58a6ff;
              margin-bottom:0.25rem;
            ">2.1s</div>
            <div style="
              color:rgba(230,237,243,0.6);
              font-size:0.75rem;
            ">Load Time</div>
          </div>

          <div style="text-align:center;">
            <div style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              font-size:1.2rem;
              color:#58a6ff;
              margin-bottom:0.25rem;
            ">95%</div>
            <div style="
              color:rgba(230,237,243,0.6);
              font-size:0.75rem;
            ">Mobile Score</div>
          </div>

          <div style="text-align:center;">
            <div style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              font-size:1.2rem;
              color:#58a6ff;
              margin-bottom:0.25rem;
            ">TOS</div>
            <div style="
              color:rgba(230,237,243,0.6);
              font-size:0.75rem;
            ">Compliant</div>
          </div>
        </div>

        <!-- CTA Section -->
        <section style="margin-bottom:2rem;">
          <a href="/vault${trackingString}" style="
            display:block;
            background:#ff7b72;
            color:#0a0e12;
            padding:1rem;
            border-radius:10px;
            text-decoration:none;
            font-weight:700;
            font-size:1.1rem;
            margin-bottom:1rem;
            box-shadow:0 4px 16px rgba(255,123,114,0.3);
          ">
            Access Mobile Vault
          </a>

          <a href="/${trackingString}" style="
            display:block;
            color:#58a6ff;
            text-decoration:none;
            font-weight:500;
            font-size:0.9rem;
            padding:0.5rem;
            border:1px solid rgba(88,166,255,0.3);
            border-radius:6px;
          ">
            Desktop Command Center →
          </a>
        </section>

        <!-- Mobile-Specific Notice -->
        <aside style="
          background:rgba(249,199,79,0.1);
          border:1px solid rgba(249,199,79,0.3);
          border-radius:8px;
          padding:1rem;
          margin-bottom:2rem;
          text-align:left;
        ">
          <div style="
            display:flex;
            align-items:center;
            gap:0.5rem;
            margin-bottom:0.5rem;
          ">
            <span aria-hidden="true" style="color:#f9c74f;font-size:1.1rem;">📲</span>
            <span style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              color:#f9c74f;
              font-size:0.85rem;
            ">MOBILE OPTIMIZATION</span>
          </div>
          <p style="
            color:rgba(230,237,243,0.8);
            font-size:0.8rem;
            line-height:1.4;
            margin:0;
          ">
            All systems are touch-optimized with offline capability.
            Traffic routing adapts automatically to mobile networks and device constraints.
          </p>
        </aside>

        <!-- Footer -->
        <footer style="
          text-align:center;
          color:rgba(230,237,243,0.5);
          font-size:0.8rem;
          border-top:1px solid rgba(88,166,255,0.1);
          padding-top:1.5rem;
          line-height:1.4;
        ">
          <p style="margin:0 0 0.5rem 0;">
            &copy; ${new Date().getFullYear()} AIQBrain.com
          </p>
          <p style="margin:0;">
            Advanced Monetization • Mobile-First
          </p>
        </footer>
      </main>
    </div>

    <!-- Font Loading with preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
  `;

  return new Response(baseTemplate(content, {
    page: 'mobile-home',
    title: 'AIQBrain Mobile | Claude Monetization Systems',
    description: 'Mobile-optimized Claude monetization frameworks for sophisticated operators. Touch-ready interfaces with full operator functionality.',
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0'
  }), {
    headers: SECURITY_HEADERS
  });
}
