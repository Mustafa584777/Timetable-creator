const fs = require('fs');

function patchFile(filepath) {
  let html = fs.readFileSync(filepath, 'utf8');

  // Undo/Redo separation CSS
  const undoRedoCss = `
      .classic-undo-redo-group {
        display: inline-flex;
        align-items: center;
        gap: 5px !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        height: auto !important;
        padding: 0 !important;
      }
      .classic-undo-redo-group .classic-btn-mini {
        border: 1.5px solid #cbd5e1 !important;
        background: #ffffff !important;
        padding: 0 8px !important;
        height: 26px !important;
        font-size: 11.5px !important;
        gap: 3px !important;
        color: #475569 !important;
        box-shadow: 0 1px 2px rgba(0,0,0,0.03) !important;
        border-radius: 6px !important;
      }
      .classic-undo-redo-group .classic-btn-mini:hover {
        background: #f8fafc !important;
        color: #0f172a !important;
        border-color: #94a3b8 !important;
      }
      .undo-redo-compact-group {
        display: inline-flex;
        align-items: center;
        gap: 5px !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        height: auto !important;
      }
      .undo-redo-compact-group .action-btn {
        width: 32px !important;
        height: 32px !important;
        border: 1px solid var(--border-color) !important;
        background: var(--bg-card) !important;
        border-radius: var(--border-radius) !important;
        color: var(--text-muted) !important;
      }
      .undo-redo-compact-group .action-btn:hover {
        background: var(--hover-bg) !important;
        color: var(--text-main) !important;
      }
      /* Remove border from header items */
      .action-btn-header, .lang-dropdown-container button, .header-auth-group button, .btn-signin-header, .btn-pro-header, .mobile-menu-btn {
        border: none !important;
      }
  `;
  
  html = html.replace('</style>', undoRedoCss + '\n    </style>');

  // Remove theme option from mobile header toggle menu
  // Let's find it. Usually something like "Dark Mode" inside a mobile menu.
  html = html.replace(/<button class="mobile-menu-item" onclick="app\.handlers\.toggleDark\(\)">[\s\S]*?<\/button>/, '');

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
if (fs.existsSync('public/timetable-generator-online-for-students/index.html')) {
  patchFile('public/timetable-generator-online-for-students/index.html');
}
