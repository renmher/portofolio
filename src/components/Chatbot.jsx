/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { experiencesData, getDurationText } from '../data/experiences';

const buildExperienceText = (targetLang) => {
  const isId = targetLang === 'id';
  const prefix = isId ? "Jejak karir Renaldy:" : "Renaldy's work experience:";
  const items = experiencesData.map(exp => {
    const roleText = exp.role[targetLang];
    const companyName = exp.companyShort || (typeof exp.company === 'object' ? exp.company[targetLang] : exp.company);
    const typeText = exp.type ? ` (${exp.type[targetLang]})` : '';
    const duration = getDurationText(exp, targetLang);
    return `<strong>${roleText}</strong> - ${companyName}${typeText}<br/>&nbsp;&nbsp;📅 ${exp.dateText[targetLang]} • ${duration}<br/>&nbsp;&nbsp;💡 ${exp.chatbotSummary[targetLang]}`;
  }).join('<br/><br/>');
  return `${prefix}<br/><br/>${items}`;
};

const getChatbotData = () => {
  const experienceIdText = buildExperienceText('id');
  const experienceEnText = buildExperienceText('en');

  return {
    id: {
      botName: "RenBot",
      botStatus: "Online",
      inputPlaceholder: "Tanyakan sesuatu tentang Renaldy...",
      welcome: "Halo! Saya <strong>RenBot</strong>, asisten virtual Renaldy Imran Hermawan. Ada yang bisa saya bantu mengenai keahlian, proyek, sertifikasi, atau kontak?",
      quickReplies: [
        { label: "Keahlian", query: "keahlian" },
        { label: "Proyek", query: "proyek" },
        { label: "Sertifikasi", query: "sertifikasi" },
        { label: "Pengalaman", query: "pengalaman" },
        { label: "Kontak", query: "kontak" }
      ],
      responses: {
        greeting: "Halo! Senang menyapa Anda. Silakan tanyakan seputar kualifikasi Renaldy. Contoh: <em>'Apa proyek Renaldy?'</em> atau <em>'Bagaimana cara menghubungi Renaldy?'</em>",
        skills: "Keahlian utama Renaldy meliputi:<br>• <strong>Cloud Platform</strong>: Google Cloud Platform (GCP) & AWS<br>• <strong>Container & Orchestration</strong>: Docker & Kubernetes (Kustomize)<br>• <strong>DevOps & CI/CD</strong>: GitLab CI, GitHub Actions, SonarQube, Harbor, Trivy<br>• <strong>Observability</strong>: Grafana, VictoriaMetrics, VictoriaLogs, Prometheus<br>• <strong>Networking & Linux</strong>: MikroTik (MTCNA Certified), TCP/IP, DNS, Bash Scripting.",
        projects: "Renaldy memiliki 3 proyek utama di portofolio:<br>1. <strong>Secure CI/CD Pipeline Automation</strong>: Multi-stage GitLab CI terintegrasi Trivy & SonarQube (memangkas waktu rilis dari 2 jam ke 8 menit).<br>2. <strong>High-Performance Observability Stack</strong>: Monitoring terpusat Grafana & VictoriaMetrics dengan Telegram alert (menurunkan MTTD sebesar 95%).<br>3. <strong>Multi-Environment GitOps & Centralized CI/CD</strong>: Otomatisasi rilis Kubernetes lintas environment (alpha, beta, prod) berbasis Kustomize & GitLab CI.",
        certifications: "Sertifikasi profesional Renaldy:<br>• <strong>MikroTik Certified Network Associate (MTCNA)</strong> (2024)<br>• <strong>Junior Network Administrator (BNSP)</strong> (2023)<br>• <strong>Junior Web Developer (BNSP)</strong> (2022)<br>• <strong>AWS re/Start Cloud Computing</strong> (2025)<br>• <strong>Bootcamp Cloud Engineer - Digital Skola</strong> (2023)<br>• <strong>Frontend Engineering - Kampus Merdeka Ruang Guru</strong> (2024)<br>• <strong>DevOps Engineer Bootcamp - dibimbing.id</strong> (2026).",
        experience: experienceIdText,
        contact: "Hubungi Renaldy melalui:<br>• Email: <strong>renaldyimran@gmail.com</strong><br>• LinkedIn: <a href='https://linkedin.com/in/renaldyimran' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>linkedin.com/in/renaldyimran</a><br>• GitHub: <a href='https://github.com/renmher' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>github.com/renmher</a><br>• WhatsApp: <a href='https://wa.me/6287872481308' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>+62 878-7248-1308</a>",
        cv: "Anda dapat mengunduh CV terbaru Renaldy:<br>• <a href='/cv-renaldy-id.pdf' download='CV-Renaldy-Imran-Hermawan-ID.pdf' style='color: var(--accent); font-weight:600;'>CV Versi Bahasa Indonesia (PDF)</a><br>• <a href='/cv-renaldy.pdf' download style='color: var(--accent); font-weight:600;'>CV English Version (PDF)</a>",
        fallback: "Maaf, saya belum memahami pertanyaan tersebut. Coba gunakan kata kunci seperti <em>keahlian</em>, <em>proyek</em>, <em>sertifikasi</em>, <em>pengalaman</em>, atau pilih tombol pintas di atas."
      }
    },
    en: {
      botName: "RenBot",
      botStatus: "Online",
      inputPlaceholder: "Ask something about Renaldy...",
      welcome: "Hi! I am <strong>RenBot</strong>, Renaldy Imran Hermawan's virtual assistant. How can I help you explore his skills, projects, certifications, or contact details?",
      quickReplies: [
        { label: "Skills", query: "skills" },
        { label: "Projects", query: "projects" },
        { label: "Certifications", query: "certifications" },
        { label: "Experience", query: "experience" },
        { label: "Contact", query: "contact" }
      ],
      responses: {
        greeting: "Hello! Nice to meet you. Feel free to ask about Renaldy's qualifications, such as <em>'What are Renaldy's projects?'</em> or <em>'How can I contact him?'</em>",
        skills: "Renaldy's core competencies include:<br>• <strong>Cloud Platforms</strong>: Google Cloud Platform (GCP) & AWS<br>• <strong>Container & Orchestration</strong>: Docker & Kubernetes (Kustomize)<br>• <strong>DevOps & CI/CD</strong>: GitLab CI, GitHub Actions, SonarQube, Harbor, Trivy<br>• <strong>Observability</strong>: Grafana, VictoriaMetrics, VictoriaLogs, Prometheus<br>• <strong>Networking & Linux</strong>: MikroTik (MTCNA Certified), TCP/IP, DNS, Bash Scripting.",
        projects: "Renaldy features 3 key projects in his portfolio:<br>1. <strong>Secure CI/CD Pipeline Automation</strong>: Multi-stage GitLab CI with Trivy & SonarQube (reduced release cycle from 2 hours to 8 mins).<br>2. <strong>High-Performance Observability Stack</strong>: Unified Grafana & VictoriaMetrics monitoring with Telegram alerts (95% MTTD reduction).<br>3. <strong>Multi-Environment GitOps & Centralized CI/CD</strong>: Automated Kubernetes deployment across environments (alpha, beta, prod) using Kustomize & GitLab CI.",
        certifications: "Renaldy holds the following verified certifications:<br>• <strong>MikroTik Certified Network Associate (MTCNA)</strong> (2024)<br>• <strong>Junior Network Administrator (BNSP)</strong> (2023)<br>• <strong>Junior Web Developer (BNSP)</strong> (2022)<br>• <strong>AWS re/Start Cloud Computing</strong> (2025)<br>• <strong>Bootcamp Cloud Engineer - Digital Skola</strong> (2023)<br>• <strong>Frontend Engineering - Kampus Merdeka Ruang Guru</strong> (2024)<br>• <strong>DevOps Engineer Bootcamp - dibimbing.id</strong> (2026).",
        experience: experienceEnText,
        contact: "Connect with Renaldy via:<br>• Email: <strong>renaldyimran@gmail.com</strong><br>• LinkedIn: <a href='https://linkedin.com/in/renaldyimran' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>linkedin.com/in/renaldyimran</a><br>• GitHub: <a href='https://github.com/renmher' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>github.com/renmher</a><br>• WhatsApp: <a href='https://wa.me/6287872481308' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:600;'>+62 878-7248-1308</a>",
        cv: "You can download Renaldy's latest CV:<br>• <a href='/cv-renaldy.pdf' download style='color: var(--accent); font-weight:600;'>Download CV (PDF)</a>",
        fallback: "I'm sorry, I didn't quite catch that. Try keywords like <em>skills</em>, <em>projects</em>, <em>certifications</em>, <em>experience</em>, or click the quick-reply buttons above."
      }
    }
  };
};

