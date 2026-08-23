import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Check } from 'lucide-react';

export const SmartMatchBadge = ({
  score = 96,
  reasons = [],
  showDrawer = true,
  candidateName = 'Freelancer',
  className = ''
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`smart-match-badge-wrap ${className}`} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          padding: '0.35rem 0.75rem',
          borderRadius: '8px',
          backgroundColor: score >= 90 ? '#EFF6FF' : '#F8FAFC',
          border: `1.5px solid ${score >= 90 ? '#BFDBFE' : '#E2E8F0'}`,
          color: score >= 90 ? '#1E40AF' : '#475569',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: reasons.length > 0 && showDrawer ? 'pointer' : 'default',
          transition: 'all 0.2s ease'
        }}
      >
        <Sparkles size={14} color="#2563EB" />
        <span>{score}% Match</span>
        {reasons.length > 0 && showDrawer && (
          expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />
        )}
      </button>

      {/* Expanded Match Explainability Popover */}
      {expanded && reasons.length > 0 && showDrawer && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 40,
            width: '300px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1rem',
            boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.12)',
            textAlign: 'left',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
            <Sparkles size={15} color="#2563EB" />
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
              Why {candidateName} is a strong match
            </h4>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: 0, padding: 0 }}>
            {reasons.map((reason, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.45rem',
                  fontSize: '0.775rem',
                  color: '#334155',
                  lineHeight: 1.4
                }}
              >
                <Check size={13} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{reason.replace(/^✓\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
