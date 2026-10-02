# Magizh Cafe Cloudflare Migration Starter

First implementation pass based on the existing server.js.

- Node http server -> Cloudflare Worker
- magizh-test-data.json -> D1 app_state
- Existing /api/health, /api/state, /api/state/bulk, /api/reset routes preserved
- Static approved frontend is served through Worker Assets
- Customer and order tables prepared for persistent migration

Before deployment, replace the D1 database_id in wrangler.jsonc with the real magizh-db ID and copy the approved current frontend files into public/.
