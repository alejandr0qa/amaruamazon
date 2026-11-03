"use strict";
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  // Preserve English as an accessible, readable HTML default.
  $$("[data-i18n]").forEach((el) => {
    translations.en[el.dataset.i18n] = el.textContent;
  });
  ["alt", "aria", "placeholder"].forEach((kind) =>
    $$(`[data-i18n-${kind}]`).forEach((el) => {
      translations.en[el.getAttribute(`data-i18n-${kind}`)] = el.getAttribute(
        kind === "aria" ? "aria-label" : kind,
      );
    }),
  );
  let lang = "en",
    filter = "all",
    journey = "gentle",
    photo = 0,
    openExperience = null;
  const t = (key) => translations[lang][key] ?? translations.en[key] ?? key;
  const hero = $("#home");
  const slides = $$(".hero-slide");
  const slideNames = [
    "slideRiver",
    "slideForest",
    "slideLilies",
    "slideSunset",
  ];
  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  let heroIndex = 0,
    requestedSlide = 0,
    heroTimer = null,
    heroRequest = 0;
  let heroPaused = motionPreference.matches,
    heroVisible = true,
    heroFocused = false;
  function updateHeroControls() {
    $("#hero-counter").textContent =
      `${String(heroIndex + 1).padStart(2, "0")} / 04`;
    $$("[data-hero-slide]").forEach((button, i) => {
      button.classList.toggle("active", i === heroIndex);
      button.setAttribute("aria-current", String(i === heroIndex));
    });
    $("#hero-pause").setAttribute(
      "aria-label",
      t(heroPaused ? "playCarousel" : "pauseCarousel"),
    );
    $("#hero-pause").firstElementChild.textContent = heroPaused ? "▶" : "Ⅱ";
  }
  function loadHeroSlide(index) {
    const picture = slides[index],
      source = $("source", picture),
      image = $("img", picture);
    if (source.dataset.srcset) {
      source.srcset = source.dataset.srcset;
      delete source.dataset.srcset;
    }
    if (image.dataset.src) {
      image.src = image.dataset.src;
      delete image.dataset.src;
    }
    return image.decode();
  }
  function scheduleHero() {
    clearTimeout(heroTimer);
    if (heroPaused || !heroVisible || heroFocused || document.hidden) return;
    heroTimer = setTimeout(() => showHeroSlide(heroIndex + 1), 7000);
  }
  async function showHeroSlide(index, manual = false) {
    requestedSlide = (index + slides.length) % slides.length;
    const next = requestedSlide,
      request = ++heroRequest;
    clearTimeout(heroTimer);
    // Keep the current photo visible if a new photo fails to load.
    try {
      await loadHeroSlide(next);
    } catch {
      if (request === heroRequest) scheduleHero();
      return;
    }
    if (request !== heroRequest) return;
    slides.forEach((slide, i) =>
      slide.classList.toggle("is-active", i === next),
    );
    heroIndex = next;
    updateHeroControls();
    if (manual)
      $("#hero-status").textContent =
        `${heroIndex + 1} / ${slides.length} — ${t(slideNames[heroIndex])}`;
    scheduleHero();
    // Load only the next slide ahead, after the current photograph is ready.
    if (!heroPaused && heroVisible && !document.hidden)
      loadHeroSlide((heroIndex + 1) % slides.length).catch(() => {});
  }
  $("#hero-prev").addEventListener("click", () =>
    showHeroSlide(requestedSlide - 1, true),
  );
  $("#hero-next").addEventListener("click", () =>
    showHeroSlide(requestedSlide + 1, true),
  );
  $$("[data-hero-slide]").forEach((button) =>
    button.addEventListener("click", () =>
      showHeroSlide(Number(button.dataset.heroSlide), true),
    ),
  );
  $("#hero-pause").addEventListener("click", () => {
    heroPaused = !heroPaused;
    // An explicit Play action resumes even while the Play button has focus.
    if (!heroPaused) heroFocused = false;
    updateHeroControls();
    scheduleHero();
  });
  hero.addEventListener("focusin", () => {
    heroFocused = true;
    scheduleHero();
  });
  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      heroFocused = false;
      scheduleHero();
    }
  });
  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showHeroSlide(
        requestedSlide + (event.key === "ArrowRight" ? 1 : -1),
        true,
      );
    }
  });
  document.addEventListener("visibilitychange", scheduleHero);
  motionPreference.addEventListener("change", (event) => {
    if (event.matches) heroPaused = true;
    updateHeroControls();
    scheduleHero();
  });
  new IntersectionObserver(
    (entries) => {
      heroVisible = entries[0].isIntersecting;
      scheduleHero();
    },
    { threshold: 0.1 },
  ).observe(hero);
  // Templates only interpolate controlled editorial text, never visitor input.
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
  const photoPath = (name) => `assets/photos/${name}.webp`;
  const photoTitle = (item) => item[{ en: 1, es: 2, fr: 3 }[lang]];
  const interestName = (id) =>
    experiences.find((e) => e.id === id)?.[lang][0] ??
    (journeys[id] ? t(`${id}Name`) : t("choose"));
  const dates = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  $("#arrival").min = ["year", "month", "day"]
    .map((k) => dates.find((p) => p.type === k).value)
    .join("-");
  $("#year").textContent = dates.find((p) => p.type === "year").value;

  function renderExperiences() {
    const list = experiences.filter(
      (e) => filter === "all" || e.cat === filter,
    );
    $("#experience-grid").innerHTML = list
      .map((e) => {
        const [title, summary] = e[lang];
        return `<article class="experience-card" data-experience="${e.id}"><div class="card-image"><img src="${photoPath(e.image)}" width="1200" height="828" alt="${escape(title)}" loading="lazy"><span class="card-index">${String(experiences.indexOf(e) + 1).padStart(2, "0")}</span></div><div class="card-content"><div class="card-meta"><span>${t(e.cat)}</span><span>${t(e.time)}</span></div><h3>${escape(title)}</h3><p>${escape(summary)}</p><button class="card-link" data-open-experience="${e.id}" aria-label="${escape(t("view") + ": " + title)}"><span>${t("view")}</span><span aria-hidden="true">↗</span></button></div></article>`;
      })
      .join("");
    $("#filter-status").textContent = `${list.length} ${t("filterCount")}`;
  }
  function renderJourney() {
    const item = journeys[journey],
      [description, steps] = item[lang];
    $("#journey-content").innerHTML =
      `<img src="${photoPath(item.image)}" width="1200" height="828" alt="${escape(t(`${journey}Name`))}" loading="lazy"><div class="journey-inner"><p>${escape(description)}</p><ol class="journey-steps">${steps.map((step, i) => `<li><span>${i + 1}</span><strong>${escape(step)}</strong></li>`).join("")}</ol><a class="text-link" href="#plan" data-choose-interest="${journey}">${t("journeyCta")}</a></div>`;
  }
  function renderGallery() {
    $("#gallery-grid").innerHTML = gallery
      .map(
        (item, i) =>
          `<button class="gallery-item" data-photo="${i}" aria-label="${escape(t("galleryOpen") + ": " + photoTitle(item))}"><img src="${photoPath(item[0])}" width="1200" height="828" alt="${escape(photoTitle(item))}" loading="lazy"><span class="gallery-zoom" aria-hidden="true">↗</span></button>`,
      )
      .join("");
  }
  function renderInterest() {
    const selected = $("#interest").value || "custom";
    $("#interest").replaceChildren(
      ...[
        "custom",
        ...experiences.map((e) => e.id),
        ...Object.keys(journeys),
      ].map((id) => new Option(interestName(id), id)),
    );
    $("#interest").value = selected;
  }
  function renderExperienceDetail(id) {
    const item = experiences.find((e) => e.id === id);
    if (!item) return;
    const [title, , detail, points] = item[lang];
    $("#dialog-content").innerHTML =
      `<img class="dialog-photo" src="${photoPath(item.image)}" width="1200" height="828" alt="${escape(title)}"><div class="dialog-body"><p class="eyebrow">${t(item.cat)} · ${t(item.time)}</p><h2 id="dialog-title">${escape(title)}</h2><p>${escape(detail)}</p><ul>${points.map((p) => `<li>${escape(p)}</li>`).join("")}</ul><p>${t("flexible")}</p><a href="#plan" class="button" data-choose-interest="${item.id}">${t("enquire")}</a></div>`;
  }
  function renderPhoto() {
    const item = gallery[photo];
    $("#gallery-large").src = photoPath(item[0]);
    $("#gallery-large").alt = photoTitle(item);
    $("#gallery-caption").textContent =
      `${photo + 1} / ${gallery.length} — ${photoTitle(item)}`;
  }
  function invalidateMessage() {
    $("#message-result").hidden = true;
    $("#send-whatsapp").removeAttribute("href");
    $("#message-preview").textContent = "";
  }
  function setLanguage(next, persist = true) {
    lang = Object.hasOwn(translations, next) ? next : "en";
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    ["alt", "aria", "placeholder"].forEach((kind) =>
      $$(`[data-i18n-${kind}]`).forEach((el) =>
        el.setAttribute(
          kind === "aria" ? "aria-label" : kind,
          t(el.getAttribute(`data-i18n-${kind}`)),
        ),
      ),
    );
    $$("[data-lang]").forEach((el) =>
      el.setAttribute("aria-pressed", String(el.dataset.lang === lang)),
    );
    $('meta[name="description"]').content = t("metaDescription");
    $('meta[property="og:description"]').content = t("metaDescription");
    const canonical = `https://alejandr0qa.github.io/amaruamazon/${lang === "en" ? "" : `?lang=${lang}`}`;
    $('link[rel="canonical"]').href = canonical;
    $('meta[property="og:url"]').content = canonical;
    renderExperiences();
    renderJourney();
    renderGallery();
    renderInterest();
    updateHeroControls();
    if (openExperience) renderExperienceDetail(openExperience);
    if ($("#gallery-dialog").open) renderPhoto();
    invalidateMessage();
    if (persist) {
      try {
        localStorage.setItem("amaru-language", lang);
      } catch {}
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      try {
        history.replaceState(null, "", url);
      } catch {}
    }
  }
  function closeMenu() {
    $("#navigation").classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }
  $("#menu-toggle").addEventListener("click", () => {
    const expanded = $("#menu-toggle").getAttribute("aria-expanded") !== "true";
    $("#navigation").classList.toggle("open", expanded);
    $("#menu-toggle").setAttribute("aria-expanded", String(expanded));
  });
  $("#navigation").addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  document.addEventListener("click", (e) => {
    const langButton = e.target.closest("[data-lang]");
    if (langButton) {
      setLanguage(langButton.dataset.lang);
      return;
    }
    const filterButton = e.target.closest("[data-filter]");
    if (filterButton) {
      filter = filterButton.dataset.filter;
      $$("[data-filter]").forEach((b) => {
        const active = b.dataset.filter === filter;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      renderExperiences();
      return;
    }
    const journeyButton = e.target.closest("[data-journey]");
    if (journeyButton) {
      journey = journeyButton.dataset.journey;
      $$("[data-journey]").forEach((b) => {
        const active = b.dataset.journey === journey;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      renderJourney();
      return;
    }
    const expButton = e.target.closest("[data-open-experience]");
    if (expButton) {
      openExperience = expButton.dataset.openExperience;
      renderExperienceDetail(openExperience);
      $("#experience-dialog").showModal();
      return;
    }
    const photoButton = e.target.closest("[data-photo]");
    if (photoButton) {
      photo = Number(photoButton.dataset.photo);
      renderPhoto();
      $("#gallery-dialog").showModal();
      return;
    }
    const interestLink = e.target.closest("[data-choose-interest]");
    if (interestLink) {
      $("#interest").value = interestLink.dataset.chooseInterest;
      invalidateMessage();
      if ($("#experience-dialog").open) $("#experience-dialog").close();
      // Let the native anchor navigate, then put keyboard focus in the enquiry.
      requestAnimationFrame(() => $("#name").focus({ preventScroll: true }));
      return;
    }
    const close = e.target.closest("[data-close-dialog]");
    if (close) close.closest("dialog").close();
  });
  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog.close();
      }
    });
  });
  $("#experience-dialog").addEventListener("close", () => {
    openExperience = null;
  });
  $("#privacy-button").addEventListener("click", () =>
    $("#privacy-dialog").showModal(),
  );
  $("#photo-prev").addEventListener("click", () => {
    photo = (photo + gallery.length - 1) % gallery.length;
    renderPhoto();
  });
  $("#photo-next").addEventListener("click", () => {
    photo = (photo + 1) % gallery.length;
    renderPhoto();
  });
  $("#gallery-dialog").addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      photo =
        (photo + (e.key === "ArrowRight" ? 1 : gallery.length - 1)) %
        gallery.length;
      renderPhoto();
    }
  });
  $("#trip-form").addEventListener("input", invalidateMessage);
  $("#trip-form").addEventListener("change", invalidateMessage);
  $("#trip-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = $("#name").value.trim();
    if (!name) {
      $("#name").focus();
      return;
    }
    if (!form.reportValidity()) return;
    const message = [
      t("hello"),
      "",
      `${t("msgName")}: ${name}`,
      `${t("msgPeople")}: ${$("#travelers").value}`,
      `${t("msgDate")}: ${$("#arrival").value || t("unspecified")}`,
      `${t("msgLanguage")}: ${$("#guide-language").value}`,
      `${t("msgInterest")}: ${interestName($("#interest").value)}`,
    ];
    const notes = $("#notes").value.trim();
    if (notes) message.push(`${t("msgNotes")}: ${notes}`);
    message.push("", t("msgEnd"));
    const text = message.join("\n");
    $("#message-preview").textContent = text;
    $("#send-whatsapp").href =
      `https://wa.me/573132560145?text=${encodeURIComponent(text)}`;
    $("#message-result").hidden = false;
    $("#send-whatsapp").focus();
  });
  let preferred = "en";
  try {
    preferred = localStorage.getItem("amaru-language") || "en";
  } catch {}
  const query = new URLSearchParams(location.search).get("lang");
  setLanguage(query || preferred, false);
  $("#guide-language").value = { en: "English", es: "Español", fr: "Français" }[
    lang
  ];
})();
