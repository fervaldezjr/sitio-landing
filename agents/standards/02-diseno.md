# Diseño

> Leer cuando: tocas CSS, movimiento, cristal o tipografía.

## Regla

La landing usa los tokens de `design/tokens.json`. Lienzo `#F7F7F7`, tinta `#1B1B1B`, superficie blanca. Sin color de acento. El texto sobre la foto va en cristal de alfa ≥ 0.62 (`glass.alpha.strong`); la tarjeta y la barra usan 0.66.

## Por qué

Por debajo de 0.62 el blanco no llega a 4.5:1 sobre la mesa clara. `#8F8F92` (`ink.400`) se queda en 3.2:1 y solo vale para el asa y el borde del campo.

## Cómo

Titulares en Switzer, cargada solo así:

```css
/* https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap */
font-family: "Switzer", "Inter", system-ui, sans-serif;
```

Cuerpo en Inter o en la sans del sistema. No se descargan los ficheros de la fuente.

Curvas, sin rebote:

- fundido y barrido: `cubic-bezier(0.37, 0, 0.63, 1)` (easeInOutSine)
- hojas: `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint), 320 ms
- píldoras: `cubic-bezier(0.33, 1, 0.68, 1)` (easeOutCubic), 200 ms
- el texto no se anima (corte seco)

Con `prefers-reduced-motion`, el barrido no sigue el scroll y las hojas pasan a un fundido de 150 ms.

## Cómo se comprueba

`scripts/check-contrast.mjs` y una pasada visual del hero en escritorio y en móvil.
