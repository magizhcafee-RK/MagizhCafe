MAGIZH ↔ AIC B5 BRIDGE FIX v3
==============================

The previous build reached the AIC bridge but returned HTTP 404 during the
Supabase app_state lookup. This version keeps the same architecture and
changes only the AIC read query:

- AIC remains READ-ONLY.
- Reads public.app_state and takes the first state row.
- It no longer assumes app_state.id = 1.
- members are read from app_state.data.members[]
- First successful B5 member gets 500 Magizh coins.
- Same B5 member cannot receive the initial 500 again.
- Existing Magizh UI, intro video, products, partner sections and D1/R2
  bindings are preserved.

UPLOAD
------
Replace the three existing project files with:
- worker.js
- magizh-b5-bridge.js
- build.mjs

Do NOT change AIC Cloud.
Do NOT change the AIC Supabase data.
Keep these Production variables in the Magizh Worker:
- AIC_SUPABASE_URL
- AIC_SUPABASE_SERVICE_KEY

Do not paste the secret key into chat or screenshots.

After deployment succeeds, test the same B5 mobile + password once.
If it still returns 404, the next check is the exact AIC Supabase Project URL
and whether public.app_state is exposed through Supabase REST; do not change
any AIC data until that is verified.
