const fs = require('fs');
const path = require('path');

const updatedCoreCss = `
      /* ==========================================================================
         FIXED DROPDOWN ICON SIZING & COMPACT PRESENTATION (14px ICONS)
         ========================================================================== */
      .custom-dropdown-wrap {
        position: relative;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        user-select: none;
      }
      .custom-dropdown-trigger {
        width: 100%;
        height: 38px;
        min-height: 38px;
        max-height: 38px;
        padding: 0 10px;
        background: var(--bg-card) !important;
        color: var(--text-main) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
        text-align: left;
        box-sizing: border-box;
      }
      .custom-dropdown-trigger:hover {
        border-color: var(--primary-color) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
      }
      .custom-dropdown-wrap.open .custom-dropdown-trigger {
        border-color: var(--primary-color) !important;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
      }
      .custom-dropdown-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        color: var(--text-main);
        font-weight: 500;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        line-height: 1.2;
      }
      .custom-drop-item-content {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
        font-size: 12px;
      }
      .custom-drop-icon {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 14px !important;
        height: 14px !important;
        min-width: 14px !important;
        max-width: 14px !important;
        min-height: 14px !important;
        max-height: 14px !important;
        flex-shrink: 0 !important;
        line-height: 1 !important;
      }
      .custom-drop-icon svg,
      .custom-dropdown-trigger svg,
      .custom-dropdown-label svg,
      .custom-dropdown-option svg,
      .custom-drop-item-content svg {
        width: 14px !important;
        height: 14px !important;
        min-width: 14px !important;
        max-width: 14px !important;
        min-height: 14px !important;
        max-height: 14px !important;
        flex-shrink: 0 !important;
        display: inline-block !important;
        vertical-align: middle !important;
      }
      .custom-dropdown-chevron {
        width: 12px !important;
        height: 12px !important;
        min-width: 12px !important;
        max-width: 12px !important;
        min-height: 12px !important;
        max-height: 12px !important;
        flex-shrink: 0 !important;
        color: var(--text-muted) !important;
        transition: transform 0.2s ease, color 0.2s ease;
      }
      .custom-dropdown-wrap.open .custom-dropdown-chevron {
        transform: rotate(180deg);
        color: var(--primary-color) !important;
      }
      .custom-dropdown-menu {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        width: 100%;
        min-width: 180px;
        max-height: 250px;
        overflow-y: auto;
        background: var(--bg-card) !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
        padding: 4px;
        z-index: 1200;
        display: none;
        box-sizing: border-box;
      }
      .custom-dropdown-wrap.open .custom-dropdown-menu {
        display: block;
        animation: customDropdownSlide 0.15s ease forwards;
      }
      .custom-dropdown-option {
        padding: 6px 10px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-main);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.12s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        white-space: nowrap;
      }
      .custom-dropdown-option:hover {
        background: rgba(16, 185, 129, 0.08);
        color: var(--primary-color);
      }
      .custom-dropdown-option.selected {
        background: rgba(16, 185, 129, 0.12);
        color: var(--primary-color);
        font-weight: 600;
      }
      .custom-dropdown-option.selected::after {
        content: "✓";
        font-size: 11px;
        font-weight: 700;
        color: var(--primary-color);
      }

      /* Dark mode custom dropdowns */
      [data-theme="dark"] .custom-dropdown-trigger {
        background: #1e293b !important;
        color: #f1f5f9 !important;
        border-color: #334155 !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4) !important;
      }
      [data-theme="dark"] .custom-dropdown-label {
        color: #f1f5f9;
      }
      [data-theme="dark"] .custom-dropdown-menu {
        background: #1e293b !important;
        border-color: #334155 !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6) !important;
      }
      [data-theme="dark"] .custom-dropdown-option {
        color: #cbd5e1;
      }
      [data-theme="dark"] .custom-dropdown-option:hover {
        background: rgba(16, 185, 129, 0.15);
        color: #34d399;
      }
      [data-theme="dark"] .custom-dropdown-option.selected {
        background: rgba(16, 185, 129, 0.25);
        color: #34d399;
      }
      [data-theme="dark"] .custom-dropdown-option.selected::after {
        color: #34d399;
      }

      /* ==========================================================================
         RESPONSIVE WORKSPACE & INTERACTIVE GRID BOARD
         ========================================================================== */
      .classic-grid-card {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        margin-top: 14px;
        box-sizing: border-box;
      }
      .classic-grid-scroll-wrapper {
        width: 100%;
        overflow-x: auto;
        overflow-y: auto;
        max-height: 75vh;
        min-height: 480px;
        position: relative;
        background: var(--bg-card);
        -webkit-overflow-scrolling: touch;
      }
      .classic-grid-scroll-wrapper::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .classic-grid-scroll-wrapper::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 4px;
      }
      .classic-grid-scroll-wrapper::-webkit-scrollbar-track {
        background: var(--bg-panel);
      }

      /* Grid Header, Time Axis, and Day Columns */
      .classic-grid-board {
        min-width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .classic-grid-header-row {
        display: flex;
        position: sticky;
        top: 0;
        z-index: 40;
        background: var(--bg-card);
        border-bottom: 2px solid var(--border-color);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
      }
      .classic-corner-cell {
        width: 85px;
        min-width: 85px;
        max-width: 85px;
        padding: 12px 8px;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted);
        text-align: center;
        border-right: 1px solid var(--border-color);
        background: var(--bg-panel);
        display: flex;
        align-items: center;
        justify-content: center;
        position: sticky;
        left: 0;
        z-index: 45;
      }
      .classic-days-header-container {
        display: flex;
        flex: 1;
        min-width: 0;
      }
      .classic-th-day {
        flex: 1 1 0;
        min-width: 130px;
        text-align: center;
        padding: 12px 8px;
        font-weight: 600;
        font-size: 12px;
        color: var(--text-main);
        border-right: 1px solid var(--border-color);
        background: var(--bg-card);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        user-select: none;
      }
      .classic-th-day.weekend {
        background: rgba(16, 185, 129, 0.03);
      }
      .classic-th-day:last-child {
        border-right: none;
      }

      /* Time Axis & Slot Cells */
      .classic-grid-body-row {
        display: flex;
        position: relative;
      }
      .classic-time-axis {
        width: 85px;
        min-width: 85px;
        max-width: 85px;
        position: sticky;
        left: 0;
        z-index: 35;
        background: var(--bg-panel);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
      }
      .classic-td-time {
        font-size: 11px;
        font-weight: 600;
        color: var(--text-muted);
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;
      }
      .classic-columns-container {
        display: flex;
        flex: 1;
        min-width: 0;
        position: relative;
      }
      .classic-day-column {
        flex: 1 1 0;
        min-width: 130px;
        position: relative;
        border-right: 1px solid var(--border-color);
        background: var(--bg-card);
      }
      .classic-day-column:last-child {
        border-right: none;
      }

      /* Slot cells */
      .classic-slot-cell {
        border-bottom: 1px solid var(--border-color);
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        transition: background-color 0.15s ease;
      }
      .classic-slot-cell:hover {
        background-color: rgba(16, 185, 129, 0.08) !important;
      }
      .classic-cell-add-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #10b981;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
      }
      .classic-slot-cell:hover .classic-cell-add-icon {
        opacity: 0.6;
      }

      /* ==========================================================================
         CLASSIC EVENT CARD & HOVER QUICK ACTION TOOLS (Add, Edit, Copy, Duplicate, Paste, Delete)
         ========================================================================== */
      .classic-event-item {
        position: absolute;
        left: 4px;
        right: 4px;
        border-radius: 8px;
        padding: 6px 8px;
        color: #ffffff !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        cursor: pointer;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 15;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
        user-select: none;
        border-left: 3.5px solid rgba(255, 255, 255, 0.5);
        box-sizing: border-box;
      }
      .classic-event-item:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.32);
        z-index: 25;
      }
      .classic-event-title-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        width: 100%;
        position: relative;
      }
      .classic-event-title {
        font-weight: 700;
        font-size: 11.5px;
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        color: #ffffff;
      }
      .classic-event-tools {
        display: none;
        align-items: center;
        gap: 3px;
        position: absolute;
        top: 0px;
        right: 0px;
        background: rgba(0, 0, 0, 0.68);
        backdrop-filter: blur(4px);
        padding: 2px 4px;
        border-radius: 6px;
        z-index: 30;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      }
      .classic-event-item:hover .classic-event-tools {
        display: flex !important;
      }
      .classic-evt-btn {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        border-radius: 4px;
        color: #ffffff;
        padding: 3px 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s, transform 0.15s;
        line-height: 1;
      }
      .classic-evt-btn:hover {
        background: rgba(255, 255, 255, 0.38);
        transform: scale(1.12);
      }
      .classic-evt-btn:active {
        transform: scale(0.92);
      }
      .classic-event-details {
        font-size: 10px;
        opacity: 0.95;
        display: flex;
        flex-direction: column;
        gap: 1px;
        line-height: 1.2;
        color: rgba(255, 255, 255, 0.92);
      }
      .classic-event-badge-time {
        font-size: 9.5px;
        opacity: 0.95;
        font-weight: 600;
      }

      /* Context Menu Styling */
      .context-menu {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        padding: 5px;
        min-width: 195px;
        font-family: 'Poppins', sans-serif;
      }
      .context-menu-item {
        padding: 7px 12px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-main);
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.12s ease;
      }
      .context-menu-item:hover {
        background: rgba(16, 185, 129, 0.1);
        color: var(--primary-color);
      }
      .context-menu-item.danger:hover {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
      .context-menu-divider {
        height: 1px;
        background: var(--border-color);
        margin: 4px 0;
      }
      .ctx-color-dot {
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .ctx-color-dot:hover {
        transform: scale(1.25);
        box-shadow: 0 0 0 2px #ffffff, 0 2px 6px rgba(0,0,0,0.3);
      }
`;

