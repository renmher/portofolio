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
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);

        if (charIndex + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
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
      setActiveProjectSlide(prev => (prev < 2 ? prev + 1 : 0));
    } else if (distance < -50) {
      setActiveProjectSlide(prev => (prev > 0 ? prev - 1 : 2));
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
      metaTheme.setAttribute('content', theme === 'dark' ? '#09090b' : '#ffffff');
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

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash && window.location.hash !== '#home') {
      window.history.replaceState(null, null, ' ');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .card, .ledger-entry, .project-showcase-card, .flagship-case-study, .workbench-shell, .cert-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

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
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Header ala Tomasz Gajda Figma */}
      <header className="tomasz-header">
        <div className="tomasz-header-container">
          <a href="#home" className="tomasz-logo" onClick={(e) => handleNavClick(e, 'home')}>
            <span className="logo-badge">RI</span>
            <span className="logo-title">Renaldy.dev</span>
          </a>

          <nav className="tomasz-desktop-nav">
            <ul>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>About me</a></li>
              <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
              <li><a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Portfolio</a></li>
              <li><a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>{lang === 'id' ? 'Sertifikasi' : 'Certs'}</a></li>
              <li><a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>{lang === 'id' ? 'Karir' : 'Career'}</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn-contact-pill">CONTACT ME</a></li>
            </ul>
          </nav>

          <div className="tomasz-controls">
            <button id="theme-toggle" className="tomasz-ctrl-btn" title="Toggle Theme" onClick={toggleTheme}>
              {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <button id="lang-toggle" className="tomasz-ctrl-btn" title="Switch Language" onClick={toggleLanguage}>
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <ul>
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}><i className="fa-solid fa-house"></i><span>Home</span></a></li>
          <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}><i className="fa-solid fa-user"></i><span>About</span></a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}><i className="fa-solid fa-wrench"></i><span>Skills</span></a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}><i className="fa-solid fa-diagram-project"></i><span>Works</span></a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}><i className="fa-solid fa-envelope"></i><span>Contact</span></a></li>
        </ul>
      </nav>

      <main>
        {/* ==============================================================
            HERO SECTION (ALA TOMASZ GAJDA FIGMA)
            ============================================================== */}
        <section id="home" className="tomasz-hero">
          <div className="tomasz-container tomasz-hero-grid">
            <div className="tomasz-hero-left">
              <p className="tomasz-hero-greeting">Hi, I am</p>
              <h1 className="tomasz-hero-name">Renaldy Imran</h1>
              <h2 className="tomasz-hero-job">Junior DevOps & Cloud Engineer</h2>

              {/* Typing effect */}
              <div className="tomasz-typing-badge">
                <span className="typing-prompt">&gt; </span>
                <span className="typing-content">{displayText}</span>
                <span className="typing-cursor">|</span>
              </div>

              <div className="tomasz-social-row">
                <a href="mailto:renaldyimran@gmail.com" title="Email"><i className="fa-solid fa-at"></i></a>
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
              </div>

              <div className="tomasz-hero-actions">
                <a 
                  href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
                  download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
                  className="btn-tomasz-primary"
                >
                  <i className="fa-solid fa-file-arrow-down"></i> <span>DOWNLOAD CV</span>
                </a>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="btn-tomasz-secondary">
                  <span>ABOUT ME</span> <i className="fa-solid fa-arrow-down"></i>
                </a>
              </div>
            </div>

            <div className="tomasz-hero-right">
              <div className="tomasz-image-frame">
                <img src="/profile.png" alt="Renaldy Imran Hermawan" className="tomasz-profile-img" />
              </div>
            </div>
          </div>
        </section>

        {/* STATEMENT BANNER (ALA "IT BERRIES" DI TOMASZ GAJDA TEMPLATE) */}
        <section className="tomasz-statement-banner">
          <div className="tomasz-container">
            <h2 className="statement-heading">CLOUD RELIABILITY & SRE</h2>
            <p className="statement-text">
              {lang === 'id'
                ? "Fokus pada arsitektur cloud multi-environment yang tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes declaratif. Menjamin stabilitas infrastruktur skala produksi dan resolusi insiden secara real-time."
                : "Dedicated to architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration. Ensuring production uptime and rapid incident resolution."}
            </p>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="btn-statement-explore">
              | EXPLORE WORKS |
            </a>
          </div>
        </section>

        {/* ==============================================================
            SECTION: ABOUT ME (DENGAN TOMASZ SEPARATOR & 3 PILAR)
            ============================================================== */}
        <section id="about" className="tomasz-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">ABOUT ME</h2>
            
            {/* Iconic Tomasz Geometric Separator */}
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            <div className="tomasz-about-narrative">
              <p className="mb-4">{curr["about-narrative-p1"]}</p>
              <p>{curr["about-narrative-p2"]}</p>
            </div>

            <div className="tomasz-explore-tag">| EXPLORE |</div>

            {/* Sub-Separator */}
            <div className="tomasz-separator mini">
              <span className="tomasz-separator-diamond"></span>
            </div>

            {/* 3 Pillars: DESIGN, DEVELOPMENT, MAINTENANCE ala Tomasz Gajda */}
            <div className="tomasz-three-pillars">
              <div className="pillar-box">
                <div className="pillar-icon"><i className="fa-solid fa-cloud"></i></div>
                <h3 className="pillar-title">{lang === 'id' ? 'CLOUD & ARCHITECTURE' : 'CLOUD & ARCHITECTURE'}</h3>
                <p className="pillar-desc">
                  {lang === 'id'
                    ? 'Merancang arsitektur cloud VPC di GCP & AWS, penyediaan server deklaratif menggunakan Terraform (IaC), dan isolasi jaringan multi-tier.'
                    : 'Architecting VPC cloud networks in GCP & AWS, declarative infrastructure provisioning using Terraform (IaC), and secure multi-tier networking.'}
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon"><i className="fa-solid fa-gears"></i></div>
                <h3 className="pillar-title">{lang === 'id' ? 'CI/CD & AUTOMATION' : 'CI/CD & AUTOMATION'}</h3>
                <p className="pillar-desc">
                  {lang === 'id'
                    ? 'Membangun pipeline GitLab CI / GitHub Actions terotomatisasi, kontainerisasi Docker, scanning Trivy & SonarQube, dan GitOps Kustomize.'
                    : 'Building automated GitLab CI / GitHub Actions workflows, Docker containers, Trivy CVE scanning, SonarQube quality gates, and GitOps.'}
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon"><i className="fa-solid fa-chart-line"></i></div>
                <h3 className="pillar-title">{lang === 'id' ? 'SRE & OBSERVABILITY' : 'SRE & OBSERVABILITY'}</h3>
                <p className="pillar-desc">
                  {lang === 'id'
                    ? 'Pemantauan real-time 24/7 menggunakan VictoriaMetrics, Grafana, VictoriaLogs, penanganan crash loop, dan sistem alarm otomatis ke Telegram.'
                    : '24/7 real-time telemetry using VictoriaMetrics, Grafana, VictoriaLogs, crash resolution, and instant Telegram alert notifications.'}
                </p>
              </div>
            </div>

            {/* Bottom Separator */}
            <div className="tomasz-separator mini">
              <span className="tomasz-separator-diamond"></span>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: SKILLS (ALA TOMASZ GAJDA: USING NOW & OTHER SKILLS)
            ============================================================== */}
        <section id="skills" className="tomasz-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">SKILLS</h2>
            
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            {/* USING NOW */}
            <div className="tomasz-skills-group">
              <h3 className="skills-group-title">USING NOW:</h3>
              <div className="tomasz-skills-grid">
                <div className="skill-tile">
                  <i className="fa-solid fa-cubes"></i>
                  <p>KUBERNETES</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-brands fa-docker"></i>
                  <p>DOCKER</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-brands fa-gitlab"></i>
                  <p>GITLAB CI</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-server"></i>
                  <p>TERRAFORM</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-brands fa-google"></i>
                  <p>GOOGLE CLOUD</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-brands fa-aws"></i>
                  <p>AWS</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-chart-line"></i>
                  <p>GRAFANA</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-database"></i>
                  <p>VICTORIAMETRICS</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-shield-halved"></i>
                  <p>TRIVY</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-brands fa-linux"></i>
                  <p>LINUX OS</p>
                </div>
              </div>
            </div>

            {/* OTHER SKILLS & COMPETENCIES */}
            <div className="tomasz-skills-group mt-12">
              <h3 className="skills-group-title">OTHER SKILLS & NETWORKING:</h3>
              <div className="tomasz-skills-grid">
                <div className="skill-tile">
                  <i className="fa-solid fa-network-wired"></i>
                  <p>MIKROTIK MTCNA</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-route"></i>
                  <p>TCP/IP & DNS</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-terminal"></i>
                  <p>BASH SCRIPTING</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                  <p>SONARQUBE</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-box-archive"></i>
                  <p>HARBOR REGISTRY</p>
                </div>
                <div className="skill-tile">
                  <i className="fa-solid fa-bell"></i>
                  <p>TELEGRAM ALERTS</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: PORTFOLIO (PROJECT SHOWCASE + SLIDER & SIMULATORS)
            ============================================================== */}
        <section id="portfolio" className="tomasz-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">PORTFOLIO</h2>
            
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            {/* Category Tabs ala Tomasz Gajda: ALL, GITOPS, CI/CD, OBSERVABILITY */}
            <div className="tomasz-portfolio-tabs">
              <button 
                className={`tomasz-tab-btn ${activePortfolioFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActivePortfolioFilter('all')}
              >
                ALL
              </button>
              <button 
                className={`tomasz-tab-btn ${activePortfolioFilter === 'gitops' ? 'active' : ''}`}
                onClick={() => setActivePortfolioFilter('gitops')}
              >
                GITOPS & K8S
              </button>
              <button 
                className={`tomasz-tab-btn ${activePortfolioFilter === 'cicd' ? 'active' : ''}`}
                onClick={() => setActivePortfolioFilter('cicd')}
              >
                CI/CD & SECURITY
              </button>
              <button 
                className={`tomasz-tab-btn ${activePortfolioFilter === 'observability' ? 'active' : ''}`}
                onClick={() => setActivePortfolioFilter('observability')}
              >
                OBSERVABILITY
              </button>
            </div>

            {/* Projects Slider Showcase */}
            <div className="tomasz-slider-container mb-12">
              <div className="tomasz-slider-controls">
                <span className="slider-counter">
                  0{activeProjectSlide + 1} / 0{filteredProjects.length}
                </span>
                <div className="slider-btns">
                  <button 
                    className="btn-tomasz-arrow" 
                    onClick={() => setActiveProjectSlide(prev => prev > 0 ? prev - 1 : filteredProjects.length - 1)}
                    title="Previous"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button 
                    className="btn-tomasz-arrow" 
                    onClick={() => setActiveProjectSlide(prev => prev < filteredProjects.length - 1 ? prev + 1 : 0)}
                    title="Next"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              <div 
                className="tomasz-slider-stage"
                onTouchStart={onProjectTouchStart}
                onTouchMove={onProjectTouchMove}
                onTouchEnd={onProjectTouchEnd}
              >
                <div 
                  className="tomasz-slider-track"
                  style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
                >
                  {filteredProjects.map((project) => {
                    const activeTab = projectTabs[project.id] || 'overview';
                    const isFlagship = project.id === 3;
                    return (
                      <div key={project.id} className="tomasz-slide-card">
                        <div className="tomasz-project-grid">
                          <div className="tomasz-proj-visual">
                            <div className="tomasz-proj-img-wrap">
                              <img src={project.image} alt={curr[project.nameKey]} />
                            </div>
                            <div className="tomasz-proj-tags">
                              {project.tools.map((t, idx) => (
                                <span key={idx} className="tomasz-tag">{t}</span>
                              ))}
                            </div>
                            <div className="tomasz-proj-actions">
                              {project.id === 3 && (
                                <>
                                  <a href="/projects/cbs-presentation.pdf" target="_blank" rel="noopener noreferrer" className="btn-tomasz-solid-sm">
                                    <i className="fa-solid fa-file-pdf"></i> <span>SLIDE PDF</span>
                                  </a>
                                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-tomasz-outline-sm">
                                    <i className="fa-brands fa-gitlab"></i> <span>GITLAB REPO</span>
                                  </a>
                                </>
                              )}
                              {project.id !== 3 && project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-tomasz-outline-sm">
                                  <i className="fa-brands fa-github"></i> <span>REPO</span>
                                </a>
                              )}
                              <a href="#simulators" onClick={(e) => { e.preventDefault(); setActiveSimulatorTab(project.id === 3 ? 'gitops' : project.id === 1 ? 'pipeline' : 'monitoring'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }} className="btn-tomasz-outline-sm">
                                <i className="fa-solid fa-play"></i> <span>SIMULATOR</span>
                              </a>
                            </div>
                          </div>

                          <div className="tomasz-proj-details">
                            {isFlagship && (
                              <div className="tomasz-status-badge">
                                <span className="dot pulse"></span>
                                <span>STATUS: KUBERNETES K3S DEPLOYED</span>
                              </div>
                            )}
                            <h3 className="tomasz-proj-title">{curr[project.nameKey]}</h3>

                            <div className="tomasz-story-tabs">
                              {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                                <button
                                  key={tab}
                                  className={`tomasz-story-tab ${activeTab === tab ? 'active' : ''}`}
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

                            <div className="tomasz-story-body">
                              {activeTab === 'overview' && <p>{curr[project.overviewKey]}</p>}
                              {activeTab === 'problem' && <p>{curr[project.problemKey]}</p>}
                              {activeTab === 'solution' && (
                                <div>
                                  <p className="mb-2"><strong>Role:</strong> {curr[project.roleKey]}</p>
                                  <p>{curr[project.solutionKey]}</p>
                                </div>
                              )}
                              {activeTab === 'impact' && <p>{curr[project.impactKey]}</p>}
                              {activeTab === 'architecture' && (
                                <div className="arch-flow-grid">
                                  {project.architectureFlow?.map((node, i) => (
                                    <div key={i} className="arch-node-card">
                                      <div className="arch-node-header">
                                        <span className="arch-step-badge">{node.step}</span>
                                        <i className={`arch-node-icon ${node.icon}`}></i>
                                      </div>
                                      <h4 className="arch-node-title">{node.title}</h4>
                                      <p className="arch-node-detail">{node.detail}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {activeTab === 'code' && project.id === 3 && (
                                <div className="project-code-viewer">
                                  <div className="code-viewer-header">
                                    <span className="code-viewer-file"><i className="fa-solid fa-terminal"></i> scripts/deploy.sh (Vault & Kustomize)</span>
                                  </div>
                                  <pre className="code-viewer-body">
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
                                <div className="project-code-viewer">
                                  <div className="code-viewer-header">
                                    <span className="code-viewer-file"><i className="fa-solid fa-code"></i> .gitlab-ci.yml (Trivy & SonarQube)</span>
                                  </div>
                                  <pre className="code-viewer-body">
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
                                <div className="project-code-viewer">
                                  <div className="code-viewer-header">
                                    <span className="code-viewer-file"><i className="fa-solid fa-bell"></i> alert-rules.yml (PromQL & Telegram)</span>
                                  </div>
                                  <pre className="code-viewer-body">
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

            {/* Interactive DevOps Workbench */}
            <div id="simulators" className="tomasz-workbench-box">
              <div className="workbench-title-bar">
                <h3>DEVOPS INTERACTIVE SIMULATOR</h3>
                <p className="text-muted text-sm">Simulasikan proses deployment, drift detection, dan response alarm monitoring.</p>
              </div>

              <div className="simulator-tabs">
                <button className={`btn ${activeSimulatorTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSimulatorTab('pipeline')}>
                  <i className="fa-solid fa-terminal"></i> 1. CI/CD Pipeline
                </button>
                <button className={`btn ${activeSimulatorTab === 'gitops' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSimulatorTab('gitops')}>
                  <i className="fa-solid fa-cloud"></i> 2. GitOps & K8s
                </button>
                <button className={`btn ${activeSimulatorTab === 'monitoring' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSimulatorTab('monitoring')}>
                  <i className="fa-solid fa-chart-line"></i> 3. Observability & Alarm
                </button>
              </div>

              <div className="simulator-active-content">
                {activeSimulatorTab === 'pipeline' && <PipelineSimulator lang={lang} onStatusChange={handlePipelineStatusChange} onStageChange={handlePipelineStageChange} onProceedToGitOps={handleProceedToGitOps} />}
                {activeSimulatorTab === 'gitops' && <GitOpsSimulator lang={lang} pipelineLinked={isPipelineLinked} onSyncComplete={handleGitOpsSyncComplete} onResetLink={handleResetAllSimulators} />}
                {activeSimulatorTab === 'monitoring' && <ObservabilitySimulator lang={lang} pipelineState={pipelineState} gitopsDeployedVersion={gitopsDeployedVersion} />}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CERTIFICATIONS & EDUCATION
            ============================================================== */}
        <section id="certifications" className="tomasz-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">CERTIFICATIONS & EDUCATION</h2>
            
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            {/* Education Box */}
            <div className="tomasz-edu-banner mb-10">
              <div className="edu-icon-wrap"><i className="fa-solid fa-graduation-cap"></i></div>
              <div className="edu-details">
                <span className="edu-degree">SARJANA KOMPUTER (S.KOM)</span>
                <h3 className="edu-school">Universitas Bani Saleh — Teknik Informatika</h3>
                <p className="edu-desc text-muted">Fokus pada Administrasi Jaringan, Infrastruktur Cloud, dan Rekayasa Sistem. Lulus tahun 2024.</p>
                <span className="edu-year"><i className="fa-solid fa-calendar"></i> 2020 - 2024 • Bekasi, Indonesia</span>
              </div>
            </div>

            {/* 7 Verified Certifications */}
            <Certifications lang={lang} />
          </div>
        </section>

        {/* ==============================================================
            SECTION: CAREER PATH (EXECUTIVE LEDGER)
            ============================================================== */}
        <section id="experience" className="tomasz-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">CAREER PATH</h2>
            
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            <div className="tomasz-career-ledger">
              {experiencesData.map((exp) => (
                <article key={exp.id} className="tomasz-ledger-row">
                  <div className="ledger-left">
                    <span className="ledger-date">{exp.dateText[lang]}</span>
                    <span className="ledger-dur">{getDurationText(exp, lang)}</span>
                    {exp.type && <span className="ledger-pill">{exp.type[lang]}</span>}
                  </div>
                  <div className="ledger-right">
                    <h3 className="ledger-job-title"><i className={`fa-solid ${exp.icon}`}></i> {curr[exp.titleKey]}</h3>
                    <div className="ledger-job-desc" dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CONTACT ME (ALA TOMASZ GAJDA)
            ============================================================== */}
        <section id="contact" className="tomasz-section tomasz-contact-section">
          <div className="tomasz-container">
            <h2 className="tomasz-section-title">CONTACT</h2>
            
            <div className="tomasz-separator">
              <span className="tomasz-separator-diamond"></span>
            </div>

            <p className="tomasz-contact-sub">
              {lang === 'id' 
                ? "Tertarik untuk berdiskusi seputar peluang kerja DevOps, Cloud Infrastructure, atau kolaborasi proyek? Hubungi saya langsung melalui tautan di bawah."
                : "Interested in discussing DevOps opportunities, cloud infrastructure, or technical collaboration? Reach out directly through the links below."}
            </p>

            {/* CLI Resume Box */}
            <div className="terminal-cli-resume-box mb-8">
              <div className="cli-box-header">
                <span className="dot pulse"></span>
                <span className="cli-box-title">CLI RESUME ENDPOINT (CURL RAW JSON)</span>
              </div>
              <div className="cli-box-body">
                <code>$ curl -s https://justinbony.my.id/resume.json</code>
                <button 
                  className="btn-cli-copy" 
                  onClick={() => {
                    navigator.clipboard.writeText('curl -s https://justinbony.my.id/resume.json');
                    setCurlCopied(true);
                    setTimeout(() => setCurlCopied(false), 2000);
                  }}
                  title="Copy curl command"
                >
                  <i className={`fa-solid ${curlCopied ? 'fa-check' : 'fa-copy'}`}></i>
                  <span>{curlCopied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin Perintah' : 'Copy Command')}</span>
                </button>
              </div>
            </div>

            <div className="tomasz-contact-grid">
              <button id="copy-email" className="btn-tomasz-contact" onClick={handleCopyEmail}>
                <i className="fa-solid fa-envelope"></i>
                <span>{emailCopied ? (curr["email-success"]) : "renaldyimran@gmail.com"}</span>
              </button>
              <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="btn-tomasz-contact">
                <i className="fa-brands fa-whatsapp"></i>
                <span>+62 878-7248-1308</span>
              </a>
              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="btn-tomasz-contact">
                <i className="fa-brands fa-linkedin"></i>
                <span>linkedin.com/in/renaldyimran</span>
              </a>
              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="btn-tomasz-contact">
                <i className="fa-brands fa-github"></i>
                <span>github.com/renmher</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer ala Tomasz Gajda */}
      <footer className="tomasz-footer">
        <div className="tomasz-container tomasz-footer-content">
          <div className="footer-back-to-top">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="btn-back-top">
              <i className="fa-solid fa-angles-up"></i>
              <span>BACK TO TOP</span>
            </a>
          </div>

          <div className="tomasz-footer-socials">
            <a href="mailto:renaldyimran@gmail.com" title="Email"><i className="fa-solid fa-at"></i></a>
            <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" title="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
          </div>

          <p className="footer-copyright">
            <strong>@2026 Renaldy Imran Hermawan</strong><br />
            All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot RenBot */}
      <Chatbot lang={lang} />
    </>
  );
};

export default App;
