const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove PDF icon next to Template
const pdfBtnStr = '<button class="classic-icon-btn classic-btn-pdf" onclick="app.handlers.savePdf()" title="Export PDF Document" aria-label="Export PDF">';
const startIdx = html.indexOf(pdfBtnStr);
if (startIdx !== -1) {
  const endIdx = html.indexOf('</button>', startIdx);
  if (endIdx !== -1) {
    html = html.substring(0, startIdx) + html.substring(endIdx + 9);
  }
}

// 2. Default to dark theme
html = html.replace('<html lang="en" data-preset="amber">', '<html lang="en" data-preset="amber" data-theme="dark">');

// 2a. Update theme icon to sun
const sunPath = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>';
const themeToggleIconIndex = html.indexOf('id="themeToggleIconHeader"');
if (themeToggleIconIndex !== -1) {
  const svgEndIndex = html.indexOf('</svg>', themeToggleIconIndex);
  const pathStartIndex = html.indexOf('<path', themeToggleIconIndex);
  if (pathStartIndex !== -1 && pathStartIndex < svgEndIndex) {
    html = html.substring(0, pathStartIndex) + sunPath + html.substring(svgEndIndex);
  }
}

// 3. Move Grid resize and reset options after download icons horizontally, and change Grid resize to a checkbox style
const unified1Idx = html.indexOf('<div class="unified-controls-container" style="display: flex; gap: 12px; margin-top: 12px;');
if (unified1Idx !== -1) {
  const unified1EndIdx = html.indexOf('</div>          </div>', unified1Idx);
  let unified1 = html.substring(unified1Idx, unified1EndIdx);
  
  // Transform it
  // Find group 1 and group 2
  const g1Start = unified1.indexOf('<div style="display: flex; gap: 8px; flex-wrap: wrap;">');
  const g1End = unified1.indexOf('</div>', g1Start + 1) + 6;
  const g2Start = unified1.indexOf('<div style="display: flex; gap: 8px; flex-wrap: wrap;">', g1End);
  const g2End = unified1.indexOf('</div>', g2Start + 1) + 6;
  
  if (g1Start !== -1 && g2Start !== -1) {
    let group1 = unified1.substring(g1Start, g1End);
    let group2 = unified1.substring(g2Start, g2End);
    
    // Change Grid Resize button to checkbox in group1
    group1 = group1.replace(/<button id="toggleResizersBtn"[^>]*>([\s\S]*?)<\/button>/, 
      `<label class="btn-ctrl toggle-resizers-label" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 0 12px;">
         <input type="checkbox" checked onchange="app.handlers.toggleResizers()" style="width: 14px; height: 14px; cursor: pointer;">
         <span class="btn-label-text">Enable Grid Resizing</span>
       </label>`);
       
    const beforeG1 = unified1.substring(0, g1Start);
    const betweenG1G2 = unified1.substring(g1End, g2Start);
    const afterG2 = unified1.substring(g2End);
    
    // Swap them!
    const newUnified1 = beforeG1 + group2 + betweenG1G2 + group1 + afterG2;
    html = html.substring(0, unified1Idx) + newUnified1 + html.substring(unified1EndIdx);
  }
}

// Sync checkbox logic
html = html.replace(/const textContent = app\.state\.resizersDisabled \? 'Enable Grid Resizing' : 'Disable Grid Resizing';\s*document\.querySelectorAll\('\.btn-label-text'\)\.forEach\(el => \{\s*el\.textContent = textContent;\s*\}\);/g, 
  `const textContent = app.state.resizersDisabled ? 'Enable Grid Resizing' : 'Disable Grid Resizing';
            document.querySelectorAll('.btn-label-text').forEach(el => {
              el.textContent = textContent;
            });
            document.querySelectorAll('.toggle-resizers-label input').forEach(el => {
              el.checked = !app.state.resizersDisabled;
            });`);


// 5. Icons hover over card fix
// Instead of regex that might fail, I'll do exact string replace for `.classic-event-item`
const oldEventItemCss = `.classic-event-item {
        position: absolute;
        left: 3px;
        right: 3px;
        border-radius: 6px;
        padding: 6px 8px;
        color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 15;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        user-select: none;
      }`;
const newEventItemCss = `.classic-event-item {
        position: absolute;
        left: 3px;
        right: 3px;
        border-radius: 6px;
        padding: 6px 8px;
        color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 15;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        user-select: none;
      }`;
html = html.replace(oldEventItemCss, newEventItemCss);

const oldToolsCss = `.classic-event-tools {
        display: none;
        align-items: center;
        gap: 2px;
      }`;
const newToolsCss = `.classic-event-tools {
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
      }`;
html = html.replace(oldToolsCss, newToolsCss);

html = html.replace('.classic-event-item:hover .classic-event-tools {\n        display: flex;\n      }', `.classic-event-item:hover .classic-event-tools {\n        display: flex;\n      }\n      .classic-event-details {\n        overflow: hidden;\n      }`);

