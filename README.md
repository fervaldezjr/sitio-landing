# sitio-landing

Landing de **Sitio**: con una foto de tu espacio, la app genera un espejo, una versión ordenada del mismo encuadre, con lo que sobra, lo que falta y lo que se queda, y propone objetos que puedes cambiar, guardar y añadir a tus listas.

Publicada en <https://fervaldezjr.github.io/sitio-landing/>.

El workflow `.github/workflows/pages.yml` despliega desde `main` con base `/sitio-landing/`. Pages tiene que seguir en **Source: GitHub Actions** ([ajustes](https://github.com/fervaldezjr/sitio-landing/settings/pages)).

## Desarrollo

```bash
npm install
npm run dev
```

El `base` es `/sitio-landing/`. En local la página queda en `http://127.0.0.1:4321/sitio-landing/`.

Verificar lint, marca, tests, build, barrido, enlaces y contraste:

```bash
bash scripts/verify.sh
```

## Identidad

El producto se demuestra: la primera pantalla es un escenario fijo en el que el móvil hace la foto, genera el espejo, lo barre y acaba en la lista con las propuestas mientras haces scroll. `docs/identity.md` fija los seis diales con el porqué de cada uno y las cinco webs de referencia medidas; `docs/content.md`, las secciones y lo que existe de verdad; `docs/assets/brief.json`, el material.

- Una sola grotesca, Switzer, por el CDN de Fontshare. La licencia ITF FFL no permite subir los ficheros de fuente a un repo público.
- Los colores son los de la app (`design/tokens.json`), sin acento, sobre fondo blanco.
- Movimiento con GSAP (ScrollTrigger y SplitText) y Lenis: el escenario en `src/scripts/story.ts`, el barrido a pantalla completa en `src/scripts/compare.ts` y el resto en `src/scripts/motion.ts`.

## Secciones

Escenario con el móvil · frase · Compruébalo tú (barrido con tirador) · Cómo funciona · Propuestas · Privacidad · Preguntas · Beta · pie. En español (`/`) y en inglés (`/en/`).

## Contenido

Todos los textos visibles están en `src/content/site.ts`, en español e inglés con la misma forma, y con mayúscula inicial. Las únicas cifras son las del espejo aprobado (quitar 13, añadir 3, portátil fijado); `scripts/lint-repo.mjs` rechaza cualquier otra.

## Imágenes

El móvil del escenario usa el par vertical del escritorio frente al mar (generado con IA, 864 px). El par del barrido «Compruébalo tú» es una composición: `node scripts/compose-pair.mjs` toma la foto base de Pexels y le añade los objetos de `docs/assets/scene.json` (recortes de Unsplash), y saca un 16:9 y un 4:3 de la misma composición. `npm run images` aplica el revelado común y genera AVIF, WebP y JPG (16:9 hasta 2560 px, 4:3 hasta 1440) y las fotos de producto sin fondo. Todos los créditos están en `docs/assets/credits.json`.

## Tiendas

Los badges oficiales de App Store y Google Play están en la entrada y en la beta, sin alterar. Mientras la app no esté publicada salen bajo «Próximamente en» y no enlazan a nada: al publicarla, basta con poner las URL en `site.stores` de `src/content/site.ts`.

## Beta

El formulario no tiene backend. Al enviarlo no sale nada del navegador: se muestra el aviso escrito en `src/content/site.ts`. No se guarda el correo.

## Agentes

`AGENTS.md` (raíz) es el resumen que lee cualquier agente: Claude, Cursor, Grok o Codex. La fuente larga es `agents/AGENTS.md`; `CLAUDE.md` y `.cursor/rules/agentes.mdc` apuntan a ella. La marca está en `agents/standards/05-marca.md` y la comprueba `scripts/check-brand.mjs` dentro de `verify.sh`. Lo aprendido en cada sesión va a `agents/lessons/inbox/` para que el siguiente agente lo lea.
