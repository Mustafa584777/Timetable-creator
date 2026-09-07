import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import postsHandler from "./api/admin/posts";

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

  anonymityApp.all("/api/admin/posts", (req, res) => {
    return postsHandler(req, res);
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

  // Serve all static files in public folder without auto directory index/redirect so custom i18n route handlers take precedence
  anonymityApp.use(express.static(path.join(process.cwd(), "public"), { redirect: false, index: false }));

  const SUPPORTED_LANG_CODES = ['en', 'en-GB', 'es', 'fr', 'de', 'it', 'pt', 'hi', 'ru', 'ar', 'zh'];
  const BASE_DOMAIN = 'https://timetablecreator.online';

  function generateI18nHreflangs(baseCanonicalUrl: string): string {
    const urlPrefix = baseCanonicalUrl.replace(/\/+$/, '');
    return [
      `<link rel="canonical" href="${baseCanonicalUrl}" />`,
      `<link rel="alternate" hreflang="x-default" href="${baseCanonicalUrl}" />`,
      `<link rel="alternate" hreflang="en" href="${urlPrefix}/en" />`,
      `<link rel="alternate" hreflang="en-GB" href="${urlPrefix}/en-GB" />`,
      `<link rel="alternate" hreflang="es" href="${urlPrefix}/es" />`,
      `<link rel="alternate" hreflang="fr" href="${urlPrefix}/fr" />`,
      `<link rel="alternate" hreflang="de" href="${urlPrefix}/de" />`,
      `<link rel="alternate" hreflang="it" href="${urlPrefix}/it" />`,
      `<link rel="alternate" hreflang="pt" href="${urlPrefix}/pt" />`,
      `<link rel="alternate" hreflang="hi" href="${urlPrefix}/hi" />`,
      `<link rel="alternate" hreflang="ru" href="${urlPrefix}/ru" />`,
      `<link rel="alternate" hreflang="ar" href="${urlPrefix}/ar" />`,
      `<link rel="alternate" hreflang="zh" href="${urlPrefix}/zh" />`
    ].join('\n    ');
  }

  function serveI18nHtml(req: express.Request, res: express.Response, filePath: string, basePath: string, lang: string | null) {
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), "index.html");
    }
    let html = fs.readFileSync(filePath, "utf8");

    // Base canonical url is without language suffix
    const baseCanonicalUrl = basePath ? `${BASE_DOMAIN}${basePath}/` : `${BASE_DOMAIN}/`;
    const activeCanonicalUrl = (lang && lang !== 'en' && lang !== 'x-default') 
      ? `${BASE_DOMAIN}${basePath}/${lang}`
      : baseCanonicalUrl;

    // Update <html lang="...">
    if (lang) {
      html = html.replace(/<html(\s+[^>]*?)lang="[^"]*"/i, `<html$1lang="${lang}"`);
    }

    // Replace canonical and hreflang block
    const hreflangBlock = generateI18nHreflangs(baseCanonicalUrl);
    const activeHreflangBlock = (lang && lang !== 'en')
      ? hreflangBlock.replace(`<link rel="canonical" href="${baseCanonicalUrl}" />`, `<link rel="canonical" href="${activeCanonicalUrl}" />`)
      : hreflangBlock;

    const headCanonicalRegex = /<link rel="canonical"[\s\S]*?(?=<link rel="preconnect"|<script|<style|<\!-- High Performance|<\!-- FAQPage|<\!-- Universal)/i;
    if (headCanonicalRegex.test(html)) {
      html = html.replace(headCanonicalRegex, activeHreflangBlock + '\n    ');
    }

    // If specific language is requested, set language cookie in response
    if (lang && lang !== 'en') {
      const transCode = lang === 'en-GB' ? 'en' : lang;
      res.cookie('googtrans', `/en/${transCode}`, { path: '/', sameSite: 'none', secure: true });
    } else if (lang === 'en') {
      res.cookie('googtrans', '/en/en', { path: '/', sameSite: 'none', secure: true });
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.send(html);
  }

  // Student Timetable Generator
  anonymityApp.get([
    "/timetable-generator-online-for-students",
    "/timetable-generator-online-for-students/",
    "/timetable-generator-online-for-students/:lang",
    "/timetable-generator-online-for-students/:lang/"
  ], (req, res) => {
    const lang = req.params.lang && SUPPORTED_LANG_CODES.includes(req.params.lang) ? req.params.lang : null;
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "timetable-generator-online-for-students", "index.html")
      : path.join(process.cwd(), "public", "timetable-generator-online-for-students", "index.html");
    return serveI18nHtml(req, res, filePath, "/timetable-generator-online-for-students", lang);
  });

  // General Timetable Generator
  anonymityApp.get([
    "/timetable-generator",
    "/timetable-generator/",
    "/timetable-generator/:lang",
    "/timetable-generator/:lang/"
  ], (req, res) => {
    const lang = req.params.lang && SUPPORTED_LANG_CODES.includes(req.params.lang) ? req.params.lang : null;
    const filePath = process.env.NODE_ENV === "production" 
      ? path.join(process.cwd(), "dist", "timetable-generator", "index.html")
      : path.join(process.cwd(), "public", "timetable-generator", "index.html");
    return serveI18nHtml(req, res, filePath, "/timetable-generator", lang);
  });

  // HTML Sitemap
  anonymityApp.get([
    "/html-sitemap",
    "/html-sitemap/",
    "/html-sitemap/:lang",
    "/html-sitemap/:lang/",
    "/sitemap.html"
  ], (req, res) => {
    const lang = req.params.lang && SUPPORTED_LANG_CODES.includes(req.params.lang) ? req.params.lang : null;
    const filePath = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "html-sitemap", "index.html")
      : path.join(process.cwd(), "public", "html-sitemap", "index.html");
    return serveI18nHtml(req, res, filePath, "/html-sitemap", lang);
  });

  // Universal Blog route handler with language URLs
  anonymityApp.get([
    "/blog",
    "/blog/",
    "/blog/:p1",
    "/blog/:p1/",
    "/blog/:p1/:p2",
    "/blog/:p1/:p2/"
  ], (req, res, next) => {
    const p1 = req.params.p1;
    const p2 = req.params.p2;

    // Check if p1 is a language code (e.g. /blog/fr)
    if (p1 && SUPPORTED_LANG_CODES.includes(p1) && !p2) {
      const blogIndexPath = process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist", "blog", "index.html")
        : path.join(process.cwd(), "public", "blog", "index.html");
      return serveI18nHtml(req, res, blogIndexPath, "/blog", p1);
    }

    // Base blog index: /blog
    if (!p1) {
      const blogIndexPath = process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist", "blog", "index.html")
        : path.join(process.cwd(), "public", "blog", "index.html");
      return serveI18nHtml(req, res, blogIndexPath, "/blog", null);
    }

    // Otherwise p1 is a blog article slug (e.g. /blog/study-timetable-for-class-10)
    const slug = p1;
    const lang = p2 && SUPPORTED_LANG_CODES.includes(p2) ? p2 : null;
    const blogPostPath = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "blog", slug, "index.html")
      : path.join(process.cwd(), "public", "blog", slug, "index.html");

    if (fs.existsSync(blogPostPath)) {
      return serveI18nHtml(req, res, blogPostPath, `/blog/${slug}`, lang);
    }
    next();
  });

  // Homepage Language URLs (e.g. /en, /en-GB, /fr, /es, etc.)
  anonymityApp.get(
    SUPPORTED_LANG_CODES.flatMap(code => [`/${code}`, `/${code}/`]),
    (req, res) => {
      const lang = req.path.replace(/^\/|\/$/g, '');
      const rootIndex = process.env.NODE_ENV === "production"
        ? path.join(process.cwd(), "dist", "index.html")
        : path.join(process.cwd(), "index.html");
      return serveI18nHtml(req, res, rootIndex, "", lang);
    }
  );

  // Root Homepage
  anonymityApp.get("/", (req, res, next) => {
    const rootIndex = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    if (fs.existsSync(rootIndex)) {
      return serveI18nHtml(req, res, rootIndex, "", null);
    }
    next();
  });

  // Dynamic route for any custom timetable creator tool without timetable-creator/ folder in URL
  anonymityApp.get(["/:toolSlug", "/:toolSlug/", "/:toolSlug/:lang", "/:toolSlug/:lang/"], (req, res, next) => {
    const toolSlug = req.params.toolSlug;
    const lang = req.params.lang && SUPPORTED_LANG_CODES.includes(req.params.lang) ? req.params.lang : null;

    if (
      toolSlug.startsWith("api") ||
      toolSlug.startsWith("blog") ||
      toolSlug.startsWith("@") ||
      toolSlug.startsWith("src") ||
      toolSlug.includes(".") ||
      SUPPORTED_LANG_CODES.includes(toolSlug)
    ) {
      return next();
    }
    const publicToolPath = path.join(process.cwd(), "public", toolSlug, "index.html");
    const publicSubToolPath = path.join(process.cwd(), "public", "timetable-creator", toolSlug, "index.html");
    const distToolPath = path.join(process.cwd(), "dist", "timetable-creator", toolSlug, "index.html");
    const rootToolPath = path.join(process.cwd(), "timetable-creator", toolSlug, "index.html");

    if (fs.existsSync(distToolPath) && process.env.NODE_ENV === "production") {
      return serveI18nHtml(req, res, distToolPath, `/${toolSlug}`, lang);
    }
    if (fs.existsSync(publicToolPath)) {
      return serveI18nHtml(req, res, publicToolPath, `/${toolSlug}`, lang);
    }
    if (fs.existsSync(publicSubToolPath)) {
      return serveI18nHtml(req, res, publicSubToolPath, `/${toolSlug}`, lang);
    }
    if (fs.existsSync(rootToolPath)) {
      return serveI18nHtml(req, res, rootToolPath, `/${toolSlug}`, lang);
    }
    // Fall back to main SPA index.html so it never 404s
    const rootIndex = process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "dist", "index.html")
      : path.join(process.cwd(), "index.html");
    return serveI18nHtml(req, res, rootIndex, `/${toolSlug}`, lang);
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
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
