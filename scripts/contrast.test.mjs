import assert from "node:assert/strict";
import test from "node:test";
import { composite, contrast, easeInOutSine, hexToRgb } from "./contrast.mjs";

test("easeInOutSine is flat at the ends and even in the middle", () => {
  assert.ok(Math.abs(easeInOutSine(0)) < 1e-12);
  assert.ok(Math.abs(easeInOutSine(1) - 1) < 1e-12);
  assert.ok(Math.abs(easeInOutSine(0.5) - 0.5) < 1e-12);
});

test("ink on canvas clears AA", () => {
  const ratio = contrast(hexToRgb("#1b1b1b"), hexToRgb("#f7f7f7"));
  assert.ok(ratio >= 4.5, `expected >= 4.5, got ${ratio}`);
});

test("ink.400 on white is not body text", () => {
  const ratio = contrast(hexToRgb("#8f8f92"), hexToRgb("#ffffff"));
  assert.ok(ratio < 4.5, `ink.400 should fail body text, got ${ratio}`);
  assert.ok(ratio >= 3, `ink.400 should still clear non-text, got ${ratio}`);
});

test("white on strong glass over white clears AA", () => {
  const glass = composite([255, 255, 255], [16, 16, 16], 0.62);
  const ratio = contrast([255, 255, 255], glass);
  assert.ok(ratio >= 4.5, `expected >= 4.5, got ${ratio}`);
});

test("secondary on sheet glass over white clears AA", () => {
  const glass = composite([255, 255, 255], [16, 16, 16], 0.66);
  const ratio = contrast(hexToRgb("#ececec"), glass);
  assert.ok(ratio >= 4.5, `expected >= 4.5, got ${ratio}`);
});
