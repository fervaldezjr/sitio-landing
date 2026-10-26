/** Fraction down the stage where the handle sits. The CSS fallback is top: 50%. */
export const HANDLE_Y = 0.5;

export const DESKTOP = { rest: 0.5, lean: 0.08, end: 0.92 };
export const MOBILE = { rest: 0.4, lean: 0.12, end: 0.9 };

export function splitEdges(progress: number, lean: number): { top: number; bottom: number } {
  const top = Math.min(0.97, Math.max(0.03, progress + lean / 2));
  const bottom = Math.min(0.97, Math.max(0.03, progress - lean / 2));
  return { top, bottom };
}

/** Point on the clip edge. yRatio 0 is the top of the stage, 1 is the bottom. */
export function pointOnWipe(top: number, bottom: number, yRatio: number): { x: number; y: number } {
  const y = Math.min(1, Math.max(0, yRatio));
  return { x: top + (bottom - top) * y, y };
}

export function distanceToWipePx(
  top: number,
  bottom: number,
  point: { x: number; y: number },
  width: number,
  height: number,
): number {
  const ax = top * width;
  const ay = 0;
  const bx = bottom * width;
  const by = height;
  const px = point.x * width;
  const py = point.y * height;
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.min(1, Math.max(0, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

/** Numbers the line and the handle both paint. Rounded once so CSS and SVG match. */
export function wipeFrame(progress: number, lean: number, yRatio: number = HANDLE_Y) {
  const raw = splitEdges(progress, lean);
  const top = round4(raw.top);
  const bottom = round4(raw.bottom);
  const handle = pointOnWipe(top, bottom, yRatio);
  return {
    top,
    bottom,
    clip: `polygon(${top * 100}% 0, 100% 0, 100% 100%, ${bottom * 100}% 100%)`,
    line: { x1: top * 100, y1: 0, x2: bottom * 100, y2: 100 },
    handle,
  };
}
