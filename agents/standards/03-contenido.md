# Contenido

> Leer cuando: tocas textos, secciones, la beta o el footer.

## Regla

Todo el texto visible sale de `src/content/site.ts`, en español y con mayúscula inicial. No inventes cifras, precios, testimonios, fechas ni garantías. Las únicas cifras permitidas son las de la tarjeta del espejo ya aprobada: quitar 13, añadir 3, y el portátil fijado. Los números de los pasos («01») los ponen los componentes a partir del orden.

Los nombres no cambian: **Sitio** (producto, con mayúscula), **espejo** (en minúscula dentro de la frase y siempre con «generado con IA» cerca) y las tres acciones **Quitar**, **Añadir** y **Fijado**.

Las fotos de producto son de stock: la sección de propuestas y el pie dicen que son de ejemplo. Ninguna lleva marca, nombre comercial ni precio.

## Por qué

La landing presenta la app. Un número nuevo parece una promesa, y una foto de producto sin aviso parecería un catálogo real.

## Cómo

```ts
// src/content/site.ts
privacy: {
  title: {
    lead: "Antes de compartir se difuminan automáticamente caras, menores y pantallas.",
    rest: "Sin eso, no se comparte.",
  },
},
```

```ts
// incorrecto: un precio, una reseña o «más de 10.000 personas»
```

Los pasos del escenario (`story.steps`) cuentan la app en el orden en que se usa; si se añade uno, hay que darle su tramo en `src/scripts/story.ts` (`at`).

La beta no tiene servidor. El botón no envía el correo: evita el submit y muestra el aviso del propio fichero de contenido. La pregunta «¿Cuándo puedo probarla?» lo dice también.

El footer explica que el espejo de las fotos es un ejemplo generado con IA, que las propuestas son fotos de Unsplash, y enlaza a https://x.com/ferlogs_.

## Cómo se comprueba

`scripts/lint-repo.mjs` falla si un texto de `site.ts` lleva una cifra distinta de 13 o 3. El diff de un cambio de copy solo toca `src/content/site.ts`. La lista de secciones con su idea está en `docs/content.md`.
