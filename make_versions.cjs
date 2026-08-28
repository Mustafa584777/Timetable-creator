const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const baseHtml = html;

// Create Homepage Version
let hpTemplateHtml = `
                <div class="custom-dropdown-menu">
                  <div class="custom-dropdown-option selected" data-value="" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', '', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:var(--text-muted);"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M4 6h16M4 12h16M4 18h7"></path></svg></span>
                      <span>Load Template Schedule...</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="personal" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'personal', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                      <span>Personal Routine</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="work" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'work', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#3b82f6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></span>
                      <span>Work & Shift Planner</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="fitness" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'fitness', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f43f5e;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v8H2zM6 8v8M12 8v8"></path></svg></span>
                      <span>Workout & Gym Plan</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="meal" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'meal', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></svg></span>
                      <span>Meal Planner</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="cleaning" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'cleaning', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M2 20h20M7 20v-4a5 5 0 0 1 10 0v4M7 8V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4"></path></svg></span>
                      <span>Cleaning Schedule</span>
                    </div>
                  </div>
                </div>
`;

let stuTemplateHtml = `
                <div class="custom-dropdown-menu">
                  <div class="custom-dropdown-option selected" data-value="" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', '', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:var(--text-muted);"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M4 6h16M4 12h16M4 18h7"></path></svg></span>
                      <span>Load Template Schedule...</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="university" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'university', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#3b82f6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"></path></svg></span>
                      <span>University Student Schedule</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="school" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'school', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M3 21h18M3 7v14M21 7v14M12 3l9 4H3l9-4zM9 10h6v4H9z"></path></svg></span>
                      <span>High School Routine</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="exam" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'exam', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></span>
                      <span>Exam Revision Timetable</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="college" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'college', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f59e0b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></span>
                      <span>College Lab Schedule</span>
                    </div>
                  </div>
                  <div class="custom-dropdown-option" data-value="study" onclick="app.handlers.onSelectCustomDropdown('classicPresetTemplates', 'study', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicPresetTemplates', function(val){ app.handlers.applyClassicTemplate(val); })">
                    <div class="custom-drop-item-content">
                      <span class="custom-drop-icon" style="color:#f43f5e;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
                      <span>Study Planner</span>
                    </div>
                  </div>
                </div>
`;

// Replace menu block
const replaceDropdown = (sourceHtml, newMenuHtml) => {
  const menuStart = sourceHtml.indexOf('<div class="custom-dropdown-menu">');
  const menuEnd = sourceHtml.indexOf('</div>\n              </div>\n            </div>\n            <!-- Export & Utility Buttons -->');
  if (menuStart > -1 && menuEnd > -1) {
    return sourceHtml.substring(0, menuStart) + newMenuHtml.trim() + sourceHtml.substring(menuEnd);
  }
  return sourceHtml;
}

const seoStyles = `
    <style>
      .seo-content-section {
        max-width: 1200px;
        margin: 40px auto;
        padding: 30px;
        background: var(--bg-card);
        border-radius: 12px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
      }
      .seo-content-section h1, .seo-content-section h2 {
        color: var(--text-main);
        font-family: 'Poppins', sans-serif;
        margin-bottom: 16px;
      }
      .seo-content-section p {
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 16px;
      }
      .seo-content-section ul {
        color: var(--text-muted);
        line-height: 1.6;
        margin-bottom: 16px;
        padding-left: 20px;
      }
      .seo-content-section li {
        margin-bottom: 8px;
      }
    </style>
`;

