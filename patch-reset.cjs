const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldReset = `          resetGridSize() {
            app.state.classicColWidths = {};
            app.state.proColWidths = {};
            app.state.classicCellH = null;
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.showToast('Grid size reset to default', 'info');
          },`;

const newReset = `          resetGridSize() {
            app.state.classicColWidths = {};
            app.state.proColWidths = {};
            app.state.classicCellH = null;
            document.documentElement.style.removeProperty('--classic-cell-h');
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.showToast('Grid size reset to default', 'info');
          },`;

html = html.replace(oldReset, newReset);
fs.writeFileSync('index.html', html);
