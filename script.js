document.addEventListener('DOMContentLoaded', () => {
  // --- Translations Data ---
  const translations = {
    id: {
      "nav-home": "Beranda",
      "nav-about": "Tentang",
      "nav-projects": "Sertifikasi",
      "nav-experience": "Pengalaman",
      "nav-contact": "Hubungi",
      "hero-eyebrow": "Cloud Engineer & IT Specialist",
      "hero-title": "Membangun <span class='gradient-text'>Infrastruktur Digital</span> yang Tangguh.",
      "hero-desc": "Saya adalah lulusan Sarjana Teknik Informatika dari universitas bani saleh bekasi dengan pengalaman di bidang IT Network Operation Center dan Cloud Engineer, berpengalaman melalui program intensif seperti AWS Re/Start dan Bootcamp cloud digitalskola. Menguasai Linux, dasar jaringan, Google Cloud Platform, AWS Serta Docker. Mampu bekerja cepat, teliti, dan kolaboratif dalam menyelesaikan masalah teknis serta meningkatkan efisiensi sistem.",
      "btn-projects": "Lihat Sertifikat",
      "btn-cv": "Download CV",
      "btn-about": "Tentang Saya",
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Tahun Kelulusan",
      "stat-projects": "Sertifikasi Keahlian",
      "about-title": "Tentang <span class='gradient-text'>Saya</span>",
      "about-subtitle": "Pakar IT yang fokus pada stabilitas jaringan dan skalabilitas cloud.",
      "about-card1-title": "Profil Profesional",
      "about-card1-desc": "Pakar infrastruktur IT dengan spesialisasi pada ekosistem Cloud dan stabilitas jaringan. Berpengalaman dalam menavigasi tantangan teknis kompleks melalui pendekatan yang terukur, adaptif, dan berorientasi pada hasil.",
      "about-cv-title": "Review CV Terbaru",
      "about-cv-desc": "Lihat detail kualifikasi dan pengalaman saya lebih mendalam melalui dokumen CV yang sudah di-update.",
      "btn-view-cv": "Buka CV",
      "about-card2-title": "Keahlian Utama",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "projects-title": "Sertifikasi <span class='gradient-text'>Terverifikasi</span>",
      "projects-subtitle": "Kualifikasi profesional saya dalam administrasi jaringan dan pengembangan web.",
      "cert-cat1": "Sertifikasi Internasional & Nasional",
      "cert-cat2": "Bootcamp & Program Intensif",
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "Sertifikasi MTCNA untuk manajemen jaringan dan administrasi routing MikroTik (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "Sertifikasi BNSP dalam administrasi jaringan komputer dan konfigurasi sistem (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "Sertifikasi BNSP untuk pengembangan aplikasi web dasar dan manajemen database (2022).",
      "project4-title": "AWS re/Start Cloud Computing",
      "project4-desc": "Program pengembangan karir cloud computing dari AWS & Orbit Future Academy (2025).",
      "project5-title": "Bootcamp Cloud Engineer",
      "project5-desc": "Program bootcamp intensif Digital Skola fokus pada infrastruktur cloud & devops (2023).",
      "project6-title": "Frontend Engineering",
      "project6-desc": "Program Kampus Merdeka Ruang Guru untuk pengembangan aplikasi web frontend (2024).",
      "btn-details": "Verifikasi",
      "exp-title": "Pengalaman <span class='gradient-text'>Kerja</span>",
      "exp-subtitle": "Perjalanan profesional saya sebagai Cloud Engineer dan IT Specialist.",
      "exp-present": "Sekarang",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Mengelola workflow tiket melalui Jira, merespons incident alert kritis secara real-time, dan mengawal kehandalan sistem berbasis cloud melalui monitoring terpadu Amazon CloudWatch 24/7.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Mendiagnosis dan memberikan solusi teknis untuk stabilitas jaringan Telkomsel, melakukan monitoring server proaktif, dan memastikan performa infrastruktur tetap berjalan optimal sesuai SLA.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Merancang dan mendemonstrasikan antarmuka web modern yang responsif dan berkinerja tinggi menggunakan React/Vue, serta menerapkan praktik terbaik dalam UI/UX.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Melakukan instalasi, provisioning, dan pemeliharaan infrastruktur IT lokal (LAN/WAN) secara berkala untuk mendukung operasional bisnis yang berkelanjutan.",
      "contact-title": "Mari Berkolaborasi",
      "contact-desc": "Tertarik mendiskusikan peluang kerja atau proyek teknologi? Mari kita hubungkan visi Anda dengan solusi infrastruktur yang tepat.",
      "btn-threads": "Threads",
      "footer-rights": "Setiap detail dirancang dengan presisi.",
      "t-whoami": "renaldy_imran",
      "t-uptime": "aktif 24 tahun, siap berkontribusi.",
      "t-skills": "GCP | AWS | Docker | K8s"
    },
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-projects": "Certifications",
      "nav-experience": "Experience",
      "nav-contact": "Contact",
      "hero-eyebrow": "Cloud Engineer & IT Specialist",
      "hero-title": "Building Resilient <span class='gradient-text'>Digital Infrastructure</span>.",
      "hero-desc": "I am a Computer Science graduate from Bani Saleh University Bekasi with experience in IT Network Operation Center and Cloud Engineering. Experienced through intensive programs such as AWS Re/Start and DigitalSkola Cloud Bootcamp. Proficient in Linux, networking fundamentals, Google Cloud Platform, AWS, and Docker. Capable of working fast, accurately, and collaboratively in solving technical problems and improving system efficiency.",
      "btn-projects": "View Certs",
      "btn-cv": "Download CV",
      "btn-about": "About Me",
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Graduation Year",
      "stat-projects": "Skill Certifications",
      "about-title": "About <span class='gradient-text'>Me</span>",
      "about-subtitle": "IT Expert focused on network stability and cloud scalability.",
      "about-card1-title": "Professional Profile",
      "about-card1-desc": "IT Infrastructure specialist with a core focus on Cloud ecosystems and network stability. Experienced in navigating complex technical challenges through a measured, adaptive, and result-oriented approach.",
      "about-cv-title": "Latest CV Review",
      "about-cv-desc": "See my detailed qualifications and experience more deeply through the updated CV document.",
      "btn-view-cv": "Open CV",
      "about-card2-title": "Core Skills",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "projects-title": "Verified <span class='gradient-text'>Certifications</span>",
      "projects-subtitle": "My professional qualifications in network administration and web development.",
      "cert-cat1": "International & National Certifications",
      "cert-cat2": "Bootcamps & Intensive Programs",
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "MTCNA certification for MikroTik network management and routing administration (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "BNSP certification in computer network administration and system configuration (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "BNSP certification for basic web application development and database management (2022).",
      "project4-title": "AWS re/Start Cloud Computing",
      "project4-desc": "AWS Cloud computing career development program & Orbit Future Academy (2025).",
      "project5-title": "Bootcamp Cloud Engineer",
      "project5-desc": "Intensive Digital Skola bootcamp focused on cloud infrastructure & devops (2023).",
      "project6-title": "Frontend Engineering",
      "project6-desc": "Kampus Merdeka Ruang Guru program for frontend web development (2024).",
      "btn-details": "Verify",
      "exp-title": "Work <span class='gradient-text'>Experience</span>",
      "exp-subtitle": "My professional journey as a Cloud Engineer and IT Specialist.",
      "exp-present": "Present",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Managed JIRA workflows, responded to critical cloud infrastructure alerts in real-time, and ensured 24/7 system reliability through Amazon CloudWatch monitoring.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Diagnosed and resolved technical issues for Telkomsel network stability, performed proactive server monitoring, and ensured optimal infrastructure performance according to SLAs.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Architected high-performance, responsive web interfaces using React/Vue, focusing on modern UI/UX principles and optimal user engagement.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Performed routine installation, provisioning, and maintenance of local IT infrastructure (LAN/WAN) to support daily business operations.",
      "contact-title": "Let's Collaborate",
      "contact-desc": "Interested in discussing career opportunities or tech projects? Let's connect your vision with the right infrastructure solutions.",
      "btn-threads": "Threads",
      "footer-rights": "Every detail crafted with precision.",
      "t-whoami": "renaldy_imran",
      "t-uptime": "up 24 years, active and ready.",
      "t-skills": "GCP | AWS | Docker | K8s"
    }
  };

  // --- State Core ---
  let currentLang = localStorage.getItem('lang') || 'id';
  let currentTheme = localStorage.getItem('theme') || 'dark';

  const updateLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update Terminal Content on language change
    if (document.getElementById('terminal-body')) {
      renderTerminal(lang);
    }

    document.getElementById('lang-toggle').textContent = lang.toUpperCase() === 'ID' ? 'EN' : 'ID';
    localStorage.setItem('lang', lang);
  };

  const renderTerminal = (lang) => {
    const termBody = document.getElementById('terminal-body');
    if (!termBody) return;

    termBody.innerHTML = `
      <div class="line"><span class="t-prompt">$</span> <span class="t-command">whoami</span></div>
      <div class="line t-output">${translations[lang]['t-whoami']}</div>
      <div class="line"><span class="t-prompt">$</span> <span class="t-command">uptime</span></div>
      <div class="line t-output">${translations[lang]['t-uptime']}</div>
      <div class="line"><span class="t-prompt">$</span> <span class="t-command">neofetch --skills</span></div>
      <div class="line t-output">${translations[lang]['t-skills']}</div>
      <div class="line"><span class="t-prompt">$</span> <span class="t-cursor">_</span></div>
    `;
  };

  const updateTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
  };

  // --- Initial Setup ---
  updateTheme(currentTheme);
  updateLanguage(currentLang);
  renderTerminal(currentLang);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Event Listeners ---
  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguage(currentLang);
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(currentTheme);
  });

  // --- Premium UI Logic ---
  // --- Premium UI Logic ---

  // 1. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + "%";
  });

  // 2. Reveal Animation System
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Trigger terminal animation if the card is revealed
        if (entry.target.querySelector('.terminal-card')) {
          // Terminal static render is handled but we could add typing here
        }
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 3. Copy Email Functionality
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'renaldyimran@gmail.com'; 
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Email Copied!';
        copyBtn.style.background = 'var(--accent)';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = '';
        }, 2000);
      });
    });
  }

  // --- Scroll Logic (Active Link) ---
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && (href.includes(`#${current}`) || href === `#${current}`)) {
        link.classList.add('active');
      }
    });
  });

  // --- External Links & Security ---
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http') || href.endsWith('.pdf')) && !link.hasAttribute('download')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
