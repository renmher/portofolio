import React, { useState, useEffect } from 'react';
import Certifications from './components/Certifications';
import Chatbot from './components/Chatbot';

const App = () => {
  // --- States ---
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [emailCopied, setEmailCopied] = useState(false);

  // --- Translation Dictionary ---
  const t = {
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
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Tahun Kelulusan",
      "stat-projects": "Sertifikasi",
      "about-title": "Tentang <span class='gradient-text'>Saya</span>",
      "about-subtitle": "Pakar IT yang fokus pada stabilitas jaringan dan skalabilitas cloud.",
      "about-cv-title": "Review CV Terbaru",
      "about-cv-desc": "Lihat detail kualifikasi dan pengalaman saya lebih mendalam melalui dokumen CV yang sudah di-update.",
      "btn-view-cv": "Buka CV",
      "about-card2-title": "Keahlian Utama",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "exp-title": "Jejak <span class='gradient-text'>Karir</span>",
      "exp-subtitle": "Perjalanan profesional saya dalam dunia teknologi.",
      "exp-job1": "Junior DevOps - NashTa Group (Kontrak)",
      "exp-job1-desc": "<ul class='timeline-list'><li>Membangun dan mengelola pipeline CI/CD menggunakan GitLab CI untuk proses build, testing, dan deployment aplikasi.</li><li>Mendukung keamanan CI/CD, kontainerisasi, dan deployment aplikasi menggunakan SonarQube, Harbor, dan Trivy.</li><li>Melakukan troubleshooting pada server Linux, jaringan, kontainer, dan pipeline deployment.</li><li>Mendukung DevOps observability dengan mengelola Grafana, VictoriaLogs, VictoriaMetrics, dan tracing untuk monitoring infrastruktur, analisis log, metrik, alerting, dan penanganan insiden.</li></ul>",
      "exp-job2": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job2-desc": "<ul class='timeline-list'><li>Mengelola workflow tiket sistem menggunakan Jira.</li><li>Merespons incident alert kritis secara real-time.</li><li>Mengawal keandalan sistem berbasis cloud melalui monitoring terpadu Amazon CloudWatch 24/7.</li></ul>",
      "exp-job3": "IT Network Operation Center - PT. ACSA (Kontrak)",
      "exp-job3-desc": "<ul class='timeline-list'><li>Menerima, menganalisis, dan memberikan solusi untuk masalah terkait kartu Telkomsel.</li><li>Mengidentifikasi, menganalisis, dan menangani insiden layanan yang dilaporkan oleh pelanggan.</li><li>Melakukan monitoring server dan aplikasi Telkomsel.</li></ul>",
      "exp-job4": "Asisten Lab - Universitas Bani Saleh (Kontrak)",
      "exp-job4-desc": "<ul class='timeline-list'><li>Membantu dosen dan mahasiswa dalam menggunakan aplikasi dan software laboratorium selama sesi praktikum.</li><li>Menyiapkan, menginstal, dan memastikan aplikasi laboratorium siap digunakan sebelum perkuliahan dimulai.</li><li>Melakukan troubleshooting teknis dasar terkait software, jaringan, dan sistem komputer di laboratorium.</li><li>Memberikan panduan singkat atau pelatihan kepada mahasiswa tentang penggunaan aplikasi sesuai dengan persyaratan mata kuliah.</li><li>Melakukan pemeliharaan sistem, pembaruan software, pencatatan aktivitas, dan dokumentasi lisensi.</li></ul>",
      "exp-job5": "Frontend Engineering - Ruang Guru",
      "exp-job5-desc": "<ul class='timeline-list'><li>Merancang dan mengembangkan antarmuka web modern yang responsif dan berkinerja tinggi menggunakan React/Vue.</li><li>Menerapkan praktik terbaik dalam UI/UX dan optimalisasi interaksi pengguna.</li></ul>",
      "exp-job6": "IT Support - PT Wiraswasta Gemilang Indonesia (Magang)",
      "exp-job6-desc": "<ul class='timeline-list'><li>Melakukan instalasi, provisioning, dan pemeliharaan infrastruktur IT lokal (LAN/WAN) secara berkala.</li><li>Mendukung kelancaran operasional bisnis harian.</li></ul>",
      "contact-title": "Mari Berkolaborasi",
      "contact-desc": "Punya ide menarik? Mari kita wujudkan bersama melalui sentuhan desain yang tepat.",
      "btn-threads": "Threads",
      "footer-rights": "Seluruh hak dilindungi.",
      "copy-email": "Copy Email",
      "email-success": "Email Berhasil Disalin!"
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
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Graduation",
      "stat-projects": "Certifications",
      "about-title": "About <span class='gradient-text'>Me</span>",
      "about-subtitle": "IT Expert focused on network stability and cloud scalability.",
      "about-cv-title": "Latest CV Review",
      "about-cv-desc": "See my detailed qualifications and experience more deeply through the updated CV document.",
      "btn-view-cv": "Open CV",
      "about-card2-title": "Core Skills",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "exp-title": "Career <span class='gradient-text'>Path</span>",
      "exp-subtitle": "My professional journey in technology.",
      "exp-job1": "Junior DevOps - NashTa Group (Contract)",
      "exp-job1-desc": "<ul class='timeline-list'><li>Built and managed CI/CD pipelines using GitLab CI for application build, testing, and deployment processes.</li><li>Supported secure CI/CD, containerization, and application deployment using SonarQube, Harbor, and Trivy.</li><li>Performed troubleshooting on Linux servers, networks, containers, and deployment pipelines.</li><li>Supported DevOps observability by managing Grafana, VictoriaLogs, VictoriaMetrics, and tracing for infrastructure monitoring, log analysis, metrics, alerting, and incident troubleshooting.</li></ul>",
      "exp-job2": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job2-desc": "<ul class='timeline-list'><li>Managed JIRA workflows for ticket management.</li><li>Responded to critical cloud infrastructure alerts in real-time.</li><li>Ensured 24/7 system reliability through Amazon CloudWatch integrated monitoring.</li></ul>",
      "exp-job3": "IT Network Operation Center - PT. ACSA (Contract)",
      "exp-job3-desc": "<ul class='timeline-list'><li>Received, analyzed, and provided solutions for Telkomsel card-related issues.</li><li>Identified, analyzed, and troubleshot service incidents reported by customers.</li><li>Monitored Telkomsel servers and applications.</li></ul>",
      "exp-job4": "Lab Assistant - Bani Saleh University (Contract)",
      "exp-job4-desc": "<ul class='timeline-list'><li>Assisted lecturers and students in using laboratory applications and software during practical sessions.</li><li>Prepared, installed, and ensured laboratory applications were ready before classes started.</li><li>Performed basic technical troubleshooting related to software, networks, and computer systems in the laboratory.</li><li>Provided brief guidance or training to students on application usage based on course requirements.</li><li>Performed system maintenance, software updates, activity records, and license documentation.</li></ul>",
      "exp-job5": "Frontend Engineering - Ruang Guru",
      "exp-job5-desc": "<ul class='timeline-list'><li>Architected high-performance, responsive web interfaces using React/Vue.</li><li>Focused on modern UI/UX principles and optimal user engagement.</li></ul>",
      "exp-job6": "IT Support - PT Wiraswasta Gemilang Indonesia (Internship)",
      "exp-job6-desc": "<ul class='timeline-list'><li>Performed routine installation, provisioning, and maintenance of local IT infrastructure (LAN/WAN).</li><li>Supported daily business operations.</li></ul>",
      "btn-threads": "Threads",
      "footer-rights": "All rights reserved.",
      "copy-email": "Copy Email",
      "email-success": "Email Copied!"
    }
  };

  const curr = t[lang];

  // --- Effects ---
  
  // Sync Theme
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#030712' : '#f8fafc');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync Language LocalStorage
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Scroll Progress and Nav Highlights
  useEffect(() => {
    const handleScroll = () => {
      // 1. Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // 2. Active Section Highlight
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 180)) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reveal animations trigger
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Handlers ---
  const toggleLanguage = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopyEmail = () => {
    const email = 'renaldyimran@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const skillsList = [
    {
      name: "GCP, AWS",
      icon: "fa-solid fa-cloud",
      desc: {
        id: "Mendeploy VM, monitoring via CloudWatch, dan konfigurasi VPC jaringan cloud.",
        en: "Deploying VM instances, monitoring via CloudWatch, and configuring cloud VPC networks."
      }
    },
    {
      name: "Docker, K8s",
      icon: "fa-brands fa-docker",
      desc: {
        id: "Kontainerisasi aplikasi microservices dan mengelola replikasi deployment.",
        en: "Containerizing microservices and managing replicas of application deployments."
      }
    },
    {
      name: "GitLab, GitHub",
      icon: "fa-solid fa-code-merge",
      desc: {
        id: "Membuat alur otomatisasi build/test CI/CD Pipeline dan manajemen repositori.",
        en: "Building automated CI/CD build/test pipelines and repository management."
      }
    },
    {
      name: "TCP/IP, DNS",
      icon: "fa-solid fa-network-wired",
      desc: {
        id: "Diagnosis routing kartu jaringan Telkomsel dan penanganan record DNS di NOC.",
        en: "Diagnosing Telkomsel card routing and managing DNS record resolutions at NOC."
      }
    },
    {
      name: "Terraform",
      icon: "fa-solid fa-server",
      desc: {
        id: "Menulis kode arsitektur (IaC) untuk penyediaan server VPC otomatis.",
        en: "Writing Infrastructure as Code (IaC) to provision VPC servers automatically."
      }
    },
    {
      name: "Linux",
      icon: "fa-brands fa-linux",
      desc: {
        id: "Bash scripting untuk backup otomatis, setup environment, dan administrasi OS.",
        en: "Bash scripting for backups, environment setups, and OS server administration."
      }
    },
    {
      name: "Grafana, VictoriaMetrics",
      icon: "fa-solid fa-chart-line",
      desc: {
        id: "Mengelola log, metrik, sistem alerting, serta analisis performa infrastruktur secara real-time.",
        en: "Managing logs, metrics, alerting systems, and real-time infrastructure performance analysis."
      }
    },
    {
      name: "SonarQube, Harbor, Trivy",
      icon: "fa-solid fa-shield-halved",
      desc: {
        id: "Mendukung keamanan pipeline CI/CD, scanning vulnerability image, dan secure container registry.",
        en: "Supporting CI/CD pipeline security, image vulnerability scanning, and secure container registries."
      }
    }
  ];

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Background Visuals */}
      <div className="bg-visuals">
        <div className="grid-overlay"></div>
      </div>

      {/* Header & Nav */}
      <header>
        <div className="nav-wrapper">
          <div className="logo">R.</div>
          <nav className="desktop-nav">
            <ul>
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>{curr["nav-home"]}</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>{curr["nav-about"]}</a></li>
              <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>{curr["nav-projects"]}</a></li>
              <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>{curr["nav-experience"]}</a></li>
            </ul>
          </nav>
          <div className="controls">
            <div className="system-status" title={lang === 'id' ? 'Status Ketersediaan' : 'Availability Status'}>
              <span className="status-dot"></span>
              <span className="status-text">{lang === 'id' ? 'TERSEDIA' : 'AVAILABLE'}</span>
            </div>
            <button id="theme-toggle" className="control-btn" title="Toggle Theme" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button id="lang-toggle" className="control-btn" title="Switch Language" onClick={toggleLanguage}>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>
          <a href="#contact" className="nav-cta">{curr["nav-contact"]}</a>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className="mobile-nav">
        <ul>
          <li>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>
              <i className="fa-solid fa-house"></i>
              <span>{curr["nav-home"]}</span>
            </a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>
              <i className="fa-solid fa-user"></i>
              <span>{curr["nav-about"]}</span>
            </a>
          </li>
          <li>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>
              <i className="fa-solid fa-certificate"></i>
              <span>{lang === 'id' ? 'Sertif' : 'Certs'}</span>
            </a>
          </li>
          <li>
            <a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>
              <i className="fa-solid fa-briefcase"></i>
              <span>{lang === 'id' ? 'Karir' : 'Exp'}</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Container */}
      <main className="container">
        
        {/* Hero Section */}
        <section id="home" className="hero reveal">
          <div className="hero-content">
            <span className="eyebrow">{curr["hero-eyebrow"]}</span>
            <h1 dangerouslySetInnerHTML={{ __html: curr["hero-title"] }} />
            <p>{curr["hero-desc"]}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                <i className="fa-solid fa-certificate"></i> {curr["btn-projects"]}
              </a>
              <a href="/cv-renaldy.pdf" download="CV-Renaldy-Imran-Hermawan.pdf" className="btn btn-secondary">
                <i className="fa-solid fa-file-arrow-down"></i> {curr["btn-cv"]}
              </a>
            </div>
          </div>

          <aside className="profile-card">
            <div className="profile-img-container">
              <img src="/profile.png" alt="Renaldy Imran H" className="profile-img" />
            </div>
            <div className="profile-info">
              <h2>Renaldy Imran Hermawan</h2>
              <p>{curr["profile-role"]}</p>
              <div className="profile-stats">
                <div className="stat-item">
                  <span>2024</span>
                  <small>{curr["stat-years"]}</small>
                </div>
                <div className="stat-item">
                  <span>6+</span>
                  <small>{curr["stat-projects"]}</small>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* About Section */}
        <section id="about" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["about-title"] }} />
            <p>{curr["about-subtitle"]}</p>
          </div>
          <div className="grid">
            <article className="card">
              <h3 className="mb-4">{curr["about-cv-title"]}</h3>
              <p className="mb-4">{curr["about-cv-desc"]}</p>
              <a href="/cv-renaldy.pdf" download="CV-Renaldy-Imran-Hermawan.pdf" className="project-link" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                <span>{curr["btn-view-cv"]}</span> &rarr;
              </a>
            </article>

            <article className="card skills-card">
              <h3 className="mb-4">{curr["about-card2-title"]}</h3>
              <div className="skills-container">
                {skillsList.map((skill, idx) => (
                  <div key={idx} className="skill-tag-wrapper">
                    <span className="skill-tag">
                      <i className={skill.icon}></i> {skill.name}
                    </span>
                    <div className="skill-tooltip">
                      <div className="tooltip-header">
                        <i className={skill.icon}></i>
                        <strong>{skill.name}</strong>
                      </div>
                      <p className="tooltip-desc">{skill.desc[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Certifications Showcase Section */}
        <Certifications lang={lang} />

        {/* Experience Section */}
        <section id="experience" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["exp-title"] }} />
            <p>{curr["exp-subtitle"]}</p>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-cubes"></i></div>
              <div className="timeline-date">{lang === 'id' ? 'Feb 2026 - Saat ini' : 'Feb 2026 - Present'}</div>
              <div className="timeline-content">
                <h3>{curr["exp-job1"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job1-desc"] }} />
              </div>
            </article>

            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-cloud"></i></div>
              <div className="timeline-date">Jan 2025 - Jan 2026</div>
              <div className="timeline-content">
                <h3>{curr["exp-job2"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job2-desc"] }} />
              </div>
            </article>

            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-server"></i></div>
              <div className="timeline-date">{lang === 'id' ? 'Okt 2023 - Sep 2024' : 'Oct 2023 - Sep 2024'}</div>
              <div className="timeline-content">
                <h3>{curr["exp-job3"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job3-desc"] }} />
              </div>
            </article>

            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-chalkboard-user"></i></div>
              <div className="timeline-date">{lang === 'id' ? 'Mar 2022 - Okt 2023' : 'Mar 2022 - Oct 2023'}</div>
              <div className="timeline-content">
                <h3>{curr["exp-job4"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job4-desc"] }} />
              </div>
            </article>

            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-code"></i></div>
              <div className="timeline-date">2023</div>
              <div className="timeline-content">
                <h3>{curr["exp-job5"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job5-desc"] }} />
              </div>
            </article>

            <article className="card timeline-item">
              <div className="timeline-badge"><i className="fa-solid fa-desktop"></i></div>
              <div className="timeline-date">Feb 2018 - Apr 2018</div>
              <div className="timeline-content">
                <h3>{curr["exp-job6"]}</h3>
                <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr["exp-job6-desc"] }} />
              </div>
            </article>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="reveal">
          <div className="contact-banner">
            <h2>{curr["contact-title"]}</h2>
            <p className="mb-4">{curr["contact-desc"]}</p>
            <div className="contact-grid">
              <button id="copy-email" className="btn btn-primary" onClick={handleCopyEmail}>
                {emailCopied ? (
                  <>
                    <i className="fa-solid fa-check"></i> {curr["email-success"]}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-copy"></i> {curr["copy-email"]}
                  </>
                )}
              </button>
              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <i className="fa-brands fa-github"></i> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} Renaldy Imran Hermawan. {curr["footer-rights"]}</p>
        </div>
      </footer>

      {/* Chatbot Virtual Assistant */}
      <Chatbot lang={lang} />
    </>
  );
};

export default App;
