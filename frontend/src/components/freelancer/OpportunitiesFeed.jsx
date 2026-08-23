import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateProjectMatch } from '../../utils/matchEngine';
import { BackToDashboardButton } from '../common/BackToDashboardButton';

export const OpportunitiesFeed = () => {
  const { activeProjectsList, freelancerProfile, navigateTo, setSelectedProject, appliedProjectIds, submitProposal } = useApp();

  return (
    <div className="dashboard-main">
      <BackToDashboardButton
        label="Back to Dashboard"
        fallbackView="freelancer-dashboard"
        breadcrumbs={[
          { label: 'Tailored Opportunities' }
        ]}
      />

      <div className="dashboard-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} /> AI Tailored Opportunities
        </div>
        <h1 className="dashboard-title">Opportunities Matching You</h1>
        <p className="dashboard-subtitle">
          Projects tailored specifically to your verified skills, Career Score, and current availability schedule.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {activeProjectsList.map((proj) => {
          const hasApplied = appliedProjectIds.includes(proj.id);
          const matchData = calculateProjectMatch(proj, freelancerProfile);
          return (
            <div
              key={proj.id}
              className="card card-hover"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 0.7fr',
                gap: '2rem',
                padding: '1.75rem',
                borderLeft: '4px solid #1E40AF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {proj.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Posted {proj.postedAgo} • {proj.applicantsCount} applicants
                  </span>
                </div>

                <h3
                  onClick={() => {
                    setSelectedProject(proj);
                    navigateTo('project-detail');
                  }}
                  style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer', marginBottom: '0.5rem' }}
                >
                  {proj.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {proj.description}
                </p>

                {/* Required Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {proj.requiredSkills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#F1F5F9',
                        color: '#334155',
                        padding: '0.25rem 0.55rem',
                        borderRadius: '4px'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Client Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.825rem', color: '#64748B' }}>
                  <img
                    src={proj.client.avatar}
                    alt={proj.client.name}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{proj.client.name}</span>
                  <span>• {proj.client.country}</span>
                  <span>• ★ {proj.client.rating}</span>
                </div>
              </div>

              {/* Match Reasons & CTA */}
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: matchData.matchScore >= 80 ? '#1E40AF' : '#475569' }}>
                      {matchData.matchScore}% Match
                    </span>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                      {proj.budget}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                    Why this matches you:
                  </span>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {matchData.whyMatchReasons.map((r, i) => (
                      <li key={i} style={{ fontSize: '0.775rem', color: r.startsWith('⚠') ? '#B45309' : '#334155', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                        <CheckCircle2 size={13} color={r.startsWith('⚠') ? '#F59E0B' : '#059669'} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{r.replace(/^✓\s*/, '').replace(/^⚠\s*/, '').replace(/^⚡\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedProject(proj);
                      navigateTo('project-detail');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Project
                  </button>
                  <button
                    onClick={() => {
                      if (!hasApplied) {
                        submitProposal(proj.id, {});
                      }
                    }}
                    className={`btn ${hasApplied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                    style={{ flex: 1 }}
                  >
                    {hasApplied ? 'Applied ✓' : 'Submit Proposal'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
