const fs = require('fs');
const path = require('path');
const { SUPPORTED_LANGS, runAllUpdates } = require('./scripts/update_seo_i18n.cjs');
const { updateSitemapFile } = require('./scripts/sitemap_generator.cjs');

// Run SEO and clean i18n update on all source files first
runAllUpdates();

const languages = SUPPORTED_LANGS.map(l => ({
  code: l.code,
  name: l.label,
  gtCode: l.code === 'en-GB' || l.code === 'en' ? 'en' : l.code,
  isDefault: l.isDefault || false
}));

const baseUrl = 'https://timetablecreator.online';

// Helper to remove obsolete directories (ru, ar, zh)
const obsoleteLangs = ['ru', 'ar', 'zh'];
function cleanObsoleteDirs(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (obsoleteLangs.includes(entry.name)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Cleaned obsolete directory: ${fullPath}`);
      } else {
        cleanObsoleteDirs(fullPath);
      }
    }
  }
}

cleanObsoleteDirs('public');

// Collect all base pages to generate language variants for
function getBlogFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
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

const pagesToVersion = [
  {
    sourceFile: 'index.html',
    destDir: 'public',
    canonicalBase: 'https://timetablecreator.online/'
  },
  {
    sourceFile: 'public/timetable-generator-online-for-students/index.html',
    destDir: 'public/timetable-generator-online-for-students',
    canonicalBase: 'https://timetablecreator.online/timetable-generator-online-for-students/'
  },
  {
    sourceFile: 'public/how-to-use/index.html',
    destDir: 'public/how-to-use',
    canonicalBase: 'https://timetablecreator.online/how-to-use/'
  },
  {
    sourceFile: 'public/faqs/index.html',
    destDir: 'public/faqs',
    canonicalBase: 'https://timetablecreator.online/faqs/'
  },
  {
    sourceFile: 'public/html-sitemap/index.html',
    destDir: 'public/html-sitemap',
    canonicalBase: 'https://timetablecreator.online/html-sitemap/'
  }
];

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

console.log(`\nGenerating language versions for ${pagesToVersion.length} base pages across 10 languages...`);

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

    // Set html lang attribute
    langHtml = langHtml.replace(/<html(\s+[^>]*)?>/i, (match) => {
      let m = match.replace(/\blang="[^"]*"/, `lang="${lang.code}"`);
      if (!m.includes('lang=')) m = m.replace('<html', `<html lang="${lang.code}"`);
      return m;
    });

    // Set canonical to this specific clean language URL
    const langCanonicalTag = `<link rel="canonical" href="${pageLangUrl}" />`;
    langHtml = langHtml.replace(/<link rel="canonical"[^>]*>/, langCanonicalTag);

    // Inject clean auto-translate script in head (NO #googtrans hash!)
    const autoTranslateScript = `
    <!-- Multi-language Auto-Translate for ${lang.name} (${lang.code}) -->
    <script>
      (function() {
        // Clean any hash that might exist or get appended
        function cleanGoogtransHash() {
          if (window.location.hash && window.location.hash.indexOf('googtrans') !== -1) {
            try {
              history.replaceState(null, '', window.location.pathname + window.location.search);
            } catch(e) {}
          }
        }
        cleanGoogtransHash();
        window.addEventListener('hashchange', cleanGoogtransHash);
        var _hTimer = setInterval(cleanGoogtransHash, 400);
        setTimeout(function() { clearInterval(_hTimer); }, 8000);

        var langCode = "${lang.code}";
        var gtCode = "${lang.gtCode}";
        if (langCode && langCode !== 'en-GB') {
          document.cookie = "googtrans=/en/" + gtCode + "; path=/; SameSite=None; Secure";
          var domain = window.location.hostname;
          if (domain) {
            document.cookie = "googtrans=/en/" + gtCode + "; path=/; domain=" + domain + "; SameSite=None; Secure";
            var parts = domain.split('.');
            if (parts.length >= 2) {
              document.cookie = "googtrans=/en/" + gtCode + "; path=/; domain=." + parts.slice(-2).join('.') + "; SameSite=None; Secure";
            }
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

console.log(`Successfully generated ${generatedCount} clean multilingual pages!`);

// Generate complete updated multilingual sitemap.xml
updateSitemapFile('public/sitemap.xml');
console.log('Successfully updated multilingual public/sitemap.xml');
