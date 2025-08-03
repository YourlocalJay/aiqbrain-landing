/ **
 * Results page handler for AIQBrain
 * Optimized per AIQBrain Brand Style Guide (July 2025)
 */
import { baseTemplate } from '../templates/base.js';

export async function resultsHandler(request, env) {
  const content = `
    <div class="container page-container results-dashboard">
      <div class="neural-glyph"></div>
      <h1 class="headline branded-headline">Monetization Results Dashboard</h1>
      <p class="subheadline">
        See the real-world impact of Claude-centric monetization systems. Only results from verified AIQBrain operators and toolkits are featured below.
      </p>

      <section class="results-section">
        <h2 class="section-title">Latest Results</h2>
        <ul class="results-list">
          <li>
            <strong>$2,500+</strong> in affiliate payouts (Reddit CPA) <span class="result-meta">/ 7 days</span>
          </li>
          <li>
            <strong>17%</strong> average Reddit-to-CPA conversion rate <span class="result-meta">/ all verticals</span>
          </li>
          <li>
            <strong>140+</strong> Gumroad prompt vault sales <span class="result-meta">/ 30 days</span>
          </li>
          <li>
            <strong>100%</strong> platform compliance rate <span class="result-meta">/ tracked campaigns</span>
          </li>
        </ul>
      </section>

      <div class="cta-container">
        <a href="/vault" class="btn btn-primary btn-lg branded-btn">Access the Claude Pro Vault</a>
        <a href="https://aiqbrain.com/results" class="btn btn-secondary">See More Case Studies</a>
      </div>

      <div class="compliance-note">
        <small>
          Results are typical for high-activity AIQBrain operators. All claims verified and tracked per affiliate and platform TOS. <a href="/compliance">Learn more</a>.
        </small>
      </div>
    </div>
  `;

  return new Response(baseTemplate(content, { page: 'results' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
