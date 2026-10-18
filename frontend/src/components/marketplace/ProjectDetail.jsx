import React, { useState } from 'react';
import {
  CheckCircle2,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROJECTS } from '../../data/mockData';

export const ProjectDetail = () => {
  const {
    role,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    selectedProject,
    appliedProjectIds,
    submitProposal,
    navigateTo,
    showToast
  } = useApp();

  const project = selectedProject || PROJECTS[0];
  const hasApplied = appliedProjectIds.includes(project.id);

  // Proposal form fields start empty as requested
  const [proposedBudget, setProposedBudget] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (role === 'public') {
      setAuthMode('login');
      setAuthRoleChoice('freelancer');
      setIsAuthModalOpen(true);
      showToast('Please sign in or create an account to submit proposals.', 'info');
      return;
    }
    submitProposal(project.id, { proposedBudget, deliveryTime, coverLetter });
    showToast('Proposal submitted successfully!', 'success');
    navigateTo('freelancer-dashboard');
  };

  return (
    <main style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem 4rem', width: '100%' }}>
      <button
        type="button"
        onClick={() => navigateTo('project-discovery')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'none',
          border: 'none',
          color: '#64748B',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '1.25rem',
          padding: 0
        }}
      >
        ← Back to Projects
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
        {project.title}
      </h1>

      {/* Key Metric Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Budget</span>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{project.budget}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Timeline</span>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{project.deadline}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Experience</span>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{project.experienceLevel}</div>
        </div>
      </div>

      {/* Project Description */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
          Project Overview
        </h2>
        <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          {project.description}
        </p>

        {project.scopePoints && project.scopePoints.length > 0 && (
          <>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.6rem' }}>
              Deliverables:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              {project.scopePoints.map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="#1E40AF" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
          Required Skills:
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {project.requiredSkills.map((s, idx) => (
            <span key={idx} style={{ fontSize: '0.8rem', fontWeight: 600, backgroundColor: '#F1F5F9', color: '#334155', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Proposal Submission Form */}
      <div className="card" style={{ padding: '1.75rem', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Send size={18} color="#1E40AF" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
            {hasApplied ? 'Your Submitted Proposal' : 'Submit Your Proposal'}
          </h2>
        </div>

        {hasApplied ? (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '1rem', color: '#065F46' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
              <CheckCircle2 size={16} /> Proposal Submitted
            </div>
            <p style={{ fontSize: '0.85rem' }}>
              Your proposal has been submitted to the client.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitProposal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Proposed Budget
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₹1,50,000"
                  value={proposedBudget}
                  onChange={e => setProposedBudget(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Estimated Delivery Time
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3 weeks"
                  value={deliveryTime}
                  onChange={e => setDeliveryTime(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Proposal Details / Cover Letter
              </label>
              <textarea
                rows={5}
                required
                placeholder="Enter your proposal details, approach, and why you are a good fit for this project..."
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-md"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Send size={16} /> Submit Proposal
            </button>
          </form>
        )}
      </div>
    </main>
  );
};
