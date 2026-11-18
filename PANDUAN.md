# PANDUAN — Cara Update Portofolio

Panduan kerja harian untuk situs ini. Semua data ada di **satu file**: `assets/js/data.js`.

---

## Alur Singkat (hafalin ini)

```
1. Taruh gambar          → assets/img/project/  atau  assets/img/sertifikat/
2. Edit data             → assets/js/data.js
3. Build                 → npm run build
4. Cek lokal             → npm run dev
5. Commit & push         → git add -A && git commit -m "..." && git push
```

**Aturan paling penting:**

> Setelah mengubah `data.js`, **WAJIB** jalankan `npm run build`.
> Kalau lupa, item baru **tidak akan muncul** di halaman.

Alasannya: kartu project & sertifikat sekarang **ditulis langsung ke `index.html`** saat build (bukan dirender JavaScript). Itu yang membuat isi situs akhirnya terbaca Google dan mesin AI. Konsekuensinya, HTML harus di-generate ulang setiap data berubah.

---

## 1. Menambah Project

### Langkah 1 — Siapkan gambar

Simpan di `assets/img/project/`.

- Format **WebP** (paling ringan)
- Lebar maksimal **1200px**
- Target ukuran **< 150 KB**
- Nama file **tanpa spasi**, pakai tanda hubung: `sistem-akademik.webp`

> Kalau belum ada gambarnya, isi `image: ""` — situs otomatis menampilkan ilustrasi SVG bertema cyberpunk. Jadi project tetap bisa tampil tanpa gambar.

### Langkah 2 — Edit `assets/js/data.js`

Buka file itu, cari `export const PROJECTS_DATA = [`, lalu tempel objek baru **di dalam** array (boleh di atas atau di bawah, urutan tampil mengikuti urutan di array):

```js
{
  id: "proj-3", // WAJIB unik. Jangan sama dengan yang lain.
  title: "Sistem Informasi Akademik",
  category: "Laravel Framework",
  timeline: "2026",
  image: "assets/img/project/sistem-akademik.webp",
  description:
    "Ringkasan singkat 1–2 baris yang tampil di kartu depan.",
  story:
    "Cerita lengkap proyek ini. Muncul di popup saat tombol Details diklik.",
  sections: [
    { title: "Tantangan & Solusi", content: "Penjelasan tantangan..." },
    { title: "Peran Saya", content: "Apa yang saya kerjakan..." }
  ],
  features: [
    "Fitur pertama",
    "Fitur kedua",
    "Fitur ketiga"
  ],
  tech: ["Laravel", "MySQL", "Tailwind CSS"],
  liveUrl: "https://contoh.com",                 // "" kalau belum ada demo
  repoUrl: "",                                   // "" kalau tidak mau tampil tombol Source Code
  accentColor: "#E05263",
  secondaryColor: "#38BDF8"
}
```

### Arti tiap field

| Field | Wajib | Keterangan |
|---|---|---|
| `id` | ✅ | **Harus unik.** Dipakai tombol Details untuk mencari data. Kalau dobel, yang kebuka cuma yang pertama. |
| `title` | ✅ | Nama project. |
| `category` | ✅ | Label kecil di atas judul, mis. `Laravel Framework`, `PHP Native`. |
| `timeline` | ✅ | Tahun/durasi, mis. `2026` atau `2025–2026`. |
| `image` | — | Path gambar. `""` = pakai ilustrasi SVG otomatis. |
| `description` | ✅ | Tampil di kartu depan. Teks biasa. |
| `story` | — | Isi popup Details. **Boleh HTML mentah** (`<p>`, `<strong>`, `<a>`, `<ul>`). |
| `sections` | — | Kotak tambahan di popup. `content` juga boleh HTML. Kosongkan `[]` kalau tidak perlu. |
| `features` | — | Daftar fitur di popup. Kosongkan `[]` untuk menyembunyikan bagian ini. |
| `tech` | — | Pill teknologi di kartu & popup. Kosongkan `[]` untuk menyembunyikan. |
| `liveUrl` | — | Tombol Live Demo. `""` = tombol disembunyikan. |
| `repoUrl` | — | Tombol Source Code. `""` = tombol disembunyikan. |
| `accentColor` | — | Warna aksen ilustrasi SVG fallback. |
| `secondaryColor` | — | Warna sekunder ilustrasi SVG fallback. |

> **Penting beda perlakuan teks:** `title`, `description`, `category`, `timeline`, `issuer` di-*escape* (aman, tidak bisa jadi HTML). Tapi `story` dan `sections[].content` dirender **sebagai HTML** — jadi kalau mau tebal/miring/paragraf, tulis tag HTML di situ.

---

## 2. Menambah Sertifikat

### Langkah 1 — Siapkan gambar

Simpan di `assets/img/sertifikat/`.

- Format **WebP**
- Lebar maksimal **1200px**
- Target **< 200 KB**
- Nama tanpa spasi: `sertifikat-bnsp-2026.webp`

> Sertifikat lama di folder itu masih PNG/JPG berukuran 1,6–4,8 MB. Itu sumber berat halaman di HP. Kalau sempat, kompres & konversi ke WebP, lalu update path di `data.js`.

