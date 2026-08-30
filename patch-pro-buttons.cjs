const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const proResizeButtons = `          <div style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 12px; align-items: center; justify-content: flex-end; flex-wrap: wrap;">
            <button id="toggleResizersBtnPro" class="btn-ctrl" onclick="app.handlers.toggleResizers()" style="font-size: 11px; height: 32px; margin: 0;">Disable Grid Resizing</button>
            <button class="btn-ctrl" onclick="app.handlers.resetGridSize()" style="font-size: 11px; height: 32px; margin: 0;">Reset Grid Size</button>
          </div>`;

html = html.replace(/(<div class="timetable-scroll-container">)/, proResizeButtons + '\n$1');

// Update JS so that both buttons get updated
const oldToggleResizers = `              document.getElementById('toggleResizersBtn').textContent = 'Enable Grid Resizing';
            } else {
              document.body.classList.remove('resizers-disabled');
              document.getElementById('toggleResizersBtn').textContent = 'Disable Grid Resizing';
            }`;

const newToggleResizers = `              if (document.getElementById('toggleResizersBtn')) document.getElementById('toggleResizersBtn').textContent = 'Enable Grid Resizing';
              if (document.getElementById('toggleResizersBtnPro')) document.getElementById('toggleResizersBtnPro').textContent = 'Enable Grid Resizing';
            } else {
              document.body.classList.remove('resizers-disabled');
              if (document.getElementById('toggleResizersBtn')) document.getElementById('toggleResizersBtn').textContent = 'Disable Grid Resizing';
              if (document.getElementById('toggleResizersBtnPro')) document.getElementById('toggleResizersBtnPro').textContent = 'Disable Grid Resizing';
            }`;

html = html.replace(oldToggleResizers, newToggleResizers);

fs.writeFileSync('index.html', html);
