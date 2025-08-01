/**
 * Compliance page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';

export async function complianceHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Compliance</h1>
      <p>This is a placeholder for the Compliance page. Legal content coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { 
    page: 'compliance',
    title: 'Compliance | AIQBrain',
    description: 'AIQBrain Compliance policies and information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
