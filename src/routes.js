export const routes = [
  { path: '/', handler: 'vaultHandler' },
  { path: '/vault', handler: 'vaultHandler' },
  { path: '/sv', handler: 'offersHandler' },
  {
    pathMatch: (p) => p.startsWith('/offers/'),
    handler: 'offersHandler'
  },
  { pathMatch: () => true, handler: 'notFoundHandler' }
];
