/**
 * Main worker entry point for AIQBrain landing page
 * Handles all request routing and middleware
 */
import { routes, redirects } from './routes.js';
import { securityMiddleware } from './middleware/security.js';
import { headerMiddleware } from './middleware/headers.js';
import { routingMiddleware } from './middleware/routing.js';
import { analyticsMiddleware } from './middleware/analytics.js';

// Import all handlers
import { homeHandler } from './handlers/home.js';
import { vaultHandler } from './handlers/vault.js';
import { strategyHandler } from './handlers/strategy.js';
import { strategyWeekendHandler } from './handlers/strategy-weekend.js';
import { labHandler } from './handlers/lab.js';
import { resultsHandler } from './handlers/results.js';
import { requestHandler } from './handlers/request.js';
import { highIntentHandler } from './handlers/high-intent.js';
import { mobileHomeHandler } from './handlers/mobile-home.js';
import { opsecHandler } from './handlers/opsec.js';
import { offersHandler } from './handlers/offers.js';
import { privacyHandler } from './handlers/legal/privacy.js';
import { termsHandler } from './handlers/legal/terms.js';
import { complianceHandler } from './handlers/legal/compliance.js';
import { contactHandler } from './handlers/contact.js';
import { faqHandler } from './handlers/faq.js';
import { staticAssetHandler } from './handlers/static.js';
import { notFoundHandler } from './handlers/not-found.js';

// Map route handlers to functions
const handlerMap = {
  homeHandler,
  vaultHandler,
  strategyHandler,
  strategyWeekendHandler,
  labHandler,
  resultsHandler,
  requestHandler,
  highIntentHandler,
  mobileHomeHandler,
  opsecHandler,
  offersHandler,
  privacyHandler,
  termsHandler,
  complianceHandler,
  contactHandler,
  faqHandler,
  staticAssetHandler,
  notFoundHandler
};

export default {
  async fetch(request, env, ctx) {
    // Check security first
    const securityResponse = await securityMiddleware(request, env);
    if (securityResponse) {
      return securityResponse;
    }
    
    const url = new URL(request.url);
    
    // Check for redirects
    for (const redirect of redirects) {
      if (redirect.path === url.pathname) {
        let destination = redirect.destination;
        
        // If destination is a function, call it to get the dynamic destination
        if (typeof destination === 'function') {
          destination = destination(request, env);
        }
        
        return Response.redirect(`${url.origin}${destination}${url.search}`, redirect.statusCode);
      }
    }
    
    // Apply routing middleware for special cases
    const routingResponse = await routingMiddleware(request, env);
    if (routingResponse) {
      return routingResponse;
    }
    
    // Find matching route handler
    let handler = null;
    
    for (const route of routes) {
      if (route.path && route.path === url.pathname) {
        handler = handlerMap[route.handler];
        break;
      } else if (route.pathMatch && route.pathMatch(url.pathname)) {
        handler = handlerMap[route.handler];
        break;
      }
    }
    
    // If no handler found, use 404
    if (!handler) {
      handler = notFoundHandler;
    }
    
    // Execute handler
    let response = await handler(request, env);
    
    // Apply analytics middleware
    response = await analyticsMiddleware(request, env, response);
    
    // Apply header middleware last
    return headerMiddleware(request, env, response);
  }
};
