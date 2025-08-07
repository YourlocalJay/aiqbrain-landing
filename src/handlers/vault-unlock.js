export async function vaultUnlockHandler(request, env, ctx) {
  // Handle non-POST requests immediately
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'POST' }
    });
  }

  try {
    const formData = await request.formData();
    const email = formData.get('email')?.trim();
    const timestamp = new Date().toISOString();

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return renderResponse('⚠️ Invalid Email', 'Please provide a valid email address', false);
    }

    // Prepare common metadata
    const metadata = {
      email,
      ua: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
      cfRay: request.headers.get('cf-ray') || 'unknown',
      ts: timestamp,
      country: request.cf?.country || 'unknown'
    };

    // Parallelize logging operations
    await Promise.all([
      logToKV(env, metadata),
      notifyWebhook(env, metadata),
      sendVerificationEmail(env, email, metadata) // Optional email sending
    ]);

    // Always return the same success message regardless of logging results
    return renderResponse(
      '✅ Request Received', 
      'If you\'re approved, you\'ll receive an unlock email shortly. Claude verification in progress...',
      true
    );

  } catch (error) {
    console.error('Vault unlock error:', error);
    return renderResponse(
      '⚠️ Processing Error',
      'We encountered an issue processing your request. Please try again later.',
      false
    );
  }
}

// Helper functions
async function logToKV(env, metadata) {
  if (!env.UNLOCK_KV) return;
  
  try {
    await env.UNLOCK_KV.put(
      `unlock:${Date.now()}:${metadata.email.substring(0, 5)}...`,
      JSON.stringify(metadata),
      { expirationTtl: 60 * 60 * 24 * 30 } // 30 day retention
    );
  } catch (err) {
    console.error('KV storage failed:', err);
  }
}

async function notifyWebhook(env, metadata) {
  if (!env.UNLOCK_WEBHOOK_URL) return;

  try {
    const body = JSON.stringify({
      content: `🔐 Vault unlock attempt from ${metadata.country}`,
      embeds: [{
        title: "New Access Request",
        description: `Email: ${metadata.email}`,
        fields: [
          { name: "Location", value: `${metadata.country} (${metadata.ip})`, inline: true },
          { name: "Time", value: new Date(metadata.ts).toLocaleString(), inline: true },
          { name: "User Agent", value: metadata.ua.substring(0, 100) + (metadata.ua.length > 100 ? '...' : '') }
        ],
        timestamp: metadata.ts
      }]
    });

    await fetch(env.UNLOCK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
  } catch (err) {
    console.error('Webhook notification failed:', err);
  }
}

async function sendVerificationEmail(env, email, metadata) {
  if (!env.SENDGRID_API_KEY || !env.VERIFIED_SENDER_EMAIL) return;
  
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email }] }],
        from: { email: env.VERIFIED_SENDER_EMAIL, name: "Claude Vault System" },
        subject: "Your Vault Access Request",
        content: [{
          type: "text/plain",
          value: `Thank you for requesting access to the Claude Vault.\n\n`
            + `We've received your request from ${metadata.country} (IP: ${metadata.ip}).\n\n`
            + `If approved, you'll receive a follow-up email with access instructions.\n\n`
            + `Request ID: ${metadata.cfRay}`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Email failed: ${response.status}`);
    }
  } catch (err) {
    console.error('Email sending failed:', err);
  }
}

function renderResponse(title, message, isSuccess) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <meta name="robots" content="noindex, nofollow">
      <style>
        body {
          background: #0a0e12;
          color: #e3e3e3;
          font-family: monospace;
          padding: 2rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          color: ${isSuccess ? '#4CAF50' : '#FF9800'};
        }
        a {
          color: #4d90fe;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <h2>${title}</h2>
      <p>${message}</p>
      <p><a href="/vault">&larr; Return to Vault</a></p>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex, nofollow',
      'cache-control': 'no-store, max-age=0'
    },
    status: isSuccess ? 200 : 400
  });
}
