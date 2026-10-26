# Diseño

> Leer cuando: tocas CSS, movimiento, cristal o tipografía. El porqué de cada decisión está en `docs/identity.md`.

## Regla

La página tiene dos voces. **La app** conserva su interfaz: cristal, píldoras, hoja inferior y Switzer, con los tokens de `design/tokens.json`. **La página que la rodea** habla como una revista de interiores: Boska fina en los titulares, folios sobre reglas de 1 px, retícula de 12 columnas y mucho margen. No se mezclan: un botón de la revista es rectangular y en tinta; una píldora de cristal es de la app.

Lienzo `#F7F7F7`, tinta `#1B1B1B`, superficie blanca, segunda voz `#5E5E5E`, reglas `#C8C8C8`. Sin color de acento. Una sola banda de tinta (`#1B1B1B`, texto blanco y segunda voz `#B4B4B4`) para privacidad. El texto sobre la foto va en cristal de alfa ≥ 0.62 (`glass.alpha.strong`); la tarjeta, la barra, la píldora de la beta y los números de «Mis cosas» usan 0.66.

## Por qué

Por debajo de 0.62 el blanco no llega a 4.5:1 sobre la mesa clara. `#8F8F92` (`ink.400`) se queda en 3.2:1 y solo vale para el asa y bordes. Una segunda materia, un acento o una sombra por sección es lo que hace que una página parezca barata.

## Cómo

Fuentes, una petición por familia (con las dos en la misma URL el CDN devuelve solo la primera):

```css
/* https://api.fontshare.com/v2/css?f[]=boska@300,301,400&display=swap */
/* https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap */
--font-display: "Boska", "Iowan Old Style", Georgia, serif; /* titulares, wordmark, índice, preguntas */
--font-body: "Switzer", system-ui, sans-serif;               /* cuerpo, folios, botones */
--font-app: "Switzer", system-ui, sans-serif;                /* todo lo que es interfaz de la app */
```

- Titular a dos voces con `Title.astro`: `lead` en tinta, `rest` en cursiva gris. Boska 300, de 44 a 88 px, tracking -2 %, interlineado 1.0.
- Cada sección empieza con `Folio.astro`: número de dos cifras y nombre en Switzer 500 a 13 px, en redonda, sobre una regla. Nada de antetítulos en versalitas.
- Retícula: titulares de la columna 3 a la 11; en móvil, todo a ancho completo.

Curvas, sin rebote:

- barrido del hero: `cubic-bezier(0.37, 0, 0.63, 1)` (easeInOutSine), lo dirige el scroll (`src/scripts/hero.ts`)
- entradas de la página y hojas: easeOutQuint, `cubic-bezier(0.22, 1, 0.36, 1)` (`power4.out` en GSAP); hojas en 320 ms
- píldoras y estados: `cubic-bezier(0.33, 1, 0.68, 1)` (easeOutCubic), 200 ms

Movimiento de la página (`src/scripts/motion.ts`, GSAP + Lenis):

- Lenis con `lerp: 0.1`; los enlaces internos se deslizan y paran bajo la barra fija. Con la hoja abierta, Lenis se para (evento `sitio:scroll-lock`).
- `data-lines`: el titular entra línea a línea tras una máscara (SplitText, 1.1 s, 0.09 entre líneas). El cuerpo no se anima letra a letra.
- `data-unveil`: las fotos y la tarjeta de la app se destapan de abajo arriba con `clip-path`, el mismo gesto que el barrido.
- `data-reveal` y `data-reveal-group`: aparecen 24 px desde abajo, una vez.
- `data-fit`: el wordmark del pie ocupa el ancho, con tope del 75 % del alto de la ventana.

Trampas ya vistas:

- No pongas `transition: transform` en un elemento que anima GSAP: al recalcular, GSAP lee el valor a medio camino y se queda ahí (los números de «Mis cosas» se quedaron a escala 0.6). Por eso `.spot` lleva la transición de hover y `.spot-dot` la entrada.
- Sin JavaScript todo se ve. Con JavaScript, un titular sin partir está oculto como mucho 2.5 s (red de seguridad en CSS).

Con `prefers-reduced-motion`: sin Lenis, sin entradas, el barrido no sigue el scroll y las hojas pasan a un fundido de 150 ms.

## Cómo se comprueba

`scripts/check-contrast.mjs`, `scripts/check-wipe.mjs` y capturas de escritorio y de móvil haciendo scroll de verdad (las entradas solo se disparan al pasar por ellas).
