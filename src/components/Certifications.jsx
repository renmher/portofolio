import React, { useState } from 'react';

const Certifications = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const translations = {
    id: {
      title: "Sertifikasi <span class='gradient-text'>Terverifikasi</span>",
      subtitle: "Kualifikasi profesional saya dalam administrasi jaringan dan pengembangan web.",
      tabAll: "Semua",
      tabPro: "Profesional & Nasional",
      tabBoot: "Bootcamp & Intensif",
      btnPreview: "Pratinjau",
      btnVerify: "Verifikasi Kredensial",
      btnDownload: "Unduh",
      project1Title: "MikroTik Certified Network Associate",
      project1Desc: "Sertifikasi MTCNA untuk manajemen jaringan dan administrasi routing MikroTik (2024).",
      project2Title: "Junior Network Administrator",
      project2Desc: "Sertifikasi BNSP dalam administrasi jaringan komputer dan konfigurasi sistem (2023).",
      project3Title: "Junior Web Developer",
      project3Desc: "Sertifikasi BNSP untuk pengembangan aplikasi web dasar dan manajemen database (2022).",
      project4Title: "AWS re/Start Cloud Computing",
      project4Desc: "Program pengembangan karir cloud computing dari AWS & Orbit Future Academy (2025).",
      project5Title: "Bootcamp Cloud Engineer",
      project5Desc: "Program bootcamp intensif Digital Skola fokus pada infrastruktur cloud & devops (2023).",
      project6Title: "Frontend Engineering",
      project6Desc: "Program Kampus Merdeka Ruang Guru untuk pengembangan aplikasi web frontend (2024)."
    },
    en: {
      title: "Verified <span class='gradient-text'>Certifications</span>",
      subtitle: "My professional qualifications in network administration and web development.",
      tabAll: "All",
      tabPro: "Professional & National",
      tabBoot: "Bootcamp & Intensive",
      btnPreview: "Preview",
      btnVerify: "Verify Credentials",
      btnDownload: "Download",
      project1Title: "MikroTik Certified Network Associate",
      project1Desc: "MTCNA certification for MikroTik network management and routing administration (2024).",
      project2Title: "Junior Network Administrator",
      project2Desc: "BNSP certification in computer network administration and system configuration (2023).",
      project3Title: "Junior Web Developer",
      project3Desc: "BNSP certification for basic web application development and database management (2022).",
      project4Title: "AWS re/Start Cloud Computing",
      project4Desc: "AWS Cloud computing career development program & Orbit Future Academy (2025).",
      project5Title: "Bootcamp Cloud Engineer",
      project5Desc: "Intensive Digital Skola bootcamp focused on cloud infrastructure & devops (2023).",
      project6Title: "Frontend Engineering",
      project6Desc: "Kampus Merdeka Ruang Guru program for frontend web development (2024)."
    }
  };

  const currentTranslations = translations[lang];

  const certs = [
    {
      titleId: "project1Title",
      descId: "project1Desc",
      category: "professional",
      badge: "MTCNA",
      image: "/mtcna.png",
      verifyUrl: "/mtcna.pdf",
      downloadUrl: "/mtcna.pdf",
      hasImage: true
    },
    {
      titleId: "project2Title",
      descId: "project2Desc",
      category: "professional",
      badge: "BNSP",
      image: "",
      verifyUrl: "#",
      downloadUrl: "/cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: var(--bg-card); border: 1px solid var(--border); color: var(--text-main); width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px; border-radius: 12px; transition: border-color var(--transition);">
          <i class="fa-solid fa-shield-halved" style="font-size: 3.5rem; color: var(--primary);"></i>
          <span style="font-weight: 700; font-size: 1.3rem; letter-spacing: 1px; font-family: var(--font-heading);">BNSP LSK</span>
          <span style="font-size: 0.75rem; opacity: 0.7; letter-spacing: 0.05em; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    },
    {
      titleId: "project3Title",
      descId: "project3Desc",
      category: "professional",
      badge: "BNSP",
      image: "/sertif.png",
      verifyUrl: "/sertif.pdf",
      downloadUrl: "/sertif.pdf",
      hasImage: true
    },
    {
      titleId: "project4Title",
      descId: "project4Desc",
      category: "bootcamp",
      badge: "AWS",
      image: "",
      verifyUrl: "#",
      downloadUrl: "/cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: var(--bg-card); border: 1px solid var(--border); color: var(--text-main); width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px; border-radius: 12px; transition: border-color var(--transition);">
          <i class="fa-brands fa-aws" style="font-size: 4rem; color: #ff9900;"></i>
          <span style="font-weight: 700; font-size: 1.2rem; font-family: var(--font-heading);">AWS re/Start Cloud</span>
          <span style="font-size: 0.75rem; opacity: 0.7; letter-spacing: 0.05em; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    },
    {
      titleId: "project5Title",
      descId: "project5Desc",
      category: "bootcamp",
      badge: "Digital Skola",
      image: "/digitalskola.jpg",
      verifyUrl: "#",
      downloadUrl: "/digitalskola.jpg",
      hasImage: true
    },
    {
      titleId: "project6Title",
      descId: "project6Desc",
      category: "bootcamp",
      badge: "Frontend",
      image: "",
      verifyUrl: "#",
      downloadUrl: "/cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: var(--bg-card); border: 1px solid var(--border); color: var(--text-main); width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px; border-radius: 12px; transition: border-color var(--transition);">
          <i class="fa-solid fa-code" style="font-size: 3.5rem; color: #ef4444;"></i>
          <span style="font-weight: 700; font-size: 1.2rem; font-family: var(--font-heading);">Ruang Guru Frontend</span>
          <span style="font-size: 0.75rem; opacity: 0.7; letter-spacing: 0.05em; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    }
  ];

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = '';
  };

  const filteredCerts = certs.filter(cert => activeTab === 'all' || cert.category === activeTab);

  return (
    <>
      <section id="certifications" className="reveal">
        <div className="section-title">
          <h2 dangerouslySetInnerHTML={{ __html: currentTranslations.title }} />
          <p>{currentTranslations.subtitle}</p>
        </div>

        <div className="cert-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            {currentTranslations.tabAll}
          </button>
          <button
            className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
            onClick={() => setActiveTab('professional')}
          >
            {currentTranslations.tabPro}
          </button>
          <button
            className={`tab-btn ${activeTab === 'bootcamp' ? 'active' : ''}`}
            onClick={() => setActiveTab('bootcamp')}
          >
            {currentTranslations.tabBoot}
          </button>
        </div>

        <div className="certs-grid grid">
          {filteredCerts.map((cert, idx) => (
            <article
              key={idx}
              className="card project-card cert-card"
              onClick={() => handleOpenModal(cert)}
              style={{ cursor: 'pointer' }}
            >
              {cert.hasImage ? (
                <div className="project-visual">
                  <img src={cert.image} alt={currentTranslations[cert.titleId]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div
                  className="project-visual"
                  dangerouslySetInnerHTML={{ __html: cert.placeholderHtml }}
                  style={{ overflow: 'hidden' }}
                />
              )}
              <div className="project-details">
                <span className="cert-badge">{cert.badge}</span>
                <h3>{currentTranslations[cert.titleId]}</h3>
                <p>{currentTranslations[cert.descId]}</p>
                <button className="btn btn-secondary btn-sm btn-preview" onClick={(e) => { e.stopPropagation(); handleOpenModal(cert); }}>
                  <i className="fa-solid fa-eye"></i> <span>{currentTranslations.btnPreview}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="modal active">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-wrapper">
            <button className="modal-close" onClick={handleCloseModal} aria-label="Close modal">&times;</button>
            <div className="modal-container">
              <div className="modal-preview-area">
                {selectedCert.hasImage ? (
                  <img src={selectedCert.image} alt="Certificate Preview" />
                ) : (
                  <div className="modal-placeholder-preview" dangerouslySetInnerHTML={{ __html: selectedCert.placeholderHtml }} />
                )}
              </div>
              <div className="modal-info-area">
                <span className="modal-badge">{selectedCert.badge}</span>
                <h3 id="modal-title-text">{currentTranslations[selectedCert.titleId]}</h3>
                <p id="modal-desc-text">{currentTranslations[selectedCert.descId]}</p>
                <div className="modal-actions-bar">
                  {selectedCert.verifyUrl !== '#' && (
                    <a href={selectedCert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <i className="fa-solid fa-shield-check"></i> <span>{currentTranslations.btnVerify}</span>
                    </a>
                  )}
                  <a href={selectedCert.downloadUrl} download className="btn btn-secondary btn-sm">
                    <i className="fa-solid fa-download"></i> <span>{currentTranslations.btnDownload}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;
