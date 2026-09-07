const fs = require('fs');

const baseUrl = 'https://timetablecreator.online';
const currentDate = '2026-09-07';

const corePages = [
  { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${baseUrl}/timetable-generator-online-for-students/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${baseUrl}/timetable-generator/`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${baseUrl}/sitemap.html`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${baseUrl}/blog/`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${baseUrl}/blog/daily-routine-for-class-10-student-at-home/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/study-timetable-for-class-10/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/how-does-an-automatic-timetable-creator-work/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/how-to-make-a-perfect-school-timetable-in-2026-step-by-step-guide-for-students-parents-teachers/`, priority: '0.7', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/timetable-guides/`, priority: '0.6', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/about-us/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/contact-us/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/privacy-policy/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/terms-and-conditions/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/refund-policy/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${baseUrl}/blog/disclaimer/`, priority: '0.5', changefreq: 'monthly' }
];

const languages = ['en', 'en-GB', 'fr', 'es', 'de', 'hi', 'ru', 'ar', 'zh', 'pt', 'it', 'ja'];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (const page of corePages) {
  const cleanBase = page.loc.replace(/\/$/, '');
  
  // Base entry
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${page.loc}" />\n`;
  for (const lang of languages) {
    xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${cleanBase}/${lang}" />\n`;
  }
  xml += `  </url>\n`;

  // Language URL entries
  for (const lang of languages) {
    xml += `  <url>\n`;
    xml += `    <loc>${cleanBase}/${lang}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${(parseFloat(page.priority) * 0.9).toFixed(1)}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${page.loc}" />\n`;
    for (const l of languages) {
      xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${cleanBase}/${l}" />\n`;
    }
    xml += `  </url>\n`;
  }
}

xml += `</urlset>\n`;

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log('Successfully generated complete multilingual public/sitemap.xml');
