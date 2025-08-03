/**
 * Request page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function requestHandler(request, env) {
  const content = `
  <div class="container page-container">
    <div class="aiq-glyph-header">
      <span class="aiq-neural-glyph"></span>
      <h1 class="headline">Request Insider Access</h1>
    </div>
    <p class="lead-text">
      Access to AIQBrain’s advanced vaults and monetization systems is reserved for vetted operators and serious partners.<br>
      Complete the form below to request exclusive entry to our private playbooks, AI tools, and revenue vaults.
    </p>
    <form class="aiq-form access-request-form" method="POST" action="/api/request-access">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required autocomplete="off" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required autocomplete="off" class="form-control"/>
      </div>
      <div class="form-group">
        <label for="purpose">Purpose / Intended Use</label>
        <textarea id="purpose" name="purpose" required rows="3" class="form-control"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Request Access</button>
    </form>
    <div class="cta-container">
      <a href="/" class="btn btn-secondary">Return Home</a>
    </div>
    <div class="compliance-note">
      <small>
        We review all access requests for compliance and privacy. Your information will only be used for vetting and onboarding purposes. See our <a href="/privacy" target="_blank">Privacy Policy</a> for details.
      </small>
    </div>
  </div>
  `;

  return new Response(baseTemplate(content, { page: 'request' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
