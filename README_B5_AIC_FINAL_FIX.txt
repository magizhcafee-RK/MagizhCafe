MAGIZH B5 AIC FINAL FIX — OTP REMOVED

IMPORTANT:
Use these files in the MAGIZH project only.
Do not change the BORNTOWN5 / AIC project.

Files:
- index.html
- worker.js

What this version fixes:
- B5 login uses B5 Member ID OR registered mobile number + password.
- No OTP flow.
- Worker actually queries the AIC Supabase app_state (read-only).
- Password is verified against the B5 SHA-256 passwordHash used by the AIC server.
- First successful B5 link grants 500 Magizh Coins.
- A D1 b5_coin_grants table prevents duplicate initial grants for the same B5 member ID.
- Existing Magizh customer state is preserved.
- Existing /login-intro.mp4 R2 route is preserved.

Cloudflare Worker Production variables must already exist:
AIC_SUPABASE_URL
AIC_SUPABASE_SERVICE_KEY

Deploy:
1. Replace the Magizh frontend index.html with this index.html.
2. Replace the Magizh Worker source with worker.js.
3. Commit/push to the Magizh GitHub main branch (or use the existing Cloudflare deployment workflow).
4. Wait for a successful Production deployment.
5. Open Magizh and hard-refresh/reload the page.
6. B5 User -> enter an existing AIC B5 mobile/member ID + its real B5 password.
7. First successful login should show 500 coins added.
8. Log in again with the same B5 member: no second 500.

Do NOT paste the AIC secret key into source code.
Do NOT modify AIC/B5.
