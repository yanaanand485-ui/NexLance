import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  Bell,
  Settings,
  PlusCircle,
  Users,
  Sparkles,
  Columns,
  Layers,
  FileCheck2,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    role,
    currentView,
    navigateTo,
    goToDashboard,
    logout,
    freelancerProfile,
    clientProfile,
    setIsNotificationOpen
  } = useApp();

  const isFreelancer = role === 'freelancer';

  const freelancerNav = [
    { id: 'freelancer-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'project-discovery', label: 'Find Projects', icon: <Briefcase size={18} /> },
    { id: 'applications', label: 'My Applications', icon: <CheckSquare size={18} /> },
    { id: 'skill-verification', label: 'Skill Verification', icon: <ShieldCheck size={18} /> },
    { id: 'career-score', label: 'Career Score', icon: <TrendingUp size={18} /> },
    { id: 'opportunities', label: 'Opportunities', icon: <Sparkles size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, action: () => setIsNotificationOpen(true) },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  const clientNav = [
    { id: 'client-dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'post-project', label: 'Post Project', icon: <PlusCircle size={18} /> },
    { id: 'smart-match', label: 'Smart Match', icon: <Sparkles size={18} /> },
    { id: 'comparison', label: 'Candidate Comparison', icon: <Columns size={18} /> },
    { id: 'applications', label: 'Applications Received', icon: <FileCheck2 size={18} /> },
    { id: 'talent-discovery', label: 'Find Freelancers', icon: <Users size={18} /> },
    { id: 'services-marketplace', label: 'Discover Services', icon: <Layers size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, action: () => setIsNotificationOpen(true) },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  const navItems = isFreelancer ? freelancerNav : clientNav;

  return (
    <aside className="sidebar">
      <div>
        {/* User Card */}
        <div className="sidebar-user-card">
          <img
            src={isFreelancer ? freelancerProfile.avatar : clientProfile.avatar}
            alt="Avatar"
            className="sidebar-avatar"
          />
          <h3 className="sidebar-user-name">
            {isFreelancer ? freelancerProfile.name : clientProfile.name}
          </h3>
          <p className="sidebar-user-role">
            {isFreelancer ? freelancerProfile.role : clientProfile.contactPerson}
          </p>
          <button
            onClick={() => navigateTo(isFreelancer ? 'freelancer-profile' : 'client-dashboard')}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', fontSize: '0.775rem', padding: '0.35rem 0.5rem' }}
          >
            {isFreelancer ? 'View Public Profile' : 'Company Overview'}
          </button>
        </div>

        {/* Navigation List */}
        <ul className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <li
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigateTo(item.id);
                  }
                }}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Brand & Logout Section */}
      <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div
          onClick={goToDashboard}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 0.65rem',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Return to your Dashboard"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="brand-icon-box" style={{ width: '22px', height: '22px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#0F172A', fontWeight: 800, fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.1 }}>NexLance</span>
              <span style={{ fontSize: '0.675rem', color: '#64748B', fontWeight: 600 }}>{isFreelancer ? 'Freelancer Portal' : 'Client Workspace'}</span>
            </div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#1E40AF', fontWeight: 700, backgroundColor: '#EFF6FF', padding: '2px 6px', borderRadius: '4px' }}>Active</span>
        </div>

        {/* Dedicated Sidebar Logout Button */}
        <button
          type="button"
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid #FEE2E2',
            backgroundColor: '#FEF2F2',
            color: '#DC2626',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            justifyContent: 'center'
          }}
          title="Log out of your account to return to public view"
        >
          <LogOut size={14} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
