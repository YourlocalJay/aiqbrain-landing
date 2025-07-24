// AIQBrain Landing Page Cloudflare Worker
// Enhanced with A/B testing, geo-targeting, and ROI optimizations

const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AIQBrain – Claude Prompt Tools</title>
  <meta name="description" content="Accelerate your productivity with trusted AI unlocks">
  <meta property="og:title" content="AIQBrain – Claude Prompt Tools">
  <meta property="og:description" content="Unlock high-converting Claude prompts instantly.">
  <meta property="og:image" content="https://aiqbrain.com/og.png">
  <meta property="og:url" content="https://aiqbrain.com">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #333; background: #f8f9fa; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    header { background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100; }
    .header-inner { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; }
    .logo { font-weight: 700; font-size: 24px; color: #5d5fef; text-decoration: none; }
    .hero { padding: 80px 0; text-align: center; }
    h1 { font-size: 48px; margin-bottom: 20px; }
    .subtitle { font-size: 22px; color: #555; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto; }
    .btn { display: inline-block; padding: 14px 28px; background: #5d5fef; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: all 0.3s; }
    .btn:hover { background: #4b4cbe; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(93,95,239,0.3); }
    .btn-secondary { background: #f0f0f0; color: #333; margin-left: 10px; }
    .btn-secondary:hover { background: #e0e0e0; }
    .urgent-banner { background: #ff7d00; color: white; text-align: center; padding: 8px; font-weight: 600; }
    footer { background: #f0f0f0; padding: 40px 0; margin-top: 80px; }
    .footer-links { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; }
    .footer-links a { color: #555; text-decoration: none; }
    .footer-links a:hover { color: #5d5fef; }
    .copyright { text-align: center; color: #777; font-size: 14px; }
    @media (max-width: 768px) {
      h1 { font-size: 36px; }
      .subtitle { font-size: 18px; }
      .btn { display: block; margin: 10px auto; width: 80%; }
    }
  </style>
</head>
<body>
  <div class="urgent-banner" id="urgencyBanner" style="display: none;">
    ⚡ Limited Time: Get 50% OFF Premium Prompts – Only <span id="spotsLeft">17</span> spots left!
  </div>
  
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="/" class="logo">AIQBrain</a>
        <nav>
          <a href="/vault" class="btn btn-secondary">Browse Vault</a>
        </nav>
      </div>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1 id="heroTitle">AIQBrain – Claude Prompt Tools</h1>
      <p class="subtitle" id="heroSubtitle">Accelerate your productivity with trusted AI unlocks</p>
      <a href="/start" class="btn" id="primaryCTA">Unlock Claude Prompts</a>
      <a href="/vault" class="btn btn-secondary">Browse Library</a>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
      <p class="copyright">© 2025 AIQBrain. All rights reserved.</p>
    </div>
  </footer>

  <script>
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

      const userId = localStorage.getItem('aiq_uid') || Math.random().toString(36).substr(2, 9);
      localStorage.setItem('aiq_uid', userId);

      const keys = Object.keys(variants);
      const vIndex = userId.charCodeAt(0) % keys.length;
      const variant = variants[keys[vIndex]];

      document.getElementById('heroTitle').textContent = variant.title;
      document.getElementById('heroSubtitle').textContent = variant.subtitle;
      document.getElementById('primaryCTA').textContent = variant.cta;
      
      // Set the spots left to a random number between 5 and 30
      document.getElementById('spotsLeft').textContent = Math.floor(Math.random() * 25 + 5);

      if (variant.urgency || new Date().getHours() >= 18 || new Date().getHours() <= 6) {
        document.getElementById('urgencyBanner').style.display = 'block';
      }

      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
          if (this.href) {
            const url = new URL(this.href);
            url.searchParams.set('utm_source', 'aiqbrain');
            url.searchParams.set('utm_medium', 'landing');
            url.searchParams.set('utm_campaign', keys[vIndex]);
            url.searchParams.set('uid', userId);
            this.href = url.toString();
          }
        });
      });

      let shown = false;
      document.addEventListener('mouseleave', e => {
        if (e.clientY <= 0 && !shown) {
          shown = true;
          if (confirm('Wait! Get 30% off your first purchase – Click OK to claim your discount!')) {
            window.location.href = '/sv?discount=30';
          }
        }
      });
    })();
  </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const userAgent = request.headers.get('user-agent') || '';
    const country = request.cf?.country || 'US';
    const ip = request.headers.get('cf-connecting-ip') || '0.0.0.0';
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const hour = new Date().getUTCHours();
    const day = new Date().getUTCDay();
    const isWeekend = day === 0 || day === 6;
    const isEvening = hour >= 18 || hour <= 6;

    // Generate a consistent hash for the user
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + userAgent));
    const hashArray = Array.from(new Uint8Array(hash));
    const userScore = hashArray[0]; // 0–255
    const variantKey = ['A', 'B', 'C'][userScore % 3];

    // Bot filtering
    const botPatterns = [/bot/i, /crawl/i, /spider/i, /facebook/i, /slack/i, /telegram/i];
    if (botPatterns.some(r => r.test(userAgent))) {
      // For bots, return a simplified version without scripts
      return new Response(HTML_CONTENT.replace(/<script>[\s\S]*?<\/script>/g, ''), {
        headers: { 
          'content-type': 'text/html', 
          'cache-control': 'public, max-age=86400' 
        }
      });
    }

    // Geo offers mapping
    const geoOffers = { 
      DE: env.GERMAN_OFFER, 
      AT: env.GERMAN_OFFER, 
      CH: env.GERMAN_OFFER 
    };
    
    // Time-based offers
    const timeOffers = {
      weekend: env.WEEKEND_OFFER,
      evening: env.EVENING_OFFER
    };

    // Handle specific routes
    if (path === '/sv' || path === '/surveyvault') {
      let target = env.SV_OFFER_A;

      if (geoOffers[country]) {
        target = geoOffers[country];
      } else if (isWeekend && timeOffers.weekend) {
        target = timeOffers.weekend;
      } else if (isEvening && timeOffers.evening) {
        target = timeOffers.evening;
      } else {
        const variantOffers = { 
          A: env.SV_OFFER_A, 
          B: env.SV_OFFER_B, 
          C: env.SV_OFFER_C 
        };
        target = variantOffers[variantKey] || env.SV_OFFER_A;
      }

      const redirectUrl = new URL(target);
      redirectUrl.searchParams.set('variant', variantKey);
      redirectUrl.searchParams.set('country', country);
      redirectUrl.searchParams.set('device', isMobile ? 'mobile' : 'desktop');
      redirectUrl.searchParams.set('time', isEvening ? 'evening' : 'day');

      // Add discount parameter if present in the request
      const discount = url.searchParams.get('discount');
      if (discount) {
        redirectUrl.searchParams.set('discount', discount);
      }

      return Response.redirect(redirectUrl.toString(), 302);
    }

    if (path === '/vault') {
      const vault = isMobile && env.MOBILE_VAULT ? env.MOBILE_VAULT : env.REDIRECT_VAULT;
      return Response.redirect(vault, 302);
    }

    if (path === '/start') {
      const start = isMobile && env.MOBILE_START ? env.MOBILE_START : env.REDIRECT_START;
      return Response.redirect(start, 302);
    }

    // Simple static pages
    if (path === '/privacy') return new Response('Privacy Policy – Coming Soon', { 
      headers: { 'content-type': 'text/html' } 
    });
    
    if (path === '/terms') return new Response('Terms of Service – Coming Soon', { 
      headers: { 'content-type': 'text/html' } 
    });
    
    if (path === '/about') return new Response('About AIQBrain – Coming Soon', { 
      headers: { 'content-type': 'text/html' } 
    });

    // Default route (/) or any other path - serve the main landing page
    let html = HTML_CONTENT;
    
    // Apply localization if needed
    if (country === 'DE' || request.headers.get('accept-language')?.includes('de')) {
      html = html.replace('trusted AI unlocks', 'vertrauenswürdige KI-Freischaltungen')
                .replace('Unlock Claude Prompts', 'Claude-Prompts freischalten');
    }

    return new Response(html, {
      headers: {
        'content-type': 'text/html',
        'cache-control': `public, max-age=${env.CACHE_TTL || 3600}`,
        'x-ab-variant': variantKey,
        'x-country': country,
        'x-device': isMobile ? 'mobile' : 'desktop'
      }
    });
  }
};