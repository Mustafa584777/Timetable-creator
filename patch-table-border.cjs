const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const collapseStyle = `
      .classic-table-grid {
        border-collapse: collapse !important;
        border-spacing: 0 !important;
      }
`;

// Inject into style block
if (!html.includes('border-collapse: collapse !important;')) {
  html = html.replace('</style>', collapseStyle + '\n    </style>');
}

fs.writeFileSync('index.html', html);
