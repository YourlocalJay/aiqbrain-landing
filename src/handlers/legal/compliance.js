/**
 * Compliance page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';
import { getOwnershipStatement, getIncomeDisclaimer, getAIUsageNotice } from '../../components/legal.js';

export async function complianceHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Compliance</h1>
      <p>
        <b>AIQBrain is committed to full compliance with all applicable laws, regulations, and platform policies.</b>
      </p>
      <ul>
        <li>All monetization systems and recommendations are designed to operate within the Terms of Service (TOS) of referenced platforms.</li>
        <li>No techniques are provided or endorsed that violate platform rules, encourage prohibited activities, or circumvent compliance mechanisms.</li>
        <li>All affiliate and CPA relationships are transparently disclosed. Users are encouraged to read and follow the TOS of all third-party services they interact with.</li>
        <li>We do not guarantee income or specific results. Operator success depends on many factors including execution quality, market conditions, and compliance with third-party rules.</li>
        <li>Any suggestions or systems presented should be reviewed and adapted as necessary to remain within the guidelines of the operator’s jurisdiction and platform rules.</li>
      </ul>
      <p>
        If you believe any content or system on AIQBrain is non-compliant, please contact us immediately at <a href="mailto:compliance@aiqbrain.com">compliance@aiqbrain.com</a> and we will investigate.
      </p>
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;

  return new Response(baseTemplate(content, {
    page: 'compliance',
    title: 'Compliance | AIQBrain',
    description: 'AIQBrain Compliance policies and information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
