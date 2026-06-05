/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const ObservabilitySimulator = ({ lang, pipelineState }) => {
  const [status, setStatus] = useState('healthy'); // 'healthy' | 'warning' | 'critical' | 'resolving'
  const [cpu, setCpu] = useState(34.2);
  const [ram, setRam] = useState(54.1);
  const [network, setNetwork] = useState(128);
  const [cpuHistory, setCpuHistory] = useState(Array(20).fill(35));
  const [ramHistory, setRamHistory] = useState(Array(20).fill(54));
  const [networkHistory, setNetworkHistory] = useState(Array(20).fill(128));
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'ok', text: 'System Bootstrapped Successfully', time: '13:10' },
    { id: 2, type: 'ok', text: 'VictoriaMetrics Database Online', time: '13:12' },
    { id: 3, type: 'ok', text: 'Grafana Dashboard connected', time: '13:15' }
  ]);
  const [showTelegram, setShowTelegram] = useState(false);
  const timerRef = useRef(null);

  const [traces, setTraces] = useState([
    {
      id: 'tr-8a1f',
      method: 'GET',
      path: '/api/v1/products',
      status: 200,
      duration: 42,
      time: '13:50:24',
      spans: [
        { name: 'gateway', duration: 42, color: '#58a6ff', pct: 100 },
        { name: 'product-service', duration: 30, color: '#22c55e', pct: 71 },
        { name: 'redis-cache', duration: 8, color: '#eab308', pct: 19 }
      ]
    },
    {
      id: 'tr-9c4b',
      method: 'POST',
      path: '/api/v1/checkout',
      status: 201,
      duration: 115,
      time: '13:50:31',
      spans: [
        { name: 'gateway', duration: 115, color: '#58a6ff', pct: 100 },
        { name: 'order-service', duration: 85, color: '#22c55e', pct: 74 },
        { name: 'inventory-db', duration: 35, color: '#eab308', pct: 30 }
      ]
    }
  ]);

  const translations = {
    id: {
      title: "Simulator <span class='gradient-text'>Monitoring & Observabilitas</span>",
      subtitle: "Simulasikan load-testing server, saksikan sistem monitoring bekerja, dan amati respon autoscaling.",
      btnLoadTest: "Jalankan Load Test (Serangan Trafik)",
      btnAutoscale: "Aktifkan Autoscaling (Mitigasi)",
      btnReset: "Reset Sistem",
      statusHealthy: "SISTEM NORMAL",
      statusWarning: "PERINGATAN: BEBAN TINGGI",
      statusCritical: "KRITIS: OVERLOAD SERVER",
      statusResolving: "AUTOSCALING: PROVISIONING NODE BARU...",
      charts: {
        cpu: "CPU USAGE (LOAD)",
        ram: "RAM USAGE (USED)",
        net: "TRAFIK JARINGAN"
      },
      alertHeader: "LOG NOTIFIKASI ALARM",
      traceHeader: "TRACE TERDISTRIBUSI (JAEGER/TEMPO)",
      tgTitle: "Telegram Bot Alert (Production)",
      tgBody: "⚠️ WARNING: CPU overload detected on node-04 (95.4%). Auto-mitigation triggered."
    },
    en: {
      title: "Interactive <span class='gradient-text'>Observability & Monitoring Simulator</span>",
      subtitle: "Simulate server load-testing, watch the monitoring stack react, and see autoscaling mitigation in action.",
      btnLoadTest: "Trigger Load Test (Traffic Spike)",
      btnAutoscale: "Trigger Autoscaling (Mitigate)",
      btnReset: "Reset Dashboard",
      statusHealthy: "SYSTEM HEALTHY",
      statusWarning: "WARNING: HIGH LOAD",
      statusCritical: "CRITICAL: SERVER OVERLOAD",
      statusResolving: "AUTOSCALING: PROVISIONING NEW REPLICAS...",
      charts: {
        cpu: "CPU USAGE (LOAD)",
        ram: "RAM USAGE (USED)",
        net: "NETWORK TRAFFIC"
      },
      alertHeader: "ALERT ALARM LOGS",
      traceHeader: "DISTRIBUTED TRACES (JAEGER/TEMPO)",
      tgTitle: "Telegram Bot Alert (Production)",
      tgBody: "⚠️ WARNING: CPU overload detected on node-04 (95.4%). Auto-mitigation triggered."
    }
  };

  const t = translations[lang] || translations['id'];

  // Animate Charts Loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCpu(prev => {
        let next = prev;
        if (status === 'healthy') {
          next = 30 + Math.random() * 12;
        } else if (status === 'warning') {
          next = 72 + Math.random() * 8;
        } else if (status === 'critical') {
          next = 94 + Math.random() * 4.5;
        } else if (status === 'resolving') {
          next = Math.max(38, prev - 12);
        }
        setCpuHistory(hist => [...hist.slice(1), next]);
        return parseFloat(next.toFixed(1));
      });

      setRam(prev => {
        let next = prev;
        if (status === 'healthy') {
          next = 50 + Math.random() * 5;
        } else if (status === 'warning') {
          next = 75 + Math.random() * 3;
        } else if (status === 'critical') {
          next = 88 + Math.random() * 2.5;
        } else if (status === 'resolving') {
          next = Math.max(58, prev - 4);
        }
        setRamHistory(hist => [...hist.slice(1), next]);
        return parseFloat(next.toFixed(1));
      });

      setNetwork(prev => {
        let next = prev;
        if (status === 'healthy') {
          next = 100 + Math.floor(Math.random() * 35);
        } else if (status === 'warning') {
          next = 190 + Math.floor(Math.random() * 25);
        } else if (status === 'critical') {
          next = 240 + Math.floor(Math.random() * 15);
        } else if (status === 'resolving') {
          next = Math.max(120, prev - 25);
        }
        setNetworkHistory(hist => [...hist.slice(1), next]);
        return Math.floor(next);
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [status]);

  // Sync with CI/CD Pipeline Simulator State
  useEffect(() => {
    if (!pipelineState) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    if (pipelineState.status === 'running') {
      setStatus('warning');
      if (pipelineState.stage === 1) {
        setAlerts(prev => [
          ...prev,
          { id: Date.now() + 1, type: 'warning', text: lang === 'id' ? '[CI/CD] Tahap Checkout & Lint: Klon repo & verifikasi sintaks...' : '[CI/CD] Stage Checkout & Lint: Cloning repo & verifying syntax...', time: now }
        ]);
        setTraces(prev => [
          {
            id: `tr-${Math.random().toString(36).substring(2, 6)}`,
            method: 'GIT',
            path: 'git clone repo.git',
            status: 200,
            duration: 1240,
            time: now,
            spans: [
              { name: 'git-cli', duration: 1240, color: '#58a6ff', pct: 100 },
              { name: 'github-auth', duration: 340, color: '#eab308', pct: 27 }
            ]
          },
          ...prev.slice(0, 3)
        ]);
      } else if (pipelineState.stage === 2) {
        setAlerts(prev => [
          ...prev,
          { id: Date.now() + 2, type: 'warning', text: lang === 'id' ? '[CI/CD] Tahap Security Gate: Memulai analisis SonarQube & Trivy...' : '[CI/CD] Stage Security Gate: Initiating SonarQube & Trivy scan...', time: now }
        ]);
        setTraces(prev => [
          {
            id: `tr-${Math.random().toString(36).substring(2, 6)}`,
            method: 'SCAN',
            path: 'sonar-scanner',
            status: 200,
            duration: 2100,
            time: now,
            spans: [
              { name: 'sonar-scanner', duration: 2100, color: '#58a6ff', pct: 100 },
              { name: 'code-analysis', duration: 1600, color: '#22c55e', pct: 76 },
              { name: 'api-upload', duration: 500, color: '#eab308', pct: 24 }
            ]
          },
          ...prev.slice(0, 3)
        ]);
      } else if (pipelineState.stage === 3) {
        setAlerts(prev => [
          ...prev,
          { id: Date.now() + 3, type: 'warning', text: lang === 'id' ? '[CI/CD] Tahap Docker Build: Kompilasi aset & push image ke Harbor...' : '[CI/CD] Stage Docker Build: Compiling assets & pushing image to Harbor...', time: now }
        ]);
        setTraces(prev => [
          {
            id: `tr-${Math.random().toString(36).substring(2, 6)}`,
            method: 'BUILD',
            path: 'docker build',
            status: 200,
            duration: 4120,
            time: now,
            spans: [
              { name: 'docker-daemon', duration: 4120, color: '#58a6ff', pct: 100 },
              { name: 'npm-install', duration: 2900, color: '#22c55e', pct: 70 },
              { name: 'harbor-push', duration: 1220, color: '#eab308', pct: 29 }
            ]
          },
          ...prev.slice(0, 3)
        ]);
      } else if (pipelineState.stage === 4) {
        setAlerts(prev => [
          ...prev,
          { id: Date.now() + 4, type: 'warning', text: lang === 'id' ? '[CI/CD] Tahap Cloud Deploy: Melakukan rolling update di Kubernetes...' : '[CI/CD] Stage Cloud Deploy: Executing rolling update in Kubernetes...', time: now }
        ]);
        setTraces(prev => [
          {
            id: `tr-${Math.random().toString(36).substring(2, 6)}`,
            method: 'DEPLOY',
            path: 'k8s rolling-update',
            status: 200,
            duration: 3500,
            time: now,
            spans: [
              { name: 'kubectl-apply', duration: 3500, color: '#58a6ff', pct: 100 },
              { name: 'rolling-upgrade', duration: 2700, color: '#22c55e', pct: 77 },
              { name: 'readiness-probe', duration: 800, color: '#eab308', pct: 22 }
            ]
          },
          ...prev.slice(0, 3)
        ]);
      }
    } else if (pipelineState.status === 'failed') {
      setStatus('critical');
      setAlerts(prev => [
        ...prev,
        { id: Date.now() + 5, type: 'critical', text: lang === 'id' ? '[ALARM] Pipeline GAGAL: Kerentanan keamanan terdeteksi di Tahap 2!' : '[ALARM] Pipeline FAILED: Security vulnerabilities detected in Stage 2!', time: now }
      ]);
      setTraces(prev => [
        {
          id: `tr-${Math.random().toString(36).substring(2, 6)}`,
          method: 'SCAN',
          path: 'trivy scan',
          status: 500,
          duration: 1540,
          time: now,
          spans: [
            { name: 'trivy-audit', duration: 1540, color: '#ef4444', pct: 100 },
            { name: 'security-fail', duration: 1300, color: '#ef4444', pct: 84, error: true }
          ]
        },
        ...prev.slice(0, 3)
      ]);
      setShowTelegram(true);
    } else if (pipelineState.status === 'success') {
      setStatus('resolving');
      setAlerts(prev => [
        ...prev,
        { id: Date.now() + 6, type: 'resolving', text: lang === 'id' ? '[CI/CD] Pipeline SUKSES: Memasang rilis baru di cluster produksi...' : '[CI/CD] Pipeline SUCCESS: Deploying new release on production cluster...', time: now }
      ]);
      
      const timer = setTimeout(() => {
        setStatus('healthy');
        setShowTelegram(false);
        setAlerts(prev => [
          ...prev,
          { id: Date.now() + 7, type: 'ok', text: lang === 'id' ? '[SUKSES] Rilis baru aktif. Beban CPU kembali normal.' : '[SUCCESS] New release active. CPU load normalized.', time: now }
        ]);
        setTraces(prev => [
          {
            id: `tr-${Math.random().toString(36).substring(2, 6)}`,
            method: 'GET',
            path: '/healthz',
            status: 200,
            duration: 15,
            time: now,
            spans: [
              { name: 'gateway', duration: 15, color: '#58a6ff', pct: 100 },
              { name: 'health-check', duration: 10, color: '#22c55e', pct: 66 }
            ]
          },
          ...prev.slice(0, 3)
        ]);
      }, 3000);

      return () => clearTimeout(timer);
    } else if (pipelineState.status === 'idle') {
      setStatus('healthy');
      setShowTelegram(false);
    }
  }, [pipelineState, lang]);

  const triggerLoadTest = () => {
    setStatus('warning');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Add Warning Alert
    setAlerts(prev => [
      ...prev,
      { id: prev.length + 1, type: 'warning', text: 'High CPU Load detected on node-04 (>70%)', time: now }
    ]);

    // Transition to Critical after 3 seconds
    setTimeout(() => {
      setStatus('critical');
      const nowCritical = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setAlerts(prev => [
        ...prev,
        { id: prev.length + 1, type: 'critical', text: 'CRITICAL: node-04 CPU Spike (96.2%) - Request queue full', time: nowCritical }
      ]);
      setTraces(prev => [
        {
          id: `tr-${Math.random().toString(36).substring(2, 6)}`,
          method: 'POST',
          path: '/api/v1/payment',
          status: 504,
          duration: 5000,
          time: nowCritical,
          spans: [
            { name: 'gateway', duration: 5000, color: '#ef4444', pct: 100 },
            { name: 'payment-service', duration: 4800, color: '#ef4444', pct: 96 },
            { name: 'mysql-db-pool', duration: 4500, color: '#ef4444', pct: 90, error: true }
          ]
        },
        ...prev.slice(0, 3)
      ]);
      setShowTelegram(true);
    }, 3000);
  };

  const triggerAutoscale = () => {
    setStatus('resolving');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setAlerts(prev => [
      ...prev,
      { id: prev.length + 1, type: 'resolving', text: 'HorizontalPodAutoscaler triggered: Provisioning 2 new nodes', time: now }
    ]);

    // Back to Healthy after 4 seconds
    setTimeout(() => {
      setStatus('healthy');
      setShowTelegram(false);
      const nowHealthy = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setAlerts(prev => [
        ...prev,
        { id: prev.length + 1, type: 'ok', text: 'Autoscale scale-up completed. System Load Normalized', time: nowHealthy }
      ]);
      setTraces(prev => [
        {
          id: `tr-${Math.random().toString(36).substring(2, 6)}`,
          method: 'POST',
          path: '/api/v1/payment',
          status: 200,
          duration: 95,
          time: nowHealthy,
          spans: [
            { name: 'gateway', duration: 95, color: '#58a6ff', pct: 100 },
            { name: 'payment-service', duration: 65, color: '#22c55e', pct: 68 },
            { name: 'mysql-db-pool', duration: 15, color: '#eab308', pct: 15 }
          ]
        },
        ...prev.slice(0, 3)
      ]);
    }, 4000);
  };

  const resetSimulator = () => {
    setStatus('healthy');
    setShowTelegram(false);
    setCpu(34.2);
    setRam(54.1);
    setNetwork(128);
    setCpuHistory(Array(20).fill(35));
    setRamHistory(Array(20).fill(54));
    setNetworkHistory(Array(20).fill(128));
    setAlerts([
      { id: 1, type: 'ok', text: 'System Bootstrapped Successfully', time: '13:10' },
      { id: 2, type: 'ok', text: 'VictoriaMetrics Database Online', time: '13:12' },
      { id: 3, type: 'ok', text: 'Grafana Dashboard connected', time: '13:15' }
    ]);
    setTraces([
      {
        id: 'tr-8a1f',
        method: 'GET',
        path: '/api/v1/products',
        status: 200,
        duration: 42,
        time: '13:50:24',
        spans: [
          { name: 'gateway', duration: 42, color: '#58a6ff', pct: 100 },
          { name: 'product-service', duration: 30, color: '#22c55e', pct: 71 },
          { name: 'redis-cache', duration: 8, color: '#eab308', pct: 19 }
        ]
      },
      {
        id: 'tr-9c4b',
        method: 'POST',
        path: '/api/v1/checkout',
        status: 201,
        duration: 115,
        time: '13:50:31',
        spans: [
          { name: 'gateway', duration: 115, color: '#58a6ff', pct: 100 },
          { name: 'order-service', duration: 85, color: '#22c55e', pct: 74 },
          { name: 'inventory-db', duration: 35, color: '#eab308', pct: 30 }
        ]
      }
    ]);
  };

  // Convert points array to SVG Path coordinates
  const generateSvgPath = (points, maxVal) => {
    const width = 300;
    const height = 80;
    const step = width / (points.length - 1);
    return points.map((p, index) => {
      const x = index * step;
      const y = height - (p / maxVal) * height * 0.9 - 5;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section id="observability-simulator" className="reveal active">
      <div className="section-title">
        <h2 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p>{t.subtitle}</p>
      </div>

      <div className="card monitoring-container" style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        
        {/* Header Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          
          {/* Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: status === 'healthy' ? '#22c55e' : status === 'warning' ? '#eab308' : status === 'critical' ? '#ef4444' : '#58a6ff',
              boxShadow: `0 0 10px ${status === 'healthy' ? '#22c55e' : status === 'warning' ? '#eab308' : status === 'critical' ? '#ef4444' : '#58a6ff'}`,
              animation: 'pulse-status 1.5s infinite'
            }}></span>
            <span style={{
              fontWeight: 800,
              fontSize: '0.88rem',
              color: status === 'healthy' ? '#22c55e' : status === 'warning' ? '#eab308' : status === 'critical' ? '#ef4444' : '#58a6ff'
            }}>
              {status === 'healthy' && t.statusHealthy}
              {status === 'warning' && t.statusWarning}
              {status === 'critical' && t.statusCritical}
              {status === 'resolving' && t.statusResolving}
            </span>
          </div>

          {/* Buttons Controls */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {status === 'healthy' && (
              <button className="btn btn-primary" onClick={triggerLoadTest} style={{ background: '#ef4444', color: '#fff' }}>
                <i className="fa-solid fa-gauge-high"></i> {t.btnLoadTest}
              </button>
            )}
            {status === 'critical' && (
              <button className="btn btn-primary" onClick={triggerAutoscale} style={{ background: '#22c55e', color: '#fff' }}>
                <i className="fa-solid fa-server"></i> {t.btnAutoscale}
              </button>
            )}
            {status === 'warning' && (
              <button className="btn btn-primary" disabled style={{ opacity: 0.6 }}>
                <i className="fa-solid fa-spinner fa-spin"></i> Triggering Alert...
              </button>
            )}
            {status === 'resolving' && (
              <button className="btn btn-primary" disabled style={{ opacity: 0.6 }}>
                <i className="fa-solid fa-spinner fa-spin"></i> Scaling Up Nodes...
              </button>
            )}
            <button className="btn btn-secondary" onClick={resetSimulator} disabled={status === 'resolving'}>
              <i className="fa-solid fa-rotate-left"></i> {t.btnReset}
            </button>
          </div>
        </div>

        {/* Dashboard Grid Panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '28px' }}>
          
          {/* Panel 1: CPU */}
          <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>
              <span>{t.charts.cpu}</span>
              <span style={{ fontFamily: 'monospace', color: cpu > 80 ? '#ef4444' : '#22c55e' }}>{cpu}%</span>
            </div>
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path
                  d={generateSvgPath(cpuHistory, 100)}
                  fill="none"
                  stroke={cpu > 80 ? '#ef4444' : '#22c55e'}
                  strokeWidth="2"
                  style={{ transition: 'all 0.1s linear' }}
                />
              </svg>
            </div>
          </div>

          {/* Panel 2: RAM */}
          <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>
              <span>{t.charts.ram}</span>
              <span style={{ fontFamily: 'monospace', color: ram > 75 ? '#eab308' : '#22c55e' }}>{ram}%</span>
            </div>
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path
                  d={generateSvgPath(ramHistory, 100)}
                  fill="none"
                  stroke={ram > 75 ? '#eab308' : '#22c55e'}
                  strokeWidth="2"
                  style={{ transition: 'all 0.1s linear' }}
                />
              </svg>
            </div>
          </div>

          {/* Panel 3: Network */}
          <div className="card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>
              <span>{t.charts.net}</span>
              <span style={{ fontFamily: 'monospace', color: '#58a6ff' }}>{network} Mbps</span>
            </div>
            <div style={{ height: '80px', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <path
                  d={generateSvgPath(networkHistory, 300)}
                  fill="none"
                  stroke="#58a6ff"
                  strokeWidth="2"
                  style={{ transition: 'all 0.1s linear' }}
                />
              </svg>
            </div>
          </div>

        </div>

        {/* Grid for Alerts Log and Distributed Tracing */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Alerts Log Panel */}
          <div className="card" style={{ background: 'var(--bg-deep)', padding: '20px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
              <i className="fa-solid fa-list-check"></i> {t.alertHeader}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '160px', overflowY: 'auto' }}>
              {alerts.slice().reverse().map((alert) => (
                <div key={alert.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.82rem',
                  borderLeft: `3px solid ${alert.type === 'ok' ? '#22c55e' : alert.type === 'warning' ? '#eab308' : alert.type === 'critical' ? '#ef4444' : '#58a6ff'}`,
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.01)',
                  color: alert.type === 'critical' ? '#ff6b6b' : 'var(--text-main)'
                }}>
                  <span style={{ opacity: 0.5, fontFamily: 'monospace' }}>[{alert.time}]</span>
                  <span style={{ fontWeight: 600 }}>{alert.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distributed Tracing Panel */}
          <div className="card" style={{ background: 'var(--bg-deep)', padding: '20px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '0.05em' }}>
              <i className="fa-solid fa-route"></i> {t.traceHeader}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '160px', overflowY: 'auto' }}>
              {traces.map((trace) => (
                <div key={trace.id} style={{
                  background: 'rgba(255,255,255,0.01)',
                  padding: '10px 14px',
                  borderLeft: `3px solid ${trace.status >= 500 ? '#ef4444' : '#22c55e'}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                    <div>
                      <span style={{
                        fontWeight: 800,
                        color: trace.method === 'GET' ? '#61afef' : trace.method === 'POST' ? '#98c379' : '#e5c07b',
                        marginRight: '6px'
                      }}>{trace.method}</span>
                      <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-main)' }}>{trace.path}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                      <span style={{ color: trace.status >= 500 ? '#ef4444' : '#22c55e', fontWeight: 700, marginRight: '8px' }}>
                        {trace.status}
                      </span>
                      <span style={{ fontFamily: 'monospace', opacity: 0.6 }}>
                        {trace.duration}ms
                      </span>
                    </div>
                  </div>

                  {/* Waterfall Spans */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px', borderLeft: '1px dashed var(--border)' }}>
                    {trace.spans.map((span, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem' }}>
                        <span style={{ width: '80px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.8 }}>
                          {span.name}
                        </span>
                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
                          <div style={{
                            position: 'absolute',
                            left: `${sIdx * 10}%`,
                            width: `${span.pct}%`,
                            maxWidth: `${100 - (sIdx * 10)}%`,
                            height: '100%',
                            background: span.color,
                            borderRadius: '3px'
                          }}></div>
                        </div>
                        <span style={{ fontSize: '0.65rem', opacity: 0.5, fontFamily: 'monospace', width: '35px', textAlign: 'right' }}>
                          {span.duration}ms
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Telegram Overlay Mockup */}
        {showTelegram && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '320px',
            background: '#182533', // Telegram dark blue theme
            border: '1px solid #2b394a',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            zIndex: 1000,
            overflow: 'hidden',
            animation: 'slide-in-right 0.3s ease-out',
            textAlign: 'left'
          }}>
            <div style={{ background: '#202b36', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #24313f' }}>
              <i className="fa-brands fa-telegram" style={{ color: '#54a9eb', fontSize: '1.4rem' }}></i>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>{t.tgTitle}</span>
              <button 
                onClick={() => setShowTelegram(false)} 
                style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', opacity: 0.6 }}
              >&times;</button>
            </div>
            <div style={{ padding: '14px', fontSize: '0.78rem', color: '#f5f5f5', lineHeight: '1.5' }}>
              {t.tgBody}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ObservabilitySimulator;
