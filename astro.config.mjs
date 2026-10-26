import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://fervaldezjr.github.io",
  base: "/sitio-landing",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
