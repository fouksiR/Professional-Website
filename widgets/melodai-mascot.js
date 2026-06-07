/* =========================================================================
   MelodAi mascot widget  (light-DOM build)
   -------------------------------------------------------------------------
   Renders identically to the standalone mascot. Uses the normal DOM (NOT
   Shadow DOM) because SVG gradient/filter url(#id) references do not resolve
   inside a shadow root in Chrome/Safari. All classes/keyframes/ids are
   prefixed "mldx" and the CSS is scoped under .mldx-mascot, so nothing
   collides with the host page.

   USE:
     <div data-melodai-mascot data-scale="0.7"></div>
     <script src="/widgets/melodai-mascot.js" defer></script>
   ========================================================================= */
(function () {
  'use strict';

  var CSS = `
    .mldx-mascot{position:relative;width:430px;height:480px;
      font-family:'Montserrat',system-ui,sans-serif;line-height:normal;
      --coral:#e0654f;--coral-deep:#c8455a;--plum-deep:#34273f;--cycle:7.5s;--flop:9.5s}
    .mldx-mascot *{box-sizing:border-box}
    .mldx-dust{position:absolute;border-radius:50%;filter:blur(1px);opacity:.5;pointer-events:none;animation:mldxDrift 14s ease-in-out infinite}
    @keyframes mldxDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
    .mldx-core{position:absolute;left:0;top:0;width:430px;height:372px}

    .mldx-aura{position:absolute;left:50%;top:50%;width:330px;height:330px;
      transform:translate(-50%,-50%);border-radius:50%;z-index:1;
      background:radial-gradient(circle, rgba(224,101,79,.42) 0%, rgba(224,101,79,.18) 38%, rgba(224,101,79,.04) 60%, transparent 72%);
      animation:mldxAura var(--cycle) ease-in-out infinite}
    @keyframes mldxAura{
      0%,52%{opacity:.5;transform:translate(-50%,-50%) scale(1)}
      63%{opacity:1;transform:translate(-50%,-50%) scale(1.14)}
      79%{opacity:1;transform:translate(-50%,-50%) scale(1.14)}
      90%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)}}

    .mldx-egg-pos{position:absolute;left:50%;top:50%;width:184px;height:184px;
      transform:translate(-50%,-50%);z-index:3;animation:mldxBob 5.4s ease-in-out infinite}
    @keyframes mldxBob{0%,100%{transform:translate(-50%,-50%)}50%{transform:translate(-50%,calc(-50% - 8px))}}
    .mldx-egg{display:block;width:100%;height:100%;transform-origin:50% 50%;
      animation:mldxFlop var(--flop) ease-in-out infinite, mldxGlow var(--cycle) ease-in-out infinite}
    @keyframes mldxFlop{
      0%,50%{transform:rotate(0deg)}57%{transform:rotate(-13deg)}64%{transform:rotate(11deg)}
      71%{transform:rotate(-7deg)}78%{transform:rotate(4deg)}85%,100%{transform:rotate(0deg)}}
    @keyframes mldxGlow{
      0%,52%,90%,100%{filter:drop-shadow(0 14px 24px rgba(150,55,70,.34))}
      63%,79%{filter:drop-shadow(0 0 30px rgba(224,101,79,.9)) drop-shadow(0 14px 24px rgba(150,55,70,.34))}}
    .mldx-breathe{transform-box:fill-box;transform-origin:center;animation:mldxBreathe 4.6s ease-in-out infinite}
    @keyframes mldxBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.028)}}
    .mldx-eyes{transform-box:fill-box;transform-origin:center;animation:mldxBlink 5.6s infinite}
    @keyframes mldxBlink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.08)}}
    .mldx-spark{transform-box:fill-box;transform-origin:center;animation:mldxTwinkle 2.6s ease-in-out infinite}
    .mldx-spark.s2{animation-delay:.7s}.mldx-spark.s3{animation-delay:1.4s}.mldx-spark.s4{animation-delay:2s}
    @keyframes mldxTwinkle{0%,100%{opacity:.2;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
    .mldx-sheen{mix-blend-mode:screen;transform-box:fill-box;transform-origin:center;animation:mldxSheen 7s ease-in-out infinite}
    @keyframes mldxSheen{0%,100%{transform:translate(-6px,4px)}50%{transform:translate(7px,-5px)}}

    .mldx-swarm{position:absolute;inset:0;z-index:2}
    .mldx-orbit{position:absolute;left:50%;top:50%;animation:mldxOrbit var(--dur) linear infinite;
      animation-direction:var(--dir);animation-delay:var(--delay)}
    @keyframes mldxOrbit{to{transform:rotate(360deg)}}
    .mldx-sp-wrap{position:absolute;transform:translate(-50%,-50%) translateX(var(--r)) rotate(var(--face))}
    .mldx-sp{display:block;width:var(--size);height:auto;overflow:visible;filter:drop-shadow(0 2px 5px rgba(30,95,98,.4))}
    .mldx-sp .mldx-tail{transform-box:fill-box;transform-origin:86% 50%;animation:mldxWig var(--wig) ease-in-out infinite;animation-delay:var(--wdelay)}
    @keyframes mldxWig{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}

    .mldx-brand{position:absolute;left:50%;bottom:40px;transform:translateX(-50%);text-align:center;z-index:4;
      animation:mldxName var(--cycle) ease-in-out infinite}
    .mldx-brand-word{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:2.5rem;letter-spacing:.5px;
      color:var(--plum-deep);line-height:1;text-shadow:0 6px 22px rgba(224,101,79,.5)}
    .mldx-brand-ai{background:linear-gradient(120deg,var(--coral),var(--coral-deep));
      -webkit-background-clip:text;background-clip:text;color:transparent}
    .mldx-brand-sub{display:block;margin-top:.45rem;font-family:'Montserrat',sans-serif;font-weight:500;
      font-size:.62rem;letter-spacing:.32em;text-transform:uppercase;color:#9a7d84}
    @keyframes mldxName{
      0%,28%{opacity:0;transform:translateX(-50%) translateY(10px)}
      40%{opacity:1;transform:translateX(-50%) translateY(0)}
      82%{opacity:1;transform:translateX(-50%) translateY(0)}
      92%,100%{opacity:0;transform:translateX(-50%) translateY(10px)}}

    @media (prefers-reduced-motion:reduce){
      .mldx-mascot *{animation:none!important}.mldx-brand{opacity:1}}
  `;

  // shared SVG paint servers + filters (live in the light DOM so url(#) resolves)
  var DEFS =
    '<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>' +
      '<radialGradient id="mldx-body" cx="35%" cy="29%" r="76%">' +
        '<stop offset="0%" stop-color="#fff6f2"/><stop offset="19%" stop-color="#ffd6ca"/>' +
        '<stop offset="44%" stop-color="#fcab99"/><stop offset="67%" stop-color="#f2867d"/>' +
        '<stop offset="86%" stop-color="#e3636e"/><stop offset="100%" stop-color="#c8455a"/>' +
      '</radialGradient>' +
      '<radialGradient id="mldx-rim" cx="50%" cy="50%" r="50%">' +
        '<stop offset="82%" stop-color="#ffffff" stop-opacity="0"/><stop offset="100%" stop-color="#a83a52" stop-opacity=".55"/>' +
      '</radialGradient>' +
      '<radialGradient id="mldx-bloom" cx="50%" cy="48%" r="50%">' +
        '<stop offset="0%" stop-color="#ffd1c6" stop-opacity=".7"/><stop offset="55%" stop-color="#ffc7bd" stop-opacity=".22"/><stop offset="100%" stop-color="#ffc7bd" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<linearGradient id="mldx-gloss" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#ffffff" stop-opacity=".9"/><stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
      '</linearGradient>' +
      '<radialGradient id="mldx-spHead" cx="38%" cy="32%" r="70%">' +
        '<stop offset="0%" stop-color="#ffffff"/><stop offset="45%" stop-color="#bdeef0"/><stop offset="100%" stop-color="#2fa3aa"/>' +
      '</radialGradient>' +
      '<filter id="mldx-soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="1.6"/></filter>' +
      '<filter id="mldx-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>' +
    '</defs></svg>';

  var HTML =
    '<div class="mldx-mascot" role="img" aria-label="MelodAi, an egg mascot surrounded by swimming sperm">' +
      '<span class="mldx-dust" style="width:14px;height:14px;left:18%;top:22%;background:#e0654f"></span>' +
      '<span class="mldx-dust" style="width:9px;height:9px;left:78%;top:28%;background:#2fa3aa;animation-delay:-4s"></span>' +
      '<span class="mldx-dust" style="width:11px;height:11px;left:72%;top:60%;background:#e0654f;animation-delay:-8s"></span>' +
      '<span class="mldx-dust" style="width:7px;height:7px;left:24%;top:62%;background:#2fa3aa;animation-delay:-2s"></span>' +
      '<div class="mldx-core">' +
        '<div class="mldx-aura" aria-hidden="true"></div>' +
        '<div class="mldx-swarm" aria-hidden="true"></div>' +
        '<div class="mldx-egg-pos">' +
        '<svg class="mldx-egg" viewBox="0 0 100 100" aria-hidden="true">' +
          '<ellipse cx="50" cy="94" rx="25" ry="5" fill="#6e3a47" opacity=".2" filter="url(#mldx-soft)"/>' +
          '<circle cx="50" cy="48" r="47" fill="url(#mldx-bloom)" filter="url(#mldx-glow)"/>' +
          '<g class="mldx-corona"></g>' +
          '<g fill="#ffffff">' +
            '<path class="mldx-spark s1" d="M50 3 l1.6 4.4 4.4 1.6 -4.4 1.6 -1.6 4.4 -1.6 -4.4 -4.4 -1.6 4.4 -1.6z"/>' +
            '<path class="mldx-spark s2" d="M87 25 l1.1 3.2 3.2 1.1 -3.2 1.1 -1.1 3.2 -1.1 -3.2 -3.2 -1.1 3.2 -1.1z"/>' +
            '<path class="mldx-spark s3" d="M13 30 l1 2.8 2.8 1 -2.8 1 -1 2.8 -1 -2.8 -2.8 -1 2.8 -1z"/>' +
            '<path class="mldx-spark s4" d="M89 64 l.9 2.6 2.6 .9 -2.6 .9 -.9 2.6 -.9 -2.6 -2.6 -.9 2.6 -.9z"/>' +
          '</g>' +
          '<g class="mldx-breathe">' +
            '<circle cx="50" cy="48" r="34" fill="url(#mldx-body)"/>' +
            '<circle cx="50" cy="48" r="34" fill="url(#mldx-rim)"/>' +
            '<ellipse class="mldx-sheen" cx="41" cy="31" rx="15" ry="10" fill="url(#mldx-gloss)" opacity=".75"/>' +
            '<circle cx="34" cy="27" r="3" fill="#ffffff" opacity=".95"/>' +
            '<path d="M76 58 A34 34 0 0 1 30 80" fill="none" stroke="#b34a5f" stroke-width="5" opacity=".22" filter="url(#mldx-soft)"/>' +
            '<ellipse cx="33" cy="57" rx="6.5" ry="4.4" fill="#f06a72" opacity=".55" filter="url(#mldx-soft)"/>' +
            '<ellipse cx="67" cy="57" rx="6.5" ry="4.4" fill="#f06a72" opacity=".55" filter="url(#mldx-soft)"/>' +
            '<g class="mldx-eyes" fill="#43323b">' +
              '<ellipse cx="42" cy="49" rx="2.9" ry="3.6"/><ellipse cx="58" cy="49" rx="2.9" ry="3.6"/>' +
              '<circle cx="43.1" cy="47.4" r="1" fill="#fff"/><circle cx="59.1" cy="47.4" r="1" fill="#fff"/>' +
            '</g>' +
            '<path d="M43.5 58 q6.5 6 13 0" fill="none" stroke="#43323b" stroke-width="2.6" stroke-linecap="round"/>' +
          '</g>' +
        '</svg>' +
        '</div>' +
      '</div>' +
      '<div class="mldx-brand" aria-hidden="true">' +
        '<span class="mldx-brand-word">Melod<span class="mldx-brand-ai">Ai</span></span>' +
        '<span class="mldx-brand-sub">Evidence-based &middot; Anonymous</span>' +
      '</div>' +
    '</div>';

  function spermSVG() {
    return '<svg class="mldx-sp" viewBox="0 0 58 28" aria-hidden="true">' +
             '<g class="mldx-tail">' +
               '<path d="M46 14 C 36 2, 30 26, 20 14 C 13 5, 8 22, 3 14" fill="none" stroke="#1f8f96" stroke-width="3.6" stroke-linecap="round" opacity=".35"/>' +
               '<path d="M46 14 C 36 2, 30 26, 20 14 C 13 5, 8 22, 3 14" fill="none" stroke="#2fa3aa" stroke-width="2.2" stroke-linecap="round"/>' +
             '</g>' +
             '<ellipse cx="47" cy="14" rx="8.6" ry="6.9" fill="url(#mldx-spHead)" stroke="#1f8f96" stroke-width="1.2"/>' +
             '<circle cx="49.8" cy="11.2" r="2" fill="#ffffff"/>' +
           '</svg>';
  }

  var CONF = [
    {r:104, dur:7.0,  dir:'normal',  size:34, wig:.40, face:'96deg'},
    {r:122, dur:9.4,  dir:'reverse', size:29, wig:.46, face:'-84deg'},
    {r:140, dur:7.8,  dir:'normal',  size:38, wig:.38, face:'96deg'},
    {r:158, dur:12.0, dir:'reverse', size:25, wig:.52, face:'-84deg'},
    {r:114, dur:8.6,  dir:'normal',  size:31, wig:.43, face:'96deg'},
    {r:150, dur:10.6, dir:'normal',  size:35, wig:.41, face:'96deg'},
    {r:168, dur:13.4, dir:'reverse', size:23, wig:.56, face:'-84deg'}
  ];

  function build(hostMascot) {
    var swarm = hostMascot.querySelector('.mldx-swarm');
    CONF.forEach(function (c) {
      var orbit = document.createElement('div');
      orbit.className = 'mldx-orbit';
      orbit.style.setProperty('--dur', c.dur + 's');
      orbit.style.setProperty('--dir', c.dir);
      orbit.style.setProperty('--delay', (-Math.random() * c.dur).toFixed(2) + 's');
      var wrap = document.createElement('div');
      wrap.className = 'mldx-sp-wrap';
      wrap.style.setProperty('--r', c.r + 'px');
      wrap.style.setProperty('--size', c.size + 'px');
      wrap.style.setProperty('--face', c.face);
      wrap.style.setProperty('--wig', c.wig + 's');
      wrap.style.setProperty('--wdelay', (-Math.random() * c.wig).toFixed(2) + 's');
      wrap.innerHTML = spermSVG();
      orbit.appendChild(wrap);
      swarm.appendChild(orbit);
    });

    var corona = hostMascot.querySelector('.mldx-corona');
    if (corona) {
      var NS = 'http://www.w3.org/2000/svg';
      var rings = [
        {R:37.5, n:44, rx:[4.6,6.6], ry:[1.7,2.5], op:[.62,.92]},
        {R:41.5, n:36, rx:[3.6,5.2], ry:[1.4,2.1], op:[.36,.62]}
      ];
      rings.forEach(function (rg) {
        for (var i = 0; i < rg.n; i++) {
          var a = (i / rg.n) * Math.PI * 2 + Math.random() * 0.06;
          var jr = rg.R + (Math.random() * 1.6 - 0.8);
          var x = 50 + Math.cos(a) * jr, y = 48 + Math.sin(a) * jr;
          var deg = a * 180 / Math.PI;
          var cell = document.createElementNS(NS, 'ellipse');
          cell.setAttribute('cx', x.toFixed(2));
          cell.setAttribute('cy', y.toFixed(2));
          cell.setAttribute('rx', (rg.rx[0] + Math.random() * (rg.rx[1]-rg.rx[0])).toFixed(2));
          cell.setAttribute('ry', (rg.ry[0] + Math.random() * (rg.ry[1]-rg.ry[0])).toFixed(2));
          cell.setAttribute('transform', 'rotate(' + deg.toFixed(1) + ' ' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
          cell.setAttribute('fill', '#ffe6d8');
          cell.setAttribute('stroke', '#f0b6a2');
          cell.setAttribute('stroke-width', '0.35');
          cell.setAttribute('opacity', (rg.op[0] + Math.random() * (rg.op[1]-rg.op[0])).toFixed(2));
          corona.appendChild(cell);
        }
      });
    }
  }

  function mount(host) {
    if (host.getAttribute('data-mldx-ready')) return;   // never mount twice
    host.setAttribute('data-mldx-ready', '1');
    var scale = parseFloat(host.getAttribute('data-scale')) || 1;
    host.style.display = 'inline-block';
    host.style.width = (430 * scale) + 'px';
    host.style.height = (480 * scale) + 'px';
    host.innerHTML = HTML;
    var mascot = host.querySelector('.mldx-mascot');
    if (scale !== 1) {
      mascot.style.transform = 'scale(' + scale + ')';
      mascot.style.transformOrigin = 'top left';
    }
    build(mascot);
  }

  function init() {
    // fonts
    if (!document.getElementById('mldx-fonts')) {
      var f = document.createElement('link');
      f.id = 'mldx-fonts'; f.rel = 'stylesheet';
      f.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@500;600&display=swap';
      document.head.appendChild(f);
    }
    // styles
    if (!document.getElementById('mldx-style')) {
      var st = document.createElement('style'); st.id = 'mldx-style'; st.textContent = CSS;
      document.head.appendChild(st);
    }
    // shared SVG defs
    if (!document.getElementById('mldx-defs')) {
      var holder = document.createElement('div');
      holder.id = 'mldx-defs'; holder.setAttribute('aria-hidden', 'true');
      holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
      holder.innerHTML = DEFS;
      document.body.appendChild(holder);
    }
    var hosts = document.querySelectorAll('[data-melodai-mascot]');
    for (var i = 0; i < hosts.length; i++) mount(hosts[i]);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
