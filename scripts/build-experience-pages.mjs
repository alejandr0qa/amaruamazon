import fs from "node:fs";
import path from "node:path";
import { parse, parseFragment, serialize } from "parse5";
import { siteUrl, languages, languagePaths, contactEmail } from "../site.config.mjs";
import { experiencePages, experienceCopy, experiencePath, experienceDescriptions, experienceAlt } from "../src/experience-pages.mjs";

// Three complementary choices per experience; each activity receives three links.
const relatedExperiences = {
  tarapoto: ["kayak", "birdwatching", "community"],
  kayak: ["tarapoto", "wildlife", "cacao"],
  birdwatching: ["wildlife", "tarapoto", "night-walk"],
  cacao: ["community", "kayak", "camp"],
  "night-walk": ["camp", "birdwatching", "wildlife"],
  camp: ["night-walk", "community", "cacao"],
  community: ["cacao", "camp", "tarapoto"],
  wildlife: ["birdwatching", "night-walk", "kayak"],
};

export function buildExperiencePages({ root, data, version }) {
  const walk = function* (node) {
    yield node;
    for (const child of node.childNodes || []) yield* walk(child);
  };
  const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
  const setAttr = (node, name, value) => {
    const existing = node.attrs.find((a) => a.name === name);
    if (existing) existing.value = value;
    else node.attrs.push({ name, value });
  };
  const setText = (node, value) => {
    node.childNodes = [{ nodeName: "#text", value, parentNode: node }];
  };
  const remove = (node) => {
    node.parentNode.childNodes = node.parentNode.childNodes.filter((n) => n !== node);
  };
  const escape = data.render.escape;
  const routes = [];
  for (const item of data.experiences) for (const lang of languages) {
    const route = experiencePath(item.id, lang);
    const base = "../".repeat(route.split("/").filter(Boolean).length);
    const home = base + languagePaths[lang];
    const pageUrl = new URL(route, siteUrl).href;
    const copy = experienceCopy[lang];
    const [, heading, advice] = experiencePages[item.id][lang];
    const [name, summary, detail, points] = item[lang];
    const title = `${heading} | Puerto Nariño | Amaru`;
    const description = experienceDescriptions[item.id][lang];
    const t = (key) => data.translations[lang][key];
    const message = `${t("hello")}\n\n${t("msgInterest")}: ${name}\n${copy.message}\n\n${t("msgEnd")}`;
    const whatsapp = "https://wa.me/573132560145?text=" + encodeURIComponent(message);
    const photoUrl = new URL(`assets/photos/${item.image}.webp`, siteUrl).href;
    const doc = parse(fs.readFileSync(path.join(root, languagePaths[lang], "index.html"), "utf8"));
    const nodes = [...walk(doc)];
    const byId = (id) => nodes.find((n) => attr(n, "id") === id);
    const originalBase = lang === "en" ? "" : "../";
    const organization = JSON.parse(nodes.find((n) => attr(n, "type") === "application/ld+json").childNodes[0].value)["@graph"].find((entry) => entry["@type"] === "TravelAgency");
    for (const node of nodes) {
      if (node.tagName === "script" && attr(node, "src")) { remove(node); continue; }
      if (node.tagName === "dialog" && attr(node, "id") !== "privacy-dialog") { remove(node); continue; }
      if (node.tagName === "noscript") { remove(node); continue; }
      for (const key of ["src", "href"]) {
        const value = attr(node, key);
        if (!value) continue;
        if (value.startsWith("#") && value !== "#main") setAttr(node, key, home + value);
        else if (!/^(?:[a-z]+:|#|\/)/i.test(value)) setAttr(node, key, base + value.slice(originalBase.length));
      }
      if (node.tagName === "html") setAttr(node, "data-asset-base", base);
      if (node.tagName === "body") setAttr(node, "class", "experience-page");
      if (node.tagName === "title") setText(node, title);
      if (attr(node, "rel") === "canonical") setAttr(node, "href", pageUrl);
      const property = attr(node, "property"), meta = attr(node, "name");
      if (property === "og:title" || meta === "twitter:title") setAttr(node, "content", title);
      if (property === "og:description" || ["description", "twitter:description"].includes(meta)) setAttr(node, "content", description);
      if (property === "og:url") setAttr(node, "content", pageUrl);
      if (property === "og:image" || meta === "twitter:image") setAttr(node, "content", photoUrl);
      if (node.tagName === "link" && attr(node, "hreflang")) {
        const alternate = attr(node, "hreflang");
        setAttr(node, "href", new URL(experiencePath(item.id, alternate === "x-default" ? "en" : alternate), siteUrl).href);
      }
      if (attr(node, "data-lang")) setAttr(node, "href", base + experiencePath(item.id, attr(node, "data-lang")));
      if (attr(node, "data-quick-enquiry") !== undefined) {
        node.attrs = node.attrs.filter((a) => !["data-quick-enquiry", "aria-haspopup"].includes(a.name));
        setAttr(node, "href", whatsapp);
      }
      if (attr(node, "type") === "application/ld+json") {
        setText(node, JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [organization, {
            "@type": "WebPage", "@id": pageUrl + "#webpage", url: pageUrl,
            name: title, description, inLanguage: lang, about: { "@id": pageUrl + "#experience" },
            breadcrumb: { "@id": pageUrl + "#breadcrumb" },
          }, {
            "@type": "Service", "@id": pageUrl + "#experience", url: pageUrl,
            name: heading, description: detail, image: photoUrl,
            provider: { "@id": organization["@id"] }, areaServed: organization.areaServed,
          }, {
            "@type": "BreadcrumbList", "@id": pageUrl + "#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: copy.home, item: new URL(languagePaths[lang], siteUrl).href },
              { "@type": "ListItem", position: 2, name, item: pageUrl },
            ],
          }],
        }));
      }
    }
    const related = relatedExperiences[item.id].map((id) => data.experiences.find((e) => e.id === id));
    const main = byId("main");
    main.childNodes = parseFragment(`
      <section class="section wrap experience-intro" aria-labelledby="experience-title">
        <nav class="breadcrumbs" aria-label="${escape(copy.breadcrumbs)}"><a href="${home}">${escape(copy.home)}</a><span aria-hidden="true"> / </span><span aria-current="page">${escape(name)}</span></nav>
        <div class="experience-layout"><div>
          <p class="eyebrow">${escape(copy.location)}</p>
          <h1 id="experience-title">${escape(heading)}</h1>
          <p class="experience-lead">${escape(summary)}</p>
          <a class="button" data-experience-whatsapp href="${whatsapp}" target="_blank" rel="noopener noreferrer">${escape(copy.cta)}</a>
        </div><figure><img class="experience-cover" src="${base}assets/photos/${item.image}.webp" srcset="${base}assets/photos/${item.image}-480.webp 480w, ${base}assets/photos/${item.image}-800.webp 800w, ${base}assets/photos/${item.image}.webp 1200w" sizes="(max-width:650px) calc(100vw - 40px), (max-width:850px) calc(100vw - 72px), (max-width:1100px) calc((100vw - 120px) / 2), (max-width:1352px) calc((100vw - 160px) / 2), 596px" width="1200" height="828" alt="${escape(experienceAlt[item.id][lang])}" fetchpriority="high" decoding="async"><figcaption>${escape(t("photoCredit"))}</figcaption></figure></div>
      </section>
      <section class="section wrap experience-information" aria-labelledby="about-title">
        <div><h2 id="about-title">${escape(copy.about)}</h2><p>${escape(detail)}</p><h3>${escape(copy.highlights)}</h3><ul>${points.map((point) => `<li>${escape(point)}</li>`).join("")}</ul></div>
        <div id="practical"><h2>${escape(copy.practical)}</h2><dl><dt>${escape(copy.timing)}</dt><dd>${escape(t(item.time))}</dd><dt>${escape(copy.duration)}</dt><dd>${escape(item.duration?.[lang] || copy.confirmDuration)}</dd></dl><p>${escape(advice)}</p><p>${escape(copy.bring)}</p></div>
        <div class="experience-confirm"><h3>${escape(copy.confirm)}</h3><p>${escape(copy.confirmText)}</p><p>${escape(copy.note)}</p></div>
      </section>
      <section class="plan-section section" id="plan" aria-labelledby="contact-title"><div class="wrap experience-contact"><div>
        <p class="eyebrow light">AMARU AMAZON EXPERIENCES</p><h2 id="contact-title">${escape(copy.contact)}</h2><p>${escape(copy.contactText)}</p>
        <a class="button button-gold" data-experience-whatsapp href="${whatsapp}" target="_blank" rel="noopener noreferrer">${escape(copy.cta)}</a>
        <p><a class="text-link" data-home-enquiry href="${home}?experience=${item.id}#plan">${escape(copy.form)}</a></p>
      </div><div><p>${escape(t("planLocation"))}</p><p><a href="https://wa.me/573132560145?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer">+57 313 256 0145 ↗</a></p><p class="contact-email"><a data-contact-email href="mailto:${contactEmail}">${contactEmail}</a></p></div></div></section>
      <section class="section wrap" aria-labelledby="related-title"><h2 id="related-title">${escape(copy.related)}</h2><div class="experience-related">${related.map((other) => `<a data-related-experience href="${base + experiencePath(other.id, lang)}" aria-label="${escape(other[lang][0])}"><img src="${base}assets/photos/${other.image}.webp" srcset="${base}assets/photos/${other.image}-480.webp 480w, ${base}assets/photos/${other.image}-800.webp 800w, ${base}assets/photos/${other.image}.webp 1200w" sizes="(max-width:650px) calc(100vw - 40px), (max-width:1100px) calc((100vw - 128px) / 3), (max-width:1352px) calc((100vw - 168px) / 3), 395px" width="1200" height="828" alt="${escape(experienceAlt[other.id][lang])}" loading="lazy" decoding="async"><h3>${escape(other[lang][0])} ↗</h3></a>`).join("")}</div><a class="text-link" href="${home}#experiences">${escape(copy.back)} ↗</a></section>
    `).childNodes;
    main.childNodes.forEach((node) => { node.parentNode = main; });
    const body = nodes.find((n) => n.tagName === "body");
    const script = parseFragment(`<script src="${base}experience.js?v=${version}" defer></script>`).childNodes[0];
    script.parentNode = body;
    body.childNodes.push(script);
    const output = path.join(root, route, "index.html");
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, "<!-- Generated by npm run build. Edit src/experience-pages.mjs or content.js instead. -->\n" + serialize(doc).replace(/[\t ]+$/gm, "") + "\n");
    routes.push({ id: item.id, lang, route });
  }
  return routes;
}
