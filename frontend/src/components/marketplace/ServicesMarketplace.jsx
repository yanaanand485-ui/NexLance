import React, { useState } from 'react';
import {
  Layers,
  Search,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Cpu,
  Globe,
  Smartphone,
  Layout,
  Cloud,
  ShieldAlert,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { BackToDashboardButton } from '../common/BackToDashboardButton';

export const ServicesMarketplace = () => {
  const { role } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: Layers, count: SERVICES.length },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: Cpu, count: SERVICES.filter(s => s.category === 'AI & Machine Learning').length },
    { id: 'Full-Stack Web Development', label: 'Web & Full-Stack', icon: Globe, count: SERVICES.filter(s => s.category === 'Full-Stack Web Development').length },
    { id: 'Mobile App Development', label: 'Mobile Apps', icon: Smartphone, count: SERVICES.filter(s => s.category === 'Mobile App Development').length },
    { id: 'UI/UX & Product Design', label: 'UI/UX & Design', icon: Layout, count: SERVICES.filter(s => s.category === 'UI/UX & Product Design').length },
    { id: 'DevOps & Cloud Architecture', label: 'DevOps & Cloud', icon: Cloud, count: SERVICES.filter(s => s.category === 'DevOps & Cloud Architecture').length },
    { id: 'Cybersecurity & Web3', label: 'Security & Web3', icon: ShieldAlert, count: SERVICES.filter(s => s.category === 'Cybersecurity & Web3').length },
    { id: 'Data Engineering & Analytics', label: 'Data & Analytics', icon: Database, count: SERVICES.filter(s => s.category === 'Data Engineering & Analytics').length }
  ];

  // Beginner-friendly search & category filtering logic using filter() and includes()
  const filteredServices = SERVICES.filter(service => {
    // 1. Check if the service matches the selected category (or 'all')
    const matchesCategory =
      selectedCategory === 'all' || service.category === selectedCategory;

    // 2. Case-insensitive search on title, description/tagline, and category
    const query = searchTerm.toLowerCase();
    const titleText = (service.title || '').toLowerCase();
    const descText = (service.tagline || service.description || '').toLowerCase();
    const categoryText = (service.category || '').toLowerCase();
    const matchesSearch =
      titleText.includes(query) ||
      descText.includes(query) ||
      categoryText.includes(query);

    // Both category and search conditions must be satisfied
    return matchesCategory && matchesSearch;
  });


  return (
    <main className={role === 'client' ? 'dashboard-main' : ''} style={role === 'client' ? { width: '100%', paddingBottom: '4rem' } : { maxWidth: '1320px', margin: '0 auto', padding: '2rem 1.5rem 5rem', width: '100%' }}>
      {/* Navigation Header */}
      <BackToDashboardButton
        label="Back to Home"
        fallbackView="landing"
      />

      {/* Hero Header */}
      <div style={{ marginBottom: '2.5rem' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.85rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              <Sparkles size={14} color="#1E40AF" /> Verified Fixed-Scope Deliverables
            </div>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.035em', lineHeight: 1.15, marginBottom: '0.75rem' }}>
              Explore Specialized Tech Services
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6 }}>
              Browse pre-packaged deliverables built by verified elite engineers and designers with guaranteed delivery deadlines and escrow protection.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1rem 1.25rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(15,23,42,0.03)', textAlign: 'center', minWidth: '130px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E40AF' }}>{SERVICES.length}+</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Verified Services</div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1rem 1.25rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(15,23,42,0.03)', textAlign: 'center', minWidth: '130px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>100%</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Escrow Guarantee</div>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1rem 1.25rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(15,23,42,0.03)', textAlign: 'center', minWidth: '130px' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706' }}>4.95★</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Control Box */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '18px', padding: '1.5rem', marginBottom: '2.5rem', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.04)' }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '15px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search services by keyword (e.g. web, design, app, python)..."
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.85rem',
              borderRadius: '10px',
              border: '1.5px solid #CBD5E1',
              fontSize: '0.95rem',
              outline: 'none',
              backgroundColor: '#F8FAFC'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: isSelected ? '1.5px solid #1E40AF' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#1E40AF' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 10px rgba(30, 64, 175, 0.2)' : 'none'
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
                <span
                  style={{
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#64748B',
                    padding: '0.1rem 0.45rem',
                    borderRadius: '9999px',
                    fontSize: '0.725rem'
                  }}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <p style={{ fontSize: '0.95rem', color: '#64748B', fontWeight: 600 }}>
          Showing <strong style={{ color: '#0F172A' }}>{filteredServices.length}</strong> available services
          {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
        </p>

      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '4rem 2rem', textAlign: 'center' }}>
          <Layers size={48} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>No services found matching your criteria</h3>
          <p style={{ color: '#64748B', fontSize: '0.95rem', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            Try searching for a broader term or select "All Services" to browse our complete catalog of verified engineering and design packages.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="btn btn-primary"
          >
            Browse All Services
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredServices.map(srv => (
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
      )}

      {/* Escrow Guarantee Callout Banner */}
      <div
        style={{
          marginTop: '4rem',
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '3rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: '2.5rem',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#60A5FA', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <ShieldCheck size={16} /> Verified Quality Assurance
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Zero Risk. 100% Milestone-Based Escrow Protection.
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            When you order any pre-scoped service on NexLance, funds are held securely in platform escrow. Payment is released only after you review and approve every deliverable against verified quality standards.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#34D399" /> Guaranteed Delivery Deadlines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#34D399" /> 100% Code & Asset Ownership
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#E2E8F0' }}>
              <CheckCircle2 size={16} color="#34D399" /> Free Revisions Included
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Instant Fixed-Scope Execution
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
            Every service listed above is backed by verified code reviews, fixed pricing, and milestone-based escrow.
          </p>
        </div>
      </div>

    </main>
  );
};
