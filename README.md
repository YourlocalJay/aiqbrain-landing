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

### Run & Test
```bash
# Preflight
node -v
npm i -g wrangler

# Start remote dev
wrangler dev --remote

# Smoke tests (new terminal)
open "http://127.0.0.1:8787/sv?utm_source=reddit&utm_campaign=P01&utm_content=ChatGPT"
open "http://127.0.0.1:8787/sv?utm_source=reddit&utm_campaign=P04&utm_content=ClaudeAI&geo=UK&device=ios"
curl -I -A "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/125 Mobile Safari/537.36" \
  "http://127.0.0.1:8787/sv?utm_source=reddit&utm_campaign=P08&utm_content=Canva"
curl "http://127.0.0.1:8787/test?utm_source=reddit&utm_campaign=P10&utm_content=Futurology&geo=US&device=android"

# Publish
wrangler publish
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
