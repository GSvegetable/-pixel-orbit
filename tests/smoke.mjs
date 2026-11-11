import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../pixel-orbit.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
assert.ok(scripts.length >= 3, 'expected renderer, interaction and page-controller scripts');
scripts.forEach((source, index) => new Script(source, { filename: `inline-script-${index + 1}.js` }));

// Execute the real renderer in an isolated VM and render representative times.
const rendererSandbox = { window: {}, module: { exports: {} } };
new Script(scripts[0], { filename: 'pixel-orbit-renderer.js' }).runInNewContext(rendererSandbox);
const rendererApi = rendererSandbox.module.exports;
assert.equal(rendererApi.size, 152, 'renderer canvas should remain 152 pixels wide');
const renderer = rendererApi.createRenderer();
for (const hour of [0, 6, 12, 18, 23]) {
  const pixels = renderer.render(hour, 0, { calm: true });
  assert.equal(pixels.length, 152 * 152, `unexpected pixel buffer size at ${hour}:00`);
  assert.ok(Array.from(pixels).some((pixel) => pixel !== 0), `scene should not be blank at ${hour}:00`);
  assert.ok(new Set(pixels).size > 10, `scene should contain a useful palette at ${hour}:00`);
}

for (const feature of [
  'data-pixel-orbit', 'data-hour="now"', 'data-sync="root"',
  'time-range', 'data-preset="6"', 'data-preset="12"',
  'data-preset="18"', 'data-preset="23"', 'btn-auto',
  'prefers-reduced-motion', 'ResizeObserver', 'IntersectionObserver',
  'orbitchange', 'aria-valuetext', 'refreshColors', 'destroy()',
  'window.PixelOrbit.mount(el)', 'Math.abs(h - lastEmit) >= 1 / 120'
]) assert.ok(html.includes(feature), `missing expected feature: ${feature}`);

assert.ok(html.includes('const ring = el.__pixelOrbit || window.PixelOrbit.mount(el)'),
  'page controller must mount synchronously if DOMContentLoaded has not mounted the component');
assert.ok(html.includes("timeRange.addEventListener('input'"), 'time slider must be interactive');
assert.ok(html.includes("button.setAttribute('aria-pressed'"), 'preset pressed states must stay synchronized');

console.log(`Pixel Orbit smoke checks passed (${scripts.length} inline scripts parsed).`);
