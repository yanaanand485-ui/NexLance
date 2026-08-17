import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  FolderGit2,
  Mail,
  Bell,
  Settings,
  PlusCircle,
  Users,
  Sparkles,
  Columns,
  Layers,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    role,
    currentView,
    navigateTo,
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
    { id: 'proof-of-work', label: 'Proof of Work', icon: <FolderGit2 size={18} /> },
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

      {/* Brand Watermark Bottom */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
        <div
          onClick={() => navigateTo('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#1E40AF',
            fontWeight: 800,
            fontSize: '1.1rem',
            fontFamily: "'Plus Jakarta Sans', sans-serif"
          }}
        >
          <span>NexLance</span>
        </div>
      </div>
    </aside>
  );
};
