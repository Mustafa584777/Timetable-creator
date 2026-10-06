const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const updated = content.replace(
  '<html lang="en" data-preset="amber">',
  '<html lang="en" data-theme="dark" data-preset="amber">'
);
fs.writeFileSync('index.html', updated);

const content2 = fs.readFileSync('public/timetable-generator-online-for-students/index.html', 'utf8');
const updated2 = content2.replace(
  '<html lang="en" data-preset="amber">',
  '<html lang="en" data-theme="dark" data-preset="amber">'
);
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', updated2);

console.log('patched theme');
