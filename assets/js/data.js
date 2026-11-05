/**
 * Data Portofolio Pribadi — Ira Zaky Elmar
 * Edit file ini kapan saja untuk mengganti project asli, cerita pembuatan project, sertifikat, atau sosial media.
 */

export const PROFILE_DATA = {
  name: "Ira Zaky Elmar",
  shortName: "Ira Zaky",
  badgeText: "Ready to Innovate",
  roles: [
    "Software Engineer",
    "Web Developer",
    "Fullstack Developer"
  ],
  heroDescription:
    "Membangun website dan aplikasi fullstack yang modern, responsif, cepat, dan ramah pengguna. Menggabungkan fondasi kode yang bersih dengan desain antarmuka yang interaktif.",
  heroTechPills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js", "MySQL"],
  campus: "Politeknik LP3I",
  educationStatus: "Mahasiswa Aktif — Politeknik LP3I",
  location: "Indonesia",
  cvUrl: "./My-CV.pdf",
  profilePhoto: "./assets/img/fotoProfile-nobg.png",
  heroGif: "./heroSection.gif",
  aboutQuote: '"Transforming ideas into functional and memorable digital experiences."',
  aboutBioPrimary:
    "Halo! Saya Ira Zaky Elmar, seorang mahasiswa aktif di Politeknik LP3I yang memiliki ketertarikan mendalam di bidang Software Engineering, Web Development, dan Fullstack Development.",
  aboutBioSecondary:
    "Selama masa perkuliahan dan eksplorasi mandiri, saya aktif merancang serta mengembangkan berbagai proyek aplikasi web dari sisi frontend hingga backend. Saya selalu berfokus pada performa, tampilan UI/UX yang modern, serta struktur kode yang rapi dan mudah dikembangkan.",
  stats: {
    projectsCount: 6,
    certificatesCount: 6,
    yearsLearning: "2+"
  },
  socials: {
    github: "https://github.com/Zaky24",
    linkedin: "https://www.linkedin.com/in/ira-zaky-0b6779447?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/zaky__24?vrfl=ZjFianVoNjJxeXFo",
    whatsapp: "https://wa.me/6289507630763",
    email: "irazaky24@gmail.com"
  },
  // Masukkan kode Access Key dari Web3Forms di bawah ini:
  web3FormsAccessKey: "cebdbc56-0278-4e81-afe3-f4d741e56272"
};

/* ==========================================================================
   PANDUAN LENGKAP KUSTOMISASI PROYEK KAMU:
   Cukup edit data di bawah ini!
   - title: Nama proyek
   - category: Kategori (Fullstack Web, Frontend, UI/UX Design, dll)
   - timeline: Tahun / durasi pengerjaan
   - image: Link gambar thumbnail proyek (contoh: "./assets/img/projects/siakad.png" atau link URL https://...).
            Jika dikosongkan (""), otomatis menampilkan ilustrasi SVG cyberpunk yang keren!
   - description: Ringkasan singkat yang tampil di kartu depan
   - story: Cerita perjalanan proyek. BISA TULIS TEKS BIASA ATAU TAG HTML (<p>, <strong>, <a>, <img>, dll).
   - sections: [OPSIONAL] Tambah kolom-kolom baru sesuka hatimu! Tampilan otomatis rapi dan serasi dengan tema:
               sections: [
                 { title: "Latar Belakang", content: "Cerita latar belakang..." },
                 { title: "Tantangan Teknis", content: "Tantangan yang dihadapi..." },
                 { title: "Peran Saya", content: "Tanggung jawab dalam tim..." }
               ]
   - features: Daftar fitur utama. Kosongkan [] jika tidak ingin menampilkan fitur.
   - tech: Daftar teknologi. Kosongkan [] jika proyek tidak menggunakan tech stack (otomatis disembunyikan rapi!).
   - liveUrl: Link demo proyek (kosongkan "" jika belum ada demo live).
   - repoUrl: Link source code GitHub (kosongkan "" jika tidak ingin menampilkan tombol source code).
   ========================================================================== */
