const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Hover popup icons
html = html.replace('cursor: pointer;\n        overflow: hidden;', 
`cursor: pointer;\n        /* overflow: hidden; */`);

// Wait, the previous replace failed because it didn't match perfectly. Let's just do a simple replace on the exact text.
let newHtml = html.replace('overflow: hidden;\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 15;', 
`/* overflow: hidden; */\n        display: flex;\n        flex-direction: column;\n        gap: 2px;\n        z-index: 15;`);

const oldToolsCss = `.classic-event-tools {
        display: none;
        align-items: center;
        gap: 4px;
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
newHtml = newHtml.replace(oldToolsCss, newToolsCss);

// duplicate icon change
newHtml = newHtml.replace(
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"></path></svg>',
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 7v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2z"></path><path d="M4 17a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"></path></svg>'
);

fs.writeFileSync('index.html', newHtml);
