MAGIZH CAFE FINAL PROFILE + B5 FIX

This package is intentionally FLAT: all upload files are in this single folder.
Do not create another folder inside it.

Included corrections:
1. Logged-in customer gets Profile button in the TOP header.
2. Footer Profile button is removed.
3. Profile shows Name, Phone, Customer ID, B5 ID, and current Magizh Coins.
4. Profile can update Name, Email, Address and PIN code.
5. Saved profile address is automatically loaded at checkout and remains editable for a different order.
6. B5 login is Mobile/Member ID + Password only. No OTP UI is used.
7. B5 login is verified server-side against the AIC read-only member data using SHA-256 password verification.
8. First successful B5 connection gets 500 Magizh Coins.
9. Initial 500-coin grant is protected against duplicate grants by D1.
10. B5 wallet balance is stored server-side in D1 so an existing grant does not incorrectly display 0.
11. AIC data is read-only from Magizh.
12. wrangler.jsonc includes keep_vars=true so Dashboard runtime variables are not removed by Wrangler deploy.
13. AIC_SUPABASE_SERVICE_KEY must remain a Cloudflare Secret. Do NOT put the actual key in GitHub or this package.
14. Existing intro-video R2 route, products, images, partner offers and current UI are preserved.

Required Cloudflare runtime settings:
- AIC_SUPABASE_URL = existing AIC Supabase project URL (Variable)
- AIC_SUPABASE_SERVICE_KEY = existing AIC Supabase service key (Secret)
- EMAIL_FROM = existing verified sender email (Variable)
- R2 binding: BUCKET -> magizh-products
- D1 binding: DB -> magizh-db
- Email binding: EMAIL -> existing Email Service binding

Deploy:
- GitHub/Workers Build root should be this folder's contents.
- Build command: node build.mjs
- Deploy command: npx wrangler deploy

Do not upload the AIC service key into this folder.
