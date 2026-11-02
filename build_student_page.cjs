const fs = require('fs');

// 1. Read base index.html (the modern homepage tool)
const hp = fs.readFileSync('index.html', 'utf8');

// 2. Read existing student page to extract its clean visual landing section
const studentOld = fs.readFileSync('public/timetable-generator-online-for-students/index.html', 'utf8');
const p1 = studentOld.indexOf('<!-- === STUDENT TIMETABLE GENERATOR SEO LANDING SECTION === -->');
const p2 = studentOld.indexOf('</section>', studentOld.indexOf('class="faq-section"', p1)) + 10;

if (p1 === -1 || p2 === -1) {
  console.error('Failed to locate student landing section');
  process.exit(1);
}
const studentSeoLanding = studentOld.substring(p1, p2) + '\n          </div>';

// 3. Transform homepageHtml to be the student page
let result = hp;

// Replace title & description
result = result.replace(
  /<title>.*?<\/title>/,
  '<title>Student Timetable Generator Online - Free Class & Study Timetable Maker</title>'
);
result = result.replace(
  /<meta name="description" content=".*?" \/>/,
  '<meta name="description" content="Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF & PNG export." />'
);
result = result.replace(
  /<meta name="keywords" content=".*?" \/>/,
  '<meta name="keywords" content="Student Timetable Generator, Student Schedule Maker, Class Timetable Generator, Study Timetable, University Schedule Maker, Free Timetable Creator, College Routine Maker" />'
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

result = result.replace(/<link rel="alternate" hreflang="x-default"[\s\S]*?<link rel="alternate" hreflang="ms"[^>]*>/, studentHreflangs);

// Update Header Nav links active state
result = result.replace(
  'nav-link-header active">Timetable Maker</a>',
  'nav-link-header">Timetable Maker</a>'
);
result = result.replace(
  'href="/timetable-generator-online-for-students/" class="nav-link-header">Student Timetable</a>',
  'href="/timetable-generator-online-for-students/" class="nav-link-header active">Student Timetable</a>'
);
result = result.replace(
  'mobile-nav-link active" onclick="toggleMobileMenuLocal()">Timetable Maker</a>',
  'mobile-nav-link" onclick="toggleMobileMenuLocal()">Timetable Maker</a>'
);
result = result.replace(
  'href="/timetable-generator-online-for-students/" class="mobile-nav-link" onclick="toggleMobileMenuLocal()">Student Timetable Generator</a>',
  'href="/timetable-generator-online-for-students/" class="mobile-nav-link active" onclick="toggleMobileMenuLocal()">Student Timetable Generator</a>'
);

// Update WebApplication schema in head
result = result.replace(
  /"@type": "WebApplication",\s*"name": ".*?",/,
  '"@type": "WebApplication",\n          "name": "Student Timetable Generator Online - Free Class & Study Timetable Maker",'
);
result = result.replace(
  /"description": "The Ultimate Online Timetable Maker for All Your Scheduling Needs[^"]*",/,
  '"description": "Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF & PNG export.",'
);

// Replace Homepage SEO Landing Section with Student SEO Content
const sStart = result.indexOf('<!-- === SEO LANDING SECTION === -->');
const sEnd = result.indexOf('<!-- MAIN EVENT DIALOG EDITOR -->');

if (sStart === -1 || sEnd === -1) {
  console.error('Failed to find homepage SEO landing bounds or modal dialog start');
  process.exit(1);
}

const replacement = studentSeoLanding + '\n        </div>\n      </main>\n    </div>\n    ';
result = result.substring(0, sStart) + replacement + result.substring(sEnd);

// Write to public/timetable-generator-online-for-students/index.html
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', result, 'utf8');
console.log('Successfully generated clean public/timetable-generator-online-for-students/index.html');
