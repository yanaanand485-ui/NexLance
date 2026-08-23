import React, { useState } from 'react';
import {
  TrendingUp,
  CheckCircle2,
  FileText,
  Plus,
  Star,
  Sparkles,
  Edit3,
  Trophy,
  ShieldCheck,
  Clock,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { calculateProjectMatch } from '../../utils/matchEngine';

export const FreelancerDashboard = () => {
  const {
    freelancerProfile,
    navigateTo,
    setSelectedProject,
    appliedProjectIds,
    submitProposal,
    activeProjectsList,
    setIsSkillModalOpen,
    setIsSkillModalOnboarding
  } = useApp();

  // Active user's skills & profile
  const isNewUser = !freelancerProfile.careerScore || freelancerProfile.careerScore === 0;
  const careerScore = freelancerProfile.careerScore || 0;
  const clientSatisfaction = freelancerProfile.clientSatisfactionRate || 0;
  const onTimeDelivery = freelancerProfile.onTimeDeliveryRate || 0;
  const codeQuality = freelancerProfile.codeQualityRate || 0;
  const activeProjects = freelancerProfile.activeProjectsCount || 0;
  const applications = freelancerProfile.applicationsCount || 0;
  const completedProjects = freelancerProfile.completedProjectsCount || 0;
  const verifiedSkills = freelancerProfile.verifiedSkills || [];

  // Expanded project match breakdown modal / state
  const [activeBreakdownId, setActiveBreakdownId] = useState(null);

  // Dynamic recommendations computed on-the-fly from the user's actual skills!
  const recommendedProjects = (activeProjectsList || []).map(proj => {
    const match = calculateProjectMatch(proj, freelancerProfile);
    return {
      ...proj,
      dynamicMatch: match
    };
  }).sort((a, b) => b.dynamicMatch.matchScore - a.dynamicMatch.matchScore);

  return (
    <div className="dashboard-main">
      {/* Header Greeting */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome, {freelancerProfile.name}
        </h1>
        <p className="dashboard-subtitle">
          {!isNewUser
            ? 'Here is your professional overview. Your career data is tracking ahead of industry averages this week.'
            : 'Welcome to NexLance! Complete skill assessments and take on your first project to build your career score.'}
        </p>
      </div>

      {/* 4 Stat Summary Cards */}
      <div className="stats-summary-grid">
        {/* Stat 1: Career Score */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Career Score</span>
            <TrendingUp size={15} color="#1E40AF" />
          </div>
          <div style={{ margin: '0.25rem 0' }}>
            <CareerScoreBadge score={careerScore} size="md" showLabel={false} />
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: !isNewUser ? '#059669' : '#64748B', fontWeight: 600 }}>
            {!isNewUser ? '+3 pts from last month' : '0 pts · New account'}
          </div>
        </div>

        {/* Stat 2: Active Projects */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Active Projects</span>
            <CheckCircle2 size={15} color="#2563EB" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {activeProjects}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>in progress</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', marginTop: '0.85rem', overflow: 'hidden' }}>
              <div style={{ width: activeProjects > 0 ? '75%' : '0%', height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {activeProjects > 0 ? 'Next delivery in 4 days' : 'No active projects yet'}
          </div>
        </div>

        {/* Stat 3: Applications */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Applications</span>
            <FileText size={15} color="#2563EB" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {applications}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>pending</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: applications > 0 ? '#2563EB' : '#64748B', fontWeight: 600 }}>
            {applications > 0 ? (
              <><TrendingUp size={13} /> +3 this week</>
            ) : (
              'No proposals submitted'
            )}
          </div>
        </div>

        {/* Stat 4: Completed */}
        <div className="stat-card">
          <div className="stat-card-label">
            <span>Completed</span>
            <Trophy size={15} color="#D97706" />
          </div>
          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {completedProjects}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>total projects</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {completedProjects > 0 ? (
              [1, 2, 3].map(i => (
                <span key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF' }}>
                  <Star size={11} fill="#1E40AF" />
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>0 reviews yet</span>
            )}
          </div>
        </div>
      </div>

      {/* Middle Row: Performance Metrics & Verified Skills Card */}
      <div className="performance-grid">
        {/* Left: Performance Metrics Chart & Breakdown */}
        <div className="performance-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Performance Metrics</h3>
            {isNewUser && (
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', backgroundColor: '#F1F5F9', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                Baseline (New Account)
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.5rem' }}>
            {!isNewUser ? '30-day trailing averages vs industry baseline' : 'Performance metrics initialize once projects and skill assessments are completed.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: '2rem', alignItems: 'center' }}>
            {/* SVG Trend Line Chart: Straight baseline for new users, upward curve for old users */}
            <div style={{ position: 'relative', height: '160px', width: '100%' }}>
              <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="0" y1="120" x2="300" y2="120" stroke="#F1F5F9" strokeWidth="1" />

                {!isNewUser ? (
                  <>
                    {/* Shaded Area for experienced user */}
                    <path
                      d="M 10 130 Q 80 110, 150 65 T 290 20 L 290 140 L 10 140 Z"
                      fill="url(#blueGradient)"
                    />

                    {/* Blue Line Curve */}
                    <path
                      d="M 10 130 Q 80 110, 150 65 T 290 20"
                      fill="none"
                      stroke="#1E40AF"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Glowing Endpoint Circle */}
                    <circle cx="290" cy="20" r="5" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="2.5" />
                  </>
                ) : (
                  <>
                    {/* Straight Flat Baseline Line for New User */}
                    <path
                      d="M 10 135 L 290 135"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="135" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="150" cy="135" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="290" cy="135" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="150" y="123" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">
                      0% Baseline Trajectory
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Metric Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>Client Satisfaction</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{clientSatisfaction}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${clientSatisfaction}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px', transition: 'width 0.6s ease' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>On-Time Delivery</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{onTimeDelivery}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${onTimeDelivery}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px', transition: 'width 0.6s ease' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>Code Quality</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{codeQuality}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${codeQuality}%`, height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px', transition: 'width 0.6s ease' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Verified & Profile Skills Card */}
        <div className="verified-skills-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="#1E40AF" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Verified & Profile Skills</h3>
            </div>
            <button
              onClick={() => {
                setIsSkillModalOnboarding(false);
                setIsSkillModalOpen(true);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#1E40AF',
                backgroundColor: '#EFF6FF',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                border: '1px solid #BFDBFE',
                cursor: 'pointer'
              }}
            >
              <Edit3 size={12} /> Edit Skills
            </button>
          </div>

          <div style={{ fontSize: '0.785rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>{freelancerProfile.role || 'Full-Stack Developer'}</span>
            <span>•</span>
            <span>{freelancerProfile.experienceLevel || 'Mid-Level'}</span>
          </div>

          <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
            {verifiedSkills.filter(s => s.status === 'verified').length > 0 
              ? 'Passed assessments verified & active for Smart Match' 
              : 'Add your skills and pass assessments to boost project matches up to 98%.'}
          </p>

          <div className="skills-pill-wrap">
            {verifiedSkills.length > 0 ? (
              verifiedSkills.map((skill) => {
                const isVerified = skill.status === 'verified';
                return (
                  <button
                    key={skill.id || skill.name}
                    className={`skill-pill-btn ${!isVerified ? 'unverified' : ''}`}
                    onClick={() => navigateTo('skill-verification')}
                    title={isVerified ? `Verified: ${skill.score || 90}/100` : 'Click to take assessment'}
                  >
                    {isVerified ? (
                      <CheckCircle2 size={13} color="#1D4ED8" />
                    ) : (
                      <Clock size={13} color="#94A3B8" />
                    )}
                    {skill.name} {isVerified && skill.score ? `(${skill.score})` : ''}
                  </button>
                );
              })
            ) : (
              <div style={{ fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic' }}>
                No skill tags added yet. Click 'Edit Skills' above to add your stack.
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
            <button
              onClick={() => navigateTo('skill-verification')}
              className="skill-pill-btn dashed"
              style={{ flex: 1 }}
            >
              <Plus size={15} /> Take Assessment
            </button>
            <button
              onClick={() => {
                setIsSkillModalOnboarding(false);
                setIsSkillModalOpen(true);
              }}
              className="skill-pill-btn dashed"
              style={{ flex: 1, borderColor: '#BFDBFE', color: '#1E40AF' }}
            >
              <Edit3 size={14} /> Add Skill Tags
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recommended Projects */}
      <div className="recommended-projects-card">
        <div className="recommended-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Sparkles size={16} color="#1E40AF" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Recommended Projects (Smart Match)</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
              Ranked dynamically by matching your selected skills and verified assessments.
            </p>
          </div>
          <button
            onClick={() => navigateTo('project-discovery')}
            style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E40AF', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            View All Matches →
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recommendedProjects.map((project) => {
            const hasApplied = appliedProjectIds.includes(project.id);
            const matchData = project.dynamicMatch;
            const isBreakdownOpen = activeBreakdownId === project.id;

            return (
              <div key={project.id} className="project-list-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                      <h4
                        onClick={() => {
                          setSelectedProject(project);
                          navigateTo('project-detail');
                        }}
                        style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}
                      >
                        {project.title}
                      </h4>
                      <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        {project.badge}
                      </span>
                      {matchData.matchScore >= 85 && (
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.15rem 0.45rem', borderRadius: '4px', border: '1px solid #A7F3D0' }}>
                          ★ Top Match
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.65rem', maxWidth: '680px', lineHeight: 1.45 }}>
                      {project.description}
                    </p>

                    {/* Skill Tags with match indicators */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {project.requiredSkills.map((s, i) => {
                        const isMatched = matchData.matchingSkills.includes(s);
                        const isVerified = matchData.verifiedMatches.some(v => v.name === s);
                        return (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.725rem',
                              fontWeight: 600,
                              color: isMatched ? (isVerified ? '#1E40AF' : '#065F46') : '#64748B',
                              backgroundColor: isMatched ? (isVerified ? '#EFF6FF' : '#ECFDF5') : '#F1F5F9',
                              border: isMatched ? (isVerified ? '1px solid #BFDBFE' : '1px solid #A7F3D0') : '1px solid #E2E8F0',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem'
                            }}
                          >
                            {s} {isMatched ? (isVerified ? '✓ Verified' : '✓') : '✗'}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Match Score & Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: matchData.matchScore >= 80 ? '#1E40AF' : '#475569', lineHeight: 1 }}>
                        {matchData.matchScore}%
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveBreakdownId(isBreakdownOpen ? null : project.id)}
                        style={{
                          fontSize: '0.685rem',
                          fontWeight: 700,
                          color: '#2563EB',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: 0,
                          marginTop: '2px'
                        }}
                      >
                        {isBreakdownOpen ? 'Hide Basis ▲' : 'Why Match? ▼'}
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (!hasApplied) {
                          submitProposal(project.id, {});
                        }
                      }}
                      className={`btn ${hasApplied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                      style={{ minWidth: '85px' }}
                    >
                      {hasApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Expandable Match Basis Breakdown */}
                {isBreakdownOpen && (
                  <div style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.785rem'
                  }}>
                    <div style={{ fontWeight: 700, color: '#1E293B', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <HelpCircle size={14} color="#1E40AF" />
                      <span>Why you received a {matchData.matchScore}% match for this project:</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {matchData.whyMatchReasons.map((reason, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', color: reason.startsWith('⚠') ? '#B45309' : reason.startsWith('⚡') ? '#2563EB' : '#0F172A' }}>
                          <CheckCircle2 size={13} color={reason.startsWith('⚠') ? '#F59E0B' : '#059669'} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{reason.replace(/^✓\s*/, '').replace(/^⚠\s*/, '').replace(/^⚡\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
