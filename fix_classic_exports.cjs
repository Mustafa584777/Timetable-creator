const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="unified-controls-container"[\s\S]*?<\/div>\s*<\/div>/;

// the unified container string to match both classic and pro, let's just replace both to be perfectly identical.
// Actually, wait, let me just replace all `class="unified-controls-container"` blocks with the new one.
const newUnifiedContainer = `<div class="unified-controls-container" style="display: flex; gap: 12px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--bg-card); padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color);">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px;">
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

html = html.replace(/<div class="unified-controls-container"[\s\S]*?<\/div>\s*<\/div>/g, newUnifiedContainer);

// But wait, the toggleResizers code depends on unique IDs for the toggle buttons so they can both be updated.
// I should make sure the IDs are there.

const newUnifiedContainerClassic = `<div class="unified-controls-container" style="display: flex; gap: 12px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--bg-card); padding: 10px 16px; border-radius: 10px; border: 1px solid var(--border-color);">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button id="toggleResizersBtn" class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 12px; height: 34px; margin: 0; display: flex; align-items: center; gap: 6px;">
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

const newUnifiedContainerPro = newUnifiedContainerClassic.replace('id="toggleResizersBtn"', 'id="toggleResizersBtnPro"');

let blocks = html.match(/<div class="unified-controls-container"[\s\S]*?<\/div>\s*<\/div>/g);
if (blocks && blocks.length === 2) {
    html = html.replace(blocks[0], newUnifiedContainerClassic);
    html = html.replace(blocks[1], newUnifiedContainerPro);
    fs.writeFileSync('index.html', html);
    console.log('Fixed classic exports');
} else {
    console.log('Did not find exactly 2 unified containers');
}
