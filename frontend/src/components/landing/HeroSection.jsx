import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Send, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroSection = () => {
  const { navigateTo, handleFindTalent, handleFindWork, showToast } = useApp();

  return (
    <section className="hero-section">
      <div className="hero-grid">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content">
          <div className="pill-badge">
            <Sparkles size={15} color="#2563EB" />
            <span>Now with Verified Proof of Work</span>
          </div>

          <h1 className="hero-title">
            Find the Right Talent.<br />
            <span className="hero-title-gradient">Prove Your Skills.</span>
          </h1>

          <p className="hero-subtitle">
            Revolutionizing the gig economy with verified skills, proof of work, and smart matching technology. Stop guessing, start hiring with confidence.
          </p>

          <div className="hero-cta-group">
            <button
              onClick={handleFindTalent}
              className="btn btn-primary btn-lg"
            >
              Find Talent <ArrowRight size={18} />
            </button>
            <button
              onClick={handleFindWork}
              className="btn btn-secondary btn-lg"
            >
              Find Work
            </button>
          </div>

          {/* Social Proof Avatar Stack */}
          <div className="avatar-stack-container">
            <div className="avatar-stack">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Freelancer"
                className="avatar-stack-item"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Freelancer"
                className="avatar-stack-item"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Freelancer"
                className="avatar-stack-item"
              />
            </div>
            <span className="avatar-stack-text">
              Joined by <strong>10,000+</strong> top proven freelancers
            </span>
          </div>
        </div>

        {/* Right Column: Live Smart Match Card Preview */}
        <div className="smart-match-preview-card">
          <div className="smart-match-header">
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Smart Match Analysis
            </span>
            <div className="live-pill">
              <div className="live-dot"></div>
              <span>Live View</span>
            </div>
          </div>

          {/* Candidate Bio Row */}
          <div className="match-candidate-row">
            <div className="match-candidate-info">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Alex Morgan"
                className="candidate-avatar"
              />
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Alex Morgan</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Senior Full-Stack Developer</p>
              </div>
            </div>

            <div className="match-score-badge">
              <div className="match-score-number">98%</div>
              <div className="match-score-label">Match Score</div>
            </div>
          </div>

          {/* Verified Skills Strip */}
          <div className="match-verified-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} color="#1E40AF" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E40AF' }}>
                React & Next.js
              </span>
            </div>
            <span
              style={{
                backgroundColor: '#DBEAFE',
                color: '#1E3A8A',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                fontSize: '0.725rem',
                fontWeight: 700
              }}
            >
              Verified Expert
            </span>
          </div>

          {/* Career Score Metric Strip */}
          <div className="match-score-strip">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} color="#059669" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>
                Career Score
              </span>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
              91 <span style={{ color: '#94A3B8', fontWeight: 500, fontSize: '0.8rem' }}>/ 100</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={() => showToast('Direct offer modal initiated with Alex Morgan', 'success')}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.6rem' }}
            >
              <Send size={14} /> Send Offer
            </button>
            <button
              onClick={() => navigateTo('freelancer-profile')}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.6rem' }}
            >
              <Eye size={14} /> View Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
