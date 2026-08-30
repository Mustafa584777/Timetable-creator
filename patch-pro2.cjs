const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('--row-height-base: 44px;', '--row-height-base: 58px;'); 

fs.writeFileSync('index.html', html);
