---
fecha: 2026-10-26
visto: 1
destino: estandar
---

## Síntoma

El rediseño editorial (Boska + Switzer, GSAP y Lenis) tuvo cuatro rodeos que el siguiente agente no debería repetir.

## Causa

1. Una sola URL de Fontshare con dos familias (`f[]=boska…&f[]=switzer…`) devolvió solo la primera. Con algunas combinaciones de pesos devolvió otra familia distinta.
2. Los números de «Mis cosas» se quedaron a escala 0.6. El `.spot` tenía `transition: transform` y GSAP lo animaba desde 0.6: en `ScrollTrigger.refresh()` GSAP vuelve a leer el valor de partida y lo pilló a medio camino de la transición CSS.
3. `motion-site/scripts/shot.mjs` hace scroll por toda la página antes de cada captura. Con Lenis, la captura del hero puede salir con el barrido en otra posición: no es un fallo del hero (a scroll 0 el reposo es 0.5, medido en el navegador).
4. `brand-identity/scripts/identity-check.mjs` compara con la última fila del registro. Si se añade la fila del proyecto antes de pasar el script, se compara consigo mismo y falla.

## Arreglo

1. Una petición por familia (`Base.astro`, lista `fonts`).
2. El botón (`.spot`) lleva la transición de hover; el círculo de dentro (`.spot-dot`) lleva la entrada de GSAP.
3. Para el hero, mirar `--split-top` con `scrollTo(0, 0)` en el navegador, o fiarse de `scripts/check-wipe.mjs`, que mide la línea y el tirador.
4. Pasar el script antes de escribir la fila, o con `--log` apuntando a una copia sin la última fila.

## Evidencia

Sesión del rediseño, 26 oct 2026, rama `redesign/identidad-editorial`.

## Cambio propuesto

1 y 2 ya están en `standards/02-diseno.md`. Falta que una persona lo apruebe y saque esta ficha de `inbox/`.

## Caso de eval

Sin la petición por familia, la página cae en Georgia y Switzer no carga: `check-links` no lo ve porque la URL responde 200; se ve en la captura. Sin separar `.spot` y `.spot-dot`, los números miden 17 px en vez de 32 (`getBoundingClientRect`).
