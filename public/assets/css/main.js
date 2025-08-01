/**
 * AIQBrain Main JavaScript
 * Handles interactive elements, analytics, and user experience
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initStickyBar();
  initCopyButtons();
  initFormValidation();
  initAnalyticsEvents();
  
  // Add any tracking parameters to internal links
  preserveUtmParams();
});

/**
 * Initialize sticky conversion bar
 */
function initStickyBar() {
  // Check if we should show the sticky bar
  const shouldShowStickyBar = !sessionStorage.getItem('stickyBarClosed');
  
  if (shouldShowStickyBar) {
    // Create sticky bar after scrolling 40% of page
    const scrollTrigger = window.innerHeight * 0.4;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > scrollTrigger) {
        showStickyBar();
      }
    });
  }
}

/**
 * Show the sticky conversion bar
 */
function showStickyBar() {
  // Check if sticky bar already exists
  if (document.querySelector('.sticky-bar')) {
    return;
  }
  
  // Create sticky bar element
  const stickyBar = document.createElement('div');
  stickyBar.className = 'sticky-bar';
  stickyBar.innerHTML = `
    <div class="sticky-bar-content">
      <p><strong>Ready to implement proven Claude monetization?</strong></p>
    </div>
    <div class="sticky-bar-actions">
      <a href="/request" class="btn btn-primary">Access Systems</a>
      <button class="btn-close" aria-label="Close">&times;</button>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(stickyBar);
  
  // Add event listener for close button
  const closeButton = stickyBar.querySelector('.btn-close');
  closeButton.addEventListener('click', function() {
    stickyBar.remove();
    sessionStorage.setItem('stickyBarClosed', 'true');
  });
  
  // Track view in analytics
  if (window.plausible) {
    window.plausible('StickyBar View');
  }
}

/**
 * Initialize code copy buttons
 */
function initCopyButtons() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    const codeContent = block.querySelector('pre').textContent;
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(codeContent).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
        
        // Track in analytics
        if (window.plausible) {
          window.plausible('Code Copied');
        }
      });
    });
    
    block.appendChild(copyButton);
  });
}

/**
 * Initialize form validation
 */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-invalid');
          
          // Create error message if it doesn't exist
          if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'This field is required';
            field.parentNode.insertBefore(errorMessage, field.nextElementSibling);
          }
        } else {
          field.classList.remove('is-invalid');
          if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
            field.nextElementSibling.remove();
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      } else {
        // Track form submission
        const formId = form.id || 'unknown-form';
        if (window.plausible) {
          window.plausible('Form Submit', { props: { form: formId } });
        }
      }
    });
  });
}

/**
 * Initialize analytics event tracking
 */
function initAnalyticsEvents() {
  // Track CTA button clicks
  const ctaButtons = document.querySelectorAll('.btn-primary, .cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      const href = this.getAttribute('href') || '';
      
      if (window.plausible) {
        window.plausible('CTA Click', { 
          props: { 
            text: buttonText,
            destination: href 
          }
        });
      }
    });
  });
  
  // Track secondary button clicks
  const secondaryButtons = document.querySelectorAll('.btn-secondary');
  secondaryButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const buttonText = this.textContent.trim();
      const href = this.getAttribute('href') || '';
      
      if (window.plausible) {
        window.plausible('Secondary Click', { 
          props: { 
            text: buttonText,
            destination: href 
          }
        });
      }
    });
  });
  
  // Track external links
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (window.plausible) {
        window.plausible('External Link', { props: { url: href } });
      }
    });
  });
}

/**
 * Preserve UTM parameters across internal links
 */
function preserveUtmParams() {
  // Get current URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToCopy = ['t', 'r', 'src', 'm', 'c', 'v']; // Tracking parameters from brand guide
  
  // Check if we have any tracking parameters
  let hasTrackingParams = false;
  for (const param of paramsToCopy) {
    if (urlParams.has(param)) {
      hasTrackingParams = true;
      break;
    }
  }
  
  // If we have tracking params, add them to all internal links
  if (hasTrackingParams) {
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="' + window.location.origin + '"]');
    
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      const url = new URL(href, window.location.origin);
      
      // Add tracking parameters to link
      for (const param of paramsToCopy) {
        if (urlParams.has(param)) {
          url.searchParams.set(param, urlParams.get(param));
        }
      }
      
      // Update link with new URL
      link.setAttribute('href', url.toString().replace(window.location.origin, ''));
    });
  }
}