export const PROJECTS_DATA = [
  {
    id: "proj-1",
    title: "SIAKAD Campus Portal",
    category: "Fullstack Web",
    timeline: "2025",
    image: "", // Masukkan link gambar proyek kamu di sini (misal: "./assets/img/projects/siakad.png" atau URL https://...)
    description:
      "Sistem informasi akademik berbasis web untuk manajemen jadwal kuliah, nilai mahasiswa, dan presensi digital secara real-time dengan antarmuka responsif.",
    story:
      "Proyek ini berawal dari kebutuhan praktis di lingkungan kampus Politeknik LP3I untuk mempermudah mahasiswa mengecek jadwal dan nilai kuliah secara cepat dari HP. Tantangan terbesarnya adalah merancang struktur database yang optimal untuk ratusan data mahasiswa serta membangun antarmuka yang bersih dan responsif menggunakan Tailwind CSS.",
    sections: [
      {
        title: "Latar Belakang & Masalah",
        content: "Sebelumnya presensi dan jadwal masih diakses melalui sistem yang lambat saat jam sibuk. Aplikasi ini dirancang agar ringan dan dapat diakses cepat dari smartphone."
      },
      {
        title: "Tantangan Teknis & Solusi",
        content: "Mengoptimalkan query database relasional antara tabel mahasiswa, dosen, dan mata kuliah agar kalkulasi IPK dan pencetakan KHS berjalan instan."
      }
    ],
    features: [
      "Dashboard jadwal kuliah harian & notifikasi perubahan kelas",
      "Presensi digital mahasiswa terintegrasi",
      "Cetak Kartu Hasil Studi (KHS) otomatis ke PDF",
      "Panel dosen untuk pengelolaan nilai mata kuliah"
    ],
    tech: ["Laravel", "Tailwind CSS", "MySQL", "JavaScript"],
    liveUrl: "https://github.com",
    repoUrl: "",
    accentColor: "#E05263",
    secondaryColor: "#38BDF8"
  },
  {
    id: "proj-2",
    title: "Sakura POS & Inventory",
    category: "Fullstack App",
    timeline: "2025",
    description:
      "Aplikasi Point of Sale (Kasir) dan manajemen stok barang untuk UMKM lengkap dengan laporan penjualan harian, cetak struk, dan grafik analitik.",
    story:
      "Dibuat untuk membantu pelaku usaha kecil mengelola transaksi penjualan dan memantau stok barang tanpa harus mencatat manual di buku. Dibangun dengan backend REST API Node.js dan database PostgreSQL dengan integritas data transaksi yang ketat agar stok tidak minus.",
    features: [
      "Antarmuka kasir cepat dengan pencarian produk instan",
      "Peringatan otomatis saat stok barang menipis",
      "Laporan penjualan harian dan grafik analitik",
      "Cetak struk belanja format thermal printer"
    ],
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    accentColor: "#38BDF8",
    secondaryColor: "#F59E0B"
  },
  {
    id: "proj-3",
    title: "Neo-Tokyo Task & Study Planner",
    category: "Web Application",
    timeline: "2025",
    description:
      "Aplikasi manajemen tugas kuliah dan proyek tim dengan fitur kanban board drag-and-drop, pengingat deadline, serta mode fokus Pomodoro.",
    story:
      "Dirancang untuk membantu produktivitas belajar mahasiswa dengan menggabungkan papan tugas visual (Kanban) dan timer fokus Pomodoro. Fokus utama proyek ini adalah kenyamanan interaksi drag-and-drop di layar HP maupun desktop serta tampilan dark mode yang ramah mata.",
    features: [
      "Kanban board interaktif (To-Do, In Progress, Done)",
      "Timer Pomodoro terintegrasi dengan riwayat jam belajar",
      "Label prioritas tugas dan pengingat tanggal deadline",
      "Penyimpanan data lokal yang otomatis tersinkronisasi"
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    accentColor: "#E05263",
    secondaryColor: "#A855F7"
  },
  {
    id: "proj-4",
    title: "E-Katalog & Landing Page UMKM",
    category: "Frontend Web",
    timeline: "2024",
    description:
      "Website katalog produk interaktif dengan fitur filter pencarian cepat, keranjang pesanan otomatis ke WhatsApp, dan optimasi SEO lokal.",
    story:
      "Membantu UMKM memiliki etalase digital yang cepat dibuka dan langsung terhubung ke chat WhatsApp admin penjual. Proyek ini mengedepankan performa loading di bawah 1 detik dengan optimasi gambar dan penulisan CSS utilitas yang efisien.",
    features: [
      "Pencarian produk instan dan filter kategori harga",
      "Keranjang belanja yang otomatis membuat format chat WA",
      "Skor performa tinggi dan ramah mesin pencari Google",
      "Tampilan mobile-first yang nyaman diakses dari smartphone"
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript ES6", "Vite"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    accentColor: "#10B981",
    secondaryColor: "#38BDF8"
  },
  {
    id: "proj-5",
    title: "RestoOrder QR Table System",
    category: "Fullstack Web",
    timeline: "2025",
    description:
      "Platform pemesanan makanan mandiri melalui scan QR Code di meja restoran yang terhubung langsung ke layar dapur (Kitchen Display System).",
    story:
      "Mengatasi antrean pemesanan di restoran saat jam sibuk. Pelanggan cukup scan QR meja untuk memilih menu dan memesan, sementara koki di dapur langsung menerima pesanan secara real-time menggunakan WebSockets.",
    features: [
      "Scan QR Code otomatis mengenali nomor meja pelanggan",
      "Layar pesanan dapur (KDS) yang terupdate secara real-time",
      "Pelacakan status pesanan langsung dari meja",
      "Manajemen status ketersediaan menu restoran"
    ],
    tech: ["React", "Tailwind CSS", "Node.js", "Socket.io"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    accentColor: "#F59E0B",
    secondaryColor: "#E05263"
  },
  {
    id: "proj-6",
    title: "Personal Expense & Budget Tracker",
    category: "Web Application",
    timeline: "2024",
    description:
      "Aplikasi pencatat keuangan pribadi mahasiswa untuk memantau pemasukan, pengeluaran bulanan, dan visualisasi kategori tabungan.",
    story:
      "Dibuat untuk memudahkan pencatatan anggaran bulanan mahasiswa. Dilengkapi dengan visualisasi grafik persentase pengeluaran makanan, transportasi, dan kebutuhan kuliah agar keuangan tetap terkendali.",
    features: [
      "Pencatatan cepat pemasukan dan pengeluaran harian",
      "Visualisasi grafik interaktif per kategori pengeluaran",
      "Batas anggaran bulanan dengan indikator peringatan",
      "Fitur ekspor riwayat keuangan ke file CSV/Excel"
    ],
    tech: ["React", "Tailwind CSS", "Chart.js", "REST API"],
    liveUrl: "https://github.com",
    repoUrl: "https://github.com",
    accentColor: "#38BDF8",
    secondaryColor: "#10B981"
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "cert-2",
    title: "Belajar Membuat Aplikasi Back-End & REST API",
    issuer: "Dicoding Indonesia",
    date: "2025",
    image: "assets/img/sertifikat/olimpiadeIT.png",
    // badgeColor: ""
  },
  {
    id: "cert-6",
    title: "Junior Office Operator",
    issuer: "BNSP",
    date: "2025",
    image: "assets/img/sertifikat/juniorOfficeOperator.png",
    badgeColor: "#E05263"
  },
  {
    id: "cert-3",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    date: "2025",
    image: "",
    badgeColor: "#F59E0B"
  },
  {
    id: "cert-4",
    title: "Responsive Web Design & Modern CSS Architecture",
    issuer: "freeCodeCamp",
    date: "2024",
    image: "",
    badgeColor: "#10B981"
  },
  {
    id: "cert-5",
    title: "Database Design & SQL Programming",
    issuer: "Oracle Academy / Campus Workshop",
    date: "2025",
    image: "",
    badgeColor: "#A855F7"
  },
  {
    id: "cert-8",
    title: "Git & GitHub Version Control Mastery",
    issuer: "Progate / Skillvul",
    date: "2024",
    image: "",
    badgeColor: "#38BDF8"
  }
];

export const TECH_STACK_DATA = [
  {
    name: "HTML5",
    category: "Frontend",
    color: "#E34F26",
    code: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    name: "CSS3",
    category: "Frontend",
    color: "#1572B6",
    code: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  },
  {
    name: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    code: "JS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
    code: "TS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    color: "#06B6D4",
    code: "TW",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
  },
  {
    name: "React JS",
    category: "Frontend",
    color: "#61DAFB",
    code: "RCT",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    name: "Next.js",
    category: "Fullstack",
    color: "#F8FAFC",
    code: "NXT",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  },
  {
    name: "Node.js",
    category: "Backend",
    color: "#339933",
    code: "NODE",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "PHP / Laravel",
    category: "Backend",
    color: "#FF2D20",
    code: "LRV",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg"
  },
  {
    name: "MySQL",
    category: "Database",
    color: "#4479A1",
    code: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#336791",
    code: "PG",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    color: "#F05032",
    code: "GIT",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  }
];