const updatedRenderClassicGridJs = `
        renderClassicGrid() {
          try {
            const container = document.getElementById('classicGridScrollWrapper');
            if (!container) return;

            // Ensure configuration properties are valid and sanitized
            this.sanitizeConfig();

            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const activeDaysCount = Math.min(7, Math.max(1, parseInt(this.state.config.daysCount) || 7));
            const mStep = parseInt(this.state.config.interval) || 30;
            const startTime = parseInt(this.state.config.startTime) || 480;
            const endTime = parseInt(this.state.config.endTime) || 1140;
            const totalRowMinutes = Math.max(mStep, endTime - startTime);
            const totalSlots = Math.ceil(totalRowMinutes / mStep);

            // Sync hidden inputs & dropdown labels
            if (this.handlers && this.handlers.setCustomDropdownValue) {
              this.handlers.setCustomDropdownValue('classicConfigDays', String(activeDaysCount), 'wrap_classicConfigDays');
              this.handlers.setCustomDropdownValue('classicConfigStart', String(startTime), 'wrap_classicConfigStart');
              this.handlers.setCustomDropdownValue('classicConfigEnd', String(endTime), 'wrap_classicConfigEnd');
              this.handlers.setCustomDropdownValue('classicConfigInterval', String(mStep), 'wrap_classicConfigInterval');
              this.handlers.setCustomDropdownValue('classicConfigFormat', this.state.config.use24h ? "24" : "12", 'wrap_classicConfigFormat');
              this.handlers.setCustomDropdownValue('classicConfigTheme', this.state.config.theme || 'slate', 'wrap_classicConfigTheme');
            }

            // Update stats strip in classic ribbon
            const validEvents = (this.state.events || []).filter(evt => evt && evt.day < activeDaysCount);
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

            // Cell height calculation based on zoom setting
            const baseCellH = 48;
            const zoom = this.state.config.zoom || 1.0;
            const cellHeight = Math.round(baseCellH * zoom);
            const pxPerMin = cellHeight / mStep;
            const totalGridHeight = totalSlots * cellHeight;

            // Generate Board Markup
            let html = \`
              <div class="classic-grid-board" id="classicGridBoard" style="min-width: 100%; display: flex; flex-direction: column; position: relative;">
                <!-- Header Row (Sticky Top) -->
                <div class="classic-grid-header-row" style="display: flex; position: sticky; top: 0; z-index: 40; background: var(--bg-card); border-bottom: 2px solid var(--border-color); box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                  <div class="classic-corner-cell" style="width: 85px; min-width: 85px; max-width: 85px; padding: 12px 8px; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); text-align: center; border-right: 1px solid var(--border-color); background: var(--bg-panel); display: flex; align-items: center; justify-content: center; position: sticky; left: 0; z-index: 45;">
                    <span>Time</span>
                  </div>
                  <div class="classic-days-header-container" style="display: flex; flex: 1; min-width: 0;">
            \`;

            for (let d = 0; d < activeDaysCount; d++) {
              const isWeekend = d >= 5;
              html += \`
                <div class="classic-th-day \${isWeekend ? 'weekend' : ''}" id="classic-th-day-\${d}" data-day="\${d}" style="flex: 1 1 0; min-width: 130px; text-align: center; padding: 12px 8px; font-weight: 600; font-size: 12px; color: var(--text-main); border-right: 1px solid var(--border-color); background: var(--bg-card); display: flex; align-items: center; justify-content: center; gap: 4px; user-select: none;">
                  <span>\${dayNames[d]}</span>
                </div>
              \`;
            }

            html += \`
                  </div>
                </div>
                <!-- Grid Body (Time axis + Day tracks) -->
                <div class="classic-grid-body-row" style="display: flex; position: relative; height: \${totalGridHeight}px;">
                  <!-- Left Sticky Time Column -->
                  <div class="classic-time-axis" style="width: 85px; min-width: 85px; max-width: 85px; position: sticky; left: 0; z-index: 35; background: var(--bg-panel); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; height: \${totalGridHeight}px;">
            \`;

            for (let s = 0; s < totalSlots; s++) {
              const slotMin = startTime + (s * mStep);
              const timeLabel = this.formatMinute(slotMin);
              html += \`
                <div class="classic-td-time" style="height: \${cellHeight}px; min-height: \${cellHeight}px; max-height: \${cellHeight}px; font-size: 11px; font-weight: 600; color: var(--text-muted); padding: 0 8px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border-color); box-sizing: border-box;">
                  \${timeLabel}
                </div>
              \`;
            }

            html += \`
                  </div>
                  <!-- Day Columns Track -->
                  <div class="classic-columns-container" style="display: flex; flex: 1; min-width: 0; position: relative; height: \${totalGridHeight}px;">
            \`;

            for (let d = 0; d < activeDaysCount; d++) {
              html += \`
                <div class="classic-day-column" id="classic-day-col-\${d}" data-day="\${d}" style="flex: 1 1 0; min-width: 130px; position: relative; border-right: 1px solid var(--border-color); height: \${totalGridHeight}px; background: var(--bg-card);">
              \`;

              for (let s = 0; s < totalSlots; s++) {
                const slotMin = startTime + (s * mStep);
                const timeLabel = this.formatMinute(slotMin);
                html += \`
                  <div class="classic-slot-cell" data-day="\${d}" data-time="\${slotMin}" onclick="app.handlers.openClassicAddModal(\${d}, \${slotMin})" oncontextmenu="app.handlers.showEmptyCellContext(event, \${d}, \${slotMin})" title="Add activity on \${dayNames[d]} at \${timeLabel}" style="height: \${cellHeight}px; min-height: \${cellHeight}px; max-height: \${cellHeight}px; border-bottom: 1px solid var(--border-color); box-sizing: border-box; cursor: pointer; position: relative; transition: background-color 0.15s ease;">
                    <svg class="classic-cell-add-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"></path></svg>
                  </div>
                \`;
              }

              html += \`</div>\`;
            }

            html += \`
                  </div>
                </div>
              </div>
            \`;

            container.innerHTML = html;

            // Render Events inside their respective day columns
            validEvents.forEach(evt => {
              if (evt.startTime >= endTime || evt.endTime <= startTime) return;
              const col = document.getElementById(\`classic-day-col-\${evt.day}\`);
              if (!col) return;

              const visibleStart = Math.max(evt.startTime, startTime);
              const visibleEnd = Math.min(evt.endTime, endTime);
              const duration = visibleEnd - visibleStart;

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

              col.appendChild(eventCard);
            });
          } catch(err) {
            console.error('Error rendering Classic Timetable grid:', err);
          }
        },
`;

