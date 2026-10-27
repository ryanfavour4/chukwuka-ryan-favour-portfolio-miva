# CSC 106 Term Project — Report Guide

**For:** Ryan Favour — COS 106, "Design and Develop a Responsive Student
Portfolio and Academic Management Website" (20 marks, due Sun 15 Nov 2026,
11:59 PM).
**What this is:** A guide to writing the PDF report that goes with your
submission (hosted link + GitHub repo link + report). You write the report in
your own words — this tells you exactly what goes where, using facts from
your actual site, so you never face a blank page.
**Important note:** The project brief itself only names the hosted link and
the GitHub repo link as deliverables; it does not spell out report sections.
So this report mirrors the brief section by section — that way the lecturer
can tick off every requirement as they read. If your LMS submission page
names a specific report format, that wins: send me its wording and I will
reshape this guide to match it.

---

## Cover page (fill in, then move on)

- Project title: Design and Develop a Responsive Student Portfolio and
  Academic Management Website
- Name: Chukwuka Ryan Favour
- Course: COS 106 — Introduction to Web Technologies
- Email: f.chukwuka6882@miva.edu.ng
- Department: [as it appears on your Miva record]
- Matriculation number: [fill in — do not guess this]
- Hosted link: https://mativa-adav2-miva.vercel.app/
- GitHub repository link: [fill in once the repo is pushed]
- Date: [submission date]

## Section 1 — Introduction (about half a page)

