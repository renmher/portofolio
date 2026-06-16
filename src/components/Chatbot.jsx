/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { experiencesData, getDurationText } from '../data/experiences';

const Chatbot = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Build experience string for ID
  const experienceIdText = "Jejak karir Renaldy:<br/><br/>" + experiencesData.map(exp => {
    const roleText = exp.role.id;
    const companyName = exp.companyShort || (typeof exp.company === 'object' ? exp.company.id : exp.company);
    const typeText = exp.type ? ` (${exp.type.id})` : '';
    const duration = getDurationText(exp, 'id');
    return `${exp.emoji} <strong>${roleText}</strong> di <em>${companyName}${typeText}</em><br/>&nbsp;&nbsp;&nbsp;&nbsp;📅 ${exp.dateText.id} • ${duration}<br/>&nbsp;&nbsp;&nbsp;&nbsp;💬 ${exp.chatbotSummary.id}`;
  }).join('<br/><br/>');

  // Build experience string for EN
  const experienceEnText = "Renaldy's work experience:<br/><br/>" + experiencesData.map(exp => {
    const roleText = exp.role.en;
    const companyName = exp.companyShort || (typeof exp.company === 'object' ? exp.company.en : exp.company);
    const typeText = exp.type ? ` (${exp.type.en})` : '';
    const duration = getDurationText(exp, 'en');
    return `${exp.emoji} <strong>${roleText}</strong> at <em>${companyName}${typeText}</em><br/>&nbsp;&nbsp;&nbsp;&nbsp;📅 ${exp.dateText.en} • ${duration}<br/>&nbsp;&nbsp;&nbsp;&nbsp;💬 ${exp.chatbotSummary.en}`;
  }).join('<br/><br/>');


  const chatbotData = {
    id: {
      botName: "RenBot",
      botStatus: "Online",
      inputPlaceholder: "Tanyakan sesuatu tentang Renaldy...",
      welcome: "Halo! Saya <strong>RenBot</strong>, asisten virtual Renaldy Imran Hermawan. Ada yang bisa saya bantu mengenai keahlian, proyek, sertifikasi, atau kontak Renaldy?",
      quickReplies: [
        { label: "Keahlian Utama", query: "keahlian" },
        { label: "Proyek Utama", query: "proyek" },
        { label: "Sertifikasi", query: "sertifikasi" },
        { label: "Jejak Karir", query: "pengalaman" },
        { label: "Kontak & Sosmed", query: "kontak" }
      ],
      responses: {
        greeting: "Halo! Senang bisa menyapa Anda. Silakan tanyakan hal-hal seputar kualifikasi Renaldy. Contoh: 'Apa proyek Renaldy?' atau 'Bagaimana cara menghubungi Renaldy?'",
        skills: "Renaldy memiliki keahlian di bidang:<br>☁️ <strong>Cloud Computing</strong>: Google Cloud Platform (GCP) & AWS<br>🐋 <strong>Containerization</strong>: Docker & Kubernetes<br>⚙️ <strong>DevOps & CI/CD</strong>: GitLab CI, GitHub Actions, Terraform (IaC)<br>🔌 <strong>Networking</strong>: MikroTik (Certified MTCNA), TCP/IP, DNS, Routing & Switching<br>🐧 <strong>Linux</strong>: OS Administrasi & Bash Scripting.",
        projects: "Renaldy memiliki 2 proyek utama dengan konsep storytelling:<br>🚀 <strong>1. Otomatisasi Pipeline CI/CD Aman</strong>: Membangun pipeline GitLab CI terintegrasi Trivy & SonarQube untuk mengurangi waktu rilis dari 2 jam menjadi 8 menit.<br>📊 <strong>2. Infrastruktur Observabilitas Berkinerja Tinggi</strong>: Implementasi monitoring Grafana & VictoriaMetrics yang berhasil memangkas MTTD insiden hingga 95%.",
        certifications: "Renaldy memiliki beberapa sertifikat keahlian:<br>🏆 <strong>MikroTik Certified Network Associate (MTCNA)</strong> (2024)<br>🛡️ <strong>Junior Network Administrator (BNSP)</strong> (2023)<br>💻 <strong>Junior Web Developer (BNSP)</strong> (2022)<br>☁️ <strong>AWS re/Start Cloud Computing Program</strong> (2025)<br>🚀 <strong>Bootcamp Cloud Engineer - Digital Skola</strong> (2023).",
        experience: experienceIdText,
        contact: "Anda bisa menghubungi Renaldy melalui:<br>📧 Email: <strong>renaldyimran@gmail.com</strong><br>🔗 LinkedIn: <a href='https://linkedin.com/in/renaldyimran' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>linkedin.com/in/renaldyimran</a><br>🐙 GitHub: <a href='https://github.com/renmher' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>github.com/renmher</a><br>🟢 WhatsApp: <a href='https://wa.me/6287872481308' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>wa.me/6287872481308</a>",
        cv: "Tentu! Anda bisa mengunduh CV terbaru Renaldy dalam Bahasa Indonesia dengan klik link berikut: <a href='/cv-renaldy-id.pdf' download='CV-Renaldy-Imran-Hermawan-ID.pdf' class='project-link' style='color: var(--accent); font-weight:700;'>[Unduh CV - Renaldy (Indonesia).pdf]</a> atau versi Inggris di sini: <a href='/cv-renaldy.pdf' download class='project-link' style='color: var(--accent); font-weight:700;'>[Unduh CV - Renaldy (English).pdf]</a>",
        fallback: "Maaf, saya tidak mengerti pertanyaan tersebut. Coba gunakan kata kunci lain seperti <em>keahlian</em>, <em>proyek</em>, <em>sertifikasi</em>, <em>pengalaman</em>, <em>kontak</em>, atau gunakan tombol pintas yang tersedia di atas input chat!"
      }
    },
    en: {
      botName: "RenBot",
      botStatus: "Online",
      inputPlaceholder: "Ask something about Renaldy...",
      welcome: "Hi! I am <strong>RenBot</strong>, Renaldy Imran Hermawan's virtual assistant. How can I help you learn about his skills, projects, certifications, or contact details?",
      quickReplies: [
        { label: "Core Skills", query: "skills" },
        { label: "Main Projects", query: "projects" },
        { label: "Certifications", query: "certifications" },
        { label: "Career Path", query: "experience" },
        { label: "Contact Info", query: "contact" }
      ],
      responses: {
        greeting: "Hello! Nice to meet you. Feel free to ask about Renaldy's qualifications, such as 'What are Renaldy's projects?' or 'How to contact him?'",
        skills: "Renaldy specializes in:<br>☁️ <strong>Cloud Computing</strong>: Google Cloud Platform (GCP) & AWS<br>🐋 <strong>Containerization</strong>: Docker & Kubernetes<br>⚙️ <strong>DevOps & CI/CD</strong>: GitLab CI, GitHub Actions, Terraform (IaC)<br>🔌 <strong>Networking</strong>: MikroTik (Certified MTCNA), TCP/IP, DNS, Routing & Switching<br>🐧 <strong>Linux</strong>: OS Administration & Bash Scripting.",
        projects: "Renaldy has 2 main projects using storytelling:<br>🚀 <strong>1. Secure CI/CD Pipeline Automation</strong>: Built a GitLab CI pipeline integrated with Trivy & SonarQube, reducing release cycles from 2 hours to 8 minutes.<br>📊 <strong>2. High-Performance Observability Stack</strong>: Deployed Grafana & VictoriaMetrics monitoring, reducing incident MTTD by 95%.",
        certifications: "Renaldy holds several verified certifications:<br>🏆 <strong>MikroTik Certified Network Associate (MTCNA)</strong> (2024)<br>🛡️ <strong>Junior Network Administrator (BNSP)</strong> (2023)<br>💻 <strong>Junior Web Developer (BNSP)</strong> (2022)<br>☁️ <strong>AWS re/Start Cloud Computing Program</strong> (2025)<br>🚀 <strong>Bootcamp Cloud Engineer - Digital Skola</strong> (2023).",
        experience: experienceEnText,
        contact: "You can connect with Renaldy via:<br>📧 Email: <strong>renaldyimran@gmail.com</strong><br>🔗 LinkedIn: <a href='https://linkedin.com/in/renaldyimran' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>linkedin.com/in/renaldyimran</a><br>🐙 GitHub: <a href='https://github.com/renmher' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>github.com/renmher</a><br>🟢 WhatsApp: <a href='https://wa.me/6287872481308' target='_blank' rel='noopener noreferrer' style='color: var(--accent); font-weight:700;'>wa.me/6287872481308</a>",
        cv: "Sure! You can download Renaldy's latest CV by clicking the link: <a href='/cv-renaldy.pdf' download class='project-link' style='color: var(--accent); font-weight:700;'>[Download CV - Renaldy.pdf]</a>",
        fallback: "I'm sorry, I didn't quite catch that. Try using key phrases like <em>skills</em>, <em>projects</em>, <em>certifications</em>, <em>experience</em>, <em>contact</em>, or simply click the quick-reply shortcut buttons!"
      }
    }
  };

  const currentData = chatbotData[lang];

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
    }, 800);
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
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>&times;</button>
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
          <button className="chatbot-send" onClick={() => handleSend(inputVal)}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
