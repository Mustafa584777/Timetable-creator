const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldToolsCss = `.classic-event-tools {
        display: none;
        align-items: center;
        gap: 2px;
      }`;
const newToolsCss = `.classic-event-tools {
        display: none;
        position: absolute;
        top: -30px;
        right: 0px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 4px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        gap: 4px;
        z-index: 100;
        align-items: center;
      }`;
html = html.replace(oldToolsCss, newToolsCss);

fs.writeFileSync('index.html', html);
