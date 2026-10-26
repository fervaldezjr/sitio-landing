# Reglas de oro

Pocas y comprobables. Por debajo de 80 líneas.

## Comunes

| Regla | Por qué | Cómo se comprueba |
| --- | --- | --- |
| Antes de decir «hecho», pasa `bash scripts/verify.sh` y di el resultado | Lo que no se ha ejecutado no está verificado | El script sale 0 |
| Si no puedes comprobar algo, dilo | Un «creo que funciona» cuesta más que un «no lo he probado» | El informe nombra lo que no se abrió en un navegador |
| Ni secretos ni datos personales ni ficheros de fuentes | El repo es público | `scripts/lint-repo.mjs` |
| Los textos de la interfaz viven en `src/content/site.ts` | Si se duplican, se desfasan | Revisión del diff: español visible solo en ese fichero y en docs |
| Sigue el patrón del fichero vecino | La coherencia es más barata que un estilo nuevo | El diff no introduce otro framework |

## De este repo

| Regla | Por qué | Cómo se comprueba |
| --- | --- | --- |
| Código en inglés, documentación en español | Así está el sistema de sitio | Nombres de ficheros de código en inglés; `agents/` y `README.md` en español |
| Sin color de acento y sin `ink.400` como texto | El sistema es neutro y `#8F8F92` no llega a 4.5:1 | `scripts/check-contrast.mjs` |
| Switzer solo por el CDN de Fontshare | La licencia ITF FFL prohíbe redistribuir la fuente en un repo público | `scripts/lint-repo.mjs` rechaza `.woff`, `.woff2`, `.otf` y `.ttf` |
| En el copy, solo las cifras del espejo aprobado (13 y 3) | Un número nuevo parece una promesa | `scripts/lint-repo.mjs` falla con cualquier otra cifra en `site.ts` |
| Mayúscula inicial, no todo en minúscula | Se cambió el 26 oct 2026 con la identidad nueva | Revisión del diff de `site.ts` |
| Material de terceros, con crédito | Fotos de producto de Unsplash y badges de Apple y Google | `scripts/check-brand.mjs`: cada fichero de `media/source/products/` y `media/source/badges/` tiene su fila en `docs/assets/credits.json` |
| La marca no cambia por un diff | Otros agentes también editan el repo | `scripts/check-brand.mjs` y `standards/05-marca.md` |
| La beta no envía ni guarda el correo | No hay backend | El formulario hace `preventDefault` y el texto está en `site.ts` |
