/**
 * Vault handler for AIQBrain
 * Displays Claude Pro Vault landing page with monetization masterclass details
 */
import { baseTemplate } from '../templates/base.js';

export async function vaultHandler(request, env) {
  const spotsLeft = env.URGENCY_SPOTS_LEFT || null;
  const urgencyBanner = spotsLeft
    ? `<div class="urgency-banner">⚡ Only ${spotsLeft} Masterclass spots left. Act now.</div>`
    : '';

  const content = `
    <section class="hero-section">
      ${urgencyBanner}
      <div class="hero-content">
        <div class="hero-text">
          <h1>Claude Pro Vault: Monetization Masterclass</h1>
          <p>Unlock exclusive Claude prompt packs, monetization strategies, and dark-grey hat playbooks trusted by top operators.</p>
          <div class="hero-ctas">
            <a href="/vault/access" class="btn btn-primary">Access Prompt Vault</a>
            <a href="https://gumroad.com/masterclass" target="_blank" rel="noopener" class="btn btn-outline">See Gumroad Masterclass</a>
          </div>
          <ul class="value-bullets">
            <li>49 Claude workflows</li>
            <li>Stealth-tested by Reddit pros</li>
            <li>Instant delivery, 100% mobile-ready</li>
          </ul>
        </div>
        <div class="vault-badge">CLAUDE-APPROVED VAULT</div>
      </div>
    </section>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

      .hero-section {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(90deg, #635BFF 0%, #4F47FF 100%);
        color: white;
        padding: 4rem 2rem 3rem;
        position: relative;
        overflow: visible;
      }

      .urgency-banner {
        background-color: #FFDD57;
        color: #4F47FF;
        font-weight: 700;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        max-width: 320px;
        margin: 0 auto 1.5rem;
        text-align: center;
        font-size: 1rem;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      }

      .hero-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        max-width: 960px;
        margin: 0 auto;
        position: relative;
      }

      .hero-text {
        max-width: 600px;
      }

      .hero-text h1 {
        font-weight: 900;
        font-size: 3rem;
        margin-bottom: 1rem;
        line-height: 1.1;
      }

      .hero-text p {
        font-weight: 500;
        font-size: 1.25rem;
        margin-bottom: 2rem;
        line-height: 1.4;
        max-width: 520px;
      }

      .hero-ctas {
        display: flex;
        gap: 1rem;
        margin-bottom: 2.5rem;
      }

      .btn {
        font-weight: 700;
        font-size: 1.125rem;
        padding: 0.75rem 1.75rem;
        border-radius: 6px;
        text-decoration: none;
        display: inline-block;
        transition: background-color 0.3s ease, color 0.3s ease;
        cursor: pointer;
        user-select: none;
      }

      .btn-primary {
        background-color: #FFDD57;
        color: #4F47FF;
        border: none;
      }

      .btn-primary:hover,
      .btn-primary:focus {
        background-color: #f7d844;
        outline: none;
      }

      .btn-outline {
        background-color: transparent;
        color: white;
        border: 2px solid white;
      }

      .btn-outline:hover,
      .btn-outline:focus {
        background-color: rgba(255, 255, 255, 0.15);
        outline: none;
      }

      .value-bullets {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 2.5rem;
        font-weight: 600;
        font-size: 1.125rem;
      }

      .value-bullets li {
        position: relative;
        padding-left: 1.5rem;
      }

      .value-bullets li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #FFDD57;
        font-weight: 900;
        font-size: 1.5rem;
        line-height: 1;
        top: 0;
      }

      .vault-badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(255, 221, 87, 0.15);
        color: #FFDD57;
        font-weight: 700;
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        border-radius: 0 0 0 8px;
        letter-spacing: 0.05em;
        user-select: none;
        pointer-events: none;
        text-transform: uppercase;
      }

      @media (max-width: 720px) {
        .hero-content {
          flex-direction: column;
          align-items: flex-start;
        }

        .vault-badge {
          position: static;
          margin-bottom: 1.5rem;
          border-radius: 8px;
          text-align: center;
          width: fit-content;
          pointer-events: auto;
        }

        .value-bullets {
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
      }
    </style>
  `;

  return new Response(baseTemplate(content, {
    title: 'Claude Pro Vault | AIQBrain',
    description: 'Unlock the highest-converting Claude prompt vault and affiliate playbooks for rapid revenue.'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
