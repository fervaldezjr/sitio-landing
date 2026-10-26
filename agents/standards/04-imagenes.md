# Imágenes

> Leer cuando: tocas fotos, srcset, el revelado o las fotos de producto.

## Regla

Las fotos del espacio llevan un mismo revelado suave (saturación 0.86, `GRADE` en `scripts/optimize-images.mjs`), igual para los dos fotogramas de cada par. El par 16:9 se sirve como máximo a 1920 px (barrido a pantalla completa); el par 3:4, a su ancho nativo, 864 (la pantalla del móvil y el barrido en móvil). Cada uno lleva AVIF, WebP y JPG, con `srcset`.

Las fotos de producto (`media/source/products/*.png`) son fotos de Unsplash recortadas con la segmentación de macOS (Vision, `VNGenerateForegroundInstanceMaskRequest`). El script recorta el borde transparente y las sirve a 720 px como máximo en AVIF, WebP y PNG, con alfa. La sombra la pone el CSS, igual para todas. Cada una tiene su crédito en `docs/assets/credits.json`.

## Por qué

Los JPEG de 2400 px son una ampliación blanda y aquí no hay un reescalador neuronal libre, así que no se inventa detalle por encima de 1920. El mar de los dos encuadres 16:9 coincide (diferencia media 0 en el tercio superior): el barrido solo funciona si se usan emparejados y con el mismo revelado. Los objetos recortados de nuestras fotos salían blandos a tamaño grande; las fotos de producto de stock son nítidas y, sin fondo, se leen como un catálogo.

## Cómo

Regenerar con `npm run images` (o `node scripts/optimize-images.mjs --products-only` para las de producto). Para cambiar una foto de producto: sustituir el PNG en `media/source/products/` con el mismo nombre, actualizar su fila de `credits.json` y regenerar. Evitar fotos con logotipos o texto.

## Cómo se comprueba

`scripts/check-links.mjs` exige que cada URL del `srcset` y de las fotos de producto exista en `dist/`. No debe aparecer un derivado de más de 1920 px de ancho. El script de imágenes imprime la diferencia del par: tiene que seguir en 0.00.
