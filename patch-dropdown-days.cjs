const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const classicDaysReplace = `                <div class="custom-dropdown-menu">
                    <div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '1', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#64748b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>1 Day</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '2', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#64748b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>2 Days</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '3', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#64748b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>3 Days</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '4', this.querySelector('.custom-drop-item-content').innerHTML, 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">
                      <div class="custom-drop-item-content">
                        <span class="custom-drop-icon" style="color:#64748b;"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
                        <span>4 Days</span>
                      </div>
                    </div>
                    <div class="custom-dropdown-option"`;

const configDaysReplace = `                <div class="custom-dropdown-menu">
                  <div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day</div>
                  <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days</div>
                  <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days</div>
                  <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days</div>
                  <div class="custom-dropdown-option"`;

html = html.replace('                <div class="custom-dropdown-menu">\n                    <div class="custom-dropdown-option"', classicDaysReplace);
html = html.replace('                <div class="custom-dropdown-menu">\n                  <div class="custom-dropdown-option"', configDaysReplace);

fs.writeFileSync('index.html', html);
