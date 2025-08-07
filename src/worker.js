import { routes } from './routes.js';
import { headerMiddleware } from './middleware/headers.js';

import { vaultHandler } from './handlers/vault.js';
import { offersHandler } from './handlers/offers.js';
import { notFoundHandler } from './handlers/not-found.js';

const handlerMap = {
  vaultHandler,
  offersHandler,
  notFoundHandler
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}`);

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

    if (!handler) {
      handler = notFoundHandler;
    }

    let response = await handler(request, env);
    return headerMiddleware(request, env, response);
  }
};
