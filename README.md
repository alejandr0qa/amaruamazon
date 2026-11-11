# Amaru Amazon Experiences

Web estática de experiencias en Puerto Nariño, Amazonas, Colombia. Inglés principal, español y francés. Los precios se consultan directamente con Amaru; la historia de los anfitriones se incorporará cuando entreguen el material real.

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

Editar las fuentes y ejecutar `npm run build` antes de publicar. Las tres portadas, las 24 páginas de experiencias, i18n.js, sitemap.xml y robots.txt se generan y se incluyen en Git para que GitHub Pages pueda servirlos desde la raíz.

## Fuentes

- `src/index.template.html`: estructura semántica y texto inglés inicial. No editar directamente los HTML generados.
- `src/translations.js`: traducciones y etiquetas dinámicas; el generador completa el inglés desde la plantilla.
- `content.js`: ocho experiencias independientes, tres rutas sugeridas y seis fotografías de galería.
- `src/experience-pages.mjs`: rutas localizadas, títulos y recomendaciones de las ocho experiencias; no contiene tarifas ni duraciones supuestas.
- `scripts/build-experience-pages.mjs`: genera páginas individuales reutilizando cabecera, pie, privacidad, estilos y datos de la portada. No editar sus HTML de salida.
- `experience.js`: menú móvil y diálogo de privacidad de las páginas individuales, sin cargar el carrusel ni los datos de toda la portada.
- `scripts/check-experience-pages.mjs`: comprueba las 24 páginas, enlaces locales y cruzados, metadatos únicos, hreflang, JSON-LD y contacto contextual.
- `render.js`: plantillas compartidas para las tarjetas y contenido estático.
- `scripts/build-site.mjs`: generación con parse5; canonical, hreflang, metadatos sociales, JSON-LD y recursos relativos por idioma.
- `site.config.mjs`: URL pública, rutas de idioma y correo corporativo.
- `main.js`: mejora progresiva, filtros, modales, carrusel y consultas de WhatsApp.
- `style.css`: estilos adaptables, teclado y movimiento reducido.

Los tres idiomas entregan contenido completo en el HTML inicial, incluidos detalles de experiencias, las tres propuestas de viaje y galería. Sin JavaScript se pueden desplegar las fichas con controles HTML nativos, leer todas las rutas, abrir fotografías y navegar entre idiomas. Con JavaScript se habilitan los modales, filtros y formularios. Los enlaces antiguos con ?lang=es o ?lang=fr llevan a sus nuevas rutas cuando JavaScript está disponible.

Cada idioma tiene canonical propio, hreflang recíproco y metadatos de vista previa traducidos. El generador calcula automáticamente una versión de los estilos y scripts para evitar combinar archivos antiguos de caché con HTML nuevo.

Las tarjetas y modales conservan su funcionamiento y ahora enlazan una guía completa por experiencia. Cada guía tiene H1, title y descripción propios, fotografía existente con copyright visible, información práctica, enlaces relacionados y mensajes de WhatsApp con la actividad seleccionada. El enlace al formulario de portada utiliza `?experience=<id>#plan`; solo se aceptan los ocho identificadores conocidos y la canonical sigue siendo la ruta limpia. La duración no se publica como una cifra mientras no esté validada.

Las rutas de salida son `experiences/<slug>/`, `es/experiencias/<slug>/` y `fr/experiences/<slug>/`; los slugs exactos se definen en `src/experience-pages.mjs`. El sitemap incluye las 27 páginas con sus traducciones equivalentes.

El dominio propio se aplica a canonical, Open Graph, Twitter, sitemap, robots.txt y JSON-LD. La entidad TravelAgency mantiene un identificador común en los tres idiomas, con teléfono y correo de contacto. No se publican valoraciones, RNT, certificaciones ni precios sin evidencia.

## Consultas por WhatsApp

El botón flotante y el número de contacto abren un selector de varias experiencias, viajeros, fecha opcional y notas. Se puede revisar el mensaje preparado antes de continuar a WhatsApp. No elegir una experiencia genera una solicitud de ayuda para decidir. El enlace se actualiza al editar y no envía mensajes automáticamente.

El formulario principal conserva la consulta detallada con nombre e idioma del guía. Ambos flujos validan viajeros y fecha, codifican el mensaje y permiten que el visitante lo envíe desde WhatsApp. No hay pagos, precios públicos, analítica ni almacenamiento de los formularios. La preferencia de idioma se expresa en la URL y no depende de localStorage.

El correo corporativo ofrece una alternativa mediante `mailto:` en contacto y privacidad. Abre el cliente de correo del visitante; no incorpora un formulario externo ni un servicio de envío. El domicilio del buzón fue proporcionado por el propietario; su recepción debe comprobarla el operador antes de la promoción comercial.

## Siguiente fase y analítica

El inventario de información pendiente y los puntos de integración están en [docs/pending-operator-information.md](docs/pending-operator-information.md). No se muestran fichas vacías ni datos de ejemplo al visitante. Los precios seguirán comunicándose por contacto directo.

Los pasos externos para verificar el dominio, enviar el sitemap y revisar indexación están en [docs/google-search-console.md](docs/google-search-console.md). No se ha activado Search Console mediante una cuenta externa ni cambiado la configuración del alojamiento en esta fase.

Por decisión del propietario, Cloudflare Web Analytics queda para una fase posterior a la consolidación y promoción comercial. Esta fase no incluye scripts, tokens, configuración ni dependencias de analítica. La [documentación oficial](https://developers.cloudflare.com/web-analytics/about/) indica que el servicio es gratuito y puede utilizarse sin cambiar DNS; su [FAQ](https://developers.cloudflare.com/web-analytics/faq/) aclara que actualmente no permite eventos personalizados, por lo que no debe presentarse como medición de clics en WhatsApp. Evaluar de nuevo alcance, privacidad e información al visitante cuando se retome.

Kaya / kayak es diurno. Aves y cacao son tours independientes. Las rutas son propuestas sujetas a confirmación. La disponibilidad de guía en un idioma se confirma al cotizar.

## Fotografías propias

Los originales de `imagenes-brenda/` se conservan localmente y se excluyen de Git. La web usa derivados WebP con una franja inferior de copyright fuera del paisaje, sin EXIF/GPS. Su trazabilidad está en `assets/photos/credits.json`.

La portada tiene cuatro escenas con versiones de móvil y escritorio, fundido cada siete segundos y controles de reproducción. Se detiene fuera de la portada, con la pestaña oculta o con foco de teclado; con movimiento reducido empieza pausada.

Para regenerar las imágenes se requiere Python, Pillow, los originales locales y la fuente Arial de Windows:

```powershell
python scripts/prepare_photos.py
```

El logo original está en `assets/brand/amaru-original.png`. Las fuentes se sirven localmente con sus licencias OFL. Las imágenes antiguas de `img/` no se usan.

## Revisión y publicación

GitHub Pages publica desde `main`, carpeta raíz, con `.nojekyll`. Antes de subir cambios, generar y comprobar las 27 páginas; las verificaciones incluyen traducciones, metadatos, canonical, hreflang, contenido sin JavaScript, enlaces y recursos por idioma.

Los cambios de esta fase se presentan en una rama independiente y PR sin fusionar. No modificar `CNAME`, DNS, Cloudflare ni los ajustes de Pages como parte de esta optimización. Tras la revisión y aprobación, integrar los cambios mediante el proceso habitual del repositorio y verificar las tres rutas en el dominio público.

Las condiciones comerciales, disponibilidad y precio total se acuerdan por contacto antes de reservar.
