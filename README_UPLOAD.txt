# Magizh Customer Backup + Email Correction

This correction package intentionally changes only:
1. Customer registration data: adds customer email and keeps customer registrations backed up in D1 via backup_customers.
2. Welcome email: adds a Cloudflare Email Service binding and /api/email/welcome endpoint.

It does NOT change partner offers, slider images, product images/videos, or the approved intro/home UI.

## Files to replace
- index.html
- worker.js
- wrangler.jsonc

## Cloudflare email one-time setup
1. Onboard your sending domain in Cloudflare Email Service.
2. Replace SET_THIS_TO_YOUR_VERIFIED_SENDER_EMAIL in wrangler.jsonc with the verified sender, for example noreply@yourdomain.com.
3. Deploy the Worker.

## Test
1. Register a new customer with name, mobile, email, age, address and password.
2. D1 should create/use backup_customers and contain that customer row.
3. The welcome email endpoint is called automatically after registration.
4. If Email Service is not configured yet, registration still succeeds; the email call fails safely without blocking registration.

## Important
Customer registration is the only data backed up to D1 in this correction. Orders remain in the app's existing R2 state and are not newly backed up to D1 by this version.
