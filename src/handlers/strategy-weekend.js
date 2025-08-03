/**
 * Strategy Weekend page handler for AIQBrain
 * Optimized & Brand Consistent (August 2025)
 */
import { baseTemplate } from '../templates/base.js';

export async function strategyWeekendHandler(request, env) {
  const content = `
    <section class="container page-container weekend-strategy">
      <div class="aiq-banner aiq-gradient">
        <strong>🔥 Weekend Accelerator:</strong> Unleash exclusive weekend-only strategies for rapid CPA scaling and persona activation.
      </div>
      <h1 class="aiq-main-title">AIQBrain Weekend Strategy Hub</h1>
      <p class="aiq-subheadline">Unlock tactics, vault drops, and limited-time opportunities. These blueprints drop Fridays and disappear Mondays. Early action = max reward.</p>
      <ul class="aiq-list aiq-list-tick">
        <li>Real-time Reddit drop schedules & "hot thread" targeting</li>
        <li>Mobile-first CPA funnels for weekend warriors</li>
        <li>Special vault unlocks: strategy PDFs, prompt packs, secret links</li>
        <li>Live ROI tracker & leaderboard for community operators</li>
        <li>Direct support: Ask an AIQBrain strategist during launch windows</li>
      </ul>
      <div class="cta-container">
        <a href="/vault" class="btn btn-gradient btn-lg aiq-cta">Claim This Weekend’s Drop</a>
      </div>
      <footer class="aiq-footer-note">
        <small>Weekend playbooks update every Friday at 8am PT. Move fast—access is gone Monday at midnight.</small>
      </footer>
    </section>
  `;

  return new Response(baseTemplate(content, { page: 'strategy-weekend' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
