import fs from 'fs';

console.log("Patching JavaScript logic in index.html...");
let html = fs.readFileSync('index.html', 'utf8');

// Default starter events definition
const defaultStarterEventsCode = `
      defaultStarterEvents: [
        {
          id: "evt_starter_1",
          title: "Mathematics & Calculus",
          subject: "Mathematics",
          teacher: "Prof. Anderson",
          room: "Room 101",
          location: "Room 101",
          category: "Academic",
          notes: "Scientific calculator & workbook",
          day: 0,
          startTime: 510,
          endTime: 600,
          color: "#3b82f6"
        },
        {
          id: "evt_starter_2",
          title: "Computer Science Lab",
          subject: "Computer Science",
          teacher: "Dr. Evans",
          room: "Lab 3B",
          location: "Lab 3B",
          category: "Practical",
          notes: "Data structures & algorithm exercises",
          day: 0,
          startTime: 630,
          endTime: 750,
          color: "#10b981"
        },
        {
          id: "evt_starter_3",
          title: "Physics Mechanics",
          subject: "Physics",
          teacher: "Dr. Miller",
          room: "Hall A",
          location: "Hall A",
          category: "Academic",
          notes: "Chapters 4 & 5 problem review",
          day: 1,
          startTime: 540,
          endTime: 630,
          color: "#8b5cf6"
        },
        {
          id: "evt_starter_4",
          title: "English Literature",
          subject: "English",
          teacher: "Prof. Davies",
          room: "Room 204",
          location: "Room 204",
          category: "Humanities",
          notes: "Reading assignment & essay workshop",
          day: 1,
          startTime: 660,
          endTime: 750,
          color: "#f59e0b"
        },
        {
          id: "evt_starter_5",
          title: "Chemistry Laboratory",
          subject: "Chemistry",
          teacher: "Dr. Watson",
          room: "Chem Lab 2",
          location: "Chem Lab 2",
          category: "Practical",
          notes: "Safety goggles required for titration experiment",
          day: 2,
          startTime: 540,
          endTime: 690,
          color: "#06b6d4"
        },
        {
          id: "evt_starter_6",
          title: "History & World Affairs",
          subject: "History",
          teacher: "Prof. Clark",
          room: "Room 302",
          location: "Room 302",
          category: "Humanities",
          notes: "Midterm revision notes sharing",
          day: 3,
          startTime: 600,
          endTime: 690,
          color: "#ec4899"
        },
        {
          id: "evt_starter_7",
          title: "Physical Education & Fitness",
          subject: "Sports",
          teacher: "Coach Taylor",
          room: "Main Gym",
          location: "Main Gym",
          category: "Fitness",
          notes: "Cardio conditioning & team games",
          day: 4,
          startTime: 540,
          endTime: 630,
          color: "#10b981"
        },
        {
          id: "evt_starter_8",
          title: "Study Group & Project Work",
          subject: "Self Study",
          teacher: "Study Circle",
          room: "Library 4",
          location: "Library 4",
          category: "Study",
          notes: "Group assignment finalization",
          day: 4,
          startTime: 660,
          endTime: 780,
          color: "#6366f1"
        }
      ],
`;

// Insert defaultStarterEvents into app object if not present
if (!html.includes('defaultStarterEvents:')) {
  html = html.replace('window.app = {', 'window.app = {\n' + defaultStarterEventsCode);
}

// Ensure app.init() checks for empty events and populates defaultStarterEvents
const oldInitPattern = `this.loadState();`;
const newInitPattern = `this.loadState();
          if (!this.state.events || !Array.isArray(this.state.events) || this.state.events.length === 0) {
            this.state.events = JSON.parse(JSON.stringify(this.defaultStarterEvents));
          }`;

if (!html.includes('defaultStarterEvents))')) {
  html = html.replace(oldInitPattern, newInitPattern);
}

