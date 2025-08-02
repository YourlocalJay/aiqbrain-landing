/**
 * Compliance page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';
import { getOwnershipStatement, getIncomeDisclaimer, getAIUsageNotice } from '../../components/legal.js';

export async function complianceHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>AIQBrain Compliance</h1>
      
      <section class="legal-section">
        <h2>Platform Compliance</h2>
        <p>AIQBrain is committed to operating within the terms of service of all platforms and services we interact with. Our systems are designed to comply with Claude and other AI platform guidelines while maximizing performance.</p>
        
        <p>We actively monitor platform updates and policy changes to ensure our systems remain compliant and effective. All frameworks, templates, and guidance provided through AIQBrain are designed to work within established platform boundaries.</p>
      </section>
      
      <section class="legal-section">
        <h2>User Responsibility</h2>
        <p>While we design our systems to be compliant, all users are responsible for implementing these systems in accordance with relevant platform guidelines and applicable laws in their jurisdiction.</p>
        
        <p>Users agree to:</p>
        <ul>
          <li>Review and understand the terms of service for any platforms they use</li>
          <li>Implement AIQBrain systems within those guidelines</li>
          <li>Use the content and outputs responsibly and legally</li>
          <li>Keep informed about platform policy changes</li>
        </ul>
      </section>
      
      ${getOwnershipStatement()}
      ${getIncomeDisclaimer()}
      ${getAIUsageNotice()}
      
      <section class="legal-section">
        <h2>Updates to Compliance Policies</h2>
        <p>Our compliance policies are regularly updated to reflect platform changes and industry best practices. Users should check this page periodically for updates.</p>
        <p>Last Updated: August 1, 2025</p>
      </section>
      
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
