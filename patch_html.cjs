const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const targetText = `<p>Take charge of your productivity today by creating a clear, visually appealing schedule that keeps you on track. Our general purpose planner is perfect for freelancers, parents, fitness enthusiasts, and professionals.</p>`;

const replacement = targetText + `\n            </section>\n          </div>\n\n`;

content = content.replace(targetText, replacement);

fs.writeFileSync('index.html', content);
fs.writeFileSync('public/timetable-generator-online-for-students/index.html', content);
console.log("Fixed HTML closing tags");
