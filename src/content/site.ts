/**
 * Every user-facing string on the landing lives here, in Spanish (`es`, the default, at /) and
 * English (`en`, at /en/), always in sentence case. Both share one shape (`Copy`), so a field
 * missing from one language is a type error. No prices, testimonials, guarantees, dates or counts
 * beyond the approved mirror (remove 13, add 3, laptop pinned): `scripts/lint-repo.mjs` rejects
 * any other figure. Step numbers ("01") are rendered by the components from the order.
 */

export type Locale = "es" | "en";

export interface Heading {
  /** First voice, in ink. */
  lead: string;
  /** Second voice, in grey. */
  rest?: string;
}

export interface Product {
  /** File stem in public/media/products. */
  id: string;
  name: string;
  alt: string;
}

type Icon = "remove" | "add" | "lock";

const es = {
  meta: {
    title: "Sitio · Ordena tu espacio con una foto",
    description:
      "Con una foto de tu espacio, Sitio genera un espejo: una versión ordenada del mismo encuadre, con lo que sobra, lo que falta y lo que se queda.",
    lang: "es",
    ogLocale: "es_ES",
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
    language: { to: "en" as Locale, short: "EN", label: "Read in English" },
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
      status: "Generando tu espejo…",
      espejo: "Espejo · generado con IA",
      cardTitle: "Tu espejo",
      cardMeta: "Generado con IA",
      rows: [
        { icon: "remove" as Icon, title: "Quitar 13 cosas", detail: "Papeles, cables, vasos, botella…" },
        { icon: "add" as Icon, title: "Añadir 3", detail: "Bandeja de madera, taza, libreta" },
        { icon: "lock" as Icon, title: "Portátil", detail: "Se queda donde está · fijado" },
      ],
      listTitle: "Escritorio frente al mar",
      listMeta: "Añadir 3",
      listAdd: "Añadir a una lista",
      listAdded: "En tu lista",
    },
    removed: ["Papeles", "Vasos", "Botella", "Libros", "Cables", "Caja", "Mochila"],
    /* what the app spots on the photo while it generates (boxes in Story.astro, same order) */
    detected: ["Papeles", "Vasos", "Botella", "Cables", "Auriculares"],
    /* floating around the phone on the first screen */
    hints: ["Quitar 13 cosas", "Añadir 3", "Portátil fijado"],
    antesAlt: "Foto del escritorio desordenado frente al mar, hecha con el móvil",
    espejoAlt: "El mismo escritorio, ordenado: espejo generado con IA",
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
    espejo: "Espejo · ejemplo",
    cardTitle: "Tu espejo",
    cardMeta: "Ejemplo",
    rows: [
      { icon: "remove" as Icon, title: "Quitar 13 cosas", detail: "Papeles, vasos, libros, auriculares, botella, mochila…" },
      { icon: "add" as Icon, title: "Añadir 3", detail: "Bandeja de madera, taza, libreta" },
      { icon: "lock" as Icon, title: "Portátil", detail: "Se queda donde está · fijado" },
    ],
    bar: { lead: "Compruébalo tú", rest: "Arrastra el tirador" },
    antesAlt: "Foto del escritorio desordenado",
    espejoAlt: "El mismo escritorio, ordenado: ejemplo de espejo",
    comparison: "La foto y su espejo, lado a lado. Arrastra el tirador para pasar de una imagen a otra.",
    slider: "Barrido del antes al espejo",
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
    items: [
      { id: "bandeja-1", name: "Bandeja de madera", alt: "Bandeja ovalada de madera de acacia" },
      { id: "taza-1", name: "Taza", alt: "Taza de cerámica sin asa" },
      { id: "libreta-2", name: "Libreta", alt: "Libreta de espiral con un bolígrafo" },
    ] as Product[],
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
      { q: "¿Qué es el espejo?", a: "Una versión ordenada del mismo encuadre que fotografías, generada con IA. En la app va siempre etiquetado." },
      { q: "¿Tengo que recoger antes de hacer la foto?", a: "No. Se fotografía el espacio tal como está; el espejo enseña cómo podría quedar." },
      { q: "¿Puedo dejar algo donde está?", a: "Sí. Lo que marcas como fijado se queda en su sitio, como el portátil de estas fotos." },
      { q: "¿Qué hago con lo que falta?", a: "Cada objeto que se añade llega con propuestas. Puedes cambiarlas, guardarlas o añadirlas a tus listas." },
      { q: "¿Qué pasa con las fotos que comparto?", a: "Antes de compartir se difuminan automáticamente caras, menores y pantallas. Sin eso, no se comparte." },
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
    status: "No hay lista todavía. Este formulario no envía ni guarda el correo: no sale nada de tu navegador.",
  },
  footer: {
    title: { lead: "Tu espacio,", rest: "en su sitio." } satisfies Heading,
    brand: "Sitio",
    ai: "El espejo del móvil es un ejemplo generado con IA a partir de una foto del mismo encuadre. El de «Compruébalo tú» es una composición: una foto de Pexels con objetos de Unsplash recortados encima. En la app, el espejo se genera con IA y se etiqueta siempre. Las propuestas son fotos de Unsplash.",
    credit: "Build in public",
    linkLabel: "@ferlogs_",
    linkHref: "https://x.com/ferlogs_",
    top: "Volver arriba",
  },
};

