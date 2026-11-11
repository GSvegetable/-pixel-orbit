# Development guide

This project is intentionally a small, dependency-free browser experience. It is not an npm component package, and its current architecture should stay proportionate to that goal.

## Runtime map

- `pixel-orbit.html` is the product page. It contains the pixel renderer, the interactive orbit component, and the page controller.
- `index.html` is the GitHub Pages root entry. It redirects to the main experience and includes a normal anchor fallback.
- `lab.html` embeds the live experience and documents the visible settings, CSS theme tokens, and public instance methods.
- `tests/smoke.mjs` uses Node.js built-ins only. It parses inline JavaScript, executes the actual renderer in an isolated VM, and checks important UI and lifecycle contracts.
- `.github/workflows/quality.yml` runs the same smoke suite on relevant pushes and pull requests.

## Component lifecycle

The component is mounted on an element carrying `data-pixel-orbit`. The public browser API is exposed as `window.PixelOrbit`.

An instance supports:

| Method | Purpose |
| --- | --- |
| `setHour(hour)` | Set the displayed time. |
| `toggle()` | Switch between day and night. |
| `getHour()` | Read the current hour. |
| `isNight()` | Read the current night state. |
| `setAutoplay(seconds)` | Set the duration of one simulated day; non-positive or invalid values stop autoplay. |
| `refreshColors()` | Re-read CSS theme variables after runtime style changes. |
| `onChange(callback)` | Subscribe to component state changes. |
| `destroy()` | Stop work, remove listeners/observers and release the mount marker. |

Call `destroy()` before removing a mounted element permanently. A destroyed element can be mounted again.

## Visual and interaction principles

- Keep the 152 × 152 pixel renderer and its palette pipeline independent from surrounding page controls.
- Keep pointer cancellation distinct from a completed click; a cancelled drag must not unexpectedly toggle the scene.
- Preserve keyboard operation, visible focus, accessible names and reduced-motion behavior.
- Keep time, palette, language and clock-format controls synchronized with their displayed state.
- Avoid adding runtime dependencies or build tooling unless a concrete product requirement justifies the extra maintenance cost.

## Local verification

Use Node.js 18 or newer:

```bash
node tests/smoke.mjs
```

The suite checks JavaScript syntax, representative renderer output, expected controls and accessibility hooks, pointer-cancel handling, autoplay validation, cleanup behavior, localized settings, the root redirect, and the lab/README contract.

These are fast structural and renderer smoke checks, not a substitute for visual review in real browsers. Before changing layout, pointer interactions or responsive behavior, manually verify a narrow mobile viewport, a tablet/desktop viewport, keyboard-only use, and reduced-motion mode.

## GitHub Pages

The intended Pages source is the `main` branch and repository root. The root `index.html` forwards visitors to `pixel-orbit.html`. A green quality workflow confirms the repository smoke suite; it does not by itself prove that Pages is enabled or that the hosted site has finished deploying.
