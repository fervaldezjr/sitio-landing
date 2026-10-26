# Imágenes

> Leer cuando: tocas fotos, srcset o recortes.

## Regla

El par 16:9 se sirve como máximo a 1920 px de ancho. El par 3:4 se sirve a su ancho nativo, 864. Cada uno lleva AVIF, WebP y JPG, con `srcset`. El escritorio y el móvil no comparten encuadre: la `picture` elige con `media`.

## Por qué

Los JPEG de 2400 px son una ampliación blanda. En este entorno no hay un reescalador neuronal libre, así que no se inventa detalle por encima de 1920. El mar de los dos encuadres 16:9 coincide (diferencia media 0 en el tercio superior): el barrido solo puede funcionar si se usan emparejados.

## Cómo

Regenerar con `npm run images`. Las fuentes están en `media/source/` y no se publican tal cual. Los derivados viven en `public/media/`.

## Cómo se comprueba

`scripts/check-links.mjs` exige que cada URL del `srcset` exista en `dist/`. No debe aparecer un derivado de más de 1920 px de ancho.
