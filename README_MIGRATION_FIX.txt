MAGIZH CLOUDFLARE BUILD FIX

This is a corrected build-fix package.

1. Keep the existing GitHub frontend files at repository root.
2. Replace the current worker.js and wrangler.jsonc with these files.
3. Put the EXISTING magizh-db Database ID into wrangler.jsonc.
4. Commit to main. Cloudflare Workers Builds will then deploy.

Do NOT create a new D1 database.
Do NOT retry the old failed build before replacing the broken worker.js.

The previous build error was a JavaScript syntax error in worker.js near the
default response. This package is rebuilt from the original Worker source and
adds the static page routing cleanly.
