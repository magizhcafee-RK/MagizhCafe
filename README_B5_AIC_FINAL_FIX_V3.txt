MAGIZH B5 AIC FINAL FIX V3

IMPORTANT: This is a MAGIZH-side fix only. Do not change BORNTOWN5/AIC.

Why V3:
The previous Worker source did not actually contain the /api/b5/login endpoint, so the frontend could only report "B5 member account not found". V3 adds the real endpoint.

Files:
- index.html
- worker.js
- README_B5_AIC_FINAL_FIX_V3.txt

What V3 does:
- No OTP.
- B5 login accepts B5 Member ID OR registered mobile + password.
- Worker reads AIC Supabase public.app_state (members array) using AIC_SUPABASE_URL and AIC_SUPABASE_SERVICE_KEY.
- AIC is read-only; no AIC data is written.
- Password verification supports SHA-256 hex/base64 matching the AIC passwordHash field.
- First successful login grants 500 Magizh Coins.
- D1 table b5_coin_grants prevents a second initial 500 for the same B5 member ID.
- Existing Magizh user state is preserved and backed up through the existing saveCurrentState path.
- Existing /login-intro.mp4 R2 route is preserved.

Cloudflare Production variables required:
AIC_SUPABASE_URL
AIC_SUPABASE_SERVICE_KEY

Deployment:
1. In the MAGIZH GitHub project, replace the frontend index file with index.html.
2. Replace the Worker source with worker.js.
3. Commit/push to main so the existing Cloudflare build/deploy runs.
4. Wait for a NEW successful Production deployment.
5. Open the Magizh Worker URL and reload the page.
6. B5 User -> enter a real existing AIC B5 Member ID or registered mobile and its real B5 password.
7. First successful login should report 500 Magizh Coins added.
8. Repeat login with the same B5 member: no additional 500.

Do not paste or expose the AIC secret key in source code, screenshots, or chat.
