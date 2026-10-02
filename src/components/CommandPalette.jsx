/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useMemo } from 'react';

const CommandPalette = ({
  isOpen,
  onClose,
  lang,
  theme,
  toggleTheme,
  toggleLanguage,
  onNavigate,
  onCopyEmail,
  showToast
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const actions = useMemo(() => [
    {
      id: 'cv-id',
      icon: 'fa-solid fa-file-pdf',
      category: lang === 'id' ? 'Unduhan' : 'Downloads',
      title: lang === 'id' ? 'Download CV - Bahasa Indonesia (ATS)' : 'Download CV - Indonesian ATS',
      action: () => {
        const link = document.createElement('a');
        link.href = '/cv-renaldy-id.pdf';
        link.download = 'CV-Renaldy-Imran-Hermawan-ID.pdf';
        link.click();
        showToast(lang === 'id' ? 'Mengunduh CV Bahasa Indonesia' : 'Downloading Indonesian CV');
        onClose();
      }
    },
    {
      id: 'cv-en',
      icon: 'fa-solid fa-file-pdf',
      category: lang === 'id' ? 'Unduhan' : 'Downloads',
      title: lang === 'id' ? 'Download CV - International English' : 'Download CV - International English',
      action: () => {
        const link = document.createElement('a');
        link.href = '/cv-renaldy.pdf';
        link.download = 'CV-Renaldy-Imran-Hermawan.pdf';
        link.click();
        showToast(lang === 'id' ? 'Mengunduh CV English' : 'Downloading English CV');
        onClose();
      }
    },
    {
      id: 'nav-about',
      icon: 'fa-solid fa-user',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Tentang Saya' : 'Go to Overview / About',
      action: () => {
        onNavigate('about');
        onClose();
      }
    },
    {
      id: 'nav-skills',
      icon: 'fa-solid fa-wrench',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Spesifikasi Keahlian' : 'Go to Tech Specs',
      action: () => {
        onNavigate('skills');
        onClose();
      }
    },
    {
      id: 'nav-portfolio',
      icon: 'fa-solid fa-diagram-project',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Studi Kasus / Proyek' : 'Go to Deployments / Projects',
      action: () => {
        onNavigate('portfolio');
        onClose();
      }
    },
    {
      id: 'nav-simulators',
      icon: 'fa-solid fa-terminal',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Lab Simulator (CI/CD, GitOps, SRE)' : 'Go to Lab Workbench Simulators',
      action: () => {
        onNavigate('simulators');
        onClose();
      }
    },
    {
      id: 'nav-certs',
      icon: 'fa-solid fa-graduation-cap',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Sertifikasi & Pendidikan' : 'Go to Credentials & Certifications',
      action: () => {
        onNavigate('certifications');
        onClose();
      }
    },
    {
      id: 'nav-experience',
      icon: 'fa-solid fa-briefcase',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Pengalaman Karir' : 'Go to Career Trajectory',
      action: () => {
        onNavigate('experience');
        onClose();
      }
    },
    {
      id: 'nav-contact',
      icon: 'fa-solid fa-envelope',
      category: lang === 'id' ? 'Navigasi' : 'Navigation',
      title: lang === 'id' ? 'Lompat ke Kontak' : 'Go to Contact',
      action: () => {
        onNavigate('contact');
        onClose();
      }
    },
    {
      id: 'toggle-theme',
      icon: theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon',
      category: lang === 'id' ? 'Preferensi' : 'Preferences',
      title: theme === 'dark' 
        ? (lang === 'id' ? 'Beralih ke Mode Terang (Light Mode)' : 'Switch to Light Mode')
        : (lang === 'id' ? 'Beralih ke Mode Gelap (Dark Mode)' : 'Switch to Dark Mode'),
      action: () => {
        toggleTheme();
        showToast(theme === 'dark' ? 'Mode Terang Aktif' : 'Mode Gelap Aktif');
        onClose();
      }
    },
    {
      id: 'toggle-lang',
      icon: 'fa-solid fa-language',
      category: lang === 'id' ? 'Preferensi' : 'Preferences',
      title: lang === 'id' ? 'Switch Language to English' : 'Ganti Bahasa ke Indonesia',
      action: () => {
        toggleLanguage();
        showToast(lang === 'id' ? 'Language switched to English' : 'Bahasa diganti ke Indonesia');
        onClose();
      }
    },
    {
      id: 'copy-email',
      icon: 'fa-solid fa-copy',
      category: lang === 'id' ? 'Aksi Cepat' : 'Quick Actions',
      title: lang === 'id' ? 'Salin Alamat Email (renaldyimran@gmail.com)' : 'Copy Email Address (renaldyimran@gmail.com)',
      action: () => {
        onCopyEmail();
        onClose();
      }
    },
    {
      id: 'cv-builder',
      icon: 'fa-solid fa-sliders',
      category: lang === 'id' ? 'Aksi Cepat' : 'Quick Actions',
      title: lang === 'id' ? 'Buka Interactive CV Builder (A4 Live)' : 'Open Interactive CV Builder',
      action: () => {
        window.location.href = '/?mode=cv-builder';
        onClose();
      }
    }
  ], [lang, theme, toggleTheme, toggleLanguage, onNavigate, onCopyEmail, showToast, onClose]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    const lowerQuery = query.toLowerCase();
    return actions.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) || 
      a.category.toLowerCase().includes(lowerQuery)
    );
  }, [actions, query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredActions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredActions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="apple-spotlight-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Spotlight Command Palette">
      <div className="apple-spotlight-modal" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="apple-spotlight-input-bar">
          <i className="fa-solid fa-magnifying-glass apple-spotlight-search-icon"></i>
          <input
            ref={inputRef}
            type="text"
            className="apple-spotlight-input"
            placeholder={lang === 'id' ? 'Ketik perintah atau navigasi (misal: cv, dark, simulator)...' : 'Type a command or search (e.g. cv, dark, simulator)...'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="apple-spotlight-kbd-hint">ESC</span>
        </div>

        {/* Results List */}
        <div className="apple-spotlight-results" ref={listRef}>
          {filteredActions.length === 0 ? (
            <div className="apple-spotlight-empty">
              <span>{lang === 'id' ? 'Tidak ada aksi yang cocok dengan kata kunci.' : 'No matching commands found.'}</span>
            </div>
          ) : (
            filteredActions.map((item, idx) => (
              <div
                key={item.id}
                className={`apple-spotlight-item ${idx === selectedIndex ? 'selected' : ''}`}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="apple-spotlight-item-left">
                  <div className="apple-spotlight-item-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="apple-spotlight-item-details">
                    <span className="apple-spotlight-item-title">{item.title}</span>
                    <span className="apple-spotlight-item-category">{item.category}</span>
                  </div>
                </div>
                <i className="fa-solid fa-arrow-turn-down apple-spotlight-enter-icon"></i>
              </div>
            ))
          )}
        </div>

        {/* Palette Footer Status */}
        <div className="apple-spotlight-footer">
          <div className="apple-spotlight-footer-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> {lang === 'id' ? 'pilih' : 'navigate'}</span>
            <span><kbd>↵</kbd> {lang === 'id' ? 'eksekusi' : 'execute'}</span>
            <span><kbd>ESC</kbd> {lang === 'id' ? 'tutup' : 'close'}</span>
          </div>
          <span className="apple-spotlight-badge">macOS Spotlight</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
