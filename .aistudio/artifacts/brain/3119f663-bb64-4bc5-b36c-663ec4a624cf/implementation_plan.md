# Sync Homepage Header, Timetable Tool & Footer to Student Timetable Page

## Goal
Update `/public/timetable-generator-online-for-students/index.html` so it uses the exact upgraded **Header**, **Timetable Generator Workspace (HTML + CSS + JS)**, and **Footer** from the Homepage (`/index.html`), while keeping 100% of the Student page's existing **SEO `<head>` metadata** and **Student SEO Content Section** untouched.

## What Will Be Preserved (100% Untouched)
- **SEO `<head>` Tags:** Page `<title>`, `<meta name="description">`, `<link rel="canonical">`, `hreflang` tags, OpenGraph/Twitter tags, and JSON-LD Schema in `/public/timetable-generator-online-for-students/index.html`.
- **Student Content & Styling:**
  - The entire `<div class="seo-content-section">` containing *"Student Timetable Generator Online – Free Study & Class Schedule Maker"*, Academic Features Grid (`.student-features-grid`), 4-Step Guide (`.student-steps-grid`), Student FAQs (`.faq-list`), and `FAQPage` JSON-LD script.
  - All student-specific CSS rules for `.student-features-grid`, `.student-feature-card`, `.student-steps-grid`, `.student-step-card`, and `.faq-list`.

## What Will Be Updated (`public/timetable-generator-online-for-students/index.html`)
1. **Global Styles & Tool CSS:**
   - Replace the old tool/header/footer CSS with the upgraded CSS from `/index.html` (supporting the 3-card dashboard, collapsible left sidebar, floating `i` info tooltips, responsive Add Activity modal, inline Custom Fields, Add Time Slot button, 100% default zoom, and updated toolbar styling) while retaining the student content CSS classes.
2. **Global Header:**
   - Replace with the Homepage `<header class="global-header">`, keeping the `active` class on the **"Free Students Timetable Maker"** navigation link (`href="/timetable-generator-online-for-students/"`).
3. **Upgraded Timetable Workspace & Modals:**
   - Replace the old `#timetableCreatorClassicApp` markup and modals with the complete upgraded workspace from `/index.html` (including Left Sidebar, 3-Card Dashboard, Floating `i` Info Buttons + Tooltips, Add Time Slot button, responsive Add Activity modal with Custom Fields & Save button, Import before Export, Red Clear All button, and combined preset templates including *"College & Lab Schedule"*).
4. **Upgraded Timetable JavaScript Engine:**
   - Replace the old `<script>` block with the upgraded `app` script from `/index.html` (with support for all templates including `college`, floating tooltip handlers, inline custom field saving, and 100% zoom).
5. **Global Footer:**
   - Sync `<footer class="seo-footer">` with the Homepage footer right below the preserved Student SEO content section.