const hpSeo = `
    <div class="seo-content-section">
      <h1>Free Online Timetable Creator</h1>
      <p>Welcome to the most versatile <strong>Timetable Creator Online</strong>. Whether you're planning your weekly routines, mapping out your work shifts, organizing workout schedules, or preparing meal plans, our simple grid-based planner gives you complete control over your time.</p>
      <h2>Why use our Schedule Maker?</h2>
      <ul>
        <li><strong>Easy to Use:</strong> Intuitive drag, drop, and click interactions.</li>
        <li><strong>Fully Customizable:</strong> Add custom colors, adjust time intervals, and select beautiful themes.</li>
        <li><strong>Export Anywhere:</strong> Download your timetable as a high-quality PDF, PNG, or JSON to share with others.</li>
        <li><strong>No Login Required:</strong> Start building your schedule instantly without any complicated signups.</li>
      </ul>
      <p>Take charge of your productivity today by creating a clear, visually appealing schedule that keeps you on track. Our general purpose planner is perfect for freelancers, parents, fitness enthusiasts, and professionals.</p>
    </div>
`;

const stuSeo = `
    <div class="seo-content-section">
      <h1>Student Timetable Generator Online</h1>
      <p>Welcome to the ultimate <strong>Student Timetable Generator</strong>. Designed specifically for university students, high schoolers, and college attendees, this tool helps you organize your lectures, labs, and study sessions effortlessly.</p>
      <h2>Perfect for Academic Success</h2>
      <ul>
        <li><strong>Smart Course Planning:</strong> Keep track of different subjects, professors, and classroom locations in one view.</li>
        <li><strong>Exam Revision:</strong> Map out a structured revision timetable to ensure you cover all topics before finals.</li>
        <li><strong>Export & Print:</strong> Easily print your schedule or save it as a PDF to keep in your binder or on your digital devices.</li>
        <li><strong>Student Templates:</strong> Start quickly with pre-built templates for high school, college, and exam prep.</li>
      </ul>
      <p>Balance your academic life, extracurriculars, and personal time. A well-organized student planner is the first step towards better grades and a stress-free semester.</p>
    </div>
`;

let hpFinal = replaceDropdown(baseHtml, hpTemplateHtml);
hpFinal = hpFinal.replace('</body>', seoStyles + hpSeo + '</body>');

let stuFinal = replaceDropdown(baseHtml, stuTemplateHtml);
stuFinal = stuFinal.replace('</body>', seoStyles + stuSeo + '</body>');

fs.writeFileSync('index.html', hpFinal, 'utf8');

// Also update the app.js logic if needed to support these new template values in applyClassicTemplate
// Oh wait, `applyClassicTemplate` inside the inline script! Let's update that logic too.

