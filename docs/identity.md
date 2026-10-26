# Identidad · Sitio

La produce la skill brand-identity (26 oct 2026). Es el contrato visual de la landing: cuando algo dude a mitad de construcción, se decide mirando aquí. Cada dial lleva su valor y una frase de por qué encaja con lo que el sitio cuenta. `identity-check.mjs` cuenta los seis distintos de la última fila de `brand-identity/identity-log.md` (Weisfeld, 2026-10-10).

La idea que lo ordena todo: **la landing es una revista de interiores que publica un reportaje sobre la app**. La app conserva su interfaz (cristal, píldoras, hoja inferior); la página que la rodea habla con la voz de la revista (serif fina, rúbricas, reglas de 1 px, mucho aire).

## Posicionamiento

- **Qué es:** una app móvil que, con una foto de un espacio o una superficie, genera un espejo ordenado del mismo encuadre, dice qué sobra, qué falta y qué se queda, y propone objetos que puedes cambiar, guardar y añadir a tus listas.
- **Para quién:** quien mira su escritorio, su encimera o su entrada y quiere verlo en orden antes de mover nada. En cinco segundos decide si quiere probarla (por defecto).
- **Tono, tres palabras:** sereno, cuidado, preciso.
- **Anti-tono, tres palabras que NO:** ruidoso, técnico, barato.
- **La petición:** apuntarse a la beta.

Respuestas del descubrimiento: 1, 3, 6, 7 y 8 vienen de Fernando (revista de interiores, minimalista, «muy clin», sensación de sitio caro; se mantienen las reglas de color; fuera la minúscula en todo; app de producto, sin persona). 2, 4, 5 y 10 van por defecto. 9: las únicas cifras comprobables son las del espejo aprobado (quitar 13, añadir 3, portátil fijado).

## Los seis diales

| dial | valor | por qué |
|---|---|---|
| 1 · Tipografía | display: Boska 300 y 300 cursiva (Fontshare) / texto: Switzer 400 y 500 / rótulos: Switzer 500 a 13 px en redonda con cifras tabulares · sin fontsource: las dos por el CDN de Fontshare | Boska es la serif alta y fina de las revistas de interiores; su cursiva hace de segunda voz. Switzer ya era la fuente del sistema de la app y sigue en el cuerpo y en la interfaz. Las dos son ITF FFL, que no deja subir los ficheros a un repo público. |
| 2 · Campo y color | fondo: lienzo de galería `#f7f7f7` / superficie `#ffffff` / tinta `#1b1b1b` / segunda voz `#5e5e5e` / regla `#c8c8c8` / acento: ninguno · una sola banda de tinta `#1b1b1b` para privacidad | Son los tokens de la app y Fernando pidió mantenerlos. Neutros y sin acento: el color lo pone la foto, como en una revista de interiores donde la página es blanca y el espacio fotografiado manda. |
| 3 · Materia visual | fotografía de interiores a sangre con un solo revelado suave (saturación 0.86): el par antes/espejo del escritorio frente al mar, sin stock ni recortes | Es el producto: una foto real y su espejo. Las fotos se ven enteras, como una doble página, y los objetos se señalan con números sobre la foto en vez de recortes ampliados. |
| 4 · Wordmark y escala | «Sitio» en Boska 300, una línea a sangre en el pie (`data-fit` 1.0), y pequeño en la barra y en el hero | La cabecera de revista: el nombre grande una sola vez, al cerrar, como la mancheta de la contraportada. Arriba manda la foto. |
| 5 · Firma de movimiento | barrido con clip-path (wipe): el antes se vuelve espejo con el scroll; las fotos se destapan con clip-path de abajo arriba; titulares que entran línea a línea con máscara; scroll suave con Lenis a 0.1; ease `cubic-bezier(0.22, 1, 0.36, 1)` entre 0.9 y 1.2 s | El barrido es el gesto del producto y ya estaba hecho. Todo lo demás lo repite: una cortina que sube. Las líneas, no las palabras, porque una revista se lee sereno. |
| 6 · Rótulos y retícula | folio de revista: numeración de sección `01` en Switzer + rúbrica en redonda sobre una regla de 1 px a sangre, sin antetítulo encima del titular; retícula de 12 columnas, titular en 2+8 y cuerpo en 7+4 | Es como se ordena una revista: la sección se reconoce por el folio, no por tarjetas. Las reglas finas sustituyen a las sombras de la versión anterior. Las versalitas espaciadas encima del titular son marca de plantilla (motion-site, «Lo que no hacemos»), por eso el folio va en redonda y en su propia línea. |

