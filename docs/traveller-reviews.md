# Opiniones de viajeros: vista previa y operación

Preparado el 17 de noviembre de 2026. Rama `codex/traveller-reviews-indexation`. El propietario autorizó la activación tras revisar la vista previa. Worker, D1 y Turnstile Free están creados y la integración real pasó antes de publicar el cliente. No se modificó DNS ni se activaron planes de pago. [Recursos, prueba real y acceso de administración](cloudflare-activation-2026-11-17.md).

## Probar en desarrollo

Requisitos: Node.js 24 y npm. Desde la raíz del proyecto:

```powershell
npm ci
npm run build
npm run check
npm run preview:reviews
```

Abrir [vista previa ES](http://127.0.0.1:8077/es/#traveller-reviews), [EN](http://127.0.0.1:8077/#traveller-reviews), [FR](http://127.0.0.1:8077/fr/#traveller-reviews) y [administración local](http://127.0.0.1:8787/admin). Las 39 fichas también ofrecen el formulario, con su experiencia preseleccionada y opiniones filtradas por experiencia.

El arranque aplica migraciones **solo a D1 local** y crea claves aleatorias ignoradas por Git. Para entrar en administración, copiar la clave desde el archivo local:

```powershell
Get-Content .codex-preview/reviews/admin-token
```

La vista previa indica expresamente que son pruebas y que no envía datos a Amaru. La verificación simulada solo funciona cuando el Worker está en entorno `local` y su URL usa loopback. En producción se rechaza esa configuración. No exponer el servidor de desarrollo ni sus puertos a Internet. El servidor está ligado a `127.0.0.1` y no sirve fuentes privadas, claves o archivos D1.

No hay opiniones precargadas. Las pruebas crean registros identificados como técnicos y los eliminan. No presentar esos registros como testimonios reales.

## Lo que ve el viajero

- Sección «Experiencias de nuestros viajeros», traducida en EN y FR; invita a escribir aunque todavía no haya opiniones aprobadas. La lista permanece oculta mientras no haya resultados; no se muestran estrellas agregadas, testimonios ficticios ni Schema de valoraciones.
- Experiencia del catálogo, nombre público o seudónimo, una a cinco estrellas y texto de 20 a 2000 caracteres. No se pide correo, teléfono, documento ni número de reserva.
- Aviso del responsable, finalidad, proveedor, conservación y derechos; consentimiento obligatorio sin premarcar. El consentimiento versionado y su fecha quedan en D1, junto al idioma del envío.
- Cada envío queda `pending`, incluso si no hay indicadores de spam. La API pública solo selecciona `approved` y devuelve una lista explícita de campos publicables.
- Recibo con ID y código privado de borrado. Copiarlo antes de cerrar la página: no se guarda en cookies ni en almacenamiento del navegador. En D1 solo se conserva el hash del código.
- Puede borrar desde «Eliminar mi opinión», en cualquiera de las tres portadas o fichas, o solicitar atención por `info@amaruamazonexperiences.com` si perdió el código.
- Si falla la conexión, se conserva el texto en la página y se informa en el idioma correspondiente. Antes de activar la infraestructura, el formulario permanece deshabilitado y ofrece contacto por correo. Un correo recibido no se publica sin autorización y revisión.

Las reseñas se muestran en su idioma original, con la interfaz traducida. No se traducen automáticamente ni se alteran para mejorar la valoración. El orden público es por envío, sin privilegiar las puntuaciones altas.

## Moderación sencilla

1. Abrir `https://<worker>.workers.dev/admin` y pegar la clave de administración recibida por un medio privado. La clave permanece en memoria de esa pestaña; recargar o salir cierra la sesión. No usar dispositivos compartidos ni extensiones que no sean de confianza.
2. En «Pendientes», revisar la opinión original, su experiencia, estrellas, idioma, consentimiento e indicadores. Los indicadores de enlaces, caracteres repetidos, posibles datos personales y texto duplicado son señales para revisión humana, no veredictos de fraude.
3. Escribir un motivo y elegir «Aprobar», «Rechazar» u «Ocultar». Las decisiones se registran con fecha. No hay controles para editar el nombre, texto o estrellas. Si hay datos sensibles o un error que corregir, pedir al autor una nueva opinión y tramitar el borrado de la anterior; no cambiar su sentido.
4. Admitir críticas legítimas. Rechazar u ocultar solo con motivo documentado, por ejemplo spam, suplantación con evidencia, información personal de terceros o contenido ajeno a una experiencia. Una estrella baja no es motivo de rechazo. La herramienta no afirma verificar automáticamente una reserva.
5. Para retirar una publicación, filtrar «Aprobadas» y usar «Ocultar». Para una solicitud de eliminación, comprobar la autoría por el código o información mínima de la reserva que ya tenga Amaru, indicar el motivo y elegir «Eliminar datos». Ese borrado es definitivo en la base activa y elimina también su historial asociado; no conservar una copia manual.
6. Usar «Actualizar» si aparece un conflicto de decisión: otra pestaña pudo modificarla. «Ver más» permite continuar más allá de 25 opiniones por estado. La lista pública pagina de 12 en 12.
7. Pulsar «Salir». Rotar la clave si se comparte accidentalmente. Es una administración sencilla para un operador: no ofrece cuentas individuales ni atribución de decisiones a distintas personas. Si aumenta el equipo, evaluar autenticación individual antes de compartir acceso ampliamente.

La lista pública usa `no-store`: una ocultación o eliminación se refleja en la siguiente carga, sin esperar una caché del Worker. Una pestaña que ya mostraba un texto debe actualizarse.

## Conservación y datos

La política implementada conserva pendientes, rechazadas y ocultas hasta 90 días desde su última decisión y aprobadas hasta 730 días desde el envío. Una tarea diaria a las 04:17 UTC (23:17 del día anterior en Colombia) elimina los registros vencidos; puede tardar hasta un día adicional en condiciones normales. Una revocación se puede atender inmediatamente con borrado. Los identificadores de limitación de abuso se derivan con secreto e intervalo horario; nunca se guarda la IP en las tablas de opiniones. Caducan en una o dos horas y se purgan diariamente.

El cuerpo de opiniones, los códigos privados, las IP y las claves no se escriben en los logs de la aplicación. La observabilidad del Worker está desactivada. Cloudflare recibe datos técnicos para prestar el servicio y Turnstile; el aviso enlaza su política. D1 Free tiene recuperación Time Travel de hasta siete días: un dato borrado puede permanecer en esas copias hasta expirar. Si se restaura una copia, repetir las eliminaciones recibidas desde ese punto **antes** de reabrir la publicación. No exportar copias con datos personales al repositorio.

Revisar estos plazos y el contacto con el responsable de Amaru antes de activar el sistema. La política del formulario y la del diálogo general ya distinguen consultas de viaje por WhatsApp de opiniones almacenadas. Cambiar el aviso de consentimiento requiere cambiar su versión tanto en `src/reviews.mjs`/cliente como en el Worker y probar la migración de comportamiento.

## Activación autorizada y referencia de despliegue

Arquitectura: GitHub Pages conserva las mismas 42 URL; un Worker independiente en `workers.dev` recibe y sirve opiniones; una D1 almacena registros y moderación; un widget Turnstile protege el envío. **No requiere DNS nuevo, rutas del dominio ni servicios de pago.** El cliente solo usa HTTPS al hablar con una API remota.

Se activaron con autorización del propietario: un Worker Free `amaru-traveller-reviews`, una D1 Free `amaru-reviews`, un widget Turnstile Free y un cron diario. Los pasos siguientes describen el procedimiento; **no repetir la creación de recursos** en la cuenta ya configurada. Para operación actual, consultar el [informe de activación](cloudflare-activation-2026-11-17.md).

1. Confirmar cuenta y plan Free, acceso del administrador, correo de derechos operativo y política/plazos aprobados. Confirmar o habilitar el subdominio `workers.dev` de esa cuenta, sin modificar el DNS del sitio.
2. Crear una D1 y copiar `cloudflare/reviews/wrangler.jsonc` a `cloudflare/reviews/wrangler.production.jsonc` (ignorado por Git). Sustituir el ID de ceros por el ID real. Mantener `ENVIRONMENT=production`, el origen exacto `https://amaruamazonexperiences.com` y ese hostname de Turnstile. No añadir localhost a producción.
3. Crear un widget Turnstile Managed para `amaruamazonexperiences.com`, sin pre-clearance. Copiar su sitekey pública y conservar su secret key exclusivamente como secreto del Worker.
4. Generar dos valores aleatorios independientes de 32 bytes o más para `ADMIN_TOKEN` y `RATE_SECRET`. Guardarlos en un gestor privado. Ninguna clave privada va en Git, HTML, `reviews-config.js`, capturas o cuerpo del PR. La sitekey de Turnstile y la URL del Worker sí son públicas.
5. Comandos de referencia de la activación autorizada, desde la raíz:

```powershell
npx wrangler login
npx wrangler d1 create amaru-reviews
# Actualizar el ID real en la configuración de producción ignorada.
npx wrangler d1 migrations apply amaru-reviews --remote --config cloudflare/reviews/wrangler.production.jsonc
npx wrangler deploy --config cloudflare/reviews/wrangler.production.jsonc
npx wrangler secret put ADMIN_TOKEN --config cloudflare/reviews/wrangler.production.jsonc
npx wrangler secret put RATE_SECRET --config cloudflare/reviews/wrangler.production.jsonc
npx wrangler secret put TURNSTILE_SECRET --config cloudflare/reviews/wrangler.production.jsonc
```

6. La prueba con Turnstile real verificó los controles de hostname y `action=review`, almacenamiento pendiente, aprobación, ocultación, rechazo y borrado; también origen ajeno, administración protegida y tokens inválidos. El cron remoto está configurado y su primer disparo automático queda por observar; el manejador se probó localmente. Vigilar métricas de CPU y cuotas en el edge, sin confundirlas con pruebas locales.
7. `reviews-config.js` contiene la URL HTTPS y **solo la sitekey pública**. Las 42 páginas se regeneraron y probaron conservando el ajuste visual ya publicado. El cliente se publica únicamente después de completar la integración real autorizada.

No añadir un paso de deploy a GitHub Actions. Para revertir la integración del cliente, vaciar `apiBase` y `turnstileSiteKey`, regenerar y publicar mediante el proceso aprobado. Esto vuelve a ofrecer el contacto por correo; conservar acceso privado a los datos para atender derechos hasta su eliminación autorizada.

## Límites gratuitos y operación

Valores consultados el 17 de noviembre de 2026; son límites de cuenta compartidos con otros usos:

| Recurso | Plan Free | Comportamiento operativo |
| --- | --- | --- |
| Workers | 100 000 solicitudes/día; 10 ms CPU por petición | Si se agota, el servicio de opiniones falla; Pages y WhatsApp siguen siendo independientes. Vigilar errores 1027/1102. |
| D1 | 5 millones de filas leídas/día; 100 000 escritas/día; 5 GB por cuenta; 500 MB por base | Los índices cuentan como escrituras. Al alcanzar límites, fallar e informar; no contratar ni cambiar de plan automáticamente. |
| Turnstile | Hasta 20 widgets por cuenta; 10 hostnames/widget; verificaciones ilimitadas | Un widget y un hostname bastan. La validación de tokens es obligatoria en servidor. |

El cliente hace una lectura al acercarse a la sección, sin sondeo, y no carga Turnstile hasta abrir «Escribir una opinión». Los MP4 conservan su reproducción bajo demanda. Se limita a cinco intentos de envío por IP/intervalo horario, diez de borrado y sesenta llamadas de administración; la IP solo participa en el identificador secreto temporal. Personas con la misma conexión comparten esos límites; el correo ofrece alternativa. El contador se evalúa antes del desafío para contener abuso; errores de validación también cuentan.

No hay garantía de resistencia a un ataque volumétrico dentro del plan Free. Un origen permitido y Turnstile no impiden que tráfico directo consuma invocaciones. Revisar métricas del Worker/D1 y el cron, especialmente tras campañas; atender fallos sin habilitar un plan de pago. La interfaz de administración no permite aceptar automáticamente cuando falla la verificación o la base de datos.

Fuentes oficiales: [Workers](https://developers.cloudflare.com/workers/platform/limits/), [D1 precios](https://developers.cloudflare.com/d1/platform/pricing/), [D1 límites y recuperación](https://developers.cloudflare.com/d1/platform/limits/), [Turnstile planes](https://developers.cloudflare.com/turnstile/plans/), [validación de tokens](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) y [pruebas con claves dummy](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
