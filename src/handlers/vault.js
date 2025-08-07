export async function vaultHandler() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claude Control Room</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    :root {
      --bg-color: #0a0e12;
      --text-color: #e3e3e3;
      --accent-color: #444;
      --container-bg: #111417;
      --hint-color: #999;
    }
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: 'SF Mono', 'Roboto Mono', monospace;
      margin: 0;
      padding: 2rem 1rem;
      line-height: 1.6;
      min-height: 100vh;
    }
    .vault {
      max-width: 600px;
      margin: 0 auto;
      border: 1px dashed var(--accent-color);
      padding: clamp(1.5rem, 5vw, 2rem);
      background-color: var(--container-bg);
      box-shadow: 0 0 12px rgba(0,0,0,0.3);
    }
    .header {
      font-size: clamp(1.2rem, 4vw, 1.5rem);
      margin-bottom: 1rem;
      font-weight: 600;
      color: #f0f0f0;
    }
    .hint {
      font-size: 0.85rem;
      color: var(--hint-color);
      margin-top: 1.5rem;
    }
    ul {
      padding-left: 1.2rem;
      margin: 1.5rem 0;
    }
    li {
      margin-bottom: 0.5rem;
      position: relative;
      list-style-type: none;
    }
    li:before {
      content: "✅";
      position: absolute;
      left: -1.5rem;
    }
    p {
      margin: 0.8rem 0;
    }
  </style>
</head>
<body>
  <div class="vault">
    <div class="header">Claude Control Room: Prompt Vault Access</div>
    <p>Access restricted AI monetization systems and unreleased Claude prompt kits.</p>
    <ul>
      <li>Vault #1: High-Converting Prompt Frameworks</li>
      <li>Vault #2: Automated Survey Systems (Claude-Compatible)</li>
      <li>Vault #3: CPA + Claude Prompt Bridge Scripts</li>
    </ul>
    <p class="hint">Access requires identity verification. For compliance reasons, prompt distribution is gated.</p>
  </div>
</body>
</html>`;
  
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0',
      'x-content-type-options': 'nosniff'
    },
    status: 200
  });
}
