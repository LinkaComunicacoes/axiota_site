var SLIDES = [
  {
    image: "fotos/banner-produtos-multimin90-lactipro.png",
    imageMobile: "fotos/banner-1-mobile.png",
    label: "Biotecnologia de Precisão",
    title: "Se livre do imprevisto e potencialize o desempenho do seu rebanho.",
    body: "A biologia não pode ser um risco na sua fazenda. Assuma o controle e converta seu investimento em lucro.",
  },
  {
    image: "fotos/banner-4-novo.png",
    imageMobile: "fotos/banner-4-mobile.png",
    label: "Multimin® 90",
    title: "Microminerais injetáveis para o momento que mais exige do seu animal.",
    body: "Pico de absorção em 24h. Imunidade e desempenho quando o rebanho mais precisa.",
  },
  {
    image: "fotos/banner-5-novo.png",
    imageMobile: "fotos/banner-5-mobile.png",
    label: "Lactipro®",
    title: "Elimine a acidose ruminal antes que ela elimine o seu lucro.",
    body: "Biotecnologia ruminal que atua diretamente na causa. Transição de dieta sem refugo de cocho.",
  },
];

function initCarousel() {
  var root = document.getElementById("hero-carousel");
  if (!root) return;

  // Limpa instância anterior (rebuild no resize de tipo)
  root.innerHTML = "";

  var current = 0;
  var timer = null;
  var DURATION = 5500;
  var isMobile = window.DeviceType ? window.DeviceType.isMobile : window.innerWidth < 768;

  var progressTrack = document.createElement("div");
  progressTrack.style.cssText = [
    "position:absolute;top:0;left:0;right:0;height:3px;",
    "background:rgba(255,255,255,0.15);z-index:30;",
  ].join("");
  var progressBar = document.createElement("div");
  progressBar.style.cssText = "height:100%;width:0%;background:#93CAFF;transition:width linear;";
  progressTrack.appendChild(progressBar);

  var wrapper = document.createElement("div");
  wrapper.style.cssText = "position:relative;height:100%;overflow:hidden;";
  root.appendChild(wrapper);

  var h1El, bodyEl, labelEl, counterText, dots = [], bgs = [];

  /* ═══════════════════════════════════════════════════════════════
     DESKTOP — layout original (background-image cover + texto sobre)
  ═══════════════════════════════════════════════════════════════ */
  if (!isMobile) {
    bgs = SLIDES.map(function (s, i) {
      var el = document.createElement("div");
      el.style.cssText = [
        "position:absolute;inset:0;",
        "background-image:url('" + s.image + "');",
        "background-size:cover;background-position:center;",
        "opacity:" + (i === 0 ? "1" : "0") + ";",
        "transition:opacity 1.1s cubic-bezier(0.4,0,0.2,1);",
        "will-change:opacity;",
      ].join("");
      return el;
    });
    bgs.forEach(function (b) { wrapper.appendChild(b); });

    wrapper.appendChild(progressTrack);

    var textWrap = document.createElement("div");
    textWrap.style.cssText = [
      "position:relative;z-index:10;height:100%;",
      "display:flex;align-items:center;justify-content:flex-start;",
      "text-align:left;padding:0 clamp(1.25rem,5vw,5rem);padding-top:clamp(1.5rem,5vh,4rem);",
    ].join("");

    var textInner = document.createElement("div");
    textInner.style.cssText = "max-width:560px;";

    labelEl = document.createElement("span");
    labelEl.style.cssText = [
      "display:inline-block;font-size:10px;font-family:'JetBrains Mono',monospace;",
      "text-transform:uppercase;letter-spacing:0.14em;color:#93CAFF;",
      "border:1px solid rgba(147,202,255,0.35);padding:3px 11px;border-radius:20px;",
      "margin-bottom:14px;transition:opacity 0.35s ease;",
    ].join("");

    h1El = document.createElement("h1");
    h1El.style.cssText = [
      "font-family:'Hanken Grotesk',sans-serif;font-weight:900;color:#1a3f80;",
      "font-size:clamp(28px,4.5vw,46px);line-height:1.1;letter-spacing:-0.025em;margin-bottom:12px;",
      "transition:opacity 0.4s ease,transform 0.4s ease;",
    ].join("");

    bodyEl = document.createElement("p");
    bodyEl.style.cssText = [
      "color:rgba(12,41,101,0.75);font-size:clamp(14px,1.6vw,16px);line-height:1.6;",
      "font-family:'Inter',sans-serif;margin-bottom:24px;",
      "transition:opacity 0.4s 0.08s ease,transform 0.4s 0.08s ease;",
    ].join("");

    var ctaEl = document.createElement("div");
    ctaEl.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;justify-content:flex-start;";
    ctaEl.innerHTML = [
      '<a href="multimin-90.html" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0c2965;padding:10px 22px;border-radius:12px;font-family:\'Hanken Grotesk\',sans-serif;font-weight:700;font-size:14px;text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,0.18);transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 8px 28px rgba(0,0,0,0.22)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 4px 20px rgba(0,0,0,0.18)\'">',
      'Ver Produtos',
      '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      '</a>',
      '<a href="https://wa.me/5511975177592?text=Olá, quero saber mais sobre a Axiōta." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);color:#fff;border:1.5px solid rgba(255,255,255,0.3);padding:10px 22px;border-radius:12px;font-family:\'Hanken Grotesk\',sans-serif;font-weight:700;font-size:14px;text-decoration:none;transition:background 0.2s,border-color 0.2s;" onmouseover="this.style.background=\'rgba(255,255,255,0.22)\';this.style.borderColor=\'rgba(255,255,255,0.5)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.12)\';this.style.borderColor=\'rgba(255,255,255,0.3)\'">',
      'Fale Conosco',
      '</a>',
    ].join("");

    var counter = document.createElement("div");
    counter.style.cssText = "position:absolute;bottom:28px;left:50%;transform:translateX(-50%);z-index:20;display:flex;align-items:center;gap:10px;";
    counterText = document.createElement("span");
    counterText.style.cssText = "font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:rgba(255,255,255,0.5);user-select:none;transition:opacity 0.3s;";
    counter.appendChild(counterText);

    textInner.appendChild(labelEl);
    textInner.appendChild(h1El);
    textInner.appendChild(bodyEl);
    textInner.appendChild(ctaEl);
    textWrap.appendChild(textInner);
    wrapper.appendChild(textWrap);
    wrapper.appendChild(counter);
  }

  /* ═══════════════════════════════════════════════════════════════
     MOBILE — layout empilhado: imagem (contain) em cima + texto embaixo
     Estilo todo no CSS (#hero-mobile-* em index.css). Nada é cortado.
  ═══════════════════════════════════════════════════════════════ */
  var mImg;
  if (isMobile) {
    wrapper.appendChild(progressTrack);

    var mStack = document.createElement("div");
    mStack.id = "hero-mobile-stack";

    var mImgWrap = document.createElement("div");
    mImgWrap.id = "hero-mobile-imgwrap";
    mImg = document.createElement("img");
    mImg.id = "hero-mobile-img";
    mImg.alt = "Produtos Axiōta";
    mImg.src = SLIDES[0].imageMobile;
    mImgWrap.appendChild(mImg);

    var mText = document.createElement("div");
    mText.id = "hero-mobile-text";

    labelEl = document.createElement("span");
    labelEl.id = "hero-mobile-label";

    h1El = document.createElement("h1");
    h1El.id = "hero-mobile-h1";

    bodyEl = document.createElement("p");
    bodyEl.style.cssText = "display:none;";

    var mCta = document.createElement("a");
    mCta.id = "hero-mobile-cta";
    mCta.href = "multimin-90.html";
    mCta.innerHTML = 'Ver Produtos <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

    var mDots = document.createElement("div");
    mDots.id = "hero-mobile-dots";
    dots = SLIDES.map(function (_, i) {
      var d = document.createElement("span");
      if (i === 0) d.className = "active";
      mDots.appendChild(d);
      return d;
    });

    mText.appendChild(labelEl);
    mText.appendChild(h1El);
    mText.appendChild(mCta);
    mStack.appendChild(mImgWrap);
    mStack.appendChild(mText);
    wrapper.appendChild(mStack);
    wrapper.appendChild(mDots);
  }

  /* ═══════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════ */
  function render(idx, instant) {
    var s = SLIDES[idx];

    if (!instant) {
      h1El.style.opacity = "0";
      h1El.style.transform = "translateY(8px)";
      labelEl.style.opacity = "0";
      if (!isMobile) {
        bodyEl.style.opacity = "0";
        bodyEl.style.transform = "translateY(8px)";
      } else if (mImg) {
        mImg.style.opacity = "0";
      }
    }

    setTimeout(function () {
      labelEl.textContent = s.label;
      h1El.textContent = s.title;
      if (!isMobile) {
        bodyEl.textContent = s.body;
        if (counterText) counterText.textContent = pad(idx + 1) + " / " + pad(SLIDES.length);
      } else if (mImg) {
        mImg.src = s.imageMobile;
        mImg.style.opacity = "1";
      }

      h1El.style.opacity = "1";
      h1El.style.transform = "";
      labelEl.style.opacity = "1";
      if (!isMobile) {
        bodyEl.style.opacity = "1";
        bodyEl.style.transform = "";
      }
    }, instant ? 0 : 220);

    if (!isMobile && bgs.length) {
      bgs.forEach(function (b, i) { b.style.opacity = i === idx ? "1" : "0"; });
    }
    if (isMobile && dots.length) {
      dots.forEach(function (d, i) { d.className = i === idx ? "active" : ""; });
    }
    current = idx;

    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        progressBar.style.transition = "width " + DURATION + "ms linear";
        progressBar.style.width = "100%";
      });
    });
  }

  function goTo(n) { render(n, false); startTimer(); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () { goTo((current + 1) % SLIDES.length); }, DURATION);
  }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  render(0, true);
  startTimer();
}

// Init inicial + rebuild automático quando tipo de dispositivo mudar
initCarousel();
if (window.DeviceType) {
  window.DeviceType.onChange(function () { initCarousel(); });
}
