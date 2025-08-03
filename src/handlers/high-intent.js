/**
 * High Intent Handler - Premium Monetization Portal
 * Enhanced with performance optimizations, security hardening, and semantic structure
 */
import { baseTemplate } from '../templates/base.js';

// Configuration constants
const SECURITY_HEADERS = Object.freeze({
  'Content-Type': 'text/html',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'private, max-age=300',
  'X-Robots-Tag': 'noindex, nofollow'
});
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E')";
const QUALIFIED_REFERRERS = Object.freeze(['reddit.com', 'discord.com', 'aiqbrain.com']);

export async function highIntentHandler(request, env) {
  const { headers } = request;
  const userAgent = headers.get('User-Agent') || '';
  const cfCountry = headers.get('CF-IPCountry') || 'US';
  const referrer = headers.get('Referer') || '';

  // Optimized device detection
  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);

  // Traffic qualification scoring
  const isQualifiedReferrer = QUALIFIED_REFERRERS.some(domain => referrer.includes(domain));
  const showPremiumMetrics = isQualifiedReferrer;
  const deviceOptimized = isMobile ? 'Mobile-First' : 'Desktop-Optimized';

  // Semantic HTML structure with optimized CSS
  const content = `
    <div class="high-intent-container" style="
      min-height:100vh;
      background:#0a0e12;
      color:#e6edf3;
      font-family:'Inter Tight',sans-serif;
      position:relative;
      overflow-x:hidden;
      -webkit-tap-highlight-color:transparent;
    ">
      <!-- Neural network background pattern -->
      <div class="neural-pattern" style="
        position:fixed;
        inset:0;
        opacity:0.03;
        pointer-events:none;
        z-index:0;
        background-image:${NEURAL_PATTERN};
        background-size:50px 50px;
      "></div>

      <main style="position:relative;z-index:1;max-width:1000px;margin:0 auto;padding:2rem 1rem;">

        <!-- Qualification Header -->
        <header style="margin-bottom:3rem;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(249,199,79,0.1);padding:0.5rem 1rem;border-radius:6px;border:1px solid rgba(249,199,79,0.3);margin-bottom:1.5rem;">
            <span style="color:#f9c74f;font-size:0.875rem;">🎯</span>
            <span style="color:#f9c74f;font-size:0.875rem;font-family:'Inter Tight',sans-serif;font-weight:600;">High-Intent Operator Track</span>
          </div>

          <h1 style="font-family:'Space Mono',monospace;font-weight:700;font-size:${isMobile ? '2rem' : '3rem'};color:#e6edf3;margin:0 0 1rem 0;line-height:1.1;">
            Precision-Targeted<br/>
            <span style="color:#ff7b72;">Revenue Activation</span>
          </h1>

          <p style="font-family:'Inter Tight',sans-serif;font-size:1.25rem;color:rgba(230,237,243,0.8);max-width:600px;margin:0 auto;line-height:1.5;">
            Advanced monetization systems for operators managing high-velocity traffic with
            <span style="color:#58a6ff;font-weight:600;">compliant conversion frameworks</span> and
            <span style="color:#ff7b72;font-weight:600;">risk-minimized scaling protocols</span>.
          </p>
        </header>

        <!-- Traffic Intelligence Display -->
        <section style="margin-bottom:3rem;">
          <div style="background:linear-gradient(135deg,rgba(88,166,255,0.1),rgba(255,123,114,0.1));border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.3);">
            <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(3,1fr)'};gap:1rem;text-align:center;">
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:1.125rem;color:#58a6ff;font-weight:700;">GEO</div>
                <div style="font-family:'Inter Tight',sans-serif;color:#e6edf3;font-weight:600;">${cfCountry}</div>
              </div>
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:1.125rem;color:#58a6ff;font-weight:700;">DEVICE</div>
                <div style="font-family:'Inter Tight',sans-serif;color:#e6edf3;font-weight:600;">${deviceOptimized}</div>
              </div>
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:1.125rem;color:#58a6ff;font-weight:700;">STATUS</div>
                <div style="font-family:'Inter Tight',sans-serif;color:${isQualifiedReferrer ? '#56d364' : '#f9c74f'};font-weight:600;">
                  ${isQualifiedReferrer ? 'Qualified' : 'Evaluating'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Core Value Propositions -->
        <section style="margin-bottom:3rem;">
          <h2 style="font-family:'Space Mono',monospace;font-weight:700;font-size:1.5rem;color:#e6edf3;margin-bottom:1.5rem;text-align:center;">
            Advanced Implementation Framework
          </h2>

          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(2,1fr)'};gap:1.5rem;">

            <!-- Elite Offer Management -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">🎯</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Elite Offer Rotation
                </h3>
              </div>
              <ul style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.6;margin:0;padding-left:1.25rem;">
                <li style="margin-bottom:0.5rem;">Dynamic CPA network integration with real-time payout optimization</li>
                <li style="margin-bottom:0.5rem;">Geo-intelligent offer matching for maximum conversion velocity</li>
                <li style="margin-bottom:0.5rem;">A/B/C testing framework with statistical significance tracking</li>
              </ul>
            </article>

            <!-- Traffic Optimization -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">📊</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Conversion Intelligence
                </h3>
              </div>
              <ul style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.6;margin:0;padding-left:1.25rem;">
                <li style="margin-bottom:0.5rem;">Reddit-optimized funnel sequences with comment integration</li>
                <li style="margin-bottom:0.5rem;">Mobile-first progressive web app conversion paths</li>
                <li style="margin-bottom:0.5rem;">SEO-compliant content frameworks for organic qualification</li>
              </ul>
            </article>

            <!-- Compliance & Risk -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">🛡️</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Risk-Minimized Operations
                </h3>
              </div>
              <ul style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.6;margin:0;padding-left:1.25rem;">
                <li style="margin-bottom:0.5rem;">Platform TOS compliance monitoring with automated alerts</li>
                <li style="margin-bottom:0.5rem;">Multi-layered cloaking with quality score preservation</li>
                <li style="margin-bottom:0.5rem;">Account safety protocols and ban recovery procedures</li>
              </ul>
            </article>

            <!-- Dashboard & Analytics -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">⚡</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Operator Dashboard
                </h3>
              </div>
              <ul style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.6;margin:0;padding-left:1.25rem;">
                <li style="margin-bottom:0.5rem;">Real-time conversion tracking with attribution modeling</li>
                <li style="margin-bottom:0.5rem;">Performance alerts and optimization recommendations</li>
                <li style="margin-bottom:0.5rem;">Instant vault upgrades and system deployment tools</li>
              </ul>
            </article>

          </div>
        </section>

        ${showPremiumMetrics ? `
        <!-- Performance Benchmarks (Qualified Traffic Only) -->
        <section style="margin-bottom:3rem;">
          <div style="background:linear-gradient(135deg,rgba(255,123,114,0.1),rgba(88,166,255,0.1));border-radius:8px;padding:2rem;border:1px solid rgba(255,123,114,0.3);">
            <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin-bottom:1.5rem;font-size:1.25rem;text-align:center;">
              Qualified Operator Benchmarks
            </h3>
            <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(4,1fr)'};gap:1.5rem;text-align:center;">
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#ff7b72;">27.4%</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">Avg. Conversion Rate</div>
              </div>
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#58a6ff;">$284</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">Daily Revenue/Operator</div>
              </div>
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#f9c74f;">42%</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">CPA Improvement</div>
              </div>
              <div>
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#56d364;">99.2%</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">Account Safety Rate</div>
              </div>
            </div>
          </div>
        </section>
        ` : ''}

        <!-- Primary CTA Section -->
        <section style="margin-bottom:3rem;">
          <div style="background:linear-gradient(135deg,#ff7b72,#ff9580);border-radius:8px;padding:3rem 2rem;text-align:center;position:relative;overflow:hidden;">
            <div style="position:relative;z-index:1;">
              <h2 style="font-family:'Space Mono',monospace;font-weight:700;font-size:${isMobile ? '1.5rem' : '2rem'};color:#0a0e12;margin:0 0 1rem 0;line-height:1.2;">
                Activate High-Intent Revenue Systems
              </h2>
              <p style="font-family:'Inter Tight',sans-serif;font-size:1.125rem;color:rgba(10,14,18,0.8);margin:0 0 2rem 0;max-width:500px;margin-inline:auto;">
                Deploy battle-tested conversion frameworks with full compliance monitoring and operator-level support.
              </p>

              <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
                <a href="/vault" style="
                  display:inline-flex;
                  align-items:center;
                  gap:0.5rem;
                  background:#0a0e12;
                  color:#ff7b72;
                  padding:1rem 2rem;
                  border-radius:6px;
                  text-decoration:none;
                  font-family:'Inter Tight',sans-serif;
                  font-weight:700;
                  font-size:1.125rem;
                  border:2px solid #0a0e12;
                ">
                  <span>Request Vault Access</span>
                  <span>→</span>
                </a>

                <a href="/strategy" style="
                  display:inline-flex;
                  align-items:center;
                  gap:0.5rem;
                  background:transparent;
                  color:#0a0e12;
                  padding:1rem 2rem;
                  border-radius:6px;
                  text-decoration:none;
                  font-family:'Inter Tight',sans-serif;
                  font-weight:600;
                  border:2px solid #0a0e12;
                ">
                  <span>View Framework Overview</span>
                </a>
              </div>

              <p style="font-family:'Space Mono',monospace;color:rgba(10,14,18,0.7);font-size:0.875rem;margin:1.5rem 0 0 0;">
                🔒 Invitation-based access • Operator verification required
              </p>
            </div>
          </div>
        </section>

        <!-- Trust Signals & Compliance -->
        <section style="margin-bottom:3rem;">
          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : '1fr 2fr'};gap:2rem;align-items:center;">

            <!-- Compliance Badge -->
            <div style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);text-align:center;">
              <div aria-hidden="true" style="font-size:2rem;margin-bottom:0.5rem;">🛡️</div>
              <div style="font-family:'Space Mono',monospace;font-weight:700;color:#58a6ff;font-size:1rem;margin-bottom:0.5rem;">
                COMPLIANCE VERIFIED
              </div>
              <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">
                TOS-Aligned • Risk Audited • Continuously Monitored
              </div>
            </div>

            <!-- Operator Testimonial -->
            <div style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);">
              <blockquote style="font-family:'Inter Tight',sans-serif;font-size:1.125rem;color:#e6edf3;line-height:1.6;margin:0 0 1rem 0;font-style:italic;">
                "AIQBrain's high-intent framework delivered consistent $200+ daily results within the first week of deployment. Zero platform violations, zero account restrictions. The compliance monitoring alone is worth the access."
              </blockquote>
              <cite style="font-family:'Space Mono',monospace;color:rgba(230,237,243,0.7);font-size:0.875rem;font-style:normal;">
                — Performance Marketing Operator, ${cfCountry === 'US' ? 'United States' : cfCountry}
              </cite>
            </div>

          </div>
        </section>

        <!-- Secondary Actions -->
        <section style="margin-bottom:3rem;">
          <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
            <a href="/results" style="
              color:#58a6ff;
              text-decoration:none;
              font-family:'Inter Tight',sans-serif;
              font-weight:600;
              padding:0.75rem 1.5rem;
              border:1px solid rgba(88,166,255,0.3);
              border-radius:6px;
            ">
              View Operator Results →
            </a>
            <a href="/ops" style="
              color:rgba(230,237,243,0.8);
              text-decoration:none;
              font-family:'Inter Tight',sans-serif;
              font-weight:600;
              padding:0.75rem 1.5rem;
            ">
              OPSEC Guidelines
            </a>
            <a href="/" style="
              color:rgba(230,237,243,0.8);
              text-decoration:none;
              font-family:'Inter Tight',sans-serif;
              font-weight:600;
              padding:0.75rem 1.5rem;
            ">
              Return to Hub
            </a>
          </div>
        </section>

        <!-- Footer Disclaimer -->
        <footer style="border-top:1px solid rgba(88,166,255,0.2);padding-top:2rem;text-align:center;">
          <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.6);font-size:0.875rem;line-height:1.5;max-width:600px;margin:0 auto;">
            <strong>Compliance Notice:</strong> All systems operate within platform terms of service. Results vary based on implementation quality, traffic sources, and market conditions. Revenue projections are based on qualified operator performance and are not guaranteed. Operator verification and compliance acknowledgment required for access.
          </p>

          <div style="margin-top:1.5rem;">
            <a href="/compliance" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Compliance Framework</a>
            <a href="/terms" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Terms of Access</a>
            <a href="/privacy" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Privacy Policy</a>
          </div>

          <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.6);font-size:0.75rem;margin:1rem 0 0 0;">
            © ${new Date().getFullYear()} AIQBrain.com — Independent AI monetization resource, not affiliated with Anthropic or mentioned platforms.
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
    page: 'high-intent',
    title: 'High-Intent Revenue Activation — AIQBrain',
    description: 'Precision-targeted monetization systems for qualified operators with compliant conversion frameworks',
    additionalHead: `
      <meta name="robots" content="noindex, nofollow">
    `
  }), {
    headers: SECURITY_HEADERS
  });
}
