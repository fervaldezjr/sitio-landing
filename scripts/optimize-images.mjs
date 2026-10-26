/**
 * Builds hero srcsets and object crops from media/source.
 * Wide masters are capped at 1920px: the 2400px JPEGs are an upscale and look soft.
 * No neural rescaler is available in this environment, so we downsample with
 * lanczos3 and a light unsharp. We do not invent detail above the source.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "media/source");
const heroOut = path.join(root, "public/media/hero");
const thingOut = path.join(root, "public/media/things");
const proofOut = path.join(root, "media/proof");

const wideWidths = [640, 960, 1280, 1920];
const tallWidths = [432, 648, 864];

async function masterWide(name) {
  const input = path.join(source, name);
  const meta = await sharp(input).rotate().metadata();
  if (!meta.width || !meta.height) throw new Error(`no size for ${name}`);
  return sharp(input)
    .rotate()
    .resize({ width: 1920, height: Math.round((meta.height / meta.width) * 1920), kernel: "lanczos3", fit: "fill" })
    .sharpen({ sigma: 0.6, m1: 0.4, m2: 0.25 })
    .toColorspace("srgb");
}

async function masterTall(name) {
  return sharp(path.join(source, name))
    .rotate()
    .resize({ width: 864, kernel: "lanczos3" })
    .sharpen({ sigma: 0.4, m1: 0.3, m2: 0.2 })
    .toColorspace("srgb");
}

async function writeSet(pipeline, widths, stem) {
  const base = await pipeline.clone().png().toBuffer();
  const meta = await sharp(base).metadata();
  for (const width of widths) {
    const resized = sharp(base).resize({ width, kernel: "lanczos3" });
    await resized.clone().avif({ quality: 48, effort: 4 }).toFile(path.join(heroOut, `${stem}-${width}.avif`));
    await resized.clone().webp({ quality: 68 }).toFile(path.join(heroOut, `${stem}-${width}.webp`));
    await resized.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(path.join(heroOut, `${stem}-${width}.jpg`));
  }
  return meta;
}

async function gridProof(buffer, fileName, step = 0.1) {
  const meta = await sharp(buffer).metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const lines = [];
  for (let i = 1; i < Math.round(1 / step); i += 1) {
    const x = Math.round(w * step * i);
    const y = Math.round(h * step * i);
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#fff" stroke-width="2"/>`);
    lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#fff" stroke-width="2"/>`);
    lines.push(`<text x="${x + 6}" y="28" fill="#fff" font-size="22" font-family="sans-serif">${Math.round(step * i * 100)}</text>`);
    lines.push(`<text x="8" y="${y + 22}" fill="#fff" font-size="22" font-family="sans-serif">${Math.round(step * i * 100)}</text>`);
  }
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${lines.join("")}</svg>`,
  );
  const overlay = await sharp(svg, { density: 72 }).resize(w, h, { fit: "fill" }).ensureAlpha().png().toBuffer();
  const base = await sharp(buffer).resize(w, h, { fit: "fill" }).ensureAlpha().png().toBuffer();
  const br = await sharp(base).raw().toBuffer({ resolveWithObject: true });
  const oraw = await sharp(overlay).raw().toBuffer({ resolveWithObject: true });
  console.log(fileName, "raw base", br.info, "raw overlay", oraw.info);
  const composed = await sharp(base).composite([{ input: overlay }]).png().toBuffer();
  await sharp(composed).resize({ width: 900 }).jpeg({ quality: 70 }).toFile(path.join(proofOut, fileName));
}

/** Fractions of the source frame: [left, top, width, height]. Tuned by eye on the proof grid. */
const crops = [
  { id: "portatil", file: "wide-espejo.jpg", box: [0.22, 0.55, 0.18, 0.22] },
  { id: "papeles", file: "wide-antes.jpg", box: [0.02, 0.62, 0.16, 0.16] },
  { id: "vasos", file: "wide-antes.jpg", box: [0.16, 0.6, 0.18, 0.16] },
  { id: "cables", file: "wide-antes.jpg", box: [0.42, 0.78, 0.16, 0.18] },
  { id: "caja", file: "tall-antes.png", box: [0.0, 0.72, 0.2, 0.2] },
  { id: "mochila", file: "tall-antes.png", box: [0.2, 0.78, 0.26, 0.18] },
  { id: "bandeja", file: "wide-espejo.jpg", box: [0.4, 0.62, 0.18, 0.16] },
  { id: "taza", file: "wide-espejo.jpg", box: [0.4, 0.55, 0.11, 0.12] },
  { id: "libreta", file: "wide-espejo.jpg", box: [0.52, 0.64, 0.16, 0.14] },
];

