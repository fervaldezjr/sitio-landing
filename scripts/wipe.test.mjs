import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { DESKTOP, HANDLE_Y, MOBILE, distanceToWipePx, wipeFrame } from "../src/lib/wipe.ts";

const widths = [320, 360, 390, 414, 760, 768, 1024, 1280, 1440, 1720, 1920];
const heights = [480, 640, 720, 800, 844, 900, 1080];
const progresses = [0, 0.06, 0.2, 0.4, 0.5, 0.62, 0.8, 0.9, 0.92, 0.94, 1];
const yRatios = [0, 0.25, HANDLE_Y, 0.75, 1];

test("the handle sits on the wipe segment at its height", () => {
  for (const width of widths) {
    for (const height of heights) {
      for (const profile of [DESKTOP, MOBILE]) {
        for (const progress of progresses) {
          for (const yRatio of yRatios) {
            const frame = wipeFrame(progress, profile.lean, yRatio);
            const dist = distanceToWipePx(frame.top, frame.bottom, frame.handle, width, height);
            const leanMiss = Math.abs(profile.lean * width);
            assert.ok(
              dist < 0.05,
              `handle is ${dist.toFixed(3)}px off the wipe at ${width}x${height} lean ${profile.lean} progress ${progress} y ${yRatio}`,
            );
            assert.ok(
              dist * 10 < leanMiss || leanMiss < 1,
              `handle error ${dist}px is not clearly inside the old ${leanMiss}px gap`,
            );
            assert.equal(frame.handle.y, yRatio);
            assert.ok(Math.abs(frame.line.x1 - frame.top * 100) < 1e-9);
            assert.ok(Math.abs(frame.line.x2 - frame.bottom * 100) < 1e-9);
            assert.equal(frame.line.y1, 0);
            assert.equal(frame.line.y2, 100);
          }
        }
      }
    }
  }
});

test("the removed css rotation left the handle off the painted line", () => {
  const width = 1440;
  const height = 900;
  const frame = wipeFrame(DESKTOP.rest, DESKTOP.lean);
  const dx = (frame.bottom - frame.top) * width;
  const angle = Math.atan2(dx, height);
  const localY = height / 2 / Math.cos(angle);
  const paintedX = frame.top * width - Math.sin(angle) * localY;
  const handleX = frame.handle.x * width;
  const miss = Math.abs(paintedX - handleX);
  assert.ok(miss > 40 && miss < 200, `expected the old rotation to miss by tens of px, got ${miss}`);

  const mobile = wipeFrame(MOBILE.rest, MOBILE.lean);
  const mdx = (mobile.bottom - mobile.top) * 390;
  const mAngle = Math.atan2(mdx, 844);
  const mLocalY = 844 / 2 / Math.cos(mAngle);
  const mPainted = mobile.top * 390 - Math.sin(mAngle) * mLocalY;
  const mMiss = Math.abs(mPainted - mobile.handle.x * 390);
  assert.ok(mMiss > 30 && mMiss < 80, `expected about 40px on a phone, got ${mMiss}`);
});

test("the wipe markup and type scale cannot drift back", async () => {
  const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
  const hero = await readFile(new URL("../src/components/Compare.astro", import.meta.url), "utf8");
  const script = await readFile(new URL("../src/scripts/compare.ts", import.meta.url), "utf8");

  const rule = (selector) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
    assert.ok(match, `missing rule ${selector}`);
    return match[1];
  };

  assert.equal(rule(".wipe-line").includes("rotate"), false);
  assert.match(rule(".wipe-line line"), /vector-effect:\s*non-scaling-stroke/);
  assert.match(rule(".wipe-line line"), /x1:\s*calc\(var\(--split-top\)/);
  assert.match(rule(".wipe-line line"), /x2:\s*calc\(var\(--split-bottom\)/);
  assert.match(rule(".handle"), /translate\(-50%, -50%\)/);
  assert.equal(rule(".handle").includes("margin: -22px"), false);
  assert.match(rule(".pill"), /font-size:\s*clamp\(14px,/);
  assert.match(rule(".mirror-row p strong"), /font-size:\s*clamp\(16px,/);
  assert.match(rule(".mirror-row p span"), /font-size:\s*clamp\(16px,/);
  /* the icon is a span too: the text rule must not reach it, or the glyph leaves its circle */
  assert.equal(/\.mirror-row span\s*\{/.test(css), false);
  assert.equal(/\.screen-row span\s*\{/.test(css), false);

  assert.match(hero, /data-wipe-stroke/);
  assert.match(hero, /viewBox="0 0 100 100"/);
  assert.match(hero, /preserveAspectRatio="none"/);
  assert.match(script, /wipeFrame/);
  assert.equal(script.includes("rotate("), false);
});
