# Pixel Orbit

A tiny, dependency-free pixel-art day/night dial. Drag the orbit to move through a full day: the sky, sun, moon, house lights, shadows and fireflies respond to the local time on the dial.

**Live demo:** enable GitHub Pages for the `main` branch (root). The root `index.html` forwards to the standalone experience at [pixel-orbit.html](./pixel-orbit.html).

## What it includes

- A hand-drawn 152 × 152 pixel-art countryside scene inside a circular glass window.
- A tactile 24-hour orbit dial with a sun/moon marker, tick marks and shaded bezel.
- Time-of-day color transitions, stars, clouds, chimney smoke, birds, fireflies, house lights and directional shadows.
- Direct time control: drag the dial, use the time slider, or choose dawn / noon / dusk / late night.
- Day, night and auto-cycle controls, with adjustable full-day speed (12–180 seconds).\n- Four color moods: original countryside, misty coast, lavender dusk and warm amber.\n- Chinese, English and Japanese interface localization.\n- 12-hour / 24-hour clock display and one-tap synchronization to local time.\n- Preferences saved locally in the browser, with a reset action.\n- Built-in diagnostics for renderer, viewport, device-pixel ratio, reduced-motion preference and local storage.
- Keyboard operation, visible focus, semantic slider values, and reduced-motion support.
- Five CSS color tokens for theming; no external libraries, fonts, images or network requests.

## Run locally

No build step or package installation is required. Open `pixel-orbit.html` in a modern browser, or serve the repository with any static HTTP server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Controls

| Input | Action |
|---|---|
| Drag the outer ring | Set the time continuously |
| Click the scene or sun/moon knob | Switch between day and night |
| Time slider | Set an exact minute |\n| Speed slider | Change the auto-cycle duration |\n| Color mood | Switch the five-color palette |\n| Language | Change Chinese / English / Japanese UI |\n| Clock format | Switch between 12-hour and 24-hour time |\n| Sync local time | Jump to the current device time |
| Dawn / Noon / Dusk / Late night | Jump to a preset |
| ← / → or ↑ / ↓ | Move by 30 minutes |
| Shift + arrow | Move by 3 hours |
| PageUp / PageDown | Move by 3 hours |
| Home / End | Noon / midnight |
| Space / Enter | Toggle day and night |

## Embed the component

The renderer and interaction layer are self-contained in `pixel-orbit.html`. The component can be embedded by copying its scripts and styles into another page, then mounting an element:

```html
<div class="pixel-orbit" data-pixel-orbit data-hour="now" aria-label="Day/night orbit"></div>
```

The component auto-mounts elements with `data-pixel-orbit`. Configuration attributes:

- `data-hour="now"` starts at local time; a number from 0 to 24 selects a fixed hour.
- `data-autoplay="48"` advances one full day every 48 seconds.
- `data-sync="root"` mirrors the component's `--night` value onto the document root.

Public API (after mounting): `window.PixelOrbit.createRenderer(colors)`, `window.PixelOrbit.mount(element)`, and the mounted instance's `setHour(hour)`, `toggle()`, `getHour()`, `isNight()`, `setAutoplay(seconds)`, `refreshColors()`, `onChange(callback)`, and `destroy()` methods.

The element emits an `orbitchange` event. Its `detail` contains `hour`, `time`, `phase`, `label`, `night`, and `nightAmount`.

## Theme

Override any of the five component tokens:

```css
.pixel-orbit {
  --orbit-bg: #f5ecd9;
  --orbit-surface: #8c9a62;
  --orbit-fg: #1b2146;
  --orbit-muted: #7f97b3;
  --orbit-accent: #efa02c;
}
```

Call `instance.refreshColors()` after changing the tokens at runtime.

## Browser support

Designed for current Chromium, Firefox and Safari releases. The visual renderer uses Canvas 2D and modern CSS color interpolation (`color-mix()` / OKLab). If an older browser lacks these CSS color features, the canvas scene still renders with its built-in palette, but page-level color blending may be less expressive.

## Development checks

Run `node tests/smoke.mjs`. The check parses every inline JavaScript block, executes the pixel renderer at five time checkpoints, and verifies controls, localization, palette refresh, saved preferences and lifecycle safeguards. GitHub Actions runs it on pushes and pull requests.

## License

No license has been specified yet. Until one is added, normal copyright applies; please ask the author before redistributing or reusing the artwork.
