(() => {
  "use strict";
  const root = document.querySelector("[data-reviews]");
  if (!root) return;
  const c = JSON.parse(root.dataset.copy),
    config = window.AMARU_REVIEWS || {};
  const loopback = ["127.0.0.1", "localhost", "[::1]"].includes(
    location.hostname,
  );
  let base;
  try {
    base = new URL(config.apiBase);
    if (
      base.protocol !== "https:" &&
      !(
        loopback &&
        base.protocol === "http:" &&
        ["127.0.0.1", "localhost"].includes(base.hostname)
      )
    )
      return;
  } catch {
    return;
  }
  const $ = (s) => root.querySelector(s),
    form = $("[data-review-form]"),
    status = $("[data-review-status]"),
    list = $("[data-review-list]");
  let next = null,
    loading = false,
    widget,
    token = "",
    turnstilePromise;
  const preview = loopback && config.localPreview === true;
  $("[data-review-unavailable]").hidden = true;
  form.querySelector("fieldset").disabled = false;
  $("[data-review-delete] fieldset").disabled = false;
  if (preview) {
    const p = document.createElement("p");
    p.className = "review-preview";
    p.textContent = c.preview;
    root.prepend(p);
  }
  async function api(path, data) {
    let r, b;
    try {
      r = await fetch(new URL(path, base), {
        method: data ? "POST" : "GET",
        mode: "cors",
        credentials: "omit",
        headers: data ? { "Content-Type": "application/json" } : {},
        ...(data ? { body: JSON.stringify(data) } : {}),
        signal: AbortSignal.timeout(15000),
      });
      b = await r.json();
    } catch {
      throw new Error(c.error);
    }
    if (!r.ok) throw new Error(r.status === 429 ? c.limited : c.error);
    return b;
  }
  const node = (tag, text) => {
    const n = document.createElement(tag);
    n.textContent = text;
    return n;
  };
  async function loadReviews(append = false) {
    if (loading) return;
    loading = true;
    try {
      const q = new URLSearchParams();
      if (root.dataset.experience) q.set("experience", root.dataset.experience);
      if (append && next) q.set("before", next);
      const data = await api("/v1/reviews?" + q);
      if (!append) list.replaceChildren();
      for (const review of data.reviews) {
        const item = document.createElement("figure");
        item.className = "review-card";
        const caption = node(
          "figcaption",
          review.public_name + " · " + review.rating + "/5 ★",
        );
        const experience = form.querySelector(
          `option[value="${CSS.escape(review.experience)}"]`,
        );
        const meta = node(
          "p",
          (experience?.textContent || review.experience) +
            " · " +
            new Date(review.created_at).toLocaleDateString(
              document.documentElement.lang,
            ),
        );
        const quote = node("blockquote", review.comment);
        quote.lang = review.language;
        item.append(
          caption,
          meta,
          quote,
          node("small", c.original + " · " + review.language.toUpperCase()),
        );
        list.append(item);
      }
      list.hidden = !list.children.length;
      next = data.next;
      $("[data-reviews-more]").hidden = !next;
    } catch {
      /* The invitation remains useful even when the optional public list is unavailable. */
    } finally {
      loading = false;
    }
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          loadReviews();
        }
      },
      { rootMargin: "150px" },
    );
    observer.observe(root);
  } else loadReviews();
  $("[data-reviews-more]").addEventListener("click", () => loadReviews(true));
  async function setupVerification() {
    if (preview) {
      token = "local-preview-only";
      return;
    }
    if (widget !== undefined) return;
    if (!config.turnstileSiteKey) {
      status.textContent = c.error;
      return;
    }
    if (!turnstilePromise)
      turnstilePromise = new Promise((resolve, reject) => {
        if (window.turnstile) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.onload = resolve;
        script.onerror = () => {
          turnstilePromise = null;
          script.remove();
          reject(new Error(c.error));
        };
        document.head.append(script);
      });
    try {
      await turnstilePromise;
      if (widget !== undefined) return;
      widget = window.turnstile.render($("[data-turnstile]"), {
        sitekey: config.turnstileSiteKey,
        action: "review",
        language: document.documentElement.lang,
        callback: (value) => {
          token = value;
          status.textContent = "";
        },
        "expired-callback": () => {
          token = "";
        },
        "error-callback": () => {
          token = "";
          status.textContent = c.verify;
        },
      });
    } catch (e) {
      status.textContent = e.message;
    }
  }
  $("[data-review-compose]").addEventListener("toggle", () => {
    if ($("[data-review-compose]").open) setupVerification();
  });
  if ($("[data-review-compose]").open) setupVerification();
  function resetVerification() {
    token = "";
    if (preview) token = "local-preview-only";
    else if (widget !== undefined) window.turnstile.reset(widget);
  }
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!token) {
      status.textContent = c.verify;
      setupVerification();
      return;
    }
    const values = new FormData(form),
      button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = c.loading;
    try {
      const result = await api("/v1/reviews", {
        experience: values.get("experience"),
        publicName: values.get("publicName"),
        rating: Number(values.get("rating")),
        comment: values.get("comment"),
        language: document.documentElement.lang,
        consent: values.get("consent") === "on",
        consentVersion: "2026-11-17-v1",
        website: values.get("website"),
        turnstileToken: token,
      });
      status.textContent = c.success;
      $("[data-review-code]").value = result.id + "\n" + result.deletionToken;
      $("[data-review-receipt]").hidden = false;
      form.hidden = true;
      const deletion = $("[data-review-delete]");
      deletion.elements.id.value = result.id;
      deletion.elements.deletionToken.value = result.deletionToken;
      $("[data-review-code]").focus();
    } catch (e) {
      status.textContent = e.message;
      resetVerification();
      button.disabled = false;
    }
  });
  $("[data-review-delete]").addEventListener("submit", async (event) => {
    event.preventDefault();
    const deletion = event.currentTarget,
      button = deletion.querySelector("button"),
      feedback = $("[data-delete-status]");
    button.disabled = true;
    try {
      await api("/v1/reviews/delete", {
        id: deletion.elements.id.value,
        deletionToken: deletion.elements.deletionToken.value,
      });
      feedback.textContent = c.deleted;
      deletion.reset();
      $("[data-review-code]").value = "";
      $("[data-review-receipt]").hidden = true;
      await loadReviews();
    } catch (e) {
      feedback.textContent = e.message;
    } finally {
      button.disabled = false;
    }
  });
})();
