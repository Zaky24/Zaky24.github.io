import {
  PROFILE_DATA,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  TECH_STACK_DATA
} from "./data.js";
import { initSakuraCanvas } from "./sakura-canvas.js";

/* ==========================================================================
   PROJECT & CERTIFICATE ILLUSTRATION GENERATOR
   ========================================================================== */
function renderProjectThumbnail(project) {
  const { accentColor, secondaryColor, category, title } = project;
  return `
    <svg viewBox="0 0 480 250" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${title} preview">
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
  return `
    <svg viewBox="0 0 420 240" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${cert.title}">
      <rect width="420" height="240" fill="#0D1424" />
      <rect x="18" y="18" width="384" height="204" rx="8" fill="#111A2E" stroke="${cert.badgeColor}" stroke-opacity="0.5" stroke-width="1.5" />
      <rect x="28" y="28" width="364" height="184" rx="4" fill="none" stroke="#94A3B8" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <circle cx="210" cy="76" r="24" fill="${cert.badgeColor}" fill-opacity="0.18" stroke="${cert.badgeColor}" stroke-width="2" />
      <polygon points="210,62 214,71 224,72 217,79 219,88 210,83 201,88 203,79 196,72 206,71" fill="${cert.badgeColor}" />
      <rect x="135" y="116" width="150" height="8" rx="4" fill="#F8FAFC" fill-opacity="0.9" />
      <rect x="95" y="134" width="230" height="6" rx="3" fill="#94A3B8" fill-opacity="0.5" />
      <rect x="145" y="152" width="130" height="6" rx="3" fill="${cert.badgeColor}" fill-opacity="0.8" />
      <text x="210" y="188" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="10">${cert.issuer} · ${cert.date}</text>
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
   TYPEWRITER ENGINE ("Software Engineer", "Web Developer", "Fullstack Developer")
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById("typewriter-role");
  if (!el) return;

  const roles = PROFILE_DATA.roles;
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
   RENDER PORTFOLIO SHOWCASE (PROJECTS, CERTIFICATES, TECH STACK)
   ========================================================================== */
function renderPortfolioShowcase() {
  const projectsGrid = document.getElementById("projects-grid");
  const certificatesGrid = document.getElementById("certificates-grid");
  const techStackGrid = document.getElementById("techstack-grid");

  if (projectsGrid) {
    projectsGrid.innerHTML = PROJECTS_DATA.map(
      (proj) => `
      <article class="surface-card surface-card-interactive flex flex-col justify-between group overflow-hidden">
        <div>
          <div class="relative h-48 -mx-7 -mt-7 mb-5 overflow-hidden border-b border-[var(--border-subtle)] bg-[#0B1120]">
            ${renderProjectThumbnail(proj)}
          </div>

          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="tabular-nums-data text-xs font-semibold text-[var(--accent-secondary)]">
              ${proj.category}
            </span>
            <span class="tabular-nums-data text-xs text-[var(--text-muted)]">
              ${proj.timeline}
            </span>
          </div>

          <h3 class="text-xl font-bold text-[var(--text-primary)] mb-2">${proj.title}</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">${proj.description}</p>
        </div>

        <div class="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
          <div class="flex flex-wrap gap-1.5">
            ${proj.tech
          .map(
            (t) =>
              `<span class="tabular-nums-data text-xs px-2.5 py-1 rounded-md bg-[var(--bg-pill)] text-[var(--text-secondary)]">${t}</span>`
          )
          .join("")}
          </div>

          <div class="flex items-center justify-between gap-3 pt-1">
            <a
              href="${proj.liveUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-secondary)] hover:underline"
            >
              <span>Live Demo</span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>

            <button
              type="button"
              data-project-id="${proj.id}"
              class="project-detail-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-on-primary)] text-xs font-bold cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <span>Details</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `
    ).join("");

    projectsGrid.querySelectorAll(".project-detail-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-project-id");
        const proj = PROJECTS_DATA.find((p) => p.id === id);
        if (proj) openProjectDetailModal(proj);
      });
    });
  }

  // Certificates Grid (Tanpa tombol/link verifikasi sesuai permintaan user)
  if (certificatesGrid) {
    certificatesGrid.innerHTML = CERTIFICATES_DATA.map(
      (cert) => `
      <article class="surface-card surface-card-interactive flex flex-col justify-between group overflow-hidden">
        <div>
          <div class="relative h-44 -mx-7 -mt-7 mb-5 overflow-hidden border-b border-[var(--border-subtle)] bg-[#0D1424]">
            ${renderCertificateThumbnail(cert)}
          </div>
          <span class="tabular-nums-data text-xs text-[var(--accent-primary)] font-semibold block mb-1">
            ${cert.issuer} · ${cert.date}
          </span>
          <h3 class="text-lg font-bold text-[var(--text-primary)] mb-3">${cert.title}</h3>
        </div>

        <div class="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-start">
          <button
            type="button"
            data-cert-id="${cert.id}"
            class="cert-preview-btn inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-secondary)] hover:underline cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Lihat Sertifikat</span>
          </button>
        </div>
      </article>
    `
    ).join("");

    certificatesGrid.querySelectorAll(".cert-preview-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-cert-id");
        const cert = CERTIFICATES_DATA.find((c) => c.id === id);
        if (cert) openCertModal(cert);
      });
    });
  }

  if (techStackGrid) {
    techStackGrid.innerHTML = TECH_STACK_DATA.map(
      (item) => `
      <div class="surface-card surface-card-interactive flex flex-col items-center justify-center text-center p-5 gap-3">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center font-pixel-accent text-sm font-bold"
          style="background-color: ${item.color}18; color: ${item.color};"
        >
          ${item.code}
        </div>
        <div>
          <h3 class="text-base font-bold text-[var(--text-primary)] mb-0.5">${item.name}</h3>
          <span class="tabular-nums-data text-xs text-[var(--text-muted)]">${item.category}</span>
        </div>
      </div>
    `
    ).join("");
  }
}

