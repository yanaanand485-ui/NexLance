import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  UserCheck,
  Briefcase,
  ShieldCheck,
  Columns,
  DollarSign,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    setNotifications,
    navigateTo,
    role
  } = useApp();

  const [selectedFilter, setSelectedFilter] = useState('all');

  if (!isNotificationOpen) return null;

  // Role-specific categories
  const freelancerCategories = [
    'all',
    'Skill Verification',
    'Career Score Updates',
    'Project Matches',
    'Shortlists',
    'Assessment Results',
    'Proposals & Offers',
    'Milestones & Escrow'
  ];

  const clientCategories = [
    'all',
    'Smart Match',
    'Candidate Comparison',
    'Proposals Received',
    'Milestone Approvals',
    'Candidate Availability',
    'Escrow & Contracts'
  ];

  const categories = role === 'client' ? clientCategories : freelancerCategories;

  const filtered = selectedFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category === selectedFilter);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Smart Match':
      case 'Project Matches':
        return <Sparkles size={16} color="#2563EB" />;
      case 'Skill Verification':
      case 'Assessment Results':
        return <ShieldCheck size={16} color="#1E40AF" />;
      case 'Career Score Updates':
        return <TrendingUp size={16} color="#059669" />;
      case 'Candidate Comparison':
      case 'Shortlists':
        return <Columns size={16} color="#7C3AED" />;
      case 'Proposals Received':
      case 'Proposal Updates':
      case 'Proposals & Offers':
        return <Briefcase size={16} color="#D97706" />;
      case 'Milestone Approvals':
      case 'Milestones & Escrow':
        return <CheckCircle2 size={16} color="#059669" />;
      case 'Candidate Availability':
        return <UserCheck size={16} color="#0284C7" />;
      case 'Escrow & Contracts':
        return <DollarSign size={16} color="#10B981" />;
      default:
        return <Bell size={16} color="#2563EB" />;
    }
  };

  const handleNotificationClick = (item) => {
    // Mark this individual notification as read
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));

    // Route to appropriate view based on action
    if (item.action === 'view-smart-match') navigateTo('smart-match');
    else if (item.action === 'view-comparison') navigateTo('comparison');
    else if (item.action === 'view-project') navigateTo('project-detail');
    else if (item.action === 'view-career-score') navigateTo('career-score');
    else if (item.action === 'view-skills') navigateTo('skill-verification');
    else if (item.action === 'view-applications') navigateTo('applications');
    else if (item.action === 'view-projects') navigateTo('project-discovery');
    else if (item.action === 'view-talent') navigateTo('talent-discovery');
    else if (item.action === 'view-active-contracts' || item.action === 'view-proof-of-work') {
      navigateTo(role === 'client' ? 'client-dashboard' : 'proof-of-work');
    }

    setIsNotificationOpen(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110,
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={() => setIsNotificationOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Bell size={20} color="#1E40AF" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Notifications</h3>
              {unreadCount > 0 && (
                <span style={{ fontSize: '0.7rem', fontWeight: 800, backgroundColor: '#EFF6FF', color: '#1E40AF', padding: '0.1rem 0.45rem', borderRadius: '9999px', border: '1px solid #BFDBFE' }}>
                  {unreadCount} New
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.725rem', color: '#64748B', fontWeight: 600, marginTop: '0.15rem' }}>
              {role === 'client' ? '🏢 Client Hiring & Project Feed' : '⚡ Freelancer Career & Verification Feed'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Mark all read
              </button>
            )}
            <button
              onClick={() => setIsNotificationOpen(false)}
              style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              style={{
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: selectedFilter === cat ? '#1E40AF' : '#F1F5F9',
                color: selectedFilter === cat ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Notification Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: '#94A3B8' }}>
              <Bell size={40} style={{ margin: '0 auto 0.75rem', opacity: 0.3 }} />
              <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#64748B' }}>No notifications in this category</p>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                You're all caught up with your {role === 'client' ? 'hiring' : 'career'} updates.
              </p>
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                style={{
                  padding: '1.1rem 1.5rem',
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: item.unread ? '#F8FAFF' : '#FFFFFF',
                  display: 'flex',
                  gap: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                  position: 'relative'
                }}
              >
                {/* Unread indicator pill */}
                {item.unread && (
                  <div style={{ position: 'absolute', left: '0.5rem', top: '1.3rem', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1E40AF' }}></div>
                )}

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: item.unread ? '#EFF6FF' : '#F8FAFC',
                    border: `1px solid ${item.unread ? '#BFDBFE' : '#E2E8F0'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getCategoryIcon(item.category)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 500 }}>{item.time}</span>
                  </div>

                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem', lineHeight: 1.35 }}>
                    {item.title}
                  </h4>

                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, marginBottom: '0.4rem' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF' }}>
                    View Details <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

