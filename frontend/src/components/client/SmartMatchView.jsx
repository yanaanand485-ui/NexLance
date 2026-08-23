import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Layers,
  FileCheck2,
  Send,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS, SERVICES } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const SmartMatchView = () => {
  const {
    navigateTo,
    setSelectedFreelancer,
    setSelectedService,
    toggleShortlist,
    shortlistedFreelancers,
    toggleComparison,
    comparisonList,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('freelancers'); // 'freelancers' | 'services' | 'applicants'

  const topMatches = FREELANCERS.slice(0, 5);

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} /> Smart Match Engine
        </div>
        <h1 className="dashboard-title">Smart Match & Talent Ranking</h1>
        <p className="dashboard-subtitle">
          Intelligent candidate ranking for "React E-Commerce Platform Architecture" based on verified skills and reliability proof.
        </p>
      </div>

      {/* 3 Main Tabs (Section 20) */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('freelancers')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            backgroundColor: activeTab === 'freelancers' ? '#1E40AF' : 'transparent',
            color: activeTab === 'freelancers' ? '#FFFFFF' : '#64748B',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <Users size={16} /> Matching Freelancers (5)
        </button>

        <button
          onClick={() => setActiveTab('services')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            backgroundColor: activeTab === 'services' ? '#1E40AF' : 'transparent',
            color: activeTab === 'services' ? '#FFFFFF' : '#64748B',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <Layers size={16} /> Matching Services ({SERVICES.length})
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            backgroundColor: activeTab === 'applicants' ? '#1E40AF' : 'transparent',
            color: activeTab === 'applicants' ? '#FFFFFF' : '#64748B',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <FileCheck2 size={16} /> Existing Applicants (14)
        </button>
      </div>

      {/* Tab 1: Matching Freelancers / Top 5 Matches (Section 21) */}
      {activeTab === 'freelancers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {topMatches.map((freelancer, index) => {
            const isShortlisted = shortlistedFreelancers.includes(freelancer.id);
            const isCompared = comparisonList.some(item => item.id === freelancer.id);

            return (
              <div
                key={freelancer.id}
                className="card card-hover"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1.4fr 1fr',
                  gap: '1.75rem',
                  alignItems: 'center',
                  padding: '1.75rem'
                }}
              >
                {/* Rank Badge */}
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: index === 0 ? '#FEF3C7' : '#F1F5F9',
                      border: `1.5px solid ${index === 0 ? '#F59E0B' : '#CBD5E1'}`,
                      color: index === 0 ? '#B45309' : '#334155',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto'
                    }}
                  >
                    #{index + 1}
                  </div>
                  <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginTop: '0.25rem', display: 'block' }}>
                    Rank
                  </span>
                </div>

                {/* Candidate Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3
                          onClick={() => {
                            setSelectedFreelancer(freelancer);
                            navigateTo('freelancer-profile');
                          }}
                          style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}
                        >
                          {freelancer.name}
                        </h3>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.1rem 0.45rem', borderRadius: '9999px' }}>
                          🟢 Available
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{freelancer.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem', fontSize: '0.8rem', color: '#475569' }}>
                        <span style={{ fontWeight: 700, color: '#1E40AF' }}>{freelancer.hourlyRate}</span>
                        <span>• ★ {freelancer.rating} ({freelancer.reviewsCount} reviews)</span>
                        <span>• {freelancer.projectsCompleted} projects</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {freelancer.topSkills.map((s, idx) => (
                      <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
                    ))}
                  </div>
                </div>

                {/* Match Score & Why Match Section */}
                <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CareerScoreBadge score={freelancer.careerScore} size="sm" showLabel={false} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>Score</span>
                      </div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E40AF' }}>
                        {freelancer.matchScore}% Match
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '8px', marginBottom: '0.85rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                        Why {freelancer.name.split(' ')[0]} matches:
                      </span>
                      <p style={{ fontSize: '0.75rem', color: '#334155', lineHeight: 1.35 }}>
                        ✓ {freelancer.whyMatch[0]}<br />
                        ✓ {freelancer.whyMatch[1]}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => toggleShortlist(freelancer.id)}
                      className={`btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      style={{ flex: 1 }}
                    >
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </button>
                    <button
                      onClick={() => toggleComparison(freelancer)}
                      className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'} btn-sm`}
                      style={{ flex: 1 }}
                    >
                      {isCompared ? 'Comparing' : 'Compare'}
                    </button>
                    <button
                      onClick={() => showToast(`Direct interview invite sent to ${freelancer.name}`, 'success')}
                      className="btn btn-primary btn-sm"
                      style={{ padding: '0.4rem 0.6rem' }}
                      title="Direct Offer / Hire"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Matching Services */}
      {activeTab === 'services' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {SERVICES.map(srv => (
            <div
              key={srv.id}
              className="card card-hover"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                <img
                  src={srv.thumbnail}
                  alt={srv.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.85rem' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <img
                    src={srv.freelancer.avatar}
                    alt={srv.freelancer.name}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>{srv.freelancer.name}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>{srv.title}</h4>
              </div>

              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Starting from</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{srv.startingPrice}</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(srv);
                    navigateTo('service-detail');
                  }}
                  className="btn btn-primary btn-sm"
                >
                  View Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Existing Applicants */}
      {activeTab === 'applicants' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Showing 14 applicants who manually submitted proposals for this project.
          </p>
          <button onClick={() => navigateTo('applications')} className="btn btn-primary">
            Open Applications Management Pipeline <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
