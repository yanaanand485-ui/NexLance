import React, { useState } from 'react';
import {
  Layers,
  Star,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const ServiceDetail = () => {
  const { selectedService, showToast, navigateTo, setSelectedFreelancer } = useApp();

  const service = selectedService || SERVICES[0];
  const [selectedTier, setSelectedTier] = useState('standard'); // 'basic' | 'standard' | 'premium'

  const currentPkg = service.packages[selectedTier] || service.packages.standard;

  const handleOrder = () => {
    showToast(`Order placed for "${currentPkg.name}" package (${currentPkg.price})! Escrow activated.`, 'success');
  };

  return (
    <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.75fr', gap: '2.5rem' }}>
        {/* Left Column: Service Details & Deliverables */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
              {service.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              ★ {service.rating} ({service.reviewsCount} verified orders delivered)
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            {service.title}
          </h1>

          {/* Media Banner */}
          <div style={{ marginBottom: '2rem', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0' }}>
            <img
              src={service.thumbnail}
              alt={service.title}
              style={{ width: '100%', height: '360px', objectFit: 'cover' }}
            />
          </div>

          {/* Creator Strip */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={service.freelancer.avatar}
                alt={service.freelancer.name}
                style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <h3
                  onClick={() => {
                    setSelectedFreelancer(service.freelancer);
                    navigateTo('freelancer-profile');
                  }}
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}
                >
                  {service.freelancer.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{service.freelancer.title}</p>
                <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {service.verifiedSkills.map((v, i) => (
                    <span key={i} className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                      ✓ {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <CareerScoreBadge score={service.freelancer.careerScore} size="sm" showLabel={false} />
              <span style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Career Score
              </span>
            </div>
          </div>

          {/* Description & Deliverables */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
              Service Overview & Quality Standards
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Every deliverable is written according to modern industry best practices, 100% TypeScript typing, sub-100ms response times, and Lighthouse performance scores above 95.
            </p>

            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>
              What is included in the package:
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentPkg.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#1E293B' }}>
                  <CheckCircle2 size={16} color="#059669" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: 3-Tier Pricing Packages Card (Section 24) */}
        <div>
          <div className="card" style={{ padding: '1.75rem', position: 'sticky', top: '90px', border: '1.5px solid #1E40AF', boxShadow: '0 10px 25px -5px rgba(30, 64, 175, 0.1)' }}>
            {/* Package Selector Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '10px', marginBottom: '1.5rem' }}>
              {['basic', 'standard', 'premium'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    border: 'none',
                    backgroundColor: selectedTier === tier ? '#FFFFFF' : 'transparent',
                    color: selectedTier === tier ? '#1E40AF' : '#64748B',
                    boxShadow: selectedTier === tier ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Selected Package Details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                  {currentPkg.name}
                </h3>
                <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currentPkg.price}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.825rem', color: '#64748B', margin: '0.75rem 0 1.25rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={15} color="#1E40AF" /> {currentPkg.delivery}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <RotateCcw size={15} color="#1E40AF" /> {currentPkg.revisions} Revisions
                </span>
              </div>

              {/* Package Features List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {currentPkg.features.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.85rem', color: '#334155' }}>
                    <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleOrder}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', fontSize: '1rem' }}
              >
                Order Service ({currentPkg.price})
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                <ShieldCheck size={15} /> 100% Money-Back Escrow Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
