import { setCorsHeaders } from "../_cors";
import fs from "fs";
import path from "path";

const defaults = [
  { id: '1', title: 'Best Study Timetable for Class 10: Expert Daily Routine', slug: 'study-timetable-for-class-10', category: 'Expert Guide', author: 'Dr. Anand Verma', readTime: '10 Min Read', status: 'Published', updatedAt: '2026-03-28', url: '/blog/study-timetable-for-class-10/', excerpt: 'Unlock a scientifically structured routine leveraging Active Recall and the Pomodoro method to master board preparations while preserving physical well-being.', content: 'Comprehensive guide for Class 10 board exam preparation...' },
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
    return res.status(200).json({ success: true, post: inMemoryPosts[idx] });
  }

  if (req.method === "DELETE") {
    const { id } = req.query || req.body || {};
    inMemoryPosts = inMemoryPosts.filter(p => p.id !== id);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
