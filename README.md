# Amaru Amazon Experiences

Web de experiencias en Puerto Nariño, Amazonas, Colombia. Inglés principal, español y francés. HTML, CSS y JavaScript sin dependencias de ejecución ni compilación.

## Sitio y contacto

- Sitio actual: https://alejandr0qa.github.io/amaruamazon/
- Repositorio: https://github.com/alejandr0qa/amaruamazon
- Dominio previsto, pendiente de compra y conexión: amaruamazonexperiences.com
- WhatsApp: +57 313 256 0145

## Desarrollo

Desde esta carpeta:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abrir http://127.0.0.1:4173/ . No abrir como archivo local para las pruebas de navegación y preferencias.

```powershell
node --check main.js
node --check content.js
node --check i18n.js
node scripts/check-site.mjs
```

## Contenido

- `index.html`: estructura semántica, contenido inglés inicial, metadatos y formulario.
- `i18n.js`: español, francés y etiquetas dinámicas. Inglés inicial tomado del HTML.
- `content.js`: ocho experiencias independientes, tres rutas sugeridas y galería.
- `main.js`: idiomas, filtros, modales, navegación y mensaje de WhatsApp.
- `style.css`: diseño adaptable, teclado y movimiento reducido.
- `assets/photos/credits.json`: trazabilidad de cada fotografía publicada.

Kaya / kayak es diurno. Aves y cacao tienen fichas y opciones de consulta independientes. Las rutas de varios días son propuestas sujetas a confirmación; no hay precios, testimonios ni cifras de viajeros inventados. La disponibilidad de guía en un idioma se confirma al cotizar.

## Fotografías propias

La portada muestra un carrusel de cuatro fotos propias (río, raíces de selva, victorias amazónicas y atardecer), con fundido suave cada siete segundos, flechas, selección directa y pausa/reproducción. La rotación se detiene al salir de la portada, ocultar la pestaña o usar el teclado en la portada. Con movimiento reducido se inicia pausada. Solo se carga la siguiente imagen cuando hace falta; cada foto tiene versiones de escritorio y móvil con la marca de autor completa.

Los originales de `imagenes-brenda/` se conservan localmente y se excluyen de Git. El sitio solo usa derivados WebP marcados de `assets/photos/`. Cada fotografía tiene una franja inferior de copyright añadida fuera del paisaje. Los derivados no contienen metadatos EXIF/GPS. La foto de la portada tiene versiones separadas para móvil y escritorio para mantener visible la franja.

Para regenerar se requiere Python con Pillow y los originales locales:

```powershell
python scripts/prepare_photos.py
```

El logo original compartido se conserva en `assets/brand/amaru-original.png`; la web usa una copia optimizada. Las fuentes Cormorant Garamond y Manrope se sirven localmente, con sus licencias OFL en `assets/fonts/`.

Las imágenes antiguas de `img/` forman parte de la historia previa y no se usan en esta web.

## Consultas y privacidad

El formulario no envía información a un servidor ni cobra pagos. Primero muestra el mensaje preparado. El visitante decide abrir WhatsApp y enviarlo. La consulta no confirma una reserva. Cambiar cualquier campo invalida el mensaje previo. Solo se guarda el idioma en localStorage; no se incluyen analítica, fuentes remotas ni rastreadores.

## Publicación y dominio futuro

GitHub Pages publica desde `main`, carpeta raíz. `.nojekyll` evita procesamiento innecesario. Los recursos usan rutas relativas compatibles con el subdirectorio `/amaruamazon/`.

No hay `CNAME` mientras el dominio esté pendiente. Cuando la compra y el acceso DNS estén listos:

1. Configurar `amaruamazonexperiences.com` en Settings → Pages y crear los registros DNS indicados por GitHub.
2. Crear `CNAME` con el dominio y habilitar HTTPS cuando GitHub confirme el certificado.
3. Sustituir el origen `https://alejandr0qa.github.io/amaruamazon/` en canonical, Open Graph, hreflang, JSON-LD, `main.js`, `robots.txt` y `sitemap.xml` por `https://amaruamazonexperiences.com/`.
4. Verificar HTTPS, redirecciones, los tres idiomas y enlaces de WhatsApp en el dominio nuevo.

Las condiciones comerciales concretas, disponibilidad y precio total se acuerdan directamente antes de reservar.
