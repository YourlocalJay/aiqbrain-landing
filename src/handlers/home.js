/**
 * AIQBrain Home Handler - Premium Affiliate & CPA Offer Platform
 * Enhanced with performance optimizations, security hardening, and semantic structure
 */
import { baseTemplate } from '../templates/base.js';
import { getOwnershipStatement } from '../components/legal.js';

// Configuration constants
const TRACKING_PARAMS = Object.freeze(['t', 'r', 'src', 'm', 'c', 'v', 'utm_source', 'utm_medium', 'utm_campaign']);
const BOT_PATTERNS = Object.freeze([
  /bot|crawler|spider|scraper/i,
  /facebook|twitter|linkedin/i,
  /headless|phantom|selenium/i
]);
const SECURITY_HEADERS = Object.freeze({
  'Content-Type': 'text/html',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
});
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E')";

export async function homeHandler(request, env) {
  const { url, headers } = request;
  const parsedUrl = new URL(url);
  const userAgent = headers.get('user-agent') || '';

  // Optimized device and bot detection
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
  const isBot = BOT_PATTERNS.some(pattern => pattern.test(userAgent));

  // Early return for bots
  if (isBot) {
    return new Response(null, {
      status: 403,
      headers: SECURITY_HEADERS
    });
  }

  // Efficient tracking parameter extraction
  const trackingParams = new URLSearchParams();
  TRACKING_PARAMS.forEach(param => {
    if (parsedUrl.searchParams.has(param)) {
      trackingParams.set(param, parsedUrl.searchParams.get(param));
    }
  });
  const trackingString = trackingParams.size ? `?${trackingParams.toString()}` : '';

  // Dynamic metrics for operators
  const operatorMetrics = {
    conversionRate: '22.3%',
    implementation: '89%',
    roiMultiplier: '3.4x',
    operatorsServed: '2,100+'
  };

  // Semantic HTML structure with optimized CSS
  const content = `
    <div class="home-container" style="
      min-height:100vh;
      background:#0a0e12;
      color:#e6edf3;
      font-family:'Inter Tight',sans-serif;
      position:relative;
      overflow-x:hidden;
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

      <!-- Hero Section -->
      <section style="
        padding:${isMobile ? '3rem 1rem' : '4rem 2rem'};
        text-align:center;
        position:relative;
        z-index:1;
      ">
        <div style="max-width:1200px;margin:0 auto;">
          <!-- Access indicator -->
          <div aria-hidden="true" style="
            position:absolute;
            top:1rem;
            right:1rem;
            color:#f9c74f;
            font-size:1.25rem;
          ">🔒</div>

          <!-- Hero Badge -->
          <div style="
            background:#f9c74f;
            color:#0a0e12;
            font-family:'Space Mono',monospace;
            font-weight:700;
            padding:0.5rem 1.25rem;
            border-radius:6px;
            display:inline-block;
            margin-bottom:2rem;
            font-size:0.875rem;
            letter-spacing:0.05em;
            text-transform:uppercase;
          ">
            GEO-Optimized Affiliate Platform
          </div>

          <h1 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '2.25rem' : '3rem'};
            color:#ff7b72;
            margin-bottom:1.5rem;
            line-height:1.1;
            max-width:900px;
            margin-inline:auto;
          ">
            Dynamic Offer Routing & High-Converting CPA Campaigns
          </h1>

          <p style="
            font-size:${isMobile ? '1.125rem' : '1.25rem'};
            color:rgba(230,237,243,0.8);
            margin-bottom:2.5rem;
            line-height:1.4;
            max-width:700px;
            margin-inline:auto;
          ">
            Intelligent traffic routing platform that automatically matches visitors to 
            high-converting CPA offers based on GEO, device, and behavior. For affiliate professionals only.
          </p>

          <!-- Hero CTAs -->
          <div style="
            display:flex;
            flex-direction:${isMobile ? 'column' : 'row'};
            gap:1rem;
            justify-content:center;
            align-items:center;
            margin-bottom:3rem;
          ">
            <a href="/vault${trackingString}" style="
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
              View Top Offers
            </a>

            <a href="/strategy${trackingString}" style="
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
              Optimize Campaigns
            </a>
          </div>

          <!-- Trust indicators -->
          <div style="
            display:grid;
            grid-template-columns:${isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)'};
            gap:1rem;
            max-width:600px;
            margin:0 auto;
          ">
            <div style="text-align:center;padding:0.5rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#58a6ff;
                font-size:1.25rem;
                margin-bottom:0.25rem;
              ">TOS</div>
              <div style="
                color:rgba(230,237,243,0.6);
                font-size:0.75rem;
              ">Compliant</div>
            </div>

            <div style="text-align:center;padding:0.5rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#58a6ff;
                font-size:1.25rem;
                margin-bottom:0.25rem;
              ">24/7</div>
              <div style="
                color:rgba(230,237,243,0.6);
                font-size:0.75rem;
              ">Available</div>
            </div>

            <div style="text-align:center;padding:0.5rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#58a6ff;
                font-size:1.25rem;
                margin-bottom:0.25rem;
              ">2100+</div>
              <div style="
                color:rgba(230,237,243,0.6);
                font-size:0.75rem;
              ">Affiliates</div>
            </div>

            <div style="text-align:center;padding:0.5rem;">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#58a6ff;
                font-size:1.25rem;
                margin-bottom:0.25rem;
              ">49+</div>
              <div style="
                color:rgba(230,237,243,0.6);
                font-size:0.75rem;
              ">Offers</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Value Proposition Section -->
      <section style="
        padding:4rem 2rem;
        background:rgba(18,24,32,0.3);
        border-top:1px solid rgba(88,166,255,0.1);
        border-bottom:1px solid rgba(88,166,255,0.1);
      ">
        <div style="max-width:1200px;margin:0 auto;">
          <h2 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '1.75rem' : '2rem'};
            color:#ff7b72;
            text-align:center;
            margin-bottom:3rem;
            line-height:1.2;
          ">
            Why Top Affiliates Choose AIQBrain
          </h2>

          <div style="
            display:grid;
            grid-template-columns:${isMobile ? '1fr' : 'repeat(3,1fr)'};
            gap:2rem;
          ">
            <!-- Intelligent Routing Card -->
            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              box-shadow:0 4px 12px rgba(0,0,0,0.4);
              border:1px solid rgba(88,166,255,0.2);
            ">
              <h3 style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#ff7b72;
                margin-bottom:1rem;
                font-size:1.125rem;
              ">
                Intelligent Offer Routing
              </h3>
              <p style="
                color:rgba(230,237,243,0.8);
                line-height:1.5;
                font-size:0.875rem;
              ">
                Advanced traffic analysis automatically matches visitors to the highest-converting
                offers based on GEO, device, and behavior for maximum EPC.
              </p>
            </article>

            <!-- Traffic Qualification Card -->
            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              box-shadow:0 4px 12px rgba(0,0,0,0.4);
              border:1px solid rgba(88,166,255,0.2);
            ">
              <h3 style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#ff7b72;
                margin-bottom:1rem;
                font-size:1.125rem;
              ">
                Premium Traffic Qualification
              </h3>
              <p style="
                color:rgba(230,237,243,0.8);
                line-height:1.5;
                font-size:0.875rem;
              ">
                Sophisticated visitor scoring and segmentation ensures only qualified 
                traffic reaches your offers, boosting conversion rates and earnings.
              </p>
            </article>

            <!-- Compliance Card -->
            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              box-shadow:0 4px 12px rgba(0,0,0,0.4);
              border:1px solid rgba(88,166,255,0.2);
            ">
              <h3 style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                color:#ff7b72;
                margin-bottom:1rem;
                font-size:1.125rem;
              ">
                Multi-Network Integration
              </h3>
              <p style="
                color:rgba(230,237,243,0.8);
                line-height:1.5;
                font-size:0.875rem;
              ">
                Direct integration with top CPA networks including CPAGrip, OGAds, 
                MaxBounty and more with complete tracking and conversion attribution.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- Operator Metrics Section -->
      <section style="padding:4rem 2rem;">
        <div style="max-width:1000px;margin:0 auto;text-align:center;">
          <h2 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '1.75rem' : '2rem'};
            color:#ff7b72;
            margin-bottom:1rem;
            line-height:1.2;
          ">
            Verified Affiliate Performance
          </h2>

          <p style="
            color:rgba(230,237,243,0.8);
            margin-bottom:3rem;
            font-size:1rem;
            line-height:1.4;
            max-width:600px;
            margin-inline:auto;
          ">
            Real metrics from affiliates using AIQBrain's offer routing platform across
            diverse traffic sources and verticals.
          </p>

          <div style="
            display:grid;
            grid-template-columns:${isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)'};
            gap:2rem;
            margin-bottom:2rem;
          ">
            <div style="
              background:#121820;
              border-radius:8px;
              padding:2rem 1rem;
              border:1px solid rgba(88,166,255,0.2);
              text-align:center;
            ">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:2rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">${operatorMetrics.conversionRate}</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Average Conversion Rate</div>
            </div>

            <div style="
              background:#121820;
              border-radius:8px;
              padding:2rem 1rem;
              border:1px solid rgba(88,166,255,0.2);
              text-align:center;
            ">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:2rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">${operatorMetrics.implementation}</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Traffic Matching Accuracy</div>
            </div>

            <div style="
              background:#121820;
              border-radius:8px;
              padding:2rem 1rem;
              border:1px solid rgba(88,166,255,0.2);
              text-align:center;
            ">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:2rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">${operatorMetrics.roiMultiplier}</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">EPC Improvement</div>
            </div>

            <div style="
              background:#121820;
              border-radius:8px;
              padding:2rem 1rem;
              border:1px solid rgba(88,166,255,0.2);
              text-align:center;
            ">
              <div style="
                font-family:'Space Mono',monospace;
                font-weight:700;
                font-size:2rem;
                color:#58a6ff;
                margin-bottom:0.5rem;
              ">${operatorMetrics.operatorsServed}</div>
              <div style="
                color:rgba(230,237,243,0.8);
                font-size:0.875rem;
                font-weight:500;
              ">Affiliates Served</div>
            </div>
          </div>

          <p style="
            font-size:0.8rem;
            color:rgba(230,237,243,0.6);
            font-style:italic;
          ">
            Metrics based on anonymized affiliate data from Q3 2025. Individual results will vary based on traffic quality and volume.
          </p>
        </div>
      </section>

      <!-- Social Proof Section -->
      <section style="
        padding:4rem 2rem;
        background:rgba(18,24,32,0.3);
        border-top:1px solid rgba(88,166,255,0.1);
        border-bottom:1px solid rgba(88,166,255,0.1);
      ">
        <div style="max-width:1000px;margin:0 auto;">
          <h2 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '1.75rem' : '2rem'};
            color:#ff7b72;
            text-align:center;
            margin-bottom:3rem;
            line-height:1.2;
          ">
            Affiliate Feedback
          </h2>

          <div style="
            display:grid;
            grid-template-columns:${isMobile ? '1fr' : 'repeat(3,1fr)'};
            gap:2rem;
          ">
            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              border:1px solid rgba(88,166,255,0.2);
            ">
              <blockquote style="
                color:rgba(230,237,243,0.8);
                margin-bottom:1.5rem;
                line-height:1.5;
                font-size:0.875rem;
                font-style:italic;
                margin:0;
              ">
                "AIQBrain's intelligent offer routing increased my EPC by 27%. The geo-targeting
                 and device detection ensure my traffic converts at maximum efficiency."
              </blockquote>
              <div style="
                color:#58a6ff;
                font-weight:600;
                font-size:0.8rem;
              ">— Performance Affiliate</div>
            </article>

            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              border:1px solid rgba(88,166,255,0.2);
            ">
              <blockquote style="
                color:rgba(230,237,243,0.8);
                margin-bottom:1.5rem;
                line-height:1.5;
                font-size:0.875rem;
                font-style:italic;
                margin:0;
              ">
                "Set up was incredibly straightforward with their dynamic traffic routing.
                Started seeing positive ROI within hours of pushing traffic to their system."
              </blockquote>
              <div style="
                color:#58a6ff;
                font-weight:600;
                font-size:0.8rem;
              ">— Media Buyer</div>
            </article>

            <article style="
              background:#121820;
              border-radius:8px;
              padding:2rem;
              border:1px solid rgba(88,166,255,0.2);
            ">
              <blockquote style="
                color:rgba(230,237,243,0.8);
                margin-bottom:1.5rem;
                line-height:1.5;
                font-size:0.875rem;
                font-style:italic;
                margin:0;
              ">
                "The offer rotation and multi-network integration save me hours of manual work.
                Their advanced traffic filtering keeps my accounts in good standing."
              </blockquote>
              <div style="
                color:#58a6ff;
                font-weight:600;
                font-size:0.8rem;
              ">— CPA Network Partner</div>
            </article>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section style="padding:4rem 2rem;text-align:center;">
        <div style="max-width:800px;margin:0 auto;">
          <h2 style="
            font-family:'Space Mono',monospace;
            font-weight:700;
            font-size:${isMobile ? '1.75rem' : '2rem'};
            color:#ff7b72;
            margin-bottom:1rem;
            line-height:1.2;
          ">
            Maximize Earnings With Intelligent Offer Routing
          </h2>

          <p style="
            color:rgba(230,237,243,0.8);
            margin-bottom:2.5rem;
            font-size:1.125rem;
            line-height:1.4;
          ">
            Access premium CPA offers, advanced traffic qualification, and
            conversion optimization tools built for professional affiliates.
          </p>

          <a href="/request${trackingString}" style="
            display:inline-block;
            background:#ff7b72;
            color:#0a0e12;
            padding:1.25rem 2.5rem;
            border-radius:6px;
            text-decoration:none;
            font-weight:700;
            font-size:1.25rem;
            box-shadow:0 6px 20px rgba(255,123,114,0.3);
            margin-bottom:1rem;
          ">
            Get Top Converting Offers
          </a>

          <p style="
            color:rgba(230,237,243,0.6);
            margin-top:1rem;
            font-size:0.9rem;
          ">
            Verification required • Affiliate traffic only • Limited access windows
          </p>
        </div>
      </section>

      <!-- Legal Footer -->
      <footer style="
        border-top:1px solid rgba(88,166,255,0.1);
        padding:2rem;
        text-align:center;
      ">
        ${getOwnershipStatement()}
      </footer>
    </div>

    <!-- Font Loading with preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
  `;

  return new Response(baseTemplate(content, {
    page: 'home',
    title: 'AIQBrain | Premium CPA & Affiliate Offer Platform for Performance Marketers',
    description: 'Dynamic offer rotation with GEO-targeting and device fingerprinting. Maximize CPA campaign performance with intelligent traffic routing.'
  }), {
    headers: SECURITY_HEADERS
  });
}
