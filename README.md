# AIQBrain Monetization Portal

🚀 **Cloudflare Worker-powered landing system with smart routing, tracking, and conversion optimization**

<div align="center">
  <img src="https://img.shields.io/badge/Platform-Cloudflare%20Workers-orange" alt="Platform">
  <img src="https://img.shields.io/badge/AI%20Monetization-Claude%20Optimized-blue" alt="Claude Optimized">
  <img src="https://img.shields.io/badge/TOS-Compliant-success" alt="TOS Compliant">
</div>

## 🔥 Core Features

| Feature | Benefit | Implementation |
|---------|---------|----------------|
| **Edge Computing** | <100ms global response times | Cloudflare Workers deployment |
| **Smart Routing** | Optimized user flows | Route-based handler system |
| **Security** | Platform compliance | Security middleware |
| **Analytics** | Performance tracking | Built-in analytics middleware |
| **SEO Optimization** | Better discovery | SEO utilities |

## 🛠 Project Structure

```
aiqbrain-landing/
├── public/                  # Static assets
│   ├── assets/              # CSS, JS, and images
│   ├── _headers             # Cloudflare headers config
│   └── _redirects           # Cloudflare redirects config
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   ├── data/                # Data configuration
│   ├── handlers/            # Route handlers
│   ├── middleware/          # Request middleware
│   ├── templates/           # HTML templates
│   ├── utils/               # Utility functions
│   ├── routes.js            # Route definitions
│   └── worker.js            # Worker entry point
└── wrangler.toml            # Cloudflare Workers config
```

## 📦 Installation

```bash
# 1. Clone repository
git clone https://github.com/YourlocalJay/aiqbrain-landing.git

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

## 🚀 Deployment

```bash
# Deploy to Cloudflare Workers
npm run deploy
```

## 🔧 Configuration

### Wrangler Configuration

Edit `wrangler.toml` to configure your Cloudflare Workers project:

```toml
name = "aiqbrain-landing"
main = "src/worker.js"
compatibility_date = "2023-10-16"

[vars]
ENVIRONMENT = "production"

[env.development]
vars = { ENVIRONMENT = "development" }
```

### Route Configuration

Add new routes in `src/routes.js`:

```js
export const routes = [
  { path: '/', handler: 'home' },
  { path: '/vault', handler: 'vault' },
  { path: '/sv', handler: 'offers' },
  // Add additional routes here
];
```

## 📈 Analytics

The project includes built-in analytics middleware that can be configured to track:

- Page views
- Conversion events
- Offer clicks
- User behavior

Configure analytics in `src/middleware/analytics.js`.

## 🛡 Security

Security features include:

- Content Security Policy
- Rate limiting
- Bot detection
- Request validation

Configure security settings in `src/middleware/security.js`.

## 📚 Documentation

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Itty Router](https://github.com/kwhitley/itty-router)

## 🧩 Adding New Pages

1. Create a new handler in `src/handlers/`
2. Add the route in `src/routes.js`
3. Create any necessary templates in `src/templates/`

## 📞 Support

For assistance, please contact:
```
support@aiqbrain.com
```

---

<div align="center">
  <strong>AIQBrain Systems © 2025 | <a href="https://aiqbrain.com/compliance">Compliance</a></strong>
</div>
