import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HeroPhotoShowcase } from './HeroPhotoShowcase';

export const HeroSection = () => {
  const { handleFindTalent, handleFindWork } = useApp();

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
        </div>

        {/* Right Column: Clean Photo & Visual Showcase for visitors without login */}
        <HeroPhotoShowcase />
      </div>
    </section>
  );
};


