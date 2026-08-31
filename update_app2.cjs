const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove PDF icon next to Template
html = html.replace(/<button class="classic-icon-btn classic-btn-pdf" onclick="app\.handlers\.savePdf\(\)" title="Export PDF Document" aria-label="Export PDF">[\s\S]*?<\/button>/, '');

// 2. Default to dark theme
html = html.replace('<html lang="en" data-preset="amber">', '<html lang="en" data-preset="amber" data-theme="dark">');

// 3. Move Grid resize and reset options after download icons horizontally, and change Grid resize to a checkbox style
// Find the unified-controls-container
const controlsRegex = /<div class="unified-controls-container"([^>]*)>([\s\S]*?)<div style="display: flex; gap: 8px; flex-wrap: wrap;">([\s\S]*?)<\/div>([\s\S]*?)<div style="display: flex; gap: 8px; flex-wrap: wrap;">([\s\S]*?)<\/div>([\s\S]*?)<\/div>/g;

html = html.replace(controlsRegex, function(match, containerAttr, beforeFirstGroup, group1, betweenGroups, group2, afterSecondGroup) {
  // group1 is Grid Resize / Reset
  // group2 is Export buttons
  // We want to place group1 AFTER group2.
  // And change Grid Resize to a checkbox style.
  
  let newGroup1 = group1.replace(/<button id="toggleResizersBtn"[^>]*>([\s\S]*?)<\/button>/, 
    `<label id="toggleResizersBtn" class="btn-ctrl" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 0 12px;">
       <input type="checkbox" checked onchange="app.handlers.toggleResizers()" style="width: 14px; height: 14px; cursor: pointer;">
       <span class="btn-label-text">Enable Grid Resizing</span>
     </label>`);
     
  return `<div class="unified-controls-container"${containerAttr}>${beforeFirstGroup}<div style="display: flex; gap: 8px; flex-wrap: wrap;">${group2}</div>${betweenGroups}<div style="display: flex; gap: 8px; flex-wrap: wrap;">${newGroup1}</div>${afterSecondGroup}</div>`;
});

// 4. Update the Grid resize toggle logic in app state so the checkbox toggles correctly
// The original `toggleResizers` changes `app.state.resizersDisabled`.

fs.writeFileSync('index.html', html);
