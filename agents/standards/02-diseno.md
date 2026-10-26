# Diseño

> Leer cuando: tocas CSS, movimiento, cristal o tipografía. El porqué de cada decisión y las referencias medidas están en `docs/identity.md`.

## Regla

El producto se demuestra. La primera pantalla es un escenario fijo: el móvil en el centro hace la foto, genera el espejo, lo barre, enseña su tarjeta y acaba en la lista con las propuestas mientras haces scroll. El resto es blanco, una sola grotesca (Switzer) y mucho aire. Sin rótulos de sección: la sección se reconoce por el titular y el espacio.

Fondo blanco `#FFFFFF`; las piezas (objetos, campo del correo) van sobre `#F7F7F7`; tinta `#1B1B1B`; segunda voz `#5E5E5E`. Sin color de acento. Una sola banda de tinta (`#1B1B1B`, blanco y `#B4B4B4`) para las propuestas. Todo lo que es interfaz de la app (la píldora de navegación, el móvil, el barrido) usa el cristal de `design/tokens.json`: alfa ≥ 0.62 para texto sobre foto, 0.66 en tarjetas y estados.

## Por qué

Cuatro de las cinco referencias usan una grotesca neutra en regular y fondo blanco; la más cercana (see-for-yourself) cuenta el producto con el móvil fijo mientras cambia la escena. La primera versión (serif fina, folios, una foto repetida) se leía como plantilla. Por debajo de 0.62 el blanco no llega a 4.5:1 sobre la mesa clara; `#8F8F92` (`ink.400`) se queda en 3.2:1 y solo vale para el asa y bordes.

## Cómo

```css
/* https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap */
--font: "Switzer", system-ui, sans-serif;
```

- Titulares en Switzer 400, grandes y apretados: de 40 a 92 px, tracking -4 a -4.5 %, interlineado 0.96 a 1.0. `Title.astro` pinta las dos voces (`lead` en tinta, `rest` en gris).
- Interfaz y rótulos en 500 a 13–15 px. Casi sin tamaños intermedios: o es titular o es interfaz.
- El móvil se dibuja en CSS (`Story.astro`) con la interfaz clara de la app: cabecera «Sitio», la foto como tarjeta 4:3 a lo ancho, *skeleton* mientras genera, tarjeta del espejo y lista. Las medidas van en `cqw` (la pantalla es un contenedor) para que la interfaz escale con el móvil. La foto no se recorta en vertical: la escena es horizontal.
- El barrido a pantalla completa usa el 16:9 en escritorio; en móvil, el 4:3 centrado en la pantalla oscura y sin la tarjeta (ya está en el móvil del escenario).
- Los objetos van sin fondo, con `filter: drop-shadow(...)`, sobre `#F7F7F7` con radio de 20–22 px.

Curvas, sin rebote:

- página: easeOutCubic, `cubic-bezier(0.33, 1, 0.68, 1)` (`power3.out` en GSAP)
- barrido a pantalla completa: easeInOutSine, `cubic-bezier(0.37, 0, 0.63, 1)`, lo dirige el scroll (`src/scripts/compare.ts`)
- hojas de la app: easeOutQuint, 320 ms

Movimiento:

- `src/scripts/story.ts`: una línea de tiempo de GSAP con `scrub` sobre `.story` (640vh). El estado inicial de cada pieza está en CSS bajo `html.motion`, así la primera pintura coincide con el inicio de la línea de tiempo.
- `src/scripts/motion.ts`: pantalla de carga breve (hasta que fuentes e imágenes del escenario están decodificadas, 2,5 s como mucho), Lenis (`lerp: 0.1`), enlaces internos que se deslizan, titulares `data-lines` que entran línea a línea, `data-reveal` y `data-reveal-group`, e imágenes perezosas que aparecen ya decodificadas.
- `html.motion` lo pone un script en línea en `<head>` si no hay `prefers-reduced-motion`. Sin él (sin JavaScript o con movimiento reducido) el escenario es una imagen fija: el espejo con su tarjeta y las propuestas al lado.

Trampas ya vistas:

- Lo que parpadea al hacer scroll: imágenes perezosas que llegan tarde (las del barrido van `eager` con `fetchpriority="low"`), cuatro `backdrop-filter` apilados sobre una foto en movimiento (quedan dos), y en móvil la barra de direcciones cambiando `100dvh` (se usa `100svh` y `ScrollTrigger.config({ ignoreMobileResize: true })`).
- Una regla para el texto de una fila (`.mirror-row span`) también alcanza al icono si el icono es otro `span`, y lo saca de su círculo: el texto va con `p span`.

- Si el CSS pone `transform: translateY(…)` en algo que GSAP anima con `yPercent`, GSAP lee el `translateY` como píxeles y los suma: la hoja de la lista no subía. En el `fromTo`, pon `y: 0` explícito.
- No pongas `transition: transform` en un elemento que anima GSAP: al recalcular, GSAP lee el valor a medio camino y se queda ahí.
- Algo que se mueve desde un punto y está centrado con `translate(-50%, -50%)` va en dos elementos: el exterior lo mueve GSAP, el interior se centra.

## Cómo se comprueba

`scripts/check-contrast.mjs`, `scripts/check-wipe.mjs` y capturas del escenario en varios puntos de su recorrido, en escritorio y en móvil.
