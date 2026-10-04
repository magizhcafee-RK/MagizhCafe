MAGIZH ↔ AIC B5 COIN BRIDGE
================================

Purpose
-------
Connect the existing AIC B5 registration data to Magizh without changing
the AIC Level Income system, its Supabase structure, or its existing backup.

Flow
----
AIC Supabase app_state.members[]
        -> AIC memberId (B5 ID)
        -> Magizh Worker lookup
        -> first-time 500 coin grant
        -> Magizh customer wallet

Duplicate protection
--------------------
D1 table: b5_coin_grants
Primary key: member_id
The same B5 member cannot receive the initial 500-coin grant twice.

IMPORTANT: AIC is READ-ONLY from the Magizh Worker.
No AIC data is written or modified.

Cloudflare Worker secrets/variables
-----------------------------------
Add these to the Magizh Worker:

1) AIC_SUPABASE_URL
   Value: the existing AIC Supabase URL.
   You can copy the value from AIC Cloud's existing SUPABASE_URL variable.

2) AIC_SUPABASE_SERVICE_KEY
   Secret value: copy the existing AIC Cloud SUPABASE_SECRET_KEY value.
   DO NOT send this key in chat or screenshots.

The existing Magizh DB and R2 bindings remain unchanged.

Upload/deploy
-------------
1. Replace the current worker.js with the worker.js in this ZIP.
2. Add magizh-b5-bridge.js to the GitHub project root.
3. Replace build.mjs with the build.mjs in this ZIP.
4. In AIC Cloud, do not change anything.
5. In the Magizh Worker environment, add the two AIC variables above.
6. Deploy normally through the existing GitHub -> Cloudflare Workers build.

Testing
-------
1. Use an existing AIC B5 member mobile number.
2. Open Magizh -> Register -> B5 User.
3. Enter the B5 registered mobile.
4. Use the current demo OTP flow.
5. Verify & Continue.
6. Magizh Worker checks AIC's app_state.members[].
7. If this B5 member has never received the Magizh initial grant:
      500 Coins are added.
8. Repeat the same B5 login:
      500 Coins are NOT added again.
9. Refresh Magizh:
      existing wallet remains unchanged.

The existing intro video route /login-intro.mp4 is also preserved in worker.js.
No product, partner, slider, image, video, or UI redesign is included.
