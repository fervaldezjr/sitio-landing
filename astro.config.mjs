import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://fervaldezjr.github.io",
  base: "/sitio-landing",
  compressHTML: true,
  /* Spanish at /, English at /en/ (src/content/site.ts holds both). */
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: "auto",
  },
});
