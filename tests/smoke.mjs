import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../pixel-orbit.html', import.meta.url), 'utf8');
const planetHtml = readFileSync(new URL('../pixel-orbit-planet.html', import.meta.url), 'utf8');
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
  'time-range', 'speed-range', 'theme-select', 'language-select', 'clock-mode', 'btn-now', 'btn-reset', 'diag-dpr', 'pixel-orbit:prefs', 'coast:', 'lavender:', 'amber:', 'data-i18n="subtitle"', 'data-preset="6"', 'data-preset="12"',
  'data-preset="18"', 'data-preset="23"', 'btn-auto',
  'prefers-reduced-motion', 'ResizeObserver', 'IntersectionObserver',
  'orbitchange', 'aria-valuetext', 'refreshColors', 'destroy()',
  'window.PixelOrbit.mount(el)', 'Math.abs(h - lastEmit) >= 1 / 120', 'setRealTimeSync(enabled)', 'isRealTimeSync: () => realTimeSync'
]) assert.ok(html.includes(feature), `missing expected feature: ${feature}`);

assert.ok(html.includes('const ring=el.__pixelOrbit||window.PixelOrbit.mount(el)'),
  'page controller must mount synchronously if DOMContentLoaded has not mounted the component');
assert.ok(html.includes("range.addEventListener('input'"), 'time slider must be interactive');
assert.ok(html.includes("b.setAttribute('aria-pressed'"), 'preset pressed states must stay synchronized');

assert.ok(html.includes("ring.setAutoplay(on?Number(prefs.speed):0)"), 'autoplay should use the saved speed preference');
assert.ok(html.includes("document.documentElement.lang=prefs.language"), 'language changes must update the document language');
assert.ok(html.includes("ring.refreshColors()"), 'palette changes must refresh the pixel renderer');
assert.ok(html.includes("e.type !== 'pointercancel'"), 'cancelling a pointer gesture must not trigger the click/toggle action');
assert.ok(html.includes("window.removeEventListener('resize', fit)"), 'fallback resize listeners must be removed when the component is destroyed');
assert.ok(html.includes("if (el.__pixelOrbit === api) delete el.__pixelOrbit"), 'destroy must release the mount marker so the component can be mounted again');
assert.ok(html.includes("Number.isFinite(seconds) && seconds > 0"), 'autoplay API must reject invalid and non-positive durations');
for (const key of ['themeDefault', 'themeCoast', 'themeLavender', 'themeAmber', 'clock24', 'clock12', 'orbitLabel', 'rangeLabel']) {
  assert.ok(html.includes(key), `missing localized setting or accessibility label: ${key}`);
}
assert.ok(html.includes("document.title=tr().pageTitle"), 'document title must follow the selected interface language');

