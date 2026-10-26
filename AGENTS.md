# sitio-landing · instrucciones para cualquier agente

Claude, Cursor, Grok, Codex o el que sea: lee esto entero antes de tocar nada. La versión larga está en [`agents/AGENTS.md`](agents/AGENTS.md) y el índice de estándares en [`agents/INDEX.md`](agents/INDEX.md).

## Lo que no se negocia

1. **Verificar antes de decir «hecho»:** `bash scripts/verify.sh` en verde y di el resultado. No borres ni te saltes un paso para que pase.
2. **Marca:** lee [`agents/standards/05-marca.md`](agents/standards/05-marca.md). Switzer sola desde Fontshare, fondo blanco, paleta de la app sin acento, cristal ≥ 0.62, sin mayúsculas por CSS, sin cursivas, sin otra dependencia que `gsap` y `lenis`. `scripts/check-brand.mjs` lo comprueba.
3. **Copy:** todo el texto visible en `src/content/site.ts`, en español y con mayúscula inicial. Solo las cifras del espejo aprobado (quitar 13, añadir 3, portátil fijado). Nada de precios, testimonios, fechas ni usuarios.
4. **Badges de tienda:** los oficiales, sin tocar, y sin enlace hasta que la app esté publicada.
5. **Pregunta antes de:** añadir una dependencia, publicar fuera de GitHub Pages, recoger correos o añadir un backend, cambiar la identidad.
6. **Nunca:** secretos, `.env`, datos personales, ficheros de fuente, material de terceros sin crédito.

## Dónde está cada cosa

- Identidad y porqué: `docs/identity.md` · secciones: `docs/content.md` · material y créditos: `docs/assets/`.
- Escenario fijo: `src/components/Story.astro` + `src/scripts/story.ts`. Barrido a pantalla completa: `src/components/Compare.astro` + `src/scripts/compare.ts`. Resto del movimiento: `src/scripts/motion.ts`.
- Lo aprendido en sesiones anteriores: `agents/lessons/inbox/` (léelo para no repetir rodeos).
