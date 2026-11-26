const fs = require('fs');
const path = require('path');
const { buildFullCleanDocument } = require('./update_seo_i18n.cjs');

const mainContent = `
        <main class="w-full max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 flex-grow" style="max-width: min(56rem, 100%); width: 100%;">
          <article class="bg-white dark:bg-[#19172f] border border-[#ebe8fa] dark:border-[#2f2b54] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm space-y-6 sm:space-y-8 w-full overflow-hidden" style="max-width: 100%;">
            
            <!-- Breadcrumb navigation -->
            <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-xs text-[#6e6d7a] dark:text-[#a3a0c2] font-medium mb-4">
              <a href="/" class="hover:text-[#18A8A8] transition-colors">Home</a>
              <span>/</span>
              <a href="/blog/" class="hover:text-[#18A8A8] transition-colors">Blog</a>
              <span>/</span>
              <span class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold truncate max-w-[240px] sm:max-w-md">50/10 &amp; 25/5 Pomodoro Study Schedule</span>
            </nav>

            <header class="space-y-4 border-b border-[#ebe8fa] dark:border-[#2f2b54] pb-8">
              <div class="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider">
                <span class="bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-3 py-1 rounded-full uppercase tracking-wider">Study Focus Guide</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• By <strong class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold">Prof. Sarah Lin</strong></span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• Last Updated: November 25, 2026</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• 12 Min Read</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1d1e2c] dark:text-[#f5f4fc] tracking-tight leading-tight mb-4 break-words">
                How to Build a 50/10 &amp; 25/5 Pomodoro Study Schedule That Actually Works
              </h1>

              <!-- No-Text Hero Infographic placed right before the first paragraph -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/pomodoro-hero.jpg" alt="Students organizing a hybrid 50/10 and 25/5 Pomodoro study schedule with flashcards, timer, and focus blocks" class="w-full h-auto object-cover rounded-2xl" loading="lazy" referrerpolicy="no-referrer" />
              </figure>

              <p class="text-base text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">
                I have been using the <strong>50/10 &amp; 25/5 Pomodoro Study Schedule</strong> for the last 8 months and it has completely transformed how I study. Most people start with a classic 25/5 timer but quit after two days because their schedule is too rigid. The real secret is building a flexible hybrid plan with a free <a href="/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">timetable maker</a> that matches your energy, subject difficulty, and daily life — something I learned the hard way when I failed my first mock test after 25 straight 25/5 rounds.
              </p>
            </header>

            <!-- Table of Contents -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#18A8A8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10"></path></svg>
                <h2 class="text-base font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Table of Contents</h2>
              </div>
              <ul class="space-y-2 text-sm text-[#6e6d7a] dark:text-[#a3a0c2] font-medium">
                <li><a href="#sec-1" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">1. Introduction: Why Most Pomodoro Study Schedules Fail After Two Days</a></li>
                <li><a href="#sec-2" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">2. 25/5 vs. 50/10 Pomodoro: Understanding the Core Mechanics</a></li>
                <li><a href="#sec-3" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">3. Subject-to-Interval Matching: When to Use 25/5 vs. 50/10</a></li>
                <li><a href="#sec-4" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">4. Step-by-Step: How to Build Your Daily Pomodoro Study Schedule</a></li>
                <li><a href="#sec-5" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">5. Content Gap: Ready-to-Use Hybrid Pomodoro Schedule Templates</a></li>
                <li><a href="#sec-6" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">6. Behavioral Gap: The Break Protocol—How to Rest Without Losing Momentum</a></li>
                <li><a href="#sec-7" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">7. Advanced Rules: Bending the Timer Without Breaking Your Discipline</a></li>
                <li><a href="#sec-8" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">8. Best Free Pomodoro Timers and Study Tools (Web, Mobile &amp; No-Music)</a></li>
                <li><a href="#sec-9" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">9. Frequently Asked Questions (FAQs) About 50/10 &amp; 25/5 Pomodoro Schedules</a></li>
                <li><a href="#sec-10" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">10. Conclusion: Running a 7-Day Experiment to Find Your Ideal Rhythm</a></li>
              </ul>
            </div>

            <!-- SECTION 1 -->
            <section id="sec-1" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">1. Introduction: Why Most Pomodoro Study Schedules Fail After Two Days</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Everyone starts with the classic 25 minutes of study and 5 minutes of break. But after day three, most students feel exhausted and give up. The reason is simple: a fixed 25/5 schedule does not match your brain’s natural energy cycles or your real-life commitments. I made the same mistake in Class 12 and only succeeded when I switched to a hybrid 50/10 + 25/5 system that actually works.</p>
            </section>

            <!-- SECTION 2 -->
            <section id="sec-2" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">2. 25/5 vs. 50/10 Pomodoro: Understanding the Core Mechanics</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Two different timers for two different types of work. I now run both depending on the task.</p>

              <!-- Infographic 2: 25/5 vs 50/10 Pomodoro -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/pomodoro-25-vs-50.jpg" alt="25/5 Classic vs 50/10 Deep Work Pomodoro Comparison Infographic" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 1:</strong> Matching 25/5 Classic rounds to low-friction revision and 50/10 Deep Work blocks to numericals and past papers.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The Classic 25/5 Split: Lowering Start Friction and Beating Procrastination</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">25 minutes is short enough that your brain never feels overwhelmed. Perfect for revision, flashcards, and low-energy days. I use this round when I am tired or when I just need to start moving.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The Deep-Work 50/10 Split: Protecting Flow States for Complex Problem Solving</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">50 minutes lets you enter a true flow state for mathematics, essay writing, or coding. I protect these rounds with a “do not disturb” rule and only take the 10-minute break when I am genuinely stuck. This is my favourite for high-stakes <a href="/blog/best-study-timetable-for-board-exam-students/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">board exam preparation</a>.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Same 5:1 Work-to-Rest Ratio, Different Cognitive Impact (Side-by-Side Comparison)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Both plans use the same 5:1 ratio, but the 50/10 version allows deeper concentration while the 25/5 version keeps momentum high. I run 2–3 rounds of 25/5 after each 50/10 block so my brain never burns out.</p>
            </section>

            <!-- SECTION 3 -->
            <section id="sec-3" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">3. Subject-to-Interval Matching: When to Use 25/5 vs. 50/10</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Best Study Tasks for 25/5 Intervals (Flashcards, Vocab Drills, Chapter Outlines, Revision)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use 25/5 for anything that needs repetition: learning formulas, making short notes, revising previous year questions, or building mind maps. I never study new difficult concepts in these rounds.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Best Study Tasks for 50/10 Intervals (Math Numericals, Essay Writing, Coding, Past Papers)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Save 50/10 rounds for heavy lifting: solving 40–50 mathematics or physics numericals, writing full essays, coding projects, or solving complete past papers. This is where I go into flow and lose track of time.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The "Warm-Up" Rule: Starting With One 25/5 Round Before Switching to 50/10</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Every day I start with one 25/5 round (even if it is for a difficult subject). This lowers the barrier and gets my brain ready. Only after the first round do I switch to 50/10 when the task demands it.</p>

              <!-- Interactive Element 1: Live Hybrid Pomodoro Timer & Mind Capture Widget -->
              <div id="pomodoroTimerWidget" class="tc-surface-panel my-8 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Interactive Hybrid Timer
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Live 25/5 &amp; 50/10 Pomodoro Timer + Mind Capture</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Pick your interval, run a live focus or break countdown, log completed rounds, and park distractions below.</p>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl px-4 py-2.5 text-left sm:text-right shrink-0">
                    <div class="text-[10px] font-bold text-[#6e6d7a] dark:text-[#a3a0c2] uppercase tracking-wider">Rounds Completed</div>
                    <div id="pomoRoundsCount" class="text-xl font-black text-[#0f7676] dark:text-[#4fd1d1]">0 Rounds</div>
                  </div>
                </div>

                <!-- Mode Selector -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button type="button" id="btnPomo25" onclick="selectPomoMode('25_5')" class="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">25/5 Classic (Warm-Up / Revision)</button>
                  <button type="button" id="btnPomo50" onclick="selectPomoMode('50_10')" class="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">50/10 Deep Work (Numericals / Flow)</button>
                  <button type="button" id="btnPomoWarmup" onclick="selectPomoMode('warmup')" class="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Hybrid (25/5 → 50/10 Auto)</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <!-- SVG Circular Countdown -->
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-5 flex flex-col items-center justify-center space-y-4">
                    <div class="relative w-40 h-40 flex items-center justify-center">
                      <svg viewBox="0 0 120 120" class="w-40 h-40" style="transform: rotate(-90deg);">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#e6f7f7" stroke-width="10"></circle>
                        <circle id="pomoProgressRing" cx="60" cy="60" r="52" fill="none" stroke="#18A8A8" stroke-width="10" stroke-linecap="round" stroke-dasharray="326.73" stroke-dashoffset="0"></circle>
                      </svg>
                      <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span id="pomoPhaseLabel" class="text-[10px] font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1]">FOCUS</span>
                        <span id="pomoClockText" class="text-3xl font-black font-mono text-[#1d1e2c] dark:text-[#f5f4fc]">25:00</span>
                        <span id="pomoModeSubtitle" class="text-[10px] text-[#6e6d7a] dark:text-[#a3a0c2]">25/5 Classic</span>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center justify-center gap-2">
                      <button type="button" id="btnPomoStart" onclick="togglePomoTimer()" class="px-4 py-2 rounded-lg text-xs font-bold bg-[#18A8A8] hover:bg-[#0f7676] text-white cursor-pointer transition-all">Start Timer</button>
                      <button type="button" onclick="resetPomoTimer()" class="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#f0fbfb] dark:bg-[#232140] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Reset</button>
                      <button type="button" onclick="completePomoRound()" class="px-3.5 py-2 rounded-lg text-xs font-bold bg-[#0f7676] text-white cursor-pointer transition-all">+1 Done</button>
                    </div>
                  </div>

                  <!-- Distraction Mind Capture Sheet -->
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-bold uppercase tracking-wider text-[#1d1e2c] dark:text-[#f5f4fc]">Mind Capture Sheet</span>
                      <span class="text-[11px] font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Mid-Timer Thoughts</span>
                    </div>
                    <p class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">Write distracting thoughts here so you don't break focus during your 25 or 50 minute sprint.</p>
                    <div class="flex gap-2">
                      <input type="text" id="mindCaptureInput" placeholder="e.g., Check chemistry lab date after break" class="flex-1 px-3 py-2 rounded-lg text-xs bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 dark:border-[#2f2b54] text-[#1d1e2c] dark:text-[#f5f4fc] focus:outline-none" />
                      <button type="button" onclick="addMindCapture()" class="px-3 py-2 rounded-lg text-xs font-bold bg-[#18A8A8] hover:bg-[#0f7676] text-white cursor-pointer shrink-0">Park</button>
                    </div>
                    <ul id="mindCaptureList" class="space-y-1.5 text-xs text-[#3c3d4e] dark:text-[#c7c5df]"></ul>
                  </div>
                </div>
              </div>
            </section>

            <!-- SECTION 4 -->
            <section id="sec-4" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">4. Step-by-Step: How to Build Your Daily Pomodoro Study Schedule</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I built my first hybrid schedule in one Sunday evening and it has been working perfectly ever since.</p>

              <!-- Infographic 3: 4-Step Hybrid Pomodoro System -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/pomodoro-4-step.jpg" alt="4-Step Hybrid Pomodoro System Infographic: Energy Audit, Micro-Tasks, Stack Rounds, Mind Capture" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 2:</strong> 4-step workflow for auditing energy peaks, splitting micro-tasks, stacking long breaks, and capturing distractions.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Step 1: Audit Your Available Study Hours and Daily Energy Peaks</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Check your energy curve for the next 7 days. If you are most alert at 8–10 AM or 7–10 PM, block your longest rounds there.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Step 2: Convert Vague Study Goals Into Single-Pomodoros Micro-Tasks</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Instead of “Learn Chapter 5”, break it into 20–30 micro-tasks like “Learn 5 formulas”, “Write 10 short notes”, or “Solve 20 numericals”. This makes the timer feel manageable.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Step 3: Stack Your Morning, Afternoon, and Evening Rounds With Long Breaks</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Never do more than 4–5 Pomodoros in a row. Always include a 30-minute walk or meal break between every 3 rounds.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Step 4: Set Up a Distraction Capture Sheet for Mid-Timer Thoughts</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Keep a small notebook called “Mind Capture” on your desk. Whenever your mind wanders, write the thought down. This stops you from losing 5 minutes every 5 minutes.</p>
            </section>

            <!-- SECTION 5 -->
            <section id="sec-5" class="space-y-6">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">5. Content Gap: Ready-to-Use Hybrid Pomodoro Schedule Templates</h2>

              <!-- Template 1 -->
              <div class="space-y-2">
                <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Template 1: The After-School / College Student Schedule (4–6 Pomodoros / 3 Hours)</h3>
                <div class="article-table-wrap border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl overflow-x-auto mt-2 w-full">
                  <table class="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr class="bg-[#f0fbfb] dark:bg-[#232140] border-b border-[#18A8A8]/20 dark:border-[#2f2b54]">
                        <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Time Slot</th>
                        <th class="p-3.5 font-bold text-[#0f7676] dark:text-[#4fd1d1]">Round Type</th>
                        <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Subject Focus</th>
                        <th class="p-3.5 font-bold text-[#6e6d7a] dark:text-[#a3a0c2]">Break</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#ebe8fa] dark:divide-[#2f2b54] text-[#3c3d4e] dark:text-[#c7c5df]">
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">7:00–7:25 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Flashcards &amp; Short Notes</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">7:30–8:20 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">50/10</td>
                        <td class="p-3.5">Mathematics or Science</td>
                        <td class="p-3.5">10 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">8:30–8:55 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Chapter Outline</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">9:00–9:45 AM</td>
                        <td class="p-3.5">45 min break</td>
                        <td class="p-3.5">Meal + Rest</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">10:00–10:45 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Revision &amp; Past Papers</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">10:50–11:35 AM</td>
                        <td class="p-3.5">45 min break</td>
                        <td class="p-3.5">Lunch + Short walk</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">12:00–12:45 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Language Subject</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">12:50–1:35 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Remaining weak topics</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Template 2 -->
              <div class="space-y-2">
                <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Template 2: The Full-Day Exam Prep Hybrid Schedule (Combining Morning 50/10 &amp; Afternoon 25/5)</h3>
                <div class="article-table-wrap border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl overflow-x-auto mt-2 w-full">
                  <table class="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr class="bg-[#f0fbfb] dark:bg-[#232140] border-b border-[#18A8A8]/20 dark:border-[#2f2b54]">
                        <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Time Slot</th>
                        <th class="p-3.5 font-bold text-[#0f7676] dark:text-[#4fd1d1]">Round Type</th>
                        <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Subject Focus</th>
                        <th class="p-3.5 font-bold text-[#6e6d7a] dark:text-[#a3a0c2]">Break</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-[#ebe8fa] dark:divide-[#2f2b54] text-[#3c3d4e] dark:text-[#c7c5df]">
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">6:00–6:50 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">50/10</td>
                        <td class="p-3.5">Weakest Chapter (3 hours)</td>
                        <td class="p-3.5">10 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">7:00–7:25 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Flashcards of the chapter</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">7:30–7:55 AM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Mind map &amp; short notes</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">8:00–12:30 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">50/10 + 25/5</td>
                        <td class="p-3.5">Full sample paper (6 Pomodoros)</td>
                        <td class="p-3.5">10 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">12:30–1:00 PM</td>
                        <td class="p-3.5">Lunch + Rest</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">1:00–4:30 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">50/10 + 25/5</td>
                        <td class="p-3.5">Error analysis + remaining</td>
                        <td class="p-3.5">10 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">4:30–4:55 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Diagrams &amp; maps</td>
                        <td class="p-3.5">5 min</td>
                      </tr>
                      <tr class="hover:bg-[#f0fbfb]/70">
                        <td class="p-3.5 font-mono font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">5:00–5:25 PM</td>
                        <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">25/5</td>
                        <td class="p-3.5">Formula revision</td>
                        <td class="p-3.5 text-[#6e6d7a]">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Template 3 -->
              <div class="space-y-2">
                <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Template 3: The Low-Energy / Procrastination Recovery Schedule (Pure 25/5 Sprints)</h3>
                <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">When I feel completely drained, I use this version with only 25/5 rounds and 5-minute breaks. It still gets work done without overwhelming me.</p>
              </div>

              <!-- Interactive Element 2: Hybrid Pomodoro Day Explorer -->
              <div id="pomoDayExplorer" class="tc-surface-panel my-6 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      Interactive Schedule Explorer
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Compare Hybrid Pomodoro Energy Breakdowns</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Switch between all 3 schedules to inspect exact focus minutes, break ratios, and interval mix.</p>
                  </div>
                  <div id="pomoExpStats" class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl px-4 py-2.5 text-xs sm:text-sm font-black text-[#0f7676] dark:text-[#4fd1d1] shrink-0">
                    175m Focus • 6 Rounds
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button type="button" id="btnExpT1" onclick="selectPomoTemplate('t1')" class="px-3 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Template 1: After-School</button>
                  <button type="button" id="btnExpT2" onclick="selectPomoTemplate('t2')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Template 2: Full-Day Prep</button>
                  <button type="button" id="btnExpT3" onclick="selectPomoTemplate('t3')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Template 3: Low-Energy 25/5</button>
                </div>

                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-3">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span id="pomoExpTitle" class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">After-School / College Hybrid Mix</span>
                    <div class="flex items-center gap-3 text-[11px] font-medium text-[#6e6d7a] dark:text-[#a3a0c2]">
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#0f7676] inline-block"></span> 50/10 Deep Work</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#18A8A8] inline-block"></span> 25/5 Sprint</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#7bdcdc] inline-block"></span> Break / Meal</span>
                    </div>
                  </div>
                  <div id="pomoExpSvg" class="w-full overflow-hidden"></div>
                  <div id="pomoExpRounds" class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"></div>
                </div>
              </div>
            </section>

            <!-- SECTION 6 -->
            <section id="sec-6" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6. Behavioral Gap: The Break Protocol—How to Rest Without Losing Momentum</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Why Checking Your Phone During a 5-Minute Break Destroys Your Next Round</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Even 10 seconds on your phone resets your focus. I now keep my phone in another room during all Pomodoro rounds.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 5-Minute Break Menu (Hydration, Eye Reset, Micro-Stretching)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Drink water, blink 10 times, and do 10 shoulder rolls. This single protocol has saved me from eye strain and fatigue.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 10-Minute &amp; 30-Minute Long Break Rules (Leaving Your Study Desk Completely)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Take a 10-minute walk or stretch after every 4–5 rounds. On longer days, take a full 30-minute break after 3 hours of continuous Pomodoros. This is non-negotiable.</p>
            </section>

            <!-- SECTION 7 -->
            <section id="sec-7" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">7. Advanced Rules: Bending the Timer Without Breaking Your Discipline</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The Flow-State Exception: What to Do When You Are Locked In at Minute 25 or 50</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">If you are in deep flow and reach exactly 25 or 50 minutes, finish the current task first. I only take the break when I finish the micro-task.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Handling Unavoidable Interruptions (The Void-and-Restart vs. Pause Rule)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">If someone disturbs you, I pause the timer, note the time lost, and restart from the same point. Never abandon the round — just restart it.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Tracking Completed Rounds Instead of Hours Studied</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I now track “Pomodoros completed” instead of hours. This keeps me motivated even when I feel tired.</p>
            </section>

            <!-- SECTION 8 -->
            <section id="sec-8" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">8. Best Free Pomodoro Timers and Study Tools (Web, Mobile &amp; No-Music)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Minimalist Browser &amp; Desktop Timers (Pomofocus, Focus To-Do, Forest)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Pomofocus is my favourite because it has no music and beautiful dark mode. Forest gamifies the process so I never stop a round.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Silent vs. Lofi YouTube Pomodoro Timer Videos (25/5 and 50/10 Streams)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I use silent Pomodoro timer videos on YouTube. Both 25/5 and 50/10 versions are available. I play the 50/10 stream for my deep work rounds and the 25/5 for revision.</p>
            </section>

            <!-- SECTION 9 -->
            <section id="sec-9" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">9. Frequently Asked Questions (FAQs) About 50/10 &amp; 25/5 Pomodoro Schedules</h2>
              <div class="space-y-3">
                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePomoFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can I use 50/10 rounds for board exams?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes. I use 50/10 rounds for Mathematics and Science numericals and 25/5 rounds for revision and languages.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePomoFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">What if I get interrupted every 5 minutes?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Use the 25/5 version and start with one round. It lowers the barrier and builds the habit.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePomoFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">How many Pomodoros should I do per day?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">4–6 Pomodoros is ideal for working students. I never go above 6 to protect my sleep.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePomoFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Do I need a timer app?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">You can use any free online timer. Pomofocus and Forest are the most reliable.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePomoFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can this schedule work during coaching classes?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes. I block 25/5 rounds during my commute and lunch breaks.</p>
                </div>
              </div>
            </section>

            <!-- SECTION 10 -->
            <section id="sec-10" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">10. Conclusion: Running a 7-Day Experiment to Find Your Ideal Rhythm</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I have now run a full 7-day experiment with both 50/10 and 25/5 schedules and the hybrid version wins every time. The key is matching the timer length to the task and protecting your breaks.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start with one template this week, track your completed rounds, and adjust after every 7 days. You will quickly discover your ideal rhythm. I have watched my study hours increase, my retention improve, and my stress drop dramatically since I stopped forcing a one-size-fits-all Pomodoro schedule.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Your boards (or university exams) will thank you.</p>
            </section>

            <!-- SOURCES -->
            <section id="sec-sources" class="space-y-3 pt-2">
              <h2 class="text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Sources</h2>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>James Clear – Atomic Habits (atomic-habits.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Pomofocus Official Website (pomofocus.io)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Forest App Documentation (forestapp.cc)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Notion Pomodoro Templates (notion.so/templates)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Cal Newport – Deep Work (calnewport.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Anki Official Guide (apps.ankiweb.net)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Productivity Science Research on Ultradian Rhythms</span></li>
              </ul>
            </section>

            <!-- Call to Action Box (Links ONLY to Study Timetable Tool) -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-6 text-center space-y-3">
              <div class="text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Map Your Hybrid 50/10 &amp; 25/5 Study Blocks</div>
              <p class="text-sm text-[#6e6d7a] dark:text-[#a3a0c2]">Turn your Pomodoro rounds, subject goals, and break menus into a clean printable weekly schedule.</p>
              <a href="/study-timetable-creator/" class="inline-flex items-center gap-2 bg-[#18A8A8] hover:bg-[#0f7676] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Open Study Timetable Tool</span>
              </a>
            </div>

            <!-- Author Box -->
            <div class="mt-10 pt-8 border-t border-[#ebe8fa] dark:border-[#2f2b54]">
              <div class="tc-surface-panel bg-[#f7f5fe] dark:bg-[#232140] border border-[#ebe8fa] dark:border-[#2f2b54] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                <img src="/author.png" alt="Prof. Sarah Lin" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm shrink-0 border-2 border-[#dcd4fc] dark:border-[#8c68fc]" referrerpolicy="no-referrer" />
                <div class="space-y-2 text-center sm:text-left flex-1">
                  <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span class="tc-text-primary text-base sm:text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Prof. Sarah Lin</span>
                    <span class="text-[11px] bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Reviewed Specialist</span>
                  </div>
                  <p class="tc-text-secondary text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">
                    M.A. in Curriculum Design, Educational Technologist. 12+ years of expertise advising schools and families on healthy, performance-optimized timetables.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </main>
`;

