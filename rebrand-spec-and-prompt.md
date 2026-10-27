# CSC 106 Portfolio — Rebrand Spec + AI Prompt

**Site:** https://mativa-adav2-miva.vercel.app/ (plain HTML, CSS, JS — no libraries, no frameworks)
**Job:** Replace Adaora Okalu's content with Ryan Favour's, switch the theme to purple
from his logo, fix the navbar Home link — and keep the codebase's structure, file
layout and coding style exactly as they are.
**Status:** Final, 27 Oct 2026 — nav bug confirmed live by clicking. Ryan
authors/submits the assessed work; this is a spec + prompt, not a submission.

---

## 1. What the site looks like today (checked 27 Oct 2026, read-only)

| Page | URL | What is on it now |
|---|---|---|
| Home | `/` | Hero "LEARNING. BUILDING. BECOMING.", "Hi, I'm Adaora Okalu", Software Engineering Student, 3 project teasers, "More than just a student" bio, study-music audio player |
| About | `/html/about.html` | "Curiosity is where it starts", Adaora's story, skill bars (HTML 85%, CSS 75%, JS 60%, Problem Solving 80%), education table (Software Engineering, 100 Level, "My University"), hobbies, academic interests |
| Projects | `/html/projects.html?project=N` | 3 projects: MativaBuddy Website, Campus Food Guide, Student Result Calculator |
| Academic Planner | `/html/planner.html` | "My study tasks", 0 tasks, add-task input + Category field |
| Contact | `/html/contact.html` | Form with Full name, Email address, Phone number, Your message + "This is a practice form" note |

Rubric status of the current build (against the CSC 106 brief — 20 marks, due
Sun 15 Nov 2026, 11:59 PM; deliverables: hosted link + GitHub repo link + PDF report):
- Pages: all five required pages exist (Home, About, Projects 3+, Planner, Contact).
- Planner: exists — add/complete/delete logic confirmed in `js/script.js`
  (`addTask()`, `completeTask()` checkbox toggle, `deleteTask()` button,
  plus filters and progress counts); a live click-through is still the final
  check, since the inspection was read-only.
- Contact: all four fields exist (name, email, phone, message), all required
  — validation lives in `js/script.js`; live test still recommended.
- Table: present on About (education table) — keep it, just swap the rows.
- Multimedia: present on Home (study-music audio) — keep it.
- So this job is a **rebrand + fix**, not a rebuild.

## 2. Brand: purple from Ryan's logo

Sampled from the logo files Ryan supplied (27 Oct 2026):

- **Primary purple: `#A64DA8`** (the purple of the "RYAN FAVOUR" wordmark)
- **Deep purple (hover, headings, footer): `#7A2E7C`**
- **Light lavender tint (section backgrounds, cards): `#F5EAF6`**
- **Gold accent (sparingly — buttons hover, small highlights): `#C6C26C`**
  (the pale gold of the triangle that forms the "A" in RYAN)
- Text stays near-black on light backgrounds; white text on deep purple.
- Replace Adaora's colour scheme in the CSS variables with the four values above.
  Do not introduce a second accent colour.

**Logo usage:**
- Use Ryan's "RYAN FAVOUR" wordmark (transparent-background version — Ryan is
  removing the background himself) in the navbar and the footer.
- Make it **slightly bigger** than the current navbar logo, so it feels more
  unique — but keep it on one line and keep the navbar height sane on mobile.
