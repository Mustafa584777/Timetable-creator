const fs = require('fs');
const path = require('path');

const languages = [
  { code: 'en', name: 'English (US)', gtCode: 'en' },
  { code: 'en-GB', name: 'English (UK)', gtCode: 'en' },
  { code: 'fr', name: 'Français', gtCode: 'fr' },
  { code: 'es', name: 'Español', gtCode: 'es' },
  { code: 'de', name: 'Deutsch', gtCode: 'de' },
  { code: 'hi', name: 'हिन्दी', gtCode: 'hi' },
  { code: 'ru', name: 'Русский', gtCode: 'ru' },
  { code: 'ar', name: 'العربية', gtCode: 'ar', dir: 'rtl' },
  { code: 'zh', name: '中文 (Mandarin)', gtCode: 'zh-CN' },
  { code: 'pt', name: 'Português', gtCode: 'pt' },
  { code: 'it', name: 'Italiano', gtCode: 'it' },
  { code: 'ja', name: '日本語', gtCode: 'ja' },
];

const baseUrl = 'https://timetablecreator.online';

function buildHreflangs(baseCanonicalUrl) {
  const cleanBase = baseCanonicalUrl.replace(/\/$/, '');
  let tags = `    <link rel="alternate" hreflang="x-default" href="${baseCanonicalUrl}" />\n`;
  for (const lang of languages) {
    const langUrl = `${cleanBase}/${lang.code}`;
    tags += `    <link rel="alternate" hreflang="${lang.code}" href="${langUrl}" />\n`;
  }
  return tags.trimEnd();
}

function replaceOrInsertHreflangs(html, canonicalUrl) {
  // Replace canonical
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical"[^>]*>/, canonicalTag);
  } else {
    html = html.replace('</title>', '</title>\n    ' + canonicalTag);
  }

  // Remove existing hreflang tags
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, '');

  // Insert new hreflang tags right after canonical
  const hreflangs = buildHreflangs(canonicalUrl);
  html = html.replace(canonicalTag, canonicalTag + '\n' + hreflangs);
  return html;
}

// 1. Get the universal footer from index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const footerStartStr = '<footer class="seo-footer">';
const footerEndStr = '</footer>';
const fStart = indexHtml.indexOf(footerStartStr);
const fEnd = indexHtml.indexOf(footerEndStr, fStart) + footerEndStr.length;

if (fStart === -1 || fEnd === -1) {
  console.error("Could not find footer in index.html");
  process.exit(1);
}
const universalFooter = indexHtml.substring(fStart, fEnd);

// 2. Extract language dropdown HTML & script from index.html
const langDropdownStart = indexHtml.indexOf('<div class="lang-dropdown-container">');
const langDropdownEnd = indexHtml.indexOf('</div>\n          </div>', langDropdownStart) + '</div>\n          </div>'.length;
let universalLangDropdown = '';
if (langDropdownStart !== -1 && langDropdownEnd !== -1) {
  universalLangDropdown = indexHtml.substring(langDropdownStart, langDropdownEnd);
}

// Ensure index.html has proper hreflangs
indexHtml = replaceOrInsertHreflangs(indexHtml, 'https://timetablecreator.online/');
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated hreflangs in index.html');

// 3. Update public/timetable-generator/index.html & public/timetable-generator-online-for-students/index.html
const tools = [
  {
    filePath: 'public/timetable-generator/index.html',
    canonical: 'https://timetablecreator.online/timetable-generator/',
    basePath: '/timetable-generator/'
  },
  {
    filePath: 'public/timetable-generator-online-for-students/index.html',
    canonical: 'https://timetablecreator.online/timetable-generator-online-for-students/',
    basePath: '/timetable-generator-online-for-students/'
  }
];

for (const tool of tools) {
  if (fs.existsSync(tool.filePath)) {
    let content = fs.readFileSync(tool.filePath, 'utf8');
    
    // Replace footer
    const curFStart = content.indexOf(footerStartStr);
    const curFEnd = content.indexOf(footerEndStr, curFStart) + footerEndStr.length;
    if (curFStart !== -1 && curFEnd !== -1) {
      content = content.substring(0, curFStart) + universalFooter + content.substring(curFEnd);
    }

    // Replace or insert hreflangs
    content = replaceOrInsertHreflangs(content, tool.canonical);

    fs.writeFileSync(tool.filePath, content, 'utf8');
    console.log(`Updated footer and hreflangs in ${tool.filePath}`);
  }
}

// 4. Update all blog pages
function getBlogFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      // Don't recurse into language folders if any exist already
      const isLangFolder = languages.some(l => l.code === file);
      if (!isLangFolder) {
        results = results.concat(getBlogFiles(fullPath));
      }
    } else if (file === 'index.html') {
      results.push(fullPath);
    }
  });
  return results;
}

const blogFiles = getBlogFiles('public/blog');

