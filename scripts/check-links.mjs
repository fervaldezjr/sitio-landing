import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const base = "/sitio-landing";

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function urlsFrom(html) {
  const found = new Set();
  const attr = /(?:src|href|poster)=["']([^"']+)["']/gi;
  const srcset = /srcset=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attr)) found.add(match[1]);
  for (const match of html.matchAll(srcset)) {
    for (const part of match[1].split(",")) {
      const url = part.trim().split(/\s+/)[0];
      if (url) found.add(url);
    }
  }
  return [...found];
}

const failures = [];
const pages = await htmlFiles(dist);
if (pages.length === 0) {
  console.error("no html in dist");
  process.exit(1);
}

const ids = new Set();
for (const page of pages) {
  const html = await readFile(page, "utf8");
  for (const match of html.matchAll(/\sid=["']([^"']+)["']/gi)) ids.add(match[1]);
  for (const url of urlsFrom(html)) {
    if (url.startsWith("data:") || url.startsWith("mailto:") || url.startsWith("tel:")) continue;
    const hash = url.includes("#") ? url.slice(url.indexOf("#") + 1) : "";
    if (hash && !ids.has(hash)) failures.push(`missing id #${hash} (${url})`);
    if (url.startsWith("#")) continue;
    if (/^https?:\/\//.test(url)) {
      if (url.startsWith("https://fervaldezjr.github.io/sitio-landing")) continue;
      try {
        const response = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(12000) });
        if (response.status === 404 || response.status >= 500) failures.push(`${response.status} ${url}`);
      } catch (error) {
        failures.push(`unreachable ${url} (${error instanceof Error ? error.message : "error"})`);
      }
      continue;
    }
    const clean = url.split("#")[0].split("?")[0];
    if (!clean || clean.endsWith("/")) continue;
    const withoutBaseEarly = clean.startsWith(base) ? clean.slice(base.length) : clean;
    if (withoutBaseEarly === "" || withoutBaseEarly === "/" || withoutBaseEarly === "/index.html") continue;
    const withoutBase = (clean.startsWith(base) ? clean.slice(base.length) : clean).replace(/^\//, "");
    const local = path.join(dist, decodeURIComponent(withoutBase));
    try {
      const info = await stat(local);
      if (!info.isFile()) failures.push(`not a file ${url}`);
    } catch {
      failures.push(`missing asset ${url}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`links ok (${pages.length} html)`);
