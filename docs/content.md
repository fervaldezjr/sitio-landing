# Contenido · Sitio

Inventario de lo que existe de verdad y lista de secciones de la home. Todo el copy vive en `src/content/site.ts`.

## Lo que existe

| tipo | qué | dónde está | se puede usar |
| --- | --- | --- | --- |
| producto | Sitio, app móvil: foto de un espacio o una superficie → espejo ordenado del mismo encuadre, generado con IA; qué sobra (quitar), qué falta (añadir) y qué se queda (fijado); propuestas de objetos que se cambian, se guardan y se añaden a listas propias | descripción de Fernando, 26 oct 2026 | sí |
| cifras comprobables | quitar 13, añadir 3, portátil fijado | la tarjeta del espejo aprobada | solo esas tres |
| textos ya escritos | privacidad (difuminado de caras, menores y pantallas antes de compartir), aviso de IA, «build in public», @ferlogs_ | versión anterior de `site.ts` | sí, en mayúscula inicial |
| fotos | par 16:9 y par 3:4 del escritorio frente al mar, antes y espejo | `media/source/` | sí, con el espejo etiquetado como generado con IA |
| fotos de producto | nueve fotos de Unsplash (tres bandejas, tres tazas, tres libretas), recortadas con Vision | `media/source/products/`, créditos en `docs/assets/credits.json` | sí, como ejemplo de propuestas, dicho en la página |
| capturas de la app | no hay | | la interfaz del móvil se dibuja con los tokens de la app |
| badges de tienda | App Store y Google Play oficiales (inglés) | `media/source/badges/` | sí, sin enlace y con «Próximamente en» hasta que la app esté publicada |

## Lo que NO existe y no se inventa

Testimonios, valoraciones, número de usuarios, precios, fecha de lanzamiento, marcas o tiendas de los objetos, garantías. La beta no tiene lista ni servidor: el formulario lo dice al enviarlo y no guarda nada.

## Secciones de la home

| # | sección | la idea, en una frase | contenido | movimiento |
| --- | --- | --- | --- | --- |
| 0 | escenario | La app, usada delante de ti | titular, entradilla, beta y badges; el móvil con la foto, «Generando tu espejo…», el barrido, la tarjeta del espejo, lo que sobra saliendo y la lista con las propuestas | escenario fijo con scroll (`story.ts`) |
| 1 | frase | Para qué sirve, en una línea | titular a dos voces | líneas |
| 2 | compruébalo tú | El barrido a pantalla completa, con tirador | par 16:9, tarjeta del espejo | barrido con el scroll y el tirador (`compare.ts`) |
| 3 | cómo funciona | Tres pasos | `01 02 03` | aparición |
| 4 | propuestas | Lo que falta llega con alternativas | banda de tinta, tres grupos de tres fotos de producto, nota de ejemplo | aparición |
| 5 | privacidad | Antes de compartir se difumina lo que no se debe ver | la frase aprobada | líneas |
| 6 | preguntas | Lo que de verdad se pregunta | seis preguntas | acordeón nativo |
| 7 | beta | La petición | formulario sin servidor y badges | aparición |
| 8 | pie | Firma | «Tu espacio, en su sitio.», bandeja, taza y libreta, aviso de IA, créditos y aviso de marcas | líneas |

## Nombres

- Producto: **Sitio**, con mayúscula inicial.
- Las tres acciones, siempre iguales: **Quitar**, **Añadir**, **Fijado**.
- El resultado: **espejo**, en minúscula dentro de la frase y siempre con «generado con IA» cerca.
