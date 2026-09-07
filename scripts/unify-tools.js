import fs from 'fs';
import path from 'path';

console.log('Starting unification and bug fixes...');

let html = fs.readFileSync('index.html', 'utf8');

// =========================================================================
// 1. UPDATE CSS FOR DROPDOWN LABELS, ICONS, AND ALIGNMENTS (1em height, 3px spacing)
// =========================================================================
const oldDropdownCss = `      .custom-dropdown-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        color: var(--text-main);
        font-weight: 500;
        font-size: 12.5px;
      }`;

const newDropdownCss = `      .custom-dropdown-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        color: var(--text-main);
        font-weight: 500;
        font-size: 12.5px;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        vertical-align: middle;
        line-height: 1;
      }
      .custom-drop-item-content {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        vertical-align: middle;
        white-space: nowrap;
        line-height: 1;
        width: 100%;
      }
      .custom-drop-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        height: 1em;
        width: 1em;
        min-width: 1em;
        margin-right: 3px;
        flex-shrink: 0;
        line-height: 1;
      }
      .custom-drop-icon svg {
        width: 1em !important;
        height: 1em !important;
        vertical-align: middle;
        display: inline-block;
      }`;

if (html.includes(oldDropdownCss)) {
  html = html.replace(oldDropdownCss, newDropdownCss);
  console.log('Replaced custom-dropdown-label CSS successfully');
} else {
  console.warn('Could not find exact oldDropdownCss, checking alternative placement');
}

// Ensure .custom-dropdown-option has gap: 3px
html = html.replace(/\.custom-dropdown-option\s*\{([^}]+)gap:\s*8px;/g, '.custom-dropdown-option {$1gap: 3px;');

// =========================================================================
// 2. FIX onSelectCustomDropdown & setCustomDropdownValue IN JAVASCRIPT
// =========================================================================
const oldOnSelect = `          onSelectCustomDropdown(inputId, value, label, wrapId, callback) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) {
              hiddenInput.value = value;
              hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            const wrap = wrapId ? document.getElementById(wrapId) : (hiddenInput ? hiddenInput.closest('.custom-dropdown-wrap') : null);
            if (wrap) {
              const labelSpan = wrap.querySelector('.custom-dropdown-label');
              if (labelSpan) labelSpan.textContent = label;

              wrap.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                if (opt.getAttribute('data-value') === String(value)) {
                  opt.classList.add('selected');
                } else {
                  opt.classList.remove('selected');
                }
              });

              wrap.classList.remove('open');
            }

            if (typeof callback === 'function') {
              callback(value);
            }
          },

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
                  matchedLabel = opt.textContent.trim();
                } else {
                  opt.classList.remove('selected');
                }
              });
              if (matchedLabel) {
                const labelSpan = wrap.querySelector('.custom-dropdown-label');
                if (labelSpan) labelSpan.textContent = matchedLabel;
              }
            }
          }`;

const newOnSelect = `          onSelectCustomDropdown(inputId, value, label, wrapId, callback) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) {
              hiddenInput.value = value;
              hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            const wrap = wrapId ? document.getElementById(wrapId) : (hiddenInput ? hiddenInput.closest('.custom-dropdown-wrap') : null);
            if (wrap) {
              const labelSpan = wrap.querySelector('.custom-dropdown-label');
              if (labelSpan) {
                // Properly inject innerHTML so icons and labels render cleanly without exposing raw HTML
                labelSpan.innerHTML = label;
              }

              wrap.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                if (opt.getAttribute('data-value') === String(value)) {
                  opt.classList.add('selected');
                } else {
                  opt.classList.remove('selected');
                }
              });

              wrap.classList.remove('open');
            }

            if (typeof callback === 'function') {
              callback(value);
            }
          },

          setCustomDropdownValue(inputId, value, wrapId) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) {
              hiddenInput.value = value;
            }
            const wrap = wrapId ? document.getElementById(wrapId) : (hiddenInput ? hiddenInput.closest('.custom-dropdown-wrap') : null);
            if (wrap) {
              let matchedHTML = null;
              wrap.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                if (opt.getAttribute('data-value') === String(value)) {
                  opt.classList.add('selected');
                  const itemContent = opt.querySelector('.custom-drop-item-content');
                  matchedHTML = itemContent ? itemContent.innerHTML : opt.innerHTML;
                } else {
                  opt.classList.remove('selected');
                }
              });
              if (matchedHTML) {
                const labelSpan = wrap.querySelector('.custom-dropdown-label');
                if (labelSpan) labelSpan.innerHTML = matchedHTML;
              }
            }
          }`;

if (html.includes(oldOnSelect)) {
  html = html.replace(oldOnSelect, newOnSelect);
  console.log('Replaced onSelectCustomDropdown and setCustomDropdownValue in JS successfully');
} else {
  console.warn('Could not find exact oldOnSelect');
}

// =========================================================================
// 3. ENSURE UNIFIED WORKSPACE (NO HIDDEN SIDEBAR UI) AND PLACE SEO PROPERLY
// =========================================================================
// Let's check where timetableApp is in index.html and replace it so SEO section is directly beneath the classic timetable
const oldTimetableAppStart = html.indexOf('<!-- MAIN APP WRAPPER (PRO STUDIO) -->');
const oldTimetableAppEnd = html.indexOf('<!-- MAIN EVENT DIALOG EDITOR -->');

