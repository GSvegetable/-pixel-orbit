# Changelog

## Unreleased

- Prevented pointer-cancel gestures from being interpreted as clicks.
- Made component teardown complete: fallback resize listeners are removed and destroyed instances can be mounted again.
- Validated autoplay durations and localized theme / clock choices plus accessible control labels in all three languages.

- Fixed the page-controller startup race so the UI never reads the component before it is mounted.
- Added an exact-minute time slider and dawn / noon / dusk / late-night presets.
- Added synchronized pressed states for day, night and preset controls.
- Improved small-screen spacing, reduced-motion handling and live status feedback.
- Added a GitHub Pages entry point, setup/API documentation and dependency-free smoke checks.
- Preserved the original pixel renderer, palette generation and countryside scene.

## Further experience upgrade

- Rebuilt the surrounding control panel into a complete experience without replacing the pixel renderer.
- Added adjustable auto-cycle speed, four curated palettes, Chinese / English / Japanese UI, 12 / 24-hour clock formats, and local-time synchronization.
- Added local preference persistence, reset controls and an expandable runtime diagnostics panel.
- Expanded automated checks to cover the new settings and localization surface.
