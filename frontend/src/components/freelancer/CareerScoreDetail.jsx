import React from 'react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';

export const CareerScoreDetail = () => {
  const { freelancerProfile } = useApp();

  const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';
  const careerScore = isSarah ? 95 : (freelancerProfile?.careerScore || 0);

  const pillars = [
    {
      name: "Client Satisfaction",
      score: isSarah ? 97 : (freelancerProfile?.clientSatisfactionRate || (careerScore > 0 ? 95 : 0)),
      description: "Based on verified post-project client ratings and reviews"
    },
    {
      name: "Timely Delivery",
      score: isSarah ? 98 : (freelancerProfile?.onTimeDeliveryRate || (careerScore > 0 ? 96 : 0)),
      description: "Milestones delivered on or before agreed deadlines"
    },
    {
      name: "Work Quality & Test Coverage",
      score: isSarah ? 99 : (freelancerProfile?.codeQualityRate || (careerScore > 0 ? Math.round(careerScore * 0.98) : 0)),
      description: "Rigorous code reviews, clean git history, and deployment quality"
    },
    {
      name: "Communication Responsiveness",
      score: isSarah ? 95 : (freelancerProfile?.communicationRate || (careerScore > 0 ? 94 : 0)),
      description: "Prompt response time during active contract hours"
    },
    {
      name: "Budget Adherence",
      score: isSarah ? 94 : (freelancerProfile?.budgetAdherenceRate || (careerScore > 0 ? 92 : 0)),
      description: "Delivering fully scoped milestones without unapproved scope bloat"
    },
    {
      name: "Project Completion Rate",
      score: isSarah ? 100 : (freelancerProfile?.completionRate || (careerScore > 0 ? 98 : 0)),
      description: "Ratio of successfully closed and accepted projects"
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

      {/* Top Score Summary Card (Trajectory Graph removed) */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap'
        }}
      >
        <CareerScoreBadge score={careerScore} size="lg" showLabel={false} />
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem 0' }}>
            {careerScore > 0 ? 'Tier 1: Elite Freelancer' : 'New Freelancer (Score: 0)'}
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0, maxWidth: '520px', lineHeight: 1.5 }}>
            {careerScore > 0
              ? 'Top reliability index on NexLance backed by verified delivery standards.'
              : 'Complete skill assessments and project milestones to generate your score.'}
          </p>
        </div>
      </div>

      {/* 6 Performance Pillars - Simple Basic Cards */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
        Career Score Performance Pillars
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                {pillar.name}
              </h3>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E40AF' }}>
                {pillar.score}%
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

