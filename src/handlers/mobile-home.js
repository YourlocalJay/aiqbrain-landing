/**
 * Mobile Home page handler for AIQBrain
 * Optimized for Brand Style Guide: Claude-style, conversion, mobile UX
 */
import { baseTemplate } from '../templates/base.js';

export async function mobileHomeHandler(request, env) {
  const content = `
    <div class="container page-container aiq-mobile-home" style="padding:1.5rem 1rem;max-width:430px;margin:auto;text-align:center;">
      <div style="margin-bottom:1.25rem;">
        <span style="display:inline-block;background:linear-gradient(90deg,#635BFF 0%,#2E24B9 100%);color:#fff;font-weight:bold;border-radius:12px;padding:0.25rem 0.8rem;font-size:0.8rem;letter-spacing:1px;text-transform:uppercase;">Claude-Compatible</span>
      </div>
      <h1 style="font-family:'Inter',sans-serif;font-size:2.1rem;font-weight:900;line-height:1.1;margin-bottom:1rem;background:linear-gradient(90deg,#635BFF,#2E24B9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        AIQBrain Mobile
      </h1>
      <div style="background:#F4F6FF;border-radius:12px;padding:1rem 0.75rem;margin-bottom:1.2rem;">
        <strong style="color:#635BFF;">Mobile-First Monetization.</strong>
        <p style="margin:0.4rem 0 0 0;color:#222;font-size:1.05rem;">Access instant Claude prompt vaults, conversion-optimized CPA drops, and high-impact toolkits—on the go.</p>
      </div>
      <ul style="padding-left:0;list-style:none;margin:1rem 0 1.4rem 0;">
        <li style="margin-bottom:0.6rem;display:flex;align-items:center;gap:0.6rem;"><span style="font-size:1.1rem;">📱</span><span style="color:#222;">One-tap mobile CPA offers</span></li>
        <li style="margin-bottom:0.6rem;display:flex;align-items:center;gap:0.6rem;"><span style="font-size:1.1rem;">🔒</span><span style="color:#222;">Safe, stealth, and encrypted</span></li>
        <li style="margin-bottom:0.6rem;display:flex;align-items:center;gap:0.6rem;"><span style="font-size:1.1rem;">🚀</span><span style="color:#222;">Claude workflows, always available</span></li>
      </ul>
      <div class="cta-container" style="margin-top:1.8rem;">
        <a href="/vault" class="btn btn-primary" style="width:100%;font-size:1.2rem;padding:0.9rem 0 0.9rem 0;font-weight:700;border-radius:10px;background:linear-gradient(90deg,#635BFF,#2E24B9);color:#fff;box-shadow:0 4px 20px #635bff22;">Open Claude Vault</a>
        <a href="/" class="btn btn-link" style="display:block;margin-top:1rem;font-weight:500;text-decoration:underline;color:#635BFF;">Return to Desktop Version</a>
      </div>
      <div style="margin-top:2.2rem;">
        <span style="font-size:0.92rem;color:#9292bc;">&copy; ${new Date().getFullYear()} AIQBrain.com &mdash; Monetization Mastery, Anywhere.</span>
      </div>
    </div>
  `;

  return new Response(baseTemplate(content, { page: 'mobile-home', title: 'AIQBrain Mobile | Claude Monetization', description: 'Access AIQBrain’s Claude-compatible mobile prompt vaults, CPA drops, and toolkits. Monetize on-the-go, with full brand security.' }), {
    headers: {
      'Content-Type': 'text/html'
    }
  });
}
