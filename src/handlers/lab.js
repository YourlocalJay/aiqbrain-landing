/**
 * Monetization Lab Handler - Premium Implementation Hub
 * Enhanced with performance optimizations, security hardening, and semantic structure
 */
import { baseTemplate } from '../templates/base.js';

// Configuration constants
const SECURITY_HEADERS = Object.freeze({
  'Content-Type': 'text/html',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=300'
});
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E')";

export async function labHandler(request, env) {
  const { headers } = request;
  const userAgent = headers.get('User-Agent') || '';
  const cfCountry = headers.get('CF-IPCountry') || 'US';

  // Optimized device detection
  const isMobile = /Mobile|Android|iPhone/i.test(userAgent);

  // Progressive disclosure
  const sessionDepth = headers.get('X-Session-Depth') || '1';
  const showAdvanced = parseInt(sessionDepth) > 2;

  // Semantic HTML structure with optimized CSS
  const content = `
    <div class="lab-container" style="
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
        position:fixed;
        inset:0;
        opacity:0.03;
        pointer-events:none;
        z-index:0;
        background-image:${NEURAL_PATTERN};
        background-size:50px 50px;
      "></div>

      <main style="position:relative;z-index:1;max-width:1200px;margin:0 auto;padding:2rem 1rem;">
        <!-- Header Section -->
        <header style="margin-bottom:3rem;">
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
            <div style="width:48px;height:48px;background:#ff7b72;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🧠</div>
            <div>
              <h1 style="font-family:'Space Mono',monospace;font-weight:700;font-size:${isMobile ? '1.75rem' : '2.5rem'};color:#e6edf3;margin:0;line-height:1.1;">
                Claude Monetization Lab
              </h1>
              <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);margin:0.5rem 0 0 0;font-size:1rem;">
                Implementation & Performance Optimization Hub
              </p>
            </div>
          </div>

          <!-- Access indicator -->
          <div style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(88,166,255,0.1);padding:0.5rem 1rem;border-radius:6px;border:1px solid rgba(88,166,255,0.3);">
            <span style="color:#58a6ff;font-size:0.875rem;">🔒</span>
            <span style="color:#58a6ff;font-size:0.875rem;font-family:'Inter Tight',sans-serif;font-weight:600;">Operator Access Required</span>
          </div>
        </header>

        <!-- Value Proposition -->
        <section style="margin-bottom:3rem;">
          <div style="background:#121820;border-radius:8px;padding:2rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
            <p style="font-family:'Inter Tight',sans-serif;font-size:1.125rem;color:#e6edf3;line-height:1.6;margin:0;">
              Deploy, test, and optimize Claude-based monetization systems with precision tracking and compliance monitoring.
              <span style="color:#ff7b72;font-weight:600;">Battle-tested frameworks</span> for operators managing performance funnels across Reddit, CPA networks, and affiliate channels.
            </p>
          </div>
        </section>

        <!-- Core Systems Grid -->
        <section style="margin-bottom:3rem;">
          <h2 style="font-family:'Space Mono',monospace;font-weight:700;font-size:1.5rem;color:#e6edf3;margin-bottom:1.5rem;">
            Implementation Systems
          </h2>

          <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(auto-fit,minmax(320px,1fr))'};gap:1.5rem;">

            <!-- Workflow Testing -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">⚡</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Workflow Validation
                </h3>
              </div>
              <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.5;margin-bottom:1rem;">
                A/B/C test Claude prompts across Reddit threads, Gumroad funnels, and CPA bridges. Real-time analytics track conversion velocity and qualification rates.
              </p>
              <div style="background:rgba(88,166,255,0.05);padding:0.75rem;border-radius:4px;border-left:3px solid #58a6ff;">
                <span style="font-family:'Space Mono',monospace;color:#58a6ff;font-size:0.875rem;">
                  Avg. 18.7% conversion improvement through systematic testing
                </span>
              </div>
            </article>

            <!-- Split Testing -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">🔄</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin:0;font-size:1.125rem;">
                  Dynamic Routing
                </h3>
              </div>
              <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.5;margin-bottom:1rem;">
                Deploy multiple offer variations with geo-targeting, device detection, and time-based rotation. Intelligent traffic qualification and compliance monitoring.
              </p>
              <div style="background:rgba(88,166,255,0.05);padding:0.75rem;border-radius:4px;border-left:3px solid #58a6ff;">
                <span style="font-family:'Space Mono',monospace;color:#58a6ff;font-size:0.875rem;">
                  GEO: ${cfCountry} | Device: ${isMobile ? 'Mobile' : 'Desktop'} | Optimized routing active
                </span>
              </div>
            </article>

            ${showAdvanced ? `
            <!-- Advanced Toolkit -->
            <article style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(249,199,79,0.3);box-shadow:0 4px 12px rgba(0,0,0,0.4);">
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem;">
                <span aria-hidden="true" style="font-size:1.5rem;">🎯</span>
                <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#f9c74f;margin:0;font-size:1.125rem;">
                  Advanced Implementation
                </h3>
                <span style="background:#f9c74f;color:#0a0e12;padding:0.25rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:600;">PRO</span>
              </div>
              <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);line-height:1.5;margin-bottom:1rem;">
                Unreleased automation frameworks, compliance tracking, and white-label implementation guides for agency-level deployment.
              </p>
              <div style="background:rgba(249,199,79,0.05);padding:0.75rem;border-radius:4px;border-left:3px solid #f9c74f;">
                <span style="font-family:'Space Mono',monospace;color:#f9c74f;font-size:0.875rem;">
                  Beta access | Priority implementation support
                </span>
              </div>
            </article>
            ` : ''}

          </div>
        </section>

        <!-- Implementation Metrics -->
        ${showAdvanced ? `
        <section style="margin-bottom:3rem;">
          <h2 style="font-family:'Space Mono',monospace;font-weight:700;font-size:1.25rem;color:#e6edf3;margin-bottom:1rem;">
            Performance Benchmarks
          </h2>
          <div style="background:#121820;border-radius:8px;padding:1.5rem;border:1px solid rgba(88,166,255,0.2);">
            <div style="display:grid;grid-template-columns:${isMobile ? '1fr' : 'repeat(3,1fr)'};gap:1.5rem;">
              <div style="text-align:center;">
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#ff7b72;">22.3%</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">Avg. Conversion Rate</div>
              </div>
              <div style="text-align:center;">
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#58a6ff;">$127</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">Avg. Revenue/100 Visitors</div>
              </div>
              <div style="text-align:center;">
                <div style="font-family:'Space Mono',monospace;font-size:2rem;font-weight:700;color:#f9c74f;">31%</div>
                <div style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);font-size:0.875rem;">CPA Reduction vs. Standard</div>
              </div>
            </div>
          </div>
        </section>
        ` : ''}

        <!-- Access Controls -->
        <section style="margin-bottom:3rem;">
          <div style="background:linear-gradient(135deg,rgba(255,123,114,0.1),rgba(88,166,255,0.1));border-radius:8px;padding:2rem;border:1px solid rgba(255,123,114,0.3);">
            <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#ff7b72;margin-bottom:1rem;font-size:1.25rem;">
              Lab Access Protocol
            </h3>
            <p style="font-family:'Inter Tight',sans-serif;color:#e6edf3;line-height:1.6;margin-bottom:1.5rem;">
              Implementation systems require operator verification. Access includes TOS-compliant frameworks,
              real performance data, and direct implementation support for qualified users.
            </p>

            <div style="display:flex;gap:1rem;flex-wrap:wrap;">
              <a href="/vault" style="
                display:inline-flex;
                align-items:center;
                gap:0.5rem;
                background:#ff7b72;
                color:#0a0e12;
                padding:0.875rem 1.5rem;
                border-radius:6px;
                text-decoration:none;
                font-family:'Inter Tight',sans-serif;
                font-weight:600;
              ">
                <span>Access Systems Vault</span>
                <span>→</span>
              </a>

              <a href="/request" style="
                display:inline-flex;
                align-items:center;
                gap:0.5rem;
                background:transparent;
                color:#ff7b72;
                padding:0.875rem 1.5rem;
                border-radius:6px;
                text-decoration:none;
                font-family:'Inter Tight',sans-serif;
                font-weight:600;
                border:1px solid #ff7b72;
              ">
                <span>Request Implementation Access</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Qualification Form -->
        <section style="margin-bottom:3rem;">
          <div style="background:#121820;border-radius:8px;padding:2rem;border:1px solid rgba(88,166,255,0.2);">
            <h3 style="font-family:'Space Mono',monospace;font-weight:700;color:#e6edf3;margin-bottom:1rem;font-size:1.125rem;">
              Beta Implementation Notifications
            </h3>
            <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.8);margin-bottom:1.5rem;">
              Receive priority access to new systems, compliance updates, and performance optimization frameworks.
            </p>

            <form action="/api/lab-qualification" method="POST" style="display:flex;gap:1rem;flex-wrap:wrap;">
              <input type="email"
                     name="email"
                     placeholder="operator@email.com"
                     required
                     style="flex:1;min-width:280px;padding:0.875rem;border-radius:6px;border:1px solid rgba(88,166,255,0.3);background:rgba(12,17,23,0.6);color:#e6edf3;font-family:'Inter Tight',sans-serif;">

              <button type="submit"
                      style="background:#58a6ff;color:#0a0e12;padding:0.875rem 1.5rem;border-radius:6px;border:none;font-family:'Inter Tight',sans-serif;font-weight:600;cursor:pointer;">
                Request Notification Access
              </button>
            </form>

            <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.6);font-size:0.875rem;margin-top:0.75rem;">
              Qualification required. Implementation experience with Claude and compliance protocols preferred.
            </p>
          </div>
        </section>

        <!-- Footer -->
        <footer style="border-top:1px solid rgba(88,166,255,0.2);padding-top:2rem;text-align:center;">
          <p style="font-family:'Inter Tight',sans-serif;color:rgba(230,237,243,0.6);font-size:0.875rem;margin:0;">
            © ${new Date().getFullYear()} AIQBrain.com — Claude-Centric Monetization Systems for Discerning Operators
          </p>
          <div style="margin-top:1rem;">
            <a href="/compliance" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Compliance</a>
            <a href="/terms" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Terms</a>
            <a href="/privacy" style="color:rgba(230,237,243,0.8);text-decoration:none;margin:0 1rem;font-size:0.875rem;">Privacy</a>
          </div>
        </footer>
      </main>
    </div>

    <!-- Font Loading with preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
  `;

  return new Response(baseTemplate(content, {
    page: 'lab',
    title: 'Monetization Lab — AIQBrain',
    description: 'Claude-centric implementation and optimization hub for sophisticated operators'
  }), {
    headers: SECURITY_HEADERS
  });
}
