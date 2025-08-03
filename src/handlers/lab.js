/**
 * Monetization Lab Handler — AIQBrain.com
 * Claude-Centric Experiments & Rapid Optimization
 */
import { baseTemplate } from '../templates/base.js';

export async function labHandler(request, env) {
  const content = `
    <div class="container page-container aiqbrain-gradient" style="padding-top: 32px;">
      <h1 class="headline" style="font-family: Inter, sans-serif; font-weight: 700; font-size: 2.2rem; color: #232247; margin-bottom: 16px;">
        Claude Monetization Lab <span style="color:#635BFF;">🧠</span>
      </h1>
      <p style="font-size: 1.1rem; color: #39386b; max-width: 580px;">
        The AIQBrain Monetization Lab is your sandbox for Claude-powered experiments, split-tests, and high-conversion workflows.
        <strong>Prototype new offers, launch vault tests, and optimize Reddit/CPA funnels with real data and exclusive tools.</strong>
      </p>

      <section class="features" style="margin-top: 32px;">
        <div class="feature-block" style="margin-bottom: 18px;">
          <h2 style="font-size: 1.25rem; color: #635BFF;">⚡ Workflow Experiments</h2>
          <p>Run rapid A/B/C tests on Reddit, Gumroad, and CPA flows. Track analytics, click maps, and conversion rates in real time.</p>
        </div>
        <div class="feature-block" style="margin-bottom: 18px;">
          <h2 style="font-size: 1.25rem; color: #635BFF;">🔒 Split-Testing Vaults</h2>
          <p>Deploy multiple Claude-compatible prompt packs and offer links. Rotate by GEO, device, or time—analyze what drives real revenue.</p>
        </div>
        <div class="feature-block" style="margin-bottom: 18px;">
          <h2 style="font-size: 1.25rem; color: #635BFF;">🚀 Early Access Toolkits</h2>
          <p>Access unreleased automation kits and pro-level Claude workflows before public launch. Beta users get priority support and insights.</p>
        </div>
      </section>

      <div class="cta-container" style="margin-top: 38px;">
        <a href="/vault" class="btn btn-primary" style="font-size:1.1rem; padding: 0.85em 2em; border-radius:32px; background: linear-gradient(90deg,#635BFF,#8C87F7); border:none;">
          Enter Monetization Vault
        </a>
        <a href="/contact" class="btn btn-secondary" style="margin-left:12px; color:#635BFF; text-decoration:underline;">Contact Support</a>
      </div>

      <form action="/api/lab-signup" method="POST" class="email-form" style="margin-top:36px;">
        <label for="email" style="font-weight:600; color:#39386b;">Join Lab Early-Access/Beta List:</label><br/>
        <input type="email" name="email" id="email" placeholder="you@email.com" required style="padding:0.7em; border-radius:8px; border:1px solid #bfc8ff; margin-right:10px;">
        <button type="submit" class="btn btn-primary" style="background:#635BFF; color:#fff; font-weight:600; border-radius:8px; padding:0.7em 1.6em;">Notify Me</button>
      </form>

      <footer style="margin-top:48px; font-size:0.95rem; color:#8a8ab2;">
        <span>&copy; ${new Date().getFullYear()} AIQBrain.com — Claude-Centric Monetization Systems</span>
      </footer>
    </div>
  `;

  return new Response(baseTemplate(content, { page: 'lab' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
