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

  // Serve all static files in public folder
  anonymityApp.use(express.static(path.join(process.cwd(), "public")));

  // Universal Blog route handler for all blog posts and blog index
  anonymityApp.get(["/blog", "/blog/", "/blog/:slug", "/blog/:slug/"], (req, res, next) => {
    const slug = req.params.slug;
    const blogRelativePath = slug ? path.join(slug, "index.html") : "index.html";
    const devBlogPath = path.join(process.cwd(), "public", "blog", blogRelativePath);
    const prodBlogPath = path.join(process.cwd(), "dist", "blog", blogRelativePath);

    if (process.env.NODE_ENV === "production" && fs.existsSync(prodBlogPath)) {
      return res.sendFile(prodBlogPath);
    }
    if (fs.existsSync(devBlogPath)) {
      return res.sendFile(devBlogPath);
    }
    next();
  });

  anonymityApp.get(["/timetable-generator-online-for-students", "/timetable-generator-online-for-students/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "timetable-generator-online-for-students", "index.html")
      : path.join(process.cwd(), "public", "timetable-generator-online-for-students", "index.html");
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    const rootIndex = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    if (fs.existsSync(rootIndex)) {
      return res.sendFile(rootIndex);
    }
    res.sendFile(path.join(process.cwd(), "index.html"));
  });

  anonymityApp.get(["/timetable-generator", "/timetable-generator/"], (req, res) => {
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "timetable-generator", "index.html")
      : path.join(process.cwd(), "public", "timetable-generator", "index.html");
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
    const rootIndex = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    if (fs.existsSync(rootIndex)) {
      return res.sendFile(rootIndex);
    }
    res.sendFile(path.join(process.cwd(), "index.html"));
  });

  // Dynamic route for any custom timetable creator tool without timetable-creator/ folder in URL
  anonymityApp.get(["/:toolSlug", "/:toolSlug/"], (req, res, next) => {
    const toolSlug = req.params.toolSlug;
    if (toolSlug.startsWith("api") || toolSlug.startsWith("blog") || toolSlug.includes(".")) {
      return next();
    }
    const publicToolPath = path.join(process.cwd(), "public", toolSlug, "index.html");
    const publicSubToolPath = path.join(process.cwd(), "public", "timetable-creator", toolSlug, "index.html");
    const distToolPath = path.join(process.cwd(), "dist", "timetable-creator", toolSlug, "index.html");
    const rootToolPath = path.join(process.cwd(), "timetable-creator", toolSlug, "index.html");

    if (fs.existsSync(distToolPath) && process.env.NODE_ENV === "production") {
      return res.sendFile(distToolPath);
    }
    if (fs.existsSync(publicToolPath)) {
      return res.sendFile(publicToolPath);
    }
    if (fs.existsSync(publicSubToolPath)) {
      return res.sendFile(publicSubToolPath);
    }
    if (fs.existsSync(rootToolPath)) {
      return res.sendFile(rootToolPath);
    }
    // Fall back to main SPA index.html so it never 404s
    const rootIndex = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    return res.sendFile(rootIndex);
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
  anonymityApp.post("/feature-request.php", upload.none() as any, (req, res) => {
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
