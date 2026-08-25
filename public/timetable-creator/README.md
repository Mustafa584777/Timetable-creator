# Extra Timetable Creator Tools

This folder is designated for creating and organizing additional specialized timetable creator tools.

## Clean URL Behavior
Any tool placed in `timetable-creator/<tool-name>/index.html` or `public/timetable-creator/<tool-name>/index.html` can be accessed directly via its clean URL without showing the folder name:

- Target URL: `https://timetablecreator.online/<tool-name>/`
- Example: `https://timetablecreator.online/timetable-generator-online-for-students/`
- Example: `https://timetablecreator.online/exam-timetable-generator/`
- Example: `https://timetablecreator.online/teacher-timetable-maker/`

The server and Vercel routing will automatically map direct requests to the respective tool.