- Favicon: the circular badge version of the logo (optional, nice touch).
- Hero portrait: Ryan's photo if he supplies one; otherwise the logo badge
  itself as the hero mark (do NOT reuse Adaora's portrait image).

## 3. Fix list — old content → Ryan's content

### 3.1 Navbar Home link — FIX (confirmed live 27 Oct 2026)
- Exact bug: the navbar "Home" link — and the header logo, which uses the
  same href — is the relative path `index.html` on every page. From the
  homepage it works (loads `/index.html`). From any sub-page it breaks:
  clicking Home on About resolves to `/html/index.html`, which returns a
  Vercel 404 ("This page doesn't exist"). Confirmed by clicking, 27 Oct 2026.
- Fix: change `index.html` to `/` in the navbar Home link AND the header
  logo link, on all five pages. (Using `/index.html` also works; `/` is
  cleaner.) The other navbar links already use root-relative `/html/...`
  paths and work from everywhere — leave them exactly as they are.
- Test after fixing: click Home and the logo from Home, About, Projects,
  Planner and Contact. All ten clicks must land on the homepage.

### 3.2 Every page — global swaps
- Site name/brand "Mativa" → **Ryan Favour**.
- Page titles: "Adaora Okalu — …" → "Ryan Favour — …" (keep the same
  title pattern, e.g. "About Ryan | Ryan Favour").
- Footer text, copyright line, any "Adaora" mention → Ryan Favour.
- Any portrait/illustration of Adaora → removed (see 2, logo/photo rule).

### 3.3 Home (`/`)
- Eyebrow line: "LEARNING. BUILDING. BECOMING." → **"BUILDING. SHIPPING. GROWING."**
- Headline: "Hi, I'm Adaora Okalu." → **"Hi, I'm Ryan Favour."**
- Role line: "Software Engineering Student" →
  **"Full-Stack Developer | Fintech, React & Node.js"**
- Sub-line: "Curious mind. Creative spirit. Future engineer." →
  **"Lagos-based developer. Fintech products, real users, production code."**
- Intro paragraph → **"I'm a full-stack developer with 6+ years building
  production web, backend and mobile apps — mostly in fintech: payments,
  wallets, trading systems. Frontend Developer at TechBeaver, previously
  Fullstack Dev Lead at Xplug, and a Computer Science student at Miva Open
  University."**
- Stat blocks: "03 Projects brought to life" → **"06 Projects on this page"**
  (see 3.5); "04 Academic interests" → keep the count, swap the interests
  (see 3.4); "01 Goal: become a great engineer" →
  **"01 Goal: ship fintech products used by millions."**
- "More than just a student" bio section → **"More than just a developer."**
  with: "I'm Ryan, a Lagos-based developer who also teaches web development,
  makes technical tutorial videos, and designs in Canva and Figma. I like
  building things people actually use — and explaining how they work."
- Keep the study-music audio player (it satisfies the multimedia requirement).

### 3.4 About (`/html/about.html`)
- Kicker: "THE PERSON BEHIND MATIVA" → **"THE PERSON BEHIND THE CODE"**
- Headline: "Curiosity is where it starts." → **"Curiosity is where it starts.
  Shipping is where it pays off."**
- Story → **"I'm Ryan Favour, a full-stack developer and Computer Science
  student at Miva Open University. I started building for the web in 2020 and
  have spent 6+ years shipping production products — payment systems, wallets,
  trading platforms and mobile apps. I enjoy turning a messy real-world
  problem into software that just works."**
- Educational background → **"BSc Computer Science (in progress, expected
  2028) at Miva Open University; Full-Stack Development Certificate, New
  Horizon Computer Institute (Feb 2022). Every project below is real work,
  not coursework."**
- Where I'm headed → **"My goal is to become a world-class fintech engineer
  and run a software agency — building payment and trading products for
  African markets and beyond, and teaching others to build too."**
- Skills: **replace the percentage bars with skill tag chips** (no invented
  proficiency scores). Tags: React, Next.js, TypeScript, JavaScript, Node.js,
  Express, NestJS, React Native, PostgreSQL, MongoDB, Tailwind CSS, Redux,
  Zustand, Socket.io, HTML, CSS, Git, Jest.
  (If bars must stay, Ryan supplies his own percentages — do not guess them.)
