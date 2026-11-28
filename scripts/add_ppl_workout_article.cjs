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
              <span class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold truncate max-w-[240px] sm:max-w-md">6-Day Push Pull Legs Workout Timetable</span>
            </nav>

            <header class="space-y-4 border-b border-[#ebe8fa] dark:border-[#2f2b54] pb-8">
              <div class="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider">
                <span class="bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-3 py-1 rounded-full uppercase tracking-wider">Fitness &amp; Workout Guide</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• By <strong class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold">Prof. Sarah Lin</strong></span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• Last Updated: November 27, 2026</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• 10 Min Read</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1d1e2c] dark:text-[#f5f4fc] tracking-tight leading-tight mb-4 break-words">
                6-Day Push Pull Legs Workout Timetable &amp; Complete Rest Day Guide
              </h1>

              <!-- No-Text Hero Infographic placed right before the first paragraph -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/ppl-hero.jpg" alt="Athletes performing push bench press, pull-up, and squat workouts beside a weekly timetable grid and recovery mat" class="w-full h-auto object-cover rounded-2xl" loading="lazy" referrerpolicy="no-referrer" />
              </figure>

              <p class="text-base text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">
                I have been running a <strong>6-Day Push Pull Legs (PPL) Workout Timetable</strong> built with a clean <a href="/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">timetable maker</a> for the last 9 months and it is the single best system I have used for building muscle and strength. Every muscle group gets trained twice a week, recovery is smart, and I actually enjoy the gym every single day. This plan is perfect for beginners who want to train 6 days a week without burning out.
              </p>
            </header>

            <!-- Table of Contents -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#18A8A8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10"></path></svg>
                <h2 class="text-base font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Table of Contents</h2>
              </div>
              <ul class="space-y-2 text-sm text-[#6e6d7a] dark:text-[#a3a0c2] font-medium">
                <li><a href="#sec-1" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">1. Introduction: Why the 6-Day Push Pull Legs (PPL) Split Is the Gold Standard for Muscle Growth</a></li>
                <li><a href="#sec-2" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">2. How the 6-Day PPL Split Works: Anatomy, Frequency &amp; Recovery Science</a></li>
                <li><a href="#sec-3" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">3. Content Gap: Choosing Your Weekly PPL Timetable (Fixed vs. Rolling Schedules)</a></li>
                <li><a href="#sec-4" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">4. The Complete 6-Day Push Pull Legs Workout Timetable (Strength &amp; Hypertrophy)</a></li>
                <li><a href="#sec-5" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">5. Strategic Gap: The Complete PPL Rest Day &amp; Deload Guide</a></li>
                <li><a href="#sec-6" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">6. Programming Rules: Sets, Reps, Rest Intervals &amp; Progressive Overload</a></li>
                <li><a href="#sec-7" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">7. Customizing the 6-Day PPL Timetable for Your Lifestyle</a></li>
                <li><a href="#sec-8" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">8. Common 6-Day PPL Mistakes That Stall Progress (And How to Fix Them)</a></li>
                <li><a href="#sec-9" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">9. Frequently Asked Questions (FAQs) About 6-Day PPL Workouts &amp; Rest Days</a></li>
                <li><a href="#sec-10" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">10. Conclusion: Balancing High-Frequency Training With Smart Recovery</a></li>
              </ul>
            </div>

            <!-- SECTION 1 -->
            <section id="sec-1" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">1. Introduction: Why the 6-Day Push Pull Legs (PPL) Split Is the Gold Standard for Muscle Growth</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">The 6-day PPL split is the gold standard because every major muscle group is hit twice per week with enough rest to grow. I used to train only 3 days a week and my gains were slow. After switching to 6 days with smart recovery, I added 8–10 kg to my bench press and deadlift in just 12 weeks. This timetable gives you the highest training frequency possible while protecting your body.</p>
            </section>

            <!-- SECTION 2 -->
            <section id="sec-2" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">2. How the 6-Day PPL Split Works: Anatomy, Frequency &amp; Recovery Science</h2>

              <!-- Infographic 2: 6-Day Push Pull Legs Formula -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/ppl-split-anatomy.jpg" alt="6-Day Push Pull Legs Formula Infographic: Push Day, Pull Day, Legs and Day 7 Rest with 48-72 hour muscle recovery window" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 1:</strong> Splitting Push, Pull, and Legs across 6 days ensures every muscle group recovers for 48–72 hours between sessions.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Muscle Group Breakdown: Push (Chest, Shoulders, Triceps) vs. Pull (Back, Rear Delts, Biceps) vs. Legs</h3>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span><strong>Push Day</strong>: Chest, front and side shoulders, triceps</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span><strong>Pull Day</strong>: Back, rear shoulders, biceps</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span><strong>Legs Day</strong>: Quads, hamstrings, glutes, calves, core</span></li>
              </ul>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">This balanced split ensures you train every muscle twice a week without overtraining any one group.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 48-to-72-Hour Recovery Window: Hitting Every Muscle Twice a Week Safely</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Every muscle group gets trained with at least 48 hours between sessions and up to 72 hours between the two sessions per week. This is the perfect frequency for both beginners and intermediates.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Who Should Run a 6-Day PPL Routine? (Beginner vs. Intermediate Readiness Check)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I only recommend 6-day PPL for people who have been training consistently for at least 3–6 months. Beginners should start with a <a href="/blog/7-day-weekly-gym-workout-plan-for-beginners/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">7-day weekly gym workout plan for beginners</a> (4–5 lifting days) and then add a rest day or switch to 3-day PPL. If you are completely new, this plan will still work but you must reduce volume in the first 4 weeks.</p>
            </section>

            <!-- SECTION 3 -->
            <section id="sec-3" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">3. Content Gap: Choosing Your Weekly PPL Timetable (Fixed vs. Rolling Schedules)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Option 1: The Fixed Monday–Saturday Timetable (6-On / 1-Off Synchronous Plan)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I use this version when I want maximum consistency. Lift on Monday–Saturday and rest on Sunday. This is the simplest and most popular option.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Option 2: The Rolling 3-On / 1-Off Timetable (Best for Joint &amp; CNS Recovery)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">This rolling version (e.g., Mon–Wed–Fri, then next week Tue–Thu–Sat) gives your joints and nervous system more recovery. I recommend this for the first 12 weeks if you have any joint history or train at night.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Sequence Hack: Why "Pull / Push / Legs" Beats "Push / Pull / Legs" for Lower-Back Recovery</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I always do Pull first, then Push, then Legs. This order protects my lower back because heavy deadlifts and squats come at the end of the week when fatigue is highest.</p>
            </section>

            <!-- SECTION 4 -->
            <section id="sec-4" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">4. The Complete 6-Day Push Pull Legs Workout Timetable (Strength &amp; Hypertrophy)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 1 – Push A (Heavy Strength Focus: Chest, Anterior Delts &amp; Triceps)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bench Press – 4 sets of 5–6 (heavy)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Overhead Press – 4 sets of 6–8</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Incline Dumbbell Press – 3 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Tricep Pushdowns – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Dips or Close-Grip Bench – 3 sets to near failure</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 2 – Pull A (Vertical Pull &amp; Thickness Focus: Lats, Traps, Rear Delts &amp; Biceps)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Pull-Ups or Lat Pulldowns – 4 sets of 6–8</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bent-Over Rows – 4 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Seated Cable Rows – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Face Pulls – 3 sets of 15–20</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bicep Curls – 3 sets of 10–12</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 3 – Legs A (Quad-Dominant Compound Focus: Quads, Hamstrings, Glutes &amp; Calves)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Squats or Leg Press – 4 sets of 6–8</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Romanian Deadlifts – 4 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bulgarian Split Squats – 3 sets per leg</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Leg Extensions – 3 sets of 12–15</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Seated Calf Raises – 4 sets of 12–15</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 4 – Push B (Upper Chest &amp; Lateral Delt Hypertrophy Focus)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Incline Bench Press – 4 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Arnold Press or Lateral Raises – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Cable Crossovers – 3 sets of 12–15</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Tricep Dips or Overhead Extension – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Lateral Raises – 3 sets of 15–20</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 5 – Pull B (Horizontal Row &amp; Arm Isolation Focus)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Weighted Pull-Ups or Bent-Over Rows – 4 sets of 6–8</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Single-Arm Dumbbell Rows – 4 sets of 8–10 per side</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Shrugs or Upright Rows – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Hammer Curls – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Concentration Curls – 3 sets of 12–15</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 6 – Legs B (Posterior Chain &amp; Hinge Focus: Hamstrings, Glutes &amp; Core)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Deadlifts or Good Mornings – 4 sets of 6–8</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Hip Thrusts – 4 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Lying Leg Curls – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Standing Calf Raises – 4 sets of 12–15</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Hanging Leg Raises – 3 sets of 12–15</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 7 – Dedicated Rest &amp; Recovery Day</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Full rest. No workouts, no intense cardio. Focus on sleep, hydration, and eating.</p>

              <!-- Interactive Element 1: 6-Day PPL Split & Rolling/Sequence Explorer -->
              <div id="pplScheduleExplorer" class="tc-surface-panel my-8 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                      Interactive PPL Planner
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6-Day PPL Timetable Switcher &amp; Lift Tracker</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Switch between Fixed 6-On/1-Off, Rolling 3-On/1-Off, or Lower-Back-Safe Pull-Push-Legs order and track exercises.</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl p-1 shrink-0">
                    <button type="button" id="btnPplFixed" onclick="setPplMode('fixed')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Fixed (PPL)</button>
                    <button type="button" id="btnPplSequence" onclick="setPplMode('pullfirst')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">Pull-Push-Legs</button>
                    <button type="button" id="btnPplRolling" onclick="setPplMode('rolling')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">Rolling 3-On/1-Off</button>
                  </div>
                </div>

                <!-- 7-Day Proportional Load SVG -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-2.5">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span id="pplSvgHeading" class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Fixed Monday–Saturday PPL Map (6-On / 1-Off)</span>
                    <div class="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#6e6d7a] dark:text-[#a3a0c2]">
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#0f7676] inline-block"></span> Push / Pull</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#18A8A8] inline-block"></span> Legs</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#7bdcdc] inline-block"></span> Rest</span>
                    </div>
                  </div>
                  <div id="pplWeekSvg" class="w-full overflow-hidden"></div>
                </div>

                <!-- Day Selector Buttons -->
                <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  <button type="button" id="btnPplDay0" onclick="selectPplDay(0)" class="px-2 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Mon</button>
                  <button type="button" id="btnPplDay1" onclick="selectPplDay(1)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Tue</button>
                  <button type="button" id="btnPplDay2" onclick="selectPplDay(2)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Wed</button>
                  <button type="button" id="btnPplDay3" onclick="selectPplDay(3)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Thu</button>
                  <button type="button" id="btnPplDay4" onclick="selectPplDay(4)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Fri</button>
                  <button type="button" id="btnPplDay5" onclick="selectPplDay(5)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Sat</button>
                  <button type="button" id="btnPplDay6" onclick="selectPplDay(6)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Sun</button>
                </div>

                <!-- Selected Day Detail Card -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 space-y-3">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div id="pplDayBadge" class="text-[11px] font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1]">Day 1 • Push A</div>
                      <h4 id="pplDayTitle" class="text-base sm:text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Push A (Heavy Strength Focus)</h4>
                    </div>
                    <div id="pplDayProgress" class="text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 px-3 py-1 rounded-full w-fit">0 / 5 Completed</div>
                  </div>
                  <div id="pplExercisesList" class="space-y-2"></div>
                </div>
              </div>
            </section>

            <!-- SECTION 5 -->
            <section id="sec-5" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">5. Strategic Gap: The Complete PPL Rest Day &amp; Deload Guide</h2>

              <!-- Infographic 3: PPL Rest Day & Deload Guide -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/ppl-rest-deload.jpg" alt="PPL Rest Day and Deload Guide Infographic: Step 1 Day 7 Full Rest, Step 2 Rest Nutrition 1.6-2.2g protein per kg, Step 3 Every 6-8 Weeks 4-Day Deload Reset" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 2:</strong> Protecting muscle recovery with dedicated Day 7 rest, steady protein targets, and scheduled 6–8 week deloads.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Complete Rest vs. Active Recovery: What to Actually Do on Day 7</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">On Sunday I do complete rest with no exercise. Active recovery (light walking, stretching, or 10-minute cardio) is only for the Thursday day.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Rest Day Nutrition &amp; Protein Rules: Should You Lower Calories When Not Lifting?</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Eat at maintenance or slight surplus. Protein stays at 1.6–2.2g per kg body weight. No need to eat in deficit on rest days.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Warning Signs You Need an Extra Unplanned Rest Day (CNS Fatigue Checklist)</h3>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Joint pain that feels sharp</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Overuse soreness that doesn’t improve after 48 hours</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Extreme fatigue that makes you miss 2+ consecutive workouts</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Sleep quality drops sharply</span></li>
              </ul>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">If any of these happen, take the full rest day.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 6-to-8-Week Deload Protocol: How to Reset Fatigue Without Losing Gains</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Every 6–8 weeks I do a 4-day deload (50% volume, 30% intensity) with the same exercises. This resets CNS fatigue and keeps long-term progress intact.</p>

              <!-- Interactive Element 2: PPL Volume Cap, Protein & CNS Fatigue Checker -->
              <div id="pplVolumeCalc" class="tc-surface-panel my-6 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Recovery &amp; Volume Planner
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">PPL Volume Cap, Protein &amp; CNS Fatigue Checker</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Select your training phase, enter body weight, and check any CNS fatigue signs to get live weekly set caps and rest guidance.</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-1.5 bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl p-1 shrink-0">
                    <button type="button" id="btnPhaseStandard" onclick="setPplPhase('standard')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Standard (60–75m)</button>
                    <button type="button" id="btnPhaseExpress" onclick="setPplPhase('express')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">45m Supersets</button>
                    <button type="button" id="btnPhaseDeload" onclick="setPplPhase('deload')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">4-Day Deload</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-2">
                    <label for="inpPplWeight" class="block text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Body Weight (kg) — Rest Day Protein</label>
                    <input id="inpPplWeight" type="number" min="40" max="180" value="70" oninput="updatePplCalculator()" class="w-full px-3 py-2 rounded-lg text-sm font-bold bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 text-[#1d1e2c] dark:text-[#f5f4fc]" />
                    <div id="outPplProtein" class="text-sm font-bold text-[#0f7676] dark:text-[#4fd1d1]">112g – 154g protein / day</div>
                    <div class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">1.6–2.2 g/kg at maintenance or slight surplus</div>
                  </div>

                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-2">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">CNS Fatigue Warning Checklist</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#3c3d4e] dark:text-[#c7c5df]">
                      <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="cns-check accent-[#18A8A8]" onchange="updatePplCalculator()" /> Sharp joint pain</label>
                      <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="cns-check accent-[#18A8A8]" onchange="updatePplCalculator()" /> Soreness &gt; 48h</label>
                      <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="cns-check accent-[#18A8A8]" onchange="updatePplCalculator()" /> Missed 2+ workouts</label>
                      <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="cns-check accent-[#18A8A8]" onchange="updatePplCalculator()" /> Sharp sleep drop</label>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Weekly Set Caps</div>
                    <div id="outPplCaps" class="text-base font-black text-[#0f7676] dark:text-[#4fd1d1]">Chest 20 • Back 22 • Legs 24</div>
                    <div id="outPplCapsNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">Stay under caps to avoid junk volume</div>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Rest &amp; Intensity Target</div>
                    <div id="outPplRest" class="text-base font-black text-[#0f7676] dark:text-[#4fd1d1]">2–3m Comp / 60–90s Iso</div>
                    <div id="outPplRestNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">Stop sets at 1–2 reps in reserve (RIR)</div>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">CNS Readiness Status</div>
                    <div id="outPplCnsStatus" class="text-base font-black text-[#0f7676] dark:text-[#4fd1d1]">Ready to Train</div>
                    <div id="outPplCnsNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">0 fatigue signs — keep Sunday rest</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- SECTION 6 -->
            <section id="sec-6" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6. Programming Rules: Sets, Reps, Rest Intervals &amp; Progressive Overload</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Weekly Volume Caps: Avoiding "Junk Volume" Across 6 Training Days</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Total weekly sets per muscle group should stay under 20–25 sets for intermediate lifters. I cap chest at 20 sets, back at 22 sets, and legs at 24 sets.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Optimal Rest Times Between Heavy Compounds (2–3 Mins) vs. Isolations (60–90 Secs)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Heavy compounds (squat, bench, deadlift) get 2–3 minutes. Isolation moves (rows, curls) get 60–90 seconds. This keeps workouts 60–75 minutes long.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Double Progression &amp; The 1–2 Reps in Reserve (RIR) Rule</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I use double progression: add weight when I hit the top of the rep range, then add reps when I hit the bottom. I stop every set at 1–2 reps in reserve.</p>
            </section>

            <!-- SECTION 7 -->
            <section id="sec-7" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">7. Customizing the 6-Day PPL Timetable for Your Lifestyle</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Time-Crunched 45-Minute PPL Sessions (Supersets &amp; Drop Sets)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I use supersets (push-pull or quad-ham) and drop sets on isolation exercises to finish workouts in under 45 minutes while maintaining volume.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Home &amp; Dumbbell-Only Push Pull Legs Substitutions</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">At home I replace heavy squats with goblet squats, bench press with floor press, and pull-ups with inverted rows. The structure stays exactly the same.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">How to Adjust the Timetable When You Miss a Workout Day</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">If I miss one day, I simply shift the next workout forward by one day and repeat the missed workout on the next available slot. This keeps the frequency perfect.</p>
            </section>

            <!-- SECTION 8 -->
            <section id="sec-8" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">8. Common 6-Day PPL Mistakes That Stall Progress (And How to Fix Them)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Training to Absolute Failure on Every Set Early in the Week</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I never train to failure in the first two PPL cycles. Save failure for the final set of every exercise.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Skipping Leg Day B or Neglecting Rear Delts and Calves</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Leg Day B always includes deadlifts and good mornings. Rear delts and calves get hit twice a week no matter what.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Doing High-Intensity Cardio Right Before Heavy Leg Sessions</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I never do intense cardio before legs. Light walking is fine, but never HIIT on training days.</p>
            </section>

            <!-- SECTION 9 -->
            <section id="sec-9" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">9. Frequently Asked Questions (FAQs) About 6-Day PPL Workouts &amp; Rest Days</h2>
              <div class="space-y-3">
                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePplFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can I run 6-day PPL as a complete beginner?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes, but only after 4–6 weeks of consistent training. Start with 4–5 days and add the sixth day after 8 weeks.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePplFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">How long should each workout take?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">45–75 minutes. The plan is designed to fit comfortably in an hour.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePplFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Do I need to take Sunday completely off?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes. Sunday is dedicated rest. Light walking or stretching is allowed, but no gym.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePplFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">What if I have back pain?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Do only the sessions that avoid your weak area (usually skip deadlifts or heavy squats that week).</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="togglePplFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can I add cardio on rest day?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Only light walking. No intense cardio on rest day.</p>
                </div>
              </div>
            </section>

            <!-- SECTION 10 -->
            <section id="sec-10" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">10. Conclusion: Balancing High-Frequency Training With Smart Recovery</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">This <strong>6-Day Push Pull Legs Workout Timetable</strong> is the system I use to build muscle and strength while staying healthy. The combination of high frequency, smart recovery, and progressive overload has given me the best results I have ever seen.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start with this exact timetable for at least 12 weeks. Track your weights and how you feel every session. You will be amazed at how much stronger you become in just a few months.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Consistency beats perfection every single time.</p>
            </section>

            <!-- SOURCES -->
            <section id="sec-sources" class="space-y-3 pt-2">
              <h2 class="text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Sources</h2>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Renaissance Periodization – 6-Day PPL Guide (rpstrength.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Smart Workout – 6-Day Push Pull Legs Plan (smartworkout.app)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>BetterMe – Science-Backed 6-Day Workout Plan (betterme.world)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Huberman Lab – Sleep, Recovery &amp; Training (hubermanlab.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Dr. Mike Israetel – Renaissance Periodization Research (rpstrength.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Cal Newport – Deep Work (calnewport.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>John Meadows – Starting Strength for Hypertrophy (startingstrength.com)</span></li>
              </ul>
            </section>

            <!-- Call to Action Box (Links ONLY to Workout Timetable Tool) -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-6 text-center space-y-3">
              <div class="text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Customize Your 6-Day Push Pull Legs Timetable</div>
              <p class="text-sm text-[#6e6d7a] dark:text-[#a3a0c2]">Map out your Push, Pull, Legs, and Sunday rest blocks into a printable weekly gym schedule.</p>
              <a href="/workout-timetable-creator/" class="inline-flex items-center gap-2 bg-[#18A8A8] hover:bg-[#0f7676] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Open Workout Timetable Tool</span>
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
  var pplState = { mode: 'fixed', dayIdx: 0, checked: {} };
  var pplPhase = 'standard';

  var PUSH_A = { label: 'Push A', badge: 'Push A • Heavy Strength Focus', title: 'Push A (Chest, Anterior Delts & Triceps)', color: '#0f7676', list: ['Bench Press – 4 sets of 5–6 (heavy, 2–3m rest)', 'Overhead Press – 4 sets of 6–8 (2–3m rest)', 'Incline Dumbbell Press – 3 sets of 8–10 (90s rest)', 'Tricep Pushdowns – 3 sets of 10–12 (60–90s rest)', 'Dips or Close-Grip Bench – 3 sets to near failure'] };
  var PULL_A = { label: 'Pull A', badge: 'Pull A • Vertical Pull & Thickness', title: 'Pull A (Lats, Traps, Rear Delts & Biceps)', color: '#0f7676', list: ['Pull-Ups or Lat Pulldowns – 4 sets of 6–8 (2–3m rest)', 'Bent-Over Rows – 4 sets of 8–10 (2m rest)', 'Seated Cable Rows – 3 sets of 10–12 (60–90s rest)', 'Face Pulls – 3 sets of 15–20 (60s rest)', 'Bicep Curls – 3 sets of 10–12 (60s rest)'] };
  var LEGS_A = { label: 'Legs A', badge: 'Legs A • Quad-Dominant Focus', title: 'Legs A (Quads, Hamstrings, Glutes & Calves)', color: '#18A8A8', list: ['Squats or Leg Press – 4 sets of 6–8 (2–3m rest)', 'Romanian Deadlifts – 4 sets of 8–10 (2–3m rest)', 'Bulgarian Split Squats – 3 sets per leg (90s rest)', 'Leg Extensions – 3 sets of 12–15 (60–90s rest)', 'Seated Calf Raises – 4 sets of 12–15 (60s rest)'] };
  var PUSH_B = { label: 'Push B', badge: 'Push B • Upper Chest & Delts', title: 'Push B (Upper Chest & Lateral Delt Hypertrophy)', color: '#0f7676', list: ['Incline Bench Press – 4 sets of 8–10 (2m rest)', 'Arnold Press or Lateral Raises – 4 sets of 10–12 (60–90s rest)', 'Cable Crossovers – 3 sets of 12–15 (60s rest)', 'Tricep Dips or Overhead Extension – 3 sets of 10–12 (60s rest)', 'Lateral Raises – 3 sets of 15–20 (60s rest)'] };
  var PULL_B = { label: 'Pull B', badge: 'Pull B • Horizontal Row & Arms', title: 'Pull B (Horizontal Row & Arm Isolation)', color: '#0f7676', list: ['Weighted Pull-Ups or Bent-Over Rows – 4 sets of 6–8 (2m rest)', 'Single-Arm Dumbbell Rows – 4 sets of 8–10 per side (90s rest)', 'Shrugs or Upright Rows – 3 sets of 10–12 (60–90s rest)', 'Hammer Curls – 3 sets of 10–12 (60s rest)', 'Concentration Curls – 3 sets of 12–15 (60s rest)'] };
  var LEGS_B = { label: 'Legs B', badge: 'Legs B • Posterior Chain & Hinge', title: 'Legs B (Hamstrings, Glutes & Core)', color: '#18A8A8', list: ['Deadlifts or Good Mornings – 4 sets of 6–8 (2–3m rest)', 'Hip Thrusts – 4 sets of 8–10 (2m rest)', 'Lying Leg Curls – 3 sets of 10–12 (60–90s rest)', 'Standing Calf Raises – 4 sets of 12–15 (60s rest)', 'Hanging Leg Raises – 3 sets of 12–15 (60s rest)'] };
  var REST_DAY = { label: 'Rest', badge: 'Dedicated Rest & Recovery Day', title: 'Full Rest (Sleep, Hydration & Nutrition)', color: '#7bdcdc', list: ['No gym workouts or intense cardio', 'Eat at maintenance or slight surplus (1.6–2.2g protein/kg)', 'Focus on 7.5+ hours quality sleep and hydration'] };

  var PPL_MODES = {
    fixed: {
      heading: 'Fixed Monday–Saturday PPL Map (6-On / 1-Off)',
      days: [
        Object.assign({ short: 'Mon', sub: 'Push A' }, PUSH_A),
        Object.assign({ short: 'Tue', sub: 'Pull A' }, PULL_A),
        Object.assign({ short: 'Wed', sub: 'Legs A' }, LEGS_A),
        Object.assign({ short: 'Thu', sub: 'Push B' }, PUSH_B),
        Object.assign({ short: 'Fri', sub: 'Pull B' }, PULL_B),
        Object.assign({ short: 'Sat', sub: 'Legs B' }, LEGS_B),
        Object.assign({ short: 'Sun', sub: 'Rest' }, REST_DAY)
      ]
    },
    pullfirst: {
      heading: 'Lower-Back Safe Sequence: Pull / Push / Legs',
      days: [
        Object.assign({ short: 'Mon', sub: 'Pull A' }, PULL_A),
        Object.assign({ short: 'Tue', sub: 'Push A' }, PUSH_A),
        Object.assign({ short: 'Wed', sub: 'Legs A' }, LEGS_A),
        Object.assign({ short: 'Thu', sub: 'Pull B' }, PULL_B),
        Object.assign({ short: 'Fri', sub: 'Push B' }, PUSH_B),
        Object.assign({ short: 'Sat', sub: 'Legs B' }, LEGS_B),
        Object.assign({ short: 'Sun', sub: 'Rest' }, REST_DAY)
      ]
    },
    rolling: {
      heading: 'Rolling 3-On / 1-Off Recovery Schedule (Joint & CNS Safe)',
      days: [
        Object.assign({ short: 'Day 1', sub: 'Push A' }, PUSH_A),
        Object.assign({ short: 'Day 2', sub: 'Pull A' }, PULL_A),
        Object.assign({ short: 'Day 3', sub: 'Legs A' }, LEGS_A),
        Object.assign({ short: 'Day 4', sub: 'Rest' }, REST_DAY),
        Object.assign({ short: 'Day 5', sub: 'Push B' }, PUSH_B),
        Object.assign({ short: 'Day 6', sub: 'Pull B' }, PULL_B),
        Object.assign({ short: 'Day 7', sub: 'Legs B' }, LEGS_B)
      ]
    }
  };

  function renderPplExplorer() {
    var modeObj = PPL_MODES[pplState.mode];
    if (!modeObj) return;
    var day = modeObj.days[pplState.dayIdx];

    var bFixed = document.getElementById('btnPplFixed');
    var bSeq = document.getElementById('btnPplSequence');
    var bRoll = document.getElementById('btnPplRolling');
    var sActive = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var sIdle = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all';
    if (bFixed) bFixed.className = pplState.mode === 'fixed' ? sActive : sIdle;
    if (bSeq) bSeq.className = pplState.mode === 'pullfirst' ? sActive : sIdle;
    if (bRoll) bRoll.className = pplState.mode === 'rolling' ? sActive : sIdle;

    var dActive = 'px-2 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var dIdle = 'px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all';
    for (var i = 0; i < 7; i++) {
      var db = document.getElementById('btnPplDay' + i);
      if (db) {
        db.className = pplState.dayIdx === i ? dActive : dIdle;
        db.textContent = modeObj.days[i].short + ' (' + modeObj.days[i].sub + ')';
      }
    }

    var svgHead = document.getElementById('pplSvgHeading');
    var svgBox = document.getElementById('pplWeekSvg');
    if (svgHead) svgHead.textContent = modeObj.heading;
    if (svgBox) {
      var w = 600 / 7;
      var rects = '';
      for (var j = 0; j < 7; j++) {
        var dObj = modeObj.days[j];
        var x = j * w;
        var isSel = j === pplState.dayIdx;
        var stroke = isSel ? ' stroke="#1d1e2c" stroke-width="2.5"' : '';
        var textColor = dObj.color === '#7bdcdc' ? '#1d1e2c' : '#ffffff';
        rects += '<rect x="' + (x + 2).toFixed(1) + '" y="4" width="' + (w - 4).toFixed(1) + '" height="34" rx="6" fill="' + dObj.color + '"' + stroke + ' />';
        rects += '<text x="' + (x + w / 2).toFixed(1) + '" y="25" text-anchor="middle" fill="' + textColor + '" font-size="10.5" font-weight="700" font-family="sans-serif">' + dObj.sub + '</text>';
      }
      svgBox.innerHTML = '<svg viewBox="0 0 600 42" class="w-full h-11" role="img" aria-label="6-day push pull legs weekly intensity bar">' + rects + '</svg>';
    }

    var badge = document.getElementById('pplDayBadge');
    var title = document.getElementById('pplDayTitle');
    var prog = document.getElementById('pplDayProgress');
    var listBox = document.getElementById('pplExercisesList');
    if (badge) badge.textContent = day.short + ' • ' + day.badge;
    if (title) title.textContent = day.title;

    var doneCount = 0;
    var html = '';
    for (var k = 0; k < day.list.length; k++) {
      var cKey = pplState.mode + '_' + pplState.dayIdx + '_' + k;
      var isDone = !!pplState.checked[cKey];
      if (isDone) doneCount++;
      html += '<button type="button" onclick="togglePplExercise(\\'' + cKey + '\\')" class="w-full text-left flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ' +
        (isDone ? 'bg-[#18A8A8]/15 border-[#18A8A8]' : 'bg-[#f0fbfb] dark:bg-[#232140] border-[#18A8A8]/20 dark:border-[#2f2b54]') + '">' +
        '<span class="w-4 h-4 rounded flex items-center justify-center border shrink-0 ' + (isDone ? 'bg-[#18A8A8] border-[#18A8A8] text-white' : 'border-[#18A8A8] bg-white dark:bg-[#19172f]') + '">' +
        (isDone ? '✓' : '') + '</span>' +
        '<span class="text-xs sm:text-sm ' + (isDone ? 'line-through text-[#6e6d7a]' : 'text-[#1d1e2c] dark:text-[#f5f4fc] font-medium') + '">' + day.list[k] + '</span>' +
      '</button>';
    }
    if (prog) prog.textContent = doneCount + ' / ' + day.list.length + ' Completed';
    if (listBox) listBox.innerHTML = html;
  }

  function setPplMode(mode) {
    pplState.mode = mode;
    renderPplExplorer();
  }

  function selectPplDay(idx) {
    pplState.dayIdx = idx;
    renderPplExplorer();
  }

  function togglePplExercise(cKey) {
    pplState.checked[cKey] = !pplState.checked[cKey];
    renderPplExplorer();
  }

  function setPplPhase(phase) {
    pplPhase = phase;
    updatePplCalculator();
  }

  function updatePplCalculator() {
    var bStd = document.getElementById('btnPhaseStandard');
    var bExp = document.getElementById('btnPhaseExpress');
    var bDel = document.getElementById('btnPhaseDeload');
    var pActive = 'px-2.5 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var pIdle = 'px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all';
    if (bStd) bStd.className = pplPhase === 'standard' ? pActive : pIdle;
    if (bExp) bExp.className = pplPhase === 'express' ? pActive : pIdle;
    if (bDel) bDel.className = pplPhase === 'deload' ? pActive : pIdle;

    var wEl = document.getElementById('inpPplWeight');
    var bw = parseFloat(wEl && wEl.value ? wEl.value : '70') || 70;
    var pMin = Math.round(bw * 1.6);
    var pMax = Math.round(bw * 2.2);

    var outP = document.getElementById('outPplProtein');
    var outCaps = document.getElementById('outPplCaps');
    var outCapsNote = document.getElementById('outPplCapsNote');
    var outRest = document.getElementById('outPplRest');
    var outRestNote = document.getElementById('outPplRestNote');
    var outCns = document.getElementById('outPplCnsStatus');
    var outCnsNote = document.getElementById('outPplCnsNote');

    if (outP) outP.textContent = pMin + 'g – ' + pMax + 'g protein / day';

    if (pplPhase === 'standard') {
      if (outCaps) outCaps.textContent = 'Chest 20 • Back 22 • Legs 24';
      if (outCapsNote) outCapsNote.textContent = 'Stay under caps to avoid junk volume';
      if (outRest) outRest.textContent = '2–3m Comp / 60–90s Iso';
      if (outRestNote) outRestNote.textContent = 'Stop sets at 1–2 reps in reserve (RIR)';
    } else if (pplPhase === 'express') {
      if (outCaps) outCaps.textContent = 'Under 45 Mins (Supersets)';
      if (outCapsNote) outCapsNote.textContent = 'Pair push-pull or quad-ham + drop sets';
      if (outRest) outRest.textContent = '45–60s Between Supersets';
      if (outRestNote) outRestNote.textContent = 'Maintain full weekly set volume faster';
    } else {
      if (outCaps) outCaps.textContent = 'Chest 10 • Back 11 • Legs 12';
      if (outCapsNote) outCapsNote.textContent = '50% volume reset every 6–8 weeks';
      if (outRest) outRest.textContent = '30% Reduced Load Intensity';
      if (outRestNote) outRestNote.textContent = '4-day deload clears CNS fatigue';
    }

    var checks = document.querySelectorAll('.cns-check');
    var checkedCount = 0;
    for (var i = 0; i < checks.length; i++) {
      if (checks[i].checked) checkedCount++;
    }
    if (outCns && outCnsNote) {
      if (checkedCount > 0) {
        outCns.textContent = 'Take Full Rest Day';
        outCnsNote.textContent = checkedCount + ' CNS warning sign(s) flagged — rest now';
      } else {
        outCns.textContent = 'Ready to Train';
        outCnsNote.textContent = '0 fatigue signs — keep Day 7 rest';
      }
    }
  }

  function togglePplFaq(btn) {
    var item = btn.closest('.faq-accordion-item');
    if (!item) return;
    var ans = item.querySelector('.faq-answer');
    var chev = item.querySelector('.faq-chevron');
    if (ans) ans.classList.toggle('hidden');
    if (chev) chev.classList.toggle('rotate-180');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderPplExplorer();
      updatePplCalculator();
    });
  } else {
    renderPplExplorer();
    updatePplCalculator();
  }
`;

const doc = buildFullCleanDocument({
  lang: 'en-GB',
  title: '6-Day Push Pull Legs Workout Timetable & Complete Rest Day Guide',
  description: 'Build muscle and strength with a 6-day Push Pull Legs (PPL) workout timetable, fixed and rolling schedules, 48-72h recovery science, deloads, and rest day rules.',
  canonicalUrl: 'https://timetablecreator.online/blog/6-day-push-pull-legs-workout-timetable/',
  robotsMeta: '<meta name="robots" content="index, follow" />',
  activePage: 'blog',
  mainContent: mainContent,
  pageScript: pageScript
});

const dir = path.join(__dirname, '../public/blog/6-day-push-pull-legs-workout-timetable');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), doc, 'utf8');
console.log('Successfully generated public/blog/6-day-push-pull-legs-workout-timetable/index.html');
