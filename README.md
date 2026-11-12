# Amaru Amazon Experiences

Web estática de experiencias en Puerto Nariño, Amazonas, Colombia. Inglés principal, español y francés. Los precios se consultan directamente con Amaru; la historia de los dos viajeros se basa en el material entregado por el equipo. Nombres y retratos autorizados siguen pendientes.

## Sitio y contacto

- Inglés: https://amaruamazonexperiences.com/
- Español: https://amaruamazonexperiences.com/es/
- Francés: https://amaruamazonexperiences.com/fr/
- Repositorio: https://github.com/alejandr0qa/amaruamazon
- WhatsApp: +57 313 256 0145
- Correo corporativo: info@amaruamazonexperiences.com
- Dominio comprado: amaruamazonexperiences.com. `CNAME` existente se conserva; esta fase no modifica DNS, Cloudflare ni ajustes de GitHub Pages.

## Desarrollo y generación

Se requiere Node.js 22 o posterior. Las dependencias solo se usan para generar y comprobar el HTML; el sitio publicado no requiere servidor Node ni framework.

```powershell
npm ci
npm run build
npm run check
node --check main.js
python -m http.server 8077 --bind 127.0.0.1
```

Abrir http://127.0.0.1:8077/ o /es/ o /fr/. No abrir como archivo local para probar la navegación.

Editar las fuentes y ejecutar `npm run build` antes de publicar. Las tres portadas, las 36 páginas de experiencias, i18n.js, sitemap.xml y robots.txt se generan y se incluyen en Git para que GitHub Pages pueda servirlos desde la raíz.

## Fuentes

- `src/index.template.html`: estructura semántica y texto inglés inicial. No editar directamente los HTML generados.
- `src/translations.js`: traducciones y etiquetas dinámicas; el generador completa el inglés desde la plantilla.
- `content.js`: doce experiencias (ocho conservadas y cuatro nuevas), tres rutas sugeridas y ocho fotografías de galería.
- `src/experience-pages.mjs`: rutas localizadas, títulos y recomendaciones de las doce experiencias; no contiene tarifas ni duraciones supuestas.
- `scripts/build-experience-pages.mjs`: genera páginas individuales reutilizando cabecera, pie, privacidad, estilos y datos de la portada. No editar sus HTML de salida.
- `experience.js`: menú móvil y diálogo de privacidad de las páginas individuales, sin cargar el carrusel ni los datos de toda la portada.
- `scripts/check-experience-pages.mjs`: comprueba las 36 páginas, enlaces locales y cruzados, metadatos únicos, hreflang, JSON-LD y contacto contextual.
- `render.js`: plantillas compartidas para las tarjetas y contenido estático.
- `scripts/build-site.mjs`: generación con parse5; canonical, hreflang, metadatos sociales, JSON-LD y recursos relativos por idioma.
- `site.config.mjs`: URL pública, rutas de idioma y correo corporativo.
- `main.js`: mejora progresiva, filtros, modales, carrusel y consultas de WhatsApp.
- `style.css`: estilos adaptables, teclado y movimiento reducido.

Los tres idiomas entregan contenido completo en el HTML inicial, incluidos detalles de experiencias, las tres propuestas de viaje y galería. Sin JavaScript se pueden desplegar las fichas con controles HTML nativos, leer todas las rutas, abrir fotografías y navegar entre idiomas. Con JavaScript se habilitan los modales, filtros y formularios. Los enlaces antiguos con ?lang=es o ?lang=fr llevan a sus nuevas rutas cuando JavaScript está disponible.

Cada idioma tiene canonical propio, hreflang recíproco y metadatos de vista previa traducidos. El generador calcula automáticamente una versión de los estilos y scripts para evitar combinar archivos antiguos de caché con HTML nuevo.

Las tarjetas y modales conservan su funcionamiento y ahora enlazan una guía completa por experiencia. Cada guía tiene H1, title y descripción propios, fotografía existente con copyright visible, información práctica, enlaces relacionados y mensajes de WhatsApp con la actividad seleccionada. El enlace al formulario de portada utiliza `?experience=<id>#plan`; solo se aceptan los doce identificadores conocidos y la canonical sigue siendo la ruta limpia. La duración total se consulta cuando no está validada. En Ojé se indica únicamente el tramo de caminata aproximado de 1–2 horas descrito por el equipo, sin convertirlo en duración total.

Las rutas de salida son `experiences/<slug>/`, `es/experiencias/<slug>/` y `fr/experiences/<slug>/`; los slugs exactos se definen en `src/experience-pages.mjs`. El sitemap de esta rama incluye 39 páginas con sus traducciones equivalentes; conserva las 27 URL existentes.

El dominio propio se aplica a canonical, Open Graph, Twitter, sitemap, robots.txt y JSON-LD. La entidad TravelAgency mantiene un identificador común en los tres idiomas, con teléfono y correo de contacto. No se publican valoraciones, RNT, certificaciones ni precios sin evidencia.

## Consultas por WhatsApp

El botón flotante y el número de contacto abren un selector de varias experiencias, viajeros, fecha opcional y notas. Se puede revisar el mensaje preparado antes de continuar a WhatsApp. No elegir una experiencia genera una solicitud de ayuda para decidir. El enlace se actualiza al editar y no envía mensajes automáticamente.

