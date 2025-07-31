# AIQBrain Landing - Deployment Guide

This guide will help you fix the deployment issues and get your AIQBrain landing page running on Cloudflare Workers.

## Issues Fixed

✅ **Updated Dependencies**: All dependencies updated to latest versions
- esbuild: ^0.25.8 (was ^0.21.5)
- wrangler: ^4.27.0 (was ^3.65.1) 
- vitest: ^3.2.4 (was ^1.6.0)
- @cloudflare/workers-types: ^4.20240806.0

✅ **Fixed Build Configuration**: Corrected entry point path in build.js
✅ **Updated Compatibility Date**: Set to 2025-07-31
✅ **Commented Out KV Namespaces**: Until they are created properly

## Deployment Steps

### 1. Install Updated Dependencies

```bash
# Delete node_modules and lockfile to ensure clean install
rm -rf node_modules package-lock.json

# Install with latest versions
npm install
```

### 2. Authenticate with Cloudflare

```bash
# Login to Cloudflare (if not already done)
npx wrangler auth login
```

### 3. Create KV Namespaces (Optional)

If you want to use KV storage features, create the namespaces:

```bash
# Run the KV creation script
npm run kv:create
```

This will create the required KV namespaces and give you the IDs to update in `wrangler.toml`.

### 4. Set Up Secrets (Optional)

If you need webhook secrets or API keys:

```bash
# Run the secrets setup script
npm run secrets:setup
```

### 5. Deploy

Now you can deploy with the standard commands:

```bash
# Deploy to development
npm run deploy

# Or deploy to production
npm run deploy:prod
```

## Brand Style Implementation

Based on the AIQBrain Brand Style Guide provided, here are the key elements to implement:

### Colors (CSS Variables)
```css
:root {
  --background: #0a0e12;      /* Deep Slate */
  --card-bg: #121820;         /* Dark Steel */
  --text-primary: #e6edf3;    /* Light Steel */
  --text-secondary: rgba(230, 237, 243, 0.8);
  --text-muted: rgba(230, 237, 243, 0.6);
  --accent-primary: #ff7b72;  /* Coral Action */
  --accent-secondary: #58a6ff; /* Trust Blue */
  --accent-warning: #f9c74f;  /* Alert Yellow */
}
```

### Typography
- **Headers**: Space Mono, 700 weight
- **Body**: Inter Tight, 400-600 weight
- **Font CDN**: Already specified in the style guide

### URL Architecture (as per guide)
- `/` - Homepage (qualification + initial filter)
- `/vault` - Vault Preview (samples + lead capture)
- `/request` - Access Request (application + qualification)
- `/strategy` - Strategy Hub (core systems overview)
- `/lab` - Monetization Lab (implementation tools)
- `/results` - Results Dashboard (proof + verification)
- `/sv` - Survey Vault (geo-based routing)
- `/ops` - OPSEC Resources (security + compliance)

## Troubleshooting

### If deployment still fails:

1. **Check Wrangler Version**:
   ```bash
   npx wrangler --version
   ```
   Should be 4.27.0 or higher.

2. **Verify Build Output**:
   ```bash
   npm run build
   ls -la dist/
   ```
   Should show `index.js` in the dist folder.

3. **Test Locally**:
   ```bash
   npm run dev
   ```
   Should start the dev server without errors.

4. **Check Cloudflare Dashboard**:
   - Verify your account has Workers enabled
   - Check domain configuration if using custom routes

### Common Error Solutions

**"No such file or directory" during build**:
- Fixed by updating build.js to use correct entry point

**"Compatibility date" errors**:
- Fixed by updating to 2025-07-31

**KV namespace errors**:
- Commented out in wrangler.toml until properly created

**Old wrangler syntax errors**:
- Fixed by updating to wrangler v4+ compatible format

## Next Steps

1. Update your actual CPA offer URLs in `wrangler.toml`
2. Replace placeholder analytics IDs with your real ones
3. Implement the brand style guide CSS
4. Create the funnel pages according to the URL architecture
5. Set up proper tracking and analytics

Your deployment should now work correctly with the latest dependencies and fixed configuration!
