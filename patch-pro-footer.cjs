const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let html = fs.readFileSync(filepath, 'utf8');

  // Regex replacement for seo-landing-container to add flex-grow: 1, display: flex, flex-direction: column
  html = html.replace(/\.seo-landing-container\s*\{[\s\S]*?padding:\s*40px\s+24px;/,
    `$&
        flex-grow: 1;
        display: flex;
        flex-direction: column;`);
  
  html = html.replace(/\.seo-landing-container\s*\{[\s\S]*?padding:\s*48px\s+24px;/,
    `$&
        flex-grow: 1;
        display: flex;
        flex-direction: column;`);

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
patchFile('public/timetable-generator-online-for-students/index.html');
