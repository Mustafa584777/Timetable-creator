const fs = require('fs');

function patchFile(filepath) {
  if (!fs.existsSync(filepath)) return;
  let html = fs.readFileSync(filepath, 'utf8');

  const css = `
      .timetable-scroll-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      }
      .timetable-wrapper {
        flex-grow: 1;
      }
  `;
  if (!html.includes('.timetable-scroll-container {\\n        flex-grow: 1;')) {
    html = html.replace('</style>', css + '\n    </style>');
  }

  fs.writeFileSync(filepath, html);
}

patchFile('index.html');
patchFile('public/timetable-generator-online-for-students/index.html');
