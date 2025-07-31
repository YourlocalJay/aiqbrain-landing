<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AIQBrain – Claude-Centric Monetization Systems</title>
  <meta name="description" content="Battle-tested Claude monetization frameworks for sophisticated operators">
  <meta property="og:title" content="AIQBrain – TOS-Compliant AI Revenue Systems">
  <meta property="og:description" content="Transform Claude expertise into sustainable revenue streams">
  <meta property="og:image" content="https://aiqbrain.com/og-dark.png">
  <meta property="og:url" content="https://aiqbrain.com">
  <meta name="robots" content="noindex, nofollow">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'">
  
  <!-- Preload critical resources -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" as="style">
  
  <!-- Inline critical CSS -->
  <style>
    /* AIQBrain brand colors */
    :root {
      --background: #0a0e12;
      --card-bg: #121820;
      --text-primary: #e6edf3;
      --text-secondary: rgba(230, 237, 243, 0.8);
      --text-muted: rgba(230, 237, 243, 0.6);
      --accent-primary: #ff7b72;
      --accent-secondary: #58a6ff;
      --accent-warning: #f9c74f;
      --success: #56d364;
    }
    
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
    }
    
    body { 
      font-family: 'Inter Tight', sans-serif;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--background);
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
    }
    
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 1.5rem; 
    }
    
    header { 
      background: var(--background);
      border-bottom: 1px solid rgba(88, 166, 255, 0.2);
      position: sticky; 
      top: 0; 
      z-index: 100; 
      backdrop-filter: blur(8px);
    }
    
    .header-inner { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      padding: 1rem 0; 
    }
    
    .logo { 
      font-family: 'Space Mono', monospace;
      font-weight: 700; 
      font-size: 1.5rem; 
      color: var(--accent-primary); 
      text-decoration: none; 
      letter-spacing: 0.5px;
    }
    
    .hero { 
      padding: 5rem 0; 
      text-align: center; 
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2358a6ff' stroke-width='0.5'%3E%3Ccircle cx='25' cy='25' r='1.5'/%3E%3Ccircle cx='10' cy='10' r='1.5'/%3E%3Ccircle cx='40' cy='10' r='1.5'/%3E%3Ccircle cx='10' cy='40' r='1.5'/%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3Cline x1='25' y1='25' x2='10' y2='10'/%3E%3Cline x1='25' y1='25' x2='40' y2='10'/%3E%3Cline x1='25' y1='25' x2='10' y2='40'/%3E%3Cline x1='25' y1='25' x2='40' y2='40'/%3E%3C/g%3E%3C/svg%3E");
      background-size: 50px 50px;
      opacity: 0.05;
      pointer-events: none;
      z-index: -1;
    }
    
    h1 { 
      font-size: clamp(2.25rem, 5vw, 3rem);
      margin-bottom: 1.5rem; 
      line-height: 1.1;
    }
    
    .subtitle { 
      font-size: clamp(1.125rem, 2vw, 1.25rem); 
      color: var(--text-secondary); 
      margin-bottom: 2.5rem; 
      max-width: 700px; 
      margin-left: auto; 
      margin-right: auto; 
    }
    
    .btn { 
      display: inline-block; 
      padding: 0.75rem 1.5rem; 
      background: var(--accent-primary); 
      color: var(--background); 
      text-decoration: none; 
      border-radius: 6px; 
      font-weight: 600; 
      transition: all 0.2s; 
      height: 48px;
      border: none;
      cursor: pointer;
      font-family: 'Space Mono', monospace;
      letter-spacing: 0.5px;
    }
    
    .btn:hover { 
      filter: brightness(110%);
      box-shadow: 0 0 8px rgba(255, 123, 114, 0.4);
      transform: translateY(-1px);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    .btn-secondary { 
      background: transparent; 
      color: var(--accent-primary); 
      border: 1px solid var(--accent-primary);
      margin-left: 1rem; 
    }
    
    .btn-secondary:hover { 
      background: rgba(255, 123, 114, 0.1);
    }
    
    .urgent-banner { 
      background: var(--accent-warning); 
      color: var(--background); 
      text-align: center; 
      padding: 0.75rem; 
      font-weight: 600; 
      font-family: 'Space Mono', monospace;
      position: relative;
      overflow: hidden;
    }
    
    .urgent-banner::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255,255,255,0.2) 50%, 
        transparent 100%);
      animation: shimmer 2.5s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .system-card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem auto;
      max-width: 800px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(88, 166, 255, 0.2);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .system-card:hover {
      transform: scale(1.01);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
    }
    
    .card-header {
      font-family: 'Space Mono', monospace;
      font-weight: 700;
      color: var(--accent-primary);
      margin-bottom: 1rem;
      font-size: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .card-header::before {
      content: "•";
      color: var(--success);
    }
    
    .card-metric {
      display: inline-flex;
      align-items: center;
      background: rgba(88, 166, 255, 0.2);
      border: 1px solid var(--accent-secondary);
      border-radius: 4px;
      padding: 0.375rem 0.75rem;
      margin-right: 0.75rem;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      gap: 0.25rem;
    }
    
    .card-metric::before {
      content: "✓";
      color: var(--success);
    }
    
    footer { 
      background: var(--card-bg); 
      padding: 3rem 0; 
      margin-top: 5rem; 
      border-top: 1px solid rgba(88, 166, 255, 0.2);
    }
    
    .footer-links { 
      display: flex; 
      justify-content: center; 
      gap: 1.5rem; 
      margin-bottom: 1.5rem; 
      flex-wrap: wrap;
    }
    
    .footer-links a { 
      color: var(--text-secondary); 
      text-decoration: none; 
      transition: color 0.2s;
      font-size: 0.9375rem;
    }
    
    .footer-links a:hover { 
      color: var(--accent-primary); 
    }
    
    .copyright { 
      text-align: center; 
      color: var(--text-muted); 
      font-size: 0.875rem; 
      margin-top: 1rem;
    }
    
    .disclaimer {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 2rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      line-height: 1.6;
    }
    
    .disclaimer a {
      color: var(--accent-warning);
      text-decoration: none;
    }
    
    .disclaimer a:hover {
      text-decoration: underline;
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
      .hero {
        padding: 3rem 0;
      }
      
      .btn { 
        display: block; 
        margin: 0.75rem auto; 
        width: 100%; 
        max-width: 300px;
      }
      
      .btn-secondary {
        margin-left: 0;
      }
      
      .header-inner {
        flex-direction: column;
        gap: 1rem;
      }
      
      .system-card {
        padding: 1.25rem;
      }
    }
    
    /* Print styles */
    @media print {
      .urgent-banner,
      .btn {
        display: none !important;
      }
      
      body {
        background: white;
        color: black;
      }
    }
  </style>
  
  <!-- Non-blocking font load -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap">
  </noscript>
</head>
<body>
  <div class="urgent-banner" id="urgencyBanner" style="display: none;">
    ⚡ LIMITED ACCESS: <span id="spotsLeft">17</span> operator slots remaining for Q3 systems
  </div>
  
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="/" class="logo">AIQBRAIN</a>
        <nav>
          <a href="/vault" class="btn btn-secondary">SYSTEM VAULT</a>
        </nav>
      </div>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1 id="heroTitle">Claude Monetization Systems for Discerning Operators</h1>
      <p class="subtitle" id="heroSubtitle">Battle-tested frameworks delivering 18-27% conversion rates while maintaining full TOS compliance</p>
      <a href="/request" class="btn" id="primaryCTA">REQUEST ACCESS</a>
      <a href="/vault" class="btn btn-secondary">FRAMEWORK PREVIEW</a>
    </div>
  </section>
  
  <section class="container">
    <div class="system-card">
      <div class="card-header">NEURAL OPS FRAMEWORK v3.2</div>
      <div>
        <span class="card-metric">22.4% avg. conversion</span>
        <span class="card-metric">31% reduced CPA</span>
        <span class="card-metric">TOS-verified</span>
      </div>
      <p>Our flagship system combines Claude's conversational strengths with optimized monetization pathways, delivering consistent results across niches while maintaining platform compliance.</p>
    </div>
    
    <div class="system-card">
      <div class="card-header">SURVEY VAULT INTEGRATION</div>
      <div>
        <span class="card-metric">18.7% qualified leads</span>
        <span class="card-metric">$2.38 avg. EPC</span>
        <span class="card-metric">Geo-optimized</span>
      </div>
      <p>Specialized framework for maximizing survey monetization through Claude while maintaining user experience quality and platform guidelines.</p>
    </div>
    
    <div class="system-card">
      <div class="card-header">AFFILIATE OPTIMIZATION SUITE</div>
      <div>
        <span class="card-metric">27.3% lift in conversions</span>
        <span class="card-metric">1.8x ROI increase</span>
        <span class="card-metric">TOS-compliant</span>
      </div>
      <p>Advanced toolkit for scaling affiliate promotions through Claude with automated compliance checks and optimization.</p>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="/privacy">PRIVACY POLICY</a>
        <a href="/terms">TERMS OF SERVICE</a>
        <a href="/compliance">COMPLIANCE</a>
        <a href="/contact">CONTACT</a>
        <a href="/unsubscribe">UNSUBSCRIBE</a>
      </div>
      <p class="copyright">© 2025 AIQBRAIN SYSTEMS. ALL RIGHTS RESERVED.</p>
      <p class="disclaimer">
        AIQBRAIN IS AN INDEPENDENT RESOURCE AND NOT AFFILIATED WITH ANTHROPIC. RESULTS VARY BASED ON IMPLEMENTATION. 
        ALL SYSTEMS OPERATE WITHIN PLATFORM TERMS OF SERVICE. <a href="/compliance">READ OUR COMPLIANCE GUIDELINES</a>.
        THIS IS NOT A GET-RICH-QUICK SCHEME. SUCCESS REQUIRES WORK AND PROPER EXECUTION.
      </p>
    </div>
  </footer>

  <script>
    (function() {
      'use strict';
      
      // Enhanced variant system with localStorage fallback
      const variants = {
        A: {
          title: "Claude Monetization Systems for Discerning Operators",
          subtitle: "Battle-tested frameworks delivering 18-27% conversion rates while maintaining full TOS compliance",
          cta: "Request Access",
          urgency: true,
          color: "#ff7b72"
        },
        B: {
          title: "Transform Claude Expertise Into Reliable Revenue",
          subtitle: "22.4% avg. conversion across our operator network - TOS-compliant systems",
          cta: "Apply for Access",
          urgency: false,
          color: "#58a6ff"
        },
        C: {
          title: "Strategic Claude Monetization Frameworks",
          subtitle: "31% lower CPA than conventional approaches - platform-compliant implementation",
          cta: "Join Operator Network",
          urgency: true,
          color: "#f9c74f"
        }
      };

      try {
        // Generate a persistent user ID
        const getUserId = () => {
          try {
            let userId = localStorage.getItem('aiq_uid');
            if (!userId) {
              userId = 'uid_' + Math.random().toString(36).substr(2, 9) + 
                       '_' + Date.now().toString(36);
              localStorage.setItem('aiq_uid', userId);
            }
            return userId;
          } catch (e) {
            return 'ses_' + Math.random().toString(36).substr(2, 12);
          }
        };

        const userId = getUserId();
        const sessionId = 'ses_' + Math.random().toString(36).substr(2, 12);
        
        // Deterministic variant selection based on user ID
        const getVariant = (userId) => {
          const hash = Array.from(userId).reduce((acc, char) => 
            (acc << 5) - acc + char.charCodeAt(0), 0);
          const keys = Object.keys(variants);
          return variants[keys[Math.abs(hash) % keys.length]];
        };

        const variant = getVariant(userId);
        
        // Apply variant
        document.getElementById('heroTitle').textContent = variant.title;
        document.getElementById('heroSubtitle').textContent = variant.subtitle;
        document.getElementById('primaryCTA').textContent = variant.cta;
        
        // Dynamic urgency elements
        const spotsLeft = Math.floor(Math.random() * 25) + 5;
        document.getElementById('spotsLeft').textContent = spotsLeft;
        
        if (variant.urgency || new Date().getHours() >= 18 || new Date().getHours() <= 6) {
          document.getElementById('urgencyBanner').style.display = 'block';
          
          // Animate the urgency banner
          let count = spotsLeft;
          const interval = setInterval(() => {
            if (count > 1) {
              count--;
              document.getElementById('spotsLeft').textContent = count;
            } else {
              clearInterval(interval);
            }
          }, 60000); // Decrease every minute
        }

        // Enhanced click tracking with beacon API
        const trackClick = (element, eventType) => {
          const data = {
            event: eventType,
            variant: variant,
            userId: userId,
            sessionId: sessionId,
            timestamp: new Date().toISOString(),
            path: window.location.pathname,
            element: element.tagName + (element.id ? '#' + element.id : '')
          };
          
          navigator.sendBeacon('/analytics', JSON.stringify(data));
        };

        // Add UTM parameters to all links
        document.querySelectorAll('a').forEach(link => {
          if (link.href && link.href.startsWith('/')) {
            const url = new URL(link.href, window.location.origin);
            url.searchParams.set('t', 'NEURAL_OPS');
            url.searchParams.set('src', 'direct');
            url.searchParams.set('m', 'landing');
            url.searchParams.set('c', 'q3_2025');
            url.searchParams.set('v', Object.keys(variants).find(k => variants[k] === variant));
            url.searchParams.set('uid', userId);
            url.searchParams.set('ses', sessionId);
            link.href = url.toString();
          }
          
          link.addEventListener('click', (e) => {
            trackClick(e.currentTarget, 'link_click');
          });
        });

        // Exit intent detection with debounce
        let exitIntentFired = false;
        const handleExitIntent = () => {
          if (!exitIntentFired && document.querySelectorAll(':hover').length === 0) {
            exitIntentFired = true;
            trackClick(document.body, 'exit_intent');
            
            if (spotsLeft <= 10) {
              const modal = document.createElement('div');
              modal.innerHTML = `
                <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:1000;display:flex;justify-content:center;align-items:center;">
                  <div style="background:var(--card-bg);padding:2rem;border-radius:8px;max-width:500px;text-align:center;">
                    <h3 style="color:var(--accent-primary);margin-bottom:1rem;">LAST CHANCE FOR Q3 ACCESS</h3>
                    <p style="margin-bottom:1.5rem;">Only ${spotsLeft} operator slots remaining. Apply now before positions are filled.</p>
                    <a href="/request?t=exit_modal&v=${Object.keys(variants).find(k => variants[k] === variant)}" 
                       class="btn" 
                       style="display:block;margin:0 auto;max-width:300px;">
                      SECURE MY SPOT
                    </a>
                  </div>
                </div>
              `;
              document.body.appendChild(modal);
            }
          }
        };

        document.addEventListener('mouseout', (e) => {
          if (!e.toElement && !e.relatedTarget) {
            setTimeout(handleExitIntent, 100);
          }
        });

        // Time-based urgency
        setTimeout(() => {
          if (!exitIntentFired && spotsLeft > 5) {
            document.getElementById('urgencyBanner').textContent += " - APPLICATIONS CLOSING SOON";
          }
        }, 15000);

        // Scroll-based tracking
        let scrolled = false;
        window.addEventListener('scroll', () => {
          if (!scrolled && window.scrollY > 100) {
            scrolled = true;
            trackClick(document.body, 'scroll_100px');
          }
        }, { once: true });

      } catch (error) {
        console.error('Error in client-side script:', error);
      }
    })();
  </script>
</body>
</html>