const updatedDropdownHandlersJs = `
          toggleCustomDropdown(wrapId, e) {
            if (e) {
              e.stopPropagation();
              e.preventDefault();
            }
            const wrap = document.getElementById(wrapId);
            if (!wrap) return;
            const isOpen = wrap.classList.contains('open');
            document.querySelectorAll('.custom-dropdown-wrap.open').forEach(el => {
              if (el !== wrap) el.classList.remove('open');
            });
            if (isOpen) {
              wrap.classList.remove('open');
            } else {
              wrap.classList.add('open');
            }
          },
          onSelectCustomDropdown(inputId, value, label, wrapId, callback) {
            const hiddenInput = document.getElementById(inputId);
            if (hiddenInput) {
              hiddenInput.value = value;
              hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
            const wrap = wrapId ? document.getElementById(wrapId) : (hiddenInput ? hiddenInput.closest('.custom-dropdown-wrap') : null);
            if (wrap) {
              const labelSpan = wrap.querySelector('.custom-dropdown-label');
              if (labelSpan) {
                if (typeof label === 'string' && label.includes('<')) {
                  labelSpan.innerHTML = label;
                } else {
                  labelSpan.textContent = label;
                }
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
              let matchedContent = null;
              wrap.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                if (opt.getAttribute('data-value') === String(value)) {
                  opt.classList.add('selected');
                  const itemContent = opt.querySelector('.custom-drop-item-content');
                  matchedContent = itemContent ? itemContent.innerHTML : opt.innerHTML;
                } else {
                  opt.classList.remove('selected');
                }
              });
              const labelSpan = wrap.querySelector('.custom-dropdown-label');
              if (matchedContent && labelSpan) {
                labelSpan.innerHTML = matchedContent;
              }
            }
          },
`;

