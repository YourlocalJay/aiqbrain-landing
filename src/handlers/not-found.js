/**
 * 404 Not Found handler for AIQBrain
 * Provides custom 404 page with suggested content
 */
import { baseTemplate } from '../templates/base.js';

export async function notFoundHandler(request, env) {
  const content = `
    <div class="not-found-container">
      <div class="container">
        <h1>Page Not Found</h1>
        <p>The resource you're looking for doesn't exist or has been moved.</p>
        
        <div class="suggested-content">
          <h2>You might be looking for:</h2>
          <ul>
            <li><a href="/">Home Page</a></li>
            <li><a href="/vault">Vault Access</a></li>
            <li><a href="/strategy">Strategy Hub</a></li>
            <li><a href="/contact">Contact Support</a></li>
          </ul>
        </div>
        
        <a href="/" class="btn btn-primary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { 
    title: '404 Not Found | AIQBrain',
    description: 'The page you are looking for cannot be found.'
  }), {
    status: 404,
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
