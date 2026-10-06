const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const regex = /applyGeneralStyles\(\)\s*\{\s*const rootEl = document\.documentElement;/;
const replacement = `applyGeneralStyles() {
          const rootEl = document.documentElement;
          if (this.state.config.theme) {
            rootEl.setAttribute('data-preset', this.state.config.theme);
          }`;

content = content.replace(regex, replacement);

fs.writeFileSync('index.html', content);
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', content);
console.log("Patched applyGeneralStyles theme");
