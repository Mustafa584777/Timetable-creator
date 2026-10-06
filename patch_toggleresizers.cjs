const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regex = /toggleResizers\(\)\s*\{[\s\S]*?resetGridSize\(\)/;

const replacement = `toggleResizers() {
            app.state.resizersDisabled = !app.state.resizersDisabled;
            
            const checkboxes = document.querySelectorAll('.grid-resize-checkbox');
            checkboxes.forEach(cb => cb.checked = !app.state.resizersDisabled);
            
            if (app.state.resizersDisabled) {
              document.body.classList.add('resizers-disabled');
            } else {
              document.body.classList.remove('resizers-disabled');
            }
          },
          
          resetGridSize()`;

content = content.replace(regex, replacement);

fs.writeFileSync('index.html', content);
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', content);
console.log("Patched toggleResizers");
