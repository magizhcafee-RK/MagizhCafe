MAGIZH CAFE — FINAL B5 LOGIN + COIN FIX
========================================

This package is based on the current approved Magizh mobile website file.
It is NOT a rebuild.

FILES TO REPLACE IN MAGIZH PROJECT
-----------------------------------
1. index.html
2. worker.js
3. server-sync.js
4. build.mjs

Do not upload these files to the B5/AIC project.
They belong only to the MagizhCafe GitHub / Cloudflare Worker project.

WHAT IS FIXED
-------------
1. Normal customer login is MOBILE + PASSWORD with a visible LOGIN button.
2. Normal registration asks for a password (minimum 6 characters).
3. B5 User login is MOBILE + PASSWORD only. No OTP.
4. B5 login reads the existing BORNTOWIN5 Supabase app_state data.
5. B5/AIC is READ-ONLY from Magizh. Magizh does not write to B5.
6. First successful B5 connection credits 500 Magizh Coins.
7. The same B5 ID cannot receive the initial 500 twice.
8. A legacy zero-balance B5 wallet from the previous broken bridge is repaired once.
9. B5 ID and current Magizh Coin balance are visible in My Account.
10. The existing Magizh user/customer state is still stored in R2 and backed up to D1.
11. Intro video route is preserved at /login-intro.mp4 and reads intro/login-intro.mp4 from R2.
12. Existing product/category/image APIs are preserved.
13. GitHub Pages relative paths for index.html and server-sync.js are preserved.

CLOUDFLARE VARIABLES / SECRETS
-------------------------------
Keep the existing Email Service binding, D1 binding, and R2 binding.

Add/verify:
AIC_SUPABASE_URL = Variable
AIC_SUPABASE_SERVICE_KEY = Secret   <-- sensitive; do not use Variable/plaintext

Keep your existing EMAIL_FROM configuration.

WRANGLER VARIABLE PERSISTENCE
-----------------------------
Open KEEP_VARS_PATCH.txt.
Add keep_vars=true to the EXISTING Wrangler config file.
Do NOT replace the existing Wrangler config with a minimal config, because existing bindings must remain intact.

DEPLOY
------
1. Commit/upload the four replacement files to the MagizhCafe GitHub repository.
2. Let Cloudflare Workers Builds deploy.
3. If the build initialization times out, retry the build once before changing code.
4. After deployment, open the Magizh user page.

TEST ORDER
----------
A. Open Login.
   - Mobile Number
   - Password
   - LOGIN button must be visible.

B. Open Register -> B5 User Login.
   - Mobile Number
   - B5 Password
   - LOGIN TO MAGIZH
   - There must be NO OTP field/button.

C. Test with an existing B5 member.
   - First successful connection: alert says 500 Magizh Coins were credited.
   - Account -> B5 ID + Magizh Coins must show the credited balance.

D. Log out.

E. Use the normal Login screen with the SAME B5 mobile + SAME B5 password.
   - It should recognize the B5 account and open the same Magizh account.
   - It must NOT add another 500 coins.

F. Log out and log in again.
   - Coin balance must remain the same.

IMPORTANT
---------
Do not change the AIC/B5 application, its Supabase table, Level Income, referral logic, registration logic, or backup.
Do not delete existing Magizh D1/R2 data.
Do not remove the Email Service binding.
