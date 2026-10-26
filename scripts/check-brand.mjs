/**
 * Brand guard (agents/standards/05-marca.md). Other agents edit this repo too; these are the
 * rules of docs/identity.md that a diff can break without anyone noticing, checked by machine:
 * one font from one host, the app's palette and nothing else, glass that keeps text readable,
 * no eyebrow capitals or italics, the store badges untouched, credits for third-party material,
 * and no runtime dependency beyond GSAP and Lenis.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const fail = (message) => failures.push(message);

/* design/tokens.json plus the documented extras of docs/identity.md (band, phone body, hero). */
const PALETTE = new Set([
  "#ffffff", "#f7f7f7", "#ececee", "#ececec", "#c8c8c8", "#8f8f92", "#6a6a6a", "#5e5e5e",
  "#b4b4b4", "#3a3a3a", "#2c2c2c", "#1b1b1b", "#101010", "#0e0e0e", "#000000",
]);
/* rgb() bases allowed for translucency: white, black, ink, canvas and the glass tint. */
const RGB_BASES = new Set(["255,255,255", "0,0,0", "27,27,27", "247,247,247", "16,16,16"]);
const GLASS_MIN = 0.62;
const FONT_URL = "https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap";
const DEPENDENCIES = new Set(["gsap", "lenis"]);

const expand = (hex) => {
  const h = hex.toLowerCase().slice(1);
  if (h.length === 3) return `#${[...h].map((c) => c + c).join("")}`;
  if (h.length === 4 || h.length === 8) return null; // alpha hex: not part of the system
  return `#${h}`;
};

async function files(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await files(full)));
    else if (/\.(css|astro|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

for (const file of await files(path.join(root, "src"))) {
  const rel = path.relative(root, file);
  const lines = (await readFile(file, "utf8")).split("\n");
  lines.forEach((line, index) => {
    const at = `${rel}:${index + 1}`;
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // comments may name things

    for (const [hex] of line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
      const full = expand(hex);
      if (!full || !PALETTE.has(full)) fail(`${at}: colour ${hex} is not in the palette (docs/identity.md)`);
    }
    for (const [, inner] of line.matchAll(/rgba?\(((?:var\([^)]*\)|[^()])*)\)/g)) {
      const parts = inner.split(",").map((part) => part.trim());
      if (parts[0] === "var(--glass-tint)") {
        const alpha = parts[1];
        if (alpha && !alpha.startsWith("var(") && Number(alpha) < GLASS_MIN) fail(`${at}: glass alpha ${alpha} is below ${GLASS_MIN}`);
        continue;
      }
      if (!RGB_BASES.has(parts.slice(0, 3).join(","))) fail(`${at}: rgb(${inner}) is not a palette colour`);
    }
    if (/\b(hsla?|oklch|oklab|lab|lch|color-mix)\(/.test(line)) fail(`${at}: colour functions outside the palette are not allowed`);

    const family = line.match(/font-family\s*:\s*([^;]+)/);
    if (family && family[1].trim() !== "var(--font)" && family[1].trim() !== "inherit") fail(`${at}: font-family must be var(--font), got ${family[1].trim()}`);
    const fontVar = line.match(/--font\s*:\s*([^;]+)/);
    if (fontVar && !/^"Switzer",\s*system-ui,\s*sans-serif$/.test(fontVar[1].trim())) fail(`${at}: --font must stay "Switzer", system-ui, sans-serif`);
    if (/fonts\.googleapis|fonts\.gstatic|@fontsource|use\.typekit/.test(line)) fail(`${at}: fonts load only from api.fontshare.com`);
    if (/text-transform\s*:\s*uppercase/.test(line)) fail(`${at}: no capitals by CSS (no eyebrow labels)`);
    if (/font-style\s*:\s*italic/.test(line)) fail(`${at}: no italics in this identity`);
    if (/<link[^>]+rel="stylesheet"/.test(line) && !line.includes("href={font}")) fail(`${at}: the only external stylesheet is the Switzer one`);
  });
}

const base = await readFile(path.join(root, "src/layouts/Base.astro"), "utf8");
if (!base.includes(`const font = "${FONT_URL}";`)) fail("src/layouts/Base.astro: the font URL changed; it must be the Switzer one from Fontshare");

/* The App Store badge is published exactly as Apple ships it. */
const [badgeSource, badgePublished] = await Promise.all([
  readFile(path.join(root, "media/source/badges/app-store.svg")),
  readFile(path.join(root, "public/media/badges/app-store.svg")),
]);
if (!badgeSource.equals(badgePublished)) fail("public/media/badges/app-store.svg differs from Apple's file: regenerate with npm run images, never edit it");
try {
  await stat(path.join(root, "public/media/badges/google-play.png"));
} catch {
  fail("public/media/badges/google-play.png is missing: npm run images");
}

/* Third-party material needs its credit. */
const credits = JSON.parse(await readFile(path.join(root, "docs/assets/credits.json"), "utf8")).items ?? [];
const credited = new Set(credits.map((item) => item.file));
for (const dir of ["media/source/products", "media/source/badges"]) {
  for (const name of await readdir(path.join(root, dir))) {
    if (!credited.has(`${dir}/${name}`)) fail(`${dir}/${name} has no entry in docs/assets/credits.json`);
  }
}

/* Adding a runtime dependency is a question for a person, not a diff (agents/AGENTS.md). */
const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
for (const name of Object.keys(pkg.dependencies ?? {})) {
  if (!DEPENDENCIES.has(name)) fail(`package.json: dependency ${name} was not approved (ask before adding one)`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("brand ok");
