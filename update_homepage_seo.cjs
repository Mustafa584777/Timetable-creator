const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add FAQ Schema to <head> if not already present
const faqSchema = `    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an Online Timetable Maker?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An online timetable maker is a web-based scheduling tool that allows students, teachers, professionals, and organizers to build, customize, and export custom weekly schedules, class routines, and work plans instantly without requiring software installation or sign-ups."
          }
        },
        {
          "@type": "Question",
          "name": "Is this Free Timetable Maker 100% free with no login required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our free timetable maker is completely free to use with zero registration, login, or subscription fees. You can start creating schedules immediately and export them as PDF or PNG."
          }
        },
        {
          "@type": "Question",
          "name": "How does the AI Timetable Generator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI timetable generator uses advanced algorithms to automatically construct optimized weekly schedules based on your prompt, subjects, study hours, or work shifts."
          }
        },
        {
          "@type": "Question",
          "name": "Can I create a 24-hour schedule or shift planner?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our online schedule maker supports flexible time ranges from early morning to late night, with 12-hour AM/PM and 24-hour military time formats, perfect for 24-hour shift planners."
          }
        },
        {
          "@type": "Question",
          "name": "How do I export my schedule as a PDF or high-resolution PNG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply click the Print, PDF, or PNG export buttons in the top toolbar to instantly download your high-resolution timetable formatted for crisp printing or digital sharing."
          }
        },
        {
          "@type": "Question",
          "name": "How does this compare to Canva for creating timetables?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike Canva, which only provides static graphic design templates that require manual text editing and image exports, our dedicated online timetable maker is a functional scheduling engine with interactive drag-and-drop, automated conflict detection, and instant PDF/PNG/JSON backups."
          }
        },
        {
          "@type": "Question",
          "name": "Can I customize time intervals (15, 30, 45, or 60 minutes)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can fully customize your timetable intervals to 15, 30, 45, or 60 minutes to accommodate precise class timings, lab sessions, or workout routines."
          }
        },
        {
          "@type": "Question",
          "name": "Is my timetable data saved securely in my browser?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All your timetable edits are continuously auto-saved locally in your browser storage (LocalStorage), ensuring your data remains private, secure, and instantly accessible upon return."
          }
        },
        {
          "@type": "Question",
          "name": "Can I create a study timetable for board exams or college finals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Our platform is ideal for students building study timetables for board exams, university finals, and semester revision plans with dedicated subject color coding."
          }
        },
        {
          "@type": "Question",
          "name": "How do I plan a workout or gym schedule using the weekly planner?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can select our pre-built Workout & Gym Plan template or create custom fitness blocks for cardio, weightlifting, and rest days with color-coded tags."
          }
        },
        {
          "@type": "Question",
          "name": "Can teachers use this tool to build school master rosters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our school timetable creator and teacher schedule tools allow educators to map out classroom assignments, teacher schedules, and school periods efficiently."
          }
        },
        {
          "@type": "Question",
          "name": "How does drag-and-drop event rescheduling work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can simply click and drag any activity card to another day or time slot, or resize its bottom edge to adjust duration instantly."
          }
        },
        {
          "@type": "Question",
          "name": "Can I switch between 5-day, 6-day, and 7-day weekly views?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our grid settings let you toggle between 1 to 7 active days per week, covering Monday-to-Friday school weeks as well as full 7-day weekend schedules."
          }
        },
        {
          "@type": "Question",
          "name": "What makes this the best online timetable generator compared to legacy tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike outdated desktop software or rigid legacy tools, our modern online timetable generator combines AI assistance, lightning-fast web performance, Excel-style grid resizing, and flawless PDF exports."
          }
        },
        {
          "@type": "Question",
          "name": "How do I avoid schedule conflicts and overlaps?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our intelligent conflict detection system automatically highlights overlapping time blocks with warning badges so you can resolve scheduling clashes immediately."
          }
        },
        {
          "@type": "Question",
          "name": "Can I import and export JSON backups of my schedule?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can export your entire schedule as a JSON file for safe backups or import existing JSON files to restore your timetable across different devices."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a weekly timetable maker for remote workers and freelancers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, freelancers and remote professionals use our weekly timetable maker to structure client meetings, deep work sessions, breaks, and administrative hours."
          }
        },
        {
          "@type": "Question",
          "name": "How do I get started with the free timetable creator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply visit the homepage, choose a pre-built template or start with a blank grid, add your activities, and export your professional schedule in under two minutes!"
          }
        }
      ]
    }
    </script>`;

