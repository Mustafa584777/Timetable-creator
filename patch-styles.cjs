const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1px border for all table cells (classic)
// Currently they might have borders only on some sides.
// classic-th-corner, classic-th-day, classic-td-time, classic-td-cell
const borderCss = `
      .classic-table-grid th, .classic-table-grid td {
        border: 1px solid var(--grid-line-color) !important;
        font-weight: normal !important;
      }
      .classic-th-corner, .classic-th-day, .classic-td-time {
        font-weight: normal !important;
      }
      .timetable-grid th, .timetable-grid td {
        border: 1px solid var(--grid-line-color) !important;
        font-weight: normal !important;
      }
      .time-header, .day-header {
        font-weight: normal !important;
      }
      /* Pro Grid overrides */
      .grid-header-row th {
        border: 1px solid var(--grid-line-color) !important;
      }
`;

html = html.replace('</style>', borderCss + '\n    </style>');

// 30% height increase
// Currently:
// For Pro: .time-column .time-slot has height: var(--row-height, 48px);
// Let's change 48px to 62px (which is ~30% increase)
// For Classic: row heights are inline or fixed?
// Let's check the JS for row-height.

fs.writeFileSync('index.html', html);
