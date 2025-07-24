// Updated HTML content with brand-compliant design
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AIQBrain – Claude-Centric Monetization Systems</title>
  <meta name="description" content="Battle-tested Claude monetization frameworks for sophisticated operators">
  <meta property="og:title" content="AIQBrain – TOS-Compliant AI Revenue Systems">
  <meta property="og:description" content="Transform Claude expertise into sustainable revenue streams">
  <meta property="og:image" content="https://aiqbrain.com/og-dark.png">
  <meta property="og:url" content="https://aiqbrain.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --background: #0a0e12;
      --card-bg: #121820;
      --text-primary: #e6edf3;
      --text-secondary: rgba(230, 237, 243, 0.8);
      --text-muted: rgba(230, 237, 243, 0.6);
      --accent-primary: #ff7b72;
      --accent-secondary: #58a6ff;
      --accent-warning: #f9c74f;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter Tight', sans-serif;
      line-height: 1.5;
      color: var(--text-primary);
      background: var(--background);
      min-height: 100vh;
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
      font-size: 3rem; 
      margin-bottom: 1.5rem; 
      line-height: 1.1;
    }
    
    .subtitle { 
      font-size: 1.25rem; 
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
    }
    
    .btn:hover { 
      filter: brightness(110%);
      box-shadow: 0 0 8px rgba(255, 123, 114, 0.4);
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
      padding: 0.5rem; 
      font-weight: 600; 
      font-family: 'Space Mono', monospace;
    }
    
    .system-card {
      background: var(--card-bg);
      border-radius: 8px;
      padding: 1.25rem;
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
      margin-bottom: 0.75rem;
      font-size: 1.25rem;
    }
    
    .card-metric {
      display: inline-block;
      background: rgba(88, 166, 255, 0.2);
      border: 1px solid var(--accent-secondary);
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }
    
    footer { 
      background: var(--card-bg); 
      padding: 2.5rem 0; 
      margin-top: 5rem; 
      border-top: 1px solid rgba(88, 166, 255, 0.2);
    }
    
    .footer-links { 
      display: flex; 
      justify-content: center; 
      gap: 1.5rem; 
      margin-bottom: 1rem; 
    }
    
    .footer-links a { 
      color: var(--text-secondary); 
      text-decoration: none; 
    }
    
    .footer-links a:hover { 
      color: var(--accent-primary); 
    }
    
    .copyright { 
      text-align: center; 
      color: var(--text-muted); 
      font-size: 0.875rem; 
    }
    
    .disclaimer {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 2rem;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
    
    @media (max-width: 768px) {
      h1 { font-size: 2.25rem; }
      .subtitle { font-size: 1.125rem; }
      .btn { 
        display: block; 
        margin: 0.75rem auto; 
        width: 100%; 
        max-width: 300px;
      }
      .btn-secondary {
        margin-left: 0;
      }
    }
  </style>
</head>
<body>
  <div class="urgent-banner" id="urgencyBanner" style="display: none;">
    ⚡ LIMITED ACCESS: <span id="spotsLeft">17</span> operator slots remaining for Q3 systems
  </div>
  
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="/" class="logo">AIQBrain</a>
        <nav>
          <a href="/vault" class="btn btn-secondary">System Vault</a>
        </nav>
      </div>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <h1 id="heroTitle">Claude Monetization Systems for Discerning Operators</h1>
      <p class="subtitle" id="heroSubtitle">Battle-tested frameworks delivering 18-27% conversion rates while maintaining full TOS compliance</p>
      <a href="/request" class="btn" id="primaryCTA">Request Access</a>
      <a href="/vault" class="btn btn-secondary">Framework Preview</a>
    </div>
  </section>
  
  <section class="container">
    <div class="system-card">
      <div class="card-header">NEURAL OPS FRAMEWORK v3.2</div>
      <div>
        <span class="card-metric">↑ 22.4% avg. conversion</span>
        <span class="card-metric">↓ 31% reduced CPA</span>
        <span class="card-metric">✓ TOS-verified</span>
      </div>
      <p>Our flagship system combines Claude's conversational strengths with optimized monetization pathways, delivering consistent results across niches.</p>
    </div>
    
    <div class="system-card">
      <div class="card-header">SURVEY VAULT INTEGRATION</div>
      <div>
        <span class="card-metric">↑ 18.7% qualified leads</span>
        <span class="card-metric">$2.38 avg. EPC</span>
        <span class="card-metric">✓ Geo-optimized</span>
      </div>
      <p>Specialized framework for maximizing survey monetization through Claude while maintaining user experience quality.</p>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <div class="footer-links">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/compliance">Compliance</a>
        <a href="/contact">Contact</a>
      </div>
      <p class="copyright">© 2025 AIQBrain.com. All rights reserved.</p>
      <p class="disclaimer">
        AIQBrain is an independent resource and not affiliated with Anthropic. Results vary based on implementation. 
        All systems operate within platform terms of service. <a href="/compliance" style="color: var(--accent-warning);">Read our compliance guidelines</a>.
      </p>
    </div>
  </footer>

  <script>
    (function() {
      const variants = {
        A: {
          title: "Claude Monetization Systems for Discerning Operators",
          subtitle: "Battle-tested frameworks delivering 18-27% conversion rates while maintaining full TOS compliance",
          cta: "Request Access",
          urgency: true
        },
        B: {
          title: "Transform Claude Expertise Into Reliable Revenue",
          subtitle: "22.4% avg. conversion across our operator network - TOS-compliant systems",
          cta: "Apply for Access",
          urgency: false
        },
        C: {
          title: "Strategic Claude Monetization Frameworks",
          subtitle: "31% lower CPA than conventional approaches - platform-compliant implementation",
          cta: "Join Operator Network",
          urgency: true
        }
      };

      try {
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
              url.searchParams.set('t', 'NEURAL_OPS');
              url.searchParams.set('src', 'direct');
              url.searchParams.set('m', 'landing');
              url.searchParams.set('c', 'q3_2025');
              url.searchParams.set('v', keys[vIndex]);
              url.searchParams.set('uid', userId);
              this.href = url.toString();
            }
          });
        });

        let shown = false;
        document.addEventListener('mouseleave', e => {
          if (e.clientY <= 0 && !shown) {
            shown = true;
            if (confirm('Limited availability - Only 3 operator slots remaining this week. Proceed to application?')) {
              window.location.href = '/request?t=exit_intent&v=' + keys[vIndex];
            }
          }
        });
      } catch (error) {
        console.error('Error in client-side script:', error);
      }
    })();
  </script>
</body>
</html>`;
