import React from 'react';
import {
  ExternalLink,
  Code2,
  CheckCircle2,
  Star,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BackToDashboardButton } from '../common/BackToDashboardButton';

export const ProofOfWork = () => {
  const { freelancerProfile, showToast } = useApp();

  return (
    <div className="dashboard-main">
      <BackToDashboardButton
        label="Back to Dashboard"
        fallbackView="freelancer-dashboard"
        breadcrumbs={[
          { label: 'Proof of Work' }
        ]}
      />

      <div className="dashboard-header">
        <h1 className="dashboard-title">Proof of Work</h1>
        <p className="dashboard-subtitle">
          Verified production case studies backed by real client sign-offs, live deployments, and performance benchmarks.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {freelancerProfile.proofOfWork.map((project) => (
          <div
            key={project.id}
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '2.5rem',
              padding: '2rem',
              borderRadius: '16px'
            }}
          >
            {/* Left Info Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  {project.role}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  {project.period}
                </span>
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                {project.title}
              </h2>

              <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {project.description}
              </p>

              {/* Skills Used */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Verified Technologies Used
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#1E40AF',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '9999px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}
                    >
                      <CheckCircle2 size={12} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Client Review & Quote */}
              <div style={{ backgroundColor: '#F8FAFC', borderLeft: '3px solid #1E40AF', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={14} fill="#D97706" color="#D97706" />
                  ))}
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginLeft: '0.35rem' }}>
                    {project.client}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#334155' }}>
                  "{project.clientQuote}"
                </p>
              </div>

              {/* Links CTA */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => { e.preventDefault(); showToast('Simulating live project demo preview...', 'info'); }}
                >
                  <ExternalLink size={14} /> View Live Application
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    onClick={(e) => { e.preventDefault(); showToast('Viewing verified code repository...', 'info'); }}
                  >
                    <Code2 size={14} /> Verified Codebase
                  </a>
                )}
              </div>
            </div>

            {/* Right Metrics & Proof Column */}
            <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem' }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Verified Proof Metrics
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.85rem' }}>
                  {project.metrics.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>{m.label}</span>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <ShieldCheck size={18} color="#059669" />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#065F46' }}>
                    Delivery Performance
                  </h4>
                </div>
                <p style={{ fontSize: '0.825rem', color: '#047857' }}>
                  ✓ {project.deliveryTime} with 100% test coverage sign-off
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
