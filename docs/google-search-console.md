# Google: publicación, verificación e indexación

Preparado el 11 de noviembre de 2026. No se ha accedido a una cuenta de Google ni cambiado DNS, Cloudflare o GitHub Pages. Search Console no requiere activar analítica en la web.

## Antes de enviar el sitemap

Integrar primero el PR revisado y esperar a que GitHub Pages publique esa revisión. Comprobar las 27 URL públicas: tres portadas y ocho experiencias por idioma. El sitemap con las páginas nuevas debe estar disponible en `https://amaruamazonexperiences.com/sitemap.xml`; no enviarlo como si ya estuviera publicado mientras el cambio siga en una rama.

Verificar respuestas HTTPS 200, canonical propio, ausencia de `noindex`, recursos accesibles y enlaces de idioma equivalentes. `robots.txt` debe permitir rastreo y señalar el sitemap. La comprobación técnica facilita el rastreo; no confirma la indexación real ni una posición en Google.

## Pasos que necesita realizar el propietario

1. Entrar en [Google Search Console](https://search.google.com/search-console/) con la cuenta que administrará Amaru. Si la propiedad ya existe, seleccionarla y revisar su estado de verificación.
2. Si no existe, añadir una propiedad de tipo **Dominio** con `amaruamazonexperiences.com`, sin protocolo ni rutas.
3. Copiar el TXT exacto que Google proporcione. En la zona autoritativa de Cloudflare, añadir un registro **TXT**, nombre **@**, con ese valor, conservando los registros existentes. Volver a Google y pulsar **Verificar**. No compartir contraseñas ni inventar un token; conservar el TXT después de verificar. Este cambio queda a cargo del propietario o de una tarea expresamente autorizada. [Verificación oficial](https://support.google.com/webmasters/answer/9008080).
4. Si se decide no modificar DNS, la alternativa es una propiedad **Prefijo de URL** para `https://amaruamazonexperiences.com/` y el método de archivo HTML que Google ofrezca. En ese caso entregar el archivo original para incluirlo en la raíz del repositorio y publicarlo. No sustituir `index.html` ni colocar el código solo en el HTML generado. Esta alternativa verifica ese prefijo, no la propiedad Dominio. [Métodos de verificación](https://support.google.com/webmasters/answer/9008080).
5. Con la propiedad verificada y la versión publicada, abrir **Sitemaps**, enviar `https://amaruamazonexperiences.com/sitemap.xml` y comprobar que Google lo puede leer. No hay que enviar un sitemap distinto por idioma. [Documentación de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Inspección posterior a la publicación

En **Inspección de URL**, revisar `/`, `/es/`, `/fr/` y una experiencia por idioma. Ejecutar la prueba de URL publicada y revisar el HTML renderizado. Pedir indexación para las páginas prioritarias; el sitemap permite descubrir el resto. En el informe de la versión indexada, comparar la canonical declarada con la seleccionada por Google. Una prueba en directo favorable o una solicitud no garantizan que Google indexe la página. [Inspección de URL](https://support.google.com/webmasters/answer/9012289).

Si Google o sus herramientas reciben un desafío, 403 o 5xx, revisar los eventos de Cloudflare con el administrador antes de cambiar reglas. No desactivar protecciones de forma general. Aquí no se han modificado esas reglas.

Las traducciones tienen canonical propio y hreflang recíproco, incluido `x-default` en inglés. Los selectores cambian a la misma experiencia en el otro idioma. [Versiones localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Seguimiento

- Revisar en Search Console las páginas indexadas, exclusiones, consultas, impresiones y clics por página y país cuando haya datos. No son métricas de consultas recibidas por WhatsApp.
- Medir la versión publicada con [PageSpeed Insights](https://pagespeed.web.dev/) en móvil y escritorio. Las pruebas locales de esta fase no sustituyen métricas de visitantes reales ni una auditoría Lighthouse.
- Comprobar los datos estructurados publicados. `Service` describe la experiencia y `BreadcrumbList` su navegación; no se añaden ofertas ni valoraciones ficticias, ni se promete una apariencia especial en Google. [Reglas de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- Revisar resultados antes de ampliar idiomas o crear artículos. El posicionamiento necesita contenido validado, publicación y seguimiento; no se ha estimado un puesto ni un plazo de resultados.
