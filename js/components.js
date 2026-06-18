(function () {
  var WA_URL = "https://wa.me/5511975177592?text=Olá, gostaria de informações sobre os produtos da Axiōta Animal Health.";
  var WA_PRODUCT_URL = "https://wa.me/5511975177592?text=Olá, quero falar com um representante da Axiōta.";

  var page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  function isActive(href) {
    return page === href.toLowerCase();
  }

  function navLink(href, label, extraClass) {
    var active = isActive(href);
    var base = "nav-link px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ";
    var state = active
      ? "text-primary bg-surface-container-low"
      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low";
    return '<a href="' + href + '" class="' + base + state + (extraClass ? " " + extraClass : "") + '">' + label + "</a>";
  }

  function mobileNavLink(href, label) {
    var active = isActive(href);
    var base = "flex items-center px-4 py-3 rounded-xl font-semibold text-sm transition-colors ";
    var state = active
      ? "text-primary bg-surface-container-low"
      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low";
    return '<a href="' + href + '" class="' + base + state + '">' + label + "</a>";
  }

  var NAV_HTML = '\
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 border-b border-outline-variant nav-transparent" style="transition:background 0.35s,box-shadow 0.35s,border-color 0.35s;">\
  <div id="nav-bg-split" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 0.45s ease;">\
    <div style="position:absolute;inset:0;background:#0c2965;"></div>\
    <div id="nav-split-white" style="position:absolute;inset:0;background:#fff;clip-path:polygon(0 0,200px 0,186px 100%,0 100%);will-change:clip-path;transition:clip-path 0.1s;"></div>\
  </div>\
  <div class="flex items-center justify-between w-full max-w-[1280px] mx-auto px-5 md:px-16 h-16 relative">\
    <a href="index.html" class="flex items-center gap-3 shrink-0 group">\
      <img src="fotos/logo_axiota.png" alt="Axiōta Animal Health" class="h-9 w-auto transition-opacity group-hover:opacity-80">\
    </a>\
    <div class="hidden md:flex items-center gap-1">\
      ' + navLink("sobre.html", "Sobre a Axiōta") + '\
      <div class="nav-dropdown relative">\
        <button class="nav-link px-4 py-2 rounded-lg text-[13px] font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-all duration-200 flex items-center gap-1">\
          Produtos\
          <svg class="w-3 h-3 transition-transform dropdown-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>\
        </button>\
        <div class="dropdown-menu absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-outline-variant py-2 opacity-0 invisible translate-y-2 transition-all duration-200 z-50">\
          <a href="multimin-90.html" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">\
            <span class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-mono font-black">90</span>\
            Multimin® 90\
          </a>\
          <a href="lactipro.html" class="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors">\
            <span class="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-mono font-black">LP</span>\
            Lactipro®\
          </a>\
        </div>\
      </div>\
      ' + navLink("casos-de-sucesso.html", "Casos de Sucesso") + '\
      ' + navLink("representantes.html", "Representantes") + '\
    </div>\
    <div class="hidden md:flex items-center gap-3">\
      <a href="' + WA_PRODUCT_URL + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-scientific-blue transition-all duration-200 shadow-sm hover:shadow-md">\
        <span class="material-symbols-outlined text-[16px]" style="font-variation-settings:\'FILL\' 1;">chat</span>\
        Fale Conosco\
      </a>\
    </div>\
    <button id="hamburger" class="md:hidden p-2 text-primary rounded-lg hover:bg-surface-container-low transition-colors" aria-label="Abrir menu">\
      <span class="material-symbols-outlined">menu</span>\
    </button>\
  </div>\
</nav>\
\
<div id="mobile-menu" class="fixed inset-y-0 right-0 w-72 bg-clinical-white z-[200] shadow-2xl flex flex-col md:hidden" style="transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);">\
  <div class="flex items-center justify-between p-6 border-b border-outline-variant">\
    <img src="fotos/logo_axiota.png" alt="Axiōta" class="h-8 w-auto">\
    <button id="close-menu" class="p-1 text-on-surface-variant hover:text-primary rounded-lg transition-colors">\
      <span class="material-symbols-outlined">close</span>\
    </button>\
  </div>\
  <nav class="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">\
    ' + mobileNavLink("index.html", "Início") + '\
    ' + mobileNavLink("sobre.html", "Sobre a Axiōta") + '\
    <div class="px-4 pt-4 pb-1">\
      <span class="text-xs font-mono uppercase tracking-widest text-outline">Produtos</span>\
    </div>\
    ' + mobileNavLink("multimin-90.html", "Multimin® 90") + '\
    ' + mobileNavLink("lactipro.html", "Lactipro®") + '\
    ' + mobileNavLink("casos-de-sucesso.html", "Casos de Sucesso") + '\
    ' + mobileNavLink("representantes.html", "Representantes") + '\
  </nav>\
  <div class="p-4 border-t border-outline-variant">\
    <a href="' + WA_PRODUCT_URL + '" target="_blank" rel="noopener"\
       class="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-scientific-blue transition-colors">\
      <span class="material-symbols-outlined text-[18px]" style="font-variation-settings:\'FILL\' 1;">chat</span>\
      Fale Conosco\
    </a>\
  </div>\
</div>\
<div id="menu-overlay" class="fixed inset-0 bg-black/40 z-[199] hidden md:hidden"></div>';

  var FOOTER_HTML = '\
<footer class="bg-primary text-white pt-16 pb-8 px-5 md:px-16">\
  <div class="max-w-[1280px] mx-auto">\
    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">\
      <div class="md:col-span-2">\
        <img src="fotos/logo_axiota.png" alt="Axiōta Animal Health" class="h-10 w-auto mb-4 brightness-0 invert">\
        <p class="text-sm text-white/60 max-w-xs leading-relaxed">Biotecnologia para saúde e desempenho animal. Certeza Biológica para o seu rebanho.</p>\
        <div class="flex gap-3 mt-6">\
          <a href="https://www.instagram.com/multiminbrasil?igsh=MTNya2R5ZWxrNWl6Nw==" target="_blank" rel="noopener" aria-label="Instagram" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">\
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>\
          </a>\
          <a href="https://www.linkedin.com/company/multimin-90-brasil/" target="_blank" rel="noopener" aria-label="LinkedIn" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">\
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>\
          </a>\
          <a href="https://youtube.com/@multiminbrasil?si=1kN4DYE1L_VVKUnI" target="_blank" rel="noopener" aria-label="YouTube" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">\
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>\
          </a>\
          <a href="https://www.tiktok.com/@multiminbrasil" target="_blank" rel="noopener" aria-label="TikTok" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">\
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>\
          </a>\
          <a href="https://www.facebook.com/share/1cEA6YMFop/" target="_blank" rel="noopener" aria-label="Facebook" class="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">\
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>\
          </a>\
        </div>\
      </div>\
      <div>\
        <h4 class="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Produtos</h4>\
        <ul class="space-y-2">\
          <li><a href="multimin-90.html" class="footer-link">Multimin® 90</a></li>\
          <li><a href="lactipro.html" class="footer-link">Lactipro®</a></li>\
          <li><a href="microminerais.html" class="footer-link">Microminerais</a></li>\
        </ul>\
      </div>\
      <div>\
        <h4 class="text-xs font-mono uppercase tracking-widest text-white/40 mb-4">Empresa</h4>\
        <ul class="space-y-2">\
          <li><a href="sobre.html" class="footer-link">Sobre a Axiōta</a></li>\
          <li><a href="casos-de-sucesso.html" class="footer-link">Casos de Sucesso</a></li>\
          <li><a href="testemunhos.html" class="footer-link">Testemunhos</a></li>\
          <li><a href="representantes.html" class="footer-link">Representantes</a></li>\
        </ul>\
      </div>\
    </div>\
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">\
      <p class="text-xs text-white/40">Axiōta Animal Health © 2026. Todos os direitos reservados.</p>\
      <div class="flex gap-6">\
        <a href="informacoes-tecnicas.html" class="text-xs text-white/40 hover:text-white/70 transition-colors">Informações Técnicas</a>\
        <a href="avisos-legais.html" class="text-xs text-white/40 hover:text-white/70 transition-colors">Avisos Legais</a>\
      </div>\
    </div>\
  </div>\
</footer>\
\
<a href="' + WA_URL + '" target="_blank" rel="noopener noreferrer" class="whatsapp-fab" aria-label="Falar no WhatsApp">\
  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">\
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>\
  </svg>\
</a>';

  var navRoot = document.getElementById("site-nav");
  if (navRoot) navRoot.innerHTML = NAV_HTML;

  var footerRoot = document.getElementById("site-footer");
  if (footerRoot) footerRoot.innerHTML = FOOTER_HTML;

  // Mobile menu toggle
  var hamburger = document.getElementById("hamburger");
  var closeBtn = document.getElementById("close-menu");
  var mobileMenu = document.getElementById("mobile-menu");
  var overlay = document.getElementById("menu-overlay");

  function openMenu() {
    mobileMenu.style.transform = "translateX(0)";
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobileMenu.style.transform = "translateX(100%)";
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (hamburger) hamburger.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  // Dropdown
  var dropdowns = document.querySelectorAll(".nav-dropdown");
  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector("button");
    var menu = dd.querySelector(".dropdown-menu");
    var arrow = dd.querySelector(".dropdown-arrow");

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = !menu.classList.contains("invisible");
      closeAllDropdowns();
      if (!isOpen) {
        menu.classList.remove("opacity-0", "invisible", "translate-y-2");
        if (arrow) arrow.style.transform = "rotate(180deg)";
      }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-menu").forEach(function (m) {
      m.classList.add("opacity-0", "invisible", "translate-y-2");
    });
    document.querySelectorAll(".dropdown-arrow").forEach(function (a) {
      a.style.transform = "";
    });
  }

  document.addEventListener("click", closeAllDropdowns);

  // Navbar scroll behavior with diagonal split
  var navbar = document.getElementById("navbar");
  var hero = document.getElementById("hero");
  var navBgSplit = document.getElementById("nav-bg-split");
  var navSplitWhite = document.getElementById("nav-split-white");
  var logoLink = navbar ? navbar.querySelector("a") : null;

  var SKEW_PX = 20; // diagonal offset in pixels (diagonal slant width)

  function updateSplitClip() {
    if (!navSplitWhite || !logoLink || !navbar) return;
    var navRect = navbar.getBoundingClientRect();
    var logoRect = logoLink.getBoundingClientRect();
    // Right edge of logo relative to nav left, + a small gap
    var cutX = logoRect.right - navRect.left + 16;
    navSplitWhite.style.clipPath = [
      "polygon(0 0,", (cutX + SKEW_PX) + "px 0,", cutX + "px 100%,0 100%)"
    ].join("");
  }

  function updateNavbar() {
    if (!navbar) return;
    var scrolled = window.scrollY > 40;
    var pastHero = hero ? hero.getBoundingClientRect().bottom <= 64 : scrolled;

    if (pastHero) {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "0 1px 24px rgba(12,41,101,0.18)";
      navbar.style.borderBottomColor = "rgba(255,255,255,0.08)";
      if (navBgSplit) navBgSplit.style.opacity = "1";
      navbar.classList.add("nav-split");
      updateSplitClip();
      navbar.querySelectorAll(".nav-link").forEach(function (el) {
        el.style.color = "rgba(255,255,255,0.85)";
      });
    } else {
      navbar.style.background = scrolled ? "rgba(255,255,255,0.97)" : "#ffffff";
      navbar.style.boxShadow = scrolled ? "0 1px 12px rgba(12,41,101,0.08)" : "none";
      navbar.style.borderBottomColor = "";
      if (navBgSplit) navBgSplit.style.opacity = "0";
      navbar.classList.remove("nav-split");
      navbar.querySelectorAll(".nav-link").forEach(function (el) { el.style.color = ""; });
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  window.addEventListener("resize", function () {
    updateSplitClip();
    updateNavbar();
  }, { passive: true });
  updateNavbar();
})();
