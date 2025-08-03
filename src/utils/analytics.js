/**
 * AIQBrain Analytics (Plausible-first)
 * Centralized analytics utilities. Plausible is the source of truth; GTM is fallback.
 * All event payloads use snake_case. Handles event deduplication.
 * Brand style and compliance by AIQBrain guidelines.
 */

/**
 * Initialize analytics systems
 * @returns {void}
 */
export function initAnalytics() {
  // Initialize dataLayer for Google Tag Manager if not already defined
  window.dataLayer = window.dataLayer || [];

  // Track page view on initialization
  trackPageView();

  // Set up scroll depth tracking
  setupScrollTracking();

  // Ensure outbound link and download tracking is initialized (Plausible best practice)
  if (typeof window.plausible === 'function') {
    try {
      window.plausible('Outbound Link: Click', { props: {} }); // dummy fire to ensure enabled
      window.plausible('File Download', { props: {} });
    } catch (error) {
      console.warn('Plausible outbound/download tracking init error:', error);
    }
  }
}

/**
 * Track a specific event
 * @param {string} eventName - The name of the event
 * @param {Object} eventData - Additional data to include with the event
 * @returns {void}
 */
const _eventDeduplicationWindowMs = 750;
let _recentEvents = [];

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).replace(/^_/, '');
}

function keysToSnakeCase(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const out = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeKey = toSnakeCase(key);
      out[snakeKey] = keysToSnakeCase(obj[key]);
    }
  }
  return out;
}

export function trackEvent(eventName, eventData = {}) {
  // Deduplicate rapid events (by eventName + stringified data)
  const now = Date.now();
  const eventKey = eventName + ':' + JSON.stringify(eventData);
  _recentEvents = _recentEvents.filter(e => now - e.ts < _eventDeduplicationWindowMs);
  if (_recentEvents.some(e => e.key === eventKey)) {
    // Deduplicated: skip
    return;
  }
  _recentEvents.push({ key: eventKey, ts: now });

  // Construct snake_case payload (for Plausible consistency)
  const snakeData = keysToSnakeCase(eventData);
  const eventWithTimestamp = {
    ...snakeData,
    timestamp: new Date().toISOString()
  };

  // Plausible is primary analytics system
  let plausibleError = null;
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { props: eventWithTimestamp });
    } catch (error) {
      plausibleError = error;
      console.warn('Plausible tracking error:', error);
    }
  }

  // Fallback to GTM/dataLayer if present
  if (!window.plausible || plausibleError) {
    if (window.dataLayer) {
      try {
        window.dataLayer.push({
          event: eventName,
          ...eventWithTimestamp
        });
      } catch (err) {
        console.warn('GTM/dataLayer push error:', err);
      }
    }
  }

  // Send to server-side analytics
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        event: eventName,
        data: eventWithTimestamp
      }),
      keepalive: true
    }).catch(err => {
      console.warn('Server analytics (network) error:', err);
    });
  } catch (error) {
    console.warn('Failed to send server-side analytics:', error);
  }
}

/**
 * Track a page view
 * @param {Object} additionalData - Additional data to include with the page view
 * @returns {void}
 */
export function trackPageView(additionalData = {}) {
  const pageData = {
    page_title: document.title,
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer,
    ...additionalData
  };
  trackEvent('page_view', pageData);
}

/**
 * Track a conversion
 * @param {string} conversionType - Type of conversion
 * @param {Object} conversionData - Additional data about the conversion
 * @returns {void}
 */
export function trackConversion(conversionType, conversionData = {}) {
  trackEvent('conversion', {
    conversion_type: conversionType,
    ...conversionData
  });
}

/**
 * Set up scroll depth tracking
 * @returns {void}
 */
function setupScrollTracking() {
  let scrollDepthTriggered = {
    25: false,
    50: false,
    75: false,
    100: false
  };

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    Object.keys(scrollDepthTriggered).forEach(depth => {
      if (!scrollDepthTriggered[depth] && scrollPercentage >= parseInt(depth)) {
        scrollDepthTriggered[depth] = true;
        trackEvent('scroll_depth', {
          depth: depth + '%',
          page: window.location.pathname
        });
      }
    });
  });
}

/**
 * Track clicks on specific elements
 * @param {string} selector - CSS selector for elements to track
 * @param {string} eventName - Name of the event to track
 * @param {Function} dataCallback - Function to extract additional data from the clicked element
 * @returns {void}
 */
export function trackElementClicks(selector, eventName, dataCallback = null) {
  const elements = document.querySelectorAll(selector);

  elements.forEach(element => {
    element.addEventListener('click', (event) => {
      const baseData = {
        element_text: element.textContent.trim(),
        element_type: element.tagName.toLowerCase(),
        page: window.location.pathname
      };

      const additionalData = dataCallback ? dataCallback(element, event) : {};

      trackEvent(eventName, {
        ...baseData,
        ...additionalData
      });
    });
  });
}

// To add custom event flows (e.g., vault unlock, persona run, affiliate click),
// use trackEvent('custom_event_name', { ...props });
// Example: trackEvent('vault_access', { user_id, vault_id, source: 'reddit' });
