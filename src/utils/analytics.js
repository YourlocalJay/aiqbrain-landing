/**
 * Analytics utilities for AIQBrain
 * Centralizes tracking functionality and integrates with Google Tag Manager
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
}

/**
 * Track a specific event
 * @param {string} eventName - The name of the event
 * @param {Object} eventData - Additional data to include with the event
 * @returns {void}
 */
export function trackEvent(eventName, eventData = {}) {
  // Add timestamp
  const eventWithTimestamp = {
    ...eventData,
    timestamp: new Date().toISOString()
  };
  
  // Send to Google Tag Manager
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventWithTimestamp
    });
  }
  
  // Send to Plausible (if available)
  if (typeof window.plausible === 'function') {
    try {
      window.plausible(eventName, { props: eventWithTimestamp });
    } catch (error) {
      console.error('Plausible tracking error:', error);
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
    }).catch(err => console.error('Server analytics error:', err));
  } catch (error) {
    console.error('Failed to send server-side analytics:', error);
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
