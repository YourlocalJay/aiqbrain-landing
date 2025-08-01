/**
 * AIQBrain routing configuration
 * Handles all redirects and path mappings for the platform
 */

export const redirects = [
  { 
    path: '/v', 
    destination: '/vault',
    statusCode: 301
  },
  { 
    path: '/sv', 
    destination: (request, env) => {
      const userAgent = request.headers.get('user-agent') || '';
      const country = request.cf.country || 'US';
      
      // Route based on country and device
      if (/Mobile|Android/.test(userAgent)) {
        // Mobile routing
        switch(country) {
          case 'US': return '/offers/survey-vault-us-m';
          case 'CA': return '/offers/survey-vault-ca-m';
          case 'UK': 
          case 'GB': return '/offers/survey-vault-uk-m';
          case 'AU': return '/offers/survey-vault-au-m';
          case 'DE': return '/offers/survey-vault-de-m';
          default: return '/offers/survey-vault-global-m';
        }
      } else {
        // Desktop routing
        switch(country) {
          case 'US': return '/offers/survey-vault-us-d';
          case 'CA': return '/offers/survey-vault-ca-d';
          case 'UK': 
          case 'GB': return '/offers/survey-vault-uk-d';
          case 'AU': return '/offers/survey-vault-au-d';
          case 'DE': return '/offers/survey-vault-de-d';
          default: return '/offers/survey-vault-global-d';
        }
      }
    },
    statusCode: 302
  }
];

// Map routes to handler functions
export const routes = [
  { path: '/', handler: 'homeHandler' },
  { path: '/index.html', handler: 'homeHandler' },
  { path: '/vault', handler: 'vaultHandler' },
  { path: '/strategy', handler: 'strategyHandler' },
  { path: '/strategy-weekend', handler: 'strategyWeekendHandler' },
  { path: '/lab', handler: 'labHandler' },
  { path: '/results', handler: 'resultsHandler' },
  { path: '/request', handler: 'requestHandler' },
  { path: '/high-intent', handler: 'highIntentHandler' },
  { path: '/mobile', handler: 'mobileHomeHandler' },
  { path: '/ops', handler: 'opsecHandler' },
  
  // Legal routes
  { path: '/privacy', handler: 'privacyHandler' },
  { path: '/terms', handler: 'termsHandler' },
  { path: '/compliance', handler: 'complianceHandler' },
  { path: '/contact', handler: 'contactHandler' },
  { path: '/faq', handler: 'faqHandler' },
  
  // Offers matching
  { 
    pathMatch: (path) => path.startsWith('/offers/'),
    handler: 'offerRedirectHandler'
  },
  
  // Static assets
  {
    pathMatch: (path) => path.startsWith('/assets/'),
    handler: 'staticAssetHandler'
  },
  
  // 404 handler (must be last)
  {
    pathMatch: () => true,
    handler: 'notFoundHandler'
  }
];
