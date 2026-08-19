import React from 'react';
import { Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', marginTop: 'auto', padding: '4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3.5rem' }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div className="brand-icon-box" style={{ width: '28px', height: '28px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>NexLance</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, maxWidth: '280px' }}>
              The world's first verified skills and proof-based freelancing marketplace.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#1E40AF', fontWeight: 600 }}>
              <Shield size={16} /> 100% Escrow & Verified Skills
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              <li><a onClick={() => navigateTo('talent-discovery')} style={{ fontSize: '0.875rem', color: '#64748B', cursor: 'pointer' }}>Find Talent</a></li>
              <li><a onClick={() => navigateTo('project-discovery')} style={{ fontSize: '0.875rem', color: '#64748B', cursor: 'pointer' }}>Find Work</a></li>
              <li><a onClick={() => navigateTo('services-marketplace')} style={{ fontSize: '0.875rem', color: '#64748B', cursor: 'pointer' }}>Services Marketplace</a></li>
              <li><a onClick={() => navigateTo('skill-verification')} style={{ fontSize: '0.875rem', color: '#64748B', cursor: 'pointer' }}>Skill Verification</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              <li><a href="#about" style={{ fontSize: '0.875rem', color: '#64748B' }}>About Us</a></li>
              <li><a href="#careers" style={{ fontSize: '0.875rem', color: '#64748B' }}>Careers</a></li>
              <li><a href="#blog" style={{ fontSize: '0.875rem', color: '#64748B' }}>Engineering Blog</a></li>
              <li><a href="#press" style={{ fontSize: '0.875rem', color: '#64748B' }}>Press Kit</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              <li><a href="#support" style={{ fontSize: '0.875rem', color: '#64748B' }}>Support Center</a></li>
              <li><a href="#api" style={{ fontSize: '0.875rem', color: '#64748B' }}>API Documentation</a></li>
              <li><a href="#status" style={{ fontSize: '0.875rem', color: '#64748B' }}>System Status</a></li>
              <li><a href="#community" style={{ fontSize: '0.875rem', color: '#64748B' }}>Community Forum</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0 }}>
              <li><a href="#privacy" style={{ fontSize: '0.875rem', color: '#64748B' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ fontSize: '0.875rem', color: '#64748B' }}>Terms of Service</a></li>
              <li><a href="#cookies" style={{ fontSize: '0.875rem', color: '#64748B' }}>Cookie Policy</a></li>
              <li><a href="#security" style={{ fontSize: '0.875rem', color: '#64748B' }}>Security Guidelines</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{ paddingTop: '2rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontSize: '0.825rem', color: '#94A3B8' }}>
            © 2026 NexLance Inc. All rights reserved. Prove. Match. Build.
          </span>
        </div>
      </div>
    </footer>
  );
};
