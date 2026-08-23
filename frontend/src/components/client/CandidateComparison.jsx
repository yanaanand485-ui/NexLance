import React, { useState } from 'react';
import {
  Columns,
  CheckCircle2,
  Star,
  Send,
  Plus,
  Users,
  Check,
  X,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { FREELANCERS } from '../../data/mockData';

export const CandidateComparison = () => {
  const {
    comparisonList,
    setComparisonList,
    toggleComparison,
    navigateTo,
    setSelectedFreelancer,
    toggleShortlist,
    shortlistedFreelancers,
    showToast
  } = useApp();

  const [filterDomain, setFilterDomain] = useState('All');

  // Domain categories filter for the 6 freelancers
  const domains = ['All', 'Full-Stack', 'UI/UX Design', 'Cloud & DevOps', 'AI & ML', 'Mobile', 'Backend & DB'];

  const filteredPool = FREELANCERS.filter(f => {
    if (filterDomain === 'All') return true;
    if (filterDomain === 'Full-Stack') return f.title.toLowerCase().includes('full-stack') || f.title.toLowerCase().includes('react');
    if (filterDomain === 'UI/UX Design') return f.title.toLowerCase().includes('design') || f.title.toLowerCase().includes('product');
    if (filterDomain === 'Cloud & DevOps') return f.title.toLowerCase().includes('cloud') || f.title.toLowerCase().includes('devops');
    if (filterDomain === 'AI & ML') return f.title.toLowerCase().includes('ai') || f.title.toLowerCase().includes('ml');
    if (filterDomain === 'Mobile') return f.title.toLowerCase().includes('mobile') || f.title.toLowerCase().includes('flutter');
    if (filterDomain === 'Backend & DB') return f.title.toLowerCase().includes('backend') || f.title.toLowerCase().includes('architect');
    return true;
  });

  const handleSelectTop3 = () => {
    // Select top 3 highest matching candidates
    const top3 = [...FREELANCERS].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)).slice(0, 3);
    setComparisonList(top3);
    showToast('Loaded Top 3 candidates into comparison matrix', 'success');
  };

  const handleClearAll = () => {
    setComparisonList([]);
    showToast('Cleared comparison matrix selection', 'info');
  };

  const comparisonRows = [
    {
      label: 'Career Score',
      render: (f) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <CareerScoreBadge score={f.careerScore} size="sm" showLabel={false} />
          <span style={{ fontSize: '0.725rem', color: '#1E40AF', fontWeight: 700 }}>
            {f.careerScore >= 93 ? 'Top 1% Global' : f.careerScore >= 90 ? 'Top 5% Global' : 'Top 10% Global'}
          </span>
        </div>
      )
    },
    {
      label: 'Smart Match Score',
      render: (f) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E40AF' }}>
            {f.matchScore}%
          </span>
          <div style={{ width: '80px', height: '5px', backgroundColor: '#EFF6FF', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: `${f.matchScore}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
          </div>
        </div>
      )
    },
    {
      label: 'Client Rating & Reviews',
      render: (f) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', fontWeight: 700, color: '#0F172A' }}>
          <Star size={15} fill="#D97706" color="#D97706" />
          <span>{f.rating}</span>
          <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>({f.reviewsCount} reviews)</span>
        </div>
      )
    },
    {
      label: 'Client Satisfaction',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#059669', fontSize: '1.05rem' }}>
          {f.clientSatisfaction}%
        </span>
      )
    },
    {
      label: 'Timely Delivery Record',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#1E40AF', fontSize: '1.05rem' }}>
          {f.onTimeDelivery}%
        </span>
      )
    },
    {
      label: 'Work Quality Score',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
          {f.workQuality}%
        </span>
      )
    },
    {
      label: 'Hourly Rate / Budget',
      render: (f) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.95rem' }}>
            {f.hourlyRate}
          </span>
          <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Verified Benchmark</span>
        </div>
      )
    },
    {
      label: 'Availability & Bandwidth',
      render: (f) => (
        <span style={{
          fontSize: '0.775rem',
          fontWeight: 700,
          color: f.available ? '#059669' : '#DC2626',
          backgroundColor: f.available ? '#ECFDF5' : '#FEF2F2',
          padding: '0.25rem 0.6rem',
          borderRadius: '9999px',
          display: 'inline-block'
        }}>
          {f.availabilityBadge}
        </span>
      )
    },
    {
      label: 'Verified Projects Delivered',
      render: (f) => (
        <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>
          {f.projectsCompleted} Enterprise Projects
        </span>
      )
    },
    {
      label: 'Top Verified Skills',
      render: (f) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'center' }}>
          {f.topSkills.map((s, idx) => (
            <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
          ))}
        </div>
      )
    },
    {
      label: 'Best Match Strengths',
      render: (f) => (
        <div style={{ textAlign: 'left', fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, padding: '0 0.5rem' }}>
          {(f.whyMatch || []).slice(0, 3).map((point, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.35rem', marginBottom: '0.35rem' }}>
              <CheckCircle2 size={13} color="#16A34A" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <span>{point}</span>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-main">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF' }}>
              <Columns size={20} />
            </div>
            <h1 className="dashboard-title" style={{ fontSize: '2rem' }}>Candidate Comparison Matrix</h1>
          </div>
          <p className="dashboard-subtitle" style={{ maxWidth: '720px', fontSize: '0.95rem' }}>
            Choose up to <strong>3 candidates</strong> from the talent pool below to compare their verified skills, Career Score, client ratings, and hourly rates side by side.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleSelectTop3}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Sparkles size={14} color="#1E40AF" /> Select Top 3
          </button>
          {comparisonList.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn btn-sm"
              style={{ fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0' }}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* SECTION 1: Candidate Pool Selector (6 Freelancers Pool) */}
      <div className="candidate-pool-container">
        <div className="candidate-pool-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Choose Candidates to Compare
            </h2>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: comparisonList.length === 3 ? '#EFF6FF' : '#F1F5F9',
              color: comparisonList.length === 3 ? '#1E40AF' : '#475569',
              fontWeight: 700,
              fontSize: '0.8rem',
              border: `1px solid ${comparisonList.length === 3 ? '#BFDBFE' : '#E2E8F0'}`
            }}>
              <Users size={13} /> Selected: {comparisonList.length} / 3
            </span>
          </div>

          {/* Domain Filter Pills */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setFilterDomain(d)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '9999px',
                  border: '1px solid',
                  borderColor: filterDomain === d ? '#1E40AF' : '#E2E8F0',
                  backgroundColor: filterDomain === d ? '#EFF6FF' : '#FFFFFF',
                  color: filterDomain === d ? '#1E40AF' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Freelancers Grid */}
        <div className="candidate-pool-grid">
          {filteredPool.map(freelancer => {
            const isSelected = comparisonList.some(item => item.id === freelancer.id);
            const slotIndex = isSelected ? comparisonList.findIndex(item => item.id === freelancer.id) + 1 : null;

            return (
              <div
                key={freelancer.id}
                onClick={() => toggleComparison(freelancer)}
                className={`candidate-pool-card ${isSelected ? 'selected' : ''}`}
              >
                <div>
                  {/* Top Bar: Slot / Selection Badge & Career Score */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className={`candidate-slot-badge ${isSelected ? 'active' : 'inactive'}`}>
                      {isSelected ? (
                        <>
                          <Check size={12} strokeWidth={3} /> Slot #{slotIndex} Selected
                        </>
                      ) : (
                        <>
                          <Plus size={12} /> Add to Compare
                        </>
                      )}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {freelancer.matchScore}% Match
                      </span>
                      <CareerScoreBadge score={freelancer.careerScore} size="sm" showLabel={false} />
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                      />
                      {freelancer.available && (
                        <div style={{ position: 'absolute', bottom: -2, right: -2, width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid #FFFFFF' }} title="Available"></div>
                      )}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.975rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                        {freelancer.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.15rem', lineHeight: 1.3 }}>
                        {freelancer.title}
                      </p>
                    </div>
                  </div>

                  {/* Skill Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                    {(freelancer.tags || []).slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.675rem',
                          fontWeight: 600,
                          backgroundColor: '#F1F5F9',
                          color: '#475569',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Rate & Rating */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.6rem', fontSize: '0.775rem' }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>
                    {freelancer.hourlyRate}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#64748B', fontWeight: 600 }}>
                    <Star size={13} fill="#D97706" color="#D97706" /> {freelancer.rating} ({freelancer.reviewsCount})
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Side-by-Side Comparison Matrix */}
      {comparisonList.length === 0 ? (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '3.5rem 2rem', textAlign: 'center', boxShadow: '0 4px 15px -3px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#1E40AF' }}>
            <Columns size={28} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
            No Candidates Currently in Matrix
          </h3>
          <p style={{ color: '#64748B', maxWidth: '460px', margin: '0 auto 1.5rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Click on any candidate cards above or click <strong>"Select Top 3"</strong> to generate your side-by-side comparison.
          </p>
          <button onClick={handleSelectTop3} className="btn btn-primary">
            <Sparkles size={16} /> Compare Top 3 Candidates
          </button>
        </div>
      ) : (
        <div className="comparison-table-wrapper" style={{ boxShadow: '0 4px 15px -3px rgba(15, 23, 42, 0.04)' }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th style={{ width: '220px', backgroundColor: '#F8FAFC', verticalAlign: 'middle' }}>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem', textTransform: 'none' }}>
                    Comparison Metrics
                  </div>
                  <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 500, textTransform: 'none', marginTop: '0.15rem' }}>
                    {comparisonList.length} of 3 Candidates
                  </div>
                </th>

                {/* Candidate Columns */}
                {comparisonList.map((candidate, idx) => (
                  <th key={candidate.id} style={{ textAlign: 'center', minWidth: '240px', backgroundColor: '#FFFFFF' }}>
                    <div style={{ position: 'relative', padding: '0.75rem 0.5rem' }}>
                      {/* Remove / Swap Button */}
                      <button
                        onClick={() => toggleComparison(candidate)}
                        style={{
                          position: 'absolute',
                          top: '0.25rem',
                          right: '0.25rem',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '26px',
                          height: '26px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        title={`Remove ${candidate.name} from comparison`}
                      >
                        <X size={14} />
                      </button>

                      {/* Slot Badge */}
                      <span style={{ fontSize: '0.675rem', fontWeight: 800, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-block', marginBottom: '0.5rem' }}>
                        Candidate #{idx + 1}
                      </span>

                      <img
                        src={candidate.avatar}
                        alt={candidate.name}
                        style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', margin: '0 auto 0.5rem', display: 'block', border: '2px solid #EFF6FF' }}
                      />
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', textTransform: 'none' }}>
                        {candidate.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500, textTransform: 'none', marginTop: '0.15rem' }}>
                        {candidate.title}
                      </div>
                    </div>
                  </th>
                ))}

                {/* Empty Slot Placeholder if < 3 selected */}
                {comparisonList.length < 3 && (
                  <th style={{ textAlign: 'center', minWidth: '220px', backgroundColor: '#FAFAFA' }}>
                    <div className="candidate-empty-slot">
                      <Plus size={24} color="#94A3B8" />
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', textTransform: 'none' }}>
                        Slot #{comparisonList.length + 1} Available
                      </div>
                      <div style={{ fontSize: '0.725rem', color: '#94A3B8', textTransform: 'none' }}>
                        Click any card in the pool above to fill this slot
                      </div>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: '#334155', backgroundColor: '#F8FAFC', fontSize: '0.85rem' }}>
                    {row.label}
                  </td>
                  {comparisonList.map(candidate => (
                    <td key={candidate.id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      {row.render(candidate)}
                    </td>
                  ))}
                  {/* Empty Slot column cell */}
                  {comparisonList.length < 3 && (
                    <td style={{ textAlign: 'center', color: '#CBD5E1', fontStyle: 'italic', fontSize: '0.8rem', backgroundColor: '#FAFAFA' }}>
                      —
                    </td>
                  )}
                </tr>
              ))}

              {/* Hiring Actions Row */}
              <tr>
                <td style={{ fontWeight: 700, color: '#334155', backgroundColor: '#F8FAFC', verticalAlign: 'middle' }}>
                  Hiring & Profile Actions
                </td>
                {comparisonList.map(candidate => {
                  const isShortlisted = shortlistedFreelancers.includes(candidate.id);
                  return (
                    <td key={candidate.id} style={{ textAlign: 'center', padding: '1.25rem 1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                          onClick={() => showToast(`Offer drafted and sent to ${candidate.name}!`, 'success')}
                          className="btn btn-primary btn-sm"
                          style={{ width: '100%', fontWeight: 700 }}
                        >
                          <Send size={13} /> Hire / Send Offer
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFreelancer(candidate);
                            navigateTo('freelancer-profile');
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ width: '100%', fontWeight: 600 }}
                        >
                          View Full Profile
                        </button>
                        <button
                          onClick={() => toggleShortlist(candidate.id)}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: isShortlisted ? '#1E40AF' : '#64748B',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                            padding: '0.2rem'
                          }}
                        >
                          <Bookmark size={12} fill={isShortlisted ? '#1E40AF' : 'none'} />
                          {isShortlisted ? 'Saved in Shortlist' : 'Add to Shortlist'}
                        </button>
                      </div>
                    </td>
                  );
                })}

                {/* Empty Slot Actions cell */}
                {comparisonList.length < 3 && (
                  <td style={{ textAlign: 'center', backgroundColor: '#FAFAFA' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Select candidate above</span>
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

