const fs = require("fs");
const path = require("path");

// 1. Fix duplicate SEO content sections in student timetable generator pages
function fixStudentDuplicates() {
  function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach(file => {
      let filePath = path.join(dir, file);
      let stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(filePath));
      } else if (file === "index.html") {
        results.push(filePath);
      }
    });
    return results;
  }

  let files = getFiles("public/timetable-generator-online-for-students");
  files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    let regex = /<div class="seo-content-section">/g;
    let match;
    let indices = [];
    while ((match = regex.exec(content)) !== null) {
      indices.push(match.index);
    }
    
    // If there are multiple seo-content-section blocks (e.g. 5: 1 student + 4 duplicate homepage sections)
    if (indices.length > 1) {
      // Keep everything up to the end of the first seo-content-section block,
      // and everything from the footer onwards.
      // The footer starts at <footer class="seo-footer">
      let footerIdx = content.indexOf("<footer class=\"seo-footer\">");
      if (footerIdx !== -1) {
        // The first seo-content-section starts at indices[0]
        // Let's find where the student seo section ends (or where the first duplicate starts, i.e., indices[1]).
        let firstSeoEnd = indices[1];
        let studentSeoContent = content.substring(indices[0], firstSeoEnd);
        let beforeFirstSeo = content.substring(0, indices[0]);
        let footerAndBeyond = content.substring(footerIdx);

        let newContent = beforeFirstSeo + studentSeoContent + footerAndBeyond;
        fs.writeFileSync(file, newContent, "utf8");
        console.log("Cleaned duplicates in:", file);
      }
    }
  });
}

// 2. Update header navigation across main pages to include all tools
function updateHeaders() {
  function getFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach(file => {
      let filePath = path.join(dir, file);
      let stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        results = results.concat(getFiles(filePath));
      } else if (file === "index.html") {
        results.push(filePath);
      }
    });
    return results;
  }

  // Also include root index.html
  let allHtmlFiles = ["index.html", ...getFiles("public/timetable-generator-online-for-students"), ...getFiles("public/study-timetable-creator"), ...getFiles("public/workout-timetable-creator"), ...getFiles("public/school-timetable-maker-for-teachers"), ...getFiles("public/revision-timetable-creator")];

  const standardNavLinksDesktop = `
            <a href="/" class="nav-link-header">Timetable Maker</a>
            <a href="/timetable-generator-online-for-students/" class="nav-link-header">Student Timetable</a>
            <a href="/study-timetable-creator/" class="nav-link-header">Study Timetable</a>
            <a href="/workout-timetable-creator/" class="nav-link-header">Workout Timetable</a>
            <a href="/school-timetable-maker-for-teachers/" class="nav-link-header">Teacher Timetable</a>
            <a href="/revision-timetable-creator/" class="nav-link-header">Revision Timetable</a>
  `.trim();

  allHtmlFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, "utf8");
    
    // Replace header-nav-desktop
    let navRegex = /<nav class="header-nav-desktop">[\s\S]*?<\/nav>/;
    if (navRegex.test(content)) {
      // Determine which link should be active based on file path
      let updatedNav = `<nav class="header-nav-desktop">` + standardNavLinksDesktop + `</nav>`;
      
      // Mark active link
      if (file.includes("study-timetable-creator")) {
        updatedNav = updatedNav.replace('href="/study-timetable-creator/" class="nav-link-header"', 'href="/study-timetable-creator/" class="nav-link-header active"');
      } else if (file.includes("workout-timetable-creator")) {
        updatedNav = updatedNav.replace('href="/workout-timetable-creator/" class="nav-link-header"', 'href="/workout-timetable-creator/" class="nav-link-header active"');
      } else if (file.includes("school-timetable-maker-for-teachers")) {
        updatedNav = updatedNav.replace('href="/school-timetable-maker-for-teachers/" class="nav-link-header"', 'href="/school-timetable-maker-for-teachers/" class="nav-link-header active"');
      } else if (file.includes("revision-timetable-creator")) {
        updatedNav = updatedNav.replace('href="/revision-timetable-creator/" class="nav-link-header"', 'href="/revision-timetable-creator/" class="nav-link-header active"');
      } else if (file.includes("timetable-generator-online-for-students")) {
        updatedNav = updatedNav.replace('href="/timetable-generator-online-for-students/" class="nav-link-header"', 'href="/timetable-generator-online-for-students/" class="nav-link-header active"');
      } else if (file === "index.html") {
        updatedNav = updatedNav.replace('href="/" class="nav-link-header"', 'href="/" class="nav-link-header active"');
      }

      content = content.replace(navRegex, updatedNav);
      fs.writeFileSync(file, content, "utf8");
      console.log("Updated header nav in:", file);
    }
  });
}

fixStudentDuplicates();
updateHeaders();
console.log("All updates completed successfully!");
