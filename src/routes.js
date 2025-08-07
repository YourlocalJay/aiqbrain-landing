import { vaultHandler } from './handlers/vault';
import { vaultUnlockHandler } from './handlers/vault-unlock';
import { offersHandler } from './handlers/offers';
import { notFoundHandler } from './handlers/not-found';

// Define route types for better maintainability
const RouteType = {
  EXACT: 'exact',
  PATTERN: 'pattern',
  CATCH_ALL: 'catch_all'
};

export const routes = [
  // Exact path matches
  {
    type: RouteType.EXACT,
    path: '/',
    handler: vaultHandler,
    metadata: { title: 'Main Vault' }
  },
  {
    type: RouteType.EXACT,
    path: '/vault',
    handler: vaultHandler,
    metadata: { title: 'Vault Access' }
  },
  {
    type: RouteType.EXACT,
    path: '/vault-unlock',
    handler: vaultUnlockHandler,
    metadata: { title: 'Vault Unlock' }
  },
  {
    type: RouteType.EXACT,
    path: '/sv',
    handler: offersHandler,
    metadata: { title: 'Special Offers' }
  },

  // Pattern-based matches
  {
    type: RouteType.PATTERN,
    test: (pathname) => pathname.startsWith('/offers/'),
    handler: offersHandler,
    metadata: { dynamic: true }
  },

  // Catch-all route (must be last)
  {
    type: RouteType.CATCH_ALL,
    handler: notFoundHandler,
    metadata: { is404: true }
  }
];

// Optional: Helper function to match routes
export function matchRoute(pathname) {
  for (const route of routes) {
    if (route.type === RouteType.EXACT && route.path === pathname) {
      return route;
    }
    if (route.type === RouteType.PATTERN && route.test(pathname)) {
      return route;
    }
  }
  return routes.find(route => route.type === RouteType.CATCH_ALL);
}
