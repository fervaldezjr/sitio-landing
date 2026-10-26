---
fecha: 2026-10-26
visto: 1
destino: estandar
---

## Síntoma

La primera construcción de la landing tuvo cuatro rodeos que el siguiente agente no debería repetir.

## Causa

1. Los JPEG 16:9 de 2400×1350 son una ampliación blanda. No hay un reescalador neuronal instalable con fiabilidad en este entorno.
2. El modo `solo` del kit trae una plantilla de equipo (Kubernetes, colas, incidencias de pagos). Este repo no tiene nada de eso. Copiarla habría inventado un stack.
3. El par 16:9 está alineado de verdad: la diferencia media del tercio superior (mar y marco) es 0. El par 3:4 es otro encuadre, con el suelo, la caja y la mochila. Mezclarlos en el mismo barrido desalinea la mesa.
4. Sharp rechaza un `composite` encadenado con `resize` en el mismo pipeline aunque los metadatos digan el mismo tamaño. Hay que materializar el buffer antes.
5. `#ECECEC` sobre cristal 0.62 compuesto con blanco puro queda justo por encima de 4.5:1. La tarjeta, que lleva texto secundario, usa alfa 0.66.
6. En Astro 7 `import.meta.env.BASE_URL` no lleva barra final (`/sitio-landing`). Concatenar `base + "media/..."` produce `/sitio-landingmedia/...`. Hay que insertar la barra. Un `new URL("media/...", canonical)` sin barra final en el canonical sustituye el último segmento y se come el nombre del repo.
7. Astro 7.4 exige Node `>=22.23.4`. `actions/setup-node` con `node-version: 22` instaló 22.23.3 y el build murió al instante. El workflow fija `22.23.4`.

## Arreglo

- Servir el ancho a 1920 como máximo y el 3:4 a 864. AVIF, WebP y JPG.
- Dejar el kit en `agents/` con estándares de esta landing y los scripts de operación marcados «sin configurar». La guarda determinista es `scripts/verify.sh`, no un hook de un plugin que aquí no se ejecuta.
- Dos `picture` con `media`, cada una con su par.
- El reposo del hero es la composición s3 (divisor cerca del centro). El scroll barre desde ahí hacia el espejo con easeInOutSine. El tirador puede volver al antes.
- Medir el contraste sobre el píxel más claro de la zona, no solo sobre el token.

## Evidencia

Sesión de construcción de la landing, 26 oct 2026. Medición en `scripts/check-contrast.mjs`.

## Cambio propuesto

Ya está volcado en `standards/02-diseno.md`, `standards/04-imagenes.md` y en el propio `scripts/verify.sh`. Falta que una persona lo apruebe y saque esta ficha de `inbox/`.

Activar GitHub Pages no se pudo en la primera sesión: `POST /repos/fervaldezjr/sitio-landing/pages` respondió 403. Después se activó a mano (Source: GitHub Actions) y https://fervaldezjr.github.io/sitio-landing/ respondió 200. El workflow en `main` despliega solo.

## Caso de eval

Sin el tope de 1920, `public/media/hero/` tendría un derivado de 2400. Sin el alfa 0.66, el muestreo de «secondary on glass 0.66» no existiría y el texto secundario dependería del 0.62 justo. `bash scripts/verify.sh` cubre ambos.
