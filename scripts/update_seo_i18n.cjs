const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGS = [
  { code: 'en-GB', label: 'English (UK)', isDefault: true },
  { code: 'es', label: 'Español' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'ko', label: '한국어' },
  { code: 'it', label: 'Italiano' },
  { code: 'hi', label: 'हिन्दी (Hindi)' }
];

function generateHreflangs(baseCanonicalUrl) {
  const urlPrefix = baseCanonicalUrl.replace(/\/+$/, '');
  const tags = [
    `    <link rel="canonical" href="${baseCanonicalUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${baseCanonicalUrl}" />`,
    `    <link rel="alternate" hreflang="en-GB" href="${urlPrefix}/en-GB" />`,
    `    <link rel="alternate" hreflang="es" href="${urlPrefix}/es" />`,
    `    <link rel="alternate" hreflang="ja" href="${urlPrefix}/ja" />`,
    `    <link rel="alternate" hreflang="fr" href="${urlPrefix}/fr" />`,
    `    <link rel="alternate" hreflang="de" href="${urlPrefix}/de" />`,
    `    <link rel="alternate" hreflang="pt" href="${urlPrefix}/pt" />`,
    `    <link rel="alternate" hreflang="ko" href="${urlPrefix}/ko" />`,
    `    <link rel="alternate" hreflang="it" href="${urlPrefix}/it" />`,
    `    <link rel="alternate" hreflang="hi" href="${urlPrefix}/hi" />`
  ];
  return tags.join('\n');
}

// 1. Universal Footer for all pages
const coreAppFooter = `
<footer class="seo-footer">
  <div class="footer-container">
    <div class="footer-grid">
      
      <!-- Column 1: Brand & Description -->
      <div class="footer-col" style="max-width: 320px;">
        <div class="app-brand-wrapper" style="margin-bottom: 12px;">
          <img src="/logo.png" alt="Timetable Creator Logo" class="app-brand-logo" width="28" height="28" style="object-fit: contain; border-radius: 6px;">
          <div class="header-brand-line">
            <span class="app-brand-name" style="font-size: 15px;">TIMETABLE</span>
            <span class="app-tools-tag">CREATOR</span>
          </div>
        </div>
        <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin: 0 0 12px 0;">
          Online Timetable Creator is a high-performance web scheduling application built to organize classes, routines, and exams with ease.
        </p>
      </div>

      <!-- Column 2: All Timetable Generators -->
      <div class="footer-col">
        <h4 class="footer-title">All Timetable Generators</h4>
        <a href="/" class="footer-link">Free Online Timetable Maker</a>
        <a href="/timetable-generator-online-for-students/" class="footer-link">Student Timetable Generator</a>
      </div>

      <!-- Column 3: Resources -->
      <div class="footer-col">
        <h4 class="footer-title">Resources</h4>
        <a href="/sitemap.html" class="footer-link">Sitemap</a>
        <a href="/blog/about-us/" class="footer-link">About Us</a>
        <a href="/blog/contact-us/" class="footer-link">Contact Support</a>
        <a href="/how-to-use/" class="footer-link">How to Use</a>
        <a href="/faqs/" class="footer-link">Frequently Asked Questions</a>
      </div>

      <!-- Column 4: Legal & Policies -->
      <div class="footer-col">
        <h4 class="footer-title">Legal & Privacy</h4>
        <a href="/blog/privacy-policy/" class="footer-link">Privacy Policy</a>
        <a href="/blog/terms-and-conditions/" class="footer-link">Terms of Service</a>
        <a href="/blog/refund-policy/" class="footer-link">Refund Policy</a>
        <a href="/blog/disclaimer/" class="footer-link">Disclaimer</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        &copy; 2026 Timetable Creator. All rights reserved.
      </div>
      <div class="footer-bottom-right"></div>
    </div>
  </div>
</footer>`;

