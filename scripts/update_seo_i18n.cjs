const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGS = [
  { code: 'en', label: 'English (US)' },
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh', label: '中文 (Mandarin)' }
];

function generateHreflangs(baseCanonicalUrl) {
  // strip trailing slash for building lang URLs
  let urlPrefix = baseCanonicalUrl.replace(/\/+$/, '');
  let tags = [
    `    <link rel="canonical" href="${baseCanonicalUrl}" />`,
    `    <link rel="alternate" hreflang="x-default" href="${baseCanonicalUrl}" />`,
    `    <link rel="alternate" hreflang="en" href="${urlPrefix}/en" />`,
    `    <link rel="alternate" hreflang="en-GB" href="${urlPrefix}/en-GB" />`,
    `    <link rel="alternate" hreflang="es" href="${urlPrefix}/es" />`,
    `    <link rel="alternate" hreflang="fr" href="${urlPrefix}/fr" />`,
    `    <link rel="alternate" hreflang="de" href="${urlPrefix}/de" />`,
    `    <link rel="alternate" hreflang="it" href="${urlPrefix}/it" />`,
    `    <link rel="alternate" hreflang="pt" href="${urlPrefix}/pt" />`,
    `    <link rel="alternate" hreflang="hi" href="${urlPrefix}/hi" />`,
    `    <link rel="alternate" hreflang="ru" href="${urlPrefix}/ru" />`,
    `    <link rel="alternate" hreflang="ar" href="${urlPrefix}/ar" />`,
    `    <link rel="alternate" hreflang="zh" href="${urlPrefix}/zh" />`
  ];
  return tags.join('\n');
}

// 1. Update Core App HTML files (index.html, public/timetable-generator-online-for-students/index.html, public/timetable-generator/index.html)
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
        <a href="#how-to" class="footer-link">How to Use</a>
        <a href="#faq" class="footer-link">Frequently Asked Questions</a>
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

function updateCoreAppFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Footer
  const footerStart = content.indexOf('<footer class="seo-footer">');
  const footerEnd = content.indexOf('</footer>', footerStart);
  if (footerStart !== -1 && footerEnd !== -1) {
    content = content.substring(0, footerStart) + coreAppFooter.trim() + content.substring(footerEnd + 9);
  }

  // Update Footer CSS grid to 4 columns
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

  // Update changeLanguage and language sync script
  const changeLangRegex = /function changeLanguage\(langCode\)[\s\S]*?\/\/ Close language dropdown if clicking outside/;
  const newChangeLang = `function changeLanguage(langCode) {
        const supportedLangs = ['en', 'en-GB', 'es', 'fr', 'de', 'it', 'pt', 'hi', 'ru', 'ar', 'zh'];
        let path = window.location.pathname.replace(/\\/+$/, '');
        let segments = path.split('/').filter(Boolean);
        if (segments.length > 0 && supportedLangs.includes(segments[segments.length - 1])) {
          segments.pop();
        }
        let basePath = '/' + segments.join('/');
        if (basePath === '/') basePath = '';

        let targetPath = '';
        if (langCode === 'en' || langCode === 'x-default') {
          targetPath = basePath || '/';
        } else {
          targetPath = (basePath ? basePath : '') + '/' + langCode;
        }

        const domain = window.location.hostname;
        const transCode = langCode === 'en-GB' ? 'en' : langCode;
        document.cookie = \`googtrans=/en/\${transCode}; path=/; SameSite=None; Secure\`;
        if (domain) {
          document.cookie = \`googtrans=/en/\${transCode}; path=/; domain=\${domain}; SameSite=None; Secure\`;
        }

        window.location.href = targetPath + (window.location.search || '') + (langCode !== 'en' && langCode !== 'en-GB' ? \`#googtrans(en|\${transCode})\` : '');
      }

      // Close language dropdown if clicking outside`;

  if (changeLangRegex.test(content)) {
    content = content.replace(changeLangRegex, newChangeLang);
  }

  // Update cookie sync to also check path
  const cookieSyncRegex = /\/\/ Synchronize cookie if \?lang= is present[\s\S]*?loadGoogleTranslateScript\(\);[\s\S]*?\} else \{/m;
  const newCookieSync = `// Synchronize language from URL path
      (function() {
        const supportedLangs = ['en', 'en-GB', 'es', 'fr', 'de', 'it', 'pt', 'hi', 'ru', 'ar', 'zh'];
        const pathSegments = window.location.pathname.replace(/\\/+$/, '').split('/').filter(Boolean);
        const pathLang = pathSegments.length > 0 && supportedLangs.includes(pathSegments[pathSegments.length - 1]) ? pathSegments[pathSegments.length - 1] : null;
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = urlParams.get('lang');
        const activeLang = pathLang || queryLang;
        
        if (activeLang && activeLang !== 'en') {
          const transCode = activeLang === 'en-GB' ? 'en' : activeLang;
          document.cookie = \`googtrans=/en/\${transCode}; path=/; SameSite=None; Secure\`;
          const domain = window.location.hostname;
          if (domain) {
            document.cookie = \`googtrans=/en/\${transCode}; path=/; domain=\${domain}; SameSite=None; Secure\`;
          }
          if (!window.location.hash.includes('googtrans')) {
            window.location.hash = \`#googtrans(en|\${transCode})\`;
          }
          loadGoogleTranslateScript();
        } else {`;
  
  if (cookieSyncRegex.test(content)) {
    content = content.replace(cookieSyncRegex, newCookieSync);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated core app file: ${filePath}`);
}

// 2. Update Blog files
function updateBlogFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert HTML Sitemap link into blog footer Company column if not already present
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

  // Update changeLanguage function in blog
  const changeLangRegex = /function changeLanguage\(langCode\)[\s\S]*?\/\/ Close language dropdown if clicking outside/;
  const newChangeLang = `function changeLanguage(langCode) {
        const supportedLangs = ['en', 'en-GB', 'es', 'fr', 'de', 'it', 'pt', 'hi', 'ru', 'ar', 'zh'];
        let path = window.location.pathname.replace(/\\/+$/, '');
        let segments = path.split('/').filter(Boolean);
        if (segments.length > 0 && supportedLangs.includes(segments[segments.length - 1])) {
          segments.pop();
        }
        let basePath = '/' + segments.join('/');
        if (basePath === '/') basePath = '';

        let targetPath = '';
        if (langCode === 'en' || langCode === 'x-default') {
          targetPath = basePath || '/';
        } else {
          targetPath = (basePath ? basePath : '') + '/' + langCode;
        }

        const domain = window.location.hostname;
        const transCode = langCode === 'en-GB' ? 'en' : langCode;
        document.cookie = \`googtrans=/en/\${transCode}; path=/; SameSite=None; Secure\`;
        if (domain) {
          document.cookie = \`googtrans=/en/\${transCode}; path=/; domain=\${domain}; SameSite=None; Secure\`;
        }

        window.location.href = targetPath + (window.location.search || '') + (langCode !== 'en' && langCode !== 'en-GB' ? \`#googtrans(en|\${transCode})\` : '');
      }

      // Close language dropdown if clicking outside`;

  if (changeLangRegex.test(content)) {
    content = content.replace(changeLangRegex, newChangeLang);
  }

  // Update cookie synchronization in blog
  const blogCookieSyncRegex = /\/\/ Synchronize cookie if \?lang= is present[\s\S]*?loadGoogleTranslateScript\(\);[\s\S]*?\} else \{/m;
  const newBlogCookieSync = `// Synchronize language from URL path
      (function() {
        const supportedLangs = ['en', 'en-GB', 'es', 'fr', 'de', 'it', 'pt', 'hi', 'ru', 'ar', 'zh'];
        const pathSegments = window.location.pathname.replace(/\\/+$/, '').split('/').filter(Boolean);
        const pathLang = pathSegments.length > 0 && supportedLangs.includes(pathSegments[pathSegments.length - 1]) ? pathSegments[pathSegments.length - 1] : null;
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = urlParams.get('lang');
        const activeLang = pathLang || queryLang;
        
        if (activeLang && activeLang !== 'en') {
          const transCode = activeLang === 'en-GB' ? 'en' : activeLang;
          document.cookie = \`googtrans=/en/\${transCode}; path=/; SameSite=None; Secure\`;
          const domain = window.location.hostname;
          if (domain) {
            document.cookie = \`googtrans=/en/\${transCode}; path=/; domain=\${domain}; SameSite=None; Secure\`;
          }
          if (!window.location.hash.includes('googtrans')) {
            window.location.hash = \`#googtrans(en|\${transCode})\`;
          }
          loadGoogleTranslateScript();
        } else {`;

  if (blogCookieSyncRegex.test(content)) {
    content = content.replace(blogCookieSyncRegex, newBlogCookieSync);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated blog file: ${filePath}`);
}

// Run updates
updateCoreAppFile('index.html', 'https://timetablecreator.online/');
updateCoreAppFile('public/timetable-generator-online-for-students/index.html', 'https://timetablecreator.online/timetable-generator-online-for-students/');
updateCoreAppFile('public/timetable-generator/index.html', 'https://timetablecreator.online/timetable-generator/');

// Update Blog Index
updateBlogFile('public/blog/index.html', 'https://timetablecreator.online/blog/');

// Update Blog Articles
const blogDir = 'public/blog';
const blogEntries = fs.readdirSync(blogDir, { withFileTypes: true });
for (const entry of blogEntries) {
  if (entry.isDirectory()) {
    const postFile = path.join(blogDir, entry.name, 'index.html');
    if (fs.existsSync(postFile)) {
      updateBlogFile(postFile, `https://timetablecreator.online/blog/${entry.name}/`);
    }
  }
}

console.log('All files successfully updated with hreflang tags, clean footers, and language URL switching!');
