const fs = require('fs');
const path = require('path');

const baseUrl = 'https://timetablecreator.online';

const languages = [
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'ko', name: '한국어' },
  { code: 'it', name: 'Italiano' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ms', name: 'Bahasa Melayu' }
];

function getAllSitePages(baseDir = 'public') {
  const rootDir = process.cwd();
  const pubDir = path.isAbsolute(baseDir) ? baseDir : path.join(rootDir, baseDir);
  
  // Tools and generators
  const pages = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${baseUrl}/blog/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/timetable-generator-online-for-students/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/study-timetable-creator/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/workout-timetable-creator/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/school-timetable-maker-for-teachers/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/revision-timetable-creator/`, priority: '0.9', changefreq: 'weekly' }
  ];

  // Scan blog directories dynamically from public/blog, keeping indexed posts and legal pages
  const blogDir = path.join(pubDir, 'blog');
  if (fs.existsSync(blogDir)) {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const isLang = languages.some(l => l.code === entry.name);
        if (!isLang) {
          const postFile = path.join(blogDir, entry.name, 'index.html');
          if (fs.existsSync(postFile)) {
            const htmlContent = fs.readFileSync(postFile, 'utf8');
            const isNoindex = htmlContent.includes('noindex');
            if (!isNoindex) {
              pages.push({
                loc: `${baseUrl}/blog/${entry.name}/`,
                priority: (entry.name === 'best-daily-routine-timetable-for-students' || entry.name === 'how-to-time-block-your-day' || entry.name === 'free-college-class-schedule-template-and-how-to-organize-your-lectures' || entry.name === 'university-study-schedule-for-working-students' || entry.name === 'best-study-timetable-for-board-exam-students' || entry.name === 'how-to-build-a-50-10-and-25-5-pomodoro-study-schedule') ? '0.8' : '0.6',
                changefreq: 'weekly'
              });
            }
          }
        }
      }
    }
  }

  return pages;
}

function generateSitemapXmlString(customPages = null) {
  const pages = customPages || getAllSitePages();
  const currentDate = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of pages) {
    // Canonical / Main URL (Default English Version Only)
    xml += `  <url>\n`;
    xml += `    <loc>${page.loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;
  return xml;
}

function updateSitemapFile(outputPath = 'public/sitemap.xml') {
  const xml = generateSitemapXmlString();
  const fullPath = path.isAbsolute(outputPath) ? outputPath : path.join(process.cwd(), outputPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, xml, 'utf8');

  // If dist directory exists, update dist/sitemap.xml as well
  const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');
  if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
    fs.writeFileSync(distPath, xml, 'utf8');
  }

  return xml;
}

module.exports = {
  languages,
  getAllSitePages,
  generateSitemapXmlString,
  updateSitemapFile
};
