import React from 'react';
import {
  Briefcase,
  Users,
  Sparkles,
  FileCheck2,
  PlusCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Columns,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const ClientDashboard = () => {
  const { clientProfile, navigateTo, setSelectedFreelancer, toggleShortlist, shortlistedFreelancers } = useApp();

  const topMatches = FREELANCERS.slice(0, 3);

  return (
    <div className="dashboard-main">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">
            Welcome back, {clientProfile.contactPerson}
          </h1>
          <p className="dashboard-subtitle">
            Here is your active hiring pipeline and top smart matches for {clientProfile.name}.
          </p>
        </div>

        <button
          onClick={() => navigateTo('post-project')}
          className="btn btn-primary"
        >
          <PlusCircle size={17} /> Post a New Project
        </button>
      </div>

      {/* 4 Dashboard Metric Cards (Section 17) */}
      <div className="stats-summary-grid">
        {/* Active Projects */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Active Projects</span>
            <Briefcase size={15} color="#1E40AF" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {clientProfile.activeProjects}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            3 milestones due this week
          </div>
        </div>

        {/* Hiring Projects */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Hiring Projects</span>
            <Sparkles size={15} color="#2563EB" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {clientProfile.hiringProjects}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
            Collecting candidate proposals
          </div>
        </div>

        {/* Applications Received */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Applications</span>
            <FileCheck2 size={15} color="#D97706" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {clientProfile.applicationsReceived}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
            +14 new this week
          </div>
        </div>

        {/* Smart Matches */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Smart Matches</span>
            <Sparkles size={15} color="#7C3AED" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
              {clientProfile.smartMatchesFound}
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
            Verified top tier candidates
          </div>
        </div>
      </div>

      {/* Top Smart Matches Section */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
              Top Smart Matches for "React E-Commerce Platform Architecture"
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748B' }}>
              Ranked by verified skills, Career Score, and relevant proof of work.
            </p>
          </div>
          <button
            onClick={() => navigateTo('smart-match')}
            className="btn btn-secondary btn-sm"
          >
            View All 18 Matches <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {topMatches.map((freelancer) => {
            const isShortlisted = shortlistedFreelancers.includes(freelancer.id);
            return (
              <div
                key={freelancer.id}
                className="card card-hover"
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{freelancer.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{freelancer.rawRate ? `$${freelancer.rawRate}/hr` : ''}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
                      {freelancer.matchScore}% Match
                    </span>
                  </div>

                  {/* Career score pill */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Career Score</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>{freelancer.careerScore} / 100</span>
                  </div>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1rem' }}>
                    {freelancer.topSkills.slice(0, 3).map((s, idx) => (
                      <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" showScore={false} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                  <button
                    onClick={() => {
                      setSelectedFreelancer(freelancer);
                      navigateTo('freelancer-profile');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => toggleShortlist(freelancer.id)}
                    className={`btn ${isShortlisted ? 'btn-primary' : 'btn-outline'} btn-sm`}
                  >
                    {isShortlisted ? 'Shortlisted ⭐' : 'Shortlist'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        <div
          onClick={() => navigateTo('comparison')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Columns size={22} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Candidate Comparison</h4>
            <p style={{ fontSize: '0.775rem', color: '#64748B' }}>Compare 2–4 candidates side by side</p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('applications')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileCheck2 size={22} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Review Applications</h4>
            <p style={{ fontSize: '0.775rem', color: '#64748B' }}>48 candidate submissions</p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('services-marketplace')}
          className="card card-hover"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={22} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>Browse Packaged Services</h4>
            <p style={{ fontSize: '0.775rem', color: '#64748B' }}>Fixed price & guaranteed delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};
