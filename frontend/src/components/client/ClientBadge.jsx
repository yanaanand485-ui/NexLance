import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

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
      <CheckCircle2 size={13} color="#2563EB" strokeWidth={2.5} />
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
      <Star size={12} fill="#F59E0B" color="#F59E0B" />
      <span>Score: {score}/100</span>
    </span>
  );
};

// Basic badge for project status
export const StatusBadge = ({ status }) => {
  const isCompleted = status === 'Completed';
  const isInProgress = status === 'In Progress' || status === 'Active';

  const bgColor = isCompleted ? '#DCFCE7' : isInProgress ? '#EFF6FF' : '#FEF3C7';
  const textColor = isCompleted ? '#166534' : isInProgress ? '#1E40AF' : '#92400E';
  const borderColor = isCompleted ? '#BBF7D0' : isInProgress ? '#BFDBFE' : '#FDE68A';

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        borderRadius: '9999px',
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        fontSize: '0.75rem',
        fontWeight: 700
      }}
    >
      {status || 'Open'}
    </span>
  );
};
