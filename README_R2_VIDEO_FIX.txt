MAGIZH CAFE — INTRO VIDEO R2 FIX

Purpose
-------
Fix the black screen on the Cloudflare Worker site without putting the MP4
inside Workers Static Assets.

Worker change
-------------
worker.js now serves:
  /login-intro.mp4
from the existing R2 bucket:
  magizh-products
using this R2 object key:
  intro/login-intro.mp4

GitHub
------
Replace the repository's current worker.js with this worker.js and commit it
to the main branch. Cloudflare Workers Builds will deploy it automatically.

R2
--
In Cloudflare R2 -> magizh-products, upload the existing login-intro.mp4 file
under the object key:
  intro/login-intro.mp4

Do NOT put the MP4 in ./public and do NOT change the Static Assets directory.

After deployment
----------------
Open:
  https://magizh-api-fdb2.magizhcafee.workers.dev/login-intro.mp4

It should return the video instead of JSON/404. Then open the Worker home page.
The existing intro splash should play and the black-screen problem should be gone.

No D1 data is changed by this fix.
No product images are backed up or modified by this fix.
