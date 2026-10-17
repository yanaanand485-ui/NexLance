import React from 'react';

export const CareerScoreBadge = ({ score = 91, size = 'md', showLabel = true, className = '' }) => {
  const fontSizes = {
    sm: { score: '1.05rem', sub: '0.7rem', padding: '0.2rem 0.5rem' },
    md: { score: '1.75rem', sub: '0.85rem', padding: '0.4rem 0.9rem' },
    lg: { score: '2.5rem', sub: '1rem', padding: '0.6rem 1.25rem' }
  };

  const current = fontSizes[size] || fontSizes.md;

  return (
    <div className={`career-score-badge ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
          padding: current.padding,
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px'
        }}
      >
        <span style={{ fontSize: current.score, fontWeight: 800, color: '#1E40AF', lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: current.sub, fontWeight: 600, color: '#64748B' }}>
          /100
        </span>
      </div>

      {showLabel && (
        <span
          style={{
            marginTop: '0.35rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#475569'
          }}
        >
          Career Score
        </span>
      )}
    </div>
  );
};
