import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Extract head and header up to <div class="classic-tt-app"
const classicAppStart = html.indexOf('<div class="classic-tt-app" id="timetableCreatorClassicApp">');
const preClassicApp = html.substring(0, classicAppStart);

// 2. Extract classic main header, toolbar ribbon, config bar, and grid card
const classicGridCardEnd = html.indexOf('<!-- 4. Floating Action Button (FAB) for Mobile Quick Add -->');
let classicMainBlock = html.substring(classicAppStart, classicGridCardEnd).trim();

// Ensure clean end inside container
classicMainBlock = classicMainBlock.replace(/<\/div>\s*<\/div>\s*$/, '');

// 3. Extract AI Generator Section
const aiGenBlock = `
        <!-- AI Schedule Generator -->
        <div class="section-card" id="aiGeneratorSection" style="margin-top: 16px; margin-bottom: 16px; border: 1px solid var(--border-color); background: var(--bg-card); max-width: 100%; box-shadow: var(--shadow-sm); padding: 20px; border-radius: var(--border-radius);">
          <div class="ai-generator-inner" style="display: flex; gap: 16px; align-items: center; width: 100%; flex-wrap: wrap;">
            
            <!-- Left side description -->
            <div class="ai-generator-text" style="flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 4px;">
              <div class="section-title" style="margin-bottom: 0px; text-transform: uppercase;">
                <span style="display: flex; align-items: center; gap: 6px; color: var(--primary-color); font-weight: 700;">
                  <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16" style="color: var(--primary-color);"><path d="M9.813 15.904L9 21l-.813-5.096L3.091 15 8.187 14.1 9 9l.813 5.1 5.096.9-5.096.904zM19.006 5.005l-.5.001-.13.3-.37 1-.37-1-.13-.3-.5-.001.5-.001.13-.3.37-1 .37 1 .13.3.5.001z"></path></svg>
                  Smart AI Assistant
                </span>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin: 0;">
                Describe your routine or syllabus in plain words. AI automatically schedules courses into open calendar slots.
              </p>
            </div>

            <!-- Input text area -->
            <div class="ai-generator-input" style="flex: 2; min-width: 320px; display: flex; align-items: center;">
              <textarea id="aiPrompt" class="input-ctrl" rows="2" style="resize: none; font-size: 13px; margin-bottom: 0; width: 100%; height: 52px; min-height: 52px;" placeholder="e.g., Build a computer science freshman schedule with morning lectures, afternoon labs on Wed/Fri, and lunch breaks at 1:00 PM."></textarea>
            </div>

            <!-- Control buttons -->
            <div class="ai-generator-actions" style="display: flex; gap: 8px; align-items: center; min-width: 220px; flex-shrink: 0;">
              <button id="btnAiMerge" class="btn-ctrl" onclick="app.handlers.aiGenerateSchedule(true)" style="font-size: 12px; padding: 0 16px; margin: 0; height: 42px; display: flex; align-items: center; justify-content: center; flex: 1; white-space: nowrap;">
                Merge AI
              </button>
              <button id="btnAiOvertake" class="btn-ctrl btn-primary" onclick="app.handlers.aiGenerateSchedule(false)" style="font-size: 12px; padding: 0 16px; margin: 0; height: 42px; display: flex; align-items: center; justify-content: center; flex: 1; white-space: nowrap;">
                Overtake AI
              </button>
            </div>

          </div>
        </div>
`;

// 4. Extract SEO landing section and footer
const seoStart = html.indexOf('<!-- === SEO LANDING SECTION === -->');
const footerClosing = html.indexOf('</footer>');
const seoAndFooterBlock = html.substring(seoStart, footerClosing + 9) + '\n          </div>';

// 5. Build full classic app HTML
const completeClassicApp = `
${classicMainBlock}

${aiGenBlock}

${seoAndFooterBlock}
      </div>

      <!-- 4. Floating Action Button (FAB) for Mobile Quick Add -->
      <button class="classic-mobile-fab" onclick="app.handlers.openClassicAddModal()" aria-label="Add Activity">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="18" height="18"><path d="M12 4v16m8-8H4"></path></svg>
        <span>Add Activity</span>
      </button>
    </div>
`;

// 6. Extract modals (classicEventModal, authModal, shareModal, resetConfirmModal)
const classicEventModalStart = html.indexOf('<!-- TIMETABLECREATOR.COM CLASSIC EVENT DIALOG EDITOR -->');
const adminPanelStart = html.indexOf('<!-- ==========================================================================\n         ADMIN PANEL CONTAINER');
const modalsBlock = html.substring(classicEventModalStart, adminPanelStart).trim();

// 7. Extract scripts
const scriptStart = html.indexOf('<!-- GOOGLE TRANSLATE CUSTOM INTEGRATION -->');
let scriptBlock = html.substring(scriptStart);

// Clean up scriptBlock: remove admin handlers
const adminHandlersStart = scriptBlock.indexOf('allAdminPosts: [],');
const aiGenerateScheduleStart = scriptBlock.indexOf('async aiGenerateSchedule(merge = true)');
if (adminHandlersStart !== -1 && aiGenerateScheduleStart !== -1) {
  scriptBlock = scriptBlock.substring(0, adminHandlersStart) + scriptBlock.substring(aiGenerateScheduleStart);
}

// Clean up init() in scriptBlock
const initRegex = /if \(window\.location\.pathname\.startsWith\('\/admin-panel'\)\)[\s\S]*?return;\s*\}/;
scriptBlock = scriptBlock.replace(initRegex, `const isStudentTool = window.location.pathname.includes('timetable-generator-online-for-students') || window.location.pathname.includes('timetable-generator');
          if (isStudentTool) {
            if (!localStorage.getItem('tt_classic_title')) {
              this.state.classicTitle = 'Student Timetable Generator';
              this.state.classicSubtitle = 'Class Schedule & Study Routine';
            }
          }`);

// Clean up switchViewMode in scriptBlock
const switchRegex = /switchViewMode\(mode, showNotification = true\) \{[\s\S]*?app\.render\(\);\s*\}/;
scriptBlock = scriptBlock.replace(switchRegex, `switchViewMode(mode, showNotification = false) {
            const classicContainer = document.getElementById('timetableCreatorClassicApp');
            const linkClassic = document.getElementById('linkSwitchClassic');
            const linkPro = document.getElementById('linkSwitchPro');

            app.state.viewMode = 'classic';
            localStorage.setItem('tt_view_mode', 'classic');
            document.body.classList.add('classic-mode-active');
            document.body.classList.remove('pro-mode-active');

            const isStudent = window.location.pathname.includes('timetable-generator-online-for-students') || window.location.pathname.includes('timetable-generator');

            if (linkClassic) {
              if (!isStudent) {
                linkClassic.classList.add('active');
                linkClassic.setAttribute('aria-selected', 'true');
              } else {
                linkClassic.classList.remove('active');
                linkClassic.setAttribute('aria-selected', 'false');
              }
            }
            if (linkPro) {
              if (isStudent) {
                linkPro.classList.add('active');
                linkPro.setAttribute('aria-selected', 'true');
              } else {
                linkPro.classList.remove('active');
                linkPro.setAttribute('aria-selected', 'false');
              }
            }

            if (classicContainer) {
              classicContainer.style.display = 'flex';
              classicContainer.classList.add('active-view');
            }

            app.render();
          }`);

// Assemble new HTML
const newHtml = preClassicApp + completeClassicApp + '\n\n' + modalsBlock + '\n\n' + scriptBlock;

fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Successfully updated index.html! New length:', newHtml.length);
