import React, { useState } from 'react';
import { X, Bell, CheckCircle, Sparkles, TrendingUp, UserCheck, MessageSquare, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationDrawer = () => {
  const { isNotificationOpen, setIsNotificationOpen, notifications, setNotifications, navigateTo } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (!isNotificationOpen) return null;

  const categories = ['all', 'Project Matches', 'Career Score Updates', 'Shortlists', 'Assessment Results', 'Proposal Updates'];

  const filtered = selectedFilter === 'all'
    ? notifications
    : notifications.filter(n => n.category === selectedFilter);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Project Matches': return <Sparkles size={16} color="#2563EB" />;
      case 'Career Score Updates': return <TrendingUp size={16} color="#059669" />;
      case 'Shortlists': return <UserCheck size={16} color="#7C3AED" />;
      case 'Assessment Results': return <CheckCircle size={16} color="#059669" />;
      case 'Proposal Updates': return <Briefcase size={16} color="#D97706" />;
      default: return <Bell size={16} color="#2563EB" />;
    }
  };

  const handleNotificationClick = (item) => {
    if (item.action === 'view-project') navigateTo('project-detail');
    else if (item.action === 'view-career-score') navigateTo('career-score');
    else if (item.action === 'view-skills') navigateTo('skill-verification');
    else if (item.action === 'view-applications') navigateTo('applications');
    else if (item.action === 'view-projects') navigateTo('project-discovery');
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
          maxWidth: '440px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell size={20} color="#1E40AF" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Notifications</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={markAllAsRead}
              style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', cursor: 'pointer' }}
            >
              Mark all read
            </button>
            <button
              onClick={() => setIsNotificationOpen(false)}
              style={{ color: '#64748B', cursor: 'pointer' }}
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
                padding: '0.25rem 0.65rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                backgroundColor: selectedFilter === cat ? '#1E40AF' : '#F1F5F9',
                color: selectedFilter === cat ? '#FFFFFF' : '#475569',
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
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#94A3B8' }}>
              <Bell size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
              <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>No notifications found</p>
            </div>
          ) : (
            filtered.map(item => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #F1F5F9',
                  backgroundColor: item.unread ? '#F0F7FF' : '#FFFFFF',
                  display: 'flex',
                  gap: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getCategoryIcon(item.category)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{item.time}</span>
                  </div>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.25rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
