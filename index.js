// AIQBrain Landing Page Cloudflare Worker
// Enhanced with A/B testing, geo-targeting, and ROI optimizations

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

        .urgent-banner {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: #000;
            text-align: center;
            padding: 0.5rem;
            font-weight: 600;
            font-size: 0.875rem;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
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
    <div class="urgent-banner" id="urgencyBanner" style="display: none;">
        ⚡ Limited Time: Get 50% OFF Premium Prompts - Only ${Math.ceil(Math.random() * 20)} spots left!
    </div>

    <header>
        <div class="container">
            <a href="/" class="logo">AIQBrain</a>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h1 id="heroTitle">AIQBrain – Claude Prompt Tools</h1>
                <p id="heroSubtitle">Accelerate your productivity with trusted AI unlocks</p>
                
                <div class="cta-buttons">
                    <a href="/sv" class="btn btn-primary" id="primaryCTA">Unlock Claude Prompts</a>
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

    <script>
        // A/B Testing & Conversion Optimization
        (function() {
            const variants = {
                A: {
                    title: "AIQBrain – Claude Prompt Tools",
                    subtitle: "Accelerate your productivity with trusted AI unlocks",
                    cta: "Unlock Claude Prompts",
                    urgency: false
                },
                B: {
                    title: "🎯 Master Claude AI in Minutes",
                    subtitle: "Get proven prompts that 10,000+ users trust for instant results",
                    cta: "Get Instant Access",
                    urgency: true
                },
                C: {
                    title: "💡 Claude Prompts That Actually Work",
                    subtitle: "Stop wasting time with generic prompts. Get results from day one",
                    cta: "Start Getting Results",
                    urgency: false
                }
            };

            // Simple A/B testing based on user ID hash
            const userId = localStorage.getItem('aiq_uid') || Math.random().toString(36).substr(2, 9);
            localStorage.setItem('aiq_uid', userId);
            
            const variantKeys = Object.keys(variants);
            const variantIndex = userId.charCodeAt(0) % variantKeys.length;
            const variant = variants[variantKeys[variantIndex]];

            // Apply variant
            document.getElementById('heroTitle').textContent = variant.title;
            document.getElementById('heroSubtitle').textContent = variant.subtitle;
            document.getElementById('primaryCTA').textContent = variant.cta;
            
            if (variant.urgency) {
                document.getElementById('urgencyBanner').style.display = 'block';
            }

            // Time-based urgency
            const hour = new Date().getHours();
            if (hour >= 18 || hour <= 6) { // Evening/night traffic
                document.getElementById('urgencyBanner').style.display = 'block';
            }

            // Track variant for analytics
            if (window.gtag) {
                gtag('event', 'ab_test_variant', {
                    variant: variantKeys[variantIndex],
                    user_id: userId
                });
            }

            // Enhanced click tracking
            document.querySelectorAll('.btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    const destination = this.href;
                    const label = this.textContent.trim();
                    
                    if (window.gtag) {
                        gtag('event', 'cta_click', {
                            variant: variantKeys[variantIndex],
                            button_text: label,
                            destination: destination,
                            user_id: userId
                        });
                    }
                    
                    // Add utm parameters for tracking
                    const url = new URL(destination);
                    url.searchParams.set('utm_source', 'aiqbrain');
                    url.searchParams.set('utm_medium', 'landing');
                    url.searchParams.set('utm_campaign', variantKeys[variantIndex]);
                    url.searchParams.set('uid', userId);
                    
                    this.href = url.toString();
                });
            });

            // Exit intent detection
            let exitIntentShown = false;
            document.addEventListener('mouseleave', function(e) {
                if (e.clientY <= 0 && !exitIntentShown) {
                    exitIntentShown = true;
                    if (confirm('Wait! Get 30% off your first purchase - Click OK to claim your discount!')) {
                        window.location.href = '/sv?discount=30';
                    }
                }
            });
        })();
    </script>
