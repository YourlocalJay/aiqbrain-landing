// src/data/offers.js

/**
 * Offer structure:
 * - id: unique identifier
 * - name: human-readable name
 * - network: affiliate network/source
 * - payout: USD (or specify currency)
 * - device: 'android' | 'ios' | 'desktop' | 'any'
 * - geo: country code or 'any'
 * - url: offer URL with proper tracking parameters
 * - tracking_param: parameter name to append tracking ID
 * - notes: optional extra info
 */

const offers = [
  // --- USA ---
  {
    id: 'us-android-survey-1',
    name: 'US Mobile Survey Wall',
    network: 'CPAGrip',
    payout: 2.25,
    device: 'android',
    geo: 'US',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68831',
    tracking_param: 'tracking_id',
    notes: 'High converting, no CC required, mobile optimized',
  },
  {
    id: 'us-ios-survey-1',
    name: 'US iOS Survey Wall',
    network: 'CPAGrip',
    payout: 2.10,
    device: 'ios',
    geo: 'US',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69234',
    tracking_param: 'tracking_id',
    notes: 'Easy completion, no CC required, high approval rate',
  },
  {
    id: 'us-desktop-survey-1',
    name: 'US Desktop Survey Bundle',
    network: 'MaxBounty',
    payout: 3.50,
    device: 'desktop',
    geo: 'US',
    url: 'https://www.maxbounty.com/campaigns/8732',
    tracking_param: 'subid',
    notes: 'Premium survey bundle, high conversion rate',
  },
  {
    id: 'us-any-app-1',
    name: 'US App Install - Gaming',
    network: 'OGAds',
    payout: 1.85,
    device: 'any',
    geo: 'US',
    url: 'https://ogads.com/campaign/12549',
    tracking_param: 'subid',
    notes: 'Easy app install, quick conversion, all devices',
  },

  // --- UK ---
  {
    id: 'uk-android-survey-1',
    name: 'UK Mobile Survey Wall',
    network: 'CPAGrip',
    payout: 2.05,
    device: 'android',
    geo: 'UK',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68583',
    tracking_param: 'tracking_id',
    notes: 'High-converting UK offer, no CC required',
  },
  {
    id: 'uk-ios-survey-1',
    name: 'UK iOS Survey Wall',
    network: 'CPAGrip',
    payout: 1.95,
    device: 'ios',
    geo: 'UK',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68589',
    tracking_param: 'tracking_id',
    notes: 'Easy completion flow, good for social traffic',
  },
  {
    id: 'uk-desktop-sweeps-1',
    name: 'UK Desktop Sweepstakes',
    network: 'MaxBounty',
    payout: 2.80,
    device: 'desktop',
    geo: 'UK',
    url: 'https://www.maxbounty.com/campaigns/8843',
    tracking_param: 'subid',
    notes: 'Premium sweepstakes offer, high payout',
  },

  // --- Canada ---
  {
    id: 'ca-android-survey-1',
    name: 'CA Mobile Survey Wall',
    network: 'CPAGrip',
    payout: 1.95,
    device: 'android',
    geo: 'CA',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68846',
    tracking_param: 'tracking_id',
    notes: 'Easy flow, optimized for Canadian traffic',
  },
  {
    id: 'ca-ios-survey-1',
    name: 'CA iOS Survey Wall',
    network: 'CPAGrip',
    payout: 2.10,
    device: 'ios',
    geo: 'CA',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69339',
    tracking_param: 'tracking_id',
    notes: 'Premium iOS offer for Canadian traffic',
  },
  {
    id: 'ca-desktop-sweeps-1',
    name: 'CA Desktop Sweepstakes',
    network: 'OGAds',
    payout: 2.45,
    device: 'desktop',
    geo: 'CA',
    url: 'https://ogads.com/campaign/12783',
    tracking_param: 'subid',
    notes: 'High-converting sweepstakes for CA desktop traffic',
  },

  // --- Australia ---
  {
    id: 'au-android-survey-1',
    name: 'AU Mobile Survey Wall',
    network: 'CPAGrip',
    payout: 1.90,
    device: 'android',
    geo: 'AU',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69427',
    tracking_param: 'tracking_id',
    notes: 'Optimized for Australian mobile traffic',
  },
  {
    id: 'au-desktop-sweeps-1',
    name: 'AU Desktop Sweepstakes',
    network: 'MaxBounty',
    payout: 2.60,
    device: 'desktop',
    geo: 'AU',
    url: 'https://www.maxbounty.com/campaigns/8921',
    tracking_param: 'subid',
    notes: 'Premium AU desktop offer',
  },

  // --- Germany ---
  {
    id: 'de-android-app-1',
    name: 'DE App Install Campaign',
    network: 'OGAds',
    payout: 1.75,
    device: 'android',
    geo: 'DE',
    url: 'https://ogads.com/campaign/12983',
    tracking_param: 'subid',
    notes: 'German language app install, high approval',
  },
  {
    id: 'de-desktop-survey-1',
    name: 'DE Desktop Survey',
    network: 'CPAGrip',
    payout: 2.30,
    device: 'desktop',
    geo: 'DE',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=69876',
    tracking_param: 'tracking_id',
    notes: 'German language survey wall, high-converting',
  },

  // --- Global Fallbacks ---
  {
    id: 'global-android-1',
    name: 'Global Android Survey',
    network: 'CPAGrip',
    payout: 1.20,
    device: 'android',
    geo: 'any',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68987',
    tracking_param: 'tracking_id',
    notes: 'Fallback for unsupported Android geos',
  },
  {
    id: 'global-ios-1',
    name: 'Global iOS App Install',
    network: 'OGAds',
    payout: 1.00,
    device: 'ios',
    geo: 'any',
    url: 'https://ogads.com/campaign/12345',
    tracking_param: 'subid',
    notes: 'Fallback for unsupported iOS geos',
  },
  {
    id: 'global-desktop-1',
    name: 'Global Desktop Survey',
    network: 'MaxBounty',
    payout: 1.50,
    device: 'desktop',
    geo: 'any',
    url: 'https://www.maxbounty.com/campaigns/8432',
    tracking_param: 'subid',
    notes: 'Fallback for unsupported desktop geos',
  },
  {
    id: 'fallback-any-1',
    name: 'Universal Fallback Offer',
    network: 'CPAGrip',
    payout: 0.80,
    device: 'any',
    geo: 'any',
    url: 'https://singingfiles.com/show.php?l=0&u=2427730&id=68831',
    tracking_param: 'tracking_id',
    notes: 'Ultimate fallback if all targeting fails',
  },
];

