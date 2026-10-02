MAGIZH CLOUDFLARE BUILD FIX — 2026-10-02

This package fixes the current Workers Build failure caused by the previous
placeholder assets directory and prepares the actual D1/R2 Worker.

IMPORTANT:
1. Do NOT retry the failed build yet.
2. In Cloudflare Dashboard open D1 > magizh-db and copy its Database ID.
3. Replace PASTE_EXISTING_MAGIZH_DB_ID_HERE in wrangler.jsonc with that exact ID.
4. Commit the updated wrangler.jsonc to GitHub main.
5. That push will trigger the connected Workers Build.

Do not create a new D1 database. The configuration must point to the existing
magizh-db database.

The package uses:
- existing Magizh Worker API source (D1 + R2)
- existing root-level frontend files already in GitHub
- Workers Static Assets from the repository root
- .assetsignore so server/config/test-data files are not published publicly
- existing R2 bucket: magizh-products

No existing D1/R2 data is deleted by this package.
