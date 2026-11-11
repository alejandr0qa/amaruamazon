import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { parse } from "parse5";
import { siteUrl, languages, languagePaths, contactEmail } from "../site.config.mjs";
import { experiencePath, experiencePages, experienceCopy, experienceDescriptions, experienceAlt } from "../src/experience-pages.mjs";

export function checkExperiencePages({ root, data, version, sitemap }) {
  const walk = function* (node) {
    yield node;
    for (const child of node.childNodes || []) yield* walk(child);
  };
  const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
  const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes || []).map(text).join("");
  const pageTitles = new Set(), descriptions = new Set();
  for (const item of data.experiences) for (const lang of languages) {
    const route = experiencePath(item.id, lang);
    const html = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
    const nodes = [...walk(parse(html))];
    const find = (p) => nodes.find(p), all = (p) => nodes.filter(p);
    const pageUrl = new URL(route, siteUrl).href;
    const copy = experienceCopy[lang];
    const heading = experiencePages[item.id][lang][1];
    const description = experienceDescriptions[item.id][lang];
    const title = `${heading} | Puerto Nariño | Amaru`;
    assert.equal(attr(find((n) => n.tagName === "html"), "lang"), lang);
    assert.equal(text(find((n) => n.tagName === "title")), title);
    assert.ok(!pageTitles.has(title), `Duplicate title: ${title}`); pageTitles.add(title);
    assert.ok(!descriptions.has(description), `Duplicate description: ${route}`); descriptions.add(description);
    assert.equal(all((n) => n.tagName === "h1").length, 1);
    assert.equal(text(find((n) => n.tagName === "h1")), heading);
    assert.ok(text(find((n) => n.tagName === "main")).includes(item[lang][2]), `${route}: static detail text`);
    assert.ok(text(find((n) => n.tagName === "main")).includes(experiencePages[item.id][lang][2]));
    assert.ok(text(find((n) => n.tagName === "main")).includes(item.duration?.[lang] || copy.confirmDuration));
    assert.equal(all((n) => attr(n, "rel") === "canonical").length, 1);
    assert.equal(attr(find((n) => attr(n, "rel") === "canonical"), "href"), pageUrl);
    for (const [property, expected] of [["og:url", pageUrl], ["og:title", title], ["og:description", description], ["og:locale", data.translations[lang].ogLocale], ["og:image", new URL(`assets/photos/${item.image}.webp`, siteUrl).href]])
      assert.equal(attr(find((n) => attr(n, "property") === property), "content"), expected);
    for (const [name, expected] of [["description", description], ["twitter:title", title], ["twitter:description", description], ["twitter:image", new URL(`assets/photos/${item.image}.webp`, siteUrl).href]])
      assert.equal(attr(find((n) => attr(n, "name") === name), "content"), expected);
    const alternates = all((n) => n.tagName === "link" && attr(n, "hreflang"));
    assert.equal(alternates.length, 4);
    for (const alternate of [...languages, "x-default"])
      assert.equal(attr(alternates.find((n) => attr(n, "hreflang") === alternate), "href"), new URL(experiencePath(item.id, alternate === "x-default" ? "en" : alternate), siteUrl).href);
    const schemas = all((n) => attr(n, "type") === "application/ld+json");
    assert.equal(schemas.length, 1);
    const graph = JSON.parse(text(schemas[0]))["@graph"];
    const organization = graph.find((s) => s["@type"] === "TravelAgency");
    const webpage = graph.find((s) => s["@type"] === "WebPage");
    const service = graph.find((s) => s["@type"] === "Service");
    const breadcrumb = graph.find((s) => s["@type"] === "BreadcrumbList");
    assert.equal(organization.email, contactEmail);
    assert.equal(organization["@id"], siteUrl + "#organization");
    assert.equal(organization.inLanguage, undefined);
    assert.equal(organization.url, siteUrl);
    assert.equal(webpage.url, pageUrl); assert.equal(webpage.inLanguage, lang);
    assert.equal(service.name, heading); assert.equal(service.description, item[lang][2]);
    assert.equal(service.url, pageUrl); assert.equal(service.provider["@id"], organization["@id"]);
    assert.equal(breadcrumb.itemListElement[0].item, new URL(languagePaths[lang], siteUrl).href);
    assert.equal(breadcrumb.itemListElement[1].item, pageUrl);
    for (const entry of graph) for (const field of ["offers", "aggregateRating", "review", "award", "duration", "openingHours"])
      assert.equal(entry[field], undefined, `${route}: unconfirmed ${field}`);
    const ids = all((n) => attr(n, "id")).map((n) => attr(n, "id"));
    assert.equal(new Set(ids).size, ids.length);
    for (const node of nodes) for (const key of ["href", "src"]) {
      const value = attr(node, key);
      if (!value || /^(https?:|mailto:)/.test(value)) continue;
      const target = new URL(value, new URL(route, "https://local.test/"));
      let localFile = path.join(root, decodeURIComponent(target.pathname));
      assert.ok(fs.existsSync(localFile), `${route}: missing ${value}`);
      if (fs.statSync(localFile).isDirectory()) localFile = path.join(localFile, "index.html");
      assert.ok(fs.existsSync(localFile), `${route}: missing index ${value}`);
      if (target.hash) {
        const targetIds = [...walk(parse(fs.readFileSync(localFile, "utf8")))].map((n) => attr(n, "id"));
        assert.ok(targetIds.includes(decodeURIComponent(target.hash.slice(1))), `${route}: broken anchor ${value}`);
      }
      if (attr(node, "data-lang")) assert.equal(target.pathname.slice(1), experiencePath(item.id, attr(node, "data-lang")));
    }
    const scripts = all((n) => n.tagName === "script" && attr(n, "src"));
    assert.equal(scripts.length, 1);
    assert.ok(attr(scripts[0], "src").endsWith(`experience.js?v=${version}`));
    for (const image of all((n) => n.tagName === "img")) {
      assert.ok(attr(image, "alt")); assert.ok(attr(image, "width")); assert.ok(attr(image, "height"));
      for (const candidate of (attr(image, "srcset") || "").split(",").filter(Boolean)) {
        const file = candidate.trim().split(/\s+/)[0];
        assert.ok(fs.existsSync(path.resolve(root, route, file)), `${route}: missing responsive ${file}`);
      }
    }
    const cover = find((n) => (attr(n, "class") || "").split(" ").includes("experience-cover"));
    assert.equal(attr(cover, "alt"), experienceAlt[item.id][lang]);
    assert.ok(attr(cover, "srcset")?.includes("480w"));
    const contact = all((n) => attr(n, "data-experience-whatsapp") !== undefined);
    assert.equal(contact.length, 2);
    for (const link of contact) {
      const url = new URL(attr(link, "href"));
      assert.equal(url.hostname, "wa.me"); assert.equal(url.pathname, "/573132560145");
      assert.ok(url.searchParams.get("text").includes(item[lang][0]));
      assert.ok(url.searchParams.get("text").includes(copy.message));
    }
    const enquiry = new URL(attr(find((n) => attr(n, "data-home-enquiry") !== undefined), "href"), new URL(route, siteUrl));
    assert.equal(enquiry.pathname, new URL(languagePaths[lang], siteUrl).pathname);
    assert.equal(enquiry.searchParams.get("experience"), item.id); assert.equal(enquiry.hash, "#plan");
    const related = all((n) => attr(n, "data-related-experience") !== undefined).map((n) => new URL(attr(n, "href"), pageUrl).href);
    assert.equal(related.length, 3);
    assert.equal(new Set(related).size, 3, `${route}: duplicate related experiences`);
    assert.ok(!related.includes(pageUrl), `${route}: related experience links to itself`);
    assert.ok(!/alejandr0qa.github.io|cloudflareinsights|data-cf-beacon|noindex|\b(?:USD|COP)\s*[$\d]/.test(html));
    const sitemapEntry = sitemap.split("<url>").find((entry) => entry.includes(`<loc>${pageUrl}</loc>`));
    assert.ok(sitemapEntry, `${route}: absent from sitemap`);
    for (const alternate of [...languages, "x-default"])
      assert.ok(sitemapEntry.includes(`hreflang="${alternate}" href="${new URL(experiencePath(item.id, alternate === "x-default" ? "en" : alternate), siteUrl).href}"`));
  }
  assert.equal(pageTitles.size, 24);
}
