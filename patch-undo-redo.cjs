const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regexGroup = /\.classic-undo-redo-group\s*\{[\s\S]*?\}/;
const replacementGroup = `.classic-undo-redo-group {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0;
      }`;
html = html.replace(regexGroup, replacementGroup);

const regexBtn = /\.classic-undo-redo-group\s*\.classic-btn-mini\s*\{[\s\S]*?\}/;
const replacementBtn = `.classic-undo-redo-group .classic-btn-mini {
        border: 1px solid var(--border-color) !important;
        background: var(--bg-card) !important;
        padding: 0 6px;
        height: 24px;
        font-size: 11px;
        gap: 4px;
        color: var(--text-main) !important;
        box-shadow: var(--shadow-sm) !important;
        border-radius: 6px;
      }`;
html = html.replace(regexBtn, replacementBtn);

fs.writeFileSync('index.html', html);
