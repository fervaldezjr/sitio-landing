# Verificación

Un agente que no puede comprobar su trabajo adivina.

## Un único comando

`bash scripts/verify.sh` hace, en este orden:

1. `astro check` y `scripts/lint-repo.mjs` (fuentes, secretos, mayúsculas fuera de «IA»).
2. `node --test` del contraste y de la curva easeInOutSine.
3. `astro build`.
4. `scripts/check-links.mjs`: cada asset local existe y cada ancla tiene su `id`.
5. `scripts/check-contrast.mjs`: pares del sistema y el peor píxel bajo el cristal de las fotos.

Reglas del comando: uno solo, determinista, y el resumen cabe en la terminal.

## Antes de cerrar

1. `bash scripts/verify.sh` en verde, o dicho qué falla y por qué.
2. Para un cambio visible: captura de escritorio y de móvil, no solo el build.
3. No se borra un paso del script para que pase.

## Lo que no vale

- «Los tests pasan» sin haberlos ejecutado en esta sesión.
- Dar por publicado GitHub Pages sin haber pedido la URL y visto el HTML.
