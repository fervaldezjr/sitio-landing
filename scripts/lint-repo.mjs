import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const skip = new Set(["node_modules", "dist", ".astro", ".git", "media"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (skip.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else await checkFile(full);
  }
}

async function checkFile(file) {
  const rel = path.relative(root, file);
  if (/\.(woff2?|otf|ttf)$/i.test(file)) failures.push(`font file in repo: ${rel}`);
  if (path.basename(file).startsWith(".env")) failures.push(`env file: ${rel}`);
  if (!/\.(css|ts|mjs|astro|md|html|json|yml|sh|svg)$/.test(file)) return;
  const text = await readFile(file, "utf8");
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(text) || /AKIA[0-9A-Z]{16}/.test(text) || /github_pat_[A-Za-z0-9_]{20}/.test(text)) {
    failures.push(`possible secret: ${rel}`);
  }
}

/* The only figures the copy may show are the approved mirror's: quitar 13 and añadir 3.
   Anything else (a price, a count of users, a date) reads as a promise. */
const APPROVED_FIGURES = new Set(["13", "3"]);
const copy = await readFile(path.join(root, "src/content/site.ts"), "utf8");
const literals = [...copy.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map((match) => match[1]);
/* File and anchor identifiers such as "bandeja-1" are not copy: lowercase words joined by hyphens, no spaces. */
const identifier = /^[a-z]+(?:-[a-z0-9]+)+$/;
for (const value of literals.filter((literal) => /[a-záéíóúñ]/i.test(literal) && !identifier.test(literal))) {
  for (const figure of value.match(/\d+(?:[.,]\d+)*/g) ?? []) {
    if (!APPROVED_FIGURES.has(figure)) failures.push(`figure outside the approved mirror in site.ts: "${figure}" in "${value}"`);
  }
}

await walk(root);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("lint-repo ok");
