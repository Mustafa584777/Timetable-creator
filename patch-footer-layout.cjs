const fs = require('fs');

function patchFile(filepath) {
  let html = fs.readFileSync(filepath, 'utf8');

  // Ensure classic-container expands
  html = html.replace('.classic-container {\n        max-width: 1440px;\n        margin: 0 auto;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        gap: 16px;\n      }', 
    '.classic-container {\n        max-width: 1440px;\n        margin: 0 auto;\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        gap: 16px;\n        flex-grow: 1;\n      }');

  // Also in main-content, we need it to expand
  if (html.includes('<main class="main-content">')) {
     // Check what wraps the footer inside main-content (or app-container)
     // Actually, seo-landing-container wraps the footer for PRO mode.
     html = html.replace('.seo-landing-container {\n        padding: 48px 24px;\n        max-width: 1150px;\n        margin: 0 auto;',
       '.seo-landing-container {\n        padding: 48px 24px 0 24px;\n        max-width: 1150px;\n        margin: 0 auto;\n        flex-grow: 1;\n        display: flex;\n        flex-direction: column;');
     html = html.replace('.seo-landing-container {\n        padding: 48px 24px;\n        max-width: 1150px;\n        margin: 0 auto;\n      }',
       '.seo-landing-container {\n        padding: 48px 24px 0 24px;\n        max-width: 1150px;\n        margin: 0 auto;\n        flex-grow: 1;\n        display: flex;\n        flex-direction: column;\n      }');
  }
  
  // Ensure footer has margin-top: auto
  html = html.replace(/margin-top:\s*auto\s*;/g, 'margin-top: auto !important;');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
if (fs.existsSync('public/timetable-generator-online-for-students/index.html')) {
  patchFile('public/timetable-generator-online-for-students/index.html');
}
