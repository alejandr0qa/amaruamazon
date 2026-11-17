# Revisión de indexación · 17 de noviembre de 2026

El último rastreo del **14 de noviembre** procede del reporte del propietario. Han transcurrido tres días. Este trabajo comprueba el comportamiento público y las fuentes; no tiene acceso a la inspección autenticada de Search Console ni puede confirmar la canonical elegida por Google o garantizar indexación futura.

## Resultado individual

GET público directo, sin seguir redirecciones automáticamente; comprobación de robots, cabeceras, HTML inicial, sitemap público de 42 URL, enlaces de las 42 páginas, metadatos e idiomas equivalentes. Evidencia reproducible en [indexation.json](review/2026-11-17/indexation.json). Las cinco páginas también se abrieron en Chromium con JavaScript desactivado: H1 y contenido visibles, respuestas 200.

| URL | HTTP | Canonical | Hreflang | Sitemap | Enlaces entrantes HTML | Contenido principal aprox. | Decisión |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [Ojé EN](https://amaruamazonexperiences.com/experiences/oje-tree/) | 200 | Propia, única | EN/ES/FR y x-default; recíproco | Sí | 5 | 390 palabras | Conservar; seguimiento |
| [Canotaje FR](https://amaruamazonexperiences.com/fr/experiences/canoe-foret-inondee/) | 200 | Propia, única | EN/ES/FR y x-default; recíproco | Sí | 5 | 463 palabras | Conservar; seguimiento |
| [San Antonio FR](https://amaruamazonexperiences.com/fr/experiences/san-antonio-cacao-victoria-regia-paresseux/) | 200 | Propia, única | EN/ES/FR y x-default; recíproco | Sí | 5 | 540 palabras | Conservar; seguimiento |
| [Kayak FR](https://amaruamazonexperiences.com/fr/experiences/kayak-de-jour-amazonie/) | 200 | Propia, única | EN/ES/FR y x-default; recíproco | Sí | 6 | 473 palabras | Conservar; seguimiento |
| [Canotaje EN](https://amaruamazonexperiences.com/experiences/flooded-forest-canoeing/) | 200 | Propia, única | EN/ES/FR y x-default; recíproco | Sí | 5 | 427 palabras | Conservar; seguimiento |

Todas carecen de `noindex`/`nofollow` en meta y `X-Robots-Tag`. El robots público responde 200, permite `/` y referencia el sitemap correcto. Los enlaces entrantes son enlaces `<a href>` del HTML, incluidas portadas, relacionadas y navegación por idiomas; no dependen de abrir un modal. Los alternativos de cada experiencia responden 200 y tienen canonical propia. `x-default` señala la equivalente inglesa, no una portada diferente.

La extensión de texto es descriptiva, **no un umbral de calidad exigido por Google**. Se revisó la información concreta de cada actividad y no se encontró una deficiencia que justifique alargar por SEO:

- **Ojé:** raíces, caminata y terreno; las tres versiones distinguen el tramo aproximado de una a dos horas de la duración total por confirmar.
- **Canotaje EN y FR:** canoa entre vegetación y árboles, con acceso condicionado al nivel de agua; se diferencia de kayak diurno y de caminatas por tierra firme. Ambas son traducciones equivalentes, no duplicados canónicos entre sí.
- **San Antonio FR:** viaje hacia San Antonio del Cacao, Victoria Regia y posible observación de perezosos como una misma excursión; no se divide artificialmente ni promete fauna garantizada. Equivale a EN y ES.
- **Kayak FR:** actividad diurna de remo, paisaje fluvial y condiciones de corriente/equipo por confirmar; no se confunde con canotaje en bosque inundado. Equivale a EN y ES.

Título, descripción, H1, foto, contenido específico, consejos prácticos, contacto y enlaces relacionados se entregan en HTML inicial. El contenido no depende del reproductor de video ni de JavaScript. No se identificaron errores de representación en las cinco aperturas públicas sin JS.

**No se aplicaron correcciones SEO:** se conservan URL, canonical, hreflang, robots y sitemap. La incorporación de opiniones y su aviso de privacidad son cambios funcionales independientes de este diagnóstico.

## Alternativas y redirecciones conocidas

| URL reportada | Resultado observado | Interpretación |
| --- | --- | --- |
| [ES con camp](https://amaruamazonexperiences.com/es/?experience=camp) | 200; canonical `https://amaruamazonexperiences.com/es/` | Parámetro intencional para preseleccionar la consulta; no debe indexarse por separado. |
| [EN con tarapoto](https://amaruamazonexperiences.com/?experience=tarapoto) | 200; canonical `https://amaruamazonexperiences.com/` | Mismo patrón intencional. |
| [HTTP FR](http://amaruamazonexperiences.com/fr/) | 301 hacia HTTPS de la misma ruta; destino 200 y canonical propia | Normalización de protocolo intencional; no solicitar indexación de HTTP. |
| [HTTP ES](http://amaruamazonexperiences.com/es/) | 301 hacia HTTPS de la misma ruta; destino 200 y canonical propia | Mismo patrón intencional. |

Las URL con parámetros y HTTP no se añadieron al sitemap. No se solicitaron indexaciones ni se cambiaron redirecciones.

**Pendiente, por instrucción del propietario:** otras dos alternativas con canonical y una redirección todavía no identificadas. Revisarlas cuando se copien sus URL exactas desde Search Console; no inferir cuáles son ni declarar comprobadas las siete. Este pendiente no bloquea el sistema de comentarios ni la revisión de las cinco páginas.

## Seguimiento recomendado

Revisar de nuevo entre el **28 de noviembre y el 5 de diciembre de 2026** (dos a tres semanas después del rastreo informado). No se creó una automatización. En Search Console, inspeccionar cada URL limpia y anotar fecha, último rastreo, estado, indexación permitida, canonical declarada y elegida por Google; usar la prueba en vivo si aparece un bloqueo. El estado puede cambiar mientras se revisa un sitio reciente.

Si el estado persiste varias semanas, comparar el HTML que ve Google con el público y revisar evidencia nueva de utilidad y diferenciación. No crear duplicados, cambiar canonical, renombrar slugs ni repetir solicitudes de indexación como respuesta automática a la espera. Google explica que el rastreo puede tardar días o semanas y que solicitarlo no garantiza inclusión ni que repetir solicitudes lo acelere: [documentación de recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). El estado específico debe verificarse con Inspección de URL: [informe de indexación](https://support.google.com/webmasters/answer/7440203).

Para repetir la comprobación técnica:

```powershell
npm run audit:indexation -- 'https://amaruamazonexperiences.com/es/?experience=camp' 'https://amaruamazonexperiences.com/?experience=tarapoto' 'http://amaruamazonexperiences.com/fr/' 'http://amaruamazonexperiences.com/es/'
```
