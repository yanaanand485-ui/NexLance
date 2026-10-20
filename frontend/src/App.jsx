import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Sidebar } from './components/common/Sidebar';
import { AuthModal } from './components/common/AuthModal';
import { SkillSelectionModal } from './components/common/SkillSelectionModal';
// Pages & Views
import { LandingPage } from './pages/LandingPage';
import { TalentDiscovery } from './components/marketplace/TalentDiscovery';
import { ProjectDiscovery } from './components/marketplace/ProjectDiscovery';
import { ServicesMarketplace } from './components/marketplace/ServicesMarketplace';
import { FreelancerProfile } from './components/marketplace/FreelancerProfile';
import { ProjectDetail } from './components/marketplace/ProjectDetail';
import { ServiceDetail } from './components/marketplace/ServiceDetail';

import { FreelancerDashboard } from './components/freelancer/FreelancerDashboard';
import { FreelancerServices } from './components/freelancer/FreelancerServices';
import { ServiceModal } from './components/freelancer/ServiceModal';
import { SkillVerification } from './components/freelancer/SkillVerification';
import { CareerScoreDetail } from './components/freelancer/CareerScoreDetail';

// Client Platform (All imported directly from ./components/client/)
import { ClientDashboard } from './components/client/ClientDashboard';
import { FindTalent } from './components/client/FindTalent';
import { MyProjects } from './components/client/MyProjects';
import { ExploreServices } from './components/client/ExploreServices';

import './styles/components.css';

const MainRouter = () => {
  const { currentView, role, isSkillModalOpen, setIsSkillModalOpen, isSkillModalOnboarding } = useApp();

  // Dashboard Layout Wrapper
  const renderDashboardView = (Component) => (
    <div className="dashboard-layout">
      <Sidebar />
      <Component />
    </div>
  );

  const renderContent = () => {
    // Public-accessible views before login
    const publicAllowedViews = [
      'landing',
      'services-marketplace',
      'service-detail',
      'freelancer-profile',
      'talent-discovery',
      'project-discovery',
      'project-detail'
    ];

    if (role === 'public' && !publicAllowedViews.includes(currentView)) {
      return <LandingPage />;
    }

    // Authenticated users (freelancer / client) cannot view landing page; route to dashboard
    if (role !== 'public' && currentView === 'landing') {
      return role === 'freelancer'
        ? renderDashboardView(FreelancerDashboard)
        : renderDashboardView(ClientDashboard);
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'talent-discovery':
        return role === 'client' ? renderDashboardView(FindTalent) : <TalentDiscovery />;
      case 'project-discovery':
        return role === 'freelancer' ? renderDashboardView(ProjectDiscovery) : <ProjectDiscovery />;
      case 'services-marketplace':
        if (role === 'freelancer') {
          return renderDashboardView(FreelancerDashboard);
        }
        return role === 'client' ? renderDashboardView(ExploreServices) : <ServicesMarketplace />;
      case 'service-detail':
        if (role === 'freelancer') {
          return renderDashboardView(FreelancerDashboard);
        }
        return role === 'client' ? renderDashboardView(ExploreServices) : <ServiceDetail />;
      case 'freelancer-profile':
        return role === 'client' ? renderDashboardView(FindTalent) : <FreelancerProfile />;
      case 'project-detail':
        return role === 'freelancer' ? renderDashboardView(ProjectDetail) : <ProjectDetail />;

      // Freelancer Views
      case 'freelancer-dashboard':
        return renderDashboardView(FreelancerDashboard);
      case 'freelancer-services':
        return renderDashboardView(FreelancerServices);
      case 'skill-verification':
        return renderDashboardView(SkillVerification);
      case 'career-score':
        return renderDashboardView(CareerScoreDetail);
      // Client Views (Dashboard, Find Talent, My Projects, Explore Services)
      case 'client-dashboard':
        return renderDashboardView(ClientDashboard);
      case 'client-find-talent':
        return renderDashboardView(FindTalent);
      case 'client-my-projects':
        return renderDashboardView(MyProjects);
      case 'client-explore-services':
        return renderDashboardView(ExploreServices);

      default:
        return <LandingPage />;
    }
  };

  const showFooter = role === 'public' && ['landing', 'talent-discovery', 'project-discovery', 'services-marketplace', 'freelancer-profile', 'project-detail', 'service-detail'].includes(currentView);

  const { toastMessage } = useApp();

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
      {showFooter && <Footer />}
      <AuthModal />
      <SkillSelectionModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        isOnboarding={isSkillModalOnboarding}
      />
      <ServiceModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 99999,
            backgroundColor:
              toastMessage.type === 'error' ? '#DC2626' :
              toastMessage.type === 'warning' ? '#D97706' :
              toastMessage.type === 'info' ? '#2563EB' : '#059669',
            color: '#FFFFFF',
            padding: '0.85rem 1.35rem',
            borderRadius: '8px',
            boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            maxWidth: '420px',
            pointerEvents: 'none',
            animation: 'slideInRight 0.2s ease-out'
          }}
        >
          <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>
            {toastMessage.type === 'error' ? '✕' :
             toastMessage.type === 'warning' ? '⚠' :
             toastMessage.type === 'info' ? 'ℹ' : '✓'}
          </span>
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}

export default App;
