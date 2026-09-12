/* =============================================================================
   PORTFOLIO SCRIPT
   Structure of this file:
     1. CONFIG   -> the ONLY part you normally edit (your name, links, projects)
     2. Helpers  -> tiny shared functions
     3. Features -> one small function per feature
     4. Init     -> run everything after the DOM is ready

   Animation features added:
     - loading screen           (setupLoader)
     - scroll progress bar      (setupScrollProgress)
     - hero terminal typing     (setupTyping)
     - button ripple effect     (setupRipple)
     - custom cursor            (setupCustomCursor)   [mouse only]
     - subtle hero mouse move   (setupHeroParallax)   [mouse only]
   Hero entrance, scroll reveal, timeline, hover effects, blobs and the
   "Currently Learning" animation are all done in CSS (see css/style.css).
   ========================================================================== */


/* =============================================================================
   1. CONFIG
   Replace the placeholder values below with your real data.
   To add a project: copy one object inside "projects" and change its fields.
   ========================================================================== */
const CONFIG = {
  // Shown in the header logo (keep it short)
  shortName: "Abubakr",

  // Full name – shown in hero and footer
  fullName: "Abubakr",

  // City – shown in the About facts list
  location: "Samarkand",

  // Contact links (no LinkedIn — not used on this portfolio).
  contact: {
    email: "abubakrbahronov@gmail.com",
    github: "https://github.com/abubakrbahronov-creator",
    telegram: "https://t.me/isco_lancaster",
  },

  // Project cards. category is used by the filter buttons: "frontend" or "backend".
  // status: "live" shows working buttons, "coming-soon" disables the Live Demo button.
  projects: [{
      title: "Responsive Landing Page",
      type: "Practice Project",
      category: "frontend",
      status: "live",
      description: "A modern, fully responsive landing page built from scratch to practice layout, Flexbox, Grid and media queries.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "", // e.g. "assets/images/landing-page.png" (leave "" to show a placeholder)
      github: "https://github.com/abubakrbahronov-creator/responsive-landing-page",
      demo: "https://abubakrbahronov-creator.github.io/responsive-landing-page/",
    },
    {
      title: "JavaScript Mini App",
      type: "Learning Project",
      category: "frontend",
      status: "live",
      description: "A small interactive app (for example a to-do list or quiz) to practice DOM manipulation, events and localStorage.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "",
      github: "https://github.com/abubakrbahronov-creator/javascript-mini-app",
      demo: "https://abubakrbahronov-creator.github.io/javascript-mini-app/",
    },
    {
      title: "Django Web Application",
      type: "Learning Project",
      category: "backend",
      status: "coming-soon",
      description: "My first backend project while learning Django: models, views, templates and working with a database.",
      tech: ["Python", "Django"],
      image: "",
      github: "https://github.com/abubakrbahronov-creator",
      demo: "",
    },
  ],
};


/* =============================================================================
   2. HELPERS
   ========================================================================== */

// Short alias for document.querySelector
function $(selector, parent = document) {
  return parent.querySelector(selector);
}

