import fs from 'fs';

console.log("Applying comprehensive updates to index.html...");
let html = fs.readFileSync('index.html', 'utf8');

// =========================================================================
// 1. UPDATE CSS FOR DROPDOWNS, HOVER TOOLS, AND CONTEXT MENU
// =========================================================================
const customDropCss = `
      .custom-dropdown-label {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .custom-drop-item-content {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }
      .custom-drop-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
      }
      .custom-drop-icon svg {
        width: 14px;
        height: 14px;
      }
      .classic-event-tools {
        display: none;
        align-items: center;
        gap: 2px;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        padding: 2px 4px;
        border-radius: 4px;
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 20;
      }
      .classic-event-item:hover .classic-event-tools {
        display: flex;
      }
      .classic-evt-btn {
        background: transparent;
        border: none;
        color: #ffffff;
        padding: 2px 4px;
        border-radius: 3px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        opacity: 0.85;
        transition: all 0.12s ease;
      }
      .classic-evt-btn:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.1);
      }
`;

if (!html.includes('.custom-drop-item-content')) {
  html = html.replace('/* Custom Dropdown Component Styling */', '/* Custom Dropdown Component Styling */' + customDropCss);
}

// =========================================================================
// 2. UPDATE CONTEXT MENU HTML
// =========================================================================
const newCtxMenuHtml = `<!-- Floating Context Menu -->
    <div id="ctxMenu" class="context-menu" style="display:none; position:fixed; z-index:99999;">
      <div id="ctxEventActions">
        <div class="context-menu-item" onclick="app.handlers.contextEdit()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <span>Edit Activity</span>
        </div>
        <div class="context-menu-item" onclick="app.handlers.contextAddAfter()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M12 4v16m8-8H4"></path></svg>
          <span>Add Activity After</span>
        </div>
        <div class="context-menu-item" onclick="app.handlers.contextCopy()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span>Copy Activity (Ctrl+C)</span>
        </div>
        <div class="context-menu-item" onclick="app.handlers.contextDuplicate()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M12 5v14M5 12h14"></path></svg>
          <span>Duplicate Activity</span>
        </div>
        <div class="context-menu-item" id="ctxPasteItem" onclick="app.handlers.contextPaste()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>Paste Activity (Ctrl+V)</span>
        </div>
        <div class="context-menu-divider"></div>
        <div style="padding: 6px 12px; display: flex; gap: 6px; align-items: center;">
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 500;">Color:</span>
          <div style="display: flex; gap: 4px;">
            <span class="ctx-color-dot" style="background:#3b82f6; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#3b82f6')"></span>
            <span class="ctx-color-dot" style="background:#10b981; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#10b981')"></span>
            <span class="ctx-color-dot" style="background:#8b5cf6; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#8b5cf6')"></span>
            <span class="ctx-color-dot" style="background:#f59e0b; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#f59e0b')"></span>
            <span class="ctx-color-dot" style="background:#ef4444; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#ef4444')"></span>
            <span class="ctx-color-dot" style="background:#ec4899; width:16px; height:16px; border-radius:50%; cursor:pointer; display:inline-block;" onclick="app.handlers.contextChangeColor('#ec4899')"></span>
          </div>
        </div>
        <div class="context-menu-divider"></div>
        <div class="context-menu-item danger" onclick="app.handlers.contextDelete()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          <span>Delete Activity</span>
        </div>
      </div>
      <div id="ctxCellActions" style="display:none;">
        <div class="context-menu-item" onclick="app.handlers.contextAddHere()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M12 4v16m8-8H4"></path></svg>
          <span>Add Activity Here</span>
        </div>
        <div class="context-menu-item" id="ctxCellPasteItem" onclick="app.handlers.contextPasteHere()">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          <span>Paste Activity Here</span>
        </div>
      </div>
    </div>`;

html = html.replace(/<!-- Floating Context Menu -->[\s\S]*?<\/div>\s*<!-- Active Toast Notifications -->/, newCtxMenuHtml + '\n    <!-- Active Toast Notifications -->');

// =========================================================================
// 3. UPDATE DROPDOWN LABELS IN TRIGGER BUTTONS
// =========================================================================
html = html.replace(
  `<div class="custom-dropdown-wrap" id="wrap_classicPresetTemplates" style="min-width: 220px;">
                <input type="hidden" id="classicPresetTemplates" value="">
                <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicPresetTemplates', event)" aria-label="Load Template">
                  <span class="custom-dropdown-label">Load Template Schedule...</span>`,
  `<div class="custom-dropdown-wrap" id="wrap_classicPresetTemplates" style="min-width: 220px;">
                <input type="hidden" id="classicPresetTemplates" value="">
                <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicPresetTemplates', event)" aria-label="Load Template">
                  <span class="custom-dropdown-label"><span class="custom-drop-icon" style="color:var(--text-muted);"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M4 6h16M4 12h16M4 18h7"></path></svg></span><span>Load Template Schedule...</span></span>`
);

html = html.replace(
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigDays">
                      <input type="hidden" id="classicConfigDays" value="7">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigDays', event)" aria-label="Active Days">
                        <span class="custom-dropdown-label">Mon - Sun (7 Days)</span>`,
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigDays">
                      <input type="hidden" id="classicConfigDays" value="7">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigDays', event)" aria-label="Active Days">
                        <span class="custom-dropdown-label"><span class="custom-drop-icon" style="color:#8b5cf6;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span><span>Mon - Sun (7 Days)</span></span>`
);

html = html.replace(
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigInterval">
                      <input type="hidden" id="classicConfigInterval" value="30">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigInterval', event)" aria-label="Time Interval">
                        <span class="custom-dropdown-label">30 Minutes</span>`,
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigInterval">
                      <input type="hidden" id="classicConfigInterval" value="30">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigInterval', event)" aria-label="Time Interval">
                        <span class="custom-dropdown-label"><span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span><span>30 Minutes</span></span>`
);

html = html.replace(
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigFormat">
                      <input type="hidden" id="classicConfigFormat" value="24">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigFormat', event)" aria-label="Time Format">
                        <span class="custom-dropdown-label">24-Hour (Military)</span>`,
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigFormat">
                      <input type="hidden" id="classicConfigFormat" value="24">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigFormat', event)" aria-label="Time Format">
                        <span class="custom-dropdown-label"><span class="custom-drop-icon" style="color:#6366f1;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg></span><span>24-Hour (Military)</span></span>`
);

html = html.replace(
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigTheme">
                      <input type="hidden" id="classicConfigTheme" value="slate">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigTheme', event)" aria-label="Grid Theme">
                        <span class="custom-dropdown-label">Vibrant Classic</span>`,
  `<div class="custom-dropdown-wrap" id="wrap_classicConfigTheme">
                      <input type="hidden" id="classicConfigTheme" value="slate">
                      <button type="button" class="custom-dropdown-trigger" onclick="app.handlers.toggleCustomDropdown('wrap_classicConfigTheme', event)" aria-label="Grid Theme">
                        <span class="custom-dropdown-label"><span class="custom-drop-icon" style="color:#10b981;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8M8 12h8"></path></svg></span><span>Vibrant Classic</span></span>`
);

// Fix CTA button scroll target
html = html.replace(/onclick="document\.getElementById\('gridWorkspace'\)\.scrollTo\({top: 0, behavior: 'smooth'}\);"/g, 'onclick="window.scrollTo({top: 0, behavior: \'smooth\'});"');

// Save initial replacements
fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated HTML markup and styles");
