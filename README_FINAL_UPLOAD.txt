MAGIZH CAFE – FINAL PROFILE + B5 LOGIN + COIN FIX

UPLOAD STRUCTURE
----------------
All files in this package are at the ZIP ROOT. There is NO extra nested project folder.

BASE PRESERVED
--------------
- Existing Magizh Cafe mobile UI
- Existing login button / normal mobile + password login
- Intro video flow
- Products / product images
- Partner offers / sliders
- My Orders / View Cart / Logout
- Existing admin and partner pages

FINAL CORRECTIONS
-----------------
1. Profile button is now in the top logged-in header.
2. Any bottom/footer Profile button is removed.
3. Profile shows:
   - Name
   - Mobile number
   - Customer ID
   - B5 Member ID
   - Account type
   - Current Magizh Coins
   - Primary address + PIN code
4. Profile can be updated.
5. Saved addresses can be added, selected as primary, and deleted.
6. Checkout automatically fills the saved primary address.
7. Customer can edit the delivery address before placing an order.
8. B5 login uses Member ID/mobile + password only. NO OTP.
9. B5 login is verified server-side against the existing AIC Supabase member record.
10. First valid B5 connection receives 500 Magizh Coins in the server-side wallet.
11. The one-time 500-coin grant is protected by D1 duplicate protection.
12. Existing stale grant records from the earlier buggy bridge are reconciled into the server wallet once, so a valid user is not left at 0 coins.
13. B5 coin balance is shown in the Profile / wallet and product coin display.
14. Wrangler keep_vars=true is enabled so Dashboard runtime variables are not removed by deploy configuration.

CLOUDFLARE VARIABLES / SECRETS
-------------------------------
Keep these in Cloudflare Worker Settings > Variables & Secrets:
- AIC_SUPABASE_URL       (Variable)
- AIC_SUPABASE_SERVICE_KEY  (Secret – keep encrypted)
- EMAIL_FROM             (Variable or Secret as appropriate for the Email binding)

Do NOT put the AIC service key in this ZIP, GitHub, HTML, or JavaScript frontend.

DEPLOY
------
1. Upload/replace these root files in the existing MagizhCafe GitHub repository.
2. Keep production branch: main.
3. Build command: node build.mjs
4. Deploy command: npx wrangler deploy
5. Do not modify the AIC/B5 app itself.

TEST AFTER DEPLOY
-----------------
A. Existing normal customer login: Mobile + Password -> LOGIN.
B. Logged-in header should show: My Orders | Profile | View Cart | Logout.
C. Tap Profile -> verify name/mobile/ID/coins/address.
D. B5 User -> mobile or B5 Member ID + password -> LOGIN.
E. First valid B5 login -> 500 coins in Profile wallet.
F. Log out and log in again -> balance must NOT receive another 500.
G. Edit/save address -> start an order -> saved address should auto-fill.
H. Change address during checkout -> order uses the changed address and saves it as primary.
