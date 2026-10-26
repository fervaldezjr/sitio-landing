# Identidad · Sitio

La produce la skill brand-identity (26 oct 2026, segunda versión). Es el contrato visual de la landing: cuando algo dude a mitad de construcción, se decide mirando aquí. Cada dial lleva su valor y una frase de por qué encaja con lo que el sitio cuenta.

La idea que lo ordena todo: **el producto se demuestra, no se describe**. La primera pantalla es un escenario fijo: el móvil en el centro hace la foto, genera el espejo y lo reparte en lo que sobra, lo que falta y lo que se queda, mientras haces scroll. Todo lo demás es blanco, una sola grotesca y mucho aire.

La primera versión (revista de interiores con Boska, folios y reglas) se descartó el mismo día: la serif fina con cursiva gris y una página que solo «aparece» se leían como plantilla. Esta versión sale de cinco referencias medidas (tabla al final).

## Posicionamiento

- **Qué es:** una app móvil que, con una foto de un espacio o una superficie, genera un espejo ordenado del mismo encuadre, dice qué sobra, qué falta y qué se queda, y propone objetos que puedes cambiar, guardar y añadir a tus listas.
- **Para quién:** quien mira su escritorio, su encimera o su entrada y quiere verlo en orden antes de mover nada. En cinco segundos decide si quiere probarla (por defecto).
- **Tono, tres palabras:** limpio, seguro, preciso.
- **Anti-tono, tres palabras que NO:** decorativo, técnico, barato.
- **La petición:** apuntarse a la beta.

## Los seis diales

| dial | valor | por qué |
|---|---|---|
| 1 · Tipografía | display: Switzer 400 grande y apretada / texto: Switzer 400 / rótulos: Switzer 500 a 13 px · sin fontsource: Fontshare | Cuatro de las cinco referencias usan una grotesca neutra en regular (Suisse Intl, Inter Display, Geist, Aktiv Grotesk). Switzer es la fuente de la app: la marca y el producto hablan igual. Una sola familia. |
| 2 · Campo y color | fondo: blanco `#ffffff` / piezas sobre lienzo `#f7f7f7` y `#ececee` / tinta `#1b1b1b` / segunda voz `#5e5e5e` / acento: ninguno · una sección de tinta `#1b1b1b` para las propuestas | Blanco puro como see-for-yourself y AAT; los grises de la app hacen de peana para objetos y fotos. Sin acento, como pidió Fernando: el color lo ponen las fotos. |
| 3 · Materia visual | el producto en un móvil + objetos recortados sobre peana gris + la foto a sangre: un par antes/espejo compuesto sobre una foto real de 3466 px y fotos de producto de stock para las propuestas | La app se ve funcionando. El par sale de una sola foto nítida (Pexels) a la que se le añaden objetos recortados (Unsplash): lo que sobra en el antes, lo que falta en el espejo. Los propuestos van sobre el mismo gris, como un catálogo. |
| 4 · Wordmark y escala | humilde: «Sitio» pequeño en la píldora de navegación y al pie; la fuerza va a los titulares | El titular grande ya ocupa la pantalla; un wordmark gigante competiría con él. Así lo hacen see-for-yourself y AAT. |
| 5 · Firma de movimiento | escenario fijo con scroll: el móvil se queda en el centro y la pantalla cambia por pasos (foto, generando, barrido, tarjeta del espejo, propuestas); después, apariciones cortas; Lenis 0.1; ease `power3.out` | Es el gesto de la referencia más cercana (see-for-yourself, una primera sección de 6.750 px fija mientras cambia). Cuenta la app en el orden en que se usa. |
| 6 · Rótulos y retícula | sin rótulos: solo el titular, márgenes muy grandes; números `01 02 03` solo en los pasos; retícula de 12 columnas | La sección se reconoce por el espacio y la escala, no por etiquetas. Menos piezas, más caro. |

## Tokens (en `:root` de `src/styles/global.css`)

    --bg: #ffffff;
    --card: #f7f7f7;     /* peana de objetos y fotos */
    --tile: #ececee;
    --fg: #1b1b1b;
    --fg-2: #5e5e5e;
    --fg-3: #6a6a6a;
    --line: #ececee;     /* reglas decorativas */
    /* sin acento */
    --band: #1b1b1b;     /* sección de propuestas */
    --band-fg: #ffffff;
    --band-fg-2: #b4b4b4;
    --display: "Switzer";
    --sans: "Switzer";
    --ease: cubic-bezier(0.33, 1, 0.68, 1);   /* power3.out */
    --topbar-blend: normal;
    --grain-blend: none;
    --topbar-bg: rgba(16, 16, 16, 0.62);      /* la píldora es cristal de la app */
    --topbar-line: transparent;

Los tokens de cristal (`--glass-strong` 0.62, `--glass-sheet` 0.66), las curvas de la app y `ink.400 #8f8f92` (solo bordes) no cambian: viven en `design/tokens.json`.

El contrato corto para cualquier agente es `agents/standards/05-marca.md`, y `scripts/check-brand.mjs` hace cumplir la fuente, la paleta, el cristal, los badges, los créditos y las dependencias. Si un valor de aquí cambia, cambian los tres a la vez.

## Escala

