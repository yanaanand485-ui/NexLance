import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CTASection = () => {
  const { setIsAuthModalOpen, setAuthMode, setAuthRoleChoice } = useApp();

  const handleGetStarted = () => {
    setAuthMode('signup');
    setAuthRoleChoice('freelancer');
    setIsAuthModalOpen(true);
  };

  const handleHireTalent = () => {
    setAuthMode('signup');
    setAuthRoleChoice('client');
    setIsAuthModalOpen(true);
  };

  return (
    <section className="cta-banner">
      <div className="cta-banner-inner">
        <h2 className="cta-title">Ready to build your next big thing?</h2>
        <p className="cta-subtitle">
          Join thousands of forward-thinking companies and elite freelancers who are building the future on proof.
        </p>

        <div className="cta-buttons">
          <button
            onClick={handleGetStarted}
            className="btn btn-cta-light btn-lg"
          >
            Get Started Today <ArrowRight size={18} />
          </button>
          <button
            onClick={handleHireTalent}
            className="btn btn-cta-glass btn-lg"
          >
            Hire Proven Talent
          </button>
        </div>
      </div>
    </section>
  );
};