export type Copy = typeof es;

const en: Copy = {
  meta: {
    title: "Sitio · Tidy your space with one photo",
    description:
      "With one photo of your space, Sitio creates a mirror: a tidy version of the same frame, showing what goes, what's missing and what stays.",
    lang: "en",
    ogLocale: "en_US",
    skip: "Skip to content",
  },
  nav: {
    label: "Sections",
    brand: "Sitio",
    links: [
      { href: "#como-funciona", label: "How it works" },
      { href: "#propuestas", label: "Suggestions" },
      { href: "#privacidad", label: "Privacy" },
      { href: "#preguntas", label: "Questions" },
    ],
    cta: { href: "#beta", label: "Join the beta" },
    language: { to: "es", short: "ES", label: "Leer en español" },
  },
  story: {
    title: "Tidy your space with one photo.",
    lede: "Sitio creates a mirror of your space: the same frame, tidied up, showing what goes, what's missing and what stays.",
    cta: { href: "#beta", label: "Join the beta" },
    steps: [
      { title: "Take a photo.", body: "Of the space as it is, no tidying first." },
      { title: "Sitio creates its mirror.", body: "The same frame, tidied up, generated with AI." },
      { title: "What goes, what's missing and what stays.", body: "Remove 13 things, add 3 and leave the laptop where it is." },
      { title: "What's missing comes with suggestions.", body: "Every object it adds comes with alternatives." },
      { title: "Swap them, save them or add them to your lists.", body: "Your space in order, before you move a thing." },
    ],
    phone: {
      antes: "Before",
      status: "Creating your mirror…",
      espejo: "Mirror · generated with AI",
      cardTitle: "Your mirror",
      cardMeta: "Generated with AI",
      rows: [
        { icon: "remove", title: "Remove 13 things", detail: "Papers, cables, cups, bottle…" },
        { icon: "add", title: "Add 3", detail: "Wooden tray, cup, notebook" },
        { icon: "lock", title: "Laptop", detail: "Stays where it is · pinned" },
      ],
      listTitle: "Desk by the sea",
      listMeta: "Add 3",
      listAdd: "Add to a list",
      listAdded: "In your list",
    },
    removed: ["Papers", "Cups", "Bottle", "Books", "Cables", "Box", "Backpack"],
    detected: ["Papers", "Cups", "Bottle", "Cables", "Headphones"],
    hints: ["Remove 13 things", "Add 3", "Laptop pinned"],
    antesAlt: "Photo of the messy desk by the sea, taken with the phone",
    espejoAlt: "The same desk, tidied up: a mirror generated with AI",
  },
  stores: {
    soon: "Coming soon to",
    appStore: { href: null, alt: "App Store" },
    googlePlay: { href: null, alt: "Google Play" },
    legal:
      "Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.",
  },
  statement: {
    title: {
      lead: "A mirror of your space,",
      rest: "to decide object by object before you move anything.",
    },
  },
  compare: {
    id: "espejo",
    antes: "Before",
    espejo: "Mirror · example",
    cardTitle: "Your mirror",
    cardMeta: "Example",
    rows: [
      { icon: "remove", title: "Remove 13 things", detail: "Papers, cups, books, headphones, bottle, backpack…" },
      { icon: "add", title: "Add 3", detail: "Wooden tray, cup, notebook" },
      { icon: "lock", title: "Laptop", detail: "Stays where it is · pinned" },
    ],
    bar: { lead: "Try it", rest: "Drag the handle" },
    antesAlt: "Photo of the messy desk",
    espejoAlt: "The same desk, tidied up: an example mirror",
    comparison: "The photo and its mirror, side by side. Drag the handle to wipe from one to the other.",
    slider: "Wipe from before to mirror",
    sliderValue: "Wipe position",
  },
  steps: {
    id: "como-funciona",
    title: { lead: "Three steps,", rest: "and the first one is a photo." },
    items: [
      { title: "Take a photo", body: "Of the space as it is, nothing to prepare." },
      { title: "See your mirror", body: "A tidy version of the same frame, generated with AI." },
      { title: "Decide object by object", body: "Remove what's extra, add what's missing and pin what stays." },
    ],
  },
  proposals: {
    id: "propuestas",
    title: { lead: "What's missing comes with suggestions.", rest: "Swap them, save them or add them to your lists." },
    items: [
      { id: "bandeja-1", name: "Wooden tray", alt: "Oval acacia wood tray" },
      { id: "taza-1", name: "Cup", alt: "Handleless ceramic cup" },
      { id: "libreta-2", name: "Notebook", alt: "Spiral notebook with a pen" },
    ],
    note: "Example product photos. In the app, every missing object comes with its own suggestions.",
  },
  privacy: {
    id: "privacidad",
    title: {
      lead: "Before you share, faces, children and screens are blurred automatically.",
      rest: "Without that, nothing gets shared.",
    },
  },
  faq: {
    id: "preguntas",
    title: "Questions",
    items: [
      { q: "What is the mirror?", a: "A tidy version of the same frame you photograph, generated with AI. In the app it's always labeled." },
      { q: "Do I have to tidy up before taking the photo?", a: "No. You photograph the space as it is; the mirror shows how it could look." },
      { q: "Can I leave something where it is?", a: "Yes. Anything you pin stays in place, like the laptop in these photos." },
      { q: "What do I do with what's missing?", a: "Every object that gets added comes with suggestions. You can swap them, save them or add them to your lists." },
      { q: "What happens to the photos I share?", a: "Before you share, faces, children and screens are blurred automatically. Without that, nothing gets shared." },
      {
        q: "When can I try it?",
        a: "Sitio is being built in public on @ferlogs_. There's no beta list yet: the form below doesn't send or store anything.",
      },
    ],
  },
  beta: {
    id: "beta",
    title: { lead: "Join the beta.", rest: "When there's a list, it will start here." },
    body: "There's no server yet: this form doesn't send or store your email.",
    field: "Email",
    placeholder: "you@email.com",
    button: "Join",
    status: "There's no list yet. This form doesn't send or store your email: nothing leaves your browser.",
  },
  footer: {
    title: { lead: "Your space,", rest: "in its place." },
    brand: "Sitio",
    ai: "The mirror on the phone is an example generated with AI from a photo of the same frame. The one in “Try it” is a composite: a Pexels photo with Unsplash objects cut out and placed on top. In the app, the mirror is generated with AI and always labeled. The suggestions are Unsplash photos.",
    credit: "Build in public",
    linkLabel: "@ferlogs_",
    linkHref: "https://x.com/ferlogs_",
    top: "Back to top",
  },
};

export const copy: Record<Locale, Copy> = { es, en };

/** The copy for the page being rendered: `copyFor(Astro.currentLocale)`. */
export function copyFor(locale: string | undefined): Copy {
  return locale === "en" ? en : es;
}
