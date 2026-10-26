# Marca y estilo · lo que no se toca sin una persona

> Leer siempre antes de cambiar CSS, componentes, copy o material. Vale para cualquier agente (Claude, Cursor, Grok, Codex…). El porqué está en `docs/identity.md`; esto es el contrato corto, y casi todo lo comprueba `scripts/check-brand.mjs`.

## La idea

**El producto se demuestra.** La primera pantalla es un escenario fijo: el móvil en el centro hace la foto, genera el espejo, lo barre, enseña su tarjeta y acaba en la lista con las propuestas mientras haces scroll. El resto es blanco, una sola grotesca y mucho aire. Referencia más cercana medida: see-for-yourself.com (ver la tabla de `docs/identity.md`). No se copia de ella ni color, ni fuente, ni texto, ni cifra.

## Valores fijos

| qué | valor | lo comprueba |
| --- | --- | --- |
| Fuente | Switzer, una sola familia, 400 (titulares y cuerpo), 500 (interfaz), 600 (marca y tarjetas de la app); solo por `api.fontshare.com` | `check-brand.mjs` (font-family, `--font`, URL), `lint-repo.mjs` (ficheros de fuente) |
| Fondo | `#FFFFFF` | `check-brand.mjs` (paleta) |
| Peana de piezas | `#F7F7F7`; `#ECECEE` para pistas y reglas | idem |
| Tinta y segunda voz | `#1B1B1B` y `#5E5E5E` (`#6A6A6A` como mínimo para texto) | `check-contrast.mjs` |
| Banda oscura | una sola, `#1B1B1B` con `#FFFFFF` y `#B4B4B4`: la de propuestas | `check-contrast.mjs` |
| Acento | ninguno | `check-brand.mjs` rechaza cualquier color fuera de la paleta |
| Cristal de la app | `rgba(16,16,16, ≥0.62)`; 0.66 en tarjetas y estados | `check-brand.mjs`, `check-contrast.mjs` |
| `#8F8F92` | solo bordes y el asa, nunca texto | `check-contrast.mjs` |
| Titulares | Switzer 400, 40–92 px, tracking -4 a -4.5 %, interlineado 0.96–1.0, dos voces con `Title.astro` | revisión del diff |
| Wordmark | «Sitio», pequeño (píldora y pie); sin logotipo gigante | revisión del diff |
| Rótulos | ninguno encima de los titulares; números `01 02 03` solo en pasos | `check-brand.mjs` rechaza `text-transform: uppercase` |
| Curvas | página `power3.out`; barrido easeInOutSine; hojas easeOutQuint 320 ms; nunca rebote | revisión del diff |
| Dependencias | solo `gsap` y `lenis` en `dependencies` | `check-brand.mjs` |
| Idiomas | español en `/`, inglés en `/en/`; todo texto, en los dos | TypeScript (`Copy`) en `astro check` |

## Material

- Una materia: el producto. El móvil y su interfaz clara se dibujan en CSS; dentro va la foto 4:3. El barrido a pantalla completa es el 16:9 (en móvil, el 4:3).
- El par antes/espejo se compone con `scripts/compose-pair.mjs` sobre una foto real; no se sustituye por una ampliación ni por una imagen generada sin decirlo.
- Las propuestas son fotos de producto de Unsplash, sin fondo (Vision), sobre `#F7F7F7`, con la misma sombra del CSS. Cada fichero, su crédito en `docs/assets/credits.json`. La página dice que son de ejemplo.
- Badges de App Store y Google Play: los oficiales, **sin tocar** (ni color, ni proporción, ni texto). Mientras `site.stores.*.href` sea `null`, salen bajo «Próximamente en» y no son enlaces. El aviso de marcas va en el pie.

## Nunca

- Otra fuente, una serif, cursivas, Google Fonts, fontsource o ficheros de fuente.
- Un color de acento, degradados de color, sombras de color, emojis o iconos en círculos de color.
- Antetítulos en mayúsculas espaciadas, «desliza» o flechas animadas en el hero.
- Fotos de stock con personas, logotipos o texto; fotos sin tratar o sin crédito.
- Cifras, precios, testimonios, fechas, contadores de usuarios o garantías (ver `03-contenido.md`).
- Enlazar los badges a una tienda sin que la app esté publicada, o cambiarlos por versiones «más bonitas».
- Desactivar o saltarse un paso de `scripts/verify.sh`.

## Para cambiar algo de aquí

Se propone en `agents/proposals/` con el porqué y una captura, y lo aprueba una persona. Si se aprueba, se cambian a la vez `docs/identity.md`, este fichero y la lista de `scripts/check-brand.mjs`.