// 2. Clean Translation & Language Switching Script (NO #googtrans hash!)
const cleanTranslationScript = `
      // Clean up any #googtrans hash if inserted by Google Translate or legacy URLs
      function cleanGoogtransHash() {
        if (window.location.hash && window.location.hash.indexOf('googtrans') !== -1) {
          try {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch(e) {}
        }
      }
      cleanGoogtransHash();
      window.addEventListener('hashchange', cleanGoogtransHash);
      var _hashCleanTimer = setInterval(cleanGoogtransHash, 400);
      setTimeout(function() { clearInterval(_hashCleanTimer); }, 10000);

      var _gtLoaded = false;
      function loadGoogleTranslateScript() {
        if (_gtLoaded) return;
        _gtLoaded = true;
        var gt = document.createElement('script');
        gt.type = 'text/javascript';
        gt.async = true;
        gt.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(gt);
      }

      function googleTranslateElementInit() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,es,ja,fr,de,pt,ko,it,hi',
          autoDisplay: false
        }, 'google_translate_element');
      }

      var supportedLangs = ['en-GB', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'hi'];

      function getCleanBasePath() {
        var pathSegments = window.location.pathname.replace(/\\/+$/, '').split('/').filter(Boolean);
        if (pathSegments.length > 0 && supportedLangs.includes(pathSegments[pathSegments.length - 1])) {
          pathSegments.pop();
        }
        return '/' + (pathSegments.length > 0 ? pathSegments.join('/') + '/' : '');
      }

      function getLanguageFromPath() {
        var pathSegments = window.location.pathname.replace(/\\/+$/, '').split('/').filter(Boolean);
        var last = pathSegments[pathSegments.length - 1];
        if (last && supportedLangs.includes(last)) {
          return last;
        }
        return null;
      }

      function toggleLangDropdown() {
        loadGoogleTranslateScript();
        var menu = document.getElementById('langDropdownMenu');
        if (menu) {
          menu.classList.toggle('show');
        }
      }

      function changeLanguage(langCode) {
        var domain = window.location.hostname;
        var transCode = langCode === 'en-GB' || langCode === 'en' ? 'en' : langCode;
        
        // Clear existing cookies
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure";
        if (domain) {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain + "; SameSite=None; Secure";
          var parts = domain.split('.');
          if (parts.length >= 2) {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + parts.slice(-2).join('.') + "; SameSite=None; Secure";
          }
        }

        if (langCode && langCode !== 'en-GB') {
          document.cookie = "googtrans=/en/" + transCode + "; path=/; SameSite=None; Secure";
          if (domain) {
            document.cookie = "googtrans=/en/" + transCode + "; path=/; domain=" + domain + "; SameSite=None; Secure";
            var parts = domain.split('.');
            if (parts.length >= 2) {
              document.cookie = "googtrans=/en/" + transCode + "; path=/; domain=." + parts.slice(-2).join('.') + "; SameSite=None; Secure";
            }
          }
        }
        
        var basePath = getCleanBasePath();
        var targetPath = '';
        if (langCode === 'en-GB' || langCode === 'x-default') {
          targetPath = basePath === '/' ? '/en-GB' : basePath + 'en-GB';
        } else {
          targetPath = basePath === '/' ? '/' + langCode : basePath + langCode;
        }

        var url = new URL(window.location.href);
        url.pathname = targetPath;
        url.searchParams.delete('lang');
        url.hash = ''; // Clean URL - NEVER use #googtrans!
        window.location.href = url.toString();
      }

      // Close language dropdown if clicking outside
      window.addEventListener('click', function(e) {
        var container = document.querySelector('.lang-dropdown-container');
        var menu = document.getElementById('langDropdownMenu');
        if (container && !container.contains(e.target) && menu) {
          menu.classList.remove('show');
        }
      });

      // Client-side immediate redirect for old ?lang= URLs to clean path
      (function() {
        var urlParams = new URLSearchParams(window.location.search);
        var queryLang = urlParams.get('lang');
        if (queryLang) {
          urlParams.delete('lang');
          var cleanSearch = urlParams.toString();
          var cleanQuery = cleanSearch ? '?' + cleanSearch : '';
          var supported = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'hi'];
          var basePath = window.location.pathname.replace(/\/+$/, '');
          var targetPath = '/';
          if (supported.includes(queryLang)) {
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
          document.cookie = "googtrans=/en/" + transCode + "; path=/; SameSite=None; Secure";
          var domain = window.location.hostname;
          if (domain) {
            document.cookie = "googtrans=/en/" + transCode + "; path=/; domain=" + domain + "; SameSite=None; Secure";
            var parts = domain.split('.');
            if (parts.length >= 2) {
              document.cookie = "googtrans=/en/" + transCode + "; path=/; domain=." + parts.slice(-2).join('.') + "; SameSite=None; Secure";
            }
          }
          cleanGoogtransHash();
          loadGoogleTranslateScript();
        } else {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      })();

      function toggleLocalTheme() {
        if (window.app && window.app.handlers && window.app.handlers.toggleDark) {
          window.app.handlers.toggleDark();
          return;
        }
        var html = document.documentElement;
        var currentTheme = html.getAttribute('data-theme');
        var iconHeader = document.getElementById('themeToggleIconHeader');
        var sunPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
        var moonPath = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        if (currentTheme === 'dark') {
          html.removeAttribute('data-theme');
          localStorage.setItem('timetable_theme', 'light');
          if (iconHeader) iconHeader.innerHTML = moonPath;
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('timetable_theme', 'dark');
          if (iconHeader) iconHeader.innerHTML = sunPath;
        }
      }

      function toggleMobileMenuLocal() {
        if (window.app && window.app.handlers && window.app.handlers.toggleMobileMenu) {
          window.app.handlers.toggleMobileMenu();
          return;
        }
        var drawer = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileMenuLocal');
        if (drawer) {
          drawer.classList.toggle('hidden');
        }
      }
`;

const faviconTags = `
    <!-- Favicon and App Icons -->
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">`;

function ensureFaviconTags(content) {
  content = content.replace(/<!-- Favicon and App Icons -->[\s\S]*?(?:<link rel="manifest"[^>]*>|<link rel="apple-touch-icon"[^>]*>)/gi, '');
  content = content.replace(/<link rel="(?:shortcut icon|icon|apple-touch-icon|manifest)"[^>]*>\s*/gi, '');
  if (content.includes('</head>')) {
    return content.replace('</head>', `${faviconTags}\n  </head>`);
  }
  return content;
}