| papel | escritorio (1440) | móvil (390) | ajuste |
|---|---|---|---|
| titular del escenario | 104 px | 46 px | 400, tracking -4.5 %, interlineado 0.96 |
| titular de sección | 72 px | 38 px | 400, -4 %, 1.0 |
| titular medio | 44 px | 30 px | 400, -3 %, 1.08 |
| leyenda del escenario | 28 px | 20 px | 400, -2 %, 1.2 |
| cuerpo | 17 px | 16 px | 400, -0.5 %, 1.5 |
| interfaz y rótulos | 13–15 px | 13–15 px | 500, 0 |

## Ajustes que salen de los diales

- `signature`: escenario fijo (dial 5), en `src/scripts/story.ts`. El barrido a pantalla completa sigue en `src/scripts/compare.ts` como sección interactiva («Compruébalo tú»).
- `heroVariant`: media (dial 3).
- Fuente: `https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap`.

Contraste comprobado con `brand-identity/scripts/contrast.mjs`: tinta 17.22 y segunda voz 6.48 sobre blanco; 16.08 y 6.05 sobre `#f7f7f7`; sobre la banda, blanco 17.22 y segunda voz 8.31.

## Idiomas

Español en `/` e inglés en `/en/`, con `hreflang` y el enlace EN/ES en la píldora. Los dos salen de `src/content/site.ts` con la misma forma (`Copy`): un campo que falte en un idioma no compila.

## Primera carga

Una pantalla blanca corta con «Sitio» y una barra de progreso hasta que las fuentes y las imágenes del escenario están decodificadas (2,5 s como mucho); después entra la intro. Las imágenes perezosas aparecen ya decodificadas, con un fundido. Sin JavaScript o con movimiento reducido, no hay pantalla de carga.

## Wordmark

- Texto exacto: «Sitio», con mayúscula inicial.
- Tratamiento: humilde. Switzer 600 a 15 px en la píldora de navegación y al pie.
- Proporciones: sin `data-fit`.

## Cabecera

- Una píldora de cristal de la app, centrada arriba y fija: «Sitio», cuatro secciones, el cambio de idioma (EN/ES) y «Apúntate a la beta» en blanco. En móvil, la marca, el idioma y la llamada.
- Sin símbolo tras la marca.

## Material

- Materia: el producto. El móvil se dibuja en CSS con la interfaz clara de la app: cabecera «Sitio», la foto como tarjeta 4:3 a lo ancho, un *skeleton* mientras genera, la tarjeta del espejo y la lista. La escena es horizontal, así que nunca se recorta en vertical: el 16:9 va a pantalla completa en escritorio y el 4:3, dentro del móvil y en el barrido en móvil.
- El par antes/espejo se compone con `scripts/compose-pair.mjs` desde `docs/assets/scene.json`: una foto base real (Pexels, 3466×5199) y objetos recortados con Vision, a su tamaño real según la profundidad, con sombra de contacto y reajuste de luz. En el barrido de la landing el espejo dice «Espejo · ejemplo»; en la interfaz simulada del móvil, «generado con IA», que es lo que hará la app. El pie lo explica.
- Los objetos propuestos son fotos de producto de stock recortadas con la segmentación de macOS (Vision) y puestas sobre `#f7f7f7`.
- Badges de App Store y Google Play: los oficiales, sin alterar, en la entrada del escenario y en la beta. Mientras la app no esté publicada, bajo «Próximamente en» y sin enlace (`site.stores`). Van en inglés porque la versión española de Apple no se pudo descargar desde la sesión; cambiarlos es sustituir `media/source/badges/` y regenerar.
- Piezas y créditos: `docs/assets/brief.json` y `docs/assets/credits.json`.
- Retratos: no hay; la web es de producto.

## Referencias medidas

Medidas con `brand-identity/scripts/recon.mjs` el 26 oct 2026; el material está en `reference/`, fuera de git.

| url | qué se aprendió (ritmo, proporciones) | qué NO se copia |
|---|---|---|
| see-for-yourself.com | 28 pantallas; la primera sección, 6.750 px fija con el móvil en el centro y la escena cambiando por pasos; titulares de 80 a 160 px con interlineado 1.0 y texto de interfaz de 12 a 16 px, casi sin tamaños intermedios; una sola sección oscura | su azul, Inter Display y Neue Montreal, sus renders 3D, sus textos y sus cifras («150k+») |
| aat-architecten.be | blanco, una grotesca en regular, titulares que entran línea a línea, la foto llega después; cinco pantallas | Suisse Intl, su logotipo, sus fotos |
| bybang.co/about | tipografía pequeña y densa en una columna lateral, el resto vacío | Geist, el grano, la composición |
| tarqstudio.com | titulares en mayúsculas anchas a los dos extremos de la línea; fotos grandes a sangre con pie pequeño | Aktiv Grotesk, la serif cursiva, el marrón |
| stanzza.design | ritmo calmado de secciones con mucho aire y FAQ en acordeón | Instrument Serif (marcada como «web de IA»), el crema, el manuscrito |

## Distinción

Frente a la última fila del registro de la skill (Weisfeld), `identity-check.mjs` da `OK (5 distintos)`: coincide el wordmark humilde. Frente a la primera versión de Sitio, cambian cinco: tipografía, materia, wordmark, firma y rótulos.
