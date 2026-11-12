import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { testimonials, renderTestimonials } from '../src/testimonials.mjs';

export async function checkFeatures() {
  const media = JSON.parse(fs.readFileSync(new URL('../docs/media-optimization-2026-11-12.json', import.meta.url), 'utf8'));
  for (const video of media.videos) {
    const bytes = fs.readFileSync(new URL('../' + video.output, import.meta.url));
    assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), video.output_sha256);
    assert.equal(bytes.length, video.output_bytes);
    assert.ok(bytes.length < 3 * 1024 * 1024);
    assert.equal(video.audio, false);
    assert.ok(video.height <= 720);
    assert.ok(bytes.indexOf(Buffer.from('moov')) < bytes.indexOf(Buffer.from('mdat')), 'MP4 must support faststart');
  }
  const escape = (s) => String(s).replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  for (const lang of ['en', 'es', 'fr']) assert.equal(renderTestimonials(testimonials, lang, escape), '');
  assert.throws(() => renderTestimonials([{ approved: false }], 'es', escape), /approval/);
  assert.throws(() => renderTestimonials([{ approved: true, name: 'Test' }], 'es', escape), /permission/);
  const html = renderTestimonials([{ approved: true, permissionReference: 'test-only', name: 'Test', sourceUrl: 'https://example.org/review', quote: { en: '<test>', es: '<test>', fr: '<test>' } }], 'es', escape);
  assert.ok(html.includes('&lt;test&gt;') && !html.includes('<test>'));
  // Privacy regression: executing the script must not create a video or set src.
  const listeners = {}, created = [], fallback = { hidden: true }, status = { textContent: '' };
  const container = { dataset: { mediaError: 'Error' }, querySelector: (s) => s === '[data-media-fallback]' ? fallback : status };
  const button = { dataset: { mediaSrc: '/test.mp4', mediaDescription: 'Test clip' }, parentElement: container,
    querySelector: () => ({ src: '/poster.webp' }), addEventListener: (name, fn) => listeners[name] = fn,
    replaceWith: (video) => container.video = video };
  const document = { querySelectorAll: () => [button], createElement: (tag) => {
    const v = { tag, setAttribute() {}, focus() {}, play: () => Promise.resolve(), addEventListener: (name, fn) => v[name] = fn };
    created.push(v); return v;
  } };
  vm.runInNewContext(fs.readFileSync(new URL('../media.js', import.meta.url), 'utf8'), { document });
  assert.equal(created.length, 0);
  assert.equal(fallback.hidden, true);
  listeners.click();
  assert.equal(created.length, 1);
  assert.equal(container.video.src, '/test.mp4');
  assert.equal(container.video.preload, 'none');
  assert.equal(container.video.controls, true);
  assert.equal(container.video.tabIndex, 0);
  assert.equal(container.video.autoplay, undefined);
  assert.equal(fallback.hidden, false);
  container.video.error();
  assert.equal(status.textContent, 'Error');
  console.log('PASS: video requests require user action; playback fallback and testimonial publication guards.');
}
