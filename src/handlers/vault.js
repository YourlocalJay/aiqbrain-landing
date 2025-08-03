/**
 * Vault page handler for AIQBrain
 * Provides limited preview of monetization systems and lead capture
 */
import { baseTemplate } from '../templates/base.js';
import { getPageLegalNotices, getLegalBeforePurchase } from '../components/legal.js';

export async function vaultHandler(request, env) {
  const content = `
    <header class="vault-header aiqbrain-vault-header">
      <div class="container">
        <h1 class="vault-title">AIQBrain Vault</h1>
        <p class="vault-subtitle">Exclusive Claude Monetization Systems for Results-Driven Innovators</p>
        <div class="vault-urgency-banner aiqbrain-urgency-banner">
          <strong>Limited Access:</strong> Only select insiders gain full Vault privileges. Apply now to secure your spot.
        </div>
        <div class="access-status aiqbrain-access-status">
          <span class="status-chip status-chip-premium">Insider Preview Access</span>
        </div>
      </div>
    </header>

    <section class="vault-preview aiqbrain-vault-preview">
      <div class="container">
        <h2 class="section-heading">Preview of Proven Monetization Frameworks</h2>
        <div class="system-grid aiqbrain-system-grid">
          <article class="system-card aiqbrain-system-card">
            <header class="card-header aiqbrain-card-header">
              <span class="badge badge-pro badge-premium">PREMIUM</span>
              Survey Vault Monetization System
            </header>
            <p class="system-description">Unlock a strategic Claude-driven survey funnel engineered for maximum engagement and conversion. Includes geo-targeting, device detection, and optimized user journeys.</p>
            <ul class="system-features aiqbrain-system-features">
              <li>21.3% Average Conversion Rate</li>
              <li>Advanced Geo & Device Targeting</li>
              <li>Comprehensive Implementation Guide</li>
            </ul>
            <div class="system-locked aiqbrain-system-locked">
              <div class="lock-icon">🔒</div>
              <p>Full system access granted upon approval</p>
            </div>
          </article>

          <article class="system-card aiqbrain-system-card">
            <header class="card-header aiqbrain-card-header">
              <span class="badge badge-pro badge-premium">PREMIUM</span>
              Claude Prompt-to-Profit Framework
            </header>
            <p class="system-description">A results-focused blueprint for building commercial Claude applications with built-in monetization and compliance strategies.</p>
            <ul class="system-features aiqbrain-system-features">
              <li>4 Proven Revenue Models</li>
              <li>Compliance & Legal Documentation</li>
              <li>Scalable Growth Methodology</li>
            </ul>
            <div class="system-locked aiqbrain-system-locked">
              <div class="lock-icon">🔒</div>
              <p>Full system access granted upon approval</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="vault-benefits aiqbrain-vault-benefits">
      <div class="container">
        <h2 class="section-heading">Why Choose AIQBrain Vault?</h2>
        <ul class="benefits-list aiqbrain-benefits-list">
          <li><strong>Insider-Only Access:</strong> Gain entry to exclusive, high-impact monetization systems not available elsewhere.</li>
          <li><strong>Proven Results:</strong> Systems designed to maximize conversions and revenue with Claude AI at the core.</li>
          <li><strong>Continuous Updates:</strong> Receive ongoing enhancements and new frameworks as AIQBrain evolves.</li>
          <li><strong>Dedicated Support:</strong> Expert guidance through the approval and implementation process.</li>
          <li><strong>Strategic Advantage:</strong> Stay ahead with Claude-centric monetization innovations tailored for serious creators.</li>
        </ul>
      </div>
    </section>

    <section class="access-application aiqbrain-access-application">
      <div class="container">
        <h2 class="section-heading">Apply for Full Vault Access</h2>
        <p class="application-intro">Complete the application below to join the AIQBrain Vault community. Access is granted after a quick review to ensure alignment with our premium standards.</p>

        <form id="access-request-form" action="/request" method="GET" class="application-form aiqbrain-application-form">
          <div class="form-group aiqbrain-form-group">
            <label for="email" class="form-label aiqbrain-form-label">Email Address</label>
            <input type="email" id="email" name="email" class="form-control aiqbrain-form-control" placeholder="Your email" required>
          </div>

          <div class="form-group aiqbrain-form-group">
            <label for="experience" class="form-label aiqbrain-form-label">Claude Experience Level</label>
            <select id="experience" name="experience" class="form-control aiqbrain-form-control" required>
              <option value="" disabled selected>Select your experience level</option>
              <option value="beginner">Beginner (0-3 months)</option>
              <option value="intermediate">Intermediate (3-12 months)</option>
              <option value="advanced">Advanced (1+ years)</option>
            </select>
          </div>

          ${getLegalBeforePurchase()}

          <button type="submit" class="btn btn-primary btn-large aiqbrain-btn-primary">Apply for Vault Access – Instant Review</button>
        </form>
      </div>
    </section>

    ${getPageLegalNotices('vault')}
  `;

  return new Response(baseTemplate(content, { page: 'vault' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
