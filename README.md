# Pixel Orbit

[![Quality checks](https://github.com/GSvegetable/-pixel-orbit/actions/workflows/quality.yml/badge.svg)](https://github.com/GSvegetable/-pixel-orbit/actions/workflows/quality.yml)


> A tiny pixel-art world that moves with the time of day. / 一座随时间流动的像素小世界。

<p align="center">
  <a href="https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html"><strong>▶ Play Pixel Orbit</strong></a>
  ·
  <a href="https://gsvegetable.github.io/-pixel-orbit/lab.html"><strong>⚙ Open the Lab</strong></a>
  ·
  <a href="#中文说明">中文</a>
  ·
  <a href="#english">English</a>
  ·
  <a href="#日本語">日本語</a>
</p>

**Online demo:** https://gsvegetable.github.io/-pixel-orbit/  
**Lab:** https://gsvegetable.github.io/-pixel-orbit/lab.html

**Quick navigation:** [主体验 · 田园版](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html) · [第二视觉 · 星球版](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit-planet.html) · [参数实验室](https://gsvegetable.github.io/-pixel-orbit/lab.html) · [开发说明](./docs/DEVELOPMENT.md) · [更新日志](./CHANGELOG.md) · [自动化检查](https://github.com/GSvegetable/-pixel-orbit/actions/workflows/quality.yml)

---

## 中文说明

Pixel Orbit 是一个无需依赖、无需构建步骤的像素昼夜互动作品，现提供两种独立视觉版本：主版本以田园小屋为核心，星球版以球面地形和昼夜轨道为核心。拖动圆环或调整时间，可以观察光照与场景随一天变化。

### 体验入口

- **[在线试玩](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html)**：直接打开完整互动页面。
- **[实验室 / 参数说明](https://gsvegetable.github.io/-pixel-orbit/lab.html)**：查看控制方式、可调参数与开发接口。
- **[星球版 · 第二种视觉效果](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit-planet.html)**：球面地形、云层、昼夜光照与太阳/月亮轨道的另一种演绎。
- **[网站首页](https://gsvegetable.github.io/-pixel-orbit/)**：打开 Pixel Orbit 主体验。

### 功能

- 152 × 152 像素画布，圆形玻璃窗口与 24 小时轨道表盘。
- 天空与环境随时间变化：日出、正午、黄昏、夜晚，以及星星、云、烟雾、飞鸟、萤火虫和房屋灯光。
- 可拖动圆环、使用时间滑块，或选择清晨 / 正午 / 黄昏 / 深夜预设。
- 白天、夜晚与自动循环模式。
- 四种色彩氛围：原始田园、海岸薄雾、薰衣草暮色、琥珀暖光。
- 中文、English、日本語三种界面语言。
- 12 / 24 小时制、本地时间同步、偏好设置本地保存。
- 运行诊断、键盘操作、焦点提示与减少动态效果支持。

### 可调参数

| 参数 | 范围 / 选项 | 作用 |
|---|---|---|
| 当前时间 | 00:00–23:59 | 改变太阳、月亮与场景光照 |
| 自动循环速度 | 12–180 秒 / 天 | 控制虚拟时间走完一天所需的真实时间 |
| 色彩氛围 | 4 种预设 | 切换整幅像素场景的配色 |
| 界面语言 | 中文 / English / 日本語 | 切换界面文字 |
| 时间显示 | 12 小时 / 24 小时 | 改变时钟格式 |
| 本地时间同步 | 当前设备时间 | 一键回到现实时间 |

### 本地运行

无需安装依赖。直接打开 `pixel-orbit.html`，或在项目根目录运行：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

### 启用在线版本（GitHub Pages）

1. 打开仓库 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**。
3. Branch 选择 `main`，目录选择 `/(root)`，保存。
4. 等待 GitHub Pages 部署完成，再访问上方在线试玩地址。

仓库根目录的 `index.html` 会自动跳转到主体验页 `pixel-orbit.html`。

### 开发者参数与接口

组件的五个 CSS 色彩变量可用于自定义主题：

```css
.pixel-orbit {
  --orbit-bg: #f5ecd9;
  --orbit-surface: #8c9a62;
  --orbit-fg: #1b2146;
  --orbit-muted: #7f97b3;
  --orbit-accent: #efa02c;
}
```

挂载后的实例支持 `setHour(hour)`、`toggle()`、`getHour()`、`isNight()`、`setAutoplay(seconds)`、`refreshColors()`、`onChange(callback)` 与 `destroy()`。详细嵌入方式见实验室页面。

---

## English

Pixel Orbit is a dependency-free pixel-art day/night experience. Move through a full day and watch the sky, sun, moon, house lights and scenery respond.

### Try it

- **[Play the experience](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html)** — open the interactive scene.
- **[Open the Lab](https://gsvegetable.github.io/-pixel-orbit/lab.html)** — explore controls, tunable settings and the developer API.
- **[Planet variant](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit-planet.html)** — an alternate globe, clouds and orbital day/night treatment.
- **[Hosted demo](https://gsvegetable.github.io/-pixel-orbit/)** — open the main experience.

### Features

- 152 × 152 pixel-art countryside inside a circular window.
- A 24-hour orbit dial, draggable time control and exact-minute slider.
- Dawn, noon, dusk and late-night presets.
- Day, night and automatic cycle modes.
- Four palettes: Countryside, Misty Coast, Lavender Dusk and Warm Amber.
- Chinese, English and Japanese UI.
- 12/24-hour clock, local-time sync and locally saved preferences.
- Diagnostics, keyboard support, visible focus and reduced-motion support.

### Tunable settings

| Setting | Range / choices | Effect |
|---|---|---|
| Time of day | 00:00–23:59 | Changes lighting and scene atmosphere |
| Auto-cycle duration | 12–180 seconds per day | Sets the real-time duration of one virtual day |
| Color mood | 4 presets | Changes the scene palette |
| Interface language | Chinese / English / Japanese | Changes UI copy |
| Clock format | 12-hour / 24-hour | Changes the clock display |
| Sync local time | Device's current time | Returns to real local time |

### Run locally

No build step or package installation is required. Open `pixel-orbit.html`, or run `python3 -m http.server 8080` from the repository root and visit `http://localhost:8080`.

### Enable GitHub Pages

In **Settings → Pages**, set **Source** to **GitHub Actions**. The repository workflow publishes the root directory after changes land on `main`. The root `index.html` forwards visitors to the main countryside experience.

### Developer customization

Override the five CSS custom properties `--orbit-bg`, `--orbit-surface`, `--orbit-fg`, `--orbit-muted` and `--orbit-accent` on `.pixel-orbit`. After changing colors at runtime, call `instance.refreshColors()`.

The public API includes `window.PixelOrbit.createRenderer(colors)`, `window.PixelOrbit.mount(element)`, and instance methods `setHour()`, `toggle()`, `getHour()`, `isNight()`, `setAutoplay()`, `refreshColors()`, `onChange()` and `destroy()`.

---

## 日本語

Pixel Orbit は、時刻に合わせて景色が変化する、依存ライブラリ不要のピクセルアート作品です。田園小屋を描くメイン版と、球面の惑星を描く別バージョンを用意しています。

### 体験する

- **[オンラインで遊ぶ](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit.html)** — メインのインタラクティブ画面を開きます。
- **[ラボ / 設定ガイド](https://gsvegetable.github.io/-pixel-orbit/lab.html)** — 操作方法、調整できる項目、開発者向け API を確認できます。
- **[惑星版](https://gsvegetable.github.io/-pixel-orbit/pixel-orbit-planet.html)** — 球面地形、雲、昼夜の光を使った別のビジュアルです。
- **[ホスト版デモ](https://gsvegetable.github.io/-pixel-orbit/)** — メイン体験を開きます。

### 主な機能

- 152 × 152 ピクセルの田園風景と円形ウィンドウ。
- 24 時間のダイヤル、ドラッグ操作、分単位の時間スライダー。
- 夜明け・正午・夕暮れ・深夜のプリセット。
- 昼・夜・自動再生モード。
- 4 種類の配色テーマ：田園、霧の海岸、ラベンダー、琥珀。
- 中国語・英語・日本語の UI。
- 12 / 24 時間表示、端末時刻との同期、設定のローカル保存。
- 診断情報、キーボード操作、フォーカス表示、動きを減らす設定への対応。

### 調整できる項目

| 項目 | 範囲 / 選択肢 | 内容 |
|---|---|---|
| 時刻 | 00:00–23:59 | 景色と光の状態を変更 |
| 自動再生速度 | 1 日あたり 12–180 秒 | 仮想の 1 日が進む速さ |
| カラーテーマ | 4 種類 | シーン全体の配色を変更 |
| 表示言語 | 中文 / English / 日本語 | UI の言語を変更 |
| 時計表示 | 12 時間 / 24 時間 | 時刻表示形式を変更 |
| 現在時刻に同期 | 端末の現在時刻 | 現実の時刻に戻す |

### ローカルで実行

ビルドや依存パッケージは不要です。`pixel-orbit.html` を直接開くか、リポジトリのルートで `python3 -m http.server 8080` を実行し、`http://localhost:8080` にアクセスしてください。

### GitHub Pages の設定

**Settings → Pages** で **Deploy from a branch** を選び、Branch を `main`、フォルダーを `/(root)` に設定して保存します。公開が完了すると、上記のホスト版デモにアクセスできます。ルートの `index.html` から `pixel-orbit.html` に自動転送されます。

### 開発者向けカスタマイズ

`.pixel-orbit` の CSS 変数 `--orbit-bg`、`--orbit-surface`、`--orbit-fg`、`--orbit-muted`、`--orbit-accent` を変更して配色を調整できます。実行中に色を変更した場合は `instance.refreshColors()` を呼び出してください。

公開 API には `window.PixelOrbit.createRenderer(colors)`、`window.PixelOrbit.mount(element)` と、`setHour()`、`toggle()`、`getHour()`、`isNight()`、`setAutoplay()`、`refreshColors()`、`onChange()`、`destroy()` が含まれます。

---

## Project structure

```text
-pixel-orbit/
├── .github/workflows/quality.yml  # GitHub Actions quality gate
├── tests/smoke.mjs                # Dependency-free syntax and feature checks
├── pixel-orbit.html               # Main countryside experience and renderer
├── pixel-orbit-planet.html        # Alternate pixel-planet visual experience
├── lab.html                       # Live playground and developer reference
├── index.html                     # GitHub Pages entry point
├── docs/DEVELOPMENT.md            # Architecture, lifecycle and test notes
├── CHANGELOG.md                   # Project history
└── README.md                      # English, 简体中文 and 日本語 project guide
```

## Quality checks

Run the checks locally with Node.js 18 or newer (no package installation required):

```bash
node tests/smoke.mjs
```

The smoke suite parses every inline script, executes the real pixel renderer at representative times, checks non-empty and varied pixel output, and verifies key controls, localization, accessibility hooks, lifecycle cleanup, entry-point navigation and lab documentation. GitHub Actions runs the same checks on pushes and pull requests that touch the application, tests, documentation or workflow.

For implementation notes, component lifecycle expectations and known testing boundaries, see [Development guide](./docs/DEVELOPMENT.md).

## License

No license has been specified. Copyright remains with the author; do not redistribute or reuse the artwork or source outside the permissions granted by the author.
