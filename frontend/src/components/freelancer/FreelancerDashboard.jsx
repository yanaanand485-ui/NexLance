import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Briefcase,
  FileText,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Plus,
  Star,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const FreelancerDashboard = () => {
  const {
    freelancerProfile,
    navigateTo,
    setSelectedProject,
    appliedProjectIds,
    submitProposal,
    showToast
  } = useApp();

  const recommendedProjects = [
    {
      id: "proj-101",
      title: "React E-Commerce Platform",
      badge: "Enterprise",
      description: "Looking for a senior developer to lead the frontend architecture for our new global store with sub-second page loads...",
      skills: ["React", "Next.js", "Stripe"],
      matchScore: 96
    },
    {
      id: "proj-102",
      title: "Internal Dashboard Migration",
      badge: "Series B",
      description: "Migrating legacy Angular application to a modern React stack with comprehensive testing and 10k+ row data tables...",
      skills: ["React", "TypeScript", "Jest"],
      matchScore: 88
    },
    {
      id: "proj-103",
      title: "Real-time Financial Analytics API",
      badge: "Fintech",
      description: "Build a high-throughput Node.js microservice architecture for real-time market order book data and streaming delta updates...",
      skills: ["Node.js", "Redis", "GraphQL"],
      matchScore: 82
    }
  ];

  return (
    <div className="dashboard-main">
      {/* Header Greeting */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Good morning, {freelancerProfile.name}. Here is your professional overview.
        </h1>
        <p className="dashboard-subtitle">
          Your career data is tracking ahead of industry averages this week.
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
            <CareerScoreBadge score={freelancerProfile.careerScore} size="md" showLabel={false} />
          </div>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
            +3 pts from last month
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
                {freelancerProfile.activeProjectsCount}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>in progress</span>
            </div>
            {/* Progress bar */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', marginTop: '0.85rem', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
            </div>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            Next delivery in 4 days
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
                {freelancerProfile.applicationsCount}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>pending</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
            <TrendingUp size={13} /> +3 this week
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
                {freelancerProfile.completedProjectsCount}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>total projects</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1, 2, 3].map(i => (
              <span key={i} style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF' }}>
                <Star size={11} fill="#1E40AF" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Performance Metrics & Verified Skills Card */}
      <div className="performance-grid">
        {/* Left: Performance Metrics Chart & Breakdown */}
        <div className="performance-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Performance Metrics</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.5rem' }}>
            30-day trailing averages vs industry baseline
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: '2rem', alignItems: 'center' }}>
            {/* Smooth SVG Trend Line Chart */}
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

                {/* Shaded Area */}
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
              </svg>
            </div>

            {/* Metric Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>Client Satisfaction</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>94%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '94%', height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>On-Time Delivery</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>96%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '96%', height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>Code Quality</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>98%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: '98%', height: '100%', backgroundColor: '#1E40AF', borderRadius: '9999px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Verified Skills Card */}
        <div className="verified-skills-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <ShieldCheck size={20} color="#1E40AF" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Verified Skills</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
            Passed assessments showing on your profile
          </p>

          <div className="skills-pill-wrap">
            <button className="skill-pill-btn">
              <CheckCircle2 size={13} color="#1D4ED8" /> React
            </button>
            <button className="skill-pill-btn">
              <CheckCircle2 size={13} color="#1D4ED8" /> Node.js
            </button>
            <button className="skill-pill-btn">
              <CheckCircle2 size={13} color="#1D4ED8" /> TypeScript
            </button>
            <button className="skill-pill-btn">
              <CheckCircle2 size={13} color="#1D4ED8" /> GraphQL
            </button>
            <button className="skill-pill-btn unverified">
              <Clock size={13} color="#94A3B8" /> AWS
            </button>
          </div>

          <button
            onClick={() => navigateTo('skill-verification')}
            className="skill-pill-btn dashed"
          >
            <Plus size={15} /> Verify New Skill
          </button>
        </div>
      </div>

      {/* Bottom Section: Recommended Projects */}
      <div className="recommended-projects-card">
        <div className="recommended-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Recommended Projects</h3>
          <button
            onClick={() => navigateTo('project-discovery')}
            style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
          >
            View All Matches
          </button>
        </div>

        <div>
          {recommendedProjects.map((project) => {
            const hasApplied = appliedProjectIds.includes(project.id);
            return (
              <div key={project.id} className="project-list-item">
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <h4
                      onClick={() => navigateTo('project-detail')}
                      style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}
                    >
                      {project.title}
                    </h4>
                    <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {project.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.65rem', maxWidth: '680px' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {project.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                      {project.matchScore}%
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Match
                    </div>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
