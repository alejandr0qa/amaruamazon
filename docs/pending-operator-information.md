# Información pendiente del operador

Documento de preparación editorial, sin integración automática en el sitio. Ningún dato pendiente se sustituye por contenido ficticio, números de ejemplo, testimonios inventados o promesas de respuesta.

## Primera fase

- Dominio y correo corporativo: proporcionados por el propietario; centralizados en `site.config.mjs`.
- WhatsApp, ocho experiencias, tres itinerarios y fotografías propias: se conservan del sitio existente.
- Canal de correo: el enlace abre el cliente del visitante. El operador debe confirmar que recibe mensajes en el buzón; no se ha enviado correo de prueba.
- Contacto: se aclara que una consulta no confirma una reserva y que esta web no cobra. La disponibilidad, precio total y detalles se tratan directamente con el operador.
- Analítica: aplazada expresamente por el propietario. Sin scripts, token, dependencias ni cambios en Cloudflare.
- Páginas individuales: preparadas con el catálogo existente y preguntas de planificación. Para completar cada ficha hacen falta duración, dificultad, edades, tamaños de grupo, equipo e inclusiones validados. Las recomendaciones no constituyen compromisos operativos.

## Datos por recopilar y verificar

| Tema | Información y evidencia necesarias | Integración prevista tras validación |
| --- | --- | --- |
| Precios | Tarifario vigente, moneda, unidad por persona/grupo, fechas de validez, inclusiones y exclusiones. Material para la cotización directa. | Mantener precios fuera de la web. Revisar solo la claridad de FAQ y mensajes de WhatsApp; cualquier publicación de importes requiere una nueva decisión del propietario. |
| RNT | Número real, razón social/titular, estado vigente y enlace o documento comprobable del registro. Confirmar a qué operador corresponde. | Texto accesible en contacto o pie; datos estructurados únicamente si corresponden a la misma entidad y están verificados. No crear distintivos de certificación. |
| Testimonios y perfiles | Enlaces públicos oficiales de Google, TripAdvisor o redes; reseña original, fecha, autor y permiso para reproducir texto/foto si aplica. Confirmar identidad del negocio. | Enlaces a perfiles verificados en `src/index.template.html`; traducciones revisadas en `src/translations.js`. No añadir puntuaciones agregadas ni reseñas en JSON-LD en esta fase. |
| Anfitriones y guías | Nombres autorizados, fotos con permiso, biografías, relación con Amaru, idiomas que realmente ofrecen y evidencia de formación si se menciona. | Sección `#our-story` y textos por idioma. Mantener la disponibilidad lingüística sujeta a confirmación hasta validarla. |
| Seguridad | Protocolos reales por actividad, responsable, equipo disponible, chalecos, botiquín, comunicaciones, emergencias, restricciones de edad/condición física y cobertura de seguros si existe. | FAQ y fichas de `content.js` tras revisión del operador. No afirmar guías certificados, seguros o cobertura de emergencias sin documentación. |
| Condiciones comerciales | Procedimiento real de confirmación, medios de pago, moneda, anticipos, inclusiones, cambios, cancelación, clima y reembolsos; aprobación del operador. | FAQ y contenido de consulta en los tres idiomas. Mantener la web sin cobros, reservas automáticas ni nuevas obligaciones. No publicar políticas genéricas como si fueran de Amaru. |
| Llegada | Puntos de encuentro, responsables de traslados, ruta Leticia–Puerto Nariño validada localmente, operadores de bote, horarios, duración, costos, reserva previa y alternativas según temporada. Registrar fuente y fecha de comprobación. | Ampliación de FAQ o sección de llegada; no publicar horarios, tarifas o frecuencias estimados como hechos. |
| Fichas prácticas | Para cada una de las ocho experiencias: duración, dificultad, edad, grupo mínimo/máximo, equipo e inclusiones, accesibilidad, estacionalidad y restricciones confirmadas. | Ampliar `content.js` y `src/experience-pages.mjs` y su presentación en los generadores. La duración validada se integra con `duration: { en, es, fr }` en la experiencia; mientras falte, se pide confirmarla. Mantener kayak diurno y aves/cacao separados. |

## Ficha para entregar cada dato

- Tema o experiencia:
- Texto o dato confirmado:
- Fuente, documento o enlace original:
- Responsable de validación y fecha:
- Permiso de publicación de nombres, fotografías o testimonios, cuando corresponda:
- Versión aprobada en inglés, español y francés:
- Lugar del sitio donde debe aparecer:
- Fecha o condición para revisar su vigencia:

Hasta completar y aprobar la ficha, conservar el dato fuera del contenido público y de los datos estructurados. No prometer plazos de respuesta sin una capacidad operativa confirmada.

## Integración y comprobación

1. Incorporar contenido validado en la plantilla, traducciones o datos editoriales; nunca editar directamente el HTML generado.
2. Revisar que no contradiga la cotización por contacto, el número de tours/itinerarios ni las restricciones de esta fase.
3. Ejecutar `npm run build` y `npm run check`.
4. Revisar navegación, accesibilidad, formularios y versión móvil en `/`, `/es/` y `/fr/`.
5. Presentar los cambios en una rama y PR para revisión antes de incorporarlos a producción.