// Short alias for document.querySelectorAll -> real array
function $all(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

// True when the user asked the system for less motion
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// True on phones / tablets (no real hovering mouse)
function isTouchDevice() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

// Restart a CSS animation on an element (used by the project filter)
function restartAnimation(element) {
  element.style.animation = "none";
  void element.offsetWidth; // force the browser to notice the change
  element.style.animation = "";
}


/* =============================================================================
   3. FEATURES (one small function each)
   ========================================================================== */

// --- Fill in text and links from CONFIG -------------------------------------
function applyConfig() {
  // Any element with data-config="key" gets CONFIG[key] as its text
  $all("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (CONFIG[key]) el.textContent = CONFIG[key];
  });

  // Footer year
  const yearEl = $("#footerYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Footer social links
  const footerLinks = $("#footerLinks");
  if (footerLinks) {
    footerLinks.innerHTML = `
      <li><a href="${CONFIG.contact.github}" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="${CONFIG.contact.telegram}" target="_blank" rel="noopener">Telegram</a></li>
    `;
  }
}

// --- Contact section cards -------------------------------------------------
function renderContact() {
  const list = $("#contactList");
  if (!list) return;

  const items = [{
      label: "Email",
      href: `mailto:${CONFIG.contact.email}`
    },
    {
      label: "GitHub",
      href: CONFIG.contact.github
    },
    {
      label: "Telegram",
      href: CONFIG.contact.telegram
    },
  ];

  list.innerHTML = items
    .map((item) => {
      const isExternal = item.href.startsWith("http");
      const attrs = isExternal ? ' target="_blank" rel="noopener"' : "";
      return `
        <li class="contact-item">
          <a href="${item.href}"${attrs}>
            <span class="contact-label">${item.label}</span>
            <span class="contact-arrow" aria-hidden="true">→</span>
          </a>
        </li>`;
    })
    .join("");
}

// --- Project cards ----------------------------------------------------------
function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;

  grid.innerHTML = CONFIG.projects
    .map((project) => {
      // "tags" is a space-separated list the filter checks against,
      // e.g. "frontend html css javascript"
      const tags = [project.category, ...project.tech.map((t) => t.toLowerCase())].join(" ");

      // Thumbnail: real image if provided, otherwise a text placeholder
      const thumb = project.image ?
        `<img src="${project.image}" alt="Screenshot of ${project.title}" loading="lazy" />` :
        `<span>preview coming soon</span>`;

      const tagBadges = project.tech
        .map((t) => `<span class="project-tag">${t}</span>`)
        .join("");

      // Live Demo button is disabled for "coming-soon" projects
      const demoButton =
        project.status === "coming-soon" || !project.demo ?
        `<span class="btn-sm" aria-disabled="true">Coming Soon</span>` :
        `<a class="btn-sm" href="${project.demo}" target="_blank" rel="noopener">Live Demo</a>`;

      return `
        <article class="project-card" data-tags="${tags}">
          <div class="project-thumb">
            <span class="project-badge">${project.type}</span>
            ${thumb}
            <span class="project-overlay" aria-hidden="true">
              <span class="project-overlay-label">Open project ↗</span>
            </span>
          </div>
          <div class="project-body">
            <h3 class="project-name">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">${tagBadges}</div>
            <div class="project-actions">
              <a class="btn-sm" href="${project.github}" target="_blank" rel="noopener">GitHub</a>
              ${demoButton}
            </div>
          </div>
        </article>`;
    })
    .join("");
}

// --- Project filter buttons ---------------------------------------------------
function setupProjectFilter() {
  const buttons = $all(".filter-btn");
  if (buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      // Update active button
      buttons.forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      // Show / hide cards, and replay the entrance animation for the ones shown
      $all(".project-card").forEach((card) => {
        const cardTags = card.dataset.tags.split(" ");
        const show = filter === "all" || cardTags.includes(filter);

        card.classList.toggle("is-hidden", !show);
        if (show) restartAnimation(card);
      });
    });
  });
}

// --- Mobile menu (hamburger) ----------------------------------------------
function setupMobileMenu() {
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close after clicking a link (so smooth scroll is visible)
  $all(".nav-link", menu).forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

// --- Header shadow after scrolling --------------------------------------
function setupHeaderScroll() {
  const header = $("#siteHeader");
  if (!header) return;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  update();
  window.addEventListener("scroll", update, {
    passive: true
  });
}

// --- Active navigation link based on the section in view ----------------
function setupActiveNav() {
  const links = $all(".nav-link");
  const sections = links
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);
  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-active", isActive);
        });
      });
    },
    // Trigger when a section is around the middle of the screen
    {
      rootMargin: "-45% 0px -50% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// --- Scroll reveal animation --------------------------------------------
function setupScrollReveal() {
  const items = $all(".reveal");
  if (items.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); // reveal once, then stop watching
      });
    }, {
      threshold: 0.12
    }
  );

  items.forEach((item) => observer.observe(item));
}

// --- Dark / light theme toggle (remembers choice) ----------------------
function setupThemeToggle() {
  const button = $("#themeToggle");
  const root = document.documentElement;
  const STORAGE_KEY = "portfolio-theme";

  // Load saved theme, or fall back to the OS preference
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

  if (!button) return;
  button.addEventListener("click", () => {
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
  });
}

// --- Loading screen ------------------------------------------------------
function setupLoader() {
  const loader = $("#loader");
  const body = document.body;

  // How long the loader stays on screen (milliseconds). Change this freely.
  // With reduced motion we skip the wait entirely.
  const LOADER_DURATION = prefersReducedMotion() ? 0 : 900;

  function revealPage() {
    body.classList.add("is-loaded"); // triggers the hero + header entrance
    if (!loader) return;
    loader.classList.add("is-hidden"); // fade the loader out
    setTimeout(() => loader.remove(), 500); // then remove it from the DOM
  }

  setTimeout(revealPage, LOADER_DURATION);
}

