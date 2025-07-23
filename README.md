# AIQBrain Landing Page - Cloudflare Worker

🚀 **Clean, minimal Cloudflare Worker with embedded landing page and redirect routing**

## 📂 Repository Structure
```
aiqbrain-landing/
├── index.js          # Main Worker (HTML + routing logic)
├── wrangler.toml     # Worker configuration
└── README.md         # This file
```

## ⚡ Features
- **All-in-One**: Landing page + redirects in single Worker
- **Zero Dependencies**: No build process, no external files
- **Edge Deployment**: Global CDN with sub-100ms response times
- **Cache Optimized**: Intelligent caching for performance
- **Security Headers**: XSS protection, frame denial, content sniffing protection
- **Mobile Responsive**: Claude.ai/Notion inspired design

## 🔗 Routing Structure
- **`/`** → Landing page (embedded HTML)
- **`/sv`** → CPAGrip redirect (configurable)
- **`/vault`** → Gumroad redirect
- **`/start`** → OGAds redirect
- **`/privacy`, `/terms`, `/about`** → Placeholder pages

## 🚀 Deployment

```bash
# Deploy to Cloudflare Workers
npx wrangler deploy

# Deploy with custom name
npx wrangler deploy --name aiqbrain-production

# Local development
npx wrangler dev
```

## ⚙️ Configuration

All settings are in `wrangler.toml`:

```toml
[vars]
REDIRECT_SV = "https://your-cpagrip-link.com"
REDIRECT_VAULT = "https://your-gumroad-link.com"
REDIRECT_START = "https://your-ogads-link.com"
CACHE_TTL = "3600"
```

## 🎯 Custom Domain

After deployment, add routes to `wrangler.toml`:

```toml
routes = [
  { pattern = "aiqbrain.com/*", zone_name = "aiqbrain.com" },
  { pattern = "www.aiqbrain.com/*", zone_name = "aiqbrain.com" }
]
```

## 📊 Performance Benefits

- ⚡ **Sub-100ms** response times globally
- 🌍 **200+ edge locations** worldwide  
- 💾 **Intelligent caching** built-in
- 📱 **Mobile optimized** responsive design
- 🔒 **Reddit/mod safe** professional appearance
- 💰 **Conversion optimized** layout

---

**Ready to deploy:** `npx wrangler deploy` 🚀

**Your stealth landing page with integrated affiliate routing is production-ready!**