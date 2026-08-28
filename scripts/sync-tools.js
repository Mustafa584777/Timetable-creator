import fs from 'fs';
import path from 'path';

console.log("Synchronizing multi-tool pages...");
const rootHtml = fs.readFileSync('index.html', 'utf8');

// =========================================================================
// STUDENT TIMETABLE GENERATOR SEO CONTENT
// =========================================================================
const studentSeoLanding = `<!-- === STUDENT TIMETABLE GENERATOR SEO LANDING SECTION === -->
          <div class="seo-landing-container" id="about">
            <!-- HERO SECTION -->
            <section class="seo-hero">
              <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(16,185,129,0.12); color:#059669; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; margin-bottom:12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"></path></svg>
                <span>Free Student Schedule & Study Planner Maker</span>
              </div>
              <h1 class="seo-h1">Student Timetable Generator Online – Free Class & Study Routine Maker</h1>
              <p>
                Effortlessly build, customize, and print color-coded class schedules, university lecture routines, homework blocks, and exam revision planners. Designed for college students, high schools, teachers, and study circles.
              </p>
              <button class="seo-btn-cta" onclick="window.scrollTo({top: 0, behavior: 'smooth'});">
                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
                Start Creating Your Student Timetable
              </button>
            </section>

            <!-- KEY BENEFITS SECTION -->
            <section class="seo-benefits">
              <div class="seo-section-title">
                <h2>Why Students & Schools Love Our Timetable Creator</h2>
                <p>Engineered to solve academic scheduling complexities, avoid overlapping classes, and maximize study productivity.</p>
              </div>
              <div class="seo-grid-benefits">
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #3b82f6;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"></path></svg>
                  </div>
                  <h3>Color-Coded Subject Visuals</h3>
                  <p>Assign dedicated colors to Calculus, Chemistry Lab, Literature, and Seminars so you can instantly recognize your day's sequence at a glance.</p>
                </div>
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #10b981;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3>Smart AI Syllabus Scheduler</h3>
                  <p>Paste your semester course syllabus or class hours. Our AI copilot automatically structures and fills your weekly timetable in seconds.</p>
                </div>
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #8b5cf6;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  </div>
                  <h3>Vector PDF & Lockscreen PNG</h3>
                  <p>Export crisp, print-ready PDF documents for study binders or download high-resolution images tailored for your smartphone lock screen.</p>
                </div>
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #f59e0b;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  </div>
                  <h3>Custom Period Intervals</h3>
                  <p>Select time intervals from 15 to 60 minutes. Perfect for standard 45-minute high school periods or 90-minute college lectures.</p>
                </div>
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #06b6d4;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                  </div>
                  <h3>Flexible 5, 6, or 7-Day Grids</h3>
                  <p>Easily toggle between standard 5-day school weeks, 6-day coaching timetables, or full 7-day college and revision schedules.</p>
                </div>
                <div class="seo-benefit-card">
                  <div class="seo-card-icon" style="color: #ec4899;">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="20" height="20"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h3>Study Group Sharing & Sync</h3>
                  <p>Generate shareable links or QR codes so study group partners, roommates, and classmates can coordinate lecture and study times.</p>
                </div>
              </div>
            </section>

            <div class="seo-divider"></div>

            <!-- HOW IT WORKS SECTION -->
            <section class="seo-how-it-works">
              <div class="seo-section-title">
                <h2>How to Create Your Student Timetable in 4 Steps</h2>
                <p>Build your academic semester plan quickly and efficiently.</p>
              </div>
              <div class="seo-steps-container">
                <div class="seo-step-item">
                  <div class="seo-step-num">1</div>
                  <div class="seo-step-content">
                    <h3>Configure Days & Daily Hours</h3>
                    <p>Select your active schedule days (5, 6, or 7 days) and choose start and end times that match your school or university hours.</p>
                  </div>
                </div>
                <div class="seo-step-item">
                  <div class="seo-step-num">2</div>
                  <div class="seo-step-content">
                    <h3>Add Classes, Labs & Instructors</h3>
                    <p>Click on any open slot or tap the "+ Add Activity" button. Enter the course title, classroom or lab number, instructor name, and pick a custom color.</p>
                  </div>
                </div>
                <div class="seo-step-item">
                  <div class="seo-step-num">3</div>
                  <div class="seo-step-content">
                    <h3>Schedule Study Blocks & Homework</h3>
                    <p>Block out dedicated study hours, library sessions, group project discussions, gym workouts, and meal breaks for a balanced lifestyle.</p>
                  </div>
                </div>
                <div class="seo-step-item">
                  <div class="seo-step-num">4</div>
                  <div class="seo-step-content">
                    <h3>Print PDF, Download Image or Save</h3>
                    <p>Export a crystal-clear PDF for your desk, download a PNG image for your phone lockscreen, or save your cloud link.</p>
                  </div>
                </div>
              </div>
            </section>

            <div class="seo-divider"></div>

            <!-- TEMPLATES & USE CASES -->
            <section class="seo-features">
              <div class="seo-section-title">
                <h2>Academic Timetable Templates</h2>
                <p>Choose from popular pre-made templates or build your custom layout from scratch.</p>
              </div>
              <div class="seo-grid-benefits">
                <div class="seo-benefit-card" style="background: var(--bg-panel); border-color: var(--border-color);">
                  <h3>🎓 University & College Lectures</h3>
                  <p>Ideal for semester credit hours, rotating lectures, lab practicals, professor office hours, and independent study sessions.</p>
                </div>
                <div class="seo-benefit-card" style="background: var(--bg-panel); border-color: var(--border-color);">
                  <h3>🏫 High School & Secondary Routine</h3>
                  <p>5-day standard layout featuring 45-minute subject periods, homeroom, morning assemblies, lunch breaks, and extracurricular sports.</p>
                </div>
                <div class="seo-benefit-card" style="background: var(--bg-panel); border-color: var(--border-color);">
                  <h3>📚 Exam Revision & Test Prep</h3>
                  <p>Spaced repetition study blocks, mock tests, chapter reviews, and memory reinforcement intervals for competitive exams and finals.</p>
                </div>
              </div>
            </section>

            <div class="seo-divider"></div>

            <!-- FAQ SECTION -->
            <section class="faq-section">
              <div class="seo-section-title">
                <h2>Frequently Asked Questions by Students</h2>
                <p>Everything you need to know about generating and exporting your timetable.</p>
              </div>
              <div class="faq-accordion">
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>Is this Student Timetable Generator 100% free?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>Yes, TimetableCreator is completely free for students, teachers, and schools. You can create unlimited timetables, use AI generation, and export vector PDFs or PNG images with zero watermarks.</p>
                  </div>
                </div>
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>Can I export a printable PDF formatted for A4 paper?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>Yes! Click the Red "PDF" button in the toolbar to instantly generate a print-ready vector PDF formatted in landscape mode for standard A4 and Letter paper.</p>
                  </div>
                </div>
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>How do I add room numbers, professors, and subject notes?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>When you click on any grid cell or tap "+ Add Activity", the modal provides fields for Subject Title, Room / Location, Instructor / Teacher Name, Color Swatch, and Extra Notes or meeting links.</p>
                  </div>
                </div>
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>Can I create a 5-day school week timetable?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>Yes. Select "Mon - Fri (5 Days)" from the Active Days dropdown in the toolbar to automatically switch the grid to a Monday through Friday layout.</p>
                  </div>
                </div>
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>How can I copy, duplicate, or delete activities quickly?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>Hover over any activity block to reveal the quick action toolbar with Add (+), Edit (✏️), Copy (📋), Duplicate (📑), and Delete (🗑️) buttons. On desktop, you can also right-click any activity or empty slot for the context menu.</p>
                  </div>
                </div>
                <div class="faq-item">
                  <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">
                    <span>Does this tool work on mobile devices and tablets?</span>
                    <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="faq-answer">
                    <p>Yes, the tool is fully responsive with touch gesture support, smooth weekday scrolling, quick day-filter pills, and a floating action button on mobile.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>`;

