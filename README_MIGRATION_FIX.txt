MAGIZH CLOUDFLARE BUILD FIX v3
================================

Purpose
-------
Fix the Cloudflare Workers Build failure:
  "ERROR Asset too large."

What changed
------------
1. Worker Static Assets are now limited with `assets.include`.
2. Server/source files and large video files are excluded from Static Assets.
3. Existing D1 database binding:
   magizh-db
   ID: df4995ae-0e06-4c9b-9e4f-c36ea4581734
4. Existing R2 bucket:
   magizh-products
5. Existing Worker:
   magizh-api-fdb2

Expected deployment
-------------------
The GitHub/Cloudflare build should no longer scan the whole repository as
2,030 static assets, and oversized MP4 files should not be uploaded as
Worker Static Assets.

IMPORTANT
---------
Do not add the large intro video to Worker Static Assets. The intended
intro video should be stored in R2 and served from there.

Deployment
----------
Upload/replace these files in the repository root:
- worker.js
- wrangler.jsonc
- .assetsignore
- README_MIGRATION_FIX.txt

Then commit/push to main. Cloudflare Builds should automatically start.
