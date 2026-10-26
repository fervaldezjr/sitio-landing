/**
 * Builds the before/mirror pair from one sharp base photo (docs/assets/scene.json): the mirror
 * is the base plus what Sitio adds, the before is the base plus the clutter. Both share every
 * base pixel, so the wipe lines up by construction. Each object is a cutout (Apple Vision, see
 * docs/assets/credits.json) placed by its bottom-centre on the desk at its real size in cm (the
 * scale grows towards the camera, scene.depth), optionally turned in the desk's plane and squashed
 * to fake the camera angle of flat things, toned to the room, and grounded with a contact shadow
 * plus a soft cast shadow away from the window.
 *
 *   node scripts/compose-pair.mjs            → media/source/{wide,frame}-{antes,espejo}.jpg (scene.crops)
 *   node scripts/compose-pair.mjs --preview  → media/proof/scene-*.jpg at 1600 px, for looking
 */
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const scene = JSON.parse(await readFile(path.join(root, "docs/assets/scene.json"), "utf8"));
const preview = process.argv.includes("--preview");

/**
 * Makes a crisp studio cutout sit in the photo: the window light falls off to the right and
 * downwards (multiply gradient, clipped to the object's alpha), contrast drops a little and the
 * edges soften to the base photo's sharpness.
 */
async function finish(buffer) {
  const { width = 1, height = 1 } = await sharp(buffer).metadata();
  const { relight } = scene;
  const ramp = (x2, y2, end) =>
    sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs><linearGradient id="g" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${end}"/></linearGradient></defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`)).png().toBuffer();
  const [across, down] = await Promise.all([ramp(1, 0, relight.right), ramp(0, 1, relight.bottom)]);
  const alpha = await sharp(buffer).ensureAlpha().extractChannel(3).blur(relight.soften).toBuffer();
  const rgb = await sharp(buffer)
    .removeAlpha()
    .composite([
      { input: across, blend: "multiply" },
      { input: down, blend: "multiply" },
    ])
    .linear(relight.contrast, (1 - relight.contrast) * 128)
    .blur(relight.soften)
    .toBuffer();
  return sharp(rgb).joinChannel(alpha).png().toBuffer();
}

/** Loose sheets of paper drawn in the desk's plane (a side-view photo of a stack never sits right). */
async function sheet(item, light) {
  const s = scaleAt(item.y);
  const [wcm, hcm] = item.cm;
  const angle = ((item.turn ?? 0) * Math.PI) / 180;
  const squash = item.squash ?? 0.4;
  const project = (x, y) => {
    const rx = x * Math.cos(angle) - y * Math.sin(angle);
    const ry = x * Math.sin(angle) + y * Math.cos(angle);
    return [rx * s, ry * s * squash];
  };
  const corners = [[-wcm / 2, -hcm / 2], [wcm / 2, -hcm / 2], [wcm / 2, hcm / 2], [-wcm / 2, hcm / 2]].map(([x, y]) => project(x, y));
  const xs = corners.map((c) => c[0]);
  const ys = corners.map((c) => c[1]);
  const pad = 40;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const w = Math.ceil(Math.max(...xs) - minX + pad);
  const h = Math.ceil(Math.max(...ys) - minY + pad);
  const pt = ([x, y]) => `${(x - minX).toFixed(1)},${(y - minY).toFixed(1)}`;
  const lines = [];
  for (let i = 0; i < (item.lines ?? 0); i++) {
    const y = -hcm / 2 + 3 + i * ((hcm - 6) / Math.max(1, item.lines - 1));
    const length = wcm - 5 - (i % 3 === 2 ? 6 : 0);
    lines.push(`<polyline points="${pt(project(-wcm / 2 + 2.5, y))} ${pt(project(-wcm / 2 + 2.5 + length, y))}" stroke="#9a958d" stroke-opacity="0.35" stroke-width="${Math.max(1, s * 0.12)}" fill="none"/>`);
  }
  const polygon = corners.map(pt).join(" ");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs><linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6f3ee"/><stop offset="1" stop-color="#e6e1d8"/></linearGradient></defs>
    <polygon points="${polygon}" fill="url(#p)" stroke="#000" stroke-opacity="0.06" stroke-width="1.2"/>
    ${lines.join("")}
  </svg>`;
  const shadow = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <filter id="b"><feGaussianBlur stdDeviation="${Math.max(3, s * 0.35)}"/></filter>
    <polygon points="${corners.map(([x, y]) => pt([x + light.dx * 0.06, y + s * 0.2])).join(" ")}" fill="#1d1208" fill-opacity="${light.contact * 0.55}" filter="url(#b)"/>
  </svg>`;
  const left = Math.round(item.x + minX);
  const top = Math.round(item.y + minY);
  return [
    { input: await sharp(Buffer.from(shadow)).png().toBuffer(), left, top, blend: "multiply" },
    { input: await sharp(Buffer.from(svg)).blur(0.5).png().toBuffer(), left, top },
  ];
}

