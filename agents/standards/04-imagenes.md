# Imágenes

> Leer cuando: tocas fotos, srcset, el revelado o los números de «Mis cosas».

## Regla

Una sola materia: fotografía de interiores con un mismo revelado suave (saturación 0.86, `GRADE` en `scripts/optimize-images.mjs`), igual para los dos fotogramas de cada par.

El par 16:9 se sirve como máximo a 1920 px de ancho. El par 3:4 se sirve a su ancho nativo, 864: lo usan el hero en móvil y la doble página de «Mis cosas». Cada uno lleva AVIF, WebP y JPG, con `srcset`. El escritorio y el móvil del hero no comparten encuadre: la `picture` elige con `media`.

«Mis cosas» no usa recortes: los objetos se señalan con números sobre la foto entera. Sus posiciones (`x`, `y`, fracciones del fotograma 3:4) están en `src/content/site.ts`. Las miniaturas de «Tus listas» son cuadradas, se cortan del espejo 3:4 sin bandas de relleno y sin ampliar más de 1.5x (el script falla si pasa).

## Por qué

Los JPEG de 2400 px son una ampliación blanda. En este entorno no hay un reescalador neuronal libre, así que no se inventa detalle por encima de 1920. El mar de los dos encuadres 16:9 coincide (diferencia media 0 en el tercio superior): el barrido solo funciona si se usan emparejados y con el mismo revelado. Los recortes anteriores, ampliados y con `fit: contain`, salían blandos y con bandas grises.

## Cómo

Regenerar con `npm run images` (o `node scripts/optimize-images.mjs --thumbs-only` para las miniaturas). Las fuentes están en `media/source/` y no se publican tal cual. Los derivados viven en `public/media/hero/` y `public/media/lists/`. Si cambia el encuadre del par 3:4, se vuelven a medir las coordenadas de los números sobre una rejilla.

## Cómo se comprueba

`scripts/check-links.mjs` exige que cada URL del `srcset` exista en `dist/`. No debe aparecer un derivado de más de 1920 px de ancho. El script de imágenes imprime la diferencia del par: tiene que seguir en 0.00.
