import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  ChevronRight,
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

import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { X, Check, Lock } from 'lucide-react';

export const ServicesMarketplace = () => {
  const { navigateTo, role, setIsAuthModalOpen, setAuthMode, setAuthRoleChoice, showToast, addNotification, clientProfile } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating' | 'fastest'
  const [deliveryFilter, setDeliveryFilter] = useState('all'); // 'all' | '7' | '14'
  const [activeServiceModal, setActiveServiceModal] = useState(null);
  const [selectedTier, setSelectedTier] = useState('standard');

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

  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => {
      // Category filter
      if (selectedCategory !== 'all' && s.category !== selectedCategory) {
        return false;
      }

      // Delivery time filter
      if (deliveryFilter === '7' && s.deliveryDays > 7) return false;
      if (deliveryFilter === '14' && s.deliveryDays > 14) return false;

      // Search term filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchTagline = (s.tagline || '').toLowerCase().includes(q);
        const matchFreelancer = s.freelancer.name.toLowerCase().includes(q);
        const matchSkills = (s.verifiedSkills || []).some(sk => sk.toLowerCase().includes(q));
        const matchTech = (s.techStack || []).some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchTagline && !matchFreelancer && !matchSkills && !matchTech) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return (a.rawStartingPrice || 0) - (b.rawStartingPrice || 0);
      if (sortBy === 'price-high') return (b.rawStartingPrice || 0) - (a.rawStartingPrice || 0);
      if (sortBy === 'fastest') return a.deliveryDays - b.deliveryDays;
      return (b.reviewsCount || 0) - (a.reviewsCount || 0); // popular
    });
  }, [searchTerm, selectedCategory, sortBy, deliveryFilter]);

  const handleServiceClick = (srv) => {
    setActiveServiceModal(srv);
    setSelectedTier('standard');
  };

  return (
    <main className={role === 'client' ? 'dashboard-main' : ''} style={role === 'client' ? { width: '100%', paddingBottom: '4rem' } : { maxWidth: '1320px', margin: '0 auto', padding: '2rem 1.5rem 5rem', width: '100%' }}>
      {/* Navigation Header */}
      <BackToDashboardButton
        label={role === 'public' ? 'Back to Home' : 'Back to Dashboard'}
        fallbackView={role === 'freelancer' ? 'freelancer-dashboard' : role === 'client' ? 'client-dashboard' : 'landing'}
        breadcrumbs={[
          { label: 'Services Marketplace' }
        ]}
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
              Browse pre-packaged deliverables built by verified elite engineers and designers. Click any service to inspect complete technical specifications, 3-tier packages, and deliverables.
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '15px' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search services by tech, keyword, or domain (e.g. RAG, Next.js MVP, Flutter, Kubernetes, Figma)..."
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.85rem',
                borderRadius: '10px',
                border: '1.5px solid #CBD5E1',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#F8FAFC'
              }}
              onFocus={e => e.target.style.borderColor = '#1E40AF'}
              onBlur={e => e.target.style.borderColor = '#CBD5E1'}
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

          {/* Delivery Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.4rem 0.8rem' }}>
            <Clock size={16} color="#64748B" />
            <select
              value={deliveryFilter}
              onChange={e => setDeliveryFilter(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
            >
              <option value="all">Any Delivery Time</option>
              <option value="7">⚡ Up to 7 Days</option>
              <option value="14">📅 Up to 14 Days</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.4rem 0.8rem' }}>
            <SlidersHorizontal size={16} color="#64748B" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, color: '#334155', outline: 'none', cursor: 'pointer' }}
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="fastest">Fastest Delivery</option>
            </select>
          </div>
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

        {(selectedCategory !== 'all' || searchTerm || deliveryFilter !== 'all') && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setDeliveryFilter('all');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#1E40AF',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Reset all filters
          </button>
        )}
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
              setDeliveryFilter('all');
            }}
            className="btn btn-primary"
          >
            Browse All Services
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '2rem' }}>
          {filteredServices.map(srv => (
            <div
              key={srv.id}
              className="card card-hover"
              onClick={() => handleServiceClick(srv)}
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                cursor: 'pointer',
                border: '1px solid #E2E8F0',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div>
                {/* Thumbnail & Category Badge */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                  <img
                    src={srv.thumbnail}
                    alt={srv.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/rag-pipeline.jpg';
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(15, 23, 42, 0.88)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.725rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}
                  >
                    {srv.category}
                  </span>

                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(4px)',
                      color: '#0F172A',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                  >
                    <Star size={13} fill="#D97706" color="#D97706" /> {srv.rating} ({srv.reviewsCount})
                  </span>
                </div>

                {/* Service Details Container */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Freelancer Creator Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img
                        src={srv.freelancer.avatar}
                        alt={srv.freelancer.name}
                        style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {srv.freelancer.name}
                        </h4>
                        <span style={{ fontSize: '0.725rem', color: '#64748B' }}>
                          Career Score: {srv.freelancer.careerScore}/100
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.725rem', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      <Clock size={12} /> {srv.deliveryDays}d delivery
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.35,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {srv.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {srv.tagline || (srv.packages?.basic?.features || []).slice(0, 2).join(' • ')}
                  </p>

                  {/* Tech Stack Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    {(srv.techStack || srv.verifiedSkills || []).slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {(srv.techStack || []).length > 4 && (
                      <span style={{ fontSize: '0.7rem', color: '#64748B', alignSelf: 'center' }}>
                        +{srv.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Price & Timeline Bar */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderTop: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.675rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em', display: 'block' }}>
                    Starting At
                  </span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {srv.startingPrice}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.785rem', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                  <Clock size={13} />
                  <span>{srv.deliveryDays} Days Turnaround</span>
                </div>
              </div>
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
            Every service listed above is backed by verified code reviews, fixed pricing, and milestone-based escrow. Select any service to explore detailed architecture specs, deliverables, and tiers.
          </p>
        </div>
      </div>

      {/* ========================================= */}
      {/* INLINE SERVICE DETAIL MODAL (Stays right on Marketplace) */}
      {/* ========================================= */}
      {activeServiceModal && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveServiceModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
        >
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '860px',
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2rem',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveServiceModal(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#F1F5F9',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748B',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E2E8F0'; e.currentTarget.style.color = '#0F172A'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#64748B'; }}
            >
              <X size={18} />
            </button>

            {/* Header Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.25rem 0.65rem', borderRadius: '9999px', border: '1px solid #DBEAFE' }}>
                {activeServiceModal.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                <Star size={14} fill="#D97706" color="#D97706" />
                <span>{activeServiceModal.rating}</span>
                <span style={{ color: '#64748B', fontWeight: 500 }}>({activeServiceModal.reviewsCount} reviews)</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                ✓ {activeServiceModal.deliveryDays}d Turnaround
              </span>
            </div>

            {/* Title & Tagline */}
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, marginBottom: '0.5rem', paddingRight: '2.5rem' }}>
              {activeServiceModal.title}
            </h2>
            <p style={{ fontSize: '0.925rem', color: '#475569', lineHeight: 1.55, marginBottom: '1.5rem' }}>
              {activeServiceModal.tagline}
            </p>

            {/* 2-Column Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.95fr', gap: '1.75rem', alignItems: 'start' }}>
              {/* Left Column */}
              <div>
                <div style={{ borderRadius: '12px', overflow: 'hidden', height: '220px', backgroundColor: '#0F172A', marginBottom: '1.25rem' }}>
                  <img
                    src={activeServiceModal.thumbnail}
                    alt={activeServiceModal.title}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/rag-pipeline.jpg'; }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Creator Card */}
                <div style={{ padding: '1rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={activeServiceModal.freelancer.avatar}
                      alt={activeServiceModal.freelancer.name}
                      style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.925rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {activeServiceModal.freelancer.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '2px 0 0' }}>
                        {activeServiceModal.freelancer.title}
                      </p>
                    </div>
                  </div>
                  <CareerScoreBadge score={activeServiceModal.freelancer.careerScore} size="sm" showLabel={false} />
                </div>

                {/* Highlights */}
                {activeServiceModal.highlights && (
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.5rem' }}>
                      Key Deliverables
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {activeServiceModal.highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.825rem', color: '#334155' }}>
                          <CheckCircle2 size={15} color="#1E40AF" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Pricing Tier */}
              <div style={{ backgroundColor: '#F8FAFC', border: '1.5px solid #1E40AF', borderRadius: '14px', padding: '1.35rem', boxShadow: '0 4px 12px rgba(30,64,175,0.06)' }}>
                {/* Tier Switcher */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', backgroundColor: '#E2E8F0', padding: '0.25rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                  {['basic', 'standard', 'premium'].map(tier => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '7px',
                        border: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        backgroundColor: selectedTier === tier ? '#FFFFFF' : 'transparent',
                        color: selectedTier === tier ? '#1E40AF' : '#64748B',
                        boxShadow: selectedTier === tier ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                        transition: 'all 0.15s'
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                {(() => {
                  const pkgs = activeServiceModal.packages || {
                    basic: { name: 'Basic Starter', price: activeServiceModal.startingPrice, delivery: '5 Days', revisions: 2, features: ['Core deliverable setup', 'Documentation'] },
                    standard: { name: 'Standard Full Suite', price: '₹45,000 ($550)', delivery: '10 Days', revisions: 4, features: ['Everything in Basic', 'Full deployment'] },
                    premium: { name: 'Enterprise Flagship', price: '₹85,000 ($1,050)', delivery: '14 Days', revisions: 'Unlimited', features: ['Priority support', 'Automated CI/CD'] }
                  };
                  const cur = pkgs[selectedTier] || pkgs.standard || pkgs.basic;
                  return (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {cur.name}
                        </h3>
                        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1E40AF' }}>
                          {cur.price}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.775rem', color: '#64748B', marginBottom: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={13} /> {cur.delivery}
                        </span>
                        <span>•</span>
                        <span>{cur.revisions} Revisions</span>
                      </div>

                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                          Includes:
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {(cur.features || []).map((feat, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#334155' }}>
                              <Check size={14} color="#059669" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (role === 'public') {
                            showToast('Please sign in or create a Client account to order services with 100% Escrow Protection.', 'info');
                            setAuthMode('signup');
                            setAuthRoleChoice('client');
                            setIsAuthModalOpen(true);
                            return;
                          }
                          showToast(`🎉 Order Placed! Escrow funded for "${cur.name}" (${cur.price}). ${activeServiceModal.freelancer.name} has been notified.`, 'success');
                          setActiveServiceModal(null);
                        }}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontSize: '0.925rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <ShieldCheck size={17} /> Order in Escrow
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.75rem', fontSize: '0.725rem', color: '#64748B' }}>
                        <Lock size={12} color="#059669" /> Funds held safely in Escrow until milestone approval
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
