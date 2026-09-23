import { useState, useEffect, useCallback, useRef } from 'react';
import Certifications from './components/Certifications';
import PipelineSimulator from './components/PipelineSimulator';
import GitOpsSimulator from './components/GitOpsSimulator';
import ObservabilitySimulator from './components/ObservabilitySimulator';
import Chatbot from './components/Chatbot';
import CVBuilder from './components/CVBuilder';
import { experiencesData, getDurationText } from './data/experiences';
import { translations } from './data/translations';
import { projectsList } from './data/projects';

// Typing effect ala Tomasz Gajda / modern portfolio
const typingTexts = [
  'Junior DevOps Engineer',
  'Cloud Infrastructure Specialist',
  'Kubernetes & GitOps Practitioner',
  'Observability & SRE Lead'
];

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const [activePortfolioFilter, setActivePortfolioFilter] = useState('all');
  const [activeProjectSlide, setActiveProjectSlide] = useState(0);
  const [projectTabs, setProjectTabs] = useState({ 1: 'overview', 2: 'overview', 3: 'overview' });
  const [pipelineState, setPipelineState] = useState({ status: 'idle', stage: 0 });
  const [isPipelineLinked, setIsPipelineLinked] = useState(false);
  const [gitopsDeployedVersion, setGitopsDeployedVersion] = useState(null);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState('pipeline');

  // Typing animation
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentFullText = typingTexts[textIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (charIndex + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % typingTexts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  // Touch Swipe on Project Slider
  const projectTouchStartX = useRef(null);
  const projectTouchEndX = useRef(null);

  const onProjectTouchStart = (e) => {
    projectTouchEndX.current = null;
    projectTouchStartX.current = e.targetTouches[0].clientX;
  };

  const onProjectTouchMove = (e) => {
    projectTouchEndX.current = e.targetTouches[0].clientX;
  };

  const onProjectTouchEnd = () => {
    if (!projectTouchStartX.current || !projectTouchEndX.current) return;
    const distance = projectTouchStartX.current - projectTouchEndX.current;
    if (distance > 50) {
      setActiveProjectSlide(prev => (prev < filteredProjects.length - 1 ? prev + 1 : 0));
    } else if (distance < -50) {
      setActiveProjectSlide(prev => (prev > 0 ? prev - 1 : filteredProjects.length - 1));
    }
  };

  const curr = translations[lang] || translations.id;

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectTabChange = (projectId, tab) => {
    setProjectTabs(prev => ({ ...prev, [projectId]: tab }));
  };

  const handlePipelineStatusChange = useCallback((status) => {
    setPipelineState(prev => (prev.status === status ? prev : { ...prev, status }));
  }, []);

  const handlePipelineStageChange = useCallback((stage) => {
    setPipelineState(prev => (prev.stage === stage ? prev : { ...prev, stage }));
  }, []);

  const handleProceedToGitOps = useCallback(() => {
    setIsPipelineLinked(true);
    setActiveSimulatorTab('gitops');
  }, []);

  const handleGitOpsSyncComplete = useCallback((version) => {
    setGitopsDeployedVersion(version);
  }, []);

  const handleResetAllSimulators = useCallback(() => {
    setIsPipelineLinked(false);
    setGitopsDeployedVersion(null);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('renaldyimran@gmail.com').then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0B0F17' : '#FBF9F5');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? (winScroll / height) * 100 : 0);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 180)) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'cv-builder') {
    return <CVBuilder />;
  }

  const orderedProjects = [
    projectsList.find(p => p.id === 3),
    projectsList.find(p => p.id === 1),
    projectsList.find(p => p.id === 2)
  ].filter(Boolean);

  const filteredProjects = orderedProjects.filter(project => {
    if (activePortfolioFilter === 'all') return true;
    if (activePortfolioFilter === 'gitops') return project.id === 3;
    if (activePortfolioFilter === 'cicd') return project.id === 1;
    if (activePortfolioFilter === 'observability') return project.id === 2;
    return true;
  });

  return (
    <div className="lux-root">
      {/* Scroll Progress Bar */}
      <div className="lux-scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ==============================================================
          NAVIGATION BAR (WARM LUXURY EDITORIAL + TOMASZ STRUCTURE)
          ============================================================== */}
      <header className="lux-header">
        <div className="lux-header-container">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="lux-brand">
            <span className="lux-brand-badge">RI</span>
            <span className="lux-brand-text">Renaldy Imran</span>
          </a>

          <nav className="lux-desktop-nav" aria-label="Main Navigation">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Portfolio</a>
            <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>Workbench</a>
            <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>{lang === 'id' ? 'Sertifikasi' : 'Certs'}</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>{lang === 'id' ? 'Karir' : 'Career'}</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="lux-nav-contact-link">Contact</a>
          </nav>

          <div className="lux-header-actions">
            <button type="button" onClick={toggleLanguage} className="lux-action-btn" title="Ganti Bahasa">
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button type="button" onClick={toggleTheme} className="lux-action-btn" title="Toggle Tema">
              {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <a 
              href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
              download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"}
              className="lux-action-cta"
            >
              CV ↗
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="lux-mobile-bar" aria-label="Mobile Navigation">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
          <i className="fa-solid fa-house"></i>
          <span>Home</span>
        </a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>
          <i className="fa-solid fa-user"></i>
          <span>About</span>
        </a>
        <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>
          <i className="fa-solid fa-wrench"></i>
          <span>Skills</span>
        </a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>
          <i className="fa-solid fa-diagram-project"></i>
          <span>Works</span>
        </a>
        <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>
          <i className="fa-solid fa-terminal"></i>
          <span>Lab</span>
        </a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>
          <i className="fa-solid fa-envelope"></i>
          <span>Contact</span>
        </a>
      </nav>

      <main>
        {/* ==============================================================
            HERO SECTION: WARM LUXURY EDITORIAL + PROPORTIONAL HEADLINE
            ============================================================== */}
        <section id="home" className="lux-hero">
          <div className="lux-container lux-hero-grid">
            <div className="lux-hero-left">
              <span className="lux-eyebrow">HI, I AM</span>
              <h1 className="lux-hero-name">Renaldy Imran</h1>
              <h2 className="lux-hero-job">Junior DevOps & Cloud Engineer.</h2>

              {/* Typing Effect Badge */}
              <div className="lux-typing-box">
                <span className="typing-prompt">&gt; </span>
                <span className="typing-content">{displayText}</span>
                <span className="typing-cursor">|</span>
              </div>

              <p className="lux-hero-narrative">
                {lang === 'id'
                  ? "Merancang arsitektur cloud tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif untuk menjamin keandalan sistem skala produksi."
                  : "Architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration for production reliability."}
              </p>

              <div className="lux-hero-actions">
                <a 
                  href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
                  download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
                  className="lux-btn-primary"
                >
                  <span>Download CV ↗</span>
                </a>
                <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="lux-btn-secondary">
                  <span>Explore Works ↓</span>
                </a>
              </div>

              {/* Social Links Row */}
              <div className="lux-social-links">
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <i className="fa-brands fa-github"></i> <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="fa-brands fa-linkedin"></i> <span>LinkedIn</span>
                </a>
                <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer" title="Threads">
                  <i className="fa-brands fa-threads"></i> <span>Threads</span>
                </a>
                <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <i className="fa-brands fa-whatsapp"></i> <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lux-hero-right">
              <div className="lux-photo-frame">
                <img src="/profile.png" alt="Renaldy Imran Hermawan" className="lux-profile-img" />
                <div className="lux-photo-chip">
                  <span className="lux-status-dot"></span>
                  <span className="lux-status-text">
                    {lang === 'id' ? 'SIAP KERJA: DEVOPS & SRE' : 'OPEN TO WORK: DEVOPS & SRE'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            STATEMENT BANNER (EDITORIAL STATEMENT)
            ============================================================== */}
        <section className="lux-statement-banner">
          <div className="lux-container">
            <div className="lux-statement-inner">
              <span className="lux-statement-tag">PHILOSOPHY • SRE & RELIABILITY</span>
              <h2 className="lux-statement-heading">Cloud Reliability & Production Uptime.</h2>
              <p className="lux-statement-desc">
                {lang === 'id'
                  ? "Fokus pada arsitektur cloud multi-environment yang tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif. Menjamin stabilitas infrastruktur skala produksi dan resolusi insiden secara real-time."
                  : "Dedicated to architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration. Ensuring production uptime and rapid incident resolution."}
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: ABOUT ME (3 PILLARS ARCHITECTURE)
            ============================================================== */}
        <section id="about" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">EXPLORE • (01)</span>
              <h2 className="lux-section-title">Architecting Resilient Cloud Systems.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            <div className="lux-narrative-block">
              <p className="lux-narrative-p">{curr["about-narrative-p1"]}</p>
              <p className="lux-narrative-p">{curr["about-narrative-p2"]}</p>
            </div>

            {/* 3 Pillars */}
            <div className="lux-pillars-grid">
              <div className="lux-pillar-card">
                <div className="lux-pillar-header">
                  <span className="lux-pillar-num">01</span>
                  <div className="lux-pillar-icon"><i className="fa-solid fa-cloud"></i></div>
                </div>
                <h3 className="lux-pillar-title">Cloud & Architecture.</h3>
                <p className="lux-pillar-desc">
                  {lang === 'id'
                    ? 'Merancang arsitektur cloud VPC di GCP & AWS, penyediaan server deklaratif menggunakan Terraform (IaC), dan isolasi jaringan multi-tier.'
                    : 'Architecting VPC cloud networks in GCP & AWS, declarative infrastructure provisioning using Terraform (IaC), and secure multi-tier networking.'}
                </p>
              </div>

              <div className="lux-pillar-card">
                <div className="lux-pillar-header">
                  <span className="lux-pillar-num">02</span>
                  <div className="lux-pillar-icon"><i className="fa-solid fa-gears"></i></div>
                </div>
                <h3 className="lux-pillar-title">CI/CD & Automation.</h3>
                <p className="lux-pillar-desc">
                  {lang === 'id'
                    ? 'Membangun pipeline GitLab CI / GitHub Actions terotomatisasi, kontainerisasi Docker, scanning Trivy & SonarQube, dan GitOps Kustomize.'
                    : 'Building automated GitLab CI / GitHub Actions workflows, Docker containers, Trivy CVE scanning, SonarQube quality gates, and GitOps.'}
                </p>
              </div>

              <div className="lux-pillar-card">
                <div className="lux-pillar-header">
                  <span className="lux-pillar-num">03</span>
                  <div className="lux-pillar-icon"><i className="fa-solid fa-chart-line"></i></div>
                </div>
                <h3 className="lux-pillar-title">SRE & Observability.</h3>
                <p className="lux-pillar-desc">
                  {lang === 'id'
                    ? 'Pemantauan real-time 24/7 menggunakan VictoriaMetrics, Grafana, VictoriaLogs, penanganan crash loop, dan sistem alarm otomatis ke Telegram.'
                    : '24/7 real-time telemetry using VictoriaMetrics, Grafana, VictoriaLogs, crash resolution, and instant Telegram alert notifications.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: TECHNICAL SKILLS
            ============================================================== */}
        <section id="skills" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">CAPABILITIES • (02)</span>
              <h2 className="lux-section-title">Engineering Stack & Infrastructure.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            <div className="lux-skills-group mb-10">
              <h3 className="lux-group-title">PRIMARY PRODUCTION STACK:</h3>
              <div className="lux-skills-grid">
                {[
                  { name: 'KUBERNETES', icon: 'fa-solid fa-cubes', cat: 'Orchestration' },
                  { name: 'DOCKER', icon: 'fa-brands fa-docker', cat: 'Containers' },
                  { name: 'GITLAB CI', icon: 'fa-brands fa-gitlab', cat: 'Pipelines' },
                  { name: 'TERRAFORM', icon: 'fa-solid fa-server', cat: 'IaC' },
                  { name: 'GOOGLE CLOUD', icon: 'fa-brands fa-google', cat: 'Cloud Platform' },
                  { name: 'AWS', icon: 'fa-brands fa-aws', cat: 'Cloud Platform' },
                  { name: 'GRAFANA', icon: 'fa-solid fa-chart-line', cat: 'Observability' },
                  { name: 'VICTORIAMETRICS', icon: 'fa-solid fa-database', cat: 'Time Series' },
                  { name: 'TRIVY', icon: 'fa-solid fa-shield-halved', cat: 'Security' },
                  { name: 'LINUX OS', icon: 'fa-brands fa-linux', cat: 'Operating System' }
                ].map((s, idx) => (
                  <div key={idx} className="lux-skill-card">
                    <i className={s.icon}></i>
                    <span className="lux-skill-name">{s.name}</span>
                    <span className="lux-skill-cat">{s.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lux-skills-group">
              <h3 className="lux-group-title">NETWORKING & TOOLING:</h3>
              <div className="lux-skills-grid">
                {[
                  { name: 'MIKROTIK MTCNA', icon: 'fa-solid fa-network-wired', cat: 'Routing' },
                  { name: 'TCP/IP & DNS', icon: 'fa-solid fa-route', cat: 'Networking' },
                  { name: 'BASH SCRIPTING', icon: 'fa-solid fa-terminal', cat: 'Scripting' },
                  { name: 'SONARQUBE', icon: 'fa-solid fa-magnifying-glass-chart', cat: 'Quality Gate' },
                  { name: 'HARBOR REGISTRY', icon: 'fa-solid fa-box-archive', cat: 'Registry' },
                  { name: 'TELEGRAM ALERTS', icon: 'fa-solid fa-bell', cat: 'Incident Dispatch' }
                ].map((s, idx) => (
                  <div key={idx} className="lux-skill-card">
                    <i className={s.icon}></i>
                    <span className="lux-skill-name">{s.name}</span>
                    <span className="lux-skill-cat">{s.cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: PORTFOLIO & CASE STUDIES
            ============================================================== */}
        <section id="portfolio" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">WORKS • (03)</span>
              <h2 className="lux-section-title">Selected Case Studies & Deployments.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="lux-filter-tabs">
              {[
                { key: 'all', label: 'ALL (03)' },
                { key: 'gitops', label: 'GITOPS & K8S' },
                { key: 'cicd', label: 'CI/CD & SECURITY' },
                { key: 'observability', label: 'OBSERVABILITY' }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  className={`lux-tab-btn ${activePortfolioFilter === tab.key ? 'active' : ''}`}
                  onClick={() => setActivePortfolioFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="lux-slider-controls">
              <span className="lux-slider-counter">
                0{activeProjectSlide + 1} / 0{filteredProjects.length}
              </span>
              <div className="lux-slider-buttons">
                <button 
                  type="button"
                  className="lux-slider-arrow" 
                  onClick={() => setActiveProjectSlide(prev => prev > 0 ? prev - 1 : filteredProjects.length - 1)}
                  title="Previous Case Study"
                >
                  <i className="fa-solid fa-arrow-left"></i> <span>PREV</span>
                </button>
                <button 
                  type="button"
                  className="lux-slider-arrow" 
                  onClick={() => setActiveProjectSlide(prev => prev < filteredProjects.length - 1 ? prev + 1 : 0)}
                  title="Next Case Study"
                >
                  <span>NEXT</span> <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Slider Stage */}
            <div 
              className="lux-slider-stage"
              onTouchStart={onProjectTouchStart}
              onTouchMove={onProjectTouchMove}
              onTouchEnd={onProjectTouchEnd}
            >
              <div 
                className="lux-slider-track"
                style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
              >
                {filteredProjects.map((project) => {
                  const activeTab = projectTabs[project.id] || 'overview';
                  const isFlagship = project.id === 3;
                  return (
                    <div key={project.id} className="lux-project-slide">
                      <div className="lux-project-grid">
                        <div className="lux-project-visual">
                          <div className="lux-project-img-wrap">
                            <img src={project.image} alt={curr[project.nameKey]} />
                          </div>
                          <p className="lux-project-caption">
                            {curr[project.nameKey]}. Production environment deployment.
                          </p>
                          <div className="lux-project-tags">
                            {project.tools.map((t, idx) => (
                              <span key={idx} className="lux-tool-tag">{t}</span>
                            ))}
                          </div>
                          <div className="lux-project-actions">
                            {project.id === 3 && (
                              <>
                                <a href="/projects/cbs-presentation.pdf" target="_blank" rel="noopener noreferrer" className="lux-btn-action">
                                  <i className="fa-solid fa-file-pdf"></i> <span>Slide PDF ↗</span>
                                </a>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="lux-btn-action">
                                  <i className="fa-brands fa-gitlab"></i> <span>GitLab Repo ↗</span>
                                </a>
                              </>
                            )}
                            {project.id !== 3 && project.repoUrl && (
                              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="lux-btn-action">
                                <i className="fa-brands fa-github"></i> <span>GitHub Repo ↗</span>
                              </a>
                            )}
                            <a 
                              href="#simulators" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                setActiveSimulatorTab(project.id === 3 ? 'gitops' : project.id === 1 ? 'pipeline' : 'monitoring'); 
                                document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); 
                              }} 
                              className="lux-btn-action primary"
                            >
                              <i className="fa-solid fa-play"></i> <span>Live Simulator ↗</span>
                            </a>
                          </div>
                        </div>

                        <div className="lux-project-details">
                          {isFlagship && (
                            <div className="lux-flagship-badge">
                              <span className="dot pulse"></span>
                              <span>STATUS: KUBERNETES K3S LIVE CLUSTER</span>
                            </div>
                          )}
                          <h3 className="lux-project-title">{curr[project.nameKey]}.</h3>

                          <div className="lux-story-tabs">
                            {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                              <button
                                key={tab}
                                type="button"
                                className={`lux-story-tab-btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleProjectTabChange(project.id, tab)}
                              >
                                {tab === 'overview' && curr["proj-tab-overview"]}
                                {tab === 'problem' && curr["proj-tab-problem"]}
                                {tab === 'solution' && curr["proj-tab-solution"]}
                                {tab === 'impact' && curr["proj-tab-impact"]}
                                {tab === 'architecture' && curr["proj-tab-arch"]}
                                {tab === 'code' && (project.id === 3 ? 'deploy.sh' : project.id === 1 ? '.gitlab-ci.yml' : 'alerts.yml')}
                              </button>
                            ))}
                          </div>

                          <div className="lux-story-content">
                            {activeTab === 'overview' && <p className="lux-story-p">{curr[project.overviewKey]}</p>}
                            {activeTab === 'problem' && <p className="lux-story-p">{curr[project.problemKey]}</p>}
                            {activeTab === 'solution' && (
                              <div>
                                <p className="lux-story-role"><strong>Role:</strong> {curr[project.roleKey]}</p>
                                <p className="lux-story-p">{curr[project.solutionKey]}</p>
                              </div>
                            )}
                            {activeTab === 'impact' && <p className="lux-story-p">{curr[project.impactKey]}</p>}
                            {activeTab === 'architecture' && (
                              <div className="lux-arch-grid">
                                {project.architectureFlow?.map((node, i) => (
                                  <div key={i} className="lux-arch-node">
                                    <div className="lux-arch-step">STEP {node.step}</div>
                                    <h4 className="lux-arch-title">{node.title}</h4>
                                    <p className="lux-arch-detail">{node.detail}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {activeTab === 'code' && project.id === 3 && (
                              <div className="lux-code-viewer">
                                <div className="lux-code-header">
                                  <span><i className="fa-solid fa-terminal"></i> scripts/deploy.sh (Vault & Kustomize)</span>
                                </div>
                                <pre className="lux-code-body">
                                  <code>{`# 1. Target Namespace
NAMESPACE="renaldy-imran-cbs-\${ENV}"
kubectl create namespace "\${NAMESPACE}" --dry-run=client -o yaml | kubectl apply -f -

# 2. Vault DB Credential Injection
if [ "$ENV" = "prod" ] && [ -n "$VAULT_ADDR" ]; then
    VAULT_RESP=$(curl -s --header "X-Vault-Token: \${CURRENT_VAULT_TOKEN}" "\${VAULT_ADDR}/v1/\${VAULT_SECRET_PATH}")
    DB_USER=$(echo "$VAULT_RESP" | jq -r '.data.data.DB_USER')
    DB_PASSWORD=$(echo "$VAULT_RESP" | jq -r '.data.data.DB_PASSWORD')
fi

# 3. Kustomize Image Tag Mutation & Rollout
kustomize edit set image "\${APP_NAME}=\${REGISTRY_IMAGE}:\${IMAGE_TAG}"
kubectl apply -k "$OVERLAY_PATH"
kubectl rollout restart deployment/"\${APP_NAME}" -n "\${NAMESPACE}"`}</code>
                                </pre>
                              </div>
                            )}
                            {activeTab === 'code' && project.id === 1 && (
                              <div className="lux-code-viewer">
                                <div className="lux-code-header">
                                  <span><i className="fa-solid fa-code"></i> .gitlab-ci.yml (Trivy & SonarQube)</span>
                                </div>
                                <pre className="lux-code-body">
                                  <code>{`stages: [test, security-scan, build-push, deploy]

sonarqube-check:
  stage: security-scan
  script: sonar-scanner -Dsonar.qualitygate.wait=true

trivy-scan:
  stage: security-scan
  script: trivy image --exit-code 1 --severity CRITICAL \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHORT_SHA}

push-image:
  stage: build-push
  script: docker push \${HARBOR_HOST}/cbs/\${APP_NAME}:\${CI_COMMIT_SHORT_SHA}`}</code>
                                </pre>
                              </div>
                            )}
                            {activeTab === 'code' && project.id === 2 && (
                              <div className="lux-code-viewer">
                                <div className="lux-code-header">
                                  <span><i className="fa-solid fa-bell"></i> alert-rules.yml (PromQL & Telegram)</span>
                                </div>
                                <pre className="lux-code-body">
                                  <code>{`- alert: HostHighCpuLoad
  expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100) > 85
  for: 2m
  labels: { severity: critical }

# Dispatch channel: Telegram Bot Webhook -> SRE On-Call`}</code>
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: DEVOPS WORKBENCH (INTERACTIVE SIMULATORS)
            ============================================================== */}
        <section id="simulators" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">LAB • (04)</span>
              <h2 className="lux-section-title">Interactive Engineering Workbench.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            <div className="lux-workbench-shell">
              <div className="lux-workbench-tabs">
                <button 
                  type="button"
                  className={`lux-wb-tab ${activeSimulatorTab === 'pipeline' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('pipeline')}
                >
                  <i className="fa-solid fa-terminal"></i> 1. CI/CD Pipeline
                </button>
                <button 
                  type="button"
                  className={`lux-wb-tab ${activeSimulatorTab === 'gitops' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('gitops')}
                >
                  <i className="fa-solid fa-cloud"></i> 2. GitOps & K8s
                </button>
                <button 
                  type="button"
                  className={`lux-wb-tab ${activeSimulatorTab === 'monitoring' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('monitoring')}
                >
                  <i className="fa-solid fa-chart-line"></i> 3. Observability & Alarm
                </button>
              </div>

              <div className="lux-workbench-content">
                {activeSimulatorTab === 'pipeline' && (
                  <PipelineSimulator 
                    lang={lang} 
                    onStatusChange={handlePipelineStatusChange} 
                    onStageChange={handlePipelineStageChange} 
                    onProceedToGitOps={handleProceedToGitOps} 
                  />
                )}
                {activeSimulatorTab === 'gitops' && (
                  <GitOpsSimulator 
                    lang={lang} 
                    pipelineLinked={isPipelineLinked} 
                    onSyncComplete={handleGitOpsSyncComplete} 
                    onResetLink={handleResetAllSimulators} 
                  />
                )}
                {activeSimulatorTab === 'monitoring' && (
                  <ObservabilitySimulator 
                    lang={lang} 
                    pipelineState={pipelineState} 
                    gitopsDeployedVersion={gitopsDeployedVersion} 
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CERTIFICATIONS & EDUCATION
            ============================================================== */}
        <section id="certifications" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">CREDENTIALS • (05)</span>
              <h2 className="lux-section-title">Verified Certifications & Education.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            {/* Academic Record Card */}
            <div className="lux-edu-card mb-10">
              <div className="lux-edu-icon">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="lux-edu-details">
                <span className="lux-edu-badge">SARJANA KOMPUTER (S.KOM)</span>
                <h3 className="lux-edu-school">Universitas Bani Saleh : Teknik Informatika</h3>
                <p className="lux-edu-desc">
                  Fokus pada Administrasi Jaringan Komputer, Arsitektur Sistem Cloud, dan Keandalan Infrastruktur. Lulus tahun 2024.
                </p>
                <span className="lux-edu-year"><i className="fa-solid fa-calendar"></i> 2020 - 2024 • Bekasi, Indonesia</span>
              </div>
            </div>

            {/* 7 Verified Certifications Component */}
            <Certifications lang={lang} />
          </div>
        </section>

        {/* ==============================================================
            SECTION: CAREER PATH (EXECUTIVE LEDGER)
            ============================================================== */}
        <section id="experience" className="lux-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">RECORD • (06)</span>
              <h2 className="lux-section-title">Professional Career Ledger.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            <div className="lux-career-ledger">
              {experiencesData.map((exp) => (
                <article key={exp.id} className="lux-ledger-row">
                  <div className="lux-ledger-left">
                    <span className="lux-ledger-date">{exp.dateText[lang]}</span>
                    <span className="lux-ledger-dur">{getDurationText(exp, lang)}</span>
                    {exp.type && <span className="lux-ledger-badge">{exp.type[lang]}</span>}
                  </div>
                  <div className="lux-ledger-right">
                    <h3 className="lux-ledger-title">
                      <i className={`fa-solid ${exp.icon}`}></i> {curr[exp.titleKey]}
                    </h3>
                    <div 
                      className="lux-ledger-desc" 
                      dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} 
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CONTACT (BALANCED 2X2 GRID + CLI ENDPOINT)
            ============================================================== */}
        <section id="contact" className="lux-section lux-contact-section">
          <div className="lux-container">
            <div className="lux-section-header">
              <span className="lux-section-tag">CONNECT • (07)</span>
              <h2 className="lux-section-title">Direct Inquiries & Communication.</h2>
              <div className="lux-separator">
                <span className="lux-separator-diamond"></span>
              </div>
            </div>

            <p className="lux-contact-intro">
              {lang === 'id' 
                ? "Tertarik berdiskusi seputar peluang kerja DevOps, Cloud Infrastructure, atau kolaborasi teknik? Hubungi saya langsung melalui tautan di bawah."
                : "Interested in discussing DevOps opportunities, cloud infrastructure, or technical collaboration? Reach out directly through the links below."}
            </p>

            {/* CLI Resume Box */}
            <div className="lux-cli-box mb-8">
              <div className="lux-cli-header">
                <span className="dot pulse"></span>
                <span>CLI RESUME ENDPOINT (RAW JSON)</span>
              </div>
              <div className="lux-cli-body">
                <code>$ curl -s https://justinbony.my.id/resume.json</code>
                <button 
                  type="button" 
                  className="lux-cli-copy-btn" 
                  onClick={() => {
                    navigator.clipboard.writeText('curl -s https://justinbony.my.id/resume.json');
                    setCurlCopied(true);
                    setTimeout(() => setCurlCopied(false), 2000);
                  }}
                  title="Copy Command"
                >
                  <i className={`fa-solid ${curlCopied ? 'fa-check' : 'fa-copy'}`}></i>
                  <span>{curlCopied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin Perintah' : 'Copy Command')}</span>
                </button>
              </div>
            </div>

            {/* Symmetrical 2x2 Contact Grid */}
            <div className="lux-contact-grid">
              <button type="button" className="lux-contact-card" onClick={handleCopyEmail}>
                <i className="fa-solid fa-envelope"></i>
                <div className="lux-card-text">
                  <span className="lux-card-label">Email:</span>
                  <span className="lux-card-val">{emailCopied ? (curr["email-success"] || "Tersalin ke Clipboard!") : "renaldyimran@gmail.com ↗"}</span>
                </div>
              </button>

              <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="lux-contact-card">
                <i className="fa-brands fa-whatsapp"></i>
                <div className="lux-card-text">
                  <span className="lux-card-label">WhatsApp:</span>
                  <span className="lux-card-val">+62 878-7248-1308 ↗</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="lux-contact-card">
                <i className="fa-brands fa-linkedin"></i>
                <div className="lux-card-text">
                  <span className="lux-card-label">LinkedIn:</span>
                  <span className="lux-card-val">linkedin.com/in/renaldyimran ↗</span>
                </div>
              </a>

              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="lux-contact-card">
                <i className="fa-brands fa-github"></i>
                <div className="lux-card-text">
                  <span className="lux-card-label">GitHub:</span>
                  <span className="lux-card-val">github.com/renmher ↗</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================================
          EDITORIAL FOOTER
          ============================================================== */}
      <footer className="lux-footer">
        <div className="lux-container lux-footer-content">
          <div className="lux-footer-top">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="lux-back-top">
              <i className="fa-solid fa-arrow-up"></i> <span>BACK TO TOP</span>
            </a>
          </div>

          <div className="lux-footer-socials">
            <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer" title="Threads"><i className="fa-brands fa-threads"></i></a>
            <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>

          <p className="lux-copyright">
            <strong>©2026 Renaldy Imran Hermawan.</strong> All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Assistant (Closed by default, click to open) */}
      <Chatbot lang={lang} />
    </div>
  );
};

export default App;
