import { useState, useEffect } from 'react';
import { experiencesData } from '../data/experiences';

// Complete dictionary for CV translation content to ensure self-containment
const CV_DICTIONARY = {
  id: {
    // Header
    summaryTitle: "Ringkasan Profesional",
    experienceTitle: "Pengalaman Kerja",
    projectsTitle: "Proyek Terpilih",
    certificationsTitle: "Sertifikasi",
    skillsTitle: "Keahlian Teknis",
    contactTitle: "Kontak & Tautan",
    
    // Default values
    defaultRole: "DevOps & Cloud Engineer",
    defaultSummary: "Junior DevOps & Cloud Engineer lulusan Sarjana Komputer (S.Kom) dari Universitas Bani Saleh yang berdedikasi tinggi. Memiliki latar belakang kuat dalam administrasi jaringan dan infrastruktur IT dengan fokus utama pada otomatisasi siklus deployment (CI/CD), orkestrasi kontainer (Docker & Kubernetes), serta pengamanan pipeline (DevSecOps). Memiliki rekam jejak dalam merancang pipeline GitLab CI yang aman, mengelola registri kontainer, dan mengonfigurasi pemantauan real-time menggunakan Grafana dan VictoriaMetrics.",

    // Job Titles
    "exp-job1": "Junior DevOps - NashTa Group",
    "exp-job2": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
    "exp-job3": "IT Network Operation Center - PT. ACSA",
    "exp-job4": "Asisten Lab - Universitas Bani Saleh",
    "exp-job5": "Frontend Engineering Program - Ruang Guru",
    "exp-job6": "IT Support - PT Wiraswasta Gemilang Indonesia",

    // Job Descriptions
    "exp-job1-desc": "<ul><li>Membangun dan mengelola pipeline CI/CD menggunakan GitLab CI untuk proses build, testing, dan deployment aplikasi.</li><li>Mendukung keamanan CI/CD, kontainerisasi, dan deployment aplikasi menggunakan SonarQube, Harbor, dan Trivy.</li><li>Melakukan troubleshooting pada server Linux, jaringan, kontainer, dan pipeline deployment.</li><li>Mengelola Grafana, VictoriaLogs, VictoriaMetrics, dan tracing untuk monitoring infrastruktur, analisis log, metrik, alerting, dan penanganan insiden.</li></ul>",
    "exp-job2-desc": "<ul><li>Mengelola workflow tiket sistem menggunakan Jira untuk memastikan respons incident alert kritis secara real-time.</li><li>Mengawal keandalan sistem berbasis cloud melalui monitoring terpadu Amazon CloudWatch 24/7.</li></ul>",
    "exp-job3-desc": "<ul><li>Menerima, menganalisis, dan memberikan solusi untuk masalah terkait kartu Telkomsel.</li><li>Mengidentifikasi, menganalisis, dan menangani insiden layanan yang dilaporkan oleh pelanggan.</li><li>Melakukan monitoring server dan aplikasi Telkomsel secara berkala.</li></ul>",
    "exp-job4-desc": "<ul><li>Membantu dosen dan mahasiswa dalam menggunakan aplikasi dan software laboratorium selama sesi praktikum.</li><li>Menyiapkan, menginstal, dan memastikan aplikasi laboratorium siap digunakan sebelum perkuliahan dimulai.</li><li>Melakukan pemeliharaan sistem, pembaruan software, pencatatan aktivitas, dan dokumentasi lisensi.</li></ul>",
    "exp-job5-desc": "<ul><li>Merancang dan mengembangkan antarmuka web modern yang responsif dan berkinerja tinggi menggunakan React/Vue.</li><li>Menerapkan praktik terbaik dalam UI/UX dan optimalisasi interaksi pengguna.</li></ul>",
    "exp-job6-desc": "<ul><li>Melakukan instalasi, provisioning, dan pemeliharaan infrastruktur IT lokal (LAN/WAN) secara berkala.</li><li>Mendukung kelancaran operasional bisnis harian.</li></ul>",

    // Projects
    "proj1-name": "Secure CI/CD Pipeline Automation",
    "proj1-desc": "Mengembangkan pipeline multi-stage menggunakan GitLab CI (Build, Test, Security-Scan, Push, Deploy). Mengintegrasikan Trivy untuk scanning image, SonarQube untuk analisis kode statis, dan registry Harbor privat. Meningkatkan efisiensi rilis hingga 93% (dari 2 jam menjadi 8 menit).",
    
    "proj2-name": "High-Performance Observability Stack",
    "proj2-desc": "Mendeploy VictoriaMetrics dan Prometheus Node Exporter di seluruh VM. Mengintegrasikan VictoriaLogs untuk pengumpulan log logis, dan mendesain dasbor komprehensif di Grafana dengan alerting otomatis ke Telegram. Menurunkan MTTD insiden dari 45 menit menjadi kurang dari 2 menit.",
    
    "proj3-name": "Multi-Environment GitOps & Centralized CI/CD",
    "proj3-desc": "Membangun sistem deployment berbasis GitOps untuk dua aplikasi web ke kluster Kubernetes menggunakan Kustomize. Mengintegrasikan workflow GitOps untuk sinkronisasi otomatis status repositori Git ke cluster Kubernetes.",

    // Certifications
    "cert-mtcna": "MikroTik Certified Network Associate (MTCNA) - MikroTik (2024)",
    "cert-bnsp-net": "Junior Network Administrator - BNSP (2023)",
    "cert-bnsp-web": "Junior Web Developer - BNSP (2022)",
    "cert-aws": "AWS re/Start Cloud Computing - AWS & Orbit (2025)",
    "cert-ds": "Bootcamp Cloud Engineer - Digital Skola (2023)",
    "cert-rg": "Frontend Engineering - Kampus Merdeka Ruang Guru (2024)"
  },
  en: {
    // Header
    summaryTitle: "Professional Summary",
    experienceTitle: "Work Experience",
    projectsTitle: "Selected Projects",
    certificationsTitle: "Certifications",
    skillsTitle: "Technical Skills",
    contactTitle: "Contact & Links",

    // Default values
    defaultRole: "DevOps & Cloud Engineer",
    defaultSummary: "Highly dedicated Junior DevOps & Cloud Engineer with a Bachelor of Computer Science (S.Kom) from Bani Saleh University. Possesses a strong background in network administration and IT infrastructure, focusing on continuous integration and deployment (CI/CD) pipeline automation, container orchestration (Docker & Kubernetes), and DevSecOps. Proven track record in designing secure GitLab CI pipelines, managing container registries, and configuring real-time observability using Grafana and VictoriaMetrics.",

    // Job Titles
    "exp-job1": "Junior DevOps - NashTa Group",
    "exp-job2": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
    "exp-job3": "IT Network Operation Center - PT. ACSA",
    "exp-job4": "Lab Assistant - Bani Saleh University",
    "exp-job5": "Frontend Engineering Program - Ruang Guru",
    "exp-job6": "IT Support - PT Wiraswasta Gemilang Indonesia",

    // Job Descriptions
    "exp-job1-desc": "<ul><li>Built and managed CI/CD pipelines using GitLab CI for application build, testing, and deployment.</li><li>Supported pipeline security, containerization, and deployment using SonarQube, Harbor, and Trivy.</li><li>Troubleshot Linux servers, local networks, container systems, and deployment pipelines.</li><li>Managed Grafana, VictoriaLogs, VictoriaMetrics, and tracing for infrastructure monitoring, log analysis, metrics, alerting, and incident response.</li></ul>",
    "exp-job2-desc": "<ul><li>Managed system ticketing workflow using Jira to ensure real-time response to critical incident alerts.</li><li>Maintained cloud system reliability through unified monitoring with Amazon CloudWatch 24/7.</li></ul>",
    "exp-job3-desc": "<ul><li>Received, analyzed, and solved issues regarding Telkomsel card services.</li><li>Identified, analyzed, and resolved service incidents reported by customers.</li><li>Conducted regular monitoring on Telkomsel servers and applications.</li></ul>",
    "exp-job4-desc": "<ul><li>Assisted professors and students in utilizing laboratory applications and software during practical sessions.</li><li>Prepared, installed, and ensured laboratory applications were ready before classes started.</li><li>Performed basic troubleshooting and handled system maintenance, updates, and software licensing records.</li></ul>",
    "exp-job5-desc": "<ul><li>Designed and developed modern, responsive, high-performance web interfaces using React/Vue.</li><li>Applied UI/UX best practices and optimized user interactions.</li></ul>",
    "exp-job6-desc": "<ul><li>Installed, provisioned, and maintained local IT infrastructure (LAN/WAN) on a regular basis.</li><li>Supported smooth daily business operations.</li></ul>",

    // Projects
    "proj1-name": "Secure CI/CD Pipeline Automation",
    "proj1-desc": "Developed a multi-stage pipeline using GitLab CI (Build, Test, Security-Scan, Push, Deploy). Integrated Trivy for image vulnerability scanning, SonarQube for static code analysis, and Harbor registry. Reduced deployment cycle time from 2 hours to 8 minutes (93% efficiency).",
    
    "proj2-name": "High-Performance Observability Stack",
    "proj2-desc": "Deployed VictoriaMetrics and Prometheus Node Exporter across VMs. Integrated VictoriaLogs for centralized log aggregation and designed comprehensive dashboards in Grafana with alerting notifications to Telegram. Reduced incident MTTD from 45 minutes to under 2 minutes.",
    
    "proj3-name": "Multi-Environment GitOps & Centralized CI/CD",
    "proj3-desc": "Constructed a GitOps-based deployment workflow for web applications to a Kubernetes cluster using Kustomize. Configured GitOps pipelines to sync Git repository state to the Kubernetes cluster automatically.",

    // Certifications
    "cert-mtcna": "MikroTik Certified Network Associate (MTCNA) - MikroTik (2024)",
    "cert-bnsp-net": "Junior Network Administrator - BNSP (2023)",
    "cert-bnsp-web": "Junior Web Developer - BNSP (2022)",
    "cert-aws": "AWS re/Start Cloud Computing - AWS & Orbit (2025)",
    "cert-ds": "Bootcamp Cloud Engineer - Digital Skola (2023)",
    "cert-rg": "Frontend Engineering - Kampus Merdeka Ruang Guru (2024)"
  }
};

