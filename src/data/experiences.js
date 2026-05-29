export const experiencesData = [
  {
    id: "job1",
    icon: "fa-solid fa-cubes",
    emoji: "🛠️",
    role: {
      id: "Junior DevOps",
      en: "Junior DevOps"
    },
    company: "NashTa Group",
    type: {
      id: "Kontrak",
      en: "Contract"
    },
    startDate: "2026-02",
    endDate: "present",
    dateText: {
      id: "Feb 2026 - Saat ini",
      en: "Feb 2026 - Present"
    },
    titleKey: "exp-job1",
    descKey: "exp-job1-desc",
    chatbotSummary: {
      id: "CI/CD GitLab CI, SonarQube, observability Grafana.",
      en: "GitLab CI, SonarQube, Grafana observability."
    }
  },
  {
    id: "job2",
    icon: "fa-solid fa-cloud",
    emoji: "💼",
    role: {
      id: "L1 Cloud Engineer Support",
      en: "L1 Cloud Engineer Support"
    },
    company: "PT. Data Labs Analytics",
    type: null,
    startDate: "2025-01",
    endDate: "2026-01",
    durationMonths: 12,
    dateText: {
      id: "Jan 2025 - Jan 2026",
      en: "Jan 2025 - Jan 2026"
    },
    titleKey: "exp-job2",
    descKey: "exp-job2-desc",
    chatbotSummary: {
      id: "Monitoring AWS via CloudWatch, tiket JIRA.",
      en: "JIRA tickets, AWS monitoring."
    }
  },
  {
    id: "job3",
    icon: "fa-solid fa-server",
    emoji: "🎛️",
    role: {
      id: "IT Network Operation Center",
      en: "IT Network Operation Center"
    },
    company: "PT. ACSA",
    type: {
      id: "Kontrak",
      en: "Contract"
    },
    startDate: "2023-10",
    endDate: "2024-09",
    durationMonths: 12,
    dateText: {
      id: "Okt 2023 - Sep 2024",
      en: "Oct 2023 - Sep 2024"
    },
    titleKey: "exp-job3",
    descKey: "exp-job3-desc",
    chatbotSummary: {
      id: "Monitoring kestabilan jaringan Telkomsel.",
      en: "Telkomsel server and network monitoring."
    }
  },
  {
    id: "job4",
    icon: "fa-solid fa-chalkboard-user",
    emoji: "🏫",
    role: {
      id: "Asisten Lab",
      en: "Lab Assistant"
    },
    company: {
      id: "Universitas Bani Saleh",
      en: "Bani Saleh University"
    },
    type: {
      id: "Kontrak",
      en: "Contract"
    },
    startDate: "2022-03",
    endDate: "2023-10",
    durationMonths: 20,
    dateText: {
      id: "Mar 2022 - Okt 2023",
      en: "Mar 2022 - Oct 2023"
    },
    titleKey: "exp-job4",
    descKey: "exp-job4-desc",
    chatbotSummary: {
      id: "Pemeliharaan sistem lab & troubleshooting.",
      en: "Lab system maintenance & troubleshooting."
    }
  },
  {
    id: "job5",
    icon: "fa-solid fa-code",
    emoji: "💻",
    role: {
      id: "Frontend Engineering Program",
      en: "Frontend Engineering Program"
    },
    company: "Ruang Guru",
    type: null,
    startDate: "2023-02",
    endDate: "2023-06",
    durationMonths: 5,
    dateText: {
      id: "2023",
      en: "2023"
    },
    titleKey: "exp-job5",
    descKey: "exp-job5-desc",
    chatbotSummary: {
      id: "Merancang mockup UI web.",
      en: "UI web engineering."
    }
  },
  {
    id: "job6",
    icon: "fa-solid fa-desktop",
    emoji: "🛠️",
    role: {
      id: "IT Support",
      en: "IT Support Staff"
    },
    company: {
      id: "PT Wiraswasta Gemilang Indonesia",
      en: "PT Wiraswasta Gemilang Indonesia"
    },
    companyShort: "PT WGI",
    type: {
      id: "Magang",
      en: "Internship"
    },
    startDate: "2018-02",
    endDate: "2018-04",
    durationMonths: 3,
    dateText: {
      id: "Feb 2018 - Apr 2018",
      en: "Feb 2018 - Apr 2018"
    },
    titleKey: "exp-job6",
    descKey: "exp-job6-desc",
    chatbotSummary: {
      id: "Troubleshooting jaringan LAN/WAN.",
      en: "local network configurations."
    }
  }
];

export const getDurationText = (exp, lang) => {
  let totalMonths = 0;
  if (exp.durationMonths) {
    totalMonths = exp.durationMonths;
  } else {
    const start = new Date(exp.startDate + '-02');
    const end = (!exp.endDate || exp.endDate === 'present') ? new Date() : new Date(exp.endDate + '-02');
    const startYear = start.getFullYear();
    const startMonth = start.getMonth();
    const endYear = end.getFullYear();
    const endMonth = end.getMonth();
    totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let parts = [];
  if (lang === 'id') {
    if (years > 0) parts.push(`${years} tahun`);
    if (months > 0) parts.push(`${months} bulan`);
    return parts.join(' ');
  } else {
    if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
    return parts.join(' ');
  }
};