for (const bFile of blogFiles) {
  let content = fs.readFileSync(bFile, 'utf8');
  
  // Determine canonical
  // e.g. public/blog/index.html -> https://timetablecreator.online/blog/
  // e.g. public/blog/about-us/index.html -> https://timetablecreator.online/blog/about-us/
  let rel = path.relative('public', bFile).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (!rel.startsWith('/')) rel = '/' + rel;
  if (!rel.endsWith('/')) rel = rel + '/';
  const canonical = baseUrl + rel;

  content = replaceOrInsertHreflangs(content, canonical);

  // Ensure sitemap link is in the Company footer links
  if (!content.includes('/sitemap.html')) {
    const aboutLink = '<a href="/blog/about-us/"';
    if (content.includes(aboutLink)) {
      content = content.replace(
        aboutLink,
        '<a href="/sitemap.html" class="text-sm text-slate-500 hover:text-violet-600 transition-colors">HTML Sitemap</a>\n              ' + aboutLink
      );
    }
  }

  // Ensure copyright is clean
  content = content.replace(
    /&copy; 2026 Online Timetable Creator\. All rights reserved\./g,
    '&copy; 2026 Timetable Creator. All rights reserved.'
  );

  fs.writeFileSync(bFile, content, 'utf8');
  console.log(`Updated blog page: ${bFile} (${canonical})`);
}

// 5. Update public/sitemap.html hreflangs
if (fs.existsSync('public/sitemap.html')) {
  let sitemapHtml = fs.readFileSync('public/sitemap.html', 'utf8');
  sitemapHtml = replaceOrInsertHreflangs(sitemapHtml, 'https://timetablecreator.online/sitemap.html');
  fs.writeFileSync('public/sitemap.html', sitemapHtml, 'utf8');
  console.log('Updated sitemap.html hreflangs');
}

// 6. NOW GENERATE ALL LANGUAGE URL VERSIONS
// Every page gets a version for each language!
const pagesToVersion = [
  {
    sourceFile: 'index.html',
    destDir: 'public', // public/en/index.html, public/fr/index.html, etc.
    canonicalBase: 'https://timetablecreator.online/'
  },
  {
    sourceFile: 'public/timetable-generator-online-for-students/index.html',
    destDir: 'public/timetable-generator-online-for-students',
    canonicalBase: 'https://timetablecreator.online/timetable-generator-online-for-students/'
  },
  {
    sourceFile: 'public/timetable-generator/index.html',
    destDir: 'public/timetable-generator',
    canonicalBase: 'https://timetablecreator.online/timetable-generator/'
  },
  {
    sourceFile: 'public/sitemap.html',
    destDir: 'public/sitemap',
    canonicalBase: 'https://timetablecreator.online/sitemap.html'
  }
];

// Add all blog pages to pagesToVersion
for (const bFile of blogFiles) {
  const dir = path.dirname(bFile);
  let rel = path.relative('public', bFile).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (!rel.startsWith('/')) rel = '/' + rel;
  if (!rel.endsWith('/')) rel = rel + '/';
  pagesToVersion.push({
    sourceFile: bFile,
    destDir: dir,
    canonicalBase: baseUrl + rel
  });
}

console.log(`\nGenerating language versions for ${pagesToVersion.length} base pages across 12 languages...`);

let generatedCount = 0;

for (const page of pagesToVersion) {
  if (!fs.existsSync(page.sourceFile)) continue;
  const sourceHtml = fs.readFileSync(page.sourceFile, 'utf8');

  for (const lang of languages) {
    const cleanBase = page.canonicalBase.replace(/\/$/, '');
    const pageLangUrl = `${cleanBase}/${lang.code}`;
    const targetDir = path.join(page.destDir, lang.code);
    fs.mkdirSync(targetDir, { recursive: true });

    let langHtml = sourceHtml;

    // Set html lang attribute and optional dir attribute
    const dirAttr = lang.dir ? ` dir="${lang.dir}"` : '';
    langHtml = langHtml.replace(/<html[^>]*>/, `<html lang="${lang.code}"${dirAttr}>`);

    // Set canonical to this specific language URL
    const langCanonicalTag = `<link rel="canonical" href="${pageLangUrl}" />`;
    langHtml = langHtml.replace(/<link rel="canonical"[^>]*>/, langCanonicalTag);

    // Inject immediate auto-translate script in head for instant language activation
    const autoTranslateScript = `
    <!-- Multi-language Auto-Translate for ${lang.name} (${lang.code}) -->
    <script>
      (function() {
        var langCode = "${lang.code}";
        var gtCode = "${lang.gtCode}";
        if (langCode && langCode !== 'en' && langCode !== 'en-GB') {
          document.cookie = "googtrans=/en/" + gtCode + "; path=/; SameSite=None; Secure";
          var domain = window.location.hostname;
          if (domain) {
            document.cookie = "googtrans=/en/" + gtCode + "; path=/; domain=" + domain + "; SameSite=None; Secure";
            var parts = domain.split('.');
            if (parts.length >= 2) {
              document.cookie = "googtrans=/en/" + gtCode + "; path=/; domain=." + parts.slice(-2).join('.') + "; SameSite=None; Secure";
            }
          }
          if (!window.location.hash.includes('googtrans')) {
            window.location.hash = "#googtrans(en|" + gtCode + ")";
          }
        } else {
          document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      })();
    </script>
`;
    // Insert after canonical or right before </head>
    if (langHtml.includes('</head>')) {
      langHtml = langHtml.replace('</head>', autoTranslateScript + '  </head>');
    }

    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, langHtml, 'utf8');
    generatedCount++;
  }
}

console.log(`Successfully generated ${generatedCount} multilingual pages!`);