const updatedContextHandlersJs = `
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
            const menuWidth = 200;
            const menuHeight = 270;
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
            const menuWidth = 200;
            const menuHeight = 130;
            const x = (e.clientX + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 12) : e.clientX;
            const y = (e.clientY + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 12) : e.clientY;
            menu.style.left = \`\${Math.max(10, x)}px\`;
            menu.style.top = \`\${Math.max(10, y)}px\`;
          },
          contextAddHere() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            app.handlers.openClassicAddModal(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
          },
          contextPasteHere() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.clipboard) {
              app.pasteEvent(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            }
          },
          contextEdit() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.ctxSelectedEventId) {
              const evt = app.state.events.find(x => x.id === app.state.ctxSelectedEventId);
              if (evt) app.handlers.openClassicEditModal(evt);
            }
          },
          contextAddAfter() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            app.handlers.openClassicAddModal(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
          },
          contextCopy() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.ctxSelectedEventId) {
              app.copyEvent(app.state.ctxSelectedEventId);
            }
          },
          contextDuplicate() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.ctxSelectedEventId) {
              app.duplicateEvent(app.state.ctxSelectedEventId);
            }
          },
          contextPaste() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.clipboard) {
              app.pasteEvent(app.state.ctxSelectedDay, app.state.ctxSelectedTime);
            }
          },
          contextChangeColor(color) {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.ctxSelectedEventId) {
              const evt = app.state.events.find(x => x.id === app.state.ctxSelectedEventId);
              if (evt) {
                evt.color = color;
                app.pushHistory();
                app.render();
                app.showToast(\`Color updated\`, 'success');
              }
            }
          },
          contextDelete() {
            const menu = document.getElementById('ctxMenu');
            if (menu) menu.style.display = 'none';
            if (app.state.ctxSelectedEventId) {
              app.deleteEvent(app.state.ctxSelectedEventId);
            }
          },
`;

