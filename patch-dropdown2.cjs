const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const setCustomDropdownValueFix = `
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
                  const innerContent = opt.querySelector('.custom-drop-item-content');
                  matchedLabel = innerContent ? innerContent.innerHTML : opt.innerHTML;
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
`;

html = html.replace(/setCustomDropdownValue\s*\([\s\S]*?if\s*\(labelSpan\)\s*labelSpan\.textContent\s*=\s*matchedLabel;\s*\}\s*\}\s*\}/, setCustomDropdownValueFix.trim());

fs.writeFileSync('index.html', html, 'utf8');
