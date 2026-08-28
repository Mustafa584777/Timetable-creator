import fs from 'fs';

console.log("Starting patch process for index.html...");
let html = fs.readFileSync('index.html', 'utf8');

// =========================================================================
// 1. UPDATE DROPDOWNS: REPLACE EMOJIS WITH COLORED SVG ICONS
// =========================================================================

// Replace Template presets options
const oldPresetOptions = `<div class="custom-dropdown-option selected" data-value="" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', '', 'Load Template Schedule...', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">Load Template Schedule...</div>
                  <div class="custom-dropdown-option" data-value="university" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'university', 'University Student Schedule', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">🎓 University Student Schedule</div>
                  <div class="custom-dropdown-option" data-value="school" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'school', 'High School Routine', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">🏫 High School Routine</div>
                  <div class="custom-dropdown-option" data-value="work" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'work', 'Work & Shift Planner', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">💼 Work & Shift Planner</div>
                  <div class="custom-dropdown-option" data-value="fitness" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'fitness', 'Workout & Gym Plan', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">💪 Workout & Gym Plan</div>
                  <div class="custom-dropdown-option" data-value="exam" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'exam', 'Exam Revision Timetable', 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">📚 Exam Revision Timetable</div>`;

const newPresetOptions = `<div class="custom-dropdown-option selected" data-value="" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', '', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:var(--text-muted);"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"></path></svg></span>
                      <span>Load Template Schedule...</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="university" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'university', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#3b82f6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"></path></svg></span>
                      <span>University Student Schedule</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="school" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'school', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 21h18M3 7v14M21 7v14M12 3l9 4H3l9-4zM9 10h6v4H9z"></path></svg></span>
                      <span>High School Routine</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="work" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'work', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span>
                      <span>Work & Shift Planner</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="fitness" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'fitness', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f43f5e;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M12 8v8"></path></svg></span>
                      <span>Workout & Gym Plan</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="exam" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'exam', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></span>
                      <span>Exam Revision Timetable</span>
                    </div>
                  </div>`;

if (html.includes(oldPresetOptions)) {
  html = html.replace(oldPresetOptions, newPresetOptions);
  console.log("Replaced classicPresetTemplates options");
} else {
  // Try regex replace if formatting differed
  html = html.replace(/<div class="custom-dropdown-option selected" data-value="" onclick="app\.handlers\.onSelectCustomDropdown\('classicPresetTemplates'[\s\S]*?📚 Exam Revision Timetable<\/div>/, newPresetOptions);
  console.log("Replaced classicPresetTemplates via regex");
}

// Replace Theme options
const oldThemeOptions = `<div class="custom-dropdown-option selected" data-value="slate" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'slate', 'Vibrant Classic', 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">🎨 Vibrant Classic</div>
                    <div class="custom-dropdown-option" data-value="emerald" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'emerald', 'Mint Fresh', 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">🌿 Mint Fresh</div>
                    <div class="custom-dropdown-option" data-value="indigo" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'indigo', 'Electric Ocean', 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">🌊 Electric Ocean</div>
                    <div class="custom-dropdown-option" data-value="amber" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'amber', 'Warm Amber', 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">🌅 Warm Amber</div>
                    <div class="custom-dropdown-option" data-value="cyberpunk" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'cyberpunk', 'Neon Pastel', 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">✨ Neon Pastel</div>`;

const newThemeOptions = `<div class="custom-dropdown-option selected" data-value="slate" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'slate', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg></span>
                        <span>Vibrant Classic</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="emerald" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'emerald', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#14b8a6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path></svg></span>
                        <span>Mint Fresh</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="indigo" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'indigo', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#3b82f6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M2 12h20M2 6h20M2 18h20"></path></svg></span>
                        <span>Electric Ocean</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="amber" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'amber', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"></path></svg></span>
                        <span>Warm Amber</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="cyberpunk" onclick="app.handlers.onSelectCustomDropdown('classicConfigTheme', 'cyberpunk', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigTheme', function(val){ app.handlers.classicThemeChange(val); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#a855f7;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path></svg></span>
                        <span>Neon Pastel</span>
                      </div>
                    </div>`;

html = html.replace(/<div class="custom-dropdown-option selected" data-value="slate"[\s\S]*?✨ Neon Pastel<\/div>/, newThemeOptions);
console.log("Replaced classicConfigTheme options");

// Replace Days dropdown options
const newDaysOptions = `<div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '5', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#3b82f6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>Mon - Fri (5 Days)</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="6" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '6', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>Mon - Sat (6 Days)</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option selected" data-value="7" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '7', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>Mon - Sun (7 Days)</span>
                      </div>
                    </div>`;

html = html.replace(/<div class="custom-dropdown-option" data-value="5" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays', '5'[\s\S]*?Mon - Sun \(7 Days\)<\/div>/, newDaysOptions);
console.log("Replaced classicConfigDays options");

// Replace Interval dropdown options
const newIntervalOptions = `<div class="custom-dropdown-option" data-value="15" onclick="app.handlers.onSelectCustomDropdown('classicConfigInterval', '15', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigInterval', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#06b6d4;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg></span>
                        <span>15 Minutes</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option selected" data-value="30" onclick="app.handlers.onSelectCustomDropdown('classicConfigInterval', '30', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigInterval', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                        <span>30 Minutes</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="45" onclick="app.handlers.onSelectCustomDropdown('classicConfigInterval', '45', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigInterval', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 17 12"></polyline></svg></span>
                        <span>45 Minutes</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="60" onclick="app.handlers.onSelectCustomDropdown('classicConfigInterval', '60', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigInterval', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 12 18"></polyline></svg></span>
                        <span>60 Minutes</span>
                      </div>
                    </div>`;

html = html.replace(/<div class="custom-dropdown-option" data-value="15" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigInterval', '15'[\s\S]*?60 Minutes<\/div>/, newIntervalOptions);
console.log("Replaced classicConfigInterval options");

// Replace Format dropdown options
const newFormatOptions = `<div class="custom-dropdown-option" data-value="12" onclick="app.handlers.onSelectCustomDropdown('classicConfigFormat', '12', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigFormat', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42"></path></svg></span>
                        <span>12-Hour (AM/PM)</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option selected" data-value="24" onclick="app.handlers.onSelectCustomDropdown('classicConfigFormat', '24', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigFormat', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#6366f1;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg></span>
                        <span>24-Hour (Military)</span>
                      </div>
                    </div>`;

html = html.replace(/<div class="custom-dropdown-option" data-value="12" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigFormat', '12'[\s\S]*?24-Hour \(Military\)<\/div>/, newFormatOptions);
console.log("Replaced classicConfigFormat options");

// Write back updated HTML
fs.writeFileSync('index.html', html, 'utf8');
console.log("Saved dropdown replacements to index.html");
