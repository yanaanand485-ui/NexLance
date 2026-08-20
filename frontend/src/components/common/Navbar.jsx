import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
  User,
  Briefcase,
  Layers,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Columns,
  PlusCircle,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = () => {
  const {
    role,
    currentView,
    navigateTo,
    handleFindTalent,
    handleFindWork,
    logout,
    switchRole,
    freelancerProfile,
    clientProfile,
    notifications,
    setIsNotificationOpen,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;
  const isPublic = role === 'public';

  const handleAuthClick = (mode, chosenRole = 'freelancer') => {
    setAuthMode(mode);
    setAuthRoleChoice(chosenRole);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        {/* Left: Brand Logo & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div
            onClick={() => navigateTo(role === 'freelancer' ? 'freelancer-dashboard' : role === 'client' ? 'client-dashboard' : 'landing')}
            className="brand-logo"
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span>NexLance</span>
          </div>

          {/* Navigation Links for Public View */}
          {isPublic ? (
            <nav className="nav-links">
              <span
                onClick={handleFindTalent}
                className={`nav-item ${currentView === 'talent-discovery' ? 'active' : ''}`}
              >
                Find Talent
              </span>
              <span
                onClick={handleFindWork}
                className={`nav-item ${currentView === 'project-discovery' ? 'active' : ''}`}
              >
                Find Work
              </span>
              <span
                onClick={() => navigateTo('services-marketplace')}
                className={`nav-item ${currentView === 'services-marketplace' || currentView === 'service-detail' ? 'active' : ''}`}
              >
                Services
              </span>
              <span
                onClick={() => {
                  navigateTo('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-item ${currentView === 'landing' ? 'active' : ''}`}
              >
                How It Works
              </span>
            </nav>
          ) : role === 'freelancer' ? (
            /* Navigation Links for Freelancer View */
            <nav className="nav-links">
              <span
                onClick={() => navigateTo('freelancer-dashboard')}
                className={`nav-item ${currentView === 'freelancer-dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </span>
              <span
                onClick={() => navigateTo('project-discovery')}
                className={`nav-item ${currentView === 'project-discovery' ? 'active' : ''}`}
              >
                Find Projects
              </span>
              <span
                onClick={() => navigateTo('services-marketplace')}
                className={`nav-item ${currentView === 'services-marketplace' || currentView === 'service-detail' ? 'active' : ''}`}
              >
                Services Catalog
              </span>
              <span
                onClick={() => navigateTo('skill-verification')}
                className={`nav-item ${currentView === 'skill-verification' ? 'active' : ''}`}
              >
                Skill Verification
              </span>
              <span
                onClick={() => navigateTo('career-score')}
                className={`nav-item ${currentView === 'career-score' ? 'active' : ''}`}
              >
                Career Score
              </span>
              <span
                onClick={() => navigateTo('proof-of-work')}
                className={`nav-item ${currentView === 'proof-of-work' ? 'active' : ''}`}
              >
                Proof of Work
              </span>
            </nav>
          ) : (
            /* Navigation Links for Client View */
            <nav className="nav-links">
              <span
                onClick={() => navigateTo('client-dashboard')}
                className={`nav-item ${currentView === 'client-dashboard' ? 'active' : ''}`}
              >
                Dashboard
              </span>
              <span
                onClick={() => navigateTo('services-marketplace')}
                className={`nav-item ${currentView === 'services-marketplace' || currentView === 'service-detail' ? 'active' : ''}`}
              >
                Services
              </span>
              <span
                onClick={() => navigateTo('post-project')}
                className={`nav-item ${currentView === 'post-project' ? 'active' : ''}`}
              >
                Post Project
              </span>
              <span
                onClick={() => navigateTo('smart-match')}
                className={`nav-item ${currentView === 'smart-match' ? 'active' : ''}`}
              >
                Smart Match
              </span>
              <span
                onClick={() => navigateTo('comparison')}
                className={`nav-item ${currentView === 'comparison' ? 'active' : ''}`}
              >
                Candidate Comparison
              </span>
              <span
                onClick={() => navigateTo('applications')}
                className={`nav-item ${currentView === 'applications' ? 'active' : ''}`}
              >
                Applications
              </span>
            </nav>
          )}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Unauthenticated: Clean Log In & Sign Up ("Get Started") */}
          {isPublic ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={() => handleAuthClick('login')}
                className="btn btn-secondary btn-sm"
              >
                Log In
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="btn btn-primary btn-sm"
              >
                Get Started
              </button>
            </div>
          ) : (
            /* Authenticated User Actions */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Notification Bell */}
              <button
                onClick={() => setIsNotificationOpen(true)}
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#475569',
                  cursor: 'pointer'
                }}
                title="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#1E40AF',
                      color: '#FFFFFF',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Profile Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={role === 'freelancer' ? freelancerProfile.avatar : clientProfile.avatar}
                    alt="Profile"
                    style={{ width: '30px', height: '30px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                      {role === 'freelancer' ? freelancerProfile.name : clientProfile.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#1E40AF', fontWeight: 600 }}>
                      {role === 'freelancer' ? 'Freelancer' : 'Client'}
                    </div>
                  </div>
                  <ChevronDown size={14} color="#64748B" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      right: 0,
                      width: '230px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.12)',
                      padding: '0.5rem',
                      zIndex: 60
                    }}
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0F172A' }}>
                        {role === 'freelancer' ? freelancerProfile.name : clientProfile.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        {role === 'freelancer'
                          ? `Career Score: ${freelancerProfile.careerScore || 0}/100`
                          : clientProfile.contactPerson}
                      </div>
                    </div>

                    <div
                      onClick={() => navigateTo(role === 'freelancer' ? 'freelancer-profile' : 'client-dashboard')}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#334155', cursor: 'pointer', borderRadius: '6px', marginTop: '0.25rem' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {role === 'freelancer' ? 'View Public Profile' : 'Client Overview'}
                    </div>

                    {/* Switch role option inside dropdown */}
                    <div
                      onClick={() => switchRole(role === 'freelancer' ? 'client' : 'freelancer')}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        color: '#1E40AF',
                        fontWeight: 600,
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span>⇄ Switch to {role === 'freelancer' ? 'Client' : 'Freelancer'} Account</span>
                    </div>

                    <div
                      onClick={logout}
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', color: '#DC2626', cursor: 'pointer', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '0.4rem', borderTop: '1px solid #F1F5F9', marginTop: '0.25rem' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={14} /> Log Out to Public Site
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              padding: '0.4rem',
              color: '#475569'
            }}
            className="mobile-burger-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
