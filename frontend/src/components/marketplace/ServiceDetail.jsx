import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  ArrowLeft,
  Lock,
  ChevronRight,
  Code,
  Zap,
  MessageSquare,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SERVICES } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';

export const ServiceDetail = () => {
  const {
    selectedService,
    showToast,
    navigateTo,
    setSelectedFreelancer,
    role,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    addNotification,
    clientProfile
  } = useApp();

  const service = selectedService || SERVICES[0];
  const freelancer = service?.freelancer || {
    name: 'Verified Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    title: 'Senior Specialist',
    location: 'Remote',
    careerScore: 92,
    tags: ['Verified Pro']
  };

  const [selectedTier, setSelectedTier] = useState('standard'); // 'basic' | 'standard' | 'premium'
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isOrderConfirmModalOpen, setIsOrderConfirmModalOpen] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);

  React.useEffect(() => {
    setSelectedTier('standard');
    setSelectedImageIndex(0);
    setOpenFaqIndex(null);
  }, [service?.id]);

  const packages = service?.packages || {
    basic: { name: "Basic Starter", price: service?.startingPrice || "₹25,000 ($300)", delivery: "5 Days", revisions: 2, features: ["Core deliverable setup", "Documentation"] },
    standard: { name: "Standard Full Suite", price: "₹45,000 ($550)", delivery: "10 Days", revisions: 4, features: ["Everything in Basic", "Advanced features", "Full deployment"] },
    premium: { name: "Enterprise Flagship", price: "₹85,000 ($1,050)", delivery: "14 Days", revisions: "Unlimited", features: ["Everything in Standard", "Priority support", "Automated CI/CD"] }
  };

  const currentPkg = packages[selectedTier] || packages.standard || packages.basic || Object.values(packages)[0];
  const galleryImages = service?.gallery && service.gallery.length > 0 ? service.gallery : [service?.thumbnail || '/rag-pipeline.jpg'];

  // Handle Order CTA click
  const handleOrderInitiation = () => {
    if (role === 'public') {
      showToast('Please sign in or create a Client account to order this service with 100% Escrow Protection.', 'info');
      setAuthMode('signup');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      return;
    }

    if (role === 'freelancer') {
      showToast('You are logged in as a Freelancer. Please sign in with a Client account to purchase services from other freelancers.', 'warning');
      setAuthMode('login');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      return;
    }

    // Role is 'client' -> Open Order Confirmation Escrow Modal
    setIsOrderConfirmModalOpen(true);
  };

  // Confirm Escrow Order (Client Role)
  const confirmOrderPayment = () => {
    setOrderProcessing(true);
    setTimeout(() => {
      setOrderProcessing(false);
      setIsOrderConfirmModalOpen(false);

      // Add Notification to client
      addNotification({
        category: 'Escrow & Orders',
        title: `Service Ordered: "${service.title}"`,
        description: `Escrow funded for "${currentPkg.name}" (${currentPkg.price}). ${freelancer.name} has been notified to begin Discovery Phase.`,
        action: 'view-client-dashboard'
      }, 'client');

      // Add Notification to freelancer
      addNotification({
        category: 'New Client Order',
        title: `New Order Received from ${clientProfile?.name || 'Client'}`,
        description: `Client ordered package "${currentPkg.name}" (${currentPkg.price}). Funds safely deposited in Escrow.`,
        action: 'view-freelancer-dashboard'
      }, 'freelancer');

      showToast(`🎉 Order Placed Successfully! Escrow funded for "${currentPkg.name}" (${currentPkg.price}). ${freelancer.name} notified!`, 'success');
      navigateTo('client-dashboard');
    }, 1200);
  };

  return (
    <main className={role === 'client' ? 'dashboard-main' : ''} style={role === 'client' ? { width: '100%', paddingBottom: '4rem' } : { maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem 5rem', width: '100%' }}>
      {/* Top Breadcrumbs & Back Navigation */}
      <BackToDashboardButton
        label="Back to All Services"
        fallbackView="services-marketplace"
        showDashboardDirect={true}
        breadcrumbs={[
          { label: 'Services', view: 'services-marketplace' },
          { label: service.title }
        ]}
      />

      {/* Main Two-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.85fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* ========================================= */}
        {/* LEFT COLUMN: Service Details, Showcase, Deliverables */}
        {/* ========================================= */}
        <div>
          {/* Category & Ratings Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.775rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1px solid #DBEAFE' }}>
              {service.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
              <Star size={15} fill="#D97706" color="#D97706" />
              <span>{service.rating}</span>
              <span style={{ color: '#64748B', fontWeight: 500 }}>({service.reviewsCount} verified orders completed)</span>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', backgroundColor: '#ECFDF5', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
              ✓ 100% On-Time Delivery Record
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.035em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
            {service.title}
          </h1>

          {/* Subtitle / Tagline */}
          {service.tagline && (
            <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {service.tagline}
            </p>
          )}

          {/* Media Showcase & Gallery Switcher */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', backgroundColor: '#0F172A', height: '400px', position: 'relative' }}>
              <img
                src={galleryImages[selectedImageIndex] || service.thumbnail}
                alt={service.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/rag-pipeline.jpg';
                }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail switcher if multiple images */}
            {galleryImages.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: '80px',
                      height: '56px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedImageIndex === idx ? '2px solid #1E40AF' : '1px solid #E2E8F0',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: selectedImageIndex === idx ? 1 : 0.6,
                      transition: 'all 0.15s'
                    }}
                  >
                    <img
                      src={img}
                      alt="Thumbnail preview"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/rag-pipeline.jpg';
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Creator Freelancer Card */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', border: '1px solid #E2E8F0', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                style={{ width: '60px', height: '60px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #E2E8F0' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3
                    onClick={() => {
                      setSelectedFreelancer(freelancer);
                      navigateTo('freelancer-profile', freelancer);
                    }}
                    style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer', textDecoration: 'none' }}
                  >
                    {freelancer.name}
                  </h3>
                  <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>✓ Verified Pro</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '2px 0 6px' }}>
                  {freelancer.title} • {freelancer.location}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {(service.verifiedSkills || freelancer.tags || []).slice(0, 4).map((v, i) => (
                    <span key={i} className="badge badge-verified" style={{ fontSize: '0.7rem' }}>
                      ✓ {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', borderLeft: '1px solid #F1F5F9', paddingLeft: '1.5rem' }}>
              <CareerScoreBadge score={freelancer.careerScore} size="md" showLabel={false} />
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', display: 'block', marginTop: '0.35rem' }}>
                Career Score
              </span>
              <button
                onClick={() => {
                  setSelectedFreelancer(freelancer);
                  navigateTo('freelancer-profile', freelancer);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1E40AF',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  marginTop: '0.35rem'
                }}
              >
                View Full Profile →
              </button>
            </div>
          </div>

          {/* Service Overview & Quality Standards */}
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
              Service Overview & Quality Standards
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Every deliverable is constructed according to modern software architecture principles, strict typing, responsive design guidelines, sub-100ms response targets, and full documentation.
            </p>

            {/* Highlights List */}
            {service.highlights && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                  Key Engineering Highlights:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {service.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <Zap size={16} color="#1E40AF" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.875rem', color: '#1E293B', fontWeight: 600 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Included */}
            {service.techStack && (
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
                  Included Technologies & Frameworks:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        backgroundColor: '#EFF6FF',
                        color: '#1E40AF',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #BFDBFE'
                      }}
                    >
                      <Code size={13} /> {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5-Step Delivery Workflow Process */}
          {service.processSteps && (
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                How Delivery Works (Execution Roadmap)
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Clear milestones ensure zero scope creep, complete transparency, and guaranteed on-time handover.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {service.processSteps.map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        backgroundColor: '#1E40AF',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: 800,
                        flexShrink: 0
                      }}
                    >
                      {step.step || idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.25rem 0 0', lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Client Reviews */}
          {service.verifiedReviews && service.verifiedReviews.length > 0 && (
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                  Verified Client Reviews
                </h2>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E40AF' }}>
                  ★ {service.rating} ({service.reviewsCount} Total Reviews)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {service.verifiedReviews.map((rev, idx) => (
                  <div key={idx} style={{ backgroundColor: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>{rev.author}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>{rev.role}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: 700, color: '#D97706' }}>
                        <Star size={13} fill="#D97706" color="#D97706" /> {rev.rating}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                      "{rev.comment}"
                    </p>
                    <div style={{ fontSize: '0.725rem', color: '#94A3B8', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Check size={12} color="#059669" /> Verified Escrow Completed • {rev.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div className="card" style={{ padding: '2rem', borderRadius: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
                Frequently Asked Questions
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: isOpen ? '#F8FAFC' : '#FFFFFF'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '0.925rem', fontWeight: 700, color: '#0F172A' }}>
                          {faq.q}
                        </span>
                        {isOpen ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                      </button>

                      {isOpen && (
                        <div style={{ padding: '0 1.25rem 1.25rem', fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN: 3-Tier Interactive Pricing Card */}
        {/* ========================================= */}
        <div style={{ position: 'sticky', top: '90px' }}>
          <div
            className="card"
            style={{
              padding: '1.75rem',
              border: '2px solid #1E40AF',
              borderRadius: '20px',
              boxShadow: '0 12px 30px -5px rgba(30, 64, 175, 0.12)'
            }}
          >
            {/* Package Selector Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '12px', marginBottom: '1.5rem' }}>
              {['basic', 'standard', 'premium'].map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  style={{
                    padding: '0.6rem 0.4rem',
                    borderRadius: '9px',
                    fontSize: '0.825rem',
                    fontWeight: 800,
                    textTransform: 'capitalize',
                    border: 'none',
                    backgroundColor: selectedTier === tier ? '#FFFFFF' : 'transparent',
                    color: selectedTier === tier ? '#1E40AF' : '#64748B',
                    boxShadow: selectedTier === tier ? '0 2px 4px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Package Title & Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                  {currentPkg.name}
                </h3>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currentPkg.price}
                </span>
              </div>

              {/* Delivery Time & Revisions Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.85rem', color: '#475569', margin: '0.75rem 0 1.25rem', backgroundColor: '#F8FAFC', padding: '0.6rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  <Clock size={15} color="#1E40AF" /> {currentPkg.delivery} Delivery
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
                  <RotateCcw size={15} color="#1E40AF" /> {currentPkg.revisions} Revisions
                </span>
              </div>

              {/* Checklist Features */}
              <div style={{ marginBottom: '1.75rem' }}>
                <span style={{ fontSize: '0.775rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.75rem' }}>
                  What's included in this package:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {currentPkg.features.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: '#1E293B' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Action Button (Auth Gated!) */}
              <button
                onClick={handleOrderInitiation}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', fontSize: '1.05rem', fontWeight: 800, padding: '0.9rem', justifyContent: 'center', boxShadow: '0 4px 14px rgba(30, 64, 175, 0.25)' }}
              >
                {role === 'public' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Lock size={16} /> Sign In to Order ({currentPkg.price})
                  </span>
                ) : (
                  <span>Order Package Now ({currentPkg.price})</span>
                )}
              </button>

              {/* Secondary Action: Contact / Custom Scope */}
              <button
                onClick={() => {
                  if (role === 'public') {
                    showToast('Please sign in as Client to request custom scoping from this freelancer.', 'info');
                    setAuthMode('signup');
                    setAuthRoleChoice('client');
                    setIsAuthModalOpen(true);
                  } else if (role === 'freelancer') {
                    showToast('Please switch to a Client account to contact freelancers.', 'warning');
                  } else {
                    navigateTo('post-project');
                  }
                }}
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '0.75rem', fontSize: '0.875rem', justifyContent: 'center' }}
              >
                <MessageSquare size={14} /> Request Custom Scope
              </button>

              {/* Safety Badges */}
              <div style={{ textAlign: 'center', marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>
                  <ShieldCheck size={16} /> 100% Escrow Milestone Protection
                </div>
                <span style={{ fontSize: '0.725rem', color: '#64748B' }}>
                  Funds held safely until you review & approve deliverables.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* ORDER CONFIRMATION MODAL (For Logged In Clients) */}
      {/* ========================================= */}
      {isOrderConfirmModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container" style={{ maxWidth: '520px', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#1E40AF', marginBottom: '0.75rem' }}>
              <ShieldCheck size={24} />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Confirm Escrow Order
              </h2>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              You are funding the escrow deposit for <strong>{service.title}</strong> by <strong>{freelancer.name}</strong>.
            </p>

            {/* Order Summary Box */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Selected Package:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A' }}>{currentPkg.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Guaranteed Turnaround:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>{currentPkg.delivery}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Revisions Included:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>{currentPkg.revisions}</span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.75rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>Total Escrow Deposit:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {currentPkg.price}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsOrderConfirmModalOpen(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
                disabled={orderProcessing}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmOrderPayment}
                className="btn btn-primary"
                style={{ flex: 1.5 }}
                disabled={orderProcessing}
              >
                {orderProcessing ? 'Securing Escrow...' : `Fund Escrow (${currentPkg.price})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
