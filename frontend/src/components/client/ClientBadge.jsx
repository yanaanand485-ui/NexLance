import React from 'react';

// Basic badge for verified skills
export const VerifiedSkillBadge = ({ skill, score }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '9999px',
        backgroundColor: '#EFF6FF',
        border: '1px solid #BFDBFE',
        color: '#1E40AF',
        fontSize: '0.75rem',
        fontWeight: 600
      }}
    >
      <span>{skill}</span>
      {score && (
        <span
          style={{
            backgroundColor: '#DBEAFE',
            padding: '0.05rem 0.35rem',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 700
          }}
        >
          {score}
        </span>
      )}
    </span>
  );
};

// Basic badge for Career Score
export const CareerScoreBadge = ({ score }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '9999px',
        backgroundColor: '#FEF3C7',
        border: '1px solid #FDE68A',
        color: '#92400E',
        fontSize: '0.75rem',
        fontWeight: 700
      }}
    >
      <span>Score: {score}/100</span>
    </span>
  );
};
