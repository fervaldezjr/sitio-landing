# Contenido

> Leer cuando: tocas textos, secciones, la beta o el footer.

## Regla

Todo el texto visible sale de `src/content/site.ts`, en español (`es`, en `/`) y en inglés (`en`, en `/en/`), siempre con mayúscula inicial. Los dos tienen la misma forma (`Copy`): un texto nuevo va en los dos idiomas o no compila. No inventes cifras, precios, testimonios, fechas ni garantías. Las únicas cifras permitidas son las de la tarjeta del espejo ya aprobada: quitar 13, añadir 3, y el portátil fijado. Los números de los pasos («01») los ponen los componentes a partir del orden.

Los nombres no cambian: **Sitio** (producto, con mayúscula), **espejo** (en minúscula dentro de la frase) y las tres acciones **Quitar**, **Añadir** y **Fijado**; en inglés, **mirror**, **Remove**, **Add** y **Pinned**. En la interfaz simulada de la app, el espejo va con «generado con IA»; el de la landing es una composición y dice «ejemplo».

Las fotos de producto son de stock: la sección de propuestas y el pie dicen que son de ejemplo. Ninguna lleva marca, nombre comercial ni precio. El antes y el espejo de la página son una composición (foto de Pexels + objetos de Unsplash) y el pie lo dice. Enlazar propuestas a productos reales es cosa del producto, no de la landing.

La tarjeta dice «Quitar 13 cosas» y «Añadir 3»: el antes de `docs/assets/scene.json` tiene exactamente 13 cosas y el espejo, 3. Si cambia la escena, cambian a la vez la escena y el copy.

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
