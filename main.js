"use strict";
(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const lang = Object.hasOwn(translations, document.documentElement.lang)
    ? document.documentElement.lang
    : "en";
  const legacyLanguage = new URLSearchParams(location.search).get("lang");
  if (legacyLanguage && Object.hasOwn(translations, legacyLanguage)) {
    const destination = new URL($(`[data-lang="${legacyLanguage}"]`).href);
    destination.hash = location.hash;
    location.replace(destination.href);
    return;
  }
  let filter = "all",
    journey = "gentle",
    photo = 0,
    openExperience = null;
  const t = (key) => translations[lang][key] ?? translations.en[key] ?? key;
  const requestedExperience = new URLSearchParams(location.search).get("experience");
  if (experiences.some((item) => item.id === requestedExperience))
    $("#interest").value = requestedExperience;
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
  const escape = AmaruRender.escape;
  const photoPath = (name) =>
    `${document.documentElement.dataset.assetBase || ""}assets/photos/${name}.webp`;
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
    let count = 0;
    $$(".experience-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
      if (!card.hidden) count++;
    });
    $("#filter-status").textContent = `${count} ${t("filterCount")}`;
  }
  function renderJourney() {
    $$("[data-journey-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.journeyPanel !== journey;
    });
  }
  function renderExperienceDetail(id) {
    const item = experiences.find((e) => e.id === id);
    if (!item) return;
    const [title, , detail, points] = item[lang];
    $("#dialog-content").innerHTML =
      `<div class="dialog-body"><p class="eyebrow">${t(item.cat)} · ${t(item.time)}</p><h2 id="dialog-title">${escape(title)}</h2><p>${escape(detail)}</p><ul>${points.map((p) => `<li>${escape(p)}</li>`).join("")}</ul><p>${t("flexible")}</p><a href="#plan" class="button" data-choose-interest="${item.id}">${t("enquire")}</a></div>`;
    const photo = $(`[data-experience="${id}"] .card-image img`).cloneNode();
    photo.className = "dialog-photo";
    photo.loading = "eager";
    photo.sizes = "(max-width:692px) calc(100vw - 32px), 660px";
    $("#dialog-content").prepend(photo);
    const pageLink = $(`[data-experience-page="${id}"]`).cloneNode(true);
    $(".dialog-body", $("#dialog-content")).append(pageLink);
  }
  function renderPhoto() {
    const item = gallery[photo];
    $("#gallery-large").src = photoPath(item[0]);
    $("#gallery-large").alt = $(`[data-photo="${photo}"] img`).alt;
    $("#gallery-caption").textContent =
      `${photo + 1} / ${gallery.length} — ${photoTitle(item)}`;
  }
  function invalidateMessage() {
    $("#message-result").hidden = true;
    $("#send-whatsapp").removeAttribute("href");
    $("#message-preview").textContent = "";
  }
  function closeMenu() {
    $("#navigation").classList.remove("open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }
  function updateQuickMessage() {
    const selected = $$("#quick-experiences input:checked").map((input) =>
      interestName(input.value),
    );
    const message = [
      t("hello"),
      "",
      `${t("msgInterest")}: ${selected.length ? selected.join(", ") : t("choose")}`,
      `${t("msgPeople")}: ${$("#quick-travelers").value || t("unspecified")}`,
      `${t("msgDate")}: ${$("#quick-date").value || t("unspecified")}`,
    ];
    const notes = $("#quick-notes").value.trim();
    if (notes) message.push(`${t("msgNotes")}: ${notes}`);
    message.push("", t("msgEnd"));
    const text = message.join("\n");
    $("#quick-message").textContent = text;
    $("#quick-send").href =
      `https://wa.me/573132560145?text=${encodeURIComponent(text)}`;
  }
  function openQuickEnquiry() {
    const selected = $("#interest").value;
    if (
      !$("#quick-experiences input:checked") &&
      experiences.some((item) => item.id === selected)
    ) {
      $(`#quick-experiences input[value="${selected}"]`).checked = true;
    }
    updateQuickMessage();
    $("#quick-dialog").showModal();
  }
  $("#quick-form").addEventListener("input", updateQuickMessage);
  $("#quick-form").addEventListener("change", updateQuickMessage);
  $("#quick-form").addEventListener("submit", (event) =>
    event.preventDefault(),
  );
  $("#quick-send").addEventListener("click", (event) => {
    if (!$("#quick-form").reportValidity()) {
      event.preventDefault();
      return;
    }
    updateQuickMessage();
  });
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
    const quickLink = e.target.closest("[data-quick-enquiry]");
    if (quickLink) {
      e.preventDefault();
      openQuickEnquiry();
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
      e.preventDefault();
      openExperience = expButton.dataset.openExperience;
      renderExperienceDetail(openExperience);
      $("#experience-dialog").showModal();
      return;
    }
    const photoButton = e.target.closest("[data-photo]");
    if (photoButton) {
      e.preventDefault();
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
  $("#trip-form").removeAttribute("inert");
  $("#quick-date").min = $("#arrival").min;
  $$("[data-quick-enquiry]").forEach((link) =>
    link.setAttribute("aria-haspopup", "dialog"),
  );
  updateHeroControls();
  renderExperiences();
  renderJourney();
})();
