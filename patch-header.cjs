const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldDarkBtn = `          <!-- Light/Dark Mode Toggle in Header -->
          <button class="action-btn-header" onclick="app.handlers.toggleDark()" data-tooltip="Toggle theme mode">
            <svg id="themeToggleIconHeader" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="20" height="20">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>`;

html = html.replace(oldDarkBtn, '');

const targetCenter = `<div class="header-center-desktop">`;
html = html.replace(targetCenter, targetCenter + '\n' + oldDarkBtn);

fs.writeFileSync('index.html', html);
