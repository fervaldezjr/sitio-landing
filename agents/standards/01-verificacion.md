# Verificación

Un agente que no puede comprobar su trabajo adivina.

## Un único comando

`bash scripts/verify.sh` hace, en este orden:

1. `astro check` y `scripts/lint-repo.mjs` (ficheros de fuentes, secretos, cifras fuera de las aprobadas en `site.ts`).
2. `node --test` del contraste y de la geometría del barrido.
3. `astro build`.
4. `scripts/check-wipe.mjs`: el tirador está sobre la línea en siete tamaños de pantalla. Sin Chrome solo mira el HTML; en macOS se activa con `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.
5. `scripts/check-links.mjs`: cada asset local existe, cada ancla tiene su `id` y las URL externas (las hojas de Fontshare incluidas) responden.
6. `scripts/check-contrast.mjs`: pares del sistema, la banda de privacidad y el peor píxel bajo el cristal de las fotos (hero, píldora de la beta y números de «Mis cosas»).

Reglas del comando: uno solo, determinista, y el resumen cabe en la terminal.

## Antes de cerrar

1. `bash scripts/verify.sh` en verde, o dicho qué falla y por qué.
2. Para un cambio visible: captura de escritorio (1440×900) y de móvil (390×844), no solo el build. Las animaciones de entrada solo se ven haciendo scroll de verdad: una captura de página entera sale con titulares escondidos.
3. No se borra un paso del script para que pase.

## Lo que no vale

- «Los tests pasan» sin haberlos ejecutado en esta sesión.
- Dar por publicado GitHub Pages sin haber pedido la URL y visto el HTML.
