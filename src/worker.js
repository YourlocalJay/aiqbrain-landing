import { applySecurityHeaders } from './middleware/headers';
import { routes } from './routes';

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;

      // Cache the request method for potential optimizations
      const method = request.method.toUpperCase();

      // Find matching route (using helper if available, otherwise fallback)
      const route = matchRoute(pathname) ||
        routes.find(r => (
          (r.path === pathname) ||
          (r.pathMatch && r.pathMatch(pathname))
        ));

      if (route) {
        // Add a simple performance marker for debugging
        ctx.performanceMark = performance.now();

        const response = await route.handler(request, env, ctx);

        // Log request timing in production
        if (env.NODE_ENV === 'production') {
          const duration = performance.now() - ctx.performanceMark;
          console.log(`[${method}] ${pathname} - ${duration.toFixed(2)}ms`);
        }

        return applySecurityHeaders(response);
      }

      // No route matched - return 404
      return applySecurityHeaders(
        new Response('Not found', {
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        })
      );

    } catch (error) {
      // Centralized error handling
      console.error(`Request failed: ${error.message}`, {
        url: request.url,
        stack: error.stack
      });

      return applySecurityHeaders(
        new Response('Internal Server Error', {
          status: 500,
          headers: { 'Content-Type': 'text/plain' }
        })
      );
    }
  }
};

// Fallback route matching if not using the enhanced routes.js
function matchRoute(pathname) {
  if (routes.some(r => r.type)) { // Enhanced route format detected
    for (const route of routes) {
      if (route.type === 'exact' && route.path === pathname) return route;
      if (route.type === 'pattern' && route.test(pathname)) return route;
      if (route.type === 'catch_all') return route;
    }
  }
  return null;
}
