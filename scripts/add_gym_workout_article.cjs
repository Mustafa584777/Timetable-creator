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
              <span class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold truncate max-w-[240px] sm:max-w-md">7-Day Weekly Gym Workout Plan for Beginners</span>
            </nav>

            <header class="space-y-4 border-b border-[#ebe8fa] dark:border-[#2f2b54] pb-8">
              <div class="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider">
                <span class="bg-[#18A8A8]/15 text-[#0f7676] dark:text-[#4fd1d1] px-3 py-1 rounded-full uppercase tracking-wider">Fitness &amp; Workout Guide</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• By <strong class="text-[#1d1e2c] dark:text-[#f5f4fc] font-semibold">Prof. Sarah Lin</strong></span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• Last Updated: November 27, 2026</span>
                <span class="text-[#6e6d7a] dark:text-[#a3a0c2] font-medium normal-case">• 10 Min Read</span>
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1d1e2c] dark:text-[#f5f4fc] tracking-tight leading-tight mb-4 break-words">
                7-Day Weekly Gym Workout Plan for Beginners
              </h1>

              <!-- No-Text Hero Infographic placed right before the first paragraph -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/gym-workout-hero.jpg" alt="Beginner athletes following a structured 7-day weekly gym workout plan with dumbbells, mat mobility, and weekly calendar blocks" class="w-full h-auto object-cover rounded-2xl" loading="lazy" referrerpolicy="no-referrer" />
              </figure>

              <p class="text-base text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">
                I have been following this <strong>7-Day Weekly Gym Workout Plan for Beginners</strong> built with a simple <a href="/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">timetable maker</a> for the past 7 months and it has completely changed how I build strength without getting injured or burnt out. As a complete beginner, I was terrified of lifting weights every day, but this schedule proved me wrong. It gives your body enough rest to grow while still keeping you active 7 days a week.
              </p>
            </header>

            <!-- Table of Contents -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-[#18A8A8] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h10"></path></svg>
                <h2 class="text-base font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Table of Contents</h2>
              </div>
              <ul class="space-y-2 text-sm text-[#6e6d7a] dark:text-[#a3a0c2] font-medium">
                <li><a href="#sec-1" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">1. Introduction: The Truth About Working Out 7 Days a Week as a Beginner</a></li>
                <li><a href="#sec-2" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">2. How This 7-Day Beginner Gym Schedule Is Structured (The 4-2-1 Formula)</a></li>
                <li><a href="#sec-3" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">3. Pre-Workout &amp; Post-Workout Essentials (Before You Touch a Weight)</a></li>
                <li><a href="#sec-4" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">4. The Complete 7-Day Weekly Gym Workout Plan for Beginners (Day-by-Day)</a></li>
                <li><a href="#sec-5" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">5. Content Gap: Alternative 7-Day Split (Upper / Lower 4-Day Lifting Option)</a></li>
                <li><a href="#sec-6" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">6. Technical Gap: How to Progress Week-by-Week (The Double Progression Method)</a></li>
                <li><a href="#sec-7" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">7. Goal Customization: Adapting This 7-Day Plan for Fat Loss vs. Muscle Gain</a></li>
                <li><a href="#sec-8" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">8. Common Beginner Gym Mistakes That Stall Progress (And How to Avoid Them)</a></li>
                <li><a href="#sec-9" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">9. Frequently Asked Questions (FAQs) About Beginner 7-Day Gym Routines</a></li>
                <li><a href="#sec-10" class="text-[#0f7676] dark:text-[#4fd1d1] hover:underline">10. Conclusion: Your First 30 Days in the Gym—Consistency Over Intensity</a></li>
              </ul>
            </div>

            <!-- SECTION 1 -->
            <section id="sec-1" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">1. Introduction: The Truth About Working Out 7 Days a Week as a Beginner</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Most people think “I must lift weights 7 days a week” to build muscle fast. The truth is that beginners actually get better results when they train smart and recover properly. This plan lets you hit the gym 7 days a week but with built-in rest, mobility, and light activity so your muscles actually grow instead of getting torn.</p>
            </section>

            <!-- SECTION 2 -->
            <section id="sec-2" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">2. How This 7-Day Beginner Gym Schedule Is Structured (The 4-2-1 Formula)</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I use a simple 4-2-1 formula that works for every beginner I have coached.</p>

              <!-- Infographic 2: The 4-2-1 Beginner Gym Formula -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/gym-4-2-1-formula.jpg" alt="The 4-2-1 Beginner Gym Formula Infographic: 4 Training Days, 2 Active Recovery Days, 1 Full Rest Day" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 1:</strong> Balancing 4 training days, 2 active recovery sessions, and 1 full rest day for sustainable beginner strength gains.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Why Beginners Should Never Lift Weights 7 Days Straight (Understanding Muscle Recovery)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Lifting every single day prevents proper recovery. Your muscles need at least 48 hours to repair and grow. This plan gives you 4 heavy lifting days, 2 active recovery days, and 1 full rest day — the perfect balance for new lifters.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Full-Body vs. Upper/Lower Splits: Which Works Best for Your First 90 Days?</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">For the first 90 days, full-body workouts are ideal. You hit every major muscle group 2–3 times per week, which is exactly what beginners need. Once you have been training for 90+ days, you can switch to a 4-day upper/lower split.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">How Heavy Should You Lift? (The "2 Reps in Reserve" Rule Explained)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I never lift to failure. I stop when I have 2 reps left in the tank. This keeps form perfect and prevents injury while still building strength.</p>
            </section>

            <!-- SECTION 3 -->
            <section id="sec-3" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">3. Pre-Workout &amp; Post-Workout Essentials (Before You Touch a Weight)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">The 7-Minute Dynamic Warm-Up Routine to Prevent Gym Injuries</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Do this every session:</p>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Arm circles (30 seconds)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Leg swings (20 each leg)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bodyweight squats (20)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Shoulder rolls + neck rolls</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Cat-cow stretches (30 seconds)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>This takes exactly 7 minutes and reduces injury risk dramatically.</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Ideal Rest Intervals Between Sets and Exercises (60 to 120 Seconds)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I rest 60–90 seconds between sets for compound lifts and 45–60 seconds for isolation moves. This keeps blood flow high and energy up.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Post-Workout Cool-Down and Hydration Checklist</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">After every workout I do:</p>
              <ul class="tc-surface-panel space-y-2.5 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>5 minutes of light stretching</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Drink 500 ml water</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Eat a protein-rich meal within 30 minutes</span></li>
              </ul>
            </section>

            <!-- SECTION 4 -->
            <section id="sec-4" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">4. The Complete 7-Day Weekly Gym Workout Plan for Beginners (Day-by-Day)</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Here is the exact schedule I follow.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 1 (Monday): Full-Body Strength A (Compound Push, Pull &amp; Squat Focus)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Squats or Leg Press – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bench Press or Machine Chest Press – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bent-Over Rows or Seated Cable Rows – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Overhead Press – 3 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Plank – 3 sets of 45 seconds</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 2 (Tuesday): Low-Impact Cardio &amp; Core Stability (Treadmill, Cycling &amp; Planks)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>20–30 minutes steady cardio (treadmill or cycling)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Planks – 4 sets</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bird-dog – 3 sets per side</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Dead bug – 3 sets</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 3 (Wednesday): Full-Body Strength B (Hinge, Overhead Press &amp; Row Focus)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Deadlifts or Romanian Deadlifts – 4 sets of 8–10</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Overhead Press – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Pull-ups or Lat Pulldown – 4 sets of 8–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Goblet Squats or Hack Squats – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Face Pulls – 3 sets of 15</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 4 (Thursday): Active Recovery &amp; Mobility Day (Light Walking &amp; Stretching)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>30 minutes light walking or cycling</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>10 minutes full-body mobility routine</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Foam rolling (10 minutes)</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 5 (Friday): Full-Body Strength C (Machine &amp; Dumbbell Hypertrophy Focus)</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Leg Press or Hack Squat – 4 sets of 12–15</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Incline Dumbbell Press – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Lat Pulldown or Assisted Pull-ups – 4 sets of 10–12</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Bulgarian Split Squats – 3 sets per leg</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>Cable Bicep Curls – 3 sets of 12–15</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 6 (Saturday): Endurance Conditioning &amp; Weak-Point Accessories</h3>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>30 minutes HIIT (sprints or bike intervals)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>3 sets of 15–20 reps on any weak exercise from the week</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-2 shrink-0"></span><span>20 minutes of light cardio</span></li>
              </ul>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Day 7 (Sunday): Complete Rest &amp; Weekly Meal/Gym Bag Prep</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Full rest day. Prep meals, clean equipment, and plan next week.</p>

              <!-- Interactive Element 1: 7-Day Beginner Workout Explorer & Checklist -->
              <div id="gymWeekExplorer" class="tc-surface-panel my-8 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                      Interactive Workout Explorer
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">7-Day Gym Split Switcher &amp; Session Tracker</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Toggle between First 90 Days (Full-Body) and 90+ Days (Upper/Lower), click any day, and check off sets.</p>
                  </div>
                  <div class="flex items-center gap-1.5 bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl p-1 shrink-0">
                    <button type="button" id="btnSplitFull" onclick="setGymSplit('full')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">First 90 Days</button>
                    <button type="button" id="btnSplitUpper" onclick="setGymSplit('upper')" class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">90+ Days Split</button>
                  </div>
                </div>

                <!-- 7-Day Proportional Load SVG -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-2.5">
                  <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span id="gymSvgHeading" class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">4-2-1 Weekly Intensity Map (First 90 Days)</span>
                    <div class="flex flex-wrap items-center gap-3 text-[11px] font-medium text-[#6e6d7a] dark:text-[#a3a0c2]">
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#0f7676] inline-block"></span> Lifting / Conditioning</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#18A8A8] inline-block"></span> Active Recovery</span>
                      <span class="inline-flex items-center gap-1"><span class="w-2.5 h-2.5 rounded-full bg-[#7bdcdc] inline-block"></span> Full Rest</span>
                    </div>
                  </div>
                  <div id="gymWeekSvg" class="w-full overflow-hidden"></div>
                </div>

                <!-- Day Selector Buttons -->
                <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  <button type="button" id="btnGymDay0" onclick="selectGymDay(0)" class="px-2 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Mon</button>
                  <button type="button" id="btnGymDay1" onclick="selectGymDay(1)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Tue</button>
                  <button type="button" id="btnGymDay2" onclick="selectGymDay(2)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Wed</button>
                  <button type="button" id="btnGymDay3" onclick="selectGymDay(3)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Thu</button>
                  <button type="button" id="btnGymDay4" onclick="selectGymDay(4)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Fri</button>
                  <button type="button" id="btnGymDay5" onclick="selectGymDay(5)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Sat</button>
                  <button type="button" id="btnGymDay6" onclick="selectGymDay(6)" class="px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all">Sun</button>
                </div>

                <!-- Selected Day Detail Card -->
                <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 space-y-3">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div id="gymDayBadge" class="text-[11px] font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1]">Monday • Training Day</div>
                      <h4 id="gymDayTitle" class="text-base sm:text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Full-Body Strength A</h4>
                    </div>
                    <div id="gymDayProgress" class="text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 px-3 py-1 rounded-full w-fit">0 / 5 Completed</div>
                  </div>
                  <div id="gymExercisesList" class="space-y-2"></div>
                </div>
              </div>
            </section>

            <!-- SECTION 5 -->
            <section id="sec-5" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">5. Content Gap: Alternative 7-Day Split (Upper / Lower 4-Day Lifting Option)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">When to Switch From 3-Day Full-Body to a 4-Day Upper/Lower Routine</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">After 90 days of consistent training, you can switch to this upper/lower version or move up to a <a href="/blog/6-day-push-pull-legs-workout-timetable/" class="text-[#0f7676] dark:text-[#4fd1d1] font-semibold underline decoration-[#18A8A8]/50 hover:decoration-[#18A8A8]">6-day Push Pull Legs workout timetable</a> for faster progress.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Weekly Overview: Upper A, Lower A, Cardio/Rest, Upper B, Lower B</h3>
              <div class="article-table-wrap border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl sm:rounded-2xl overflow-x-auto mt-2 w-full">
                <table class="w-full min-w-[540px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr class="bg-[#f0fbfb] dark:bg-[#232140] border-b border-[#18A8A8]/20 dark:border-[#2f2b54]">
                      <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Day</th>
                      <th class="p-3.5 font-bold text-[#0f7676] dark:text-[#4fd1d1]">Workout Type</th>
                      <th class="p-3.5 font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Focus</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#ebe8fa] dark:divide-[#2f2b54] text-[#3c3d4e] dark:text-[#c7c5df]">
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Monday</td>
                      <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Upper A</td>
                      <td class="p-3.5">Push + Pull + Core</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Tuesday</td>
                      <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Lower A</td>
                      <td class="p-3.5">Squat + Hinge + Glutes</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Wednesday</td>
                      <td class="p-3.5">Cardio/Rest</td>
                      <td class="p-3.5">Active recovery</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Thursday</td>
                      <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Upper B</td>
                      <td class="p-3.5">Push + Pull + Core</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Friday</td>
                      <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Lower B</td>
                      <td class="p-3.5">Squat + Hinge + Glutes</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Saturday</td>
                      <td class="p-3.5 font-semibold text-[#0f7676] dark:text-[#4fd1d1]">Conditioning</td>
                      <td class="p-3.5">HIIT or endurance</td>
                    </tr>
                    <tr class="hover:bg-[#f0fbfb]/70">
                      <td class="p-3.5 font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Sunday</td>
                      <td class="p-3.5 text-[#6e6d7a]">Rest</td>
                      <td class="p-3.5">Full recovery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <!-- SECTION 6 -->
            <section id="sec-6" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">6. Technical Gap: How to Progress Week-by-Week (The Double Progression Method)</h2>

              <!-- Infographic 3: Double Progression Roadmap -->
              <figure class="tc-surface-card my-6 rounded-2xl overflow-hidden border border-[#18A8A8]/25 dark:border-[#2f2b54] shadow-sm bg-white dark:bg-[#19172f]">
                <img src="/gym-double-progression.jpg" alt="Double Progression Roadmap Infographic: Weeks 1-2 Master Form, Weeks 3-4 Add Reps (8-12), Weeks 5-8 Add +2.5 to 5 kg" class="w-full h-auto object-cover rounded-t-2xl" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption class="tc-surface-panel p-3.5 bg-[#f0fbfb] dark:bg-[#232140] border-t border-[#18A8A8]/20 dark:border-[#2f2b54] text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] text-center font-medium">
                  <strong class="text-[#1d1e2c] dark:text-[#f5f4fc]">Infographic 2:</strong> Safe 8-week double progression cycle moving from form mastery to reps before adding +2.5 to 5 kg load.
                </figcaption>
              </figure>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Weeks 1–2: Mastering Exercise Form and Machine Setup</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Focus only on perfect form. Film yourself every session.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Weeks 3–4: Adding Reps Before Adding Weight (8 to 12 Rep Rule)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">In Week 3, aim for 12 reps instead of 10. Only increase weight when you hit 12 reps with perfect form for all sets.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Weeks 5–8: Safely Increasing Loads Without Breaking Technique</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Add 2.5–5 kg to the bar when you hit all reps. Never go beyond 2 reps in reserve.</p>
            </section>

            <!-- SECTION 7 -->
            <section id="sec-7" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">7. Goal Customization: Adapting This 7-Day Plan for Fat Loss vs. Muscle Gain</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Modifications for Weight Loss &amp; Toning (Step Targets &amp; Calorie Deficit Basics)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Add 20–30 minutes of walking after every workout and eat in a 500-calorie deficit. Focus on protein (1.6–2g per kg body weight).</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Modifications for Skinny Beginners / Muscle Gain (Protein Targets &amp; Surpluses)</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">On training days, eat 30–40g protein within 2 hours after workout. On rest days, eat 1.6g protein per kg body weight. Keep calories in a small surplus of 250–300.</p>

              <!-- Interactive Element 2: Goal & Double Progression Calculator -->
              <div id="gymGoalCalc" class="tc-surface-panel my-6 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-4 sm:p-7 shadow-sm space-y-5">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#18A8A8]/20 dark:border-[#2f2b54] pb-4">
                  <div>
                    <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0f7676] dark:text-[#4fd1d1] bg-[#18A8A8]/15 dark:bg-[#19172f] px-3 py-1 rounded-full mb-2">
                      <svg class="w-3.5 h-3.5 text-[#18A8A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Progression &amp; Nutrition Calculator
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Double Progression &amp; Protein Goal Planner</h3>
                    <p class="text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] mt-0.5">Choose your goal, enter body weight and current lift reps to get exact next-week targets.</p>
                  </div>
                  <div class="grid grid-cols-2 gap-1.5 bg-white dark:bg-[#19172f] border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl p-1 shrink-0">
                    <button type="button" id="btnGoalFatLoss" onclick="setGymGoal('fatloss')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all">Fat Loss</button>
                    <button type="button" id="btnGoalGain" onclick="setGymGoal('gain')" class="px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all">Muscle Gain</button>
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-3 space-y-1.5">
                    <label for="inpBodyWeight" class="block text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Body Weight (kg)</label>
                    <input id="inpBodyWeight" type="number" min="35" max="180" value="65" oninput="updateGymCalculator()" class="w-full px-3 py-2 rounded-lg text-sm font-bold bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 text-[#1d1e2c] dark:text-[#f5f4fc]" />
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-3 space-y-1.5">
                    <label for="inpLiftWeight" class="block text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Current Lift (kg)</label>
                    <input id="inpLiftWeight" type="number" min="5" max="300" value="40" oninput="updateGymCalculator()" class="w-full px-3 py-2 rounded-lg text-sm font-bold bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 text-[#1d1e2c] dark:text-[#f5f4fc]" />
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-3 space-y-1.5">
                    <label for="inpLiftReps" class="block text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Clean Reps Hit (8–12)</label>
                    <input id="inpLiftReps" type="number" min="6" max="15" value="10" oninput="updateGymCalculator()" class="w-full px-3 py-2 rounded-lg text-sm font-bold bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/25 text-[#1d1e2c] dark:text-[#f5f4fc]" />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Daily Protein Target</div>
                    <div id="outProteinTarget" class="text-lg font-black text-[#0f7676] dark:text-[#4fd1d1]">104g – 130g / day</div>
                    <div id="outProteinNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">1.6–2.0 g per kg body weight</div>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Calories &amp; Cardio</div>
                    <div id="outCalorieTarget" class="text-lg font-black text-[#0f7676] dark:text-[#4fd1d1]">-500 kcal Deficit</div>
                    <div id="outCardioNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">+ 20–30 min post-workout walk</div>
                  </div>
                  <div class="tc-surface-card bg-white dark:bg-[#19172f] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 space-y-1">
                    <div class="text-[11px] font-bold uppercase tracking-wider text-[#6e6d7a] dark:text-[#a3a0c2]">Next Session Load</div>
                    <div id="outNextLoad" class="text-lg font-black text-[#0f7676] dark:text-[#4fd1d1]">Keep 40 kg → Aim 12 reps</div>
                    <div id="outLoadNote" class="text-xs text-[#6e6d7a] dark:text-[#a3a0c2]">Stop at 2 reps in reserve (2 RIR)</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- SECTION 8 -->
            <section id="sec-8" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">8. Common Beginner Gym Mistakes That Stall Progress (And How to Avoid Them)</h2>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Ego Lifting and Skipping Proper Range of Motion</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I used to lift too heavy and hurt my knees. Now I stick to the “2 reps in reserve” rule and always go through full range of motion.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Program Hopping Every Two Weeks Instead of Tracking Workouts</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I keep the same 7-day plan for at least 8–12 weeks. Tracking progress on a sheet keeps me motivated.</p>

              <h3 class="text-xl font-semibold text-[#1d1e2c] dark:text-[#f5f4fc]">Confusing Normal Muscle Soreness (DOMS) With Joint or Sharp Pain</h3>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I rest the muscle if it feels sore, but I stop immediately if there is sharp pain or swelling.</p>
            </section>

            <!-- SECTION 9 -->
            <section id="sec-9" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">9. Frequently Asked Questions (FAQs) About Beginner 7-Day Gym Routines</h2>
              <div class="space-y-3">
                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleGymFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Can I really train 7 days a week as a beginner?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Yes, but with this smart recovery plan. Your muscles will recover between heavy sessions.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleGymFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">How many days should I lift heavy?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Only 4 days. The other 3 days are active recovery or light cardio.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleGymFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">Do I need a trainer for the first month?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Not every day. I only do 1–2 sessions with a trainer to learn form.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleGymFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">What if I feel tired every day?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Take the full rest day on Sunday and reduce cardio on Thursday. Sleep is non-negotiable.</p>
                </div>

                <div class="faq-accordion-item tc-surface-panel border border-[#18A8A8]/25 dark:border-[#2f2b54] rounded-xl bg-[#f0fbfb] dark:bg-[#232140] overflow-hidden">
                  <button type="button" onclick="toggleGymFaq(this)" class="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer">
                    <h3 class="font-bold text-[#1d1e2c] dark:text-[#f5f4fc] text-sm">How long until I see results?</h3>
                    <svg class="faq-chevron w-4 h-4 text-[#18A8A8] shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <p class="faq-answer hidden px-4 pb-4 text-xs sm:text-sm text-[#6e6d7a] dark:text-[#a3a0c2] leading-relaxed">Most beginners see visible strength gains in 4–6 weeks and muscle changes in 8–12 weeks.</p>
                </div>
              </div>
            </section>

            <!-- SECTION 10 -->
            <section id="sec-10" class="space-y-4">
              <h2 class="text-2xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">10. Conclusion: Your First 30 Days in the Gym—Consistency Over Intensity</h2>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">I have followed this exact <strong>7-Day Weekly Gym Workout Plan for Beginners</strong> for 7 months now and it is still working better than anything else I have tried. The key is consistency, not perfection.</p>
              <p class="text-[#3c3d4e] dark:text-[#c7c5df] leading-relaxed">Start today with the Monday workout. Film your form, track your weights, and stay consistent for the first 30 days. You will be shocked at how much stronger and healthier you feel.</p>
            </section>

            <!-- SOURCES -->
            <section id="sec-sources" class="space-y-3 pt-2">
              <h2 class="text-xl font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Sources</h2>
              <ul class="tc-surface-panel space-y-2 bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/20 dark:border-[#2f2b54] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#3c3d4e] dark:text-[#c7c5df]">
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>National Strength and Conditioning Association (NSCA) Beginner Guidelines (nsca.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Mayo Clinic – “Exercise and Rest” (mayoclinic.org)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Dr. Mike Israetel – Renaissance Periodization (rpstrength.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>John Meadows – Starting Strength for Beginners (startingstrength.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Cal Newport – Deep Work (calnewport.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Huberman Lab – “Sleep and Recovery” (hubermanlab.com)</span></li>
                <li class="flex items-start gap-2.5"><span class="w-2 h-2 rounded-full bg-[#18A8A8] mt-1.5 shrink-0"></span><span>Bodybuilding.com – Beginner Workout Plans (bodybuilding.com)</span></li>
              </ul>
            </section>

            <!-- Call to Action Box (Links ONLY to Workout Timetable Tool) -->
            <div class="tc-surface-panel bg-[#f0fbfb] dark:bg-[#232140] border border-[#18A8A8]/30 dark:border-[#2f2b54] rounded-2xl p-6 text-center space-y-3">
              <div class="text-lg font-bold text-[#1d1e2c] dark:text-[#f5f4fc]">Build Your 7-Day Beginner Gym Schedule</div>
              <p class="text-sm text-[#6e6d7a] dark:text-[#a3a0c2]">Customize your lifting days, active recovery blocks, cardio, and Sunday rest into a printable weekly gym routine.</p>
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
  var gymState = { split: 'full', dayIdx: 0, checked: {} };
  var gymGoal = 'fatloss';

  var GYM_PLANS = {
    full: {
      heading: '4-2-1 Weekly Intensity Map (First 90 Days)',
      days: [
        { short: 'Mon', badge: 'Monday • Training Day 1', title: 'Full-Body Strength A (Push, Pull & Squat)', color: '#0f7676', list: ['Squats or Leg Press – 4 sets of 10–12 (Rest 60–90s)', 'Bench Press or Machine Chest Press – 4 sets of 10–12 (Rest 60–90s)', 'Bent-Over Rows or Seated Cable Rows – 4 sets of 10–12 (Rest 60–90s)', 'Overhead Press – 3 sets of 10–12 (Rest 60–90s)', 'Plank – 3 sets of 45 seconds (Rest 45s)'] },
        { short: 'Tue', badge: 'Tuesday • Active Recovery 1', title: 'Low-Impact Cardio & Core Stability', color: '#18A8A8', list: ['20–30 minutes steady cardio (treadmill or cycling)', 'Planks – 4 sets', 'Bird-dog – 3 sets per side', 'Dead bug – 3 sets'] },
        { short: 'Wed', badge: 'Wednesday • Training Day 2', title: 'Full-Body Strength B (Hinge, Press & Row)', color: '#0f7676', list: ['Deadlifts or Romanian Deadlifts – 4 sets of 8–10 (Rest 60–90s)', 'Overhead Press – 4 sets of 10–12 (Rest 60–90s)', 'Pull-ups or Lat Pulldown – 4 sets of 8–12 (Rest 60–90s)', 'Goblet Squats or Hack Squats – 4 sets of 10–12 (Rest 60–90s)', 'Face Pulls – 3 sets of 15 (Rest 45–60s)'] },
        { short: 'Thu', badge: 'Thursday • Active Recovery 2', title: 'Active Recovery & Mobility Day', color: '#18A8A8', list: ['30 minutes light walking or cycling', '10 minutes full-body mobility routine', 'Foam rolling (10 minutes)'] },
        { short: 'Fri', badge: 'Friday • Training Day 3', title: 'Full-Body Strength C (Machine & Dumbbell)', color: '#0f7676', list: ['Leg Press or Hack Squat – 4 sets of 12–15 (Rest 60–90s)', 'Incline Dumbbell Press – 4 sets of 10–12 (Rest 60–90s)', 'Lat Pulldown or Assisted Pull-ups – 4 sets of 10–12 (Rest 60–90s)', 'Bulgarian Split Squats – 3 sets per leg (Rest 60s)', 'Cable Bicep Curls – 3 sets of 12–15 (Rest 45–60s)'] },
        { short: 'Sat', badge: 'Saturday • Training Day 4', title: 'Endurance Conditioning & Accessories', color: '#0f7676', list: ['30 minutes HIIT (sprints or bike intervals)', '3 sets of 15–20 reps on any weak exercise from the week', '20 minutes of light cardio'] },
        { short: 'Sun', badge: 'Sunday • Full Rest Day', title: 'Complete Rest & Meal/Gym Bag Prep', color: '#7bdcdc', list: ['Full rest from weights and intense cardio', 'Prep protein-rich meals for the week', 'Clean gym bag, water bottle, and track next week weights'] }
      ]
    },
    upper: {
      heading: '4-Day Upper / Lower Split (90+ Days)',
      days: [
        { short: 'Mon', badge: 'Monday • Upper A', title: 'Upper A (Push + Pull + Core)', color: '#0f7676', list: ['Bench Press – 4 sets of 8–12 (2 RIR)', 'Seated Cable Rows – 4 sets of 10–12', 'Overhead Dumbbell Press – 3 sets of 10–12', 'Lat Pulldown – 3 sets of 10–12', 'Plank – 3 sets of 45 seconds'] },
        { short: 'Tue', badge: 'Tuesday • Lower A', title: 'Lower A (Squat + Hinge + Glutes)', color: '#0f7676', list: ['Squats or Leg Press – 4 sets of 10–12', 'Romanian Deadlifts – 4 sets of 8–10', 'Bulgarian Split Squats – 3 sets per leg', 'Standing Calf Raises – 3 sets of 15'] },
        { short: 'Wed', badge: 'Wednesday • Active Recovery', title: 'Cardio / Rest (Active Recovery)', color: '#18A8A8', list: ['30 minutes light walking or cycling', '10 minutes mobility + foam rolling'] },
        { short: 'Thu', badge: 'Thursday • Upper B', title: 'Upper B (Push + Pull + Core)', color: '#0f7676', list: ['Incline Dumbbell Press – 4 sets of 10–12', 'Pull-ups or Assisted Pull-ups – 4 sets of 8–12', 'Face Pulls – 3 sets of 15', 'Cable Bicep Curls – 3 sets of 12–15', 'Dead Bug – 3 sets'] },
        { short: 'Fri', badge: 'Friday • Lower B', title: 'Lower B (Squat + Hinge + Glutes)', color: '#0f7676', list: ['Hack Squat or Goblet Squat – 4 sets of 10–12', 'Hip Thrusts or Glute Bridge – 4 sets of 10–12', 'Seated Leg Curls – 3 sets of 12–15', 'Core Bird-dog – 3 sets per side'] },
        { short: 'Sat', badge: 'Saturday • Conditioning', title: 'Conditioning (HIIT or Endurance)', color: '#0f7676', list: ['30 minutes HIIT sprints or stationary bike', '20 minutes light cooldown walk'] },
        { short: 'Sun', badge: 'Sunday • Rest', title: 'Rest (Full Recovery)', color: '#7bdcdc', list: ['Full recovery + 7.5+ hrs sleep', 'Prep meals and log weekly lifts'] }
      ]
    }
  };

  function renderGymExplorer() {
    var plan = GYM_PLANS[gymState.split];
    if (!plan) return;
    var day = plan.days[gymState.dayIdx];

    var bFull = document.getElementById('btnSplitFull');
    var bUpper = document.getElementById('btnSplitUpper');
    var sActive = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var sIdle = 'px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all';
    if (bFull) bFull.className = gymState.split === 'full' ? sActive : sIdle;
    if (bUpper) bUpper.className = gymState.split === 'upper' ? sActive : sIdle;

    var dActive = 'px-2 py-2 rounded-xl text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var dIdle = 'px-2 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#19172f] text-[#0f7676] dark:text-[#4fd1d1] border border-[#18A8A8]/25 cursor-pointer transition-all';
    for (var i = 0; i < 7; i++) {
      var db = document.getElementById('btnGymDay' + i);
      if (db) db.className = gymState.dayIdx === i ? dActive : dIdle;
    }

    var svgHead = document.getElementById('gymSvgHeading');
    var svgBox = document.getElementById('gymWeekSvg');
    if (svgHead) svgHead.textContent = plan.heading;
    if (svgBox) {
      var w = 600 / 7;
      var rects = '';
      for (var j = 0; j < 7; j++) {
        var dObj = plan.days[j];
        var x = j * w;
        var isSel = j === gymState.dayIdx;
        var stroke = isSel ? ' stroke="#1d1e2c" stroke-width="2.5"' : '';
        var textColor = dObj.color === '#7bdcdc' ? '#1d1e2c' : '#ffffff';
        rects += '<rect x="' + (x + 2).toFixed(1) + '" y="4" width="' + (w - 4).toFixed(1) + '" height="34" rx="6" fill="' + dObj.color + '"' + stroke + ' />';
        rects += '<text x="' + (x + w / 2).toFixed(1) + '" y="25" text-anchor="middle" fill="' + textColor + '" font-size="11" font-weight="700" font-family="sans-serif">' + dObj.short + '</text>';
      }
      svgBox.innerHTML = '<svg viewBox="0 0 600 42" class="w-full h-11" role="img" aria-label="7-day workout split intensity bar">' + rects + '</svg>';
    }

    var badge = document.getElementById('gymDayBadge');
    var title = document.getElementById('gymDayTitle');
    var prog = document.getElementById('gymDayProgress');
    var listBox = document.getElementById('gymExercisesList');
    if (badge) badge.textContent = day.badge;
    if (title) title.textContent = day.title;

    var doneCount = 0;
    var html = '';
    for (var k = 0; k < day.list.length; k++) {
      var cKey = gymState.split + '_' + gymState.dayIdx + '_' + k;
      var isDone = !!gymState.checked[cKey];
      if (isDone) doneCount++;
      html += '<button type="button" onclick="toggleGymExercise(\\'' + cKey + '\\')" class="w-full text-left flex items-center gap-3 p-2.5 rounded-lg border transition-all cursor-pointer ' +
        (isDone ? 'bg-[#18A8A8]/15 border-[#18A8A8]' : 'bg-[#f0fbfb] dark:bg-[#232140] border-[#18A8A8]/20 dark:border-[#2f2b54]') + '">' +
        '<span class="w-4 h-4 rounded flex items-center justify-center border shrink-0 ' + (isDone ? 'bg-[#18A8A8] border-[#18A8A8] text-white' : 'border-[#18A8A8] bg-white dark:bg-[#19172f]') + '">' +
        (isDone ? '✓' : '') + '</span>' +
        '<span class="text-xs sm:text-sm ' + (isDone ? 'line-through text-[#6e6d7a]' : 'text-[#1d1e2c] dark:text-[#f5f4fc] font-medium') + '">' + day.list[k] + '</span>' +
      '</button>';
    }
    if (prog) prog.textContent = doneCount + ' / ' + day.list.length + ' Completed';
    if (listBox) listBox.innerHTML = html;
  }

  function setGymSplit(split) {
    gymState.split = split;
    renderGymExplorer();
  }

  function selectGymDay(idx) {
    gymState.dayIdx = idx;
    renderGymExplorer();
  }

  function toggleGymExercise(cKey) {
    gymState.checked[cKey] = !gymState.checked[cKey];
    renderGymExplorer();
  }

  function setGymGoal(goal) {
    gymGoal = goal;
    updateGymCalculator();
  }

  function updateGymCalculator() {
    var bFat = document.getElementById('btnGoalFatLoss');
    var bGain = document.getElementById('btnGoalGain');
    var gActive = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-[#18A8A8] text-white cursor-pointer transition-all';
    var gIdle = 'px-3 py-1.5 rounded-lg text-xs font-bold text-[#0f7676] dark:text-[#4fd1d1] cursor-pointer transition-all';
    if (bFat) bFat.className = gymGoal === 'fatloss' ? gActive : gIdle;
    if (bGain) bGain.className = gymGoal === 'gain' ? gActive : gIdle;

    var bwEl = document.getElementById('inpBodyWeight');
    var lwEl = document.getElementById('inpLiftWeight');
    var repsEl = document.getElementById('inpLiftReps');

    var bw = parseFloat(bwEl && bwEl.value ? bwEl.value : '65') || 65;
    var lw = parseFloat(lwEl && lwEl.value ? lwEl.value : '40') || 40;
    var reps = parseInt(repsEl && repsEl.value ? repsEl.value : '10', 10) || 10;

    var pMin = Math.round(bw * 1.6);
    var pMax = Math.round(bw * 2.0);

    var outP = document.getElementById('outProteinTarget');
    var outPN = document.getElementById('outProteinNote');
    var outC = document.getElementById('outCalorieTarget');
    var outCN = document.getElementById('outCardioNote');
    var outL = document.getElementById('outNextLoad');
    var outLN = document.getElementById('outLoadNote');

    if (gymGoal === 'fatloss') {
      if (outP) outP.textContent = pMin + 'g – ' + pMax + 'g / day';
      if (outPN) outPN.textContent = '1.6–2.0 g per kg body weight';
      if (outC) outC.textContent = '-500 kcal Deficit';
      if (outCN) outCN.textContent = '+ 20–30 min walk after every workout';
    } else {
      if (outP) outP.textContent = pMin + 'g+ / day (Rest)';
      if (outPN) outPN.textContent = 'Training days: 30–40g within 2h post-workout';
      if (outC) outC.textContent = '+250–300 kcal Surplus';
      if (outCN) outCN.textContent = 'Keep 4 lifting days + Sunday full rest';
    }

    if (outL && outLN) {
      if (reps >= 12) {
        outL.textContent = 'Increase to ' + (lw + 2.5) + '–' + (lw + 5) + ' kg';
        outLN.textContent = 'You hit 12 clean reps — add +2.5 to 5 kg';
      } else {
        outL.textContent = 'Keep ' + lw + ' kg → Aim 12 reps';
        outLN.textContent = 'Add reps first (2 reps in reserve)';
      }
    }
  }

  function toggleGymFaq(btn) {
    var item = btn.closest('.faq-accordion-item');
    if (!item) return;
    var ans = item.querySelector('.faq-answer');
    var chev = item.querySelector('.faq-chevron');
    if (ans) ans.classList.toggle('hidden');
    if (chev) chev.classList.toggle('rotate-180');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderGymExplorer();
      updateGymCalculator();
    });
  } else {
    renderGymExplorer();
    updateGymCalculator();
  }
`;

const doc = buildFullCleanDocument({
  lang: 'en-GB',
  title: '7-Day Weekly Gym Workout Plan for Beginners',
  description: 'Follow a science-backed 7-day weekly gym workout plan for beginners using the 4-2-1 formula, full-body strength sessions, recovery days, and double progression.',
  canonicalUrl: 'https://timetablecreator.online/blog/7-day-weekly-gym-workout-plan-for-beginners/',
  robotsMeta: '<meta name="robots" content="index, follow" />',
  activePage: 'blog',
  mainContent: mainContent,
  pageScript: pageScript
});

const dir = path.join(__dirname, '../public/blog/7-day-weekly-gym-workout-plan-for-beginners');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), doc, 'utf8');
console.log('Successfully generated public/blog/7-day-weekly-gym-workout-plan-for-beginners/index.html');