const CHATBOT_STATIC_DATA = getChatbotData();

const Chatbot = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentData = CHATBOT_STATIC_DATA[lang] || CHATBOT_STATIC_DATA.en;

  useEffect(() => {
    // Set initial greeting
    setMessages([
      { sender: 'bot', text: currentData.welcome }
    ]);
  }, [lang]);

  useEffect(() => {
    // Scroll chat window to bottom on new message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Keyboard accessibility: Close chatbot on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: trimmed }]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const response = generateBotResponse(trimmed);
      setMessages(prev => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 600);
  };

  const generateBotResponse = (query) => {
    const q = query.toLowerCase();
    const res = currentData.responses;

    if (q.includes('hello') || q.includes('hi') || q.includes('halo') || q.includes('hei') || q.includes('siang') || q.includes('pagi') || q.includes('sore') || q.includes('malam') || q.includes('assalamu')) {
      return res.greeting;
    }
    if (q.includes('skill') || q.includes('keahlian') || q.includes('bisa apa') || q.includes('menguasai') || q.includes('kemampuan') || q.includes('stack') || q.includes('teknologi')) {
      return res.skills;
    }
    if (q.includes('proyek') || q.includes('project') || q.includes('portofolio') || q.includes('karya') || q.includes('hasil kerja')) {
      return res.projects;
    }
    if (q.includes('sertif') || q.includes('cert') || q.includes('bukti') || q.includes('lisensi') || q.includes('piagam')) {
      return res.certifications;
    }
    if (q.includes('pengalaman') || q.includes('kerja') || q.includes('karir') || q.includes('history') || q.includes('riwayat') || q.includes('noc') || q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('timeline')) {
      return res.experience;
    }
    if (q.includes('kontak') || q.includes('contact') || q.includes('hubung') || q.includes('email') || q.includes('linkedin') || q.includes('github') || q.includes('sosial') || q.includes('telepon') || q.includes('whatsapp') || q.includes('wa')) {
      return res.contact;
    }
    if (q.includes('cv') || q.includes('resume') || q.includes('unduh') || q.includes('download')) {
      return res.cv;
    }

    return res.fallback;
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle chat">
        {isOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-comments"></i>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="chatbot-avatar">R</div>
            <div className="chatbot-info">
              <h4>{currentData.botName}</h4>
              <span className="status">{currentData.botStatus}</span>
            </div>
          </div>
          <button 
            className="chatbot-close" 
            onClick={() => setIsOpen(false)}
            aria-label={lang === 'id' ? "Tutup chat" : "Close chat"}
          >
            &times;
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble ${msg.sender}`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
          {isTyping && (
            <div className="chat-bubble bot">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-quick-replies">
          {currentData.quickReplies.map((reply, idx) => (
            <button
              key={idx}
              className="quick-reply-btn"
              onClick={() => handleSend(reply.query)}
            >
              {reply.label}
            </button>
          ))}
        </div>

        <div className="chatbot-input-area">
          <input
            type="text"
            placeholder={currentData.inputPlaceholder}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputVal);
            }}
          />
          <button 
            className="chatbot-send" 
            onClick={() => handleSend(inputVal)}
            aria-label={lang === 'id' ? "Kirim pesan" : "Send message"}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
