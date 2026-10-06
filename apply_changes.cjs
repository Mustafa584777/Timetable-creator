const fs = require('fs');

const files = [
  'index.html',
  'public/timetable-generator-online-for-students/index.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add individual days to both dropdowns
  if (!content.includes('<optgroup label="Individual Days">')) {
    const individualDaysHTML = `
   <optgroup label="Individual Days">
     <option value="day-1">Monday Only</option>
     <option value="day-2">Tuesday Only</option>
     <option value="day-3">Wednesday Only</option>
     <option value="day-4">Thursday Only</option>
     <option value="day-5">Friday Only</option>
     <option value="day-6">Saturday Only</option>
     <option value="day-0">Sunday Only</option>
   </optgroup>
</select>`;
    content = content.replace(/<option value="0-6">Sunday - Saturday \(7 Days\)<\/option>\s*<\/select>/g, `<option value="0-6">Sunday - Saturday (7 Days)</option>${individualDaysHTML}`);
  }

  // Support for 'day-X' in getActiveDays
  if (content.includes('getActiveDays() {') && !content.includes('if (d.startsWith(\'day-\'))')) {
    content = content.replace(/getActiveDays\(\) \{\s*const d = this\.state\.config\.days;\s*if \(d === '1-5'\)/g, 
      `getActiveDays() {\n        const d = this.state.config.days;\n        if (d.startsWith('day-')) return [parseInt(d.split('-')[1])];\n        if (d === '1-5')`);
  }

  // 2. Make color theme functional by replacing hardcoded colors
  content = content.replace(/rgba\(103, 61, 230, 0\.06\)/g, 'var(--primary-glow)');
  content = content.replace(/rgba\(103, 61, 230, 0\.1\)/g, 'var(--primary-glow)');
  content = content.replace(/#673de6/g, 'var(--primary-color)');

  // 3. Stretch / Resize buttons logic & placement
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

  // Remove existing stretch buttons if any
  if (content.includes('<!-- Stretch / Expand & Reset Controls Bar -->')) {
    content = content.replace(/<!-- Stretch \/ Expand & Reset Controls Bar -->[\s\S]*?<\/div>/, '');
  }

  // Insert stretch buttons after tip container
  if (!content.includes('<!-- Stretch / Expand & Reset Controls Bar -->')) {
    content = content.replace(/(<div class="tip-container" id="tipContainer">[\s\S]*?<\/div>)/, `$1${stretchButtonsHtml}`);
  }

  // Add stretch handlers
  if (!content.includes('toggleStretchMode(')) {
    const stretchHandlers = `
          toggleStretchMode() {
            if (app.state.stretchEnabled === undefined) app.state.stretchEnabled = true;
            app.state.stretchEnabled = !app.state.stretchEnabled;
            const btn = document.getElementById('toggleResizeBtn');
            const label = document.getElementById('stretchLabelText');
            if (app.state.stretchEnabled) {
              btn.style.background = 'var(--primary-glow)';
              btn.style.borderColor = 'var(--primary-color)';
              btn.style.color = 'var(--primary-color)';
              if(label) label.textContent = 'Stretch: Enabled';
            } else {
              btn.style.background = 'var(--bg-card)';
              btn.style.borderColor = 'var(--border-color)';
              btn.style.color = 'var(--text-main)';
              if(label) label.textContent = 'Stretch: Disabled';
            }
            app.render();
          },
          resetGridWidth() {
            app.state.colWidths = {};
            app.saveState();
            app.render();
          },
          resetGridHeight() {
            app.state.rowHeights = {};
            app.saveState();
            app.render();
          },
`;
    content = content.replace(/handlers: \{/, `handlers: {${stretchHandlers}`);
  }
  
  // Make sure stretch is disabled inside render if !app.state.stretchEnabled
  if (!content.includes('if(app.state.stretchEnabled === false) return;')) {
    // Add logic to grid drag handle to respect stretchEnabled
    content = content.replace(/function initColResizer.*?\{/g, `$& if(app.state.stretchEnabled === false) return;`);
    content = content.replace(/function initRowResizer.*?\{/g, `$& if(app.state.stretchEnabled === false) return;`);
  }

  // 4. Move Footer Container
  if (content.includes('<footer class="seo-footer">')) {
    const footerMatch = content.match(/<footer class="seo-footer">[\s\S]*?<\/footer>/);
    if (footerMatch) {
      const footerHTML = footerMatch[0];
      content = content.replace(footerHTML, ''); // Remove from original position
      
      // Place it after the text "Take charge of your productivity today..." container
      // The text is inside <div class="classic-productivity-text-wrap"> ... </div>
      // Wait, let's just use the known string
      const anchorString = "Take charge of your productivity today by creating a clear, visually appealing schedule that keeps you on track. Our general purpose planner is perfect for freelancers, parents, fitness enthusiasts, and professionals.";
      
      // Find the tag wrapping this string. It might be a <p> or <div>. 
      // It's likely `<p class="classic-seo-subdesc">`
      // Let's just insert the footer immediately after the closing tag of the element containing that text.
      const rgx = new RegExp(`(${anchorString}[^<]*<\\/[^>]+>)\\s*<\\/div>`);
      
      if (rgx.test(content)) {
        content = content.replace(rgx, `$1</div>\n${footerHTML}\n`);
      } else {
        // Fallback: Just insert it after the end of classic-seo-container
        content = content.replace(/(<\/div>\s*<!-- End SEO Context -->)/, `${footerHTML}\n$1`);
      }
    }
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
