# AIQBrain Landing Audit Report

## 1. Inventory & Structure
- Key files and directories (depth ≤4):
```
• .github/workflows/deploy-staging.yml
• .github/workflows/node.js.yml
• .github/workflows/validate-offers-comment.yml
• .github/workflows/validate-offers.yml
• .gitignore
• README.md
• REPORT.md
• links/click_log_template.csv
• links/persona_links.csv
• package-lock.json
• package.json
• pages/vault.css
• pages/vault.html
• public/data/cloudflare_offers.json
• public/vault/index.html
• scripts/validate-offers.mjs
• src/handlers/access.js
• src/handlers/data.js
• src/handlers/not-found.js
• src/handlers/offers.js
• src/handlers/postback.js
• src/handlers/vault.js
• src/middleware/headers.js
• src/routes.js
• src/worker.js
• wrangler.toml
```

## 2. Config & Bindings Sanity
- `wrangler.toml` sets `main` to `src/worker.js` with compatibility date 2025-06-01.
- `BOT_LOG_KV` is bound with both production and preview IDs.
- Required vars present: `US_ANDROID`, `US_IOS`, `UK_ANDROID`, `CAN_ANDROID`, `CAN_IOS`, `FALLBACK_OFFER`, `MAKE_WEBHOOK_URL`, `BOT_ASN_DENYLIST`, `OFFERS_PATH`, `ALLOWED_HOSTS`.
- Critical vars are populated but `MAKE_WEBHOOK_URL` is a placeholder.

## 3. Worker Behavior Map
- Host allowlist blocks requests unless `env.ALLOWED_HOSTS` contains the hostname.
- Geo/device detection pulls from `request.cf` with query overrides.
- `/vault` and `/` serve static HTML with webhook URL injected.
- `/access` returns an intermediate HTML redirector.
- `/test` outputs JSON diagnostic context.
- `/sv`:
  - Bot/UAs or ASN denylist receive a human-check HTML page.
  - Attempts to load JSON offers from `OFFERS_PATH`; falls back to env offers.
  - Redirects to offer URL with `subid`, UTM, and `ml_sub1..5` parameters.
  - Logs to KV and optional webhook with retry.

## 4. Runbook (Dev Test)
- `wrangler dev --remote` failed: requires login.
- Local `wrangler dev` served on 8787 but `/sv` returned 404 due to `ALLOWED_HOSTS` allowing only `aiqbrain.com`.
- Sample curl requests to `/sv` returned 404/403, no redirects observed.

## 5. KV & Webhook Verification
- `MAKE_WEBHOOK_URL` points to placeholder; test POST returned HTTP code 000.
- KV logging could not be verified without Cloudflare login.

## 6. Security & Compliance
- Pages set `x-robots-tag` noindex, `x-frame-options: DENY`, and a strict CSP.
- Bot traffic receives non-redirecting fallback HTML.
- `ALLOWED_HOSTS` guard restricts hosts to `aiqbrain.com`.

## 7. Current Status Matrix
| Area | Status | Evidence | Risk |
|---|---|---|---|
| Routes /sv /vault | ⚠️ | `/sv` 404 locally | Medium |
| Geo/device routing | ⚠️ | Code present, untested | Medium |
| UTM→subid passthrough | ⚠️ | Code present, untested | Medium |
| Offer JSON fallback to env | ⚠️ | Offers file 404 locally | Medium |
| KV logging | ⚠️ | Code present, unverified | Medium |
| Webhook logging | ⚠️ | Placeholder webhook | Medium |
| Bot filtering & fallback | ⚠️ | Code present, untested | Low |
| Env vars present | ✅ | `wrangler.toml` vars | Low |
| ALLOWED_HOSTS guard | ✅ | Host filter in worker | Low |
| Build/publish | ❌ | `wrangler dev --remote` auth error | High |

## 8. Gaps → Actions (Prioritized)
| Action | Owner | ETA | Impact |
|---|---|---|---|
| Add `127.0.0.1,localhost` to `ALLOWED_HOSTS` for local dev testing | dev | 0.5h | Med |
| Authenticate `wrangler` and run `wrangler dev --remote` to exercise geo/device logic | dev | 1h | High |
| Replace placeholder `MAKE_WEBHOOK_URL` with real webhook and verify Make run | dev | 0.5h | High |
| Trigger `/sv` to confirm KV writes and TTL | dev | 0.5h | Med |
| Document workaround or toggle for host guard in README | dev | 0.5h | Low |

## 9. Acceptance Criteria
Ready to publish when:
- `/sv` redirects by geo/device with `subid` + UTM params.
- KV records at least one `clk:` key for today.
- Make.com scenario receives valid payload.
- Bots or denied ASNs see fallback HTML (no redirect).
- `/vault` serves branded HTML with `noindex`.

## Appendices
### A. File tree
```
• .github/workflows/deploy-staging.yml
• .github/workflows/node.js.yml
• .github/workflows/validate-offers-comment.yml
• .github/workflows/validate-offers.yml
• .gitignore
• README.md
• REPORT.md
• links/click_log_template.csv
• links/persona_links.csv
• package-lock.json
• package.json
• pages/vault.css
• pages/vault.html
• public/data/cloudflare_offers.json
• public/vault/index.html
• scripts/validate-offers.mjs
• src/handlers/access.js
• src/handlers/data.js
• src/handlers/not-found.js
• src/handlers/offers.js
• src/handlers/postback.js
• src/handlers/vault.js
• src/middleware/headers.js
• src/routes.js
• src/worker.js
• wrangler.toml
```

### B. wrangler dev --remote error
```
✘ [ERROR] You must be logged in to use wrangler dev in remote mode.
```

### C. curl smoke tests
```
Test1:
http://127.0.0.1:8787/sv?utm_source=reddit&utm_campaign=P01&utm_content=ChatGPT 404
Test2:
http://aiqbrain.com:8787/sv?utm_source=reddit&utm_campaign=P04&utm_content=ClaudeAI&geo=UK&device=ios 403
Test3:
404
```
