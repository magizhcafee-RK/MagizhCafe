MAGIZH CAFE - FINAL CORRECTION PACKAGE

UPLOAD STRUCTURE
----------------
All files in this ZIP are already at the ROOT level.
Do NOT upload this ZIP as a nested folder inside another folder.
When uploading to GitHub, the files should appear directly in the repository root.

BASE
----
index.html is the approved working customer page base. Existing login button/UI is preserved.

FINAL CORRECTIONS
-----------------
1. Normal customer login: Mobile + Password + visible LOGIN button.
2. B5 login: Member ID/mobile + Password only. No OTP.
3. B5 login is checked server-side against the AIC/Supabase member record.
4. First successful B5 connection grants 500 Magizh Coins once only.
5. The 500 coins are added to the actual Magizh customer wallet.
6. Existing B5 grant is protected by D1 table b5_coin_grants.
7. Profile option is available after login.
8. Profile shows Customer ID, B5 ID, name, mobile, email, address and wallet balance.
9. Profile address is automatically used when opening the order delivery-address step.
10. Customer can edit/save the profile address; order address can still be changed before placing an order.
11. Existing customer data continues to sync through /api/state and D1 customer backup.
12. Wrangler keep_vars=true is included so dashboard runtime variables are not removed by deploy configuration.
13. AIC_SUPABASE_URL and AIC_SUPABASE_SERVICE_KEY must remain configured in Cloudflare Worker Runtime Variables/Secrets. Do not put the service key in source code.
14. Existing intro video route /login-intro.mp4 is preserved in worker.js.
15. Existing products, images, partner offers, admin, server sync and UI files are preserved.

DEPLOY
------
GitHub -> upload/replace the ROOT files -> Cloudflare Workers Builds -> deploy.
Do not put the files inside a new MagizhCafe-main/ or progress/ folder.