Say what the site is and who it is for, in plain words. Sentence starters you
can adapt (rewrite them in your own voice, don't copy word for word):

- "This project is a personal academic portfolio and student management
  website built for a university student."
- "It showcases my profile, skills, academic background and projects, and
  includes an academic planner for managing study tasks."
- "The website is built with plain HTML, CSS and JavaScript — no frameworks
  or libraries — and is hosted on Vercel."

## Section 2 — Objectives

List what the project set out to do, straight from the brief:

1. Build a multi-page personal portfolio (Home, About, Projects, Planner,
   Contact).
2. Present my profile, education, skills, interests and real projects.
3. Build an interactive academic planner (add, complete, delete tasks).
4. Build a validated contact form (name, email, phone, message).
5. Demonstrate semantic HTML, external CSS (responsive, Flexbox/Grid,
   animations, consistent colours) and JavaScript (events, DOM, arrays,
   functions).

## Section 3 — Tools and technologies

A short table or list. Facts about your build:

- HTML5, CSS3, JavaScript — plain, no libraries, no frameworks, no build step.
- One external stylesheet: `css/style.css` (the theme is set in variables at
  the top of that file).
- One shared JavaScript file: `js/script.js` (navigation, planner, contact
  validation, project views).
- Folder structure: `index.html` at root; `html/` (about, projects, planner,
  contact); `css/`; `js/`; `images/`; `audio/`.
- Hosting: Vercel. Code: GitHub (link on the cover page).
- Colour scheme: purple from my logo — primary `#A64DA8`, deep purple
  `#7A2E7C`, light lavender `#F5EAF6`, gold accent `#C6C26C`.

## Section 4 — Website structure (site map)

Describe each page in 2–3 lines:

1. **Home (`/`)** — name and photo/logo, welcome message, navigation, brief
   biography, project highlights, study-music audio player.
2. **About (`/html/about.html`)** — story, educational background, career
   aspirations, skill tags, education table, hobbies, academic interests.
3. **Projects (`/html/projects.html`)** — six real projects, each with a
   description, an image and a link: Zangapay, Sumpay, Geo Map App
   (in progress, demo on request), MyItura, Krowdfi, React-Validator Library.
4. **Academic Planner (`/html/planner.html`)** — add a task, choose a
   category (Assignment, Revision, Examination, Personal), mark tasks
   complete, delete tasks, filter (All / To do / Completed), progress count.
5. **Contact (`/html/contact.html`)** — form with full name, email address,
   phone number and message; a note states it is a practice form and no
   messages are sent or saved.

## Section 5 — How the requirements are met (the most important section)

This is the section that earns marks: a table matching every brief
requirement to where it lives on your site. Copy this table and check each
row against your own pages before submitting.

| Brief requirement | Where it is on my site |
|---|---|
| Homepage: name, photo, welcome, nav, bio, professional layout | Home page — name, logo/photo, welcome message, nav menu, bio, project highlights |
| About: education, aspirations, skills, hobbies | About page — story, education table, career goal, 19 skill tags, hobbies, interests |
| Projects: 3+ with description, image, link | Projects page — 6 projects, each with description, image and link |
| Planner: add, complete, delete (JavaScript) | Planner page — add task, checkbox to complete, delete button, filters, progress % |
| Contact: name, email, phone, message + validation | Contact page — all four fields, all required |
| Validation: no empty field | Empty form shows "Please fill in this field." on each field |
| Validation: valid email format | Bad email shows "Please enter a valid email address." |
| Validation: phone digits only | Letters in phone show "Use digits only, without spaces or symbols." |
| Semantic HTML | Header, nav, main, section, footer elements used across pages |
| Forms | Contact form; planner add-task form |
| Tables | Education table on the About page |
| Images | Logo, hero image, six project images |
| Hyperlinks | Navbar on all pages; project links; "Get in touch" links |
| Lists | Skill tags, hobbies, interests, task lists |
| Multimedia (video or audio) | Study-music audio player on the Home page |
| External stylesheet | `css/style.css`, linked from every page |
| Responsive design | Layout adapts to phone-sized screens (Flexbox/Grid) |
| Flexbox and/or Grid | Used for the page and card layouts |
| Navigation styling | Styled navbar on all five pages, with hover states |
| Animations/transitions | Hover effects and transitions on cards, buttons and nav |
| Consistent colour scheme | Purple theme (`#A64DA8`, `#7A2E7C`, `#F5EAF6`, gold `#C6C26C`) on all pages |
| Mobile-friendly | Checked on phone-sized screens |
| Event handling | Clicks, form submits, checkbox changes |
| DOM manipulation | Tasks added/removed and progress updated without reloading |
| Form validation | Contact form (see the three rules above) |
| Dynamic content updates | Planner counts and progress update as tasks change |
| Arrays and functions | Task list held as an array; `addTask()`, `completeTask()`, `deleteTask()` in `js/script.js` |
| Interactive task management | The planner itself |

## Section 6 — Challenges faced and how I solved them

Write 2–3 short paragraphs, one per challenge. Real ones from your build:

1. **Broken Home link.** The navbar Home link used the relative path
   `index.html`. It worked from the homepage but broke on every sub-page,
   resolving to `/html/index.html`, which returned a 404. I fixed it by
   changing the link (and the header logo link, which shared it) to `/` on
   all five pages, then clicked Home and the logo from every page to confirm
   all ten clicks land on the homepage. The other nav links already used
   root-relative `/html/...` paths and needed no change.
2. **Replacing all the previous content without breaking the structure.**
   The site started as another student's template. I replaced every name,
   bio, project and table row with my own real details while keeping the
   folder structure, file names, plain HTML/CSS/JS approach and coding style
   unchanged.
3. **Keeping one consistent theme.** I sampled the purple and gold directly
   from my own logo and set them as variables at the top of `css/style.css`,
   so every page shares the same colours instead of each page drifting.

## Section 7 — Testing

Short paragraph or list of what was tested and the result (all tested live
on 27 Oct 2026):

- Clicked the Home link and the logo from all five pages — all land on the
  homepage, no 404.
- Planner: added a task (count went 0 → 1), marked it complete (progress
  0% → 100%, text struck through), deleted it (back to 0 tasks, 0%).
- Contact: empty form rejected on all four fields; bad email rejected;
  letters in the phone field rejected; in each case the page did not navigate
  and nothing was sent.
- Checked all five pages for leftover content from the previous owner —
  none found in visible text, including footers.
- Viewed the site at phone size — layout adapts.

## Section 8 — Conclusion and future improvements

Two short paragraphs:

- Conclusion: the site meets the brief — five pages, six real projects, a
  working planner, a validated contact form, responsive purple-themed design
  in plain HTML/CSS/JS, hosted with the code on GitHub.
- Future improvements (honest, not claims about what exists): replace the
  SVG project placeholder images with real screenshots; make planner tasks
  persist after reload; add a working backend so the contact form can
  actually send messages; rename the Vercel project so the URL no longer
  carries the old template name.

## Before you submit — checklist

- [ ] Cover page filled in (matric number, department, GitHub link, date).
- [ ] Every row of the Section 5 table checked against your live pages.
- [ ] Report written in your own words throughout.
- [ ] Exported to PDF.
- [ ] Submitted with the hosted link and the GitHub repo link, before
      Sun 15 Nov 2026, 11:59 PM.
- [ ] If the LMS submission page asks for anything this guide doesn't cover,
      send me its wording first and I will reshape the guide.
