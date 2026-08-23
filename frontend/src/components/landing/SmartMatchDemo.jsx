import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { FREELANCERS } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const SmartMatchDemo = () => {
  const {
    role,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    navigateTo,
    setSelectedFreelancer,
    showToast
  } = useApp();
  const [activeTab, setActiveTab] = useState('match-1');

  const matchCandidates = [
    {
      id: 'match-1',
      freelancer: FREELANCERS[0],
      matchScore: 98,
      headline: 'Best Overall Match',
      reasons: [
        '98% Skill Match across React & TypeScript stack',
        'React Skill Verified: Top 5% Global Percentile',
        '8 Similar enterprise e-commerce platforms completed',
        '96% On-time delivery rate across 42 projects',
        'Currently available for immediate project onboarding'
      ]
    },
    {
      id: 'match-2',
      freelancer: FREELANCERS[1],
      matchScore: 95,
      headline: 'UI/UX & Design Systems Specialist',
      reasons: [
        '95% Skill Match with interactive frontend needs',
        'Figma UI/UX Verified Score 96/100 (Top 1% Global)',
        'Delivered 54 high-satisfaction projects (4.98 rating)',
        '98% Client satisfaction rate'
      ]
    },
    {
      id: 'match-3',
      freelancer: FREELANCERS[2],
      matchScore: 92,
      headline: 'DevOps & Scalability Match',
      reasons: [
        '92% Alignment on cloud deployment & performance',
        'Kubernetes & AWS Verified Top 1% Global',
        '99% On-time delivery rate on complex infra'
      ]
    }
  ];

  const currentMatch = matchCandidates.find(m => m.id === activeTab) || matchCandidates[0];
  const candidate = currentMatch.freelancer;

  return (
    <section style={{ padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkles size={14} /> NexLance Smart Match Engine
          </div>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
            Transparent AI Matching Based on Proof
          </h2>
          <p style={{ color: '#64748B', fontSize: '1.05rem' }}>
            NexLance doesn't just show "AI Recommended"—it gives clients clear proof of why a candidate is the best fit.
          </p>
        </div>

        {/* Project Target Spec Card */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Sample Project Match</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Build a Next.js E-Commerce Multi-Brand Store</h3>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-verified">React (Required)</span>
            <span className="badge badge-verified">TypeScript (Required)</span>
            <span className="badge badge-neutral">Stripe Checkout</span>
            <span className="badge badge-neutral">Tailwind CSS</span>
          </div>
        </div>

        {/* Candidate Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
          {matchCandidates.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                border: '1.5px solid',
                borderColor: activeTab === m.id ? '#1E40AF' : '#E2E8F0',
                backgroundColor: activeTab === m.id ? '#EFF6FF' : '#FFFFFF',
                color: activeTab === m.id ? '#1E40AF' : '#475569',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <img
                src={m.freelancer.avatar}
                alt={m.freelancer.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span>{m.freelancer.name}</span>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  backgroundColor: activeTab === m.id ? '#1E40AF' : '#E2E8F0',
                  color: activeTab === m.id ? '#FFFFFF' : '#475569'
                }}
              >
                {m.matchScore}% Match
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Match Result Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.05)' }}>
          {/* Left Column: Candidate Metrics */}
          <div style={{ borderRight: '1px solid #F1F5F9', paddingRight: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img
                src={candidate.avatar}
                alt={candidate.name}
                style={{ width: '68px', height: '68px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #E2E8F0' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{candidate.name}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#059669' }}></div> Available
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{candidate.title}</p>
                <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#1E40AF', marginTop: '0.25rem' }}>
                  {candidate.hourlyRate}
                </div>
              </div>
            </div>

            {/* Metric Bars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Career Score</span>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{candidate.careerScore} / 100</div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Client Satisfaction</span>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669' }}>{candidate.clientSatisfaction}%</div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>On-Time Delivery</span>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#1E40AF' }}>{candidate.onTimeDelivery}%</div>
              </div>
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Completed Projects</span>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>{candidate.projectsCompleted}</div>
              </div>
            </div>

            {/* Verified Skills */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Verified Competencies
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {candidate.topSkills.map((s, idx) => (
                  <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Why Candidate is a strong match */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                  Why {candidate.name} is a strong match
                </h4>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E40AF' }}>
                  {currentMatch.matchScore}% Alignment
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {currentMatch.reasons.map((reason, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px'
                    }}
                  >
                    <CheckCircle2 size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.875rem', color: '#1E293B', fontWeight: 500 }}>
                      {reason}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
              <button
                onClick={() => {
                  if (role === 'public') {
                    setAuthMode('login');
                    setAuthRoleChoice('client');
                    setIsAuthModalOpen(true);
                    showToast('Pehle login karein — Client account se verified profiles dekhein.', 'info');
                    return;
                  }
                  setSelectedFreelancer(candidate);
                  navigateTo('freelancer-profile');
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                View Full Profile & Work <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  if (role === 'public') {
                    setAuthMode('login');
                    setAuthRoleChoice('client');
                    setIsAuthModalOpen(true);
                    showToast('Pehle login karein — Client account se interview invite bhejein.', 'info');
                    return;
                  }
                  showToast(`Direct interview invite sent to ${candidate.name}!`, 'success');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                <Send size={15} /> Instant Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
