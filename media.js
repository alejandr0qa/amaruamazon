"use strict";
// No video element or media request exists until this explicit visitor action.
document.querySelectorAll('[data-media-src]').forEach((button) => {
  button.addEventListener('click', () => {
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.tabIndex = 0;
    video.poster = button.querySelector('img').src;
    video.setAttribute('aria-label', button.dataset.mediaDescription);
    video.src = button.dataset.mediaSrc;
    const container = button.parentElement;
    button.replaceWith(video);
    const fallback = container.querySelector('[data-media-fallback]');
    fallback.hidden = false;
    video.addEventListener('error', () => {
      container.querySelector('[data-media-status]').textContent = container.dataset.mediaError;
    }, { once: true });
    video.focus();
    video.play().catch(() => { /* Native controls remain available. */ });
  }, { once: true });
});