const CVBuilder = () => {
  const [lang, setLang] = useState('en');
  const [selectedJobs, setSelectedJobs] = useState(experiencesData.map(j => j.id));
  const [selectedProjects, setSelectedProjects] = useState([1, 2, 3]);
  const [selectedCerts, setSelectedCerts] = useState(['mtcna', 'bnsp-net', 'bnsp-web', 'aws', 'ds', 'rg']);
  
  const [customRole, setCustomRole] = useState('');
  const [customSummary, setCustomSummary] = useState('');

  // Update default text fields when language changes
  useEffect(() => {
    setCustomRole(CV_DICTIONARY[lang].defaultRole);
    setCustomSummary(CV_DICTIONARY[lang].defaultSummary);
  }, [lang]);

  const dict = CV_DICTIONARY[lang];

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.location.href = window.location.origin + window.location.pathname;
  };

  const getCompanyName = (exp) => {
    if (!exp.company) return '';
    if (typeof exp.company === 'object') {
      return exp.company[lang] || exp.company.en || exp.company.id;
    }
    return exp.company;
  };

  // Toggle helpers
  const toggleJob = (id) => {
    setSelectedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleProject = (id) => {
    setSelectedProjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCert = (id) => {
    setSelectedCerts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Projects list matching App.jsx metadata
  const projects = [
    { id: 1, nameKey: 'proj1-name', descKey: 'proj1-desc', tools: ["GitLab CI", "Docker", "Harbor", "SonarQube", "Trivy"] },
    { id: 2, nameKey: 'proj2-name', descKey: 'proj2-desc', tools: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Telegram API"] },
    { id: 3, nameKey: 'proj3-name', descKey: 'proj3-desc', tools: ["GitLab CI", "Kubernetes", "Kustomize", "GitOps"] }
  ];

  // Certs list matching Certifications.jsx
  const certifications = [
    { id: 'aws', key: 'cert-aws' },
    { id: 'mtcna', key: 'cert-mtcna' },
    { id: 'bnsp-net', key: 'cert-bnsp-net' },
    { id: 'bnsp-web', key: 'cert-bnsp-web' },
    { id: 'ds', key: 'cert-ds' },
    { id: 'rg', key: 'cert-rg' }
  ];

  // Skills sections
  const skillsData = {
    id: [
      { category: "Cloud & Orkestrasi", items: ["GCP", "AWS", "Docker", "Kubernetes", "Kustomize"] },
      { category: "CI/CD & DevSecOps", items: ["GitLab CI", "GitHub Actions", "SonarQube", "Harbor", "Trivy", "Terraform"] },
      { category: "Observabilitas & Monitor", items: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Prometheus"] },
      { category: "Jaringan & OS", items: ["TCP/IP", "DNS/DHCP", "Routing & Switching", "Linux Admin", "Bash Scripting"] }
    ],
    en: [
      { category: "Cloud & Orchestration", items: ["GCP", "AWS", "Docker", "Kubernetes", "Kustomize"] },
      { category: "CI/CD & DevSecOps", items: ["GitLab CI", "GitHub Actions", "SonarQube", "Harbor", "Trivy", "Terraform"] },
      { category: "Observability & Monitor", items: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Prometheus"] },
      { category: "Network & OS", items: ["TCP/IP", "DNS/DHCP", "Routing & Switching", "Linux Admin", "Bash Scripting"] }
    ]
  };

  return (
    <div className="cv-builder-dashboard">
      {/* LEFT PANEL: Controls (Hidden on Print) */}
      <aside className="cv-controls-panel no-print">
        <div className="cv-controls-header">
          <button className="cv-back-btn" onClick={handleBack}>
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Portfolio
          </button>
          <h2>CV Builder & Customizer</h2>
          <p>Saring data dan unduh CV ATS-friendly sesuai kebutuhan melamar kerja Anda.</p>
        </div>

        <div className="cv-control-section">
          <h3>1. Bahasa Dokumen</h3>
          <div className="cv-lang-toggles">
            <button 
              className={`cv-lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
            >
              English
            </button>
            <button 
              className={`cv-lang-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
            >
              Bahasa Indonesia
            </button>
          </div>
        </div>

        <div className="cv-control-section">
          <h3>2. Kustomisasi Profil</h3>
          <div className="cv-input-group">
            <label>Target Jabatan / Role</label>
            <input 
              type="text" 
              value={customRole} 
              onChange={(e) => setCustomRole(e.target.value)} 
              placeholder="Contoh: Senior DevOps Engineer"
            />
          </div>
          <div className="cv-input-group">
            <label>Ringkasan Profil (Summary)</label>
            <textarea 
              rows="6"
              value={customSummary} 
              onChange={(e) => setCustomSummary(e.target.value)} 
              placeholder="Tulis ringkasan singkat profil Anda..."
            />
          </div>
        </div>

        <div className="cv-control-section">
          <h3>3. Pengalaman Kerja</h3>
          <div className="cv-checkbox-list">
            {experiencesData.map(exp => (
              <label key={exp.id} className="cv-checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedJobs.includes(exp.id)}
                  onChange={() => toggleJob(exp.id)}
                />
                <span>{exp.role[lang]} - {getCompanyName(exp)}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="cv-control-section">
          <h3>4. Proyek Pilihan</h3>
          <div className="cv-checkbox-list">
            {projects.map(proj => (
              <label key={proj.id} className="cv-checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedProjects.includes(proj.id)}
                  onChange={() => toggleProject(proj.id)}
                />
                <span>{dict[proj.nameKey]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="cv-control-section">
          <h3>5. Sertifikasi</h3>
          <div className="cv-checkbox-list">
            {certifications.map(cert => (
              <label key={cert.id} className="cv-checkbox-item">
                <input 
                  type="checkbox" 
                  checked={selectedCerts.includes(cert.id)}
                  onChange={() => toggleCert(cert.id)}
                />
                <span>{dict[cert.key]}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="cv-action-area">
          <button className="btn btn-primary cv-print-trigger-btn" onClick={handlePrint}>
            <i className="fa-solid fa-file-pdf"></i> Cetak / Simpan sebagai PDF
          </button>
        </div>
      </aside>

      {/* RIGHT PANEL: Live A4 Printable Preview */}
      <main className="cv-preview-panel">
        <div className="cv-paper-container">
          <div className="cv-paper cv-print-area">
            {/* CV Header */}
            <header className="cv-header">
              <h1>Renaldy Imran Hermawan, S.Kom</h1>
              <p className="cv-role-subtitle">{customRole}</p>
              <div className="cv-contact-row">
                <span>renaldyimran@gmail.com</span>
                <span className="cv-separator">|</span>
                <span>+62 878-7248-1308</span>
                <span className="cv-separator">|</span>
                <span>Bekasi, Indonesia</span>
              </div>
              <div className="cv-links-row">
                <span>linkedin.com/in/renaldyimran</span>
                <span className="cv-separator">|</span>
                <span>github.com/renmher</span>
              </div>
            </header>

            {/* Profile Summary */}
            {customSummary && (
              <section className="cv-section">
                <h2>{dict.summaryTitle}</h2>
                <div className="cv-divider"></div>
                <p className="cv-summary-text">{customSummary}</p>
              </section>
            )}

            {/* Technical Skills */}
            <section className="cv-section">
              <h2>{dict.skillsTitle}</h2>
              <div className="cv-divider"></div>
              <div className="cv-skills-grid">
                {skillsData[lang].map((sect, idx) => (
                  <div key={idx} className="cv-skill-col">
                    <strong>{sect.category}:</strong> {sect.items.join(', ')}
                  </div>
                ))}
              </div>
            </section>

            {/* Work Experience */}
            {selectedJobs.length > 0 && (
              <section className="cv-section">
                <h2>{dict.experienceTitle}</h2>
                <div className="cv-divider"></div>
                <div className="cv-experience-list">
                  {experiencesData
                    .filter(exp => selectedJobs.includes(exp.id))
                    .map(exp => (
                      <article key={exp.id} className="cv-job-item">
                        <div className="cv-job-header">
                          <strong className="cv-job-role">{exp.role[lang]}</strong>
                          <span className="cv-job-date">{exp.dateText[lang]}</span>
                        </div>
                        <div className="cv-job-subheader">
                          <span className="cv-job-company">
                            {getCompanyName(exp)} {exp.type ? `(${exp.type[lang]})` : ''}
                          </span>
                          <span className="cv-job-location">Bekasi, Indonesia</span>
                        </div>
                        <div 
                          className="cv-job-desc" 
                          dangerouslySetInnerHTML={{ __html: dict[exp.descKey] }} 
                        />
                      </article>
                    ))}
                </div>
              </section>
            )}

            {/* Selected Projects */}
            {selectedProjects.length > 0 && (
              <section className="cv-section">
                <h2>{dict.projectsTitle}</h2>
                <div className="cv-divider"></div>
                <div className="cv-projects-list">
                  {projects
                    .filter(proj => selectedProjects.includes(proj.id))
                    .map(proj => (
                      <article key={proj.id} className="cv-proj-item">
                        <div className="cv-proj-header">
                          <strong className="cv-proj-name">{dict[proj.nameKey]}</strong>
                          <span className="cv-proj-tools">{proj.tools.join(', ')}</span>
                        </div>
                        <p className="cv-proj-desc">{dict[proj.descKey]}</p>
                      </article>
                    ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {selectedCerts.length > 0 && (
              <section className="cv-section">
                <h2>{dict.certificationsTitle}</h2>
                <div className="cv-divider"></div>
                <ul className="cv-certs-list">
                  {certifications
                    .filter(c => selectedCerts.includes(c.id))
                    .map(c => (
                      <li key={c.id}>
                        {dict[c.key]}
                      </li>
                    ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CVBuilder;
