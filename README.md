# Amaru Amazon Experiences

Web estática de experiencias en Puerto Nariño, Amazonas, Colombia. Inglés principal, español y francés. Los precios se consultan directamente con Amaru; la historia de los anfitriones se incorporará cuando entreguen el material real.

## Sitio y contacto

- Inglés: https://alejandr0qa.github.io/amaruamazon/
- Español: https://alejandr0qa.github.io/amaruamazon/es/
- Francés: https://alejandr0qa.github.io/amaruamazon/fr/
- Repositorio: https://github.com/alejandr0qa/amaruamazon
- WhatsApp: +57 313 256 0145
- Dominio previsto, pendiente de compra y conexión: amaruamazonexperiences.com

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

Editar las fuentes y ejecutar `npm run build` antes de publicar. Los tres archivos HTML, i18n.js, sitemap.xml y robots.txt se generan y se incluyen en Git para que GitHub Pages pueda servirlos desde la raíz.

## Fuentes

- `src/index.template.html`: estructura semántica y texto inglés inicial. No editar directamente los HTML generados.
- `src/translations.js`: traducciones y etiquetas dinámicas; el generador completa el inglés desde la plantilla.
- `content.js`: ocho experiencias independientes, tres rutas sugeridas y seis fotografías de galería.
- `render.js`: plantillas compartidas para las tarjetas y contenido estático.
- `scripts/build-site.mjs`: generación con parse5; canonical, hreflang, metadatos sociales, JSON-LD y recursos relativos por idioma.
- `site.config.mjs`: URL pública y rutas de idioma.
- `main.js`: mejora progresiva, filtros, modales, carrusel y consultas de WhatsApp.
- `style.css`: estilos adaptables, teclado y movimiento reducido.

Los tres idiomas entregan contenido completo en el HTML inicial, incluidos detalles de experiencias, las tres propuestas de viaje y galería. Sin JavaScript se pueden desplegar las fichas con controles HTML nativos, leer todas las rutas, abrir fotografías y navegar entre idiomas. Con JavaScript se habilitan los modales, filtros y formularios. Los enlaces antiguos con ?lang=es o ?lang=fr llevan a sus nuevas rutas cuando JavaScript está disponible.

Cada idioma tiene canonical propio, hreflang recíproco y metadatos de vista previa traducidos. El generador calcula automáticamente una versión de los estilos y scripts para evitar combinar archivos antiguos de caché con HTML nuevo.

## Consultas por WhatsApp

El botón flotante y el número de contacto abren un selector de varias experiencias, viajeros, fecha opcional y notas. Se puede revisar el mensaje preparado antes de continuar a WhatsApp. No elegir una experiencia genera una solicitud de ayuda para decidir. El enlace se actualiza al editar y no envía mensajes automáticamente.

El formulario principal conserva la consulta detallada con nombre e idioma del guía. Ambos flujos validan viajeros y fecha, codifican el mensaje y permiten que el visitante lo envíe desde WhatsApp. No hay pagos, precios públicos, analítica ni almacenamiento de los formularios. La preferencia de idioma se expresa en la URL y no depende de localStorage.

Kaya / kayak es diurno. Aves y cacao son tours independientes. Las rutas son propuestas sujetas a confirmación. La disponibilidad de guía en un idioma se confirma al cotizar.

## Fotografías propias

Los originales de `imagenes-brenda/` se conservan localmente y se excluyen de Git. La web usa derivados WebP con una franja inferior de copyright fuera del paisaje, sin EXIF/GPS. Su trazabilidad está en `assets/photos/credits.json`.

La portada tiene cuatro escenas con versiones de móvil y escritorio, fundido cada siete segundos y controles de reproducción. Se detiene fuera de la portada, con la pestaña oculta o con foco de teclado; con movimiento reducido empieza pausada.

Para regenerar las imágenes se requiere Python, Pillow, los originales locales y la fuente Arial de Windows:

```powershell
python scripts/prepare_photos.py
```

El logo original está en `assets/brand/amaru-original.png`. Las fuentes se sirven localmente con sus licencias OFL. Las imágenes antiguas de `img/` no se usan.

## Publicación y dominio futuro

GitHub Pages publica desde `main`, carpeta raíz, con `.nojekyll`. Antes de subir cambios, generar y comprobar las tres páginas; las verificaciones incluyen traducciones, metadatos, canonical, hreflang, contenido sin JavaScript, enlaces y recursos por idioma.

No se añade CNAME mientras el dominio esté pendiente. Cuando la compra y el DNS estén listos:

1. Configurar amaruamazonexperiences.com en Settings → Pages y crear los registros DNS indicados por GitHub.
2. Crear CNAME con el dominio y habilitar HTTPS cuando esté disponible.
3. Cambiar `siteUrl` en `site.config.mjs` a `https://amaruamazonexperiences.com/`.
4. Ejecutar `npm run build` y `npm run check`, publicar los resultados y verificar HTTPS, idiomas y consultas en el dominio nuevo.

Las condiciones comerciales, disponibilidad y precio total se acuerdan por contacto antes de reservar.
