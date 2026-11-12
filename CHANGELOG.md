# Changelog

Pixel Orbit 的独立项目版本记录。网站作品集中的嵌入展示与详情面板版本记录，另见 [gongshui-pages](https://github.com/GSvegetable/gongshui-pages)。

## v1.1.0 — 2026-11-12

### Added
- 增加统一的 showcase 展示入口，通过 `scene=countryside|planet` 选择田园版或星球版。
- 支持 `composition=art|full` 两种展示构图，供作品集首页预览与详情展示调用。
- 增加父页面消息通信，允许宿主页面在不重新加载作品的情况下切换构图。

### Changed
- 田园版与星球版的首页艺术裁切构图保持一致，完整构图可在详情展开时恢复。
- 使用 transform / top 过渡完成裁切与完整构图之间的动画，保持画布尺寸稳定，减少动画中的重绘与闪烁。

### Validation
- Pixel Orbit quality workflow passed for the showcase integration changes.
- Browser-level visual acceptance on the hosted site remains a separate deployment check.

## v1.2.0 — 2026-11-12

### Added
- 星球版加入基于 UTC 的太阳天文位置计算，使用太阳赤经、赤纬与格林尼治恒星时确定全球一致的受光方向。
- 根据地球恒星自转角更新球面纹理，并通过太阳赤纬呈现地轴倾斜带来的季节性昼夜分布。
- 现实时间模式按真实时间运行；手动调节与自动漫游继续可用，自动漫游会加速推进模拟日期。

### Changed
- 保留原有像素渲染、轨道拖动、昼夜控制与作品集展示结构。
- 星球版的外部光晕与球面照明使用同一套天文太阳方向。

### Notes
- 星球地形仍为程序生成的艺术化像素纹理，不是具有真实国界和地名的地理底图；天文光照模型不等于地理地图定位。
- 太阳位置采用适合视觉模拟的低阶天文算法，并非高精度天文台/导航级星历。

## Unreleased

- Added continuous local real-time synchronization for both countryside and planet scenes; showcase/display embeds follow the device clock automatically, while the editor retains a manual toggle.

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
