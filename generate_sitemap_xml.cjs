const { updateSitemapFile } = require('./scripts/sitemap_generator.cjs');

const xml = updateSitemapFile('public/sitemap.xml');
console.log('Successfully generated complete multilingual sitemap.xml with updated 10 languages.');