// 3. Universal Global Header Generator (Matches homepage menu links, theme toggle, translate dropdown, NO login/signup)
function generateHeaderHtml(activePage = '') {
  return `<!-- PREMIUM GLOBAL NAVIGATION HEADER -->
    <header class="global-header">
      <div class="header-container">
        <!-- Left Section: Logo & Brand -->
        <div class="header-left-desktop">
          <a href="/" class="header-brand" aria-label="Timetable Creator">
            <div class="app-brand-wrapper">
              <img src="/logo.png" alt="Timetable Creator Logo" class="app-brand-logo" width="32" height="32" style="object-fit: contain; border-radius: 8px;">
              <div class="header-title-group">
                <div class="header-brand-line">
                  <span class="app-brand-name">TIMETABLE</span>
                  <span class="app-tools-tag">CREATOR</span>
                </div>
                <p class="header-subtitle">Online Schedule Generator</p>
              </div>
            </div>
          </a>
        </div>

        <!-- Center Section: Translate Selector & Menu Links (Desktop Center Aligned) -->
        <div class="header-center-desktop">
          <!-- Light/Dark Mode Toggle in Header -->
          <button class="action-btn-header" onclick="toggleLocalTheme()" data-tooltip="Toggle theme mode" title="Toggle theme mode" aria-label="Toggle Theme">
            <svg id="themeToggleIconHeader" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
          <!-- Google Translate Dropdown Selector -->
          <div class="lang-dropdown-container">
            <button class="action-btn-header" onclick="toggleLangDropdown()" id="btnLangDropdown" data-tooltip="Change Language" aria-label="Change Language" title="Change Language">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="width: 18px; height: 18px;"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 0c-.818-2.251-2.253-4.247-4-5.5C6.754 4.753 5.32 6.749 4.5 9h8m-8 0a13.935 13.935 0 002.912 4.5M6.412 9a13.935 13.935 0 002.912 4.5M11 21l3-6 3 6m-5-2h4"></path></svg>
            </button>
            <div class="lang-dropdown-menu" id="langDropdownMenu" style="top: 44px; left: 50%; transform: translateX(-50%);">
              <button class="lang-dropdown-item" onclick="changeLanguage('en-GB')">English (UK)</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('es')">Español</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('ja')">日本語</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('fr')">Français</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('de')">Deutsch</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('pt')">Português</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('ko')">한국어</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('it')">Italiano</button>
              <button class="lang-dropdown-item" onclick="changeLanguage('hi')">हिन्दी (Hindi)</button>
            </div>
          </div>

          <!-- Nav links (Desktop) -->
          <nav class="header-nav-desktop">
            <a href="/" class="nav-link-header ${activePage === 'workspace' ? 'active' : ''}">Workspace</a>
            <a href="/timetable-generator-online-for-students/" class="nav-link-header ${activePage === 'students' ? 'active' : ''}">Free Students Timetable Maker</a>
            <a href="/sitemap.html" class="nav-link-header ${activePage === 'sitemap' ? 'active' : ''}">Sitemap</a>
          </nav>
        </div>

        <!-- Mobile Navigation Toggle Button -->
        <button class="header-mobile-toggle" onclick="toggleMobileMenuLocal()" aria-label="Toggle menu">
          <svg id="mobileMenuIcon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="24" height="24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Drawer Menu (Slide Down) -->
      <div id="mobileMenuDrawer" class="mobile-menu-drawer hidden">
        <nav class="mobile-nav-links">
          <a href="/" class="mobile-nav-link ${activePage === 'workspace' ? 'active' : ''}" onclick="toggleMobileMenuLocal()">Workspace</a>
          <a href="/timetable-generator-online-for-students/" class="mobile-nav-link ${activePage === 'students' ? 'active' : ''}" onclick="toggleMobileMenuLocal()">Free Students Timetable Maker</a>
          <a href="/sitemap.html" class="mobile-nav-link ${activePage === 'sitemap' ? 'active' : ''}" onclick="toggleMobileMenuLocal()">Sitemap</a>
        </nav>
      </div>
    </header>`;
}

