/**
 * Enhanced device detection with comprehensive pattern matching and performance optimizations.
 * @param {string} [userAgent=''] - User agent string
 * @returns {'mobile'|'tablet'|'desktop'} - Detected device type
 */
function detectDevice(userAgent = '') {
  if (!userAgent) return 'desktop';

  // Pre-compiled regex patterns with modern device detection
  const MOBILE_REGEX =
    /Android.+Mobile|iPhone|iPod|Windows Phone|BlackBerry|BB10|IEMobile|Opera Mini|Mobile|mobile/i;
  const TABLET_REGEX =
    /iPad|Android(?!.*Mobile)|Tablet|Silk|Kindle|PlayBook|Nexus 7|Nexus 10|KF[A-Z]{3,4}/i;

  // Ordered checks for most likely scenarios first
  return MOBILE_REGEX.test(userAgent) ? 'mobile'
    : TABLET_REGEX.test(userAgent) ? 'tablet'
    : 'desktop';
}

/**
 * Optimized geo data extraction with enhanced type safety and fallback values.
 * @param {Request} request - Incoming request object
 * @returns {{
 *   country: string,
 *   city: string,
 *   region: string,
 *   continent: string,
 *   timezone: string,
 *   latitude: number|null,
 *   longitude: number|null,
 *   asn: number|null,
 *   isEU: boolean
 * }} - Structured geo data
 */
function getGeoData(request) {
  const { cf = {}, headers } = request;
  const country = cf.country || headers.get('cf-ipcountry') || 'US';

  // Pre-compiled EU country regex for better performance
  const EU_COUNTRIES =
    /^(AT|BE|BG|HR|CY|CZ|DK|EE|FI|FR|DE|GR|HU|IE|IT|LV|LT|LU|MT|NL|PL|PT|RO|SK|SI|ES|SE)$/;

  return {
    country,
    city: cf.city || headers.get('cf-ipcity') || '',
    region: cf.region || headers.get('cf-region') || '',
    continent: cf.continent || '',
    timezone: cf.timezone || '',
    latitude: typeof cf.latitude === 'number' ? cf.latitude : null,
    longitude: typeof cf.longitude === 'number' ? cf.longitude : null,
    asn: cf.asn ? parseInt(cf.asn, 10) : null,
    isEU: cf.continent === 'EU' || EU_COUNTRIES.test(country)
  };
}

/**
 * High-performance fingerprint generation with configurable privacy controls.
 * @param {Request} request - Incoming request object
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.includeIP=true] - Include IP in fingerprint
 * @param {boolean} [options.includeGeo=false] - Include geo data in fingerprint
 * @returns {string} - 32-character unique identifier
 */
function generateFingerprint(request, { includeIP = true, includeGeo = false } = {}) {
  const { headers, cf = {} } = request;
  const signals = [
    headers.get('user-agent') || '',
    headers.get('accept-language') || '',
    headers.get('sec-ch-ua') || '',
    headers.get('sec-ch-ua-platform') || '',
    headers.get('sec-ch-ua-mobile') || '',
  ];

  if (includeIP) signals.push(headers.get('cf-connecting-ip') || '');
  if (includeGeo && cf) signals.push(`${cf.country || ''}|${cf.region || ''}`);

  // Optimized base64 encoding with URL-safe characters
  const rawString = signals.filter(Boolean).join('|');
  const uint8Array = new TextEncoder().encode(rawString);
  let base64 = btoa(String.fromCharCode.apply(null, uint8Array));

  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
    .slice(0, 32);
}

/**
 * Comprehensive traffic classification with enhanced detection and analytics.
 * @param {Request} request - Incoming request object
 * @returns {{
 *   device: string,
 *   geo: ReturnType<typeof getGeoData>,
 *   fingerprint: string,
 *   trackingParams: Object,
 *   traffic: {
 *     isBot: boolean,
 *     isSearchTraffic: boolean,
 *     isSocialTraffic: boolean,
 *     isEmailTraffic: boolean,
 *     isWeekend: boolean,
 *     userHour: number,
 *     dayOfWeek: number
 *   }
 * }} - Detailed traffic classification
 */
function classifyTraffic(request) {
  const url = new URL(request.url);
  const referrer = request.headers.get('referer') || '';
  const ua = request.headers.get('user-agent') || '';
  const now = new Date();

  // Tracking parameters with null-protection
  const TRACKING_KEYS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'src', 'source', 'ref', 'r', 'a', 'affiliate'
  ];
  const trackingParams = TRACKING_KEYS.reduce((acc, key) => {
    if (url.searchParams.has(key)) acc[key] = url.searchParams.get(key);
    return acc;
  }, {});

  // Pre-compiled regex patterns for traffic classification
  const BOT_REGEX = /bot|crawler|spider|lighthouse|pingdom|headless|phantom|selenium/i;
  const SEARCH_REGEX = /google|bing|yahoo|duckduckgo|baidu|yandex|ask|aol/i;
  const SOCIAL_REGEX = /facebook|twitter|linkedin|instagram|pinterest|youtube|tiktok|reddit|snapchat/i;
  const EMAIL_REGEX = /mail\.|outlook|gmail|yahoo\.mail|hotmail|mailchimp|campaign|e?newsletter/i;

  return {
    device: detectDevice(ua),
    geo: getGeoData(request),
    fingerprint: generateFingerprint(request),
    trackingParams,
    traffic: {
      isBot: BOT_REGEX.test(ua),
      isSearchTraffic: SEARCH_REGEX.test(referrer),
      isSocialTraffic: SOCIAL_REGEX.test(referrer),
      isEmailTraffic: trackingParams.utm_medium === 'email' ||
                     url.searchParams.has('em') ||
                     EMAIL_REGEX.test(referrer),
      isWeekend: [0, 6].includes(now.getUTCDay()),
      userHour: now.getUTCHours(),
      dayOfWeek: now.getUTCDay()
    }
  };
}

export { detectDevice, getGeoData, generateFingerprint, classifyTraffic };