/** Pixels per centimetre at a given height on the desk (the camera looks down at it, so nearer is bigger). */
function scaleAt(y) {
  const { back, front } = scene.depth;
  const t = Math.min(1.2, Math.max(-0.2, (y - back.y) / (front.y - back.y)));
  return back.pxPerCm + t * (front.pxPerCm - back.pxPerCm);
}

/* Vision keeps the studio shadow as a faint fringe of alpha; drop it, or the object floats above its anchor. */
async function clean(file) {
  const { data, info } = await sharp(path.join(root, file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) data[i] = Math.max(0, Math.min(255, Math.round((data[i] - 28) * 1.12)));
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 }).png().toBuffer();
}

async function layer(item, light) {
  let trimmed = await clean(item.file);
  if (item.flip) trimmed = await sharp(trimmed).flop().png().toBuffer();
  /* Things lying on the desk turn in its plane first, then get squashed by the camera angle. */
  if (item.turn) trimmed = await sharp(trimmed).rotate(item.turn, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).trim({ threshold: 1 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const width = Math.round(item.cm * scaleAt(item.y));
  const height = Math.round(((meta.height ?? 1) / (meta.width ?? 1)) * width * (item.squash ?? 1));
  let object = sharp(trimmed).resize({ width, height, fit: "fill", kernel: "lanczos3" });
  const tone = { ...scene.tone, ...(item.tone ?? {}) };
  object = object.modulate({ brightness: tone.brightness ?? 1, saturation: tone.saturation ?? 1 });
  if (tone.warm) object = object.recomb([[1 + tone.warm, 0, 0], [0, 1, 0], [0, 0, 1 - tone.warm]]);
  if (item.rotate) object = object.rotate(item.rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } });
  const buffer = await finish(await object.png().toBuffer());
  const placed = await sharp(buffer).metadata();
  const w = placed.width ?? width;
  const h = placed.height ?? height;
  const left = Math.round(item.x - w / 2);
  const top = Math.round(item.y - h);

  /* Contact shadow: a tight dark ellipse where the object meets the desk (its whole footprint if it lies flat).
     Cast shadow: wider and softer, pushed away from the window. */
  const flat = Boolean(item.flat);
  const sw = Math.round(w * (item.shadowWidth ?? (flat ? 1.02 : 0.92)));
  const sh = Math.max(6, Math.round(flat ? h * 0.9 : (item.shadowDepth ?? 0.12) * w));
  const cy = flat ? top + h * 0.55 : item.y - sh * 0.15;
  const blurContact = Math.max(2, (flat ? 0.08 : 0.22) * sh);
  const blurCast = Math.max(6, (flat ? 0.25 : 0.7) * sh);
  const pad = Math.round(Math.max(sw, sh) * 0.5 + blurCast * 3);
  const cast = Math.round(light.dx * (w / 400));
  const strength = item.shadow ?? 1;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sw + pad * 2 + Math.abs(cast)}" height="${sh + pad * 2}">
    <defs>
      <filter id="cast" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${blurCast}"/></filter>
      <filter id="contact" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${blurContact}"/></filter>
    </defs>
    <ellipse cx="${pad + sw / 2 + cast}" cy="${pad + sh / 2}" rx="${(sw / 2) * 1.06}" ry="${(sh / 2) * (flat ? 1.1 : 1.6)}" fill="#2a1a0c" fill-opacity="${strength * light.cast}" filter="url(#cast)"/>
    <ellipse cx="${pad + sw / 2}" cy="${pad + sh / 2}" rx="${sw / 2}" ry="${sh / 2}" fill="#1d1208" fill-opacity="${strength * light.contact}" filter="url(#contact)"/>
    ${flat ? "" : `<ellipse cx="${pad + sw / 2}" cy="${pad + sh * 0.62}" rx="${sw * 0.46}" ry="${sh * 0.16}" fill="#120a04" fill-opacity="${strength * light.occlusion}" filter="url(#contact)"/>`}
  </svg>`;
  const shadow = await sharp(Buffer.from(svg)).png().toBuffer();
  return [
    { input: shadow, left: Math.round(item.x - sw / 2 - pad), top: Math.round(cy - sh / 2 - pad), blend: "multiply" },
    { input: buffer, left, top },
  ];
}

/** Flat patches on the base itself, such as switching the laptop screen off. */
async function patches() {
  const out = [];
  for (const patch of scene.patches ?? []) {
    const xs = patch.points.map((p) => p[0]);
    const ys = patch.points.map((p) => p[1]);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    const w = Math.max(...xs) - x;
    const h = Math.max(...ys) - y;
    const points = patch.points.map(([px, py]) => `${px - x},${py - y}`).join(" ");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${patch.from}"/><stop offset="1" stop-color="${patch.to}"/></linearGradient>
        <linearGradient id="r" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0.35" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="${patch.sheen ?? 0}"/><stop offset="0.65" stop-color="#fff" stop-opacity="0"/></linearGradient>
      </defs>
      <polygon points="${points}" fill="url(#g)"/>
      <polygon points="${points}" fill="url(#r)"/>
    </svg>`;
    out.push({ input: await sharp(Buffer.from(svg)).blur(0.6).png().toBuffer(), left: x, top: y });
  }
  return out;
}

