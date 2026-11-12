// Deliberately empty: publish only authorised, attributable traveller feedback.
export const testimonials = [];

export function renderTestimonials(entries, lang, escape) {
  const title = { en: 'Traveller voices', es: 'Voces de viajeros', fr: 'Paroles de voyageurs' }[lang];
  for (const entry of entries) {
    if (entry.approved !== true || !entry.permissionReference || !entry.name ||
        !['en', 'es', 'fr'].every((locale) => entry.quote?.[locale]?.trim()) ||
        !/^https:\/\//.test(entry.sourceUrl || '')) {
      throw new Error('A testimonial needs approval, permission evidence, attribution, a source and all three translations.');
    }
  }
  if (!entries.length) return '';
  return `<section class="section wrap traveller-voices" aria-labelledby="traveller-voices-title"><h2 id="traveller-voices-title">${escape(title)}</h2><div class="traveller-quotes">${entries.map((entry) => `<figure><blockquote><p>${escape(entry.quote[lang])}</p></blockquote><figcaption><a href="${escape(entry.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(entry.name)} ↗</a></figcaption></figure>`).join('')}</div></section>`;
}
