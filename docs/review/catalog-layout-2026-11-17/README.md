# Distribución del catálogo · 17 de noviembre de 2026

Rama independiente `codex/balanced-experience-catalog`, desde `52b37379ff1f10ec0fb32fa906f727e19a106a77`. Este cambio no incorpora el sistema de opiniones, preparado por separado en el PR #7.

En escritorio, el catálogo de 13 experiencias pasa de `3 + 3 + 3 + 3 + 1` a `3 + 3 + 3 + 2 + 2`. Las últimas dos filas forman parejas centradas con el mismo ancho de tarjeta e imagen de las filas superiores. No se ensanchan imágenes, no se recortan ni se convierte una tarjeta en un bloque destacado. El orden sigue siendo el del catálogo original.

El cambio añade únicamente reglas de CSS a `.experience-grid`, con subcolumnas para posicionar tarjetas del mismo tamaño. Los selectores cuentan solo tarjetas visibles, por lo que los filtros existentes siguen funcionando sin tocar JavaScript: cinco resultados se distribuyen `3 + 2` y tres resultados en una fila. En tableta se conservan dos columnas y se centra la tarjeta final cuando el total es impar. Hasta 500 px se conserva la columna única original. Los navegadores sin soporte de `:nth-child(... of selector)` mantienen el grid anterior mediante `@supports`.

## Comparativa

Las capturas muestran el final del catálogo español; se comprobó el mismo comportamiento en inglés y francés. La cabecera fija y WhatsApp se ocultaron temporalmente al capturar para que no taparan las tarjetas, sin modificar sus estilos en la web.

| Tamaño | Antes | Después |
| --- | --- | --- |
| Escritorio · 1366 px | [Ver captura](before-desktop.png) | [Ver captura](after-desktop.png) |
| Tableta · 768 px | [Ver captura](before-tablet.png) | [Ver captura](after-tablet.png) |
| Móvil · 390 px | [Ver captura](before-mobile.png) | [Ver captura](after-mobile.png) |

La vista previa local comparativa de esta sesión está en `http://127.0.0.1:8080/__comparison`; el catálogo corregido en `http://127.0.0.1:8080/es/#experiences`. Para una vista previa convencional desde esta rama: `npm ci`, `npm run build` y `python -m http.server 8080 --bind 127.0.0.1`.

## Comprobaciones

- `npm run build` y `npm run check`: correctos, tres portadas y 39 fichas, sitemap de 42 URL y comprobaciones de medios, enlaces, metadatos y WhatsApp.
- Chromium: tres idiomas por tres tamaños, antes/después y los cuatro filtros; anchura y proporción de imágenes/tarjetas conservadas, alturas alineadas dentro de cada fila, filas centradas, orden idéntico y ausencia de desbordamiento horizontal o errores JavaScript. Evidencia: [validation.json](validation.json).
- Sin JavaScript: las trece tarjetas del HTML inicial mantienen la distribución de escritorio `3 + 3 + 3 + 2 + 2`.
- Comparación de los 42 HTML con la base: el único cambio es la versión de recursos. Contenido, enlaces, canonical, hreflang y Schema son idénticos. `CNAME`, sitemap y robots no cambian.
- No se añaden dependencias, scripts, solicitudes HTTP ni recursos multimedia. Fotografías, fuentes, textos, horarios, categorías, botones y lógica de filtros permanecen iguales.

Pendiente de decisión del propietario: publicar el ajuste visual o conservarlo para revisión. Su mensaje solicita ambas cosas («no publicar automáticamente» y «que se vean publicados»), por lo que la publicación se confirma sobre esta comparación concreta. Cloudflare y la activación de opiniones pertenecen al PR #7 y no se incluyen en esta rama.