if (oldTimetableAppStart !== -1 && oldTimetableAppEnd !== -1) {
  // Extract the SEO section from inside timetableApp
  const seoStartIdx = html.indexOf('<!-- === SEO LANDING SECTION === -->', oldTimetableAppStart);
  let seoSectionContent = '';
  if (seoStartIdx !== -1 && seoStartIdx < oldTimetableAppEnd) {
    const seoEndIdx = html.indexOf('</main>', seoStartIdx);
    if (seoEndIdx !== -1) {
      seoSectionContent = html.substring(seoStartIdx, seoEndIdx).trim();
    }
  }

  // Also extract footer if inside
  const footerStartIdx = html.indexOf('<!-- FOOTER WITH INTERNAL LINKS & LEGAL/COPYRIGHT -->', oldTimetableAppStart);
  let footerContent = '';
  if (footerStartIdx !== -1 && footerStartIdx < oldTimetableAppEnd) {
    const footerEndIdx = html.indexOf('</footer>', footerStartIdx);
    if (footerEndIdx !== -1) {
      footerContent = html.substring(footerStartIdx, footerEndIdx + 9).trim();
    }
  }

  // Replace old timetableApp with clean SEO container and footer
  const unifiedBelowWorkspace = `
      <!-- SEO LANDING & DETAILS SECTION -->
      <div class="classic-seo-wrapper" style="width: 100%; max-width: 1320px; margin: 32px auto 0 auto; padding: 0 16px;">
        ${seoSectionContent}
        ${footerContent ? `<div style="margin-top: 40px;">${footerContent}</div>` : ''}
      </div>
  `;

  html = html.substring(0, oldTimetableAppStart) + unifiedBelowWorkspace + '\n    ' + html.substring(oldTimetableAppEnd);
  console.log('Replaced old timetableApp with unified SEO & footer container successfully');
}

// =========================================================================
// 4. ADD SEARCH & FILTER INPUT TO HORIZONTAL GRID SETUP BAR (classicConfigPanel)
// =========================================================================
const oldThemeBlock = `            <!-- Color Palette -->
            <div class="classic-cfg-item">
              <span class="classic-cfg-label">Color Theme:</span>
              <div class="custom-dropdown-wrap" id="wrap_classicConfigTheme">`;

const newSearchAndThemeBlock = `            <!-- Search & Filter Activity -->
            <div class="classic-cfg-item" style="min-width: 180px;">
              <span class="classic-cfg-label">Filter Activities:</span>
              <div style="position: relative; display: flex; align-items: center; width: 100%;">
                <svg style="position: absolute; left: 10px; color: #8b5cf6; pointer-events: none;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
                <input type="text" id="classicSearchFilter" class="input-ctrl" placeholder="Search subject, room, teacher..." oninput="app.renderClassicGrid()" style="padding-left: 30px; height: 36px; font-size: 12px; border-radius: 8px; width: 100%; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.08); background: #ffffff;">
              </div>
            </div>

            <!-- Color Palette -->
            <div class="classic-cfg-item">
              <span class="classic-cfg-label">Color Theme:</span>
              <div class="custom-dropdown-wrap" id="wrap_classicConfigTheme">`;

if (html.includes(oldThemeBlock) && !html.includes('id="classicSearchFilter"')) {
  html = html.replace(oldThemeBlock, newSearchAndThemeBlock);
  console.log('Added search filter into classicConfigPanel');
}

// =========================================================================
// 5. UPDATE renderClassicGrid TO SUPPORT LIVE SEARCH FILTERING
// =========================================================================
const oldValidEvents = `            // Update stats strip in classic ribbon
            const validEvents = (this.state.events || []).filter(evt => evt.day < activeDaysCount);`;

const newValidEvents = `            // Update stats strip in classic ribbon
            let validEvents = (this.state.events || []).filter(evt => evt.day < activeDaysCount);
            const searchFilterInput = document.getElementById('classicSearchFilter');
            const searchFilterVal = (searchFilterInput ? searchFilterInput.value : '').trim().toLowerCase();
            if (searchFilterVal) {
              validEvents = validEvents.filter(evt =>
                (evt.title && evt.title.toLowerCase().includes(searchFilterVal)) ||
                (evt.teacher && evt.teacher.toLowerCase().includes(searchFilterVal)) ||
                (evt.room && evt.room.toLowerCase().includes(searchFilterVal)) ||
                (evt.category && evt.category.toLowerCase().includes(searchFilterVal)) ||
                (evt.notes && evt.notes.toLowerCase().includes(searchFilterVal))
              );
            }`;

if (html.includes(oldValidEvents)) {
  html = html.replace(oldValidEvents, newValidEvents);
  console.log('Updated validEvents search filter in renderClassicGrid');
}

// =========================================================================
// 6. UPDATE viewMode INITIALIZATION TO DEFAULT TO UNIFIED CLASSIC ON ALL PAGES
// =========================================================================
html = html.replace(
  /viewMode:\s*window\.location\.pathname\.includes\('timetable-generator-online-for-students'\)\s*\?\s*'pro'\s*:\s*'classic'/,
  "viewMode: 'classic'"
);

// Ensure switchViewMode handles classic smoothly without breaking
html = html.replace(
  /switchViewMode\(mode,\s*save\s*=\s*true\)\s*\{[\s\S]*?render\(\);[\s\S]*?\}/,
  `switchViewMode(mode, save = true) {
            this.state.viewMode = 'classic';
            const classicApp = document.getElementById('timetableCreatorClassicApp');
            if (classicApp) classicApp.style.display = 'block';
            
            const linkClassic = document.getElementById('linkSwitchClassic');
            const linkPro = document.getElementById('linkSwitchPro');
            const isStudentPage = window.location.pathname.includes('timetable-generator-online-for-students');
            
            if (linkClassic) {
              if (!isStudentPage) linkClassic.classList.add('active');
              else linkClassic.classList.remove('active');
            }
            if (linkPro) {
              if (isStudentPage) linkPro.classList.add('active');
              else linkPro.classList.remove('active');
            }
            
            if (save && this.state.config.autoSave) this.saveState();
            this.render();
          }`
);

// Write updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully saved updated index.html');
