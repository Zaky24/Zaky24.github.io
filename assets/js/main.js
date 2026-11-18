import { initSakuraCanvas } from "./sakura-canvas.js?v=2.0";

/* ==========================================================================
   DATA SOURCE (assets/data/portfolio.json)
   Di-generate oleh `npm run build` dari assets/js/data.js.
   Diambil sekali saja, setelah halaman tampil.
   ========================================================================== */
const DATA_URL = "./assets/data/portfolio.json?v=2.0";

/* Nilai cadangan: dipakai sebelum portfolio.json selesai dimuat
   (mis. saat pengunjung langsung menekan "Send Message").
   Sumber utama tetap assets/js/data.js → portfolio.json. */
const FALLBACK_PROFILE = {
  roles: ["Web Developer", "Fullstack Developer", "Junior Web Developer"],
  email: "irazaky24@gmail.com",
  web3FormsAccessKey: "cebdbc56-0278-4e81-afe3-f4d741e56272"
};

const getProfile = () => (portfolioData ? portfolioData.profile : FALLBACK_PROFILE);

let portfolioData = null;
let dataRequest = null;

function loadPortfolioData() {
  if (portfolioData) return Promise.resolve(portfolioData);
  if (!dataRequest) {
    dataRequest = fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Gagal memuat data portofolio (${res.status})`);
        return res.json();
      })
      .then((data) => {
        portfolioData = data;
        return data;
      })
      .catch((err) => {
        dataRequest = null;
        throw err;
      });
  }
  return dataRequest;
}

/* Lazy observer sementara: callback dipanggil sekali saat elemen mendekati viewport */
const onceEnter = (el, callback, rootMargin = "400px 0px") => {
  if (!el) return;
  if (!("IntersectionObserver" in window)) {
    callback();
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        callback();
      }
    },
    { rootMargin }
  );
  observer.observe(el);
};

/* ==========================================================================
   PROJECT & CERTIFICATE THUMBNAIL GENERATOR (Supports Real Images & Fallback SVG)
   ========================================================================== */
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function normalizeExternalUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|\.)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function renderProjectThumbnail(project) {
  if (project.image && project.image.trim() !== "") {
    return `
      <img
        src="${project.image}"
        alt="${escapeHtml(project.title)} Preview"
        width="640" height="360"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy" decoding="async"
      />
    `;
  }

  const { accentColor, secondaryColor, category, title } = project;
  return `
    <svg viewBox="0 0 480 250" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${escapeHtml(title)} preview">
      <rect width="480" height="250" fill="#0B1120" />
      <g fill="${secondaryColor}" fill-opacity="0.12">
        <rect x="24" y="24" width="3" height="3" />
        <rect x="48" y="24" width="3" height="3" />
        <rect x="72" y="24" width="3" height="3" />
        <rect x="430" y="30" width="4" height="4" />
        <rect x="446" y="46" width="4" height="4" />
      </g>
      <rect x="34" y="28" width="412" height="194" rx="10" fill="#111A2E" stroke="${accentColor}" stroke-opacity="0.45" stroke-width="1.5" />
      <rect x="34" y="28" width="412" height="28" rx="10" fill="#17233D" />
      <circle cx="52" cy="42" r="4.5" fill="#E05263" />
      <circle cx="66" cy="42" r="4.5" fill="#F59E0B" />
      <circle cx="80" cy="42" r="4.5" fill="#10B981" />
      <rect x="104" y="37" width="160" height="10" rx="5" fill="#0B1120" />
      <rect x="52" y="72" width="110" height="132" rx="6" fill="#0B1120" fill-opacity="0.65" />
      <rect x="64" y="86" width="76" height="8" rx="4" fill="${accentColor}" fill-opacity="0.8" />
      <rect x="64" y="104" width="60" height="6" rx="3" fill="#94A3B8" fill-opacity="0.4" />
      <rect x="64" y="118" width="68" height="6" rx="3" fill="#94A3B8" fill-opacity="0.4" />
      <rect x="64" y="132" width="52" height="6" rx="3" fill="#94A3B8" fill-opacity="0.4" />

      <rect x="176" y="72" width="252" height="58" rx="6" fill="${accentColor}" fill-opacity="0.14" stroke="${accentColor}" stroke-opacity="0.35" />
      <rect x="192" y="86" width="130" height="10" rx="4" fill="#F8FAFC" fill-opacity="0.9" />
      <rect x="192" y="104" width="180" height="7" rx="3.5" fill="${secondaryColor}" fill-opacity="0.75" />

      <rect x="176" y="142" width="120" height="62" rx="6" fill="#17233D" />
      <rect x="190" y="156" width="48" height="14" rx="3" fill="${secondaryColor}" fill-opacity="0.85" />
      <rect x="190" y="178" width="84" height="6" rx="3" fill="#94A3B8" fill-opacity="0.45" />

      <rect x="308" y="142" width="120" height="62" rx="6" fill="#17233D" />
      <rect x="322" y="156" width="54" height="14" rx="3" fill="${accentColor}" fill-opacity="0.85" />
      <rect x="322" y="178" width="84" height="6" rx="3" fill="#94A3B8" fill-opacity="0.45" />

      <text x="416" y="46" text-anchor="end" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="9">${category}</text>
    </svg>
  `;
}

function renderCertificateThumbnail(cert) {
  if (cert.image && cert.image.trim() !== "") {
    return `
      <img
        src="${cert.image}"
        alt="${escapeHtml(cert.title)}"
        width="640" height="420"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy" decoding="async"
      />
    `;
  }

  return `
    <svg viewBox="0 0 420 240" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${escapeHtml(cert.title)}">
      <rect width="420" height="240" fill="#0D1424" />
      <rect x="18" y="18" width="384" height="204" rx="8" fill="#111A2E" stroke="${cert.badgeColor}" stroke-opacity="0.5" stroke-width="1.5" />
      <rect x="28" y="28" width="364" height="184" rx="4" fill="none" stroke="#94A3B8" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <circle cx="210" cy="76" r="24" fill="${cert.badgeColor}" fill-opacity="0.18" stroke="${cert.badgeColor}" stroke-width="2" />
      <polygon points="210,62 214,71 224,72 217,79 219,88 210,83 201,88 203,79 196,72 206,71" fill="${cert.badgeColor}" />
      <rect x="135" y="116" width="150" height="8" rx="4" fill="#F8FAFC" fill-opacity="0.9" />
      <rect x="95" y="134" width="230" height="6" rx="3" fill="#94A3B8" fill-opacity="0.5" />
      <rect x="145" y="152" width="130" height="6" rx="3" fill="${cert.badgeColor}" fill-opacity="0.8" />
      <text x="210" y="188" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="10">${escapeHtml(cert.issuer)} · ${escapeHtml(cert.date)}</text>
    </svg>
  `;
}

/* ==========================================================================
   HERO 3D TILT EFFECT
   ========================================================================== */
function initInteractiveCursorAndTilt() {
  const heroStage = document.getElementById("hero-3d-stage");
  const heroCard = document.getElementById("hero-3d-card");

  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isCoarse || reducedMotion) return;

  // 3D Tilt on Hero GFX Showcase
  if (heroStage && heroCard) {
    heroStage.addEventListener("pointermove", (e) => {
      const rect = heroStage.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const rotY = relX * 14;
      const rotX = -relY * 14;
      heroCard.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });

    heroStage.addEventListener("pointerleave", () => {
      heroCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }
}

/* ==========================================================================
   TYPEWRITER ENGINE ("Web Developer", "Fullstack Developer", "Junior Web Developer")
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriter-role");
  if (!el) return;

  const roles = getProfile().roles || FALLBACK_PROFILE.roles;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const fullText = roles[roleIndex];
    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
    } else {
      charIndex = Math.min(fullText.length, charIndex + 1);
    }

    el.textContent = fullText.substring(0, charIndex);

    let speed = isDeleting ? 40 : 85;
    if (!isDeleting && charIndex === fullText.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(tick, speed);
  }

  tick();
}
/* ==========================================================================
   PORTFOLIO SHOWCASE — PAGINATION (data sudah ter-render di HTML)
   ========================================================================== */
function activateShowcaseTab(targetPanelId) {
  document.querySelectorAll(".showcase-tab-btn").forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.getAttribute("aria-controls") === targetPanelId));
  });
  document.querySelectorAll(".showcase-panel").forEach((panel) => {
    panel.classList.toggle("hidden", panel.id !== targetPanelId);
  });
}

const SHOWCASE_PANELS = {
  projects: {
    gridId: "projects-grid",
    paginationId: "projects-pagination",
    pageSize: { mobile: 2, desktop: 3 }
  },
  certificates: {
    gridId: "certificates-grid",
    paginationId: "certificates-pagination",
    pageSize: { mobile: 3, desktop: 6 }
  }
};

const showcaseState = {
  projects: { page: 1, totalPages: 1, pageSize: 3 },
  certificates: { page: 1, totalPages: 1, pageSize: 3 }
};

function currentPageSize(panel) {
  const size = SHOWCASE_PANELS[panel].pageSize;
  return window.innerWidth >= 768 ? size.desktop : size.mobile;
}

function renderPaginationBar(panel) {
  const config = SHOWCASE_PANELS[panel];
  const nav = document.getElementById(config.paginationId);
  const grid = document.getElementById(config.gridId);
  if (!nav || !grid) return;

  const state = showcaseState[panel];
  const cards = grid.querySelectorAll(":scope > article");
  const total = cards.length;

  state.pageSize = currentPageSize(panel);
  state.totalPages = Math.max(1, Math.ceil(total / state.pageSize));
  state.page = Math.min(Math.max(1, state.page), state.totalPages);

  const from = total === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  const to = Math.min(total, state.page * state.pageSize);

  cards.forEach((card, index) => {
    const visible = index >= from - 1 && index < to;
    card.classList.toggle("showcase-card-hidden", !visible);
  });

  if (state.totalPages <= 1) {
    nav.innerHTML = "";
    nav.hidden = true;
    return;
  }

  nav.hidden = false;

  const pageButtons = Array.from({ length: state.totalPages }, (_, i) => i + 1)
    .map(
      (page) => `
      <button type="button" class="pagination-btn" data-page="${page}"
        aria-label="Halaman ${page}" ${page === state.page ? 'aria-current="page"' : ""}>
        ${page}
      </button>`
    )
    .join("");

  nav.innerHTML = `
    <button type="button" class="pagination-btn" data-page="${state.page - 1}"
      aria-label="Halaman sebelumnya" ${state.page === 1 ? "disabled" : ""}>&lsaquo;</button>
    ${pageButtons}
    <button type="button" class="pagination-btn" data-page="${state.page + 1}"
      aria-label="Halaman berikutnya" ${state.page === state.totalPages ? "disabled" : ""}>&rsaquo;</button>
    <p class="pagination-status" aria-live="polite" data-pagination-status>
      Menampilkan ${from}&ndash;${to} dari ${total}
    </p>`;
}

function goToPage(panel, page, { scroll = true, updateHash = true } = {}) {
  const state = showcaseState[panel];
  if (!state) return;

  const next = Math.min(Math.max(1, page), state.totalPages);
  const changed = next !== state.page;
  state.page = next;
  renderPaginationBar(panel);

  if (changed && scroll) {
    const grid = document.getElementById(SHOWCASE_PANELS[panel].gridId);
    if (grid) {
      const top = grid.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  if (updateHash) {
    const newHash = `#portfolio/${panel}/${next}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
  }
}

