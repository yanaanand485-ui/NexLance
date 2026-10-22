import React, { useState } from 'react';
import {
  ChevronDown,
  LogOut,
  Menu,
  X
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
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    showToast
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Derived user details to keep JSX clean and beginner-friendly
  const isPublic = role === 'public';
  const isFreelancer = role === 'freelancer';
  const profile = isFreelancer ? freelancerProfile : clientProfile;
  const roleName = isFreelancer ? 'Freelancer' : 'Client';
  const oppositeRole = isFreelancer ? 'Client' : 'Freelancer';
  const profileSubtitle = isFreelancer
    ? (profile?.role || 'Freelancer Account')
    : (profile?.contactPerson || 'Client Account');

  // Open login or signup modal
  const handleAuthClick = (mode, chosenRole = 'freelancer') => {
    setAuthMode(mode);
    setAuthRoleChoice(chosenRole);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  // Navigation items for public landing page
  const publicNavLinks = [
    {
      label: 'Find Talent',
      active: currentView === 'talent-discovery',
      onClick: handleFindTalent
    },
    {
      label: 'Find Work',
      active: currentView === 'project-discovery',
      onClick: handleFindWork
    },
    {
      label: 'Services',
      active: currentView === 'services-marketplace',
      onClick: () => {
        showToast('Please Get Started first to explore all services.', 'info');
        setAuthMode('signup');
        setIsAuthModalOpen(true);
      }
    },
    {
      label: 'How It Works',
      active: currentView === 'landing',
      onClick: () => {
        navigateTo('landing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  ];

  const brandTarget = isFreelancer
    ? 'freelancer-dashboard'
    : role === 'client'
      ? 'client-dashboard'
      : 'landing';

  return (
    <header className="navbar-wrapper">
      <div className="navbar">
        {/* Left: Brand Logo & Public Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            onClick={() => navigateTo(brandTarget)}
            className="brand-logo"
            style={{ cursor: 'pointer' }}
          >
            <div className="brand-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>NexLance</span>
          </div>

          {/* Navigation Links for Public Landing View */}
          {isPublic && (
            <nav className="nav-links">
              {publicNavLinks.map(({ label, active, onClick }) => (
                <span
                  key={label}
                  onClick={onClick}
                  className={`nav-item ${active ? 'active' : ''}`}
                >
                  {label}
                </span>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Actions */}
        <div className="nav-actions">
          {isPublic ? (
            /* Unauthenticated: Log In & Get Started */
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button onClick={() => handleAuthClick('login')} className="btn btn-secondary btn-sm">
                Log In
              </button>
              <button onClick={() => handleAuthClick('signup')} className="btn btn-primary btn-sm">
                Get Started
              </button>
            </div>
          ) : (
            /* Authenticated: Profile Menu */
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
                {profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    style={{ width: '30px', height: '30px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                ) : null}
                <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>
                    {profile?.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#1E40AF', fontWeight: 600 }}>
                    {roleName}
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
                      {profile?.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                      {profileSubtitle}
                    </div>
                  </div>

                  {/* Log Out */}
                  <div
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.85rem',
                      color: '#DC2626',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      marginTop: '0.25rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FEF2F2'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={14} /> Log Out
                  </div>

                  {/* Switch Role */}
                  <div
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      switchRole(isFreelancer ? 'client' : 'freelancer');
                    }}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.85rem',
                      color: '#1E40AF',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #F1F5F9',
                      marginTop: '0.25rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>⇄ Switch to {oppositeRole} Account</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'none', padding: '0.4rem', color: '#475569' }}
            className="mobile-burger-btn"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
};
