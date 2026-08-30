const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Ensure body is flex column and min-height 100vh
if (!html.includes('body {')) {
  // body doesn't have a direct selector, let's inject a strong flex layout
  html = html.replace('</style>', `
      html, body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .classic-tt-app, .app-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .classic-container {
        flex: 1;
      }
      .workspace {
        flex: 1;
      }
      .workspace-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
</style>`);
} else {
  html = html.replace('</style>', `
      html, body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .classic-tt-app, .app-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .classic-container {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .workspace {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .workspace-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
</style>`);
}

fs.writeFileSync('index.html', html);
