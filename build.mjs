const fs = require("fs");
const path = require("path");

const root = process.cwd();
const out = path.join(root, "public");

const allowed = new Set([
  ".html", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg",
  ".ico", ".gif", ".webmanifest"
]);

const excludedNames = new Set([
  "worker.js", "server.js", "server-sync.js", "package.json",
  "package-lock.json", "wrangler.jsonc", "schema.sql",
  "magizh-test-data.json"
]);

const excludedDirs = new Set([
  ".git", "node_modules", ".wrangler", "public"
]);

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (excludedDirs.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else {
      const ext = path.extname(ent.name).toLowerCase();
      if (excludedNames.has(ent.name)) continue;
      if (ext === ".mp4" || ext === ".mov" || ext === ".mkv" ||
          ext === ".avi" || ext === ".webm") continue;
      if (!allowed.has(ext)) continue;

      const rel = path.relative(root, full);
      const dest = path.join(out, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(full, dest);
    }
  }
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
walk(root);

console.log("Prepared Worker Static Assets in ./public");
