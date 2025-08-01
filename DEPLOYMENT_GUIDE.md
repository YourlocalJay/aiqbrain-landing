# AIQBrain Landing - Deployment Guide

This guide provides detailed instructions for deploying the AIQBrain landing page system using Cloudflare Workers.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- [Cloudflare account](https://dash.cloudflare.com/sign-up) with Workers enabled
- [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (included in dev dependencies)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YourlocalJay/aiqbrain-landing.git
cd aiqbrain-landing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Edit the `wrangler.toml` file to customize your deployment settings:

```toml
name = "aiqbrain-landing"
main = "src/worker.js"
compatibility_date = "2023-10-16"

[vars]
ENVIRONMENT = "production"
# Add your configuration variables here

[env.development]
vars = { ENVIRONMENT = "development" }
```

## Development

### Local Development

Start a local development server:

```bash
npm run dev
```

This will start a local server at `http://localhost:8787`.

### Testing

To run tests:

```bash
npm test
```

## Deployment

### Authentication

Authenticate with Cloudflare:

```bash
npx wrangler login
```

### Deploy to Cloudflare Workers

Deploy to production:

```bash
npm run deploy
```

Or deploy to a specific environment:

```bash
npx wrangler deploy --env development
```

## Custom Domain Setup

To use a custom domain with your Cloudflare Workers deployment:

1. In the Cloudflare dashboard, go to the **Workers & Pages** section
2. Select your worker
3. Go to **Triggers** > **Custom Domains**
4. Add your domain (e.g., `aiqbrain.com`)
5. Configure DNS settings as directed

## Environment Variables

For sensitive information, use Cloudflare Workers secrets:

```bash
# Set a secret
npx wrangler secret put API_KEY

# List all secrets
npx wrangler secret list
```

## File Structure

The project is organized as follows:

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

## Customizing Routes

To add or modify routes, edit the `src/routes.js` file:

```javascript
export const routes = [
  { path: '/', handler: 'home' },
  { path: '/vault', handler: 'vault' },
  { path: '/sv', handler: 'offers' },
  // Add your routes here
];
```

## URL Architecture

As per the AIQBrain brand style guide, the following URL architecture is implemented:

- `/` - Homepage (qualification + initial filter)
- `/vault` - Vault Preview (samples + lead capture)
- `/request` - Access Request (application + qualification)
- `/strategy` - Strategy Hub (core systems overview)
- `/lab` - Monetization Lab (implementation tools)
- `/results` - Results Dashboard (proof + verification)
- `/sv` - Survey Vault (geo-based routing)
- `/ops` - OPSEC Resources (security + compliance)

## Troubleshooting

### Common Issues

**"Worker size limit exceeded"**:
- Reduce the size of your worker by removing unnecessary dependencies
- Split large functionalities into separate workers

**"Failed to deploy worker"**:
- Check your Cloudflare account permissions
- Verify your wrangler authentication

**"Cannot find module"**:
- Make sure all dependencies are installed: `npm install`
- Check import paths for typos

### Logs and Debugging

View logs from your deployed worker:

```bash
npx wrangler tail
```

## Performance Optimization

To optimize performance:

1. Minimize CSS and JavaScript
2. Use the Cloudflare Cache API for frequently accessed content
3. Implement edge caching with appropriate headers
4. Optimize images and other assets

## Security Best Practices

The security middleware implements several best practices:

1. Content Security Policy (CSP)
2. HTTP Strict Transport Security (HSTS)
3. XSS Protection
4. Frame Options
5. Referrer Policy

Customize security settings in `src/middleware/security.js`.

## Maintenance

### Updates

To update dependencies:

```bash
npm update
```

### Monitoring

Monitor your worker's performance using Cloudflare Analytics in the dashboard.

## Support

For assistance, contact:
```
support@aiqbrain.com
```
