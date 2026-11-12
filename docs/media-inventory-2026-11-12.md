# Inventario multimedia de Amaru — 12 de noviembre de 2026

Inventario recursivo de `imagenes-brenda/`: **288 archivos**, 270 fotografías y 18 videos. Tamaño original total: **2182.1 MiB**. Los originales permanecen intactos.

SHA-256: **244 contenidos únicos**, **43 grupos de duplicados exactos**. Los duplicados se documentan; no se elimina ningún archivo. No se guardan coordenadas GPS ni EXIF personal.

El CSV contiene ruta relativa, carpeta, tamaño, tipo, dimensiones orientadas, duración y códec cuando procede, SHA-256 y estado de lectura. El JSON añade grupos completos de duplicados y carpetas. Las hojas de contacto de revisión permanecen fuera del sitio, en `.codex-preview/integral-20261112/media-review/`.

## Distribución por carpeta

| Carpeta | Fotos | Videos | MiB |
| --- | ---: | ---: | ---: |
| `.` | 176 | 2 | 587.3 |
| `avistamiento-de-osos-perezosos-y-victoria-regia/avistamiento de osos perezosos y victoria regia` | 5 | 4 | 376.5 |
| `canotaje-en-selva-inundada/CANOTAJE EN SELVA INUNDADA` | 3 | 2 | 146.0 |
| `city-tour/city tour` | 6 | 3 | 146.9 |
| `lago-tarapoto/lago tarapoto` | 11 | 5 | 631.6 |
| `pernoctar/PERNOCTAR` | 8 | 0 | 31.0 |
| `tour-avistamiento-de-aves/avistamiento de aves` | 18 | 0 | 11.3 |
| `wochine-y-caminata-nocturna/wochine y caminata nocturna` | 43 | 2 | 251.4 |

## Revisión y selección

La asociación a experiencias se apoya en la carpeta de origen y en la inspección visual; no se atribuyen especies, lugares concretos ni servicios no confirmados. La carpeta `canotaje-en-selva-inundada` se mantiene separada de Kaya / kayak diurno. Los archivos originales no se sirven desde la web.

Se revisaron las 270 fotografías en 13 hojas de contacto y muestras del 25 % y 70 % de los 18 videos; los fragmentos seleccionados se inspeccionaron además a un fotograma por segundo. Ningún video debe descargarse al abrir la página: portada WebP, carga bajo demanda y reproducción mediante controles. Sin reproducción automática ni pista sonora.

## Material integrado en la rama de desarrollo

Los cuatro clips están integrados en las fichas de Tarapoto, cacao, canotaje y San Antonio, en los tres idiomas; las seis fotografías se usan en tarjetas y fichas, y City Tour y canotaje también en la galería. La trazabilidad completa (ruta y SHA-256 del original, huellas y tamaños de cada derivado) figura en `media-optimization-2026-11-12.json`.

| Video | Original | Fragmento MP4 | Poster WebP | Duración |
| --- | ---: | ---: | ---: | ---: |
| `assets/videos/flooded-forest.mp4` | 66.751.980 B | 1.633.189 B | 80.596 B | 8,0 s |
| `assets/videos/tarapoto-water.mp4` | 65.967.327 B | 1.458.768 B | 41.398 B | 10,0 s |
| `assets/videos/cacao-drying.mp4` | 11.690.571 B | 1.160.920 B | 69.964 B | 5,5 s |
| `assets/videos/san-antonio-sloth.mp4` | 130.445.872 B | 1.327.709 B | 44.096 B | 8 s |

MP4 H.264 Main 3.1/yuv420p, 24 fps y 396×720 píxeles (escena de 396×704 más franja inferior de 16 px), sin sonido ni metadatos de origen y con `faststart`. Los cuatro fragmentos suman 5,32 MiB. La reproducción debe activarse mediante controles, a petición del visitante; el sitio debe usar `preload="none"` y no asignar `src` antes de la interacción para evitar descargar videos en la apertura.

| Foto nueva | Origen del inventario | Variantes | Estado |
| --- | --- | --- | --- |
| `city-tour` | `city-tour/city tour/IMG_20260728_110420.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en tarjetas y fichas |
| `flooded-forest` | `canotaje-en-selva-inundada/CANOTAJE EN SELVA INUNDADA/IMG_20260223_110936.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en tarjetas y fichas |
| `birdwatching-new` | `tour-avistamiento-de-aves/avistamiento de aves/IMG-20260730-WA0278.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en tarjetas y fichas |
| `oje` | `58120.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en tarjetas y fichas |
| `sloth` | `avistamiento-de-osos-perezosos-y-victoria-regia/avistamiento de osos perezosos y victoria regia/IMG_20251224_105430.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en la ficha combinada de San Antonio |
| `victoria-regia` | `avistamiento-de-osos-perezosos-y-victoria-regia/avistamiento de osos perezosos y victoria regia/IMG_20260102_115836.jpg` | 1200/800/480 px, franja inferior fuera de la escena| Integrada en la ficha combinada de San Antonio |

El encuadre centrado/adaptado fue preparado para revisión visual; el original no se distorsiona ni se edita. La fotografía nueva de aves muestra un ojo más definido y menos ruido que el recurso grande anterior, que se mantiene intacto. No se atribuyen especies.

No se seleccionaron materiales que muestran manipulación o alimentación de fauna, ni contextos de cautividad sin verificar. No se encontró una fotografía confirmada de avistamiento nocturno de caimanes en libertad. `34936.jpg` muestra un caimán junto al agua de día pero su contexto no está confirmado; no se utiliza para prometer la salida nocturna. El árbol del recurso `oje` coincide visualmente con la fotografía identificada por el equipo en la página 6 del PDF; no se deducen edad o especie.

Verificación de integridad: SHA-256 idéntico para los 288 originales y los 50 recursos fotográficos existentes. El informe JSON de optimización también relaciona los 22 recursos base anteriores con sus originales y huellas. Herramientas locales Pillow y FFmpeg (imageio-ffmpeg 0.8.1 en la carpeta ignorada de pruebas); sin nuevas dependencias de construcción ni servicios de pago.
