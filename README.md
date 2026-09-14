# Personal Portfolio — Junior Frontend Developer

A modern, minimalist, dark-themed personal portfolio built with plain
**HTML5, CSS3 and JavaScript (ES6+)** — no frameworks, no build step.
It presents me as a beginner Frontend Developer, shows my skills and learning
projects, and tells the story of my path from Frontend toward Full-Stack.

---

## ⚠️ First: replace these placeholders

Open **`js/script.js`** and edit the `CONFIG` object at the very top — that is
the only place you normally need to touch:

| Placeholder in `CONFIG` | Replace with | Status |
|---|---|---|
| `shortName` | Your name for the header logo (keep it short) | ✅ set (`Abubakr`) |
| `fullName` | Your full name (hero + footer) | ✅ set (`Abubakr`) |
| `location` | Your city | ⬜ still `[YOUR CITY]` |
| `contact.email` | Your real email | ✅ set |
| `contact.github` | `https://github.com/YOUR_USERNAME` | ✅ set (`abubakrbahronov-creator`) |
| `contact.telegram` | `https://t.me/YOUR_USERNAME` | ✅ set (`isco_lancaster`) |
| `projects[...]` | Your real project titles, links and descriptions | ⬜ demo data |

Then update these too:

- **`index.html`** — the `<title>`, `<meta name="description">` and the
  Open Graph tags near the top (`og:title`, `og:description`, `og:url`,
  `og:image`). Replace `[YOUR NAME]` and `USERNAME`.
- **`index.html`** — `[YOUR CITY]` also appears once as a fallback in the
  About section (the script overwrites it, but keep them in sync).
- **`assets/icons/favicon.svg`** — optional: swap for your own icon.
- **`assets/images/`** — add project screenshots here (see below).

Search the project for `[YOUR CITY]` and `USERNAME` to make
sure nothing is missed (email, GitHub and Telegram are already filled in).

---

## Technologies

- **HTML5** — semantic markup, accessible structure
- **CSS3** — custom properties (design tokens), Flexbox, Grid, media queries
- **JavaScript (ES6+)** — small vanilla functions, `IntersectionObserver`,
  `localStorage`
- No libraries, no bundler — just open the file in a browser.

---

## Features

- Responsive layout (tested at 320 / 375 / 768 / 1024 / 1440 px)
- Mobile hamburger menu
- Smooth scrolling to sections + active nav link highlighting
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- Dark / light theme toggle (remembers your choice)
- Project cards rendered from a data array — easy to extend
- Project filter buttons (All / Frontend / Backend)
- Hero "code terminal" visual
- Timeline of my learning journey + "Currently Learning" block
- Honest skill levels (Learning / Basic / Comfortable / Improving) — no fake %
- Accessible: semantic tags, heading order, focus states, skip link, `aria-*`
- SEO: title, meta description, Open Graph tags, favicon

---

## Project structure

```
portfolio/
├── index.html          # All markup and section content
├── css/
│   └── style.css        # All styles, split into numbered sections by comments
├── js/
│   └── script.js        # CONFIG (your data) + all interactivity
├── assets/
│   ├── images/          # Project screenshots / Open Graph image
│   └── icons/
│       └── favicon.svg  # Browser tab icon (placeholder)
└── README.md
```

**What each file does**

- **`index.html`** — one page with 7 areas: Hero, About, Skills, Projects,
  Journey (+ Currently Learning), Contact, Footer. Projects and contact links
  are placeholders in the HTML and get filled in by JavaScript.
- **`css/style.css`** — starts with **design tokens** (`:root` variables for
  colors, spacing, radius). Dark theme is default; `[data-theme="light"]`
  overrides the tokens. The rest is grouped by component with numbered
  comment headers.
- **`js/script.js`** — `CONFIG` object first, then tiny helper functions,
  then one function per feature, then an `init` block that runs on
  `DOMContentLoaded`.

---

## Run it locally

No build step is required.

**Option A — just open the file**

Double-click `index.html`, or drag it into your browser.

**Option B — local server (recommended, avoids some browser restrictions)**

```bash
# Python 3
python3 -m http.server 5500

# or, with Node installed
npx serve
```

Then open <http://localhost:5500>.

In VS Code you can also use the **Live Server** extension.

---

## How to add a new project

1. Open **`js/script.js`**.
2. In `CONFIG.projects`, copy one of the existing objects.
3. Change the fields:

```js
{
  title: "My New Project",
  type: "Practice Project",        // or "Learning Project"
  category: "frontend",            // "frontend" or "backend" (used by filters)
  status: "live",                  // "live" or "coming-soon"
  description: "One or two sentences about what it does and what you practiced.",
  tech: ["HTML", "CSS", "JavaScript"],
  image: "assets/images/my-new-project.png", // or "" for a placeholder
  github: "https://github.com/USERNAME/my-new-project",
  demo: "https://USERNAME.github.io/my-new-project/"
}
```