function patchFile(filePath, isStudent = false) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Inject or update CSS in the <style> block before </head>
  if (content.includes('</style>')) {
    // Add our updated core CSS right before </style>
    const styleEndIdx = content.indexOf('</style>');
    content = content.substring(0, styleEndIdx) + '\n' + updatedCoreCss + '\n' + content.substring(styleEndIdx);
  }

  // 2. Replace renderClassicGrid() implementation
  const renderClassicStart = content.indexOf('renderClassicGrid() {');
  if (renderClassicStart !== -1) {
    const nextFn = content.indexOf('renderGridStructure() {', renderClassicStart);
    if (nextFn !== -1) {
      content = content.substring(0, renderClassicStart) + updatedRenderClassicGridJs + content.substring(nextFn);
    }
  }

  // 3. Replace dropdown handlers
  const toggleDropStart = content.indexOf('toggleCustomDropdown(wrapId');
  if (toggleDropStart !== -1) {
    const nextHandler = content.indexOf('formatTimeRange(startMin', toggleDropStart);
    if (nextHandler !== -1) {
      content = content.substring(0, toggleDropStart) + updatedDropdownHandlersJs + content.substring(nextHandler);
    }
  }

  // 4. Ensure context menu handlers are up to date
  const showCtxStart = content.indexOf('showEventContext(e, evt)');
  if (showCtxStart !== -1) {
    const nextCtxEnd = content.indexOf('// Modal open/close handlers', showCtxStart);
    if (nextCtxEnd !== -1) {
      content = content.substring(0, showCtxStart) + updatedContextHandlersJs + content.substring(nextCtxEnd);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully patched:", filePath);
}

patchFile('index.html', false);
patchFile('public/timetable-generator/index.html', false);
patchFile('public/timetable-generator-online-for-students/index.html', true);
