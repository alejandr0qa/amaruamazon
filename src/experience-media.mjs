// Owner footage, edited locally. A file is requested only after pressing play.
export const experienceMedia = {
  tarapoto: { file: 'tarapoto-water', seconds: 10, en: 'Quiet water and a forested shoreline at Tarapoto.', es: 'El agua tranquila y la orilla arbolada de Tarapoto.', fr: 'L’eau paisible et la rive boisée de Tarapoto.' },
  cacao: { file: 'cacao-drying', seconds: 5.5, en: 'Cacao beans drying: a closer look at preparation.', es: 'Granos de cacao en secado: una mirada al proceso.', fr: 'Des fèves de cacao au séchage : un regard sur la préparation.' },
  'flooded-forest': { file: 'flooded-forest', seconds: 8, en: 'A canoe moves between trees in flooded forest.', es: 'Una canoa avanza entre los árboles de la selva inundada.', fr: 'Un canoë avance entre les arbres de la forêt inondée.' },
  "san-antonio": {
    "file": "san-antonio-sloth",
    "seconds": 8,
    "en": "A sloth among the branches, filmed on an Amaru outing.",
    "es": "Un perezoso entre las ramas, filmado en un recorrido de Amaru.",
    "fr": "Un paresseux dans les branches, filmé lors d’une sortie d’Amaru."
  },
};
export const mediaCopy = {
  en: { play: 'Play a glimpse of the experience', note: 'Short video · no audio · loads when you press play', fallback: 'Open the video', error: 'The video could not play here. Use the link to open it.' },
  es: { play: 'Ver un momento de la experiencia', note: 'Video breve · sin audio · carga al pulsar reproducir', fallback: 'Abrir el video', error: 'El video no pudo reproducirse aquí. Puedes abrirlo desde el enlace.' },
  fr: { play: 'Voir un instant de l’expérience', note: 'Courte vidéo · sans son · chargée à la demande', fallback: 'Ouvrir la vidéo', error: 'La vidéo ne peut pas être lue ici. Utilisez le lien pour l’ouvrir.' },
};
