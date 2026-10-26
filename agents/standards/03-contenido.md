# Contenido

> Leer cuando: tocas textos, la beta o el footer.

## Regla

Todo el texto visible sale de `src/content/site.ts`. No inventes cifras, precios, testimonios ni garantías. Las únicas cifras permitidas son las de la tarjeta del espejo ya aprobada: quitar 13, añadir 3, y el portátil fijado.

## Por qué

La landing presenta la app. Un número nuevo parece una promesa.

## Cómo

```ts
// src/content/site.ts
body: "antes de compartir se difuminan automáticamente caras, menores y pantallas. sin eso, no se comparte.",
```

```ts
// incorrecto: un precio, una reseña o «más de 10.000 personas»
```

La beta no tiene servidor. El botón no envía el correo: evita el submit y muestra el aviso del propio fichero de contenido.

El footer explica que el espejo de las fotos es un ejemplo generado con IA y enlaza a https://x.com/ferlogs_.

## Cómo se comprueba

`scripts/lint-repo.mjs` falla si el fichero de contenido tiene mayúsculas fuera de «IA». El diff de un cambio de copy solo toca `src/content/site.ts`.
