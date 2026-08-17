import React, { useState } from 'react';
import {
  Layers,
  Search,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const ServicesMarketplace = () => {
  const { navigateTo, setSelectedService } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Full-Stack Web Development', 'UI/UX & Product Design', 'DevOps & Cloud Architecture'];

  const filteredServices = SERVICES.filter(s => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchFreelancer = s.freelancer.name.toLowerCase().includes(q);
      if (!matchTitle && !matchFreelancer) return false;
    }
    if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
    return true;
  });

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Layers size={14} /> Packaged Fixed-Scope Deliverables
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Explore Freelancer Services
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B' }}>
          Order fixed-scope deliverables from proven, verified professionals with guaranteed delivery dates.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.03)' }}>
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="What do you need help with? (e.g. Next.js SaaS MVP, Figma Design System, Kubernetes setup)..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
            <SlidersHorizontal size={14} /> Categories:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#1E40AF' : '#E2E8F0',
                backgroundColor: selectedCategory === cat ? '#1E40AF' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat === 'all' ? 'All Services' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (Section 23) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        {filteredServices.map(srv => (
          <div
            key={srv.id}
            className="card card-hover"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRadius: '16px'
            }}
          >
            <div>
              <div style={{ position: 'relative' }}>
                <img
                  src={srv.thumbnail}
                  alt={srv.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    fontSize: '0.725rem',
                    fontWeight: 700
                  }}
                >
                  {srv.category}
                </span>
              </div>

              <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
                {/* Freelancer Info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={srv.freelancer.avatar}
                      alt={srv.freelancer.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>{srv.freelancer.name}</h4>
                      <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Career Score: {srv.freelancer.careerScore}/100</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                    <Star size={13} fill="#D97706" color="#D97706" /> {srv.rating}
                  </div>
                </div>

                <h3
                  onClick={() => {
                    setSelectedService(srv);
                    navigateTo('service-detail');
                  }}
                  style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.35, cursor: 'pointer', marginBottom: '0.85rem' }}
                >
                  {srv.title}
                </h3>

                {/* Verified Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {srv.verifiedSkills.map((v, i) => (
                    <span key={i} className="badge badge-verified" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                      ✓ {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Price & CTA */}
            <div style={{ padding: '1rem 1.5rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600, display: 'block' }}>Starting Price</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{srv.startingPrice}</span>
              </div>

              <button
                onClick={() => {
                  setSelectedService(srv);
                  navigateTo('service-detail');
                }}
                className="btn btn-primary btn-sm"
              >
                View Packages <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
