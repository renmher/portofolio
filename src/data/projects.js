export const skillsList = [
    {
      name: "GCP, AWS",
      icon: "fa-solid fa-cloud",
      desc: {
        id: "Mendeploy VM, monitoring via CloudWatch, dan konfigurasi VPC jaringan cloud.",
        en: "Deploying VM instances, monitoring via CloudWatch, and configuring cloud VPC networks."
      }
    },
    {
      name: "Docker, K8s",
      icon: "fa-brands fa-docker",
      desc: {
        id: "Kontainerisasi aplikasi microservices dan mengelola replikasi deployment.",
        en: "Containerizing microservices and managing replicas of application deployments."
      }
    },
    {
      name: "GitLab, GitHub",
      icon: "fa-solid fa-code-merge",
      desc: {
        id: "Membuat alur otomatisasi build/test CI/CD Pipeline dan manajemen repositori.",
        en: "Building automated CI/CD build/test pipelines and repository management."
      }
    },
    {
      name: "TCP/IP, DNS",
      icon: "fa-solid fa-network-wired",
      desc: {
        id: "Diagnosis routing kartu jaringan Telkomsel dan penanganan record DNS di NOC.",
        en: "Diagnosing Telkomsel card routing and managing DNS record resolutions at NOC."
      }
    },
    {
      name: "Terraform",
      icon: "fa-solid fa-server",
      desc: {
        id: "Menulis kode arsitektur (IaC) untuk penyediaan server VPC otomatis.",
        en: "Writing Infrastructure as Code (IaC) to provision VPC servers automatically."
      }
    },
    {
      name: "Linux",
      icon: "fa-brands fa-linux",
      desc: {
        id: "Bash scripting untuk backup otomatis, setup environment, dan administrasi OS.",
        en: "Bash scripting for backups, environment setups, and OS server administration."
      }
    },
    {
      name: "Grafana, VictoriaMetrics",
      icon: "fa-solid fa-chart-line",
      desc: {
        id: "Mengelola log, metrik, sistem alerting, serta analisis performa infrastruktur secara real-time.",
        en: "Managing logs, metrics, alerting systems, and real-time infrastructure performance analysis."
      }
    },
    {
      name: "SonarQube, Harbor, Trivy",
      icon: "fa-solid fa-shield-halved",
      desc: {
        id: "Mendukung keamanan pipeline CI/CD, scanning vulnerability image, dan secure container registry.",
        en: "Supporting CI/CD pipeline security, image vulnerability scanning, and secure container registries."
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
      tools: ["GitLab CI", "Docker", "Harbor", "SonarQube", "Trivy", "Linux"]
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
      tools: ["Grafana", "VictoriaMetrics", "VictoriaLogs", "Node Exporter", "Telegram API"]
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
      tools: ["GitLab CI", "Kubernetes", "Kustomize", "GitOps", "Docker", "Node.js", "Python", "NGINX Ingress"]
    }
  ];
