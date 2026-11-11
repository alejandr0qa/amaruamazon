/* Shared by the static generator and the browser. Editorial data only. */
const AmaruRender = (() => {
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const image = (base, name) => `${base}assets/photos/${name}.webp`;
  function experienceCards({ experiences, lang, t, base = "", pagePaths, fullExperienceLabel }) {
    return experiences
      .map((item, index) => {
        const [title, summary, detail, points] = item[lang];
        return `<article class="experience-card" data-experience="${item.id}" data-category="${item.cat}">
        <div class="card-image"><img src="${image(base, item.image)}" width="1200" height="828" alt="${escape(title)}" loading="lazy"><span class="card-index">${String(index + 1).padStart(2, "0")}</span></div>
        <div class="card-content"><div class="card-meta"><span>${t(item.cat)}</span><span>${t(item.time)}</span></div><h3>${escape(title)}</h3><p>${escape(summary)}</p>
        <details class="experience-details"><summary class="card-link" data-open-experience="${item.id}" aria-label="${escape(t("view") + ": " + title)}"><span>${t("view")}</span><span aria-hidden="true">↗</span></summary>
        <div class="card-detail-copy"><p>${escape(detail)}</p><ul>${points.map((point) => `<li>${escape(point)}</li>`).join("")}</ul><a class="text-link" href="#plan" data-choose-interest="${item.id}">${t("enquire")}</a></div></details>
        <a class="text-link experience-page-link" data-experience-page="${item.id}" href="${pagePaths[item.id]}" aria-label="${escape(fullExperienceLabel + ": " + title)}">${escape(fullExperienceLabel)} ↗</a></div></article>`;
      })
      .join("");
  }
  function journeyPanels({ journeys, lang, t, base = "" }) {
    return Object.entries(journeys)
      .map(([id, item]) => {
        const [description, steps] = item[lang];
        return `<article class="journey-panel" data-journey-panel="${id}" aria-labelledby="journey-${id}-title"><h3 id="journey-${id}-title" class="journey-panel-title">${escape(t(id + "Name"))}</h3><img src="${image(base, item.image)}" width="1200" height="828" alt="${escape(t(id + "Name"))}" loading="lazy"><div class="journey-inner"><p>${escape(description)}</p><ol class="journey-steps">${steps.map((step, i) => `<li><span>${i + 1}</span><strong>${escape(step)}</strong></li>`).join("")}</ol><a class="text-link" href="#plan" data-choose-interest="${id}">${t("journeyCta")}</a></div></article>`;
      })
      .join("");
  }
  function galleryItems({ gallery, lang, t, base = "" }) {
    const titleIndex = { en: 1, es: 2, fr: 3 }[lang];
    return gallery
      .map(
        (item, index) =>
          `<a class="gallery-item" data-photo="${index}" href="${image(base, item[0])}" aria-label="${escape(t("galleryOpen") + ": " + item[titleIndex])}"><img src="${image(base, item[0])}" width="1200" height="828" alt="${escape(item[titleIndex])}" loading="lazy"><span class="gallery-zoom" aria-hidden="true">↗</span></a>`,
      )
      .join("");
  }
  function interestOptions({ experiences, journeys, lang, t }) {
    return (
      `<option value="custom">${escape(t("choose"))}</option>` +
      experiences
        .map(
          (item) =>
            `<option value="${item.id}">${escape(item[lang][0])}</option>`,
        )
        .join("") +
      Object.keys(journeys)
        .map((id) => `<option value="${id}">${escape(t(id + "Name"))}</option>`)
        .join("")
    );
  }
  function quickChoices({ experiences, lang }) {
    return experiences
      .map(
        (item) =>
          `<label class="quick-choice"><input type="checkbox" name="experiences" value="${item.id}"><span>${escape(item[lang][0])}</span></label>`,
      )
      .join("");
  }
  return {
    escape,
    experienceCards,
    journeyPanels,
    galleryItems,
    interestOptions,
    quickChoices,
  };
})();
