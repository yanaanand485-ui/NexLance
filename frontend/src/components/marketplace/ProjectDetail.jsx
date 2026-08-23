import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  Sparkles,
  Send,
  FileText,
  User,
  ShieldCheck,
  Star,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROJECTS } from '../../data/mockData';
import { calculateProjectMatch } from '../../utils/matchEngine';

export const ProjectDetail = () => {
  const {
    role,
    freelancerProfile,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    selectedProject,
    appliedProjectIds,
    submitProposal,
    showToast,
    navigateTo
  } = useApp();

  const project = selectedProject || PROJECTS[0];
  const hasApplied = appliedProjectIds.includes(project.id);
  const matchData = calculateProjectMatch(project, freelancerProfile);

  const [proposedBudget, setProposedBudget] = useState('₹1,50,000');
  const [deliveryTime, setDeliveryTime] = useState('3 weeks');
  const [coverLetter, setCoverLetter] = useState(
    'Hi Sarah,\n\nI reviewed your Next.js 14 architecture requirements and have already built 8 similar enterprise e-commerce platforms (including OmniCart, which saw a 68% drop in page load time). My React and TypeScript skills are platform-verified in the top 5% global percentile.\n\nI can start immediately and deliver high-coverage unit tests with sub-100ms faceted search.'
  );

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
  };

  return (
    <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%' }}>
      {/* Top Banner Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.75fr', gap: '2.5rem' }}>
        {/* Left Column: Project Scope & Specifications */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              {project.badge}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Posted {project.postedAgo} • {project.applicantsCount} proposals
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            {project.title}
          </h1>

          {/* Key Metric Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
              <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Budget</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>{project.budget}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
              <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Timeline</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>{project.deadline}</div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem' }}>
              <span style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Experience</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>{project.experienceLevel}</div>
            </div>
          </div>

          {/* Project Description */}
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
              Project Overview & Scope
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              {project.description}
            </p>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
              Key Deliverables & Objectives:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {(project.scopePoints || []).map((point, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#1E40AF" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
              Required Verified Skills:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {project.requiredSkills.map((s, idx) => (
                <span key={idx} className="badge badge-verified" style={{ padding: '0.35rem 0.75rem', fontSize: '0.825rem' }}>
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Proposal Submission Form (Section 13) */}
          <div className="card" style={{ padding: '2rem', border: '1.5px solid #1E40AF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Send size={20} color="#1E40AF" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                {hasApplied ? 'Your Submitted Proposal' : 'Submit Your Project Proposal'}
              </h2>
            </div>

            {hasApplied ? (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '1.25rem', color: '#065F46' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>
                  <CheckCircle2 size={18} /> Proposal Active & Under Review
                </div>
                <p style={{ fontSize: '0.875rem' }}>
                  The client has received your verified proposal. You will be notified in real-time when the client schedules an interview or funds platform escrow.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProposal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Proposed Budget
                    </label>
                    <input
                      type="text"
                      required
                      value={proposedBudget}
                      onChange={e => setProposedBudget(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Estimated Delivery Time
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryTime}
                      onChange={e => setDeliveryTime(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Cover Letter & Approach (Explain why your verified proof qualifies you)
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={coverLetter}
                    onChange={e => setCoverLetter(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <Send size={16} /> Submit Verified Proposal to Client
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: "Your Match" Box & Client Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Smart Match Breakdown Card */}
          <div className="card" style={{ backgroundColor: '#EFF6FF', border: '1.5px solid #BFDBFE', padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Smart Match Score
              </span>
              <Sparkles size={18} color="#1E40AF" />
            </div>

            <div style={{ fontSize: '3rem', fontWeight: 800, color: matchData.matchScore >= 80 ? '#1E40AF' : '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1, marginBottom: '1rem' }}>
              {matchData.matchScore}%
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {matchData.whyMatchReasons.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.825rem', color: r.startsWith('⚠') ? '#B45309' : '#1E3A8A', fontWeight: 600 }}>
                  <CheckCircle2 size={15} color={r.startsWith('⚠') ? '#F59E0B' : '#1E40AF'} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{r.replace(/^✓\s*/, '').replace(/^⚠\s*/, '').replace(/^⚡\s*/, '')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #BFDBFE', paddingTop: '0.75rem', fontSize: '0.775rem', color: '#1E40AF' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Matched Skills:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {project.requiredSkills.map(req => {
                  const isMatched = matchData.matchingSkills.includes(req);
                  return (
                    <span
                      key={req}
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        backgroundColor: isMatched ? '#FFFFFF' : '#FEF2F2',
                        color: isMatched ? '#1E40AF' : '#991B1B',
                        border: isMatched ? '1px solid #93C5FD' : '1px solid #FECACA'
                      }}
                    >
                      {req} {isMatched ? '✓' : '✗'}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Client Details Card */}
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
              About the Client
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img
                src={project.client.avatar}
                alt={project.client.name}
                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{project.client.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>{project.client.country}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Payment Verified:</span>
                <strong style={{ color: '#059669' }}>✓ Verified Escrow</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Client Rating:</span>
                <strong style={{ color: '#0F172A' }}>★ {project.client.rating} (12 reviews)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total Spent:</span>
                <strong style={{ color: '#0F172A' }}>{project.client.spent}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
