// Keep review assets out of the initial rendering path.
(() => {
  const section = document.querySelector('[data-reviews]');
  if (!section) return;
  const source = new URL(document.currentScript.src);
  const version = source.search;
  let loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = new URL('reviews.css' + version, source).href;
    document.head.append(css);
    for (const file of ['reviews-config.js', 'reviews.js']) {
      const script = document.createElement('script');
      script.src = new URL(file + version, source).href;
      script.async = false;
      document.head.append(script);
    }
  }
  section.addEventListener('focusin', load, { once: true });
  section.addEventListener('pointerdown', load, { once: true });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: '600px' });
    observer.observe(section);
  } else load();
})();
