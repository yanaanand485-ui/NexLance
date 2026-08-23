import React from 'react';
import {
  ExternalLink,
  Code2,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { BackToDashboardButton } from '../common/BackToDashboardButton';

export const FreelancerProfile = () => {
  const {
    role,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    selectedFreelancer,
    freelancerProfile,
    toggleShortlist,
    shortlistedFreelancers,
    toggleComparison,
    comparisonList,
    showToast
  } = useApp();

  const freelancer = selectedFreelancer || freelancerProfile;
  const isShortlisted = shortlistedFreelancers.includes(freelancer.id);
  const isCompared = comparisonList.some(item => item.id === freelancer.id);

  const handleHireClick = () => {
    if (role === 'public') {
      setAuthMode('login');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      showToast(`Please sign in or create a Client account to hire ${freelancer.name.split(' ')[0]}.`, 'info');
      return;
    }
    showToast(`Direct interview proposal initiated with ${freelancer.name}!`, 'success');
  };

  return (
    <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '2rem 1.5rem 4rem', width: '100%' }}>
      {/* Navigation & Breadcrumbs */}
      <BackToDashboardButton
        label="Back to Talent"
        fallbackView="talent-discovery"
        showDashboardDirect={true}
        breadcrumbs={[
          { label: 'Find Talent', view: 'talent-discovery' },
          { label: freelancer.name }
        ]}
      />

      {/* Top Profile Header Card (Section 9) */}
      <div className="card" style={{ padding: '2.5rem', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.04)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left Column: Bio & Skills */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                style={{ width: '84px', height: '84px', borderRadius: '16px', objectFit: 'cover', border: '3px solid #EFF6FF' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                    {freelancer.name}
                  </h1>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                    🟢 Available Now
                  </span>
                </div>
                <p style={{ fontSize: '1.05rem', color: '#475569', fontWeight: 500, marginTop: '0.15rem' }}>
                  {freelancer.title || freelancer.role}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem', fontSize: '0.85rem', color: '#64748B' }}>
                  <span style={{ fontWeight: 700, color: '#1E40AF' }}>{freelancer.rateDisplay || freelancer.hourlyRate}</span>
                  <span>• ★ {freelancer.rating} ({freelancer.totalReviews || freelancer.reviewsCount || 38} reviews)</span>
                  <span>• {freelancer.completedProjectsCount || freelancer.projectsCompleted || 42} completed</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {freelancer.bio}
            </p>

            {/* Verified Skills Bar */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Verified Skill Assessments
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                {(freelancer.verifiedSkills || freelancer.topSkills).map((s, idx) => (
                  <VerifiedBadge key={idx} skillName={s.name} score={s.score} percentile={s.percentile} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Career Score Gauge & Action CTAs */}
          <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
            <CareerScoreBadge score={freelancer.careerScore} size="lg" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', maxWidth: '280px' }}>
              <button
                onClick={handleHireClick}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <Send size={15} /> Hire / Contact {freelancer.name.split(' ')[0]}
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button
                  onClick={() => toggleShortlist(freelancer.id)}
                  className={`btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  {isShortlisted ? 'Shortlisted ⭐' : 'Shortlist'}
                </button>
                <button
                  onClick={() => toggleComparison(freelancer)}
                  className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'} btn-sm`}
                >
                  {isCompared ? 'Comparing' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Career Score Breakdown & Reliability Trajectory */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
            Career Score Performance Breakdown
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {[
              { label: 'Client Satisfaction', score: freelancer.clientSatisfaction || 94, color: '#059669' },
              { label: 'On-Time Delivery', score: freelancer.onTimeDelivery || 96, color: '#1E40AF' },
              { label: 'Work Quality & Testing', score: freelancer.workQuality || 98, color: '#7C3AED' },
              { label: 'Communication Index', score: freelancer.communication || 90, color: '#2563EB' },
              { label: 'Budget Adherence', score: freelancer.budgetAdherence || 88, color: '#D97706' },
              { label: 'Project Completion Rate', score: 100, color: '#059669' }
            ].map((metric, idx) => (
              <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>{metric.label}</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{metric.score}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: `${metric.score}%`, height: '100%', backgroundColor: metric.color, borderRadius: '9999px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Trajectory Graph */}
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
              Career Score History
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Trailing 6-month growth based on completed verified milestones
            </p>
            <div style={{ height: '130px', width: '100%' }}>
              <svg viewBox="0 0 300 120" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <path
                  d="M 10 100 Q 70 80, 140 50 T 290 15"
                  fill="none"
                  stroke="#1E40AF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="290" cy="15" r="5" fill="#1E40AF" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <div style={{ backgroundColor: '#EFF6FF', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #BFDBFE', fontSize: '0.8rem', color: '#1E40AF', fontWeight: 600 }}>
            ✓ Consistent 90+ score over last 4 consecutive quarters
          </div>
        </div>
      </div>

      {/* Section: Proof of Work Portfolio (Section 10) */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
        Verified Proof of Work
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {(freelancer.proofOfWork || []).map((project) => (
          <div
            key={project.id}
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 0.7fr',
              gap: '2rem',
              padding: '1.75rem',
              borderRadius: '16px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {project.role}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{project.period}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55, marginBottom: '1rem' }}>{project.description}</p>
              <div style={{ backgroundColor: '#F8FAFC', borderLeft: '3px solid #1E40AF', padding: '0.75rem 1rem', borderRadius: '0 6px 6px 0', fontSize: '0.85rem', fontStyle: 'italic', color: '#334155' }}>
                "{project.clientQuote}"
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Verified Metrics</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {project.metrics.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: '#475569' }}>{m.label}</span>
                      <strong style={{ color: '#0F172A' }}>{m.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                  <ExternalLink size={13} /> Live App
                </a>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                    <Code2 size={13} /> Codebase
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