El formulario principal conserva la consulta detallada con nombre e idioma del guía. Ambos flujos validan viajeros y fecha, codifican el mensaje y permiten que el visitante lo envíe desde WhatsApp. No hay pagos, precios públicos, analítica ni almacenamiento de los formularios. La preferencia de idioma se expresa en la URL y no depende de localStorage.

El correo corporativo ofrece una alternativa mediante `mailto:` en contacto y privacidad. Abre el cliente de correo del visitante; no incorpora un formulario externo ni un servicio de envío. El domicilio del buzón fue proporcionado por el propietario; su recepción debe comprobarla el operador antes de la promoción comercial.

## Siguiente fase y analítica

El inventario de información pendiente y los puntos de integración están en [docs/pending-operator-information.md](docs/pending-operator-information.md). No se muestran fichas vacías ni datos de ejemplo al visitante. Los precios seguirán comunicándose por contacto directo.

Search Console está activo desde el 11 de noviembre de 2026 según el propietario, con 27 páginas descubiertas; falta confirmar cuántas están indexadas. El procedimiento posterior a publicación y el seguimiento a 30, 60 y 90 días están en [docs/google-search-console.md](docs/google-search-console.md).

Por decisión del propietario, Cloudflare Web Analytics queda para una fase posterior a la consolidación y promoción comercial. Esta fase no incluye scripts, tokens, configuración ni dependencias de analítica. La [documentación oficial](https://developers.cloudflare.com/web-analytics/about/) indica que el servicio es gratuito y puede utilizarse sin cambiar DNS; su [FAQ](https://developers.cloudflare.com/web-analytics/faq/) aclara que actualmente no permite eventos personalizados, por lo que no debe presentarse como medición de clics en WhatsApp. Evaluar de nuevo alcance, privacidad e información al visitante cuando se retome.

Kaya / kayak es diurno. Aves y cacao son tours independientes. Las rutas son propuestas sujetas a confirmación. La disponibilidad de guía en un idioma se confirma al cotizar.

## Fotografías propias

Los originales de `imagenes-brenda/` se conservan localmente y se excluyen de Git. La web usa derivados WebP con una franja inferior de copyright fuera del paisaje, sin EXIF/GPS. Su trazabilidad está en `assets/photos/credits.json`.

La portada tiene cuatro escenas con versiones de móvil y escritorio, fundido cada siete segundos y controles de reproducción. Se detiene fuera de la portada, con la pestaña oculta o con foco de teclado; con movimiento reducido empieza pausada.

Para regenerar las imágenes se requiere Python, Pillow, los originales locales y la fuente Arial de Windows:

```powershell
python scripts/prepare_photos.py
python scripts/prepare_responsive_photos.py
```

El segundo comando genera copias de 480 y 800 px desde los derivados existentes, conservando el encuadre y toda la franja de copyright. No requiere los originales; su inventario está en `assets/photos/responsive.json`. Estos pasos de mantenimiento son opcionales: las imágenes están versionadas y `npm run build` no requiere Python ni Pillow.

El logo original está en `assets/brand/amaru-original.png`. El primer comando también prepara ICO de 16/32/48 px y el icono de inicio de 180 px a partir del logo suministrado. Las fuentes se sirven localmente con sus licencias OFL. Las imágenes antiguas de `img/` no se usan.

## Revisión y publicación

GitHub Pages publica desde `main`, carpeta raíz, con `.nojekyll`. Antes de subir cambios, generar y comprobar las 27 páginas; las verificaciones incluyen traducciones, metadatos, canonical, hreflang, contenido sin JavaScript, enlaces y recursos por idioma.

Los cambios de esta fase se presentan en una rama independiente y PR sin fusionar. No modificar `CNAME`, DNS, Cloudflare ni los ajustes de Pages como parte de esta optimización. Tras la revisión y aprobación, integrar los cambios mediante el proceso habitual del repositorio y verificar las tres rutas en el dominio público.

Las condiciones comerciales, disponibilidad y precio total se acuerdan por contacto antes de reservar.

## Actualización integrada del 12 de noviembre

Resumen, catálogo, pruebas y comparativas: [docs/integral-update-2026-11-12.md](docs/integral-update-2026-11-12.md). City Tour, Ojé, caimanes y canotaje en selva inundada añaden cuatro experiencias; Wochine se combina con la caminata nocturna en su URL existente. San Antonio/perezosos/Victoria Regia sigue pendiente de recorrido y cruce fronterizo; cerámica no se publica.

`src/experience-media.mjs` asigna tres clips locales a sus fichas. `media.js` crea el reproductor solo al pulsar reproducir: no hay descarga inicial de MP4, audio ni reproducción automática. Los originales se conservan fuera de Git. [Inventario y optimización](docs/media-inventory-2026-11-12.md).

`src/testimonials.mjs` contiene una colección vacía y el componente para futuras reseñas autorizadas. Cada entrada exige aprobación, referencia no sensible del permiso, nombre publicable, URL de origen y texto en los tres idiomas; la referencia del permiso no se muestra al visitante. Sin entradas no se genera sección ni Schema de reseñas. Nunca almacenar permisos privados ni datos personales adicionales en este repositorio público.
