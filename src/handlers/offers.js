/**
 * Offers/Survey Vault handler for AIQBrain
 * Redirects to external offers in production; shows branded placeholder locally
 */
import { baseTemplate } from '../templates/base.js';

export async function offersHandler(request, env) {
  // Show branded placeholder for local development environments
  if (env.ENVIRONMENT === 'development' || request.headers.get('host').includes('localhost')) {
    const content = `
      <div class="container page-container" style="font-family: 'Inter', sans-serif;">
        <div class="badge" style="background: linear-gradient(90deg, #635BFF 0%, #8C85FF 100%); color: white; font-weight: 700; padding: 0.25em 0.75em; border-radius: 12px; display: inline-block; margin-bottom: 1rem; font-size: 0.875rem; letter-spacing: 0.05em;">
          CLAUDE-APPROVED VAULT
        </div>
        <h1 style="font-weight: 900; font-size: 2.5rem; color: #635BFF; margin-bottom: 0.5rem;">
          Unlock Exclusive AIQBrain Offers
        </h1>
        <h2 style="font-weight: 600; font-size: 1.25rem; color: #4A4A4A; margin-bottom: 1.5rem;">
          You’ve reached the AIQBrain Survey Vault. For security and compliance, offers only display on authorized domains.
        </h2>
        <div class="cta-container" style="display: flex; gap: 1rem; margin-bottom: 2rem;">
          <a href="/" class="btn btn-primary" style="font-weight: 700;">Return Home</a>
          <a href="/vault" class="btn btn-primary" style="font-weight: 700;">Explore Prompt Packs</a>
        </div>
      </div>
    `;

    return new Response(baseTemplate(content, { page: 'survey-vault' }), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }

  // Redirect to external offers in production environment
  const targetUrl = 'https://trkr.aiqbrain.com/redirect?source=sv';

  return Response.redirect(targetUrl, 302);
}
