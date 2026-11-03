import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const html = read("index.html");
const data = vm.runInNewContext(
  read("i18n.js") +
    "\n" +
    read("content.js") +
    "\n({translations,experiences,journeys,gallery})",
);
const referencedKeys = [
  ...html.matchAll(/data-i18n(?:-alt|-aria|-placeholder)?="([^"]+)"/g),
].map((m) => m[1]);
for (const lang of ["es", "fr"])
  for (const key of referencedKeys)
    assert.ok(data.translations[lang][key], `${lang}: missing ${key}`);
for (const [lang, copy] of Object.entries(data.translations))
  for (const key of Object.keys(data.translations.en))
    assert.ok(copy[key], `${lang}: missing dynamic ${key}`);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(ids.length, new Set(ids).size, "Duplicate HTML IDs");
for (const ref of html.matchAll(/(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g)) {
  if (!/^(https?:|data:)/.test(ref[1]))
    assert.ok(fs.existsSync(path.join(root, ref[1])), `Missing ${ref[1]}`);
}
for (const anchor of html.matchAll(/href="#([^"]+)"/g))
  assert.ok(ids.includes(anchor[1]), `Missing anchor ${anchor[1]}`);
assert.equal(data.experiences.length, 8);
assert.equal(new Set(data.experiences.map((e) => e.id)).size, 8);
assert.equal(
  data.experiences.find((e) => e.id === "kayak").time,
  "day",
  "Kaya must be daytime",
);
assert.notEqual(
  data.experiences.find((e) => e.id === "birdwatching").id,
  data.experiences.find((e) => e.id === "cacao").id,
);
const credits = JSON.parse(read("assets/photos/credits.json"));
for (const item of [...data.experiences, ...Object.values(data.journeys)]) {
  assert.ok(credits[item.image], `Missing photo credit ${item.image}`);
  assert.ok(
    fs.existsSync(path.join(root, "assets/photos", item.image + ".webp")),
  );
  for (const lang of ["en", "es", "fr"])
    assert.ok(item[lang]?.length, `Missing ${lang} experience or journey`);
}
for (const photo of data.gallery)
  assert.ok(credits[photo[0]], `Missing gallery photo ${photo[0]}`);
for (const url of html.matchAll(/href="(https:\/\/wa\.me\/\d+)"/g))
  assert.equal(url[1], "https://wa.me/573132560145");
assert.ok(
  !html.includes("img/"),
  "Old generated imagery must not be referenced",
);
assert.ok(
  !fs.existsSync(path.join(root, "CNAME")),
  "Do not configure unpurchased domain",
);
console.log(
  "PASS: translation coverage, links, anchors, photo credits, 8 distinct experiences, daytime Kaya and WhatsApp number.",
);
