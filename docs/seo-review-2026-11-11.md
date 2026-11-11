# Revisión SEO y experiencias — 11 de noviembre de 2026

## Fase 1: revisión del trabajo existente

- El PR #5 (`seo-amaru-dominio-20261111`) ya estaba fusionado en `main`, revisión `ae9f3d3`. No se vuelve a implementar ni a fusionar.
- En un checkout aislado de esa revisión, `npm ci`, `npm run build` y `npm run check` pasaron y la generación no dejó diferencias. El cambio de dominio es reproducible desde sus fuentes.
- Las rutas públicas `/`, `/es/`, `/fr/`, `sitemap.xml` y `robots.txt` respondieron HTTPS 200, sin referencias al origen antiguo en el contenido revisado. Las canonical de las portadas son las URL propias de cada idioma.
- El PR #4 seguía abierto con correo corporativo, pruebas y preparación editorial. Al incorporar el nuevo `main` aparecieron conflictos en configuración, plantilla y HTML generados. Se conservaron las fuentes compatibles y se regeneraron las páginas; la rama contiene ahora el `main` actual sin conflictos pendientes.

## Fase 2: descubrimiento y consultas

La limitación principal del catálogo era que cada experiencia carecía de una URL propia. Se mantienen las ocho fichas y sus modales, y se añaden enlaces HTML a 24 páginas individuales: ocho por idioma.

- Cada página tiene título, descripción, H1, canonical, imagen social, hreflang equivalente, descripción inicial y recomendaciones prácticas.
- Se reutilizan las descripciones y fotografías del catálogo existente. El texto adicional orienta las preguntas antes de viajar; no introduce horarios, tarifas, certificaciones, inclusiones ni disponibilidad supuestos.
- Sin duración validada, el visitante recibe la indicación de confirmarla con Amaru. No se publica una cifra estimada.
- Los enlaces de idioma permanecen en la misma experiencia. Breadcrumbs y enlaces relacionados facilitan volver al catálogo y explorar otras actividades.
- WhatsApp incluye la experiencia consultada. El enlace al formulario conserva la selección mediante un identificador validado. No se envían mensajes automáticamente ni se crea una reserva.
- La portada conserva su H1 emocional, fotografías, carrusel, filtros y tres itinerarios. Se ajustan títulos, descripciones, el párrafo inicial y el encabezado del catálogo para explicar mejor destino y actividades en cada idioma.
- Se reutilizan tipografías, colores, navegación, botones, pie y privacidad. Los estilos nuevos corresponden a las páginas individuales y al enlace de ficha completa.
- El JavaScript de las páginas individuales ocupa aproximadamente 1 KB sin comprimir y solo controla menú y privacidad. No carga el carrusel ni el catálogo completo; las imágenes tienen dimensiones y las relacionadas usan carga diferida. No se añaden dependencias.
- El JSON-LD describe la entidad, la página, el servicio y su navegación. No se marcan precios, ofertas, reseñas ni certificaciones ficticias.

## Fase 3: preparación para Google

El sitemap generado contiene 27 URL con cuatro referencias de idioma por entrada. `robots.txt` apunta al sitemap del dominio propio. Los pasos de propiedad, envío e inspección se detallan en `google-search-console.md`; requieren publicación y acceso del propietario. No se ha accedido a una cuenta de Google ni confirmado la indexación o el posicionamiento real.

## Pruebas y resultados

- `npm ci`: correcto, sin cambios en dependencias o lockfile.
- `npm run build`: tres portadas y 24 páginas de experiencias generadas.
- `npm run check`: correcto; comprueba metadatos, unicidad, 27 URL, hreflang, JSON-LD, enlaces locales y cruzados, anchors, imágenes, selección de experiencia y mensajes de WhatsApp.
- XML comprobado con un parser independiente: 27 URL y cuatro alternativas por entrada; las 27 rutas respondieron HTTP 200 en la vista previa local.
- Sintaxis de `main.js`, `experience.js` y los nuevos scripts: correcta. `git diff --check`: correcto.
- Navegador: consultas principal y rápida en EN/ES/FR, experiencia preseleccionada, rechazo de viajeros inválidos y fecha pasada, identificador desconocido ignorado, navegación de idioma, menú móvil con cierre por Escape, filtros, carrusel, itinerarios, galería, enlaces de modal a página y privacidad.
- Vistas de 390 y 1280 px: sin desbordamientos en las páginas representativas revisadas. Fotos con su franja de copyright visible. Sin errores ni advertencias en la consola durante esas pruebas.
- No se enviaron mensajes ni correos. No se activó analítica. No se cambiaron DNS, Cloudflare, CNAME, GitHub Pages, fotografías, pagos o reservas.

Estas pruebas no sustituyen Lighthouse ni datos de visitantes reales. El sitemap y las páginas nuevas solo estarán disponibles públicamente tras integrar y desplegar la rama revisada.

## Listo y pendiente

Listo para revisión: metadatos, catálogo enlazado, 24 páginas estáticas, contacto contextual, correo corporativo, comprobaciones y guía de Google. Se continúa el PR #4 existente; no se publica esta fase automáticamente.

Pendiente del operador: duración y datos prácticos por tour, inclusión de traslados/equipo, condiciones comerciales, logística de llegada, seguridad, RNT verificable, biografías/fotos del equipo, perfiles y testimonios reales, confirmación del buzón y cuenta para Search Console. Mantener los precios por contacto directo y la analítica aplazada. Ver `pending-operator-information.md` para los datos y evidencias requeridos.
