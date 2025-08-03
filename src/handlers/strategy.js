/**
 * Strategy page handler for AIQBrain
 */
import { baseTemplate } from '../templates/base.js';

export async function strategyHandler(request, env) {
  const content = `
    <div class="container page-container">
      <section class="hero-banner">
        <h1>AIQBrain Strategy Hub</h1>
        <p class="subheadline">Your exclusive HQ for Claude-centric monetization blueprints and tactical systems.</p>
        <div class="banner urgency-banner">
          ⚡️ Limited-Time Preview: Early Adopters Get Priority Access & Direct Support
        </div>
      </section>

      <section class="features-list">
        <ul>
          <li>Elite Claude-Compatible Monetization Blueprints</li>
          <li>Ready-to-Deploy Funnels for Reddit, Gumroad, & More</li>
          <li>Live Tactical Walkthroughs & AI Persona Playbooks</li>
          <li>Automation Stack Reviews & Vault Upgrade Paths</li>
          <li>Conversion-Tested Offer Rotators & Traffic Filters</li>
        </ul>
      </section>

      <div class="cta-container">
        <a href="/apply" class="btn btn-primary">Apply for Strategy Access – Instant Review</a>
      </div>

      <section class="why-choose">
        <h2>Why Choose AIQBrain Strategy Hub?</h2>
        <p>Gain exclusive access to insider-level strategies designed to maximize your Claude-driven revenue streams with precision and speed.</p>
        <p>Our conversion-focused blueprints are engineered to deliver measurable growth through automation-first systems that save you time and scale your impact.</p>
        <p>Join a community of elite early adopters and receive direct support, live walkthroughs, and continuous vault upgrades that keep you ahead of the curve.</p>
      </section>
    </div>
  `;

  return new Response(baseTemplate(content, { page: 'strategy' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
