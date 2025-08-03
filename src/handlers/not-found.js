/**
 * AIQBrain Vault Handler - Premium Monetization Portal
 * Enhanced with performance optimizations, security hardening, and semantic structure
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
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E')";

export async function vaultHandler(request, env) {
  const { url, headers } = request;
  const parsedUrl = new URL(url);
  const userAgent = headers.get('user-agent') || '';

  // Optimized device detection
  const isMobile = /mobi|android|iphone|ipad/i.test(userAgent.toLowerCase());
  const deviceClass = isMobile ? 'mobile' : 'desktop';

  // Dynamic urgency calculation
  const spotsLeft = env.URGENCY_SPOTS_LEFT || Math.floor(Math.random() * 8) + 3;
  const showUrgency = spotsLeft <= 10;

  // Efficient tracking parameter extraction
  const trackingParams = new URLSearchParams();
  TRACKING_PARAMS.forEach(param => {
    if (parsedUrl.searchParams.has(param)) {
      trackingParams.set(param, parsedUrl.searchParams.get(param));
    }
  });
  const trackingString = trackingParams.size ? `?${trackingParams.toString()}` : '';

  // Semantic HTML structure with optimized CSS
  const content = `
    <div class="vault-container" style="
      min-height:100vh;
      background:#0a0e12;
      color:#e6edf3;
      font-family:'Inter Tight',sans-serif;
      position:relative;
      overflow:hidden;
    ">
      <!-- Neural pattern background -->
      <div class="neural-pattern" style="
        position:absolute;
        inset:0;
        opacity:0.05;
        pointer-events:none;
        background-image:${NEURAL_PATTERN};
        background-size:50px 50px;
      "></div>

      ${showUrgency ? `
      <!-- Urgency Banner -->
      <div class="urgency-banner" style="
        background:linear-gradient(90deg,#f9c74f 0%,#f8c537 100%);
        color:#0a0e12;
        font-family:'Space Mono',monospace;
        font-weight:700;
        padding:0.75rem 1rem;
        text-align:center;
        font-size:0.875rem;
        letter-spacing:0.05em;
        position:relative;
        z-index:10;
        box-shadow:0 2px 8px rgba(249,199,79,0.3);
      ">
        ⚡ OPERATOR ALERT: ${spotsLeft} vault access slots remaining - Advanced systems only
      </div>
      ` : ''}

      <!-- Main Content Container -->
      <main style="
        max-width:1200px;
        margin:0 auto;
        padding:${showUrgency ? '2rem' : '3rem'} 2rem;
        position:relative;
        z-index:1;
      ">
        <!-- Access Badge -->
        <div aria-hidden="true" style="
          position:absolute;
          top:1rem;
          right:1rem;
          color:#f9c74f;
          font-size:1.25rem;
        ">🔒</div>

        <!-- Hero Section -->
        <header style="text-align:center;margin-bottom:4rem;padding-top:1rem;">
          <div class="pro-badge" style="
            background:#f9c74f;
            color:#0a0e12;
            font-family:'Space Mono',monospace;
            font-weight:700;
            padding:0.5rem 1.25rem;
            border-radius:6px;
            display:inline-block;
            margin-bottom:1.5rem;
            font-size:0.875rem;
            letter-spacing:0.05em;
            text-transform:uppercase;
          ">
            Claude Monetization Vault
          </div>

          <h1 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '2.25rem' : '3rem'};
            color:#ff7b72;
            margin-bottom:1rem;
            line-height:1.1;
          ">
            Exclusive Operator Systems
          </h1>

          <p style="
            font-size:${isMobile ? '1rem' : '1.25rem'};
            color:rgba(230,237,243,0.8);
            margin-bottom:2.5rem;
            line-height:1.4;
            max-width:600px;
            margin-inline:auto;
          ">
            Battle-tested Claude monetization frameworks, stealth optimization protocols,
            and TOS-compliant revenue systems for sophisticated operators.
          </p>

          <!-- Primary CTA Section -->
          <div style="
            display:flex;
            flex-direction:${isMobile ? 'column' : 'row'};
            gap:1rem;
            justify-content:center;
            align-items:center;
            margin-bottom:3rem;
          ">
            <a href="/vault/access${trackingString}" style="
              background:#ff7b72;
              color:#0a0e12;
              padding:1rem 2rem;
              border-radius:6px;
              text-decoration:none;
              font-weight:600;
              font-size:1.125rem;
              box-shadow:0 4px 12px rgba(255,123,114,0.3);
              ${isMobile ? 'width:100%;text-align:center;' : ''}
            ">
              Request Vault Access
            </a>

            <a href="https://gumroad.com/masterclass${trackingString}" target="_blank" rel="noopener noreferrer" style="
              background:transparent;
              color:#ff7b72;
              border:1px solid #ff7b72;
              padding:1rem 2rem;
              border-radius:6px;
              text-decoration:none;
              font-weight:600;
              font-size:1.125rem;
              ${isMobile ? 'width:100%;text-align:center;' : ''}
            ">
              External Masterclass →
            </a>
          </div>

          <!-- Value Metrics -->
          <div style="
            display:grid;
            grid-template-columns:${isMobile ? '1fr' : 'repeat(3,1fr)'};
            gap:2rem;
            max-width:800px;
            margin:0 auto;
          ">
            <div style="text-align:center;padding:1rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:1.5rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">49+</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Claude Workflows</div>
            </div>

            <div style="text-align:center;padding:1rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:1.5rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">22.3%</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Avg Conversion Rate</div>
            </div>

            <div style="text-align:center;padding:1rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:1.5rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">TOS</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Compliant Systems</div>
            </div>
          </div>
        </header>

        <!-- System Preview Cards -->
        <section style="
          display:grid;
          grid-template-columns:${isMobile ? '1fr' : 'repeat(auto-fit,minmax(350px,1fr))'};
          gap:1.5rem;
          margin-bottom:3rem;
        ">
          <!-- Framework Card -->
          <article style="
            background:#121820;
            border-radius:8px;
            padding:2rem;
            box-shadow:0 4px 12px rgba(0,0,0,0.4);
            border:1px solid rgba(88,166,255,0.2);
          ">
            <h2 style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              color:#ff7b72;
              margin-bottom:1rem;
              font-size:1.125rem;
            ">
              Monetization Frameworks
            </h2>
            <p style="
              color:rgba(230,237,243,0.8);
              margin-bottom:1.5rem;
              line-height:1.5;
              font-size:0.875rem;
            ">
              Complete system architectures for CPA offers, affiliate funnels,
              and revenue optimization through Claude-powered automation.
            </p>
            <ul style="
              display:flex;
              flex-direction:column;
              gap:0.5rem;
              padding-left:1rem;
              margin:0;
            ">
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Traffic qualification protocols
              </li>
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Conversion velocity optimization
              </li>
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Compliance-first implementation
              </li>
            </ul>
          </article>

          <!-- Tools Card -->
          <article style="
            background:#121820;
            border-radius:8px;
            padding:2rem;
            box-shadow:0 4px 12px rgba(0,0,0,0.4);
            border:1px solid rgba(88,166,255,0.2);
          ">
            <h2 style="
              font-family:'Space Mono',monospace;
              font-weight:700;
              color:#ff7b72;
              margin-bottom:1rem;
              font-size:1.125rem;
            ">
              Implementation Tools
            </h2>
            <p style="
              color:rgba(230,237,243,0.8);
              margin-bottom:1.5rem;
              line-height:1.5;
              font-size:0.875rem;
            ">
              Prompt libraries, tracking templates, and optimization
              scripts verified by operators generating consistent revenue.
            </p>
            <ul style="
              display:flex;
              flex-direction:column;
              gap:0.5rem;
              padding-left:1rem;
              margin:0;
            ">
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Copy-paste prompt systems
              </li>
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Performance tracking setup
              </li>
              <li style="font-size:0.875rem;color:rgba(230,237,243,0.6);">
                Mobile-optimized delivery
              </li>
            </ul>
          </article>
        </section>

        <!-- Access Gate Notice -->
        <aside style="
          background:rgba(10,14,18,0.9);
          backdrop-filter:blur(8px);
          border:1px solid #f9c74f;
          border-radius:8px;
          padding:2rem;
          text-align:center;
          margin-bottom:2rem;
        ">
          <div aria-hidden="true" style="
            color:#f9c74f;
            font-size:2rem;
            margin-bottom:1rem;
          ">🔒</div>

          <h3 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            color:#ff7b72;
            margin-bottom:1rem;
            font-size:1.25rem;
          ">
            Operator Verification Required
          </h3>

          <p style="
            color:rgba(230,237,243,0.8);
            margin-bottom:1.5rem;
            line-height:1.5;
            max-width:500px;
            margin-inline:auto;
          ">
            Vault access is restricted to qualified operators with demonstrated
            performance marketing experience. Application process filters for
            technical competency and compliance understanding.
          </p>

          <a href="/request${trackingString}" style="
            display:inline-block;
            background:transparent;
            color:#f9c74f;
            border:1px solid #f9c74f;
            padding:0.75rem 1.5rem;
            border-radius:6px;
            text-decoration:none;
            font-weight:600;
          ">
            Submit Access Request
          </a>
        </aside>

        <!-- Footer -->
        <footer style="
          text-align:center;
          color:rgba(230,237,243,0.6);
          font-size:0.875rem;
          border-top:1px solid rgba(88,166,255,0.1);
          padding-top:2rem;
        ">
          <p>AIQBrain operates independently. We maintain standard user relationships with mentioned platforms.</p>
        </footer>
      </main>

      <!-- Font Loading -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
    </div>
  `;

  return new Response(baseTemplate(content, {
    title: 'Claude Monetization Vault | AIQBrain',
    description: 'Exclusive Claude monetization frameworks and TOS-compliant revenue systems for sophisticated operators.',
    page: 'vault'
  }), {
    status: 200,
    headers: SECURITY_HEADERS
  });
}
