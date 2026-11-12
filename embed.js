(function () {
  'use strict';

  /* Pixel Orbit 嵌入式脚本
     ---------------------------------------------------------
     两行写法（容器自己指定）：
       <div data-pixel-orbit-embed></div>
       <script src="https://gsvegetable.github.io/-pixel-orbit/embed.js" data-scene="planet"></script>

     只有一行也行（作品会插在脚本前面）：
       <script src="https://gsvegetable.github.io/-pixel-orbit/embed.js"></script>

     可选参数（写在 script 标签上）：
       data-scene        countryside | planet | world   默认 planet
       data-composition  art | full                     默认 full
       data-label        无障碍标签文案
       data-base         自托管时的作品站地址，默认官方 GitHub Pages

     和像素昼夜开关的 embed.js 一样：样式只作用在自己的类上，
     不会污染宿主网页的 body / main。 */

  var BASE = 'https://gsvegetable.github.io/-pixel-orbit/';
  // showcase.html 改了就把这个版本号往上加一位；作品页自己的版本由 showcase.html 取 ETag 决定
  var SHOWCASE_VERSION = '1.2.3';
  var SCENES = ['countryside', 'planet', 'world'];

  var script = document.currentScript;

  var readAttr = function (name, fallback) {
    if (!script) return fallback;
    var value = script.getAttribute(name);
    return value === null || value === '' ? fallback : value;
  };

  // 想自己托管作品页的话，用 data-base 换掉默认地址
  var base = readAttr('data-base', BASE);
  if (base.charAt(base.length - 1) !== '/') base += '/';

  var scene = readAttr('data-scene', 'planet');
  if (SCENES.indexOf(scene) === -1) scene = 'planet';

  var composition = readAttr('data-composition', 'full');
  if (composition !== 'art' && composition !== 'full') composition = 'full';

  var label = readAttr('data-label', 'Pixel Orbit 像素圆环');

  // 容器：优先用脚本前面那个带 data-pixel-orbit-embed 的元素
  var candidate = script && script.previousElementSibling;
  var useSlot = !!(candidate && candidate.hasAttribute && candidate.hasAttribute('data-pixel-orbit-embed'));

  var ensureStyles = function () {
    if (document.getElementById('po-embed-style')) return;
    var style = document.createElement('style');
    style.id = 'po-embed-style';
    style.textContent = [
      '.po-embed{display:block;position:relative;box-sizing:border-box;width:min(100%,520px);aspect-ratio:1;margin:20px auto;overflow:hidden;border-radius:16px;background:#f5ecd9}',
      '.po-embed-frame{display:block;width:100%;height:100%;border:0;background:transparent}',
      '.po-embed-error{margin:0;padding:16px;color:#9b1c1c;font:14px/1.6 system-ui,sans-serif}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(style);
  };

  var showError = function (wrapper) {
    var message = document.createElement('p');
    message.className = 'po-embed-error';
    message.textContent = 'Pixel Orbit 没能加载出来，请检查网络连接。';
    wrapper.replaceChildren(message);
  };

  var insertAndLoad = function () {
    ensureStyles();

    var wrapper;
    if (useSlot) {
      wrapper = candidate;
      wrapper.classList.add('po-embed');
    } else {
      wrapper = document.createElement('div');
      wrapper.className = 'po-embed';
      // 脚本放在 <head> 里时不能把可见内容塞进 head
      if (script && script.parentNode && script.parentNode !== document.head) {
        script.parentNode.insertBefore(wrapper, script);
      } else {
        (document.body || document.documentElement).appendChild(wrapper);
      }
    }

    var frame = document.createElement('iframe');
    frame.className = 'po-embed-frame';
    frame.title = label;
    frame.setAttribute('loading', 'lazy');
    frame.setAttribute('allow', 'fullscreen');
    frame.src = base + 'showcase.html?v=' + SHOWCASE_VERSION +
      '&scene=' + encodeURIComponent(scene) +
      '&composition=' + encodeURIComponent(composition);

    var settled = false;
    frame.addEventListener('load', function () { settled = true; });
    // iframe 加载失败时不会报错，只能靠超时兜底
    setTimeout(function () { if (!settled) showError(wrapper); }, 10000);

    wrapper.replaceChildren(frame);
  };

  if (document.body) insertAndLoad();
  else document.addEventListener('DOMContentLoaded', insertAndLoad, { once: true });
})();