4. Put the screenshot in `assets/images/` and use that path in `image`.
5. Save and refresh — the card appears automatically.

**Tip:** when `status` is `"coming-soon"` (or `demo` is `""`), the Live Demo
button is shown as a disabled "Coming Soon" label.

---

## How to deploy

### GitHub Pages (free)

1. Create a repo, e.g. `portfolio`, and push this folder to it.
2. On GitHub: **Settings → Pages**.
3. **Source:** `Deploy from a branch` → branch `main`, folder `/root`.
4. Wait a minute — your site is at
   `https://YOUR_USERNAME.github.io/portfolio/`.
5. Update `og:url` in `index.html` to that address.

### Vercel

1. Push the project to GitHub.
2. On <https://vercel.com> → **Add New → Project** → import the repo.
3. Framework preset: **Other**. No build command, no output dir needed.
4. Deploy.

### Netlify

1. On <https://app.netlify.com> → **Add new site → Deploy manually**.
2. Drag the whole `portfolio/` folder onto the page.
   (Or connect the GitHub repo for automatic deploys.)

---

## Animations — where they live and how to tune them

Most animations are **pure CSS** in `css/style.css` (sections 15, 17–27). A few
need JavaScript and live in `js/script.js` as small `setup*` functions.

| Animation | File / section | How to change the speed |
|---|---|---|
| Loading screen duration | `js/script.js` → `setupLoader` | `LOADER_DURATION` (ms) |
| Hero entrance (staggered) | `css` §21 + `index.html` hero `--delay` | edit `--delay` on each `.hero-item`, or the `fade-up` duration in §21 |
| Terminal typing effect | `js/script.js` → `setupTyping` | `TYPING_SPEED` (ms per char), `START_DELAY` |
| Blinking caret | `css` §26 `@keyframes blink` | change the `1.1s` on `.terminal-body code::after` |
| Scroll progress bar | `js` `setupScrollProgress` + `css` §18 | `transition: width 120ms` in §18 |
| Scroll reveal | `css` §15 + `js` `setupScrollReveal` | `transition` duration in `.reveal`; direction via `data-anim` in HTML |
| Timeline reveal | `css` §22 | the `transition-delay` steps and the `1000ms` line-fill |
| Background blobs | `css` §20 | `animation` duration on `.bg-blob--1/2` |
| Custom cursor lag | `js` `setupCustomCursor` | the `0.18` factor (higher = snappier) |
| Hero mouse parallax | `js` `setupHeroParallax` | the `* 10` / `* 24` multipliers (keep them small) |
| Card / button hover | `css` §4, §10, §11, §24 | the `var(--transition)` token in §1 (one value for the whole site) |

**Global switch:** the single `--transition: 220ms ease;` token in section 1
controls almost every hover transition at once.

### How to add a new scroll animation

1. Add the class `reveal` to any element in `index.html`.
2. Optionally add a direction: `data-anim="fade-left"`, `"fade-right"` or `"scale"`.
3. That's it — `setupScrollReveal()` already watches every `.reveal` element and
   adds `.is-visible` when it scrolls into view.

To invent a brand-new effect: add a `@keyframes` block in `style.css`, create a
class that uses it, and toggle that class from a small function in `script.js`
(copy the shape of `setupTyping` or `setupRipple`).

### Accessibility

Everything is wrapped by `@media (prefers-reduced-motion: reduce)` (section 27).
If the visitor turned off animations in their OS, the site jumps straight to the
final state and the custom cursor is disabled — it stays fully usable.

### Mobile polish

A few things specifically for phones/tablets, all in `css/style.css`:

- **No "stuck" hover** — `@media (hover: none), (pointer: coarse)` turns off the
  lift/zoom/glow hover effects on cards, so a tap doesn't leave a card looking
  permanently "hovered" the way it can on touchscreens.
- **44px tap targets** — the hamburger and theme-toggle buttons, and nav links
  on mobile, meet the ~44px minimum comfortable touch size.
- **`touch-action: manipulation`** on every link/button removes the old
  tap-delay and double-tap-to-zoom some mobile browsers still add.
- **Smaller code font on very small phones** (≤375px) so the hero terminal
  needs less side-scrolling.
- Background blobs are reduced to one, un-animated, on phones — one less thing
  moving on a small battery-powered screen.

---

## Ideas for next improvements

- Add real screenshots for each project
- Add a downloadable CV / resume button in the Hero
- Add a simple contact form (needs a service like Formspree or Netlify Forms)
- Split `CONFIG` into its own `js/data.js` file once you have many projects
- Add a few unit-testable helper functions as you learn testing
- Add `sitemap.xml` and `robots.txt` for SEO
- Try CSS `@view-transitions` or scroll-driven animations (`animation-timeline`) later
- Replace the two infinite `requestAnimationFrame` loops (cursor, parallax) with
  `IntersectionObserver`-gated versions if you ever profile a slowdown

---

Built with HTML, CSS & JavaScript.
# my-resume
