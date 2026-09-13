export const skillsList = [
    {
      name: "Ethereum & Solana RPC",
      icon: "fa-brands fa-ethereum",
      desc: {
        id: "Manajemen node RPC eksekusi & konsensus (Geth, Nethermind, Prysm) dengan high-availability failover.",
        en: "Managing execution & consensus RPC nodes (Geth, Nethermind, Prysm) with high-availability failover."
      }
    },
    {
      name: "Docker & Kubernetes",
      icon: "fa-brands fa-docker",
      desc: {
        id: "Orkestrasi kontainer kluster validator blockchain dan microservices dApp terdesentralisasi.",
        en: "Container orchestration for blockchain validator clusters and decentralized dApp microservices."
      }
    },
    {
      name: "Smart Contract CI/CD",
      icon: "fa-solid fa-code-commit",
      desc: {
        id: "Otomatisasi build, fuzzing test (Foundry/Hardhat), audit statis (Slither), dan deploy testnet.",
        en: "Automating build, fuzzing test (Foundry/Hardhat), static audit (Slither), and testnet deployments."
      }
    },
    {
      name: "IPFS & Decentralized Storage",
      icon: "fa-solid fa-cubes",
      desc: {
        id: "Penyimpanan metadata terdesentralisasi via IPFS pinning cluster dan gateway terdistribusi.",
        en: "Decentralized metadata storage via IPFS pinning clusters and distributed gateway routing."
      }
    },
    {
      name: "Terraform & Multi-Cloud",
      icon: "fa-solid fa-server",
      desc: {
        id: "Penyediaan infrastruktur cloud (IaC) untuk node validator di Google Cloud & AWS.",
        en: "Infrastructure as Code (IaC) provisioning for blockchain validator nodes across GCP and AWS."
      }
    },
    {
      name: "Grafana & VictoriaMetrics",
      icon: "fa-solid fa-chart-line",
      desc: {
        id: "Observabilitas node real-time: peer count, sync block lag, gas telemetry, dan incident alerting.",
        en: "Real-time node observability: peer counts, sync block lag, gas telemetry, and incident alerting."
      }
    },
    {
      name: "GitLab & GitHub Actions",
      icon: "fa-solid fa-code-merge",
      desc: {
        id: "Perancangan pipeline GitOps otomatis untuk sinkronisasi state kluster dan smart contract.",
        en: "Designing automated GitOps pipelines for cluster state synchronization and smart contracts."
      }
    },
    {
      name: "Security & DevSecOps",
      icon: "fa-solid fa-shield-halved",
      desc: {
        id: "Scanning keamanan bytecode, Slither static analysis, Trivy image scan, dan pengelolaan private key aman.",
        en: "Bytecode security scans, Slither static analysis, Trivy image scans, and secure private key management."
      }
    }
  ];

  export const projectsList = [
    {
      id: 1,
      image: "/projects/pipeline-project.png",
      nameKey: "proj1-name",
      overviewKey: "proj1-overview",
      problemKey: "proj1-problem",
      roleKey: "proj1-role",
      solutionKey: "proj1-solution",
      impactKey: "proj1-impact",
      tools: ["GitLab CI", "Foundry", "Slither", "Solidity", "IPFS", "Docker", "Sepolia"]
    },
    {
      id: 2,
      image: "/projects/observability-project.png",
      nameKey: "proj2-name",
      overviewKey: "proj2-overview",
      problemKey: "proj2-problem",
      roleKey: "proj2-role",
      solutionKey: "proj2-solution",
      impactKey: "proj2-impact",
      tools: ["VictoriaMetrics", "Grafana", "Ethereum Geth", "Solana RPC", "Prometheus", "Telegram Alert"]
    },
    {
      id: 3,
      image: "/projects/gitops-project.png",
      nameKey: "proj3-name",
      overviewKey: "proj3-overview",
      problemKey: "proj3-problem",
      roleKey: "proj3-role",
      solutionKey: "proj3-solution",
      impactKey: "proj3-impact",
      tools: ["Kubernetes", "ArgoCD", "Kustomize", "GitOps", "Docker", "Node.js", "NGINX Ingress"]
    }
  ];
