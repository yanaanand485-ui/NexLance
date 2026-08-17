import React, { createContext, useContext, useState } from 'react';
import {
  CURRENT_USER,
  FREELANCERS,
  PROJECTS,
  SERVICES,
  ASSESSMENTS,
  NOTIFICATIONS,
  CLIENT_DATA,
  NEW_FREELANCER
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [role, setRole] = useState('public'); // 'public' | 'freelancer' | 'client'
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'freelancer-dashboard' | 'skill-verification' | 'career-score' | 'proof-of-work' | 'opportunities' | 'talent-discovery' | 'project-discovery' | 'services-marketplace' | 'client-dashboard' | 'smart-match' | 'comparison' | 'post-project' | 'applications' | 'freelancer-profile' | 'project-detail' | 'service-detail'

  // Selected Data Entity for Details View
  const [selectedFreelancer, setSelectedFreelancer] = useState(FREELANCERS[0]);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  // Comparison & Shortlist state
  const [comparisonList, setComparisonList] = useState([FREELANCERS[0], FREELANCERS[1], FREELANCERS[2]]);
  const [shortlistedFreelancers, setShortlistedFreelancers] = useState(["fl-alex-01", "fl-priya-02"]);

  // Submitted Proposals & Applied Projects
  const [appliedProjectIds, setAppliedProjectIds] = useState([]);
  const [activeProjectsList, setActiveProjectsList] = useState(PROJECTS);

  // Notifications State
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authRoleChoice, setAuthRoleChoice] = useState('freelancer'); // 'freelancer' | 'client'

  // User Profile State
  const [freelancerProfile, setFreelancerProfile] = useState(CURRENT_USER);
  const [clientProfile, setClientProfile] = useState(CLIENT_DATA);

  // Assessment Simulator State
  const [activeAssessment, setActiveAssessment] = useState(null); // e.g. ASSESSMENTS.react
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Toast / Alert Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper Navigation Functions
  const navigateTo = (view, payload = null) => {
    if (payload) {
      if (view === 'freelancer-profile') setSelectedFreelancer(payload);
      if (view === 'project-detail') setSelectedProject(payload);
      if (view === 'service-detail') setSelectedService(payload);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find Talent action (Client intent) -> opens Client Dashboard & Marketplace
  const handleFindTalent = () => {
    setRole('client');
    setCurrentView('client-dashboard');
    showToast('Entered Client Portal — discover proven talent and post projects', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find Work action (Freelancer intent) -> opens Freelancer Dashboard & Opportunities
  const handleFindWork = () => {
    setRole('freelancer');
    setCurrentView('freelancer-dashboard');
    showToast('Entered Freelancer Portal — prove your skills and track Career Score', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login with custom User Name & details
  const loginWithUser = ({ name, email, role: chosenRole, companyName }) => {
    const userRole = chosenRole || 'freelancer';
    const trimmedName = name?.trim() || (email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Alex Rivera');

    if (userRole === 'freelancer') {
      setFreelancerProfile(prev => ({
        ...prev,
        name: trimmedName,
        email: email || 'user@nexlance.dev'
      }));
      setRole('freelancer');
      setCurrentView('freelancer-dashboard');
      showToast(`Welcome back, ${trimmedName}!`, 'success');
    } else {
      const company = companyName?.trim() || `${trimmedName} Retail Global`;
      setClientProfile(prev => ({
        ...prev,
        contactPerson: trimmedName,
        name: company,
        email: email || 'client@company.com'
      }));
      setRole('client');
      setCurrentView('client-dashboard');
      showToast(`Welcome back, ${trimmedName}! (${company})`, 'success');
    }
  };

  // Login as specific role
  const loginAs = (userRole) => {
    setRole(userRole);
    if (userRole === 'freelancer') {
      setCurrentView('freelancer-dashboard');
      showToast(`Welcome back, ${freelancerProfile.name}!`, 'success');
    } else if (userRole === 'client') {
      setCurrentView('client-dashboard');
      showToast(`Welcome back, ${clientProfile.contactPerson}!`, 'success');
    } else {
      setCurrentView('landing');
    }
  };

  // Log Out -> returns back to clean Public site
  const logout = () => {
    setRole('public');
    setCurrentView('landing');
    showToast('Logged out successfully. Returned to public marketplace.', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch Role
  const switchRole = (newRole) => {
    setRole(newRole);
    if (newRole === 'public') {
      setCurrentView('landing');
    } else if (newRole === 'freelancer') {
      setCurrentView('freelancer-dashboard');
    } else if (newRole === 'client') {
      setCurrentView('client-dashboard');
    }
  };

  // Toggle Shortlist
  const toggleShortlist = (freelancerId) => {
    if (shortlistedFreelancers.includes(freelancerId)) {
      setShortlistedFreelancers(prev => prev.filter(id => id !== freelancerId));
      showToast('Freelancer removed from shortlist', 'info');
    } else {
      setShortlistedFreelancers(prev => [...prev, freelancerId]);
      showToast('Freelancer added to shortlist ⭐', 'success');
    }
  };

  // Toggle Comparison
  const toggleComparison = (freelancer) => {
    const exists = comparisonList.some(item => item.id === freelancer.id);
    if (exists) {
      setComparisonList(prev => prev.filter(item => item.id !== freelancer.id));
      showToast(`${freelancer.name} removed from comparison matrix`, 'info');
    } else {
      if (comparisonList.length >= 4) {
        showToast('You can compare a maximum of 4 candidates at once', 'warning');
        return;
      }
      setComparisonList(prev => [...prev, freelancer]);
      showToast(`${freelancer.name} added to comparison matrix`, 'success');
    }
  };

  // Apply to Project
  const submitProposal = (projectId, proposalData) => {
    setAppliedProjectIds(prev => [...prev, projectId]);
    showToast('Proposal submitted successfully! Client has been notified.', 'success');
  };

  // Add new project (Client action)
  const addNewProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      badge: "Newly Posted",
      client: {
        name: clientProfile.name,
        avatar: clientProfile.avatar,
        rating: 5.0,
        spent: "₹15 Lakh ($18K+)",
        verifiedPayment: true,
        country: "United States"
      },
      matchScore: 95,
      applicantsCount: 0,
      postedAgo: "Just now",
      status: "Open",
      ...projectData
    };
    setActiveProjectsList(prev => [newProj, ...prev]);
    showToast('Project posted successfully! Smart Match engine is finding candidates.', 'success');
    navigateTo('smart-match');
  };

  // Complete Assessment
  const completeAssessment = (score, skillName) => {
    // Add or update skill in freelancer profile
    const updatedSkills = freelancerProfile.verifiedSkills.map(skill => {
      if (skill.name.toLowerCase().includes(skillName.toLowerCase()) || skill.id === skillName.toLowerCase()) {
        return {
          ...skill,
          score: score,
          status: 'verified',
          percentile: score >= 90 ? 'Top 5% Global' : score >= 80 ? 'Top 15% Global' : 'Top 25% Global',
          verifiedDate: 'Just Now'
        };
      }
      return skill;
    });

    setFreelancerProfile(prev => ({
      ...prev,
      verifiedSkills: updatedSkills,
      careerScore: Math.min(100, Math.max(prev.careerScore, Math.round(prev.careerScore + 1)))
    }));

    showToast(`Skill Verified! Score: ${score}/100. Added to your verified profile.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        switchRole,
        handleFindTalent,
        handleFindWork,
        loginAs,
        loginWithUser,
        logout,
        currentView,
        setCurrentView,
        navigateTo,
        freelancerProfile,
        setFreelancerProfile,
        clientProfile,
        setClientProfile,
        selectedFreelancer,
        setSelectedFreelancer,
        selectedProject,
        setSelectedProject,
        selectedService,
        setSelectedService,
        comparisonList,
        toggleComparison,
        shortlistedFreelancers,
        toggleShortlist,
        appliedProjectIds,
        submitProposal,
        activeProjectsList,
        addNewProject,
        notifications,
        setNotifications,
        isNotificationOpen,
        setIsNotificationOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        authRoleChoice,
        setAuthRoleChoice,
        activeAssessment,
        setActiveAssessment,
        assessmentResult,
        setAssessmentResult,
        completeAssessment,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
