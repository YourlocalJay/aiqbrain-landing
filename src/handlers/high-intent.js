/**
 * High Intent page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function highIntentHandler(request, env) {
  const content = `
    <div class="container page-container">
      <h1>High Intent</h1>
      <p>This is a placeholder for the High Intent page. Implementation coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-primary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { page: 'high-intent' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
