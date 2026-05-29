export const projectsData = [
  {
    id: "proj1",
    icon: "fa-solid fa-server",
    title: {
      id: "Terraform Multi-Cloud VPC",
      en: "Terraform Multi-Cloud VPC"
    },
    desc: {
      id: "Penyediaan infrastruktur otomatis (IaC) untuk jaringan VPC, Subnet, firewall rule, dan VM instances pada platform Google Cloud (GCP) dan AWS.",
      en: "Automated infrastructure provisioning (IaC) for VPC networks, subnets, firewall rules, and VM instances across GCP and AWS platforms."
    },
    tags: ["Terraform", "GCP", "AWS", "IaC"],
    url: "https://github.com/renmher/terraform-multicloud-vpc"
  },
  {
    id: "proj2",
    icon: "fa-brands fa-docker",
    title: {
      id: "Kubernetes GitOps (ArgoCD)",
      en: "Kubernetes GitOps (ArgoCD)"
    },
    desc: {
      id: "Continuous Delivery otomatis untuk aplikasi microservices menggunakan ArgoCD di kluster Kubernetes dengan kustomisasi manifest via Helm Charts.",
      en: "Automated Continuous Delivery for microservices applications using ArgoCD on Kubernetes clusters with manifest customization via Helm Charts."
    },
    tags: ["Kubernetes", "ArgoCD", "Helm", "GitOps"],
    url: "https://github.com/renmher/k8s-gitops-manifests"
  },
  {
    id: "proj3",
    icon: "fa-solid fa-code-branch",
    title: {
      id: "CI/CD Security Automation",
      en: "CI/CD Security Automation"
    },
    desc: {
      id: "Otomatisasi build, testing, vulnerability scanning (Trivy), analisis kualitas kode (SonarQube), dan deployment otomatis menggunakan GitLab CI.",
      en: "Automated building, testing, image vulnerability scanning (Trivy), code quality analysis (SonarQube), and deployment using GitLab CI."
    },
    tags: ["GitLab CI", "Trivy", "SonarQube", "Docker"],
    url: "https://github.com/renmher/gitlab-cicd-pipeline"
  },
  {
    id: "proj4",
    icon: "fa-solid fa-gears",
    title: {
      id: "Ansible Configuration Management",
      en: "Ansible Configuration Management"
    },
    desc: {
      id: "Playbook Ansible untuk deployment server Nginx, setup firewall (UFW), manajemen user SSH key, dan Docker environment provisioning secara massal.",
      en: "Ansible playbooks for mass Nginx deployment, firewall (UFW) setup, SSH key user management, and Docker environment provisioning."
    },
    tags: ["Ansible", "Nginx", "Linux", "SSH"],
    url: "https://github.com/renmher/ansible-server-setup"
  }
];
