/**
 * BUILD PORTFOLIO SHOWCASE → STATIC HTML
 * ============================================================
 * Ambalan:
 * 1. Ekspor data dari assets/js/data.js ke assets/data/portfolio.json
 *    (satu sumber data, mudah diedit tanpa menyentuh kode render).
 * 2. Render semua kartu Projects, Certificates, dan Tech Stack ke index.html
 *    di antara <!-- showcase:*:start --> dan <!-- showcase:*:end -->,
 *    sehingga isi portofolio sudah ada di HTML mentah (bagus untuk SEO & AI).
 * 3. Pagination dilakukan oleh JS di browser (lihat assets/js/main.js).
 *
 * Jalankan: npm run build:html
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  PROFILE_DATA,
  PROJECTS_DATA,
  CERTIFICATES_DATA,
  TECH_STACK_DATA
} from "../assets/js/data.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://zaky24.github.io/";

/* --------------------------------------------------------------------------
   1. EXPORT JSON
   -------------------------------------------------------------------------- */
const JSON_OUT = join(ROOT, "assets", "data", "portfolio.json");
mkdirSync(dirname(JSON_OUT), { recursive: true });
writeFileSync(
  JSON_OUT,
  JSON.stringify(
    {
      profile: {
        name: PROFILE_DATA.name,
        shortName: PROFILE_DATA.shortName,
        badgeText: PROFILE_DATA.badgeText,
        roles: PROFILE_DATA.roles,
        cvUrl: PROFILE_DATA.cvUrl,
        journeyStartYear: PROFILE_DATA.journeyStartYear,
        socials: PROFILE_DATA.socials,
        web3FormsAccessKey: PROFILE_DATA.web3FormsAccessKey
      },
      projects: PROJECTS_DATA,
      certificates: CERTIFICATES_DATA,
      techStack: TECH_STACK_DATA
    },
    null,
    2
  ) + "\n",
  "utf8"
);
console.log(`[json] ${JSON_OUT}`);

/* --------------------------------------------------------------------------
   2. RENDER CARD MARKUP (harus identik dengan assets/js/main.js)
   -------------------------------------------------------------------------- */
const esc = (value = "") =>
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

export function projectThumbnail(project) {
  if (project.image && project.image.trim() !== "") {
    return `
      <img
        src="${project.image}"
        alt="${esc(project.title)} Preview"
        width="640" height="360"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy" decoding="async"
      />`;
  }

  const { accentColor, secondaryColor, category, title } = project;
  return `
    <svg viewBox="0 0 480 250" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${esc(title)} preview">
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
      <text x="416" y="46" text-anchor="end" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="9">${esc(category)}</text>
    </svg>`;
}

export function certificateThumbnail(cert, eager = false) {
  if (cert.image && cert.image.trim() !== "") {
    return `
      <img
        src="${cert.image}"
        alt="${esc(cert.title)}"
        width="640" height="420"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        ${eager ? 'fetchpriority="low"' : ""}
        loading="lazy" decoding="async"
      />`;
  }

  return `
    <svg viewBox="0 0 420 240" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" role="img" aria-label="${esc(cert.title)}">
      <rect width="420" height="240" fill="#0D1424" />
      <rect x="18" y="18" width="384" height="204" rx="8" fill="#111A2E" stroke="${cert.badgeColor}" stroke-opacity="0.5" stroke-width="1.5" />
      <rect x="28" y="28" width="364" height="184" rx="4" fill="none" stroke="#94A3B8" stroke-opacity="0.15" stroke-dasharray="4 4" />
      <circle cx="210" cy="76" r="24" fill="${cert.badgeColor}" fill-opacity="0.18" stroke="${cert.badgeColor}" stroke-width="2" />
      <polygon points="210,62 214,71 224,72 217,79 219,88 210,83 201,88 203,79 196,72 206,71" fill="${cert.badgeColor}" />
      <rect x="135" y="116" width="150" height="8" rx="4" fill="#F8FAFC" fill-opacity="0.9" />
      <rect x="95" y="134" width="230" height="6" rx="3" fill="#94A3B8" fill-opacity="0.5" />
      <rect x="145" y="152" width="130" height="6" rx="3" fill="${cert.badgeColor}" fill-opacity="0.8" />
      <text x="210" y="188" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="10">${esc(cert.issuer)} · ${esc(cert.date)}</text>
    </svg>`;
}

export function projectCard(proj) {
  return `
      <article class="surface-card surface-card-interactive flex flex-col justify-between group overflow-hidden">
        <div>
          <div class="relative h-48 -mx-7 -mt-7 mb-5 overflow-hidden border-b border-[var(--border-subtle)] bg-[#0B1120]">
            ${projectThumbnail(proj)}
          </div>

          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="tabular-nums-data text-xs font-semibold text-[var(--accent-secondary)]">${esc(proj.category)}</span>
            <span class="tabular-nums-data text-xs text-[var(--text-muted)]">${esc(proj.timeline)}</span>
          </div>

          <h3 class="text-xl font-bold text-[var(--text-primary)] mb-2">${esc(proj.title)}</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-5 leading-relaxed">${esc(proj.description)}</p>
        </div>

        <div class="space-y-4 pt-3 border-t border-[var(--border-subtle)]">
          ${Array.isArray(proj.tech) && proj.tech.length > 0 ? `
          <div class="flex flex-wrap gap-1.5">
            ${proj.tech
              .map(
                (t) =>
                  `<span class="tabular-nums-data text-xs px-2.5 py-1 rounded-md bg-[var(--bg-pill)] text-[var(--text-secondary)]">${esc(t)}</span>`
              )
              .join("")}
          </div>` : ""}

          <div class="flex items-center justify-between gap-3 pt-1">
            ${proj.liveUrl && proj.liveUrl.trim() !== "" ? `
            <a
              href="${esc(normalizeExternalUrl(proj.liveUrl))}"
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
            </a>` : `<span class="text-xs text-[var(--text-muted)] tabular-nums-data">Portfolio Showcase</span>`}

            <button
              type="button"
              data-project-id="${esc(proj.id)}"
              class="project-detail-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--accent-on-primary)] text-xs font-bold cursor-pointer transition-transform hover:-translate-y-0.5 ml-auto"
            >
              <span>Details</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </article>`;
}

