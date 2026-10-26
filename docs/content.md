# Contenido · Sitio

Inventario de lo que existe de verdad y lista de secciones de la home. Todo el copy vive en `src/content/site.ts`.

## Lo que existe

| tipo | qué | dónde está | se puede usar |
| --- | --- | --- | --- |
| producto | Sitio, app móvil: foto de un espacio o una superficie → espejo ordenado del mismo encuadre, generado con IA; qué sobra (quitar), qué falta (añadir) y qué se queda (fijado); propuestas de objetos que se cambian, se guardan y se añaden a listas propias | descripción de Fernando, 26 oct 2026 | sí |
| cifras comprobables | quitar 13, añadir 3, portátil fijado | la tarjeta del espejo aprobada | solo esas tres |
| textos ya escritos | privacidad (difuminado de caras, menores y pantallas antes de compartir), aviso de IA, «build in public», @ferlogs_ | versión anterior de `site.ts` | sí, en mayúscula inicial |
| foto del móvil | el par vertical del escritorio frente al mar (antes y espejo generado con IA), 864×1152 | `media/source/tall-*.png` | sí, con el espejo etiquetado como generado con IA |
| foto del barrido | una foto de Pexels (escritorio de madera, jarra con eucalipto, portátil) y objetos de Unsplash compuestos encima; 16:9 y 4:3 de la misma composición | `media/source/base/`, `media/source/objects/`, `docs/assets/scene.json` | sí, diciendo que es un ejemplo (pie y «Espejo · ejemplo» en el barrido) |
| fotos de producto | tres fotos de Unsplash (bandeja de madera, taza, libreta), recortadas con Vision | `media/source/products/`, créditos en `docs/assets/credits.json` | sí, como ejemplo de propuestas, dicho en la página |
| idiomas | español (`/`) e inglés (`/en/`) | `src/content/site.ts` (`es` y `en`) | todo texto nuevo, en los dos |
| capturas de la app | no hay | | la interfaz del móvil se dibuja con los tokens de la app |
| badges de tienda | App Store y Google Play oficiales (inglés) | `media/source/badges/` | sí, sin enlace y con «Próximamente en» hasta que la app esté publicada |

## Lo que NO existe y no se inventa

Testimonios, valoraciones, número de usuarios, precios, fecha de lanzamiento, marcas o tiendas de los objetos, garantías. La beta no tiene lista ni servidor: el formulario lo dice al enviarlo y no guarda nada.

## Secciones de la home

| # | sección | la idea, en una frase | contenido | movimiento |
| --- | --- | --- | --- | --- |
| 0 | escenario | La app, usada delante de ti | titular, entradilla, beta y badges; tres píldoras que flotan (quitar 13, añadir 3, portátil fijado); el móvil con la foto del mar a pantalla completa, «Generando tu espejo…» con recuadros sobre lo que sobra, el barrido, la tarjeta del espejo, lo que sobra saliendo y la lista con las propuestas; un halo de la foto detrás | escenario fijo con scroll (`story.ts`) y, en escritorio, inclinación hacia el puntero |
| 1 | frase | Para qué sirve, en una línea | titular a dos voces | líneas |
| 2 | compruébalo tú | El barrido a pantalla completa, con tirador | par 16:9, tarjeta del espejo | barrido con el scroll y el tirador (`compare.ts`) |
| 3 | cómo funciona | Tres pasos | `01 02 03` | aparición |
| 4 | propuestas | Lo que falta llega con alternativas | banda de tinta, una ficha por objeto que se añade (bandeja, taza, libreta) y nota de ejemplo; enlazar productos reales es cosa del producto, no de la landing | aparición |
| 5 | privacidad | Antes de compartir se difumina lo que no se debe ver | la frase aprobada | líneas |
| 6 | preguntas | Lo que de verdad se pregunta | seis preguntas | acordeón nativo |
| 7 | beta | La petición | formulario sin servidor y badges | aparición |
| 8 | pie | Firma | «Tu espacio, en su sitio.», bandeja, taza y libreta, aviso de IA, créditos y aviso de marcas | líneas |

## Nombres

- Producto: **Sitio**, con mayúscula inicial.
- Las tres acciones, siempre iguales: **Quitar**, **Añadir**, **Fijado**.
- El resultado: **espejo**, en minúscula dentro de la frase. En la interfaz de la app, con «generado con IA»; el de esta página, con «ejemplo».
- En inglés: **Sitio**, **mirror**, **Remove**, **Add**, **Pinned**.
