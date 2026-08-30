const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let html = fs.readFileSync(filepath, 'utf8');

  // 1. Force footer to bottom by expanding grid card and scroll wrapper
  const expandCss = `
      .classic-grid-card {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .classic-grid-scroll-wrapper {
        flex-grow: 1;
      }
      .workspace {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
  `;
  if (!html.includes('.classic-grid-scroll-wrapper {\\n        flex-grow: 1;')) {
     html = html.replace('</style>', expandCss + '\n    </style>');
  }

  // 2. Corner/Edge aware hover popups JS
  const eventCardOld = "eventCard.className = 'classic-event-item';";
  const eventCardNew = `
              let edgeClass = '';
              if (topOffset < 60) edgeClass += ' edge-top';
              if (evt.day == document.getElementById('classicConfigDays').value) edgeClass += ' edge-right';
              if (evt.day == 1) edgeClass += ' edge-left';
              eventCard.className = 'classic-event-item' + edgeClass;
  `;
  html = html.replace(eventCardOld, eventCardNew);

  // 2. CSS for Edge-aware popups and Violet background (Task 4)
  const edgeCss = `
      .classic-event-item.edge-top .classic-event-tools {
        top: 0px !important;
        left: calc(100% + 4px) !important;
        right: auto !important;
      }
      .classic-event-item.edge-top.edge-right .classic-event-tools {
        top: 0px !important;
        left: auto !important;
        right: calc(100% + 4px) !important;
      }
      .classic-event-item.edge-left .classic-event-tools {
        left: 0 !important;
        right: auto !important;
      }
      .classic-event-tools {
        background: #8b5cf6 !important; /* Violet */
        border: 1px solid #7c3aed !important;
      }
      .classic-event-tools .classic-evt-btn {
        color: #ffffff !important;
      }
      .classic-event-tools .classic-evt-btn:hover {
        background: rgba(255, 255, 255, 0.25) !important;
      }
  `;
  html = html.replace('</style>', edgeCss + '\n    </style>');

  // 3. Remove Theme Icon after Export Options
  html = html.replace(/<button class="classic-icon-btn classic-btn-theme" onclick="app\.handlers\.toggleDark\(\)" title="Toggle Dark\/Light Mode" aria-label="Toggle Theme">\s*<svg[\s\S]*?<\/svg>\s*<\/button>/g, '');

  // 4. Undo Redo options height = Grid Setup icon height (Task 5)
  const undoRedoCss = `
      .classic-btn-mini, .classic-undo-redo-group .classic-btn-mini {
        height: 30px !important;
        box-sizing: border-box !important;
      }
  `;
  html = html.replace('</style>', undoRedoCss + '\n    </style>');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
patchFile('public/timetable-generator-online-for-students/index.html');
