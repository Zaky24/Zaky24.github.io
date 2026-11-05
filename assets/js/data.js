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
      "Web penyampaian informasi yang resmi di lingkungan civitas akademika Politeknik LP3I kampus Padang dan sekitarnya .",
    story:
      "Proyek ini saya buat berawal dari keinginan bahwa organiasi kami aktif dalam kegiatan sosialisasi, organisasi, memajukan dan meningkatkan SDM mahasiswa dengan Unit Kegiatan Mahasiswa, intinya website ini awalnya untuk branding dan sarana untuk menyampaikan informasi",
    sections: [
      {
        title: "Tantangan & Solusi",
        content: "pada saat pengembangan website ini saya masih lagi belajar dan menjadikan project website ini menjadi prakter belajar mandiri saya, dan akhirnya saya bisa mempelajari dasar-dasar dari pemrograman, terkhususnya bahasa PHP, dan di fasilitasi oleh kampus hostingannya. karena difasilitasi oleh kampus, untuk aksesnya terbatas dan ketat, akibatnya saya sering menemui operator IT untuk memperbaiki bug dari web yang dibuat, untuk mengatasi itu saya menyelesaikan semua yang di perbaiki agar tidak selalu merepotkan operator IT kampus"
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
    title: "E-Voting",
    category: "Laravel Framework",
    timeline: "2025",
    image: "assets/img/project/evoting.png",
    description:
      "Web mempermudah dan mengurangi permasalahan waktu dan kertas dalam pemilihan calon Ketua Organisasi Badan Eksekutif Mahasiswa di lingkungan kampus Politeknik LP3I Padang",
    story:
      "Proyek ini berawal dari kebutuhan praktis di lingkungan kampus Politeknik LP3I untuk mempermudah mahasiswa memilih kandidat, dan kendala waktu yang sangat singkat untuk melakukan pemilihan ketua Organisasi Badan Eksekutif Mahasiswa. Akhirnya saya selaku Menteri KOMINFO pada saat itu di amatkan untuk membuat website yang bisa mengatasi masalah tersebut dalam waktu ± 10 hari",
    sections: [
      {
        title: "Tantangan Solusi",
        content: "Karena di kasih waktu yang sangat singkat, saya manajemen waktu dengan sebaik mungkin antara perkuliahan dan pengerjaan project ini, dan mencari referensi sistem E-Voting yang beredar di internet dan memodifikasi nya sesuai dengan kebutuhan. akhirnya sistem E-Voting yang telah di buat efisien dalam menghemat waktu dan kertas"
      }
    ],
    features: [
      "Dashboard CRUD kandidat (visi-misi masing-masing kandidat, foto dan nama)",
      "Dashboard CRUD mahasiswa (Pemilih)",
      "Card kandidat",
      "Dashboard hasil voting",
      "Dan masih banyak lagi fitur yang ada di website ini"
    ],
    tech: ["Laravel", "CSS", "MySQL", "JavaScript"],
    liveUrl: "evotingbem.plp.ac.id",
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
