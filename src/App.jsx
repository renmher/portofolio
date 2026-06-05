import { useState, useEffect, useCallback } from 'react';
import Certifications from './components/Certifications';
import PipelineSimulator from './components/PipelineSimulator';
import ObservabilitySimulator from './components/ObservabilitySimulator';
import Chatbot from './components/Chatbot';
import { experiencesData, getDurationText } from './data/experiences';

const App = () => {
  // --- States ---
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [emailCopied, setEmailCopied] = useState(false);
  const [projectTabs, setProjectTabs] = useState({ 1: 'overview', 2: 'overview' });
  const [pipelineState, setPipelineState] = useState({ status: 'idle', stage: 0 });

  const handleProjectTabChange = (projectId, tab) => {
    setProjectTabs(prev => ({ ...prev, [projectId]: tab }));
  };

  const handlePipelineStatusChange = useCallback((status) => {
    setPipelineState(prev => {
      if (prev.status === status) return prev;
      return { ...prev, status };
    });
  }, []);

  const handlePipelineStageChange = useCallback((stage) => {
    setPipelineState(prev => {
      if (prev.stage === stage) return prev;
      return { ...prev, stage };
    });
  }, []);


  // --- Translation Dictionary ---
  const t = {
    id: {
      "nav-home": "Beranda",
      "nav-about": "Tentang",
      "nav-projects": "Proyek",
      "nav-pipeline": "Pipeline",
      "nav-monitor": "Observabilitas",
      "nav-certs": "Sertifikasi",
      "nav-experience": "Pengalaman",
      "nav-contact": "Hubungi",
      "hero-eyebrow": "WELCOME TO MY PORTFOLIO",
      "hero-title": "Renaldy Imran <span class='gradient-text'>Hermawan</span>, S.Kom",
      "hero-desc": "Junior DevOps & Cloud Engineer: Membangun infrastruktur digital yang tangguh, otomatisasi CI/CD, dan stabilitas sistem.",
      "hero-roles": "JUNIOR DEVOPS • CLOUD ENGINEER • IT NETWORK",
      "hero-location": "Bekasi, Indonesia",
      "hero-age": "24 Tahun",
      "about-pillars-title": "Pilar Fokus DevOps",
      "about-pillars-desc": "Mengelola otomatisasi siklus rilis dan integrasi multi-cloud.",
      "about-methods-title": "Metode Kerja",
      "about-methods-desc": "Mengutamakan otomatisasi, pemantauan aktif, dan keamanan sistem.",
      "about-edu-title": "Edukasi & Profil",
      "about-edu-desc": "Latar belakang akademis dan fokus spesialisasi profesional.",
      "btn-projects": "Lihat Proyek",
      "btn-cv": "Download CV",
      "btn-connect": "Hubungi Saya",
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
      "email-success": "Email Berhasil Disalin!",
      "profile-birthplace-label": "Tempat Lahir",
      "profile-birthplace-value": "Bekasi, Indonesia",
      "profile-birthyear-label": "Tahun Lahir",
      "profile-birthyear-value": "2001",

      // Personal Branding Mapping
      "brand-title": "Personal Branding <span class='gradient-text'>Mapping</span>",
      "brand-subtitle": "Pondasi profesional dan arah karir digital saya.",
      "brand-role-label": "Target Role / Karir",
      "brand-role-val": "DevOps & Cloud Engineer",
      "brand-skills-label": "Skill Utama",
      "brand-skills-val": "CI/CD Pipeline Automation, Infrastructure as Code (IaC), Cloud Security & Observability",
      "brand-strength-label": "Strength Utama",
      "brand-strength-val": "Troubleshooting cepat under pressure, Automation-First mindset, kolaborasi NOC & lintas tim",
      "brand-interest-label": "Bidang yang Diminati",
      "brand-interest-val": "Platform Engineering, SRE, DevSecOps, Cloud-Native Systems",

      // About Me Section Narrative
      "about-narrative-p1": "Halo! Saya Renaldy Imran Hermawan, lulusan Sarjana Komputer (S.Kom) dari Universitas Bani Saleh yang berdedikasi sebagai Junior DevOps & Cloud Engineer. Dengan latar belakang kuat dalam administrasi jaringan dan infrastruktur IT, saya berfokus pada otomatisasi siklus deployment (CI/CD), orkestrasi kontainer (Docker & Kubernetes), serta pengamanan pipeline (DevSecOps). Saya memiliki rekam jejak dalam merancang pipeline GitLab CI yang aman, mengelola registri kontainer, dan mengonfigurasi pemantauan real-time menggunakan Grafana dan VictoriaMetrics.",
      "about-narrative-p2": "Tujuan karir saya adalah menjadi Platform Engineer yang dapat merancang sistem infrastruktur skala besar yang handal dan efisien. Saya percaya bahwa otomatisasi dan observabilitas aktif adalah kunci dari stabilitas sistem. Dengan kombinasi keterampilan teknis di multi-cloud (GCP/AWS) dan keahlian kolaboratif yang terasah melalui pengalaman kerja kontrak maupun magang, saya siap membantu tim mempercepat siklus rilis produk dengan risiko operasional seminimal mungkin.",

      // Skills & Tools Section Categories
      "skills-title": "Skills & <span class='gradient-text'>Tools</span>",
      "skills-subtitle": "Teknologi, framework, dan soft skills yang saya gunakan sehari-hari.",
      "skills-cat-hard": "Hard Skills",
      "skills-cat-tools": "Tools & Software",
      "skills-cat-stack": "Tech Stack",
      "skills-cat-soft": "Soft Skills Relevan",
      "skills-val-hard": "CI/CD Pipeline Design, Container Orchestration, Cloud Architecture, Network Routing & Switching, OS Server Administration",
      "skills-val-tools": "Docker, Kubernetes, Terraform, Grafana, VictoriaMetrics, VictoriaLogs, SonarQube, Harbor, Trivy, Jira",
      "skills-val-stack": "YAML, Bash scripting, React.js, Node.js, SQL, Linux",
      "skills-val-soft": "Problem Solving under Pressure, Cross-team Collaboration, Adaptability & Continuous Learning, Analytical Thinking, Technical Communication",

      // Project Showcase Section
      "proj-section-title": "Proyek <span class='gradient-text'>Utama</span>",
      "proj-section-subtitle": "Karya teknik representatif dengan pendekatan pemecahan masalah secara terstruktur.",
      "proj-tab-overview": "Overview",
      "proj-tab-problem": "Masalah",
      "proj-tab-solution": "Solusi & Proses",
      "proj-tab-impact": "Hasil & Dampak",

      // Project 1 Details
      "proj1-name": "Otomatisasi Pipeline CI/CD Aman (Secure CI/CD Pipeline Automation)",
      "proj1-overview": "Membangun sistem integrasi dan deployment berkelanjutan (CI/CD) yang terintegrasi dengan pengujian keamanan statis untuk menjamin kualitas dan keamanan kode microservices.",
      "proj1-problem": "Proses deployment manual sebelumnya rentan terhadap kesalahan manusia (human-error), memakan waktu rilis hingga 2 jam, dan tidak memiliki verifikasi keamanan. Image kontainer sering dideploy tanpa scanning vulnerability, meningkatkan risiko celah keamanan di produksi.",
      "proj1-role": "Junior DevOps Engineer: Bertanggung jawab merancang arsitektur pipeline, menulis skrip otomasi CI/CD, mengonfigurasi vulnerability scanning, dan mengintegrasikan secure container registry.",
      "proj1-solution": "Mengembangkan pipeline multi-stage menggunakan GitLab CI (Build, Test, Security-Scan, Push, Deploy). Mengintegrasikan Trivy untuk pemindaian kerentanan image Docker, SonarQube untuk analisis kualitas kode statis, dan mengunggah image ke registry Harbor privat sebelum deployment otomatis.",
      "proj1-impact": "Waktu siklus deployment berkurang drastis dari 2 jam menjadi 8 menit (efisiensi 93%). Berhasil mendeteksi dan mencegah 90%+ celah keamanan kritis sebelum kode masuk ke lingkungan produksi.",

      // Project 2 Details
      "proj2-name": "Infrastruktur Observabilitas & Monitoring Stack (High-Performance Observability Stack)",
      "proj2-overview": "Implementasi stack monitoring terpadu berkinerja tinggi untuk mengumpulkan metrik sistem, menganalisis log secara real-time, dan mengonfigurasi sistem alarm notifikasi.",
      "proj2-problem": "Tim pengembang tidak memiliki visibilitas terhadap status resource server Linux dan container crash secara real-time. Mean Time to Detect (MTTD) insiden memakan waktu hingga 45 menit, menyebabkan downtime yang merugikan pengguna.",
      "proj2-role": "Observability & SRE Lead: Mengonfigurasi engine database metrik, merancang dasbor visualisasi data Grafana, dan mengintegrasikan alert rules dengan chat notification.",
      "proj2-solution": "Mendeploy VictoriaMetrics sebagai penyimpanan metrik deret waktu berkapasitas tinggi, mengonfigurasi Prometheus Node Exporter di seluruh VM, mengintegrasikan VictoriaLogs untuk pengumpulan log logis, dan mendesain dasbor komprehensif di Grafana dengan visualisasi grafik CPU, RAM, disk I/O, serta seting alert otomatis ke Telegram.",
      "proj2-impact": "Menurunkan MTTD insiden dari 45 menit menjadi kurang dari 2 menit (penurunan 95%). Meningkatkan uptime sistem sebesar 40% berkat deteksi dini dan troubleshooting logs yang terpusat.",

    },
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-projects": "Projects",
      "nav-pipeline": "Pipeline",
      "nav-monitor": "Observability",
      "nav-certs": "Certifications",
      "nav-experience": "Experience",
      "nav-contact": "Contact",
      "hero-eyebrow": "WELCOME TO MY PORTFOLIO",
      "hero-title": "Renaldy Imran <span class='gradient-text'>Hermawan</span>, S.Kom",
      "hero-desc": "Junior DevOps & Cloud Engineer: Building resilient digital infrastructures, automating CI/CD, and system stability.",
      "hero-roles": "JUNIOR DEVOPS • CLOUD ENGINEER • IT NETWORK",
      "hero-location": "Bekasi, Indonesia",
      "hero-age": "24 Years Old",
      "about-pillars-title": "DevOps Focus Pillars",
      "about-pillars-desc": "Managing release cycle automation and multi-cloud integration.",
      "about-methods-title": "Core Methodology",
      "about-methods-desc": "Prioritizing automation, active monitoring, and system security.",
      "about-edu-title": "Education & Profile",
      "about-edu-desc": "Academic background and specialized professional focus.",
      "btn-projects": "View Projects",
      "btn-cv": "Download CV",
      "btn-connect": "Let's Connect",
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
      "email-success": "Email Copied!",
      "profile-birthplace-label": "Place of Birth",
      "profile-birthplace-value": "Bekasi, Indonesia",
      "profile-birthyear-label": "Birth Year",
      "profile-birthyear-value": "2001",

      // Personal Branding Mapping
      "brand-title": "Personal Branding <span class='gradient-text'>Mapping</span>",
      "brand-subtitle": "My professional foundation and digital career direction.",
      "brand-role-label": "Target Role / Career",
      "brand-role-val": "DevOps & Cloud Engineer",
      "brand-skills-label": "Core Skills",
      "brand-skills-val": "CI/CD Pipeline Automation, Infrastructure as Code (IaC), Cloud Security & Observability",
      "brand-strength-label": "Key Strengths",
      "brand-strength-val": "Rapid troubleshooting under pressure, Automation-First mindset, NOC & cross-team collaboration",
      "brand-interest-label": "Fields of Interest",
      "brand-interest-val": "Platform Engineering, SRE, DevSecOps, Cloud-Native Systems",

      // About Me Section Narrative
      "about-narrative-p1": "Hello! I am Renaldy Imran Hermawan, a Computer Science graduate (S.Kom) from Bani Saleh University, dedicated to working as a Junior DevOps & Cloud Engineer. With a solid foundation in network administration and IT infrastructure, I focus on automating deployment cycles (CI/CD), container orchestration (Docker & Kubernetes), and securing delivery pipelines (DevSecOps). I have a proven track record of designing secure GitLab CI pipelines, managing container registries, and configuring real-time observability using Grafana and VictoriaMetrics.",
      "about-narrative-p2": "My career goal is to grow into a Platform Engineer capable of designing resilient and efficient large-scale infrastructure systems. I believe that automation and active observability are the cornerstones of system stability. Combining technical proficiency in multi-cloud environments (GCP/AWS) with strong collaborative skills refined across contract roles and internships, I am ready to help teams accelerate software release cycles while minimizing operational risks.",

      // Skills & Tools Section Categories
      "skills-title": "Skills & <span class='gradient-text'>Tools</span>",
      "skills-subtitle": "Technologies, frameworks, and soft skills I use daily.",
      "skills-cat-hard": "Hard Skills",
      "skills-cat-tools": "Tools & Software",
      "skills-cat-stack": "Tech Stack",
      "skills-cat-soft": "Relevant Soft Skills",
      "skills-val-hard": "CI/CD Pipeline Design, Container Orchestration, Cloud Architecture, Network Routing & Switching, OS Server Administration",
      "skills-val-tools": "Docker, Kubernetes, Terraform, Grafana, VictoriaMetrics, VictoriaLogs, SonarQube, Harbor, Trivy, Jira",
      "skills-val-stack": "YAML, Bash scripting, React.js, Node.js, SQL, Linux",
      "skills-val-soft": "Problem Solving under Pressure, Cross-team Collaboration, Adaptability & Continuous Learning, Analytical Thinking, Technical Communication",

      // Project Showcase Section
      "proj-section-title": "Main <span class='gradient-text'>Projects</span>",
      "proj-section-subtitle": "Representative engineering work with a structured problem-solving approach.",
      "proj-tab-overview": "Overview",
      "proj-tab-problem": "Problem",
      "proj-tab-solution": "Solution & Process",
      "proj-tab-impact": "Result & Impact",

      // Project 1 Details
      "proj1-name": "Secure CI/CD Pipeline Automation",
      "proj1-overview": "Built a continuous integration and deployment (CI/CD) system integrated with static application security testing to ensure microservices code quality and security.",
      "proj1-problem": "The previous manual deployment process was highly prone to human error, took up to 2 hours per release, and lacked security verification. Container images were deployed without vulnerability scanning, posing major security risks.",
      "proj1-role": "Junior DevOps Engineer: Responsible for designing pipeline architecture, writing CI/CD automation scripts, configuring vulnerability scanning, and integrating private container registries.",
      "proj1-solution": "Developed a multi-stage pipeline using GitLab CI (Build, Test, Security-Scan, Push, Deploy). Integrated Trivy for Docker image vulnerability scans, SonarQube for static code analysis, and uploaded images to a private Harbor registry before auto-deploying.",
      "proj1-impact": "Reduced deployment cycles from 2 hours to 8 minutes (93% efficiency gain). Successfully detected and prevented 90%+ critical vulnerabilities before code reached production environments.",

      // Project 2 Details
      "proj2-name": "High-Performance Observability Stack",
      "proj2-overview": "Implemented a high-performance unified monitoring stack to gather system metrics, analyze logs in real-time, and configure instant alert notification channels.",
      "proj2-problem": "The engineering team lacked real-time visibility into server resource utilization and container crashes. The Mean Time to Detect (MTTD) incidents was up to 45 minutes, leading to prolonged downtimes.",
      "proj2-role": "Observability & SRE Lead: Configured the metric database storage engine, designed Grafana visualization dashboards, and integrated alert rules with messaging channels.",
      "proj2-solution": "Deployed VictoriaMetrics as a high-capacity time-series metrics database, configured Prometheus Node Exporter across virtual instances, integrated VictoriaLogs for log collection, and designed a comprehensive Grafana dashboard showing CPU, RAM, disk usage, and integrated automated Telegram notifications.",
      "proj2-impact": "Reduced incident MTTD from 45 minutes to less than 2 minutes (95% detection speedup). Improved system uptime by 40% through early detection and centralized log troubleshooting.",

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

  const projectsList = [
    {
      id: 1,
      image: "/projects/pipeline-project.png",
      nameKey: "proj1-name",
      overviewKey: "proj1-overview",
      problemKey: "proj1-problem",
      roleKey: "proj1-role",
      solutionKey: "proj1-solution",
      impactKey: "proj1-impact",
      tools: ["GitLab CI", "Docker", "Harbor", "SonarQube", "Trivy", "Linux"]
    },
    {
      id: 2,
      image: "/projects/observability-project.png",
      nameKey: "proj2-name",
      overviewKey: "proj2-overview",
      problemKey: "proj2-problem",
      roleKey: "proj2-role",
      solutionKey: "proj2-solution",
      impactKey: "proj2-impact",
      tools: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Node Exporter", "Telegram API"]
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
          <nav className="desktop-nav">
            <ul>
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>{curr["nav-home"]}</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>{curr["nav-about"]}</a></li>
              <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>{curr["nav-projects"]}</a></li>
              <li><a href="#pipeline-simulator" className={activeSection === 'pipeline-simulator' ? 'active' : ''}>{curr["nav-pipeline"]}</a></li>
              <li><a href="#observability-simulator" className={activeSection === 'observability-simulator' ? 'active' : ''}>{curr["nav-monitor"]}</a></li>
              <li><a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>{curr["nav-certs"]}</a></li>
              <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>{curr["nav-experience"]}</a></li>
            </ul>
          </nav>
          <div className="controls">
            <button id="theme-toggle" className="control-btn" title="Toggle Theme" onClick={toggleTheme}>
              {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <button id="lang-toggle" className="control-btn" title="Switch Language" onClick={toggleLanguage}>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>
          <a href="/cv-renaldy.pdf" download="CV-Renaldy-Imran-Hermawan.pdf" className="nav-cv-btn">
            <i className="fa-solid fa-file-arrow-down"></i> CV
          </a>
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
              <i className="fa-solid fa-diagram-project"></i>
              <span>{lang === 'id' ? 'Proyek' : 'Proj'}</span>
            </a>
          </li>
          <li>
            <a href="#pipeline-simulator" className={activeSection === 'pipeline-simulator' ? 'active' : ''}>
              <i className="fa-solid fa-terminal"></i>
              <span>{lang === 'id' ? 'Pipeline' : 'Pipeline'}</span>
            </a>
          </li>
          <li>
            <a href="#observability-simulator" className={activeSection === 'observability-simulator' ? 'active' : ''}>
              <i className="fa-solid fa-chart-line"></i>
              <span>{lang === 'id' ? 'Monitor' : 'Monitor'}</span>
            </a>
          </li>
          <li>
            <a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>
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
            <p className="hero-desc">{curr["hero-desc"]}</p>
            <div className="hero-roles">{curr["hero-roles"]}</div>
            <div className="hero-meta">
              <span><i className="fa-solid fa-map-pin"></i> {curr["hero-location"]}</span>
              <span className="separator">•</span>
              <span><i className="fa-solid fa-cake-candles"></i> {curr["hero-age"]}</span>
            </div>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                {curr["btn-projects"]}
              </a>
              <a href="#contact" className="btn btn-secondary">
                {curr["btn-connect"]}
              </a>
            </div>
          </div>

          <div className="hero-image-container">
            <img src="/profile.png" alt="Renaldy Imran Hermawan" className="hero-profile-img" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["about-title"] }} />
            <p>{curr["about-subtitle"]}</p>
          </div>

          {/* About Narrative Storytelling (1-2 Paragraphs, Professional) */}
          <div className="about-narrative-card card mb-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '28px', borderRadius: 'var(--radius-lg)' }}>
            <div className="narrative-content" style={{ fontSize: '1.02rem', lineHeight: '1.7', color: 'var(--text-main)', opacity: '0.95' }}>
              <p className="mb-4">{curr["about-narrative-p1"]}</p>
              <p>{curr["about-narrative-p2"]}</p>
            </div>
          </div>

          {/* Personal Branding Mapping Section */}
          <div className="brand-mapping-section mb-12">
            <h3 className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: curr["brand-title"] }} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '16px' }} />
            <p className="text-muted text-center mb-8" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px' }}>{curr["brand-subtitle"]}</p>
            <div className="brand-mapping-grid grid mb-8">
              <div className="card brand-map-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="brand-map-icon" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}><i className="fa-solid fa-crosshairs"></i></div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{curr["brand-role-label"]}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{curr["brand-role-val"]}</p>
              </div>
              <div className="card brand-map-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="brand-map-icon" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}><i className="fa-solid fa-code"></i></div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{curr["brand-skills-label"]}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{curr["brand-skills-val"]}</p>
              </div>
              <div className="card brand-map-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="brand-map-icon" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}><i className="fa-solid fa-bolt"></i></div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{curr["brand-strength-label"]}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{curr["brand-strength-val"]}</p>
              </div>
              <div className="card brand-map-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="brand-map-icon" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}><i className="fa-solid fa-compass"></i></div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{curr["brand-interest-label"]}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{curr["brand-interest-val"]}</p>
              </div>
            </div>
          </div>

          {/* Skills & Tools Structured Categories */}
          <div className="skills-tools-section mb-12" style={{ marginTop: '48px' }}>
            <h3 className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: curr["skills-title"] }} style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '16px' }} />
            <p className="text-muted text-center mb-8" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px' }}>{curr["skills-subtitle"]}</p>
            <div className="skills-categories-grid grid mb-8">
              <div className="card skills-cat-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-gears" style={{ color: 'var(--primary)' }}></i> {curr["skills-cat-hard"]}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>{curr["skills-val-hard"]}</p>
              </div>
              <div className="card skills-cat-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-screwdriver-wrench" style={{ color: 'var(--primary)' }}></i> {curr["skills-cat-tools"]}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>{curr["skills-val-tools"]}</p>
              </div>
              <div className="card skills-cat-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-layer-group" style={{ color: 'var(--primary)' }}></i> {curr["skills-cat-stack"]}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>{curr["skills-val-stack"]}</p>
              </div>
              <div className="card skills-cat-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-users" style={{ color: 'var(--primary)' }}></i> {curr["skills-cat-soft"]}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6' }}>{curr["skills-val-soft"]}</p>
              </div>
            </div>
          </div>

          {/* Supplementary Profiles & Frameworks Grid */}
          <div className="grid">
            <article className="card">
              <h3 className="mb-4">{curr["about-cv-title"]}</h3>
              <p className="mb-4">{curr["about-cv-desc"]}</p>
              <a href="/cv-renaldy.pdf" target="_blank" rel="noopener noreferrer" className="project-link" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
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

            <article className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="mb-4">{curr["about-pillars-title"]}</h3>
                <p className="mb-3" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{curr["about-pillars-desc"]}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-code" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span><strong>IaC:</strong> Terraform, Ansible</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-repeat" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span><strong>CI/CD:</strong> GitLab CI, GitHub Actions</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-cubes" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span><strong>Cloud:</strong> GCP, AWS, Docker, K8s</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-chart-line" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span><strong>Observability:</strong> Grafana, VictoriaMetrics</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="mb-4">{curr["about-methods-title"]}</h3>
                <p className="mb-3" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{curr["about-methods-desc"]}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-shield-halved" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Keamanan: Security scanning di pipeline' : 'Security-First: Scanning in pipeline'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-robot" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Otomatisasi: Mengurangi error manual' : 'Automation: Minimizing manual errors'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-magnifying-glass-chart" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Observability: Monitoring proaktif 24/7' : 'Observability: Proactive 24/7 monitoring'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-network-wired" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Skalabilitas: Desain sistem handal' : 'Scalability: Resilient architecture'}</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 className="mb-4">{curr["about-edu-title"]}</h3>
                <p className="mb-3" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{curr["about-edu-desc"]}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-graduation-cap" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span><strong>S.Kom:</strong> Universitas Bani Saleh</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-bullseye" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Fokus: Infrastruktur & Jaringan' : 'Focus: Infrastructure & Network'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-house-laptop" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Siap Kerja: On-site / Hybrid / Remote' : 'Work Mode: On-site / Hybrid / Remote'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', width: '16px' }}></i>
                    <span>{lang === 'id' ? 'Domisili: Bekasi, Indonesia' : 'Location: Bekasi, Indonesia'}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Projects Showcase Section */}
        <section id="projects" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["proj-section-title"] }} />
            <p>{curr["proj-section-subtitle"]}</p>
          </div>

          <div className="projects-list-container" style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '20px' }}>
            {projectsList.map((project) => {
              const activeTab = projectTabs[project.id] || 'overview';
              return (
                <article key={project.id} className="card project-showcase-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Grid layout for visual and details */}
                  <div className="project-grid-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'start' }}>
                    {/* Visual Representation */}
                    <div className="project-showcase-visual" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="project-showcase-img-wrapper" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)', height: '260px' }}>
                        <img src={project.image} alt={curr[project.nameKey]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="project-showcase-tools" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {project.tools.map((tool, index) => (
                          <span key={index} className="skill-tag" style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '100px', background: 'var(--primary-glow)', color: 'var(--primary)', border: '1px solid rgba(37,99,235,0.15)', fontWeight: '600' }}>
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details & Storytelling Tabs */}
                    <div className="project-showcase-details" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                      <div>
                        <h3 style={{ fontSize: '1.45rem', marginBottom: '16px', color: 'var(--text-main)', fontFamily: 'var(--font-heading)', fontWeight: '700' }}>{curr[project.nameKey]}</h3>
                        
                        {/* Tabs Bar */}
                        <div className="project-story-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: '4px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {['overview', 'problem', 'solution', 'impact'].map((tab) => (
                            <button
                              key={tab}
                              className={`tab-btn-sm ${activeTab === tab ? 'active' : ''}`}
                              onClick={() => handleProjectTabChange(project.id, tab)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                                fontSize: '0.82rem',
                                fontWeight: '700',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                                transition: 'var(--transition)'
                              }}
                            >
                              {tab === 'overview' && curr["proj-tab-overview"]}
                              {tab === 'problem' && curr["proj-tab-problem"]}
                              {tab === 'solution' && curr["proj-tab-solution"]}
                              {tab === 'impact' && curr["proj-tab-impact"]}
                            </button>
                          ))}
                        </div>

                        {/* Tab Content Display */}
                        <div className="project-story-content" style={{ minHeight: '140px', fontSize: '0.94rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                          {activeTab === 'overview' && (
                            <div>
                              <p style={{ color: 'var(--text-main)', fontWeight: '600', marginBottom: '8px' }}>{curr["proj-tab-overview"]}:</p>
                              <p>{curr[project.overviewKey]}</p>
                            </div>
                          )}
                          {activeTab === 'problem' && (
                            <div>
                              <p style={{ color: '#ef4444', fontWeight: '600', marginBottom: '8px' }}>Challenge / Problem:</p>
                              <p>{curr[project.problemKey]}</p>
                            </div>
                          )}
                          {activeTab === 'solution' && (
                            <div>
                              <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '8px' }}>Solution & Process (Contribution):</p>
                              <p className="mb-3" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}><strong>Role:</strong> {curr[project.roleKey]}</p>
                              <p>{curr[project.solutionKey]}</p>
                            </div>
                          )}
                          {activeTab === 'impact' && (
                            <div>
                              <p style={{ color: 'var(--accent)', fontWeight: '600', marginBottom: '8px' }}>Result & Impact:</p>
                              <p>{curr[project.impactKey]}</p>
                            </div>
                          )}
                        </div>

                        {project.id === 1 && (
                          <div style={{ marginTop: '20px' }}>
                            <a 
                              href="#pipeline-simulator" 
                              className="btn btn-secondary btn-sm" 
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                background: 'var(--primary-glow)', 
                                color: 'var(--primary)', 
                                border: '1px solid rgba(37, 99, 235, 0.2)', 
                                fontWeight: '600', 
                                fontSize: '0.85rem',
                                textDecoration: 'none'
                              }}
                            >
                              <i className="fa-solid fa-terminal"></i> {lang === 'id' ? 'Coba Simulator Pipeline' : 'Try Pipeline Simulator'} &rarr;
                            </a>
                          </div>
                        )}
                        {project.id === 2 && (
                          <div style={{ marginTop: '20px' }}>
                            <a 
                              href="#observability-simulator" 
                              className="btn btn-secondary btn-sm" 
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                background: 'var(--primary-glow)', 
                                color: 'var(--primary)', 
                                border: '1px solid rgba(37, 99, 235, 0.2)', 
                                fontWeight: '600', 
                                fontSize: '0.85rem',
                                textDecoration: 'none'
                              }}
                            >
                              <i className="fa-solid fa-chart-line"></i> {lang === 'id' ? 'Coba Simulator Monitoring' : 'Try Monitoring Simulator'} &rarr;
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Pipeline Simulator Section */}
        <PipelineSimulator 
          lang={lang} 
          onStatusChange={handlePipelineStatusChange}
          onStageChange={handlePipelineStageChange}
        />

        {/* Observability & Monitoring Simulator Section */}
        <ObservabilitySimulator lang={lang} pipelineState={pipelineState} />

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

            {experiencesData.map((exp) => (
              <article key={exp.id} className="card timeline-item">
                <div className="timeline-badge"><i className={exp.icon}></i></div>
                <div className="timeline-date">
                  {exp.dateText[lang]} ({getDurationText(exp, lang)})
                </div>
                <div className="timeline-content">
                  <h3>{curr[exp.titleKey]}</h3>
                  <div className="timeline-desc" dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} />
                </div>
              </article>
            ))}
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
              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-linkedin">
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-github">
                <i className="fa-brands fa-github"></i> GitHub
              </a>
              <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-whatsapp">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp
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
