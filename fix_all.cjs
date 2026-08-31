const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove PDF icon next to Template
html = html.replace(/<button class="classic-icon-btn classic-btn-pdf" onclick="app\.handlers\.savePdf\(\)" title="Export PDF Document" aria-label="Export PDF">[\s\S]*?<\/button>/, '');

// 2. Default to dark theme
html = html.replace('<html lang="en" data-preset="amber">', '<html lang="en" data-preset="amber" data-theme="dark">');

// 2a. Update theme icon to sun
const sunPath = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
html = html.replace(
  /<svg id="themeToggleIconHeader"[\s\S]*?>[\s\S]*?<\/svg>/,
  `<svg id="themeToggleIconHeader" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20">${sunPath}</svg>`
);

// 3. Move Grid resize and reset options after download icons horizontally, and change Grid resize to a checkbox style
const controlsRegex = /<div class="unified-controls-container"([^>]*)>([\s\S]*?)<div style="display: flex; gap: 8px; flex-wrap: wrap;">([\s\S]*?)<\/div>([\s\S]*?)<div style="display: flex; gap: 8px; flex-wrap: wrap;">([\s\S]*?)<\/div>([\s\S]*?)<\/div>/g;

html = html.replace(controlsRegex, function(match, containerAttr, beforeFirstGroup, group1, betweenGroups, group2, afterSecondGroup) {
  let newGroup1 = group1.replace(/<button id="toggleResizersBtn"[^>]*>([\s\S]*?)<\/button>/, 
    `<label id="toggleResizersBtn" class="btn-ctrl" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 0 12px;">
       <input type="checkbox" checked onchange="app.handlers.toggleResizers()" style="width: 14px; height: 14px; cursor: pointer;">
       <span class="btn-label-text">Enable Grid Resizing</span>
     </label>`);
     
  return `<div class="unified-controls-container"${containerAttr}>${beforeFirstGroup}<div style="display: flex; gap: 8px; flex-wrap: wrap;">${group2}</div>${betweenGroups}<div style="display: flex; gap: 8px; flex-wrap: wrap;">${newGroup1}</div>${afterSecondGroup}</div>`;
});

// Sync checkbox logic
html = html.replace(/const textContent = app\.state\.resizersDisabled \? 'Enable Grid Resizing' : 'Disable Grid Resizing';\s*document\.querySelectorAll\('\.btn-label-text'\)\.forEach\(el => \{\s*el\.textContent = textContent;\s*\}\);/g, 
  `const textContent = app.state.resizersDisabled ? 'Enable Grid Resizing' : 'Disable Grid Resizing';
            document.querySelectorAll('.btn-label-text').forEach(el => {
              el.textContent = textContent;
            });
            document.querySelectorAll('#toggleResizersBtn input').forEach(el => {
              el.checked = !app.state.resizersDisabled;
            });`);

// 5. Icons hover over card fix
html = html.replace(/\.classic-event-item \{\s*position: absolute;[\s\S]*?user-select: none;\s*\}/, function(match) {
  return match.replace(/overflow: hidden;/, '');
});

html = html.replace(/\.classic-event-tools \{\s*display: none;\s*align-items: center;\s*gap: 2px;\s*\}/, 
  `.classic-event-tools {
        display: none;
        position: absolute;
        top: -30px;
        right: 0;
        background: var(--bg-panel);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        padding: 4px;
        align-items: center;
        gap: 4px;
        z-index: 50;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }`);

html = html.replace(/\.classic-event-item:hover \.classic-event-tools \{\s*display: flex;\s*\}/, 
  `.classic-event-item:hover .classic-event-tools {
        display: flex;
      }
      .classic-event-details {
        overflow: hidden;
      }`);

// Change duplicate icon
html = html.replace(/<path d="M12 5v14M5 12h14"><\/path>/g, '<rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>');

// Change .classic-evt-btn styling
html = html.replace(/\.classic-evt-btn \{\s*background: rgba\(0, 0, 0, 0\.35\);\s*border: none;[\s\S]*?justify-content: center;\s*\}/, 
  `.classic-evt-btn {
        background: transparent;
        border: none;
        border-radius: 4px;
        color: var(--text-main);
        padding: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }`);

html = html.replace(/\.classic-evt-btn:hover \{\s*background: rgba\(0, 0, 0, 0\.5\);\s*\}/,
  `.classic-evt-btn:hover {
        background: var(--bg-hover);
      }`);

// 6. Fix `wrap_classicConfigDays` and `wrap_configDays`
// wrap_classicConfigDays logic
html = html.replace(
  /<div class="custom-dropdown-option" data-value="1" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '1', '1 Day', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">1 Day<\/div>/,
  `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '1', '1 Day', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">1 Day</div>`
);
html = html.replace(
  /<div class="custom-dropdown-option" data-value="2" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '2', '2 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">2 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '2', '2 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">2 Days</div>`
);
html = html.replace(
  /<div class="custom-dropdown-option" data-value="3" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '3', '3 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">3 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '3', '3 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">3 Days</div>`
);
html = html.replace(
  /<div class="custom-dropdown-option" data-value="4" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '4', '4 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">4 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '4', '4 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">4 Days</div>`
);

// We need to carefully remove the bad block in wrap_configStart:
// The block is between `<div class="custom-dropdown-menu">` inside `wrap_configStart` and `06:00`.
html = html.replace(
  /<div class="custom-dropdown-menu">\s*<div class="custom-dropdown-option" data-value="1" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays'[\s\S]*?<span>4 Days<\/span>\s*<\/div>\s*<\/div>\s*(<div class="custom-dropdown-option" data-value="360")/g,
  '<div class="custom-dropdown-menu">\n                    $1'
);

// Add 1, 2, 3, 4 days to wrap_configDays (before "5")
html = html.replace(
  /<div class="custom-dropdown-option" data-value="5" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '5', 'Weekdays \(Mon - Fri\)', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">Weekdays \(Mon - Fri\)<\/div>/,
  `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day</div>
                  <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days</div>
                  <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days</div>
                  <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days</div>
                  <div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('configDays', '5', 'Weekdays (Mon - Fri)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Weekdays (Mon - Fri)</div>`
);

fs.writeFileSync('index.html', html);