// --- Thin scroll progress bar at the top ------------------------------
function setupScrollProgress() {
  const bar = $("#scrollProgressBar");
  if (!bar) return;

  let ticking = false;

  function update() {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (scrolled / max) * 100 : 0;
    bar.style.width = percent + "%";
    ticking = false;
  }

  // requestAnimationFrame keeps the scroll handler cheap
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, {
      passive: true
    }
  );
  update();
}

// --- Hero terminal typing effect --------------------------------------
function setupTyping() {
  const codeEl = $(".terminal-body code");
  if (!codeEl) return;

  const finalHTML = codeEl.innerHTML; // the syntax-highlighted version
  const plainText = codeEl.textContent; // the same text without colors

  // With reduced motion we simply leave the finished, colored code in place
  if (prefersReducedMotion()) return;

  const TYPING_SPEED = 16; // milliseconds per character  <-- change speed here
  const START_DELAY = 1200; // wait for the hero to finish appearing

  codeEl.textContent = "";
  let index = 0;

  function typeNextChar() {
    codeEl.textContent = plainText.slice(0, index);
    index += 1;

    if (index <= plainText.length) {
      setTimeout(typeNextChar, TYPING_SPEED);
    } else {
      codeEl.innerHTML = finalHTML; // put the colors back once typing is done
    }
  }

  setTimeout(typeNextChar, START_DELAY);
}

// --- Ripple effect on button clicks ---------------------------------
function setupRipple() {
  if (prefersReducedMotion()) return;

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".btn, .filter-btn");
    if (!button) return;

    const circle = document.createElement("span");
    const size = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    circle.className = "ripple";
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = event.clientX - rect.left - size / 2 + "px";
    circle.style.top = event.clientY - rect.top - size / 2 + "px";

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600); // matches the CSS animation length
  });
}

// --- Custom cursor (dot + ring) ------------------------------------
function setupCustomCursor() {
  // Only for mouse users who have not asked for reduced motion
  if (prefersReducedMotion() || isTouchDevice()) return;

  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  if (!dot || !ring) return;

  document.body.classList.add("has-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    // the dot sits exactly on the pointer
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // the ring follows a little behind (lerp = move a fraction of the way each frame)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // grow the ring over things you can click
  const hoverSelector = "a, button, .project-card, .skill-card";
  document.addEventListener("mouseover", (event) => {
    if (event.target.closest(hoverSelector)) ring.classList.add("is-hover");
  });
  document.addEventListener("mouseout", (event) => {
    if (event.target.closest(hoverSelector)) ring.classList.remove("is-hover");
  });

  // hide the cursor when the mouse leaves the window
  document.documentElement.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.documentElement.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
}

// --- Very light mouse parallax in the hero -------------------------
function setupHeroParallax() {
  if (prefersReducedMotion() || isTouchDevice()) return;

  const hero = $("#home");
  const terminal = $(".terminal");
  const glow = $(".bg-glow");
  if (!hero) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    // values roughly between -0.5 and 0.5
    targetX = (event.clientX - rect.left) / rect.width - 0.5;
    targetY = (event.clientY - rect.top) / rect.height - 0.5;
  });
  hero.addEventListener("mouseleave", () => {
    targetX = 0;
    targetY = 0;
  });

  function render() {
    // ease toward the target so the motion feels smooth
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // keep the movement tiny: max ~10px for the card, ~24px for the glow
    if (terminal) {
      terminal.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
    }
    if (glow) {
      glow.style.transform = `translateX(-50%) translate(${currentX * 24}px, ${currentY * 24}px)`;
    }
    requestAnimationFrame(render);
  }

  // start after the hero entrance animation has finished
  setTimeout(render, 2100);
}


/* =============================================================================
   4. INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // content
  applyConfig();
  renderContact();
  renderProjects();

  // behaviour
  setupProjectFilter();
  setupMobileMenu();
  setupHeaderScroll();
  setupActiveNav();
  setupScrollReveal();
  setupThemeToggle();

  // animation upgrades
  setupLoader();
  setupScrollProgress();
  setupTyping();
  setupRipple();
  setupHeroParallax();
  // setupCustomCursor(); // custom cursor disabled – uses the normal system cursor
});