// The alternate planet edition must remain a real, independently renderable page.
const planetScripts = [...planetHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
assert.ok(planetScripts.length >= 3, 'planet edition should contain renderer, interaction and page-controller scripts');
planetScripts.forEach((source, index) => new Script(source, { filename: `planet-inline-script-${index + 1}.js` }));
const planetSandbox = { window: {}, module: { exports: {} } };
new Script(planetScripts[0], { filename: 'pixel-orbit-planet-renderer.js' }).runInNewContext(planetSandbox);
const planetApi = planetSandbox.module.exports;
assert.equal(planetApi.size, 152, 'planet renderer canvas should remain 152 pixels wide');
const planetRenderer = planetApi.createRenderer();
for (const hour of [0, 6, 12, 18, 23]) {
  const pixels = planetRenderer.render(hour, 0, { calm: true });
  assert.equal(pixels.length, 152 * 152, `unexpected planet pixel buffer size at ${hour}:00`);
  assert.ok(Array.from(pixels).some((pixel) => pixel !== 0), `planet scene should not be blank at ${hour}:00`);
  assert.ok(new Set(pixels).size > 10, `planet scene should contain a useful palette at ${hour}:00`);
}

// The astronomical mode must depend on the absolute instant, not the visitor's timezone,
// and seasonal solar declination must alter the terminator.
const renderPlanetAt = (instant) => Array.from(planetRenderer.render(12, 0, { calm: true, date: new Date(instant) }));
const sameInstantUtc = renderPlanetAt('2026-06-21T12:00:00Z');
const sameInstantOffset = renderPlanetAt('2026-06-21T08:00:00-04:00');
assert.deepEqual(sameInstantUtc, sameInstantOffset,
  'the same absolute instant must produce the same global sunlight in every timezone');
const equinoxPixels = renderPlanetAt('2026-03-20T12:00:00Z');
assert.notDeepEqual(equinoxPixels, sameInstantUtc,
  'seasonal solar declination must change the illuminated globe');
const sixHoursLater = renderPlanetAt('2026-06-21T18:00:00Z');
assert.notDeepEqual(sameInstantUtc, sixHoursLater,
  'Earth rotation must move the geographic day/night boundary over time');
assert.ok(planetHtml.includes('solarEphemeris') && planetHtml.includes('astro.gmst') && planetHtml.includes('astro.dec'),
  'planet edition must use solar coordinates, sidereal rotation and seasonal declination');
assert.ok(planetHtml.includes('draw(ts / 1000, simulationDate)'),
  'real-time and accelerated modes must pass their simulated absolute date to the renderer');
assert.ok(planetHtml.includes('realTimeSync ? 1000 / 12 : o.autoplay > 0 ? 1000 / 15 : 1000 / 20'),
  'planet rendering must be frame-throttled to keep mobile interaction responsive');
assert.ok(planetHtml.includes("e.type !== 'pointercancel'"), 'planet edition pointer cancellation must not toggle the scene');
assert.ok(planetHtml.includes('Number.isFinite(seconds) && seconds > 0'), 'planet autoplay API must reject invalid durations');
assert.ok(planetHtml.includes('if (el.__pixelOrbit === api) delete el.__pixelOrbit'), 'planet destroy must release the mount marker');
assert.ok(planetHtml.includes('setRealTimeSync(enabled)'), 'planet edition must expose real-time synchronization');
assert.ok(planetHtml.includes("const ring = orbitEl.__pixelOrbit || window.PixelOrbit.mount(orbitEl)"), 'planet page controller must mount synchronously when DOMContentLoaded has not fired');
assert.ok(planetHtml.includes("query.get('display') === '1'"), 'planet display mode must follow local real time');
assert.ok(html.includes("query.get('display') === '1'"), 'countryside display mode must follow local real time');

const rootEntry = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.ok(rootEntry.includes('url=./play.html'), 'root entry must provide a no-JavaScript fallback redirect');
assert.ok(rootEntry.includes("window.location.replace(new URL('./play.html'"), 'root entry must navigate to the main experience');

const lab = readFileSync(new URL('../lab.html', import.meta.url), 'utf8');
const play = readFileSync(new URL('../play.html', import.meta.url), 'utf8');
assert.ok(lab.includes('id="lab-preview" src="./pixel-orbit.html?lab=1"'), 'lab must embed the full-control countryside editor');
assert.ok(lab.includes("planet:'./pixel-orbit-planet.html?lab=1'"), 'lab must switch to the full-control planet editor');
assert.ok(play.includes("./pixel-orbit.html?display=1"), 'public player must load the clean countryside scene');
assert.ok(play.includes("./pixel-orbit-planet.html?display=1"), 'public player must load the clean planet scene');
assert.ok(play.includes('田园') && play.includes('星球'), 'public player must expose only the two scene choices');
assert.ok(html.includes('display-mode main > :not(.pixel-orbit)'), 'countryside display mode must hide its parameter UI');
assert.ok(planetHtml.includes('display-mode main > :not(.pixel-orbit)'), 'planet display mode must hide its parameter UI');
assert.ok(lab.includes('pixel-orbit-planet.html?lab=1'), 'lab must load the focused planet editor');
assert.ok(html.includes('lab-mode main>.control-shell'), 'countryside editor must use the focused laboratory layout');
assert.ok(planetHtml.includes('lab-mode main>.row'), 'planet editor must use the focused laboratory layout');
assert.ok(lab.includes('title="Pixel Orbit parameter laboratory"'), 'lab iframe must have an accessible title');
assert.ok(lab.includes('loading="eager"'), 'lab preview should load immediately for interactive use');
for (const apiMethod of ['setHour(18)', 'setAutoplay(48)', 'getHour()', 'isNight()', 'refreshColors()', 'destroy()']) {
  assert.ok(lab.includes(apiMethod), `lab developer reference is missing API method: ${apiMethod}`);
}

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
assert.ok(readme.includes('actions/workflows/quality.yml/badge.svg'), 'README must expose the quality workflow badge');
for (const relativePath of ['https://gsvegetable.github.io/-pixel-orbit/play.html','https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html', 'https://gsvegetable.github.io/-pixel-orbit/lab.html', './docs/DEVELOPMENT.md', './CHANGELOG.md']) {
  assert.ok(readme.includes(relativePath), `README navigation is missing: ${relativePath}`);
}
assert.ok(readme.includes('node tests/smoke.mjs'), 'README must document the executable local quality check');
assert.ok(readme.includes('https://gsvegetable.github.io/-pixel-orbit/pixel-orbit-planet.html'), 'README must link to the alternate visual edition on GitHub Pages');

console.log(`Pixel Orbit smoke checks passed (${scripts.length} inline scripts parsed; renderer, controls, lifecycle, entry point, lab and README verified).`);