## Tokens (copiados a `:root` de `src/styles/global.css`)

    --bg: #f7f7f7;
    --card: #ffffff;
    --tile: #ececee;
    --fg: #1b1b1b;
    --fg-2: #5e5e5e;
    --fg-3: #6a6a6a;
    --line: #c8c8c8;
    /* sin acento */
    --band: #1b1b1b;      /* la banda de privacidad */
    --band-fg: #ffffff;
    --band-fg-2: #b4b4b4;
    --band-line: #3a3a3a;
    --display: "Boska";   /* titulares y wordmark */
    --sans: "Switzer";    /* cuerpo, rótulos e interfaz de la app */
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
    --topbar-blend: normal;
    --grain-blend: none;  /* sin grano: la página es limpia */
    --topbar-bg: var(--bg);
    --topbar-line: var(--line);

Los tokens de cristal (`--glass-strong` 0.62, `--glass-sheet` 0.66), las curvas de la app (easeInOutSine en el barrido, easeOutQuint 320 ms en hojas, easeOutCubic 200 ms en píldoras) y `ink.400 #8f8f92` (solo bordes) no cambian: son de la app y viven en `design/tokens.json`.

## Escala

| papel | escritorio (1440) | móvil (390) | ajuste |
|---|---|---|---|
| titular de sección | Boska 300, 88 px | 44 px | tracking -2 %, interlineado 1.0 |
| titular medio | Boska 300, 56 px | 34 px | -1.5 %, 1.05 |
| entradilla | Switzer 400, 21 px | 18 px | -0.5 %, 1.45 |
| cuerpo | Switzer 400, 17 px | 16 px | 0, 1.55 |
| rúbrica y folio | Switzer 500, 13 px | 13 px | 0, cifras tabulares |

## Ajustes que salen de los diales

- `signature`: wipe (dial 5). Lo implementa `src/scripts/hero.ts` (el barrido del hero) y `src/scripts/motion.ts` (el resto).
- `heroVariant`: media (dial 3).
- Fuentes: `https://api.fontshare.com/v2/css?f[]=boska@300,301&display=swap` y `…f[]=switzer@400,500,600&display=swap`, una petición por familia: con las dos en la misma URL el CDN devolvió solo la primera.

Contraste comprobado con `brand-identity/scripts/contrast.mjs`: tinta 16.08 y segunda voz 6.05 sobre `#f7f7f7`; regla 1.56; sobre la banda, blanco 17.22, segunda voz 8.31 y borde 1.51.

## Wordmark

- Texto exacto: «Sitio», con mayúscula inicial: es un nombre propio y la página ya no va en minúscula. Propuesta para revisar en el PR.
- Tratamiento: una línea a sangre en el pie; pequeño (Boska 300 a 24–28 px) en la barra de navegación y en la barra del hero.
- Proporciones: pie `data-fit="1"` con tope de alto; el hero no lleva fit.

## Cabecera

- La barra de navegación aparece después del hero y se queda fija arriba: «Sitio» a la izquierda, secciones en versalitas a la derecha, fondo de lienzo con regla de 1 px. El hero no tiene cabecera: la foto ocupa la pantalla.
- Enlace principal: «Apúntate a la beta» → `#beta`, en el hero (píldora de cristal, escritorio) y en la barra.
- Sin símbolo tras la marca.

## Material

- Materia única: fotografía de interiores con un mismo revelado suave (saturación 0.86, igual en el par para que el barrido siga casando).
- Piezas: ver `docs/assets/brief.json`.
- Retratos: no hay; la web es de producto. Ver `docs/assets/portrait-brief.json`.

## Referencias medidas

| url | qué se aprendió (ritmo, proporciones) | qué NO se copia |
|---|---|---|
| ninguna (por defecto) | La dirección viene de la descripción de Fernando: revista de interiores, página blanca, foto a sangre, mucho margen. | colores, tipografía, tiempos, textos |

## Distinción

Comparado con la última fila del registro (Weisfeld), `identity-check.mjs` da `OK (6 distintos)`. El dial 2 es el más cercano a ojo (fondo claro, tinta oscura), pero es neutro y sin acento frente al papel con índigo.
