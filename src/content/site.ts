/**
 * Every user-facing string on the landing lives here.
 * Spanish, lowercase, except the approved label «IA».
 * No prices, testimonials, guarantees, or counts that are not in the approved mirror.
 */

export type ThingAction = "quitar" | "añadir" | "fijado";

export interface Thing {
  id: string;
  name: string;
  action: ThingAction;
  detail: string;
  alt: string;
}

export const site = {
  meta: {
    title: "sitio · ordena tu espacio con una foto",
    description:
      "con una foto de tu espacio, sitio genera un espejo: una versión ordenada, con lo que sobra y lo que falta.",
    locale: "es",
  },
  nav: {
    label: "secciones",
    brand: "sitio",
    links: [
      { href: "#como-funciona", label: "cómo funciona" },
      { href: "#mis-cosas", label: "mis cosas" },
      { href: "#privacidad", label: "privacidad" },
      { href: "#beta", label: "beta" },
    ],
  },
  hero: {
    heading: "sitio",
    tagline: "ordena tu espacio con una foto",
    antes: "antes",
    espejo: "espejo · generado con IA",
    cardTitle: "tu espejo",
    cardMeta: "generado con IA",
    rows: [
      {
        icon: "remove" as const,
        title: "quitar 13 cosas",
        detail: "papeles, cables, vasos, botella, libros, mochila…",
      },
      {
        icon: "add" as const,
        title: "añadir 3",
        detail: "bandeja de madera, taza, libreta",
      },
      {
        icon: "lock" as const,
        title: "portátil",
        detail: "se queda donde está · fijado",
      },
    ],
    antesAlt: "foto del escritorio desordenado, frente al mar",
    espejoAlt: "el mismo escritorio ordenado: espejo generado con IA",
    comparison:
      "comparación entre la foto y el espejo. el tirador barre de una a la otra.",
    slider: "barrido de antes a espejo",
    sliderValue: "posición del barrido",
  },
  steps: {
    id: "como-funciona",
    title: "cómo funciona",
    items: [
      {
        title: "haz una foto",
        body: "del espacio, tal como está.",
      },
      {
        title: "mira tu espejo",
        body: "una versión ordenada del mismo encuadre, generada con IA.",
      },
      {
        title: "cambia, fija o quita cada objeto",
        body: "lo que sobra, lo que falta y lo que se queda.",
      },
    ],
  },
  things: {
    id: "mis-cosas",
    title: "mis cosas",
    intro: "recortes de la foto y del espejo. cada uno se puede quitar, añadir o dejar fijo.",
    close: "cerrar",
    openHint: "abre la ficha",
    items: [
      {
        id: "portatil",
        name: "portátil",
        action: "fijado",
        detail: "se queda donde está.",
        alt: "portátil abierto sobre el escritorio ordenado",
      },
      {
        id: "papeles",
        name: "papeles",
        action: "quitar",
        detail: "están en la foto y no en el espejo.",
        alt: "papeles sueltos sobre el escritorio",
      },
      {
        id: "vasos",
        name: "vasos",
        action: "quitar",
        detail: "están en la foto y no en el espejo.",
        alt: "vasos de café sobre el escritorio",
      },
      {
        id: "cables",
        name: "cables",
        action: "quitar",
        detail: "están en la foto y no en el espejo.",
        alt: "cable que cuelga del escritorio",
      },
      {
        id: "mochila",
        name: "mochila",
        action: "quitar",
        detail: "está en la foto y no en el espejo.",
        alt: "mochila en el suelo, junto a la mesa",
      },
      {
        id: "caja",
        name: "caja",
        action: "quitar",
        detail: "está en la foto y no en el espejo.",
        alt: "caja de cartón abierta en el suelo",
      },
      {
        id: "bandeja",
        name: "bandeja de madera",
        action: "añadir",
        detail: "aparece en el espejo.",
        alt: "bandeja de madera sobre el escritorio ordenado",
      },
      {
        id: "taza",
        name: "taza",
        action: "añadir",
        detail: "aparece en el espejo, sobre la bandeja.",
        alt: "taza clara sobre la bandeja de madera",
      },
      {
        id: "libreta",
        name: "libreta",
        action: "añadir",
        detail: "aparece en el espejo.",
        alt: "libreta cerrada sobre el escritorio ordenado",
      },
    ] satisfies Thing[],
  },
  privacy: {
    id: "privacidad",
    title: "privacidad",
    body: "antes de compartir se difuminan automáticamente caras, menores y pantallas. sin eso, no se comparte.",
  },
  beta: {
    id: "beta",
    title: "apúntate a la beta",
    body: "deja tu correo cuando haya lista. todavía no hay servidor.",
    label: "correo",
    placeholder: "tu@correo.com",
    button: "apuntarme",
    status:
      "no hay lista todavía. este formulario no envía ni guarda el correo: no sale nada de tu navegador.",
    note: "placeholder documentado: sin backend y sin recogida de datos.",
  },
  footer: {
    ai: "el espejo de estas fotos es un ejemplo generado con IA a partir de una foto del mismo encuadre. en la app, el espejo se etiqueta siempre.",
    credit: "build in public",
    linkLabel: "@ferlogs_",
    linkHref: "https://x.com/ferlogs_",
  },
} as const;
