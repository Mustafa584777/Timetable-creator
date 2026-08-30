const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add data-preset initialization in loadState or sanitizeConfig or syncConfigInputs
const syncInputsRegex = /(syncConfigInputs\(\) \{\s+const c = this\.state\.config;)/;
if (syncInputsRegex.test(html)) {
    html = html.replace(syncInputsRegex, `$1\n          document.documentElement.setAttribute('data-preset', c.theme);`);
} else {
    console.log("Could not find syncConfigInputs to patch.");
}

// Add app.render() in presetChange()
const presetChangeRegex = /(presetChange\(\) \{[\s\S]*?if \(app\.state\.config\.autoSave\) app\.saveState\(\);)(\s+\},)/;
if (presetChangeRegex.test(html)) {
    html = html.replace(presetChangeRegex, `$1\n            app.render();$2`);
} else {
    console.log("Could not find presetChange to patch.");
}

fs.writeFileSync('index.html', html);
