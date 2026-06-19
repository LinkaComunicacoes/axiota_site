var SLIDES = [
  {
    image: "fotos/banner-produtos-multimin90-lactipro.png",
    label: "Biotecnologia de Precisão",
    title: "Se livre do imprevisto e potencialize o desempenho do seu rebanho.",
    body: "A biologia não pode ser um risco na sua fazenda. Assuma o controle e converta seu investimento em lucro.",
  },
  {
    image: "fotos/banner 4.png",
    label: "Multimin® 90",
    title: "Microminerais injetáveis para o momento que mais exige do seu animal.",
    body: "Pico de absorção em 24h. Imunidade e desempenho quando o rebanho mais precisa.",
  },
  {
    image: "fotos/banner 5.png",
    label: "Lactipro®",
    title: "Elimine a acidose ruminal antes que ela elimine o seu lucro.",
    body: "Biotecnologia ruminal que atua diretamente na causa. Transição de dieta sem refugo de cocho.",
  },
];

(function () {
  var root = document.getElementById("hero-carousel");
  if (!root) return;

  var current = 0;
  var timer = null;
  var DURATION = 5500;

  /* ─────────────────────────────────────────────────────────────
     SHARED: backgrounds + progress bar (idênticos em ambos modos)
  ───────────────────────────────────────────────────────────── */
  var isMobile = window.innerWidth < 640;

  var bgs = SLIDES.map(function (s, i) {
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
  bgs.forEach(function (b) { wrapper.appendChild(b); });
  wrapper.appendChild(progressTrack);
  root.appendChild(wrapper);

  /* ─────────────────────────────────────────────────────────────
     MODO DESKTOP — layout original, sem alterações
  ───────────────────────────────────────────────────────────── */
  var h1El, bodyEl, labelEl, counterText;

  if (!isMobile) {
    var overlay = document.createElement("div");
    overlay.style.cssText = [
      "position:absolute;inset:0;pointer-events:none;",
      "background:radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.52) 100%),",
      "linear-gradient(to bottom, rgba(12,41,101,0.35) 0%, rgba(12,41,101,0.20) 50%, rgba(12,41,101,0.50) 100%);",
    ].join("");

    var textWrap = document.createElement("div");
    textWrap.style.cssText = [
      "position:relative;z-index:10;height:100%;",
      "display:flex;align-items:center;justify-content:flex-start;",
      "text-align:left;",
      "padding:0 clamp(1.25rem,5vw,5rem);",
      "padding-top:clamp(1.5rem,5vh,4rem);",
    ].join("");

    var textInner = document.createElement("div");
    textInner.style.cssText = "max-width:560px;";

    labelEl = document.createElement("span");
    labelEl.style.cssText = [
      "display:inline-block;",
      "font-size:10px;font-family:'JetBrains Mono',monospace;",
      "text-transform:uppercase;letter-spacing:0.14em;",
      "color:#93CAFF;border:1px solid rgba(147,202,255,0.35);",
      "padding:3px 11px;border-radius:20px;margin-bottom:14px;",
      "transition:opacity 0.35s ease;",
    ].join("");

    h1El = document.createElement("h1");
    h1El.style.cssText = [
      "font-family:'Hanken Grotesk',sans-serif;font-weight:900;color:#fff;",
      "font-size:clamp(28px,4.5vw,46px);",
      "line-height:1.1;letter-spacing:-0.025em;margin-bottom:12px;",
      "transition:opacity 0.4s ease,transform 0.4s ease;",
      "text-shadow:0 2px 24px rgba(0,0,0,0.3);",
    ].join("");

    bodyEl = document.createElement("p");
    bodyEl.style.cssText = [
      "color:rgba(255,255,255,0.72);",
      "font-size:clamp(14px,1.6vw,16px);line-height:1.6;",
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
    counter.style.cssText = [
      "position:absolute;bottom:28px;left:50%;transform:translateX(-50%);",
      "z-index:20;display:flex;align-items:center;gap:10px;",
    ].join("");

    counterText = document.createElement("span");
    counterText.style.cssText = [
      "font-family:'JetBrains Mono',monospace;",
      "font-size:11px;letter-spacing:0.1em;color:rgba(255,255,255,0.5);",
      "user-select:none;transition:opacity 0.3s;",
    ].join("");
    counter.appendChild(counterText);

    textInner.appendChild(labelEl);
    textInner.appendChild(h1El);
    textInner.appendChild(bodyEl);
    textInner.appendChild(ctaEl);
    textWrap.appendChild(textInner);
    wrapper.appendChild(overlay);
    wrapper.appendChild(textWrap);
    wrapper.appendChild(counter);
  }

  /* ─────────────────────────────────────────────────────────────
     MODO MOBILE — layout completamente refeito
     Gradiente escuro na base + título grande + botão único
  ───────────────────────────────────────────────────────────── */
  if (isMobile) {
    /* Gradiente mais forte na parte inferior para legibilidade */
    var mOverlay = document.createElement("div");
    mOverlay.style.cssText = [
      "position:absolute;inset:0;pointer-events:none;",
      "background:linear-gradient(",
      "to bottom,",
      "rgba(12,41,101,0.15) 0%,",
      "rgba(12,41,101,0.10) 40%,",
      "rgba(0,0,0,0.65) 70%,",
      "rgba(0,0,0,0.85) 100%",
      ");",
    ].join("");

    /* Bloco de texto ancorado no rodapé */
    var mText = document.createElement("div");
    mText.style.cssText = [
      "position:absolute;bottom:0;left:0;right:0;z-index:10;",
      "padding:1.5rem 1.25rem 2rem;",
    ].join("");

    labelEl = document.createElement("span");
    labelEl.style.cssText = [
      "display:inline-block;",
      "font-size:9px;font-family:'JetBrains Mono',monospace;",
      "text-transform:uppercase;letter-spacing:0.16em;",
      "color:#93CAFF;border:1px solid rgba(147,202,255,0.4);",
      "padding:3px 10px;border-radius:20px;margin-bottom:10px;",
      "transition:opacity 0.3s ease;",
    ].join("");

    h1El = document.createElement("h1");
    h1El.style.cssText = [
      "font-family:'Hanken Grotesk',sans-serif;font-weight:900;color:#fff;",
      "font-size:26px;line-height:1.15;letter-spacing:-0.02em;",
      "margin:0 0 18px;",
      "text-shadow:0 2px 16px rgba(0,0,0,0.5);",
      "transition:opacity 0.4s ease,transform 0.4s ease;",
    ].join("");

    /* bodyEl placeholder — não exibido no mobile mas precisa existir para o render() */
    bodyEl = document.createElement("p");
    bodyEl.style.cssText = "display:none;";

    var mCta = document.createElement("a");
    mCta.href = "multimin-90.html";
    mCta.style.cssText = [
      "display:inline-flex;align-items:center;gap:8px;",
      "background:#fff;color:#0c2965;",
      "padding:11px 24px;border-radius:12px;",
      "font-family:'Hanken Grotesk',sans-serif;font-weight:700;font-size:14px;",
      "text-decoration:none;box-shadow:0 4px 20px rgba(0,0,0,0.3);",
    ].join("");
    mCta.innerHTML = 'Ver Produtos <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

    /* Indicador de slides (bolinhas) */
    var mDots = document.createElement("div");
    mDots.style.cssText = "position:absolute;top:1rem;right:1rem;z-index:20;display:flex;gap:6px;";
    var dots = SLIDES.map(function (_, i) {
      var d = document.createElement("div");
      d.style.cssText = "width:6px;height:6px;border-radius:50%;background:" + (i === 0 ? "#fff" : "rgba(255,255,255,0.35)") + ";transition:background 0.3s;";
      return d;
    });
    dots.forEach(function (d) { mDots.appendChild(d); });

    mText.appendChild(labelEl);
    mText.appendChild(h1El);
    mText.appendChild(mCta);
    wrapper.appendChild(mOverlay);
    wrapper.appendChild(mText);
    wrapper.appendChild(mDots);

    /* Atualiza bolinhas ao mudar slide */
    var origGoTo = function (n) {};
    var updateDots = function (idx) {
      dots.forEach(function (d, i) {
        d.style.background = i === idx ? "#fff" : "rgba(255,255,255,0.35)";
      });
    };
    /* sobrescreve depois de goTo ser definido */
    window._carouselUpdateDots = updateDots;
  }

  /* ─────────────────────────────────────────────────────────────
     RENDER (compartilhado)
  ───────────────────────────────────────────────────────────── */
  function render(idx, instant) {
    var s = SLIDES[idx];

    if (!instant) {
      h1El.style.opacity = "0";
      h1El.style.transform = "translateY(8px)";
      labelEl.style.opacity = "0";
      if (!isMobile) {
        bodyEl.style.opacity = "0";
        bodyEl.style.transform = "translateY(8px)";
      }
    }

    setTimeout(function () {
      labelEl.textContent = s.label;
      h1El.textContent = s.title;
      if (!isMobile) { bodyEl.textContent = s.body; }
      if (!isMobile && counterText) {
        counterText.textContent = pad(idx + 1) + " / " + pad(SLIDES.length);
      }

      h1El.style.opacity = "1";
      h1El.style.transform = "";
      labelEl.style.opacity = "1";
      if (!isMobile) {
        bodyEl.style.opacity = "1";
        bodyEl.style.transform = "";
      }
    }, instant ? 0 : 200);

    bgs.forEach(function (b, i) { b.style.opacity = i === idx ? "1" : "0"; });
    current = idx;

    if (isMobile && window._carouselUpdateDots) {
      window._carouselUpdateDots(idx);
    }

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
})();
