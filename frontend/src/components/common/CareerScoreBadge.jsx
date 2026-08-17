import React from 'react';

export const CareerScoreBadge = ({ score = 91, size = 'md', showLabel = true, className = '' }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeMap = {
    sm: { width: 48, height: 48, strokeWidth: 4, fontSize: '0.95rem', subSize: '0.55rem' },
    md: { width: 84, height: 84, strokeWidth: 6, fontSize: '1.45rem', subSize: '0.65rem' },
    lg: { width: 110, height: 110, strokeWidth: 8, fontSize: '1.95rem', subSize: '0.75rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`career-score-gauge-container ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        style={{
          position: 'relative',
          width: `${currentSize.width}px`,
          height: `${currentSize.height}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg
          style={{
            transform: 'rotate(-90deg)',
            width: '100%',
            height: '100%'
          }}
          viewBox="0 0 96 96"
        >
          {/* Background Track Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={currentSize.strokeWidth}
            fill="transparent"
          />
          {/* Active Score Arc */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#1E40AF"
            strokeWidth={currentSize.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.1
          }}
        >
          <span
            style={{
              fontSize: currentSize.fontSize,
              fontWeight: 800,
              color: '#0F172A',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontSize: currentSize.subSize,
              fontWeight: 600,
              color: '#64748B'
            }}
          >
            / 100
          </span>
        </div>
      </div>

      {showLabel && (
        <span
          style={{
            marginTop: '0.35rem',
            fontSize: '0.725rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#475569'
          }}
        >
          Career Score
        </span>
      )}
    </div>
  );
};
