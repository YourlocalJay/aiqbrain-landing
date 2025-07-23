// AIQBrain Landing Page Cloudflare Worker
// Serves the landing page and handles redirect routing

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIQBrain – Claude Prompt Tools</title>
    <meta name="description" content="Accelerate your productivity with trusted AI unlocks">
    <style>
        :root {
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-tertiary: #21262d;
            --text-primary: #f0f6fc;
            --text-secondary: #8b949e;
            --accent: #f78166;
            --accent-hover: #fd8c73;
            --border: #30363d;
            --border-hover: #484f58;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            width: 100%;
        }

        header {
            padding: 2rem 0;
            border-bottom: 1px solid var(--border);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            text-decoration: none;
        }

        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem 0;
        }

        .hero {
            text-align: center;
            max-width: 800px;
        }

        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            letter-spacing: -0.02em;
            background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.25rem;
            color: var(--text-secondary);
            margin-bottom: 3rem;
            font-weight: 400;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 2rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.875rem 2rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.2s ease;
            border: 1px solid var(--border);
            min-width: 160px;
        }

        .btn-primary {
            background-color: var(--accent);
            color: white;
            border-color: var(--accent);
        }

        .btn-primary:hover {
            background-color: var(--accent-hover);
            border-color: var(--accent-hover);
            transform: translateY(-1px);
        }

        .btn-secondary {
            background-color: var(--bg-secondary);
            color: var(--text-primary);
            border-color: var(--border);
        }

        .btn-secondary:hover {
            background-color: var(--bg-tertiary);
            border-color: var(--border-hover);
            transform: translateY(-1px);
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 4rem;
            padding: 2rem 0;
        }

        .feature {
            text-align: center;
            padding: 2rem 1rem;
            background-color: var(--bg-secondary);
            border-radius: 0.75rem;
            border: 1px solid var(--border);
            transition: all 0.2s ease;
        }

        .feature:hover {
            border-color: var(--border-hover);
            transform: translateY(-2px);
        }

        .feature h3 {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }

        .feature p {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        footer {
            border-top: 1px solid var(--border);
            padding: 2rem 0;
            margin-top: auto;
        }

        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .footer-links {
            display: flex;
            gap: 2rem;
        }

        .footer-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.875rem;
            transition: color 0.2s ease;
        }

        .footer-links a:hover {
            color: var(--text-primary);
        }

        .copyright {
            color: var(--text-secondary);
            font-size: 0.875rem;
        }

        @media (max-width: 768px) {
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }

            .btn {
                width: 100%;
                max-width: 300px;
            }

            .footer-content {
                flex-direction: column;
                text-align: center;
            }

            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <a href="/" class="logo">AIQBrain</a>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h1>AIQBrain – Claude Prompt Tools</h1>
                <p>Accelerate your productivity with trusted AI unlocks</p>
                
                <div class="cta-buttons">
                    <a href="/sv" class="btn btn-primary">Unlock Claude Prompts</a>
                    <a href="/vault" class="btn btn-secondary">Browse Vaults</a>
                    <a href="/start" class="btn btn-secondary">Start Now</a>
                </div>

                <div class="features">
                    <div class="feature">
                        <h3>🚀 Instant Access</h3>
                        <p>Get immediate access to curated Claude prompts that boost your workflow efficiency</p>
                    </div>
                    <div class="feature">
                        <h3>🔐 Secure Vaults</h3>
                        <p>Browse our collection of premium AI tools and resources in organized vaults</p>
                    </div>
                    <div class="feature">
                        <h3>⚡ Quick Start</h3>
                        <p>Begin your AI-powered productivity journey with our streamlined onboarding</p>
                    </div>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-links">
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                    <a href="/about">About</a>
                </div>
                <div class="copyright">
                    © 2025 AIQBrain. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle redirects
    switch (path) {
      case '/sv':
      case '/surveyvault':
        return Response.redirect(env.REDIRECT_SV || 'https://singingfiles.com/show.php?l=0&u=2427730&id=68776', 302);
      
      case '/vault':
        return Response.redirect(env.REDIRECT_VAULT || 'https://aiqengage.com/vault', 302);
      
      case '/start':
        return Response.redirect(env.REDIRECT_START || 'https://aiqengage.com/get-started', 302);
      
      case '/privacy':
        return new Response('Privacy Policy - Coming Soon', {
          headers: { 'content-type': 'text/plain' }
        });
      
      case '/terms':
        return new Response('Terms of Service - Coming Soon', {
          headers: { 'content-type': 'text/plain' }
        });
      
      case '/about':
        return new Response('About AIQBrain - Coming Soon', {
          headers: { 'content-type': 'text/plain' }
        });
      
      default:
        // Serve the landing page for all other routes
        return new Response(HTML_CONTENT, {
          headers: {
            'content-type': 'text/html;charset=UTF-8',
            'cache-control': `public, max-age=${env.CACHE_TTL || 3600}`,
            'x-content-type-options': 'nosniff',
            'x-frame-options': 'DENY',
            'x-xss-protection': '1; mode=block'
          }
        });
    }
  }
};