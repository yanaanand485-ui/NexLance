import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  Cpu,
  Globe,
  Smartphone,
  Layout,
  Cloud,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';

export const FeaturedServices = () => {
  const { navigateTo, setSelectedService } = useApp();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Top Deliverables', icon: Sparkles },
    { id: 'AI & Machine Learning', label: 'AI & ML', icon: Cpu },
    { id: 'Full-Stack Web Development', label: 'Web & SaaS', icon: Globe },
    { id: 'Mobile App Development', label: 'Mobile Apps', icon: Smartphone },
    { id: 'UI/UX & Product Design', label: 'UI/UX Design', icon: Layout },
    { id: 'DevOps & Cloud Architecture', label: 'Cloud & DevOps', icon: Cloud }
  ];

  const displayedServices = SERVICES.filter(s => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  }).slice(0, 6);

  const handleCardClick = (srv) => {
    setSelectedService(srv);
    navigateTo('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              <Layers size={14} /> Packaged Fixed-Scope Capabilities
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0 }}>
              Pre-Packaged Services by Verified Talent
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748B', marginTop: '0.5rem', maxWidth: '640px' }}>
              Need immediate engineering deliverables? Order fixed-scope packages with guaranteed delivery deadlines and 100% escrow protection.
            </p>
          </div>

          <button
            onClick={() => navigateTo('services-marketplace')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.9rem' }}
          >
            Browse All {SERVICES.length}+ Services <ArrowRight size={16} />
          </button>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: isSelected ? '1.5px solid #1E40AF' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#1E40AF' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(30, 64, 175, 0.2)' : 'none'
                }}
              >
                <Icon size={15} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Services Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
          {displayedServices.map(srv => (
            <div
              key={srv.id}
              className="card card-hover"
              onClick={() => handleCardClick(srv)}
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '16px',
                cursor: 'pointer',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <div>
                {/* Thumbnail & Badges */}
                <div style={{ position: 'relative', height: '190px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                  <img
                    src={srv.thumbnail}
                    alt={srv.title}
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
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      fontSize: '0.725rem',
                      fontWeight: 700,
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
                      backgroundColor: '#FFFFFF',
                      color: '#0F172A',
                      padding: '0.25rem 0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Star size={13} fill="#D97706" color="#D97706" /> {srv.rating}
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Freelancer Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img
                        src={srv.freelancer.avatar}
                        alt={srv.freelancer.name}
                        style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {srv.freelancer.name}
                        </h4>
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Score: {srv.freelancer.careerScore}/100
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      <Clock size={12} /> {srv.deliveryDays}d delivery
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: '#0F172A',
                      lineHeight: 1.35,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {srv.title}
                  </h3>

                  {/* Tagline / Subtitle */}
                  <p style={{ fontSize: '0.825rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {srv.tagline || (srv.packages?.basic?.features || []).slice(0, 2).join(' • ')}
                  </p>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {(srv.techStack || srv.verifiedSkills || []).slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '6px'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Price & View CTA */}
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
                  <span style={{ fontSize: '0.675rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                    Starting At
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {srv.startingPrice}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(srv);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700 }}
                >
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => navigateTo('services-marketplace')}
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', fontSize: '1.05rem', fontWeight: 800 }}
          >
            Explore All 18+ Available Deliverables <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
