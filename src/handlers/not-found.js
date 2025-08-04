/**
 * AIQBrain 404 Handler - Branded Not Found Page
 * Follows Brand Style Guide: dark neural background, Claude voice, clear operator guidance.
 */
import { baseTemplate } from '../templates/base.js';

const SECURITY_HEADERS = Object.freeze({
  'Content-Type': 'text/html',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=120'
});
const NEURAL_PATTERN = "url('data:image/svg+xml,%3Csvg width=\'50\' height=\'50\' viewBox=\'0 0 50 50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%2358a6ff\' stroke-width=\'0.5\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'1.5\'/%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1.5\'/%3E%3Ccircle cx=\'40\' cy=\'10\' r=\'1.5\'/%3E%3Ccircle cx=\'10\' cy=\'40\' r=\'1.5\'/%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'1.5\'/%3E%3Cline x1=\'25\' y1=\'25\' x2=\'10\' y2=\'10\'/%3E%3Cline x1=\'25\' y1=\'25\' x2=\'40\' y2=\'10\'/%3E%3Cline x1=\'25\' y1=\'25\' x2=\'10\' y2=\'40\'/%3E%3Cline x1=\'25\' y1=\'25\' x2=\'40\' y2=\'40\'/%3E%3C/g%3E%3C/svg%3E')";

export function notFoundHandler(request, env) {
  const content = `
    <div style="
      min-height:100vh;
      background:#0a0e12;
      color:#e6edf3;
      font-family:'Inter Tight',sans-serif;
      position:relative;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      text-align:center;
    ">
      <div class="neural-pattern" style="
        position:absolute;inset:0;opacity:0.06;pointer-events:none;
        background-image:${NEURAL_PATTERN};
        background-size:50px 50px;
        z-index:0;
      "></div>
      <div style="position:relative;z-index:1;">
        <div style="
          font-family:'Space Mono',monospace;
          color:#58a6ff;
          font-size:5rem;
          font-weight:700;
          margin-bottom:0.5rem;
        ">404</div>
        <h1 style="
          font-family:'Space Mono',monospace;
          font-size:2rem;
          color:#ff7b72;
          font-weight:700;
          margin-bottom:1rem;
        ">
          Page Not Found
        </h1>
        <p style="
          color:rgba(230,237,243,0.8);
          font-size:1.1rem;
          margin-bottom:2.5rem;
        ">
          The page you’re seeking doesn’t exist on this operator system.<br>
          <span style="color:#f9c74f;font-weight:600;">Tip:</span> Check the URL or return to a secure route.
        </p>
        <a href="/" style="
          background:#58a6ff;
          color:#0a0e12;
          font-family:'Space Mono',monospace;
          padding:0.8rem 2.2rem;
          border-radius:6px;
          text-decoration:none;
          font-weight:700;
          font-size:1rem;
          transition:box-shadow 0.2s;
          box-shadow:0 4px 16px rgba(88,166,255,0.14);
          display:inline-block;
        ">
          Go Home
        </a>
        <div style="margin-top:2rem;font-size:0.95rem;color:rgba(230,237,243,0.5);">
          <span aria-hidden="true">🤖</span> AIQBrain: Claude-centric monetization, operator-grade execution.
        </div>
      </div>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
    </div>
  `;

  return new Response(
    baseTemplate(content, {
      title: '404 | AIQBrain',
      description: '404 Not Found — This page does not exist on AIQBrain.',
      page: '404'
    }),
    { status: 404, headers: SECURITY_HEADERS }
  );
}
