/**
 * High Intent page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function highIntentHandler(request, env) {
  const content = `
    <div class="container page-container high-intent-page">
      <section class="hero aiqbrain-blue">
        <h1>Unlock High-Intent Monetization</h1>
        <p class="subhead">For advanced operators ready to scale revenue with precision-targeted traffic and compliant conversion flows.</p>
      </section>
      <section class="value-props">
        <ul>
          <li>Elite offer rotation and funnel curation</li>
          <li>Conversion-optimized for Reddit, SEO, and mobile-first traffic</li>
          <li>Compliance-first, dark-grey stacking—risk-minimized</li>
          <li>Operator dashboard: metrics, alerts, and instant vault upgrades</li>
        </ul>
      </section>
      <section class="cta-banner claude-gradient">
        <h2>Ready to activate a high-intent CPA funnel?</h2>
        <a href="/vault" class="btn btn-primary btn-lg">Request Early Access</a>
        <p class="cta-caption">Strictly limited—invite-only for proven operators</p>
      </section>
      <section class="trust-signals">
        <div class="compliance-badge">Compliant | Risk Audited</div>
        <div class="testimonial">
          <blockquote>"AIQBrain’s high-intent stack delivered consistent $200/day results in week one—zero bans."</blockquote>
          <cite>– Monetization Operator, US</cite>
        </div>
      </section>
      <div class="secondary-links">
        <a href="/results" class="btn btn-secondary">See Results</a>
        <a href="/" class="btn">Return Home</a>
      </div>
      <footer class="brand-disclaimer">
        <small>For compliant operators only. CPA/network results not guaranteed. See terms for details.</small>
      </footer>
    </div>
  `;
  return new Response(baseTemplate(content, { page: 'high-intent' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
