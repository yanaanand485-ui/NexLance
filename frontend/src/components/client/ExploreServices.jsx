import React, { useState } from 'react';
import {
  Layers,
  Search,
  Clock,
  DollarSign,
  Star,
  CheckCircle2,
  X,
  ShoppingCart,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { getStoredUsers } from '../../utils/storage';

export const ExploreServices = () => {
  const { showToast, freelancerProfile } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeService, setActiveService] = useState(null);

  const allAvailableServices = React.useMemo(() => {
    try {
      const users = getStoredUsers();
      const userServices = [];
      users.forEach(u => {
        if (u.role === 'freelancer' && Array.isArray(u.profile?.services)) {
          u.profile.services.forEach(srv => {
            if (srv.status !== 'Paused' && !SERVICES.some(s => s.id === srv.id)) {
              userServices.push({
                ...srv,
                freelancer: srv.freelancer || {
                  name: u.name,
                  role: u.profile?.role || 'Full-Stack Developer',
                  avatar: u.avatar || '',
                  careerScore: u.profile?.careerScore || 0
                }
              });
            }
          });
        }
      });
      // Also ensure current active freelancer's services are present
      if (freelancerProfile?.services?.length > 0) {
        freelancerProfile.services.forEach(srv => {
          if (srv.status !== 'Paused' && !userServices.some(s => s.id === srv.id) && !SERVICES.some(s => s.id === srv.id)) {
            userServices.unshift({
              ...srv,
              freelancer: srv.freelancer || {
                name: freelancerProfile.name,
                role: freelancerProfile.role,
                avatar: freelancerProfile.avatar,
                careerScore: freelancerProfile.careerScore
              }
            });
          }
        });
      }
      return [...userServices, ...SERVICES];
    } catch (e) {
      return SERVICES;
    }
  }, [freelancerProfile]);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Full-Stack Web Development', label: 'Web & Full-Stack' },
    { id: 'AI & Machine Learning', label: 'AI & Machine Learning' },
    { id: 'Mobile App Development', label: 'Mobile Apps' },
    { id: 'UI/UX & Product Design', label: 'UI/UX Design' },
    { id: 'DevOps & Cloud Architecture', label: 'DevOps & Cloud' }
  ];

  // Basic filter logic
  const filteredServices = allAvailableServices.filter((service) => {
    // 1. Category check
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }

    // 2. Search check (title, tagline, tech stack)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = (service.title || '').toLowerCase().includes(q);
      const matchTagline = (service.tagline || '').toLowerCase().includes(q);
      const matchCategory = (service.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchTagline && !matchCategory) return false;
    }

    return true;
  });

  return (
    <div className="dashboard-main">
      {/* 1. Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title">Explore Services</h1>
        <p className="dashboard-subtitle">
          Browse ready-to-deliver packages and fixed-price gigs from verified specialists.
        </p>
      </div>

      {/* 2. Search & Category Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            color="#94A3B8"
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services (e.g. Next.js, AI Agent, iOS app, Figma design)..."
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.4rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid #1E40AF' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#1E40AF' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Services Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
          Showing {filteredServices.length} Packaged Services
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="card card-hover"
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Service Thumbnail / Header Image */}
            <div style={{ height: '170px', position: 'relative', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
              <img
                src={service.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80'}
                alt={service.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px'
                }}
              >
                {service.category}
              </span>
            </div>

            {/* Service Body */}
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                {/* Freelancer info */}
                {service.freelancer && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <img
                      src={service.freelancer.avatar}
                      alt={service.freelancer.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>
                      {service.freelancer.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.2rem', marginLeft: 'auto' }}>
                      ★ {service.rating || 4.9} ({service.reviewsCount || 12})
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem', lineHeight: 1.35 }}>
                  {service.title}
                </h3>

                {/* Tagline / Description */}
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4, marginBottom: '1rem' }}>
                  {service.tagline ? service.tagline.slice(0, 95) + '...' : 'Verified ready-to-deploy professional service package.'}
                </p>
              </div>

              {/* Price & Delivery row */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.6rem 0',
                    borderTop: '1px solid #F1F5F9',
                    borderBottom: '1px solid #F1F5F9',
                    marginBottom: '0.85rem',
                    fontSize: '0.8rem',
                    color: '#475569'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={14} color="#2563EB" />
                    <span>{service.deliveryDays || 5} days delivery</span>
                  </div>
                  <div>
                    From <strong style={{ color: '#0F172A', fontSize: '0.95rem' }}>{service.startingPrice || '$250'}</strong>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => setActiveService(service)}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%' }}
                >
                  View Details & Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Service Details Modal */}
      {activeService && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem'
          }}
          onClick={() => setActiveService(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveService(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={20} />
            </button>

            <span
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                color: '#1E40AF',
                fontSize: '0.75rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}
            >
              {activeService.category}
            </span>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              {activeService.title}
            </h2>

            {/* Specialist Profile */}
            {activeService.freelancer && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', padding: '0.6rem 0.85rem', backgroundColor: '#F8FAFC', borderRadius: '8px' }}>
                <img
                  src={activeService.freelancer.avatar}
                  alt={activeService.freelancer.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                    Offered by {activeService.freelancer.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {activeService.freelancer.title} • ★ {activeService.rating || 4.9}
                  </div>
                </div>
              </div>
            )}

            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {activeService.tagline || activeService.description || 'Full end-to-end delivery of the selected service specification.'}
            </p>

            {/* Highlights list */}
            {activeService.highlights && activeService.highlights.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                  What's Included:
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {activeService.highlights.map((point, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#16A34A" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                backgroundColor: '#EFF6FF',
                borderRadius: '10px',
                border: '1px solid #BFDBFE',
                marginBottom: '1.5rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 600, display: 'block' }}>
                  Estimated Turnaround
                </span>
                <strong style={{ fontSize: '0.95rem', color: '#1E3A8A' }}>
                  {activeService.deliveryDays || 5} Business Days
                </strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 600, display: 'block' }}>
                  Package Price
                </span>
                <strong style={{ fontSize: '1.25rem', color: '#1E3A8A' }}>
                  {activeService.startingPrice || '$350'}
                </strong>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Order placed for "${activeService.title}"! Milestone escrow created.`, 'success');
                  setActiveService(null);
                }}
                className="btn btn-primary"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <ShoppingCart size={16} /> Order Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
