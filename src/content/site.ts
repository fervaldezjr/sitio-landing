/**
 * Every user-facing string on the landing lives here, in Spanish and in sentence case.
 * No prices, testimonials, guarantees, dates or counts beyond the approved mirror
 * (quitar 13, añadir 3, portátil fijado). `scripts/lint-repo.mjs` rejects any other figure.
 * Section numbers ("01") are rendered by the components from the order, not written here.
 */

export type ThingAction = "quitar" | "añadir" | "fijado";
export type Frame = "antes" | "espejo";

export interface Thing {
  id: string;
  name: string;
  action: ThingAction;
  frame: Frame;
  detail: string;
  /** Hotspot position on the 3:4 frame, as fractions of its width and height. */
  x: number;
  y: number;
}

export interface Heading {
  /** First voice, in ink. */
  lead: string;
  /** Second voice, in grey italic. */
  rest?: string;
}

export const site = {
  meta: {
    title: "Sitio · Ordena tu espacio con una foto",
    description:
      "Con una foto de tu espacio, Sitio genera un espejo: una versión ordenada del mismo encuadre, con lo que sobra, lo que falta y lo que se queda.",
    locale: "es",
    skip: "Saltar al contenido",
  },
  nav: {
    label: "Secciones",
    brand: "Sitio",
    links: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#mis-cosas", label: "Mis cosas" },
      { href: "#listas", label: "Listas" },
      { href: "#privacidad", label: "Privacidad" },
      { href: "#preguntas", label: "Preguntas" },
    ],
    cta: { href: "#beta", label: "Apúntate a la beta" },
  },
  hero: {
    heading: "Sitio",
    tagline: "Ordena tu espacio con una foto",
    antes: "Antes",
    espejo: "Espejo · generado con IA",
    cardTitle: "Tu espejo",
    cardMeta: "Generado con IA",
    rows: [
      {
        icon: "remove" as const,
        title: "Quitar 13 cosas",
        detail: "Papeles, cables, vasos, botella, libros, mochila…",
      },
      {
        icon: "add" as const,
        title: "Añadir 3",
        detail: "Bandeja de madera, taza, libreta",
      },
      {
        icon: "lock" as const,
        title: "Portátil",
        detail: "Se queda donde está · fijado",
      },
    ],
    cta: { href: "#beta", label: "Apúntate a la beta" },
    antesAlt: "Foto del escritorio desordenado, frente al mar",
    espejoAlt: "El mismo escritorio ordenado: espejo generado con IA",
    comparison: "Comparación entre la foto y el espejo. El tirador barre de una a la otra.",
    slider: "Barrido de antes a espejo",
    sliderValue: "Posición del barrido",
  },
  idea: {
    id: "la-idea",
    label: "La idea",
    title: { lead: "Una foto de tu espacio.", rest: "Y, a su lado, cómo podría estar." } satisfies Heading,
    body: [
      "Sitio mira el encuadre que fotografías y genera un espejo: el mismo espacio, ordenado, generado con IA.",
      "Te dice qué sobra, qué falta y qué se queda. Tú decides objeto a objeto, antes de mover nada.",
    ],
  },
  steps: {
    id: "como-funciona",
    label: "Cómo funciona",
    title: { lead: "Tres pasos,", rest: "y el primero es una foto." } satisfies Heading,
    stepLabel: "Paso",
    items: [
      {
        title: "Haz una foto",
        body: "Del espacio tal como está, sin preparar nada.",
      },
      {
        title: "Mira tu espejo",
        body: "Una versión ordenada del mismo encuadre, generada con IA.",
      },
      {
        title: "Decide objeto a objeto",
        body: "Quita lo que sobra, añade lo que falta y fija lo que se queda.",
      },
    ],
  },
  things: {
    id: "mis-cosas",
    label: "Mis cosas",
    title: { lead: "Cada cosa, en su sitio.", rest: "Señalada sobre la foto." } satisfies Heading,
    intro: "La foto y su espejo, con cada objeto numerado. Toca un número para ver qué pasa con él.",
    frames: {
      antes: {
        caption: "Antes. La foto, tal como se hizo.",
        alt: "Foto vertical del escritorio desordenado frente al mar, con una caja y una mochila en el suelo",
        list: "Lo que sobra",
      },
      espejo: {
        caption: "Espejo, generado con IA.",
        alt: "El mismo encuadre ordenado: portátil, bandeja de madera con una taza y una libreta",
        list: "Lo que falta y lo que se queda",
      },
    },
    actions: { quitar: "Quitar", añadir: "Añadir", fijado: "Fijado" } satisfies Record<ThingAction, string>,
    proposals: "En la app, llega con propuestas que puedes cambiar, guardar o añadir a una lista.",
    close: "Cerrar",
    openHint: "Abre la ficha",
    items: [
      { id: "papeles", name: "Papeles", action: "quitar", frame: "antes", detail: "Están en la foto y no en el espejo.", x: 0.12, y: 0.51 },
      { id: "vasos", name: "Vasos", action: "quitar", frame: "antes", detail: "Están en la foto y no en el espejo.", x: 0.325, y: 0.525 },
      { id: "botella", name: "Botella", action: "quitar", frame: "antes", detail: "Está en la foto y no en el espejo.", x: 0.645, y: 0.49 },
      { id: "libros", name: "Libros", action: "quitar", frame: "antes", detail: "Están en la foto y no en el espejo.", x: 0.755, y: 0.56 },
      { id: "cables", name: "Cables", action: "quitar", frame: "antes", detail: "Están en la foto y no en el espejo.", x: 0.47, y: 0.7 },
      { id: "caja", name: "Caja", action: "quitar", frame: "antes", detail: "Está en la foto y no en el espejo.", x: 0.09, y: 0.76 },
      { id: "mochila", name: "Mochila", action: "quitar", frame: "antes", detail: "Está en la foto y no en el espejo.", x: 0.31, y: 0.87 },
      { id: "portatil", name: "Portátil", action: "fijado", frame: "espejo", detail: "Se queda donde está.", x: 0.32, y: 0.465 },
      { id: "taza", name: "Taza", action: "añadir", frame: "espejo", detail: "Aparece en el espejo, sobre la bandeja.", x: 0.497, y: 0.475 },
      { id: "bandeja", name: "Bandeja de madera", action: "añadir", frame: "espejo", detail: "Aparece en el espejo.", x: 0.565, y: 0.552 },
      { id: "libreta", name: "Libreta", action: "añadir", frame: "espejo", detail: "Aparece en el espejo.", x: 0.68, y: 0.545 },
    ] satisfies Thing[],
  },
  lists: {
    id: "listas",
    label: "Tus listas",
    title: { lead: "Lo que falta llega con propuestas.", rest: "Las cambias, las guardas o las añades a tus listas." } satisfies Heading,
    body: "Cada objeto que el espejo añade viene con alternativas. Te quedas con la que encaja, la guardas para otro día o la sumas a una lista propia.",
    example: {
      tag: "Ejemplo",
      title: "Escritorio frente al mar",
      meta: "Añadir 3",
      items: [
        { id: "bandeja", name: "Bandeja de madera" },
        { id: "taza", name: "Taza" },
        { id: "libreta", name: "Libreta" },
      ],
      change: "Cambiar",
      save: "Guardar",
      add: "Añadir a una lista",
      caption: "Ejemplo hecho con los objetos del espejo de esta página.",
    },
  },
  surfaces: {
    id: "superficies",
    label: "Cualquier superficie",
    title: {
      lead: "Un escritorio, una encimera, una estantería, la entrada de casa.",
      rest: "Cualquier sitio que quieras ver en orden.",
    } satisfies Heading,
  },
  privacy: {
    id: "privacidad",
    label: "Privacidad",
    title: {
      lead: "Antes de compartir se difuminan automáticamente caras, menores y pantallas.",
      rest: "Sin eso, no se comparte.",
    } satisfies Heading,
  },
  faq: {
    id: "preguntas",
    label: "Preguntas",
    title: { lead: "Preguntas,", rest: "con respuesta corta." } satisfies Heading,
    items: [
      {
        q: "¿Qué es el espejo?",
        a: "Una versión ordenada del mismo encuadre que fotografías, generada con IA. En la app va siempre etiquetado.",
      },
      {
        q: "¿Tengo que recoger antes de hacer la foto?",
        a: "No. Se fotografía el espacio tal como está; el espejo enseña cómo podría quedar.",
      },
      {
        q: "¿Puedo dejar algo donde está?",
        a: "Sí. Lo que marcas como fijado se queda en su sitio, como el portátil de estas fotos.",
      },
      {
        q: "¿Qué hago con lo que falta?",
        a: "Cada objeto que se añade llega con propuestas. Puedes cambiarlas, guardarlas o añadirlas a tus listas.",
      },
      {
        q: "¿Qué pasa con las fotos que comparto?",
        a: "Antes de compartir se difuminan automáticamente caras, menores y pantallas. Sin eso, no se comparte.",
      },
      {
        q: "¿Cuándo puedo probarla?",
        a: "Sitio está en construcción y se cuenta en público en @ferlogs_. Todavía no hay lista de beta: el formulario de abajo no envía ni guarda nada.",
      },
    ],
  },
  beta: {
    id: "beta",
    label: "Beta",
    title: { lead: "Apúntate a la beta.", rest: "Cuando haya lista, empezará aquí." } satisfies Heading,
    body: "Todavía no hay servidor: este formulario no envía ni guarda tu correo.",
    field: "Correo",
    placeholder: "tu@correo.com",
    button: "Apuntarme",
    status:
      "No hay lista todavía. Este formulario no envía ni guarda el correo: no sale nada de tu navegador.",
  },
  footer: {
    wordmark: "Sitio",
    ai: "El espejo de estas fotos es un ejemplo generado con IA a partir de una foto del mismo encuadre. En la app, el espejo se etiqueta siempre.",
    credit: "Build in public",
    linkLabel: "@ferlogs_",
    linkHref: "https://x.com/ferlogs_",
    top: "Volver arriba",
  },
} as const;
