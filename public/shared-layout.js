(function () {
  var SUPPORTED_LANGS = ['en-GB', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'hi', 'ms'];

  function cleanGoogtransHash() {
    if (window.location.hash && window.location.hash.indexOf('googtrans') !== -1) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {}
    }
  }

  cleanGoogtransHash();
  window.addEventListener('hashchange', cleanGoogtransHash);
  var _hashTimer = setInterval(cleanGoogtransHash, 400);
  setTimeout(function () {
    clearInterval(_hashTimer);
  }, 10000);

  function ensureGoogleTranslateContainer() {
    if (!document.getElementById('google_translate_element') && document.body) {
      var div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.cssText = 'display: none !important;';
      document.body.appendChild(div);
    }
  }

  var _gtLoaded = false;
  function loadGoogleTranslateScript() {
    ensureGoogleTranslateContainer();
    if (_gtLoaded) return;
    _gtLoaded = true;
    var gt = document.createElement('script');
    gt.type = 'text/javascript';
    gt.async = true;
    gt.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(gt);
  }

  window.googleTranslateElementInit = function () {
    ensureGoogleTranslateContainer();
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,es,ja,fr,de,pt,ko,it,hi,ms',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    }
  };

  function getCleanBasePath() {
    var pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    if (pathSegments.length > 0 && SUPPORTED_LANGS.indexOf(pathSegments[pathSegments.length - 1]) !== -1) {
      pathSegments.pop();
    }
    return '/' + (pathSegments.length > 0 ? pathSegments.join('/') + '/' : '');
  }

  function getLanguageFromPath() {
    var pathSegments = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    var last = pathSegments[pathSegments.length - 1];
    if (last && SUPPORTED_LANGS.indexOf(last) !== -1) {
      return last;
    }
    return null;
  }

  window.toggleLangDropdown = function () {
    loadGoogleTranslateScript();
    var menu = document.getElementById('langDropdownMenu');
    if (menu) {
      menu.classList.toggle('show');
    }
  };

  window.changeLanguage = function (langCode) {
    var domain = window.location.hostname;
    var transCode = langCode === 'en-GB' || langCode === 'en' ? 'en' : langCode;

    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
    if (domain) {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domain + '; SameSite=None; Secure';
      var parts = domain.split('.');
      if (parts.length >= 2) {
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + parts.slice(-2).join('.') + '; SameSite=None; Secure';
      }
    }

    if (langCode && langCode !== 'en-GB') {
      document.cookie = 'googtrans=/en/' + transCode + '; path=/; SameSite=None; Secure';
      if (domain) {
        document.cookie = 'googtrans=/en/' + transCode + '; path=/; domain=' + domain + '; SameSite=None; Secure';
        var domainParts = domain.split('.');
        if (domainParts.length >= 2) {
          document.cookie = 'googtrans=/en/' + transCode + '; path=/; domain=.' + domainParts.slice(-2).join('.') + '; SameSite=None; Secure';
        }
      }
    }

    var basePath = getCleanBasePath();
    var targetPath = '';
    if (langCode === 'en-GB' || langCode === 'x-default') {
      targetPath = basePath;
    } else {
      targetPath = basePath === '/' ? '/' + langCode : basePath + langCode;
    }

    var url = new URL(window.location.href);
    url.pathname = targetPath;
    url.searchParams.delete('lang');
    url.hash = '';
    window.location.href = url.toString();
  };

  window.addEventListener('click', function (e) {
    var container = document.querySelector('.lang-dropdown-container');
    var menu = document.getElementById('langDropdownMenu');
    if (container && !container.contains(e.target) && menu) {
      menu.classList.remove('show');
    }
  });

  // Legacy ?lang= redirect & active language Google Translate cookie sync
  (function initLanguageRouting() {
    var urlParams = new URLSearchParams(window.location.search);
    var queryLang = urlParams.get('lang');
    if (queryLang) {
      urlParams.delete('lang');
      var cleanSearch = urlParams.toString();
      var cleanQuery = cleanSearch ? '?' + cleanSearch : '';
      var supported = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'hi', 'ms'];
      var basePath = window.location.pathname.replace(/\/+$/, '');
      var targetPath = '/';
      if (supported.indexOf(queryLang) !== -1) {
        targetPath = basePath ? basePath + '/' + queryLang : '/' + queryLang;
      } else {
        targetPath = basePath || '/';
      }
      window.location.replace(targetPath + cleanQuery + window.location.hash);
      return;
    }

    var activeLang = getLanguageFromPath();
    if (activeLang && activeLang !== 'en-GB') {
      var transCode = activeLang === 'en' ? 'en' : activeLang;
      document.cookie = 'googtrans=/en/' + transCode + '; path=/; SameSite=None; Secure';
      var domain = window.location.hostname;
      if (domain) {
        document.cookie = 'googtrans=/en/' + transCode + '; path=/; domain=' + domain + '; SameSite=None; Secure';
        var parts = domain.split('.');
        if (parts.length >= 2) {
          document.cookie = 'googtrans=/en/' + transCode + '; path=/; domain=.' + parts.slice(-2).join('.') + '; SameSite=None; Secure';
        }
      }
      cleanGoogtransHash();
      loadGoogleTranslateScript();
    } else {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  })();

  var SUN_PATH = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
  var MOON_PATH = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';

  function applyThemeState(isDark) {
    var html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      html.classList.add('dark');
    } else {
      html.removeAttribute('data-theme');
      html.classList.remove('dark');
    }
    var iconHeader = document.getElementById('themeToggleIconHeader');
    if (iconHeader) {
      iconHeader.innerHTML = isDark ? SUN_PATH : MOON_PATH;
    }
  }

  function syncThemeFromStorage() {
    var saved = localStorage.getItem('timetable_theme') || localStorage.getItem('tt_theme') || '';
    var isDark = saved === 'dark' || document.documentElement.getAttribute('data-theme') === 'dark';
    applyThemeState(isDark);
  }

  window.toggleLocalTheme = function () {
    if (window.app && window.app.handlers && typeof window.app.handlers.toggleDark === 'function') {
      window.app.handlers.toggleDark();
      setTimeout(syncThemeFromStorage, 0);
      return;
    }
    var isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var nextDark = !isCurrentlyDark;
    localStorage.setItem('timetable_theme', nextDark ? 'dark' : 'light');
    localStorage.setItem('tt_theme', nextDark ? 'dark' : 'light');
    applyThemeState(nextDark);
  };

  window.toggleTheme = window.toggleLocalTheme;

  window.toggleMobileMenuLocal = function () {
    if (window.app && window.app.handlers && typeof window.app.handlers.toggleMobileMenu === 'function') {
      window.app.handlers.toggleMobileMenu();
      return;
    }
    var drawer = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileMenuLocal');
    if (drawer) {
      drawer.classList.toggle('hidden');
    }
  };

  function markActiveNavLinks(rootEl) {
    if (!rootEl) return;
    var cleanPath = getCleanBasePath().replace(/\/+$/, '') || '/';
    var links = rootEl.querySelectorAll('.nav-link-header, .mobile-nav-link');
    links.forEach(function (link) {
      var target = link.getAttribute('data-nav-path') || link.getAttribute('href') || '';
      var cleanTarget = target.replace(/\/+$/, '') || '/';
      if (cleanPath === cleanTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Start fetching header.html and footer.html immediately in parallel
  var headerFetchPromise = fetch('/header.html').then(function (res) {
    if (!res.ok) throw new Error('Failed to load header.html');
    return res.text();
  });

  var footerFetchPromise = fetch('/footer.html').then(function (res) {
    if (!res.ok) throw new Error('Failed to load footer.html');
    return res.text();
  });

  function mountSharedHeaderAndFooter() {
    ensureGoogleTranslateContainer();
    syncThemeFromStorage();

    var headerHost = document.getElementById('site-header');
    if (headerHost) {
      headerFetchPromise
        .then(function (html) {
          headerHost.innerHTML = html;
          markActiveNavLinks(headerHost);
          syncThemeFromStorage();
        })
        .catch(function (err) {
          console.error('Header load error:', err);
        });
    }

    var footerHost = document.getElementById('site-footer');
    if (footerHost) {
      footerFetchPromise
        .then(function (html) {
          footerHost.innerHTML = html;
        })
        .catch(function (err) {
          console.error('Footer load error:', err);
        });
    }
  }

  syncThemeFromStorage();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountSharedHeaderAndFooter);
  } else {
    mountSharedHeaderAndFooter();
  }
})();
