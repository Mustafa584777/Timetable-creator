import { setCorsHeaders } from "../_cors";
import fs from "fs";
import path from "path";

const defaults = [
  { id: '17', title: 'How to Build a 50/10 & 25/5 Pomodoro Study Schedule That Actually Works', slug: 'how-to-build-a-50-10-and-25-5-pomodoro-study-schedule', category: 'Study Focus Guide', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-11-25', url: '/blog/how-to-build-a-50-10-and-25-5-pomodoro-study-schedule/', excerpt: 'Combine 50/10 deep work rounds and 25/5 revision sprints with the Warm-Up Rule, Mind Capture sheet, and hybrid Pomodoro schedule templates.', content: 'Full 50/10 & 25/5 Pomodoro study schedule guide...' },
  { id: '16', title: 'Best Study Timetable for Board Exam Students (6-Hour & 10-Hour Plans)', slug: 'best-study-timetable-for-board-exam-students', category: 'Board Exam Guide', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-11-25', url: '/blog/best-study-timetable-for-board-exam-students/', excerpt: 'Switch seamlessly between 6-hour school day and 10-hour study leave plans with stream splits, exam phases, and protected 7.5-hour sleep.', content: 'Full board exam study timetable guide with 6-hour and 10-hour plans...' },
  { id: '15', title: 'University Study Schedule for Working Students: Realistic Templates & Systems', slug: 'university-study-schedule-for-working-students', category: 'University Guide', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-11-23', url: '/blog/university-study-schedule-for-working-students/', excerpt: 'Balance work shifts, university lectures, and life with energy management, micro-study pockets, and realistic weekly study templates.', content: 'Full university study schedule guide for working students...' },
  { id: '14', title: 'Free College Class Schedule Template & How to Organize Your Lectures', slug: 'free-college-class-schedule-template-and-how-to-organize-your-lectures', category: 'College Guide', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-11-19', url: '/blog/free-college-class-schedule-template-and-how-to-organize-your-lectures/', excerpt: 'Download free college class schedule templates (PDF, Sheets, Notion, wallpaper) and master campus gap hours.', content: 'Full college class schedule guide...' },
  { id: '13', title: 'How to Time Block Your Day: Step-by-Step Guide & Free Weekly Template', slug: 'how-to-time-block-your-day', category: 'Productivity Guide', author: 'Prof. Sarah Lin', readTime: '11 Min Read', status: 'Published', updatedAt: '2026-11-19', url: '/blog/how-to-time-block-your-day/', excerpt: 'Turn endless to-do lists into protected blocks of deep work, communication, and buffers with a 6-step guide and weekly time blocking templates.', content: 'Full step-by-step guide to time blocking your day...' },
  { id: '0', title: 'Best Daily Routine Timetable for Students: Science-Backed Schedules That Stick', slug: 'best-daily-routine-timetable-for-students', category: 'Student Guide', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-11-18', url: '/blog/best-daily-routine-timetable-for-students/', excerpt: 'A science-backed daily routine timetable for students aligning schedules with natural ultradian energy cycles, protecting sleep, and building sustainable habits.', content: 'Full science-backed guide to student daily routines...' },
  { id: '1', title: 'Best Study Timetable for Class 10: Expert Daily Routine', slug: 'study-timetable-for-class-10', category: 'Expert Guide', author: 'Prof. Sarah Lin', readTime: '10 Min Read', status: 'Published', updatedAt: '2026-03-28', url: '/blog/study-timetable-for-class-10/', excerpt: 'Unlock a scientifically structured routine leveraging Active Recall and the Pomodoro method to master board preparations while preserving physical well-being.', content: 'Comprehensive guide for Class 10 board exam preparation...' },
  { id: '2', title: 'How to Make a Perfect School Timetable in 2026: Students, Parents & Teachers', slug: 'how-to-make-a-perfect-school-timetable-in-2026-step-by-step-guide-for-students-parents-teachers', category: 'Strategic Blueprint', author: 'Prof. Sarah Lin', readTime: '12 Min Read', status: 'Published', updatedAt: '2026-03-25', url: '/blog/how-to-make-a-perfect-school-timetable-in-2026-step-by-step-guide-for-students-parents-teachers/', excerpt: 'Unlock the science-backed guide to class schedules, circadian peaks, extracurricular activities, and lesson sequencing tailored to the modern 2026 academic year.', content: 'Detailed blueprint for class schedules...' },
  { id: '3', title: 'The Ultimate Daily Routine for a Class 10 Student Studying at Home', slug: 'daily-routine-for-class-10-student-at-home', category: 'Exam Prep', author: 'Prof. Sarah Lin', readTime: '10 Min Read', status: 'Published', updatedAt: '2026-03-20', url: '/blog/daily-routine-for-class-10-student-at-home/', excerpt: 'A comprehensive daily routine designed for studying Class 10 board exams from home. Balance active recall blocks, hydration, physical activities, and visual planning formats.', content: 'Step-by-step daily routine for home study...' },
  { id: '4', title: 'How Does an Automatic Timetable Creator Work? Behind the Scenes', slug: 'how-does-an-automatic-timetable-creator-work', category: 'EdTech Science', author: 'Prof. Sarah Lin', readTime: '11 Min Read', status: 'Published', updatedAt: '2026-03-15', url: '/blog/how-does-an-automatic-timetable-creator-work/', excerpt: 'Step inside the computer science of modern timetable scheduling. Discover how Constraint Satisfaction Problems, backtracking, and genetic algorithms prevent overlapping blocks.', content: 'Algorithm details and scheduling math...' },
  { id: '5', title: 'The Ultimate Timetable Guide: Frameworks for Academic & Personal Scheduling', slug: 'timetable-guides', category: 'Strategic Blueprint', author: 'Prof. Sarah Lin', readTime: '15 Min Read', status: 'Published', updatedAt: '2026-03-10', url: '/blog/timetable-guides/', excerpt: 'Master your daily schedule with scientific scheduling models. Learn how to sequence lessons, allocate rest, and run custom time-blocking rules for school and home.', content: 'Scheduling frameworks...' },
  { id: '6', title: 'Student Timetable Generator Online', slug: 'timetable-generator-online-for-students', category: 'Interactive Tool', author: 'Timetable Creator Team', readTime: 'Tool Page', status: 'Published', updatedAt: '2026-03-29', url: '/timetable-generator-online-for-students/', excerpt: 'Interactive timetable maker tool with drag-and-drop course scheduler, customizable start/end times, PDF export, and shareable links.', content: 'Student Timetable Generator application page...' },
  { id: '7', title: 'About Us', slug: 'about-us', category: 'Company Page', author: 'Editorial Team', readTime: '3 Min Read', status: 'Published', updatedAt: '2026-01-15', url: '/blog/about-us/', excerpt: 'Online Timetable Creator is a high-performance web scheduling application built to organize classes, routines, and exams with ease.', content: 'About TimetableCreator.online mission and team...' },
  { id: '8', title: 'Customer Support & Contact Us', slug: 'contact-us', category: 'Company Page', author: 'Support Team', readTime: '2 Min Read', status: 'Published', updatedAt: '2026-01-15', url: '/blog/contact-us/', excerpt: 'Get in touch with our customer support team for inquiries, bug reports, and timetable templates.', content: 'Contact information and support channels...' },
  { id: '9', title: 'Privacy Policy', slug: 'privacy-policy', category: 'Legal', author: 'Legal Team', readTime: '5 Min Read', status: 'Published', updatedAt: '2026-01-10', url: '/blog/privacy-policy/', excerpt: 'Privacy policy and data protection terms for TimetableCreator.online users.', content: 'Full privacy policy terms...' },
  { id: '10', title: 'Terms and Conditions', slug: 'terms-and-conditions', category: 'Legal', author: 'Legal Team', readTime: '5 Min Read', status: 'Published', updatedAt: '2026-01-10', url: '/blog/terms-and-conditions/', excerpt: 'Terms of service and acceptable usage guidelines for TimetableCreator.online.', content: 'Full terms of service...' },
  { id: '11', title: 'Refund Policy', slug: 'refund-policy', category: 'Legal', author: 'Billing Team', readTime: '3 Min Read', status: 'Published', updatedAt: '2026-01-10', url: '/blog/refund-policy/', excerpt: 'Details on our free tier, subscriptions, and refund conditions.', content: 'Full refund policy...' },
  { id: '12', title: 'Disclaimer Notice', slug: 'disclaimer', category: 'Legal', author: 'Legal Team', readTime: '3 Min Read', status: 'Published', updatedAt: '2026-01-10', url: '/blog/disclaimer/', excerpt: 'Educational disclaimer notice and liability limits.', content: 'Disclaimer terms...' }
];

function triggerSitemapUpdate() {
  try {
    const { updateSitemapFile } = require(path.join(process.cwd(), "scripts", "sitemap_generator.cjs"));
    updateSitemapFile();
  } catch (err) {
    console.error("Failed to update sitemap:", err);
  }
}

let inMemoryPosts = [...defaults];

export default function handler(req: any, res: any) {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({ success: true, posts: inMemoryPosts });
  }

  if (req.method === "POST") {
    const { title, slug, category, author, readTime, status, excerpt, content } = req.body || {};
    const newPost = {
      id: Date.now().toString(),
      title: title || 'Untitled Post',
      slug: slug || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
      category: category || 'Expert Guide',
      author: author || 'Editorial Team',
      readTime: readTime || '5 Min Read',
      status: status || 'Published',
      updatedAt: new Date().toISOString().split('T')[0],
      url: `/blog/${slug || 'post'}/`,
      excerpt: excerpt || '',
      content: content || ''
    };
    inMemoryPosts.unshift(newPost);
    triggerSitemapUpdate();
    return res.status(200).json({ success: true, post: newPost });
  }

  if (req.method === "PUT") {
    const { id, title, slug, category, author, readTime, status, excerpt, content } = req.body || {};
    const idx = inMemoryPosts.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    inMemoryPosts[idx] = {
      ...inMemoryPosts[idx],
      title: title !== undefined ? title : inMemoryPosts[idx].title,
      slug: slug !== undefined ? slug : inMemoryPosts[idx].slug,
      category: category !== undefined ? category : inMemoryPosts[idx].category,
      author: author !== undefined ? author : inMemoryPosts[idx].author,
      readTime: readTime !== undefined ? readTime : inMemoryPosts[idx].readTime,
      status: status !== undefined ? status : inMemoryPosts[idx].status,
      excerpt: excerpt !== undefined ? excerpt : inMemoryPosts[idx].excerpt,
      content: content !== undefined ? content : inMemoryPosts[idx].content,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    triggerSitemapUpdate();
    return res.status(200).json({ success: true, post: inMemoryPosts[idx] });
  }

  if (req.method === "DELETE") {
    const { id } = req.query || req.body || {};
    inMemoryPosts = inMemoryPosts.filter(p => p.id !== id);
    triggerSitemapUpdate();
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
