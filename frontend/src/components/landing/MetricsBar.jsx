import React from 'react';

export const MetricsBar = () => {
  const metrics = [
    { value: '10K+', label: 'Verified Freelancers' },
    { value: '25K+', label: 'Projects Completed' },
    { value: '92%', label: 'Client Satisfaction' },
    { value: '$40M+', label: 'Freelancer Earnings' }
  ];

  return (
    <section className="metrics-section">
      <div className="metrics-grid">
        {metrics.map((item, idx) => (
          <div key={idx} className="metric-item">
            <span className="metric-value">{item.value}</span>
            <span className="metric-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
