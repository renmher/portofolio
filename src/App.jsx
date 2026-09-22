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

// Typing effect ala mfaqih590.github.io / typed.js
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
  const [projectTabs, setProjectTabs] = useState({ 1: 'overview', 2: 'overview', 3: 'overview' });
  const [pipelineState, setPipelineState] = useState({ status: 'idle', stage: 0 });
  const [isPipelineLinked, setIsPipelineLinked] = useState(false);
  const [gitopsDeployedVersion, setGitopsDeployedVersion] = useState(null);
  const [activeSimulatorTab, setActiveSimulatorTab] = useState('pipeline');
  const [curlCopied, setCurlCopied] = useState(false);
  const [activeTechFilter, setActiveTechFilter] = useState(null);
  const [activeProjectSlide, setActiveProjectSlide] = useState(0);

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

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Top Utility Contact Bar ala mfaqih590.github.io */}
      <div className="top-utility-bar">
        <div className="container top-utility-container">
          <div className="top-utility-left">
            <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" className="utility-item">
              <i className="fa-solid fa-phone"></i>
              <span>+62 878-7248-1308</span>
            </a>
            <a href="mailto:renaldyimran@gmail.com" className="utility-item">
              <i className="fa-solid fa-envelope"></i>
              <span>renaldyimran@gmail.com</span>
            </a>
            <span className="utility-item location">
              <i className="fa-solid fa-location-dot"></i>
              <span>Bekasi, Indonesia</span>
            </span>
          </div>

          <div className="top-utility-right">
            <div className="utility-socials">
              <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://wa.me/6287872481308" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Main Navbar */}
      <header className="site-header">
        <div className="header-container">
          <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
            <i className="fa-solid fa-terminal logo-icon"></i>
            <span className="logo-text">Renaldy Imran</span>
          </a>

          <nav className="desktop-nav">
            <ul>
              <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>{lang === 'id' ? 'BERANDA' : 'HOME'}</a></li>
              <li><a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>{lang === 'id' ? 'PENGALAMAN' : 'EXPERIENCE'}</a></li>
              <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>{lang === 'id' ? 'KEMAMPUAN' : 'SKILLS'}</a></li>
              <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>{lang === 'id' ? 'PROJECT' : 'PROJECTS'}</a></li>
              <li><a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>{lang === 'id' ? 'PENDIDIKAN & SERTIFIKAT' : 'EDUCATION & CERTS'}</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>{lang === 'id' ? 'KONTAK' : 'CONTACT'}</a></li>
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

      {/* Mobile Navigation Bar */}
      <nav className="mobile-nav">
        <ul>
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={activeSection === 'home' ? 'active' : ''}>
              <i className="fa-solid fa-house"></i>
              <span>{lang === 'id' ? 'Beranda' : 'Home'}</span>
            </a>
          </li>
          <li>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')} className={activeSection === 'experience' ? 'active' : ''}>
              <i className="fa-solid fa-briefcase"></i>
              <span>{lang === 'id' ? 'Karir' : 'Exp'}</span>
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')} className={activeSection === 'skills' ? 'active' : ''}>
              <i className="fa-solid fa-wrench"></i>
              <span>{lang === 'id' ? 'Skill' : 'Skills'}</span>
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className={activeSection === 'projects' ? 'active' : ''}>
              <i className="fa-solid fa-diagram-project"></i>
              <span>{lang === 'id' ? 'Proyek' : 'Proj'}</span>
            </a>
          </li>
          <li>
            <a href="#certifications" onClick={(e) => handleNavClick(e, 'certifications')} className={activeSection === 'certifications' ? 'active' : ''}>
              <i className="fa-solid fa-certificate"></i>
              <span>{lang === 'id' ? 'Sertif' : 'Certs'}</span>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={activeSection === 'contact' ? 'active' : ''}>
              <i className="fa-solid fa-envelope"></i>
              <span>{lang === 'id' ? 'Kontak' : 'Contact'}</span>
            </a>
          </li>
        </ul>
      </nav>

      <main className="container">
        {/* ==============================================================
            SECTION 1: BERANDA / HOME (HERO DENGAN TYPING EFFECT)
            ============================================================== */}
        <section id="home" className="hero reveal active">
          <div className="hero-content">
            <div className="open-to-work-badge">
              <span className="dot pulse"></span>
              <span>renmher@k8s-prod:~$ cluster status --healthy (14ms)</span>
            </div>
            
            <h1 className="hero-title">
              RENALDY IMRAN <span className="text-highlight">HERMAWAN</span>, S.Kom
            </h1>

            {/* Typing text animation ala typed.js di mfaqih590 */}
            <div className="typing-text-wrapper">
              <span className="typing-prompt">&gt; </span>
              <span className="typing-content">{displayText}</span>
              <span className="typing-cursor">|</span>
            </div>
            
            <p className="hero-desc">{curr["hero-desc"]}</p>
            
            <div className="hero-meta">
              <span><i className="fa-solid fa-map-pin"></i> {curr["hero-location"]}</span>
              <span className="separator">•</span>
              <span><i className="fa-solid fa-briefcase"></i> {lang === 'id' ? 'Tersedia untuk DevOps / Cloud Roles' : 'Available for DevOps / Cloud Roles'}</span>
            </div>
            
            <div className="hero-buttons">
              <a 
                href={lang === 'id' ? "/cv-renaldy-id.pdf" : "/cv-renaldy.pdf"} 
                download={lang === 'id' ? "CV-Renaldy-Imran-Hermawan-ID.pdf" : "CV-Renaldy-Imran-Hermawan.pdf"} 
                className="btn btn-primary"
              >
                <i className="fa-solid fa-file-arrow-down"></i> <span>DOWNLOAD CV</span>
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="btn btn-secondary">
                <i className="fa-solid fa-paper-plane"></i> <span>{lang === 'id' ? 'HUBUNGI SAYA' : 'CONTACT ME'}</span>
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
              <div className="frame-meta-tag">BEKASI, INDONESIA</div>
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

        {/* ==============================================================
            SECTION 2: PENGALAMAN KERJA / WORK EXPERIENCE
            ============================================================== */}
        <section id="experience" className="reveal">
          <div className="section-title">
            <span className="section-category-tag">{"// RIWAYAT KARIR PROFESIONAL"}</span>
            <h2 dangerouslySetInnerHTML={{ __html: curr["exp-title"] }} />
            <p>{curr["exp-subtitle"]}</p>
          </div>

          <div className="career-ledger mb-8">
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

        {/* ==============================================================
            SECTION 3: KEMAMPUAN / TECHNICAL SKILLS
            ============================================================== */}
        <section id="skills" className="reveal">
          <div className="section-title">
            <span className="section-category-tag">{"// KOMPETENSI TEKNIS & TOOLS"}</span>
            <h2 dangerouslySetInnerHTML={{ __html: curr["skills-title"] }} />
            <p>{curr["skills-subtitle"]}</p>
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

          {/* Interactive Verified Tech Stack Filter */}
          <div className="skills-tape-container mb-8">
            <div className="skills-tape-header mb-4">
              <h4 className="font-mono text-sm uppercase tracking-wider text-muted">{"// VERIFIED TECH STACK (KLIK UNTUK FILTER)"}</h4>
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

        {/* ==============================================================
            SECTION 4: PENGALAMAN PROJECT / PROJECTS SHOWCASE
            ============================================================== */}
        <section id="projects" className="reveal">
          <div className="section-title">
            <span className="section-category-tag">{"// PORTOFOLIO PROYEK REKAYASA SISTEM"}</span>
            <h2 dangerouslySetInnerHTML={{ __html: curr["proj-section-title"] }} />
            <p>{curr["proj-section-subtitle"]}</p>
          </div>

          {/* INTERACTIVE PROJECT SHOWCASE SLIDER */}
          <div className="project-slider-wrapper mb-16">
            {/* Slider Header Controls */}
            <div className="project-slider-nav-bar mb-6">
              <div className="slider-nav-left">
                <span className="slider-counter-badge">
                  <span className="slider-counter-current">0{activeProjectSlide + 1}</span>
                  <span className="slider-counter-divider">/</span>
                  <span className="slider-counter-total">0{orderedProjects.length}</span>
                </span>
                <span className="slider-project-category">
                  {activeProjectSlide === 0 && (lang === 'id' ? '// 01. KARYA UNGGULAN GITOPS (BANK CBS)' : '// 01. FLAGSHIP GITOPS (BANK CBS)')}
                  {activeProjectSlide === 1 && (lang === 'id' ? '// 02. PIPELINE CI & DEVSECOPS' : '// 02. SECURE CI/CD & DEVSECOPS')}
                  {activeProjectSlide === 2 && (lang === 'id' ? '// 03. SRE OBSERVABILITY & ALARM' : '// 03. SRE OBSERVABILITY & ALERTS')}
                </span>
              </div>

              <div className="slider-nav-controls">
                <div className="slider-pagination-pills">
                  {orderedProjects.map((p, idx) => (
                    <button
                      key={p.id}
                      className={`slider-pill-dot ${activeProjectSlide === idx ? 'active' : ''}`}
                      onClick={() => setActiveProjectSlide(idx)}
                      title={`Slide to ${curr[p.nameKey]}`}
                    >
                      <span>0{idx + 1}</span>
                    </button>
                  ))}
                </div>

                <div className="slider-arrow-btns">
                  <button
                    className="btn-slider-arrow"
                    onClick={() => setActiveProjectSlide(prev => prev > 0 ? prev - 1 : orderedProjects.length - 1)}
                    title="Previous Project (Slide Left)"
                    aria-label="Previous Project"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <button
                    className="btn-slider-arrow"
                    onClick={() => setActiveProjectSlide(prev => prev < orderedProjects.length - 1 ? prev + 1 : 0)}
                    title="Next Project (Slide Right)"
                    aria-label="Next Project"
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Stage & Moving Track */}
            <div 
              className="project-slider-stage"
              onTouchStart={onProjectTouchStart}
              onTouchMove={onProjectTouchMove}
              onTouchEnd={onProjectTouchEnd}
            >
              <div 
                className="project-slider-track"
                style={{ transform: `translateX(-${activeProjectSlide * 100}%)` }}
              >
                {orderedProjects.map((project) => {
                  const activeTab = projectTabs[project.id] || 'overview';
                  const isFlagship = project.id === 3;
                  return (
                    <div key={project.id} className="project-slide-item">
                      <article className="card project-showcase-card flagship-slider-card">
                        {isFlagship && (
                          <div className="flagship-badge-bar">
                            <span className="flagship-live-badge">
                              <span className="dot pulse"></span>
                              <span>STATUS: KUBERNETES K3S DEPLOYED</span>
                            </span>
                            <span className="flagship-tag-pill">FLAGSHIP CASE STUDY</span>
                          </div>
                        )}

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
                            <div className="project-action-bar">
                              {project.id === 3 && (
                                <>
                                  <a 
                                    href="/projects/cbs-presentation.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                  >
                                    <i className="fa-solid fa-file-pdf"></i> <span>{lang === 'id' ? 'Buka Slide Presentasi (PDF)' : 'View Slide Deck (PDF)'}</span>
                                  </a>
                                  <a 
                                    href={project.repoUrl} 
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
                                </>
                              )}
                              {project.id === 1 && (
                                <>
                                  <a 
                                    href="#simulators" 
                                    onClick={(e) => { e.preventDefault(); setActiveSimulatorTab('pipeline'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="btn btn-secondary"
                                  >
                                    <i className="fa-solid fa-terminal"></i> {lang === 'id' ? 'Coba Simulator Pipeline' : 'Try Pipeline Simulator'}
                                  </a>
                                  {project.repoUrl && (
                                    <a 
                                      href={project.repoUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="btn btn-secondary repo-link"
                                    >
                                      <i className="fa-brands fa-github"></i> {curr["btn-view-repo"]}
                                    </a>
                                  )}
                                </>
                              )}
                              {project.id === 2 && (
                                <>
                                  <a 
                                    href="#simulators" 
                                    onClick={(e) => { e.preventDefault(); setActiveSimulatorTab('monitoring'); document.getElementById('simulators')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="btn btn-secondary"
                                  >
                                    <i className="fa-solid fa-chart-line"></i> {lang === 'id' ? 'Coba Simulator Monitoring' : 'Try Monitoring Simulator'}
                                  </a>
                                  {project.repoUrl && (
                                    <a 
                                      href={project.repoUrl} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="btn btn-secondary repo-link"
                                    >
                                      <i className="fa-brands fa-github"></i> {curr["btn-view-repo"]}
                                    </a>
                                  )}
                                </>
                              )}
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
                                    {tab === 'code' && (project.id === 3 ? (lang === 'id' ? 'Script Otomasi' : 'deploy.sh Script') : project.id === 1 ? (lang === 'id' ? 'Pipeline CI' : '.gitlab-ci.yml') : (lang === 'id' ? 'Alert Rules' : 'alerts.yml'))}
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
                                      <i className="fa-solid fa-diagram-project"></i> Multi-Namespace Delivery Flow:
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
                                {activeTab === 'code' && project.id === 3 && (
                                  <div className="project-code-viewer">
                                    <div className="code-viewer-header">
                                      <span className="code-viewer-file"><i className="fa-solid fa-terminal"></i> scripts/deploy.sh (GitOps Kustomize Automation)</span>
                                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="code-viewer-link">
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
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Cloud Workbench Simulators */}
          <div id="simulators" className="workbench-section mb-12">
            <div className="section-title">
              <span className="section-category-tag">{"// SIMULATOR LAB K8S & CLUSTER"}</span>
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
          </div>
        </section>

        {/* ==============================================================
            SECTION 5: PENDIDIKAN & SERTIFIKASI
            ============================================================== */}
        <section id="certifications" className="reveal">
          <div className="section-title">
            <span className="section-category-tag">{"// AKADEMIS & SERTIFIKASI PROFESIONAL"}</span>
            <h2 dangerouslySetInnerHTML={{ __html: curr["about-edu-title"] }} />
            <p>{curr["about-edu-desc"]}</p>
          </div>

          {/* Education Card */}
          <div className="card education-card mb-12">
            <div className="education-card-inner">
              <div className="edu-icon-col">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="edu-info-col">
                <span className="edu-badge">SARJANA KOMPUTER (S.KOM)</span>
                <h3 className="edu-title">Universitas Bani Saleh — Teknik Informatika</h3>
                <p className="edu-desc text-muted">
                  {lang === 'id' 
                    ? 'Fokus pada Arsitektur Jaringan, Infrastruktur Cloud, dan Rekayasa Sistem Perangkat Lunak. Lulus tahun 2024.'
                    : 'Specialized in Network Architecture, Cloud Infrastructure, and Software Engineering. Graduated in 2024.'}
                </p>
                <div className="edu-meta-tags">
                  <span><i className="fa-solid fa-calendar"></i> 2020 - 2024</span>
                  <span><i className="fa-solid fa-location-dot"></i> Bekasi, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* 7 Verified Certifications Component */}
          <Certifications lang={lang} />
        </section>

        {/* ==============================================================
            SECTION 6: KONTAK / CONTACT
            ============================================================== */}
        <section id="contact" className="reveal">
          <div className="contact-banner">
            <span className="section-category-tag mb-3 d-inline-block">{"// TERHUBUNG DENGAN SAYA"}</span>
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

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-status-bar mb-4">
            <span className="dot pulse"></span>
            <span className="font-mono text-xs">GITHUB STATUS: <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">@renmher</a> • ACTIVE PUSHES RECORDED</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Renaldy Imran Hermawan. {curr["footer-rights"]}</p>
        </div>
      </footer>

      {/* Floating Chatbot RenBot */}
      <Chatbot lang={lang} />
    </>
  );
};

export default App;