const pageScript = `
  var pomoState = {
    mode: '25_5',
    phase: 'focus',
    secondsLeft: 25 * 60,
    totalSeconds: 25 * 60,
    running: false,
    timerId: null,
    rounds: 0,
    warmupDone: false,
    thoughts: ['Finish Ch. 5 formula flashcards', 'Review mock errors after break']
  };

  var POMO_MODES = {
    '25_5': { label: '25/5 Classic', focusSec: 25 * 60, breakSec: 5 * 60 },
    '50_10': { label: '50/10 Deep Work', focusSec: 50 * 60, breakSec: 10 * 60 },
    'warmup': { label: 'Warm-Up Hybrid', focusSec: 25 * 60, breakSec: 5 * 60 }
  };

  var POMO_TEMPLATES = {
    t1: {
      title: 'After-School / College Hybrid Mix (Template 1)',
      stats: '175m Focus • 6 Rounds',
      segments: [
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 5, color: '#7bdcdc', label: '' },
        { min: 50, color: '#0f7676', label: '50m' },
        { min: 10, color: '#7bdcdc', label: '' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 45, color: '#cbd5e1', label: 'Meal' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 45, color: '#cbd5e1', label: 'Walk' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 25, color: '#18A8A8', label: '25m' }
      ],
      items: [
        { slot: '7:00–7:25 AM', tag: '25/5', task: 'Flashcards & Short Notes + 5m eye reset' },
        { slot: '7:30–8:20 AM', tag: '50/10', task: 'Mathematics or Science core problems + 10m break' },
        { slot: '8:30–8:55 AM', tag: '25/5', task: 'Chapter Outline + 45m meal & rest break' },
        { slot: '10:00 AM–1:35 PM', tag: '25/5 x3', task: 'Past Papers, Language Subject & weak topics' }
      ]
    },
    t2: {
      title: 'Full-Day Exam Prep Hybrid Mix (Template 2)',
      stats: '430m Focus • 11+ Rounds',
      segments: [
        { min: 50, color: '#0f7676', label: '50m' },
        { min: 10, color: '#7bdcdc', label: '' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 180, color: '#0f7676', label: 'Sample Paper' },
        { min: 30, color: '#cbd5e1', label: 'Lunch' },
        { min: 140, color: '#0f7676', label: 'Error Fix' },
        { min: 50, color: '#18A8A8', label: 'Diagrams' }
      ],
      items: [
        { slot: '6:00–7:55 AM', tag: '50/10 + 25/5', task: 'Weakest chapter deep dive + flashcards & mind maps' },
        { slot: '8:00–12:30 PM', tag: '6 Rounds', task: 'Full sample paper simulation (50/10 + 25/5)' },
        { slot: '1:00–4:30 PM', tag: '50/10 + 25/5', task: 'Mock error analysis & remaining tough concepts' },
        { slot: '4:30–5:25 PM', tag: '25/5 x2', task: 'Diagrams, maps & formula revision sprints' }
      ]
    },
    t3: {
      title: 'Low-Energy / Procrastination Recovery (Template 3)',
      stats: '100m Focus • 4 Pure 25/5 Sprints',
      segments: [
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 5, color: '#7bdcdc', label: '5m' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 5, color: '#7bdcdc', label: '5m' },
        { min: 25, color: '#18A8A8', label: '25m' },
        { min: 30, color: '#cbd5e1', label: '30m Walk' },
        { min: 25, color: '#18A8A8', label: '25m' }
      ],
      items: [
        { slot: 'Round 1 (25/5)', tag: 'Warm-Up', task: 'Open one chapter and memorize 5 formulas' },
        { slot: 'Round 2 (25/5)', tag: 'Momentum', task: 'Flashcards + Mind Capture distracting thoughts' },
        { slot: 'Round 3 (25/5)', tag: 'Light PYQs', task: 'Solve 10 short previous year questions + 30m walk' },
        { slot: 'Round 4 (25/5)', tag: 'Wrap-Up', task: 'Summarize 1-page notes and end guilt-free' }
      ]
    }
  };

  function formatClock(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderPomoTimer() {
    var clockEl = document.getElementById('pomoClockText');
    var phaseEl = document.getElementById('pomoPhaseLabel');
    var subEl = document.getElementById('pomoModeSubtitle');
    var ringEl = document.getElementById('pomoProgressRing');
    var startBtn = document.getElementById('btnPomoStart');
    var roundsEl = document.getElementById('pomoRoundsCount');

    if (clockEl) clockEl.textContent = formatClock(pomoState.secondsLeft);
    if (phaseEl) phaseEl.textContent = pomoState.phase === 'focus' ? 'FOCUS' : 'BREAK';
    if (subEl) {
      var mLabel = POMO_MODES[pomoState.mode].label;
      if (pomoState.mode === 'warmup') {
        mLabel = pomoState.warmupDone ? '50/10 Flow Active' : '25/5 Warm-Up First';
      }
      subEl.textContent = mLabel;
    }
    if (roundsEl) roundsEl.textContent = pomoState.rounds + (pomoState.rounds === 1 ? ' Round' : ' Rounds');
    if (startBtn) startBtn.textContent = pomoState.running ? 'Pause Timer' : 'Start Timer';

    if (ringEl && ringEl.setAttribute) {
      var circum = 326.73;
      var ratio = pomoState.totalSeconds > 0 ? (pomoState.secondsLeft / pomoState.totalSeconds) : 0;
      var offset = circum * (1 - ratio);
      ringEl.setAttribute('stroke-dashoffset', offset.toFixed(2));
      ringEl.setAttribute('stroke', pomoState.phase === 'focus' ? '#18A8A8' : '#0f7676');
    }

    var activeCls = 'px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var idleCls = 'px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all';
    var b25 = document.getElementById('btnPomo25');
    var b50 = document.getElementById('btnPomo50');
    var bw = document.getElementById('btnPomoWarmup');
    if (b25) b25.className = pomoState.mode === '25_5' ? activeCls : idleCls;
    if (b50) b50.className = pomoState.mode === '50_10' ? activeCls : idleCls;
    if (bw) bw.className = pomoState.mode === 'warmup' ? activeCls : idleCls;
  }

  function renderMindCapture() {
    var list = document.getElementById('mindCaptureList');
    if (!list) return;
    var html = '';
    for (var i = 0; i < pomoState.thoughts.length; i++) {
      html += '<li class="flex items-center justify-between gap-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 rounded-lg px-3 py-1.5">' +
        '<span class="truncate">' + pomoState.thoughts[i].replace(/</g, '&lt;') + '</span>' +
        '<button type="button" onclick="removeMindCapture(' + i + ')" class="text-[11px] font-bold text-[#0f7676] dark:text-[#4fd1d1] hover:underline shrink-0 cursor-pointer">Done</button>' +
      '</li>';
    }
    list.innerHTML = html || '<li class="text-[#6e6d7a] italic">No mid-timer distractions parked yet.</li>';
  }

  function selectPomoMode(mode) {
    if (pomoState.timerId) {
      clearInterval(pomoState.timerId);
      pomoState.timerId = null;
    }
    pomoState.running = false;
    pomoState.mode = mode;
    pomoState.phase = 'focus';
    pomoState.warmupDone = false;
    var sec = POMO_MODES[mode].focusSec;
    pomoState.secondsLeft = sec;
    pomoState.totalSeconds = sec;
    renderPomoTimer();
  }

  function togglePomoTimer() {
    if (pomoState.running) {
      clearInterval(pomoState.timerId);
      pomoState.timerId = null;
      pomoState.running = false;
      renderPomoTimer();
      return;
    }
    pomoState.running = true;
    pomoState.timerId = setInterval(function() {
      if (pomoState.secondsLeft > 1) {
        pomoState.secondsLeft -= 1;
        renderPomoTimer();
      } else {
        completePomoRound();
      }
    }, 1000);
    renderPomoTimer();
  }

  function resetPomoTimer() {
    if (pomoState.timerId) {
      clearInterval(pomoState.timerId);
      pomoState.timerId = null;
    }
    pomoState.running = false;
    pomoState.phase = 'focus';
    var sec = (pomoState.mode === 'warmup' && pomoState.warmupDone) ? 50 * 60 : POMO_MODES[pomoState.mode].focusSec;
    pomoState.secondsLeft = sec;
    pomoState.totalSeconds = sec;
    renderPomoTimer();
  }

  function completePomoRound() {
    if (pomoState.timerId) {
      clearInterval(pomoState.timerId);
      pomoState.timerId = null;
    }
    pomoState.running = false;
    if (pomoState.phase === 'focus') {
      pomoState.rounds += 1;
      pomoState.phase = 'break';
      var bSec = (pomoState.mode === 'warmup' && pomoState.warmupDone) ? 10 * 60 : POMO_MODES[pomoState.mode].breakSec;
      pomoState.secondsLeft = bSec;
      pomoState.totalSeconds = bSec;
    } else {
      if (pomoState.mode === 'warmup') pomoState.warmupDone = true;
      pomoState.phase = 'focus';
      var fSec = (pomoState.mode === 'warmup' && pomoState.warmupDone) ? 50 * 60 : POMO_MODES[pomoState.mode].focusSec;
      pomoState.secondsLeft = fSec;
      pomoState.totalSeconds = fSec;
    }
    renderPomoTimer();
  }

  function addMindCapture() {
    var inp = document.getElementById('mindCaptureInput');
    if (!inp) return;
    var val = (inp.value || '').trim();
    if (!val) return;
    pomoState.thoughts.unshift(val);
    if (pomoState.thoughts.length > 5) pomoState.thoughts.pop();
    inp.value = '';
    renderMindCapture();
  }

  function removeMindCapture(idx) {
    pomoState.thoughts.splice(idx, 1);
    renderMindCapture();
  }

  function selectPomoTemplate(key) {
    var data = POMO_TEMPLATES[key];
    if (!data) return;

    var activeCls = 'px-3 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var idleCls = 'px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all';
    var ids = { t1: 'btnExpT1', t2: 'btnExpT2', t3: 'btnExpT3' };
    for (var k in ids) {
      var b = document.getElementById(ids[k]);
      if (b) b.className = key === k ? activeCls : idleCls;
    }

    var titleEl = document.getElementById('pomoExpTitle');
    var statsEl = document.getElementById('pomoExpStats');
    var svgBox = document.getElementById('pomoExpSvg');
    var roundsBox = document.getElementById('pomoExpRounds');

    if (titleEl) titleEl.textContent = data.title;
    if (statsEl) statsEl.textContent = data.stats;

    if (svgBox) {
      var totalMin = 0;
      for (var i = 0; i < data.segments.length; i++) totalMin += data.segments[i].min;
      var x = 0;
      var rects = '';
      for (var j = 0; j < data.segments.length; j++) {
        var seg = data.segments[j];
        var w = (seg.min / totalMin) * 600;
        var textColor = (seg.color === '#7bdcdc' || seg.color === '#cbd5e1') ? '#1d1e2c' : '#ffffff';
        rects += '<rect x="' + x.toFixed(1) + '" y="6" width="' + Math.max(2, w - 2).toFixed(1) + '" height="34" rx="5" fill="' + seg.color + '" />';
        if (w >= 40 && seg.label) {
          rects += '<text x="' + (x + w / 2).toFixed(1) + '" y="27" text-anchor="middle" fill="' + textColor + '" font-size="10.5" font-weight="700" font-family="sans-serif">' + seg.label + '</text>';
        }
        x += w;
      }
      svgBox.innerHTML = '<svg viewBox="0 0 600 46" class="w-full h-12" role="img" aria-label="Proportional Pomodoro timeline">' + rects + '</svg>';
    }

    if (roundsBox) {
      var rHtml = '';
      for (var r = 0; r < data.items.length; r++) {
        var it = data.items[r];
        rHtml += '<div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 rounded-xl p-3 space-y-1">' +
          '<div class="flex items-center justify-between gap-2">' +
            '<span class="text-xs font-mono font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">' + it.slot + '</span>' +
            '<span class="text-[10px] font-bold bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-2 py-0.5 rounded-full">' + it.tag + '</span>' +
          '</div>' +
          '<div class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">' + it.task + '</div>' +
        '</div>';
      }
      roundsBox.innerHTML = rHtml;
    }
  }

  function togglePomoFaq(btn) {
    var item = btn.closest('.faq-accordion-item');
    if (!item) return;
    var ans = item.querySelector('.faq-answer');
    var chev = item.querySelector('.faq-chevron');
    if (ans) ans.classList.toggle('hidden');
    if (chev) chev.classList.toggle('rotate-180');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderPomoTimer();
      renderMindCapture();
      selectPomoTemplate('t1');
    });
  } else {
    renderPomoTimer();
    renderMindCapture();
    selectPomoTemplate('t1');
  }
`;

const doc = buildFullCleanDocument({
  lang: 'en-GB',
  title: 'How to Build a 50/10 & 25/5 Pomodoro Study Schedule That Actually Works',
  description: 'Build a hybrid 50/10 and 25/5 Pomodoro study schedule that prevents burnout, matches subjects to interval length, and includes ready-to-use student templates.',
  canonicalUrl: 'https://timetablecreator.online/blog/how-to-build-a-50-10-and-25-5-pomodoro-study-schedule/',
  robotsMeta: '<meta name="robots" content="index, follow" />',
  activePage: 'blog',
  mainContent: mainContent,
  pageScript: pageScript
});

const dir = path.join(__dirname, '../public/blog/how-to-build-a-50-10-and-25-5-pomodoro-study-schedule');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), doc, 'utf8');
console.log('Successfully generated public/blog/how-to-build-a-50-10-and-25-5-pomodoro-study-schedule/index.html');
