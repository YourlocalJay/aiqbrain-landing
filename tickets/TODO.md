# TODO

| Action | Owner | ETA | Impact |
|---|---|---|---|
| Add `127.0.0.1,localhost` to `ALLOWED_HOSTS` in `wrangler.toml` for local testing | dev | 0.5h | Med |
| Authenticate `wrangler` (cloudflare login) and run `wrangler dev --remote` to test geo/device routing | dev | 1h | High |
| Replace placeholder `MAKE_WEBHOOK_URL` with real Make.com webhook and verify payload receipt | dev | 0.5h | High |
| Trigger `/sv` and confirm `clk:` keys stored in `BOT_LOG_KV` with 14‑day TTL | dev | 0.5h | Med |
| Document host-allowlist dev workaround in `README.md` | dev | 0.5h | Low |