- Education table rows →

  | Programme | Level | Institution | Interest |
  |---|---|---|---|
  | BSc Computer Science | In progress (exp. 2028) | Miva Open University | Fintech & Web Development |
  | Full-Stack Development Cert. | Completed Feb 2022 | New Horizon Computer Institute | Web Development |
  | Secondary Education | Completed | Nubi Private School | — |

  (No graduation year is stated for Nubi Private School — do not invent one.)
- Hobbies ("Little things I love") → Cooking; Making technical tutorial
  videos; UI/graphics design in Canva and Figma; Exploring AI coding tools.
- Academic interests → Web development; Fintech & payments; Mobile
  development; Software design.

### 3.5 Projects (`/html/projects.html`) — 6 real projects, not 3
Keep the card layout, the numbering (01–06), the category labels and the
"description + stack tags + link" pattern. Swap in Ryan's real projects:

1. **Zangapay** — Fintech. "Wallets, bill payments, virtual cards and KYC —
   a payments platform backend built with Node.js and TypeScript."
   Stack: Node.js · TypeScript · PostgreSQL.
2. **Sumpay** — Fintech. "Gift-card and crypto trading platform with
   real-time pricing and instant bank payouts."
   Stack: React · Node.js · PostgreSQL.
3. **Geo Map App** — Mapping, **in progress**. "Interactive donation-project
   map for Inner City Mission, showing their schools, projects and campaigns
   on Google Maps. Demo available on request."
   Stack: JavaScript · Google Maps.
4. **MyItura** — Web app. "Full-stack web application built with Go, Templ
   and HTMX." Stack: Go · Templ · HTMX.
5. **Krowdfi** — Fintech. "Crowdfunding/fintech product." Stack: React ·
   Node.js. (Keep the description short and factual — do not invent features.)
6. **React-Validator Library** — Open source. "A published React validation
   library." Stack: React · TypeScript.

- Project images: keep the existing SVG placeholder pattern if no screenshots
  are supplied (one SVG per project, same style), or swap in real screenshots
  if Ryan provides them. Do not hotlink other people's images.
- "Let's build something together" + "Get in touch" closing block: keep, it
  already points at Contact.

### 3.6 Academic Planner (`/html/planner.html`)
- Keep the functionality exactly as built: add task, mark completed, delete
  task, categories. Do not redesign it.
- Rebrand only: kicker/headings to Ryan's voice ("Make room for progress"
  can stay — it is generic, not Adaora's).
- **Verify before delivery (logic already confirmed in `js/script.js`:
  `addTask()`, `completeTask()` checkbox toggle, `deleteTask()` button,
  plus filters and progress counts — but not live-clicked yet):** add a task
  → it appears; mark it complete → it shows completed; delete it → it
  disappears. Do not add storage or redesign it — keep behaviour identical.

### 3.7 Contact (`/html/contact.html`)
- Title: "Contact Adaora" → **"Contact Ryan"**.
- Headline/kicker: keep the friendly wording, swap the name where it appears.
- Keep all four fields (Full name, Email address, Phone number, Your message)
  and keep the "practice form — no messages are sent or saved" note.
- **Verify the JavaScript validation:** empty field → error; bad email format
  → error; phone with letters → error; valid form → success state. Fix
  validation only if it is actually broken — do not rewrite working code.

### 3.8 What must NOT change
- Folder structure and file names, confirmed live: `index.html` at root;
  `html/about.html`, `html/projects.html`, `html/planner.html`,
  `html/contact.html`; `css/style.css` (the theme lives in variables at the
  top of this file — it opens with a "design system" comment);
  `js/script.js` (one shared file: navigation, planner, contact validation,
  project demos); `images/` (profile.jpg); `audio/` (study-music.wav).
- Plain HTML, CSS and JavaScript only — **no libraries, no frameworks, no
  build step, no CDN dependencies**.
- The existing coding style: same indentation, same naming habits, same way of
  writing CSS classes and JS functions. Match it, do not "improve" it into a
  different style.
- The responsive behaviour and animations that already work — keep them, just
  recolour.
