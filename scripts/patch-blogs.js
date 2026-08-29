import fs from 'fs';
import path from 'path';

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const blogFiles = getAllHtmlFiles('public/blog');
console.log(`Found ${blogFiles.length} blog HTML files to process.`);

blogFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Get canonical link
  const canonicalMatch = content.match(/<link rel="canonical" href="(.*?)" \/>/);
  const canonicalUrl = canonicalMatch ? canonicalMatch[1] : '';

  if (canonicalUrl) {
    // Check if zh hreflang is present
    if (!content.includes('hreflang="zh"') || !content.includes('hreflang="zh-Hans"')) {
      const cleanUrl = canonicalUrl.endsWith('/') ? canonicalUrl : canonicalUrl + '/';
      const zhHreflang = `    <link rel="alternate" hreflang="zh" href="${cleanUrl}?lang=zh-CN" />\n    <link rel="alternate" hreflang="zh-Hans" href="${cleanUrl}?lang=zh-CN" />\n`;
      
      if (content.includes('hreflang="hi"')) {
        content = content.replace(/(<link rel="alternate" hreflang="hi"[^>]*\/>\n?)/, `$1${zhHreflang}`);
        modified = true;
      } else if (content.includes('</head>')) {
        const fullHreflangs = `    <link rel="alternate" hreflang="x-default" href="${cleanUrl}" />
    <link rel="alternate" hreflang="en" href="${cleanUrl}" />
    <link rel="alternate" hreflang="es" href="${cleanUrl}?lang=es" />
    <link rel="alternate" hreflang="fr" href="${cleanUrl}?lang=fr" />
    <link rel="alternate" hreflang="de" href="${cleanUrl}?lang=de" />
    <link rel="alternate" hreflang="ru" href="${cleanUrl}?lang=ru" />
    <link rel="alternate" hreflang="ar" href="${cleanUrl}?lang=ar" />
    <link rel="alternate" hreflang="hi" href="${cleanUrl}?lang=hi" />
    <link rel="alternate" hreflang="zh" href="${cleanUrl}?lang=zh-CN" />
    <link rel="alternate" hreflang="zh-Hans" href="${cleanUrl}?lang=zh-CN" />\n`;
        content = content.replace('</head>', `${fullHreflangs}</head>`);
        modified = true;
      }
    }
  }

  // 2. Add Mandarin to lang-dropdown-menu if not present
  if (content.includes('changeLanguage(\'hi\')') && !content.includes('changeLanguage(\'zh-CN\')')) {
    content = content.replace(
      /(<button class="lang-dropdown-item"[^>]*onclick="changeLanguage\('hi'\)"[^>]*>.*?<\/button>)/,
      `$1\n              <button class="lang-dropdown-item" onclick="changeLanguage('zh-CN')">中文 (Mandarin)</button>`
    );
    modified = true;
  }

  // 3. Update googleTranslateElementInit
  if (content.includes("includedLanguages: 'en,es,fr,de,ru,ar,hi'") || content.includes('includedLanguages: "en,es,fr,de,ru,ar,hi"')) {
    content = content.replace(
      /includedLanguages:\s*['"]en,es,fr,de,ru,ar,hi['"]/,
      "includedLanguages: 'en,es,fr,de,ru,ar,hi,zh-CN'"
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
});

console.log("Blog patching complete!");