// 4. Universal CSS block for Global Header & 100vw Responsive layout
const universalHeaderAndResponsiveCss = `
    <!-- UNIVERSAL GLOBAL HEADER & 100VW RESPONSIVE STYLES -->
    <style id="universal-header-responsive-css">
      html, body {
        max-width: 100vw !important;
        overflow-x: hidden !important;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      img, svg, video, iframe {
        max-width: 100%;
        height: auto;
      }
      .global-header {
        height: 64px;
        background-color: #ffffff;
        border-bottom: 1px solid #ebe8fa;
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        top: 0;
        z-index: 998;
        transition: background-color 0.2s, border-color 0.2s;
        width: 100%;
        max-width: 100vw;
      }
      [data-theme="dark"] .global-header {
        background-color: #0e0d1e !important;
        border-bottom-color: #2f2b54 !important;
      }
      .header-container {
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        position: relative;
        gap: 16px;
      }
      .header-left-desktop {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .header-brand {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        cursor: pointer;
      }
      .app-brand-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .app-brand-logo {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border-radius: 8px;
        object-fit: contain;
        transition: transform 0.2s ease;
      }
      .header-brand:hover .app-brand-logo {
        transform: scale(1.05);
      }
      .header-title-group {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }
      .header-brand-line {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .app-brand-name {
        font-family: 'Poppins', sans-serif !important;
        font-size: 16px !important;
        font-weight: 800 !important;
        color: #1d1e2c !important;
        letter-spacing: -0.01em !important;
        line-height: 1.1;
      }
      [data-theme="dark"] .app-brand-name {
        color: #f5f4fc !important;
      }
      .app-tools-tag {
        background: rgba(103, 61, 230, 0.1);
        color: #673de6;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.05em;
        padding: 1px 6px;
        border-radius: 4px;
        border: 1px solid rgba(103, 61, 230, 0.25);
        text-transform: uppercase;
      }
      [data-theme="dark"] .app-tools-tag {
        background: rgba(140, 104, 252, 0.15);
        color: #a78bfa;
        border-color: rgba(140, 104, 252, 0.3);
      }
      .header-subtitle {
        font-size: 11px !important;
        color: #6e6d7a !important;
        margin: 0 !important;
        font-weight: 500 !important;
      }
      [data-theme="dark"] .header-subtitle {
        color: #a3a0c2 !important;
      }
      .header-center-desktop {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .header-nav-desktop {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: 0;
      }
      .nav-link-header {
        font-size: 13.5px;
        font-weight: 500;
        color: #6e6d7a;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 8px;
        transition: all 0.2s ease;
        white-space: nowrap;
      }
      [data-theme="dark"] .nav-link-header {
        color: #a3a0c2 !important;
      }
      .nav-link-header:hover, .nav-link-header.active {
        color: #673de6 !important;
        background-color: rgba(103, 61, 230, 0.08) !important;
        font-weight: 600;
      }
      [data-theme="dark"] .nav-link-header:hover, [data-theme="dark"] .nav-link-header.active {
        color: #a78bfa !important;
        background-color: rgba(140, 104, 252, 0.15) !important;
      }
      .action-btn-header {
        background: none;
        border: none;
        border-radius: 10px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1d1e2c;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      [data-theme="dark"] .action-btn-header {
        color: #f5f4fc;
      }
      .action-btn-header:hover {
        background-color: #f5f3ff;
        color: #673de6;
      }
      [data-theme="dark"] .action-btn-header:hover {
        background-color: #232140;
        color: #a78bfa;
      }
      .lang-dropdown-container {
        position: relative;
        display: inline-block;
      }
      .lang-dropdown-menu {
        display: none;
        position: absolute;
        top: 44px;
        left: 50%;
        transform: translateX(-50%);
        background: #ffffff;
        border: 1px solid #ebe8fa;
        border-radius: 10px;
        box-shadow: 0 10px 25px -5px rgba(103, 61, 230, 0.12), 0 4px 8px -4px rgba(29, 30, 44, 0.04);
        min-width: 140px;
        z-index: 1100;
        overflow: hidden;
        padding: 4px;
      }
      [data-theme="dark"] .lang-dropdown-menu {
        background: #19172f !important;
        border-color: #2f2b54 !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5) !important;
      }
      .lang-dropdown-menu.show {
        display: block;
      }
      .lang-dropdown-item {
        display: block;
        width: 100%;
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 500;
        color: #1d1e2c;
        border-radius: 8px;
        background: transparent;
        border: none !important;
        cursor: pointer;
        text-align: left;
        transition: all 0.15s ease;
      }
      [data-theme="dark"] .lang-dropdown-item {
        color: #f5f4fc;
      }
      .lang-dropdown-item:hover {
        background: #f4f0fd;
        color: #673de6;
      }
      [data-theme="dark"] .lang-dropdown-item:hover {
        background: #232140 !important;
        color: #a78bfa !important;
      }
      .header-mobile-toggle {
        display: none;
        background: none;
        border: none;
        border-radius: 10px;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        color: #1d1e2c;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      [data-theme="dark"] .header-mobile-toggle {
        color: #f5f4fc;
      }
      .header-mobile-toggle:hover {
        background-color: #f5f3ff;
        color: #673de6;
      }
      [data-theme="dark"] .header-mobile-toggle:hover {
        background-color: #232140;
        color: #a78bfa;
      }
      .mobile-menu-drawer {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        background-color: #ffffff;
        border-bottom: 1px solid #ebe8fa;
        box-shadow: 0 12px 24px -4px rgba(103, 61, 230, 0.12);
        padding: 16px 20px;
        z-index: 997;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 0 0 16px 16px;
      }
      [data-theme="dark"] .mobile-menu-drawer {
        background-color: #19172f !important;
        border-bottom-color: #2f2b54 !important;
        box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.6) !important;
      }
      .mobile-menu-drawer.hidden {
        display: none;
      }
      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .mobile-nav-link {
        font-size: 14px;
        font-weight: 500;
        color: #6e6d7a;
        text-decoration: none;
        padding: 10px 14px;
        border-radius: 10px;
        transition: all 0.2s ease;
      }
      [data-theme="dark"] .mobile-nav-link {
        color: #a3a0c2 !important;
      }
      .mobile-nav-link:hover, .mobile-nav-link.active {
        color: #673de6 !important;
        background-color: rgba(103, 61, 230, 0.08) !important;
        font-weight: 600;
      }
      [data-theme="dark"] .mobile-nav-link:hover, [data-theme="dark"] .mobile-nav-link.active {
        color: #a78bfa !important;
        background-color: rgba(140, 104, 252, 0.15) !important;
      }
      @media (max-width: 1024px) {
        .header-center-desktop {
          position: static;
          transform: none;
          justify-content: flex-end;
          margin-right: 6px;
        }
        .header-nav-desktop {
          display: none !important;
        }
        .header-mobile-toggle {
          display: flex !important;
        }
      }
      /* Responsive Article Tables (Max-width 100vw Safe) */
      .article-table-wrap {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch;
        margin: 1.25rem 0 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 1rem !important;
        display: block !important;
      }
      [data-theme="dark"] .article-table-wrap {
        border-color: #2f2b54 !important;
      }
      .article-table-wrap table {
        min-width: 540px !important;
        width: 100% !important;
        border-collapse: collapse !important;
      }
      /* Responsive typography & elements */
      article, main {
        overflow-wrap: break-word;
      }
      p, li {
        overflow-wrap: break-word;
      }
      pre, code {
        max-width: 100% !important;
        white-space: pre-wrap !important;
        word-break: break-word !important;
      }
      /* --- UNIVERSAL FOOTER STYLES --- */
      .seo-footer {
        width: 100%;
        max-width: 100vw;
        padding: 48px 24px 32px 24px;
        margin-top: auto;
        border-top: 1px solid #ebe8fa;
        background-color: #ffffff;
        text-align: left;
        transition: background-color 0.2s, border-color 0.2s;
        box-sizing: border-box;
      }
      [data-theme="dark"] .seo-footer {
        background-color: #0e0d1e !important;
        border-top-color: #2f2b54 !important;
      }
      .footer-container {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 32px;
        padding-bottom: 32px;
        border-bottom: 1px solid #ebe8fa;
      }
      [data-theme="dark"] .footer-grid {
        border-bottom-color: #2f2b54 !important;
      }
      @media (min-width: 640px) {
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
      }
      @media (min-width: 1024px) {
        .footer-grid {
          grid-template-columns: 1.4fr 1.2fr 1.1fr 1.1fr;
          gap: 32px;
        }
      }
      .footer-col {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .footer-title {
        font-family: 'Poppins', sans-serif !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        color: #1d1e2c !important;
        margin: 0 0 4px 0 !important;
      }
      [data-theme="dark"] .footer-title {
        color: #f1f0fb !important;
      }
      .footer-link {
        font-size: 13px !important;
        color: #6e6d7a !important;
        text-decoration: none !important;
        transition: color 0.2s ease, transform 0.15s ease;
        line-height: 1.5;
        display: inline-block;
      }
      [data-theme="dark"] .footer-link {
        color: #a3a0c2 !important;
      }
      .footer-link:hover {
        color: #673de6 !important;
        transform: translateX(2px);
      }
      [data-theme="dark"] .footer-link:hover {
        color: #a78bfa !important;
      }
      .footer-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 24px;
        gap: 12px;
        font-size: 12px;
        color: #6e6d7a;
      }
      [data-theme="dark"] .footer-bottom {
        color: #a3a0c2 !important;
      }
      @media (min-width: 640px) {
        .footer-bottom {
          flex-direction: row;
        }
      }
      .footer-bottom-left {
        font-size: 12px;
      }
      /* Form inputs & search in dark mode */
      [data-theme="dark"] input, [data-theme="dark"] textarea {
        background-color: #19172f !important;
        color: #f1f0fb !important;
        border-color: #2f2b54 !important;
      }
      [data-theme="dark"] input::placeholder {
        color: #64748b !important;
      }
      [data-theme="dark"] .category-pill.active {
        background-color: #7c3aed !important;
        color: #ffffff !important;
      }
      [data-theme="dark"] .category-pill:not(.active) {
        background-color: #121026 !important;
        color: #cbd5e1 !important;
        border-color: #2f2b54 !important;
      }
    </style>
`;

