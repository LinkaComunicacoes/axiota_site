/**
 * device.js — Detecção de tipo de dispositivo global
 * Equivalente vanilla JS do hook useDeviceType (React).
 *
 * Uso:
 *   DeviceType.isMobile   → < 768px
 *   DeviceType.isTablet   → 768px – 1023px
 *   DeviceType.isDesktop  → >= 1024px
 *   DeviceType.onChange(fn) → callback quando tipo mudar
 */
(function () {
  var MOBILE_MAX  = 768;
  var TABLET_MAX  = 1024;

  var _listeners = [];
  var _prev = null;

  var DeviceType = {
    isMobile:  false,
    isTablet:  false,
    isDesktop: false,

    update: function () {
      var w = window.innerWidth;
      this.isMobile  = w < MOBILE_MAX;
      this.isTablet  = w >= MOBILE_MAX && w < TABLET_MAX;
      this.isDesktop = w >= TABLET_MAX;

      // Sincroniza classes no <body> para uso em CSS
      document.body.classList.toggle("is-mobile",  this.isMobile);
      document.body.classList.toggle("is-tablet",  this.isTablet);
      document.body.classList.toggle("is-desktop", this.isDesktop);
    },

    onChange: function (cb) {
      _listeners.push(cb);
    },

    _notify: function () {
      _listeners.forEach(function (cb) { try { cb(); } catch (e) {} });
    }
  };

  function handleResize() {
    var prevMobile  = DeviceType.isMobile;
    var prevTablet  = DeviceType.isTablet;
    var prevDesktop = DeviceType.isDesktop;

    DeviceType.update();

    // Só dispara callbacks se o TIPO mudou (não a cada pixel)
    if (
      prevMobile  !== DeviceType.isMobile  ||
      prevTablet  !== DeviceType.isTablet  ||
      prevDesktop !== DeviceType.isDesktop
    ) {
      DeviceType._notify();
    }
  }

  DeviceType.update();
  window.addEventListener("resize", handleResize, { passive: true });

  window.DeviceType = DeviceType;
})();
