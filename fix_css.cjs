const fs = require('fs');
const files = [
  'index.html',
  'public/timetable-generator-online-for-students/index.html'
];
files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/--primary-color:\s*var\(--primary-color\);/g, '--primary-color: #673de6;');
  content = content.replace(/--theme-accent:\s*var\(--primary-color\);/g, '--theme-accent: #673de6;');
  content = content.replace(/--theme-badge-bg:\s*var\(--primary-color\);/g, '--theme-badge-bg: #673de6;');
  content = content.replace(/--evt-color-1:\s*var\(--primary-color\);/g, '--evt-color-1: #673de6;');
  fs.writeFileSync(file, content, 'utf8');
});
