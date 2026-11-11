# Google Search Console: seguimiento de las 27 URL

Actualizado el 11 de noviembre de 2026. El propietario confirma que Search Console se inició hoy y ha descubierto las 27 páginas. **Descubiertas no significa indexadas**: indexadas, clics, impresiones, CTR y posición inicial siguen pendientes de datos, no equivalen a cero. No se ha accedido a la cuenta ni cambiado DNS, Cloudflare o GitHub Pages. No hace falta activar analítica.

## Tras aprobar y publicar el PR

1. Esperar al despliegue de GitHub Pages. Comprobar HTTPS 200 en las tres portadas y las ocho fichas de cada idioma; canonical propio, recursos accesibles, ausencia de `noindex` y alternancias equivalentes. Las mismas 27 URL se conservan.
2. En la propiedad existente, abrir **Sitemaps** y comprobar lectura correcta de [sitemap.xml](https://amaruamazonexperiences.com/sitemap.xml), con 27 URL. Si ya se envió, no crear otra propiedad ni repetir la verificación. `robots.txt` debe seguir indicando este sitemap.
3. En **Inspección de URL**, revisar `/`, `/es/`, `/fr/` y una ficha por idioma. Probar la URL publicada, revisar el HTML renderizado y, en la versión indexada cuando exista, comparar canonical declarada y seleccionada por Google. Solicitar indexación de las páginas prioritarias actualizadas sin repetir solicitudes en masa. Una prueba en directo favorable no confirma indexación. [Guía de inspección](https://support.google.com/webmasters/answer/9012289).
4. Registrar fecha y revisión publicada, estado del sitemap y exclusiones concretas. Si aparece un desafío, 403 o 5xx, revisar el caso con el administrador antes de cambiar reglas de Cloudflare. No desactivar protecciones de forma general.

## Revisiones a 30, 60 y 90 días

La línea base de Search Console empieza el **11 de noviembre de 2026**. Las fechas siguientes se cuentan desde ese día; anotar por separado la fecha real de publicación de este PR para no atribuirle datos anteriores.

| Revisión | Fecha orientativa | Periodo y comprobación | Decisión |
| --- | --- | --- | --- |
| Días 0–7 | 11–18 nov. 2026 | Guardar descubiertas/indexadas, estado del sitemap y motivos de exclusión. Inspeccionar una portada y una ficha por idioma. | Investigar errores concretos; no cambiar rutas para forzar indexación. |
| Día 30 | 11 dic. 2026 | Exportar los primeros 28 días completos disponibles de rendimiento y revisar indexación. | Establecer la primera línea base real por idioma y actividad. |
| Día 60 | 10 ene. 2027 | Comparar los últimos 28 días completos con los 28 anteriores usando los mismos filtros. | Identificar páginas con exposición relevante y oportunidades de contenido o presentación. |
| Día 90 | 9 feb. 2027 | Repetir la comparación y contrastar con la línea base; revisar las 27 URL y sus exclusiones. | Priorizar fichas e idiomas según evidencia, sin prometer posiciones. |

En **Rendimiento → Resultados de búsqueda**, mantener el mismo tipo de búsqueda Web y activar clics, impresiones, CTR y posición media. Exportar tablas de consultas, páginas, países y dispositivos con periodo y filtros visibles. Separar consultas de marca (Amaru y variaciones reconocibles) de búsquedas genéricas. [Configuración del informe](https://support.google.com/webmasters/answer/7576553).

Agrupar las páginas así; el idioma de una URL no identifica el idioma o la nacionalidad del visitante:

- **EN:** `/` y las ocho fichas `/experiences/` de la raíz; excluir `/es/` y `/fr/`.
- **ES:** `/es/` y sus ocho fichas `/es/experiencias/`.
- **FR:** `/fr/` y sus ocho fichas `/fr/experiences/`.

Comparar por separado las tres portadas y las ocho familias de actividad. Conservar clics, impresiones, CTR, posición media, país, dispositivo y periodo de cada exportación. El CTR es clics/impresiones; no promediar porcentajes de filas para obtener el total. La posición media no es una posición fija y depende de la agrupación del informe. [Definiciones de métricas](https://support.google.com/webmasters/answer/7042828).

Si hay pocas impresiones, ampliar la observación antes de decidir por diferencias pequeñas de CTR. La temporada y la composición de consultas, países y dispositivos también influyen; una variación no prueba por sí sola el efecto de una edición. Search Console no mide consultas por WhatsApp: mantener un recuento comercial agregado separado y no calcular una tasa de conversión mezclando fuentes sin el mismo recorrido.

Después de publicar, medir portada y ficha representativa con [PageSpeed Insights](https://pagespeed.web.dev/) en móvil y escritorio, conservando fecha, URL y modo. Distinguir resultados de laboratorio de datos de usuarios reales cuando existan. Los metadatos, hreflang y datos estructurados favorecen una interpretación coherente; no garantizan indexación, apariencia especial ni posiciones en Google.
