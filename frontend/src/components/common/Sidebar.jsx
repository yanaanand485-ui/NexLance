import { LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const {
    role,
    currentView,
    navigateTo,
    goToDashboard,
    logout,
    freelancerProfile,
    clientProfile
  } = useApp();

  const isFreelancer = role === 'freelancer';

  const freelancerNav = [
    { id: 'freelancer-dashboard', label: 'Dashboard' },
    { id: 'freelancer-services', label: 'My Services' },
    { id: 'project-discovery', label: 'Find Projects' },
    { id: 'skill-verification', label: 'Skill Verification' },
    { id: 'career-score', label: 'Career Score' }
  ];

  const clientNav = [
    { id: 'client-dashboard', label: 'Dashboard' },
    { id: 'client-find-talent', label: 'Find Talent' },
    { id: 'client-my-projects', label: 'My Projects' },
    { id: 'client-explore-services', label: 'Explore Services' }
  ];

  const navItems = isFreelancer ? freelancerNav : clientNav;

  return (
    <aside className="sidebar">
      <div>
        {/* User Card */}
        <div className="sidebar-user-card">
          {(isFreelancer ? freelancerProfile?.avatar : clientProfile?.avatar) ? (
            <img
              src={isFreelancer ? freelancerProfile.avatar : clientProfile.avatar}
              alt="Avatar"
              className="sidebar-avatar"
            />
          ) : null}
          <h3 className="sidebar-user-name">
            {isFreelancer ? freelancerProfile.name : clientProfile.name}
          </h3>
          <p className="sidebar-user-role" style={{ marginBottom: 0 }}>
            {isFreelancer ? (freelancerProfile?.role || 'Full Stack Developer') : clientProfile.contactPerson}
          </p>
        </div>

        {/* Navigation List */}
        <ul className="sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id ||
              (item.id === 'client-find-talent' && currentView === 'talent-discovery') ||
              (item.id === 'client-explore-services' && currentView === 'services-marketplace') ||
              (item.id === 'client-my-projects' && (currentView === 'post-project' || currentView === 'applications'));
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
                {item.icon && item.icon}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Logout Section */}
      <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9', marginTop: 'auto' }}>
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
