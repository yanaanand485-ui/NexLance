import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VerifiedBadge = ({
  skillName,
  score = null,
  percentile = null,
  size = 'md',
  showScore = true,
  className = ''
}) => {
  return (
    <div
      className={`verified-skill-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: size === 'sm' ? '0.2rem 0.6rem' : '0.35rem 0.8rem',
        borderRadius: '9999px',
        backgroundColor: '#EFF6FF',
        border: '1px solid #BFDBFE',
        color: '#1E40AF',
        fontSize: size === 'sm' ? '0.75rem' : '0.825rem',
        fontWeight: 600
      }}
    >
      <CheckCircle2 size={size === 'sm' ? 13 : 15} color="#1D4ED8" strokeWidth={2.5} />
      <span>{skillName}</span>
      {showScore && score && (
        <span
          style={{
            backgroundColor: '#DBEAFE',
            color: '#1E3A8A',
            padding: '0.1rem 0.4rem',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontWeight: 700
          }}
        >
          {score}/100
        </span>
      )}
      {percentile && (
        <span style={{ fontSize: '0.7rem', color: '#3B82F6', fontWeight: 500 }}>
          ({percentile})
        </span>
      )}
    </div>
  );
};
