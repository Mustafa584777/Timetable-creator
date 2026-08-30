const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const footerStyles = `
      .seo-footer {
        padding: 48px 24px 32px 24px;
        margin-top: auto;
        border-top: 1px solid var(--border-color);
        background-color: var(--bg-card);
        text-align: left;
        transition: background-color 0.3s, border-color 0.3s;
        width: 100%;
        box-sizing: border-box;
      }`;

html = html.replace(/\.seo-footer\s*\{[\s\S]*?\}/, footerStyles.trim());

const footerLinkStyles = `
      .footer-link {
        font-size: 13.5px;
        color: var(--text-muted);
        text-decoration: none !important;
        transition: color 0.2s ease;
      }
      .footer-link:hover {
        color: var(--primary-color);
      }`;

if (!html.includes('.footer-link {')) {
  html = html.replace('</style>', footerLinkStyles + '\n    </style>');
}

fs.writeFileSync('index.html', html);
