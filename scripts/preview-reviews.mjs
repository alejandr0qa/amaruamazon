// Local-only preview. No login, remote database, resource activation or deployment.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
const root = path.resolve(import.meta.dirname, "..");
process.chdir(root);
const work = path.join(root, ".codex-preview", "reviews");
fs.mkdirSync(work, { recursive: true });
const tokenFile = path.join(work, "admin-token");
const token = fs.existsSync(tokenFile)
  ? fs.readFileSync(tokenFile, "utf8").trim()
  : crypto.randomBytes(32).toString("hex");
fs.writeFileSync(tokenFile, token);
const secretFile = path.join(root, "cloudflare/reviews/.dev.vars");
if (!fs.existsSync(secretFile))
  fs.writeFileSync(
    secretFile,
    `ENVIRONMENT="local"\nALLOWED_ORIGINS="http://127.0.0.1:8077,http://localhost:8077"\nTURNSTILE_HOSTNAMES="127.0.0.1,localhost"\nADMIN_TOKEN="${token}"\nRATE_SECRET="${crypto.randomBytes(32).toString("hex")}"\n`,
  );
const wrangler = path.join(root, "node_modules/wrangler/bin/wrangler.js");
const config = "cloudflare/reviews/wrangler.jsonc";
const migration = spawnSync(
  process.execPath,
  [
    wrangler,
    "d1",
    "migrations",
    "apply",
    "amaru-reviews",
    "--local",
    "--config",
    config,
  ],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
  },
);
if (migration.status !== 0) process.exit(migration.status || 1);
const worker = spawn(
  process.execPath,
  [
    wrangler,
    "dev",
    "--local",
    "--ip",
    "127.0.0.1",
    "--port",
    "8787",
    "--config",
    config,
  ],
  {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, WRANGLER_SEND_METRICS: "false" },
  },
);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".ico": "image/x-icon",
};
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(
    new URL(req.url, "http://127.0.0.1").pathname,
  );
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Cache-Control", "no-store");
  if (pathname === "/reviews-config.js") {
    res.setHeader("Content-Type", mime[".js"]);
    res.end(
      'window.AMARU_REVIEWS=Object.freeze({apiBase:"http://127.0.0.1:8787",turnstileSiteKey:"",localPreview:true});',
    );
    return;
  }
  // Serve only the built public site, never development sources, private files or D1.
  if (
    !/^\/(?:$|(?:es|fr)(?:\/|$)|experiences\/|assets\/|(?:index\.html|style\.css|reviews\.css|main\.js|i18n\.js|content\.js|render\.js|experience\.js|media\.js|reviews\.js|reviews-loader\.js|robots\.txt|sitemap\.xml|favicon\.ico)$)/.test(
      pathname,
    ) ||
    pathname.includes("..") ||
    pathname.includes("\\")
  ) {
    res.writeHead(404);
    res.end();
    return;
  }
  let file = path.resolve(root, "." + pathname);
  if (!file.startsWith(root + path.sep) && file !== root) {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (
      !mime[path.extname(file)] &&
      ![".xml", ".txt"].includes(path.extname(file))
    )
      throw new Error();
    res.setHeader("Content-Type", mime[path.extname(file)] || "text/plain");
    fs.createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
server.listen(8077, "127.0.0.1", () =>
  console.log(
    "Preview: http://127.0.0.1:8077/es/#traveller-reviews\nModeration: http://127.0.0.1:8787/admin\nLocal key: .codex-preview/reviews/admin-token (ignored by Git).",
  ),
);
function stop() {
  worker.kill();
  server.close();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
