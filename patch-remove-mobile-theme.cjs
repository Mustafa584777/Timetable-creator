const fs = require('fs');

function patchFile(filepath) {
  let html = fs.readFileSync(filepath, 'utf8');

  // Remove theme option from mobile menu
  html = html.replace(/<!-- Theme mode toggle in mobile menu -->[\s\S]*?Theme Mode Toggle\s*<\/button>/, '');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
if (fs.existsSync('public/timetable-generator-online-for-students/index.html')) {
  patchFile('public/timetable-generator-online-for-students/index.html');
}
