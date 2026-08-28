import fs from 'fs';

console.log("Fixing JSON parse error and hardening all state logic...");
let html = fs.readFileSync('index.html', 'utf8');

const defaultStarterEventsObj = `
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
        ],`;

// Add defaultStarterEvents to const app = {
if (!html.includes('defaultStarterEvents: [')) {
  html = html.replace('const app = {', 'const app = {' + defaultStarterEventsObj);
}

// Ensure init() safely handles defaultStarterEvents
const oldInitEventsCheck = `this.loadState();
          if (!this.state.events || !Array.isArray(this.state.events) || this.state.events.length === 0) {
            this.state.events = JSON.parse(JSON.stringify(this.defaultStarterEvents));
          }`;

const safeInitEventsCheck = `this.loadState();
          if (!this.state.events || !Array.isArray(this.state.events) || this.state.events.length === 0) {
            this.state.events = (this.defaultStarterEvents && Array.isArray(this.defaultStarterEvents))
              ? JSON.parse(JSON.stringify(this.defaultStarterEvents))
              : [];
          }`;

html = html.replace(oldInitEventsCheck, safeInitEventsCheck);

// Harden loadState against "undefined", "null", or malformed JSON
const oldLoadState = `loadState() {
          try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed.events) this.state.events = parsed.events;
              if (parsed.config) this.state.config = { ...this.state.config, ...parsed.config };
                            
              this.sanitizeConfig();
              this.syncConfigInputs();
            }
          } catch (e) {
            console.error('Persistence load failed, falling back to clean slate: ', e);
          }
        },`;

const safeLoadState = `loadState() {
          try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw && raw !== 'undefined' && raw !== 'null' && raw.trim() !== '') {
              const parsed = JSON.parse(raw);
              if (parsed && typeof parsed === 'object') {
                if (Array.isArray(parsed.events)) this.state.events = parsed.events;
                if (parsed.config && typeof parsed.config === 'object') {
                  this.state.config = { ...this.state.config, ...parsed.config };
                }
              }
              this.sanitizeConfig();
              this.syncConfigInputs();
            }
          } catch (e) {
            console.error('Persistence load failed, falling back to clean slate: ', e);
            if (!this.state.events || !Array.isArray(this.state.events) || this.state.events.length === 0) {
              this.state.events = (this.defaultStarterEvents && Array.isArray(this.defaultStarterEvents))
                ? JSON.parse(JSON.stringify(this.defaultStarterEvents))
                : [];
            }
          }
        },`;

html = html.replace(oldLoadState, safeLoadState);

// Harden undo and redo
const oldUndo = `undo() {
            if (app.state.history.undoStack.length === 0) {
              app.showToast('Nothing to undo', 'info');
              return;
            }
            const current = JSON.stringify(app.state.events);
            app.state.history.redoStack.push(current);
            const prev = app.state.history.undoStack.pop();
            app.state.events = JSON.parse(prev);
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.updateUndoRedoButtons();
            app.showToast('Action Undone', 'info');
          },`;

const safeUndo = `undo() {
            if (!app.state.history.undoStack || app.state.history.undoStack.length === 0) {
              app.showToast('Nothing to undo', 'info');
              return;
            }
            const current = JSON.stringify(app.state.events || []);
            app.state.history.redoStack.push(current);
            const prev = app.state.history.undoStack.pop();
            if (prev && prev !== 'undefined' && prev !== 'null') {
              try {
                app.state.events = JSON.parse(prev);
              } catch(e) {
                console.error('Failed to parse undo state:', e);
              }
            }
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.updateUndoRedoButtons();
            app.showToast('Action Undone', 'info');
          },`;

html = html.replace(oldUndo, safeUndo);

const oldRedo = `redo() {
            if (app.state.history.redoStack.length === 0) {
              app.showToast('Nothing to redo', 'info');
              return;
            }
            const current = JSON.stringify(app.state.events);
            app.state.history.undoStack.push(current);
            const next = app.state.history.redoStack.pop();
            app.state.events = JSON.parse(next);
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.updateUndoRedoButtons();
            app.showToast('Action Redone', 'info');
          },`;

const safeRedo = `redo() {
            if (!app.state.history.redoStack || app.state.history.redoStack.length === 0) {
              app.showToast('Nothing to redo', 'info');
              return;
            }
            const current = JSON.stringify(app.state.events || []);
            app.state.history.undoStack.push(current);
            const next = app.state.history.redoStack.pop();
            if (next && next !== 'undefined' && next !== 'null') {
              try {
                app.state.events = JSON.parse(next);
              } catch(e) {
                console.error('Failed to parse redo state:', e);
              }
            }
            if (app.state.config.autoSave) app.saveState();
            app.render();
            app.updateUndoRedoButtons();
            app.showToast('Action Redone', 'info');
          },`;

html = html.replace(oldRedo, safeRedo);

// Harden loadSharedScheduleFromData
const oldSharedFromData = `const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedStr))));
              const minified = JSON.parse(jsonStr);`;

const safeSharedFromData = `const jsonStr = decodeURIComponent(escape(atob(decodeURIComponent(encodedStr))));
              if (!jsonStr || jsonStr === 'undefined' || jsonStr === 'null') return null;
              const minified = JSON.parse(jsonStr);`;

html = html.replace(oldSharedFromData, safeSharedFromData);

// Save updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log("Successfully patched index.html");
