const fs = require('fs');

const files = [
  'index.html',
  'public/timetable-generator/index.html',
  'public/timetable-generator-online-for-students/index.html'
];

let mainHtml = fs.readFileSync('index.html', 'utf8');
const footerStartStr = '<footer class="seo-footer">';
const footerEndStr = '</footer>';

const footerStart = mainHtml.indexOf(footerStartStr);
const footerEnd = mainHtml.indexOf(footerEndStr, footerStart) + footerEndStr.length;

if (footerStart === -1 || footerEnd === -1) {
  console.log("Could not find footer in index.html");
  process.exit(1);
}

const universalFooter = mainHtml.substring(footerStart, footerEnd);

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Zoom out mobile
  content = content.replace(
    /<meta\s+name="viewport"\s+content="width=device-width,\s*initial-scale=1\.0"\s*\/>/g,
    '<meta name="viewport" content="width=device-width, initial-scale=0.67" />'
  );

  // 2. Add Mandarin to hreflang
  const hreflangHi = '<link rel="alternate" hreflang="hi" href="https://timetablecreator.online/?lang=hi" />';
  if (!content.includes('hreflang="zh-CN"')) {
    content = content.replace(
      hreflangHi,
      hreflangHi + '\n    <link rel="alternate" hreflang="zh-CN" href="https://timetablecreator.online/?lang=zh-CN" />'
    );
  }

  // 3. Add Mandarin to Translate dropdown
  const langHiMenu = `<button class="lang-dropdown-item" onclick="changeLanguage('hi')">हिन्दी (Hindi)</button>`;
  if (!content.includes("zh-CN") && content.includes(langHiMenu)) {
    content = content.replace(
      langHiMenu,
      langHiMenu + `\n              <button class="lang-dropdown-item" onclick="changeLanguage('zh-CN')">中文 (Mandarin)</button>`
    );
  }
  
  // Also add it to google translate init if it exists
  content = content.replace(
    /includedLanguages:\s*'en,es,fr,de,ru,ar,hi'/,
    "includedLanguages: 'en,es,fr,de,ru,ar,hi,zh-CN'"
  );

  // 4. Restore Universal Footer
  const fStart = content.indexOf(footerStartStr);
  const fEnd = content.indexOf(footerEndStr, fStart) + footerEndStr.length;

  if (fStart !== -1 && fEnd !== -1) {
    content = content.substring(0, fStart) + universalFooter + content.substring(fEnd);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log("Updated", file);
}
