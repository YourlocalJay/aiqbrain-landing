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
        <p><b>Effective Date: August 1, 2025</b></p>
        <p>AIQBrain ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
        <p>By using our website or services, you agree to the collection and use of information in accordance with this policy.</p>
      </section>

      <section class="legal-section">
        <h2>Information We Collect</h2>
        <ul>
          <li><strong>Personal Information:</strong> When you sign up, request access, or contact us, we may collect your name, email address, and any information you choose to provide.</li>
          <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, device info, pages visited, referral sources, and usage analytics. This is collected using cookies or similar technologies.</li>
          <li><strong>Affiliate & Tracking Data:</strong> To measure offer performance and traffic attribution, we may use tracking parameters and cookies. These are only used for operational and analytics purposes.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To operate and maintain our website and services</li>
          <li>To notify you about changes or updates</li>
          <li>To provide customer support and respond to your requests</li>
          <li>To monitor and analyze usage for security and improvement</li>
          <li>To detect, prevent, and address abuse or fraud</li>
          <li>To comply with legal obligations and platform requirements</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>Data Sharing and Disclosure</h2>
        <ul>
          <li>We do not sell your personal information.</li>
          <li>We may share data with trusted service providers (analytics, hosting, offer fulfillment) as needed to operate the service.</li>
          <li>We may disclose data if required by law, regulation, or in response to valid legal requests.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>Data Retention</h2>
        <p>We retain your information only as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.</p>
      </section>

      <section class="legal-section">
        <h2>Security</h2>
        <ul>
          <li>We use industry-standard security measures (encryption, access controls, etc.) to protect your information.</li>
          <li>However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</li>
          <li>Access to sensitive data is restricted to authorized personnel only.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>Analytics</h2>
        <p>We use Plausible Analytics, a privacy-focused analytics provider. Plausible does not use cookies or collect any personal data. All analytics data is anonymized and complies with GDPR, CCPA, and PECR regulations.</p>
      </section>

      <section class="legal-section">
        <h2>Your Rights</h2>
        <ul>
          <li>You may request access to, correction of, or deletion of your personal information by contacting us.</li>
          <li>You may opt out of marketing communications by following the instructions in our emails or contacting us directly.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2>Cookies and Tracking</h2>
        <p>We use cookies and tracking technologies for analytics, site performance, and offer attribution. You can manage cookie preferences in your browser settings.</p>
      </section>

      <section class="legal-section">
        <h2>Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Please review this policy periodically for updates.</p>
        <p>Last updated: August 1, 2025</p>
      </section>

      <section class="legal-section">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:privacy@aiqbrain.com">privacy@aiqbrain.com</a>.</p>
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
