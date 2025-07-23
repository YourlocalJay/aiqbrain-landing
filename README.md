# AIQBrain Landing Page - Cloudflare Worker

🚀 **Stealth AI landing page with integrated redirect routing as a Cloudflare Worker**

## 📋 Overview
Complete Cloudflare Worker that serves a minimal dark-mode landing page with Claude.ai/Notion inspired design and handles redirect routing for affiliate links.

## ⚡ Features
- **Embedded HTML**: Landing page built into the Worker (no external files needed)
- **Smart Routing**: Handles redirects directly in the Worker
- **Zero Dependencies**: Pure JavaScript, no build process required
- **Cache Optimized**: Proper cache headers for performance
- **Security Headers**: XSS protection, frame denial, content sniffing protection

## 🔗 Routing Structure
- **`/`** → Landing page (embedded HTML)
- **`/sv`** → CPAGrip redirect (configurable via environment vars)
- **`/vault`** → Gumroad redirect
- **`/start`** → OGAds redirect
- **`/privacy`, `/terms`, `/about`** → Placeholder pages

## 🚀 Deployment Commands

```bash
# Deploy directly
npx wrangler deploy

# Deploy with custom name
npx wrangler deploy --name aiqbrain-landing

# Deploy to specific environment
npx wrangler deploy --env production
```

## ⚙️ Configuration

### Environment Variables (in `wrangler.toml`):
```toml
[vars]
REDIRECT_SV = "https://singingfiles.com/show.php?l=0&u=2427730&id=68776"
REDIRECT_VAULT = "https://aiqengage.com/vault"
REDIRECT_START = "https://aiqengage.com/get-started"
CACHE_TTL = "3600"
```

### Custom Domain Setup:
```toml
# Add to wrangler.toml after deployment
routes = [
  { pattern = "aiqbrain.com/*", zone_name = "aiqbrain.com" },
  { pattern = "www.aiqbrain.com/*", zone_name = "aiqbrain.com" }
]
```

## 📊 Architecture Benefits

### **All-in-One Solution:**
- ✅ Landing page serving
- ✅ Redirect routing  
- ✅ Affiliate link management
- ✅ Analytics ready
- ✅ Edge deployment (global CDN)

### **Performance:**
- ⚡ **Sub-100ms** response times globally
- 🌍 **Edge locations** worldwide
- 💾 **Intelligent caching** 
- 📱 **Mobile optimized**

### **Stealth Features:**
- 🔒 **Reddit/mod safe** design
- 🛡️ **Security headers** included
- 🎯 **Clean, professional** appearance
- 📈 **Conversion optimized** layout

## 🛠️ Development

### Local Testing:
```bash
# Start development server
npx wrangler dev

# Test with specific port
npx wrangler dev --port 8080

# Test with live reload
npx wrangler dev --live-reload
```

### Environment Management:
```bash
# Set environment variables
wrangler secret put API_KEY

# List current variables
wrangler secret list

# Deploy to staging
wrangler deploy --env staging
```

## 🎯 Ready for Production!

This Worker is **production-ready** with:
- ✅ **Zero build process** required
- ✅ **Environment variables** configured
- ✅ **Security headers** included
- ✅ **Cache optimization** enabled
- ✅ **Mobile responsive** design
- ✅ **Affiliate links** integrated

**Deploy now:** `npx wrangler deploy` 🚀

---

## 📈 Next Steps

1. **Deploy Worker**: `npx wrangler deploy`
2. **Add Custom Domain**: Configure routes in `wrangler.toml`
3. **Update Affiliate Links**: Modify environment variables
4. **Add Analytics**: Integrate tracking (Plausible/GA4)
5. **A/B Testing**: Test different CTAs and copy

**Your stealth landing page is ready to convert!** 💰