const fs = require('fs');

const studentsFile = 'public/timetable-generator-online-for-students/index.html';
if (fs.existsSync(studentsFile)) {
  let content = fs.readFileSync(studentsFile, 'utf8');

  // 1. Add html2canvas and jspdf if not in head
  if (!content.includes('html2canvas.min.js')) {
    content = content.replace('<style>', `<!-- High-Fidelity Timetable Export Libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>`);
  }

  // 2. CSS updates for .classic-toolbar-card, .classic-ribbon-top-row, .classic-stat-pill
  const oldToolbarCSS = `      /* 2. Interactive Navigation Ribbon: Stats, Day Filter, Zoom & Grid Settings */
      .classic-toolbar-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 14px 18px;
        box-shadow: var(--shadow-sm);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .classic-ribbon-top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      /* Live Stats Strip */
      .classic-stats-strip {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .classic-stat-pill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: #ffffff;
        border: 1.5px solid var(--border-color);
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 11.5px;
        color: var(--text-muted);
        white-space: nowrap;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      }
      [data-theme="dark"] .classic-stat-pill {
        background: #1e293b;
      }
      .classic-stat-pill strong {
        color: var(--text-main);
        font-weight: 700;
      }`;

  const newToolbarCSS = `      /* 2. Interactive Navigation Ribbon: Stats, Day Filter, Zoom & Grid Settings */
      .classic-toolbar-card {
        background: transparent !important;
        border: none !important;
        border-radius: 12px;
        padding: 4px 0;
        box-shadow: none !important;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .classic-ribbon-top-row {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
      }

      /* Live Stats Strip (4 Activity Buttons at Top) */
      .classic-stats-strip {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }
      .classic-stat-pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #0f172a !important;
        border: none !important;
        padding: 5px 12px;
        border-radius: 16px;
        font-size: 11.5px;
        color: #ffffff !important;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
        transition: transform 0.15s ease, background 0.15s ease;
      }
      .classic-stat-pill:hover {
        transform: translateY(-1px);
        background: #1e293b !important;
      }
      [data-theme="dark"] .classic-stat-pill {
        background: #0f172a !important;
        border: none !important;
        color: #ffffff !important;
      }
      .classic-stat-pill strong {
        color: #ffffff !important;
        font-weight: 700;
      }
      .classic-stat-pill svg {
        color: #ffffff !important;
        stroke: #ffffff !important;
      }`;

  if (content.includes(oldToolbarCSS)) {
    content = content.replace(oldToolbarCSS, newToolbarCSS);
    console.log('Updated Toolbar CSS in students file');
  }

  // 3. Update unified controls buttons (Import before Export with inverted icons)
  const oldControlsBtn = `<button class="export-btn-item export-btn-json" onclick="app.handlers.exportJson()" data-shortcut-tip="Alt + J" data-shortcut-name="Export JSON" title="Export JSON" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>JSON</span>
              </button>`;

  const newControlsBtn = `<button class="export-btn-item export-btn-import" onclick="app.handlers.triggerImport()" data-shortcut-tip="Alt + O" data-shortcut-name="Import JSON" title="Import JSON File" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                <span>Import</span>
              </button>
              <button class="export-btn-item export-btn-json" onclick="app.handlers.exportJson()" data-shortcut-tip="Alt + J" data-shortcut-name="Export JSON" title="Export JSON File" style="height: 34px; border-radius: 6px; padding: 0 12px; display: flex; align-items: center; gap: 6px; font-weight: 500; font-size: 12px; border: 1px solid var(--border-color); background: var(--bg-panel); color: var(--text-main); cursor: pointer; transition: 0.2s ease;">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <span>Export</span>
              </button>`;

  while (content.includes(oldControlsBtn)) {
    content = content.replace(oldControlsBtn, newControlsBtn);
    console.log('Replaced unified controls button in students file');
  }

  // 4. Update config bar buttons
  const oldConfigActions = `<div class="classic-cfg-action-buttons">
                
                <button class="classic-btn-cfg-action classic-btn-cfg-import" onclick="app.handlers.triggerImport()" data-shortcut-tip="Alt + O" data-shortcut-name="Import JSON" title="Import JSON File">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <span>Import JSON</span>
                </button>
                <button class="classic-btn-cfg-action danger classic-btn-cfg-clear" onclick="app.handlers.clearAll()" data-shortcut-tip="Alt + C" data-shortcut-name="Clear All" title="Reset All Entries">`;

  const newConfigActions = `<div class="classic-cfg-action-buttons">
                <button class="classic-btn-cfg-action classic-btn-cfg-import" onclick="app.handlers.triggerImport()" data-shortcut-tip="Alt + O" data-shortcut-name="Import JSON" title="Import JSON File">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  <span>Import JSON</span>
                </button>
                <button class="classic-btn-cfg-action classic-btn-cfg-export" onclick="app.handlers.exportJson()" data-shortcut-tip="Alt + J" data-shortcut-name="Export JSON" title="Export JSON File">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  <span>Export JSON</span>
                </button>
                <button class="classic-btn-cfg-action danger classic-btn-cfg-clear" onclick="app.handlers.clearAll()" data-shortcut-tip="Alt + C" data-shortcut-name="Clear All" title="Reset All Entries">`;

  if (content.includes(oldConfigActions)) {
    content = content.replace(oldConfigActions, newConfigActions);
    console.log('Replaced config actions in students file');
  }

  // 5. Update Sidebar buttons
  content = content.replace(
    `<button class="btn-ctrl btn-sidebar-import" onclick="app.handlers.triggerImport()" data-shortcut-tip="Alt + O" data-shortcut-name="Import JSON">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Import
              </button>
              <button class="btn-ctrl btn-sidebar-export" onclick="app.handlers.exportJson()" data-shortcut-tip="Alt + J" data-shortcut-name="Export JSON">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export
              </button>`,
    `<button class="btn-ctrl btn-sidebar-import" onclick="app.handlers.triggerImport()" data-shortcut-tip="Alt + O" data-shortcut-name="Import JSON">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Import
              </button>
              <button class="btn-ctrl btn-sidebar-export" onclick="app.handlers.exportJson()" data-shortcut-tip="Alt + J" data-shortcut-name="Export JSON">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                Export
              </button>`
  );

  // 6. Copy the export methods from index.html
  const mainIndex = fs.readFileSync('index.html', 'utf8');
  const handlerStart = 'handleImport(e) {';
  const handlerEnd = '// Firebase Authentication helpers & hooks';

  const mainChunk = mainIndex.substring(mainIndex.indexOf(handlerStart), mainIndex.indexOf(handlerEnd));
  const studentChunk = content.substring(content.indexOf(handlerStart), content.indexOf(handlerEnd));

  if (mainChunk && studentChunk) {
    content = content.replace(studentChunk, mainChunk);
    console.log('Synced export handler methods to students file');
  }

  // 7. Sync print stylesheet
  const mainPrintStart = '/* Print Stylesheet Overrides */';
  const mainPrintEnd = '/* Animation keyframes for loading spinners */';
  const mainPrint = mainIndex.substring(mainIndex.indexOf(mainPrintStart), mainIndex.indexOf(mainPrintEnd));
  const studentPrint = content.substring(content.indexOf(mainPrintStart), content.indexOf(mainPrintEnd));

  if (mainPrint && studentPrint) {
    content = content.replace(studentPrint, mainPrint);
    console.log('Synced print stylesheet to students file');
  }

  fs.writeFileSync(studentsFile, content, 'utf8');
  console.log('Successfully updated public/timetable-generator-online-for-students/index.html');
}
