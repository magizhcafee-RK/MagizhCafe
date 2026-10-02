MAGIZH INTRO FLASH FIX

Replace the existing build.mjs in GitHub with this file and commit to main.

Fix: Home Page will no longer flash for a moment before the intro video.
The page stays hidden until the R2 intro video actually starts playing.
The existing design, D1, R2 images, customer data, order data and partner offers are unchanged.

Keep R2 object:
intro/login-intro.mp4

Cloudflare Build command remains:
node build.mjs
