import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroPhotoShowcase } from './HeroPhotoShowcase';

export const HeroSection = () => {
  const { role, handleFindTalent, handleFindWork } = useApp();

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

        {/* Right Column: Clean Photo & Visual Showcase for visitors without login */}
        <HeroPhotoShowcase />
      </div>
    </section>
  );
};


