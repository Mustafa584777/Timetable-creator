const fs = require('fs');

const files = [
  'index.html',
  'public/timetable-generator-online-for-students/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  const stretchButtonsHtml = `
          <!-- Stretch / Expand & Reset Controls Bar -->
          <div class="resize-controls-bar" style="display: flex; gap: 8px; margin-top: 12px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; padding: 0 16px;">
            <button id="toggleResizeBtn" class="classic-btn-cfg-action" onclick="app.handlers.toggleStretchMode()" title="Toggle ability to stretch and resize columns and rows" style="background: var(--primary-glow); color: var(--primary-color); border: 1px solid var(--primary-color); height: 32px; padding: 0 14px; font-size: 12.5px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; font-weight: 600; transition: all 0.2s;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              <span id="stretchLabelText">Stretch: Enabled</span>
            </button>
            <button class="classic-btn-cfg-action" onclick="app.handlers.resetGridWidth()" title="Reset column widths to default" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); height: 32px; padding: 0 14px; font-size: 12.5px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; font-weight: 500; transition: all 0.2s;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 12H3m18 0l-4-4m4 4l-4 4M3 12l4-4m-4 4l4 4"/></svg>
              <span>Reset Width</span>
            </button>
            <button class="classic-btn-cfg-action" onclick="app.handlers.resetGridHeight()" title="Reset row heights to default" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-color); height: 32px; padding: 0 14px; font-size: 12.5px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 7px; font-weight: 500; transition: all 0.2s;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3v18m0-18l-4 4m4-4l4 4m-4 14l-4-4m4 4l4-4"/></svg>
              <span>Reset Height</span>
            </button>
          </div>
`;

  if (content.includes('<!-- Stretch / Expand & Reset Controls Bar -->')) {
    content = content.replace(/<!-- Stretch \/ Expand & Reset Controls Bar -->[\s\S]*?<\/div>/, '');
  }

  // Insert stretch buttons after classic-mobile-scroll-hint
  const regex = /(<div class="classic-mobile-scroll-hint">[\s\S]*?<\/div>)/;
  if (!content.includes('<!-- Stretch / Expand & Reset Controls Bar -->') && regex.test(content)) {
    content = content.replace(regex, `$1\n${stretchButtonsHtml}`);
  } else if (!regex.test(content)) {
    console.log("Could not find classic-mobile-scroll-hint in " + file);
  }

  fs.writeFileSync(file, content, 'utf8');
});
