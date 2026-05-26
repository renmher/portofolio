import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ lang }) => {
  const [history, setHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  const translations = {
    id: {
      welcome: "Renaldy Cloud Core Terminal Shell [Version 1.0.0]\nKetik 'help' untuk melihat daftar perintah.\n",
      placeholder: "ketik 'help'...",
      helpText: "Daftar Perintah Shell:<br>" +
                "  whoami      - Profil ringkas pemilik shell<br>" +
                "  neofetch    - Info sistem host virtual<br>" +
                "  skills      - Statistik keahlian & persentase kompetensi<br>" +
                "  experience  - Jejak riwayat karir ringkas<br>" +
                "  ping &lt;host&gt; - Tes latensi ke server cloud (misal: ping aws)<br>" +
                "  clear       - Bersihkan layar shell",
      whoami: "Nama: Renaldy Imran Hermawan<br>" +
              "Spesialisasi: Junior DevOps / Cloud Support / IT Network<br>" +
              "Deskripsi: Lulusan Sarjana Teknik Informatika yang berfokus pada stabilitas koneksi lokal & ketahanan infrastruktur komputasi cloud.",
      skills: "Kompetensi Teknis:<br>" +
              "  GCP & AWS      [■■■■■■■■□□] 80%<br>" +
              "  Networking     [■■■■■■■■■□] 90%<br>" +
              "  Docker & K8s   [■■■■■■■□□□] 70%<br>" +
              "  Linux & Bash   [■■■■■■■■□□] 80%<br>" +
              "  CI/CD Pipelines[■■■■■■□□□□] 60%<br>" +
              "  Terraform      [■■■■■■□□□□] 60%",
      experience: "Jejak Karir Singkat:<br>" +
                  "  * L1 Cloud Engineer Support @ PT. Data Labs Analytics (2025-2026)<br>" +
                  "  * IT NOC Specialist @ PT. ACSA (2023-2024)<br>" +
                  "  * Frontend Engineer Program @ Ruang Guru (2023)<br>" +
                  "  * Staf IT Support @ PT WGI (2018)",
      pingUsage: "Penggunaan: ping &lt;host&gt; (contoh: ping google.com, ping aws)",
      notFound: "bash: {cmd}: perintah tidak ditemukan. Ketik 'help' untuk bantuan."
    },
    en: {
      welcome: "Renaldy Cloud Core Terminal Shell [Version 1.0.0]\nType 'help' to show available commands.\n",
      placeholder: "type 'help'...",
      helpText: "Available Commands:<br>" +
                "  whoami      - Brief profile of the developer<br>" +
                "  neofetch    - Host virtual system information<br>" +
                "  skills      - Technical skills with competency levels<br>" +
                "  experience  - Brief work history overview<br>" +
                "  ping &lt;host&gt; - Test connectivity to cloud servers (e.g. ping aws)<br>" +
                "  clear       - Clear terminal logs",
      whoami: "Name: Renaldy Imran Hermawan<br>" +
              "Role: Junior DevOps / Cloud Support / IT Network Specialist<br>" +
              "Bio: Computer Science graduate focused on network reliability and robust cloud architecture.",
      skills: "Technical Competency:<br>" +
              "  GCP & AWS      [■■■■■■■■□□] 80%<br>" +
              "  Networking     [■■■■■■■■■□] 90%<br>" +
              "  Docker & K8s   [■■■■■■■□□□] 70%<br>" +
              "  Linux & Bash   [■■■■■■■■□□] 80%<br>" +
              "  CI/CD Pipelines[■■■■■■□□□□] 60%<br>" +
              "  Terraform      [■■■■■■□□□□] 60%",
      experience: "Career Timeline Overview:<br>" +
                  "  * L1 Cloud Engineer Support @ PT. Data Labs Analytics (2025-2026)<br>" +
                  "  * IT NOC Specialist @ PT. ACSA (2023-2024)<br>" +
                  "  * Frontend Engineer Program @ Ruang Guru (2023)<br>" +
                  "  * Staf IT Support @ PT WGI (2018)",
      pingUsage: "Usage: ping &lt;host&gt; (e.g. ping google.com, ping aws)",
      notFound: "bash: {cmd}: command not found. Type 'help' for available commands."
    }
  };

  useEffect(() => {
    // Initial welcome message
    setHistory([
      { type: 'output', content: translations[lang].welcome.replace(/\n/g, '<br>') }
    ]);
  }, [lang]);

  useEffect(() => {
    // Scroll terminal body to bottom on history change
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const handleCommandSubmit = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      setInputVal('');
      if (!trimmed) return;

      // Add typed command line to history
      const newHistory = [
        ...history,
        { type: 'input', content: trimmed }
      ];
      setHistory(newHistory);

      const parts = trimmed.split(' ');
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (cmd === 'help') {
        setHistory(prev => [...prev, { type: 'output', content: translations[lang].helpText }]);
      } else if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'whoami') {
        setHistory(prev => [...prev, { type: 'output', content: translations[lang].whoami }]);
      } else if (cmd === 'neofetch') {
        const neofetchArt = `
<pre style="font-family: inherit; line-height: 1.25; margin: 0; color: #58a6ff; font-size: 0.72rem;">
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
        setHistory(prev => [...prev, { type: 'output', content: neofetchArt }]);
      } else if (cmd === 'skills') {
        setHistory(prev => [...prev, { type: 'output', content: translations[lang].skills }]);
      } else if (cmd === 'experience') {
        setHistory(prev => [...prev, { type: 'output', content: translations[lang].experience }]);
      } else if (cmd === 'ping') {
        if (args.length === 0) {
          setHistory(prev => [...prev, { type: 'output', content: translations[lang].pingUsage }]);
        } else {
          const host = args[0];
          setIsDisabled(true);
          setHistory(prev => [...prev, { type: 'output', content: `PING ${escapeHtml(host)} (142.250.190.46) 56(84) bytes of data.` }]);
          
          let seq = 1;
          const pingInterval = setInterval(() => {
            if (seq <= 3) {
              const time = (Math.random() * 15 + 10).toFixed(1);
              setHistory(prev => [...prev, { type: 'output', content: `64 bytes from ${escapeHtml(host)}: icmp_seq=${seq} ttl=56 time=${time} ms` }]);
              seq++;
            } else {
              clearInterval(pingInterval);
              setHistory(prev => [
                ...prev,
                { type: 'output', content: `--- ${escapeHtml(host)} ping statistics ---` },
                { type: 'output', content: `3 packets transmitted, 3 received, 0% packet loss` }
              ]);
              setIsDisabled(false);
              setTimeout(() => {
                if (inputRef.current) inputRef.current.focus();
              }, 50);
            }
          }, 400);
        }
      } else {
        const errorMsg = translations[lang].notFound.replace('{cmd}', escapeHtml(cmd));
        setHistory(prev => [...prev, { type: 'output', content: errorMsg }]);
      }
    }
  };

  const handleCardClick = () => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  };

  return (
    <article className="card terminal-card" onClick={handleCardClick}>
      <div className="terminal-header">
        <div className="t-dot red"></div>
        <div className="t-dot yellow"></div>
        <div className="t-dot green"></div>
        <span className="terminal-title">bash — renaldy@cloud-shell</span>
      </div>
      <div className="terminal-container">
        <div className="terminal-body" ref={terminalBodyRef}>
          {history.map((line, idx) => (
            <div key={idx} className="line">
              {line.type === 'input' ? (
                <>
                  <span className="t-prompt">renaldy@cloud-shell:~$</span>{' '}
                  <span className="t-command">{line.content}</span>
                </>
              ) : (
                <div className="t-output" dangerouslySetInnerHTML={{ __html: line.content }} />
              )}
            </div>
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="t-prompt">renaldy@cloud-shell:~$</span>
          <input
            ref={inputRef}
            type="text"
            id="terminal-input"
            autocomplete="off"
            spellcheck="false"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommandSubmit}
            placeholder={translations[lang].placeholder}
            disabled={isDisabled}
          />
        </div>
      </div>
    </article>
  );
};

export default Terminal;
