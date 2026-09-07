const fs = require('fs');
const orig = fs.readFileSync('original_index.html', 'utf8');

// Find the start of the grid canvas
const gridStartStr = '<!-- 3. Classic Weekly Grid Canvas -->';
const gridStart = orig.indexOf(gridStartStr);
const gridEndStr = '<!-- 4. Floating Action Button (FAB) for Mobile Quick Add -->';
const gridEnd = orig.indexOf(gridEndStr);

if (gridStart === -1 || gridEnd === -1) {
  console.log("Could not find grid in original_index.html");
  process.exit(1);
}

let gridHtml = orig.substring(gridStart, gridEnd);

// Fix the SVG missing width/height in dropdowns in the gridHtml if any, but the dropdowns are in the config bar.
// Let's first restore the workspace in the files.
function restoreInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The current file might have been stripped of the grid. Let's see where to insert it.
  // It should go right before <!-- 4. Floating Action Button (FAB) for Mobile Quick Add -->
  // BUT wait, is the config bar still there? Let's check index.html.
  const configBarStart = content.indexOf('<div class="classic-config-bar"');
  if (configBarStart !== -1) {
    console.log(`Config bar found in ${filePath}`);
    // Replace everything between classic-config-bar end and the FAB.
    // Let's just insert gridHtml before the FAB if it's not there.
    if (content.indexOf('id="gridWorkspace"') === -1) {
       content = content.replace(gridEndStr, gridHtml + '\n      ' + gridEndStr);
       fs.writeFileSync(filePath, content, 'utf8');
       console.log(`Restored workspace in ${filePath}`);
    } else {
       console.log(`Workspace already in ${filePath}`);
    }
  }
}

restoreInFile('index.html');
restoreInFile('public/timetable-generator-online-for-students/index.html');
restoreInFile('public/timetable-generator/index.html');
