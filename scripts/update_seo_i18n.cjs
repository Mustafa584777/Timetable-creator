const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGS = [
  { code: 'en-GB', label: 'English (UK)', isDefault: true },
  { code: 'en', label: 'English (US)' },
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
    `    <link rel="alternate" hreflang="en" href="${urlPrefix}/en" />`,
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
          <svg class="app-brand-logo" viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#673de6"/>
            <path d="M8 12h16M8 17h10M8 22h13" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="23" cy="21" r="3" fill="#00b090"/>
          </svg>
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
        <a href="/timetable-generator-online-for-students/" class="footer-link">Student Timetable Generator</a>
        <a href="/" class="footer-link">Free Online Timetable Maker</a>
        <a href="/timetable-generator/" class="footer-link">Timetable Generator Tool</a>
      </div>

      <!-- Column 3: Resources -->
      <div class="footer-col">
        <h4 class="footer-title">Resources</h4>
        <a href="/blog/" class="footer-link">Blog & Tutorials</a>
        <a href="/html-sitemap" class="footer-link">HTML Sitemap</a>
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

      var supportedLangs = ['en-GB', 'en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'hi'];

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

      // Synchronize language from URL path
      (function() {
        var currentPathLang = getLanguageFromPath();
        var urlParams = new URLSearchParams(window.location.search);
        var queryLang = urlParams.get('lang');
        var activeLang = currentPathLang || queryLang;
        
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
      })();`;

function updateCoreAppFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

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

  // Update Lang dropdown items in header
  const langDropdownItems = SUPPORTED_LANGS.map(l => 
    `              <button class="lang-dropdown-item" onclick="changeLanguage('${l.code}')">${l.label}</button>`
  ).join('\n');

  const dropdownMenuRegex = /<div class="lang-dropdown-menu" id="langDropdownMenu"[\s\S]*?<\/div>/;
  if (dropdownMenuRegex.test(content)) {
    content = content.replace(dropdownMenuRegex, `<div class="lang-dropdown-menu" id="langDropdownMenu" style="top: 44px; left: 50%; transform: translateX(-50%);">\n${langDropdownItems}\n            </div>`);
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

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated core app file: ${filePath}`);
}

