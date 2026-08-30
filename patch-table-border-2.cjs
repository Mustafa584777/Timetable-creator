const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const collapseStyle2 = `
      table {
        border-collapse: collapse !important;
        border-spacing: 0 !important;
      }
`;

if (!html.includes('table { border-collapse: collapse !important;')) {
  html = html.replace('</style>', collapseStyle2 + '\n    </style>');
}

fs.writeFileSync('index.html', html);
