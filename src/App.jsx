import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState(null);
  const [projectTabs, setProjectTabs] = useState({ 1: 'overview', 2: 'overview', 3: 'overview' });
  const [pipelineState, setPipelineState] = useState({ status: 'idle', stage: 0 });
  const [isPipelineLinked, setIsPipelineLinked] = useState(false);
  const [gitopsDeployedVersion, setGitopsDeployedVersion] = useState(null);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState('pipeline');

  const curr = translations[lang] || translations.id;

  const slideList = [
    { id: 'intro', label: lang === 'id' ? '01. Profil' : '01. Intro', category: '// PERSONA & COMPETENCIES' },
    { id: 'flagship', label: lang === 'id' ? '02. Bank CBS' : '02. Bank CBS', category: '// FLAGSHIP ENTERPRISE CASE STUDY' },
    { id: 'systems', label: lang === 'id' ? '03. Sistem' : '03. Systems', category: '// PRODUCTION CORE SYSTEMS' },
    { id: 'lab', label: lang === 'id' ? '04. Lab K8s' : '04. Cloud Lab', category: '// LIVE DEVOPS WORKBENCH' },
    { id: 'certs', label: lang === 'id' ? '05. Sertifikasi' : '05. Credentials', category: '// VERIFIED QUALIFICATIONS' },
    { id: 'career', label: lang === 'id' ? '06. Karir' : '06. Career & Contact', category: '// CAREER LEDGER & CONNECT' }
  ];

  const goToSlide = (index) => {
    if (index >= 0 && index < slideList.length) {
      setCurrentSlide(index);
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < slideList.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation for slides (Arrow keys & numbers 1-6)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevSlide();
      } else if (e.key >= '1' && e.key <= '6') {
        goToSlide(parseInt(e.key, 10) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch Swipe navigation on mobile
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 60;

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) {
      goToNextSlide();
    } else if (distance < -minSwipeDistance) {
      goToPrevSlide();
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

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'cv-builder') {
    return <CVBuilder />;
  }

  const flagshipProject = projectsList.find(p => p.id === 3);
  const secondaryProjects = projectsList.filter(p => p.id !== 3);

  return (
    <div className="slide-deck-app">
      {/* Top Header & Slide Navigation */}
      <header className="site-header slide-header">
        <div className="header-container">
          <div className="nav-logo" onClick={() => goToSlide(0)} style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-terminal logo-icon"></i>
            <span className="logo-text">Renaldy.dev</span>
          </div>

          <nav className="desktop-nav slide-nav">
            <ul>
              {slideList.map((slide, idx) => (
                <li key={slide.id}>
                  <button 
                    className={`slide-tab-btn ${currentSlide === idx ? 'active' : ''}`}
                    onClick={() => goToSlide(idx)}
                  >
                    {slide.label}
                  </button>
                </li>
              ))}
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
          </div>
        </div>
      </header>

      {/* Main Slide Deck Stage */}
      <main 
        className="slide-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="slide-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* ==============================================================
              SLIDE 0: INTRO & COMPETENCIES
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="container">
              <section id="home" className="hero-slide-section">
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
                    <button onClick={() => goToSlide(1)} className="btn btn-primary">
                      <span>{lang === 'id' ? 'Jelajahi Slide Proyek' : 'Explore Project Slides'}</span> <i className="fa-solid fa-arrow-right"></i>
                    </button>
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

              {/* Profile Narrative & Competency Ledger */}
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

              <div className="skills-tape-container mb-12">
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
                          onClick={() => {
                            setActiveTechFilter(prev => prev === skill.name ? null : skill.name);
                            goToSlide(1); // Jump to projects to see filter effect
                          }}
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
            </div>
          </div>

          {/* ==============================================================
              SLIDE 1: FLAGSHIP CASE STUDY - CORE BANKING SYARIAH
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 1 ? 'active' : ''}`}>
            <div className="container">
              <div className="slide-pane-header mb-8">
                <span className="section-category-tag">{slideList[1].category}</span>
                <h2 className="slide-pane-heading">Core Banking Syariah GitOps & Centralized CI/CD</h2>
                <p className="slide-pane-sub">{curr["proj3-overview"]}</p>
              </div>

              {flagshipProject && (() => {
                const activeTab = projectTabs[flagshipProject.id] || 'overview';
                return (
                  <div className="flagship-case-study">
                    <div className="flagship-badge-bar">
                      <span className="flagship-live-badge">
                        <span className="dot pulse"></span>
                        <span>LIVE INGRESS: portal-admin-prod-renaldy-imran-cbs.apps.k3s.cbu</span>
                      </span>
                      <span className="flagship-tag-pill">K3S • KUSTOMIZE • HASHICORP VAULT</span>
                    </div>

                    <div className="flagship-grid">
                      <div className="flagship-visual-col">
                        <div className="flagship-img-frame">
                          <img src={flagshipProject.image} alt={curr[flagshipProject.nameKey]} />
                        </div>
                        <div className="flagship-tools-list">
                          {flagshipProject.tools.map((t, idx) => (
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
                            href={flagshipProject.repoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                          >
                            <i className="fa-brands fa-gitlab"></i> <span>{lang === 'id' ? 'GitLab Shared Pipeline' : 'GitLab Shared Templates'}</span>
                          </a>
                          <button 
                            onClick={() => goToSlide(3)}
                            className="btn btn-secondary"
                          >
                            <i className="fa-solid fa-cloud"></i> <span>{lang === 'id' ? 'Coba Simulator GitOps' : 'Try GitOps Sim'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="flagship-info-col">
                        <h3 className="flagship-title">{curr[flagshipProject.nameKey]}</h3>
                        <div className="project-story-tabs">
                          {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
                            <button
                              key={tab}
                              className={`project-story-tab-btn ${activeTab === tab ? 'active' : ''}`}
                              onClick={() => handleProjectTabChange(flagshipProject.id, tab)}
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
                              <p>{curr[flagshipProject.overviewKey]}</p>
                            </div>
                          )}
                          {activeTab === 'problem' && (
                            <div>
                              <p className="project-story-heading problem">Challenge / Problem:</p>
                              <p>{curr[flagshipProject.problemKey]}</p>
                            </div>
                          )}
                          {activeTab === 'solution' && (
                            <div>
                              <p className="project-story-heading solution">Solution & Process:</p>
                              <p className="mb-2"><strong>Role:</strong> {curr[flagshipProject.roleKey]}</p>
                              <p>{curr[flagshipProject.solutionKey]}</p>
                            </div>
                          )}
                          {activeTab === 'impact' && (
                            <div>
                              <p className="project-story-heading impact">Result & Impact:</p>
                              <p>{curr[flagshipProject.impactKey]}</p>
                            </div>
                          )}
                          {activeTab === 'architecture' && (
                            <div className="project-architecture-flow">
                              <p className="project-story-heading arch">
                                <i className="fa-solid fa-diagram-project"></i> Multi-Namespace Delivery Flow:
                              </p>
                              <div className="arch-flow-grid">
                                {flagshipProject.architectureFlow?.map((node, i) => (
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
                                <a href={flagshipProject.repoUrl} target="_blank" rel="noopener noreferrer" className="code-viewer-link">
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
            </div>
          </div>

          {/* ==============================================================
              SLIDE 2: SUPPORTING CORE SYSTEMS
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 2 ? 'active' : ''}`}>
            <div className="container">
              <div className="slide-pane-header mb-8">
                <span className="section-category-tag">{slideList[2].category}</span>
                <h2 className="slide-pane-heading">{lang === 'id' ? 'Sistem Infrastruktur & Keamanan' : 'Infrastructure & Security Systems'}</h2>
                <p className="slide-pane-sub">{curr["proj-section-subtitle"]}</p>
              </div>

              <div className="supporting-systems-grid">
                {secondaryProjects.map((project) => {
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
                              {['overview', 'problem', 'solution', 'impact', 'architecture', 'code'].map((tab) => (
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
                                  {tab === 'code' && (project.id === 1 ? (lang === 'id' ? 'Pipeline CI' : '.gitlab-ci.yml') : (lang === 'id' ? 'Alert Rules' : 'alerts.yml'))}
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
                              {activeTab === 'code' && project.id === 2 && (
                                <div className="project-code-viewer">
                                  <div className="code-viewer-header">
                                    <span className="code-viewer-file"><i className="fa-solid fa-bell"></i> alert-rules.yml (VictoriaMetrics & Telegram Alerting)</span>
                                    <span className="code-viewer-lang font-mono text-muted text-xs">PromQL / YAML</span>
                                  </div>
                                  <pre className="code-viewer-body">
                                    <code>{`groups:
  - name: production-infrastructure-alerts
    rules:
      # 1. High CPU Utilization Threshold
      - alert: HostHighCpuLoad
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100) > 85
        for: 2m
        labels:
          severity: critical
          cluster: production-k3s
        annotations:
          summary: "Host CPU load exceeds 85% on {{ $labels.instance }}"
          description: "CPU load is {{ $value | printf '%.1f' }}% for 2m. SRE Auto-mitigation triggered."

      # 2. Host Memory Saturation
      - alert: HostOutOfMemory
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100 < 15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Host out of memory on {{ $labels.instance }}"

      # 3. Microservice Pod CrashLoopBackOff
      - alert: K8sPodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[5m]) * 60 > 2
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Pod {{ $labels.pod }} is in CrashLoopBackOff"

# Dispatch channel: Telegram Bot Webhook -> SRE On-Call Incident Channel`}</code>
                                  </pre>
                                </div>
                              )}
                            </div>

                            <div className="project-action-bar">
                              {project.id === 1 && (
                                <button 
                                  onClick={() => goToSlide(3)}
                                  className="project-action-link"
                                >
                                  <i className="fa-solid fa-terminal"></i> {lang === 'id' ? 'Coba Simulator Pipeline' : 'Try Pipeline Simulator'}
                                </button>
                              )}
                              {project.id === 2 && (
                                <button 
                                  onClick={() => goToSlide(3)}
                                  className="project-action-link"
                                >
                                  <i className="fa-solid fa-chart-line"></i> {lang === 'id' ? 'Coba Simulator Monitoring' : 'Try Monitoring Simulator'}
                                </button>
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
            </div>
          </div>

          {/* ==============================================================
              SLIDE 3: INTERACTIVE CLOUD LAB (WORKBENCH SIMULATORS)
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 3 ? 'active' : ''}`}>
            <div className="container">
              <div className="slide-pane-header mb-8">
                <span className="section-category-tag">{slideList[3].category}</span>
                <h2 className="slide-pane-heading">DevOps Interactive Workbench</h2>
                <p className="slide-pane-sub">
                  {lang === 'id' 
                    ? 'Simulasikan siklus otomatisasi pipeline, deployment GitOps, dan monitoring sistem secara langsung.' 
                    : 'Simulate pipeline automation cycles, GitOps deployments, and system monitoring live.'}
                </p>
              </div>

              <div className="workbench-shell">
                <div className="workbench-header-bar">
                  <div className="workbench-status-left">
                    <span className="dot pulse"></span>
                    <span className="workbench-status-text">ENVIRONMENT: SANDBOX K8S CLUSTER</span>
                  </div>
                  <div className="simulator-tabs">
                    <button 
                      className={`btn btn-sm ${activeSimulatorTab === 'pipeline' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setActiveSimulatorTab('pipeline')}
                    >
                      <i className="fa-solid fa-terminal"></i> 01. CI/CD Pipeline
                    </button>
                    <button 
                      className={`btn btn-sm ${activeSimulatorTab === 'gitops' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setActiveSimulatorTab('gitops')}
                    >
                      <i className="fa-solid fa-cloud"></i> 02. GitOps & K8s
                    </button>
                    <button 
                      className={`btn btn-sm ${activeSimulatorTab === 'monitoring' ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => setActiveSimulatorTab('monitoring')}
                    >
                      <i className="fa-solid fa-chart-line"></i> 03. Observability
                    </button>
                  </div>
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
              </div>
            </div>
          </div>

          {/* ==============================================================
              SLIDE 4: 7 VERIFIED CREDENTIALS
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 4 ? 'active' : ''}`}>
            <div className="container">
              <div className="slide-pane-header mb-8">
                <span className="section-category-tag">{slideList[4].category}</span>
                <h2 className="slide-pane-heading">{lang === 'id' ? 'Sertifikasi Terverifikasi' : 'Verified Certifications'}</h2>
                <p className="slide-pane-sub">7 Kualifikasi profesional resmi dalam DevOps, Jaringan Komputer, Cloud Computing, dan Rekayasa Perangkat Lunak.</p>
              </div>

              <Certifications lang={lang} />
            </div>
          </div>

          {/* ==============================================================
              SLIDE 5: CAREER LEDGER & CONNECT
              ============================================================== */}
          <div className={`slide-pane ${currentSlide === 5 ? 'active' : ''}`}>
            <div className="container">
              <div className="slide-pane-header mb-8">
                <span className="section-category-tag">{slideList[5].category}</span>
                <h2 className="slide-pane-heading">{lang === 'id' ? 'Jejak Karir & Kontak' : 'Career Ledger & Contact'}</h2>
                <p className="slide-pane-sub">Perjalanan profesional dalam dunia teknologi dan saluran komunikasi resmi.</p>
              </div>

              {/* Career Ledger Table */}
              <div className="career-ledger mb-16">
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

              {/* Contact Banner */}
              <div className="contact-banner mb-12">
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

              <footer>
                <div className="footer-content mb-8">
                  <div className="footer-status-bar mb-4">
                    <span className="dot pulse"></span>
                    <span className="font-mono text-xs">GITHUB STATUS: <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">@renmher</a> • ACTIVE PUSHES RECORDED</span>
                  </div>
                  <p>&copy; {new Date().getFullYear()} Renaldy Imran Hermawan. {curr["footer-rights"]}</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Slide Controller Dock */}
      <nav className="slide-dock" aria-label="Slide Deck Navigation">
        <button 
          className="dock-nav-btn" 
          onClick={goToPrevSlide} 
          disabled={currentSlide === 0}
          title="Previous Slide (Arrow Left)"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="dock-btn-text">{lang === 'id' ? 'Sebelumnya' : 'Prev'}</span>
        </button>

        <div className="dock-progress-indicators">
          {slideList.map((slide, idx) => (
            <button
              key={slide.id}
              className={`dock-segment ${currentSlide === idx ? 'active' : ''} ${currentSlide > idx ? 'completed' : ''}`}
              onClick={() => goToSlide(idx)}
              title={slide.label}
              aria-label={`Jump to slide ${idx + 1}: ${slide.label}`}
            >
              <span className="dock-seg-bar"></span>
              <span className="dock-seg-num">{String(idx + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <button 
          className="dock-nav-btn primary" 
          onClick={goToNextSlide} 
          disabled={currentSlide === slideList.length - 1}
          title="Next Slide (Arrow Right)"
        >
          <span className="dock-btn-text">
            {currentSlide < slideList.length - 1 
              ? (lang === 'id' ? 'Lanjut' : 'Next') 
              : (lang === 'id' ? 'Selesai' : 'Finish')}
          </span>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </nav>

      {/* Floating Chatbot */}
      <Chatbot lang={lang} />
    </div>
  );
};

export default App;