// --------- ENHANCED OFFER LOOKUP SYSTEM ---------

// Index offers for fast lookup with multi-level indexing
const offerMapByGeoDevice = {};
const offerMapByGeo = {};
const offerMapByDevice = {};
let fallbackOffer = null;

// Build optimized lookup tables
offers.forEach((offer) => {
  // Store fallback offer
  if (offer.geo === 'any' && offer.device === 'any') {
    fallbackOffer = offer;
  }

  // Index by geo+device (most specific)
  const geoDeviceKey = `${offer.geo.toLowerCase()}_${offer.device.toLowerCase()}`;
  if (!offerMapByGeoDevice[geoDeviceKey]) {
    offerMapByGeoDevice[geoDeviceKey] = [];
  }
  offerMapByGeoDevice[geoDeviceKey].push(offer);

  // Index by geo only
  if (offer.geo !== 'any') {
    const geoKey = offer.geo.toLowerCase();
    if (!offerMapByGeo[geoKey]) {
      offerMapByGeo[geoKey] = [];
    }
    offerMapByGeo[geoKey].push(offer);
  }

  // Index by device only
  if (offer.device !== 'any') {
    const deviceKey = offer.device.toLowerCase();
    if (!offerMapByDevice[deviceKey]) {
      offerMapByDevice[deviceKey] = [];
    }
    offerMapByDevice[deviceKey].push(offer);
  }
});

/**
 * Enhanced getOffer function with smarter fallback hierarchy
 * 
 * @param {Object} params - Targeting parameters
 * @param {string} params.geo - Country code (e.g., 'US', 'UK', 'CA')
 * @param {string} params.device - Device type ('android', 'ios', 'desktop', 'any')
 * @param {string} params.source - Traffic source (optional)
 * @param {Object} params.userData - Additional user data for advanced targeting (optional)
 * @returns {Object} The best matching offer
 */