function initShowcasePagination() {
  Object.keys(SHOWCASE_PANELS).forEach((panel) => {
    renderPaginationBar(panel);

    const config = SHOWCASE_PANELS[panel];
    const nav = document.getElementById(config.paginationId);
    if (!nav) return;

    nav.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-page]");
      if (!btn || btn.disabled) return;
      goToPage(panel, Number(btn.getAttribute("data-page")));
    });
  });

  // Pulihkan halaman dari hash (mis. tautan yang dibagikan: #portfolio/certificates/2)
  const hashMatch = window.location.hash.match(/^#portfolio\/(projects|certificates)\/(\d+)$/);
  if (hashMatch) {
    const [, panel, page] = hashMatch;
    showcaseState[panel].page = Number(page) || 1;
    renderPaginationBar(panel);
    activateShowcaseTab(panel === "projects" ? "panel-projects" : "panel-certificates");
  }

  // Ukuran halaman berubah antara mobile & desktop
  let resizeTimer = null;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        Object.keys(SHOWCASE_PANELS).forEach((panel) => renderPaginationBar(panel));
      }, 180);
    },
    { passive: true }
  );
}

/* Data portofolio baru diambil saat section Portfolio mendekati viewport */
function initLazyPortfolioData() {
  const portfolioSection = document.getElementById("portfolio");
  onceEnter(
    portfolioSection,
    () => {
      loadPortfolioData()
        .then(() => renderSummaryStats())
        .catch(() => {
          /* Kartu sudah ada di HTML; data hanya dibutuhkan untuk modal. */
        });
    },
    "600px 0px"
  );
}