export function certificateCard(cert, eager = false) {
  return `
      <article class="surface-card surface-card-interactive flex flex-col justify-between group overflow-hidden">
        <div>
          <div class="relative h-44 -mx-7 -mt-7 mb-5 overflow-hidden border-b border-[var(--border-subtle)] bg-[#0D1424]">
            ${certificateThumbnail(cert, eager)}
          </div>
          <span class="tabular-nums-data text-xs text-[var(--accent-primary)] font-semibold block mb-1">
            ${esc(cert.issuer)} · ${esc(cert.date)}
          </span>
          <h3 class="text-lg font-bold text-[var(--text-primary)] mb-3">${esc(cert.title)}</h3>
        </div>

        <div class="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-start">
          <button
            type="button"
            data-cert-id="${esc(cert.id)}"
            class="cert-preview-btn inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-secondary)] hover:underline cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Lihat Sertifikat</span>
          </button>
        </div>
      </article>`;
}

export function techStackCard(item) {
  return `
      <div class="surface-card surface-card-interactive flex flex-col items-center justify-center text-center p-5 gap-3 group">
        <div
          class="w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 transition-transform group-hover:scale-110"
          style="background-color: ${item.color}18; color: ${item.color};"
        >
          ${item.icon && item.icon.trim() !== ""
            ? `<img src="${item.icon}" alt="${esc(item.name)} icon" width="32" height="32" class="w-8 h-8 object-contain" loading="lazy" decoding="async" />`
            : `<span class="font-pixel-accent text-sm font-bold">${esc(item.code)}</span>`}
        </div>
        <div>
          <h3 class="text-base font-bold text-[var(--text-primary)] mb-0.5">${esc(item.name)}</h3>
          <span class="tabular-nums-data text-xs text-[var(--text-muted)]">${esc(item.category)}</span>
        </div>
      </div>`;
}

/* --------------------------------------------------------------------------
   3. INJECT KE index.html
   -------------------------------------------------------------------------- */
const INDEX = join(ROOT, "index.html");
let html = readFileSync(INDEX, "utf8");

function replaceBlock(source, name, inner) {
  const start = `<!-- showcase:${name}:start -->`;
  const end = `<!-- showcase:${name}:end -->`;
  const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);
  if (!pattern.test(source)) {
    throw new Error(`Blok ${start} … ${end} tidak ditemukan di index.html`);
  }
  return source.replace(pattern, `${start}${inner}\n        ${end}`);
}

html = replaceBlock(html, "projects", PROJECTS_DATA.map((p) => projectCard(p)).join("\n"));
html = replaceBlock(
  html,
  "certificates",
  CERTIFICATES_DATA.map((c, i) => certificateCard(c, i < 3)).join("\n")
);
html = replaceBlock(html, "techstack", TECH_STACK_DATA.map((t) => techStackCard(t)).join("\n"));

// 4. Sinkronkan angka statistik (sebelum JS jalan) + schema ItemList
html = html.replace(
  /(<span id="stat-projects-count"[^>]*>)\d+(<\/span>)/,
  `$1${PROJECTS_DATA.length}$2`
);
html = html.replace(
  /(<span id="stat-certificates-count"[^>]*>)\d+(<\/span>)/,
  `$1${CERTIFICATES_DATA.length}$2`
);

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Portofolio Proyek Ira Zaky Elmar",
  itemListElement: PROJECTS_DATA.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.title,
    description: p.description,
    url: p.liveUrl ? normalizeExternalUrl(p.liveUrl) : SITE_URL
  }))
};
html = html.replace(
  /<!-- showcase:schema:start -->[\s\S]*?<!-- showcase:schema:end -->/,
  `<!-- showcase:schema:start -->\n  <script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n  <!-- showcase:schema:end -->`
);

writeFileSync(INDEX, html, "utf8");
console.log(
  `[html] index.html — ${PROJECTS_DATA.length} projects, ${CERTIFICATES_DATA.length} certificates, ${TECH_STACK_DATA.length} tech stack`
);

/* --------------------------------------------------------------------------
   4. SITEMAP (lastmod diisi otomatis saat build)
   -------------------------------------------------------------------------- */
const today = new Date().toISOString().slice(0, 10);
const SITEMAP = join(ROOT, "sitemap.xml");
writeFileSync(
  SITEMAP,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}My-CV.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,
  "utf8"
);
console.log(`[sitemap] sitemap.xml (lastmod ${today})`);
