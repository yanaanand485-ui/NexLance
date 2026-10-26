import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Sidebar } from './components/common/Sidebar';
import { AuthModal } from './components/common/AuthModal';
import { SkillSelectionModal } from './components/common/SkillSelectionModal';
// Pages & Views
import { LandingPage } from './pages/LandingPage';
import { ProjectDiscovery } from './components/marketplace/ProjectDiscovery';
import { ProjectDetail } from './components/marketplace/ProjectDetail';

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
  const { role, isSkillModalOpen, setIsSkillModalOpen, isSkillModalOnboarding } = useApp();
  const location = useLocation();

  // Dashboard Layout Wrapper
  const renderDashboardView = (Component) => (
    <div className="dashboard-layout">
      <Sidebar />
      <Component />
    </div>
  );

  const showFooter =
    role === 'public' &&
    ['/', '/projects', '/projects/detail'].includes(location.pathname);

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          {/* Public / Landing Route */}
          <Route
            path="/"
            element={
              role === 'freelancer' ? (
                <Navigate to="/freelancer/dashboard" replace />
              ) : role === 'client' ? (
                <Navigate to="/client/dashboard" replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Project Discovery & Details */}
          <Route
            path="/projects"
            element={role === 'freelancer' ? renderDashboardView(ProjectDiscovery) : <ProjectDiscovery />}
          />
          <Route
            path="/projects/detail"
            element={role === 'freelancer' ? renderDashboardView(ProjectDetail) : <ProjectDetail />}
          />

          {/* Freelancer Routes */}
          <Route
            path="/freelancer/dashboard"
            element={role === 'freelancer' ? renderDashboardView(FreelancerDashboard) : <Navigate to="/" replace />}
          />
          <Route
            path="/freelancer/services"
            element={role === 'freelancer' ? renderDashboardView(FreelancerServices) : <Navigate to="/" replace />}
          />
          <Route
            path="/freelancer/skills"
            element={role === 'freelancer' ? renderDashboardView(SkillVerification) : <Navigate to="/" replace />}
          />
          <Route
            path="/freelancer/career-score"
            element={role === 'freelancer' ? renderDashboardView(CareerScoreDetail) : <Navigate to="/" replace />}
          />

          {/* Client Routes */}
          <Route
            path="/client/dashboard"
            element={role === 'client' ? renderDashboardView(ClientDashboard) : <Navigate to="/" replace />}
          />
          <Route
            path="/client/talent"
            element={role === 'client' ? renderDashboardView(FindTalent) : <Navigate to="/" replace />}
          />
          <Route
            path="/client/projects"
            element={role === 'client' ? renderDashboardView(MyProjects) : <Navigate to="/" replace />}
          />
          <Route
            path="/client/services"
            element={role === 'client' ? renderDashboardView(ExploreServices) : <Navigate to="/" replace />}
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showFooter && <Footer />}
      <AuthModal />
      <SkillSelectionModal
        isOpen={isSkillModalOpen}
        onClose={() => setIsSkillModalOpen(false)}
        isOnboarding={isSkillModalOnboarding}
      />
      <ServiceModal />
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
