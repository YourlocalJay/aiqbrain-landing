# AIQBrain Landing Page

🚀 **Stealth AI landing page for vault and redirect routing**

## 📋 Overview
Minimal dark-mode landing page with Claude.ai/Notion inspired design.

## 🎯 Features
- Clean, modern design
- Dark theme optimized for conversion
- Responsive layout
- Zero dependencies (no frameworks)
- SEO optimized
- Reddit/mod-safe appearance

## 🔗 Routing Structure
- `/sv` → Claude Prompts (CPAGrip)
- `/vault` → Browse Vaults (Gumroad)
- `/start` → Quick Start (OGAds)
- `/privacy`, `/terms`, `/about` → Footer pages

## 🚀 Deployment
This is a static HTML site ready for:
- **Cloudflare Pages** (recommended)
- GitHub Pages
- Netlify
- Any static hosting

### Cloudflare Pages Setup:
1. Connect your GitHub repo to Cloudflare Pages
2. Build settings: **None** (static HTML)
3. Root directory: `/` (default)
4. No build command needed

### Cloudflare Worker Integration:
After Pages deployment, add a Cloudflare Worker for redirect routing:
- Handle `/sv`, `/vault`, `/start` routes
- Redirect to external links (CPAGrip, Gumroad, OGAds)
- Track analytics and conversions

## 📊 Performance
- ⚡ Fast loading (minimal CSS, no JS)
- 📱 Mobile optimized
- 🔍 SEO friendly
- ♿ Accessible design

---

**Ready for production deployment!** 🎉