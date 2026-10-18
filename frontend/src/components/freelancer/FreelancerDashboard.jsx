import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  FileText,
  Plus,
  Star,
  Edit3,
  Trophy,
  ShieldCheck,
  Clock,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';

export const FreelancerDashboard = () => {
  const {
    freelancerProfile,
    navigateTo,
    setIsSkillModalOpen,
    setIsSkillModalOnboarding,
    openAddServiceModal,
    openEditServiceModal,
    deleteFreelancerService
  } = useApp();

  // Check if current user is Sarah Jenkins or a new user
  const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';

  // Stats: For Sarah, keep exact values static; for other users, start at 0 and update dynamically
  const careerScore = isSarah ? 95 : (freelancerProfile?.careerScore || 0);
  const activeProjects = isSarah ? 4 : (freelancerProfile?.activeProjects || 0);
  const applications = isSarah ? 12 : (freelancerProfile?.applications || 0);
  const completedProjects = isSarah ? 48 : (freelancerProfile?.completedProjects || 0);
  const isNewUser = !isSarah && careerScore === 0 && completedProjects === 0;

  // Percentage metrics: 0% for beginners, increases with performance/career score/projects
  const clientSatisfaction = isSarah ? 97 : (freelancerProfile?.clientSatisfaction || (completedProjects > 0 ? 100 : 0));
  const onTimeDelivery = isSarah ? 98 : (freelancerProfile?.onTimeDelivery || (completedProjects > 0 ? 100 : 0));
  const codeQuality = isSarah ? 99 : (freelancerProfile?.codeQualityRate || freelancerProfile?.codeQuality || (careerScore > 0 ? Math.round(careerScore * 0.98) : 0));
  
  const sarahSkills = [
    { id: 'react', name: 'React', score: 95, status: 'verified' },
    { id: 'typescript', name: 'TypeScript', score: 96, status: 'verified' },
    { id: 'nodejs', name: 'Node.js', score: 92, status: 'verified' },
    { id: 'javascript', name: 'JavaScript (ES6+)', score: 95, status: 'verified' }
  ];

  // Only skills that have an Assessment Center track
  const ASSESSMENT_CENTER_KEYS = ['react', 'typescript', 'node', 'javascript'];

  const rawSkills = freelancerProfile?.verifiedSkills?.length > 0
    ? freelancerProfile.verifiedSkills
    : (freelancerProfile?.skills?.length > 0
        ? freelancerProfile.skills.map(s => typeof s === 'string' ? { name: s, status: 'pending' } : s)
        : (isSarah ? sarahSkills : []));

  const skillsList = rawSkills.filter(s => {
    const key = (s.name || s.id || '').toLowerCase();
    return ASSESSMENT_CENTER_KEYS.some(k => key.includes(k));
  });

  const services = freelancerProfile?.services || [];

  return (
    <div className="dashboard-main" style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 2.5rem 4rem' }}>
      {/* Header Greeting */}
      <div className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
          Welcome, {freelancerProfile.name}
        </h1>
        <p className="dashboard-subtitle" style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.5 }}>
          {!isNewUser
            ? 'Here is your professional overview. Your career data is tracking ahead of industry averages this week.'
            : 'Welcome to NexLance! Complete skill assessments and take on your first project to build your career score.'}
        </p>
      </div>

      {/* 3 Stat Summary Cards with Generous Spacing */}
      <div className="stats-summary-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem', marginBottom: '2.75rem' }}>
        {/* Stat 1: Career Score */}
        <div className="stat-card" style={{ padding: '1.75rem', minHeight: '150px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div className="stat-card-label" style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Career Score</span>
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            <CareerScoreBadge score={careerScore} size="md" showLabel={false} />
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: !isNewUser ? '#059669' : '#64748B', fontWeight: 600, marginTop: '0.6rem' }}>
            {!isNewUser ? '+3 pts from last month' : '0 pts · New account'}
          </div>
        </div>

        {/* Stat 2: Active Projects */}
        <div className="stat-card" style={{ padding: '1.75rem', minHeight: '150px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div className="stat-card-label" style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Active Projects</span>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {activeProjects}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>in progress</span>
            </div>
            <div style={{ marginTop: '0.85rem', fontSize: '0.85rem', color: '#475569' }}>
              Status: <strong>{activeProjects > 0 ? 'In Delivery' : 'No active projects'}</strong>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.5rem' }}>
            {activeProjects > 0 ? 'Next delivery in 4 days' : '0 ongoing contracts'}
          </div>
        </div>

        {/* Stat 3: Completed Projects */}
        <div className="stat-card" style={{ padding: '1.75rem', minHeight: '150px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div className="stat-card-label" style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>Completed Projects</span>
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {completedProjects}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>total completed</span>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.5rem' }}>
            {completedProjects > 0 ? 'Verified client deliveries' : '0 reviews yet'}
          </div>
        </div>
      </div>

      {/* Middle Row: Performance Metrics & Verified Skills Card with Spacious Layout */}
      <div className="performance-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1.05fr', gap: '2rem' }}>
        {/* Left: Performance Metrics Breakdown */}
        <div className="performance-card" style={{ padding: '1.75rem', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>Performance Metrics</h3>
            {isNewUser && (
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                New Account
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
            {!isNewUser ? 'Overall quality and on-time delivery ratings' : 'Performance metrics initialize at 0% and increase as you complete assessments and client projects.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { label: 'Client Satisfaction', value: clientSatisfaction },
              { label: 'On-Time Delivery', value: onTimeDelivery },
              { label: 'Code Quality', value: codeQuality }
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.9rem 1.1rem',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <span style={{ color: '#334155', fontWeight: 600, fontSize: '0.875rem' }}>
                  {label}
                </span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  {value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Verified Skills Card - Simple */}
        <div className="verified-skills-card" style={{ padding: '1.75rem', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A' }}>Verified Skills</h3>
            <button
              type="button"
              onClick={() => {
                setIsSkillModalOnboarding(false);
                setIsSkillModalOpen(true);
              }}
              className="btn btn-secondary btn-sm"
            >
              Edit Skills
            </button>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem', minHeight: '1.25rem' }}>
            {freelancerProfile.role ? (
              <span>
                {freelancerProfile.role}
                {freelancerProfile.experienceLevel ? ` • ${freelancerProfile.experienceLevel}` : ''}
              </span>
            ) : null}
          </div>

          {/* Simple Skills List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {skillsList.length > 0 ? (
              skillsList.map((skill) => {
                const isVerified = skill.status === 'verified';
                return (
                  <div
                    key={skill.name || skill.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A' }}>
                      {skill.name}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor: isVerified ? '#EFF6FF' : '#FEF3C7',
                        color: isVerified ? '#1E40AF' : '#D97706',
                        border: `1px solid ${isVerified ? '#BFDBFE' : '#FDE68A'}`
                      }}
                    >
                      {isVerified && skill.score ? `${skill.score}/100 Verified` : 'Pending'}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#64748B', padding: '0.5rem 0' }}>
                No skills added yet. Click 'Edit Skills' to add skills.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simple Services Section */}
      <div style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              My Services
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              ({services.length})
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {services.length > 0 && (
              <button
                type="button"
                onClick={() => navigateTo('freelancer-services')}
                className="btn btn-secondary btn-sm"
              >
                View All
              </button>
            )}
            <button
              type="button"
              onClick={openAddServiceModal}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <Plus size={15} /> Add Service
            </button>
          </div>
        </div>

        {services.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {service.category || 'Web Development'}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>
                      {service.deliveryTime || (service.deliveryDays ? `${service.deliveryDays} Days` : '5 Days')}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.4rem 0' }}>
                    {service.title}
                  </h4>

                  <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                    {service.description || service.tagline || 'Standard fixed deliverable package.'}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                    {service.price || service.startingPrice || '$300'}
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => openEditServiceModal(service)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteFreelancerService(service.id)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.75rem', cursor: 'pointer', padding: '0.25rem 0.4rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '0 0 1rem 0' }}>
              No services added yet. Would you like to add a service to offer to clients?
            </p>
            <button
              type="button"
              onClick={openAddServiceModal}
              className="btn btn-primary btn-sm"
            >
              + Add Your Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

