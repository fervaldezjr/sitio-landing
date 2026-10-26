# Verificación

Un agente que no puede comprobar su trabajo adivina.

## Un único comando

`bash scripts/verify.sh` hace, en este orden:

1. `astro check` y `scripts/lint-repo.mjs` (ficheros de fuentes, secretos, cifras fuera de las aprobadas en `site.ts`).
2. `scripts/check-brand.mjs`: fuente y su URL, paleta, alfa del cristal, sin mayúsculas por CSS ni cursivas, badge de Apple idéntico al oficial, créditos de todo el material de terceros y dependencias aprobadas.
3. `node --test` del contraste y de la geometría del barrido.
4. `astro build`.
5. `scripts/check-wipe.mjs`: en «Compruébalo tú», el tirador está sobre la línea en siete tamaños de pantalla. Sin Chrome solo mira el HTML; en macOS se activa con `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
6. `scripts/check-links.mjs`: cada asset local existe, cada ancla tiene su `id` y las URL externas (las hojas de Fontshare incluidas) responden.
7. `scripts/check-contrast.mjs`: pares del sistema, la banda de propuestas y el peor píxel bajo el cristal de las fotos (las píldoras, el estado y la tarjeta del móvil, y las del barrido a pantalla completa).

Reglas del comando: uno solo, determinista, y el resumen cabe en la terminal.

## Antes de cerrar

1. `bash scripts/verify.sh` en verde, o dicho qué falla y por qué.
2. Para un cambio visible: captura de escritorio (1440×900) y de móvil (390×844), en español (`/`) y en inglés (`/en/`), no solo el build. El escenario fijo se revisa en varios puntos de su recorrido (inicio, foto, generando, barrido, tarjeta, lista), esperando a que el scrub llegue. Las entradas solo se ven haciendo scroll de verdad: una captura de página entera sale con titulares escondidos.
3. No se borra un paso del script para que pase.

## Lo que no vale

- «Los tests pasan» sin haberlos ejecutado en esta sesión.
- Dar por publicado GitHub Pages sin haber pedido la URL y visto el HTML.
