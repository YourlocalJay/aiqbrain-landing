
/**
 * FAQ page handler for AIQBrain
 * Fully optimized and consistent with AIQBrain Brand Style Guide
 */
import { baseTemplate } from '../templates/base.js';

export async function faqHandler(request, env) {
  const content = `
    <section class="brand-section bg-gradient-dark py-5">
      <div class="container page-container">
        <h1 class="brand-title">AIQBrain: Frequently Asked Questions</h1>
        <p class="brand-subheading">All your questions about Claude-centric monetization, automation, compliance, and scaling answered here.</p>
        <div class="faq-list">
          <div class="faq-item">
            <h2 class="faq-q">What is AIQBrain?</h2>
            <p class="faq-a">AIQBrain is a results-driven monetization and automation system built for digital operators, offering advanced Claude-compatible funnels, secure link routing, and compliant scaling blueprints.</p>
          </div>
          <div class="faq-item">
            <h2 class="faq-q">Who is AIQBrain for?</h2>
            <p class="faq-a">Designed for solopreneurs, growth hackers, affiliates, and Claude power users who need tactical, scalable, and compliant monetization stacks.</p>
          </div>
          <div class="faq-item">
            <h2 class="faq-q">What makes AIQBrain different?</h2>
            <p class="faq-a">AIQBrain is built on the principle of tactical conversion: dynamic routing, advanced compliance, AI-augmented funnel optimization, and rapid traffic adaptation—executed with an operator’s mindset.</p>
          </div>
          <div class="faq-item">
            <h2 class="faq-q">Do I need technical experience?</h2>
            <p class="faq-a">No coding required. Our toolkits, templates, and automations are designed to launch in minutes. Advanced users can extend everything via API, Notion, and MCP tools.</p>
          </div>
          <div class="faq-item">
            <h2 class="faq-q">How is compliance managed?</h2>
            <p class="faq-a">AIQBrain integrates dynamic compliance banners, legal page rotation, and detailed audit logs—every funnel is built to pass Tier-1 scrutiny.</p>
          </div>
          <div class="faq-item">
            <h2 class="faq-q">Can I run CPA/affiliate offers on Reddit?</h2>
            <p class="faq-a">Yes. AIQBrain’s persona and routing stack is optimized for Reddit, with stealth landing pages, bot filtering, and device/GEO targeting to ensure both compliance and ROI.</p>
          </div>
        </div>
        <div class="cta-container mt-5">
          <a href="/request" class="btn btn-gradient-primary btn-lg mr-3">Request Access</a>
          <a href="/" class="btn btn-outline-light btn-lg">Return Home</a>
        </div>
        <div class="brand-disclaimer mt-4 small text-muted">
          All systems and automation stacks are for educational and research use only. Read our <a href="/compliance">compliance</a> page for more details.
        </div>
      </div>
    </section>
  `;

  return new Response(baseTemplate(content, { page: 'faq' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
