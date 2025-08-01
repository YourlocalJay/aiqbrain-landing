/**
 * Vault page handler for AIQBrain
 * Provides limited preview of monetization systems and lead capture
 */
import { baseTemplate } from '../templates/base.js';
import { getPageLegalNotices, getLegalBeforePurchase } from '../components/legal.js';

export async function vaultHandler(request, env) {
  const content = `
    <div class="vault-header">
      <div class="container">
        <h1>AIQBrain Vault</h1>
        <p class="vault-subtitle">Premium Claude Monetization Systems</p>
        
        <div class="access-status">
          <span class="status-chip">Limited Preview Access</span>
        </div>
      </div>
    </div>
    
    <section class="vault-preview">
      <div class="container">
        <h2>Sample Systems Overview</h2>
        <div class="system-grid">
          <div class="system-card">
            <div class="card-header">
              <span class="badge badge-pro">PRO</span>
              Survey Vault Monetization System
            </div>
            <p>Strategic framework for leveraging Claude with highly engaging survey-based funnels. Features geo-targeting, device detection, and optimized conversion paths.</p>
            <ul class="system-features">
              <li>21.3% Average Conversion Rate</li>
              <li>Multiple Geo Targeting Options</li>
              <li>Complete Implementation Guide</li>
            </ul>
            <div class="system-locked">
              <div class="lock-icon">🔒</div>
              <p>Full system available with approved access</p>
            </div>
          </div>
          
          <div class="system-card">
            <div class="card-header">
              <span class="badge badge-pro">PRO</span>
              Claude Prompt-to-Profit Framework
            </div>
            <p>Systematic approach to developing commercial Claude applications with built-in monetization architecture. Includes prompting techniques and integration guides.</p>
            <ul class="system-features">
              <li>4 Proven Business Models</li>
              <li>Compliance Documentation</li>
              <li>Scaling Methodology</li>
            </ul>
            <div class="system-locked">
              <div class="lock-icon">🔒</div>
              <p>Full system available with approved access</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="access-application">
      <div class="container">
        <h2>Request Full Vault Access</h2>
        <p>The complete AIQBrain Vault includes all monetization systems, implementation guides, and ongoing updates.</p>
        
        <div class="application-form">
          <form id="access-request-form" action="/request" method="GET">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" id="email" name="email" class="form-control" placeholder="Your email" required>
            </div>
            
            <div class="form-group">
              <label for="experience" class="form-label">Claude Experience Level</label>
              <select id="experience" name="experience" class="form-control" required>
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (0-3 months)</option>
                <option value="intermediate">Intermediate (3-12 months)</option>
                <option value="advanced">Advanced (1+ years)</option>
              </select>
            </div>
            
            ${getLegalBeforePurchase()}
            
            <button type="submit" class="btn btn-primary btn-large">Request Access</button>
          </form>
        </div>
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
