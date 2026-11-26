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
              <span class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold truncate max-w-[240px] sm:max-w-md">Best Study Timetable for Board Exam Students</span>
            </nav>

            <header class="space-y-4 border-b border-[#ebe8fa] dark:border-[#2f2b54] pb-8">
              <div class="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider">
                <span class="bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-3 py-1 rounded-full uppercase tracking-wider">Board Exam Guide</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• By <strong class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold">Prof. Sarah Lin</strong></span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• Last Updated: November 25, 2026</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• 12 Min Read</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1d1e2c] dark:text-[#f5f4fc] tracking-tight leading-tight mb-4 break-words">
                Best Study Timetable for Board Exam Students (6-Hour &amp; 10-Hour Plans)
              </h1>

              <!-- No-Text Hero Infographic placed right before the first paragraph -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/board-exam-timetable-hero.jpg" alt="Board exam students organizing focused 6-hour and 10-hour study timetables with protected sleep" class="w-full h-auto object-cover rounded-2xl" loading="lazy" referrerpolicy="no-referrer" />
              </figure>

              <p class="text-base text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">
                A <strong>Best Study Timetable for Board Exam Students</strong> built with a smart <a href="/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">timetable maker</a> is the difference between average marks and 95+ in CBSE, ICSE, or state board exams. Most students fail board exams not because of low intelligence, but because they follow a one-size-fits-all timetable that ignores their energy levels and daily life.
              </p>
              <p class="text-base text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">
                The best solution is having <strong>two realistic plans</strong> — the 6-Hour Plan for normal school and coaching days, and the 10-Hour Plan for holidays, study leaves, and the final countdown. Both plans are designed to protect sleep, prevent burnout, and deliver maximum retention.
              </p>
            </header>

            <!-- Table of Contents -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#18A8A8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10"></path></svg>
                <h2 class="text-base font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Table of Contents</h2>
              </div>
              <ul class="space-y-2 text-sm text-[#6e6d7a] dark:text-[#a3a0c2] font-medium">
                <li><a href="#sec-1" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">1. Introduction: Why One Single Timetable Cannot Carry You Through Board Exams</a></li>
                <li><a href="#sec-2" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">2. 6-Hour vs. 10-Hour Study Plan: Which One Should You Choose Right Now?</a></li>
                <li><a href="#sec-3" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">3. The 6-Hour Board Exam Study Timetable (School &amp; Tuition Day Blueprint)</a></li>
                <li><a href="#sec-4" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">4. The 10-Hour Board Exam Study Timetable (Preparatory Leave &amp; Holiday Master Plan)</a></li>
                <li><a href="#sec-5" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">5. Content Gap: Customizing Your Timetable by Class and Stream</a></li>
                <li><a href="#sec-6" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">6. Strategic Gap: How Your 6-Hour &amp; 10-Hour Slots Evolve Across the Year</a></li>
                <li><a href="#sec-7" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">7. Behavioral Gap: Rules to Survive a 10-Hour Study Routine Without Burnout</a></li>
                <li><a href="#sec-8" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">8. Frequently Asked Questions (FAQs) About Board Exam Study Timetables</a></li>
                <li><a href="#sec-9" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">9. Conclusion: Adapting Your Schedule Weekly for Maximum Board Marks</a></li>
              </ul>
            </div>

            <!-- SECTION 1 -->
            <section id="sec-1" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">1. Introduction: Why One Single Timetable Cannot Carry You Through Board Exams</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">One fixed timetable cannot work when your energy changes every day. What works on a normal school day fails during study leaves or when you are completely exhausted. A good <strong>Best Study Timetable for Board Exam Students</strong> must be flexible — it must switch between lighter and heavier versions without causing stress.</p>
            </section>

            <!-- SECTION 2 -->
            <section id="sec-2" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">2. 6-Hour vs. 10-Hour Study Plan: Which One Should You Choose Right Now?</h2>

              <!-- Infographic 2: 6-Hour vs 10-Hour Board Exam Plan -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/board-exam-6h-vs-10h.jpg" alt="Comparison Infographic: 6-Hour School Day Study Plan vs 10-Hour Study Leave Board Exam Plan" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 1:</strong> Choosing between the 6-Hour School Day Blueprint and the 10-Hour Preparatory Leave Master Plan.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">When to Use the 6-Hour Plan (Regular School Days &amp; Coaching Schedules)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use the 6-Hour Plan on normal school days, after school coaching, and on days when you have assignments. It prevents burnout and keeps your routine sustainable for the entire board exam period.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">When to Switch to the 10-Hour Plan (Study Leaves, Holidays &amp; Final Countdown)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use the 10-Hour Plan during summer break, winter break, and the last 30–45 days before boards. This extra time is essential for thorough practice and error analysis when you have the most energy and motivation.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Why Quality of Focus Beats Raw Hour Counting (Avoiding Passive Reading Traps)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">10 hours of passive re-reading is worse than 6 hours of active recall. The 6-Hour Plan protects sleep and prevents exhaustion, while the 10-Hour Plan uses deep focus blocks and timed practice.</p>
            </section>

            <!-- SECTION 3 -->
            <section id="sec-3" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">3. The 6-Hour Board Exam Study Timetable (School &amp; Tuition Day Blueprint)</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">This is the perfect daily routine for normal school and coaching days.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Morning Activation Slot (1.5 Hours): High-Retention Theory &amp; Formula Recall</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start with 90 minutes of theory-heavy work: memorising formulas, concepts, and NCERT lines. Use active recall (test yourself immediately after reading).</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Afternoon Post-School Reset: Decompression, Nutrition, and Homework Clearing</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">After school, eat lunch, take a 20-minute power nap, and clear any pending homework. This resets your brain before the main study block.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Evening Deep Focus Slot (2.5 Hours): Core Numericals &amp; Concept Mastery</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Protect this block as your highest energy window for difficult subjects (Mathematics, Physics, Chemistry). Solve 30–40 problems with proper explanation.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Night Consolidation Slot (2 Hours): NCERT/Textbook Line-by-Line Revision &amp; PYQs</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use this time for line-by-line revision and previous year questions. This is the most effective way to retain everything studied during the day.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Early Bird vs. Night Owl Adjustments for the 6-Hour Routine</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Morning students: shift blocks earlier. Night students: move the deep focus block to 8–10:30 PM. Both groups must protect 7.5 hours of sleep.</p>
            </section>

            <!-- SECTION 4 -->
            <section id="sec-4" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">4. The 10-Hour Board Exam Study Timetable (Preparatory Leave &amp; Holiday Master Plan)</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">This is the ultimate exam preparation blueprint for serious students.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Block 1 (3 Hours – Morning): Tough Subject Deep Dive &amp; Concept Building</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start with the weakest or most important chapter. Spend time on derivations, proofs, and deep concept building.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Block 2 (3 Hours – Mid-Day): Timed 3-Hour Sample Paper Simulation (10:30 AM – 1:30 PM)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Solve a complete sample paper under timed conditions. This trains your brain exactly like the board exam.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Post-Lunch Recovery Protocol: Managing the Afternoon Energy Dip Without Losing Momentum</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">After 1:30 PM, take a short 20-minute break, eat light food, and then continue with lighter revision (diagrams, maps, or short notes).</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Block 3 (2 Hours – Evening): Mock Paper Error Analysis &amp; Weak Chapter Fixing</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Review every mistake from the sample paper. Mark weak areas and focus on them heavily.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Block 4 (2 Hours – Night): Light Revision, Diagrams, Maps, and Language Prep</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use this block for revision of diagrams, maps, and language subjects. Keep it light but consistent.</p>

              <!-- Interactive Element 1: 6-Hour vs 10-Hour & Chronotype Timetable Simulator -->
              <div id="boardPlanSimulator" class="tc-surface-panel my-8 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Interactive Schedule Simulator
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6-Hour vs. 10-Hour &amp; Chronotype Timetable Builder</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Switch between school-day and study-leave plans, then toggle Early Bird or Night Owl timing.</p>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl px-4 py-2.5 text-left sm:text-right shrink-0">
                    <div class="text-[10px] font-bold text-[#6e6d7a] dark:text-[#a3a0c2] uppercase tracking-wider">Study / Sleep Target</div>
                    <div id="simSummaryBadge" class="text-lg font-black text-[#0f7676] dark:text-[#4fd1d1]">6.0h Focus • 7.5h Sleep</div>
                  </div>
                </div>

                <!-- Controls -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-3 space-y-2">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">1. Select Study Mode</div>
                    <div class="grid grid-cols-2 gap-2">
                      <button type="button" id="btnPlan6h" onclick="setBoardSimPlan('6h')" class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#18A8A8] text-white shadow-xs cursor-pointer">6-Hour School Day</button>
                      <button type="button" id="btnPlan10h" onclick="setBoardSimPlan('10h')" class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#f0fbfb] dark:bg-[#232140] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer">10-Hour Study Leave</button>
                    </div>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-3 space-y-2">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">2. Choose Energy Chronotype</div>
                    <div class="grid grid-cols-2 gap-2">
                      <button type="button" id="btnChronoEarly" onclick="setBoardSimChrono('early')" class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#18A8A8] text-white shadow-xs cursor-pointer">Early Bird</button>
                      <button type="button" id="btnChronoNight" onclick="setBoardSimChrono('night')" class="px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#f0fbfb] dark:bg-[#232140] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer">Night Owl</button>
                    </div>
                  </div>
                </div>

                <!-- Dynamic 24-Hour Proportional SVG Timeline -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-3">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <span id="simTimelineHeading" class="text-xs font-bold text-[#1d1e2c] dark:text-[#f5f4fc] uppercase tracking-wider">24-Hour Day Allocation (6-Hour Early Bird)</span>
                    <div class="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#6e6d7a] dark:text-[#a3a0c2]">
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#18A8A8] inline-block"></span> Deep Study</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#0f7676] inline-block"></span> School / Exam Mock</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#7bdcdc] inline-block"></span> Reset / Recovery</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#1d1e2c] dark:bg-[#475569] inline-block"></span> Protected Sleep (7.5h)</span>
                    </div>
                  </div>
                  <div id="simSvgContainer" class="w-full overflow-hidden"></div>
                </div>

                <!-- Dynamic Time-Slot Cards -->
                <div id="simSlotsGrid" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
              </div>
            </section>

            <!-- SECTION 5 -->
            <section id="sec-5" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">5. Content Gap: Customizing Your Timetable by Class and Stream</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Class 10 Board Blueprint: Balancing Math, Science, SST, and Languages</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Divide your 6 or 10 hours as follows:</p>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Mathematics: 2.5 hours</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Science: 2.5 hours</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>SST + Languages: 1 hour each</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Daily PYQ practice slot</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Class 12 Science (PCM/PCB) Adjustments: Splitting Lab Prep, Derivations, and Numericals</h3>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>PCM: More time on derivations and numericals</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>PCB: More time on practicals and diagrams</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Always keep a dedicated 45-minute slot for lab practicals</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Class 12 Commerce &amp; Humanities Adjustments: Case Studies, Accountancy Practice, and Answer Writing</h3>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Accountancy: Daily case study + practical</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Business Studies: Answer writing practice</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Economics &amp; History: Short notes + previous year questions</span></li>
              </ul>
            </section>

            <!-- SECTION 6 -->
            <section id="sec-6" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6. Strategic Gap: How Your 6-Hour &amp; 10-Hour Slots Evolve Across the Year</h2>

              <!-- Infographic 3: 3-Phase Board Exam Evolution -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/board-exam-3-phases.jpg" alt="3-Phase Board Exam Timetable Evolution Infographic: Syllabus, Pre-Boards, and Final 30 Days" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 2:</strong> How your study split shifts from Phase 1 Syllabus (70/30) to Phase 2 Pre-Boards and Phase 3 Final 30 Days.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Phase 1 (Syllabus Completion): The 70% New Concepts / 30% Practice Split</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Focus 70% on new topics and 30% on revision.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Phase 2 (Pre-Board Season): Shifting to Chapter-Wise PYQs and Short Notes</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start chapter-wise PYQ practice and create short notes for quick revision.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Phase 3 (Final 30 Days): Full-Syllabus Mocks, Mistake Logs, and Formula Sheets</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Solve full syllabus mocks daily, maintain a mistake log, and carry formula sheets everywhere.</p>

              <!-- Interactive Element 2: Board Exam Stream & Phase Subject-Hour Allocator -->
              <div id="streamPhaseCalculator" class="tc-surface-panel my-8 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                      Stream &amp; Phase Customizer
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Subject-Hour &amp; Exam-Phase Split Calculator</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Select your board class/stream and current preparation phase to compute exact subject minutes and task mix.</p>
                  </div>
                  <div class="flex items-center gap-1.5 bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl p-1 shrink-0">
                    <button type="button" id="btnCalc6h" onclick="setStreamCalcHours(6)" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">6 Hrs</button>
                    <button type="button" id="btnCalc10h" onclick="setStreamCalcHours(10)" class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">10 Hrs</button>
                  </div>
                </div>

                <!-- Stream Buttons -->
                <div class="space-y-2">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Class &amp; Stream</div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button type="button" id="btnStreamC10" onclick="setStreamCalc('c10')" class="px-3 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Class 10 Boards</button>
                    <button type="button" id="btnStreamPCM" onclick="setStreamCalc('pcm')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Class 12 PCM</button>
                    <button type="button" id="btnStreamPCB" onclick="setStreamCalc('pcb')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Class 12 PCB</button>
                    <button type="button" id="btnStreamComm" onclick="setStreamCalc('comm')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">12 Commerce / Hum.</button>
                  </div>
                </div>

                <!-- Phase Buttons -->
                <div class="space-y-2">
                  <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Preparation Phase</div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button type="button" id="btnPhase1" onclick="setPhaseCalc('p1')" class="px-3 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Phase 1: Syllabus (70/30)</button>
                    <button type="button" id="btnPhase2" onclick="setPhaseCalc('p2')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Phase 2: Pre-Boards (PYQs)</button>
                    <button type="button" id="btnPhase3" onclick="setPhaseCalc('p3')" class="px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Phase 3: Final 30 Days</button>
                  </div>
                </div>

                <!-- Dynamic Allocation Output -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 space-y-4">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div id="calcHeadline" class="text-sm sm:text-base font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Class 10 Boards — Phase 1 (6.0 hrs/day)</div>
                    <div id="calcRatioPill" class="text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 px-3 py-1 rounded-full w-fit">70% New Concepts • 30% Practice</div>
                  </div>
                  <div id="calcSubjectBars" class="space-y-3"></div>
                  <div id="calcPhaseTip" class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border-l-4 border-[#18A8A8] rounded-r-xl p-3.5 text-xs sm:text-sm text-[#3c3d4e] dark:text-[#c7c5df]"></div>
                </div>
              </div>
            </section>

            <!-- SECTION 7 -->
            <section id="sec-7" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">7. Behavioral Gap: Rules to Survive a 10-Hour Study Routine Without Burnout</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 50/10 Pomodoro Cycle vs. 90-Minute Ultradian Focus Blocks</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Use 90-minute focus blocks with 10-minute breaks. Avoid 50-minute Pomodoros during long revision sessions.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Designing a Distraction-Proof Study Desk and Strict Phone Boundaries</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Keep your desk completely clean. Use phone apps like Forest or Freedom to block social media during study hours.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Protecting Your 7.5 Hours of Sleep for Memory Consolidation</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">No board exam is worth missing 7.5 hours of sleep. This is the single most important rule for long-term success.</p>
            </section>

            <!-- SECTION 8 -->
            <section id="sec-8" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">8. Frequently Asked Questions (FAQs) About Board Exam Study Timetables</h2>
              <div class="space-y-3">
                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleBoardFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Which plan is better for Class 10?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">The 6-Hour Plan is safer and more sustainable for Class 10. The 10-Hour Plan is for serious Class 12 students.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleBoardFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can I follow both plans in the same week?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes. Use 6-Hour Plan on normal school days and switch to 10-Hour Plan during holidays.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleBoardFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">How much sleep do I need?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Minimum 7.5 hours. Anything less will affect your memory and concentration during boards.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleBoardFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">What if I am very tired during the evening slot?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Move the entire evening block earlier or reduce it to 1.5 hours. Consistency matters more than perfect timing.</p>
                </div>
              </div>
            </section>

            <!-- SECTION 9 -->
            <section id="sec-9" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">9. Conclusion: Adapting Your Schedule Weekly for Maximum Board Marks</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">The <strong>Best Study Timetable for Board Exam Students</strong> is not a rigid plan — it is a flexible system that adapts every week. Choose between the 6-Hour and 10-Hour plans based on your energy and exam phase, protect your sleep, and review your schedule every Sunday.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Thousands of students have scored 95+ and 98+ by following this science-backed approach instead of burning out with one fixed timetable. Your board exam journey can be smooth, effective, and stress-free — start today with the right plan.</p>
            </section>

            <!-- SOURCES -->
            <section id="sec-sources" class="space-y-3 pt-2">
              <h2 class="text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Sources</h2>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>CBSE Official Board Exam Guidelines (cbse.gov.in)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>NCERT Textbook &amp; Previous Year Question Papers (ncert.nic.in)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Productivity Science – “Atomic Habits” by James Clear</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Notion Templates for Students (notion.so/templates)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Anki Spaced Repetition Official Guide (apps.ankiweb.net)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Google Calendar &amp; Study Planner Templates (support.google.com/calendar)</span></li>
              </ul>
            </section>

            <!-- Call to Action Box (Links ONLY to Study Timetable Tool) -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-6 text-center space-y-3">
              <div class="text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Build Your 6-Hour or 10-Hour Board Exam Timetable</div>
              <p class="text-sm text-[#6e6d7a] dark:text-[#a3a0c2]">Generate your custom CBSE, ICSE, or Class 12 weekly study timetable in minutes with protected breaks and sleep blocks.</p>
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
  var boardSimState = { plan: '6h', chrono: 'early' };
  var streamCalcState = { stream: 'c10', phase: 'p1', hours: 6 };

  var BOARD_SCHEDULES = {
    '6h_early': {
      title: '24-Hour Day Allocation (6-Hour Early Bird)',
      badge: '6.0h Focus • 7.5h Sleep',
      segments: [
        { hrs: 1.5, color: '#18A8A8', label: '1.5h' },
        { hrs: 7.0, color: '#0f7676', label: '7h School' },
        { hrs: 1.5, color: '#7bdcdc', label: 'Reset' },
        { hrs: 2.5, color: '#18A8A8', label: '2.5h' },
        { hrs: 2.0, color: '#148888', label: '2.0h' },
        { hrs: 2.0, color: '#cbd5e1', label: 'Meals' },
        { hrs: 7.5, color: '#1d1e2c', label: '7.5h Sleep' }
      ],
      slots: [
        { time: '5:30 – 7:00 AM', duration: '1.5 Hours', name: 'Morning Activation Slot', focus: 'Theory, formulas, NCERT line recall + self-quiz' },
        { time: '2:00 – 3:30 PM', duration: 'Reset', name: 'Post-School Reset', focus: 'Lunch, 20-min power nap, clear pending homework' },
        { time: '4:30 – 7:00 PM', duration: '2.5 Hours', name: 'Evening Deep Focus Slot', focus: '30–40 core numericals in Math, Physics, or Chemistry' },
        { time: '8:00 – 10:00 PM', duration: '2.0 Hours', name: 'Night Consolidation Slot', focus: 'Line-by-line NCERT revision & Previous Year Questions' }
      ]
    },
    '6h_night': {
      title: '24-Hour Day Allocation (6-Hour Night Owl)',
      badge: '6.0h Focus • 7.5h Sleep',
      segments: [
        { hrs: 1.5, color: '#18A8A8', label: '1.5h' },
        { hrs: 7.0, color: '#0f7676', label: '7h School' },
        { hrs: 2.5, color: '#7bdcdc', label: 'Reset' },
        { hrs: 2.5, color: '#18A8A8', label: '2.5h' },
        { hrs: 2.0, color: '#148888', label: '2.0h' },
        { hrs: 1.0, color: '#cbd5e1', label: 'Meals' },
        { hrs: 7.5, color: '#1d1e2c', label: '7.5h Sleep' }
      ],
      slots: [
        { time: '6:30 – 8:00 AM', duration: '1.5 Hours', name: 'Morning Activation Slot', focus: 'High-retention theory & formula flashcards before school' },
        { time: '2:30 – 4:30 PM', duration: 'Reset', name: 'Afternoon Post-School Reset', focus: 'Lunch, 20-min nap, school homework completion' },
        { time: '5:30 – 7:30 PM', duration: '2.0 Hours', name: 'Consolidation Slot', focus: 'NCERT textbook line-by-line reading & PYQ checks' },
        { time: '8:00 – 10:30 PM', duration: '2.5 Hours', name: 'Peak Night Deep Focus', focus: 'Shifted high-energy numericals & problem mastery' }
      ]
    },
    '10h_early': {
      title: '24-Hour Day Allocation (10-Hour Early Bird)',
      badge: '10.0h Focus • 7.5h Sleep',
      segments: [
        { hrs: 3.0, color: '#18A8A8', label: '3.0h' },
        { hrs: 3.0, color: '#0f7676', label: '3.0h Mock' },
        { hrs: 2.5, color: '#7bdcdc', label: 'Lunch/Nap' },
        { hrs: 2.0, color: '#18A8A8', label: '2.0h' },
        { hrs: 2.0, color: '#148888', label: '2.0h' },
        { hrs: 4.0, color: '#cbd5e1', label: 'Routine' },
        { hrs: 7.5, color: '#1d1e2c', label: '7.5h Sleep' }
      ],
      slots: [
        { time: '6:30 – 9:30 AM', duration: '3.0 Hours', name: 'Block 1: Tough Subject Deep Dive', focus: 'Weakest chapters, derivations & core concept building' },
        { time: '10:30 AM – 1:30 PM', duration: '3.0 Hours', name: 'Block 2: Timed Sample Paper', focus: 'Full 3-hour board exam simulation in exam hours' },
        { time: '4:00 – 6:00 PM', duration: '2.0 Hours', name: 'Block 3: Mock Error Analysis', focus: 'Audit every sample paper mistake & fix weak chapters' },
        { time: '7:30 – 9:30 PM', duration: '2.0 Hours', name: 'Block 4: Light Night Revision', focus: 'Diagrams, maps, short notes & language prep' }
      ]
    },
    '10h_night': {
      title: '24-Hour Day Allocation (10-Hour Night Owl)',
      badge: '10.0h Focus • 7.5h Sleep',
      segments: [
        { hrs: 3.0, color: '#0f7676', label: '3.0h Mock' },
        { hrs: 2.5, color: '#7bdcdc', label: 'Lunch/Nap' },
        { hrs: 3.0, color: '#18A8A8', label: '3.0h' },
        { hrs: 2.0, color: '#18A8A8', label: '2.0h' },
        { hrs: 2.0, color: '#148888', label: '2.0h' },
        { hrs: 4.0, color: '#cbd5e1', label: 'Routine' },
        { hrs: 7.5, color: '#1d1e2c', label: '7.5h Sleep' }
      ],
      slots: [
        { time: '10:30 AM – 1:30 PM', duration: '3.0 Hours', name: 'Block 2: Official Exam Mock', focus: 'Keep 10:30 AM – 1:30 PM timed paper fixed to match boards' },
        { time: '2:30 – 5:30 PM', duration: '3.0 Hours', name: 'Block 1: Deep Concept Dive', focus: 'High-weightage derivations & complex chapters after lunch reset' },
        { time: '7:00 – 9:00 PM', duration: '2.0 Hours', name: 'Block 3: Error Analysis', focus: 'Fix morning mock paper mistakes & mark weak concepts' },
        { time: '9:30 – 11:30 PM', duration: '2.0 Hours', name: 'Block 4: Late Consolidation', focus: 'Diagrams, maps, language answers & 7.5h sleep by 11:45 PM' }
      ]
    }
  };

  var STREAM_DATA = {
    c10: {
      name: 'Class 10 Boards',
      subjects: [
        { label: 'Mathematics', ratio: 0.36, detail: '30–40 core numericals + NCERT exemplar' },
        { label: 'Science (Phy/Chem/Bio)', ratio: 0.36, detail: 'Line-by-line NCERT + diagrams' },
        { label: 'SST & Languages', ratio: 0.16, detail: 'Maps, dates & structured answers' },
        { label: 'Daily PYQ Practice', ratio: 0.12, detail: 'Timed previous year questions' }
      ]
    },
    pcm: {
      name: 'Class 12 PCM',
      subjects: [
        { label: 'Physics (Derivations & Numericals)', ratio: 0.34, detail: 'Proofs + numerical problem sets' },
        { label: 'Mathematics', ratio: 0.34, detail: 'Calculus, vectors & timed practice' },
        { label: 'Chemistry + English', ratio: 0.20, detail: 'NCERT reactions + language prep' },
        { label: 'Lab Practicals & PYQs', ratio: 0.12, detail: 'Dedicated 45-min practical slot' }
      ]
    },
    pcb: {
      name: 'Class 12 PCB',
      subjects: [
        { label: 'Biology (Diagrams & NCERT)', ratio: 0.36, detail: 'Line-by-line NCERT + labeled diagrams' },
        { label: 'Chemistry', ratio: 0.28, detail: 'Organic mechanisms & numericals' },
        { label: 'Physics + English', ratio: 0.24, detail: 'Core derivations & language writing' },
        { label: 'Lab Practicals Slot', ratio: 0.12, detail: 'Dedicated 45-min practical & viva prep' }
      ]
    },
    comm: {
      name: 'Class 12 Commerce / Humanities',
      subjects: [
        { label: 'Accountancy / Core Major', ratio: 0.36, detail: 'Daily case studies + practical ledgers' },
        { label: 'Business Studies / Pol. Sci.', ratio: 0.28, detail: 'Structured answer writing practice' },
        { label: 'Economics / History', ratio: 0.24, detail: 'Short notes + previous year questions' },
        { label: 'Languages & PYQ Drill', ratio: 0.12, detail: 'Timed format & comprehension drills' }
      ]
    }
  };

  var PHASE_DATA = {
    p1: {
      pill: '70% New Concepts • 30% Practice',
      tip: 'Phase 1 Focus: Spend 70% of each subject slot building clear concepts from NCERT and 30% solving end-of-chapter practice questions.'
    },
    p2: {
      pill: '40% Revision Notes • 60% Chapter PYQs',
      tip: 'Phase 2 Focus: Convert bulky chapters into 1-page short notes and drill chapter-wise Previous Year Questions under timed conditions.'
    },
    p3: {
      pill: '15% Formula Sheets • 85% Full Mocks & Mistake Logs',
      tip: 'Phase 3 Focus: Sit 10:30 AM – 1:30 PM full-syllabus mocks daily, audit your mistake log every evening, and revise pocket formula sheets.'
    }
  };

  function renderBoardSimulator() {
    var key = boardSimState.plan + '_' + boardSimState.chrono;
    var data = BOARD_SCHEDULES[key];
    if (!data) return;

    var badge = document.getElementById('simSummaryBadge');
    var heading = document.getElementById('simTimelineHeading');
    var svgBox = document.getElementById('simSvgContainer');
    var grid = document.getElementById('simSlotsGrid');

    if (badge) badge.textContent = data.badge;
    if (heading) heading.textContent = data.title;

    var btn6 = document.getElementById('btnPlan6h');
    var btn10 = document.getElementById('btnPlan10h');
    var btnEarly = document.getElementById('btnChronoEarly');
    var btnNight = document.getElementById('btnChronoNight');

    var activeCls = 'px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#18A8A8] text-white shadow-xs cursor-pointer';
    var idleCls = 'px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all bg-[#f0fbfb] dark:bg-[#232140] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer';

    if (btn6) btn6.className = boardSimState.plan === '6h' ? activeCls : idleCls;
    if (btn10) btn10.className = boardSimState.plan === '10h' ? activeCls : idleCls;
    if (btnEarly) btnEarly.className = boardSimState.chrono === 'early' ? activeCls : idleCls;
    if (btnNight) btnNight.className = boardSimState.chrono === 'night' ? activeCls : idleCls;

    if (svgBox) {
      var x = 0;
      var total = 24;
      var rects = '';
      for (var i = 0; i < data.segments.length; i++) {
        var seg = data.segments[i];
        var w = (seg.hrs / total) * 600;
        var textFill = (seg.color === '#7bdcdc' || seg.color === '#cbd5e1') ? '#1d1e2c' : '#ffffff';
        rects += '<rect x="' + x.toFixed(1) + '" y="6" width="' + Math.max(0, w - 2).toFixed(1) + '" height="34" rx="6" fill="' + seg.color + '" />';
        if (w >= 44) {
          rects += '<text x="' + (x + w / 2).toFixed(1) + '" y="27" text-anchor="middle" fill="' + textFill + '" font-size="10.5" font-weight="700" font-family="sans-serif">' + seg.label + '</text>';
        }
        x += w;
      }
      svgBox.innerHTML = '<svg viewBox="0 0 600 46" class="w-full h-12" role="img" aria-label="24-hour proportional study and sleep timeline">' + rects + '</svg>';
    }

    if (grid) {
      var html = '';
      for (var j = 0; j < data.slots.length; j++) {
        var s = data.slots[j];
        html += '<div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1.5">' +
          '<div class="flex items-center justify-between gap-2">' +
            '<span class="text-xs font-mono font-bold text-[#0f7676] dark:text-[#4fd1d1]">' + s.time + '</span>' +
            '<span class="text-[10px] font-bold uppercase tracking-wider bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-2 py-0.5 rounded-full">' + s.duration + '</span>' +
          '</div>' +
          '<div class="text-sm font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">' + s.name + '</div>' +
          '<p class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">' + s.focus + '</p>' +
        '</div>';
      }
      grid.innerHTML = html;
    }
  }

  function setBoardSimPlan(plan) {
    boardSimState.plan = plan;
    renderBoardSimulator();
  }

  function setBoardSimChrono(chrono) {
    boardSimState.chrono = chrono;
    renderBoardSimulator();
  }

  function formatHours(hrs) {
    var rounded = Math.round(hrs * 10) / 10;
    return rounded.toFixed(1) + ' hrs';
  }

  function renderStreamCalculator() {
    var sData = STREAM_DATA[streamCalcState.stream];
    var pData = PHASE_DATA[streamCalcState.phase];
    if (!sData || !pData) return;

    var btn6 = document.getElementById('btnCalc6h');
    var btn10 = document.getElementById('btnCalc10h');
    var hActive = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var hIdle = 'px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all';
    if (btn6) btn6.className = streamCalcState.hours === 6 ? hActive : hIdle;
    if (btn10) btn10.className = streamCalcState.hours === 10 ? hActive : hIdle;

    var sActive = 'px-3 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var sIdle = 'px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all';

    var streamIds = { c10: 'btnStreamC10', pcm: 'btnStreamPCM', pcb: 'btnStreamPCB', comm: 'btnStreamComm' };
    for (var k in streamIds) {
      var el = document.getElementById(streamIds[k]);
      if (el) el.className = streamCalcState.stream === k ? sActive : sIdle;
    }

    var phaseIds = { p1: 'btnPhase1', p2: 'btnPhase2', p3: 'btnPhase3' };
    for (var pk in phaseIds) {
      var pel = document.getElementById(phaseIds[pk]);
      if (pel) pel.className = streamCalcState.phase === pk ? sActive : sIdle;
    }

    var headline = document.getElementById('calcHeadline');
    var ratioPill = document.getElementById('calcRatioPill');
    var bars = document.getElementById('calcSubjectBars');
    var tip = document.getElementById('calcPhaseTip');

    var phaseName = streamCalcState.phase === 'p1' ? 'Phase 1' : (streamCalcState.phase === 'p2' ? 'Phase 2' : 'Phase 3');
    if (headline) headline.textContent = sData.name + ' — ' + phaseName + ' (' + streamCalcState.hours + '.0 hrs/day)';
    if (ratioPill) ratioPill.textContent = pData.pill;
    if (tip) tip.textContent = pData.tip;

    if (bars) {
      var html = '';
      for (var i = 0; i < sData.subjects.length; i++) {
        var sub = sData.subjects[i];
        var subHrs = streamCalcState.hours * sub.ratio;
        var pct = Math.round(sub.ratio * 100);
        html += '<div class="space-y-1">' +
          '<div class="flex items-center justify-between text-xs">' +
            '<span class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">' + sub.label + '</span>' +
            '<span class="font-mono font-bold text-[#0f7676] dark:text-[#4fd1d1]">' + formatHours(subHrs) + ' (' + pct + '%)</span>' +
          '</div>' +
          '<div class="w-full h-2.5 bg-[#f0fbfb] dark:bg-[#232140] rounded-full overflow-hidden border border-[#18A8A8]/20">' +
            '<div class="h-full bg-[#18A8A8] rounded-full transition-all duration-300" style="width:' + pct + '%"></div>' +
          '</div>' +
          '<div class="text-[11px] text-[#6e6d7a] dark:text-[#a3a0c2]">' + sub.detail + '</div>' +
        '</div>';
      }
      bars.innerHTML = html;
    }
  }

  function setStreamCalc(stream) {
    streamCalcState.stream = stream;
    renderStreamCalculator();
  }

  function setPhaseCalc(phase) {
    streamCalcState.phase = phase;
    renderStreamCalculator();
  }

  function setStreamCalcHours(hours) {
    streamCalcState.hours = hours;
    renderStreamCalculator();
  }

  function toggleBoardFaq(btn) {
    var item = btn.closest('.faq-accordion-item');
    if (!item) return;
    var ans = item.querySelector('.faq-answer');
    var chev = item.querySelector('.faq-chevron');
    if (ans) ans.classList.toggle('hidden');
    if (chev) chev.classList.toggle('rotate-180');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderBoardSimulator();
      renderStreamCalculator();
    });
  } else {
    renderBoardSimulator();
    renderStreamCalculator();
  }
`;

const doc = buildFullCleanDocument({
  lang: 'en-GB',
  title: 'Best Study Timetable for Board Exam Students (6-Hour & 10-Hour Plans)',
  description: 'Score 95+ in CBSE, ICSE, and state board exams with flexible 6-hour school day and 10-hour study leave timetables, stream splits, and protected 7.5-hour sleep.',
  canonicalUrl: 'https://timetablecreator.online/blog/best-study-timetable-for-board-exam-students/',
  robotsMeta: '<meta name="robots" content="index, follow" />',
  activePage: 'blog',
  mainContent: mainContent,
  pageScript: pageScript
});

const dir = path.join(__dirname, '../public/blog/best-study-timetable-for-board-exam-students');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), doc, 'utf8');
console.log('Successfully generated public/blog/best-study-timetable-for-board-exam-students/index.html');
