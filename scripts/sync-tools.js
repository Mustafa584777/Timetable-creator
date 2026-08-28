import fs from 'fs';
import path from 'path';

const rootHtml = fs.readFileSync('index.html', 'utf8');

// 1. Generate public/timetable-generator-online-for-students/index.html
let studentHtml = rootHtml;
studentHtml = studentHtml.replace(/<title>.*?<\/title>/, '<title>Student Timetable Generator Online - Free Class & Study Timetable Maker</title>');
studentHtml = studentHtml.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://timetablecreator.online/timetable-generator-online-for-students/" />');
studentHtml = studentHtml.replace(/value="My Weekly Timetable"/g, 'value="Student Timetable Generator"');
studentHtml = studentHtml.replace(/value="Class & Activity Schedule"/g, 'value="Class Schedule & Study Routine"');

const studentDir = path.join('public', 'timetable-generator-online-for-students');
if (!fs.existsSync(studentDir)) fs.mkdirSync(studentDir, { recursive: true });
fs.writeFileSync(path.join(studentDir, 'index.html'), studentHtml, 'utf8');
console.log('Successfully wrote public/timetable-generator-online-for-students/index.html');

// 2. Generate public/timetable-generator/index.html
let genHtml = rootHtml;
genHtml = genHtml.replace(/<title>.*?<\/title>/, '<title>Online Timetable Generator & Weekly Schedule Maker - Free Tool</title>');
genHtml = genHtml.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://timetablecreator.online/timetable-generator/" />');
genHtml = genHtml.replace(/value="My Weekly Timetable"/g, 'value="Online Timetable Generator"');
genHtml = genHtml.replace(/value="Class & Activity Schedule"/g, 'value="Class Schedule & Study Routine"');

const genDir = path.join('public', 'timetable-generator');
if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });
fs.writeFileSync(path.join(genDir, 'index.html'), genHtml, 'utf8');
console.log('Successfully wrote public/timetable-generator/index.html');
