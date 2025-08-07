export async function vaultHandler(request) {
  // Check if this is a form submission
  if (request.method === 'POST') {
    return handleFormSubmission(request);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claude Control Room - Prompt Vault Access</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    :root {
      --bg-color: #0a0e12;
      --text-color: #e3e3e3;
      --accent-color: #444;
      --container-bg: #111417;
      --hint-color: #999;
      --focus-color: #4d90fe;
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
    form {
      margin-top: 2rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    input[type="email"] {
      width: 100%;
      padding: 0.6rem;
      background: #0e1117;
      border: 1px solid #333;
      color: #e3e3e3;
      font-family: inherit;
      font-size: 0.95rem;
      border-radius: 4px;
      transition: border-color 0.2s;
    }
    input[type="email"]:focus {
      outline: none;
      border-color: var(--focus-color);
      box-shadow: 0 0 0 1px var(--focus-color);
    }
    button {
      margin-top: 1rem;
      padding: 0.6rem 1rem;
      background: #1c1f24;
      color: #fff;
      border: 1px solid #444;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover {
      background-color: #25292f;
    }
    .status-message {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 4px;
      display: none;
    }
    .error {
      background-color: #2c0e0e;
      border: 1px solid #5c1a1a;
      color: #ff6b6b;
    }
    .success {
      background-color: #0e2c1a;
      border: 1px solid #1a5c2d;
      color: #6bff8b;
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
    <form method="POST" id="accessForm">
      <div class="form-group">
        <label for="email">Email unlock code (invite-only):</label>
        <input type="email" name="email" id="email" placeholder="you@example.com" required aria-required="true">
      </div>
      <button type="submit">Request Access</button>
      <div id="statusMessage" class="status-message"></div>
    </form>
    <p class="hint">Verification typically takes 2–3 minutes. No Claude Pro required.</p>
  </div>

  <script>
    document.getElementById('accessForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const button = form.querySelector('button[type="submit"]');
      const statusEl = document.getElementById('statusMessage');
      
      button.disabled = true;
      button.textContent = 'Processing...';
      statusEl.style.display = 'none';
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(form)),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const result = await response.json();
        
        if (result.success) {
          statusEl.className = 'status-message success';
          statusEl.textContent = result.message || 'Access request received! Check your email.';
        } else {
          statusEl.className = 'status-message error';
          statusEl.textContent = result.message || 'Error processing request';
        }
      } catch (error) {
        statusEl.className = 'status-message error';
        statusEl.textContent = 'Network error - please try again';
      } finally {
        statusEl.style.display = 'block';
        button.disabled = false;
        button.textContent = 'Request Access';
      }
    });
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0',
      'x-content-type-options': 'nosniff',
      'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    },
    status: 200
  });
}

async function handleFormSubmission(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    
    // Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Please provide a valid email address'
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }
    
    // Here you would typically:
    // 1. Validate the email against your invite list
    // 2. Send verification email or process access request
    // 3. Log the attempt
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Access request received. Check your email for verification.'
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      message: 'An error occurred processing your request'
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}
