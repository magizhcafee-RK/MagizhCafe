MAGIZH B5 LOGIN + COIN FINAL FIX v2

Only the requested correction is included.

1. Replace the current customer frontend index.html with the index.html in this ZIP.
2. Replace the current Worker with worker.js in this ZIP.
3. Keep your existing build.mjs and other files unchanged.
4. Deploy the Magizh Cloudflare Worker project.

Fixed:
- Normal Customer Login now shows Mobile Number + Password + LOGIN button.
- Normal login no longer uses OTP.
- B5 User uses Mobile Number + Password.
- First B5 login shows Congratulations + 500 Magizh Coins.
- Worker returns the real B5 grant balance so the wallet does not show 0 after an existing grant.
- Same B5 ID does not receive another 500.
- The B5 password is retained for the connected Magizh customer login on the device.
- Existing intro video route, products, R2/D1 bindings and B5 read-only AIC lookup are preserved.

Do not upload this ZIP to the AIC/B5 project. This is for the Magizh Cafe GitHub/Cloudflare project only.

After deployment test only:
A) Normal Login modal -> Mobile + Password -> LOGIN button visible.
B) B5 User -> Mobile + Password -> first login -> Congratulations + 500.
C) Product Details -> B5 Balance should show 500.
D) Logout -> Normal Login -> same mobile/password should open the customer page.

Do not change any other UI until this test is confirmed.