/* ==========================================================================
   PROJECT DETAIL POPUP MODAL (CERITA PERJALANAN & FITUR UTAMA)
   ========================================================================== */
function openProjectDetailModal(proj) {
  const modal = document.getElementById("project-detail-modal");
  if (!modal) return;

  const titleEl = document.getElementById("proj-modal-title");
  const metaEl = document.getElementById("proj-modal-meta");
  const bannerEl = document.getElementById("proj-modal-banner");
  const storyEl = document.getElementById("proj-modal-story");
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

  if (storyEl) {
    if (typeof proj.story === "string") {
      storyEl.textContent = proj.story;
    } else if (proj.story && proj.story.background) {
      storyEl.textContent = proj.story.background;
    } else {
      storyEl.textContent = proj.description || "";
    }
  }

  if (featuresEl) {
    const featureList = Array.isArray(proj.features)
      ? proj.features
      : (proj.story && Array.isArray(proj.story.keyFeatures))
      ? proj.story.keyFeatures
      : [];

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
  }

  if (techEl && Array.isArray(proj.tech)) {
    techEl.innerHTML = proj.tech
      .map(
        (t) =>
          `<span class="tabular-nums-data text-xs px-2.5 py-1 rounded-md bg-[var(--bg-pill)] text-[var(--accent-secondary)]">${t}</span>`
      )
      .join("");
  }

  // Defensive handling for action buttons (Live Demo & Source Code)
  if (liveLinkEl) {
    if (proj.liveUrl) {
      liveLinkEl.setAttribute("href", proj.liveUrl);
      liveLinkEl.classList.remove("hidden");
    } else {
      liveLinkEl.classList.add("hidden");
    }
  }

  if (repoLinkEl) {
    if (proj.repoUrl) {
      repoLinkEl.setAttribute("href", proj.repoUrl);
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
  preview.innerHTML = renderCertificateThumbnail(cert);

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
  renderPortfolioShowcase();

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
  const panels = document.querySelectorAll(".showcase-panel");

  function activateTab(targetPanelId) {
    tabs.forEach((t) => {
      const controls = t.getAttribute("aria-controls");
      t.setAttribute("aria-selected", String(controls === targetPanelId));
    });
    panels.forEach((p) => {
      p.classList.toggle("hidden", p.id !== targetPanelId);
    });
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

  // Contact Form Submission (Direct Email via Mailto + Browser Inbox Log)
  const contactForm = document.getElementById("contact-form");
  const contactStatus = document.getElementById("contact-status");
  if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();

      // Simpan salinan ke log browser (localStorage)
      const savedMessages = JSON.parse(localStorage.getItem("irazaky-inbox") || "[]");
      savedMessages.unshift({ name, email, message, date: new Date().toLocaleString("id-ID") });
      localStorage.setItem("irazaky-inbox", JSON.stringify(savedMessages));

      // Buka aplikasi email pengunjung langsung ke irazakyelmar@gmail.com
      const subject = encodeURIComponent(`Pesan Portofolio dari ${name}`);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
      window.location.href = `mailto:${PROFILE_DATA.socials.email}?subject=${subject}&body=${body}`;

      contactStatus.classList.remove("hidden");
      contactStatus.textContent = `Terima kasih ${name}! Aplikasi email kamu dibuka untuk mengirim pesan langsung ke ${PROFILE_DATA.socials.email}.`;
      contactForm.reset();
    });
  }
});