### Langkah 2 — Edit `assets/js/data.js`

Cari `export const CERTIFICATES_DATA = [`, tambahkan:

```js
{
  id: "cert-12", // WAJIB unik
  title: "Nama Sertifikat Lengkap",
  issuer: "Lembaga Penerbit",
  date: "2026",
  image: "assets/img/sertifikat/sertifikat-bnsp-2026.webp",
  badgeColor: "#0284C7"
}
```

| Field | Wajib | Keterangan |
|---|---|---|
| `id` | ✅ | Unik. Dipakai tombol "Lihat Sertifikat". |
| `title` | ✅ | Nama sertifikat. |
| `issuer` | ✅ | Penerbit. Tampil sebagai `Penerbit · Tahun`. |
| `date` | ✅ | Tahun. |
| `image` | — | `""` = pakai kartu sertifikat SVG otomatis. |
| `badgeColor` | — | Warna badge pada ilustrasi fallback. |

**Sertifikat dikomentari yang sudah siap pakai:** di `data.js` ada dua entri yang masih dimatikan (ditandai `//`), gambarnya sudah tersedia — **KBM LP3I** (`cert-5`) dan **PKKMB LP3I** (`cert-3`). Hapus tanda `//` di depan tiap baris, jalankan build, langsung muncul.

---

## 3. Menambah Tech Stack

Cari `export const TECH_STACK_DATA = [`:

```js
{
  name: "React",
  category: "Frontend",
  color: "#61DAFB",
  code: "REACT",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
}
```

