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
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    res.sendFile(filePath);
  });

  // Admin Panel route
  anonymityApp.get(["/admin-panel", "/admin-panel/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    res.sendFile(filePath);
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
      { id: '1', title: 'How to Make a Perfect School Timetable in 2026', slug: 'how-to-make-a-perfect-school-timetable-in-2026-step-by-step-guide-for-students-parents-teachers', category: 'Timetable Guide', status: 'Published', updatedAt: '2026-02-15', content: 'Comprehensive guide for students and teachers on structuring weekly academic timetables.' },
      { id: '2', title: 'Daily Routine for Class 10 Student at Home', slug: 'daily-routine-for-class-10-student-at-home', category: 'Student Routines', status: 'Published', updatedAt: '2026-02-14', content: 'Optimized daily schedule for class 10 board exam preparation.' },
      { id: '3', title: 'Study Timetable for Class 10', slug: 'study-timetable-for-class-10', category: 'Study Plans', status: 'Published', updatedAt: '2026-02-10', content: 'Subject-wise study schedule and balanced revision timetable.' },
      { id: '4', title: 'How Does an Automatic Timetable Creator Work', slug: 'how-does-an-automatic-timetable-creator-work', category: 'Technology', status: 'Published', updatedAt: '2026-01-20', content: 'Exploring algorithm-driven timetable scheduling tools.' },
      { id: '5', title: 'About Us', slug: 'about-us', category: 'Pages', status: 'Published', updatedAt: '2026-01-01', content: 'Learn about TimetableCreator.online mission and tools.' },
      { id: '6', title: 'Contact Us', slug: 'contact-us', category: 'Pages', status: 'Published', updatedAt: '2026-01-01', content: 'Get in touch with our support team.' },
      { id: '7', title: 'Privacy Policy', slug: 'privacy-policy', category: 'Legal', status: 'Published', updatedAt: '2026-01-01', content: 'Privacy policy and data protection terms.' },
      { id: '8', title: 'Terms and Conditions', slug: 'terms-and-conditions', category: 'Legal', status: 'Published', updatedAt: '2026-01-01', content: 'Terms of service for using TimetableCreator.online.' },
      { id: '9', title: 'Disclaimer', slug: 'disclaimer', category: 'Legal', status: 'Published', updatedAt: '2026-01-01', content: 'Website disclaimer and educational use notices.' },
      { id: '10', title: 'Refund Policy', slug: 'refund-policy', category: 'Legal', status: 'Published', updatedAt: '2026-01-01', content: 'Refund and cancellation policy details.' }
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
      const { title, slug, category, status, content } = req.body;
      const posts = readPostsDb();
      const newPost = {
        id: Date.now().toString(),
        title: title || 'Untitled Post',
        slug: slug || title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'untitled',
        category: category || 'General',
        status: status || 'Published',
        updatedAt: new Date().toISOString().split('T')[0],
        content: content || ''
      };
      posts.unshift(newPost);
      writePostsDb(posts);
      res.json({ success: true, post: newPost });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  anonymityApp.put("/api/admin/posts/:id", (req, res) => {
    try {
      const { id } = req.params;
      const { title, slug, category, status, content } = req.body;
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
        status: status !== undefined ? status : posts[idx].status,
        content: content !== undefined ? content : posts[idx].content,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      writePostsDb(posts);
      res.json({ success: true, post: posts[idx] });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  anonymityApp.delete("/api/admin/posts/:id", (req, res) => {
    try {
      const { id } = req.params;
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
