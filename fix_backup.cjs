const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<button class="classic-btn-cfg-action classic-btn-cfg-export"[\s\S]*?<\/button>/;
html = html.replace(regex, '');
fs.writeFileSync('index.html', html);
