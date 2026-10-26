/**
 * Every user-facing string on the landing lives here, in Spanish and in sentence case.
 * No prices, testimonials, guarantees, dates or counts beyond the approved mirror
 * (quitar 13, añadir 3, portátil fijado). `scripts/lint-repo.mjs` rejects any other figure.
 * Step numbers ("01") are rendered by the components from the order, not written here.
 */

export interface Heading {
  /** First voice, in ink. */
  lead: string;
  /** Second voice, in grey. */
  rest?: string;
}

export interface Product {
  /** File stem in public/media/products. */
  id: string;
  alt: string;
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
      { href: "#propuestas", label: "Propuestas" },
      { href: "#privacidad", label: "Privacidad" },
      { href: "#preguntas", label: "Preguntas" },
    ],
    cta: { href: "#beta", label: "Apúntate a la beta" },
  },
  story: {
    title: "Ordena tu espacio con una foto.",
    lede: "Sitio genera un espejo de tu espacio: el mismo encuadre, ordenado, con lo que sobra, lo que falta y lo que se queda.",
    cta: { href: "#beta", label: "Apúntate a la beta" },
    steps: [
      { title: "Haz una foto.", body: "Del espacio tal como está, sin recoger nada antes." },
      { title: "Sitio genera su espejo.", body: "El mismo encuadre, ordenado, generado con IA." },
      { title: "Lo que sobra, lo que falta y lo que se queda.", body: "Quitar 13 cosas, añadir 3 y dejar el portátil donde está." },
      { title: "Lo que falta llega con propuestas.", body: "Cada objeto que se añade trae alternativas." },
      { title: "Cámbialas, guárdalas o añádelas a tus listas.", body: "Tu espacio, en orden, antes de mover nada." },
    ],
    phone: {
      antes: "Antes",
      shutter: "Hacer la foto",
      status: "Generando tu espejo…",
      espejo: "Espejo · generado con IA",
      cardTitle: "Tu espejo",
      cardMeta: "Generado con IA",
      rows: [
        { icon: "remove" as const, title: "Quitar 13 cosas", detail: "Papeles, cables, vasos, botella…" },
        { icon: "add" as const, title: "Añadir 3", detail: "Bandeja de madera, taza, libreta" },
        { icon: "lock" as const, title: "Portátil", detail: "Se queda donde está · fijado" },
      ],
      listTitle: "Escritorio frente al mar",
      listMeta: "Añadir 3",
      listItems: ["Bandeja de madera", "Taza", "Libreta"],
      listAdd: "Añadir a una lista",
      listAdded: "En tu lista",
    },
    removed: ["Papeles", "Vasos", "Botella", "Libros", "Cables", "Caja", "Mochila"],
    products: [
      { id: "bandeja-1", name: "Bandeja de madera" },
      { id: "taza-1", name: "Taza" },
      { id: "libreta-1", name: "Libreta" },
    ],
    antesAlt: "Foto del escritorio desordenado frente al mar, hecha con el móvil",
    espejoAlt: "El mismo escritorio ordenado: espejo generado con IA",
  },
  stores: {
    /* Until a store URL exists, the badges are not links and say so. */
    soon: "Próximamente en",
    appStore: { href: null as string | null, alt: "App Store" },
    googlePlay: { href: null as string | null, alt: "Google Play" },
    legal:
      "Apple y el logotipo de Apple son marcas comerciales de Apple Inc. App Store es una marca de servicio de Apple Inc. Google Play y el logotipo de Google Play son marcas de Google LLC.",
  },
  statement: {
    title: {
      lead: "Un espejo de tu espacio,",
      rest: "para decidir objeto a objeto antes de mover nada.",
    } satisfies Heading,
  },
  compare: {
    id: "espejo",
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
    bar: { lead: "Compruébalo tú", rest: "Arrastra el tirador" },
    antesAlt: "Foto del escritorio desordenado, frente al mar",
    espejoAlt: "El mismo escritorio ordenado: espejo generado con IA",
    comparison: "Comparación entre la foto y el espejo. El tirador barre de una a la otra.",
    slider: "Barrido de antes a espejo",
    sliderValue: "Posición del barrido",
  },
  steps: {
    id: "como-funciona",
    title: { lead: "Tres pasos,", rest: "y el primero es una foto." } satisfies Heading,
    items: [
      { title: "Haz una foto", body: "Del espacio tal como está, sin preparar nada." },
      { title: "Mira tu espejo", body: "Una versión ordenada del mismo encuadre, generada con IA." },
      { title: "Decide objeto a objeto", body: "Quita lo que sobra, añade lo que falta y fija lo que se queda." },
    ],
  },
  proposals: {
    id: "propuestas",
    title: { lead: "Lo que falta llega con propuestas.", rest: "Cámbialas, guárdalas o añádelas a tus listas." } satisfies Heading,
    groups: [
      {
        name: "Bandeja de madera",
        items: [
          { id: "bandeja-1", alt: "Bandeja ovalada de madera de acacia" },
          { id: "bandeja-2", alt: "Bandeja ovalada de madera, más grande" },
          { id: "bandeja-3", alt: "Dos bandejas largas de madera" },
        ] satisfies Product[],
      },
      {
        name: "Taza",
        items: [
          { id: "taza-1", alt: "Taza de cerámica blanca sin asa" },
          { id: "taza-2", alt: "Taza blanca de cerámica con asa" },
          { id: "taza-3", alt: "Vaso de cerámica moteado en azul" },
        ] satisfies Product[],
      },
      {
        name: "Libreta",
        items: [
          { id: "libreta-1", alt: "Libreta abierta de hojas crema" },
          { id: "libreta-2", alt: "Libreta de espiral con un bolígrafo" },
          { id: "libreta-3", alt: "Libreta de espiral de tapa gris" },
        ] satisfies Product[],
      },
    ],
    add: "Añadir",
    save: "Guardar",
    note: "Fotos de producto de ejemplo. En la app, cada objeto que falta llega con sus propias propuestas.",
  },
  privacy: {
    id: "privacidad",
    title: {
      lead: "Antes de compartir se difuminan automáticamente caras, menores y pantallas.",
      rest: "Sin eso, no se comparte.",
    } satisfies Heading,
  },
  faq: {
    id: "preguntas",
    title: "Preguntas",
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
    title: { lead: "Apúntate a la beta.", rest: "Cuando haya lista, empezará aquí." } satisfies Heading,
    body: "Todavía no hay servidor: este formulario no envía ni guarda tu correo.",
    field: "Correo",
    placeholder: "tu@correo.com",
    button: "Apuntarme",
    status:
      "No hay lista todavía. Este formulario no envía ni guarda el correo: no sale nada de tu navegador.",
  },
  footer: {
    title: { lead: "Tu espacio,", rest: "en su sitio." } satisfies Heading,
    brand: "Sitio",
    ai: "El espejo de estas fotos es un ejemplo generado con IA a partir de una foto del mismo encuadre. En la app, el espejo se etiqueta siempre. Las propuestas son fotos de producto de Unsplash.",
    credit: "Build in public",
    linkLabel: "@ferlogs_",
    linkHref: "https://x.com/ferlogs_",
    top: "Volver arriba",
  },
} as const;
