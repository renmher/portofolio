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
      "hero-desc": "Tenaga profesional IT yang berpengalaman dalam Network Operation Center dan Cloud Engineering. Ahli dalam mengelola AWS, Google Cloud, dan Docker.",
      "btn-projects": "Lihat Sertifikat",
      "btn-cv": "Download CV",
      "btn-about": "Tentang Saya",
      "profile-role": "Junior Devops | Cloud Engineer | IT Network",
      "stat-years": "Tahun Kelulusan",
      "stat-projects": "Sertifikasi Keahlian",
      "about-title": "Tentang <span class='gradient-text'>Saya</span>",
      "about-subtitle": "Pakar IT yang fokus pada stabilitas jaringan dan skalabilitas cloud.",
      "about-card1-title": "Ringkasan Profesional",
      "about-card1-desc": "Saya berpengalaman dalam mengelola infrastruktur cloud dan operasional jaringan. Mampu bekerja cepat, teliti, dan kolaboratif dalam menyelesaikan masalah teknis yang kompleks.",
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
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "Sertifikasi MTCNA untuk manajemen jaringan dan administrasi routing MikroTik (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "Sertifikasi BNSP dalam administrasi jaringan komputer dan konfigurasi sistem (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "Sertifikasi BNSP untuk pengembangan aplikasi web dasar dan manajemen database (2022).",
      "btn-details": "Verifikasi",
      "exp-title": "Pengalaman <span class='gradient-text'>Kerja</span>",
      "exp-subtitle": "Perjalanan profesional saya sebagai Cloud Engineer dan IT Specialist.",
      "exp-present": "Sekarang",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Mengelola tiket Jira, merespons alert infrastruktur, dan memantau kesehatan sistem via CloudWatch 24/7.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Menganalisa dan memberikan solusi terkait permasalahan jaringan kartu Telkomsel serta monitoring server.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Membangun antarmuka web responsif menggunakan HTML, CSS/SASS, JavaScript dan React/Vue.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Instalasi, konfigurasi, dan pemeliharaan rutin perangkat komputer serta pemantauan jaringan lokal LAN/WAN.",
      "contact-title": "Mari Berkolaborasi",
      "contact-desc": "Tertarik bekerja sama atau ingin melihat detail lebih lanjut? Hubungi saya sekarang.",
      "btn-email": "Email Saya",
      "footer-rights": "Seluruh hak dilindungi."
    },
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-projects": "Certifications",
      "nav-experience": "Experience",
      "nav-contact": "Contact",
      "hero-eyebrow": "Cloud Engineer & IT Specialist",
      "hero-title": "Building Resilient <span class='gradient-text'>Digital Infrastructure</span>.",
      "hero-desc": "IT Professional experienced in Network Operation Center and Cloud Engineering. Expert in managing AWS, Google Cloud, and Docker.",
      "btn-projects": "View Certs",
      "btn-cv": "Download CV",
      "btn-about": "About Me",
      "profile-role": "Cloud Engineer | IT Network",
      "stat-years": "Graduation Year",
      "stat-projects": "Skill Certifications",
      "about-title": "About <span class='gradient-text'>Me</span>",
      "about-subtitle": "IT Expert focused on network stability and cloud scalability.",
      "about-card1-title": "Professional Summary",
      "about-card1-desc": "Experienced in cloud infrastructure and network operations. Capable of working fast, accurately, and collaboratively to solve complex technical issues.",
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
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "MTCNA certification for MikroTik network management and routing administration (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "BNSP certification in computer network administration and system configuration (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "BNSP certification for basic web application development and database management (2022).",
      "btn-details": "Verify",
      "exp-title": "Work <span class='gradient-text'>Experience</span>",
      "exp-subtitle": "My professional journey as a Cloud Engineer and IT Specialist.",
      "exp-present": "Present",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Managing Jira tickets, responding to infrastructure alerts, and monitoring system health via CloudWatch 24/7.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Analyzing and providing solutions for Telkomsel network issues and monitoring server performance.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Building responsive web interfaces using HTML, CSS/SASS, JavaScript and React/Vue.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Installation, configuration, and routine maintenance of computer devices and LAN/WAN local network monitoring.",
      "contact-title": "Let's Collaborate",
      "contact-desc": "Interested in working together or want to see more details? Contact me now.",
      "btn-email": "Email Me",
      "footer-rights": "All rights reserved."
    }
  };

  // --- State Core ---
  let currentLang = localStorage.getItem('lang') || 'id';
  let currentTheme = localStorage.getItem('theme') || 'dark';

  // --- Typing Effect Logic ---
  let typingTimer;
  const startTypingEffect = (text) => {
    const titleEl = document.querySelector('.hero-content h1');
    if (!titleEl) return;
    clearTimeout(typingTimer);
    titleEl.innerHTML = '';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        titleEl.innerHTML = text.substring(0, i);
        i++;
        typingTimer = setTimeout(type, 30);
      }
    };
    type();
  };

  const updateLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    document.getElementById('lang-toggle').textContent = lang.toUpperCase() === 'ID' ? 'EN' : 'ID';
    localStorage.setItem('lang', lang);
    // Restart typing effect on language change
    startTypingEffect(translations[lang]["hero-title"]);
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

  // --- Scroll Logic ---
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
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- Reveal Animations ---
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
  });

  // --- Magnetic Buttons ---
  const magneticBtns = document.querySelectorAll('.btn, .control-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.pageX - position.left - position.width / 2;
      const y = e.pageY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // --- External Links ---
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http') || href.endsWith('.pdf'))) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});
