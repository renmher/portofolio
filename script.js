document.addEventListener('DOMContentLoaded', () => {
  // --- Translations Data ---
  const translations = {
    id: {
      "nav-home": "Beranda",
      "nav-about": "Tentang",
      "nav-projects": "Sertifikasi",
      "nav-experience": "Pengalaman",
      "nav-contact": "Hubungi",
      "hero-eyebrow": "Cloud Engineer & IT Specialist",
      "hero-title": "Membangun <span class='gradient-text'>Infrastruktur Digital</span> yang Tangguh.",
      "hero-desc": "Saya adalah lulusan Sarjana Teknik Informatika dari universitas bani saleh bekasi dengan pengalaman di bidang IT Network Operation Center dan Cloud Engineer, berpengalaman melalui program intensif seperti AWS Re/Start dan Bootcamp cloud digitalskola. Menguasai Linux, dasar jaringan, Google Cloud Platform, AWS Serta Docker. Mampu bekerja cepat, teliti, dan kolaboratif dalam menyelesaikan masalah teknis serta meningkatkan efisiensi sistem.",
      "btn-projects": "Lihat Sertifikat",
      "btn-cv": "Download CV",
      "btn-about": "Tentang Saya",
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Tahun Kelulusan",
      "stat-projects": "Sertifikasi Keahlian",
      "about-title": "Tentang <span class='gradient-text'>Saya</span>",
      "about-subtitle": "Pakar IT yang fokus pada stabilitas jaringan dan skalabilitas cloud.",
      "about-card1-title": "Monitor Infrastruktur (Live)",
      "about-card1-desc": "Pakar infrastruktur IT dengan spesialisasi pada ekosistem Cloud dan stabilitas jaringan. Berpengalaman dalam menavigasi tantangan teknis kompleks melalui pendekatan yang terukur, adaptif, dan berorientasi pada hasil.",
      "about-cv-title": "Review CV Terbaru",
      "about-cv-desc": "Lihat detail kualifikasi dan pengalaman saya lebih mendalam melalui dokumen CV yang sudah di-update.",
      "btn-view-cv": "Buka CV",
      "about-card2-title": "Keahlian Utama",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "projects-title": "Sertifikasi <span class='gradient-text'>Terverifikasi</span>",
      "projects-subtitle": "Kualifikasi profesional saya dalam administrasi jaringan dan pengembangan web.",
      "tab-all": "Semua",
      "tab-pro": "Profesional & Nasional",
      "tab-boot": "Bootcamp & Intensif",
      "btn-preview": "Pratinjau",
      "btn-verify": "Verifikasi Kredensial",
      "btn-download": "Unduh",
      "telemetry-ping-title": "Uji Latensi Cloud",
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "Sertifikasi MTCNA untuk manajemen jaringan dan administrasi routing MikroTik (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "Sertifikasi BNSP dalam administrasi jaringan komputer dan konfigurasi sistem (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "Sertifikasi BNSP untuk pengembangan aplikasi web dasar dan manajemen database (2022).",
      "project4-title": "AWS re/Start Cloud Computing",
      "project4-desc": "Program pengembangan karir cloud computing dari AWS & Orbit Future Academy (2025).",
      "project5-title": "Bootcamp Cloud Engineer",
      "project5-desc": "Program bootcamp intensif Digital Skola fokus pada infrastruktur cloud & devops (2023).",
      "project6-title": "Frontend Engineering",
      "project6-desc": "Program Kampus Merdeka Ruang Guru untuk pengembangan aplikasi web frontend (2024).",
      "exp-title": "Jejak <span class='gradient-text'>Karir</span>",
      "exp-subtitle": "Perjalanan profesional saya sebagai Cloud Engineer dan IT Specialist.",
      "exp-present": "Sekarang",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Mengelola workflow tiket melalui Jira, merespons incident alert kritis secara real-time, dan mengawal kehandalan sistem berbasis cloud melalui monitoring terpadu Amazon CloudWatch 24/7.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Mendiagnosis dan memberikan solusi teknis untuk stabilitas jaringan Telkomsel, melakukan monitoring server proaktif, dan memastikan performa infrastruktur tetap berjalan optimal sesuai SLA.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Merancang dan mendemonstrasikan antarmuka web modern yang responsif dan berkinerja tinggi menggunakan React/Vue, serta menerapkan praktik terbaik dalam UI/UX.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Melakukan instalasi, provisioning, dan pemeliharaan infrastruktur IT lokal (LAN/WAN) secara berkala untuk mendukung operasional bisnis yang berkelanjutan.",
      "contact-title": "Mari Berkolaborasi",
      "contact-desc": "Tertarik mendiskusikan peluang kerja atau proyek teknologi? Mari kita hubungkan visi Anda dengan solusi infrastruktur yang tepat.",
      "btn-threads": "Threads",
      "footer-rights": "Setiap detail dirancang dengan presisi.",
      "t-whoami": "renaldy_imran",
      "t-uptime": "aktif 24 tahun, siap berkontribusi.",
      "t-skills": "GCP | AWS | Docker | K8s"
    },
    en: {
      "nav-home": "Home",
      "nav-about": "About",
      "nav-projects": "Certifications",
      "nav-experience": "Experience",
      "nav-contact": "Contact",
      "hero-eyebrow": "Cloud Engineer & IT Specialist",
      "hero-title": "Building Resilient <span class='gradient-text'>Digital Infrastructure</span>.",
      "hero-desc": "I am a Computer Science graduate from Bani Saleh University Bekasi with experience in IT Network Operation Center and Cloud Engineering. Experienced through intensive programs such as AWS Re/Start and DigitalSkola Cloud Bootcamp. Proficient in Linux, networking fundamentals, Google Cloud Platform, AWS, and Docker. Capable of working fast, accurately, and collaboratively in solving technical problems and improving system efficiency.",
      "btn-projects": "View Certs",
      "btn-cv": "Download CV",
      "btn-about": "About Me",
      "profile-role": "Junior DevOps | Cloud Engineer | IT Network",
      "stat-years": "Graduation Year",
      "stat-projects": "Skill Certifications",
      "about-title": "About <span class='gradient-text'>Me</span>",
      "about-subtitle": "IT Expert focused on network stability and cloud scalability.",
      "about-card1-title": "Infrastructure Monitor (Live)",
      "about-card1-desc": "IT Infrastructure specialist with a core focus on Cloud ecosystems and network stability. Experienced in navigating complex technical challenges through a measured, adaptive, and result-oriented approach.",
      "about-cv-title": "Latest CV Review",
      "about-cv-desc": "See my detailed qualifications and experience more deeply through the updated CV document.",
      "btn-view-cv": "Open CV",
      "about-card2-title": "Core Skills",
      "skill-cloud": "Cloud: GCP, AWS",
      "skill-container": "Container: Docker, K8s",
      "skill-cicd": "CI/CD: GitLab, GitHub",
      "skill-networking": "Networking: TCP/IP, DNS",
      "projects-title": "Verified <span class='gradient-text'>Certifications</span>",
      "projects-subtitle": "My professional qualifications in network administration and web development.",
      "tab-all": "All",
      "tab-pro": "Professional & National",
      "tab-boot": "Bootcamp & Intensive",
      "btn-preview": "Preview",
      "btn-verify": "Verify Credentials",
      "btn-download": "Download",
      "telemetry-ping-title": "Cloud Latency Test",
      "project1-title": "MikroTik Certified Network Associate",
      "project1-desc": "MTCNA certification for MikroTik network management and routing administration (2024).",
      "project2-title": "Junior Network Administrator",
      "project2-desc": "BNSP certification in computer network administration and system configuration (2023).",
      "project3-title": "Junior Web Developer",
      "project3-desc": "BNSP certification for basic web application development and database management (2022).",
      "project4-title": "AWS re/Start Cloud Computing",
      "project4-desc": "AWS Cloud computing career development program & Orbit Future Academy (2025).",
      "project5-title": "Bootcamp Cloud Engineer",
      "project5-desc": "Intensive Digital Skola bootcamp focused on cloud infrastructure & devops (2023).",
      "project6-title": "Frontend Engineering",
      "project6-desc": "Kampus Merdeka Ruang Guru program for frontend web development (2024).",
      "exp-title": "Career <span class='gradient-text'>Path</span>",
      "exp-subtitle": "My professional journey as a Cloud Engineer and IT Specialist.",
      "exp-present": "Present",
      "exp-job1": "L1 Cloud Engineer Support - PT. Data Labs Analytics",
      "exp-job1-desc": "Managed JIRA workflows, responded to critical cloud infrastructure alerts in real-time, and ensured 24/7 system reliability through Amazon CloudWatch monitoring.",
      "exp-job2": "IT Network Operation Center - PT. ACSA",
      "exp-job2-desc": "Diagnosed and resolved technical issues for Telkomsel network stability, performed proactive server monitoring, and ensured optimal infrastructure performance according to SLAs.",
      "exp-job3": "Frontend Engineering - Ruang Guru",
      "exp-job3-desc": "Architected high-performance, responsive web interfaces using React/Vue, focusing on modern UI/UX principles and optimal user engagement.",
      "exp-job4": "Staf IT Support - PT WGI",
      "exp-job4-desc": "Performed routine installation, provisioning, and maintenance of local IT infrastructure (LAN/WAN) to support daily business operations.",
      "btn-threads": "Threads",
      "footer-rights": "Every detail crafted with precision.",
      "t-whoami": "renaldy_imran",
      "t-uptime": "up 24 years, active and ready.",
      "t-skills": "GCP | AWS | Docker | K8s"
    }
  };

  // --- State Core ---
  let currentLang = localStorage.getItem('lang') || 'id';
  let currentTheme = localStorage.getItem('theme') || 'dark';

  const updateLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update terminal commands translation helper
    if (document.getElementById('terminal-input')) {
      const ph = lang === 'id' ? "ketik 'help'..." : "type 'help'...";
      document.getElementById('terminal-input').setAttribute('placeholder', ph);
    }

    document.getElementById('lang-toggle').textContent = lang.toUpperCase() === 'ID' ? 'EN' : 'ID';
    localStorage.setItem('lang', lang);
  };

  const updateTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#030712' : '#f8fafc');
    }

    localStorage.setItem('theme', theme);
  };

  // --- Initial Setup ---
  updateTheme(currentTheme);
  updateLanguage(currentLang);

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Event Listeners ---
  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    updateLanguage(currentLang);
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme(currentTheme);
  });

  // --- Premium UI Logic ---

  // 1. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + "%";
  });

  // 2. Reveal Animation System
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 3. Copy Email Functionality
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'renaldyimran@gmail.com'; 
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Email Copied!';
        copyBtn.style.background = 'var(--accent)';
        
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.style.background = '';
        }, 2000);
      });
    });
  }

  // --- Scroll Logic (Active Link) ---
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 180)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.includes(`#${current}`)) {
        link.classList.add('active');
      }
    });
  });

  // --- Security rel tags ---
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.startsWith('http') || href.endsWith('.pdf')) && !link.hasAttribute('download')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // --- Card Mouse Hover Glow ---
  const handleCardGlow = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', handleCardGlow);
  });

  // --- Interactive Terminal Logic ---
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const terminalCard = document.querySelector('.terminal-card');

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const printOutput = (text, type = 'output') => {
    if (!terminalBody) return;
    const line = document.createElement('div');
    line.className = `line ${type === 'output' ? 't-output' : ''}`;
    line.innerHTML = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  const handleCommand = (rawInput) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Print command line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'line';
    cmdLine.innerHTML = `<span class="t-prompt">renaldy@cloud-shell:~$</span> <span class="t-command">${escapeHtml(trimmed)}</span>`;
    terminalBody.appendChild(cmdLine);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (cmd === 'help') {
      printOutput(currentLang === 'id' 
        ? 'Daftar Perintah Shell:<br>' +
          '  whoami      - Profil ringkas pemilik shell<br>' +
          '  neofetch    - Info sistem host virtual<br>' +
          '  skills      - Statistik keahlian & persentase kompetensi<br>' +
          '  experience  - Jejak riwayat karir ringkas<br>' +
          '  ping &lt;host&gt; - Tes latensi ke server cloud (misal: ping aws)<br>' +
          '  clear       - Bersihkan layar shell'
        : 'Available Commands:<br>' +
          '  whoami      - Brief profile of the developer<br>' +
          '  neofetch    - Host virtual system information<br>' +
          '  skills      - Technical skills with competency levels<br>' +
          '  experience  - Brief work history overview<br>' +
          '  ping &lt;host&gt; - Test connectivity to cloud servers (e.g. ping aws)<br>' +
          '  clear       - Clear terminal logs'
      );
    } else if (cmd === 'clear') {
      terminalBody.innerHTML = '';
    } else if (cmd === 'whoami') {
      printOutput(currentLang === 'id'
        ? 'Nama: Renaldy Imran Hermawan<br>' +
          'Spesialisasi: Junior DevOps / Cloud Support / IT Network<br>' +
          'Deskripsi: Lulusan Sarjana Teknik Informatika yang berfokus pada stabilitas koneksi lokal & ketahanan infrastruktur komputasi cloud.'
        : 'Name: Renaldy Imran Hermawan<br>' +
          'Role: Junior DevOps / Cloud Support / IT Network Specialist<br>' +
          'Bio: Computer Science graduate focused on network reliability and robust cloud architecture.'
      );
    } else if (cmd === 'neofetch') {
      const art = `
<pre style="font-family: inherit; line-height: 1.25; margin: 0; color: #58a6ff; font-size:0.75rem;">
     _.-'''''''-._     renaldy@cloud-shell
   .'  ________   '.   -------------------
  /   /        \\    \\  OS: Renaldy-Cloud-Core v24.0.0
 |   |          |    | Kernel: Linux 6.1.10-cloud
 |   |          |    | Uptime: 24 years, active and ready.
  \\   \\________/    /  Shell: bash 5.2-cli
   '.             .'   CPU: AMD EPYC Rome (4 Cores) @ 2.80GHz
     '-._______.-'     Memory: 2048MiB / 8192MiB
</pre>
      `;
      printOutput(art);
    } else if (cmd === 'skills') {
      printOutput(currentLang === 'id' ? 'Kompetensi Teknis:' : 'Technical Competency:');
      printOutput('  GCP & AWS      [■■■■■■■■□□] 80%');
      printOutput('  Networking     [■■■■■■■■■□] 90%');
      printOutput('  Docker & K8s   [■■■■■■■□□□] 70%');
      printOutput('  Linux & Bash   [■■■■■■■■□□] 80%');
      printOutput('  CI/CD Pipelines[■■■■■■□□□□] 60%');
      printOutput('  Terraform      [■■■■■■□□□□] 60%');
    } else if (cmd === 'experience') {
      printOutput(currentLang === 'id' ? 'Jejak Karir Singkat:' : 'Career Timeline Overview:');
      printOutput('  * L1 Cloud Engineer Support @ PT. Data Labs Analytics (2025-2026)');
      printOutput('  * IT NOC Specialist @ PT. ACSA (2023-2024)');
      printOutput('  * Frontend Engineer Program @ Ruang Guru (2023)');
      printOutput('  * Staf IT Support @ PT WGI (2018)');
    } else if (cmd === 'ping') {
      if (args.length === 0) {
        printOutput('Usage: ping &lt;host&gt; (e.g. ping google.com, ping aws)');
      } else {
        const host = args[0];
        printOutput(`PING ${escapeHtml(host)} (142.250.190.46) 56(84) bytes of data.`);
        let seq = 1;
        terminalInput.disabled = true;

        const pingInterval = setInterval(() => {
          if (seq <= 3) {
            const time = (Math.random() * 15 + 10).toFixed(1);
            printOutput(`64 bytes from ${escapeHtml(host)}: icmp_seq=${seq} ttl=56 time=${time} ms`);
            seq++;
          } else {
            clearInterval(pingInterval);
            printOutput(`--- ${escapeHtml(host)} ping statistics ---`);
            printOutput('3 packets transmitted, 3 received, 0% packet loss');
            terminalInput.disabled = false;
            terminalInput.focus();
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }
        }, 500);
      }
    } else {
      printOutput(`bash: ${escapeHtml(cmd)}: command not found. Type 'help' to see available commands.`);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  if (terminalInput) {
    // Initial welcome text inside interactive console
    printOutput('Renaldy Cloud Core Terminal Shell [Version 1.0.0]');
    printOutput("Type 'help' to show available commands.<br>");

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = terminalInput.value;
        handleCommand(val);
        terminalInput.value = '';
      }
    });

    if (terminalCard) {
      terminalCard.addEventListener('click', () => {
        terminalInput.focus();
      });
    }
  }

  // --- Telemetry Dashboard Engine ---
  let chartData = [25, 28, 20, 22, 15, 18, 12, 14, 8, 10, 15];
  const chartPath = document.getElementById('chart-path');
  const cpuVal = document.getElementById('telemetry-cpu-val');
  const cpuBar = document.getElementById('telemetry-cpu-bar');
  const ramVal = document.getElementById('telemetry-ram-val');
  const ramBar = document.getElementById('telemetry-ram-bar');
  const netVal = document.getElementById('telemetry-net-val');

  const updateTelemetry = () => {
    // CPU Simulation
    const cpu = Math.floor(Math.random() * 15) + 6; // 6% - 21%
    if (cpuVal && cpuBar) {
      cpuVal.textContent = `${cpu}%`;
      cpuBar.style.width = `${cpu}%`;
    }

    // RAM Simulation
    const ram = (43.4 + Math.random() * 1.2).toFixed(1); // 43.4% - 44.6%
    if (ramVal && ramBar) {
      ramVal.textContent = `${ram}%`;
      ramBar.style.width = `${ram}%`;
    }

    // Network bandwidth speed simulation
    const net = Math.floor(Math.random() * 40) + 120; // 120 - 160 Mbps
    if (netVal) {
      netVal.textContent = `${net} Mbps`;
    }

    // SVG Chart points updating (moving graph)
    if (chartPath) {
      chartData.shift();
      const newHeight = Math.floor(Math.random() * 20) + 6; // 6 to 26
      chartData.push(newHeight);
      
      let pathD = 'M 0 30';
      for (let i = 0; i < chartData.length; i++) {
        pathD += ` L ${i * 10} ${chartData[i]}`;
      }
      pathD += ' L 100 30 Z';
      chartPath.setAttribute('d', pathD);
    }
  };

  if (cpuVal) {
    setInterval(updateTelemetry, 2500);
  }

  // --- Telemetry Latency Tester Widget ---
  const btnPing = document.getElementById('btn-ping-test');
  const pingTarget = document.getElementById('ping-target');
  const pingDot = document.getElementById('ping-status-dot');
  const pingText = document.getElementById('ping-latency-text');

  if (btnPing) {
    btnPing.addEventListener('click', () => {
      btnPing.disabled = true;
      pingDot.className = 'ping-dot pinging';
      pingText.textContent = currentLang === 'id' ? 'Menghubungkan...' : 'Connecting...';

      setTimeout(() => {
        const target = pingTarget.value;
        let latency = 0;
        let status = 'green';
        let desc = 'OK';

        if (target === 'gcp-sg') {
          latency = Math.floor(Math.random() * 8) + 14; // 14-22ms
          status = 'green';
        } else if (target === 'aws-us') {
          latency = Math.floor(Math.random() * 30) + 185; // 185-215ms
          status = 'yellow';
          desc = 'HIGH';
        } else if (target === 'local-isp') {
          latency = Math.floor(Math.random() * 4) + 3; // 3-7ms
          status = 'green';
        }

        pingDot.className = `ping-dot ${status}`;
        pingText.textContent = currentLang === 'id' 
          ? `Latensi: ${latency} ms (${desc})` 
          : `Latency: ${latency} ms (${desc})`;
        btnPing.disabled = false;
      }, 1000);
    });
  }

  // --- Certification Filter Tabs ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const certCards = document.querySelectorAll('.cert-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const grid = document.querySelector('.certs-grid');
      
      if (grid) grid.style.opacity = '0.3';

      setTimeout(() => {
        certCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        if (grid) grid.style.opacity = '1';
      }, 200);
    });
  });

  // --- Certification Modal Details & Image Box ---
  const certDetails = [
    {
      titleId: "project1-title",
      descId: "project1-desc",
      category: "Professional Credentials",
      image: "mtcna.png",
      verifyUrl: "mtcna.pdf",
      downloadUrl: "mtcna.pdf",
      hasImage: true
    },
    {
      titleId: "project2-title",
      descId: "project2-desc",
      category: "National Credentials",
      image: "",
      verifyUrl: "#",
      downloadUrl: "cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:16px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <i class="fa-solid fa-shield-halved" style="font-size: 4rem;"></i>
          <span style="font-weight: 800; font-size: 1.5rem; letter-spacing: 2px;">BNSP LSK</span>
          <span style="font-size: 0.8rem; opacity: 0.8; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    },
    {
      titleId: "project3-title",
      descId: "project3-desc",
      category: "National Credentials",
      image: "sertif.png",
      verifyUrl: "sertif.pdf",
      downloadUrl: "sertif.pdf",
      hasImage: true
    },
    {
      titleId: "project4-title",
      descId: "project4-desc",
      category: "Bootcamp Programs",
      image: "",
      verifyUrl: "#",
      downloadUrl: "cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: linear-gradient(135deg, #FF9900, #232F3E); color: white; width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:16px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <i class="fa-brands fa-aws" style="font-size: 4.5rem;"></i>
          <span style="font-weight: 800; font-size: 1.3rem;">AWS re/Start Cloud</span>
          <span style="font-size: 0.8rem; opacity: 0.8; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    },
    {
      titleId: "project5-title",
      descId: "project5-desc",
      category: "Bootcamp Programs",
      image: "digitalskola.jpg",
      verifyUrl: "#",
      downloadUrl: "digitalskola.jpg",
      hasImage: true
    },
    {
      titleId: "project6-title",
      descId: "project6-desc",
      category: "Bootcamp Programs",
      image: "",
      verifyUrl: "#",
      downloadUrl: "cv-renaldy.pdf",
      hasImage: false,
      placeholderHtml: `
        <div style="background: linear-gradient(135deg, #ef4444, #b91c1c); color: white; width: 100%; height: 100%; min-height: 250px; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:16px; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <i class="fa-solid fa-code" style="font-size: 4rem;"></i>
          <span style="font-weight: 800; font-size: 1.3rem;">Ruang Guru Frontend</span>
          <span style="font-size: 0.8rem; opacity: 0.8; text-transform: uppercase;">Credential Verified</span>
        </div>
      `
    }
  ];

  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalPlaceholder = document.getElementById('modal-placeholder');
  const modalBadge = document.getElementById('modal-badge-text');
  const modalTitle = document.getElementById('modal-title-text');
  const modalDesc = document.getElementById('modal-desc-text');
  const modalBtnVerify = document.getElementById('modal-btn-verify');
  const modalBtnDownload = document.getElementById('modal-btn-download');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');

  const openCertModal = (idx) => {
    const cert = certDetails[idx];
    if (!cert || !modal) return;

    // Fill textual translations
    modalTitle.textContent = translations[currentLang][cert.titleId] || cert.titleId;
    modalDesc.textContent = translations[currentLang][cert.descId] || cert.descId;
    modalBadge.textContent = cert.category;

    // Adjust action button targets
    modalBtnVerify.setAttribute('href', cert.verifyUrl);
    modalBtnDownload.setAttribute('href', cert.downloadUrl);

    // Hide verification button if url is '#' (not verifiable via external links)
    if (cert.verifyUrl === '#') {
      modalBtnVerify.style.display = 'none';
    } else {
      modalBtnVerify.style.display = 'inline-flex';
    }

    // Set preview content: image or custom badge
    if (cert.hasImage) {
      modalImg.src = cert.image;
      modalImg.style.display = 'block';
      modalPlaceholder.style.display = 'none';
    } else {
      modalImg.style.display = 'none';
      modalPlaceholder.innerHTML = cert.placeholderHtml;
      modalPlaceholder.style.display = 'flex';
    }

    // Activate modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Bind preview buttons inside cert cards
  document.querySelectorAll('.btn-preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      openCertModal(idx);
    });
  });

  // Bind clicking on the cert card itself (except links/buttons)
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON' && !e.target.closest('button') && !e.target.closest('a')) {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openCertModal(idx);
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCertModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeCertModal);
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });
});
