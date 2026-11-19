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
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'ms', label: 'Bahasa Melayu' }
];

function generateHreflangs(baseCanonicalUrl) {
  return `    <link rel="canonical" href="${baseCanonicalUrl}" />`;
}

const SITE_HEADER_PLACEHOLDER = `<div id="site-header" style="min-height: 64px;"></div>`;
const SITE_FOOTER_PLACEHOLDER = `<div id="site-footer"></div>`;
const SHARED_CSS_TAG = `<link rel="stylesheet" href="/shared-layout.css" />`;
const SHARED_JS_TAG = `<script src="/shared-layout.js" defer></script>`;

function ensureSharedLayoutAssets(content) {
  // Remove any legacy universal inline style block so shared-layout.css stays authoritative
  content = content.replace(/<!--\s*UNIVERSAL GLOBAL HEADER & 100VW RESPONSIVE STYLES\s*-->\s*/gi, '');
  content = content.replace(/<style id="universal-header-responsive-css">[\s\S]*?<\/style>\s*/gi, '');

  // Ensure shared-layout.css is placed right before </head> so its mobile 70% zoom rules win source order
  content = content.replace(/\s*<link[^>]*href=["']\/shared-layout\.css["'][^>]*>\s*/gi, '\n    ');
  if (content.includes('</head>')) {
    content = content.replace('</head>', `    ${SHARED_CSS_TAG}\n  </head>`);
  }

  // Ensure shared-layout.js is placed cleanly before </body>
  content = content.replace(/\s*<script[^>]*src=["']\/shared-layout\.js["'][^>]*><\/script>\s*/gi, '\n    ');
  if (content.includes('</body>')) {
    content = content.replace('</body>', `    ${SHARED_JS_TAG}\n  </body>`);
  }

  return content;
}

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

function generateHeaderHtml() {
  return SITE_HEADER_PLACEHOLDER;
}

function ensureHeaderAndResponsiveStyles(content) {
  return ensureSharedLayoutAssets(content);
}

function replaceHeaderInHtml(content) {
  if (/<div\s+id=["']site-header["'][^>]*>[\s\S]*?<\/div>/i.test(content)) {
    return content.replace(/<div\s+id=["']site-header["'][^>]*>[\s\S]*?<\/div>/i, SITE_HEADER_PLACEHOLDER);
  }
  if (/<!--\s*PREMIUM GLOBAL NAVIGATION HEADER\s*-->\s*<header\s+class=["']global-header["'][\s\S]*?<\/header>/i.test(content)) {
    return content.replace(/<!--\s*PREMIUM GLOBAL NAVIGATION HEADER\s*-->\s*<header\s+class=["']global-header["'][\s\S]*?<\/header>/i, SITE_HEADER_PLACEHOLDER);
  }
  if (/<header\s+class=["']global-header["'][\s\S]*?<\/header>/i.test(content)) {
    return content.replace(/<header\s+class=["']global-header["'][\s\S]*?<\/header>/i, SITE_HEADER_PLACEHOLDER);
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
    isNoindex: false
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
  },
  'public/blog/best-daily-routine-timetable-for-students/index.html': {
    title: 'Best Daily Routine Timetable for Students: Science-Backed Schedules That Stick',
    description: 'Discover a science-backed daily routine timetable for school, college, and competitive exam students. Learn energy mapping, ultradian rhythms, and proven schedules.',
    activePage: '',
    isNoindex: false
  }
};

let _cachedTailwindCss = null;
function getStaticTailwindCss() {
  if (_cachedTailwindCss) return _cachedTailwindCss;
  const cssPath = path.join(__dirname, '../public/tailwind-built.css');
  if (fs.existsSync(cssPath)) {
    _cachedTailwindCss = fs.readFileSync(cssPath, 'utf8');
    return _cachedTailwindCss;
  }
  return '';
}

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
  const staticCss = getStaticTailwindCss();
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
    
    <!-- High Performance Google Fonts, Local Static CSS & Fallback CDN -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- EMBEDDED PRODUCTION TAILWIND CSS (100% Offline & Main-Domain Safe) -->
    <link rel="stylesheet" href="/tailwind-built.css" />
    <link rel="stylesheet" href="/style.css" />
    <style id="tc-static-tailwind-css">
${staticCss}
    </style>
    
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
    ${additionalHead}
    ${SHARED_CSS_TAG}
  </head>
  <body class="bg-[#f8f9fa] text-slate-800 antialiased min-h-screen flex flex-col selection:bg-violet-500 selection:text-white">
    ${SITE_HEADER_PLACEHOLDER}
    ${mainContent}
    ${SITE_FOOTER_PLACEHOLDER}
    ${SHARED_JS_TAG}
    ${pageScript ? `<script>\n${pageScript.trim()}\n</script>` : ''}
  </body>
</html>`;
}

function makeArticleContentResponsive(content) {
  // 1. Responsive main container (100% zoom-safe)
  content = content.replace(
    /<main class="max-w-4xl mx-auto px-6 py-12 flex-grow">/g,
    '<main class="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-grow" style="max-width: min(56rem, 100%); width: 100%;">'
  );
  content = content.replace(/max-width:\s*min\(56rem,\s*100vw\)/gi, 'max-width: min(56rem, 100%)');

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

// 5. Update Core App Files (index.html & timetable-generator-online-for-students)
function updateCoreAppFile(filePath, canonicalUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure favicon & manifest tags in head
  content = ensureFaviconTags(content);

  // Set default language to en-GB
  content = content.replace(/<html(\s+[^>]*)?>/i, (match) => {
    let m = match.replace(/\blang="[^"]*"/, 'lang="en-GB"');
    if (!m.includes('lang=')) m = m.replace('<html', '<html lang="en-GB"');
    return m;
  });

  // Replace Footer with dynamic placeholder
  if (/<div\s+id=["']site-footer["'][^>]*>[\s\S]*?<\/div>/i.test(content)) {
    content = content.replace(/<div\s+id=["']site-footer["'][^>]*>[\s\S]*?<\/div>/i, SITE_FOOTER_PLACEHOLDER);
  } else {
    const footerStart = content.indexOf('<footer class="seo-footer">');
    const footerEnd = content.indexOf('</footer>', footerStart);
    if (footerStart !== -1 && footerEnd !== -1) {
      content = content.substring(0, footerStart) + SITE_FOOTER_PLACEHOLDER + content.substring(footerEnd + 9);
    }
  }

  // Update Hreflangs / Canonical
  const hreflangRegex = /<link rel="canonical"[\s\S]*?(?=<link rel="preconnect"|<script|<\!-- High Performance|<\!-- FAQPage)/;
  if (hreflangRegex.test(content)) {
    content = content.replace(hreflangRegex, generateHreflangs(canonicalUrl) + '\n    ');
  }

  // Replace Header with dynamic placeholder
  content = replaceHeaderInHtml(content);

  // Strip old inline Google Translate & header handler script block (now handled by /shared-layout.js)
  const translateBlockRegex = /<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->[\s\S]*?(?=<!-- CODE SCRIPT EXECUTOR MODULE -->)/i;
  if (translateBlockRegex.test(content)) {
    content = content.replace(translateBlockRegex, '');
  } else {
    const fallbackRegex = /<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->[\s\S]*?<\/script>/i;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, '');
    }
  }

  // Ensure shared-layout.css (at end of head) and shared-layout.js (before </body>)
  content = ensureSharedLayoutAssets(content);

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
  runAllUpdates,
  buildFullCleanDocument
};
