import React from 'react';
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  MessageSquare,
  DollarSign,
  Award,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';

export const CareerScoreDetail = () => {
  const { freelancerProfile } = useApp();

  const pillars = [
    {
      name: "Client Satisfaction",
      score: freelancerProfile.clientSatisfactionRate,
      icon: <CheckCircle2 size={18} color="#059669" />,
      description: "Based on verified post-project client ratings and reviews",
      benchmark: "+8% vs marketplace average"
    },
    {
      name: "Timely Delivery",
      score: freelancerProfile.onTimeDeliveryRate,
      icon: <Clock size={18} color="#1E40AF" />,
      description: "Milestones delivered on or before agreed deadlines",
      benchmark: "96% on-time milestone delivery"
    },
    {
      name: "Work Quality & Test Coverage",
      score: freelancerProfile.codeQualityRate,
      icon: <Award size={18} color="#7C3AED" />,
      description: "Rigorous code review scores, clean git history, and zero-defect deployments",
      benchmark: "Top 3% code cleanliness index"
    },
    {
      name: "Communication Responsiveness",
      score: freelancerProfile.communicationRate,
      icon: <MessageSquare size={18} color="#2563EB" />,
      description: "Average response time under 15 minutes during active contract hours",
      benchmark: "Under 15 min median response"
    },
    {
      name: "Budget Adherence",
      score: freelancerProfile.budgetAdherenceRate,
      icon: <DollarSign size={18} color="#D97706" />,
      description: "Delivering fully scoped milestones without unapproved scope bloat",
      benchmark: "Zero budget overruns across 42 projects"
    },
    {
      name: "Project Completion Rate",
      score: freelancerProfile.completionRate,
      icon: <ShieldCheck size={18} color="#059669" />,
      description: "Ratio of successfully closed and accepted projects vs started contracts",
      benchmark: "100% completion reliability"
    }
  ];

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Career Score Analytics</h1>
        <p className="dashboard-subtitle">
          A multi-dimensional trust metric based on actual client performance, proof of work, and verified skills.
        </p>
      </div>

      {/* Top Banner with Score Gauge and Key Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.04)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #F1F5F9', paddingRight: '1.5rem' }}>
          <CareerScoreBadge score={freelancerProfile.careerScore || 0} size="lg" showLabel={false} />
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              {(freelancerProfile.careerScore || 0) > 0 ? 'Tier 1: Elite Freelancer' : 'New Freelancer (Unranked)'}
            </span>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
              {(freelancerProfile.careerScore || 0) > 0
                ? 'Top 2% reliability index across the entire NexLance network.'
                : 'Complete verified skill tests or project milestones to calculate your score.'}
            </p>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>6-Month Score Trajectory</h3>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: (freelancerProfile.careerScore || 0) > 0 ? '#059669' : '#64748B', backgroundColor: (freelancerProfile.careerScore || 0) > 0 ? '#ECFDF5' : '#F1F5F9', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
              {(freelancerProfile.careerScore || 0) > 0 ? '+11 pts increase' : '0 pts · Baseline'}
            </span>
          </div>

          {/* Trajectory Graph */}
          <div style={{ height: '140px', width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 400 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Guidelines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="60" x2="400" y2="60" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="0" y1="100" x2="400" y2="100" stroke="#F1F5F9" strokeWidth="1" />

              {(freelancerProfile.careerScore || 0) > 0 ? (
                <>
                  {/* Curve for experienced user */}
                  <path
                    d="M 20 100 Q 100 80, 180 50 T 380 15"
                    fill="none"
                    stroke="#1E40AF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Month Dots */}
                  {(freelancerProfile.scoreHistory || []).map((item, idx) => {
                    const x = 30 + idx * 70;
                    const y = Math.max(15, 100 - (item.score - 80) * 5.5);
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="4.5" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="2" />
                        <text x={x} y="118" textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="600">{item.month}</text>
                        <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fill="#0F172A" fontWeight="700">{item.score}</text>
                      </g>
                    );
                  })}
                </>
              ) : (
                <>
                  {/* Flat straight baseline for new user */}
                  <path
                    d="M 20 100 L 380 100"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {(freelancerProfile.scoreHistory || [
                    { month: 'May', score: 0 },
                    { month: 'Jun', score: 0 },
                    { month: 'Jul', score: 0 },
                    { month: 'Aug', score: 0 },
                    { month: 'Sep', score: 0 },
                    { month: 'Oct', score: 0 }
                  ]).map((item, idx) => {
                    const x = 30 + idx * 70;
                    const y = 100;
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                        <text x={x} y="118" textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="600">{item.month}</text>
                        <text x={x} y={y - 8} textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="700">{item.score}</text>
                      </g>
                    );
                  })}
                </>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* 6 Pillars Breakdown Cards */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
        Career Score Performance Pillars
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
        {pillars.map((pillar, idx) => (
          <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {pillar.icon}
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
                  {pillar.score}%
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                {pillar.name}
              </h4>
              <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.45 }}>
                {pillar.description}
              </p>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9', fontSize: '0.75rem', fontWeight: 600, color: '#1E40AF' }}>
              ✓ {pillar.benchmark}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