/* sharp wants every overlay inside the base: cut whatever hangs over an edge. */
async function clip(layer, width, height) {
  const meta = await sharp(layer.input).metadata();
  const left = Math.max(0, layer.left);
  const top = Math.max(0, layer.top);
  const right = Math.min(width, layer.left + (meta.width ?? 0));
  const bottom = Math.min(height, layer.top + (meta.height ?? 0));
  if (right <= left || bottom <= top) return null;
  const input = await sharp(layer.input).extract({ left: left - layer.left, top: top - layer.top, width: right - left, height: bottom - top }).png().toBuffer();
  return { ...layer, input, left, top };
}

async function compose(name, items) {
  const base = sharp(path.join(root, scene.base));
  const { width = 0, height = 0 } = await base.metadata();
  /* back to front; `z` overrides it for something resting on top of another object */
  const ordered = [...items].sort((a, b) => (a.z ?? a.y) - (b.z ?? b.y));
  const raw = await patches();
  for (const item of ordered) raw.push(...(item.kind === "sheet" ? await sheet(item, scene.light) : await layer(item, scene.light)));
  const layers = (await Promise.all(raw.map((entry) => clip(entry, width, height)))).filter(Boolean);
  const composed = await base.composite(layers).png().toBuffer();
  if (preview) {
    await mkdir(path.join(root, "media/proof"), { recursive: true });
    await sharp(composed).resize({ width: 1600 }).jpeg({ quality: 82 }).toFile(path.join(root, `media/proof/scene-${name}.jpg`));
  } else {
    /* the two frames the site uses, from the same composite so the wipe always lines up */
    const { wide, frame } = scene.crops;
    await sharp(composed).extract(wide).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(root, `media/source/wide-${name}.jpg`));
    await sharp(composed).extract(frame).resize({ width: 2400 }).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(root, `media/source/frame-${name}.jpg`));
  }
  console.log(`${name}: ${items.length} objects`);
}

await compose("espejo", scene.espejo);
await compose("antes", scene.antes);
