/**
 * Home page handler for AIQBrain
 * Renders the main landing page with core value proposition
 */
import { baseTemplate } from '../templates/base.js';
import { getOwnershipStatement } from '../components/legal.js';

export async function homeHandler(request, env) {
  const content = `
    <div class="hero">
      <div class="container">
        <div class="neural-pattern"></div>
        <h1>Claude-Centric Monetization Systems for Discerning Operators</h1>
        <p class="hero-subtitle">Transform Claude expertise into sustainable revenue streams with battle-tested, TOS-compliant monetization frameworks</p>
        
        <div class="cta-container">
          <a href="/vault" class="btn btn-primary">Unlock Vault</a>
          <a href="/strategy" class="btn btn-secondary">Explore Systems</a>
        </div>
      </div>
    </div>
    
    <section class="value-section">
      <div class="container">
        <h2>Strategic, Compliant AI Monetization</h2>
        <div class="row">
          <div class="col">
            <div class="card">
              <h3>Proven Revenue Models</h3>
              <p>Access monetization frameworks that consistently deliver 18-22% conversion rates while maintaining full platform compliance.</p>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <h3>Optimized Implementation</h3>
              <p>Step-by-step systems designed for efficient deployment and scalable operation across multiple traffic sources.</p>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <h3>Sustainable Strategies</h3>
              <p>Focus on long-term viability with TOS-aligned approaches that outperform high-risk alternatives.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="conversion-metrics">
      <div class="container">
        <h2>Real Performance Metrics</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-value">21.7%</div>
            <div class="metric-label">Average Conversion Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">87%</div>
            <div class="metric-label">Implementation Success Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">3.2x</div>
            <div class="metric-label">Average ROI Improvement</div>
          </div>
        </div>
        <p class="metrics-note">Based on anonymized operator data from Q2 2025. Individual results may vary.</p>
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
        </div>
      </div>
    </section>
    
    <section class="cta-section">
      <div class="container">
        <h2>Ready to Transform Your Claude Operations?</h2>
        <p>Access our complete framework library and implementation system.</p>
        <a href="/request" class="btn btn-primary btn-large">Request Access</a>
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
