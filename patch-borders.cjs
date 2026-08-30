const fs = require('fs');

function patchFile(filepath) {
  let html = fs.readFileSync(filepath, 'utf8');

  // Change border-collapse to collapse
  html = html.replace('border-collapse: separate;\n        border-spacing: 0;\n        table-layout: fixed;',
    'border-collapse: collapse !important;\n        border-spacing: 0;\n        table-layout: fixed;');

  // For the PRO timetable grid (it uses div maybe? Or table?)
  html = html.replace('display: table;\n        border-collapse: separate;',
    'display: table;\n        border-collapse: collapse !important;');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
if (fs.existsSync('public/timetable-generator-online-for-students/index.html')) {
  patchFile('public/timetable-generator-online-for-students/index.html');
}
