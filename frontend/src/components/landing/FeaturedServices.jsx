import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';

export const FeaturedServices = () => {
  const { role, navigateTo, showToast, setIsAuthModalOpen, setAuthMode } = useApp();

  const displayedServices = SERVICES.slice(0, 6);

  const handleExploreServices = () => {
    if (role === 'public') {
      showToast('Please Get Started first to explore all services.', 'info');
      setAuthMode('signup');
      setIsAuthModalOpen(true);
      return;
    }
    navigateTo('services-marketplace');
  };

  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
            Pre-Packaged Services by Verified Talent
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748B', marginTop: '0.5rem', maxWidth: '640px' }}>
            Need immediate engineering deliverables? Order fixed-scope packages with guaranteed delivery deadlines and 100% escrow protection.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {displayedServices.map(srv => (
            <div
              key={srv.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '1.5rem'
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem'
                }}
              >
                {srv.title}
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#64748B',
                  lineHeight: 1.5,
                  margin: 0
                }}
              >
                {srv.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={handleExploreServices}
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 800 }}
          >
            Explore All Services <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

