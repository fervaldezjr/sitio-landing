# Contenido

> Leer cuando: tocas textos, secciones, la beta o el footer.

## Regla

Todo el texto visible sale de `src/content/site.ts`, en español y con mayúscula inicial (ya no va todo en minúscula). No inventes cifras, precios, testimonios, fechas ni garantías. Las únicas cifras permitidas son las de la tarjeta del espejo ya aprobada: quitar 13, añadir 3, y el portátil fijado. Los números de sección («01») y de objeto los ponen los componentes a partir del orden.

Los nombres no cambian: **Sitio** (producto, con mayúscula), **espejo** (en minúscula dentro de la frase y siempre con «generado con IA» cerca) y las tres acciones **Quitar**, **Añadir** y **Fijado**.

## Por qué

La landing presenta la app. Un número nuevo parece una promesa.

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

El ejemplo de «Tus listas» usa solo los tres objetos del espejo y dice que es un ejemplo. «Cualquier superficie» no enseña fotos de espacios que no existen: cuando haya otros pares antes/espejo hechos con la app, entran en `docs/assets/brief.json` (`more-spaces`).

La beta no tiene servidor. El botón no envía el correo: evita el submit y muestra el aviso del propio fichero de contenido. La pregunta «¿Cuándo puedo probarla?» lo dice también.

El footer explica que el espejo de las fotos es un ejemplo generado con IA y enlaza a https://x.com/ferlogs_.

## Cómo se comprueba

`scripts/lint-repo.mjs` falla si un texto de `site.ts` lleva una cifra distinta de 13 o 3. El diff de un cambio de copy solo toca `src/content/site.ts`. La lista de secciones con su idea está en `docs/content.md`.
