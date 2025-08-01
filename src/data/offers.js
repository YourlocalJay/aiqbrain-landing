// src/data/offers.js

/**
 * Offer structure:
 * - id: unique identifier
 * - name: human-readable name
 * - network: affiliate network/source
 * - payout: USD (or specify currency)
 * - device: 'android' | 'ios' | 'any'
 * - geo: country code or 'any'
 * - url: must contain tracking_id= for appending
 * - notes: optional extra info
 */

const offers = [
  // --- USA ---
  {
    id: 'us-android-1',
    name: 'Survey Vault US Android',
    network: 'CPAGrip',
    payout: 2.25,
    device: 'android',
    geo: 'US',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68831',
    notes: 'No CC, mobile-friendly, Reddit allowed',
  },
  {
    id: 'us-ios-1',
    name: 'Survey Vault US iOS',
    network: 'CPAGrip',
    payout: 2.10,
    device: 'ios',
    geo: 'US',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69234',
    notes: 'No CC, mobile, Reddit allowed',
  },

  // --- UK ---
  {
    id: 'uk-android-1',
    name: 'Survey Vault UK Android',
    network: 'CPAGrip',
    payout: 2.05,
    device: 'android',
    geo: 'UK',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68583',
    notes: 'No CC, Reddit allowed',
  },

  // --- Canada ---
  {
    id: 'ca-android-1',
    name: 'Survey Vault CA Android',
    network: 'CPAGrip',
    payout: 1.95,
    device: 'android',
    geo: 'CA',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68846',
    notes: 'No CC, Reddit allowed',
  },
  {
    id: 'ca-ios-1',
    name: 'Survey Vault CA iOS',
    network: 'CPAGrip',
    payout: 2.10,
    device: 'ios',
    geo: 'CA',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69339',
    notes: 'No CC, Reddit allowed',
  },

  // --- Fallback (default) ---
  {
    id: 'fallback-1',
    name: 'Vault Default Offer',
    network: 'CPAGrip',
    payout: 1.00,
    device: 'any',
    geo: 'any',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68831',
    notes: 'Fallback if targeting fails',
  },
];

// --------- PRE-INDEX OFFERS FOR FAST LOOKUP ---------

const offerMap = offers.reduce((map, offer) => {
  const key = `${offer.geo.toLowerCase()}_${offer.device.toLowerCase()}`;
  map[key] = offer;
  return map;
}, {});

function findFallback() {
  return offers.find((o) => o.id.startsWith('fallback')) || offers[0];
}

/**
 * Main lookup function: returns the best offer for a given geo/device.
 * - geo: country code (e.g., 'US', 'UK', 'CA'), default 'any'
 * - device: 'android', 'ios', or 'any', default 'any'
 */
function getOffer({ geo = 'any', device = 'any' } = {}) {
  if (!geo || !device) {
    console.warn('Missing geo/device. Using fallback.');
    return findFallback();
  }
  const key = `${geo.toLowerCase()}_${device.toLowerCase()}`;
  // Exact match
  if (offerMap[key]) return offerMap[key];
  // Geo only
  const geoKey = `${geo.toLowerCase()}_any`;
  if (offerMap[geoKey]) return offerMap[geoKey];
  // Device only (rare)
  const deviceKey = `any_${device.toLowerCase()}`;
  if (offerMap[deviceKey]) return offerMap[deviceKey];
  // Fallback/default
  return findFallback();
}

// --------- VALIDATE OFFER URLS ON STARTUP (DEVELOPMENT ONLY) ---------
if (process.env.NODE_ENV !== 'production') {
  offers.forEach((offer) => {
    if (!offer.url.includes('tracking_id=')) {
      console.warn(`Offer ${offer.id} is missing tracking_id= in URL!`);
    }
  });
}

module.exports = { offers, getOffer, findFallback };
