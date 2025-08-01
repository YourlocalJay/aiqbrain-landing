/**
 * Request page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function requestHandler(request, env) {
  const content = `
    <div class="container page-container">
      <h1>Access Request</h1>
      <p>This is a placeholder for the Access Request page. Implementation coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-primary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { page: 'request' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
