import { createRequire } from "node:module";
import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const base = "/sitio-landing";
const chrome = [process.env.CHROME_PATH, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find(
  (file) => file && existsSync(file),
);

const html = await readFile(path.join(dist, "index.html"), "utf8");
if (!html.includes("data-wipe-stroke") || !html.includes("data-wipe-handle")) {
  console.error("built hero is missing the wipe stroke or the handle");
  process.exit(1);
}
const builtCss = (await readBuiltCss(html)) ?? "";
if (builtCss.includes("rotate(") && /\.wipe-line\{[^}]*rotate\(/.test(builtCss)) {
  console.error("built css still rotates .wipe-line");
  process.exit(1);
}
console.log("check-wipe: built markup ok");

if (!chrome) {
  console.log("check-wipe: no Chrome, skipped the rendered measurement");
  process.exit(0);
}

const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = require("puppeteer-core");
} catch {
  console.error("check-wipe: Chrome is available but puppeteer-core is not installed");
  process.exit(1);
}

const server = await start(dist);
const url = `http://127.0.0.1:${server.address().port}${base}/`;
const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});

const failures = [];
try {
  const page = await browser.newPage();
  const viewports = [
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
    { width: 1280, height: 800 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 360, height: 740 },
  ];
  for (const viewport of viewports) {
    await page.setViewport({ ...viewport, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-wipe-handle]");
    await settle(page);
    for (const fraction of [0, 0.35, 0.7, 1]) {
      await page.evaluate((value) => {
        /* The wipe is no longer the first section: scroll within its own runway. */
        const runway = document.querySelector("[data-hero-runway]");
        const top = runway.getBoundingClientRect().top + window.scrollY;
        const total = runway.offsetHeight - window.innerHeight;
        window.scrollTo(0, top + total * value);
      }, fraction);
      await settle(page);
      await record(page, failures, `${viewport.width}x${viewport.height} scroll ${fraction}`);
    }
    await page.focus("[data-wipe-handle]");
    for (const key of ["Home", "End"]) {
      await page.keyboard.press(key);
      await settle(page);
      await record(page, failures, `${viewport.width}x${viewport.height} key ${key}`);
    }
  }

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-wipe-handle]");
  await page.evaluate(() => document.querySelector("[data-hero-runway]").scrollIntoView());
  await settle(page);
  await record(page, failures, "1440x900 reduced-motion");
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("check-wipe: handle is on the line");

async function readBuiltCss(pageHtml) {
  const hrefs = [...pageHtml.matchAll(/href="([^"]+\.css)"/g)].map((match) => match[1]);
  const chunks = [];
  for (const href of hrefs) {
    const rel = href.replace(base, "").replace(/^\//, "");
    const file = path.join(dist, rel);
    if (existsSync(file)) chunks.push(await readFile(file, "utf8"));
  }
  return chunks.join("\n");
}

function start(dir) {
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".png": "image/png",
  };
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      let pathname = decodeURIComponent(url.pathname);
      if (pathname === base || pathname === `${base}/`) pathname = `${base}/index.html`;
      if (!pathname.startsWith(`${base}/`)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const rel = pathname.slice(base.length + 1);
      const file = path.resolve(dir, rel);
      if (!file.startsWith(dir + path.sep) || !existsSync(file) || !statSync(file).isFile()) {
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
      createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function settle(page) {
  return page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)));
      }),
  );
}

async function record(page, failures, label) {
  const sample = await page.evaluate(() => {
    const handle = document.querySelector("[data-wipe-handle]");
    const stroke = document.querySelector("[data-wipe-stroke]");
    const box = handle.getBoundingClientRect();
    const hx = box.left + box.width / 2;
    const hy = box.top + box.height / 2;
    const ctm = stroke.getScreenCTM();
    const a = new DOMPoint(stroke.x1.baseVal.value, stroke.y1.baseVal.value).matrixTransform(ctm);
    const b = new DOMPoint(stroke.x2.baseVal.value, stroke.y2.baseVal.value).matrixTransform(ctm);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((hx - a.x) * dx + (hy - a.y) * dy) / len2));
    const closestX = a.x + t * dx;
    const closestY = a.y + t * dy;
    const yT = dy === 0 ? 0 : (hy - a.y) / dy;
    const xAtHeight = a.x + yT * dx;
    const px = (selector) => parseFloat(getComputedStyle(document.querySelector(selector)).fontSize);
    return {
      dist: Math.hypot(hx - closestX, hy - closestY),
      dxAtHeight: hx - xAtHeight,
      yT,
      pill: px(".pill"),
      strong: px(".mirror-row p strong"),
      detail: px(".mirror-row p span"),
      width: window.innerWidth,
    };
  });
  const geometry = Math.abs(sample.dist) <= 1.5 && Math.abs(sample.dxAtHeight) <= 1.5 && sample.yT > 0.05 && sample.yT < 0.95;
  const type = sample.pill >= 14 && sample.strong >= 16 && sample.detail >= 16;
  const desktopScale = sample.width < 1200 || (sample.pill >= 16 && sample.strong >= 18 && sample.detail >= 17);
  if (!geometry || !type || !desktopScale) {
    failures.push(`${label}: ${JSON.stringify(sample)}`);
  } else {
    console.log(`${label}: line ±${sample.dist.toFixed(2)}px, type ${sample.pill}/${sample.strong}/${sample.detail}`);
  }
}
