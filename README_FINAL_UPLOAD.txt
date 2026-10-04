MAGIZH FINAL PROFILE + B5 COIN FIX

IMPORTANT: This ZIP is FLAT. There is NO extra parent folder inside the ZIP.
Upload the files directly into the existing MagizhCafe repository root.

Included final corrections:
1. Existing top Login button is preserved.
2. Logged-in header now shows: My Orders | Profile | View Cart | Logout.
3. Any old footer Profile button is removed.
4. Profile shows/updates Name, Mobile, Customer ID, B5 ID, PIN Code, Address and current Magizh Coins.
5. Saved profile address is automatically filled into checkout; customer can change it for that order without changing the saved profile.
6. B5 login uses Mobile + Password only. No OTP UI is used.
7. B5/AIC is read-only from Magizh.
8. First successful B5 connection credits 500 Magizh Coins server-side.
9. Duplicate protection prevents a second 500-coin grant for the same B5 member ID.
10. The B5 balance returned by the server is written to the Magizh Coin Wallet.
11. B5 passwords are not stored in Magizh browser storage; normal login can re-verify B5 users against AIC.
12. Intro video route and existing product/UI flow are preserved.

CLOUDFLARE VARIABLES:
- AIC_SUPABASE_URL: Runtime variable
- AIC_SUPABASE_SERVICE_KEY: Secret (do NOT put it in this ZIP)
- Keep the existing D1, R2 and Email Service bindings.

Do not upload AIC/Supabase data into this project.
