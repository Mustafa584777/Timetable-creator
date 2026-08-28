const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix textContent to innerHTML in onSelectCustomDropdown
html = html.replace(/if\s*\(labelSpan\)\s*labelSpan\.textContent\s*=\s*label;/, 'if (labelSpan) labelSpan.innerHTML = label;');

// Update CSS for custom-drop-item-content to vertically center align, height text barabar, 3px space
const customDropCSS = `
      .custom-drop-item-content {
        display: flex;
        align-items: center;
        gap: 3px;
        line-height: 1;
      }
      .custom-drop-item-content svg {
        width: 14px;
        height: 14px;
        display: block;
      }
      .custom-dropdown-label .custom-drop-item-content {
        gap: 3px;
      }
`;
html = html.replace(/<\/style>/, customDropCSS + '\n    </style>');

// Force viewMode to 'classic' everywhere
html = html.replace(/viewMode:\s*window\.location\.pathname\.includes\([^)]+\)\s*\?\s*'pro'\s*:\s*'classic'/, "viewMode: 'classic'");

fs.writeFileSync('index.html', html, 'utf8');
