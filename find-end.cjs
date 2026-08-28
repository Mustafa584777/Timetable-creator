const fs = require('fs');
const orig = fs.readFileSync('original_index.html', 'utf8');

const start = orig.indexOf('<div class="workspace" id="gridWorkspace"');
let openCount = 0;
let end = -1;
for (let i = start; i < orig.length; i++) {
  if (orig.substr(i, 4) === '<div') openCount++;
  if (orig.substr(i, 5) === '</div') {
    openCount--;
    if (openCount === 0) {
      end = i + 6;
      break;
    }
  }
}
console.log(`Grid workspace starts at ${start} and ends at ${end}`);
fs.writeFileSync('workspace.html', orig.substring(start, end));
