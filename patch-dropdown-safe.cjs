const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix textContent in onSelectCustomDropdown
html = html.replace(/onSelectCustomDropdown\s*\([\s\S]*?if\s*\(labelSpan\)\s*labelSpan\.textContent\s*=\s*label;/g, match => {
  return match.replace('labelSpan.textContent = label;', 'labelSpan.innerHTML = label;');
});

// 2. Fix textContent in setCustomDropdownValue
// We need to be careful not to match too much.
const setCustomDefRegex = /setCustomDropdownValue\s*\(\s*inputId\s*,\s*value\s*,\s*wrapId\s*\)\s*\{[\s\S]*?matchedLabel\s*=\s*opt\.textContent\.trim\(\);[\s\S]*?if\s*\(labelSpan\)\s*labelSpan\.textContent\s*=\s*matchedLabel;\s*\}\s*\}/;

const safeReplace = `
          setCustomDropdownValue(inputId, value, wrapId) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) {
              hiddenInput.value = value;
            }
            const wrap = wrapId ? document.getElementById(wrapId) : (hiddenInput ? hiddenInput.closest('.custom-dropdown-wrap') : null);
            if (wrap) {
              let matchedLabel = null;
              wrap.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                if (opt.getAttribute('data-value') === String(value)) {
                  opt.classList.add('selected');
                  const inner = opt.querySelector('.custom-drop-item-content');
                  matchedLabel = inner ? inner.innerHTML : opt.innerHTML;
                } else {
                  opt.classList.remove('selected');
                }
              });
              if (matchedLabel) {
                const labelSpan = wrap.querySelector('.custom-dropdown-label');
                if (labelSpan) labelSpan.innerHTML = matchedLabel;
              }
            }
          }
`.trim();

if(html.match(setCustomDefRegex)) {
  html = html.replace(setCustomDefRegex, safeReplace);
} else {
  console.log("Could not find setCustomDropdownValue definition");
}

// 3. Add the CSS
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

// 4. Force viewMode to 'classic' everywhere
html = html.replace(/viewMode:\s*window\.location\.pathname\.includes\([^)]+\)\s*\?\s*'pro'\s*:\s*'classic'/, "viewMode: 'classic'");

// 5. Because we don't want the sidebar or Pro view, we should probably hide the "Switch to Pro" button in the classic header so they can't go back to the buggy UI they don't want.
// Wait, the "Switch to Pro" button is in the classic header.
html = html.replace(/<button[^>]*id="btnSwitchPro"[^>]*>[\s\S]*?<\/button>/, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Patched safely');
