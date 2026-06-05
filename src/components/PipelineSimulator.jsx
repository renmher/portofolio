import React, { useState, useEffect, useRef } from 'react';

const PipelineSimulator = ({ lang }) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'failed'
  const [activeStage, setActiveStage] = useState(0); // 0 (none), 1, 2, 3, 4
  const [failMode, setFailMode] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });
  const terminalRef = useRef(null);

  const translations = {
    id: {
      title: "Simulator <span class='gradient-text'>Pipeline CI/CD</span>",
      subtitle: "Uji coba otomatisasi rilis buatan saya secara interaktif langsung dari browser.",
      btnStart: "Jalankan Pipeline",
      btnReset: "Reset",
      btnFix: "Perbaiki Code & Jalankan",
      toggleFailLabel: "Simulasikan Error Keamanan",
      terminalHeader: "Output Terminal Agen Runner",
      stages: {
        1: { title: "Checkout & Lint", desc: "Klon repositori & cek sintaks" },
        2: { title: "Security Gate", desc: "SonarQube & Trivy scan" },
        3: { title: "Docker Build", desc: "Build image & push ke Harbor" },
        4: { title: "Cloud Deploy", desc: "Rolling update ke Kubernetes" },
      },
      statusText: {
        idle: "Menunggu eksekusi...",
        running: "Pipeline sedang berjalan...",
        success: "PIPELINE SUKSES: Aplikasi LIVE di Produksi!",
        failed: "PIPELINE GAGAL: Terhenti karena celah keamanan kritis!",
      }
    },
    en: {
      title: "Interactive <span class='gradient-text'>CI/CD Pipeline Simulator</span>",
      subtitle: "Test my automated delivery pipeline workflow interactively right from your browser.",
      btnStart: "Start Pipeline",
      btnReset: "Reset Pipeline",
      btnFix: "Fix Vulnerability & Run",
      toggleFailLabel: "Simulate Security Vulnerability",
      terminalHeader: "Runner Agent Terminal Output",
      stages: {
        1: { title: "Checkout & Lint", desc: "Clone repo & verify syntax" },
        2: { title: "Security Gate", desc: "SonarQube & Trivy scan" },
        3: { title: "Docker Build", desc: "Build image & push to Harbor" },
        4: { title: "Cloud Deploy", desc: "Rolling update to Kubernetes" },
      },
      statusText: {
        idle: "Waiting for trigger...",
        running: "Pipeline running...",
        success: "PIPELINE SUCCESS: Application is LIVE in Production!",
        failed: "PIPELINE FAILED: Aborted due to critical security vulnerability!",
      }
    }
  };

  const t = translations[lang] || translations['id'];

  const logDatabase = {
    stage1: [
      "[INFO] Initializing CI/CD pipeline simulation container...",
      "[INFO] Repository: git@github.com:renmher/portofolio.git",
      "[INFO] Running on GitLab runner-gke-01",
      "[INFO] git clone git@github.com:renmher/portofolio.git .",
      "Cloning into '.'...",
      "remote: Enumerating objects: 124, done.",
      "remote: Counting objects: 100% (124/124), done.",
      "Receiving objects: 100% (124/124), 2.34 MiB | 12.4 MB/s, done.",
      "[SUCCESS] git checkout completed successfully.",
      "[INFO] Running code quality syntax check: npm run lint",
      "Linting files in directory 'src/'...",
      "eslint: no syntax errors found.",
      "[SUCCESS] Code linting checklist: PASSED."
    ],
    stage2: {
      success: [
        "[INFO] Initiating Security Quality Gate analysis...",
        "[INFO] SonarScanner CLI v5.1.0",
        "[INFO] Communicating with SonarQube server at https://sonar.internal...",
        "Analyzing 42 JavaScript source files...",
        "Analyzing 1 CSS files...",
        "Calculated metrics: Bugs: 0, Vulnerabilities: 0, Code Smells: 4",
        "[SUCCESS] SonarQube Quality Gate: PASSED (Gate target: >90% coverage, 0 critical issues)",
        "[INFO] Auditing container base image vulnerabilities using Trivy...",
        "trivy client v0.48.0",
        "trivy: scanning image base 'node:20-alpine'...",
        "trivy: 0 critical, 0 high, 2 low vulnerabilities found.",
        "[SUCCESS] Trivy Container Vulnerability Gate: PASSED."
      ],
      failed: [
        "[INFO] Initiating Security Quality Gate analysis...",
        "[INFO] SonarScanner CLI v5.1.0",
        "[INFO] Communicating with SonarQube server at https://sonar.internal...",
        "Analyzing 42 JavaScript source files...",
        "[SUCCESS] SonarQube Quality Gate: PASSED (0 bugs, 0 vulnerabilities)",
        "[INFO] Auditing container base image vulnerabilities using Trivy...",
        "trivy client v0.48.0",
        "trivy: scanning image base 'node:20-alpine'...",
        "[CRITICAL ERROR] Trivy found 1 Critical Security Vulnerability (CVE-2026-11822) in container base OS package 'openssl-3.1.2'!",
        "[CRITICAL ERROR] Severity: HIGH (CVSS score: 9.8) - Remote Code Execution (RCE) possible.",
        "[ERROR] Pipeline security gate failed. Halting deployment to prevent exposure.",
        "[FATAL] Exit code 1. Pipeline execution ABORTED."
      ]
    },
    stage3: [
      "[INFO] Starting container packaging: docker build...",
      "docker build -t harbor.local/portal-nashta/portfolio:v1.0.0 .",
      "Sending build context to Docker daemon  2.64MB",
      "Step 1/6 : FROM node:20-alpine",
      " ---> 5e7bc2a6d71b",
      "Step 2/6 : WORKDIR /app",
      " ---> Running in ad36b75c13b5",
      "Step 3/6 : COPY package*.json ./",
      " ---> Running in ccb46b38c232",
      "Step 4/6 : RUN npm ci --only=production",
      " ---> Running in 72bfbcfa217a",
      "Step 5/6 : COPY dist/ ./dist",
      " ---> Running in f4be46d2cb1a",
      "Step 6/6 : CMD [\"npm\", \"run\", \"preview\"]",
      " ---> Running in d8bcfb4c2b9a",
      "Successfully built sha256:b1d836e520cb2a",
      "Successfully tagged harbor.local/portal-nashta/portfolio:v1.0.0",
      "[SUCCESS] Local Docker build completed.",
      "[INFO] Logging in to private Docker Registry (Harbor)...",
      "[SUCCESS] Login to harbor.local: Succeeded",
      "[INFO] docker push harbor.local/portal-nashta/portfolio:v1.0.0",
      "The push refers to repository [harbor.local/portal-nashta/portfolio]",
      "b1d836e520cb: Pushed",
      "f4be46d2cb1a: Pushed",
      "v1.0.0: digest: sha256:d8bcfb4c2b9a size: 1532",
      "[SUCCESS] Image pushed to Harbor registry."
    ],
    stage4: [
      "[INFO] Deploying container image to Kubernetes Cluster...",
      "[INFO] Target cluster: AWS EKS / GCP GKE cluster-production-01",
      "[INFO] Loading kubeconfig credential mapping...",
      "Context configured: gke_renmher-prod_asia-southeast2",
      "Running Kubernetes Rolling Update deployment rollout...",
      "kubectl set image deployment/portfolio-app portfolio-container=harbor.local/portal-nashta/portfolio:v1.0.0 --record",
      "deployment.apps/portfolio-app image updated",
      "kubectl rollout status deployment/portfolio-app",
      "Waiting for deployment 'portfolio-app' rollout to finish: 1 of 3 updated replicas are available...",
      "Waiting for deployment 'portfolio-app' rollout to finish: 2 of 3 updated replicas are available...",
      "[SUCCESS] Deployment 'portfolio-app' successfully rolled out. 3 running pods.",
      "[INFO] Executing post-deployment smoke tests on staging endpoint...",
      "GET https://portfolio.staging.nashta.net/health-check => 200 OK (latency: 42ms)",
      "GET https://portfolio.staging.nashta.net/api/status => 200 OK (latency: 18ms)",
      "[SUCCESS] Smoke tests passed. Promoting to live traffic.",
      "[INFO] Purging CDN caching layer (Cloudflare Edge nodes)...",
      "[SUCCESS] CDN Cache purged successfully.",
      "[SUCCESS] Deployment operation completed! App is LIVE for global users."
    ]
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLogWithDelay = (lines, delay, onComplete) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < lines.length) {
        setLogs(prev => [...prev, lines[index]]);
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);
    return interval;
  };

  const runPipeline = () => {
    setStatus('running');
    setActiveStage(1);
    setLogs(["[SYSTEM] Starting pipeline run..."]);
    setProgress({ 1: 0, 2: 0, 3: 0, 4: 0 });

    // Step 1: Checkout & Lint
    let p1 = 0;
    const prog1 = setInterval(() => {
      p1 += 10;
      setProgress(prev => ({ ...prev, 1: Math.min(p1, 100) }));
      if (p1 >= 100) clearInterval(prog1);
    }, 150);

    const int1 = addLogWithDelay(logDatabase.stage1, 150, () => {
      clearInterval(prog1);
      setProgress(prev => ({ ...prev, 1: 100 }));

      // Step 2: Security Gate
      setActiveStage(2);
      let p2 = 0;
      const prog2 = setInterval(() => {
        p2 += 10;
        setProgress(prev => ({ ...prev, 2: Math.min(p2, 100) }));
        if (p2 >= 100) clearInterval(prog2);
      }, 200);

      const secLogs = failMode ? logDatabase.stage2.failed : logDatabase.stage2.success;
      addLogWithDelay(secLogs, 200, () => {
        clearInterval(prog2);
        
        if (failMode) {
          setProgress(prev => ({ ...prev, 2: 100 }));
          setStatus('failed');
          return;
        }

        setProgress(prev => ({ ...prev, 2: 100 }));

        // Step 3: Build & Package
        setActiveStage(3);
        let p3 = 0;
        const prog3 = setInterval(() => {
          p3 += 5;
          setProgress(prev => ({ ...prev, 3: Math.min(p3, 100) }));
          if (p3 >= 100) clearInterval(prog3);
        }, 120);

        addLogWithDelay(logDatabase.stage3, 120, () => {
          clearInterval(prog3);
          setProgress(prev => ({ ...prev, 3: 100 }));

          // Step 4: Deploy & Verify
          setActiveStage(4);
          let p4 = 0;
          const prog4 = setInterval(() => {
            p4 += 8;
            setProgress(prev => ({ ...prev, 4: Math.min(p4, 100) }));
            if (p4 >= 100) clearInterval(prog4);
          }, 180);

          addLogWithDelay(logDatabase.stage4, 180, () => {
            clearInterval(prog4);
            setProgress(prev => ({ ...prev, 4: 100 }));
            setStatus('success');
          });
        });
      });
    });
  };

  const resetPipeline = () => {
    setStatus('idle');
    setActiveStage(0);
    setLogs([]);
    setProgress({ 1: 0, 2: 0, 3: 0, 4: 0 });
  };

  const handleFixAndRun = () => {
    setFailMode(false);
    resetPipeline();
    setTimeout(() => {
      setStatus('running');
      setActiveStage(1);
      setLogs(["[SYSTEM] Hotfix: Docker base image updated to patch vulnerability.", "[SYSTEM] Restarting pipeline run..."]);
      
      let p1 = 0;
      const prog1 = setInterval(() => {
        p1 += 10;
        setProgress(prev => ({ ...prev, 1: Math.min(p1, 100) }));
        if (p1 >= 100) clearInterval(prog1);
      }, 100);

      addLogWithDelay(logDatabase.stage1, 100, () => {
        clearInterval(prog1);
        setProgress(prev => ({ ...prev, 1: 100 }));

        setActiveStage(2);
        let p2 = 0;
        const prog2 = setInterval(() => {
          p2 += 10;
          setProgress(prev => ({ ...prev, 2: Math.min(p2, 100) }));
          if (p2 >= 100) clearInterval(prog2);
        }, 100);

        // Fixed base image logs showing 0 vulnerabilities
        const fixedSecLogs = [
          "[INFO] Initiating Security Quality Gate analysis...",
          "[INFO] SonarScanner CLI v5.1.0",
          "[SUCCESS] SonarQube Quality Gate: PASSED",
          "[INFO] Auditing container base image vulnerabilities using Trivy...",
          "trivy client v0.48.0",
          "trivy: scanning image base 'node:20-alpine-patched'...",
          "[SUCCESS] Trivy Container Vulnerability Gate: PASSED (0 Critical, 0 High - CVE-2026-11822 resolved!).",
          "[SUCCESS] Security check complete."
        ];

        addLogWithDelay(fixedSecLogs, 100, () => {
          clearInterval(prog2);
          setProgress(prev => ({ ...prev, 2: 100 }));

          setActiveStage(3);
          let p3 = 0;
          const prog3 = setInterval(() => {
            p3 += 10;
            setProgress(prev => ({ ...prev, 3: Math.min(p3, 100) }));
            if (p3 >= 100) clearInterval(prog3);
          }, 80);

          addLogWithDelay(logDatabase.stage3, 80, () => {
            clearInterval(prog3);
            setProgress(prev => ({ ...prev, 3: 100 }));

            setActiveStage(4);
            let p4 = 0;
            const prog4 = setInterval(() => {
              p4 += 10;
              setProgress(prev => ({ ...prev, 4: Math.min(p4, 100) }));
              if (p4 >= 100) clearInterval(prog4);
            }, 100);

            addLogWithDelay(logDatabase.stage4, 100, () => {
              clearInterval(prog4);
              setProgress(prev => ({ ...prev, 4: 100 }));
              setStatus('success');
            });
          });
        });
      });
    }, 300);
  };

  return (
    <section id="pipeline-simulator" className="reveal active">
      <div className="section-title">
        <h2 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p>{t.subtitle}</p>
      </div>

      <div className="card pipeline-card-container" style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        
        {/* Toggle Mode Control */}
        <div className="pipeline-controls-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div className="mode-toggle-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
              <input 
                type="checkbox" 
                checked={failMode} 
                onChange={(e) => {
                  if (status === 'idle') setFailMode(e.target.checked);
                }} 
                disabled={status === 'running'}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span className="slider round" style={{
                position: 'absolute',
                cursor: status === 'running' ? 'not-allowed' : 'pointer',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: failMode ? '#ef4444' : '#ccc',
                transition: '0.3s',
                borderRadius: '24px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '18px', width: '18px',
                  left: failMode ? '26px' : '4px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  transition: '0.3s',
                  borderRadius: '50%'
                }}></span>
              </span>
            </label>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>{t.toggleFailLabel}</span>
          </div>

          <div className="action-buttons" style={{ display: 'flex', gap: '12px' }}>
            {status === 'failed' && failMode ? (
              <button className="btn btn-primary" onClick={handleFixAndRun} style={{ background: '#22c55e', color: '#fff' }}>
                <i className="fa-solid fa-wrench"></i> {t.btnFix}
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={runPipeline} 
                disabled={status === 'running' || status === 'success' || status === 'failed'}
                style={{ opacity: status === 'running' || status === 'success' || status === 'failed' ? 0.6 : 1 }}
              >
                <i className="fa-solid fa-play"></i> {t.btnStart}
              </button>
            )}
            <button className="btn btn-secondary" onClick={resetPipeline} disabled={status === 'running'}>
              <i className="fa-solid fa-rotate-left"></i> {t.btnReset}
            </button>
          </div>
        </div>

        {/* Visual Pipeline Layout */}
        <div className="pipeline-visual-flow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Connecting Line Track */}
          <div className="pipeline-track-line" style={{
            position: 'absolute',
            top: '32px',
            left: '40px',
            right: '40px',
            height: '4px',
            background: 'var(--border)',
            zIndex: 1,
            display: 'block'
          }}></div>

          {/* Individual Stages */}
          {[1, 2, 3, 4].map((stageNum) => {
            const stage = t.stages[stageNum];
            let dotBg = 'var(--bg-deep)';
            let dotBorder = 'var(--border)';
            let iconColor = 'var(--text-muted)';
            let glow = 'none';

            if (activeStage === stageNum && status === 'running') {
              dotBorder = 'var(--primary)';
              iconColor = 'var(--primary)';
              glow = '0 0 15px var(--primary-glow)';
            } else if (progress[stageNum] === 100) {
              if (stageNum === 2 && status === 'failed') {
                dotBorder = '#ef4444';
                iconColor = '#ef4444';
                glow = '0 0 15px rgba(239, 68, 68, 0.3)';
              } else {
                dotBorder = '#22c55e';
                iconColor = '#22c55e';
                glow = '0 0 15px rgba(34, 197, 94, 0.3)';
              }
            }

            const icons = {
              1: 'fa-solid fa-code-branch',
              2: 'fa-solid fa-shield-halved',
              3: 'fa-brands fa-docker',
              4: 'fa-solid fa-cloud-arrow-up'
            };

            return (
              <div key={stageNum} className="pipeline-stage-node" style={{
                flex: '1',
                minWidth: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
              }}>
                {/* Circular Node Icon */}
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: dotBg,
                  border: `2px solid ${dotBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  color: iconColor,
                  boxShadow: glow,
                  transition: 'all 0.3s ease',
                  marginBottom: '16px'
                }}>
                  <i className={icons[stageNum]}></i>
                </div>

                {/* Progress bar inside the node */}
                <div style={{ width: '80%', height: '3px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{
                    width: `${progress[stageNum]}%`,
                    height: '100%',
                    background: (stageNum === 2 && status === 'failed') ? '#ef4444' : '#22c55e',
                    transition: 'width 0.1s linear'
                  }}></div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>{stage.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '140px', lineHeight: '1.4' }}>{stage.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Status Text Display */}
        <div className="pipeline-status-banner" style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: status === 'success' ? 'rgba(34, 197, 94, 0.08)' : status === 'failed' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255,255,255,0.02)',
          border: `1px solid ${status === 'success' ? 'rgba(34, 197, 94, 0.2)' : status === 'failed' ? 'rgba(239, 68, 68, 0.2)' : 'var(--border)'}`,
          color: status === 'success' ? '#22c55e' : status === 'failed' ? '#ef4444' : 'var(--text-main)',
          fontSize: '0.95rem',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px'
        }}>
          {status === 'running' && <i className="fa-solid fa-spinner fa-spin"></i>}
          {status === 'success' && <i className="fa-solid fa-circle-check"></i>}
          {status === 'failed' && <i className="fa-solid fa-triangle-exclamation"></i>}
          <span>{t.statusText[status]}</span>
        </div>

        {/* Terminal logs block */}
        <div className="pipeline-terminal" style={{
          background: '#08090b',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
        }}>
          <div className="terminal-header" style={{
            background: '#121318',
            padding: '10px 18px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 600 }}>
              {t.terminalHeader}
            </span>
            <span></span>
          </div>

          <div className="terminal-logs-body" ref={terminalRef} style={{
            padding: '18px',
            height: '240px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: '1.6',
            color: '#c9d1d9',
            textAlign: 'left',
            background: '#08090b'
          }}>
            {logs.length === 0 ? (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {lang === 'id' ? 'Terminal siap. Klik "Jalankan Pipeline" untuk memulai simulasi.' : 'Terminal ready. Click "Start Pipeline" to begin.'}
              </span>
            ) : (
              logs.map((log, index) => {
                let color = '#c9d1d9';
                if (log.startsWith('[SUCCESS]')) color = '#22c55e';
                else if (log.startsWith('[CRITICAL ERROR]') || log.startsWith('[ERROR]') || log.startsWith('[FATAL]')) color = '#ef4444';
                else if (log.startsWith('[WARNING]')) color = '#eab308';
                else if (log.startsWith('[INFO]')) color = '#58a6ff';
                else if (log.startsWith('[SYSTEM]')) color = '#d2a8ff';

                return (
                  <div key={index} style={{ color, whiteSpace: 'pre-wrap' }}>
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PipelineSimulator;
