import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const ApplicationsView = () => {
  const {
    navigateTo,
    setSelectedFreelancer,
    toggleShortlist,
    shortlistedFreelancers,
    toggleComparison,
    comparisonList
  } = useApp();

  const [minScore, setMinScore] = useState(85);
  const [filterAvailability, setFilterAvailability] = useState('all');

  const filteredCandidates = FREELANCERS.filter(f => {
    if (f.careerScore < minScore) return false;
    if (filterAvailability === 'available' && !f.available) return false;
    return true;
  });

  return (
    <div className="dashboard-main">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">Applications Received (48)</h1>
          <p className="dashboard-subtitle">
            Review and screen candidate submissions for "React E-Commerce Platform Architecture".
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => navigateTo('comparison')} className="btn btn-secondary btn-sm">
            View Comparison Matrix ({comparisonList.length})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>Min Career Score:</span>
            <select
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600 }}
            >
              <option value={80}>80+ (Good)</option>
              <option value={85}>85+ (High Quality)</option>
              <option value={90}>90+ (Top Tier Elite)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#475569' }}>Availability:</span>
            <select
              value={filterAvailability}
              onChange={e => setFilterAvailability(e.target.value)}
              style={{ padding: '0.35rem 0.65rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.825rem', fontWeight: 600 }}
            >
              <option value="all">All Applicants</option>
              <option value="available">Available Immediately</option>
            </select>
          </div>
        </div>

        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#64748B' }}>
          Showing {filteredCandidates.length} evaluated applicants
        </span>
      </div>

      {/* Candidate Applications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredCandidates.map((candidate) => {
          const isShortlisted = shortlistedFreelancers.includes(candidate.id);
          const isCompared = comparisonList.some(item => item.id === candidate.id);

          return (
            <div
              key={candidate.id}
              className="card card-hover"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.3fr 0.9fr',
                gap: '2rem',
                padding: '1.75rem',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h3
                        onClick={() => {
                          setSelectedFreelancer(candidate);
                          navigateTo('freelancer-profile');
                        }}
                        style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}
                      >
                        {candidate.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: candidate.available ? '#059669' : '#DC2626', backgroundColor: candidate.available ? '#ECFDF5' : '#FEF2F2', padding: '0.1rem 0.45rem', borderRadius: '9999px' }}>
                        {candidate.available ? '🟢 Available' : 'Busy'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{candidate.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#475569', marginTop: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: '#1E40AF' }}>{candidate.hourlyRate}</span>
                      <span>• ★ {candidate.rating} ({candidate.reviewsCount} reviews)</span>
                      <span>• {candidate.projectsCompleted} projects</span>
                    </div>
                  </div>
                </div>

                {/* Verified Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {candidate.topSkills.map((s, idx) => (
                    <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
                  ))}
                </div>
              </div>

              {/* Right Side: Score, Match %, Actions */}
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CareerScoreBadge score={candidate.careerScore} size="sm" showLabel={false} />
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Career Score</span>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>{candidate.careerScore} / 100</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Skill Match</span>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E40AF' }}>{candidate.matchScore}%</div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleShortlist(candidate.id)}
                    className={`btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                    style={{ flex: 1 }}
                  >
                    {isShortlisted ? 'Shortlisted ⭐' : 'Shortlist'}
                  </button>
                  <button
                    onClick={() => toggleComparison(candidate)}
                    className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'} btn-sm`}
                    style={{ flex: 1 }}
                  >
                    {isCompared ? 'Comparing' : 'Compare'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFreelancer(candidate);
                      navigateTo('freelancer-profile');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Profile
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
