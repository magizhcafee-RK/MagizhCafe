MAGIZH CAFE – FINAL CORRECTION PACKAGE
======================================

BASE
----
index.html from the previously confirmed working base is retained as the main customer page.
The package is ROOT-LEVEL only: there is no extra nested source folder inside this ZIP.

FINAL CORRECTIONS
-----------------
1. Existing top LOGIN button preserved.
2. Logged-in header keeps My Orders, View Cart and Logout.
3. Profile is now added to the TOP header beside My Orders.
4. The old bottom/footer Profile option is removed/blocked.
5. Profile shows name, mobile, email, Customer ID, B5 ID and live Magizh Coin balance.
6. Profile supports saved addresses (Home / Work / Other), default address and address editing.
7. Checkout automatically loads the customer's default saved address.
8. Checkout can switch to another saved address or edit the address for that order.
9. Optional “Save this address to my profile” is available at checkout.
10. B5 login is Mobile + Password only. No OTP.
11. B5 login is verified server-side against the existing AIC read-only member data.
12. First successful B5 connection grants 500 Magizh Coins once only.
13. The 500-coin grant is stored in D1 and the live Magizh wallet is stored in Magizh state + customer backup.
14. Repeat B5 login does not add another 500; the actual current wallet balance is retained.
15. AIC is read-only. The AIC service key is never placed in frontend code.
16. wrangler.jsonc contains keep_vars=true so dashboard runtime variables/secrets are not overwritten by the next deploy.
17. Intro video route, products, product images, partner offers, sliders and existing UI are preserved.

CLOUDFLARE VARIABLES
--------------------
Keep these in the Magizh Worker dashboard:
- AIC_SUPABASE_URL
- AIC_SUPABASE_SERVICE_KEY (Secret)
- EMAIL_FROM
The package does NOT contain the actual secret value.

DEPLOY
------
Upload/replace these root-level files in the existing Magizh Cafe GitHub project.
Do not put them inside another folder.
Then let the existing Workers Build run:
  Build: node build.mjs
  Deploy: npx wrangler deploy

TEST
----
A) Open Magizh and login with an existing B5 member.
B) B5 User -> mobile + password -> LOGIN.
C) First successful connection should show 500 coins credited and Profile should show 500.
D) Login again: no second 500; the wallet should show the actual current balance.
E) Open Profile from the TOP header.
F) Add/update an address and then open View Cart -> Continue to Address.
G) The saved/default address should be filled automatically; another saved address can be selected or the order address edited.
