# Imágenes

> Leer cuando: tocas fotos, srcset, el revelado o las fotos de producto.

## Regla

El par antes/espejo se compone, no se genera: `scripts/compose-pair.mjs` lee `docs/assets/scene.json`, toma la foto base real (`media/source/base/escritorio.jpg`, Pexels, 3466×5199) y le añade objetos recortados (`media/source/objects/` para el antes, `media/source/products/` para el espejo) a su tamaño real según la profundidad, con sombra de contacto, sombra proyectada lejos de la ventana, reajuste de luz y un poco de suavizado. Saca dos recortes de la misma composición: 16:9 (`wide-*`, el barrido en escritorio) y 4:3 (`frame-*`, el barrido en móvil). Como comparten la base, casan por construcción.

El móvil del escenario no usa esa composición: lleva el par vertical del escritorio frente al mar (`media/source/tall-*.png`, 864×1152, antes y espejo generado con IA), servido a su ancho nativo. Los recuadros de detección de `Story.astro` están medidos sobre esa foto.

Después, `scripts/optimize-images.mjs` aplica el revelado común (saturación 0.86) y sirve el 16:9 hasta 2560 px, el 4:3 hasta 1440 y el vertical hasta 864, en AVIF, WebP y JPG, con `srcset`.

Las fotos de producto (`media/source/products/*.png`) son fotos de Unsplash recortadas con la segmentación de macOS (Vision, `VNGenerateForegroundInstanceMaskRequest`). El script recorta el borde transparente y las sirve a 720 px como máximo en AVIF, WebP y PNG, con alfa. La sombra la pone el CSS, igual para todas. Cada una tiene su crédito en `docs/assets/credits.json`.

## Por qué

El par anterior era una ampliación blanda de 2400 px y se veía mal a pantalla completa. Una foto real de 3466 px más objetos recortados da nitidez de verdad y deja elegir qué sobra y qué falta. Una escena horizontal recortada en vertical es casi todo pared, por eso el móvil usa el 4:3.

## Cómo

Para cambiar la escena: editar `docs/assets/scene.json` (x, y, cm, squash, turn, z) y ejecutar `node scripts/compose-pair.mjs --preview` para mirarla en `media/proof/`, luego `node scripts/compose-pair.mjs` y `npm run images`. Para cambiar una foto de producto: sustituir el PNG con el mismo nombre, actualizar su fila de `credits.json` y regenerar. Evitar fotos con logotipos o texto, y cualquier objeto sin crédito.

Trampas: el recorte de Vision conserva la sombra del estudio como un borde de alfa bajo (se limpia en `clean()`); `sharp` aplica `trim` antes que `extract` en la misma cadena (hay que materializar el buffer entre medias); reconstruir el alfa con `joinChannel` puede dejarlo como banda extra (se trabaja en crudo); y el orden de dibujo es de atrás adelante por `y`, así que algo que descansa sobre otro objeto lleva `z`.

## Cómo se comprueba

`scripts/check-links.mjs` exige que cada URL del `srcset` y de las fotos de producto exista en `dist/`. No debe aparecer un derivado de más de 1920 px de ancho. El script de imágenes imprime la diferencia del par en la pared: tiene que quedar por debajo de 0.1 (ruido de compresión).
