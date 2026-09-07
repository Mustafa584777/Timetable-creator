const fs = require('fs');
const path = require('path');

const baseUrl = 'https://timetablecreator.online';

const languages = [
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'en', name: 'English (US)' },
  { code: 'es', name: 'Español' },
  { code: 'ja', name: '日本語' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'pt', name: 'Português' },
  { code: 'ko', name: '한국어' },
  { code: 'it', name: 'Italiano' },
  { code: 'hi', name: 'हिन्दी' }
];

function getAllSitePages(baseDir = 'public') {
  const rootDir = process.cwd();
  const pubDir = path.isAbsolute(baseDir) ? baseDir : path.join(rootDir, baseDir);
  
  const pages = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${baseUrl}/timetable-generator-online-for-students/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/timetable-generator/`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/html-sitemap/`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${baseUrl}/blog/`, priority: '0.8', changefreq: 'weekly' }
  ];

  // Scan blog directories dynamically from public/blog
  const blogDir = path.join(pubDir, 'blog');
  if (fs.existsSync(blogDir)) {
    const entries = fs.readdirSync(blogDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const isLang = languages.some(l => l.code === entry.name);
        if (!isLang) {
          const postFile = path.join(blogDir, entry.name, 'index.html');
          if (fs.existsSync(postFile)) {
            const isLegal = ['privacy-policy', 'terms-and-conditions', 'refund-policy', 'disclaimer', 'about-us', 'contact-us'].includes(entry.name);
            pages.push({
              loc: `${baseUrl}/blog/${entry.name}/`,
              priority: isLegal ? '0.5' : '0.7',
              changefreq: isLegal ? 'monthly' : 'monthly'
            });
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
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const page of pages) {
    const cleanBase = page.loc.replace(/\/$/, '');

    // 1. Canonical / Base Page entry
    xml += `  <url>\n`;
    xml += `    <loc>${page.loc}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${page.loc}" />\n`;
    for (const lang of languages) {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang.code}" href="${cleanBase}/${lang.code}" />\n`;
    }
    xml += `  </url>\n`;

    // 2. Individual Language Page entries
    for (const lang of languages) {
      const langUrl = `${cleanBase}/${lang.code}`;
      const langPriority = (Math.max(0.4, parseFloat(page.priority) * 0.9)).toFixed(1);

      xml += `  <url>\n`;
      xml += `    <loc>${langUrl}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${langPriority}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${page.loc}" />\n`;
      for (const l of languages) {
        xml += `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${cleanBase}/${l.code}" />\n`;
      }
      xml += `  </url>\n`;
    }
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
