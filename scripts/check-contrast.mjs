import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { composite, contrast, hexToRgb } from "./contrast.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];

function check(name, ratio, minimum) {
  const ok = ratio >= minimum;
  console.log(`${ok ? "ok" : "FAIL"}  ${ratio.toFixed(2)}  ${name}  (min ${minimum})`);
  if (!ok) failures.push(name);
}

const pairs = [
  ["ink on canvas", "#1b1b1b", "#f7f7f7", 4.5],
  ["ink on surface", "#1b1b1b", "#ffffff", 4.5],
  ["secondary on canvas", "#5e5e5e", "#f7f7f7", 4.5],
  ["secondary on surface", "#5e5e5e", "#ffffff", 4.5],
  ["minimum text on surface", "#6a6a6a", "#ffffff", 4.5],
  ["white on ink button", "#ffffff", "#1b1b1b", 4.5],
  ["ink on the product tiles", "#1b1b1b", "#f7f7f7", 4.5],
  ["placeholder on the email field", "#6a6a6a", "#f7f7f7", 4.5],
  ["grabber on surface", "#8f8f92", "#ffffff", 3],
  ["white on the proposals band", "#ffffff", "#1b1b1b", 4.5],
  ["second voice on the proposals band", "#b4b4b4", "#1b1b1b", 4.5],
  ["ink on the white chip over a tile", "#1b1b1b", "#ffffff", 4.5],
];

for (const [name, fg, bg, minimum] of pairs) {
  check(name, contrast(hexToRgb(fg), hexToRgb(bg)), minimum);
}

const white = [255, 255, 255];
const tint = [16, 16, 16];
check("white on glass 0.62 over white", contrast(white, composite(white, tint, 0.62)), 4.5);
check("secondary on glass 0.66 over white", contrast(hexToRgb("#ececec"), composite(white, tint, 0.66)), 4.5);
check("white on glass 0.66 over white", contrast(white, composite(white, tint, 0.66)), 4.5);

const css = await readFile(path.join(root, "src/styles/global.css"), "utf8");
const textUsesInk400 = css.split("\n").some((line) => /color\s*:/.test(line) && /#8f8f92/i.test(line));
if (textUsesInk400) {
  failures.push("ink.400 used as text color");
  console.log("FAIL  ink.400 used as text color");
} else {
  console.log("ok  ink.400 is not a text color");
}

async function worstContrast(file, box, alpha, fg) {
  const image = sharp(path.join(root, file));
  const meta = await image.metadata();
  const width = meta.width ?? 1;
  const height = meta.height ?? 1;
  const left = Math.max(0, Math.round(box[0] * width));
  const top = Math.max(0, Math.round(box[1] * height));
  let cropW = Math.round(box[2] * width);
  let cropH = Math.round(box[3] * height);
  if (left + cropW > width) cropW = width - left;
  if (top + cropH > height) cropH = height - top;
  const { data, info } = await image.extract({ left, top, width: cropW, height: cropH }).raw().toBuffer({ resolveWithObject: true });
  let worst = Infinity;
  const step = 4;
  for (let y = 0; y < info.height; y += step) {
    for (let x = 0; x < info.width; x += step) {
      const i = (y * info.width + x) * info.channels;
      const bg = composite([data[i], data[i + 1], data[i + 2]], tint, alpha);
      const ratio = contrast(fg, bg);
      if (ratio < worst) worst = ratio;
    }
  }
  return worst;
}

const samples = [
  ["wide antes pill", "public/media/hero/wide-antes-1280.jpg", [0.01, 0.01, 0.16, 0.08], 0.62, white],
  ["wide espejo pill", "public/media/hero/wide-espejo-1280.jpg", [0.7, 0.01, 0.28, 0.08], 0.62, white],
  ["wide card", "public/media/hero/wide-espejo-1280.jpg", [0.62, 0.06, 0.34, 0.42], 0.66, hexToRgb("#ececec")],
  ["wide bar", "public/media/hero/wide-antes-1280.jpg", [0.01, 0.84, 0.4, 0.12], 0.66, white],
  ["phone pills", "public/media/hero/frame-antes-960.jpg", [0.02, 0.02, 0.96, 0.14], 0.62, white],
  ["phone status", "public/media/hero/frame-antes-960.jpg", [0.3, 0.42, 0.4, 0.14], 0.66, white],
  ["frame antes pill", "public/media/hero/frame-antes-960.jpg", [0.01, 0.01, 0.3, 0.1], 0.62, white],
  ["frame bar", "public/media/hero/frame-antes-960.jpg", [0.02, 0.86, 0.96, 0.12], 0.66, white],
];

for (const [name, file, box, alpha, fg] of samples) {
  const ratio = await worstContrast(file, box, alpha, fg);
  check(`photo ${name}`, ratio, 4.5);
}

const dist = path.join(root, "dist");
try {
  const files = await readdir(dist);
  if (!files.includes("index.html")) failures.push("dist/index.html missing");
} catch {
  failures.push("dist missing");
}

if (failures.length) {
  console.error(`contrast failed: ${failures.join(", ")}`);
  process.exit(1);
}
console.log("contrast ok");
