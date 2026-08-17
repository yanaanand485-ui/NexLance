import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Sidebar } from './components/common/Sidebar';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/common/AuthModal';
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
import { SmartMatchView } from './components/client/SmartMatchView';
import { CandidateComparison } from './components/client/CandidateComparison';
import { PostProjectWizard } from './components/client/PostProjectWizard';
import { ApplicationsView } from './components/client/ApplicationsView';

import './styles/components.css';

const MainRouter = () => {
  const { currentView, role } = useApp();

  // Dashboard Layout Wrapper
  const renderDashboardView = (Component) => (
    <div className="dashboard-layout">
      <Sidebar />
      <Component />
    </div>
  );

  const renderContent = () => {
    // If not logged in, only show public landing page until user logs in
    if (role === 'public' && currentView !== 'landing') {
      return <LandingPage />;
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'talent-discovery':
        return <TalentDiscovery />;
      case 'project-discovery':
        return <ProjectDiscovery />;
      case 'services-marketplace':
        return <ServicesMarketplace />;
      case 'freelancer-profile':
        return <FreelancerProfile />;
      case 'project-detail':
        return <ProjectDetail />;
      case 'service-detail':
        return <ServiceDetail />;

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
      case 'smart-match':
        return renderDashboardView(SmartMatchView);
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

  const showFooter = ['landing', 'talent-discovery', 'project-discovery', 'services-marketplace', 'freelancer-profile', 'project-detail', 'service-detail'].includes(currentView);

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ flex: 1 }}>
        {renderContent()}
      </div>
      {showFooter && <Footer />}
      <NotificationDrawer />
      <AuthModal />
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