function ensureHeaderAndResponsiveStyles(content) {
  if (content.includes('id="universal-header-responsive-css"')) {
    return content.replace(/<style id="universal-header-responsive-css">[\s\S]*?<\/style>/, universalHeaderAndResponsiveCss.trim());
  }
  if (content.includes('</head>')) {
    return content.replace('</head>', `${universalHeaderAndResponsiveCss.trim()}\n  </head>`);
  }
  return content;
}

function replaceHeaderInHtml(content, activePage) {
  const newHeader = generateHeaderHtml(activePage);
  if (/<!--\s*PREMIUM GLOBAL NAVIGATION HEADER\s*-->\s*<header\b[\s\S]*?<\/header>/i.test(content)) {
    return content.replace(/<!--\s*PREMIUM GLOBAL NAVIGATION HEADER\s*-->\s*<header\b[\s\S]*?<\/header>/i, newHeader);
  }
  if (/<header\b[\s\S]*?<\/header>/i.test(content)) {
    return content.replace(/<header\b[\s\S]*?<\/header>/i, newHeader);
  }
  return content;
}

const PAGE_META = {
  'public/sitemap.html': {
    title: 'HTML Sitemap - Complete Site Index | Online Timetable Creator',
    description: 'Complete index of all schedule makers, student timetable planners, guides, tools, and translations available on Timetable Creator Online.',
    activePage: 'sitemap',
    isNoindex: false
  },
  'public/html-sitemap/index.html': {
    title: 'HTML Sitemap - Complete Site Index | Online Timetable Creator',
    description: 'Explore all pages, timetable generators, student study planners, blogs, guides, and international language editions on Timetable Creator Online.',
    activePage: 'sitemap',
    isNoindex: true
  },
  'public/how-to-use/index.html': {
    title: 'How to Use Online Timetable Creator - Step-by-Step Guide',
    description: 'Learn how to use Online Timetable Creator to build weekly schedules, study routines, and class planners with ease. Free step-by-step tutorial.',
    activePage: '',
    isNoindex: true
  },
  'public/faqs/index.html': {
    title: 'Frequently Asked Questions (FAQs) - Online Timetable Creator',
    description: 'Find answers to common questions about creating timetables, PDF exports, privacy, and timetable customization on Online Timetable Creator.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/index.html': {
    title: 'Blog & Timetable Guides - Online Timetable Creator',
    description: 'Read educational timetable guides, revision schedule strategies, and time management articles from Online Timetable Creator.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/about-us/index.html': {
    title: 'About Us - Online Timetable Creator',
    description: 'Learn more about Online Timetable Creator, our mission to simplify schedule planning, and our free web productivity tools.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/contact-us/index.html': {
    title: 'Contact Us - Online Timetable Creator',
    description: 'Reach out to the support and administrative desk for Online Timetable Creator.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/privacy-policy/index.html': {
    title: 'Privacy Policy - Online Timetable Creator',
    description: 'Read the privacy policy and data protection terms for Online Timetable Creator.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/terms-and-conditions/index.html': {
    title: 'Terms and Conditions - Online Timetable Creator',
    description: 'Review the terms and conditions of using Online Timetable Creator.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/refund-policy/index.html': {
    title: 'Refund Policy - Online Timetable Creator',
    description: 'Understand the refund and cancellation policy for Online Timetable Creator.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/disclaimer/index.html': {
    title: 'Disclaimer - Online Timetable Creator',
    description: 'Read the legal disclaimer and terms of usage for Online Timetable Creator.',
    activePage: '',
    isNoindex: false
  },
  'public/blog/study-timetable-for-class-10/index.html': {
    title: 'Best Study Timetable for Class 10 - Daily Routine for Board Exams',
    description: 'Proven daily revision timetable and schedule planner for Class 10 students preparing for board exams.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/daily-routine-for-class-10-student-at-home/index.html': {
    title: 'Daily Routine for Class 10 Student at Home - Balanced Study Plan',
    description: 'Ideal daily routine and timetable for Class 10 students studying at home, balancing academics, rest, and revision.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/how-does-an-automatic-timetable-creator-work/index.html': {
    title: 'How Does an Automatic Timetable Creator Work? Algorithms & Design',
    description: 'Discover how automatic timetable makers and scheduling algorithms eliminate conflicts and optimize student schedules.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/how-to-make-a-perfect-school-timetable-in-2026-step-by-step-guide-for-students-parents-teachers/index.html': {
    title: 'How to Make a Perfect School Timetable in 2026 - Step-by-Step Guide',
    description: 'Master the art of school schedule making with our comprehensive 2026 guide for teachers, parents, and students.',
    activePage: '',
    isNoindex: true
  },
  'public/blog/timetable-guides/index.html': {
    title: 'The Ultimate Timetable Guide - Frameworks for Academic & Personal Scheduling',
    description: 'Comprehensive guide and frameworks for building optimal academic class routines, study plans, and personal schedules.',
    activePage: '',
    isNoindex: true
  }
};

function buildFullCleanDocument({
  lang = 'en-GB',
  title,
  description,
  canonicalUrl,
  robotsMeta,
  activePage = '',
  mainContent,
  additionalHead = '',
  pageScript = ''
}) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    ${robotsMeta}
    ${generateHreflangs(canonicalUrl)}
    
    <!-- Favicon and App Icons -->
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- High Performance Google Fonts & Tailwind CSS CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: ['class', '[data-theme="dark"]'],
        theme: {
          extend: {
            colors: {
              violet: {
                50: '#f5f3ff',
                100: '#ede9fe',
                200: '#ddd6fe',
                300: '#c4b5fd',
                400: '#a78bfa',
                500: '#8b5cf6',
                600: '#7c3aed',
                700: '#6d28d9',
                800: '#5b21b6',
                900: '#4c1d95',
              }
            }
          }
        }
      }
    </script>
    ${universalHeaderAndResponsiveCss.trim()}
    ${additionalHead}
  </head>
  <body class="bg-[#f8f9fa] text-slate-800 antialiased min-h-screen flex flex-col selection:bg-violet-500 selection:text-white">
    ${generateHeaderHtml(activePage)}
    ${mainContent}
    ${coreAppFooter.trim()}
    ${unifiedAppScriptBlock.trim()}
    ${pageScript ? `<script>\n${pageScript.trim()}\n</script>` : ''}
  </body>
</html>`;
}

function makeArticleContentResponsive(content) {
  // 1. Responsive main container (max-width: 100vw safe)
  content = content.replace(
    /<main class="max-w-4xl mx-auto px-6 py-12 flex-grow">/g,
    '<main class="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-grow" style="max-width: min(56rem, 100vw); width: 100%;">'
  );

  // 2. Responsive article card (padding on mobile: p-4 sm:p-8 md:p-12)
  content = content.replace(
    /<article class="bg-white border border-\[#e5e7eb\] rounded-3xl p-8 md:p-12 shadow-sm space-y-8">/g,
    '<article class="bg-white border border-[#e5e7eb] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm space-y-6 sm:space-y-8 w-full overflow-hidden" style="max-width: 100%;">'
  );

  // 3. Responsive main article heading (H1)
  content = content.replace(
    /class="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4"/g,
    'class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 break-words"'
  );

  // 4. Responsive author card
  content = content.replace(
    /class="flex items-center gap-4 bg-slate-50\/50 border border-slate-100 rounded-2xl p-4"/g,
    'class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-slate-50/50 border border-slate-100 rounded-2xl p-4"'
  );

  // 5. Responsive dynamic table of contents
  content = content.replace(
    /class="bg-violet-50\/30 border border-violet-100\/50 rounded-2xl p-6"/g,
    'class="bg-violet-50/30 border border-violet-100/50 rounded-xl sm:rounded-2xl p-4 sm:p-6"'
  );

  // 6. Responsive tables: Wrap all tables in article-table-wrap
  content = content.replace(
    /<div class="border border-\[#e5e7eb\] rounded-2xl overflow-hidden mt-4">\s*(?:<div class="overflow-x-auto">)?\s*<table class="([^"]*)">/g,
    '<div class="article-table-wrap border border-[#e5e7eb] rounded-xl sm:rounded-2xl overflow-x-auto mt-4 w-full"><table class="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">'
  );
  content = content.replace(
    /<\/table>\s*<\/div>\s*<\/div>/g,
    '</table>\n          </div>'
  );

  return content;
}

const unifiedAppScriptBlock = `    <!-- UNIVERSAL APP LOGIC: THEME, MOBILE MENU & CLEAN TRANSLATION -->
    <script>
      const savedTheme = localStorage.getItem('timetable_theme') || '';
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      function updateLocalThemeIcon(theme) {
        const iconSvg = document.getElementById('themeIconLocal');
        const iconSvgHeader = document.getElementById('themeToggleIconHeader');
        const moonPath = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        const sunPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
        if (iconSvg) {
          iconSvg.innerHTML = theme === 'dark' ? sunPath : moonPath;
        }
        if (iconSvgHeader) {
          iconSvgHeader.innerHTML = theme === 'dark' ? sunPath : moonPath;
        }
      }

      function toggleLocalTheme() {
        if (window.app && window.app.handlers && window.app.handlers.toggleDark) {
          window.app.handlers.toggleDark();
          return;
        }
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'dark') {
          html.removeAttribute('data-theme');
          localStorage.setItem('timetable_theme', 'light');
          updateLocalThemeIcon('light');
        } else {
          html.setAttribute('data-theme', 'dark');
          localStorage.setItem('timetable_theme', 'dark');
          updateLocalThemeIcon('dark');
        }
      }

      function toggleMobileMenuLocal() {
        if (window.app && window.app.handlers && window.app.handlers.toggleMobileMenu) {
          window.app.handlers.toggleMobileMenu();
          return;
        }
        const menu = document.getElementById('mobileMenuDrawer') || document.getElementById('mobileMenuLocal');
        if (menu) {
          menu.classList.toggle('hidden');
        }
      }

      // Initial theme icon setup on DOM ready
      if (savedTheme === 'dark') {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function() { updateLocalThemeIcon('dark'); });
        } else {
          updateLocalThemeIcon('dark');
        }
      }

${cleanTranslationScript.trim()}
    </script>
    <div id="google_translate_element" style="display: none !important;"></div>`;

// 5. Update Core App Files (index.html & timetable-generator-online-for-students)
function updateCoreAppFile(filePath, canonicalUrl, activePage = 'workspace') {
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure favicon & manifest tags in head
  content = ensureFaviconTags(content);

  // Set default language to en-GB
  content = content.replace(/<html(\s+[^>]*)?>/i, (match) => {
    let m = match.replace(/\blang="[^"]*"/, 'lang="en-GB"');
    if (!m.includes('lang=')) m = m.replace('<html', '<html lang="en-GB"');
    return m;
  });

  // Replace Footer
  const footerStart = content.indexOf('<footer class="seo-footer">');
  const footerEnd = content.indexOf('</footer>', footerStart);
  if (footerStart !== -1 && footerEnd !== -1) {
    content = content.substring(0, footerStart) + coreAppFooter.trim() + content.substring(footerEnd + 9);
  }

  // Update Footer CSS grid
  content = content.replace(
    /grid-template-columns:\s*1\.4fr\s+1\.2fr\s+1fr\s+1fr\s+1fr;/g,
    'grid-template-columns: 1.4fr 1.2fr 1.1fr 1.1fr;'
  );

  // Update Hreflangs
  const hreflangRegex = /<link rel="canonical"[\s\S]*?(?=<link rel="preconnect"|<script|<\!-- High Performance|<\!-- FAQPage)/;
  if (hreflangRegex.test(content)) {
    content = content.replace(hreflangRegex, generateHreflangs(canonicalUrl) + '\n    ');
  }

  // Replace Header with the unified header matching activePage
  const headerRegex = /<!-- PREMIUM GLOBAL NAVIGATION HEADER -->[\s\S]*?<\/header>/i;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, generateHeaderHtml(activePage));
  } else if (/<header class="global-header"[\s\S]*?<\/header>/i.test(content)) {
    content = content.replace(/<header class="global-header"[\s\S]*?<\/header>/i, generateHeaderHtml(activePage));
  }

  // Replace old translation logic block - strictly boundary-safe
  const fullBlock = `<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->\n    <div id="google_translate_element" style="display: none !important;"></div>\n    <script>\n${cleanTranslationScript.trim()}\n    </script>\n\n    `;
  const translateBlockRegex = /<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->[\s\S]*?(?=<!-- CODE SCRIPT EXECUTOR MODULE -->)/i;
  if (translateBlockRegex.test(content)) {
    content = content.replace(translateBlockRegex, fullBlock);
  } else {
    const fallbackRegex = /<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->[\s\S]*?<\/script>/i;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, fullBlock.trim());
    }
  }

  // Remove any lingering auth links
  content = content.replace(/<a\s+href="[^"]*auth=signin"[^>]*>[\s\S]*?<\/a>/gi, '');
  content = content.replace(/<a\s+href="[^"]*auth=signup"[^>]*>[\s\S]*?<\/a>/gi, '');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated core app file: ${filePath}`);
}

// 6. Update Blog files (Articles and Legal Pages)
function updateBlogFile(filePath, canonicalUrl, isLegal) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract <main>...</main>
  const mainStart = content.indexOf('<main');
  const mainEnd = content.indexOf('</main>', mainStart);
  if (mainStart === -1 || mainEnd === -1) {
    console.warn(`Could not find <main> in ${filePath}`);
    return;
  }
  let mainContent = content.substring(mainStart, mainEnd + 7);

  // Make Article & Content Responsive (100vw, responsive tables, responsive padding)
  mainContent = makeArticleContentResponsive(mainContent);

  // Clean any auth links from mainContent if present
  mainContent = mainContent.replace(/<a\s+href="[^"]*auth=signin"[^>]*>[\s\S]*?<\/a>/gi, '');
  mainContent = mainContent.replace(/<a\s+href="[^"]*auth=signup"[^>]*>[\s\S]*?<\/a>/gi, '');

  const meta = PAGE_META[filePath] || {
    title: isLegal ? 'Legal Notice - Online Timetable Creator' : 'Study Guide - Online Timetable Creator',
    description: 'Read guides and policies from Online Timetable Creator.'
  };

  const isNoindex = meta.isNoindex !== undefined ? meta.isNoindex : (!isLegal);

  const cleanDoc = buildFullCleanDocument({
    lang: 'en-GB',
    title: meta.title,
    description: meta.description,
    canonicalUrl: canonicalUrl,
    robotsMeta: isNoindex 
      ? '<meta name="robots" content="noindex, follow" />' 
      : '<meta name="robots" content="index, follow" />',
    activePage: isLegal ? '' : (filePath.includes('/blog/index.html') ? 'blog' : ''),
    mainContent: mainContent
  });

  fs.writeFileSync(filePath, cleanDoc, 'utf8');
  console.log(`Updated blog file: ${filePath}`);
}

// 7. Update Standalone Files (How to Use, FAQs, HTML Sitemap, sitemap.html)
function updateStandaloneFile(filePath, canonicalUrl, activePage, isNoindex) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract <main>...</main>
  const mainStart = content.indexOf('<main');
  const mainEnd = content.indexOf('</main>', mainStart);
  if (mainStart === -1 || mainEnd === -1) {
    console.warn(`Could not find <main> in ${filePath}`);
    return;
  }
  let mainContent = content.substring(mainStart, mainEnd + 7);

  // Clean any auth or launch buttons if needed
  mainContent = mainContent.replace(/<a\s+href="[^"]*auth=signin"[^>]*>[\s\S]*?<\/a>/gi, '');
  mainContent = mainContent.replace(/<a\s+href="[^"]*auth=signup"[^>]*>[\s\S]*?<\/a>/gi, '');

  let pageScript = '';
  if (filePath.includes('faqs')) {
    pageScript = `
      function filterFaqs() {
        var query = (document.getElementById('faqSearchInput') ? document.getElementById('faqSearchInput').value : '').toLowerCase().trim();
        var clearBtn = document.getElementById('clearSearchBtn');
        if (clearBtn) clearBtn.classList.toggle('hidden', !query);
        var activePill = document.querySelector('.category-pill.active');
        var cat = activePill ? activePill.getAttribute('data-cat') : 'all';
        var items = document.querySelectorAll('.faq-item');
        var visibleCount = 0;
        items.forEach(function(item) {
          var text = item.textContent.toLowerCase();
          var itemCat = item.getAttribute('data-category');
          var matchesCat = cat === 'all' || itemCat === cat;
          var matchesQuery = !query || text.indexOf(query) !== -1;
          if (matchesCat && matchesQuery) {
            item.style.display = '';
            visibleCount++;
          } else {
            item.style.display = 'none';
          }
        });
        var label = document.getElementById('faqCountLabel');
        if (label) label.textContent = 'Showing ' + visibleCount + ' question' + (visibleCount === 1 ? '' : 's');
      }

      function filterCategory(cat) {
        document.querySelectorAll('.category-pill').forEach(function(pill) {
          if (pill.getAttribute('data-cat') === cat) {
            pill.classList.add('active', 'bg-violet-600', 'text-white');
            pill.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
          } else {
            pill.classList.remove('active', 'bg-violet-600', 'text-white');
            pill.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
          }
        });
        filterFaqs();
      }

      function clearFaqSearch() {
        var input = document.getElementById('faqSearchInput');
        if (input) {
          input.value = '';
          filterFaqs();
          input.focus();
        }
      }
    `;
  } else if (filePath.includes('sitemap.html')) {
    pageScript = `
      function filterSitemap(val) {
        var query = (val || '').toLowerCase().trim();
        var links = document.querySelectorAll('.sitemap-section a');
        links.forEach(function(a) {
          var parentLi = a.closest('li') || a.parentElement;
          if (!query) {
            if (parentLi) parentLi.style.display = '';
          } else {
            var match = a.textContent.toLowerCase().indexOf(query) !== -1 || (a.getAttribute('href') || '').toLowerCase().indexOf(query) !== -1;
            if (parentLi) parentLi.style.display = match ? '' : 'none';
          }
        });
      }
    `;
  }

  const meta = PAGE_META[filePath] || {
    title: 'Online Timetable Creator',
    description: 'Create and export custom schedules and class timetables.',
    activePage: activePage || '',
    isNoindex: isNoindex
  };

  const cleanDoc = buildFullCleanDocument({
    lang: 'en-GB',
    title: meta.title,
    description: meta.description,
    canonicalUrl: canonicalUrl,
    robotsMeta: isNoindex 
      ? '<meta name="robots" content="noindex, follow" />' 
      : '<meta name="robots" content="index, follow" />',
    activePage: activePage || meta.activePage || '',
    mainContent: mainContent,
    pageScript: pageScript
  });

  fs.writeFileSync(filePath, cleanDoc, 'utf8');
  console.log(`Updated standalone file: ${filePath}`);
}

function ensureNoindex(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = ensureFaviconTags(content);
  const robotsMeta = '<meta name="robots" content="noindex, follow" />';
  if (/<meta name="robots"[^>]*>/i.test(content)) {
    content = content.replace(/<meta name="robots"[^>]*>/i, robotsMeta);
  } else {
    content = content.replace('</head>', `    ${robotsMeta}\n  </head>`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

function runAllUpdates() {
  console.log('--- Updating SEO, Headers & Clean i18n Across Entire Site ---');

  // Core apps
  updateCoreAppFile('index.html', 'https://timetablecreator.online/', 'workspace');
  updateCoreAppFile('public/timetable-generator-online-for-students/index.html', 'https://timetablecreator.online/timetable-generator-online-for-students/', 'students');
  
  // Standalone pages
  updateStandaloneFile('public/sitemap.html', 'https://timetablecreator.online/sitemap.html', 'sitemap', false);
  updateStandaloneFile('public/html-sitemap/index.html', 'https://timetablecreator.online/html-sitemap/', 'sitemap', true);
  updateStandaloneFile('public/how-to-use/index.html', 'https://timetablecreator.online/how-to-use/', '', true);
  updateStandaloneFile('public/faqs/index.html', 'https://timetablecreator.online/faqs/', '', true);

  // All Base Blog Posts & Pages
  const blogDir = 'public/blog';
  const langCodes = SUPPORTED_LANGS.map(l => l.code).concat(['en', 'ru', 'ar', 'zh']);
  const legalPages = ['privacy-policy', 'terms-and-conditions', 'disclaimer', 'about-us', 'contact-us'];

  if (fs.existsSync(blogDir)) {
    // 1. Blog archive index.html
    const blogIndex = path.join(blogDir, 'index.html');
    if (fs.existsSync(blogIndex)) {
      updateBlogFile(blogIndex, 'https://timetablecreator.online/blog/', false);
    }

    // 2. Subdirectories in blog (articles and legal pages)
    const items = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory() && !langCodes.includes(item.name)) {
        const itemFile = path.join(blogDir, item.name, 'index.html');
        if (fs.existsSync(itemFile)) {
          const canonical = `https://timetablecreator.online/blog/${item.name}/`;
          const isLegal = legalPages.includes(item.name);
          updateBlogFile(itemFile, canonical, isLegal);
        }
      }
    }
  }

  console.log('--- SEO, Headers & i18n update completed successfully ---');
}

if (require.main === module) {
  runAllUpdates();
}

module.exports = {
  SUPPORTED_LANGS,
  generateHreflangs,
  runAllUpdates
};
