const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const resizeButtons = `          <div style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
            <button id="toggleResizersBtn" class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 11px; height: 32px; margin: 0;">Disable Grid Resizing</button>
            <button class="btn-ctrl" onclick="app.handlers.resetGridSize()" style="font-size: 11px; height: 32px; margin: 0;">Reset Grid Size</button>
          </div>`;

// Insert after tip
html = html.replace(/(<div class="classic-mobile-scroll-hint">[\s\S]*?<\/div>)/, `$1\n${resizeButtons}`);

// Add CSS for disabling
const cssPatch = `
      body.resizers-disabled .excel-col-resizer,
      body.resizers-disabled .excel-row-resizer {
        display: none !important;
      }
`;
html = html.replace('</style>', `${cssPatch}</style>`);

// Add JS handlers
const jsPatch = `
          toggleResizers() {
            app.state.resizersDisabled = !app.state.resizersDisabled;
            if (app.state.resizersDisabled) {
              document.body.classList.add('resizers-disabled');
              document.getElementById('toggleResizersBtn').textContent = 'Enable Grid Resizing';
            } else {
              document.body.classList.remove('resizers-disabled');
              document.getElementById('toggleResizersBtn').textContent = 'Disable Grid Resizing';
            }
          },
          resetGridSize() {
            app.state.classicColWidths = {};
            app.state.proColWidths = {};
            app.state.classicCellH = null;
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.showToast('Grid size reset to default', 'info');
          },`;

html = html.replace(/(handlers: \{)/, `$1${jsPatch}`);

fs.writeFileSync('index.html', html);
