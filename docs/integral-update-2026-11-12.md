# Amaru — actualización integrada para revisión

Rama `codex/amaru-integrated-evolution`, continuación del [PR #6](https://github.com/alejandr0qa/amaruamazon/pull/6), sobre su revisión `7b4dd72`. No se modifica `main`, DNS, Cloudflare ni GitHub Pages. Vista previa local: [español](http://127.0.0.1:8077/es/), [inglés](http://127.0.0.1:8077/), [francés](http://127.0.0.1:8077/fr/). Requiere que siga activo el servidor local; para reiniciarlo, ejecutar `python -m http.server 8077 --bind 127.0.0.1` desde la raíz del repositorio.

## Resultado y catálogo

El problema principal era la lectura: categorías de 11 px, descripciones de 15 px, etiquetas de 13 px y FAQ de 15 px. La capa compartida ahora utiliza cuerpo de 17 px, descripciones de 16–16,5 px, categorías de 14 px, navegación de 16 px, etiquetas de 15 px y campos de 16 px. Las FAQ usan preguntas de 17–18 px y respuestas de 16,5–17 px. Se conservan Manrope/Cormorant Garamond, el logotipo y sus tamaños responsivos. En portátil la cabecera pasa de aproximadamente 89 a 81 px. Se reducen separaciones, se refuerza el verde y se reorganizan las FAQ en dos columnas independientes, una en móvil. «Vista rápida» y «Ver experiencia completa» tienen una jerarquía distinta y conservan sus funciones.

| Antes | Resultado en esta rama |
| --- | --- |
| Lago Tarapoto | Conservado; navegación, fauna sin garantía y preparación práctica. Clip bajo demanda. |
| Kaya / kayak diurno | Conservado y separado del canotaje. |
| Aves | Conservada como salida individual; exigencia orientativa moderada y fotografía nueva. |
| Cacao | Cultivo y elaboración de chocolate; degustación/recuerdo sujetos a propuesta. Clip del secado. |
| Caminata nocturna | **Wochine + caminata nocturna**, una sola experiencia confirmada por el propietario, en la misma URL. |
| Noche en la selva | Conservada; hamaca/mosquitero, esfuerzo alto y diferencias frente a la caminata con regreso. |
| Encuentros culturales | Conservados; sin atribuir anfitriones ni comunidades concretas sin validación. |
| Caminatas de selva y fauna | Conservadas; enlazan alternativas concretas sin convertirlas en inclusiones. |
| Sin ficha propia | **City Tour de Puerto Nariño:** caminar, Natütama y mirador, accesos por confirmar. |
| Sin ficha propia | **Árbol Ojé:** sendero y raíces; marcha aproximada de 1–2 h según el documento, no duración total. |
| Sin ficha propia | **Caimanes de noche:** embarcación y observación respetuosa. Foto contextual de atardecer identificada como tal. |
| Sin ficha propia | **Canotaje en selva inundada:** condiciones del agua, equilibrio y remada; independiente de Kaya. |
| Sin ficha propia | **San Antonio del Cacao:** excursión fluvial, Victoria Regia y perezosos en una sola propuesta, distinta de la elaboración del cacao. |

**13 experiencias, tres itinerarios y tres idiomas: 42 URL. Las 27 originales y las doce de la entrega anterior permanecen.** San Antonio del Cacao se incorpora como una sola excursión desde Puerto Nariño hacia la zona peruana de la isla Cacao, con Victoria Regia y posibilidad de observar perezosos, basada en la página 5 del PDF y la aclaración del propietario. La decisión anterior de aplazarla queda reemplazada. Cerámica no se publica.

La historia de dos viajeros, llegada por Leticia/río, efectivo y preparación personal, recomendación flexible de cinco días/cuatro noches, equipo y servicios coordinables se integran en los bloques existentes. Transporte, alojamiento, comidas y equipo dependen de la propuesta contratada. No se publican precios, medicamentos recomendados, avistamientos garantizados ni certificaciones o reseñas inventadas. El componente de testimonios queda preparado, vacío y protegido por validaciones de autorización y atribución.

## Multimedia e identidad

Inventario recursivo: **288 archivos, 270 fotos y 18 videos, 244 contenidos únicos**. Se revisaron todas las fotografías y muestras de los 18 videos. No se borran duplicados ni originales. Las seis fotos incorporadas tienen variantes de 480/800/1200 px, proporción estable y copyright inferior. Las imágenes anteriores se conservan; la nueva foto de aves mejora su tarjeta y ficha.

| Clip | Original | Optimizado | Duración |
| --- | ---: | ---: | ---: |
| Canotaje | 66.751.980 B | 1.633.189 B | 8 s |
| Tarapoto | 65.967.327 B | 1.458.768 B | 10 s |
| Secado del cacao | 11.690.571 B | 1.160.920 B | 5,5 s |
| Perezoso en San Antonio | 130.445.872 B | 1.327.709 B | 8 s |

H.264, 396×720, 24 fps, sin audio, `faststart`, portada WebP y franja inferior. **No existe reproductor ni petición MP4 al abrir la ficha**: el botón lo crea al pulsarlo. Hay controles y enlace alternativo, también sin JavaScript. No se utiliza material de manipulación/alimentación de fauna. [Inventario, selección y trazabilidad](media-inventory-2026-11-12.md), [tamaños y huellas](media-optimization-2026-11-12.json).

[Comparación de los seis logotipos del Word con el actual](review/2026-11-12/logo-options.jpg). Se conserva el actual. Las opciones circulares extraídas tienen solo 287–300 px; `image4.png` contiene un damero dibujado, no transparencia real. Para cambiarlo conviene recibir un original vectorial o de alta resolución y aprobación expresa. Favicon y archivos de marca actuales se conservan.

## Validación

- `npm ci`: correcto, dos paquetes de desarrollo, cero vulnerabilidades reportadas; sin dependencias añadidas.
- Checkout limpio independiente de Windows: `check` correcto antes y después de `build`, sin diferencias ni archivos modificados al terminar. [Evidencia](review/2026-11-12/clean-checkout.json).
- `npm run build` y `npm run check`: correctos en Windows. Pruebas ampliadas a las 42 URL, preservación explícita de las 27 anteriores, títulos/descripciones, canonical, Open Graph/Twitter, JSON-LD, cuatro alternancias hreflang por URL, sitemap/robots, enlaces/anclas/recursos, correo y mensajes de WhatsApp. El generador mantiene HTML estático completo. `.gitattributes` fija LF para las fuentes y salidas generadas: evita cambios aparentes CRLF/LF al compilar en un checkout limpio de Windows, sin cambiar la configuración global de Git.
- Pruebas de video: integridad SHA-256, tamaño/resolución, faststart, descarga solo por acción, controles y alternativa de error. Testimonios: colección vacía y rechazo de entradas sin autorización o datos completos.
- HTTP actual: **42 páginas y 44 recursos distintos referenciados directamente responden 200**; se conservaron también las 39 URL de la revisión anterior. Las variantes `srcset` también se comprueban en las pruebas de archivos. [Evidencia actual de HTTP e integridad](review/2026-11-12/san-antonio-validation.json).
- Navegador: **156 comprobaciones previas de página** (39 × cuatro resoluciones solicitadas), sin desbordamiento horizontal ni H1 duplicado; tres idiomas y tamaños de logo conservados. Inspección visual de portada, tarjetas, FAQ, menú móvil y ficha con video. Formularios principales EN/ES/FR: actividad nueva preseleccionada, viajeros/fecha/idioma/notas en el mensaje, enlace correcto, invalidación al editar y rechazo de viajeros inválidos. No se enviaron mensajes. [Matriz](review/2026-11-12/browser-matrix.json), [formularios](review/2026-11-12/browser-functions.json).
- **Zoom real al 125 %: validado manualmente por el propietario el 12 de noviembre de 2026**, sin textos cortados ni solapamientos. La comprobación queda cerrada con su confirmación explícita y autorización para integrar el PR #6. No se atribuye este resultado a la automatización, que no pudo completar la prueba nativa. La lógica existente de `main.js` y `experience.js` permanece sin cambios.

| Lighthouse 13.0.1 local | Rendimiento | Accesibilidad automática | Buenas prácticas | SEO |
| --- | ---: | ---: | ---: | ---: |
| ES móvil anterior (`7b4dd72`) | 76 | 100 | 100 | 100 |
| ES móvil actual | 79 | 100 | 100 | 100 |
| EN móvil actual | 79 | 100 | 100 | 100 |
| FR móvil actual | 79 | 100 | 100 | 100 |
| Canotaje ES móvil | 92 | 100 | 100 | 100 |
| ES escritorio actual | 97 | 100 | 100 | 100 |
| San Antonio ES móvil | 89 | 100 | 100 | 100 |

Pruebas secuenciales, Chrome headless y servidor Python local sin compresión HTTP. Portadas móviles: LCP cercano a 5,1 s, CLS 0; canotaje: LCP 3,17 s, CLS 0; escritorio: LCP 1,27 s. Ninguna apertura auditada descargó MP4. La diferencia entre 76 y 79 es una muestra de laboratorio, no una mejora estadística demostrada ni un resultado de producción. Accesibilidad 100 cubre comprobaciones automáticas; no equivale a certificación. [Resultados fechados](review/2026-11-12/lighthouse-summary.json). Auditar de nuevo con PageSpeed tras publicar para evaluar el dominio con compresión/caché reales.

## Comparativas y revisión

| Vista | Antes | Ahora |
| --- | --- | --- |
| Portátil 1366×768 | [Portada](review/2026-11-12/antes-portatil-portada.jpg) · [Tarjetas](review/2026-11-12/antes-portatil-catalogo.jpg) · [FAQ](review/2026-11-12/antes-portatil-faq.jpg) | [Portada](review/2026-11-12/despues-portatil-portada.jpg) · [Tarjetas](review/2026-11-12/despues-portatil-catalogo.jpg) · [FAQ](review/2026-11-12/despues-portatil-faq.jpg) |
| Móvil 390×844 | [Portada](review/2026-11-12/antes-movil-portada.jpg) | [Portada](review/2026-11-12/despues-movil-portada.jpg) · [Video activado](review/2026-11-12/despues-movil-video.jpg) |
| Escritorio 1920×1080 | [Portada EN](review/2026-11-12/antes-escritorio-portada.jpg) | [Portada EN](review/2026-11-12/despues-escritorio-portada.jpg) |
| Tableta 768×1024 | — | [FAQ FR](review/2026-11-12/despues-tableta-fr-faq.jpg) |

Las capturas muestran el viewport efectivo, incluida su barra de desplazamiento. Las páginas mantienen el carrusel; su diapositiva puede variar entre capturas. La matriz se capturó antes de una corrección de espacios semánticos entre palabras del H1, sin cambiar su presentación.

**Para el equipo:** confirmar datos operativos por salida, incluida San Antonio (duración total, encuentro, equipo e inclusiones); relación definitiva de Kaya con canotaje y vigencia de las propuestas culturales/generales; duración total, acceso, restricciones, equipos e inclusiones de cada salida (incluida degustación/recuerdo, pesca o baño si se quieren anunciar); identidad/RNT/guías y condiciones comerciales verificables; testimonios con permiso y eventual variante de logo. Confirmar funcionamiento real del buzón corporativo. Los precios siguen en la cotización privada.

Tras aprobar el PR: publicar mediante el flujo habitual, comprobar las 42 URL en el dominio y el sitemap, y continuar el [seguimiento Search Console a 30/60/90 días](google-search-console.md). No se accedió a la cuenta. El dato aportado por el propietario sigue siendo 27 páginas descubiertas el 11 de noviembre; no se afirma que estén indexadas ni que las quince nuevas ya estén publicadas.

## Incorporación de San Antonio tras la aclaración del propietario

La ficha ya se desarrolla sin bloqueo administrativo. Comparte la navegación, Victoria Regia y la posibilidad de observar perezosos en un solo producto, con portada de Victoria Regia, foto secundaria del perezoso y clip de 8 s / 1.327.709 B. Imágenes reales, copyright inferior, reproducción bajo demanda y sin audio. Los datos no confirmados se limitan a la operación concreta de la salida. No se inventan requisitos fronterizos ni inclusiones; una recomendación documental específica para extranjeros se incorporará si el equipo la aporta y se verifica.

La evidencia anterior de 39 páginas y 156 comprobaciones de navegador corresponde a la entrega previa a esta incorporación y se conserva con su alcance original. Los resultados actuales se añaden en [san-antonio-validation.json](review/2026-11-12/san-antonio-validation.json), incluida la compilación de las 42 páginas en un checkout limpio de Windows sin diferencias al terminar. Capturas: [portátil](review/2026-11-12/san-antonio-portatil.jpg), [móvil](review/2026-11-12/san-antonio-movil.jpg) y [video](review/2026-11-12/san-antonio-video.jpg). El resumen Lighthouse conserva las auditorías previas y añade la nueva ficha por separado.

Comprobación actual de San Antonio: 24 vistas (las tres fichas nuevas y las tres portadas en cuatro resoluciones), sin desbordamiento ni H1 duplicado. Formulario principal y consulta rápida EN/ES/FR incorporan la experiencia correctamente; no se enviaron mensajes. El clip se reprodujo con controles, 396×720, 8 s y sin error. Lighthouse móvil de la nueva ficha: rendimiento 89, accesibilidad automática/buenas prácticas/SEO 100, CLS 0 y ninguna petición MP4 inicial. [Evidencia de navegador](review/2026-11-12/san-antonio-browser.json).