/* ==========================================================================
   DETAIL PROYEK & SERTIFIKAT (delegation, kartu sudah ada di HTML)
   ========================================================================== */
async function findProjectById(id) {
  const data = await loadPortfolioData();
  return data.projects.find((project) => project.id === id);
}

async function findCertificateById(id) {
  const data = await loadPortfolioData();
  return data.certificates.find((cert) => cert.id === id);
}

function initShowcaseInteractions() {
  const projectsGrid = document.getElementById("projects-grid");
  if (projectsGrid) {
    projectsGrid.addEventListener("click", async (event) => {
      const btn = event.target.closest(".project-detail-btn");
      if (!btn) return;
      event.preventDefault();

      try {
        const project = await findProjectById(btn.getAttribute("data-project-id"));
        if (project) openProjectDetailModal(project);
      } catch (error) {
        console.warn("Detail proyek tidak dapat dimuat:", error);
      }
    });
  }

  const certificatesGrid = document.getElementById("certificates-grid");
  if (certificatesGrid) {
    certificatesGrid.addEventListener("click", async (event) => {
      const btn = event.target.closest(".cert-preview-btn");
      if (!btn) return;
      event.preventDefault();

      try {
        const cert = await findCertificateById(btn.getAttribute("data-cert-id"));
        if (cert) openCertModal(cert);
      } catch (error) {
        console.warn("Detail sertifikat tidak dapat dimuat:", error);
      }
    });
  }
}

