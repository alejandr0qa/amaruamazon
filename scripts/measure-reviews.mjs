import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { execFileSync } from "node:child_process";
import { gzipSync } from "node:zlib";
import { chromium } from "@playwright/test";
const root = path.resolve(import.meta.dirname, "..");
const baseline = '52b37379ff1f10ec0fb32fa906f727e19a106a77';
const oldFiles = new Map(
  ["index.html", "i18n.js"].map((name) => [
    name,
    execFileSync("git", ["show", baseline + ":" + name]),
  ]),
);
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".png": "image/png",
};
const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  const name = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
  const filename = path.resolve(root, name);
  if (!filename.startsWith(root + path.sep)) {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    const bytes = oldFiles.get(name) || fs.readFileSync(filename);
    res.setHeader("Content-Type", mime[path.extname(name)] || "text/plain");
    res.setHeader("Cache-Control", "no-store");
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((resolve) => server.listen(8078, "127.0.0.1", resolve));
const browser = await chromium.launch();
const runs = [];
try {
  for (let i = 0; i < 3; i++)
    for (const [label, port] of [
      ["baseline", 8078],
      ["reviews", 8077],
    ]) {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        isMobile: true,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.measurements = { lcp: 0, cls: 0 };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            window.measurements.lcp = e.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            if (!e.hadRecentInput) window.measurements.cls += e.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200000,
        uploadThroughput: 100000,
      });
      await page.goto(`http://127.0.0.1:${port}/`);
      await page.waitForLoadState("networkidle");
      const metrics = await page.evaluate(() => ({
        lcpMs: window.measurements.lcp,
        cls: window.measurements.cls,
        fcpMs: performance.getEntriesByName("first-contentful-paint")[0]
          ?.startTime,
        resources: performance
          .getEntriesByType("resource")
          .map(({ name, transferSize, duration }) => ({
            name,
            transferSize,
            duration,
          })),
      }));
      runs.push({ label, run: i + 1, ...metrics });
      await context.close();
    }
} finally {
  await browser.close();
  server.close();
}
const median = (values) => values.sort((a, b) => a - b)[1];
const summary = Object.fromEntries(
  ["baseline", "reviews"].map((label) => {
    const rows = runs.filter((r) => r.label === label);
    return [
      label,
      {
        lcpMs: median(rows.map((r) => r.lcpMs)),
        fcpMs: median(rows.map((r) => r.fcpMs)),
        cls: median(rows.map((r) => r.cls)),
        resources: rows[0].resources.length,
        resourceBytes: rows[0].resources.reduce(
          (n, r) => n + r.transferSize,
          0,
        ),
      },
    ];
  }),
);
const assets = ["reviews-loader.js", "reviews.js", "reviews.css", "reviews-config.js"].map(
  (file) => {
    const bytes = fs.readFileSync(file);
    return { file, bytes: bytes.length, gzipBytes: gzipSync(bytes).length };
  },
);
const result = {
  checkedAt: new Date().toISOString(),
  baseline,
  conditions:
    "Chromium mobile 390x844, fresh contexts, 4x CPU, 150ms latency, 200000 bytes/s, no cache; local server, 3 alternating runs. Lab measurements, not field Core Web Vitals. HTML uncompressed on local preview.",
  assets,
  html: {
    baselineBytes: oldFiles.get("index.html").length,
    reviewsBytes: fs.statSync("index.html").size,
    baselineGzip: gzipSync(oldFiles.get("index.html")).length,
    reviewsGzip: gzipSync(fs.readFileSync("index.html")).length,
  },
  summary,
  runs,
};
fs.writeFileSync(
  "docs/review/2026-11-17/performance.json",
  JSON.stringify(result, null, 2) + "\n",
);
console.log(JSON.stringify({ assets, html: result.html, summary }, null, 2));
if (
  runs.some(
    (r) =>
      r.label === "reviews" &&
      r.resources.some((a) =>
        /challenges\.cloudflare|:8787|\.mp4/.test(a.name),
      ),
  )
)
  throw new Error("Unexpected initial third-party, API or video load");
if (assets.reduce((n, a) => n + a.gzipBytes, 0) > 6000)
  throw new Error("Review assets exceed 6 KB gzip budget");
