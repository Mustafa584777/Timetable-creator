const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const proHoverReplacement = `
            // Click callbacks
            card.addEventListener('pointerdown', (e) => {
              // Ignore if right click triggered
              if (e.button === 2) return;
              this.initCardDrag(e, evt);
            });
            
            // Context menu on right click
            card.addEventListener('contextmenu', (e) => {
              e.preventDefault();
              if (app.handlers && app.handlers.showEventContext) {
                 app.handlers.showEventContext(e, evt);
              }
            });
`;
html = html.replace(/card\.addEventListener\('pointerdown', \(e\) => \{\s*\/\/ Ignore if right click triggered\s*if \(e\.button === 2\) return;\s*this\.initCardDrag\(e, evt\);\s*\}\);/, proHoverReplacement);

const emptyCellContext = `
              div.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (app.handlers && app.handlers.showEmptyCellContext) {
                   app.handlers.showEmptyCellContext(e, dayId, timeStart);
                }
              });
              div.addEventListener('pointerdown', (e) => {
`;
html = html.replace(/div\.addEventListener\('pointerdown', \(e\) => \{/, emptyCellContext);

// Add hover actions to Pro mode events
const proHoverActions = `
            const actionsDrawer = document.createElement('div');
            actionsDrawer.className = 'event-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'evt-act';
            editBtn.title = 'Edit';
            editBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>\`;
            editBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.handlers.openEditEventModal(evt);
            });
            actionsDrawer.appendChild(editBtn);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'evt-act';
            copyBtn.title = 'Copy';
            copyBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>\`;
            copyBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.copyEvent(evt.id);
            });
            actionsDrawer.appendChild(copyBtn);

            const dupBtn = document.createElement('button');
            dupBtn.className = 'evt-act';
            dupBtn.title = 'Duplicate';
            dupBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v14M5 12h14"></path></svg>\`;
            dupBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.duplicateEvent(evt.id);
            });
            actionsDrawer.appendChild(dupBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'evt-act';
            deleteBtn.title = 'Delete';
            deleteBtn.innerHTML = \`<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>\`;
            deleteBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              this.deleteEvent(evt.id);
            });
            actionsDrawer.appendChild(deleteBtn);

            card.appendChild(actionsDrawer);
`;
html = html.replace(/\/\/ Float Options Drawer[\s\S]*?card\.appendChild\(actionsDrawer\);/, proHoverActions);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Patched Pro Mode hover actions');
