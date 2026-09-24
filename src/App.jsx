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

// Typing effect ala Apple showcase
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
  const [isCvDropdownOpen, setIsCvDropdownOpen] = useState(false);
  const cvDropdownRef = useRef(null);

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
          setTimeout(() => setIsDeleting(true), 2200);
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

  // Click outside listener for CV Dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cvDropdownRef.current && !cvDropdownRef.current.contains(e.target)) {
        setIsCvDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCvDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Apple Scroll Reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('apple-visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.apple-reveal, .apple-card, .apple-slide-card, .apple-ledger-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [lang, activePortfolioFilter]);

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
      metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
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
    <div className="apple-root">
      {/* Scroll Progress Bar */}
      <div className="apple-scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ==============================================================
          GLOBAL STORE & PRODUCT LOCAL NAVIGATION (APPLE STYLE)
          ============================================================== */}
      <header className="apple-global-nav">
        <div className="apple-nav-container">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="apple-nav-brand">
            <span className="apple-brand-name">Renaldy Imran</span>
          </a>

          <nav className="apple-desktop-nav" aria-label="Main Navigation">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>Overview</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>Tech Specs</a>
            <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>Deployments</a>
            <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>Lab Workbench</a>
            <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>Credentials</a>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>Trajectory</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="apple-nav-link-blue">Contact</a>
          </nav>

          <div className="apple-nav-controls">
            <button type="button" onClick={toggleLanguage} className="apple-control-pill" title="Toggle Language">
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button type="button" onClick={toggleTheme} className="apple-control-pill" title="Toggle Theme">
              {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
            <a 
              href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
              download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"}
              className="apple-pricing-blue-pill compact"
            >
              CV ↗
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Floating Local Navigation */}
      <nav className="apple-mobile-nav" aria-label="Mobile Navigation">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
          <span>Home</span>
        </a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>
          <span>About</span>
        </a>
        <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>
          <span>Specs</span>
        </a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className={activeSection === 'portfolio' ? 'active' : ''}>
          <span>Works</span>
        </a>
        <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>
          <span>Lab</span>
        </a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>
          <span>Contact</span>
        </a>
      </nav>

      <main>
        {/* ==============================================================
            HERO PRODUCT STAGE (APPLE WHITE GALLERY, 80PX/600 HEADLINE)
            ============================================================== */}
        <section id="home" className="apple-hero-stage">
          <div className="apple-container apple-hero-grid">
            <div className="apple-hero-left">
              {/* Launch Status / Kicker */}
              <span className="apple-launch-status apple-reveal apple-stagger-1">
                JUNIOR DEVOPS & L1 CLOUD ENGINEER SUPPORT
              </span>

              {/* Display Headline 80px/600 */}
              <h1 className="apple-hero-display apple-reveal apple-stagger-2">
                Renaldy Imran.
              </h1>

              {/* Sub-headline Statement */}
              <p className="apple-hero-subhead apple-reveal apple-stagger-3">
                Engineering Cloud Reliability at Production Scale.
              </p>

              {/* Typing Terminal Badge */}
              <div className="apple-typing-pill apple-reveal apple-stagger-3">
                <span className="apple-typing-prompt">&gt; </span>
                <span className="apple-typing-text">{displayText}</span>
                <span className="apple-typing-cursor">|</span>
              </div>

              {/* Story Paragraph */}
              <p className="apple-hero-body apple-reveal apple-stagger-3">
                {lang === 'id'
                  ? "Merancang arsitektur cloud multi-environment yang tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif untuk menjamin keandalan sistem skala produksi."
                  : "Architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration for production reliability."}
              </p>

              {/* Action Buttons: Pricing Blue Pill & Outlined Explore Pill */}
              <div className="apple-hero-actions apple-reveal apple-stagger-3">
                <div className="apple-cv-dropdown-wrapper" ref={cvDropdownRef}>
                  <button 
                    type="button" 
                    onClick={() => setIsCvDropdownOpen(!isCvDropdownOpen)} 
                    className="apple-pricing-blue-pill"
                    aria-expanded={isCvDropdownOpen}
                  >
                    <span>Download CV</span>
                    <i className={`fa-solid fa-chevron-${isCvDropdownOpen ? 'up' : 'down'}`}></i>
                  </button>

                  {isCvDropdownOpen && (
                    <div className="apple-cv-menu">
                      <a 
                        href="/cv-renaldy-id.pdf" 
                        download="CV-Renaldy-Imran-Hermawan-ID.pdf"
                        onClick={() => setIsCvDropdownOpen(false)}
                        className="apple-cv-item"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                        <div className="apple-cv-text">
                          <span className="apple-cv-title">Versi Bahasa Indonesia</span>
                          <span className="apple-cv-sub">Standar ATS Nasional (PDF)</span>
                        </div>
                      </a>

                      <a 
                        href="/cv-renaldy.pdf" 
                        download="CV-Renaldy-Imran-Hermawan.pdf"
                        onClick={() => setIsCvDropdownOpen(false)}
                        className="apple-cv-item"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                        <div className="apple-cv-text">
                          <span className="apple-cv-title">International English</span>
                          <span className="apple-cv-sub">Global Tech Standard (PDF)</span>
                        </div>
                      </a>

                      <a 
                        href="/?mode=cv-builder" 
                        onClick={() => setIsCvDropdownOpen(false)}
                        className="apple-cv-item builder"
                      >
                        <i className="fa-solid fa-sliders"></i>
                        <div className="apple-cv-text">
                          <span className="apple-cv-title">Interactive CV Builder</span>
                          <span className="apple-cv-sub">A4 Live Document Generator ↗</span>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="apple-explore-pill">
                  <span>Explore Deployments ↓</span>
                </a>
              </div>

              {/* Social Links Bar */}
              <div className="apple-social-row apple-reveal apple-stagger-3">
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                  GitHub ↗
                </a>
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                  LinkedIn ↗
                </a>
                <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                  Threads ↗
                </a>
                <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                  WhatsApp ↗
                </a>
              </div>
            </div>

            <div className="apple-hero-right">
              {/* Center Product Media Render & Floating Status Capsule */}
              <div className="apple-hero-media-wrapper apple-reveal apple-stagger-2">
                <div className="apple-device-frame">
                  <img src="/profile.png" alt="Renaldy Imran Hermawan" className="apple-hero-photo" />
                  
                  {/* Floating 28px Status Capsule */}
                  <div className="apple-floating-capsule">
                    <span className="apple-status-dot"></span>
                    <div className="apple-capsule-info">
                      <span className="apple-capsule-title">
                        {lang === 'id' ? 'SIAP KERJA: DEVOPS & SRE' : 'OPEN TO WORK: DEVOPS & SRE'}
                      </span>
                      <span className="apple-capsule-sub">Kubernetes • GCP • GitLab CI • Observability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            HIGHLIGHTS STAGE: STUDIO MIST BAND (#f5f5f7)
            ============================================================== */}
        <section className="apple-section-band studio-mist">
          <div className="apple-container">
            <div className="apple-band-header apple-reveal">
              <div>
                <span className="apple-section-kicker">SRE & RELIABILITY</span>
                <h2 className="apple-band-title">Cloud Reliability & Production Uptime.</h2>
              </div>
              <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="apple-blue-link">
                Explore works ↗
              </a>
            </div>

            <p className="apple-band-narrative apple-reveal">
              {lang === 'id'
                ? "Fokus pada arsitektur cloud multi-environment yang tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif. Menjamin stabilitas infrastruktur skala produksi dan resolusi insiden secara real-time."
                : "Dedicated to architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration. Ensuring production uptime and rapid incident resolution."}
            </p>
          </div>
        </section>

        {/* ==============================================================
            SECTION: ABOUT (GALLERY WHITE CANVAS, 28PX FEATURE CARDS)
            ============================================================== */}
        <section id="about" className="apple-section-band gallery-white">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">OVERVIEW • (01)</span>
              <h2 className="apple-section-title">Architecting Resilient Cloud Systems.</h2>
            </div>

            <div className="apple-story-paragraphs apple-reveal">
              <p className="apple-feature-copy">{curr["about-narrative-p1"]}</p>
              <p className="apple-feature-copy">{curr["about-narrative-p2"]}</p>
            </div>

            {/* 3 Pillars in 28px Feature Cards */}
            <div className="apple-cards-grid">
              <div className="apple-card apple-reveal">
                <span className="apple-card-kicker">PILLAR 01</span>
                <h3 className="apple-card-heading">Cloud & Architecture.</h3>
                <p className="apple-card-copy">
                  {lang === 'id'
                    ? 'Merancang arsitektur cloud VPC di GCP & AWS, penyediaan server deklaratif menggunakan Terraform (IaC), dan isolasi jaringan multi-tier.'
                    : 'Architecting VPC cloud networks in GCP & AWS, declarative infrastructure provisioning using Terraform (IaC), and secure multi-tier networking.'}
                </p>
              </div>

              <div className="apple-card apple-reveal">
                <span className="apple-card-kicker">PILLAR 02</span>
                <h3 className="apple-card-heading">CI/CD & Automation.</h3>
                <p className="apple-card-copy">
                  {lang === 'id'
                    ? 'Membangun pipeline GitLab CI / GitHub Actions terotomatisasi, kontainerisasi Docker, scanning Trivy & SonarQube, dan GitOps Kustomize.'
                    : 'Building automated GitLab CI / GitHub Actions workflows, Docker containers, Trivy CVE scanning, SonarQube quality gates, and GitOps.'}
                </p>
              </div>

              <div className="apple-card apple-reveal">
                <span className="apple-card-kicker">PILLAR 03</span>
                <h3 className="apple-card-heading">SRE & Observability.</h3>
                <p className="apple-card-copy">
                  {lang === 'id'
                    ? 'Pemantauan real-time 24/7 menggunakan VictoriaMetrics, Grafana, VictoriaLogs, penanganan crash loop, dan sistem alarm otomatis ke Telegram.'
                    : '24/7 real-time telemetry using VictoriaMetrics, Grafana, VictoriaLogs, crash resolution, and instant Telegram alert notifications.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: TECH SPECS (STUDIO MIST BAND #f5f5f7)
            ============================================================== */}
        <section id="skills" className="apple-section-band studio-mist">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">TECH SPECS • (02)</span>
              <h2 className="apple-section-title">Engineering Stack & Toolchain.</h2>
            </div>

            <div className="apple-specs-block mb-10 apple-reveal">
              <span className="apple-specs-label">PRIMARY PRODUCTION STACK</span>
              <div className="apple-specs-grid">
                {[
                  { name: 'KUBERNETES', cat: 'Orchestration' },
                  { name: 'DOCKER', cat: 'Containers' },
                  { name: 'GITLAB CI', cat: 'Automation' },
                  { name: 'TERRAFORM', cat: 'IaC' },
                  { name: 'GOOGLE CLOUD', cat: 'Cloud Platform' },
                  { name: 'AWS', cat: 'Cloud Platform' },
                  { name: 'GRAFANA', cat: 'Observability' },
                  { name: 'VICTORIAMETRICS', cat: 'Time Series' },
                  { name: 'TRIVY', cat: 'Security Scanning' },
                  { name: 'LINUX OS', cat: 'Operating System' }
                ].map((s, idx) => (
                  <div key={idx} className="apple-spec-pill">
                    <span className="apple-spec-name">{s.name}</span>
                    <span className="apple-spec-cat">{s.cat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="apple-specs-block apple-reveal">
              <span className="apple-specs-label">NETWORKING & TOOLING</span>
              <div className="apple-specs-grid">
                {[
                  { name: 'MIKROTIK MTCNA', cat: 'Routing' },
                  { name: 'TCP/IP & DNS', cat: 'Network Protocols' },
                  { name: 'BASH SCRIPTING', cat: 'Shell Scripting' },
                  { name: 'SONARQUBE', cat: 'Quality Gate' },
                  { name: 'HARBOR REGISTRY', cat: 'Artifacts' },
                  { name: 'TELEGRAM ALERTS', cat: 'Incident Dispatch' }
                ].map((s, idx) => (
                  <div key={idx} className="apple-spec-pill">
                    <span className="apple-spec-name">{s.name}</span>
                    <span className="apple-spec-cat">{s.cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: DEPLOYMENTS (GALLERY WHITE CANVAS, 28PX CARDS)
            ============================================================== */}
        <section id="portfolio" className="apple-section-band gallery-white">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">DEPLOYMENTS • (03)</span>
              <h2 className="apple-section-title">Selected Case Studies & Highlights.</h2>
            </div>

            {/* Filter Tabs in Apple Rounded Style */}
            <div className="apple-filter-row apple-reveal">
              {[
                { key: 'all', label: 'All Case Studies (03)' },
                { key: 'gitops', label: 'GitOps & K8s' },
                { key: 'cicd', label: 'CI/CD & Security' },
                { key: 'observability', label: 'Observability' }
              ].map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  className={`apple-filter-btn ${activePortfolioFilter === tab.key ? 'active' : ''}`}
                  onClick={() => setActivePortfolioFilter(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Slider Navigation Controls */}
            <div className="apple-slider-nav-bar apple-reveal">
              <span className="apple-slider-counter">
                0{activeProjectSlide + 1} of 0{filteredProjects.length}
              </span>
              <div className="apple-slider-arrows">
                <button 
                  type="button"
                  className="apple-arrow-btn" 
                  onClick={() => setActiveProjectSlide(prev => prev > 0 ? prev - 1 : filteredProjects.length - 1)}
                  title="Previous Case Study"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button 
                  type="button"
                  className="apple-arrow-btn" 
                  onClick={() => setActiveProjectSlide(prev => prev < filteredProjects.length - 1 ? prev + 1 : 0)}
                  title="Next Case Study"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>

            {/* Slider Stage */}
            <div 
              className="apple-slider-stage"
              onTouchStart={onProjectTouchStart}
              onTouchMove={onProjectTouchMove}
              onTouchEnd={onProjectTouchEnd}
            >
              <div 
                className="apple-slider-track"
                style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
              >
                {filteredProjects.map((project) => {
                  const activeTab = projectTabs[project.id] || 'overview';
                  const isFlagship = project.id === 3;
                  return (
                    <article key={project.id} className="apple-slide-card apple-card">
                      <div className="apple-case-layout">
                        <div className="apple-case-media">
                          <div className="apple-media-frame">
                            <img src={project.image} alt={curr[project.nameKey]} />
                          </div>
                          <div className="apple-case-tools">
                            {project.tools.map((t, idx) => (
                              <span key={idx} className="apple-tool-badge">{t}</span>
                            ))}
                          </div>
                          <div className="apple-case-ctas">
                            {project.id === 3 && (
                              <>
                                <a href="/projects/cbs-presentation.pdf" target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                                  Slide PDF ↗
                                </a>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                                  GitLab Repo ↗
                                </a>
                              </>
                            )}
                            {project.id !== 3 && project.repoUrl && (
                              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="apple-blue-link">
                                GitHub Repo ↗
                              </a>
                            )}
                            <a 
                              href="#simulators" 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                setActiveSimulatorTab(project.id === 3 ? 'gitops' : project.id === 1 ? 'pipeline' : 'monitoring'); 
                                document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); 
                              }} 
                              className="apple-pricing-blue-pill compact"
                            >
                              Open Simulator ↗
                            </a>
                          </div>
                        </div>

                        <div className="apple-case-details">
                          {isFlagship && (
                            <span className="apple-launch-status mb-2">
                              KUBERNETES K3S LIVE CLUSTER
                            </span>
                          )}
                          <h3 className="apple-feature-heading">{curr[project.nameKey]}.</h3>

                          <div className="apple-story-tabs">
                            {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                              <button
                                key={tab}
                                type="button"
                                className={`apple-tab-item ${activeTab === tab ? 'active' : ''}`}
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

                          <div className="apple-tab-content">
                            {activeTab === 'overview' && <p className="apple-tab-text">{curr[project.overviewKey]}</p>}
                            {activeTab === 'problem' && <p className="apple-tab-text">{curr[project.problemKey]}</p>}
                            {activeTab === 'solution' && (
                              <div>
                                <p className="apple-role-label"><strong>Role:</strong> {curr[project.roleKey]}</p>
                                <p className="apple-tab-text">{curr[project.solutionKey]}</p>
                              </div>
                            )}
                            {activeTab === 'impact' && <p className="apple-tab-text">{curr[project.impactKey]}</p>}
                            {activeTab === 'architecture' && (
                              <div className="apple-arch-grid">
                                {project.architectureFlow?.map((node, i) => (
                                  <div key={i} className="apple-arch-cell">
                                    <span className="apple-arch-step">STEP {node.step}</span>
                                    <h4 className="apple-arch-name">{node.title}</h4>
                                    <p className="apple-arch-desc">{node.detail}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {activeTab === 'code' && project.id === 3 && (
                              <div className="apple-code-wrapper">
                                <div className="apple-code-bar">
                                  <span>scripts/deploy.sh (Vault & Kustomize)</span>
                                </div>
                                <pre className="apple-code-block">
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
                              <div className="apple-code-wrapper">
                                <div className="apple-code-bar">
                                  <span>.gitlab-ci.yml (Trivy & SonarQube)</span>
                                </div>
                                <pre className="apple-code-block">
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
                              <div className="apple-code-wrapper">
                                <div className="apple-code-bar">
                                  <span>alert-rules.yml (PromQL & Telegram)</span>
                                </div>
                                <pre className="apple-code-block">
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
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: WORKBENCH (STUDIO MIST BAND #f5f5f7)
            ============================================================== */}
        <section id="simulators" className="apple-section-band studio-mist">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">LAB WORKBENCH • (04)</span>
              <h2 className="apple-section-title">Interactive Engineering Simulators.</h2>
            </div>

            <div className="apple-card apple-reveal">
              <div className="apple-workbench-nav">
                <button 
                  type="button"
                  className={`apple-wb-tab ${activeSimulatorTab === 'pipeline' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('pipeline')}
                >
                  <i className="fa-solid fa-terminal"></i> 1. CI/CD Pipeline
                </button>
                <button 
                  type="button"
                  className={`apple-wb-tab ${activeSimulatorTab === 'gitops' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('gitops')}
                >
                  <i className="fa-solid fa-cloud"></i> 2. GitOps & K8s
                </button>
                <button 
                  type="button"
                  className={`apple-wb-tab ${activeSimulatorTab === 'monitoring' ? 'active' : ''}`}
                  onClick={() => setActiveSimulatorTab('monitoring')}
                >
                  <i className="fa-solid fa-chart-line"></i> 3. Observability & Alarm
                </button>
              </div>

              <div className="apple-workbench-content">
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
            SECTION: CREDENTIALS (GALLERY WHITE CANVAS)
            ============================================================== */}
        <section id="certifications" className="apple-section-band gallery-white">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">CREDENTIALS • (05)</span>
              <h2 className="apple-section-title">Verified Certifications & Education.</h2>
            </div>

            {/* Academic Record Card */}
            <div className="apple-card mb-8 apple-reveal">
              <div className="apple-edu-layout">
                <div className="apple-edu-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="apple-edu-text">
                  <span className="apple-launch-status">SARJANA KOMPUTER (S.KOM)</span>
                  <h3 className="apple-feature-heading" style={{ fontSize: '24px' }}>Universitas Bani Saleh : Teknik Informatika</h3>
                  <p className="apple-card-copy">
                    Fokus pada Administrasi Jaringan Komputer, Arsitektur Sistem Cloud, dan Keandalan Infrastruktur. Lulus tahun 2024.
                  </p>
                  <span className="apple-spec-cat"><i className="fa-solid fa-calendar"></i> 2020 - 2024 • Bekasi, Indonesia</span>
                </div>
              </div>
            </div>

            {/* 7 Verified Certifications Component */}
            <Certifications lang={lang} />
          </div>
        </section>

        {/* ==============================================================
            SECTION: TRAJECTORY (STUDIO MIST BAND #f5f5f7)
            ============================================================== */}
        <section id="experience" className="apple-section-band studio-mist">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal">
              <span className="apple-section-kicker">TRAJECTORY • (06)</span>
              <h2 className="apple-section-title">Professional Experience & Career.</h2>
            </div>

            <div className="apple-ledger-list">
              {experiencesData.map((exp) => (
                <article key={exp.id} className="apple-card apple-ledger-item apple-reveal">
                  <div className="apple-ledger-meta">
                    <span className="apple-ledger-date">{exp.dateText[lang]}</span>
                    <span className="apple-ledger-dur">{getDurationText(exp, lang)}</span>
                    {exp.type && <span className="apple-ledger-badge">{exp.type[lang]}</span>}
                  </div>
                  <div className="apple-ledger-body">
                    <h3 className="apple-ledger-role">
                      <i className={`fa-solid ${exp.icon}`}></i> {curr[exp.titleKey]}
                    </h3>
                    <div 
                      className="apple-ledger-desc" 
                      dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} 
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CONTACT (GALLERY WHITE CANVAS)
            ============================================================== */}
        <section id="contact" className="apple-section-band gallery-white">
          <div className="apple-container">
            <div className="apple-section-headline-block apple-reveal text-center">
              <span className="apple-section-kicker">CONNECT • (07)</span>
              <h2 className="apple-section-title">Direct Inquiries & Communication.</h2>
            </div>

            <p className="apple-contact-subtext apple-reveal text-center">
              {lang === 'id' 
                ? "Tertarik berdiskusi seputar peluang kerja DevOps, Cloud Infrastructure, atau kolaborasi teknik? Hubungi saya langsung melalui tautan di bawah."
                : "Interested in discussing DevOps opportunities, cloud infrastructure, or technical collaboration? Reach out directly through the links below."}
            </p>

            {/* CLI Resume Box */}
            <div className="apple-card apple-cli-card mb-8 apple-reveal">
              <div className="apple-cli-header">
                <span className="apple-status-dot"></span>
                <span>CLI RESUME ENDPOINT (RAW JSON)</span>
              </div>
              <div className="apple-cli-body">
                <code>$ curl -s https://justinbony.my.id/resume.json</code>
                <button 
                  type="button" 
                  className="apple-explore-pill compact" 
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

            {/* Contact Grid in 28px Cards */}
            <div className="apple-contact-grid">
              <button type="button" className="apple-card apple-contact-tile" onClick={handleCopyEmail}>
                <i className="fa-solid fa-envelope"></i>
                <div className="apple-contact-meta">
                  <span className="apple-spec-cat">Email:</span>
                  <span className="apple-contact-val">{emailCopied ? (curr["email-success"] || "Tersalin ke Clipboard!") : "renaldyimran@gmail.com ↗"}</span>
                </div>
              </button>

              <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="apple-card apple-contact-tile">
                <i className="fa-brands fa-whatsapp"></i>
                <div className="apple-contact-meta">
                  <span className="apple-spec-cat">WhatsApp:</span>
                  <span className="apple-contact-val">+62 878-7248-1308 ↗</span>
                </div>
              </a>

              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="apple-card apple-contact-tile">
                <i className="fa-brands fa-linkedin"></i>
                <div className="apple-contact-meta">
                  <span className="apple-spec-cat">LinkedIn:</span>
                  <span className="apple-contact-val">linkedin.com/in/renaldyimran ↗</span>
                </div>
              </a>

              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="apple-card apple-contact-tile">
                <i className="fa-brands fa-github"></i>
                <div className="apple-contact-meta">
                  <span className="apple-spec-cat">GitHub:</span>
                  <span className="apple-contact-val">github.com/renmher ↗</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================================
          STUDIO MIST FOOTER
          ============================================================== */}
      <footer className="apple-footer studio-mist">
        <div className="apple-container apple-footer-inner">
          <div className="apple-footer-top">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="apple-blue-link">
              ↑ Back to top
            </a>
          </div>

          <div className="apple-footer-links">
            <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer">Threads</a>
            <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>

          <p className="apple-footer-copy">
            Copyright © 2026 Renaldy Imran Hermawan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Assistant */}
      <Chatbot lang={lang} />
    </div>
  );
};

export default App;
