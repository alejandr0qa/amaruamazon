# Activación y prueba real de opiniones · 17 de noviembre de 2026

El propietario aprobó la vista previa del PR #7 y autorizó Workers, D1 y Turnstile en sus planes gratuitos, manteniendo DNS y servicios de pago sin cambios. La integración real se probó **antes de publicar el cliente del sitio**. También se incorporó al PR #7 el catálogo equilibrado que ya estaba publicado mediante el PR #8.

## Recursos

| Recurso | Estado |
| --- | --- |
| Plan de la cuenta | Workers **Free**, $0, comprobado en el panel; no se cambió de plan |
| Worker | `amaru-traveller-reviews`, disponible en `https://amaru-traveller-reviews.amaruamazon-col.workers.dev` |
| D1 | `amaru-reviews`; migración `0001_reviews.sql` aplicada a la base remota |
| Turnstile | Widget «Amaru traveller reviews», modo Managed, únicamente `amaruamazonexperiences.com`, sin pre-clearance |
| Conservación | Cron `17 4 * * *` UTC, confirmado en la configuración remota |
| Administración | [Panel protegido](https://amaru-traveller-reviews.amaruamazon-col.workers.dev/admin) |

La dirección `amaruamazon-col.workers.dev` la creó Cloudflare al inicializar Workers en la cuenta. No se añadieron dominios personalizados, rutas de Workers al dominio, registros DNS, suscripciones ni servicios de pago. No se concedieron permisos DNS a Wrangler.

## Prueba previa a publicación

La evidencia estructurada está en [cloudflare-integration.json](review/2026-11-17/cloudflare-integration.json), con marcas UTC. La página temporal de prueba utilizó el mismo cliente `reviews.js`, el formulario de `src/reviews.mjs`, el Worker de producción y **D1 y Turnstile reales**. No utilizó el modo local ni claves dummy.

1. HTTPS del nuevo subdominio se verificó después de que Cloudflare completara su provisión. No se ignoraron errores de certificado ni se desactivó TLS.
2. Lectura pública HTTP 200, administración sin clave HTTP 401, origen ajeno HTTP 403 y preflight CORS correcto para el dominio de Amaru.
3. Un token inventado fue rechazado con HTTP 400. Un envío con Turnstile real fue aceptado y almacenado como `pending`, con consentimiento versionado y dos estrellas. No era visible en la lista pública.
4. Se intentó reenviar el token capturado del formulario: HTTP 400 `verification_failed`. Una verificación adicional del proveedor también lo rechazó con `invalid-input-response`; no se presenta esa respuesta como un código `timeout-or-duplicate`.
5. El administrador aprobó expresamente el registro técnico desde el panel real. La publicación conservó exactamente sus dos estrellas y texto. La API solo devolvió ID, experiencia, idioma, nombre público, calificación, comentario y fecha; no expuso consentimiento privado, hashes ni motivos de moderación.
6. Ocultar retiró la opinión; rechazar cambió su estado. El formulario de eliminación con código privado borró la opinión y su historial de moderación en D1 remoto.
7. Se confirmó **cero opiniones y cero registros de moderación** después de la limpieza. Se retiraron los contadores exclusivos de esta prueba inicial antes de abrir el sitio a envíos reales.
8. Se desplegó el Worker definitivo, sin la página ni los recursos temporales: `/preflight` y su configuración temporal devuelven 404. Se retiró el hostname de prueba de Turnstile y de los orígenes permitidos. Los envíos de reseñas solo aceptan el origen `https://amaruamazonexperiences.com`; el panel usa su propio origen y exige clave.

El registro se identificó siempre como **PRUEBA TÉCNICA CLOUDFLARE**, sin datos personales ni relato de un viaje. No se presentó como un testimonio auténtico y no se publicó en el dominio del sitio. Las capturas documentan únicamente esa prueba ya eliminada: [Turnstile real](review/2026-11-17/cloudflare-turnstile-real.png), [moderación real](review/2026-11-17/cloudflare-moderation-real.png), [eliminación real](review/2026-11-17/cloudflare-deletion-real.png).

El cron está configurado en Cloudflare. El manejador de conservación se probó localmente y sus consultas con SQLite; la ejecución automática remota se observará tras su primera hora programada. No se afirma haber observado ya ese disparo ni se sustituyen las métricas del edge por tiempos del equipo local.

## Claves y operación

Cloudflare conserva `ADMIN_TOKEN`, `RATE_SECRET` y `TURNSTILE_SECRET` como secretos del Worker. No se incluyeron en Git, el HTML, las capturas ni los informes. El cliente publica solamente la URL de la API y la sitekey de Turnstile, que es pública.

La copia privada de administración y recuperación está **fuera de la carpeta del repositorio**, dentro del perfil Windows del operador:

```powershell
Get-Content (Join-Path $env:LOCALAPPDATA 'Amaru\reviews\admin-token')
```

Copiar esa clave solo en el panel de administración HTTPS; no enviarla por chat ni incluirla en capturas. La misma carpeta contiene la copia privada de los secretos y datos del widget para recuperación. Respaldarla en un gestor privado. Las configuraciones de despliegue están ignoradas por Git; no contienen la clave administrativa ni la secret key de Turnstile. Las capacidades efímeras del registro técnico se eliminaron al concluir la prueba.

La clave de la vista previa local es distinta y sigue en `.codex-preview/reviews/admin-token`. Recargar el panel cierra la sesión porque la clave solo permanece en memoria. El procedimiento para revisar, aprobar, rechazar, ocultar y atender derechos está en [traveller-reviews.md](traveller-reviews.md).

## Comprobaciones de la entrega

Tras incorporar el catálogo publicado: generación y verificación de 42 páginas, nueve pruebas de servidor y cuatro escenarios de navegador correctos. Un fallo DNS transitorio al abrir una ficha pública se repitió y pasó; la ejecución completa final también pasó.

Se conservan las 42 URL, los tres idiomas, experiencias, itinerarios, fotografías, videos, filtros y WhatsApp. Canonical, hreflang, robots y sitemap no se modificaron. Los resultados de la revisión de indexación y las tres URL aún pendientes de identificar permanecen en el [informe de indexación](indexation-review-2026-11-17.md).