- Nothing here changes the submission rules: hosted link + GitHub repo link +
  PDF report, due Sun 15 Nov 2026, 11:59 PM. Ryan confirms the exact
  submission form before submitting.

---

## 4. The AI prompt (copy-paste ready)

> I have a plain HTML, CSS and JavaScript student portfolio website — no
> libraries, no frameworks, no build step, no CDN dependencies. I want you to
> rebrand it from its current owner (Adaora Okalu, a 100-level Software
> Engineering student) to me (Ryan Favour), fix one broken link, and change
> the colour theme to purple. Keep the project's folder structure, file names
> and coding style exactly as they are. Do not restructure anything, do not
> add a framework, and do not rewrite working JavaScript — only change what
> this prompt tells you to change.
>
> THE BROKEN LINK (fix first): the navbar "Home" link — and the header logo
> link, which uses the same href — is the relative path `index.html` on
> every page. It works from the homepage but breaks on sub-pages: from
> `/html/about.html` it resolves to `/html/index.html`, which returns a 404.
> Change `index.html` to `/` in the navbar Home link AND the header logo
> link, on all five pages. The other navbar links already use root-relative
> `/html/...` paths and work from everywhere — leave them exactly as they
> are. Then click Home and the logo from every page and confirm all ten
> clicks land on the homepage.
>
> COLOUR THEME (the theme lives in variables at the top of `css/style.css`
> — it opens with a design-system comment; change those values): primary
> purple `#A64DA8`, deep purple `#7A2E7C` (hover states, headings, footer),
> light lavender `#F5EAF6` (section backgrounds and cards), and pale gold
> `#C6C26C` used sparingly for small highlights only. These come from my logo.
> Do not introduce any other accent colour.
>
> LOGO: use my "RYAN FAVOUR" wordmark logo (transparent-background PNG, file
> supplied as `logo.png` in `images/`). Put it in the navbar and the footer,
> slightly larger than the old logo, keeping it on one line and keeping the
> navbar usable on mobile. Use the circular badge version as the favicon if
> one exists. Remove every image of the previous owner; for the hero, use my
> photo if supplied, otherwise the logo badge itself.
>
> CONTENT SWAPS (replace every mention of Adaora Okalu / Mativa with the
> following; keep the same sections, headings structure and card layouts):
>
> - Site brand: Ryan Favour. Page titles follow the same pattern, e.g.
>   "About Ryan | Ryan Favour".
> - Home hero: eyebrow "BUILDING. SHIPPING. GROWING."; headline "Hi, I'm Ryan
>   Favour."; role line "Full-Stack Developer | Fintech, React & Node.js";
>   sub-line "Lagos-based developer. Fintech products, real users, production
>   code."; intro paragraph: "I'm a full-stack developer with 6+ years
>   building production web, backend and mobile apps — mostly in fintech:
>   payments, wallets, trading systems. Frontend Developer at TechBeaver,
>   previously Fullstack Dev Lead at Xplug, and a Computer Science student at
>   Miva Open University."
> - Home stats: "06 Projects on this page"; "04 Academic interests";
>   "01 Goal: ship fintech products used by millions."
> - Home bio section ("More than just a developer."): "I'm Ryan, a
>   Lagos-based developer who also teaches web development, makes technical
>   tutorial videos, and designs in Canva and Figma. I like building things
>   people actually use — and explaining how they work."
> - About: kicker "THE PERSON BEHIND THE CODE"; headline "Curiosity is where
>   it starts. Shipping is where it pays off."; story: "I'm Ryan Favour, a
>   full-stack developer and Computer Science student at Miva Open
>   University. I started building for the web in 2020 and have spent 6+
>   years shipping production products — payment systems, wallets, trading
>   platforms and mobile apps. I enjoy turning a messy real-world problem
>   into software that just works."; education: "BSc Computer Science (in
>   progress, expected 2028) at Miva Open University; Full-Stack Development
>   Certificate, New Horizon Computer Institute (Feb 2022). Every project
>   below is real work, not coursework."; aspiration: "My goal is to become
>   a world-class fintech engineer and run a software agency — building
>   payment and trading products for African markets and beyond, and
>   teaching others to build too."
> - About skills: replace the percentage bars with tag chips — React,
>   Next.js, TypeScript, JavaScript, Node.js, Express, NestJS, React Native,
>   PostgreSQL, MongoDB, Tailwind CSS, Redux, Zustand, Socket.io, HTML, CSS,
>   Git, Jest. Do not invent proficiency percentages.
> - About education table: (BSc Computer Science | In progress, exp. 2028 |
>   Miva Open University | Fintech & Web Development), (Full-Stack
>   Development Cert. | Completed Feb 2022 | New Horizon Computer Institute |
>   Web Development), (Secondary Education | Completed | Nubi Private School
>   | —). Do not add a graduation year for Nubi Private School.
> - About hobbies: Cooking; Making technical tutorial videos; UI/graphics
>   design in Canva and Figma; Exploring AI coding tools.
> - About academic interests: Web development; Fintech & payments; Mobile
>   development; Software design.
> - Projects (6 cards, same card layout and numbering 01–06, each with
>   description, stack tags and a link):
>   1. Zangapay — Fintech — "Wallets, bill payments, virtual cards and KYC —
>      a payments platform backend built with Node.js and TypeScript." —
>      Node.js · TypeScript · PostgreSQL.
>   2. Sumpay — Fintech — "Gift-card and crypto trading platform with
>      real-time pricing and instant bank payouts." — React · Node.js ·
>      PostgreSQL.
>   3. Geo Map App — Mapping, in progress — "Interactive donation-project
>      map for Inner City Mission, showing their schools, projects and
>      campaigns on Google Maps. Demo available on request." — JavaScript ·
>      Google Maps.
>   4. MyItura — Web app — "Full-stack web application built with Go, Templ
>      and HTMX." — Go · Templ · HTMX.
>   5. Krowdfi — Fintech — "Crowdfunding/fintech product." — React ·
>      Node.js.
>   6. React-Validator Library — Open source — "A published React validation
>      library." — React · TypeScript.
>   Keep the existing SVG placeholder images unless real screenshots are
>   supplied. Do not invent project features or links.
> - Planner page: change nothing except branding words. Keep add task, mark
>   complete, delete task, categories, filters and progress counts working
>   exactly as they are (the logic lives in `js/script.js` — do not move it
>   or rewrite it).
> - Contact page: title "Contact Ryan"; keep all four fields (Full name,
>   Email address, Phone number, Your message) and the "practice form — no
>   messages are sent or saved" note. Fix the validation only if it is
>   broken: empty field, bad email format and letters in the phone field
>   must each show an error.
> - Keep the study-music audio player on the Home page.
>
> STYLE RULES: write code the way the existing files are written — same
> indentation, same class-naming habits, same simple JavaScript. Keep it
> plain and human: short, simple code, no over-engineered components, no
> extra sections I did not ask for. Keep everything responsive and keep the
> existing animations working, just recoloured.
>
> WHEN YOU ARE DONE, verify and report: (1) the Home navbar link works from
> all five pages; (2) no page still mentions Adaora, Mativa or the old
> projects; (3) the Planner adds, completes and deletes tasks; (4) the
> Contact validation rejects empty fields, bad emails and letters in the
> phone field; (5) the site still looks right on a phone-sized screen. List
> every file you changed and nothing else.

---

## 5. Things Ryan still supplies / decides himself
- Logo with background removed + slightly bigger (Ryan is doing this himself).
- Hero photo (optional — logo badge works without it).
- Project screenshots (optional — SVG placeholders are fine for the brief).
- The submission itself (hosted link + GitHub repo link + PDF report) — Ryan
  confirms which form the LMS wants before submitting; nothing is submitted
  from this spec.
