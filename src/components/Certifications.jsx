/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const certTranslations = {
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
    project6Desc: "Program Kampus Merdeka Ruang Guru untuk pengembangan aplikasi web frontend (2024).",
    project7Title: "DevOps Engineer Bootcamp",
    project7Desc: "Program bootcamp intensif dibimbing.id (12 April - 16 Agustus 2026)."
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
    project6Desc: "Kampus Merdeka Ruang Guru program for frontend web development (2024).",
    project7Title: "DevOps Engineer Bootcamp",
    project7Desc: "Intensive dibimbing.id bootcamp program (April 12 - August 16, 2026)."
  }
};

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
    placeholder: {
      icon: "fa-solid fa-shield-halved",
      iconColor: "var(--primary)",
      title: "BNSP LSK",
      subtitle: "Credential Verified"
    }
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
    placeholder: {
      icon: "fa-brands fa-aws",
      iconColor: "#ff9900",
      title: "AWS re/Start Cloud",
      subtitle: "Credential Verified"
    }
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
    placeholder: {
      icon: "fa-solid fa-code",
      iconColor: "#ef4444",
      title: "Ruang Guru Frontend",
      subtitle: "Credential Verified"
    }
  },
  {
    titleId: "project7Title",
    descId: "project7Desc",
    category: "bootcamp",
    badge: "dibimbing.id",
    image: "/sertif-dibimbing.png",
    verifyUrl: "https://dibimbing.id/certificate-validation?cn=201029DO01082316",
    downloadUrl: "/sertif-dibimbing.pdf",
    hasImage: true
  }
];

const CertPlaceholder = ({ placeholder }) => {
  if (!placeholder) return null;
  return (
    <div className="cert-placeholder-box">
      <i className={placeholder.icon} style={{ color: placeholder.iconColor }}></i>
      <span className="cert-placeholder-title">{placeholder.title}</span>
      <span className="cert-placeholder-subtitle">{placeholder.subtitle}</span>
    </div>
  );
};

const Certifications = ({ lang }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const currentTranslations = certTranslations[lang] || certTranslations.en;

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
    document.body.style.overflow = '';
  };

  // Keyboard accessibility: Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCert) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  const filteredCerts = certs.filter(cert => activeTab === 'all' || cert.category === activeTab);

  return (
    <>
      <div className="certifications-block">
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

        {filteredCerts.length === 0 ? (
          <div className="card text-center" style={{ padding: '40px 20px', margin: '20px auto', maxWidth: '480px' }}>
            <i className="fa-solid fa-folder-open text-muted" style={{ fontSize: '2rem', marginBottom: '12px' }}></i>
            <h4 style={{ marginBottom: '6px' }}>
              {lang === 'id' ? 'Tidak ada sertifikasi pada kategori ini' : 'No certifications in this category'}
            </h4>
            <p className="text-muted" style={{ fontSize: '0.88rem' }}>
              {lang === 'id' ? 'Silakan pilih tab kategori lain.' : 'Please select another category tab.'}
            </p>
          </div>
        ) : (
          <div className="certs-grid grid">
            {filteredCerts.map((cert, idx) => (
              <article
                key={idx}
                className="card project-card cert-card"
                onClick={() => handleOpenModal(cert)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal(cert);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${currentTranslations[cert.titleId]} - ${currentTranslations.btnPreview}`}
                style={{ cursor: 'pointer' }}
              >
                {cert.hasImage ? (
                  <div className="project-visual">
                    <img src={cert.image} alt={currentTranslations[cert.titleId]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div className="project-visual" style={{ overflow: 'hidden' }}>
                    <CertPlaceholder placeholder={cert.placeholder} />
                  </div>
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
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="modal active" role="dialog" aria-modal="true" aria-labelledby="modal-title-text">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-wrapper">
            <button className="modal-close" onClick={handleCloseModal} aria-label="Close modal">&times;</button>
            <div className="modal-container">
              <div className="modal-preview-area">
                {selectedCert.hasImage ? (
                  <img src={selectedCert.image} alt="Certificate Preview" />
                ) : (
                  <div className="modal-placeholder-preview">
                    <CertPlaceholder placeholder={selectedCert.placeholder} />
                  </div>
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
