# aiqbrain-persona-007

Sweepstakes/gift-card campaign system using Cloudflare Workers and automated PDF vault generation.

## How it works
1. **Seeds** – Offer data is gathered from CPAGrip and MaxBounty feeds plus manual organic seeds.
2. **Manifest build** – `npm run build:manifest` merges and scores offers into `data/manifest.json`.
3. **PDF vaults** – `npm run build:pdfs` renders two PDFs using Puppeteer:
   - `public/vault/sweepstakes-insider_vYYYYMMDD.pdf` (50-item master list)
   - `public/vault/hot-picks_vYYYYMMDD.pdf` (3-item teaser)

## Quick start
```bash
npm install
npm run build
```

## GitHub Actions
- **Deploy Worker** publishes the Cloudflare Worker router.
- **Build Vault PDFs** builds and commits the manifest and PDFs.
- **Reddit Post Validator** checks subreddit rules and disclosure text.

Artifacts from the vault build appear in `public/vault/` on the `main` branch.
