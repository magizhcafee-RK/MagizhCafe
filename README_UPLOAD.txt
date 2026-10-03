MAGIZH B5 LOGIN + 500 COINS FINAL CORRECTION

Upload these files to the existing Magizh Cafe GitHub/Cloudflare project only.
Do NOT upload to the B5/AIC project.

Replace/add:
- index.html
- worker.js
- magizh-b5-bridge.js
- build.mjs
- server-sync.js

This correction does ONLY the agreed B5/login/wallet work:
1. B5 User uses Mobile + Password. No OTP.
2. First B5 connection credits 500 Magizh Coins.
3. First-time popup: Congratulations + 500 Magizh Coins.
4. Existing B5 users do not receive another 500 on later logins.
5. Normal Magizh login uses Mobile + Password (no OTP).
6. B5-connected users can log in normally with the same B5 password.
7. Profile button shows B5 ID, mobile and Coin Wallet balance.
8. Product Coin Balance reads the logged-in user's actual local wallet balance.
9. AIC remains read-only.
10. Intro video, products, partner offers, product images and overall UI are preserved.

IMPORTANT:
- Keep existing AIC_SUPABASE_URL and AIC_SUPABASE_SERVICE_KEY runtime variables.
- Do not change the B5/AIC project.
- Email setup is NOT changed in this correction.

TEST:
A) New/uncached B5 user -> B5 User -> mobile + password -> login.
   Expected: Congratulations / 500 Magizh Coins.
B) Product -> Product Details -> B5 Balance should show 500 Magizh Coins.
C) Profile -> B5 ID + Coin Wallet should show 500.
D) Logout -> normal Login -> same mobile + password -> direct login.
E) Login again with same B5 ID -> NO second 500 credit.
F) Profile/Product wallet must still show the current balance.
