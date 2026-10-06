const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove PDF download icon in classic header
const pdfBtnRegex = /<button class="classic-icon-btn classic-btn-pdf"[\s\S]*?<\/button>\s*/;
content = content.replace(pdfBtnRegex, '');

// 2. Event actions CSS (top: 2px, right: 2px)
content = content.replace(
  /\.event-actions\s*\{\s*position:\s*absolute;\s*top:\s*-14px;\s*right:\s*-8px;/,
  `.event-actions {
        position: absolute;
        top: 2px;
        right: 2px;`
);

// 3. Duplicate Icon in Event Actions
const oldDupIcon = `dupBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v14M5 12h14"></path></svg>\`;`;
const newDupIcon = `dupBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M15 2H6a2 2 0 0 0-2 2v14"></path><path d="M12 22h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z"></path><path d="M16 19v-6"></path><path d="M13 16h6"></path></svg>\`;`;
content = content.replace(oldDupIcon, newDupIcon);

// 4. toggleResizers method update
const oldToggleResizers = `          toggleResizers() {
            app.state.resizersDisabled = !app.state.resizersDisabled;
            
            const btn1 = document.getElementById('toggleResizersBtn');
            const btn2 = document.getElementById('toggleResizersBtnPro');
            const textContent = app.state.resizersDisabled ? 'Enable Grid Resizing' : 'Disable Grid Resizing';
            
            if (app.state.resizersDisabled) {
              document.body.classList.add('resizers-disabled');
            } else {
              document.body.classList.remove('resizers-disabled');
            }
            if (btn1) btn1.querySelector('.btn-label-text').textContent = textContent;
            if (btn2) btn2.querySelector('.btn-label-text').textContent = textContent;
          },`;

const newToggleResizers = `          toggleResizers() {
            app.state.resizersDisabled = !app.state.resizersDisabled;
            
            const checkboxes = document.querySelectorAll('.grid-resize-checkbox');
            checkboxes.forEach(cb => cb.checked = !app.state.resizersDisabled);
            
            if (app.state.resizersDisabled) {
              document.body.classList.add('resizers-disabled');
            } else {
              document.body.classList.remove('resizers-disabled');
            }
          },`;
content = content.replace(oldToggleResizers, newToggleResizers);

// 5. Replace BOTH .unified-controls-container blocks
// We will find them using a regex that captures the whole container.
// Or we can just use string replacements if they are predictable.
const containerOldHtmlRegex = /<div class="unified-controls-container"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

const newContainerHtml = `<div class="unified-controls-container" style="display: flex; gap: 16px; margin-top: 12px; margin-bottom: 12px; align-items: center; background: var(--bg-card); padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color); overflow-x: auto; white-space: nowrap;">
            <!-- Export Options -->
            <div style="display: flex; gap: 8px; align-items: center;">
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
            <div style="width: 1px; height: 24px; background-color: var(--border-color);"></div>
            <!-- Grid Controls -->
            <div style="display: flex; gap: 16px; align-items: center;">
              <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 12px; font-weight: 500; color: var(--text-main);">
                <input type="checkbox" class="grid-resize-checkbox" onchange="app.handlers.toggleResizers()" checked style="width: 16px; height: 16px; cursor: pointer; accent-color: var(--primary-color);">
                <span>Enable Grid Resizing</span>
              </label>
              <button class="btn-ctrl" onclick="app.handlers.resetGridSize()" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px; padding: 0 12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                <span>Reset Grid Size</span>
              </button>
            </div>
          </div>`;

content = content.replace(containerOldHtmlRegex, newContainerHtml);

fs.writeFileSync('index.html', content);

// Copy to public folder
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', content);

console.log("Patched UI");
