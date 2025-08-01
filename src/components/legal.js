/**
 * Legal components for AIQBrain
 * Provides consistent legal disclaimers and notices across the site
 */

export function getIncomeDisclaimer() {
  return `<div class="disclaimer income-disclaimer">
    <p><strong>Income Disclaimer:</strong> Results mentioned in our materials represent what is possible with proper implementation. Your results will vary based on niche selection, execution quality, market conditions, and other factors. We make no guarantee of specific revenue levels. Success requires work, testing, and optimization.</p>
  </div>`;
}

export function getAIUsageNotice() {
  return `<div class="disclaimer ai-usage-notice">
    <p><strong>AI Usage Notice:</strong> Our systems operate within platform terms of service. All AI outputs should be reviewed and edited before implementation. You are responsible for ensuring compliance with platform guidelines and applicable laws in your jurisdiction.</p>
  </div>`;
}

export function getAffiliateDisclosure() {
  return `<div class="disclaimer affiliate-disclosure">
    <p><strong>Affiliate Disclosure:</strong> This site contains affiliate links. When you click these links and make purchases, we may earn commissions at no additional cost to you. We only recommend tools we've personally tested in our own systems. Transparency is our priority -- all commercial relationships are disclosed.</p>
  </div>`;
}

export function getCopyrightNotice() {
  return `<div class="disclaimer copyright-notice">
    <p>© ${new Date().getFullYear()} AIQBrain.com. All rights reserved. This content is for personal use only. Redistribution, resale, or sharing access is prohibited and will result in immediate termination of access without refund.</p>
  </div>`;
}

export function getOwnershipStatement() {
  return `<div class="disclaimer ownership-statement">
    <p>AIQBrain is an independent resource for AI monetization strategies. We are not affiliated with Anthropic, OpenAI, or any mentioned platforms beyond standard user relationships.</p>
  </div>`;
}

export function getFooterLegal() {
  return `<footer class="site-footer">
    <div class="container">
      ${getCopyrightNotice()}
      <div class="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/compliance">Compliance</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </footer>`;
}

// Function to add the appropriate legal disclaimer based on page type
export function getPageLegalNotices(page) {
  let notices = '';
  
  switch(page) {
    case 'strategy':
    case 'strategy-weekend':
    case 'lab':
    case 'results':
      notices += getIncomeDisclaimer();
      notices += getAIUsageNotice();
      break;
    case 'home':
    case 'high-intent':
    case 'mobile':
      notices += getOwnershipStatement();
      break;
    case 'vault':
    case 'request':
      notices += getIncomeDisclaimer();
      notices += getAffiliateDisclosure();
      notices += getAIUsageNotice();
      break;
  }
  
  return notices;
}

// Function to add legal notices required before purchase buttons
export function getLegalBeforePurchase() {
  return `<div class="pre-purchase-legal">
    ${getIncomeDisclaimer()}
    ${getAIUsageNotice()}
    ${getAffiliateDisclosure()}
  </div>`;
}
