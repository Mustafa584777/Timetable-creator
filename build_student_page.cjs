const fs = require('fs');
const path = require('path');

// 1. Read base index.html (the modern homepage tool)
const homepageHtml = fs.readFileSync('index.html', 'utf8');

// 2. Read existing student page to extract its rich academic content
const existingStudentHtml = fs.readFileSync('public/timetable-generator-online-for-students/index.html', 'utf8');

// Extract Part 1 (Visual landing sections: Hero, Benefits, How-it-works, Templates, Accordion FAQs)
const p1Start = existingStudentHtml.indexOf('<!-- === STUDENT TIMETABLE GENERATOR SEO LANDING SECTION === -->');
const p1End = existingStudentHtml.indexOf('<div class="seo-content-section">', p1Start);

if (p1Start === -1 || p1End === -1) {
  console.error('Failed to locate Student SEO content part 1');
  process.exit(1);
}
const studentPart1 = existingStudentHtml.substring(p1Start, p1End).trim();

// Extract Part 2 (Academic excellence features, steps, and schema)
const p2Start = existingStudentHtml.indexOf('<div class="seo-content-section">');
const p2End = existingStudentHtml.indexOf('<footer class="seo-footer">', p2Start);

if (p2Start === -1 || p2End === -1) {
  console.error('Failed to locate Student SEO content part 2');
  process.exit(1);
}
const studentPart2 = existingStudentHtml.substring(p2Start, p2End).trim();

// Combine student content
const combinedStudentContent = `\n          ${studentPart1}\n\n          ${studentPart2}\n\n`;

// 3. Transform homepageHtml to be the student page
let result = homepageHtml;

// Replace title & description
result = result.replace(
  /<title>.*?<\/title>/,
  '<title>Student Timetable Generator Online - Free Class & Study Timetable Maker</title>'
);
result = result.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF & PNG export." />'
);

// Replace OpenGraph & Twitter tags
result = result.replace(
  /<meta property="og:title" content=".*?" \/>/,
  '<meta property="og:title" content="Student Timetable Generator Online - Free Class &amp; Study Schedule Maker" />'
);
result = result.replace(
  /<meta property="og:description" content=".*?" \/>/,
  '<meta property="og:description" content="Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF &amp; PNG export." />'
);
result = result.replace(
  /<meta property="twitter:title" content=".*?" \/>/,
  '<meta property="twitter:title" content="Student Timetable Generator Online - Free Class &amp; Study Schedule Maker" />'
);
result = result.replace(
  /<meta property="twitter:description" content=".*?" \/>/,
  '<meta property="twitter:description" content="Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF &amp; PNG export." />'
);

// Update Canonical link
result = result.replace(
  /<link rel="canonical" href=".*?" \/>/,
  '<link rel="canonical" href="https://timetablecreator.online/timetable-generator-online-for-students/" />'
);

// Update Hreflang alternates
const studentHreflangs = `    <link rel="alternate" hreflang="x-default" href="https://timetablecreator.online/timetable-generator-online-for-students/" />
    <link rel="alternate" hreflang="en-GB" href="https://timetablecreator.online/timetable-generator-online-for-students/en-GB" />
    <link rel="alternate" hreflang="es" href="https://timetablecreator.online/timetable-generator-online-for-students/es" />
    <link rel="alternate" hreflang="ja" href="https://timetablecreator.online/timetable-generator-online-for-students/ja" />
    <link rel="alternate" hreflang="fr" href="https://timetablecreator.online/timetable-generator-online-for-students/fr" />
    <link rel="alternate" hreflang="de" href="https://timetablecreator.online/timetable-generator-online-for-students/de" />
    <link rel="alternate" hreflang="pt" href="https://timetablecreator.online/timetable-generator-online-for-students/pt" />
    <link rel="alternate" hreflang="ko" href="https://timetablecreator.online/timetable-generator-online-for-students/ko" />
    <link rel="alternate" hreflang="it" href="https://timetablecreator.online/timetable-generator-online-for-students/it" />
    <link rel="alternate" hreflang="hi" href="https://timetablecreator.online/timetable-generator-online-for-students/hi" />
    <link rel="alternate" hreflang="ms" href="https://timetablecreator.online/timetable-generator-online-for-students/ms" />`;

