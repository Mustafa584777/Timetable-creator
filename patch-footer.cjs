const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Extract footer HTML
const footerMatch = html.match(/<footer class="seo-footer">[\s\S]*?<\/footer>/);
if (!footerMatch) {
    console.error("Footer not found!");
    process.exit(1);
}
const footerHtml = footerMatch[0];

// Remove all existing footers
html = html.replace(/<!-- FOOTER WITH INTERNAL LINKS & LEGAL\/COPYRIGHT -->[\s\S]*?<footer class="seo-footer">[\s\S]*?<\/footer>/g, '');

// Place footer after target text
const targetText = "Our general purpose planner is perfect for freelancers, parents, fitness enthusiasts, and professionals.</p>";
html = html.replace(targetText, targetText + '\n\n' + footerHtml);

fs.writeFileSync('index.html', html);
console.log("Footer moved successfully.");
