// AIQBrain Landing Page Cloudflare Worker
// Enhanced with A/B testing, geo-targeting, and ROI optimizations

const HTML_TEMPLATE = (spotsLeft = 17) => `<!DOCTYPE html>
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
    /* [Omitted for brevity — keep your existing CSS here] */
  </style>
</head>
<body>
  <div class="urgent-banner" id="urgencyBanner" style="display: none;">
    ⚡ Limited Time: Get 50% OFF Premium Prompts – Only ${spotsLeft} spots left!
  </div>

  <!-- [Remaining HTML structure: header, hero, buttons, footer] -->

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

      if (variant.urgency || new Date().getHours() >= 18 || new Date().getHours() <= 6) {
        document.getElementById('urgencyBanner').style.display = 'block';
      }

      document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function () {
          const url = new URL(this.href);
          url.searchParams.set('utm_source', 'aiqbrain');
          url.searchParams.set('utm_medium', 'landing');
          url.searchParams.set('utm_campaign', keys[vIndex]);
          url.searchParams.set('uid', userId);
          this.href = url.toString();
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

    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + userAgent));
    const userScore = Array.from(new Uint8Array(hash))[0]; // 0–255
    const variantKey = ['A', 'B', 'C'][userScore % 3];

    // Bot filtering
    const botPatterns = [/bot/i, /crawl/i, /spider/i, /facebook/i, /slack/i, /telegram/i];
    if (botPatterns.some(r => r.test(userAgent))) {
      return new Response(HTML_TEMPLATE().replace(/<script>[\s\S]*?<\/script>/g, ''), {
        headers: { 'content-type': 'text/html', 'cache-control': 'public, max-age=86400' }
      });
    }

    // Geo offers
    const geoOffers = { DE: env.GERMAN_OFFER, AT: env.GERMAN_OFFER, CH: env.GERMAN_OFFER };
    const timeOffers = {
      weekend: env.WEEKEND_OFFER,
      evening: env.EVENING_OFFER
    };

    if (path === '/sv' || path === '/surveyvault') {
      let target = env.SV_OFFER_A;

      if (geoOffers[country]) {
        target = geoOffers[country];
      } else if (isWeekend && timeOffers.weekend) {
        target = timeOffers.weekend;
      } else if (isEvening && timeOffers.evening) {
        target = timeOffers.evening;
      } else {
        target = { A: env.SV_OFFER_A, B: env.SV_OFFER_B, C: env.SV_OFFER_C }[variantKey];
      }

      const redirectUrl = new URL(target);
      redirectUrl.searchParams.set('variant', variantKey);
      redirectUrl.searchParams.set('country', country);
      redirectUrl.searchParams.set('device', isMobile ? 'mobile' : 'desktop');
      redirectUrl.searchParams.set('time', isEvening ? 'evening' : 'day');

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

    if (path === '/privacy') return new Response('Privacy Policy – Coming Soon');
    if (path === '/terms') return new Response('Terms of Service – Coming Soon');
    if (path === '/about') return new Response('About AIQBrain – Coming Soon');

    // Localization
    const html = HTML_TEMPLATE(Math.floor(Math.random() * 25 + 5));
    const localizedHTML = (country === 'DE' || request.headers.get('accept-language')?.includes('de'))
      ? html.replace('trusted AI unlocks', 'vertrauenswürdige KI-Freischaltungen')
      : html;

    return new Response(localizedHTML, {
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
