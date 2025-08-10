# AIQBrain Cloaking Worker

Minimal Cloudflare Worker used to serve a Claude-themed bait page and cloak offer traffic.

## Routes
- `/` and `/vault` – static bait page
- `/sv` and `/offers/*` – offer redirect with basic bot filtering
- all other paths – plain 404

## Development
```bash
npm install
npm run dev
```

## Standalone Offers Flow

Offers are stored in `public/data/cloudflare_offers.json`. Edit this file and commit to update the stack. Run `npm test` to validate structure and ensure all URLs use HTTPS.

### Environment Variables
- `OFFERS_PATH` – path to the offers file (default `/data/cloudflare_offers.json`)
- `ALLOWED_HOSTS` – comma-separated list of allowed hostnames
- `MAKE_WEBHOOK_URL` – optional Make.com webhook used by the vault form

### Deployment
```
wrangler deploy
```

### Test URLs
- `/vault`
- `/access?email=test%40mail.com`
- `/sv?utm_source=reddit&utm_campaign=banned_prompts`
