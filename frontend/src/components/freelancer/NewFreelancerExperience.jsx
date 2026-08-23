import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NEW_FREELANCER } from '../../data/mockData';
import { BackToDashboardButton } from '../common/BackToDashboardButton';

export const NewFreelancerExperience = () => {
  const { navigateTo } = useApp();

  return (
    <div className="dashboard-main" style={{ maxWidth: '840px' }}>
      <BackToDashboardButton
        label="Back to Dashboard"
        fallbackView="freelancer-dashboard"
        breadcrumbs={[
          { label: 'Onboarding Roadmap' }
        ]}
      />

      <div className="dashboard-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} /> Welcome to NexLance
        </div>
        <h1 className="dashboard-title">Build Your Career Score</h1>
        <p className="dashboard-subtitle">
          At NexLance, your reputation isn't built on bids or claims—it's built on proven capability. Complete these milestones to generate your official Career Score.
        </p>
      </div>

      <div className="card" style={{ padding: '2.5rem', borderRadius: '18px', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.04)' }}>
        {/* Progress Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Onboarding Checklist
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>2 of 5 Milestones Completed</h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              40%
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Ready for Verification</span>
          </div>
        </div>

        {/* Milestones Checklist (Section 27) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {NEW_FREELANCER.steps.map((step) => (
            <div
              key={step.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.1rem 1.25rem',
                borderRadius: '10px',
                backgroundColor: step.done ? '#F8FAFC' : '#FFFFFF',
                border: `1.5px solid ${step.done ? '#E2E8F0' : '#1E40AF'}`,
                boxShadow: !step.done ? '0 4px 12px rgba(30, 64, 175, 0.06)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                {step.done ? (
                  <CheckCircle2 size={22} color="#059669" />
                ) : (
                  <Circle size={22} color="#1E40AF" />
                )}
                <span
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: step.done ? '#64748B' : '#0F172A',
                    textDecoration: step.done ? 'line-through' : 'none'
                  }}
                >
                  {step.title}
                </span>
              </div>

              {!step.done && step.action === 'take-assessment' && (
                <button
                  onClick={() => navigateTo('skill-verification')}
                  className="btn btn-primary btn-sm"
                >
                  Take Assessment <ArrowRight size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Motivational Card */}
        <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldCheck size={28} color="#1E40AF" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E3A8A' }}>
              Why start with Skill Verification?
            </h4>
            <p style={{ fontSize: '0.825rem', color: '#1E40AF', marginTop: '0.2rem' }}>
              Passing your first 20-minute assessment instantly unlocks high-ticket Smart Match opportunities and awards you a verified top percentile badge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
