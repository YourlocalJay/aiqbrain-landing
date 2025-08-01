cat > src/handlers/offers.js << 'EOF'
/**
 * Offers/Survey Vault handler for AIQBrain
 * In production, this would redirect to external offers
 * For local development, we'll show a placeholder
 */
import { baseTemplate } from '../templates/base.js';

export async function offersHandler(request, env) {
  // For local development, show a placeholder instead of redirecting
  if (env.ENVIRONMENT === 'development' || request.headers.get('host').includes('localhost')) {
    const content = `
      <div class="container page-container">
        <h1>Survey Vault (Local Development)</h1>
        <p>In production, this route would redirect to external offer pages.</p>
        <p>For local development, we're showing this placeholder instead.</p>

        <div class="cta-container">
          <a href="/" class="btn btn-primary">Return Home</a>
        </div>
      </div>
    `;

    return new Response(baseTemplate(content, { page: 'survey-vault' }), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  }

  // In production, this would redirect to the actual offer
  const targetUrl = 'https://trkr.aiqbrain.com/redirect?source=sv';

  return Response.redirect(targetUrl, 302);
}
EOF
