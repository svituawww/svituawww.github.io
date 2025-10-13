// External fallback to ensure header is rendered even if other scripts race
(function () {
  function buildMinimalHeader(lang, urlname) {
    lang = lang || 'uk';
    urlname = urlname || 'index.html';
    var logoSrc = '/uploads1/2025/06/logo.png';
    var items = [
      { href: '/index.html', text: { uk: 'Головна', sv: 'Huvud', en: 'Main' } },
      { href: '/gallery.html', text: { uk: 'Галерея / Події', sv: 'Galleri / Evenemang', en: 'Gallery / Events' } },
      { href: '/team.html', text: { uk: 'Команда', sv: 'Team', en: 'Team' } },
      { href: '#contact', text: { uk: 'Контакти', sv: 'Kontakta', en: 'Contact' } }
    ];
    function t(txt) { return (txt && txt[lang]) || (txt && txt.uk) || ''; }
    var desktopLinks = items.map(function(it){ return '<li><a href="' + it.href + '">' + t(it.text) + '</a></li>'; }).join('');
    var mobileLinks = items.map(function(it){ return '<li><a href="' + it.href + '" onclick="closeMobileMenu()">' + t(it.text) + '</a></li>'; }).join('');
    var langs = [
      { code: 'uk', emoji: '🇺🇦', title: 'Українська', d_uuid: 'ctsnhy4kmn' },
      { code: 'sv', emoji: '🇸🇪', title: 'Svenska',     d_uuid: '2rus946jnh' },
      { code: 'en', emoji: '🇬🇧', title: 'English',     d_uuid: 'w572t7uwil' }
    ];
    var langBtns = langs.map(function(l){
      var href = '/' + l.code + '/' + urlname;
      var cls = 'lang-btn' + (l.code === lang ? ' active' : '');
      return '<a href="' + href + '" class="' + cls + '" title="' + l.title + '" d_uuid="' + l.d_uuid + '">' + l.emoji + '</a>';
    }).join('');
    return (
      '<header>' +
        '<nav class="container">' +
          '<div class="logo">' +
            '<img src="' + logoSrc + '" alt="SVIT UA Logo">' +
            '<h1 d_uuid="fowcy61amc">SVIT UA</h1>' +
          '</div>' +
          '<ul class="nav-links">' + desktopLinks + '</ul>' +
          '<button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Menu" d_uuid="13aasmz1ay">☰</button>' +
          '<div style="display:flex; align-items:center; gap:20px;">' +
            '<div class="language-switch">' + langBtns + '</div>' +
          '</div>' +
        '</nav>' +
        '<div class="mobile-menu-overlay" onclick="closeMobileMenu()"></div>' +
        '<nav class="mobile-menu">' +
          '<button class="mobile-menu-close" onclick="closeMobileMenu()" aria-label="Close Menu" d_uuid="1owbqn1ofi">✕</button>' +
          '<ul class="mobile-nav-links">' + mobileLinks + '</ul>' +
          '<div class="mobile-language-section">' +
            '<h4 d_uuid="353m501nni">Мова / Language</h4>' +
            '<div class="mobile-language-switch">' + langBtns + '</div>' +
          '</div>' +
        '</nav>' +
      '</header>'
    );
  }

  function tryRenderHeader() {
    var root = document.getElementById('header-root');
    if (!root) return;

    var lang = (window.GL_Settings && GL_Settings.language) || 'uk';
    var urlname = (window.GL_Settings && GL_Settings.urlname) || 'index.html';

    if (!root.firstElementChild) {
      if (typeof window.renderHeaderIntoRoot === 'function') {
        try { window.renderHeaderIntoRoot(); } catch (e) { console.error('renderHeaderIntoRoot failed:', e); }
        try { if (typeof window.updateMenuVisibility === 'function') window.updateMenuVisibility(); } catch (e) { console.warn('updateMenuVisibility failed:', e); }
        try { if (typeof window.renderLanguageSwitch === 'function') window.renderLanguageSwitch(); } catch (e) { console.warn('renderLanguageSwitch failed:', e); }
      } else {
        // Hard fallback: render a minimal header now
        root.innerHTML = buildMinimalHeader(lang, urlname);
      }
    } else {
      // If header exists but menus are empty, try updating
      try { if (typeof window.updateMenuVisibility === 'function') window.updateMenuVisibility(); } catch (e) {}
      try { if (typeof window.renderLanguageSwitch === 'function') window.renderLanguageSwitch(); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryRenderHeader, { once: true });
  } else {
    tryRenderHeader();
  }
  // Also try shortly after to cover late-defined functions
  setTimeout(tryRenderHeader, 0);
})();
