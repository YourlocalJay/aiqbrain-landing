/**
 * Mobile Home page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function mobileHomeHandler(request, env) {
  const content = `
    <div class="container page-container">
      <h1>Mobile Home</h1>
      <p>This is a placeholder for the Mobile-optimized Home page. Implementation coming soon.</p>
      
      <div class="cta-container">
        <a href="/" class="btn btn-primary">Return to Desktop Version</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { page: 'mobile-home' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