</body>
</html>`;

// A/B Testing Configuration for /sv redirect
const SV_OFFERS = {
  // Offer A - Original CPAGrip
  A: "https://singingfiles.com/show.php?l=0&u=2427730&id=68776",
  // Offer B - Alternative (replace with your second offer)
  B: "https://singingfiles.com/show.php?l=0&u=2427730&id=68777", 
  // Offer C - High converting (replace with your third offer)
  C: "https://singingfiles.com/show.php?l=0&u=2427730&id=68778"
};

// Country-specific offers
const GEO_OFFERS = {
  DE: "https://your-german-offer.com", // German-specific offer
  AT: "https://your-german-offer.com", // Austria (German speaking)
  CH: "https://your-german-offer.com", // Switzerland (German speaking)
  // Add more countries as needed
};

// Device-specific optimization
const DEVICE_OFFERS = {
  mobile: {
    vault: "https://mobile-optimized-vault.com",
    start: "https://mobile-onboarding.com"
  }
};

// Time-based offers
const TIME_OFFERS = {
  weekend: "https://weekend-special-offer.com",
  evening: "https://evening-boost-offer.com"
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const userAgent = request.headers.get('user-agent') || '';
    const cfCountry = request.cf?.country || 'US';
    const acceptLanguage = request.headers.get('accept-language') || '';

    // Enhanced bot detection
    const botPatterns = [
      /bot/i, /crawl/i, /spider/i, /scraper/i,
      /facebookexternalhit/i, /slackbot/i, /twitterbot/i,
      /linkedinbot/i, /whatsapp/i, /telegrambot/i
    ];
    
    if (botPatterns.some(pattern => pattern.test(userAgent))) {
      // Serve clean version to bots for SEO
      return new Response(HTML_CONTENT.replace(/<script>[\s\S]*?<\/script>/g, ''), {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=86400'
        }
      });
    }

    // Device detection
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);

    // Time-based logic
    const now = new Date();
    const hour = now.getUTCHours();
    const day = now.getUTCDay(); // 0 = Sunday, 6 = Saturday
    const isWeekend = day === 0 || day === 6;
    const isEvening = hour >= 18 || hour <= 6;

    // Generate consistent user ID for A/B testing
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const userHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + userAgent));
    const hashArray = Array.from(new Uint8Array(userHash));
    const userScore = hashArray[0]; // 0-255

    // A/B Testing logic for /sv
    if (path === '/sv' || path === '/surveyvault') {
      let redirectUrl;

      // 1. Country-specific routing (highest priority)
      if (GEO_OFFERS[cfCountry]) {
        redirectUrl = GEO_OFFERS[cfCountry];
      } 
      // 2. Time-based offers
      else if (isWeekend && TIME_OFFERS.weekend) {
        redirectUrl = TIME_OFFERS.weekend;
      }
      else if (isEvening && TIME_OFFERS.evening) {
        redirectUrl = TIME_OFFERS.evening;
      }
      // 3. A/B testing (33% split)
      else {
        const offerKeys = Object.keys(SV_OFFERS);
        const offerIndex = userScore % offerKeys.length;
        const selectedOffer = offerKeys[offerIndex];
        redirectUrl = SV_OFFERS[selectedOffer];

        // Add tracking parameters
        const trackingUrl = new URL(redirectUrl);
        trackingUrl.searchParams.set('variant', selectedOffer);
        trackingUrl.searchParams.set('country', cfCountry);
        trackingUrl.searchParams.set('device', isMobile ? 'mobile' : 'desktop');
        trackingUrl.searchParams.set('time', isEvening ? 'evening' : 'day');
        redirectUrl = trackingUrl.toString();
      }

      // Enhanced analytics headers
      const analyticsHeaders = {
        'X-AB-Variant': userScore % 3 === 0 ? 'A' : userScore % 3 === 1 ? 'B' : 'C',
        'X-Country': cfCountry,
        'X-Device': isMobile ? 'mobile' : 'desktop',
        'X-Time-Segment': isEvening ? 'evening' : 'day'
      };

      return Response.redirect(redirectUrl, 302);
    }

    // Enhanced routing for other paths
    const routeMap = {
      '/vault': () => {
        if (isMobile && DEVICE_OFFERS.mobile.vault) {
          return DEVICE_OFFERS.mobile.vault;
        }
        return env.REDIRECT_VAULT || 'https://aiqengage.com/vault';
      },
      '/start': () => {
        if (isMobile && DEVICE_OFFERS.mobile.start) {
          return DEVICE_OFFERS.mobile.start;
        }
        return env.REDIRECT_START || 'https://aiqengage.com/get-started';
      }
    };

    if (routeMap[path]) {
      const redirectUrl = routeMap[path]();
      return Response.redirect(redirectUrl, 302);
    }

    // Placeholder pages
    if (path === '/privacy') {
      return new Response('Privacy Policy - Coming Soon', {
        headers: { 'content-type': 'text/plain' }
      });
    }
    
    if (path === '/terms') {
      return new Response('Terms of Service - Coming Soon', {
        headers: { 'content-type': 'text/plain' }
      });
    }
    
    if (path === '/about') {
      return new Response('About AIQBrain - Coming Soon', {
        headers: { 'content-type': 'text/plain' }
      });
    }

    // Serve landing page with enhancements
    let enhancedHTML = HTML_CONTENT;

    // Country-specific messaging
    if (cfCountry === 'DE' || acceptLanguage.includes('de')) {
      enhancedHTML = enhancedHTML.replace(
        'trusted AI unlocks',
        'vertrauenswürdige KI-Freischaltungen'
      );
    }

    // Mobile optimizations
    if (isMobile) {
      enhancedHTML = enhancedHTML.replace(
        'min-width: 160px;',
        'min-width: 200px; font-size: 1.1rem;'
      );
    }

    return new Response(enhancedHTML, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': `public, max-age=${env.CACHE_TTL || 3600}`,
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'x-xss-protection': '1; mode=block',
        'strict-transport-security': 'max-age=31536000',
        'x-ab-variant': userScore % 3 === 0 ? 'A' : userScore % 3 === 1 ? 'B' : 'C',
        'x-country': cfCountry,
        'x-device': isMobile ? 'mobile' : 'desktop'
      }
    });
  }
};