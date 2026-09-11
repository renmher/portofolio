import { useState, useEffect } from 'react';
import { experiencesData } from '../data/experiences';
import { translations } from '../data/translations';

const cvProjects = [
  { id: 1, nameKey: 'proj1-name', descKey: 'cv-proj1-desc', tools: ["GitLab CI", "Docker", "Harbor", "SonarQube", "Trivy"] },
  { id: 2, nameKey: 'proj2-name', descKey: 'cv-proj2-desc', tools: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Telegram API"] },
  { id: 3, nameKey: 'proj3-name', descKey: 'cv-proj3-desc', tools: ["GitLab CI", "Kubernetes", "Kustomize", "GitOps"] }
];

const cvCertifications = [
  { id: 'aws', key: 'cert-aws' },
  { id: 'mtcna', key: 'cert-mtcna' },
  { id: 'bnsp-net', key: 'cert-bnsp-net' },
  { id: 'bnsp-web', key: 'cert-bnsp-web' },
  { id: 'ds', key: 'cert-ds' },
  { id: 'rg', key: 'cert-rg' }
];

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

const CVBuilder = () => {
  const [lang, setLang] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get('lang');
    if (queryLang === 'id' || queryLang === 'en') {
      return queryLang;
    }
    return localStorage.getItem('lang') || 'en';
  });
  const [selectedJobs, setSelectedJobs] = useState(experiencesData.map(j => j.id));
  const [selectedProjects, setSelectedProjects] = useState([1, 2, 3]);
  const [selectedCerts, setSelectedCerts] = useState(['mtcna', 'bnsp-net', 'bnsp-web', 'aws', 'ds', 'rg']);

  const [customRole, setCustomRole] = useState('');
  const [customSummary, setCustomSummary] = useState('');

  const dict = translations[lang] || translations.en;

  // Update default text fields when language changes
  useEffect(() => {
    setCustomRole(dict['cv-default-role']);
    setCustomSummary(dict['cv-default-summary']);
    localStorage.setItem('lang', lang);
  }, [lang, dict]);

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

  const toggleJob = (id) => {
    setSelectedJobs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleProject = (id) => {
    setSelectedProjects(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCert = (id) => {
    setSelectedCerts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
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
            {cvProjects.map(proj => (
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
            {cvCertifications.map(cert => (
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
                <a href="mailto:renaldyimran@gmail.com">renaldyimran@gmail.com</a>
                <span className="cv-separator">|</span>
                <span>+62 878-7248-1308</span>
                <span className="cv-separator">|</span>
                <span>Bekasi, Indonesia</span>
              </div>
              <div className="cv-links-row">
                <a href="https://linkedin.com/in/renaldyimran" target="_blank" rel="noopener noreferrer">linkedin.com</a>
                <span className="cv-separator">|</span>
                <a href="https://github.com/renmher" target="_blank" rel="noopener noreferrer">github.com</a>
              </div>
            </header>

            {/* Profile Summary */}
            {customSummary && (
              <section className="cv-section">
                <h2>{dict['cv-summary-title']}</h2>
                <div className="cv-divider"></div>
                <p className="cv-summary-text">{customSummary}</p>
              </section>
            )}

            {/* Technical Skills */}
            <section className="cv-section">
              <h2>{dict['cv-skills-title']}</h2>
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
                <h2>{dict['cv-experience-title']}</h2>
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
                <h2>{dict['cv-projects-title']}</h2>
                <div className="cv-divider"></div>
                <div className="cv-projects-list">
                  {cvProjects
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
                <h2>{dict['cv-certifications-title']}</h2>
                <div className="cv-divider"></div>
                <ul className="cv-certs-list">
                  {cvCertifications
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
