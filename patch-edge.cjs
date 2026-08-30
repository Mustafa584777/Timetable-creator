const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let html = fs.readFileSync(filepath, 'utf8');

  html = html.replace('.classic-event-item.edge-left .classic-event-tools {\n        left: 0 !important;\n        right: auto !important;\n      }', '');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
patchFile('public/timetable-generator-online-for-students/index.html');
