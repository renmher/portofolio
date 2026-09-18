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
  const [curlCopied, setCurlCopied] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState(null);

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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .card, .timeline-item, .project-showcase-card, .arch-node-card').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

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
          <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
            <i className="fa-solid fa-terminal logo-icon"></i>
            <span className="logo-text">Renaldy.dev</span>
          </a>

          <nav className="desktop-nav">
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>{curr["nav-home"]}</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>{curr["nav-about"]}</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>{curr["nav-projects"]}</a></li>
              <li><a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>{curr["nav-playground"]}</a></li>
              <li><a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>{curr["nav-certs"]}</a></li>
              <li><a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>{curr["nav-experience"]}</a></li>
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
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-cta">{curr["nav-contact"]}</a>
          </div>
        </div>
      </header>

      <nav className="mobile-nav">
        <ul>
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
              <i className="fa-solid fa-house"></i>
              <span>{curr["nav-home"]}</span>
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={activeSection === 'about' ? 'active' : ''}>
              <i className="fa-solid fa-user"></i>
              <span>{curr["nav-about"]}</span>
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>
              <i className="fa-solid fa-diagram-project"></i>
              <span>{lang === 'id' ? 'Proyek' : 'Proj'}</span>
            </a>
          </li>
          <li>
            <a href="#simulators" onClick={(e) => handleNavClick(e, 'simulators')} className={activeSection === 'simulators' ? 'active' : ''}>
              <i className="fa-solid fa-gamepad"></i>
              <span>Playground</span>
            </a>
          </li>
          <li>
            <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>
              <i className="fa-solid fa-certificate"></i>
              <span>{lang === 'id' ? 'Sertif' : 'Certs'}</span>
            </a>
          </li>
          <li>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>
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
              <span>renmher@k8s-prod:~$ cluster status --healthy (14ms)</span>
            </div>
            
            <h1 className="hero-title">
              {lang === 'id' ? (
                <>Membangun Keandalan <span className="text-highlight">Cloud & Otomatisasi CI/CD</span> Skala Produksi.</>
              ) : (
                <>Architecting <span className="text-highlight">Cloud Resilience</span> & Automated CI/CD Pipelines.</>
              )}
            </h1>
            
            <div className="hero-identity-tag">
              <span className="identity-name">Renaldy Imran Hermawan, S.Kom</span>
              <span className="separator">•</span>
              <span className="identity-role">{curr["hero-roles"]}</span>
            </div>
            
            <p className="hero-desc">{curr["hero-desc"]}</p>
            
            <div className="hero-meta">
              <span><i className="fa-solid fa-map-pin"></i> {curr["hero-location"]}</span>
              <span className="separator">•</span>
              <span><i className="fa-solid fa-briefcase"></i> {lang === 'id' ? 'Tersedia untuk DevOps Role' : 'Available for DevOps Roles'}</span>
            </div>
            
            <div className="hero-buttons">
              <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="btn btn-primary">
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
            <div className="profile-architectural-frame">
              <div className="frame-meta-tag">06°14'S 106°59'E // BEKASI, ID</div>
              <div className="profile-img-circle">
                <img src="/profile.png" alt="Renaldy Imran Hermawan" className="hero-profile-img" />
              </div>
              <div className="frame-status-tag">
                <span className="dot pulse"></span>
                <span>SYSTEM STATUS: 100% OPERATIONAL</span>
              </div>
            </div>
          </div>
        </section>

        {/* Infinite Studio Tech Marquee */}
        <div className="studio-marquee-wrapper" aria-hidden="true">
          <div className="studio-marquee-track">
            <div className="marquee-content">
              <span>KUBERNETES</span><span className="marquee-dot">/</span>
              <span>GITLAB CI</span><span className="marquee-dot">/</span>
              <span>TERRAFORM (IaC)</span><span className="marquee-dot">/</span>
              <span>DOCKER</span><span className="marquee-dot">/</span>
              <span>VICTORIAMETRICS</span><span className="marquee-dot">/</span>
              <span>TRIVY CVE SCAN</span><span className="marquee-dot">/</span>
              <span>SONARQUBE SAST</span><span className="marquee-dot">/</span>
              <span>HARBOR REGISTRY</span><span className="marquee-dot">/</span>
              <span>GITOPS KUSTOMIZE</span><span className="marquee-dot">/</span>
              <span>HASHICORP VAULT</span><span className="marquee-dot">/</span>
              <span>NGINX INGRESS</span><span className="marquee-dot">/</span>
              <span>LINUX BASH</span><span className="marquee-dot">/</span>
              <span>GOOGLE CLOUD (GCP)</span><span className="marquee-dot">/</span>
              <span>AWS CLOUD</span><span className="marquee-dot">/</span>
              <span>MIKROTIK MTCNA</span><span className="marquee-dot">/</span>
            </div>
            <div className="marquee-content" aria-hidden="true">
              <span>KUBERNETES</span><span className="marquee-dot">/</span>
              <span>GITLAB CI</span><span className="marquee-dot">/</span>
              <span>TERRAFORM (IaC)</span><span className="marquee-dot">/</span>
              <span>DOCKER</span><span className="marquee-dot">/</span>
              <span>VICTORIAMETRICS</span><span className="marquee-dot">/</span>
              <span>TRIVY CVE SCAN</span><span className="marquee-dot">/</span>
              <span>SONARQUBE SAST</span><span className="marquee-dot">/</span>
              <span>HARBOR REGISTRY</span><span className="marquee-dot">/</span>
              <span>GITOPS KUSTOMIZE</span><span className="marquee-dot">/</span>
              <span>HASHICORP VAULT</span><span className="marquee-dot">/</span>
              <span>NGINX INGRESS</span><span className="marquee-dot">/</span>
              <span>LINUX BASH</span><span className="marquee-dot">/</span>
              <span>GOOGLE CLOUD (GCP)</span><span className="marquee-dot">/</span>
              <span>AWS CLOUD</span><span className="marquee-dot">/</span>
              <span>MIKROTIK MTCNA</span><span className="marquee-dot">/</span>
            </div>
          </div>
        </div>

        <section id="about" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["about-title"] }} />
            <p>{curr["about-subtitle"]}</p>
          </div>

          <div className="editorial-about-split mb-12">
            <div className="editorial-narrative-main">
              <span className="section-category-tag mb-4 d-inline-block">// EXECUTIVE PROFILE</span>
              <p className="narrative-lead mb-4">{curr["about-narrative-p1"]}</p>
            </div>
            <div className="editorial-narrative-side">
              <p className="narrative-sub mb-6">{curr["about-narrative-p2"]}</p>
              <div className="editorial-meta-list">
                <div className="editorial-meta-row">
                  <span className="meta-label">DEGREE</span>
                  <span className="meta-val">S.Kom — Universitas Bani Saleh</span>
                </div>
                <div className="editorial-meta-row">
                  <span className="meta-label">TARGET ROLE</span>
                  <span className="meta-val">DevOps & Cloud Engineer</span>
                </div>
                <div className="editorial-meta-row">
                  <span className="meta-label">LOCATION</span>
                  <span className="meta-val">Bekasi, ID (Ready for Hybrid/Remote)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="competency-ledger mb-12">
            <div className="competency-col">
              <span className="competency-num">01</span>
              <h4>{curr["skills-cat-hard"]}</h4>
              <p>{curr["skills-val-hard"]}</p>
            </div>
            <div className="competency-col">
              <span className="competency-num">02</span>
              <h4>{curr["skills-cat-tools"]}</h4>
              <p>{curr["skills-val-tools"]}</p>
            </div>
            <div className="competency-col">
              <span className="competency-num">03</span>
              <h4>{curr["about-pillars-title"]}</h4>
              <p>GCP, AWS, Docker, K8s, GitLab CI, Terraform, Grafana, VictoriaMetrics</p>
            </div>
            <div className="competency-col">
              <span className="competency-num">04</span>
              <h4>{curr["skills-cat-soft"]}</h4>
              <p>{curr["skills-val-soft"]}</p>
            </div>
          </div>

          <div className="skills-tape-container">
            <div className="skills-tape-header mb-4">
              <h4 className="font-mono text-sm uppercase tracking-wider text-muted">// VERIFIED TECH STACK (CLICK TO FILTER PROJECTS)</h4>
              {activeTechFilter && (
                <button 
                  className="btn-clear-filter" 
                  onClick={() => setActiveTechFilter(null)}
                >
                  <i className="fa-solid fa-xmark"></i> {lang === 'id' ? `Hapus Filter (${activeTechFilter})` : `Clear Filter (${activeTechFilter})`}
                </button>
              )}
            </div>
            <div className="skills-container">
              {skillsList.map((skill, idx) => {
                const isSelected = activeTechFilter === skill.name;
                return (
                  <div key={idx} className="skill-tag-wrapper">
                    <button 
                      className={`skill-tag filterable ${isSelected ? 'active-filter' : ''}`}
                      onClick={() => setActiveTechFilter(prev => prev === skill.name ? null : skill.name)}
                      title={`Filter projects by ${skill.name}`}
                    >
                      <i className={skill.icon}></i> {skill.name}
                    </button>
                    <div className="skill-tooltip">
                      <div className="tooltip-header">
                        <i className={skill.icon}></i>
                        <strong>{skill.name}</strong>
                      </div>
                      <p className="tooltip-desc">{skill.desc[lang]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="reveal">
          <div className="section-title">
            <h2 dangerouslySetInnerHTML={{ __html: curr["proj-section-title"] }} />
            <p>{curr["proj-section-subtitle"]}</p>
          </div>

          {/* FLAGSHIP CASE STUDY: CORE BANKING SYARIAH */}
          {(() => {
            const flagship = projectsList.find(p => p.id === 3);
            if (!flagship) return null;
            const activeTab = projectTabs[flagship.id] || 'overview';
            return (
              <div className="flagship-case-study mb-16">
                <div className="flagship-badge-bar">
                  <span className="flagship-live-badge">
                    <span className="dot pulse"></span>
                    <span>LIVE INGRESS: portal-admin-prod-renaldy-imran-cbs.apps.k3s.cbu</span>
                  </span>
                  <span className="flagship-tag-pill">FLAGSHIP CASE STUDY</span>
                </div>

                <div className="flagship-grid">
                  <div className="flagship-visual-col">
                    <div className="flagship-img-frame">
                      <img src={flagship.image} alt={curr[flagship.nameKey]} />
                    </div>
                    <div className="flagship-tools-list">
                      {flagship.tools.map((t, idx) => (
                        <span key={idx} className="project-tool-tag">{t}</span>
                      ))}
                    </div>
                    <div className="flagship-action-bar">
                      <a 
                        href="/projects/cbs-presentation.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        <i className="fa-solid fa-file-pdf"></i> <span>{lang === 'id' ? 'Buka Slide Presentasi (PDF)' : 'View Slide Deck (PDF)'}</span>
                      </a>
                      <a 
                        href={flagship.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <i className="fa-brands fa-gitlab"></i> <span>{lang === 'id' ? 'GitLab Shared Pipeline' : 'GitLab Shared Templates'}</span>
                      </a>
                      <a 
                        href="#simulators" 
                        onClick={(e) => { e.preventDefault(); setActiveSimulatorTab('gitops'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="btn btn-secondary"
                      >
                        <i className="fa-solid fa-cloud"></i> <span>{lang === 'id' ? 'Coba Simulator GitOps' : 'Try GitOps Sim'}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flagship-info-col">
                    <h3 className="flagship-title">{curr[flagship.nameKey]}</h3>
                    <div className="project-story-tabs">
                      {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                        <button
                          key={tab}
                          className={`project-story-tab-btn ${activeTab === tab ? 'active' : ''}`}
                          onClick={() => handleProjectTabChange(flagship.id, tab)}
                        >
                          {tab === 'overview' && curr["proj-tab-overview"]}
                          {tab === 'problem' && curr["proj-tab-problem"]}
                          {tab === 'solution' && curr["proj-tab-solution"]}
                          {tab === 'impact' && curr["proj-tab-impact"]}
                          {tab === 'architecture' && curr["proj-tab-arch"]}
                          {tab === 'code' && (lang === 'id' ? 'Script Otomasi' : 'deploy.sh Script')}
                        </button>
                      ))}
                    </div>

                    <div className="project-story-content">
                      {activeTab === 'overview' && (
                        <div>
                          <p className="project-story-heading">{curr["proj-tab-overview"]}:</p>
                          <p>{curr[flagship.overviewKey]}</p>
                        </div>
                      )}
                      {activeTab === 'problem' && (
                        <div>
                          <p className="project-story-heading problem">Challenge / Problem:</p>
                          <p>{curr[flagship.problemKey]}</p>
                        </div>
                      )}
                      {activeTab === 'solution' && (
                        <div>
                          <p className="project-story-heading solution">Solution & Process:</p>
                          <p className="mb-2"><strong>Role:</strong> {curr[flagship.roleKey]}</p>
                          <p>{curr[flagship.solutionKey]}</p>
                        </div>
                      )}
                      {activeTab === 'impact' && (
                        <div>
                          <p className="project-story-heading impact">Result & Impact:</p>
                          <p>{curr[flagship.impactKey]}</p>
                        </div>
                      )}
                      {activeTab === 'architecture' && (
                        <div className="project-architecture-flow">
                          <p className="project-story-heading arch">
                            <i className="fa-solid fa-diagram-project"></i> Multi-Namespace Delivery Flow:
                          </p>
                          <div className="arch-flow-grid">
                            {flagship.architectureFlow?.map((node, i) => (
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
                      {activeTab === 'code' && (
                        <div className="project-code-viewer">
                          <div className="code-viewer-header">
                            <span className="code-viewer-file"><i className="fa-solid fa-terminal"></i> scripts/deploy.sh (GitOps Kustomize Automation)</span>
                            <a href={flagship.repoUrl} target="_blank" rel="noopener noreferrer" className="code-viewer-link">
                              <i className="fa-brands fa-gitlab"></i> Full Repo
                            </a>
                          </div>
                          <pre className="code-viewer-body">
                            <code>{`# 1. Target Multi-Environment Namespace
NAMESPACE="renaldy-imran-cbs-\${ENV}"
kubectl create namespace "\${NAMESPACE}" --dry-run=client -o yaml | kubectl apply -f -

# 2. Vault DB Credential Injection (Production)
if [ "$ENV" = "prod" ] && [ -n "$VAULT_ADDR" ]; then
    VAULT_RESP=$(curl -s --header "X-Vault-Token: \${CURRENT_VAULT_TOKEN}" "\${VAULT_ADDR}/v1/\${VAULT_SECRET_PATH}")
    DB_USER=$(echo "$VAULT_RESP" | jq -r '.data.data.DB_USER')
    DB_PASSWORD=$(echo "$VAULT_RESP" | jq -r '.data.data.DB_PASSWORD')
fi

# 3. Kustomize Image Tag Mutation
cd "$OVERLAY_PATH"
kustomize edit set image "\${APP_NAME}=\${REGISTRY_IMAGE}:\${IMAGE_TAG}"

# 4. Declarative Rollout & Auto Restart
kubectl apply -k "$OVERLAY_PATH"
kubectl rollout restart deployment/"\${APP_NAME}" -n "\${NAMESPACE}"`}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SECONDARY SYSTEMS: PROJECT 1 & 2 */}
          <div className="section-subheading-bar mb-6">
            <h4 className="font-mono text-sm uppercase tracking-wider text-muted">// 02. CORE INFRASTRUCTURE & OBSERVABILITY</h4>
          </div>

          <div className="supporting-systems-grid">
            {projectsList.filter(p => p.id !== 3).map((project) => {
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
                          <span key={index} className="project-tool-tag">{tool}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-showcase-details">
                      <div>
                        <h3 className="project-showcase-title">{curr[project.nameKey]}</h3>
                        <div className="project-story-tabs">
                          {['overview', 'problem', 'solution', 'impact', 'architecture', ...(project.id === 1 ? ['code'] : [])].map((tab) => (
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
                              {tab === 'code' && (lang === 'id' ? 'Pipeline CI' : '.gitlab-ci.yml')}
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
                              <p className="project-story-heading solution">Solution & Process:</p>
                              <p className="mb-2"><strong>Role:</strong> {curr[project.roleKey]}</p>
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
                          {activeTab === 'code' && project.id === 1 && (
                            <div className="project-code-viewer">
                              <div className="code-viewer-header">
                                <span className="code-viewer-file"><i className="fa-solid fa-code"></i> .gitlab-ci.yml (Multi-Stage DevSecOps Pipeline)</span>
                                <span className="code-viewer-lang font-mono text-muted text-xs">YAML</span>
                              </div>
                              <pre className="code-viewer-body">
                                <code>{`stages:
  - test
  - security-scan
  - build-push
  - deploy

# 1. SAST Quality Gate
sonarqube-check:
  stage: security-scan
  image: sonarsource/sonar-scanner-cli:latest
  script:
    - sonar-scanner -Dsonar.projectKey=\${CI_PROJECT_NAME} -Dsonar.qualitygate.wait=true

# 2. Container Image CVE Scan
trivy-scan:
  stage: security-scan
  image: docker:stable
  services: [docker:dind]
  script:
    - docker build -t \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHORT_SHA} .
    - trivy image --exit-code 1 --severity CRITICAL \${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHORT_SHA}

# 3. Secure Push to Harbor
push-image:
  stage: build-push
  script:
    - docker login -u \${HARBOR_USER} -p \${HARBOR_PASSWORD} \${HARBOR_HOST}
    - docker push \${HARBOR_HOST}/cbs/\${APP_NAME}:\${CI_COMMIT_SHORT_SHA}`}</code>
                              </pre>
                            </div>
                          )}
                        </div>

                        <div className="project-action-bar">
                          {project.id === 1 && (
                            <a 
                              href="#simulators" 
                              onClick={(e) => { e.preventDefault(); setActiveSimulatorTab('pipeline'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className="project-action-link"
                            >
                              <i className="fa-solid fa-terminal"></i> {lang === 'id' ? 'Coba Simulator Pipeline' : 'Try Pipeline Simulator'}
                            </a>
                          )}
                          {project.id === 2 && (
                            <a 
                              href="#simulators" 
                              onClick={(e) => { e.preventDefault(); setActiveSimulatorTab('monitoring'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }}
                              className="project-action-link"
                            >
                              <i className="fa-solid fa-chart-line"></i> {lang === 'id' ? 'Coba Simulator Monitoring' : 'Try Monitoring Simulator'}
                            </a>
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

          <div className="career-ledger">
            {experiencesData.map((exp) => (
              <article key={exp.id} className="ledger-entry">
                <div className="ledger-meta-col">
                  <span className="ledger-period">{exp.dateText[lang]}</span>
                  <span className="ledger-duration">{getDurationText(exp, lang)}</span>
                  {exp.type && <span className="ledger-type-pill">{exp.type[lang]}</span>}
                </div>
                <div className="ledger-body-col">
                  <div className="ledger-title-bar">
                    <i className={`ledger-icon ${exp.icon}`}></i>
                    <h3 className="ledger-role-title">{curr[exp.titleKey]}</h3>
                  </div>
                  <div className="ledger-details" dangerouslySetInnerHTML={{ __html: curr[exp.descKey] }} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="reveal">
          <div className="contact-banner">
            <h2>{curr["contact-title"]}</h2>
            <p className="mb-6">{curr["contact-desc"]}</p>

            {/* Terminal CLI Resume Box */}
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
          <div className="footer-status-bar mb-4">
            <span className="dot pulse"></span>
            <span className="font-mono text-xs">GITHUB STATUS: <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">@renmher</a> • ACTIVE PUSHES RECORDED</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Renaldy Imran Hermawan. {curr["footer-rights"]}</p>
        </div>
      </footer>

      <Chatbot lang={lang} />
    </>
  );
};

export default App;
