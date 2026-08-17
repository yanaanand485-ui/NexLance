import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Star, Users, CheckCircle2, ArrowRight, Lock, Award, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HeroPhotoShowcase = () => {
  const { role, setIsAuthModalOpen, setAuthMode, setAuthRoleChoice, handleFindTalent, handleFindWork } = useApp();
  const [activeTab, setActiveTab] = useState('talent'); // 'talent' | 'freelancer'

  const openRegister = (chosenRole) => {
    setAuthMode('signup');
    setAuthRoleChoice(chosenRole);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="hero-photo-card">
      {/* Photo Frame Container */}
      <div className="photo-frame-wrapper">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80"
          alt="NexLance Verified Workspace and Collaboration"
          className="hero-main-photo"
          loading="eager"
        />

        {/* Ambient Gradient Overlay */}
        <div className="photo-gradient-overlay" />

        {/* Floating Glass Badge: Top Left - Verified Proof */}
        <div className="photo-floating-badge badge-top-left">
          <div className="badge-icon-box bg-blue">
            <ShieldCheck size={18} color="#2563EB" />
          </div>
          <div>
            <div className="badge-title">100% Verified Proof</div>
            <div className="badge-sub">Real code & skill benchmarks</div>
          </div>
        </div>

        {/* Floating Glass Badge: Top Right - Escrow Protected */}
        <div className="photo-floating-badge badge-top-right">
          <div className="badge-icon-box bg-emerald">
            <Lock size={16} color="#059669" />
          </div>
          <div>
            <div className="badge-title">Escrow Protected</div>
            <div className="badge-sub">Safe milestone payouts</div>
          </div>
        </div>

        {/* Floating Glass Badge: Bottom Left - Top Rating & Talent */}
        <div className="photo-floating-badge badge-bottom-left">
          <div className="badge-stars-row">
            <div className="stars-group">
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
            </div>
            <span className="badge-rating-text">4.9 / 5.0</span>
          </div>
          <div className="badge-sub-dark">Trusted by 10,000+ companies & experts</div>
        </div>

        {/* Floating Glass Badge: Bottom Right - Fast Matching */}
        <div className="photo-floating-badge badge-bottom-right">
          <div className="badge-pulse-indicator">
            <span className="pulse-dot-cyan"></span>
            <Sparkles size={14} color="#0284C7" />
          </div>
          <div>
            <div className="badge-title">Smart Matching</div>
            <div className="badge-sub">Hire in under 24 hours</div>
          </div>
        </div>
      </div>

      {/* Guest Welcome & Quick Onboarding Strip */}
      <div className="photo-card-footer">
        <div className="photo-footer-tabs">
          <button
            onClick={() => setActiveTab('talent')}
            className={`photo-tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
          >
            <Briefcase size={14} /> Hire Verified Talent
          </button>
          <button
            onClick={() => setActiveTab('freelancer')}
            className={`photo-tab-btn ${activeTab === 'freelancer' ? 'active' : ''}`}
          >
            <Award size={14} /> Work as a Freelancer
          </button>
        </div>

        <div className="photo-footer-content">
          {activeTab === 'talent' ? (
            <div className="photo-tab-info">
              <div className="tab-info-text">
                <p className="tab-lead">Post your project for free & get verified candidate matches.</p>
                <div className="tab-perks">
                  <span><CheckCircle2 size={13} color="#059669" /> Zero upfront fee</span>
                  <span><CheckCircle2 size={13} color="#059669" /> Vetted code proof</span>
                </div>
              </div>
              <button
                onClick={() => openRegister('client')}
                className="btn btn-primary btn-sm photo-cta-btn"
              >
                Get Started <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="photo-tab-info">
              <div className="tab-info-text">
                <p className="tab-lead">Prove your skills with tests & win high-paying client contracts.</p>
                <div className="tab-perks">
                  <span><CheckCircle2 size={13} color="#2563EB" /> Free skill assessment</span>
                  <span><CheckCircle2 size={13} color="#2563EB" /> Guaranteed payment</span>
                </div>
              </div>
              <button
                onClick={() => openRegister('freelancer')}
                className="btn btn-primary btn-sm photo-cta-btn"
              >
                Join as Talent <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
