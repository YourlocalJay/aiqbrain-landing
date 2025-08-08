import { vaultHandler } from './handlers/vault';
import { accessHandler } from './handlers/access';
import { offersHandler } from './handlers/offers';
import { offersDataHandler } from './handlers/data';
import { myleadPostbackHandler } from './handlers/postback';
import { notFoundHandler } from './handlers/not-found';

const RouteType = {
  EXACT: 'exact',
  PATTERN: 'pattern',
  CATCH_ALL: 'catch_all'
};

export const routes = [
  { type: RouteType.EXACT, path: '/', handler: vaultHandler, metadata: { title: 'Main Vault' } },
  { type: RouteType.EXACT, path: '/vault', handler: vaultHandler, metadata: { title: 'Vault Access' } },
{ type: RouteType.EXACT, path: '/access', handler: accessHandler, metadata: { title: 'Access', noindex: true } },
  { type: RouteType.EXACT, path: '/sv', handler: offersHandler, metadata: { title: 'Special Offers' } },
  { type: RouteType.EXACT, path: '/data/cloudflare_offers.json', handler: offersDataHandler, metadata: { isData: true } },
  { type: RouteType.EXACT, path: '/pb/mylead', handler: myleadPostbackHandler, metadata: { title: 'Postback' } },
  { type: RouteType.CATCH_ALL, handler: notFoundHandler, metadata: { is404: true } }
];

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