`icon` boleh dikosongkan (`""`) — nanti yang tampil adalah badge teks dari `code`.
Daftar ikon tersedia di [devicon](https://devicon.dev/) (`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<nama>/<nama>-original.svg`).

---

## 4. Build, Cek, Deploy

### Build

```bash
npm run build
```

Kalau sukses, muncul konfirmasi:

```
[json] D:\portofolio\assets\data\portfolio.json
[html] index.html — 3 projects, 10 certificates, 9 tech stack
[sitemap] sitemap.xml (lastmod 2026-11-18)
```

Angka di situ adalah pengecekan cepat — pastikan jumlahnya sesuai yang lu harapkan.

### Cek lokal

```bash
npm run dev
```

Buka `http://127.0.0.1:8765`. Yang perlu dicek:
- Kartu baru muncul di grid
- Tombol **Details** / **Lihat Sertifikat** membuka popup dengan isi benar
- Pagination menambah halaman kalau item sudah melebihi batas
- Angka **Total Projects** / **Certificates** di section About ikut berubah

### Deploy

```bash
git add -A
git commit -m "tambah project sistem akademik"
git push origin main
```

GitHub Actions (`.github/workflows/deploy.yml`) otomatis deploy dalam 1–2 menit.

---

## 5. Apa yang Otomatis vs Manual

| Hal | Otomatis lewat `npm run build`? |
|---|---|
| Kartu project & sertifikat muncul | ✅ |
| Angka Total Projects / Certificates | ✅ |
| Pagination menyesuaikan jumlah item | ✅ |
| Tech stack grid | ✅ |
| JSON-LD `ItemList` proyek (SEO) | ✅ |
| `lastmod` di `sitemap.xml` | ✅ (tanggal build) |
| `id` tetap unik | ❌ lu yang jaga |
| Gambar dikompres | ❌ manual |
| `?v=` cache-busting | ❌ manual (lihat di bawah) |
| Push ke GitHub | ❌ manual |

---

## 6. Jebakan yang Sering Kejadian

### ❌ Edit manual di dalam penanda build

Di `index.html` ada blok seperti ini:

```html
<!-- showcase:projects:start -->
   ...isi di sini ditimpa total setiap build...
<!-- showcase:projects:end -->
```

Begitu juga `showcase:certificates`, `showcase:techstack`, dan `showcase:schema`. **Jangan edit di dalamnya** — perubahan lu akan hilang saat build berikutnya. Edit datanya di `data.js`, atau template-nya di `scripts/build-portfolio.mjs`.

### ❌ Lupa `npm run build`

Gejala: data sudah diubah di `data.js`, tapi di browser tidak ada yang berubah. Solusi: jalankan build, lalu hard-refresh (`Ctrl + Shift + R`).

### ❌ `id` dobel

Gejala: klik Details pada project B, yang terbuka isi project A. Solusi: pastikan setiap `id` unik.

### ❌ Browser masih pakai file lama (cache)

Kalau mengubah `custom.css` atau `main.js`, naikkan nomor versi di `index.html`:

```html
<link rel="stylesheet" href="./assets/css/custom.css?v=2.0" />   ← jadi v=2.1
<script type="module" src="./assets/js/main.js?v=2.0"></script>  ← jadi v=2.1
```

Kalau tidak dinaikkan, pengunjung lama bisa tetap melihat versi cache.

### ❌ Nama file gambar pakai spasi

`assets/img/sertifikat/sertifikat pemrograman.jpg` itu **rawan rusak** saat di-deploy (spasi harus di-encode jadi `%20`). Sebaiknya rename pakai tanda hubung: `sertifikat-pemrograman.webp`.

### ❌ Menambah class Tailwind baru tapi tidak build

Class Tailwind di-generate dari pemindaian file. Kalau menambah class baru di `scripts/build-portfolio.mjs`, wajib `npm run build` (urutan build sudah benar: HTML dulu, baru CSS).

---

## 7. Kalau Mau Ubah Tampilan Kartu

Bukan di `main.js`. Template kartu ada di `scripts/build-portfolio.mjs`:

| Fungsi | Mengatur |
|---|---|
| `projectCard()` | Markup kartu project |
| `certificateCard()` | Markup kartu sertifikat |
| `techStackCard()` | Markup kartu tech stack |
| `projectThumbnail()` | Gambar/ilustrasi project |
| `certificateThumbnail()` | Gambar/ilustrasi sertifikat |

Setelah diedit → `npm run build`.

Untuk mengubah **jumlah kartu per halaman**, edit di `assets/js/main.js`:

```js
const SHOWCASE_PANELS = {
  projects:     { pageSize: { mobile: 2, desktop: 3 } },
  certificates: { pageSize: { mobile: 3, desktop: 6 } }
};
```

`mobile` berlaku di layar < 768px, `desktop` di atasnya.

---

## 8. Mengubah Data Diri (bukan project/sertifikat)

Masih di `assets/js/data.js`, bagian `PROFILE_DATA`:

| Yang mau diubah | Field |
|---|---|
| Peran di hero (teks mengetik) | `roles` |
| Deskripsi hero | `heroDescription` |
| Tahun mulai di dunia IT (angka "2+") | `journeyStartYear` |
| Link CV | `cvUrl` |
| WhatsApp / LinkedIn / Instagram / GitHub / email | `socials` |
| Key form kontak | `web3FormsAccessKey` |

**Yang TIDAK bisa diubah dari `data.js`** — harus edit `index.html` langsung (di luar blok `showcase:*`):
- `<title>` dan meta description
- Meta keywords
- JSON-LD `Person` (jobTitle, knowsAbout, hasCredential)
- Teks paragraf di section About
- Nomor WhatsApp di section Contact

**File `My-CV.pdf`** harus diedit sendiri di Word/Canva — tidak ada hubungannya dengan build.

---

## 9. Troubleshooting

| Gejala | Penyebab | Solusi |
|---|---|---|
| Item baru tidak muncul | Lupa build | `npm run build` |
| Muncul tapi gambar rusak (ikon patah) | Path/nama file salah, atau ada spasi | Cek `image:` di `data.js` = path asli file |
| Tombol Details buka project yang salah | `id` dobel | Beri `id` unik |
| Pagination tidak muncul | Item masih sedikit (≤ batas per halaman) | Normal — pagination muncul kalau lebih dari 1 halaman |
| Tampilan berubah jadi berantakan | Class Tailwind baru belum di-generate | `npm run build` |
| CSS/JS tidak berubah setelah edit | Cache browser | Naikkan `?v=` di `index.html`, hard-refresh |
| Deploy sukses tapi situs kosong | Folder salah / file tidak ke-commit | Cek `git status`, pastikan `index.html` & `assets/` ikut |
| Push ditolak minta login | Kredensial tidak tersimpan | Pakai Personal Access Token, atau GitHub Desktop |

---

## 10. Checklist Sebelum Push

- [ ] Gambar sudah ada di folder yang benar
- [ ] `image:` di `data.js` sudah menunjuk path yang benar (tanpa spasi)
- [ ] `id` unik
- [ ] `npm run build` sudah dijalankan, angkanya sesuai
- [ ] `npm run dev` → kartu muncul, popup terbuka, pagination benar
- [ ] Cek juga di mode **Light** (tombol toggle kanan atas)
- [ ] `git add -A && git commit -m "..." && git push origin main`

---

## Referensi Cepat

| Perintah | Fungsi |
|---|---|
| `npm install` | Pasang dependency (sekali saja, setelah clone) |
| `npm run build` | Generate `index.html`, `portfolio.json`, `sitemap.xml`, `tailwind.css` |
| `npm run build:html` | Hanya generate HTML + JSON + sitemap |
| `npm run build:css` | Hanya generate CSS Tailwind |
| `npm run watch:css` | Auto-build CSS saat file berubah |
| `npm run dev` | Jalankan server lokal di port 8765 |

| File | Isi |
|---|---|
| `assets/js/data.js` | **Sumber data utama** — edit di sini |
| `assets/data/portfolio.json` | Hasil generate, jangan diedit manual |
| `scripts/build-portfolio.mjs` | Template kartu + generator HTML |
| `index.html` | Halaman utama (blok `showcase:*` di-generate) |
| `assets/css/custom.css` | Style kustom, token warna, pagination |
| `assets/css/tailwind.css` | Hasil generate Tailwind, jangan diedit manual |
| `assets/js/main.js` | Pagination, modal, tema, form kontak |
| `assets/js/sakura-canvas.js` | Animasi kelopak sakura |
| `sitemap.xml` | Hasil generate, `lastmod` otomatis |
