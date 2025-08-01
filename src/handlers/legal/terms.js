/**
 * Terms page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';

export async function termsHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Terms of Service</h1>
      <p>This is a placeholder for the Terms of Service page. Legal content coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { 
    page: 'terms',
    title: 'Terms of Service | AIQBrain',
    description: 'AIQBrain Terms of Service and legal information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
