/**
 * Privacy page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';
import { getCopyrightNotice } from '../../components/legal.js';

export async function privacyHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Privacy Policy</h1>
      
      <section class="legal-section">
        <h2>Introduction</h2>
        <p>AIQBrain ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
        <p>By using our website or services, you agree to the collection and use of information in accordance with this policy.</p>
      </section>
      
      <section class="legal-section">
        <h2>Information We Collect</h2>
        <p>We collect several types of information from and about users of our website, including:</p>
        <ul>
          <li><strong>Personal Information:</strong> Email address, name, and contact details you provide when requesting access to our services or contacting us.</li>
          <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.</li>
          <li><strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
        </ul>
      </section>
      
      <section class="legal-section">
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, including:</p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information to improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>
      </section>
      
      <section class="legal-section">
        <h2>Data Retention</h2>
        <p>We will retain your personal information only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>
      </section>
      
      <section class="legal-section">
        <h2>Security</h2>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
      </section>
      
      <section class="legal-section">
        <h2>Analytics</h2>
        <p>We use Plausible Analytics, a privacy-focused analytics service, to track and monitor the usage of our service. Plausible Analytics does not use cookies and complies with GDPR, CCPA, and PECR regulations. It does not collect any personal data or personally identifiable information.</p>
      </section>
      
      <section class="legal-section">
        <h2>Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        <p>Last updated: August 1, 2025</p>
      </section>
      
      <section class="legal-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@aiqbrain.com">privacy@aiqbrain.com</a>.</p>
      </section>
      
      ${getCopyrightNotice()}
      
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;
  
  return new Response(baseTemplate(content, { 
    page: 'privacy',
    title: 'Privacy Policy | AIQBrain',
    description: 'AIQBrain Privacy Policy and legal information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
