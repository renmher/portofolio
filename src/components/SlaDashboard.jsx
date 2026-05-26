import React from 'react';

const SlaDashboard = ({ lang }) => {
  const services = [
    { name: 'GCP Compute & VPC', percentage: '99.98%', id: 'gcp', incidents: { 12: 'degraded' } },
    { name: 'AWS EKS Cluster', percentage: '99.95%', id: 'aws', incidents: { 24: 'degraded' } },
    { name: 'GitLab CI/CD Runner', percentage: '100.0%', id: 'gitlab', incidents: {} },
    { name: 'MikroTik Site-to-Site VPN', percentage: '99.90%', id: 'mikrotik', incidents: { 7: 'down' } }
  ];

  const labels = {
    id: {
      title: "Status Layanan & SLA",
      operational: "Operasional",
      overall: "TARGET SLA TERPENUHI (RATA-RATA 99.95%)",
      today: "Hari ini",
      daysAgo: "hari lalu",
      uptime100: "Uptime: 100%",
      uptimeDegraded: "Uptime: 99.1% (Degradasi)",
      uptimeDown: "Uptime: 92.4% (Pemeliharaan)"
    },
    en: {
      title: "Services & SLA Status",
      operational: "Operational",
      overall: "SLA TARGET MET (AVG 99.95%)",
      today: "Today",
      daysAgo: "d ago",
      uptime100: "100% Uptime",
      uptimeDegraded: "99.1% Uptime (Degraded)",
      uptimeDown: "92.4% Uptime (Maintenance)"
    }
  };

  const currentLabels = labels[lang];

  // Helper to generate bars for a service
  const renderBars = (incidents) => {
    const bars = [];
    for (let i = 29; i >= 0; i--) {
      const dayIndex = 29 - i;
      let status = 'operational';
      let uptimeText = currentLabels.uptime100;

      if (incidents[dayIndex] === 'degraded') {
        status = 'degraded';
        uptimeText = currentLabels.uptimeDegraded;
      } else if (incidents[dayIndex] === 'down') {
        status = 'down';
        uptimeText = currentLabels.uptimeDown;
      }

      const relativeTime = i === 0 ? currentLabels.today : `${i} ${currentLabels.daysAgo}`;
      const tooltip = `${relativeTime} • ${uptimeText}`;

      bars.push(
        <div
          key={i}
          className={`service-bar ${status}`}
          data-tooltip={tooltip}
        />
      );
    }
    return bars;
  };

  return (
    <article className="card status-card">
      <h3 className="mb-4">{currentLabels.title}</h3>
      <div className="status-services-list">
        {services.map((service, idx) => (
          <div key={idx} className="status-service-item">
            <div className="service-header">
              <span className="service-name">{service.name}</span>
              <span className="service-percentage">{service.percentage}</span>
            </div>
            <div className="service-bars">
              {renderBars(service.incidents)}
            </div>
            <div className="service-footer">
              <span className="service-status-text operational">
                {currentLabels.operational}
              </span>
              <span className="service-time-ago">30d ago</span>
            </div>
          </div>
        ))}
      </div>
      <div className="status-overall-banner">
        <span className="status-overall-dot"></span>
        <span className="status-overall-text">{currentLabels.overall}</span>
      </div>
    </article>
  );
};

export default SlaDashboard;