// 3. Update Blog files
function updateBlogFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Set default language to en-GB
  content = content.replace(/<html(\s+[^>]*)?>/i, (match) => {
    let m = match.replace(/\blang="[^"]*"/, 'lang="en-GB"');
    if (!m.includes('lang=')) m = m.replace('<html', '<html lang="en-GB"');
    return m;
  });

  // Insert HTML Sitemap, How to Use, and FAQs into blog footer Company column
  if (!content.includes('/how-to-use/')) {
    content = content.replace(
      '<a href="/blog/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">Blog (Articles Archive)</a>',
      '<a href="/how-to-use/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">How to Use</a>\n              <a href="/faqs/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">FAQs</a>\n              <a href="/blog/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">Blog (Articles Archive)</a>'
    );
  }
  if (!content.includes('/html-sitemap')) {
    content = content.replace(
      '<a href="/blog/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">Blog (Articles Archive)</a>',
      '<a href="/blog/" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">Blog (Articles Archive)</a>\n              <a href="/html-sitemap" class="text-sm text-slate-500 hover:text-violet-600 transition-colors font-semibold">HTML Sitemap</a>'
    );
  }

  // Update hreflang tags
  const blogHreflangRegex = /<link rel="canonical"[\s\S]*?(?=<link rel="preconnect"|<style|<script|<\!-- Universal)/;
  if (blogHreflangRegex.test(content)) {
    content = content.replace(blogHreflangRegex, generateHreflangs(canonicalUrl) + '\n    ');
  }

  // Update lang dropdown items in header
  const langDropdownItems = SUPPORTED_LANGS.map(l => 
    `              <button class="lang-dropdown-item" onclick="changeLanguage('${l.code}')">${l.label}</button>`
  ).join('\n');

  const dropdownMenuRegex = /<div class="lang-dropdown-menu" id="langDropdownMenu"[\s\S]*?<\/div>/;
  if (dropdownMenuRegex.test(content)) {
    content = content.replace(dropdownMenuRegex, `<div class="lang-dropdown-menu" id="langDropdownMenu" style="top: 36px; right: auto; left: 0;">\n${langDropdownItems}\n            </div>`);
  }

  // Replace trailing scripts cleanly between </footer> and </body>
  const unifiedBlogScriptBlock = `    <!-- LIGHT/DARK MODE & TRANSLATION SCRIPT -->
    <script>
      const savedTheme = localStorage.getItem('timetable_theme') || '';
      if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateLocalThemeIcon('dark');
      }

      function toggleLocalTheme() {
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

      function updateLocalThemeIcon(theme) {
        const iconSvg = document.getElementById('themeIconLocal');
        if (!iconSvg) return;
        if (theme === 'dark') {
          iconSvg.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
        } else {
          iconSvg.innerHTML = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
        }
      }

      function toggleMobileMenuLocal() {
        const menu = document.getElementById('mobileMenuLocal');
        if (menu) {
          menu.classList.toggle('hidden');
        }
      }

${cleanTranslationScript.trim()}
    </script>
    <div id="google_translate_element" style="display: none !important;"></div>`;

  const footerCloseIdx = content.indexOf('</footer>');
  const bodyCloseIdx = content.indexOf('</body>');
  if (footerCloseIdx !== -1 && bodyCloseIdx !== -1) {
    content = content.substring(0, footerCloseIdx + 9) + '\n\n' + unifiedBlogScriptBlock.trim() + '\n  ' + content.substring(bodyCloseIdx);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated blog file: ${filePath}`);
}

// 4. Update HTML Sitemap file
function updateHtmlSitemap(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Set default language to en-GB
  content = content.replace(/<html(\s+[^>]*)?>/i, (match) => {
    let m = match.replace(/\blang="[^"]*"/, 'lang="en-GB"');
    if (!m.includes('lang=')) m = m.replace('<html', '<html lang="en-GB"');
    return m;
  });

  // Update hreflang tags
  const sitemapHreflangRegex = /<link rel="canonical"[\s\S]*?(?=<link rel="preconnect")/;
  if (sitemapHreflangRegex.test(content)) {
    content = content.replace(sitemapHreflangRegex, generateHreflangs('https://timetablecreator.online/html-sitemap') + '\n    ');
  }

  // Update language cards in Section 4
  const section4Cards = `
          <a href="/en-GB" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">English (UK) <span class="text-[10px] text-violet-600 font-bold ml-1">Default</span></span>
            <span class="text-[11px] text-slate-400">/en-GB</span>
          </a>
          <a href="/en" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">English (US)</span>
            <span class="text-[11px] text-slate-400">/en</span>
          </a>
          <a href="/es" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">Español (Spanish)</span>
            <span class="text-[11px] text-slate-400">/es</span>
          </a>
          <a href="/ja" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">日本語 (Japanese)</span>
            <span class="text-[11px] text-slate-400">/ja</span>
          </a>
          <a href="/fr" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">Français (French)</span>
            <span class="text-[11px] text-slate-400">/fr</span>
          </a>
          <a href="/de" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">Deutsch (German)</span>
            <span class="text-[11px] text-slate-400">/de</span>
          </a>
          <a href="/pt" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">Português (Portuguese)</span>
            <span class="text-[11px] text-slate-400">/pt</span>
          </a>
          <a href="/ko" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">한국어 (Korean)</span>
            <span class="text-[11px] text-slate-400">/ko</span>
          </a>
          <a href="/it" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">Italiano (Italian)</span>
            <span class="text-[11px] text-slate-400">/it</span>
          </a>
          <a href="/hi" class="p-3 rounded-xl border border-slate-100 hover:border-violet-300 hover:bg-violet-50/50 transition-all flex flex-col">
            <span class="text-xs font-semibold text-slate-800">हिन्दी (Hindi)</span>
            <span class="text-[11px] text-slate-400">/hi</span>
          </a>`;

  const cardsContainerRegex = /<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">[\s\S]*?<\/div>/;
  if (cardsContainerRegex.test(content)) {
    content = content.replace(cardsContainerRegex, `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">${section4Cards}\n        </div>`);
  }

  // Update lang dropdown items in header
  const langDropdownItems = SUPPORTED_LANGS.map(l => 
    `              <button class="lang-dropdown-item" onclick="changeLanguage('${l.code}')">${l.label}</button>`
  ).join('\n');

  const dropdownMenuRegex = /<div class="lang-dropdown-menu" id="langDropdownMenu"[\s\S]*?<\/div>/;
  if (dropdownMenuRegex.test(content)) {
    content = content.replace(dropdownMenuRegex, `<div class="lang-dropdown-menu" id="langDropdownMenu" style="top: 36px; right: auto; left: 0;">\n${langDropdownItems}\n            </div>`);
  }

  // Replace translation logic in html-sitemap
  const sitemapScriptRegex = /<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->[\s\S]*?(?=\/\/\s*Local Theme toggle)/i;
  if (sitemapScriptRegex.test(content)) {
    content = content.replace(
      sitemapScriptRegex,
      `<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->\n    <div id="google_translate_element" style="display: none !important;"></div>\n    <script>\n${cleanTranslationScript.trim()}\n    </script>\n\n    <script>\n      `
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated HTML sitemap file: ${filePath}`);
}

function runAllUpdates() {
  console.log('--- Updating SEO & Clean i18n Across Entire Site ---');

  // Core apps
  updateCoreAppFile('index.html', 'https://timetablecreator.online/');
  updateCoreAppFile('public/timetable-generator-online-for-students/index.html', 'https://timetablecreator.online/timetable-generator-online-for-students/');
  updateCoreAppFile('public/timetable-generator/index.html', 'https://timetablecreator.online/timetable-generator/');
  
  // HTML Sitemap and all its language subpages
  updateHtmlSitemap('public/html-sitemap/index.html');
  const sitemapDir = 'public/html-sitemap';
  if (fs.existsSync(sitemapDir)) {
    const sitemapEntries = fs.readdirSync(sitemapDir, { withFileTypes: true });
    for (const entry of sitemapEntries) {
      if (entry.isDirectory()) {
        const langSitemap = path.join(sitemapDir, entry.name, 'index.html');
        if (fs.existsSync(langSitemap)) {
          updateHtmlSitemap(langSitemap);
        }
      }
    }
  }

  // All Blog Posts (including all language folders)
  const blogDir = 'public/blog';
  if (fs.existsSync(blogDir)) {
    function walkBlog(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          walkBlog(fullPath);
        } else if (item.isFile() && item.name === 'index.html') {
          const relPath = path.relative(blogDir, fullPath).replace(/\\/g, '/');
          const segments = relPath.replace(/index\.html$/, '').split('/').filter(Boolean);
          if (segments.length > 0 && SUPPORTED_LANGS.some(l => l.code === segments[segments.length - 1])) {
            segments.pop();
          }
          const canonicalSlug = segments.join('/');
          const canonical = canonicalSlug 
            ? `https://timetablecreator.online/blog/${canonicalSlug}/`
            : `https://timetablecreator.online/blog/`;
          updateBlogFile(fullPath, canonical);
        }
      }
    }
    walkBlog(blogDir);
  }

  console.log('--- SEO & Clean i18n update completed successfully ---');
}

if (require.main === module) {
  runAllUpdates();
}

module.exports = {
  SUPPORTED_LANGS,
  generateHreflangs,
  runAllUpdates
};
