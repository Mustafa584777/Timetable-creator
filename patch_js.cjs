const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/const textContent = app\.state\.resizersDisabled \? 'Enable Grid Resizing' : 'Disable Grid Resizing';\s*document\.querySelectorAll\('\.btn-label-text'\)\.forEach\(el => \{\s*el\.textContent = textContent;\s*\}\);/g, 
  `const textContent = app.state.resizersDisabled ? 'Enable Grid Resizing' : 'Disable Grid Resizing';
            document.querySelectorAll('.btn-label-text').forEach(el => {
              el.textContent = textContent;
            });
            document.querySelectorAll('#toggleResizersBtn input').forEach(el => {
              el.checked = !app.state.resizersDisabled;
            });`);

// 5. Icons hover over card fix
// Remove overflow: hidden from .classic-event-item
html = html.replace(/\.classic-event-item \{\s*position: absolute;[\s\S]*?user-select: none;\s*\}/, function(match) {
  return match.replace(/overflow: hidden;/, '');
});

// Change .classic-event-tools CSS to position it absolutely above the card
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

// We need to change the duplicate icon to an actual duplicate icon instead of plus
// Previous duplicate icon path: M12 5v14M5 12h14
html = html.replace(/<path d="M12 5v14M5 12h14"><\/path>/g, '<rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>');

// Change .classic-evt-btn styling slightly to look good on the new background
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

fs.writeFileSync('index.html', html);
