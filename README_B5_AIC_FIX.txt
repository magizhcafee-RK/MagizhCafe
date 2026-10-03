MAGIZH B5 AIC CONNECTION — FINAL OTP REMOVAL FIX

Files:
1. index.html
2. worker.js

Purpose:
- Remove the B5 OTP/demo flow from Magizh.
- B5 login uses registered mobile number + B5 password.
- Magizh Worker reads B5 member data from the configured AIC Supabase project.
- AIC/B5 is read-only; this fix does not write to AIC.
- First successful B5 login grants 500 Magizh Coins.
- The same B5 member ID cannot receive the initial 500 coins again.
- Existing Magizh intro video route is preserved.
- Existing Magizh UI/products/partner areas are not intentionally changed.

Cloudflare variables required:
AIC_SUPABASE_URL
AIC_SUPABASE_SERVICE_KEY

Upload:
- Replace the current Magizh frontend index.html with this index.html.
- Replace the current Magizh Worker source with worker.js.
- Deploy Magizh only.
- Do NOT change the BORNTOWN5/AIC project.

Test:
1. Open Magizh.
2. Register -> B5 User.
3. Enter an existing AIC B5 registered mobile number.
4. Enter that B5 member's existing password.
5. Login & Continue.
6. First successful login: 500 Magizh Coins are added.
7. Login again with the same B5 member: no additional 500 coins.
