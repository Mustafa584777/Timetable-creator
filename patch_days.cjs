const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix classicConfigDays (lines 5170 - 5196 approximately)
// It currently has <div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day</div>
const oldClassicDays1 = `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day</div>`;
const oldClassicDays2 = `<div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days</div>`;
const oldClassicDays3 = `<div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days</div>`;
const oldClassicDays4 = `<div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days</div>`;

html = html.replace(oldClassicDays1, `<div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '1', '1 Day', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">1 Day</div>`);
html = html.replace(oldClassicDays2, `<div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '2', '2 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">2 Days</div>`);
html = html.replace(oldClassicDays3, `<div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '3', '3 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">3 Days</div>`);
html = html.replace(oldClassicDays4, `<div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('classicConfigDays', '4', '4 Days', 'wrap_classicConfigDays', function(){ app.handlers.classicConfigChange(); })">4 Days</div>`);

// Now for wrap_configStart, which erroneously contains the big blocks for 1 Day to 4 Days (with custom-drop-icon)
// We will remove them from wrap_configStart and inject them into wrap_configDays (but simplified)

const badStartRegex = /<div class="custom-dropdown-option" data-value="1" onclick="app\.handlers\.onSelectCustomDropdown\('classicConfigDays'[\s\S]*?<\/svg><\/span>\s*<span>4 Days<\/span>\s*<\/div>\s*<\/div>/;
html = html.replace(badStartRegex, ''); // Remove the bad blocks from wrap_configStart

// Now add 1 Day, 2 Days, 3 Days, 4 Days to wrap_configDays
const proDaysRegex = /<div class="custom-dropdown-option" data-value="5" onclick="app\.handlers\.onSelectCustomDropdown\('configDays', '5', 'Weekdays \(Mon - Fri\)', 'wrap_configDays', function\(\)\{ app\.handlers\.configChange\(\); \}\)">Weekdays \(Mon - Fri\)<\/div>/;

const newProDays = `
                  <div class="custom-dropdown-option" data-value="1" onclick="app.handlers.onSelectCustomDropdown('configDays', '1', '1 Day', 'wrap_configDays', function(){ app.handlers.configChange(); })">1 Day</div>
                  <div class="custom-dropdown-option" data-value="2" onclick="app.handlers.onSelectCustomDropdown('configDays', '2', '2 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">2 Days</div>
                  <div class="custom-dropdown-option" data-value="3" onclick="app.handlers.onSelectCustomDropdown('configDays', '3', '3 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">3 Days</div>
                  <div class="custom-dropdown-option" data-value="4" onclick="app.handlers.onSelectCustomDropdown('configDays', '4', '4 Days', 'wrap_configDays', function(){ app.handlers.configChange(); })">4 Days</div>
                  <div class="custom-dropdown-option" data-value="5" onclick="app.handlers.onSelectCustomDropdown('configDays', '5', 'Weekdays (Mon - Fri)', 'wrap_configDays', function(){ app.handlers.configChange(); })">Weekdays (Mon - Fri)</div>
`;
html = html.replace(proDaysRegex, newProDays.trim());

fs.writeFileSync('index.html', html);
