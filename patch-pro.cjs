const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Increase base height for Classic
html = html.replace('const base = 44;', 'const base = 58;'); // ~30% increase

// Change default --row-height in CSS for Pro
html = html.replace('--row-height: 48px;', '--row-height: 62px;'); 

fs.writeFileSync('index.html', html);
