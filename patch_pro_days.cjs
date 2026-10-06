const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const oldMenu = `<div class="custom-dropdown-menu">
                  <div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('configDays', '5', 'Weekdays (Mon - Fri)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Weekdays (Mon - Fri)</div>
                  <div class="custom-dropdown-option" data-value="6" onclick="app.handlers.onSelectCustomDropdown('configDays', '6', 'Mon - Sat', 'wrap_configDays', function(){ app.handlers.configChange(); })">Mon - Sat</div>
                  <div class="custom-dropdown-option selected" data-value="7" onclick="app.handlers.onSelectCustomDropdown('configDays', '7', 'Full Week (Mon - Sun)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Full Week (Mon - Sun)</div>
                </div>`;

const newMenu = `<div class="custom-dropdown-menu">
                  <div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day (Mon)', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day (Mon)</div>
                  <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days (Mon - Tue)', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days (Mon - Tue)</div>
                  <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days (Mon - Wed)', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days (Mon - Wed)</div>
                  <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days (Mon - Thu)', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days (Mon - Thu)</div>
                  <div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('configDays', '5', 'Weekdays (Mon - Fri)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Weekdays (Mon - Fri)</div>
                  <div class="custom-dropdown-option" data-value="6" onclick="app.handlers.onSelectCustomDropdown('configDays', '6', 'Mon - Sat', 'wrap_configDays', function(){ app.handlers.configChange(); })">Mon - Sat</div>
                  <div class="custom-dropdown-option selected" data-value="7" onclick="app.handlers.onSelectCustomDropdown('configDays', '7', 'Full Week (Mon - Sun)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Full Week (Mon - Sun)</div>
                </div>`;

content = content.replace(oldMenu, newMenu);

fs.writeFileSync('index.html', content);
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', content);
console.log("Patched Pro Days");
