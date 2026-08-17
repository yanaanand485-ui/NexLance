import React from 'react';
import {
  Columns,
  CheckCircle2,
  Star,
  Clock,
  ShieldCheck,
  Send,
  Trash2,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const CandidateComparison = () => {
  const {
    comparisonList,
    toggleComparison,
    navigateTo,
    setSelectedFreelancer,
    toggleShortlist,
    shortlistedFreelancers,
    showToast
  } = useApp();

  if (comparisonList.length === 0) {
    return (
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Candidate Comparison Matrix</h1>
          <p className="dashboard-subtitle">
            Compare shortlisted talent side-by-side on verified skills, Career Score, and delivery reliability.
          </p>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center' }}>
          <Columns size={48} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
            No Candidates in Comparison Matrix
          </h3>
          <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
            Select candidates from Smart Match or Talent Discovery to compare their verified scores and track record side by side.
          </p>
          <button onClick={() => navigateTo('smart-match')} className="btn btn-primary">
            Find Top Candidates to Compare <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const comparisonRows = [
    {
      label: 'Career Score',
      render: (f) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CareerScoreBadge score={f.careerScore} size="sm" showLabel={false} />
        </div>
      )
    },
    {
      label: 'Skill Match',
      render: (f) => (
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E40AF' }}>
          {f.matchScore}%
        </span>
      )
    },
    {
      label: 'Client Rating',
      render: (f) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', fontWeight: 700, color: '#0F172A' }}>
          <Star size={15} fill="#D97706" color="#D97706" /> {f.rating} ({f.reviewsCount})
        </div>
      )
    },
    {
      label: 'Client Satisfaction',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>
          {f.clientSatisfaction}%
        </span>
      )
    },
    {
      label: 'Timely Delivery',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#1E40AF', fontSize: '1rem' }}>
          {f.onTimeDelivery}%
        </span>
      )
    },
    {
      label: 'Work Quality Score',
      render: (f) => (
        <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1rem' }}>
          {f.workQuality}%
        </span>
      )
    },
    {
      label: 'Rate / Budget',
      render: (f) => (
        <span style={{ fontWeight: 700, color: '#0F172A' }}>
          {f.hourlyRate}
        </span>
      )
    },
    {
      label: 'Availability',
      render: (f) => (
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: f.available ? '#059669' : '#DC2626', backgroundColor: f.available ? '#ECFDF5' : '#FEF2F2', padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
          {f.availabilityBadge}
        </span>
      )
    },
    {
      label: 'Projects Completed',
      render: (f) => (
        <span style={{ fontWeight: 700, color: '#0F172A' }}>
          {f.projectsCompleted} Verified Projects
        </span>
      )
    },
    {
      label: 'Verified Skills',
      render: (f) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
          {f.topSkills.map((s, idx) => (
            <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-main">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">Candidate Comparison Matrix</h1>
          <p className="dashboard-subtitle">
            Comparing {comparisonList.length} shortlisted candidate{comparisonList.length > 1 ? 's' : ''} across all performance metrics.
          </p>
        </div>

        <button
          onClick={() => navigateTo('smart-match')}
          className="btn btn-secondary btn-sm"
        >
          <Plus size={15} /> Add More Candidates
        </button>
      </div>

      {/* Comparison Table */}
      <div className="comparison-table-wrapper" style={{ boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.04)' }}>
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: '220px', backgroundColor: '#F8FAFC' }}>Metric / Feature</th>
              {comparisonList.map(candidate => (
                <th key={candidate.id} style={{ textAlign: 'center', minWidth: '220px' }}>
                  <div style={{ position: 'relative', padding: '0.5rem 0' }}>
                    <button
                      onClick={() => toggleComparison(candidate)}
                      style={{ position: 'absolute', top: 0, right: 0, color: '#94A3B8', cursor: 'pointer' }}
                      title="Remove from comparison"
                    >
                      <Trash2 size={15} />
                    </button>
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', margin: '0 auto 0.5rem', display: 'block' }}
                    />
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', textTransform: 'none' }}>
                      {candidate.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500, textTransform: 'none' }}>
                      {candidate.title}
                    </div>
                  </div>
                </th>
              ))}
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
              </tr>
            ))}
            {/* Actions Row */}
            <tr>
              <td style={{ fontWeight: 700, color: '#334155', backgroundColor: '#F8FAFC' }}>
                Hiring Actions
              </td>
              {comparisonList.map(candidate => {
                const isShortlisted = shortlistedFreelancers.includes(candidate.id);
                return (
                  <td key={candidate.id} style={{ textAlign: 'center', padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={() => showToast(`Offer drafted and sent to ${candidate.name}!`, 'success')}
                        className="btn btn-primary btn-sm"
                        style={{ width: '100%' }}
                      >
                        <Send size={13} /> Hire / Send Offer
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFreelancer(candidate);
                          navigateTo('freelancer-profile');
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%' }}
                      >
                        View Full Profile
                      </button>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