// Replace hreflangs block
result = result.replace(/<link rel="alternate" hreflang="x-default"[\s\S]*?<link rel="alternate" hreflang="ms"[^>]*>/, studentHreflangs);

// 4. Update Header Nav links active state
result = result.replace(
  `<a href="/" class="nav-link-header active">Timetable Maker</a>\n            <a href="/timetable-generator-online-for-students/" class="nav-link-header ">Free Students Timetable Maker</a>`,
  `<a href="/" class="nav-link-header ">Timetable Maker</a>\n            <a href="/timetable-generator-online-for-students/" class="nav-link-header active">Free Students Timetable Maker</a>`
);
result = result.replace(
  `<a href="/" class="mobile-nav-link active" onclick="toggleMobileMenuLocal()">Timetable Maker</a>\n          <a href="/timetable-generator-online-for-students/" class="mobile-nav-link " onclick="toggleMobileMenuLocal()">Free Students Timetable Maker</a>`,
  `<a href="/" class="mobile-nav-link " onclick="toggleMobileMenuLocal()">Timetable Maker</a>\n          <a href="/timetable-generator-online-for-students/" class="mobile-nav-link active" onclick="toggleMobileMenuLocal()">Free Students Timetable Maker</a>`
);

// 5. Add Student Content CSS styles before </style>
const studentCustomCSS = `
      /* Student Timetable Page Specific Academic Content Styles */
      .seo-content-section {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        font-family: 'Poppins', sans-serif;
      }
      .seo-content-section h1 {
        color: var(--text-main);
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 16px;
        line-height: 1.3;
      }
      .seo-content-section h2 {
        color: var(--text-main);
        font-size: 20px;
        font-weight: 600;
        margin: 32px 0 16px 0;
        line-height: 1.35;
      }
      .seo-content-section p {
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: 16px;
        font-size: 14.5px;
      }
      .student-features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 16px;
        margin: 20px 0 28px 0;
      }
      .student-feat-card {
        padding: 20px;
        background: var(--bg-card);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      }
      .student-feat-card h3 {
        margin: 0 0 8px 0;
        font-size: 15px;
        font-weight: 600;
        color: var(--text-main);
      }
      .student-feat-card p {
        margin: 0;
        font-size: 13.5px;
        line-height: 1.55;
        color: var(--text-muted);
      }
      .student-steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin: 20px 0 28px 0;
      }
      .student-step-card {
        padding: 20px;
        background: var(--bg-card);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      }
      .student-step-num {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 8px;
        background: #0d9488;
        color: #ffffff;
        font-weight: 700;
        font-size: 13px;
        margin-bottom: 12px;
      }
      .student-step-card h3 {
        margin: 0 0 6px 0;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--text-main);
      }
      .student-step-card p {
        margin: 0;
        font-size: 13px;
        line-height: 1.5;
        color: var(--text-muted);
      }
      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 16px;
      }
      .faq-card {
        padding: 18px 20px;
        background: var(--bg-card);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 1px 3px rgba(0,0,0,0.03);
      }
      .faq-question {
        font-size: 15px;
        font-weight: 600;
        color: var(--text-main);
        margin: 0 0 8px 0;
      }
      .faq-answer {
        font-size: 13.5px;
        line-height: 1.6;
        color: var(--text-muted);
        margin: 0;
      }
`;

result = result.replace('</style>', `${studentCustomCSS}\n    </style>`);

// 6. Replace Homepage SEO Landing Section with Student SEO Content
const hpSeoStart = result.indexOf('<!-- === SEO LANDING SECTION === -->');
const hpSeoEnd = result.indexOf('<footer class="seo-footer">');

if (hpSeoStart === -1 || hpSeoEnd === -1) {
  console.error('Failed to find homepage SEO landing bounds');
  process.exit(1);
}

result = result.substring(0, hpSeoStart) + combinedStudentContent + result.substring(hpSeoEnd);

// 7. Write to public/timetable-generator-online-for-students/index.html
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', result, 'utf8');
console.log('Successfully generated public/timetable-generator-online-for-students/index.html');
