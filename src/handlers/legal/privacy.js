/**
 * Privacy page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';

export async function privacyHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Privacy Policy</h1>
      <p>This is a placeholder for the Privacy Policy page. Legal content coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { 
    page: 'privacy',
    title: 'Privacy Policy | AIQBrain',
    description: 'AIQBrain Privacy Policy and legal information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
