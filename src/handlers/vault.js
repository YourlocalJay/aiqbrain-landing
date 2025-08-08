export async function vaultHandler(request, env, ctx) {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AIQBrain Vault</title>
    <meta name="robots" content="noindex,nofollow" />
    <style>
      body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#0a0e12; color:#eaecef; margin:0; padding:2rem; }
      .wrap { max-width:680px; margin:0 auto; }
      h1 { font-size: 2rem; margin: 0 0 0.5rem; }
      p { opacity:.85; }
      form { margin-top:1.25rem; display:grid; gap:12px; }
      label { font-weight:600; }
      input, select { padding:.75rem .9rem; border-radius:.6rem; border:1px solid rgba(255,255,255,.08); background:#0f1318; color:#eaecef; }
      button { padding:.8rem 1.1rem; border-radius:.6rem; border:0; background:#635BFF; color:#fff; cursor:pointer; }
      button:hover { filter:brightness(1.1); }
      small { opacity:.75; }
    </style>
  </head>
  <body>
    <div class="wrap">
      <h1>Request Vault Access</h1>
      <p>Enter your email to preview the Claude Prompt Vault. We’ll redirect you to the unlock step.</p>

      <form id="access-form" method="GET" action="/access">
        <div>
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required autocomplete="email" placeholder="operator@domain.com" />
        </div>
        <div>
          <label for="experience">Implementation Tier</label>
          <select id="experience" name="experience" required>
            <option value="" disabled selected>Select tier</option>
            <option value="beginner">Emerging Operator</option>
            <option value="intermediate">Scaling Practice</option>
            <option value="advanced">Enterprise System</option>
          </select>
        </div>
        <!-- Hidden UTM passthrough fields -->
        <input type="hidden" name="utm_source" />
        <input type="hidden" name="utm_medium" />
        <input type="hidden" name="utm_campaign" />
        <input type="hidden" name="utm_content" />
        <button type="submit">Unlock →</button>
        <small>By continuing you agree to noindex access terms.</small>
      </form>
    </div>

    <script>
      // Copy UTMs from page URL into hidden inputs; no client-side webhook (server posts in /access)
      (function(){
        var p = new URLSearchParams(location.search);
        ["utm_source","utm_medium","utm_campaign","utm_content"].forEach(function(k){
          var el = document.querySelector('[name="'+k+'"]');
          if (el && p.get(k)) el.value = p.get(k);
        });
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0'
    }
  });
}
