---
fecha: 2026-10-26
visto: 1
destino: estandar
---

## Síntoma

Fernando vio que los iconos de la tarjeta se salían de su círculo, que la foto del barrido se veía mal, que al hacer scroll había cosas que parpadeaban y que faltaba el inglés.

## Causa

1. `.mirror-row span` (y `.screen-row span`) eran para el texto, pero el icono también es un `span`: heredaba `display: block` y el margen, y el glifo salía del círculo.
2. El par era una ampliación de 2400 px de una imagen pequeña.
3. Parpadeos: imágenes perezosas del barrido que llegaban tarde, cuatro `backdrop-filter` apilados sobre una foto en movimiento y, en móvil, `100dvh` cambiando con la barra de direcciones.
4. Una escena de escritorio es horizontal: recortarla en vertical para el móvil deja casi toda la pantalla en pared.
5. Al componer: Vision deja la sombra del estudio como alfa bajo; `sharp` hace `trim` antes que `extract` en la misma cadena; `joinChannel` puede dejar el alfa como banda extra y salen cajas negras; y si se dibuja por `y`, una bandeja delante tapa la taza que va encima.
6. El badge español de Apple (tools.applemarketingtools.com) no resolvía desde la sesión.
7. Fernando quería la foto nueva solo en el barrido: en el móvil, la foto del mar a pantalla completa llenaba la pantalla; el 4:3 con interfaz clara dejaba el móvil vacío.
8. El botón de la beta tenía `transition: transform` (su pulsación) y la entrada de GSAP lo dejaba 24 px abajo, encima de los badges.

## Arreglo

1. El texto va con `.mirror-row p span`; `wipe.test.mjs` falla si vuelve la regla ancha.
2. `scripts/compose-pair.mjs` + `docs/assets/scene.json`: foto real de 3466 px y objetos recortados, a tamaño real por profundidad, con sombras y reajuste de luz. 16:9 y 4:3 de la misma composición.
3. Barrido `eager` + `fetchpriority="low"`, dos capas de desenfoque, `100svh`, `ignoreMobileResize`, pantalla de carga breve y fundido de imágenes perezosas.
4. En el móvil, la foto 4:3 como tarjeta a lo ancho y la interfaz de la app debajo; en el barrido en móvil, el 4:3 centrado.
5. Limpiar el alfa en crudo, materializar buffers entre `extract` y `trim`, y `z` para lo que descansa sobre otro objeto.
6. Badges oficiales en inglés para los dos.
7. El móvil vuelve al par vertical del mar (`tall-*`) con recuadros de detección, halo, píldoras flotantes e inclinación hacia el puntero; la composición queda solo para el barrido.
8. `clearProps: "transform"` al terminar la entrada.

## Evidencia

Sesión del 26 oct 2026, rama `fix/calidad-fluidez-ingles`.

## Cambio propuesto

Volcado en `standards/02-diseno.md`, `03-contenido.md`, `04-imagenes.md` y `05-marca.md`. Falta que una persona lo apruebe y saque esta ficha de `inbox/`.

## Caso de eval

`node --test scripts/wipe.test.mjs` falla si `.mirror-row span {` vuelve al CSS. `node scripts/check-links.mjs` comprueba las dos páginas. El script de imágenes imprime la diferencia del par en la pared (por debajo de 0.1).
