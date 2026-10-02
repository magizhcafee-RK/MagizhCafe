MAGIZH D1 BACKUP FIX — WORKER ONLY

Root cause fixed:
server-sync.js sends localStorage values as JSON strings. The previous Worker backup function rejected strings, so R2 was updated but backup_customers remained empty.

Replace/upload ONLY this Worker source file:
Magizh-Worker-D1-Backup-Fix.js

Do not change index.html, server-sync.js, partner offers, sliders, products, images, or videos for this test.

After deploying the Worker:
1. Register one NEW customer (use a new mobile number).
2. Wait 3–5 seconds.
3. Cloudflare D1 -> magizh-db -> backup_customers -> refresh.
4. The new customer row should appear.

Existing R2 state remains untouched.
