const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Loading Overlay & Fix Navigation
const loadingCSS = `
      #globalLoadingOverlay {
        position: fixed;
        top: 0; left: 0; width: 100vw; height: 100vh;
        background: var(--bg-body);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
      }
      #globalLoadingOverlay.active {
        opacity: 1;
        pointer-events: all;
      }
      .loader-skeleton {
        width: 250px;
        height: 24px;
        background: linear-gradient(90deg, var(--bg-panel) 25%, var(--border-color) 50%, var(--bg-panel) 75%);
        background-size: 200% 100%;
        animation: skeleton-load 1.5s infinite;
        border-radius: 6px;
        margin-bottom: 20px;
      }
      .loader-skeleton.small {
        width: 150px;
        height: 16px;
      }
      @keyframes skeleton-load {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
`;

html = html.replace('</style>', loadingCSS + '\n    </style>');

const loadingHTML = `
    <div id="globalLoadingOverlay">
      <div class="loader-skeleton"></div>
      <div class="loader-skeleton small"></div>
      <div class="loader-skeleton small" style="width: 200px"></div>
    </div>
`;
html = html.replace('<body>', '<body>\n' + loadingHTML);

const loadingJS = `
      // Loading overlay logic for tab switches
      document.addEventListener('click', function(e) {
        const link = e.target.closest('a.mode-toggle-pill');
        if (link && link.href) {
          if (link.href !== window.location.href) {
             e.preventDefault();
             document.getElementById('globalLoadingOverlay').classList.add('active');
             setTimeout(() => {
               window.location.href = link.href;
             }, 50); 
          }
        }
      });
`;
html = html.replace('// Auto start on systems readiness', loadingJS + '\n      // Auto start on systems readiness');

// 2. Dropdown UI Fixes
html = html.replace(/\.custom-dropdown-label\s*\{[\s\S]*?font-size:\s*12\.5px;\s*\}/, `
      .custom-dropdown-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        color: var(--text-main);
        font-weight: 500;
        font-size: 12.5px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
`.trim());

// Make icons 15% smaller
html = html.replace(/\.custom-drop-item-content\s*svg\s*\{\s*width:\s*14px;\s*height:\s*14px;/g, `
      .custom-drop-item-content svg {
        width: 12px;
        height: 12px;
`.trim());
html = html.replace(/<svg class="classic-edit-icon" width="14" height="14"/g, '<svg class="classic-edit-icon" width="12" height="12"');

// 3. Grid Row/Col Expand Fix
html = html.replace(/\.classic-th-day\s*\{[\s\S]*?padding:\s*8px\s*4px;\s*\}/, match => {
  return match.replace('}', '  resize: horizontal;\n          overflow: hidden;\n        }');
});
html = html.replace(/\.classic-th-day\s*\{[\s\S]*?padding:\s*6px\s*2px;\s*\}/, match => {
  return match.replace('}', '  resize: horizontal;\n          overflow: hidden;\n        }');
});

html = html.replace(/\.classic-th-day\s*\{/, `.classic-th-day {
        resize: horizontal;
        overflow: hidden;
        position: relative;`);

html = html.replace(/\.classic-td-time\s*\{/, `.classic-td-time {
        resize: vertical;
        overflow: hidden;
        position: relative;`);
        
html = html.replace(/\.classic-td-cell\s*\{/, `.classic-td-cell {
        overflow: hidden;`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed UI successfully');
