import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Layers,
  Sparkles,
  FileText,
  PlusCircle,
  ArrowRight,
  Star,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { VerifiedSkillBadge, CareerScoreBadge, StatusBadge } from './ClientBadge';

export const ClientDashboard = () => {
  const {
    clientProfile,
    navigateTo,
    activeProjectsList,
    shortlistedFreelancers,
    toggleShortlist,
    showToast
  } = useApp();

  // Selected freelancer for preview modal
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Top 3 recommended freelancers
  const topMatches = FREELANCERS.slice(0, 3);
  // Recent 3 projects
  const recentProjects = activeProjectsList.slice(0, 3);

  return (
    <div className="dashboard-main">
      {/* 1. Header with greeting and primary action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">
            Welcome back, {clientProfile.contactPerson || 'Client'}
          </h1>
          <p className="dashboard-subtitle">
            Manage your projects, review applicants, and hire verified talent for {clientProfile.name}.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigateTo('client-find-talent')}
            className="btn btn-secondary"
          >
            <Users size={16} /> Find Talent
          </button>
          <button
            onClick={() => navigateTo('client-my-projects')}
            className="btn btn-primary"
          >
            <PlusCircle size={16} /> Post a Project
          </button>
        </div>
      </div>

      {/* 2. Key Statistics Overview */}
      <div className="stats-summary-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Active Projects</span>
            <Briefcase size={16} color="#1E40AF" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            {clientProfile.activeProjects || activeProjectsList.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Currently in development
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            <span>Hiring Positions</span>
            <Sparkles size={16} color="#2563EB" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            {clientProfile.hiringProjects || 2}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
            Collecting proposals
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            <span>Applications</span>
            <FileText size={16} color="#D97706" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            {clientProfile.applicationsReceived || 48}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
            Verified candidate applicants
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            <span>Smart Matches</span>
            <Users size={16} color="#7C3AED" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            {FREELANCERS.length}+
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
            Available vetted talent
          </div>
        </div>
      </div>

      {/* 3. Client Navigation Hub (Quick Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div
          onClick={() => navigateTo('client-find-talent')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
              Find Talent
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Search verified freelancers with proven test scores
            </p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('client-my-projects')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
              My Projects
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Track active projects, applications & milestones
            </p>
          </div>
        </div>

        <div
          onClick={() => navigateTo('client-explore-services')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Layers size={24} color="#1E40AF" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
              Explore Services
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Browse fixed-price packaged gigs & pre-built services
            </p>
          </div>
        </div>
      </div>

      {/* 4. Recent Projects Section */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              My Recent Projects
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748B', margin: 0 }}>
              Recent project listings and ongoing contracts
            </p>
          </div>
          <button
            onClick={() => navigateTo('client-my-projects')}
            className="btn btn-secondary btn-sm"
          >
            View All Projects <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {recentProjects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                border: '1px solid #F1F5F9',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    {project.title}
                  </h4>
                  <StatusBadge status={project.status || 'Hiring'} />
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '1rem' }}>
                  <span>Budget: {project.budget}</span>
                  <span>Deadline: {project.deadline}</span>
                  <span>Applicants: {project.applicantsCount || 0}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('client-my-projects')}
                className="btn btn-outline btn-sm"
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recommended Freelancers Section */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              Top Recommended Freelancers
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748B', margin: 0 }}>
              Pre-vetted developers and designers ready to join your projects
            </p>
          </div>
          <button
            onClick={() => navigateTo('client-find-talent')}
            className="btn btn-secondary btn-sm"
          >
            Find More Talent <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {topMatches.map((freelancer) => {
            const isShortlisted = shortlistedFreelancers.includes(freelancer.id);
            return (
              <div
                key={freelancer.id}
                className="card card-hover"
                style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      style={{ width: '46px', height: '46px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                        {freelancer.name}
                      </h4>
                      <p style={{ fontSize: '0.775rem', color: '#64748B', margin: 0 }}>
                        {freelancer.title}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <CareerScoreBadge score={freelancer.careerScore} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
                      ${freelancer.rawRate || 65}/hr
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                    {freelancer.topSkills.slice(0, 3).map((skill, idx) => (
                      <VerifiedSkillBadge key={idx} skill={skill.name} score={skill.score} />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
                  <button
                    onClick={() => setSelectedProfile(freelancer)}
                    className="btn btn-secondary btn-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => toggleShortlist(freelancer.id)}
                    className={`btn ${isShortlisted ? 'btn-primary' : 'btn-outline'} btn-sm`}
                  >
                    {isShortlisted ? 'Shortlisted ★' : 'Shortlist'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Quick Profile Modal */}
      {selectedProfile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem'
          }}
          onClick={() => setSelectedProfile(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              padding: '1.75rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProfile(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img
                src={selectedProfile.avatar}
                alt={selectedProfile.name}
                style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {selectedProfile.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
                  {selectedProfile.title}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                  <CareerScoreBadge score={selectedProfile.careerScore} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A' }}>
                    ${selectedProfile.rawRate}/hr
                  </span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {selectedProfile.bio || selectedProfile.overview || 'Experienced verified professional ready for full-stack and modern web assignments.'}
            </p>

            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              Verified Skills
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {selectedProfile.topSkills.map((s, idx) => (
                <VerifiedSkillBadge key={idx} skill={s.name} score={s.score} />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  showToast(`Invitation sent to ${selectedProfile.name}!`, 'success');
                  setSelectedProfile(null);
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Invite to Project
              </button>
              <button
                onClick={() => {
                  toggleShortlist(selectedProfile.id);
                  setSelectedProfile(null);
                }}
                className="btn btn-secondary"
              >
                {shortlistedFreelancers.includes(selectedProfile.id) ? 'Shortlisted ★' : 'Shortlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