const patchJS = `
          applyClassicTemplate(type) {
            this.state.events = [];
            
            // Homepage Templates
            if (type === 'personal') {
              this.state.events.push({ id: 'evt_'+Date.now(), title: 'Morning Run', day: 1, start: '07:00', end: '08:00', color: '#10b981' });
              this.state.events.push({ id: 'evt_'+Date.now()+1, title: 'Deep Work', day: 1, start: '09:00', end: '11:00', color: '#3b82f6' });
              this.state.events.push({ id: 'evt_'+Date.now()+2, title: 'Lunch', day: 1, start: '12:00', end: '13:00', color: '#f59e0b' });
              this.state.events.push({ id: 'evt_'+Date.now()+3, title: 'Errands', day: 6, start: '10:00', end: '12:00', color: '#8b5cf6' });
            }
            if (type === 'work') {
              for (let i = 1; i <= 5; i++) {
                this.state.events.push({ id: 'evt_w1'+i, title: 'Shift Block', day: i, start: '09:00', end: '17:00', color: '#3b82f6' });
              }
            }
            if (type === 'fitness') {
              this.state.events.push({ id: 'evt_f1', title: 'Chest & Triceps', day: 1, start: '17:00', end: '18:30', color: '#f43f5e' });
              this.state.events.push({ id: 'evt_f2', title: 'Back & Biceps', day: 3, start: '17:00', end: '18:30', color: '#f43f5e' });
              this.state.events.push({ id: 'evt_f3', title: 'Leg Day', day: 5, start: '17:00', end: '18:30', color: '#f43f5e' });
            }
            if (type === 'meal') {
              for (let i = 1; i <= 7; i++) {
                this.state.events.push({ id: 'evt_m1'+i, title: 'Breakfast', day: i, start: '08:00', end: '08:30', color: '#f59e0b' });
                this.state.events.push({ id: 'evt_m2'+i, title: 'Lunch', day: i, start: '13:00', end: '14:00', color: '#10b981' });
                this.state.events.push({ id: 'evt_m3'+i, title: 'Dinner', day: i, start: '19:30', end: '20:30', color: '#8b5cf6' });
              }
            }
            if (type === 'cleaning') {
              this.state.events.push({ id: 'evt_c1', title: 'Vacuum', day: 1, start: '09:00', end: '09:30', color: '#0ea5e9' });
              this.state.events.push({ id: 'evt_c2', title: 'Laundry', day: 3, start: '10:00', end: '11:00', color: '#0ea5e9' });
              this.state.events.push({ id: 'evt_c3', title: 'Deep Clean', day: 6, start: '10:00', end: '13:00', color: '#0ea5e9' });
            }

            // Student Templates
            if (type === 'university') {
              this.state.events.push({ id: 'evt_'+Date.now(), title: 'Computer Science 101', room: 'Hall 3', day: 1, start: '09:00', end: '10:30', color: '#3b82f6' });
              this.state.events.push({ id: 'evt_'+Date.now()+1, title: 'Advanced Calculus', room: 'Room 4B', day: 3, start: '11:00', end: '12:30', color: '#8b5cf6' });
              this.state.events.push({ id: 'evt_'+Date.now()+2, title: 'Physics Lab', room: 'Lab 2', day: 4, start: '14:00', end: '16:00', color: '#10b981' });
            }
            if (type === 'school') {
              for (let i = 1; i <= 5; i++) {
                this.state.events.push({ id: 'evt_s1'+i, title: 'Mathematics', day: i, start: '08:30', end: '09:15', color: '#ef4444' });
                this.state.events.push({ id: 'evt_s2'+i, title: 'English', day: i, start: '09:20', end: '10:05', color: '#3b82f6' });
              }
            }
            if (type === 'exam') {
              this.state.events.push({ id: 'evt_e1', title: 'Biology Revision', day: 1, start: '09:00', end: '12:00', color: '#f59e0b' });
              this.state.events.push({ id: 'evt_e2', title: 'Math Practice', day: 2, start: '13:00', end: '16:00', color: '#3b82f6' });
              this.state.events.push({ id: 'evt_e3', title: 'History Notes', day: 3, start: '09:00', end: '11:00', color: '#10b981' });
            }
            if (type === 'college') {
              this.state.events.push({ id: 'evt_l1', title: 'Chemistry Lab', room: 'Chem Lab A', day: 2, start: '13:00', end: '16:00', color: '#10b981' });
              this.state.events.push({ id: 'evt_l2', title: 'Bio Lab', room: 'Bio Lab B', day: 4, start: '14:00', end: '17:00', color: '#10b981' });
            }
            if (type === 'study') {
              for (let i = 1; i <= 5; i++) {
                this.state.events.push({ id: 'evt_st1'+i, title: 'Self Study', day: i, start: '18:00', end: '20:00', color: '#8b5cf6' });
              }
            }
            
            this.classicRenderEvents();
            this.classicUpdateStats();
            this.setCustomDropdownValue('classicPresetTemplates', '', 'wrap_classicPresetTemplates');
          },
`;

const replaceAppLogic = (sourceHtml) => {
  const matchStart = sourceHtml.indexOf('applyClassicTemplate(type) {');
  if (matchStart > -1) {
    const nextFn = sourceHtml.indexOf('adjustStyle(type, value) {', matchStart);
    return sourceHtml.substring(0, matchStart) + patchJS.trim() + ',\n          ' + sourceHtml.substring(nextFn);
  }
  return sourceHtml;
}

hpFinal = replaceAppLogic(fs.readFileSync('index.html', 'utf8'));
stuFinal = replaceAppLogic(stuFinal);

fs.writeFileSync('index.html', hpFinal, 'utf8');
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', stuFinal, 'utf8');
fs.writeFileSync('public/timetable-generator/index.html', hpFinal, 'utf8');

console.log('Made homepage and student versions successfully');

