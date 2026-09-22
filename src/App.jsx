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
      metaTheme.setAttribute('content', theme === 'dark' ? '#101011' : '#ffffff');
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
        if (window.pageYOffset >= (sectionTop - 200)) {
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
    <div className="phipps-root">
      {/* Scroll Progress Indicator */}
      <div className="phipps-scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ==============================================================
          THIN TOP NAVIGATION (CHARLIE PHIPPS EDITORIAL SYSTEM)
          ============================================================== */}
      <header className="phipps-header">
        <div className="phipps-header-container">
          <div className="phipps-header-brand">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="phipps-brand-link">
              RENALDY IMRAN
            </a>
          </div>

          <nav className="phipps-header-nav" aria-label="Main Navigation">
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, 'about')} 
              className={activeSection === 'about' ? 'active' : ''}
            >
              ABOUT
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleNavClick(e, 'skills')} 
              className={activeSection === 'skills' ? 'active' : ''}
            >
              SKILLS
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleNavClick(e, 'portfolio')} 
              className={activeSection === 'portfolio' ? 'active' : ''}
            >
              WORKS
            </a>
            <a 
              href="#simulators" 
              onClick={(e) => handleNavClick(e, 'simulators')} 
              className={activeSection === 'simulators' ? 'active' : ''}
            >
              LAB
            </a>
            <a 
              href="#certifications" 
              onClick={(e) => handleNavClick(e, 'certifications')} 
              className={activeSection === 'certifications' ? 'active' : ''}
            >
              {lang === 'id' ? 'SERTIFIKASI' : 'CERTS'}
            </a>
            <a 
              href="#experience" 
              onClick={(e) => handleNavClick(e, 'experience')} 
              className={activeSection === 'experience' ? 'active' : ''}
            >
              {lang === 'id' ? 'KARIR' : 'CAREER'}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')} 
              className={activeSection === 'contact' ? 'active' : ''}
            >
              CONTACT
            </a>
          </nav>

          <div className="phipps-header-actions">
            <button 
              type="button" 
              onClick={toggleLanguage} 
              className="phipps-action-btn"
              title="Switch Language"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>
            <button 
              type="button" 
              onClick={toggleTheme} 
              className="phipps-action-btn"
              title="Toggle Mode"
            >
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
            <a 
              href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
              download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"}
              className="phipps-action-link"
            >
              CV ↗
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Bar */}
      <nav className="phipps-mobile-bar" aria-label="Mobile Navigation">
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>HOME</a>
        <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>ABOUT</a>
        <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>SKILLS</a>
        <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')}>WORKS</a>
        <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')}>LAB</a>
        <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>CONTACT</a>
      </nav>

      <main>
        {/* ==============================================================
            FULL-BLEED HERO CANVAS (CHARLIE PHIPPS 162PX HELVETICA 400)
            ============================================================== */}
        <section id="home" className="phipps-hero">
          <div className="phipps-hero-canvas">
            {/* Monumental display headline cropping the viewport */}
            <div className="phipps-display-wrap">
              <h1 className="phipps-display-headline">RENALDY IMRAN.</h1>
            </div>

            <div className="phipps-hero-body-grid">
              <div className="phipps-hero-body-left">
                <p className="phipps-hero-subheading">
                  Junior DevOps & Cloud Engineer.
                </p>
                <p className="phipps-body-paragraph">
                  {lang === 'id'
                    ? "Merancang arsitektur cloud tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif untuk menjamin keandalan sistem skala produksi."
                    : "Architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration for production reliability."}
                </p>

                <div className="phipps-status-row">
                  <span className="phipps-status-indicator"></span>
                  <span className="phipps-status-text">
                    {lang === 'id' ? 'STATUS: SIAP KERJA (DEVOPS & SRE)' : 'STATUS: OPEN TO WORK (DEVOPS & SRE)'}
                  </span>
                </div>

                <div className="phipps-hero-links">
                  <a 
                    href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
                    download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
                    className="phipps-cta-text"
                  >
                    Download CV ↗
                  </a>
                  <a 
                    href="#portfolio" 
                    onClick={(e) => handleNavClick(e, 'portfolio')} 
                    className="phipps-cta-text secondary"
                  >
                    Explore Works ↓
                  </a>
                </div>
              </div>

              <div className="phipps-hero-body-right">
                <div className="phipps-photo-wrapper">
                  <img 
                    src="/profile.png" 
                    alt="Renaldy Imran Hermawan" 
                    className="phipps-hero-image"
                  />
                  <p className="phipps-photo-caption">
                    Renaldy Imran Hermawan. Based in Bekasi, Indonesia. 2026.
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Bottom Footer Row */}
            <div className="phipps-hero-footer-row">
              <div className="phipps-hero-footer-left">
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="phipps-scroll-glyph" aria-label="Scroll to about">
                  ↓
                </a>
              </div>

              <div className="phipps-hero-footer-center">
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer">Threads ↗</a>
                <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
              </div>

              <div className="phipps-hero-footer-right">
                <button type="button" onClick={handleCopyEmail} className="phipps-email-btn" title="Copy Email">
                  {emailCopied ? (curr["email-success"] || "COPIED ↗") : "renaldyimran@gmail.com ↗"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            EDITORIAL STATEMENT BANNER (PAPER SURFACE)
            ============================================================== */}
        <section className="phipps-statement-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>PHILOSOPHY</span>
              <span>(00)</span>
              <span>SRE & Reliability</span>
            </div>
            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Cloud Reliability & Production Uptime.
              </h2>
              <p className="phipps-body-large">
                {lang === 'id'
                  ? "Fokus pada arsitektur cloud multi-environment yang tangguh, otomatisasi siklus CI/CD pipeline dengan pemindaian keamanan statis, serta orkestrasi Kubernetes deklaratif. Menjamin stabilitas infrastruktur skala produksi dan resolusi insiden secara real-time."
                  : "Dedicated to architecting resilient multi-environment cloud systems, automated CI/CD delivery pipelines with static security quality gates, and declarative Kubernetes orchestration. Ensuring production uptime and rapid incident resolution."}
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: ABOUT ME & CORE PILLARS
            ============================================================== */}
        <section id="about" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>EXPLORE</span>
              <span>(01)</span>
              <span>About & Architecture</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Architecting Resilient Cloud Systems.
              </h2>

              <div className="phipps-narrative-block">
                <p className="phipps-body-large mb-6">{curr["about-narrative-p1"]}</p>
                <p className="phipps-body-large mb-10">{curr["about-narrative-p2"]}</p>
              </div>

              {/* 3 Pillars */}
              <div className="phipps-pillars-grid">
                <div className="phipps-pillar-card">
                  <span className="phipps-pillar-num">01</span>
                  <h3 className="phipps-pillar-title">Cloud & Architecture.</h3>
                  <p className="phipps-pillar-desc">
                    {lang === 'id'
                      ? 'Merancang arsitektur cloud VPC di GCP & AWS, penyediaan server deklaratif menggunakan Terraform (IaC), dan isolasi jaringan multi-tier.'
                      : 'Architecting VPC cloud networks in GCP & AWS, declarative infrastructure provisioning using Terraform (IaC), and secure multi-tier networking.'}
                  </p>
                </div>

                <div className="phipps-pillar-card">
                  <span className="phipps-pillar-num">02</span>
                  <h3 className="phipps-pillar-title">CI/CD & Automation.</h3>
                  <p className="phipps-pillar-desc">
                    {lang === 'id'
                      ? 'Membangun pipeline GitLab CI / GitHub Actions terotomatisasi, kontainerisasi Docker, scanning Trivy & SonarQube, dan GitOps Kustomize.'
                      : 'Building automated GitLab CI / GitHub Actions workflows, Docker containers, Trivy CVE scanning, SonarQube quality gates, and GitOps.'}
                  </p>
                </div>

                <div className="phipps-pillar-card">
                  <span className="phipps-pillar-num">03</span>
                  <h3 className="phipps-pillar-title">SRE & Observability.</h3>
                  <p className="phipps-pillar-desc">
                    {lang === 'id'
                      ? 'Pemantauan real-time 24/7 menggunakan VictoriaMetrics, Grafana, VictoriaLogs, penanganan crash loop, dan sistem alarm otomatis ke Telegram.'
                      : '24/7 real-time telemetry using VictoriaMetrics, Grafana, VictoriaLogs, crash resolution, and instant Telegram alert notifications.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: TECHNICAL SKILLS & STACK
            ============================================================== */}
        <section id="skills" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>CAPABILITIES</span>
              <span>(02)</span>
              <span>Technical Stack</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Engineering Stack & Infrastructure.
              </h2>
              <p className="phipps-body-large mb-8">
                {lang === 'id'
                  ? "Peralatan produksi dan keahlian infrastruktur yang digunakan dalam implementasi nyata."
                  : "Production tooling and infrastructure capabilities verified in real-world implementations."}
              </p>

              <div className="phipps-skills-group">
                <span className="phipps-group-tag">PRIMARY PRODUCTION STACK</span>
                <div className="phipps-skills-grid">
                  {[
                    { name: 'KUBERNETES', category: 'Orchestration' },
                    { name: 'DOCKER', category: 'Containerization' },
                    { name: 'GITLAB CI', category: 'Automation' },
                    { name: 'TERRAFORM', category: 'IaC' },
                    { name: 'GOOGLE CLOUD', category: 'Cloud Platform' },
                    { name: 'AWS', category: 'Cloud Platform' },
                    { name: 'GRAFANA', category: 'Observability' },
                    { name: 'VICTORIAMETRICS', category: 'Time Series' },
                    { name: 'TRIVY', category: 'Security' },
                    { name: 'LINUX OS', category: 'Operating System' }
                  ].map((skill, idx) => (
                    <div key={idx} className="phipps-skill-card">
                      <span className="phipps-skill-name">{skill.name}</span>
                      <span className="phipps-skill-category">{skill.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="phipps-skills-group mt-10">
                <span className="phipps-group-tag">NETWORKING & TOOLING</span>
                <div className="phipps-skills-grid">
                  {[
                    { name: 'MIKROTIK MTCNA', category: 'Routing' },
                    { name: 'TCP/IP & DNS', category: 'Network Protocols' },
                    { name: 'BASH SCRIPTING', category: 'Automation' },
                    { name: 'SONARQUBE', category: 'Code Quality' },
                    { name: 'HARBOR REGISTRY', category: 'Artifacts' },
                    { name: 'TELEGRAM ALERTS', category: 'Incident Dispatch' }
                  ].map((skill, idx) => (
                    <div key={idx} className="phipps-skill-card">
                      <span className="phipps-skill-name">{skill.name}</span>
                      <span className="phipps-skill-category">{skill.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: PORTFOLIO & CASE STUDIES (EDITORIAL GALLERY WALL)
            ============================================================== */}
        <section id="portfolio" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>WORKS</span>
              <span>(03)</span>
              <span>Case Studies</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Selected Works & Deployments.
              </h2>
              <p className="phipps-body-large mb-6">
                {lang === 'id'
                  ? "Studi kasus arsitektur skala produksi dengan dokumentasi, diagram alur, dan kode sumber terbuka."
                  : "Production architecture case studies with detailed workflows, code samples, and simulators."}
              </p>

              {/* Filter Tabs */}
              <div className="phipps-tabs-row">
                {[
                  { key: 'all', label: 'ALL (03)' },
                  { key: 'gitops', label: 'GITOPS & K8S' },
                  { key: 'cicd', label: 'CI/CD & SECURITY' },
                  { key: 'observability', label: 'OBSERVABILITY' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    className={`phipps-tab-btn ${activePortfolioFilter === tab.key ? 'active' : ''}`}
                    onClick={() => setActivePortfolioFilter(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Slider Header */}
              <div className="phipps-slider-header">
                <span className="phipps-slider-counter">
                  0{activeProjectSlide + 1} / 0{filteredProjects.length}
                </span>
                <div className="phipps-slider-nav">
                  <button 
                    type="button" 
                    className="phipps-slider-arrow" 
                    onClick={() => setActiveProjectSlide(prev => prev > 0 ? prev - 1 : filteredProjects.length - 1)}
                    title="Previous case study"
                  >
                    ← PREV
                  </button>
                  <button 
                    type="button" 
                    className="phipps-slider-arrow" 
                    onClick={() => setActiveProjectSlide(prev => prev < filteredProjects.length - 1 ? prev + 1 : 0)}
                    title="Next case study"
                  >
                    NEXT →
                  </button>
                </div>
              </div>

              {/* Slider Stage */}
              <div 
                className="phipps-slider-stage"
                onTouchStart={onProjectTouchStart}
                onTouchMove={onProjectTouchMove}
                onTouchEnd={onProjectTouchEnd}
              >
                <div 
                  className="phipps-slider-track"
                  style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
                >
                  {filteredProjects.map((project) => {
                    const activeTab = projectTabs[project.id] || 'overview';
                    const isFlagship = project.id === 3;
                    return (
                      <article key={project.id} className="phipps-project-slide">
                        {/* Image-First Work Sample */}
                        <div className="phipps-project-photo-wrapper">
                          <img 
                            src={project.image} 
                            alt={curr[project.nameKey]} 
                            className="phipps-project-photo"
                          />
                          <p className="phipps-photo-caption">
                            {curr[project.nameKey]}. Production environment deployment.
                          </p>
                        </div>

                        <div className="phipps-project-meta-row">
                          <div className="phipps-project-tools">
                            {project.tools.map((tool, idx) => (
                              <span key={idx} className="phipps-tool-tag">{tool}</span>
                            ))}
                          </div>
                          <div className="phipps-project-external-links">
                            {project.id === 3 && (
                              <>
                                <a href="/projects/cbs-presentation.pdf" target="_blank" rel="noopener noreferrer" className="phipps-link-underline">
                                  Slide PDF ↗
                                </a>
                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="phipps-link-underline">
                                  GitLab Repo ↗
                                </a>
                              </>
                            )}
                            {project.id !== 3 && project.repoUrl && (
                              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="phipps-link-underline">
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
                              className="phipps-link-underline"
                            >
                              Open Simulator ↗
                            </a>
                          </div>
                        </div>

                        {/* Story Content & Tabs */}
                        <div className="phipps-project-body">
                          {isFlagship && (
                            <div className="phipps-meta-badge">
                              STATUS: KUBERNETES K3S LIVE CLUSTER
                            </div>
                          )}
                          <h3 className="phipps-project-headline">
                            {curr[project.nameKey]}.
                          </h3>

                          {/* Story Tabs */}
                          <div className="phipps-story-tabs">
                            {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                              <button
                                key={tab}
                                type="button"
                                className={`phipps-story-tab-btn ${activeTab === tab ? 'active' : ''}`}
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

                          <div className="phipps-story-content">
                            {activeTab === 'overview' && <p className="phipps-story-p">{curr[project.overviewKey]}</p>}
                            {activeTab === 'problem' && <p className="phipps-story-p">{curr[project.problemKey]}</p>}
                            {activeTab === 'solution' && (
                              <div>
                                <p className="phipps-story-role"><strong>Role:</strong> {curr[project.roleKey]}</p>
                                <p className="phipps-story-p">{curr[project.solutionKey]}</p>
                              </div>
                            )}
                            {activeTab === 'impact' && <p className="phipps-story-p">{curr[project.impactKey]}</p>}
                            {activeTab === 'architecture' && (
                              <div className="phipps-arch-grid">
                                {project.architectureFlow?.map((node, i) => (
                                  <div key={i} className="phipps-arch-card">
                                    <div className="phipps-arch-step">STEP {node.step}</div>
                                    <h4 className="phipps-arch-title">{node.title}</h4>
                                    <p className="phipps-arch-detail">{node.detail}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            {activeTab === 'code' && project.id === 3 && (
                              <div className="phipps-code-box">
                                <div className="phipps-code-header">
                                  <span>scripts/deploy.sh (Vault & Kustomize)</span>
                                </div>
                                <pre className="phipps-code-pre">
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
                              <div className="phipps-code-box">
                                <div className="phipps-code-header">
                                  <span>.gitlab-ci.yml (Trivy & SonarQube)</span>
                                </div>
                                <pre className="phipps-code-pre">
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
                              <div className="phipps-code-box">
                                <div className="phipps-code-header">
                                  <span>alert-rules.yml (PromQL & Telegram)</span>
                                </div>
                                <pre className="phipps-code-pre">
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
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: INTERACTIVE SIMULATOR (DEVOPS WORKBENCH)
            ============================================================== */}
        <section id="simulators" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>LAB</span>
              <span>(04)</span>
              <span>DevOps Simulator</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Interactive Engineering Workbench.
              </h2>
              <p className="phipps-body-large mb-6">
                {lang === 'id'
                  ? "Simulasikan proses deployment pipeline, drift detection k8s, dan respon alarm monitoring secara langsung."
                  : "Test release automation, drift detection, and incident telemetry responses directly in your browser."}
              </p>

              <div className="phipps-workbench-shell">
                <div className="phipps-tabs-row">
                  <button 
                    type="button"
                    className={`phipps-tab-btn ${activeSimulatorTab === 'pipeline' ? 'active' : ''}`} 
                    onClick={() => setActiveSimulatorTab('pipeline')}
                  >
                    1. CI/CD PIPELINE
                  </button>
                  <button 
                    type="button"
                    className={`phipps-tab-btn ${activeSimulatorTab === 'gitops' ? 'active' : ''}`} 
                    onClick={() => setActiveSimulatorTab('gitops')}
                  >
                    2. GITOPS & K8S
                  </button>
                  <button 
                    type="button"
                    className={`phipps-tab-btn ${activeSimulatorTab === 'monitoring' ? 'active' : ''}`} 
                    onClick={() => setActiveSimulatorTab('monitoring')}
                  >
                    3. OBSERVABILITY & ALARM
                  </button>
                </div>

                <div className="phipps-simulator-body mt-6">
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
          </div>
        </section>

        {/* ==============================================================
            SECTION: CERTIFICATIONS & EDUCATION
            ============================================================== */}
        <section id="certifications" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>CREDENTIALS</span>
              <span>(05)</span>
              <span>Verified Qualifications</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Certifications & Academic Record.
              </h2>
              <p className="phipps-body-large mb-8">
                {lang === 'id'
                  ? "Kualifikasi profesional terverifikasi dalam administrasi jaringan, infrastruktur cloud, dan rekayasa devops."
                  : "Verified professional qualifications across network engineering, cloud architecture, and DevOps practices."}
              </p>

              {/* Education Block */}
              <div className="phipps-edu-card mb-10">
                <div className="phipps-edu-meta">
                  <span className="phipps-edu-degree">SARJANA KOMPUTER (S.KOM)</span>
                  <span className="phipps-edu-year">2020 - 2024 • BEKASI, INDONESIA</span>
                </div>
                <h3 className="phipps-edu-school">Universitas Bani Saleh : Teknik Informatika</h3>
                <p className="phipps-edu-desc">
                  Fokus pada Administrasi Jaringan Komputer, Arsitektur Sistem Cloud, dan Keandalan Infrastruktur. Lulus tahun 2024.
                </p>
              </div>

              {/* 7 Verified Certifications */}
              <Certifications lang={lang} />
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CAREER TRAJECTORY (EXECUTIVE LEDGER)
            ============================================================== */}
        <section id="experience" className="phipps-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>RECORD</span>
              <span>(06)</span>
              <span>Career Ledger</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Professional Trajectory.
              </h2>
              <p className="phipps-body-large mb-8">
                {lang === 'id'
                  ? "Rekam jejak pengalaman kerja dan implementasi sistem secara historis."
                  : "Chronological professional track record in system engineering and technical execution."}
              </p>

              <div className="phipps-ledger">
                {experiencesData.map((exp) => (
                  <article key={exp.id} className="phipps-ledger-row">
                    <div className="phipps-ledger-col-left">
                      <span className="phipps-ledger-date">{exp.dateText[lang]}</span>
                      <span className="phipps-ledger-duration">{getDurationText(exp, lang)}</span>
                      {exp.type && <span className="phipps-ledger-badge">{exp.type[lang]}</span>}
                    </div>
                    <div className="phipps-ledger-col-right">
                      <h3 className="phipps-ledger-role">{curr[exp.titleKey]}</h3>
                      <div 
                        className="phipps-ledger-detail" 
                        dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} 
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION: CONTACT & DIRECT INQUIRIES
            ============================================================== */}
        <section id="contact" className="phipps-section phipps-contact-section">
          <div className="phipps-container phipps-editorial-grid">
            <div className="phipps-stacked-label">
              <span>CONNECT</span>
              <span>(07)</span>
              <span>Direct Inquiries</span>
            </div>

            <div className="phipps-editorial-content">
              <h2 className="phipps-editorial-headline">
                Direct Inquiries & Communication.
              </h2>
              <p className="phipps-body-large mb-8">
                {lang === 'id' 
                  ? "Tertarik berdiskusi seputar peluang kerja DevOps, Cloud Infrastructure, atau kolaborasi teknik? Hubungi saya langsung melalui tautan di bawah."
                  : "Interested in discussing DevOps opportunities, cloud infrastructure, or technical collaboration? Reach out directly through the links below."}
              </p>

              {/* CLI Endpoint */}
              <div className="phipps-cli-box mb-8">
                <div className="phipps-cli-header">
                  <span>CLI RESUME ENDPOINT (RAW JSON)</span>
                </div>
                <div className="phipps-cli-body">
                  <code>$ curl -s https://justinbony.my.id/resume.json</code>
                  <button 
                    type="button"
                    className="phipps-cli-copy-btn" 
                    onClick={() => {
                      navigator.clipboard.writeText('curl -s https://justinbony.my.id/resume.json');
                      setCurlCopied(true);
                      setTimeout(() => setCurlCopied(false), 2000);
                    }}
                    title="Copy command"
                  >
                    {curlCopied ? (lang === 'id' ? 'TERSALIN' : 'COPIED') : (lang === 'id' ? 'SALIN' : 'COPY')}
                  </button>
                </div>
              </div>

              {/* Text Link List */}
              <div className="phipps-contact-links">
                <button type="button" onClick={handleCopyEmail} className="phipps-contact-row-btn">
                  <span className="phipps-contact-label">Email:</span>
                  <span className="phipps-contact-val">
                    {emailCopied ? (curr["email-success"] || "COPIED TO CLIPBOARD") : "renaldyimran@gmail.com ↗"}
                  </span>
                </button>
                <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="phipps-contact-row">
                  <span className="phipps-contact-label">WhatsApp:</span>
                  <span className="phipps-contact-val">+62 878-7248-1308 ↗</span>
                </a>
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" className="phipps-contact-row">
                  <span className="phipps-contact-label">LinkedIn:</span>
                  <span className="phipps-contact-val">linkedin.com/in/renaldyimran ↗</span>
                </a>
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" className="phipps-contact-row">
                  <span className="phipps-contact-label">GitHub:</span>
                  <span className="phipps-contact-val">github.com/renmher ↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==============================================================
          EDITORIAL FOOTER
          ============================================================== */}
      <footer className="phipps-footer">
        <div className="phipps-container phipps-footer-grid">
          <div className="phipps-footer-left">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="phipps-back-top">
              ↑ BACK TO TOP
            </a>
          </div>

          <div className="phipps-footer-center">
            <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="https://www.threads.net/@renmher" target="_blank" rel="noopener noreferrer">Threads ↗</a>
            <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
          </div>

          <div className="phipps-footer-right">
            <span>©2026 Renaldy Imran Hermawan. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Assistant */}
      <Chatbot lang={lang} />
    </div>
  );
};

export default App;
