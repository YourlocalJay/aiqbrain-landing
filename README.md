# AIQBrain Cloaking Worker

Minimal Cloudflare Worker used to serve a Claude-themed bait page and cloak offer traffic.

## Routes
- `/` and `/vault` – static bait page
- `/sv` and `/offers/*` – offer redirect with basic bot filtering
- `/go` – signed shortlink redirect
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
- `LINK_SECRET` – HMAC secret for signed `/go` links
- `LINK_DEFAULT_TTL` – default TTL for generated links in seconds
- `DEBUG_LIVE_LINKS` – when `true`, enables the `/mk` dev link generator
- `LINK_DEV_TOKEN` – token required by `/mk` (dev only)

### Deployment
```
wrangler deploy
```

### Test URLs
- `/vault`
- `/access?email=test%40mail.com`
- `/sv?utm_source=reddit&utm_campaign=banned_prompts`

## Analytics Logging

The worker emits click events to a Make.com webhook defined by `MAKE_WEBHOOK_URL` in `wrangler.toml`. A Make scenario handles
validation, deduplication, storage, and alerts:

1. **Webhook → Router** – Valid events require `subid` and `geo`; invalid payloads are logged to a `clicks_invalid` sheet.
2. **Dedupe** – A Make Data Store (`aiqbrain_click_ids`) keyed by `subid` prevents duplicate rows.
3. **Sinks** – Valid events append to Google Sheet **AIQBrain_Click_Log** (`clicks` tab). A parallel step can create items in the
   Notion database *AIQBrain Clicks*.
4. **Alerts** – Slack/Email notifications fire on anomalies (e.g. `geo == "XX"`, desktop devices, or offers containing
   `FALLBACK`). Errors retry twice then land in a `clicks_errors` sheet.

**Payload schema**

```json
{
  "ts": "2025-08-10T21:10:05.144Z",
  "path": "/sv",
  "geo": "US",
  "asn": 15169,
  "device": "android",
  "ua": "Mozilla/5.0 (Linux; Android 14; ...)",
  "utm": {"source": "reddit", "medium": "", "campaign": "P01", "term": "", "content": "ChatGPT"},
  "persona": "P01",
  "subreddit": "ChatGPT",
  "subid": "P01-ChatGPT-US-android-1723324205",
  "host": "aiqbrain.com",
  "referrer": "https://www.reddit.com/...",
  "offer": "US_ANDROID",
  "target": "https://...id=68831&subid=P01-ChatGPT-US-android-1723324205&utm_source=reddit"
}
```

See `links/click_log_template.csv` for sheet headers and an example row. A separate nightly scenario reads yesterday's rows from
the sheet, summarizes by persona/subreddit/geo/device, and posts the report to Slack or Email.

### Manual test

With the scenario running, send a test hit:

```bash
curl -X POST "$MAKE_WEBHOOK_URL" \
  -H "content-type: application/json" \
  -d '{"ts":"2025-08-10T21:10:05.144Z","path":"/sv","geo":"US","device":"android","persona":"P01","subreddit":"ChatGPT","subid":"P01-ChatGPT-US-android-1723324205"}'
```
