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
