/**
 * Home page handler for AIQBrain
 * Renders the main landing page with core value proposition
 */
import { baseTemplate } from '../templates/base.js';
import { getOwnershipStatement } from '../components/legal.js';

export async function homeHandler(request, env) {
  const content = `
  <div class="hero brand-gradient-bg">
    <div class="container">
      <!-- CSS: Emphasize brand gradient background from #635BFF → brand blue in .brand-gradient-bg and .neural-pattern -->
      <div class="neural-pattern"></div>
      <h1>Unlock Claude-Centric Monetization. Scale Like an Elite Operator.</h1>
      <p class="hero-subtitle">Deploy TOS-compliant AI systems, boost ROI, and stay ahead of algorithm shifts — all with the Claude monetization blueprint.</p>
      <div class="cta-container">
        <a href="/vault" class="btn btn-primary">Access Vault</a>
        <a href="/strategy" class="btn btn-secondary">Live Strategies</a>
      </div>
    </div>
  </div>

  <section class="value-section">
    <div class="container">
      <h2>Why AIQBrain Outperforms</h2>
      <div class="row">
        <div class="col">
          <div class="card">
            <h3>Elite Frameworks</h3>
            <p>Monetization playbooks vetted by advanced operators.</p>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <h3>Plug-and-Play Automation</h3>
            <p>Launch and optimize across multiple traffic sources in hours, not weeks.</p>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <h3>Compliance-Driven Scaling</h3>
            <p>Future-proof, platform-safe growth tactics.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="conversion-metrics">
    <div class="container">
      <h2>Real Operator Metrics</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value">21.7%</div>
          <div class="metric-label">Average Conversion Rate</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">87%</div>
          <div class="metric-label">Implementation Success</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">3.2x</div>
          <div class="metric-label">ROI Improvement</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">1,800+</div>
          <div class="metric-label">Operators Served</div>
        </div>
      </div>
      <p class="metrics-note" style="font-size:0.92em; opacity:0.7;">Metrics are based on anonymized operator data from Q2 2025. Results will vary.</p>
    </div>
  </section>

  <section class="social-proof">
    <div class="container">
      <h2>What Operators Say</h2>
      <div class="testimonials">
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"AIQBrain's systems allowed me to deploy Claude-based monetization that's both profitable and sustainable. Conversion rates have remained consistent for over 6 months."</p>
          </div>
          <div class="testimonial-author">— Digital Strategy Consultant</div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"The implementation guides made deployment straightforward. I was seeing positive ROI within the first week, and haven't had any compliance issues."</p>
          </div>
          <div class="testimonial-author">— AI Marketing Specialist</div>
        </div>
        <div class="testimonial">
          <div class="testimonial-content">
            <p>"Finally found a system that scales without triggering bans. Love the focus on compliance."</p>
          </div>
          <div class="testimonial-author">— Growth Hacker (US)</div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <h2>Start Building Claude Revenue — Without Guesswork</h2>
      <p>Access our full framework library, tested systems, and tactical walkthroughs.</p>
      <a href="/request" class="btn btn-primary btn-large">Join the Operator List</a>
      <p style="margin-top:0.6em; opacity:0.8; font-size:1em;">Limited early access. First-mover advantages.</p>
    </div>
  </section>

  ${getOwnershipStatement()}
`;

  return new Response(baseTemplate(content, { page: 'home' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