// Update renderClassicGrid
const oldRenderClassicGridPattern = /renderClassicGrid\(\)\s*\{[\s\S]*?renderGridStructure\(\)/;

const newRenderClassicGrid = `renderClassicGrid() {
          try {
            const table = document.getElementById('classicTableGrid');
            if (!table) return;

            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const activeDaysCount = parseInt(this.state.config.daysCount) || 7;
            const mStep = parseInt(this.state.config.interval) || 30;
            const startTime = parseInt(this.state.config.startTime) !== undefined ? parseInt(this.state.config.startTime) : 480;
            const endTime = parseInt(this.state.config.endTime) !== undefined ? parseInt(this.state.config.endTime) : 1140;
            const totalSlots = Math.max(1, Math.floor((endTime - startTime) / mStep));

            // Synchronize zoom state
            if (!this.state.classicZoom) this.state.classicZoom = 1.0;
            const zoomValLabel = document.getElementById('classicZoomValLabel');
            if (zoomValLabel) {
              zoomValLabel.textContent = \`\${Math.round(this.state.classicZoom * 100)}%\`;
            }
            document.documentElement.style.setProperty('--classic-zoom', this.state.classicZoom);

            // Synchronize inputs in classic toolbar
            const titleInput = document.getElementById('classicTtTitle');
            const subtitleInput = document.getElementById('classicTtSubtitle');
            if (titleInput && this.state.classicTitle) titleInput.value = this.state.classicTitle;
            if (subtitleInput && this.state.classicSubtitle) subtitleInput.value = this.state.classicSubtitle;

            if (this.handlers && this.handlers.setCustomDropdownValue) {
              this.handlers.setCustomDropdownValue('classicConfigDays', activeDaysCount, 'wrap_classicConfigDays');
              this.handlers.setCustomDropdownValue('classicConfigStart', startTime, 'wrap_classicConfigStart');
              this.handlers.setCustomDropdownValue('classicConfigEnd', endTime, 'wrap_classicConfigEnd');
              this.handlers.setCustomDropdownValue('classicConfigInterval', mStep, 'wrap_classicConfigInterval');
              this.handlers.setCustomDropdownValue('classicConfigFormat', this.state.config.use24h ? "24" : "12", 'wrap_classicConfigFormat');
              this.handlers.setCustomDropdownValue('classicConfigTheme', this.state.config.theme || 'slate', 'wrap_classicConfigTheme');
            }

            // Update stats strip in classic ribbon
            const validEvents = (this.state.events || []).filter(evt => evt.day < activeDaysCount);
            const totalMinutes = validEvents.reduce((acc, evt) => {
              const dur = Math.max(0, (evt.endTime || 0) - (evt.startTime || 0));
              return acc + dur;
            }, 0);
            const totalHours = (totalMinutes / 60).toFixed(1).replace(/\\.0$/, '');

            const statClasses = document.getElementById('classicStatClasses');
            const statHours = document.getElementById('classicStatHours');
            const statDays = document.getElementById('classicStatDays');
            const statSpan = document.getElementById('classicStatSpan');

            if (statClasses) statClasses.textContent = validEvents.length;
            if (statHours) statHours.textContent = \`\${totalHours}h\`;
            if (statDays) statDays.textContent = \`\${activeDaysCount} Days\`;
            if (statSpan) statSpan.textContent = \`\${this.formatMinute(startTime)} - \${this.formatMinute(endTime)}\`;

            // Build the Table HTML
            let html = '<thead><tr><th class="classic-th-corner">Time</th>';
            for (let d = 0; d < activeDaysCount; d++) {
              html += \`<th class="classic-th-day" id="classic-th-day-\${d}" data-day="\${d}">
                <span>\${dayNames[d]}</span>
              </th>\`;
            }
            html += '</tr></thead><tbody>';

            for (let s = 0; s < totalSlots; s++) {
              const slotMin = startTime + (s * mStep);
              const timeLabel = this.formatMinute(slotMin);
              html += \`<tr><td class="classic-td-time">\${timeLabel}</td>\`;
              for (let d = 0; d < activeDaysCount; d++) {
                html += \`<td class="classic-td-cell" data-day="\${d}" data-time="\${slotMin}" onclick="app.handlers.openClassicAddModal(\${d}, \${slotMin})" oncontextmenu="app.handlers.showEmptyCellContext(event, \${d}, \${slotMin})" title="Add activity on \${dayNames[d]} at \${timeLabel}">
                  <svg class="classic-cell-add-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"></path></svg>
                </td>\`;
              }
              html += '</tr>';
            }
            html += '</tbody>';
            table.innerHTML = html;

            // Render events on top of the classic grid
            const cellHeight = 48; // Base table cell height in px
            const pxPerMin = cellHeight / mStep;

            validEvents.forEach(evt => {
              if (evt.startTime >= endTime || evt.endTime <= startTime) return;

              const visibleStart = Math.max(evt.startTime, startTime);
              const visibleEnd = Math.min(evt.endTime, endTime);
              const duration = visibleEnd - visibleStart;

              // Find the first matching cell for this day
              const firstCell = table.querySelector(\`.classic-td-cell[data-day="\${evt.day}"][data-time="\${startTime}"]\`);
              if (!firstCell) return;

              const topOffset = (visibleStart - startTime) * pxPerMin + 2;
              const height = Math.max(34, (duration * pxPerMin) - 4);

              const eventCard = document.createElement('div');
              eventCard.className = 'classic-event-item';
              eventCard.id = \`classic-evt-\${evt.id}\`;
              eventCard.style.top = \`\${topOffset}px\`;
              eventCard.style.height = \`\${height}px\`;
              eventCard.style.backgroundColor = evt.color || '#10b981';

              eventCard.onclick = (e) => {
                e.stopPropagation();
                app.handlers.openClassicEditModal(evt);
              };

              eventCard.oncontextmenu = (e) => {
                app.handlers.showEventContext(e, evt);
              };

              const timeBadge = \`\${this.formatMinute(evt.startTime)} - \${this.formatMinute(evt.endTime)}\`;

              eventCard.innerHTML = \`
                <div class="classic-event-title-line">
                  <span class="classic-event-title" title="\${this.escapeHtml(evt.title)}">\${this.escapeHtml(evt.title)}</span>
                  <div class="classic-event-tools">
                    <button class="classic-evt-btn" title="Add activity next" onclick="event.stopPropagation(); app.handlers.openClassicAddModal(\${evt.day}, \${evt.endTime})">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"></path></svg>
                    </button>
                    <button class="classic-evt-btn" title="Edit activity" onclick="event.stopPropagation(); app.handlers.openClassicEditModal(app.state.events.find(x => x.id === '\${evt.id}'))">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="classic-evt-btn" title="Copy (Ctrl+C)" onclick="event.stopPropagation(); app.copyEvent('\${evt.id}')">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button class="classic-evt-btn" title="Duplicate activity" onclick="event.stopPropagation(); app.duplicateEvent('\${evt.id}')">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"></path></svg>
                    </button>
                    \${this.state.clipboard ? \`
                    <button class="classic-evt-btn" title="Paste activity after this" onclick="event.stopPropagation(); app.pasteEvent(\${evt.day}, \${evt.endTime})">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    </button>
                    \` : ''}
                    <button class="classic-evt-btn" title="Delete activity" onclick="event.stopPropagation(); app.deleteEvent('\${evt.id}')">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
                <div class="classic-event-details">
                  \${evt.teacher ? \`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>\${this.escapeHtml(evt.teacher)}</span>\` : ''}
                  \${evt.room ? \`<span style="display:inline-flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>\${this.escapeHtml(evt.room)}</span>\` : ''}
                  <span class="classic-event-badge-time" style="display:inline-flex;align-items:center;gap:3px;"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>\${timeBadge}</span>
                </div>
              \`;

              firstCell.appendChild(eventCard);
            });
          } catch(err) {
            console.error('Error rendering Classic Timetable grid:', err);
          }
        },
        renderGridStructure()`;

html = html.replace(oldRenderClassicGridPattern, newRenderClassicGrid);

// Update context menu methods inside app.handlers
const contextMethods = `
          showEventContext(e, evt) {
            if (!evt) return;
            e.preventDefault();
            e.stopPropagation();
            app.state.ctxSelectedEventId = evt.id;
            app.state.ctxSelectedDay = evt.day;
            app.state.ctxSelectedTime = evt.endTime;
            const menu = document.getElementById('ctxMenu');
            if (!menu) return;

            const eventActions = document.getElementById('ctxEventActions');
            const cellActions = document.getElementById('ctxCellActions');
            if (eventActions) eventActions.style.display = 'block';
            if (cellActions) cellActions.style.display = 'none';

            const pasteItem = document.getElementById('ctxPasteItem');
            if (pasteItem) {
              pasteItem.style.opacity = app.state.clipboard ? '1' : '0.5';
              pasteItem.style.pointerEvents = app.state.clipboard ? 'auto' : 'none';
            }

            menu.style.display = 'block';
            const menuWidth = 190;
            const menuHeight = 260;
            const x = (e.clientX + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 12) : e.clientX;
            const y = (e.clientY + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 12) : e.clientY;
            menu.style.left = \`\${Math.max(10, x)}px\`;
            menu.style.top = \`\${Math.max(10, y)}px\`;
          },

          showEmptyCellContext(e, day, slotMin) {
            e.preventDefault();
            e.stopPropagation();
            app.state.ctxSelectedEventId = null;
            app.state.ctxSelectedDay = day;
            app.state.ctxSelectedTime = slotMin;
            const menu = document.getElementById('ctxMenu');
            if (!menu) return;

            const eventActions = document.getElementById('ctxEventActions');
            const cellActions = document.getElementById('ctxCellActions');
            if (eventActions) eventActions.style.display = 'none';
            if (cellActions) cellActions.style.display = 'block';

            const cellPasteItem = document.getElementById('ctxCellPasteItem');
            if (cellPasteItem) {
              cellPasteItem.style.opacity = app.state.clipboard ? '1' : '0.5';
              cellPasteItem.style.pointerEvents = app.state.clipboard ? 'auto' : 'none';
            }

            menu.style.display = 'block';
            const menuWidth = 190;
            const menuHeight = 110;
            const x = (e.clientX + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 12) : e.clientX;
            const y = (e.clientY + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 12) : e.clientY;
            menu.style.left = \`\${Math.max(10, x)}px\`;
            menu.style.top = \`\${Math.max(10, y)}px\`;
          },

          contextEdit() {
            const id = app.state.ctxSelectedEventId;
            const item = app.state.events.find(evt => evt.id === id);
            if (item) app.handlers.openClassicEditModal(item);
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextAddAfter() {
            if (app.state.ctxSelectedDay !== undefined && app.state.ctxSelectedTime !== undefined) {
              app.handlers.openClassicAddModal(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextCopy() {
            if (app.state.ctxSelectedEventId) {
              app.copyEvent(app.state.ctxSelectedEventId);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextDuplicate() {
            if (app.state.ctxSelectedEventId) {
              app.duplicateEvent(app.state.ctxSelectedEventId);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextPaste() {
            if (app.state.ctxSelectedDay !== undefined && app.state.ctxSelectedTime !== undefined) {
              app.pasteEvent(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            } else {
              app.pasteEvent();
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextChangeColor(colorHex) {
            if (app.state.ctxSelectedEventId) {
              app.pushHistory();
              app.state.events = app.state.events.map(evt => {
                if (evt.id === app.state.ctxSelectedEventId) {
                  return { ...evt, color: colorHex };
                }
                return evt;
              });
              if (app.state.config.autoSave) app.saveState();
              app.render();
              app.showToast('Color updated', 'success');
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextDelete() {
            if (app.state.ctxSelectedEventId) {
              app.deleteEvent(app.state.ctxSelectedEventId);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextAddHere() {
            if (app.state.ctxSelectedDay !== undefined && app.state.ctxSelectedTime !== undefined) {
              app.handlers.openClassicAddModal(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          contextPasteHere() {
            if (app.state.ctxSelectedDay !== undefined && app.state.ctxSelectedTime !== undefined) {
              app.pasteEvent(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            }
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
          },

          resetSchedule() {
            if (confirm("Are you sure you want to clear all activities and reset your timetable?")) {
              app.pushHistory();
              app.state.events = [];
              if (app.state.config.autoSave) app.saveState();
              app.render();
              app.showToast("Timetable reset successfully", "info");
            }
          },
`;

// Replace existing context methods block or inject them into handlers
const oldContextBlockPattern = /contextEdit\(\)\s*\{[\s\S]*?contextDelete\(\)\s*\{[\s\S]*?\},/;
if (oldContextBlockPattern.test(html)) {
  html = html.replace(oldContextBlockPattern, contextMethods);
} else {
  // Inject before triggerImport
  html = html.replace('triggerImport()', contextMethods + '\n          triggerImport()');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Patched JavaScript logic successfully.");
