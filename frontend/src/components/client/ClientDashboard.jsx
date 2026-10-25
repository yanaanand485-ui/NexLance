import React from 'react';
import { useApp } from '../../context/AppContext';

export const ClientDashboard = () => {
  const {
    clientProfile,
    navigateTo,
    activeProjectsList
  } = useApp();

  const recentProjects = activeProjectsList.slice(0, 5);

  const greeting = 'Welcome';

  return (
    <div className="dashboard-main">
      {/* 1. Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">
            {greeting}
          </h1>
          <p className="dashboard-subtitle">
            Manage your projects, review applicants, and hire verified talent.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigateTo('client-find-talent')}
            className="btn btn-secondary"
          >
            Find Talent
          </button>
          <button
            onClick={() => navigateTo('client-my-projects')}
            className="btn btn-primary"
          >
            Post a Project
          </button>
        </div>
      </div>

      {/* 2. Key Statistics Overview */}
      <div className="stats-summary-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Active Projects</span>
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
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            {clientProfile.applicationsReceived || 48}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
            Candidate applicants
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            <span>Smart Matches</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0' }}>
            24+
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7C3AED', fontWeight: 600 }}>
            Available vetted talent
          </div>
        </div>
      </div>

      {/* 3. Client Navigation Hub */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div
          onClick={() => navigateTo('client-find-talent')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem' }}
        >
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
            Find Talent
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
            Search verified freelancers with proven test scores
          </p>
        </div>

        <div
          onClick={() => navigateTo('client-my-projects')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem' }}
        >
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
            My Projects
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
            Track active projects, applications & milestones
          </p>
        </div>

        <div
          onClick={() => navigateTo('client-explore-services')}
          className="card card-hover"
          style={{ cursor: 'pointer', padding: '1.25rem' }}
        >
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
            Explore Services
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
            Browse fixed-price packaged gigs & pre-built services
          </p>
        </div>
      </div>

      {/* 4. My Projects Section */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              My Projects
            </h3>
            <p style={{ fontSize: '0.825rem', color: '#64748B', margin: '4px 0 0 0' }}>
              Active projects and contracts
            </p>
          </div>
          <button
            onClick={() => navigateTo('client-my-projects')}
            className="btn btn-secondary btn-sm"
          >
            View All Projects
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
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
    </div>
  );
};
