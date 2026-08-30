const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- Color Palette -->\s*<div class="classic-cfg-item">\s*<span class="classic-cfg-label">Color Theme:<\/span>[\s\S]*?<!-- Action Backup & Clear -->/;
if (regex.test(html)) {
    html = html.replace(regex, '<!-- Action Backup & Clear -->');
    fs.writeFileSync('index.html', html);
    console.log("Fixed classic theme.");
} else {
    console.log("Could not match classic theme regex.");
}