/* ==========================================================================
   RENDER SUMMARY STATS (PROJECTS COUNT, CERTIFICATES COUNT, YEARS IN IT)
   ========================================================================== */
function renderSummaryStats() {
  if (!portfolioData) return;

  const startYear = portfolioData.profile.journeyStartYear || 2024;
  const yearsDiff = Math.max(1, new Date().getFullYear() - startYear);

  const projectsCountEl = document.getElementById("stat-projects-count");
  const certsCountEl = document.getElementById("stat-certificates-count");
  const yearsLearningEl = document.getElementById("stat-years-learning");

  if (projectsCountEl) projectsCountEl.textContent = portfolioData.projects.length;
  if (certsCountEl) certsCountEl.textContent = portfolioData.certificates.length;
  if (yearsLearningEl) yearsLearningEl.textContent = `${yearsDiff}+`;
}

/* ==========================================================================
   PROJECT DETAIL POPUP MODAL (CERITA PERJALANAN, SECTIONS TAMBAHAN & FITUR)
   ========================================================================== */
function openProjectDetailModal(proj) {
  const modal = document.getElementById("project-detail-modal");
  if (!modal) return;

  const titleEl = document.getElementById("proj-modal-title");
  const metaEl = document.getElementById("proj-modal-meta");
  const bannerEl = document.getElementById("proj-modal-banner");
  const storyEl = document.getElementById("proj-modal-story");
  const storyWrap = document.getElementById("proj-modal-story-wrap");
  const sectionsEl = document.getElementById("proj-modal-sections");
  const featuresWrap = document.getElementById("proj-modal-features-wrap");
  const featuresEl = document.getElementById("proj-modal-features");
  const techEl = document.getElementById("proj-modal-tech");
  const liveLinkEl = document.getElementById("proj-modal-live");
  const repoLinkEl = document.getElementById("proj-modal-repo");
  const closeBtn = document.getElementById("proj-modal-close");

  if (titleEl) titleEl.textContent = proj.title || "Project Details";
  if (metaEl) {
    const metaParts = [proj.category, proj.timeline].filter(Boolean);
    metaEl.textContent = metaParts.join(" · ");
  }
  if (bannerEl) bannerEl.innerHTML = renderProjectThumbnail(proj);

  // Story Utama (Mendukung Teks Biasa maupun Tag HTML Bebas)
  if (storyEl) {
    const rawStory = typeof proj.story === "string"
      ? proj.story
      : (proj.story && proj.story.background)
        ? proj.story.background
        : (proj.description || "");

    if (rawStory.trim() !== "") {
      storyEl.innerHTML = rawStory;
      if (storyWrap) storyWrap.classList.remove("hidden");
    } else {
      storyEl.innerHTML = "";
      if (storyWrap) storyWrap.classList.add("hidden");
    }
  }

  // Custom Sections Tambahan (Bebas ditambah tanpa pusing mikir CSS)
  if (sectionsEl) {
    if (Array.isArray(proj.sections) && proj.sections.length > 0) {
      sectionsEl.innerHTML = proj.sections
        .map(
          (sec) => `
        <div class="space-y-1.5 p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)]">
          <h4 class="text-xs font-bold uppercase tracking-wider text-[var(--accent-secondary)] font-pixel-accent">
            ${sec.title}
          </h4>
          <div class="text-sm text-[var(--text-secondary)] leading-relaxed modal-formatted-content">
            ${sec.content}
          </div>
        </div>
      `
        )
        .join("");
      sectionsEl.classList.remove("hidden");
    } else {
      sectionsEl.innerHTML = "";
      sectionsEl.classList.add("hidden");
    }
  }

  // Fitur Utama
  if (featuresEl) {
    const featureList = Array.isArray(proj.features)
      ? proj.features
      : (proj.story && Array.isArray(proj.story.keyFeatures))
        ? proj.story.keyFeatures
        : [];

    if (featureList.length > 0) {
      featuresEl.innerHTML = featureList
        .map(
          (feat) => `
        <li class="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] mt-2 shrink-0"></span>
          <span>${feat}</span>
        </li>
      `
        )
        .join("");
      if (featuresWrap) featuresWrap.classList.remove("hidden");
    } else {
      featuresEl.innerHTML = "";
      if (featuresWrap) featuresWrap.classList.add("hidden");
    }
  }

  // Tech Stack Pills
  if (techEl) {
    if (Array.isArray(proj.tech) && proj.tech.length > 0) {
      techEl.innerHTML = proj.tech
        .map(
          (t) =>
            `<span class="tabular-nums-data text-xs px-2.5 py-1 rounded-md bg-[var(--bg-pill)] text-[var(--accent-secondary)]">${t}</span>`
        )
        .join("");
      techEl.classList.remove("hidden");
    } else {
      techEl.innerHTML = "";
      techEl.classList.add("hidden");
    }
  }

  // Defensive handling for action buttons (Live Demo & Source Code)
  if (liveLinkEl) {
    const safeLiveUrl = normalizeExternalUrl(proj.liveUrl);
    if (safeLiveUrl) {
      liveLinkEl.setAttribute("href", safeLiveUrl);
      liveLinkEl.classList.remove("hidden");
    } else {
      liveLinkEl.classList.add("hidden");
    }
  }

  if (repoLinkEl) {
    const safeRepoUrl = normalizeExternalUrl(proj.repoUrl);
    if (safeRepoUrl) {
      repoLinkEl.setAttribute("href", safeRepoUrl);
      repoLinkEl.classList.remove("hidden");
    } else {
      repoLinkEl.classList.add("hidden");
    }
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  if (closeBtn) closeBtn.focus();
}

function closeProjectDetailModal() {
  const modal = document.getElementById("project-detail-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

/* ==========================================================================
   CERTIFICATE MODAL
   ========================================================================== */
function openCertModal(cert) {
  const modal = document.getElementById("cert-modal");
  const title = document.getElementById("cert-modal-title");
  const issuer = document.getElementById("cert-modal-issuer");
  const preview = document.getElementById("cert-modal-preview");
  const closeBtn = document.getElementById("cert-modal-close");

  if (!modal) return;
  title.textContent = cert.title;
  issuer.textContent = `${cert.issuer} · Diterbitkan ${cert.date}`;
  if (cert.image && cert.image.trim() !== "") {
    preview.innerHTML = `
      <div class="flex items-center justify-center bg-[#070B14]/80 rounded-xl p-2 max-h-[70vh] overflow-auto">
        <img
          src="${cert.image}"
          alt="${cert.title}"
          class="max-w-full max-h-[66vh] w-auto h-auto object-contain rounded-lg shadow-lg"
          loading="lazy"
        />
      </div>
    `;
  } else {
    preview.innerHTML = renderCertificateThumbnail(cert);
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  if (closeBtn) closeBtn.focus();
}

function closeCertModal() {
  const modal = document.getElementById("cert-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

/* ==========================================================================
   INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const sakuraBg = initSakuraCanvas("sakura-canvas");
  initInteractiveCursorAndTilt();
  initTypewriter();
  initShowcasePagination();
  initShowcaseInteractions();
  initLazyPortfolioData();

  // Theme Toggle (Dark / Light)
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeLabel = document.getElementById("theme-label");
  const savedTheme = localStorage.getItem("irazaky-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  function syncThemeUI() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    if (themeLabel) themeLabel.textContent = current === "light" ? "Light" : "Dark";
    if (sakuraBg) sakuraBg.refreshTheme();
  }

  syncThemeUI();

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("irazaky-theme", next);
      syncThemeUI();
    });
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobilePanel = document.getElementById("mobile-menu-panel");
  if (mobileBtn && mobilePanel) {
    mobileBtn.addEventListener("click", () => {
      const expanded = mobileBtn.getAttribute("aria-expanded") === "true";
      mobileBtn.setAttribute("aria-expanded", String(!expanded));
      mobilePanel.classList.toggle("hidden", expanded);
    });
    mobilePanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileBtn.setAttribute("aria-expanded", "false");
        mobilePanel.classList.add("hidden");
      });
    });
  }

  // Portfolio Showcase 3-Tab Switcher
  const tabs = document.querySelectorAll(".showcase-tab-btn");

  function activateTab(targetPanelId) {
    activateShowcaseTab(targetPanelId);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.getAttribute("aria-controls");
      if (targetId) activateTab(targetId);
    });
  });

  // About Stat Cards Jump to Specific Portfolio Tab
  document.querySelectorAll("[data-jump-tab]").forEach((card) => {
    card.addEventListener("click", () => {
      const targetTab = card.getAttribute("data-jump-tab");
      if (targetTab) {
        activateTab(targetTab);
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) portfolioSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Modal Close Listeners (Project Detail & Certificate Preview)
  const certClose = document.getElementById("cert-modal-close");
  const certBackdrop = document.getElementById("cert-modal");
  if (certClose) certClose.addEventListener("click", closeCertModal);
  if (certBackdrop) {
    certBackdrop.addEventListener("click", (e) => {
      if (e.target === certBackdrop) closeCertModal();
    });
  }

  const projClose = document.getElementById("proj-modal-close");
  const projBackdrop = document.getElementById("project-detail-modal");
  if (projClose) projClose.addEventListener("click", closeProjectDetailModal);
  if (projBackdrop) {
    projBackdrop.addEventListener("click", (e) => {
      if (e.target === projBackdrop) closeProjectDetailModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCertModal();
      closeProjectDetailModal();
    }
  });

  // Contact Form Submission (Direct Email via Web3Forms with Mailto Fallback)
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      // Simpan salinan ke log browser (localStorage)
      const savedMessages = JSON.parse(localStorage.getItem("irazaky-inbox") || "[]");
      savedMessages.unshift({ name, email, message, date: new Date().toLocaleString("id-ID") });
      localStorage.setItem("irazaky-inbox", JSON.stringify(savedMessages));

      // Jika ada Access Key Web3Forms
      const accessKey = getProfile().web3FormsAccessKey || "";
      if (accessKey && accessKey.trim() !== "") {
        formData.append("access_key", accessKey.trim());
        formData.append("subject", `[Portofolio] Pesan Baru dari ${name}`);
        formData.append("from_name", "Ira Zaky Elmar Portfolio");
        formData.append("replyto", email);

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin w-4 h-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>Mengirim pesan...</span>
          `;
        }

        try {
          const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
          });
          const result = await res.json();

          if (result.success) {
            contactStatus.className = "p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--accent-emerald)] text-xs font-semibold text-[var(--accent-emerald)] block";
            contactStatus.textContent = `Terima kasih ${name}! Pesan kamu sudah berhasil terkirim langsung ke email Ira Zaky Elmar.`;
            contactForm.reset();
            return;
          } else {
            throw new Error(result.message || "Gagal mengirim pesan");
          }
        } catch (err) {
          contactStatus.className = "p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--accent-primary)] text-xs font-semibold text-[var(--accent-primary)] block";
          contactStatus.textContent = `Maaf, pesan gagal terkirim: ${err.message || "Koneksi terganggu"}. Silakan hubungi langsung ke WhatsApp atau email ${getProfile().email || FALLBACK_PROFILE.email}.`;
          return;
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
          }
        }
      }

      // Fallback jika belum memasukkan Access Key Web3Forms: buka mailto
      const fallbackEmail = (getProfile().socials && getProfile().socials.email) || FALLBACK_PROFILE.email;
      const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;

      contactStatus.className = "p-3.5 rounded-xl bg-[var(--bg-pill)] border border-[var(--accent-emerald)] text-xs font-semibold text-[var(--accent-emerald)] block";
      contactStatus.textContent = `Terima kasih ${name}! Aplikasi email dibuka untuk mengirim pesan langsung ke ${fallbackEmail}.`;
      contactForm.reset();
    });
  }
});