function getOffer(params = {}) {
  const { geo = 'any', device = 'any', source = null, userData = {} } = params;
  
  if (!geo || !device) {
    console.warn('Missing geo/device parameters. Using fallback offer.');
    return fallbackOffer || offers[0];
  }

  // Try most specific match first (geo + device)
  const geoDeviceKey = `${geo.toLowerCase()}_${device.toLowerCase()}`;
  if (offerMapByGeoDevice[geoDeviceKey] && offerMapByGeoDevice[geoDeviceKey].length > 0) {
    // Pick best offer based on payout (or other factors)
    return offerMapByGeoDevice[geoDeviceKey].sort((a, b) => b.payout - a.payout)[0];
  }

  // Try geo-specific offers with any device
  const geoAnyKey = `${geo.toLowerCase()}_any`;
  if (offerMapByGeoDevice[geoAnyKey] && offerMapByGeoDevice[geoAnyKey].length > 0) {
    return offerMapByGeoDevice[geoAnyKey].sort((a, b) => b.payout - a.payout)[0];
  }

  // Try device-specific offers with any geo
  const anyGeoDeviceKey = `any_${device.toLowerCase()}`;
  if (offerMapByGeoDevice[anyGeoDeviceKey] && offerMapByGeoDevice[anyGeoDeviceKey].length > 0) {
    return offerMapByGeoDevice[anyGeoDeviceKey].sort((a, b) => b.payout - a.payout)[0];
  }

  // Try geo-only lookup with highest paying offers first
  const geoKey = geo.toLowerCase();
  if (offerMapByGeo[geoKey] && offerMapByGeo[geoKey].length > 0) {
    return offerMapByGeo[geoKey].sort((a, b) => b.payout - a.payout)[0];
  }

  // Try device-only lookup with highest paying offers first
  const deviceKey = device.toLowerCase();
  if (offerMapByDevice[deviceKey] && offerMapByDevice[deviceKey].length > 0) {
    return offerMapByDevice[deviceKey].sort((a, b) => b.payout - a.payout)[0];
  }

  // Fallback to universal offer
  return fallbackOffer || offers[0];
}

/**
 * Get a list of all offers matching specific criteria
 * 
 * @param {Object} filters - Filter parameters
 * @param {string} filters.geo - Filter by country (optional)
 * @param {string} filters.device - Filter by device (optional)
 * @param {string} filters.network - Filter by network (optional)
 * @param {number} filters.minPayout - Minimum payout (optional)
 * @returns {Array} Array of matching offers
 */
function getOffers(filters = {}) {
  const { geo, device, network, minPayout } = filters;
  
  return offers.filter(offer => {
    if (geo && offer.geo !== 'any' && offer.geo.toLowerCase() !== geo.toLowerCase()) return false;
    if (device && offer.device !== 'any' && offer.device.toLowerCase() !== device.toLowerCase()) return false;
    if (network && offer.network.toLowerCase() !== network.toLowerCase()) return false;
    if (minPayout && offer.payout < minPayout) return false;
    return true;
  });
}

/**
 * Get the highest paying offer for a specific geo/device combination
 * 
 * @param {string} geo - Country code
 * @param {string} device - Device type
 * @returns {Object} The highest paying matching offer
 */
function getBestOffer(geo, device) {
  return getOffer({ geo, device });
}

/**
 * Format a tracking URL for an offer
 * 
 * @param {Object} offer - The offer object
 * @param {string} trackingId - Tracking ID to append
 * @param {Object} extraParams - Additional parameters (optional)
 * @returns {string} Fully formatted tracking URL
 */
function formatTrackingUrl(offer, trackingId, extraParams = {}) {
  if (!offer || !offer.url) return '';
  
  const url = new URL(offer.url);
  const params = new URLSearchParams(url.search);
  
  // Add tracking parameter
  if (offer.tracking_param && trackingId) {
    params.set(offer.tracking_param, trackingId);
  }
  
  // Add any extra parameters
  Object.entries(extraParams).forEach(([key, value]) => {
    params.set(key, value);
  });
  
  // Rebuild URL with updated parameters
  url.search = params.toString();
  return url.toString();
}

// Export all functions
module.exports = { 
  offers, 
  getOffer, 
  getOffers, 
  getBestOffer,
  formatTrackingUrl
};
