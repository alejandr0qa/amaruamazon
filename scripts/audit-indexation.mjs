import fs from "node:fs";
import { parse } from "parse5";
import { experiencePath } from "../src/experience-pages.mjs";
const origin = "https://amaruamazonexperiences.com";
const targets = [
  ["oje", "en"],
  ["flooded-forest", "fr"],
  ["san-antonio", "fr"],
  ["kayak", "fr"],
  ["flooded-forest", "en"],
];
const walk = function* (n) {
  yield n;
  for (const c of n.childNodes || []) yield* walk(c);
};
const attr = (n, k) => n.attrs?.find((a) => a.name === k)?.value;
const text = (n) =>
  n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join(" ");
const pages = new Map();
async function get(url) {
  if (pages.has(url)) return pages.get(url);
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(25000),
  });
  const html = await response.text();
  const nodes = [...walk(parse(html))];
  const record = {
    url,
    status: response.status,
    location: response.headers.get("location"),
    robotsHeader: response.headers.get("x-robots-tag"),
    robotsMeta: nodes
      .filter((n) => ["robots", "googlebot"].includes(attr(n, "name")))
      .map((n) => attr(n, "content")),
    canonical: nodes
      .filter((n) => attr(n, "rel") === "canonical")
      .map((n) => attr(n, "href")),
    hreflang: Object.fromEntries(
      nodes
        .filter((n) => n.tagName === "link" && attr(n, "hreflang"))
        .map((n) => [attr(n, "hreflang"), attr(n, "href")]),
    ),
    title: text(nodes.find((n) => n.tagName === "title") || {}).trim(),
    h1: nodes.filter((n) => n.tagName === "h1").map(text),
    mainWords: text(nodes.find((n) => n.tagName === "main") || {})
      .trim()
      .split(/\s+/).length,
    editorial: nodes
      .filter((n) => attr(n, "data-editorial-context") !== undefined)
      .map((n) => text(n).trim()),
    imageCount: nodes.filter((n) => n.tagName === "img").length,
    links: nodes
      .filter((n) => n.tagName === "a" && attr(n, "href"))
      .map((n) => new URL(attr(n, "href"), url).href),
  };
  pages.set(url, record);
  return record;
}
const robots = await fetch(origin + "/robots.txt").then(async (r) => ({
  status: r.status,
  text: await r.text(),
}));
const sitemap = await fetch(origin + "/sitemap.xml").then(async (r) => ({
  status: r.status,
  text: await r.text(),
}));
const sitemapUrls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => m[1],
);
// Bounded concurrency, including all 42 sources, to count actual server-rendered inbound links.
for (let i = 0; i < sitemapUrls.length; i += 4)
  await Promise.all(sitemapUrls.slice(i, i + 4).map(get));
const results = [];
for (const [id, lang] of targets) {
  const url = origin + "/" + experiencePath(id, lang),
    page = await get(url);
  const alternatives = [];
  for (const locale of ["en", "es", "fr"]) {
    const alternate = await get(origin + "/" + experiencePath(id, locale));
    alternatives.push({
      locale,
      url: alternate.url,
      status: alternate.status,
      canonical: alternate.canonical,
      reciprocal: alternate.hreflang[lang] === url,
      title: alternate.title,
      h1: alternate.h1,
      editorial: alternate.editorial,
    });
  }
  results.push({
    ...page,
    inSitemap: sitemapUrls.includes(url),
    inbound: [...pages.values()]
      .filter(
        (p) => p.url !== url && p.links.some((l) => l.split("#")[0] === url),
      )
      .map((p) => p.url),
    alternatives,
  });
}
const extraUrls = process.argv.slice(2);
const extras = [];
for (const url of extraUrls) {
  const chain = [];
  let next = url;
  for (let i = 0; i < 6; i++) {
    const p = await get(next);
    chain.push(p);
    if (!p.location) break;
    next = new URL(p.location, next).href;
  }
  extras.push(chain);
}
fs.mkdirSync("docs/review/2026-11-17", { recursive: true });
fs.writeFileSync(
  "docs/review/2026-11-17/indexation.json",
  JSON.stringify(
    {
      checkedAt: new Date().toISOString(),
      lastCrawlReported: "2026-11-14",
      robots,
      sitemapStatus: sitemap.status,
      sitemapUrls,
      results,
      extras,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify(
    results.map(
      ({
        url,
        status,
        canonical,
        inSitemap,
        inbound,
        mainWords,
        hreflang,
        robotsHeader,
        robotsMeta,
      }) => ({
        url,
        status,
        canonical,
        inSitemap,
        inbound: inbound.length,
        mainWords,
        hreflang,
        robotsHeader,
        robotsMeta,
      }),
    ),
    null,
    2,
  ),
);
