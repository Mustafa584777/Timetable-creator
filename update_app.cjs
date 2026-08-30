const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change HTML tag to have data-preset="amber"
html = html.replace(/<html lang="en">/, '<html lang="en" data-preset="amber">');

// 2. Change all config defaults to 'amber'
html = html.replace(/theme: 'slate'/g, "theme: 'amber'");
html = html.replace(/c\.theme = c\.theme \|\| 'slate';/g, "c.theme = c.theme || 'amber';");

// 3. Remove Classic Theme Palette Block
const classicThemeStart = html.indexOf('<div class="classic-cfg-item">\n              <span class="classic-cfg-label">Color Theme:</span>');
if (classicThemeStart !== -1) {
    // Find the end of this block
    // It's followed by `</div>\n            </div>\n\n            <!-- Start Time -->` but there are 3 closing divs in that block
    const blockRegex = /<div class="classic-cfg-item">\s*<span class="classic-cfg-label">Color Theme:<\/span>[\s\S]*?<!-- Start Time -->/;
    html = html.replace(blockRegex, '<!-- Start Time -->');
}

// 4. Remove Pro Theme Palette Block
const proThemeRegex = /<div class="form-group">\s*<label for="configTheme">Theme Palette<\/label>[\s\S]*?<div class="tuning-sliders">/;
if (proThemeRegex.test(html)) {
    html = html.replace(proThemeRegex, '<div class="tuning-sliders">');
}

// 5. Remove classic-btn-theme button
const classicBtnThemeRegex = /<button class="classic-icon-btn classic-btn-theme"[\s\S]*?<\/button>/;
html = html.replace(classicBtnThemeRegex, '');

// Also remove original Export PNG and Export Print from Classic Toolbar since we're moving them
const classicBtnPngRegex = /<button class="classic-icon-btn classic-btn-png"[\s\S]*?<\/button>/;
html = html.replace(classicBtnPngRegex, '');
const classicBtnPrintRegex = /<button class="classic-icon-btn classic-btn-print"[\s\S]*?<\/button>/;
html = html.replace(classicBtnPrintRegex, '');


// 6. Replace Classic resize controls with the new Unified Container
const classicResizeRegex = /<div style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: flex-end; flex-wrap: wrap;">\s*<button id="toggleResizersBtn"[\s\S]*?<\/button>\s*<\/div>/;
const classicUnifiedContainer = `          <div class="unified-controls-container" style="display: flex; gap: 12px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--bg-card); padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color);">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button id="toggleResizersBtn" class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 12px; height: 32px; margin: 0; display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span class="btn-label-text">Disable Grid Resizing</span>
              </button>
              <button class="btn-ctrl" onclick="app.handlers.resetGridSize()" style="font-size: 12px; height: 32px; margin: 0; display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Reset Grid Size</span>
              </button>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="classic-icon-btn classic-btn-png" onclick="app.handlers.downloadImage()" title="Download High-Res Image" aria-label="Download Image" style="height: 32px; border-radius: 6px;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span class="classic-btn-label">PNG</span>
              </button>
              <button class="classic-icon-btn classic-btn-print" onclick="app.handlers.printTimetable()" title="Print Timetable" aria-label="Print" style="height: 32px; border-radius: 6px;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                <span class="classic-btn-label">Print</span>
              </button>
            </div>
          </div>`;
html = html.replace(classicResizeRegex, classicUnifiedContainer);

// 7. Remove the Pro export options bar
const proExportBarRegex = /<!-- Export, Print & Share Options Bar \(Horizontal\) -->\s*<div class="export-options-bar" id="exportOptionsBar">[\s\S]*?<\/div>\s*<\/div>/;
html = html.replace(proExportBarRegex, '');

// 8. Replace Pro resize controls with the new Unified Container
const proResizeRegex = /<div style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: flex-end; flex-wrap: wrap;">\s*<button id="toggleResizersBtnPro"[\s\S]*?<\/button>\s*<\/div>/;
const proUnifiedContainer = `          <div class="unified-controls-container" style="display: flex; gap: 12px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--bg-card); padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color);">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button id="toggleResizersBtnPro" class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span class="btn-label-text">Disable Grid Resizing</span>
              </button>
              <button class="btn-ctrl" onclick="app.handlers.resetGridSize()" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Reset Grid Size</span>
              </button>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="export-btn-item export-btn-print" onclick="app.handlers.printTimetable()" title="Print Timetable" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                <span>Print</span>
              </button>
              <button class="export-btn-item export-btn-pdf" onclick="app.handlers.savePdf()" title="Save as PDF document" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path><path d="M14 3v5h5M9 13h6M9 17h4"></path></svg>
                <span>Save PDF</span>
              </button>
              <button class="export-btn-item export-btn-png" onclick="app.handlers.downloadPng()" title="Download PNG" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>PNG</span>
              </button>
              <button class="export-btn-item export-btn-json" onclick="app.handlers.exportJson()" title="Export JSON" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>JSON</span>
              </button>
            </div>
          </div>`;
html = html.replace(proResizeRegex, proUnifiedContainer);

// Make sure toggle handlers update the inner span instead of the whole button text which wipes out the icon
// Replace the toggleResizers handler body
const toggleResizersBodyRegex = /toggleResizers\(\) \{([\s\S]*?)\},/;
const newToggleResizersBody = `toggleResizers() {
            app.state.resizersDisabled = !app.state.resizersDisabled;
            
            const btn1 = document.getElementById('toggleResizersBtn');
            const btn2 = document.getElementById('toggleResizersBtnPro');
            const textContent = app.state.resizersDisabled ? 'Enable Grid Resizing' : 'Disable Grid Resizing';
            
            if (app.state.resizersDisabled) {
              document.body.classList.add('resizers-disabled');
            } else {
              document.body.classList.remove('resizers-disabled');
            }
            
            if (btn1) {
              const span = btn1.querySelector('.btn-label-text') || btn1.querySelector('span');
              if (span) span.textContent = textContent;
            }
            if (btn2) {
              const span = btn2.querySelector('.btn-label-text') || btn2.querySelector('span');
              if (span) span.textContent = textContent;
            }
          },`;
html = html.replace(toggleResizersBodyRegex, newToggleResizersBody);

// Write back
fs.writeFileSync('index.html', html);
console.log('Update script executed successfully.');