async function cropThing(id, file, box) {
  const isWide = file.startsWith("wide");
  const master = isWide ? await masterWide(file) : await masterTall(file);
  const buffer = await master.png().toBuffer();
  const meta = await sharp(buffer).metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const left = Math.max(0, Math.round(box[0] * w));
  const top = Math.max(0, Math.round(box[1] * h));
  const width = Math.min(w - left, Math.round(box[2] * w));
  const height = Math.min(h - top, Math.round(box[3] * h));
  const tile = 640;
  const extracted = await sharp(buffer)
    .extract({ left, top, width, height })
    .resize({ width: tile, height: tile, fit: "contain", background: { r: 236, g: 236, b: 238, alpha: 1 } })
    .toBuffer();
  await sharp(extracted).avif({ quality: 50, effort: 4 }).toFile(path.join(thingOut, `${id}.avif`));
  await sharp(extracted).webp({ quality: 72 }).toFile(path.join(thingOut, `${id}.webp`));
  await sharp(extracted).jpeg({ quality: 76, mozjpeg: true }).toFile(path.join(thingOut, `${id}.jpg`));
}

async function alignmentNote() {
  const a = await masterWide("wide-antes.jpg").then((p) => p.raw().toBuffer({ resolveWithObject: true }));
  const b = await masterWide("wide-espejo.jpg").then((p) => p.raw().toBuffer({ resolveWithObject: true }));
  const { width, height, channels } = a.info;
  if (width !== b.info.width || height !== b.info.height) {
    return `size mismatch ${width}x${height} vs ${b.info.width}x${b.info.height}`;
  }
  let sum = 0;
  let n = 0;
  const horizon = Math.round(height * 0.32);
  for (let y = 0; y < horizon; y += 4) {
    for (let x = 0; x < width; x += 8) {
      const i = (y * width + x) * channels;
      sum += Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
      n += 3;
    }
  }
  return `mean abs diff in the top 32% (sea and frame): ${(sum / n).toFixed(2)} / 255`;
}

await mkdir(heroOut, { recursive: true });
await mkdir(thingOut, { recursive: true });
await mkdir(proofOut, { recursive: true });

const cropsOnly = process.argv.includes("--crops-only");

const wideAntesBuf = await masterWide("wide-antes.jpg").then((p) => p.png().toBuffer());
const tallAntesBuf = await masterTall("tall-antes.png").then((p) => p.png().toBuffer());
const tallEspejoBuf = await masterTall("tall-espejo.png").then((p) => p.png().toBuffer());

if (!cropsOnly) {
  const wideEspejoBuf = await masterWide("wide-espejo.jpg").then((p) => p.png().toBuffer());
  await writeSet(sharp(wideAntesBuf), wideWidths, "wide-antes");
  await writeSet(sharp(wideEspejoBuf), wideWidths, "wide-espejo");
  await writeSet(sharp(tallAntesBuf), tallWidths, "tall-antes");
  await writeSet(sharp(tallEspejoBuf), tallWidths, "tall-espejo");
}

if (!cropsOnly) {
  await gridProof(wideAntesBuf, "grid-wide-antes.jpg");
  await gridProof(tallAntesBuf, "grid-tall-antes.jpg");
  await gridProof(tallEspejoBuf, "grid-tall-espejo.jpg");
}

for (const crop of crops) {
  await cropThing(crop.id, crop.file, crop.box);
}

const note = await alignmentNote();
await writeFile(path.join(proofOut, "alignment.txt"), `${note}\n`, "utf8");
console.log(note);
console.log("images written");
