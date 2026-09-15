import { useState, useEffect, useCallback } from 'react';
import Certifications from './components/Certifications';
import PipelineSimulator from './components/PipelineSimulator';
import GitOpsSimulator from './components/GitOpsSimulator';
import ObservabilitySimulator from './components/ObservabilitySimulator';
import Chatbot from './components/Chatbot';
import CVBuilder from './components/CVBuilder';
import { experiencesData, getDurationText } from './data/experiences';
import { translations } from './data/translations';
import { skillsList, projectsList } from './data/projects';

const App = () => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [emailCopied, setEmailCopied] = useState(false);
  const [projectTabs, setProjectTabs] = useState({ 1: 'overview', 2: 'overview', 3: 'overview' });
  const [pipelineState, setPipelineState] = useState({ status: 'idle', stage: 0 });
  const [isPipelineLinked, setIsPipelineLinked] = useState(false);
  const [gitopsDeployedVersion, setGitopsDeployedVersion] = useState(null);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState('pipeline');

  const curr = translations[lang] || translations.id;

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
      metaTheme.setAttribute('content', theme === 'dark' ? '#030712' : '#f8fafc');
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
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'cv-builder') {
    return <CVBuilder />;
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <div className="bg-visuals">
      </div>

      <header className="site-header">
        <div className="header-container">
          <a href="#home" className="nav-logo">
            <i className="fa-solid fa-terminal logo-icon"></i>
            <span className="logo-text">Renaldy.dev</span>
          </a>

          <nav className="desktop-nav">
            <ul>
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>{curr["nav-home"]}</a></li>
              <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>{curr["nav-about"]}</a></li>
              <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>{curr["nav-projects"]}</a></li>
              <li><a href="#simulators" className={activeSection === 'simulators' ? 'active' : ''}>{curr["nav-playground"]}</a></li>
              <li><a href="#certifications" className={activeSection === 'certifications' ? 'active' : ''}>{curr["nav-certs"]}</a></li>
              <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>{curr["nav-experience"]}</a></li>
            </ul>
          </nav>

          <div className="header-controls">
            <div className="controls">
              <button id="theme-toggle" className="control-btn" title="Toggle Theme" onClick={toggleTheme}>
                {theme === 'dark' ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
              </button>
              <button id="lang-toggle" className="control-btn" title="Switch Language" onClick={toggleLanguage}>
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <a 
                href="https://github.com/renmher" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="control-btn nav-social-btn" 
                title="GitHub Profile" 
                aria-label="GitHub Profile"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a 
                href="https://linkedin.com/in/renaldyimran" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="control-btn nav-social-btn" 
                title="LinkedIn Profile" 
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <a 
              href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
              download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
              className="nav-cv-btn"
            >
              <i className="fa-solid fa-file-arrow-down"></i> CV
            </a>
            <a href="#contact" className="nav-cta">{curr["nav-contact"]}</a>
          </div>
        </div>
      </header>

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
            <a href="#simulators" className={activeSection === 'simulators' ? 'active' : ''}>
              <i className="fa-solid fa-gamepad"></i>
              <span>Playground</span>
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

      <main className="container">
        <section id="home" className="hero reveal active">
          <div className="hero-content">
            <div className="open-to-work-badge">
              <span className="dot pulse"></span>
              <span>{lang === 'id' ? 'Aktif Mencari Kerja' : 'Open to work'}</span>
            </div>
            
            <h1 className="hero-title">
              {lang === 'id' ? 'Halo, Saya' : "Hi, I'm"}<br />
              <span className="text-highlight">Renaldy Imran Hermawan, S.Kom</span>
            </h1>
            
            <p className="hero-subtitle">{curr["hero-roles"]}</p>
            <p className="hero-desc">{curr["hero-desc"]}</p>
            
            <div className="hero-meta">
              <span><i className="fa-solid fa-map-pin"></i> {curr["hero-location"]}</span>
              <span className="separator">•</span>
              <span><i className="fa-solid fa-cake-candles"></i> {curr["hero-age"]}</span>
            </div>
            
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                {curr["btn-projects"]}
              </a>
              <a 
                href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
                download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
                className="btn btn-secondary"
              >
                {curr["btn-cv"]}
              </a>
            </div>

            <div className="hero-stats-grid">
              <div className="stat-item">
                <div className="stat-num">2+</div>
                <div className="stat-label">{lang === 'id' ? 'Tahun Pengalaman' : 'Years Experience'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">{lang === 'id' ? 'Projects Selesai' : 'Completed Projects'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">7+</div>
                <div className="stat-label">{lang === 'id' ? 'Sertifikasi' : 'Certifications'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">2024</div>
                <div className="stat-label">{lang === 'id' ? 'Tahun Kelulusan' : 'Graduation Year'}</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="relative-glow-container">
              <div className="hero-ambient-glow"></div>
              <div className="glow-inner-circle"></div>
              <div className="profile-img-circle">
                <img src="/profile.png" alt="Renaldy Imran Hermawan" className="hero-profile-img" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["about-title"] }} />
            <p>{curr["about-subtitle"]}</p>
          </div>

          <div className="about-narrative-card card mb-8">
            <div className="narrative-content">
              <p className="mb-4">{curr["about-narrative-p1"]}</p>
              <p>{curr["about-narrative-p2"]}</p>
            </div>
          </div>

          <div className="brand-mapping-section mb-12">
            <h3 className="mb-4 text-center" dangerouslySetInnerHTML={{ __html: curr["brand-title"] }} />
            <p className="text-muted text-center mb-8">{curr["brand-subtitle"]}</p>
            <div className="brand-mapping-grid grid mb-8">
              <div className="card brand-map-card brand-map-featured">
                <div className="brand-map-icon"><i className="fa-solid fa-crosshairs"></i></div>
                <h4>{curr["brand-role-label"]}</h4>
                <p className="text-muted">{curr["brand-role-val"]}</p>
              </div>
              <div className="card brand-map-card">
                <div className="brand-map-icon"><i className="fa-solid fa-code"></i></div>
                <h4>{curr["brand-skills-label"]}</h4>
                <p className="text-muted">{curr["brand-skills-val"]}</p>
              </div>
              <div className="card brand-map-card">
                <div className="brand-map-icon"><i className="fa-solid fa-gauge-high"></i></div>
                <h4>{curr["brand-strength-label"]}</h4>
                <p className="text-muted">{curr["brand-strength-val"]}</p>
              </div>
              <div className="card brand-map-card">
                <div className="brand-map-icon"><i className="fa-solid fa-compass"></i></div>
                <h4>{curr["brand-interest-label"]}</h4>
                <p className="text-muted">{curr["brand-interest-val"]}</p>
              </div>
            </div>
          </div>

          <div className="skills-categories-section mb-12">
            <div className="section-title">
              <h3 dangerouslySetInnerHTML={{ __html: curr["skills-title"] }} />
              <p>{curr["skills-subtitle"]}</p>
            </div>
            <div className="skills-categories-grid grid">
              <div className="card skills-cat-card">
                <h4 className="skills-cat-title"><i className="fa-solid fa-server"></i> {curr["skills-cat-hard"]}</h4>
                <p className="skills-cat-text">{curr["skills-val-hard"]}</p>
              </div>
              <div className="card skills-cat-card">
                <h4 className="skills-cat-title"><i className="fa-solid fa-toolbox"></i> {curr["skills-cat-tools"]}</h4>
                <p className="skills-cat-text">{curr["skills-val-tools"]}</p>
              </div>
              <div className="card skills-cat-card">
                <h4 className="skills-cat-title"><i className="fa-solid fa-layer-group"></i> {curr["skills-cat-stack"]}</h4>
                <p className="skills-cat-text">{curr["skills-val-stack"]}</p>
              </div>
              <div className="card skills-cat-card">
                <h4 className="skills-cat-title"><i className="fa-solid fa-users"></i> {curr["skills-cat-soft"]}</h4>
                <p className="skills-cat-text">{curr["skills-val-soft"]}</p>
              </div>
            </div>
          </div>

          <div className="grid">
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

            <article className="card">
              <h3>{curr["about-pillars-title"]}</h3>
              <p className="text-muted mb-3">{curr["about-pillars-desc"]}</p>
              <div className="about-info-list">
                <div className="about-info-item">
                  <i className="fa-solid fa-code"></i>
                  <span><strong>IaC:</strong> Terraform, Ansible</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-repeat"></i>
                  <span><strong>CI/CD:</strong> GitLab CI, GitHub Actions</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-cubes"></i>
                  <span><strong>Cloud:</strong> GCP, AWS, Docker, K8s</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-chart-line"></i>
                  <span><strong>Observability:</strong> Grafana, VictoriaMetrics</span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>{curr["about-methods-title"]}</h3>
              <p className="text-muted mb-3">{curr["about-methods-desc"]}</p>
              <div className="about-info-list">
                <div className="about-info-item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>{lang === 'id' ? 'Keamanan: Security scanning di pipeline' : 'Security-First: Scanning in pipeline'}</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-sliders"></i>
                  <span>{lang === 'id' ? 'Otomatisasi: Mengurangi error manual' : 'Automation: Minimizing manual errors'}</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                  <span>{lang === 'id' ? 'Observability: Monitoring proaktif 24/7' : 'Observability: Proactive 24/7 monitoring'}</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-network-wired"></i>
                  <span>{lang === 'id' ? 'Skalabilitas: Desain sistem handal' : 'Scalability: Resilient architecture'}</span>
                </div>
              </div>
            </article>

            <article className="card">
              <h3>{curr["about-edu-title"]}</h3>
              <p className="text-muted mb-3">{curr["about-edu-desc"]}</p>
              <div className="about-info-list">
                <div className="about-info-item">
                  <i className="fa-solid fa-graduation-cap"></i>
                  <span><strong>S.Kom:</strong> Universitas Bani Saleh</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-bullseye"></i>
                  <span>{lang === 'id' ? 'Fokus: Infrastruktur & Jaringan' : 'Focus: Infrastructure & Network'}</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-house-laptop"></i>
                  <span>{lang === 'id' ? 'Siap Kerja: On-site / Hybrid / Remote' : 'Work Mode: On-site / Hybrid / Remote'}</span>
                </div>
                <div className="about-info-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <span>{lang === 'id' ? 'Domisili: Bekasi, Indonesia' : 'Location: Bekasi, Indonesia'}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["proj-section-title"] }} />
            <p>{curr["proj-section-subtitle"]}</p>
          </div>

          <div className="projects-list-container">
            {projectsList.map((project) => {
              const activeTab = projectTabs[project.id] || 'overview';
              return (
                <article key={project.id} className="card project-showcase-card">
                  <div className="project-grid-inner">
                    <div className="project-showcase-visual">
                      <div className="project-showcase-img-wrapper">
                        <img src={project.image} alt={curr[project.nameKey]} />
                      </div>
                      <div className="project-showcase-tools">
                        {project.tools.map((tool, index) => (
                          <span key={index} className="project-tool-tag">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-showcase-details">
                      <div>
                        <h3 className="project-showcase-title">{curr[project.nameKey]}</h3>
                        
                        <div className="project-story-tabs">
                          {['overview', 'problem', 'solution', 'impact', 'architecture'].map((tab) => (
                            <button
                              key={tab}
                              className={`project-story-tab-btn ${activeTab === tab ? 'active' : ''}`}
                              onClick={() => handleProjectTabChange(project.id, tab)}
                            >
                              {tab === 'overview' && curr["proj-tab-overview"]}
                              {tab === 'problem' && curr["proj-tab-problem"]}
                              {tab === 'solution' && curr["proj-tab-solution"]}
                              {tab === 'impact' && curr["proj-tab-impact"]}
                              {tab === 'architecture' && curr["proj-tab-arch"]}
                            </button>
                          ))}
                        </div>

                        <div className="project-story-content">
                          {activeTab === 'overview' && (
                            <div>
                              <p className="project-story-heading">{curr["proj-tab-overview"]}:</p>
                              <p>{curr[project.overviewKey]}</p>
                            </div>
                          )}
                          {activeTab === 'problem' && (
                            <div>
                              <p className="project-story-heading problem">Challenge / Problem:</p>
                              <p>{curr[project.problemKey]}</p>
                            </div>
                          )}
                          {activeTab === 'solution' && (
                            <div>
                              <p className="project-story-heading solution">Solution & Process (Contribution):</p>
                              <p className="mb-3"><strong>Role:</strong> {curr[project.roleKey]}</p>
                              <p>{curr[project.solutionKey]}</p>
                            </div>
                          )}
                          {activeTab === 'impact' && (
                            <div>
                              <p className="project-story-heading impact">Result & Impact:</p>
                              <p>{curr[project.impactKey]}</p>
                            </div>
                          )}
                          {activeTab === 'architecture' && (
                            <div className="project-architecture-flow">
                              <p className="project-story-heading arch">
                                <i className="fa-solid fa-diagram-project"></i> System Architecture Flow:
                              </p>
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
                            </div>
                          )}
                        </div>

                        <div className="project-action-bar">
                          {project.id === 1 && (
                            <a 
                              href="#simulators" 
                              onClick={() => setActiveSimulatorTab('pipeline')}
                              className="project-action-link"
                            >
                              <i className="fa-solid fa-terminal"></i> {lang === 'id' ? 'Coba Simulator Pipeline' : 'Try Pipeline Simulator'}
                            </a>
                          )}
                          {project.id === 2 && (
                            <a 
                              href="#simulators" 
                              onClick={() => setActiveSimulatorTab('monitoring')}
                              className="project-action-link"
                            >
                              <i className="fa-solid fa-chart-line"></i> {lang === 'id' ? 'Coba Simulator Monitoring' : 'Try Monitoring Simulator'}
                            </a>
                          )}
                          {project.id === 3 && (
                            <>
                              <a 
                                href="#simulators" 
                                onClick={() => setActiveSimulatorTab('gitops')}
                                className="project-action-link"
                              >
                                <i className="fa-solid fa-cloud"></i> {lang === 'id' ? 'Coba Simulator GitOps' : 'Try GitOps Simulator'}
                              </a>
                              <a 
                                href="/projects/cbs-presentation.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="project-action-link"
                              >
                                <i className="fa-solid fa-file-pdf"></i> {lang === 'id' ? 'Lihat Slide Presentasi (PDF)' : 'View Slide Presentation (PDF)'}
                              </a>
                            </>
                          )}
                          {project.repoUrl && (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="project-action-link repo-link"
                            >
                              <i className={project.repoUrl.includes('gitlab') ? "fa-brands fa-gitlab" : "fa-brands fa-github"}></i> {curr["btn-view-repo"]}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="simulators" className="reveal">
          <div className="section-title">
            <h2>DevOps Playground & Simulators</h2>
            <p>
              {lang === 'id' 
                ? 'Simulasikan siklus otomatisasi pipeline, deployment GitOps, dan monitoring sistem secara langsung.' 
                : 'Simulate pipeline automation cycles, GitOps deployments, and system monitoring live.'}
            </p>
          </div>

          <div className="simulator-tabs">
            <button 
              className={`btn ${activeSimulatorTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSimulatorTab('pipeline')}
            >
              <i className="fa-solid fa-terminal"></i> 1. CI/CD Pipeline
            </button>
            <button 
              className={`btn ${activeSimulatorTab === 'gitops' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSimulatorTab('gitops')}
            >
              <i className="fa-solid fa-cloud"></i> 2. GitOps & K8s
            </button>
            <button 
              className={`btn ${activeSimulatorTab === 'monitoring' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveSimulatorTab('monitoring')}
            >
              <i className="fa-solid fa-chart-line"></i> 3. Observability & Alarm
            </button>
          </div>

          <div className="simulator-active-content">
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
        </section>

        <Certifications lang={lang} />

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

      <footer>
        <div className="container footer-content">
          <p>&copy; {new Date().getFullYear()} Renaldy Imran Hermawan. {curr["footer-rights"]}</p>
        </div>
      </footer>

      <Chatbot lang={lang} />
    </>
  );
};

export default App;
