---
fecha: 2026-10-26
visto: 1
destino: estandar
---

## Síntoma

El rediseño (primero editorial con Boska, después el escenario fijo con Switzer, GSAP y Lenis) tuvo ocho rodeos que el siguiente agente no debería repetir.

## Causa

1. Una sola URL de Fontshare con dos familias (`f[]=boska…&f[]=switzer…`) devolvió solo la primera. Con algunas combinaciones de pesos devolvió otra familia distinta.
2. Los números de «Mis cosas» se quedaron a escala 0.6. El `.spot` tenía `transition: transform` y GSAP lo animaba desde 0.6: en `ScrollTrigger.refresh()` GSAP vuelve a leer el valor de partida y lo pilló a medio camino de la transición CSS.
3. `motion-site/scripts/shot.mjs` hace scroll por toda la página antes de cada captura. Con Lenis, la captura del hero puede salir con el barrido en otra posición: no es un fallo del hero (a scroll 0 el reposo es 0.5, medido en el navegador).
4. `brand-identity/scripts/identity-check.mjs` compara con la última fila del registro. Si se añade la fila del proyecto antes de pasar el script, se compara consigo mismo y falla.
5. La hoja de la lista del móvil no subía: el CSS la escondía con `transform: translateY(105%)` y GSAP la animaba con `yPercent`. GSAP leyó el `translateY` como píxeles y los sumó al `yPercent`.
6. Recortar los objetos de nuestras propias fotos con Vision funciona, pero salen blandos a tamaño grande. Las fotos de producto de stock sobre fondo claro, recortadas igual, quedan nítidas.
7. El badge español de Apple sale de `tools.applemarketingtools.com`, que no resolvía ni desde la terminal ni desde el navegador de la sesión. `developer.apple.com` solo da el inglés.
8. Otros agentes (Grok) también editan el repo y rompían la marca sin que nada fallara: colores sueltos, otra fuente, mayúsculas, dependencias.

## Arreglo

1. Una petición por familia (`Base.astro`, lista `fonts`).
2. El botón (`.spot`) lleva la transición de hover; el círculo de dentro (`.spot-dot`) lleva la entrada de GSAP.
3. Para el hero, mirar `--split-top` con `scrollTo(0, 0)` en el navegador, o fiarse de `scripts/check-wipe.mjs`, que mide la línea y el tirador.
4. Pasar el script antes de escribir la fila, o con `--log` apuntando a una copia sin la última fila.
5. En el `fromTo`, `y: 0` explícito junto al `yPercent`.
6. Stock de producto para lo que se propone; nuestras fotos, solo enteras (pantalla del móvil y barrido).
7. Badges oficiales en inglés para los dos, para que casen; el español se baja a mano y se sustituye en `media/source/badges/`.
8. `scripts/check-brand.mjs` dentro de `verify.sh`, `agents/standards/05-marca.md` y un `AGENTS.md` en la raíz que se basta solo.

## Evidencia

Sesión del rediseño, 26 oct 2026, rama `redesign/identidad-editorial`.

## Cambio propuesto

2, 5 y 6 ya están en `standards/02-diseno.md` y `standards/04-imagenes.md`. Falta que una persona lo apruebe y saque esta ficha de `inbox/`.

## Caso de eval

Sin la petición por familia, la página cae en Georgia y Switzer no carga: `check-links` no lo ve porque la URL responde 200; se ve en la captura. Sin separar `.spot` y `.spot-dot`, los números miden 17 px en vez de 32 (`getBoundingClientRect`).
