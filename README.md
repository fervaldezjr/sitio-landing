# sitio-landing

Landing de **sitio**: con una foto de tu espacio, la app genera un espejo, una versión ordenada, con lo que sobra y lo que falta.

Publicación prevista: <https://fervaldezjr.github.io/sitio-landing/>

El workflow `.github/workflows/pages.yml` despliega desde `main` con base `/sitio-landing/`. Pages tiene que estar en **Source: GitHub Actions** ([ajustes](https://github.com/fervaldezjr/sitio-landing/settings/pages)). Sin ese permiso el job `deploy` no puede crear el sitio y la URL responde 404. El build y la subida del artefacto sí pasan.

## Desarrollo

```bash
npm install
npm run dev
```

El `base` es `/sitio-landing/`. En local la página queda en `http://127.0.0.1:4321/sitio-landing/`.

Verificar lint, tests, build, enlaces y contraste:

```bash
bash scripts/verify.sh
```

## Contenido

Todos los textos visibles están en `src/content/site.ts`.

## Imágenes

`npm run images` regenera AVIF, WebP y JPG desde `media/source/`. El par de escritorio se sirve como máximo a 1920 px: el JPEG de 2400 está ampliado y aquí no hay un reescalador neuronal. El par de móvil conserva sus 864 px.

Switzer se carga desde el CDN de Fontshare. La licencia ITF FFL no permite subir los ficheros de la fuente a un repo público.

## Beta

El formulario no tiene backend. Al enviarlo no sale nada del navegador: se muestra el aviso escrito en `src/content/site.ts`. No se guarda el correo.

## Agentes

La fuente es `agents/AGENTS.md`. `CLAUDE.md` y `.cursor/rules/agentes.mdc` apuntan a ella. Lo aprendido en cada sesión va a `agents/lessons/inbox/` para que el siguiente agente lo lea.
