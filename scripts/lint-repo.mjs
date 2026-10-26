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

const copy = await readFile(path.join(root, "src/content/site.ts"), "utf8");
const literals = [...copy.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map((match) => match[1]);
const visible = literals
  .filter((value) => /[a-záéíóúñ]/i.test(value))
  .join("\n")
  .replaceAll("IA", "");
if (/[A-Z]/.test(visible)) failures.push("uppercase copy outside the approved «IA» label");

await walk(root);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("lint-repo ok");
