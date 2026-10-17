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
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';

export const FreelancerDashboard = () => {
  const {
    freelancerProfile,
    navigateTo,
    setIsSkillModalOpen,
    setIsSkillModalOnboarding
  } = useApp();

  // Check if current user is Sarah Jenkins or a new user
  const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';

  // Static stats: For Sarah, keep exact values static; for all new users, exactly 0
  const careerScore = isSarah ? 95 : 0;
  const activeProjects = isSarah ? 4 : 0;
  const applications = isSarah ? 12 : 0;
  const completedProjects = isSarah ? 48 : 0;
  const isNewUser = !isSarah;
  const clientSatisfaction = isSarah ? 97 : 0;
  const onTimeDelivery = isSarah ? 98 : 0;
  const codeQuality = isSarah ? 99 : 0;
  const verifiedSkills = (freelancerProfile.verifiedSkills || []).filter(s => {
    const key = (s.name || s.id || '').toLowerCase();
    return !key.includes('graphql') && !key.includes('aws') && !key.includes('devops');
  });

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
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.75rem' }}>
            {!isNewUser ? 'Overall quality and on-time delivery ratings' : 'Performance metrics initialize once projects are completed.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Client Satisfaction</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{clientSatisfaction}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${clientSatisfaction}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>On-Time Delivery</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{onTimeDelivery}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${onTimeDelivery}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: '#475569', fontWeight: 600 }}>Code Quality</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{codeQuality}%</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${codeQuality}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
              </div>
            </div>
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

          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
            <span>{freelancerProfile.role || 'Full-Stack Developer'}</span> &bull; <span>{freelancerProfile.experienceLevel || 'Mid-Level'}</span>
          </div>

          {/* Simple Skills List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
            {verifiedSkills.length > 0 ? (
              verifiedSkills.map((skill) => {
                const isVerified = skill.status === 'verified';
                return (
                  <div
                    key={skill.id || skill.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isVerified ? '#1E40AF' : '#64748B' }}>
                      {isVerified && skill.score ? `${skill.score}/100 Verified` : 'Pending'}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                No skills added yet. Click 'Edit Skills' to add skills.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

