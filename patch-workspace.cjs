const fs = require('fs');

function patchFile(filepath) {
  let html = fs.readFileSync(filepath, 'utf8');

  html = html.replace('.workspace {\n        flex: 1;\n        overflow-y: auto;',
    '.workspace {\n        flex: 1;\n        overflow-y: auto;\n        display: flex;\n        flex-direction: column;');

  html = html.replace('.workspace {\n          padding: 12px 8px;\n          padding-bottom: 90px !important;\n          display: block;',
    '.workspace {\n          padding: 12px 8px;\n          padding-bottom: 90px !important;\n          display: flex;\n          flex-direction: column;');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
if (fs.existsSync('public/timetable-generator-online-for-students/index.html')) {
  patchFile('public/timetable-generator-online-for-students/index.html');
}
