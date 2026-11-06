import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import path from "node:path";
import crypto from "node:crypto";
import { parse } from "parse5";
import { siteUrl, languages, languagePaths, contactEmail } from "../site.config.mjs";
const root = path.resolve(import.meta.dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const data = vm.runInNewContext(
  read("i18n.js") +
    "\n" +
    read("content.js") +
    "\n({translations,experiences,journeys,gallery})",
);
const walk = function* (node) {
  yield node;
  for (const child of node.childNodes || []) yield* walk(child);
};
const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(text).join("");
const hasClass = (node, name) =>
  (attr(node, "class") || "").split(/\s+/).includes(name);
const credits = JSON.parse(read("assets/photos/credits.json"));
const version = crypto
  .createHash("sha256")
  .update(
    ["style.css", "main.js", "i18n.js", "content.js", "render.js"]
      .map((name) => read(name).replace(/\r\n/g, "\n"))
      .join("\n"),
  )
  .digest("hex")
  .slice(0, 12);
assert.equal(data.experiences.length, 8);
assert.equal(siteUrl, "https://amaruamazonexperiences.com/");
assert.deepEqual(languages, ["en", "es", "fr"]);
assert.equal(read("CNAME").trim(), new URL(siteUrl).hostname);
assert.equal(new Set(data.experiences.map((e) => e.id)).size, 8);
assert.equal(data.experiences.find((e) => e.id === "kayak").time, "day");
assert.notEqual(
  data.experiences.find((e) => e.id === "birdwatching").id,
  data.experiences.find((e) => e.id === "cacao").id,
);
for (const lang of languages) {
  const directory = path.join(root, languagePaths[lang]);
  const html = read(path.join(languagePaths[lang], "index.html"));
  const nodes = [...walk(parse(html, { scriptingEnabled: false }))];
  const find = (condition) => nodes.find(condition),
    all = (condition) => nodes.filter(condition);
  const byId = (id) => find((n) => attr(n, "id") === id);
  const pageUrl = new URL(languagePaths[lang], siteUrl).href;
  assert.equal(
    attr(
      find((n) => n.tagName === "html"),
      "lang",
    ),
    lang,
  );
  assert.equal(
    text(find((n) => n.tagName === "title")),
    data.translations[lang].metaTitle,
  );
  assert.equal(
    attr(
      find((n) => attr(n, "name") === "description"),
      "content",
    ),
    data.translations[lang].metaDescription,
  );
  assert.equal(all((n) => attr(n, "rel") === "canonical").length, 1);
  assert.equal(
    attr(
      find((n) => attr(n, "rel") === "canonical"),
      "href",
    ),
    pageUrl,
  );
  for (const [property, expected] of [
    ["og:url", pageUrl],
    ["og:title", data.translations[lang].shareTitle],
    ["og:description", data.translations[lang].metaDescription],
    ["og:locale", data.translations[lang].ogLocale],
    ["og:image", new URL("assets/photos/amazon-river.webp", siteUrl).href],
  ])
    assert.equal(
      attr(
        find((n) => attr(n, "property") === property),
        "content",
      ),
      expected,
    );
  for (const [name, expected] of [
    ["twitter:title", data.translations[lang].shareTitle],
    ["twitter:description", data.translations[lang].metaDescription],
    ["twitter:image", new URL("assets/photos/amazon-river.webp", siteUrl).href],
  ])
    assert.equal(attr(find((n) => attr(n, "name") === name), "content"), expected);
  const alternates = all((n) => n.tagName === "link" && attr(n, "hreflang"));
  assert.equal(alternates.length, 4);
  for (const alternate of [...languages, "x-default"])
    assert.equal(
      attr(
        alternates.find((n) => attr(n, "hreflang") === alternate),
        "href",
      ),
      new URL(
        languagePaths[alternate === "x-default" ? "en" : alternate],
        siteUrl,
      ).href,
    );
  const schema = JSON.parse(
    text(find((n) => attr(n, "type") === "application/ld+json")),
  );
  assert.equal(schema.inLanguage, lang);
  assert.equal(schema.url, pageUrl);
  assert.equal(schema["@id"], new URL("#organization", siteUrl).href);
  assert.equal(schema.email, contactEmail);
  assert.equal(schema.telephone, "+573132560145");
  assert.equal(schema.logo, new URL("assets/brand/amaru-logo.webp", siteUrl).href);
  for (const field of ["priceRange", "aggregateRating", "review", "award"])
    assert.equal(schema[field], undefined, `${lang}: do not publish unverified ${field}`);
  const emailLinks = all((n) => attr(n, "data-contact-email") !== undefined);
  assert.ok(emailLinks.length >= 2, `${lang}: contact and privacy email links`);
  for (const link of emailLinks) {
    assert.equal(attr(link, "href"), "mailto:" + contactEmail);
    assert.equal(text(link), contactEmail);
  }
  assert.ok(text(byId("plan")).includes(contactEmail), `${lang}: visible email fallback`);
  assert.ok(!html.includes("alejandr0qa.github.io/amaruamazon"), `${lang}: old production URL`);
  assert.ok(!/cloudflareinsights|data-cf-beacon|analytics\.js/.test(html), "Analytics is deferred");
  assert.equal(
    all((n) => hasClass(n, "experience-card")).length,
    8,
    `${lang}: initial HTML must contain eight experiences`,
  );
  assert.equal(
    all((n) => attr(n, "data-journey-panel")).length,
    3,
    `${lang}: initial HTML must contain all three journeys`,
  );
  assert.equal(
    all((n) => hasClass(n, "gallery-item")).length,
    6,
    `${lang}: initial HTML must contain gallery links`,
  );
  assert.equal(
    all((n) => n.tagName === "input" && attr(n, "name") === "experiences")
      .length,
    8,
  );
  for (const item of data.experiences) {
    assert.ok(text(byId("experience-grid")).includes(item[lang][0]));
    assert.ok(text(byId("experience-grid")).includes(item[lang][2]));
  }
  const ids = all((n) => attr(n, "id")).map((n) => attr(n, "id"));
  assert.equal(ids.length, new Set(ids).size, `${lang}: duplicate IDs`);
  for (const node of nodes) {
    if (node.tagName === "script" && attr(node, "src"))
      assert.ok(
        attr(node, "src").endsWith("?v=" + version),
        `${lang}: rebuild after changing scripts`,
      );
    if (
      node.tagName === "link" &&
      /(?:^|\/)style\.css\?/.test(attr(node, "href") || "")
    )
      assert.ok(
        attr(node, "href").endsWith("?v=" + version),
        `${lang}: rebuild after changing styles`,
      );
    for (const kind of [
      "data-i18n",
      "data-i18n-alt",
      "data-i18n-aria",
      "data-i18n-placeholder",
    ])
      if (attr(node, kind))
        assert.ok(
          data.translations[lang][attr(node, kind)],
          `${lang}: missing ${attr(node, kind)}`,
        );
    if (attr(node, "data-i18n"))
      assert.equal(
        text(node),
        data.translations[lang][attr(node, "data-i18n")],
      );
    for (const name of ["src", "href", "srcset", "data-src", "data-srcset"]) {
      const value = attr(node, name);
      if (!value) continue;
      if (value.startsWith("mailto:")) {
        assert.equal(value, "mailto:" + contactEmail);
        continue;
      }
      if (value.startsWith("#")) {
        assert.ok(
          ids.includes(value.slice(1)),
          `${lang}: missing anchor ${value}`,
        );
        continue;
      }
      if (/^https?:/.test(value)) {
        if (value.startsWith("https://wa.me/")) {
          const u = new URL(value);
          assert.equal(u.pathname, "/573132560145");
        }
        continue;
      }
      const clean = value.split(/[?#]/)[0];
      if (clean)
        assert.ok(
          fs.existsSync(path.resolve(directory, clean)),
          `${lang}: missing ${value}`,
        );
    }
    if (attr(node, "data-lang")) {
      assert.equal(node.tagName, "a");
      const linked = attr(node, "data-lang");
      const linkedPath = path.resolve(directory, attr(node, "href"));
      assert.equal(linkedPath, path.resolve(root, languagePaths[linked]));
    }
  }
  const heroImages = all(
    (n) => n.tagName === "img" && hasClass(n, "hero-image"),
  );
  assert.equal(heroImages.length, 4);
  for (const n of heroImages) {
    const file = (attr(n, "src") || attr(n, "data-src"))
      .split("/")
      .pop()
      .replace(".webp", "");
    assert.equal(credits[file].height, 1084);
  }
  assert.ok(
    !/\b(?:USD|COP)\s*[$\d]/.test(html),
    "Public prices are outside the requested scope",
  );
  assert.ok(!html.includes("?lang="), "Canonical language URLs must be static");
}
for (const item of [...data.experiences, ...Object.values(data.journeys)])
  assert.ok(credits[item.image]);
for (const photo of data.gallery) assert.ok(credits[photo[0]]);
const sitemap = read("sitemap.xml");
assert.equal((sitemap.match(/<loc>/g) || []).length, 3);
assert.equal((sitemap.match(/<xhtml:link /g) || []).length, 12);
assert.ok(!sitemap.includes("alejandr0qa.github.io"));
for (const lang of languages)
  assert.ok(
    sitemap.includes(
      `<loc>${new URL(languagePaths[lang], siteUrl).href}</loc>`,
    ),
  );
for (const alternate of [...languages, "x-default"])
  assert.equal(
    sitemap.split(`hreflang="${alternate}" href="${new URL(languagePaths[alternate === "x-default" ? "en" : alternate], siteUrl).href}"`).length - 1,
    3,
    `Sitemap: reciprocal ${alternate} on all pages`,
  );
assert.equal(read("robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`);
console.log(
  "PASS: 3 complete static languages, custom-domain SEO/social metadata, reciprocal hreflang, sitemap/robots, verified contact channels, all initial content, local resources, WhatsApp options, no analytics and no public prices.",
);
