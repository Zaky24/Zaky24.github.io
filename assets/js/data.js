export const PROFILE_DATA = {
  name: "Ira Zaky Elmar",
  shortName: "Ira Zaky",
  badgeText: "Ready to Innovate",
  roles: [
    "Web Developer",
    "Fullstack Developer",
    "Software Engineer"
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
  journeyStartYear: 2024, // Tahun mulai kuliah & eksplorasi mendalam dunia IT (otomatis menghitung yearsLearning)
  get stats() {
    const currentYear = new Date().getFullYear();
    const startYear = this.journeyStartYear || 2024;
    const yearsDiff = Math.max(1, currentYear - startYear);
    return {
      projectsCount: Array.isArray(PROJECTS_DATA) ? PROJECTS_DATA.length : 0,
      certificatesCount: Array.isArray(CERTIFICATES_DATA) ? CERTIFICATES_DATA.length : 0,
      yearsLearning: `${yearsDiff}+`
    };
  },
  socials: {
    github: "https://github.com/Zaky24",
    linkedin: "https://www.linkedin.com/in/ira-zaky-0b6779447?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    instagram: "https://www.instagram.com/zaky__24?vrfl=ZjFianVoNjJxeXFo",
    whatsapp: "https://wa.me/6289507630763",
    email: "irazaky24@gmail.com"
  },
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
    title: "Portal Informasi BEM",
    category: "PHP Native Procedural",
    timeline: "2024",
    image: "assets/img/project/BEM.jpeg",
    description:
      "Web penyampaian informasi resmi di lingkungan civitas akademika Politeknik LP3I Kampus Padang dan sekitarnya.",
    story:
      "Proyek ini saya buat berawal dari keinginan bahwa organisasi kami aktif dalam kegiatan sosialisasi, keorganisasian, serta memajukan dan meningkatkan SDM mahasiswa bersama Unit Kegiatan Mahasiswa. Website ini dirancang sebagai pusat branding organisasi sekaligus sarana resmi penyampaian informasi.",
    sections: [
      {
        title: "Tantangan & Solusi",
        content: "Pada saat pengembangan website ini, saya menjadikannya sebagai praktik belajar mandiri hingga berhasil menguasai fondasi pemrograman web, khususnya bahasa PHP dan pengelolaan database MySQL yang difasilitasi hosting kampus. Karena akses server kampus yang ketat, awalnya saya sering berkoordinasi dengan operator IT kampus untuk perbaikan bug. Sebagai solusi, saya melakukan pengujian dan debugging menyeluruh secara lokal sebelum deployment agar sistem berjalan stabil tanpa merepotkan operator IT kampus."
      }
    ],
    tech: ["PHP", "CSS", "MySQL", "JavaScript"],
    liveUrl: "https://www.bem.plp.ac.id/",
    repoUrl: "",
    accentColor: "#E05263",
    secondaryColor: "#38BDF8"
  },
  {
    id: "proj-2",
    title: "E-Voting BEM LP3I",
    category: "Laravel Framework",
    timeline: "2025",
    image: "assets/img/project/evoting.png",
    description:
      "Sistem E-Voting berbasis web untuk mempermudah serta menghemat waktu dan kertas dalam pemilihan Ketua Badan Eksekutif Mahasiswa di Politeknik LP3I Padang.",
    story:
      "Proyek ini berawal dari kebutuhan nyata di lingkungan kampus Politeknik LP3I Padang untuk mempermudah mahasiswa dalam memilih kandidat secara digital, mengingat keterbatasan waktu jika dilakukan secara manual. Selaku Menteri KOMINFO BEM pada saat itu, saya diamanahkan untuk merancang dan menyelesaikan sistem E-Voting ini dalam waktu singkat (± 10 hari).",
    sections: [
      {
        title: "Tantangan & Solusi",
        content: "Dengan tenggat waktu pengerjaan yang sangat singkat di tengah padatnya jadwal perkuliahan, saya menerapkan manajemen waktu yang ketat serta mengadaptasi dan memodifikasi arsitektur sistem E-Voting berbasis Laravel sesuai kebutuhan pemilihan kampus. Hasilnya, sistem E-Voting ini sukses digunakan secara efisien, transparan, serta menghemat waktu dan penggunaan kertas."
      }
    ],
    features: [
      "Dashboard CRUD kandidat (visi-misi, foto, dan profil kandidat)",
      "Dashboard CRUD manajemen data mahasiswa (pemilih tetap)",
      "Antarmuka kartu pemilihan kandidat yang mudah digunakan",
      "Dashboard perhitungan suara (real-count) hasil voting",
      "Validasi hak pilih satu akun satu suara (one vote per student)"
    ],
    tech: ["Laravel", "CSS", "MySQL", "JavaScript"],
    liveUrl: "https://evotingbem.plp.ac.id",
    repoUrl: "",
    accentColor: "#E05263",
    secondaryColor: "#38BDF8"
  }
];

export const CERTIFICATES_DATA = [
  {
    id: "cert-1",
    title: "Olimpiade IT SLTA",
    issuer: "HMJ-MI UMMY",
    date: "2024",
    image: "assets/img/sertifikat/olimpiadeIT.png",
    badgeColor: "#38BDF8"
  },
  {
    id: "cert-2",
    title: "Junior Office Operator",
    issuer: "BNSP",
    date: "2025",
    image: "assets/img/sertifikat/juniorOfficeOperator.png",
    badgeColor: "#E05263"
  },
  {
    id: "cert-3",
    title: "Raimuna Nasional XII",
    issuer: "Kwartir Nasional Gerakan Pramuka",
    date: "2023",
    image: "assets/img/sertifikat/rainas.png",
    badgeColor: "#F59E0B"
  },
  {
    id: "cert-4",
    title: "Cybertech Programming Competition",
    issuer: "UKM Cybertech PNP",
    date: "2026",
    image: "assets/img/sertifikat/cybertechProgramming.png",
    badgeColor: "#0284C7"
  },
  {
    id: "cert-5",
    title: "Menteri Komunikasi dan Informatika",
    issuer: "BEM Politeknik LP3I Kampus Padang",
    date: "2026",
    image: "assets/img/sertifikat/BEM-LP3I.png",
    badgeColor: "#C83E4E"
  },
  {
    id: "cert-6",
    title: "Dialog Kebangsaan & Anti Radikalisme",
    issuer: "Densus 88 AT POLRI & Solok Muda",
    date: "2023",
    image: "assets/img/sertifikat/dialogKebangsaan.png",
    badgeColor: "#F59E0B"
  },
  {
    id: "cert-7",
    title: "Kemah Bakti Mahasiswa (KBM)",
    issuer: "Politeknik LP3I Kampus Padang",
    date: "2025",
    image: "assets/img/sertifikat/KBM-LP3I.png",
    badgeColor: "#10B981"
  },
  {
    id: "cert-8",
    title: "Pengenalan Kehidupan Kampus (PKKMB)",
    issuer: "Politeknik LP3I Kampus Padang",
    date: "2024",
    image: "assets/img/sertifikat/PKKMB-LP3I.png",
    badgeColor: "#A855F7"
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
    name: "Node.js",
    category: "Backend",
    color: "#339933",
    code: "NODE",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "Laravel",
    category: "Framework",
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
    name: "Git & GitHub",
    category: "Tools",
    color: "#F05032",
    code: "GIT",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  }
];
