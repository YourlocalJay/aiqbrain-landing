/**
 * Terms page handler for AIQBrain
 */
import { baseTemplate } from '../../templates/base.js';

export async function termsHandler(request, env) {
  const content = `
    <div class="container legal-container">
      <h1>Terms of Service</h1>
      <p>
        <b>Effective Date: July 2025</b>
      </p>
      <p>
        By accessing or using the AIQBrain website and related services, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before using our site.
      </p>
      <h2>Use of Service</h2>
      <ul>
        <li>You must be at least 18 years old or the age of majority in your jurisdiction.</li>
        <li>You agree to use AIQBrain only for lawful purposes and in compliance with all applicable laws, regulations, and third-party platform terms.</li>
        <li>You will not use the site for any fraudulent, abusive, or unauthorized activity.</li>
      </ul>
      <h2>Intellectual Property</h2>
      <ul>
        <li>All content, frameworks, and resources provided on AIQBrain are protected by copyright and may not be redistributed, sold, or shared without written permission.</li>
        <li>You may not use our branding, trademarks, or proprietary information without prior consent.</li>
      </ul>
      <h2>Disclaimer of Warranties</h2>
      <ul>
        <li>AIQBrain is provided “as is” without warranties of any kind. We do not guarantee results, income, or specific outcomes from the use of our systems.</li>
        <li>Use of our site and services is at your own risk.</li>
      </ul>
      <h2>Limitation of Liability</h2>
      <ul>
        <li>To the fullest extent permitted by law, AIQBrain and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from the use of the site or reliance on any information provided.</li>
      </ul>
      <h2>Affiliate Disclosure</h2>
      <ul>
        <li>AIQBrain contains affiliate links. We may earn commissions when you click links and make purchases, at no extra cost to you. All affiliate relationships are disclosed transparently.</li>
      </ul>
      <h2>Modifications</h2>
      <ul>
        <li>We reserve the right to modify these Terms of Service at any time. Updates will be posted on this page and are effective upon posting. Continued use of the site constitutes acceptance of the new terms.</li>
      </ul>
      <h2>Contact</h2>
      <p>
        If you have any questions or concerns regarding these Terms, please email us at <a href="mailto:legal@aiqbrain.com">legal@aiqbrain.com</a>.
      </p>
      <div class="cta-container">
        <a href="/" class="btn btn-secondary">Return Home</a>
      </div>
    </div>
  `;

  return new Response(baseTemplate(content, {
    page: 'terms',
    title: 'Terms of Service | AIQBrain',
    description: 'AIQBrain Terms of Service and legal information.'
  }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