if (!html.includes('"@type": "FAQPage"')) {
  html = html.replace('</head>', `${faqSchema}\n  </head>`);
}

// 2. Comprehensive SEO Content Section beating competitors (Canva, Dayschedule, Timetable Master, etc.)
const enhancedSeoContent = `    <div class="seo-content-section">
      <h1 class="seo-h1">The Ultimate Online Timetable Maker for All Your Scheduling Needs</h1>
      <p>
        Welcome to the most powerful and user-friendly <strong>Online Timetable Maker</strong> available on the web. Whether you're a student crafting your class schedule, a professional organizing your workweek, or an event coordinator planning complex timelines, our free schedule builder provides all the tools you need to create visually stunning and highly functional timetables without any sign-up requirements.
      </p>

      <h2>Why Our Timetable Creator Beats Canva, Dayschedule, and Legacy Tools</h2>
      <p>
        While design platforms like Canva offer static templates that require tedious manual editing, and legacy calendar tools like Dayschedule or rigid master builders impose strict limitations or subscriptions, our <strong>free timetable maker</strong> is built from the ground up as a high-performance interactive scheduling engine. Here is why users choose our <strong>timetable generator online</strong>:
      </p>
      <ul>
        <li><strong>Interactive Grid & Drag-and-Drop:</strong> Unlike static PDF or image templates, our <strong>online schedule maker</strong> lets you drag, drop, resize, and reorganize your activities in real time.</li>
        <li><strong>AI Timetable Generator:</strong> Harness cutting-edge <strong>timetable maker ai</strong> to generate complete semester rosters, study plans, or shift schedules with a single prompt.</li>
        <li><strong>Zero Registration Required:</strong> Start building with our <strong>free online timetable maker</strong> instantly—no accounts, no forced sign-ups, and no credit cards.</li>
        <li><strong>Multi-Format Exports:</strong> Download your finished schedule instantly as a high-resolution PNG image, print-ready PDF document, or JSON data backup.</li>
        <li><strong>Advanced Customization:</strong> Tailor your time intervals (15, 30, 45, or 60 minutes), switch between 12-hour and 24-hour formats, and adjust active days (5-day, 6-day, or full 7-day week).</li>
      </ul>

      <h2>Powerful Features of Our Timetable Maker</h2>
      <p>
        Our comprehensive <strong>weekly timetable maker</strong> and <strong>school timetable creator</strong> come packed with professional features designed to make time management effortless:
      </p>
      <ul>
        <li><strong>Conflict Detection:</strong> Automatically flags overlapping time slots and double-booked activities with visual alert badges.</li>
        <li><strong>Excel-Style Resizing:</strong> Easily drag row heights and column widths to customize your workspace layout.</li>
        <li><strong>Pre-Built Templates:</strong> Quick-start your planning with professional templates for university schedules, high school routines, work shifts, workout plans, and exam revision timetables.</li>
        <li><strong>Local Auto-Save:</strong> All edits are securely auto-saved in your browser storage so your schedule is never lost.</li>
      </ul>

      <h2>How to Create a Timetable Online in 3 Simple Steps</h2>
      <p>
        Building a professional schedule with our <strong>time table maker</strong> is fast and intuitive:
      </p>
      <ol style="color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; padding-left: 20px;">
        <li style="margin-bottom: 8px;"><strong>Configure Your Grid:</strong> Choose your number of active days (e.g., Mon-Fri or Mon-Sun), time range, and interval length (e.g., 30-minute blocks).</li>
        <li style="margin-bottom: 10px;"><strong>Add Activities or Use AI:</strong> Click any time slot to add your classes, meetings, or workouts, or use our <strong>ai timetable generator</strong> for instant automated scheduling.</li>
        <li style="margin-bottom: 10px;"><strong>Export & Share:</strong> Click print, save as PDF, or download a high-res PNG to keep on your device or print for your desk.</li>
      </ol>

      <p>Transitioning from paper planners to our <strong>Online Timetable Maker</strong> offers numerous advantages that enhance productivity and organization:</p>
      <ul>
        <li><strong>Eliminate Scheduling Conflicts:</strong> Visual block layout prevents accidental double-booking.</li>
        <li><strong>Boost Academic & Work Performance:</strong> Structured time blocking ensures dedicated focus hours for study and deep work.</li>
        <li><strong>Accessible Anywhere:</strong> Works seamlessly across desktop, tablet, and mobile browsers with responsive scrolling.</li>
      </ul>

      <h2>Frequently Asked Questions About Online Timetable Makers</h2>
      <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Is this Online Timetable Maker completely free?</h3>
          <p style="margin: 0;">Yes! Our <strong>Online Timetable Maker</strong> is completely free with no hidden costs, premium tiers, or subscription requirements. All features are available to everyone at no charge, and the tool will remain free forever.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Can I use this schedule builder for university and school classes?</h3>
          <p style="margin: 0;">Absolutely. Whether you need a <strong>school timetable creator</strong>, a college semester planner, or a <strong>study timetable creator</strong>, our flexible grid supports complex academic timetables easily.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">How does the AI Timetable Generator work?</h3>
          <p style="margin: 0;">Our <strong>ai timetable generator</strong> takes your natural language prompt and course details and automatically populates your weekly timetable with logically structured time blocks.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Can I export my timetable to PDF or PNG?</h3>
          <p style="margin: 0;">Yes, you can export your schedule as a high-resolution PNG image or print-ready PDF document instantly using the top toolbar buttons.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Do I need to register or create an account?</h3>
          <p style="margin: 0;">No registration or login is required. You can start creating your schedule right away with our <strong>free timetable maker</strong>.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Can I create a 24-hour schedule or shift planner?</h3>
          <p style="margin: 0;">Yes, you can configure custom start and end times to build 24-hour schedules, night shift rosters, or round-the-clock operational timetables.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">Is my timetable data saved securely?</h3>
          <p style="margin: 0;">Yes, all changes are auto-saved locally in your browser storage so your data remains private and secure on your device.</p>
        </div>
        <div>
          <h3 style="font-size: 16px; font-weight: 600; color: var(--text-main); margin-bottom: 6px;">How does this compare to Canva timetable templates?</h3>
          <p style="margin: 0;">While Canva offers static design layouts, our <strong>online timetable generator</strong> is an interactive scheduling application with drag-and-drop editing, auto-save, and instant PDF/PNG exports.</p>
        </div>
      </div>

      <p style="margin-top: 24px;">
        Join thousands of students, professionals, and organizers who trust our <strong>Online Timetable Maker</strong> to streamline their planning and boost productivity. Whether you need a simple daily schedule or a complex multi-week planner, our free tool provides everything you need to stay organized and accomplish your goals.
      </p>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color); font-size: 12px; color: var(--text-muted);">
        <strong>Keywords:</strong> Online Timetable Maker, Schedule Builder, Free Timetable Creator, Weekly Planner, Class Schedule Maker, Work Schedule Template, Daily Planner, Time Management Tool, Student Timetable, Calendar Creator, Schedule Organizer, Shift Planner, Course Schedule, Time Blocking Tool, Productivity Planner
      </div>
    </div>`;

// Replace old seo-content-section in index.html
const oldSeoRegex = /<div class="seo-content-section">[\s\S]*?<\/div>\s*(?=<footer class="seo-footer">)/;
if (oldSeoRegex.test(html)) {
  html = html.replace(oldSeoRegex, enhancedSeoContent + '\n\n    ');
} else {
  // Fallback: replace before footer
  html = html.replace('<footer class="seo-footer">', enhancedSeoContent + '\n\n    <footer class="seo-footer">');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Homepage SEO content and FAQ schema updated successfully.');
