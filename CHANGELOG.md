# Changelog

## v1.2.3 — 2026-11-13

### Added
- 新增 `embed.js` 嵌入式脚本：两行代码就能把作品嵌进任何网页，和像素昼夜开关的用法一致。
  ```html
  <div data-pixel-orbit-embed></div>
  <script src="https://gsvegetable.github.io/-pixel-orbit/embed.js" data-scene="planet"></script>
  ```
  支持 `data-scene`（田园 / 星球 / 环形世界）、`data-composition`（art / full）、`data-label`、`data-base`（自托管地址）四个参数；只写一行脚本也行，作品会自动插在脚本前面。
- 新增 `embed-demo.html` 演示页，列出两种写法与全部参数。

### Fixed
- 修复星球版页面胶水代码在组件挂载前就取 `el.__pixelOrbit`：在 showcase 模式下必定抛 `Cannot read properties of undefined (reading 'onChange')`，导致该页的时钟与按钮全部失效。环形世界版上一版已修，星球版和田园版这次一并对齐。

### Validation
- 本地验证两种写法都能生成 520×520 的容器并正确载入 showcase 页；控制台除 favicon 404 外无报错。

## v1.2.2 — 2026-11-13

### Fixed
- 环形世界版在作品集里的大小终于和星球版、田园版对齐：上一版把展示模式改成了 grid 居中，导致画布退回原始 168px（星球版是 304px），环内内容只占圆环 57%，看上去小了一圈。现改用与另外两版同一套定位规则，画布按整数像素步长放大到 336px，物理像素大小与另两版完全相同。
- 环形世界版补上「主页下沉 → 点进去上浮」的过渡：闭合卡片里作品沉在下方位（`top:20vh` + `scale(1.36)`），展开时上浮回居中自然尺寸（`top:50%` + `translateY(-50%)`），620ms 缓动，与星球版落点一致（y 89 → 18，高度 559 → 411）。

### Validation
- 本地三版同尺寸对比：作品画布 rect 星球 / 田园 art 413px、full 304px；环形世界 art 457px、full 336px，像素步长均为 2。
- 过渡实测：art y=89 h=559 → t=200ms y=29 h=434 → full y=18 h=411。
- 环形世界独立页：时钟运行、按钮全部接线、控制台 0 报错。

## v1.2.1 — 2026-11-13

### Fixed
- 修复环形世界版在作品集卡片里被压成顶部一条窄带、且标题 / 时钟 / 按钮 / 提示文字压在画面上的问题：环形世界页自己另写了一套 showcase 定位，漏了「隐藏非作品元素」和「撑满 main 高度」这两条规则，现改为与星球版、田园版共用同一套已验证的 showcase 模式。
- 修复环形世界页的按钮与时钟全部失效：胶水脚本在解析期就取 `el.__pixelOrbit`，而组件要到 DOMContentLoaded 才挂载，取到 undefined 后抛错，后续代码全没执行；现改为挂载未就绪时就地挂载。
- 作品页缓存版本号改为取作品文件自己的 ETag，不再依赖人工递增的 `v=` 数字：作品页一改动，浏览器立刻拿到新版本。

## v1.2.0 — 2026-11-13

### Added
- 将新增的环形世界效果独立保存为 `pixel-orbit-world.html`，不再覆盖田园版主编辑器。
- `showcase.html` 和公开试玩页支持田园、星球、环形世界三种效果。

### Fixed
- 从覆盖提交之前的稳定提交恢复完整的 `pixel-orbit.html`，保留参数实验室、展示模式、父子页面通信和原有功能。
- 为第三种效果补齐 display / showcase 模式及 iframe ready、构图消息协议。

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