// =========================================================================
// 1. GENERATE public/timetable-generator-online-for-students/index.html
// =========================================================================
let studentHtml = rootHtml;
studentHtml = studentHtml.replace(/<title>.*?<\/title>/, '<title>Student Timetable Generator Online - Free Class & Study Timetable Maker</title>');
studentHtml = studentHtml.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Create student schedules, university lecture routines, revision planners, and class timetables easily with the free online student timetable maker. Instant PDF & PNG export." />');
studentHtml = studentHtml.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://timetablecreator.online/timetable-generator-online-for-students/" />');
studentHtml = studentHtml.replace(/value="My Weekly Timetable"/g, 'value="Student Timetable Generator"');
studentHtml = studentHtml.replace(/value="Class & Activity Schedule"/g, 'value="Class Schedule & Study Routine"');

// Replace the SEO landing container with student-specific SEO content
const startSeoIdx = studentHtml.indexOf('<div class="seo-landing-container" id="about">');
const endSeoIdx = studentHtml.indexOf('<!-- 4. Floating Action Button (FAB) for Mobile Quick Add -->');

if (startSeoIdx !== -1 && endSeoIdx !== -1) {
  studentHtml = studentHtml.substring(0, startSeoIdx) + studentSeoLanding + '\n      </div>\n      ' + studentHtml.substring(endSeoIdx);
}

const studentDir = path.join('public', 'timetable-generator-online-for-students');
if (!fs.existsSync(studentDir)) fs.mkdirSync(studentDir, { recursive: true });
fs.writeFileSync(path.join(studentDir, 'index.html'), studentHtml, 'utf8');
console.log('Successfully written public/timetable-generator-online-for-students/index.html');

// =========================================================================
// 2. GENERATE public/timetable-generator/index.html
// =========================================================================
let genHtml = rootHtml;
genHtml = genHtml.replace(/<title>.*?<\/title>/, '<title>Online Timetable Generator & Weekly Schedule Maker - Free Tool</title>');
genHtml = genHtml.replace(/<meta name="description" content=".*?" \/>/, '<meta name="description" content="Free online timetable generator and weekly planner maker. Easily create, customize, and print school routines, shift rosters, and class schedules." />');
genHtml = genHtml.replace(/<link rel="canonical" href=".*?" \/>/, '<link rel="canonical" href="https://timetablecreator.online/timetable-generator/" />');
genHtml = genHtml.replace(/value="My Weekly Timetable"/g, 'value="Online Timetable Generator"');
genHtml = genHtml.replace(/value="Class & Activity Schedule"/g, 'value="Class Schedule & Study Routine"');

const genDir = path.join('public', 'timetable-generator');
if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });
fs.writeFileSync(path.join(genDir, 'index.html'), genHtml, 'utf8');
console.log('Successfully written public/timetable-generator/index.html');

console.log('Sync complete!');