// Change duplicate icon
html = html.replace(/<path d="M12 5v14M5 12h14"><\/path>/g, '<rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>');

// Change .classic-evt-btn styling
const oldEvtBtnCss = `.classic-evt-btn {
        background: rgba(0, 0, 0, 0.35);
        border: none;
        border-radius: 4px;
        color: #ffffff;
        padding: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }`;
const newEvtBtnCss = `.classic-evt-btn {
        background: transparent;
        border: none;
        border-radius: 4px;
        color: var(--text-main);
        padding: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }`;
html = html.replace(oldEvtBtnCss, newEvtBtnCss);

html = html.replace('.classic-evt-btn:hover {\n        background: rgba(0, 0, 0, 0.5);\n      }', `.classic-evt-btn:hover {\n        background: var(--bg-hover);\n      }`);

// 6. Fix `wrap_classicConfigDays` and `wrap_configDays`
// In classic:
html = html.replace(/<div class="custom-dropdown-option" data-value="1" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '1', '1 Day', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">1 Day<\/div>/,
  `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '1', '1 Day (Mon)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">1 Day (Mon)</div>`);
html = html.replace(/<div class="custom-dropdown-option" data-value="2" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '2', '2 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">2 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '2', '2 Days (Mon - Tue)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">2 Days (Mon - Tue)</div>`);
html = html.replace(/<div class="custom-dropdown-option" data-value="3" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '3', '3 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">3 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '3', '3 Days (Mon - Wed)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">3 Days (Mon - Wed)</div>`);
html = html.replace(/<div class="custom-dropdown-option" data-value="4" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '4', '4 Days', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">4 Days<\/div>/,
  `<div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '4', '4 Days (Mon - Thu)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">4 Days (Mon - Thu)</div>`);
html = html.replace(/<div class="custom-dropdown-option" data-value="5" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays', '5', this.querySelector\('\.custom-drop-item-content'\)\.innerHTML, 'wrap_classicConfigDays', function\(\)\{ app\.handlers\.classicConfigChange\(\); \}\)">\s*<div class="custom-drop-item-content">[\s\S]*?<span>Mon - Fri \(5 Days\)<\/span>\s*<\/div>\s*<\/div>/,
  `<div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '5', 'Mon - Fri (5 Days)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">Mon - Fri (5 Days)</div>`);
html = html.replace(/<div class="custom-dropdown-option" data-value="6" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays', '6', this.querySelector\('\.custom-drop-item-content'\)\.innerHTML, 'wrap_classicConfigDays', function\(\)\{ app\.handlers\.classicConfigChange\(\); \}\)">\s*<div class="custom-drop-item-content">[\s\S]*?<span>Mon - Sat \(6 Days\)<\/span>\s*<\/div>\s*<\/div>/,
  `<div class="custom-dropdown-option" data-value="6" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '6', 'Mon - Sat (6 Days)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">Mon - Sat (6 Days)</div>`);
html = html.replace(/<div class="custom-dropdown-option selected" data-value="7" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays', '7', this.querySelector\('\.custom-drop-item-content'\)\.innerHTML, 'wrap_classicConfigDays', function\(\)\{ app\.handlers\.classicConfigChange\(\); \}\)">\s*<div class="custom-drop-item-content">[\s\S]*?<span>Mon - Sun \(7 Days\)<\/span>\s*<\/div>\s*<\/div>/,
  `<div class="custom-dropdown-option selected" data-value="7" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '7', 'Mon - Sun (7 Days)', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">Mon - Sun (7 Days)</div>`);


// Now fix `wrap_configStart` which contains the broken `classicConfigDays` divs!
const wrapConfigStartIdx = html.indexOf('id="wrap_configStart"');
if (wrapConfigStartIdx !== -1) {
  const customMenuIdx = html.indexOf('<div class="custom-dropdown-menu">', wrapConfigStartIdx);
  const data360Idx = html.indexOf('<div class="custom-dropdown-option" data-value="360"', customMenuIdx);
  if (customMenuIdx !== -1 && data360Idx !== -1 && data360Idx > customMenuIdx) {
    const badPart = html.substring(customMenuIdx + '<div class="custom-dropdown-menu">'.length, data360Idx);
    html = html.replace(badPart, '\n                    ');
  }
}

// In Pro: add 1..4 days
html = html.replace(/<div class="custom-dropdown-option" data-value="5" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '5', 'Weekdays \(Mon - Fri\)', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">Weekdays \(Mon - Fri\)<\/div>/,
  `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day (Mon)', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day (Mon)</div>
                  <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days (Mon - Tue)', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days (Mon - Tue)</div>
                  <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days (Mon - Wed)', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days (Mon - Wed)</div>
                  <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days (Mon - Thu)', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days (Mon - Thu)</div>
                  <div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('configDays', '5', 'Weekdays (Mon - Fri)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Weekdays (Mon - Fri)</div>`);

fs.writeFileSync('index.html', html);
