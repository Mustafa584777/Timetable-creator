const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sunPath = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
const moonPath = '<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';

html = html.replace(
  /<svg id="themeToggleIconHeader"[\s\S]*?>[\s\S]*?<\/svg>/,
  `<svg id="themeToggleIconHeader" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20">${sunPath}</svg>`
);

fs.writeFileSync('index.html', html);
