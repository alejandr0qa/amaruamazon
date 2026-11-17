# Validación de comentarios e indexación

Fecha: 17 de noviembre de 2026. La vista previa usa el runtime de Wrangler y D1 local; no es una API simulada en memoria. Las pruebas de servidor usan además SQLite real con un adaptador de D1 para comprobar consultas, restricciones, transacciones y borrado en cascada.

## Resultado

| Comprobación | Resultado |
| --- | --- |
| Generación y verificaciones del sitio | 3 portadas + 39 fichas; 42 URL preservadas mediante inventario de referencia; SEO localizado, enlaces y WhatsApp correctos |
| Servidor | 9 pruebas aprobadas; seguridad, moderación, borrado, paginación y conservación |
| Navegador Chromium | 4 escenarios aprobados, incluidos los tres idiomas y la API D1 local real |
| Accesibilidad automatizada | Sin infracciones axe en el formulario ES móvil, ficha FR móvil y panel de administración revisados |
| Representación pública sin JS | Las cinco URL responden 200 y muestran H1/contenido |
| Turnstile | Respuestas reales de claves oficiales dummy: aceptación, rechazo y token reutilizado; controles estrictos de hostname/action con respuestas controladas |
| Cron | Invocación local del manejador de conservación: HTTP 200; caducidad de datos verificada también con SQLite |
| Empaquetado Worker | `wrangler deploy --dry-run`: correcto, sin desplegar; aproximadamente 35 KiB / 12,8 KiB gzip |
| Dependencias | `npm audit`: cero vulnerabilidades conocidas en las dependencias instaladas en esta revisión |

Pruebas de servidor: ningún envío pasa directamente a público; conservación exacta del texto y estrellas negativas; lista explícita de campos públicos; consentimiento y versión requeridos; catálogo e idioma validados; límites de tamaño incluso sin Content-Length; JSON malformado; origen ajeno, CSRF y administración sin clave; bloqueo del modo de vista previa en URL remota; Turnstile caducado/reutilizado, acción y hostname incorrectos, indisponibilidad; límite por identificador temporal protegido; borrado con código correcto/incorrecto; eliminación por administrador; paginación sin duplicados; conflicto entre decisiones; indicadores de spam/duplicados y datos personales sin aprobación automática; conservación y purga de contadores.

Pruebas de navegador: consentimiento inicialmente sin marcar y validación nativa; envío ES/EN/FR; aprobación explícita de una crítica de una estrella; comprobación de texto con caracteres HTML sin ejecución; ocultación y borrado; panel sin sesión persistente; selección de la experiencia de la ficha; contenido público sin JS; ausencia de peticiones iniciales a API, Turnstile o MP4; error de red con texto conservado y mensaje traducido; configuración desactivada con alternativa por correo; carga de Turnstile al abrir, expiración, recuperación y reset tras fallo. En móvil se comprobó que no hay desbordamiento horizontal y que funcionan controles nativos de teclado.

Estas pruebas automatizadas no sustituyen una auditoría completa de accesibilidad o seguridad ni una prueba de carga. Tras la autorización del propietario se completó también la [integración real con Worker, D1 y Turnstile](../../cloudflare-activation-2026-11-17.md), antes de publicar el cliente. El consumo de CPU/cuotas del edge requiere seguimiento operativo. Las claves dummy oficiales responden `example.com` sin `action`; no se debilitaron los controles de producción para hacerlas pasar.

## Rendimiento y preservación

La medición comparativa está en [performance.json](performance.json): tres ejecuciones alternadas, contextos nuevos, móvil 390×844, CPU 4×, latencia 150 ms y descarga 200 000 bytes/s. Son datos de laboratorio con servidor local sin compresión, no Core Web Vitals de usuarios reales ni una garantía de tiempos en producción.

Se detectó y corrigió una carga anticipada de CSS/JS de opiniones que competía con la portada. Solo un cargador pequeño permanece en la carga inicial; configuración, estilos y cliente de opiniones se descargan cerca de la sección. Turnstile se descarga al abrir el formulario. La comparación conserva valores de cada ejecución y medianas para que pueda revisarse su variabilidad; no se presenta como una mejora SEO ni se infiere un resultado de campo.

Medianas finales: LCP de 4932 a 4684 ms y primer pintado de 4332 a 4236 ms; CLS de 0,000033 a 0. La carga inicial suma un archivo de 1165 bytes (525 gzip), más unos 2 KiB gzip de HTML. Los recursos de opiniones completos permanecen por debajo del presupuesto de 6 KiB gzip, y no hubo solicitudes iniciales a API, Turnstile o videos. La variabilidad de estas ejecuciones impide atribuir una mejora de tiempos al cambio.

No hay cambios en `CNAME`, sitemap, robots, estilos existentes, catálogo, itinerarios, fotografías, fuentes, videos, scripts de WhatsApp ni reproductor. El chequeo de medios vuelve a validar los hashes originales publicados, tamaño, ausencia de audio y faststart. Los HTML cambian para incorporar opiniones/privacidad y actualizar versiones de recursos. El inventario de preservación se amplió de las 27 rutas históricas a las 42 presentes al comenzar esta tarea.

Capturas con datos técnicos explícitos, eliminados tras cada prueba: [formulario escritorio](reviews-desktop.png), [formulario móvil](reviews-mobile.png), [ficha FR móvil](reviews-experience-fr-mobile.png) y [moderación pendiente](moderation-pending.png). En las capturas de sección se ocultaron temporalmente la cabecera fija y el botón flotante para evitar su superposición al capturar un elemento alto; la interfaz del sitio conserva ambos.

Evidencia adicional: [indexación y alternativas conocidas](indexation.json), [representación y peticiones](browser-evidence.json), [axe](accessibility-reviews.json), [servicio Turnstile](turnstile-service.json) y [cron local](cron.json). Las tres URL restantes de Search Console están pendientes, por decisión del propietario, en el [informe de indexación](../../indexation-review-2026-11-17.md).

## Repetir

Con la vista previa abierta en otra terminal:

```powershell
npm run build
npm run check
npm run test:reviews
npx playwright install chromium
npm run test:browser
node scripts/check-turnstile-service.mjs
node scripts/measure-reviews.mjs
npx wrangler deploy --dry-run --outdir .codex-preview/worker-bundle --config cloudflare/reviews/wrangler.jsonc
npm audit
```

`test:browser` limpia **solo la base D1 local** antes de probar y crea/elimina registros técnicos. No usarla para conservar opiniones de prueba propias. La comprobación de las cinco páginas públicas requiere Internet. `measure-reviews.mjs` usa como referencia `52b37379ff1f10ec0fb32fa906f727e19a106a77`, el estado de partida de esta rama. No ejecutar pruebas y mediciones de rendimiento simultáneamente.
