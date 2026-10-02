MAGIZH CLOUDFLARE BUILD FIX v4 — CORRECT WORKERS ASSETS METHOD

The previous v3 approach was wrong: `assets.include` is a Workers Sites option,
not a supported field under modern Workers Static Assets. That is why the build
continued to read the repository root.

This v4 fix uses the supported method:
1. `assets.directory` is `./public`.
2. `build.mjs` creates `./public` during the Cloudflare build.
3. It copies only frontend HTML/CSS/images/icons/webmanifest.
4. It excludes server.js, worker.js, package/config files and all video files.
5. The intro video belongs in R2, not Worker Static Assets.

CLOUDFLARE WORKERS BUILDS SETTINGS
-----------------------------------
Build command:
  node build.mjs

Deploy command:
  npx wrangler deploy

Root directory:
  /

After committing these files, Cloudflare should run:
  node build.mjs
  npx wrangler deploy

The asset directory will then be ./public, not the repository root.
