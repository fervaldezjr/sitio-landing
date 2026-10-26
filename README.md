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

Verificar lint, tests, build, barrido, enlaces y contraste:

```bash
bash scripts/verify.sh
```

## Identidad

La página se lee como una revista de interiores que publica un reportaje sobre la app. `docs/identity.md` fija los seis diales (tipografía, campo y color, materia, wordmark, firma de movimiento y rótulos) con el porqué de cada uno; `docs/content.md`, las secciones y lo que existe de verdad; `docs/assets/brief.json`, el material.

- Titulares en Boska y cuerpo en Switzer, las dos por el CDN de Fontshare. La licencia ITF FFL no permite subir los ficheros de fuente a un repo público.
- Los colores son los de la app (`design/tokens.json`), sin acento.
- Movimiento con GSAP (ScrollTrigger y SplitText) y Lenis en `src/scripts/motion.ts`; el barrido del hero, en `src/scripts/hero.ts`.

## Secciones

Hero con el barrido de antes a espejo · 01 La idea · 02 Cómo funciona · 03 Mis cosas (la foto y su espejo con cada objeto numerado) · 04 Tus listas · 05 Cualquier superficie · 06 Privacidad · 07 Preguntas · 08 Beta · pie con el wordmark.

## Contenido

Todos los textos visibles están en `src/content/site.ts`, con mayúscula inicial. Las únicas cifras son las del espejo aprobado (quitar 13, añadir 3, portátil fijado); `scripts/lint-repo.mjs` rechaza cualquier otra.

## Imágenes

`npm run images` regenera AVIF, WebP y JPG desde `media/source/`, con el mismo revelado suave para todas, y las miniaturas cuadradas de «Tus listas». El par de escritorio se sirve como máximo a 1920 px: el JPEG de 2400 está ampliado y aquí no hay un reescalador neuronal. El par de móvil conserva sus 864 px.

## Beta

El formulario no tiene backend. Al enviarlo no sale nada del navegador: se muestra el aviso escrito en `src/content/site.ts`. No se guarda el correo.

## Agentes

La fuente es `agents/AGENTS.md`. `CLAUDE.md` y `.cursor/rules/agentes.mdc` apuntan a ella. Lo aprendido en cada sesión va a `agents/lessons/inbox/` para que el siguiente agente lo lea.
