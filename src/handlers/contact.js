/**
 * Contact page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function contactHandler(request, env) {
  const content = `
    <div class="container page-container">
      <h1>Contact</h1>
      <p>This is a placeholder for the Contact page. Implementation coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-primary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { page: 'contact' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
