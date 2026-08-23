import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Sidebar } from './components/common/Sidebar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/common/AuthModal';
import { SkillSelectionModal } from './components/common/SkillSelectionModal';
import { Toast } from './components/common/Toast';

// Pages & Views
import { LandingPage } from './pages/LandingPage';
import { TalentDiscovery } from './components/marketplace/TalentDiscovery';
import { ProjectDiscovery } from './components/marketplace/ProjectDiscovery';
import { ServicesMarketplace } from './components/marketplace/ServicesMarketplace';
import { FreelancerProfile } from './components/marketplace/FreelancerProfile';
import { ProjectDetail } from './components/marketplace/ProjectDetail';
import { ServiceDetail } from './components/marketplace/ServiceDetail';

// Freelancer Platform
import { FreelancerDashboard } from './components/freelancer/FreelancerDashboard';
import { SkillVerification } from './components/freelancer/SkillVerification';
import { CareerScoreDetail } from './components/freelancer/CareerScoreDetail';
import { ProofOfWork } from './components/freelancer/ProofOfWork';
import { OpportunitiesFeed } from './components/freelancer/OpportunitiesFeed';
import { NewFreelancerExperience } from './components/freelancer/NewFreelancerExperience';

// Client Platform
import { ClientDashboard } from './components/client/ClientDashboard';
import { CandidateComparison } from './components/client/CandidateComparison';
import { PostProjectWizard } from './components/client/PostProjectWizard';
import { ApplicationsView } from './components/client/ApplicationsView';

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

    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'talent-discovery':
        return role === 'client' ? renderDashboardView(TalentDiscovery) : <TalentDiscovery />;
      case 'project-discovery':
        return role === 'freelancer' ? renderDashboardView(ProjectDiscovery) : <ProjectDiscovery />;
      case 'services-marketplace':
        return role === 'client' ? renderDashboardView(ServicesMarketplace) : <ServicesMarketplace />;
      case 'service-detail':
        return role === 'client' ? renderDashboardView(ServiceDetail) : <ServiceDetail />;
      case 'freelancer-profile':
        return role === 'client' ? renderDashboardView(FreelancerProfile) : <FreelancerProfile />;
      case 'project-detail':
        return role === 'freelancer' ? renderDashboardView(ProjectDetail) : <ProjectDetail />;

      // Freelancer Views
      case 'freelancer-dashboard':
        return renderDashboardView(FreelancerDashboard);
      case 'skill-verification':
        return renderDashboardView(SkillVerification);
      case 'career-score':
        return renderDashboardView(CareerScoreDetail);
      case 'proof-of-work':
        return renderDashboardView(ProofOfWork);
      case 'opportunities':
        return renderDashboardView(OpportunitiesFeed);
      case 'new-freelancer':
        return renderDashboardView(NewFreelancerExperience);

      // Client Views
      case 'client-dashboard':
        return renderDashboardView(ClientDashboard);
      case 'comparison':
        return renderDashboardView(CandidateComparison);
      case 'post-project':
        return renderDashboardView(PostProjectWizard);
      case 'applications':
        return renderDashboardView(ApplicationsView);

      default:
        return <LandingPage />;
    }
  };

  const showFooter = ['landing'].includes(currentView) || (role === 'public' && ['talent-discovery', 'project-discovery', 'services-marketplace', 'freelancer-profile', 'project-detail', 'service-detail'].includes(currentView));

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
      {showFooter && <Footer />}
      <NotificationDrawer />
      <AuthModal />
      <SkillSelectionModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        isOnboarding={isSkillModalOnboarding}
      />
      <Toast />
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
