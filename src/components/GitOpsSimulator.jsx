/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const GitOpsSimulator = ({ lang }) => {
  const [env, setEnv] = useState('production'); // 'alpha' | 'beta' | 'production'
  const [app, setApp] = useState('node'); // 'node' | 'python'
  const [syncStatus, setSyncStatus] = useState('synced'); // 'synced' | 'out-of-sync' | 'syncing'
  const [activeTab, setActiveTab] = useState('kustomize'); // 'kustomize' | 'patch' | 'ingress'
  
  // Keep track of deployed environment & app to show in the mock browser
  const [deployedEnv, setDeployedEnv] = useState('production');
  const [deployedApp, setDeployedApp] = useState('node');
  
  // Pods representation: array of pods objects { id, status: 'old' | 'new' | 'terminating', healthy: boolean }
  const [pods, setPods] = useState([
    { id: 'pod-prod-1', status: 'new', healthy: true },
    { id: 'pod-prod-2', status: 'new', healthy: true },
    { id: 'pod-prod-3', status: 'new', healthy: true }
  ]);

  const [consoleLogs, setConsoleLogs] = useState([
    "[SYSTEM] GitOps Controller initialized.",
    "[INFO] Kubernetes cluster connection established (gke_renaldy-prod_asia-southeast2).",
    "[INFO] Monitoring Git repository for changes...",
    "[SUCCESS] Cluster state matches Git head. Status: SYNCED."
  ]);

  const consoleEndRef = useRef(null);
  const syncTimeoutRef = useRef(null);
  const logIntervalRef = useRef(null);

  // Auto scroll console logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    };
  }, []);

  const translations = {
    id: {
      title: "Simulator <span class='gradient-text'>GitOps & Kustomize</span>",
      subtitle: "Simulasikan sinkronisasi otomatis GitOps (ArgoCD/Flux-style) dan manajemen konfigurasi Kubernetes menggunakan Kustomize overlays.",
      envLabel: "Pilih Environment (Overlay):",
      appLabel: "Pilih Aplikasi:",
      btnSync: "Commit & Sync (GitOps)",
      syncStatusText: "Status Rekonsiliasi:",
      argocdStatus: "Status ArgoCD:",
      activePods: "Status Cluster Kubernetes (Pods):",
      mockBrowserTitle: "Preview Browser (Inbound Ingress Routing)",
      ingressHost: "Host Ingress:",
      gitopsConsole: "Log Agen GitOps",
      statusText: {
        synced: "SYNCED (TER-SINKRONISASI)",
        'out-of-sync': "OUT OF SYNC (TIDAK SINKRON)",
        syncing: "SYNCING (SEDANG REKONSILIASI...)"
      },
      envDetails: {
        alpha: "Alpha Env - Internal Testing (1 Replika, Resource Limit Rendah)",
        beta: "Beta Env - staging/QAs (2 Replika, Resource Limit Sedang)",
        production: "Production Env - Live Traffic (3 Replika, Resource Limit Tinggi, High-Availability)"
      },
      browserWelcome: "Selamat datang di aplikasi Web ter-deploy!",
      browserHostInfo: "Dihosting pada Kubernetes pod:",
      browserStatus: "Status Koneksi DB: Sehat & Aktif",
      browserVersion: "Versi Aset:"
    },
    en: {
      title: "Interactive <span class='gradient-text'>GitOps & Kustomize Simulator</span>",
      subtitle: "Simulate GitOps automatic synchronization (ArgoCD/Flux-style) and Kubernetes configuration management using Kustomize overlays.",
      envLabel: "Select Environment (Overlay):",
      appLabel: "Select Application:",
      btnSync: "Commit & Sync (GitOps)",
      syncStatusText: "Reconciliation Status:",
      argocdStatus: "ArgoCD Status:",
      activePods: "Kubernetes Cluster State (Pods):",
      mockBrowserTitle: "Browser Preview (Inbound Ingress Routing)",
      ingressHost: "Ingress Host:",
      gitopsConsole: "GitOps Agent Log Output",
      statusText: {
        synced: "SYNCED",
        'out-of-sync': "OUT OF SYNC",
        syncing: "SYNCING..."
      },
      envDetails: {
        alpha: "Alpha Env - Internal Testing (1 Replica, Low Resource Limit)",
        beta: "Beta Env - staging/QAs (2 Replicas, Medium Resource Limit)",
        production: "Production Env - Live Traffic (3 Replicas, High Resource Limit, High-Availability)"
      },
      browserWelcome: "Welcome to the deployed web application!",
      browserHostInfo: "Hosted on Kubernetes pod:",
      browserStatus: "DB Connection: Healthy & Connected",
      browserVersion: "Asset Version:"
    }
  };

  const t = translations[lang] || translations['id'];

  // Handle configuration changes
  const handleEnvChange = (e) => {
    const nextEnv = e.target.value;
    setEnv(nextEnv);
    if (nextEnv !== deployedEnv || app !== deployedApp) {
      setSyncStatus('out-of-sync');
      setConsoleLogs(prev => [
        ...prev,
        `[WARNING] Drift detected! Git repository configured target: [${app}-app in env: ${nextEnv}], but live cluster is running: [${deployedApp}-app in env: ${deployedEnv}].`,
        `[WARNING] ArgoCD status marked as: OUT OF SYNC.`
      ]);
    } else {
      setSyncStatus('synced');
    }
  };

  const handleAppChange = (e) => {
    const nextApp = e.target.value;
    setApp(nextApp);
    if (env !== deployedEnv || nextApp !== deployedApp) {
      setSyncStatus('out-of-sync');
      setConsoleLogs(prev => [
        ...prev,
        `[WARNING] Drift detected! Git repository configured target: [${nextApp}-app in env: ${env}], but live cluster is running: [${deployedApp}-app in env: ${deployedEnv}].`,
        `[WARNING] ArgoCD status marked as: OUT OF SYNC.`
      ]);
    } else {
      setSyncStatus('synced');
    }
  };

  // Kustomize YAML generation helper
  const getYamlContent = () => {
    const replicasCount = env === 'alpha' ? 1 : env === 'beta' ? 2 : 3;
    const namespace = `${env}-web`;
    const imageTag = app === 'node' ? 'node-v2.1.0-alpine' : 'python-v3.10-slim';
    const cpuLimit = env === 'alpha' ? '100m' : env === 'beta' ? '250m' : '500m';
    const ramLimit = env === 'alpha' ? '128Mi' : env === 'beta' ? '256Mi' : '512Mi';
    const port = app === 'node' ? 3000 : 5000;
    const appName = `${app}-web-app`;

    if (activeTab === 'kustomize') {
      return `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

# Base manifests inheritance
resources:
  - ../../base

# Namespace overlay overrides
namespace: ${namespace}

# Common tags applied dynamically
images:
  - name: internal-registry/app-image
    newName: internal-registry/${app}-app
    newTag: "${imageTag}"

# Deployment overlay patch modifications
patches:
  - path: deployment-patch.yaml
  - path: ingress.yaml`;
    } else if (activeTab === 'patch') {
      return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
spec:
  replicas: ${replicasCount}
  template:
    spec:
      containers:
        - name: web-container
          ports:
            - containerPort: ${port}
          resources:
            limits:
              cpu: "${cpuLimit}"
              memory: "${ramLimit}"
            requests:
              cpu: "50m"
              memory: "64Mi"`;
    } else {
      return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${appName}-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
    - host: ${app}-app.${env}.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: ${appName}-service
                port:
                  number: 80`;
    }
  };

  // Perform GitOps sync simulation
  const startGitOpsSync = () => {
    if (syncStatus === 'syncing') return;

    setSyncStatus('syncing');
    setConsoleLogs(prev => [
      ...prev,
      `[SYSTEM] Action: User triggered 'Commit & Sync' workflow...`,
      `[INFO] Git Commit: push new configuration to branch 'master'`,
      `[INFO] Commit SHA: 8f2a1b9c8e7d8f - Author: Renaldy Imran Hermawan`,
      `[INFO] GitOps webhook received. Parsing overlays/${env}/ configuration...`,
      `[INFO] ArgoCD controller detected revision 8f2a1b9c8e7d8f. Initiating reconciliation...`
    ]);

    // Setup visual representation of rolling update
    const targetReplicaCount = env === 'alpha' ? 1 : env === 'beta' ? 2 : 3;
    
    // Mark existing pods as 'terminating'
    setPods(prev => prev.map(p => ({ ...p, status: 'terminating' })));

    // Sequential steps of ArgoCD Sync
    let logIndex = 0;
    const reconciliationLogs = [
      `[INFO] [Sync-1/3] Applying resources to namespace: ${env}-web...`,
      `[INFO] [Sync-1/3] kubectl apply -k overlays/${env}/`,
      `[INFO] [Sync-2/3] Configuration applied. Kubernetes controller starting rolling update...`,
      `[INFO] Kubernetes: Terminating old container instances...`,
      `[INFO] Kubernetes: Spin up replacement pods with image: [internal-registry/${app}-app:${app === 'node' ? 'node-v2.1.0-alpine' : 'python-v3.10-slim'}]`,
      `[INFO] [Sync-3/3] Readiness probe checks executing on namespaces...`,
      `[SUCCESS] Readiness probe: HTTP GET 200 OK on check path '/healthz'. Pods active.`,
      `[SUCCESS] Route registered successfully: Ingress Controller NGINX -> host: [${app}-app.${env}.local]`,
      `[SYSTEM] GitOps Sync cycle: SUCCESS. Desired Git state has successfully reconciled with cluster status.`
    ];

    // Trigger visual pod modifications
    setTimeout(() => {
      // Create new pods in "connecting/syncing" state
      const newPods = Array.from({ length: targetReplicaCount }).map((_, idx) => ({
        id: `pod-new-${idx}-${Date.now()}`,
        status: 'syncing',
        healthy: false
      }));
      setPods(prev => [
        ...prev.filter(p => p.status === 'terminating'), // keep terminating
        ...newPods
      ]);
    }, 1200);

    // Fade out terminating pods
    setTimeout(() => {
      setPods(prev => prev.filter(p => p.status !== 'terminating'));
    }, 2500);

    // Make new pods healthy
    setTimeout(() => {
      setPods(prev => prev.map(p => p.status === 'syncing' ? { ...p, status: 'new', healthy: true } : p));
    }, 3200);

    // Console logs animation interval
    logIntervalRef.current = setInterval(() => {
      if (logIndex < reconciliationLogs.length) {
        setConsoleLogs(prev => [...prev, reconciliationLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logIntervalRef.current);
      }
    }, 450);

    // Final Sync success
    syncTimeoutRef.current = setTimeout(() => {
      setSyncStatus('synced');
      setDeployedEnv(env);
      setDeployedApp(app);
      setConsoleLogs(prev => [
        ...prev,
        `[SUCCESS] Cluster state updated. ArgoCD status is now: SYNCED.`
      ]);
    }, 4200);
  };

  const resetGitOps = () => {
    if (syncStatus === 'syncing') return;
    setEnv('production');
    setApp('node');
    setDeployedEnv('production');
    setDeployedApp('node');
    setSyncStatus('synced');
    setPods([
      { id: 'pod-prod-1', status: 'new', healthy: true },
      { id: 'pod-prod-2', status: 'new', healthy: true },
      { id: 'pod-prod-3', status: 'new', healthy: true }
    ]);
    setConsoleLogs([
      "[SYSTEM] GitOps Controller initialized.",
      "[INFO] Kubernetes cluster connection established (gke_renaldy-prod_asia-southeast2).",
      "[INFO] Monitoring Git repository for changes...",
      "[SUCCESS] Cluster state matches Git head. Status: SYNCED."
    ]);
  };

  return (
    <section id="gitops-simulator" className="reveal active">
      <div className="section-title">
        <h2 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p>{t.subtitle}</p>
      </div>

      <div className="card gitops-card-container" style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        
        {/* Top Configurations selectors & button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Env Overlay Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>{t.envLabel}</label>
              <select 
                value={env} 
                onChange={handleEnvChange}
                disabled={syncStatus === 'syncing'}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: syncStatus === 'syncing' ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="alpha">alpha-web</option>
                <option value="beta">beta-web</option>
                <option value="production">production-web</option>
              </select>
            </div>

            {/* App Target Switcher */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>{t.appLabel}</label>
              <select 
                value={app} 
                onChange={handleAppChange}
                disabled={syncStatus === 'syncing'}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: syncStatus === 'syncing' ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="node">Node.js Web App</option>
                <option value="python">Python API</option>
              </select>
            </div>
          </div>

          {/* Sync Trigger Action Button */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button 
              className="btn btn-primary"
              onClick={startGitOpsSync}
              disabled={syncStatus === 'syncing' || syncStatus === 'synced'}
              style={{
                background: syncStatus === 'synced' ? 'rgba(34, 197, 94, 0.2)' : syncStatus === 'syncing' ? 'var(--primary-glow)' : 'var(--primary)',
                borderColor: syncStatus === 'synced' ? 'rgba(34, 197, 94, 0.4)' : syncStatus === 'syncing' ? 'var(--primary)' : 'var(--primary)',
                color: syncStatus === 'synced' ? '#22c55e' : '#fff',
                opacity: syncStatus === 'synced' ? 0.8 : 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: (syncStatus === 'syncing' || syncStatus === 'synced') ? 'not-allowed' : 'pointer'
              }}
            >
              {syncStatus === 'syncing' ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Syncing...
                </>
              ) : syncStatus === 'synced' ? (
                <>
                  <i className="fa-solid fa-cloud-arrow-up"></i> Synchronized
                </>
              ) : (
                <>
                  <i className="fa-brands fa-git-alt" style={{ fontSize: '1.1rem' }}></i> {t.btnSync}
                </>
              )}
            </button>
            <button 
              className="btn btn-secondary"
              onClick={resetGitOps}
              disabled={syncStatus === 'syncing'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <i className="fa-solid fa-rotate-left"></i> Reset
            </button>
          </div>
        </div>

        {/* Selected Environment Narrative description */}
        <div style={{
          background: 'rgba(255,255,255,0.01)',
          borderLeft: '4px solid var(--primary)',
          padding: '12px 18px',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          textAlign: 'left',
          marginBottom: '28px'
        }}>
          <strong>{lang === 'id' ? 'Info Overlay:' : 'Overlay Info:'}</strong> {t.envDetails[env]}
        </div>

        {/* Central Workspace: YAML manifest config + Live Pods controller */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '28px'
        }}>
          
          {/* YAML Config Files Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* Folder Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
              <button 
                onClick={() => setActiveTab('kustomize')}
                style={{
                  padding: '6px 12px',
                  background: activeTab === 'kustomize' ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'kustomize' ? '2px solid var(--primary)' : 'none',
                  color: activeTab === 'kustomize' ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-file-code" style={{ marginRight: '6px' }}></i> {t.tabs.kustomize}
              </button>
              <button 
                onClick={() => setActiveTab('patch')}
                style={{
                  padding: '6px 12px',
                  background: activeTab === 'patch' ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'patch' ? '2px solid var(--primary)' : 'none',
                  color: activeTab === 'patch' ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-file-invoice" style={{ marginRight: '6px' }}></i> {t.tabs.patch}
              </button>
              <button 
                onClick={() => setActiveTab('ingress')}
                style={{
                  padding: '6px 12px',
                  background: activeTab === 'ingress' ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === 'ingress' ? '2px solid var(--primary)' : 'none',
                  color: activeTab === 'ingress' ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-network-wired" style={{ marginRight: '6px' }}></i> {t.tabs.ingress}
              </button>
            </div>

            {/* Config YAML Display Box */}
            <div style={{
              background: 'var(--bg-deep)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              height: '270px',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              lineHeight: '1.5',
              color: '#d4d4d4',
              textAlign: 'left',
              overflowY: 'auto',
              whiteSpace: 'pre'
            }}>
              {getYamlContent()}
            </div>
          </div>

          {/* Pod State Visualizer + ArgoCD Status Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}>
            
            {/* ArgoCD Status panel */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <i className="fa-solid fa-compass"></i> {t.argocdStatus}
              </h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Visual Status Indicator */}
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  background: syncStatus === 'synced' ? 'rgba(34, 197, 94, 0.15)' : syncStatus === 'syncing' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: syncStatus === 'synced' ? '#22c55e' : syncStatus === 'syncing' ? '#3b82f6' : '#f59e0b',
                  border: `1px solid ${syncStatus === 'synced' ? '#22c55e' : syncStatus === 'syncing' ? '#3b82f6' : '#f59e0b'}`
                }}>
                  {syncStatus === 'synced' && <i className="fa-solid fa-circle-check"></i>}
                  {syncStatus === 'syncing' && <i className="fa-solid fa-sync fa-spin"></i>}
                  {syncStatus === 'out-of-sync' && <i className="fa-solid fa-circle-exclamation"></i>}
                </div>
                <div>
                  <div style={{
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    color: syncStatus === 'synced' ? '#22c55e' : syncStatus === 'syncing' ? '#3b82f6' : '#f59e0b'
                  }}>
                    {t.statusText[syncStatus]}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {syncStatus === 'synced' ? 'Git matches Cluster State.' : syncStatus === 'syncing' ? 'Applying overlays changes...' : 'Git configuration drift detected.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Kubernetes Active Pods Panel */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              textAlign: 'left',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <i className="fa-solid fa-cubes"></i> {t.activePods}
              </h4>

              {/* Grid of Pod nodes */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                minHeight: '80px',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {pods.map(pod => {
                  let border = 'var(--border)';
                  let color = 'var(--text-muted)';
                  let bg = 'rgba(255,255,255,0.02)';
                  let pulse = '';

                  // Dynamic color matching the application & environment
                  const envThemeColor = env === 'alpha' ? '#f59e0b' : env === 'beta' ? '#8b5cf6' : '#14b8a6';

                  if (pod.status === 'new' && pod.healthy) {
                    border = envThemeColor;
                    color = envThemeColor;
                    bg = `${envThemeColor}11`;
                  } else if (pod.status === 'syncing') {
                    border = '#3b82f6';
                    color = '#3b82f6';
                    bg = 'rgba(59,130,246,0.05)';
                    pulse = 'pulse-syncing 1s infinite alternate';
                  } else if (pod.status === 'terminating') {
                    border = '#ef4444';
                    color = '#ef4444';
                    bg = 'rgba(239,68,68,0.05)';
                    pulse = 'pulse-terminating 0.6s infinite alternate';
                  }

                  return (
                    <div 
                      key={pod.id} 
                      style={{
                        padding: '10px 14px',
                        border: `2px solid ${border}`,
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        background: bg,
                        color: color,
                        animation: pulse,
                        minWidth: '85px',
                        transition: 'all 0.4s ease'
                      }}
                    >
                      <i className={`fa-solid ${pod.status === 'terminating' ? 'fa-skull-crossbones' : app === 'node' ? 'fa-brands fa-node-js' : 'fa-brands fa-python'}`} style={{ fontSize: '1.3rem' }}></i>
                      <span style={{ fontSize: '0.62rem', fontFamily: 'monospace', fontWeight: 600, opacity: 0.8 }}>
                        {pod.id.substring(0, 12)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Console logs box */}
        <div style={{
          background: 'var(--bg-deep)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '28px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: '8px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 700 }}>
              {t.gitopsConsole}
            </span>
            <span></span>
          </div>

          <div 
            ref={consoleEndRef}
            style={{
              padding: '16px',
              height: '140px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.78rem',
              lineHeight: '1.6',
              color: '#d4d4d4',
              textAlign: 'left'
            }}
          >
            {consoleLogs.map((log, idx) => {
              let logColor = '#c9d1d9';
              if (log.startsWith('[SUCCESS]')) logColor = '#22c55e';
              else if (log.startsWith('[WARNING]')) logColor = '#f59e0b';
              else if (log.startsWith('[SYSTEM]')) logColor = '#d2a8ff';
              else if (log.startsWith('[INFO]')) logColor = '#58a6ff';

              return (
                <div key={idx} style={{ color: logColor }}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ingress Browser Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-window-maximize" style={{ marginRight: '6px' }}></i> {t.mockBrowserTitle}
          </h4>

          {/* Browser frame */}
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            background: '#ffffff'
          }}>
            {/* Address Bar */}
            <div style={{
              background: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }}></span>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#cbd5e1' }}></span>
              </div>
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '4px 14px',
                fontSize: '0.75rem',
                color: '#64748b',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <i className="fa-solid fa-lock" style={{ color: '#22c55e', fontSize: '0.7rem' }}></i>
                <span>https://{deployedApp}-app.{deployedEnv}.local</span>
              </div>
            </div>

            {/* Page content */}
            <div style={{
              padding: '28px',
              minHeight: '140px',
              background: '#090d16', // Slate dark background inside mock app
              color: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              {/* App Welcome Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: deployedEnv === 'alpha' ? 'rgba(245, 158, 11, 0.1)' : deployedEnv === 'beta' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(20, 184, 166, 0.1)',
                border: `1px solid ${deployedEnv === 'alpha' ? '#f59e0b' : deployedEnv === 'beta' ? '#8b5cf6' : '#14b8a6'}`,
                padding: '8px 16px',
                borderRadius: '30px'
              }}>
                <i className={`fa-solid ${deployedApp === 'node' ? 'fa-brands fa-node-js' : 'fa-brands fa-python'}`} style={{
                  color: deployedEnv === 'alpha' ? '#f59e0b' : deployedEnv === 'beta' ? '#8b5cf6' : '#14b8a6',
                  fontSize: '1.4rem'
                }}></i>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'capitalize' }}>
                    {deployedApp === 'node' ? 'Node.js App Server' : 'Python Web Service'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    Environment: <strong style={{ color: deployedEnv === 'alpha' ? '#f59e0b' : deployedEnv === 'beta' ? '#8b5cf6' : '#14b8a6' }}>{deployedEnv.toUpperCase()}</strong>
                  </div>
                </div>
              </div>

              {/* Dynamic app response text */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600 }}>{t.browserWelcome}</p>
                <div style={{
                  fontSize: '0.7rem',
                  fontFamily: 'monospace',
                  color: '#94a3b8',
                  marginTop: '8px',
                  display: 'flex',
                  gap: '6px',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '6px 12px',
                  borderRadius: '4px'
                }}>
                  <span>{t.browserHostInfo}</span>
                  <span style={{ color: '#38bdf8' }}>{deployedApp}-app-{deployedEnv === 'alpha' ? '8abc' : deployedEnv === 'beta' ? '4xyz' : '9prq'}-pod-1</span>
                </div>
              </div>

              {/* Status details footer inside mock browser */}
              <div style={{
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                color: '#64748b',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '10px',
                marginTop: '10px'
              }}>
                <span style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
                  {t.browserStatus}
                </span>
                <span>
                  {t.browserVersion} <strong style={{ color: '#f1f5f9' }}>{deployedApp === 'node' ? 'v2.1.0' : 'v3.10'}</strong>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GitOpsSimulator;
