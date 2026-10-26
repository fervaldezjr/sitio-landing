---
fecha: 2026-10-26
visto: 1
destino: estandar
---

## Síntoma

El tirador de cristal quedaba a la izquierda de la línea blanca. En escritorio el hueco era de unos 40–90 px (en 1440 px de ancho, del orden de `lean * ancho`, unos 115 px). En móvil, unos 40 px.

## Causa

El recorte va de `--split-top` arriba a `--split-bottom` abajo, inclinándose hacia la izquierda. El tirador ya estaba en el punto medio de ese segmento, a media altura. La línea era un `div` de 2 px con `rotate(atan2(dx, alto))`. En CSS un ángulo negativo gira en sentido antihorario y manda el extremo de abajo hacia la derecha, al lado contrario del recorte.

## Arreglo

La línea es un `<line>` SVG con `viewBox="0 0 100 100"` y `preserveAspectRatio="none"`, de `(top, 0)` a `(bottom, 100)`. El tirador usa el mismo punto (`src/lib/wipe.ts`, `wipeFrame`) y se centra con `translate(-50%, -50%)`. `scripts/wipe.test.mjs` recorre anchos, altos, leans y progresos. `scripts/check-wipe.mjs` mide la línea pintada en Chrome cuando el binario existe; sin Chrome solo comprueba el HTML construido, porque las imágenes de GitHub Actions no traen Chrome.

## Evidencia

Sesión del 26 oct 2026. El fallo se midió en el build anterior: escritorio 1440×900, centro del tirador en x=720 y la caja de la línea girada empezando cerca de x=777.

## Cambio propuesto

Dejar la geometría compartida y los dos tests dentro de `scripts/verify.sh`. No volver a orientar la línea con `rotate`. Falta que una persona lo apruebe y saque esta ficha de `inbox/`.

## Caso de eval

`node --test scripts/wipe.test.mjs` falla si el punto del tirador se separa del segmento. `node scripts/check-wipe.mjs` falla si la línea pintada no pasa por el centro del tirador.
