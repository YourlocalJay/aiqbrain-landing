/**
 * AIQBrain main JavaScript file
 * Contains client-side functionality for the landing page system
 */

(function() {
  'use strict';

  // DOM Elements
  const domElements = {
    mobileMenuButton: document.querySelector('.mobile-menu-button'),
    mobileMenu: document.querySelector('.mobile-menu'),
    stickyBar: document.querySelector('.sticky-bar'),
    accessGates: document.querySelectorAll('.access-gate'),
    ctaButtons: document.querySelectorAll('.cta-button'),
    copyButtons: document.querySelectorAll('.copy-button')
  };

  // Initialize the application
  function init() {
    setupEventListeners();
    setupScrollEffects();
    setupTracking();
  }

  // Set up event listeners
  function setupEventListeners() {
    // Mobile menu toggle
    if (domElements.mobileMenuButton && domElements.mobileMenu) {
      domElements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // CTA button clicks
    if (domElements.ctaButtons.length > 0) {
      domElements.ctaButtons.forEach(button => {
        button.addEventListener('click', handleCTAClick);
      });
    }

    // Copy buttons for code blocks
    if (domElements.copyButtons.length > 0) {
      domElements.copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyClick);
      });
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    domElements.mobileMenu.classList.toggle('active');
    const isExpanded = domElements.mobileMenuButton.getAttribute('aria-expanded') === 'true';
    domElements.mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  }

  // Handle CTA button clicks
  function handleCTAClick(event) {
    const button = event.currentTarget;
    const action = button.dataset.action || 'default';
    
    // Track the click
    trackEvent('cta_click', {
      action: action,
      location: window.location.pathname,
      label: button.textContent.trim()
    });
  }

  // Handle copy button clicks
  function handleCopyClick(event) {
    const button = event.currentTarget;
    const codeBlock = button.closest('.code-wrapper').querySelector('code');
    
    if (codeBlock) {
      navigator.clipboard.writeText(codeBlock.textContent)
        .then(() => {
          // Show success state
          button.textContent = 'Copied!';
          button.classList.add('copied');
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  }

  // Set up scroll effects
  function setupScrollEffects() {
    // Show sticky bar on scroll
    if (domElements.stickyBar) {
      window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const triggerPosition = window.innerHeight * 0.4; // 40% of viewport height
        
        if (scrollPosition > triggerPosition) {
          domElements.stickyBar.classList.add('visible');
        } else {
          domElements.stickyBar.classList.remove('visible');
        }
      });
    }
    
    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-element');
    if (fadeElements.length > 0) {
      const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      fadeElements.forEach(element => {
        fadeInObserver.observe(element);
      });
    }
  }

  // Set up analytics tracking
  function setupTracking() {
    // Initialize dataLayer if not already initialized
    window.dataLayer = window.dataLayer || [];
    
    // Track page view
    trackEvent('page_view', {
      page: window.location.pathname,
      referrer: document.referrer
    });
    
    // Track scroll depth
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

  // Analytics tracking function
  function trackEvent(eventName, eventData = {}) {
    // Add timestamp
    eventData.timestamp = new Date().toISOString();
    
    // Send to server
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: eventName,
          data: eventData
        }),
        keepalive: true
      }).catch(err => console.error('Analytics error:', err));
    } catch (e) {
      console.error('Failed to send analytics:', e);
    }
    
    // Send to Google Tag Manager
    try {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventData
        });
      }
    } catch (gtmError) {
      console.error('GTM error:', gtmError);
    }
    
    // If Plausible is available
    if (typeof window.plausible === 'function') {
      try {
        window.plausible(eventName, { props: eventData });
      } catch (plausibleError) {
        console.error('Plausible error:', plausibleError);
      }
    }
  }

  // Initialize on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
