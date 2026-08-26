import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const anonymityApp = express();
  const PORT = 3000;

  anonymityApp.use(express.json());
  const upload = multer();

  // Enable CORS for all domains
  anonymityApp.use((req, res, next) => {
    // 301 Redirect www to non-www
    const host = req.headers.host || "";
    if (host.startsWith("www.")) {
      const nonWwwHost = host.slice(4);
      return res.redirect(301, `https://${nonWwwHost}${req.originalUrl}`);
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
    );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Simple JSON-based database for shared timetables
  const dbFile = path.join(process.cwd(), 'timetables_db.json');
  function readDb() {
    if (fs.existsSync(dbFile)) {
      return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
    }
    return {};
  }
  function writeDb(data: any) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  }

  anonymityApp.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Explicitly serve sitemap.xml and robots.txt at the root level
  anonymityApp.get("/sitemap.xml", (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "sitemap.xml")
      : path.join(process.cwd(), "public", "sitemap.xml");
    res.sendFile(filePath);
  });

  anonymityApp.get("/robots.txt", (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "robots.txt")
      : path.join(process.cwd(), "public", "robots.txt");
    res.sendFile(filePath);
  });

  // Explicitly serve blog page subfolders
  anonymityApp.get(["/blog/terms-and-conditions", "/blog/terms-and-conditions/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "blog", "terms-and-conditions", "index.html")
      : path.join(process.cwd(), "public", "blog", "terms-and-conditions", "index.html");
    res.sendFile(filePath);
  });

  anonymityApp.get(["/blog/about-us", "/blog/about-us/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "blog", "about-us", "index.html")
      : path.join(process.cwd(), "public", "blog", "about-us", "index.html");
    res.sendFile(filePath);
  });

  anonymityApp.get(["/blog/disclaimer", "/blog/disclaimer/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "blog", "disclaimer", "index.html")
      : path.join(process.cwd(), "public", "blog", "disclaimer", "index.html");
    res.sendFile(filePath);
  });

  anonymityApp.get(["/blog/privacy-policy", "/blog/privacy-policy/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "blog", "privacy-policy", "index.html")
      : path.join(process.cwd(), "public", "blog", "privacy-policy", "index.html");
    res.sendFile(filePath);
  });

  anonymityApp.get(["/blog/contact-us", "/blog/contact-us/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "blog", "contact-us", "index.html")
      : path.join(process.cwd(), "public", "blog", "contact-us", "index.html");
    res.sendFile(filePath);
  });

  anonymityApp.get(["/timetable-generator-online-for-students", "/timetable-generator-online-for-students/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "timetable-creator", "timetable-generator-online-for-students", "index.html")
      : path.join(process.cwd(), "public", "timetable-creator", "timetable-generator-online-for-students", "index.html");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(process.env.NODE_ENV === "production" ? path.join(process.cwd(), "dist", "index.html") : path.join(process.cwd(), "index.html"));
    }
  });

  // Admin Panel route
  anonymityApp.get(["/admin-panel", "/admin-panel/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "admin-panel", "index.html")
      : path.join(process.cwd(), "public", "admin-panel", "index.html");
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(process.env.NODE_ENV === "production" ? path.join(process.cwd(), "dist", "index.html") : path.join(process.cwd(), "index.html"));
    }
  });

  // Dynamic route for any custom timetable creator tool without timetable-creator/ folder in URL
  anonymityApp.get(["/:toolSlug", "/:toolSlug/"], (req, res, next) => {
    const toolSlug = req.params.toolSlug;
    if (toolSlug.startsWith("api") || toolSlug.startsWith("blog") || toolSlug === "admin-panel" || toolSlug.includes(".")) {
      return next();
    }
    const publicToolPath = path.join(process.cwd(), "public", "timetable-creator", toolSlug, "index.html");
    const distToolPath = path.join(process.cwd(), "dist", "timetable-creator", toolSlug, "index.html");
    const rootToolPath = path.join(process.cwd(), "timetable-creator", toolSlug, "index.html");

    if (fs.existsSync(distToolPath) && process.env.NODE_ENV === "production") {
      return res.sendFile(distToolPath);
    }
    if (fs.existsSync(publicToolPath)) {
      return res.sendFile(publicToolPath);
    }
    if (fs.existsSync(rootToolPath)) {
      return res.sendFile(rootToolPath);
    }
    next();
  });

  // Posts DB API for Admin Panel
  const postsDbFile = path.join(process.cwd(), 'posts_db.json');
  function readPostsDb() {
    if (fs.existsSync(postsDbFile)) {
      try {
        return JSON.parse(fs.readFileSync(postsDbFile, 'utf8'));
      } catch (e) {
        // fallback
      }
    }
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
    fs.writeFileSync(postsDbFile, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  function writePostsDb(posts: any[]) {
    fs.writeFileSync(postsDbFile, JSON.stringify(posts, null, 2));
  }

  anonymityApp.get("/api/admin/posts", (req, res) => {
    try {
      const posts = readPostsDb();
      res.json({ success: true, posts });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  anonymityApp.post("/api/admin/posts", (req, res) => {
    try {
      const { title, slug, category, author, readTime, status, excerpt, content } = req.body;
      const posts = readPostsDb();
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
      posts.unshift(newPost);
      writePostsDb(posts);
      res.json({ success: true, post: newPost });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  anonymityApp.put(["/api/admin/posts/:id", "/api/admin/posts"], (req, res) => {
    try {
      const id = req.params.id || req.body?.id || req.query?.id;
      const { title, slug, category, author, readTime, status, excerpt, content } = req.body;
      const posts = readPostsDb();
      const idx = posts.findIndex((p: any) => p.id === id);
      if (idx === -1) {
        return res.status(404).json({ success: false, error: 'Post not found' });
      }
      posts[idx] = {
        ...posts[idx],
        title: title !== undefined ? title : posts[idx].title,
        slug: slug !== undefined ? slug : posts[idx].slug,
        category: category !== undefined ? category : posts[idx].category,
        author: author !== undefined ? author : posts[idx].author,
        readTime: readTime !== undefined ? readTime : posts[idx].readTime,
        status: status !== undefined ? status : posts[idx].status,
        excerpt: excerpt !== undefined ? excerpt : posts[idx].excerpt,
        content: content !== undefined ? content : posts[idx].content,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      writePostsDb(posts);
      res.json({ success: true, post: posts[idx] });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  anonymityApp.delete(["/api/admin/posts/:id", "/api/admin/posts"], (req, res) => {
    try {
      const id = req.params.id || req.query?.id || req.body?.id;
      let posts = readPostsDb();
      posts = posts.filter((p: any) => p.id !== id);
      writePostsDb(posts);
      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  // Handle api.php for saving/loading shared timetables
  anonymityApp.all("/api.php", (req, res) => {
    if (req.method === 'POST') {
      const body = req.body;
      if (body && body.action === 'save') {
        const id = Math.random().toString(36).substring(2, 10);
        const db = readDb();
        db[id] = body.data;
        writeDb(db);
        return res.json({ success: true, id });
      }
    } else if (req.method === 'GET') {
      const action = req.query.action;
      const id = req.query.id as string;
      if (action === 'load' && id) {
        const db = readDb();
        if (db[id]) {
          return res.json({ success: true, data: db[id] });
        } else {
          return res.json({ success: false, error: 'Not found' });
        }
      }
    }
    res.status(400).json({ success: false });
  });

  // Handle feature-request.php
  anonymityApp.post("/feature-request.php", upload.none(), (req, res) => {
    // Just mock success
    console.log('Feature request received:', req.body);
    res.json({ success: true });
  });

  // Handle AI Schedule Generation
  anonymityApp.post('/api/schedule/generate', async (req, res) => {
    try {
      const { prompt, config, currentEvents } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const daysCount = config?.daysCount || 7;
      const gridStartTime = config?.startTime || 480;
      const gridEndTime = config?.endTime || 1140;

      const response = await getAi().models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an expert academic schedule generator. Generate a list of weekly schedule events based on the user request.
User Prompt: "${prompt}"

Context rules:
- Day integers represent: 0 = Monday, 1 = Tuesday, 2 = Wednesday, 3 = Thursday, 4 = Friday, 5 = Saturday, 6 = Sunday. The max day integer allowed is ${daysCount - 1} based on daysCount limit.
- Start and end times are represented as minutes from midnight. E.g. 8:00 AM is 480, 9:00 AM is 540, 10:30 AM is 630.
- All times must fit inside the active grid boundary: ${gridStartTime} to ${gridEndTime} (minutes from midnight).
- Make sure end times are strictly greater than start times.
- Ensure events do not overlap with each other, nor with the existing schedule events unless necessary or requested.
- If currentEvents are provided, you can optionally integrate with them:
Current Schedule Events: ${JSON.stringify(currentEvents || [])}

Pick a color for each event from this standard list:
- #0d9488 (Teal/Mint)
- #10b981 (Emerald Green)
- #8b5cf6 (Violet)
- #f59e0b (Amber Orange)
- #ec4899 (Pink)
- #14b8a6 (Menthol Mint)
- #f87171 (Soft Coral Red)
- #64748b (Slate)`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Short title of the event" },
                subject: { type: Type.STRING, description: "Name of the subject" },
                teacher: { type: Type.STRING, description: "Teacher or instructor" },
                room: { type: Type.STRING, description: "Room number or name" },
                location: { type: Type.STRING, description: "Location details" },
                category: { type: Type.STRING, description: "e.g. Lecture, Meeting, Lab" },
                notes: { type: Type.STRING, description: "Brief notes" },
                day: { type: Type.INTEGER, description: "Day index (0 to " + (daysCount - 1) + ")" },
                startTime: { type: Type.INTEGER, description: "Start time in minutes from midnight" },
                endTime: { type: Type.INTEGER, description: "End time in minutes from midnight" },
                color: { type: Type.STRING, description: "One hex color string from the allowed list" },
              },
              required: ["title", "subject", "teacher", "room", "location", "category", "notes", "day", "startTime", "endTime", "color"],
            },
          },
        },
      });

      const result = JSON.parse(response.text?.trim() || "[]");
      res.json(result);
    } catch (error: any) {
      console.error("Generation error:", error);
      res.status(500).json({ error: error.message || "Failed to generate schedule events." });
    }
  });

  // Handle AI Event Autocomplete
  anonymityApp.post('/api/schedule/autocomplete', async (req, res) => {
    try {
      const { title, subject, teacher, room, category, notes } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }

      const response = await getAi().models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide realistic school or work schedule details based on the event title: "${title}".
If any details are already partially filled, preserve them or enhance them:
- subject: ${subject || ''}
- teacher: ${teacher || ''}
- room: ${room || ''}
- category: ${category || ''}
- notes: ${notes || ''}

Assign a professional color from these options:
- #0d9488 (Teal/Mint)
- #10b981 (Emerald Green)
- #8b5cf6 (Violet)
- #f59e0b (Amber Orange)
- #ec4899 (Pink)
- #14b8a6 (Menthol Mint)
- #f87171 (Soft Coral Red)
- #64748b (Slate)`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING, description: "Name of the academic subject or department" },
              teacher: { type: Type.STRING, description: "Teacher, instructor, or leader name" },
              room: { type: Type.STRING, description: "Room number or name, e.g. Lab 401" },
              category: { type: Type.STRING, description: "Type of event, e.g. Lecture, Lab, Seminar, Meeting" },
              notes: { type: Type.STRING, description: "Brief notes/description of what is covered" },
              color: { type: Type.STRING, description: "One hex color string from the allowed list" },
            },
            required: ["subject", "teacher", "room", "category", "notes", "color"],
          },
        },
      });

      const result = JSON.parse(response.text?.trim() || "{}");
      res.json(result);
    } catch (error: any) {
      console.error("Autocomplete error:", error);
      res.status(500).json({ error: error.message || "Failed to autocomplete schedule event." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true },
      appType: "spa",
    });
    anonymityApp.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    anonymityApp.use(express.static(distPath));
    anonymityApp.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  anonymityApp.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running successfully on http://localhost:${PORT}`);
  });
}

startServer();
