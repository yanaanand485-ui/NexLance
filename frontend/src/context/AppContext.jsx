import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FREELANCERS,
  PROJECTS,
  SERVICES,
  FREELANCER_NOTIFICATIONS,
  CLIENT_NOTIFICATIONS,
  CLIENT_DATA,
  NEW_FREELANCER
} from '../data/mockData';
import {
  DEFAULT_USERS,
  getStoredUsers,
  saveStoredUsers,
  getStoredActiveUser,
  saveStoredActiveUser
} from '../utils/storage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Core User & Session State
  const [currentUserAccount, setCurrentUserAccount] = useState(() => getStoredActiveUser());
  const [role, setRole] = useState(() => currentUserAccount?.role || 'public');
  const [currentView, setCurrentView] = useState(() => {
    if (currentUserAccount?.role === 'freelancer') return 'freelancer-dashboard';
    if (currentUserAccount?.role === 'client') return 'client-dashboard';
    return 'landing';
  });

  // 2. Profiles State
  const [freelancerProfile, setFreelancerProfile] = useState(() => {
    return currentUserAccount?.role === 'freelancer' && currentUserAccount.profile
      ? currentUserAccount.profile
      : NEW_FREELANCER;
  });

  const [clientProfile, setClientProfile] = useState(() => {
    return currentUserAccount?.role === 'client' && currentUserAccount.profile
      ? currentUserAccount.profile
      : CLIENT_DATA;
  });

  // 3. Selected Entities for Details Views
  const [selectedFreelancer, setSelectedFreelancer] = useState(FREELANCERS[0]);
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [selectedService, setSelectedService] = useState(SERVICES[0]);

  // 4. Comparison & Shortlist State
  const [comparisonList, setComparisonList] = useState([FREELANCERS[0], FREELANCERS[1], FREELANCERS[2]]);
  const [shortlistedFreelancers, setShortlistedFreelancers] = useState(["fl-alex-01", "fl-priya-02"]);

  // 5. Projects & Proposals State
  const [appliedProjectIds, setAppliedProjectIds] = useState([]);
  const [activeProjectsList, setActiveProjectsList] = useState(PROJECTS);

  // 6. Notifications State
  const [freelancerNotifications, setFreelancerNotifications] = useState(FREELANCER_NOTIFICATIONS);
  const [clientNotifications, setClientNotifications] = useState(CLIENT_NOTIFICATIONS);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = role === 'client' ? clientNotifications : freelancerNotifications;

  const setNotifications = (updater) => {
    if (role === 'client') {
      setClientNotifications(typeof updater === 'function' ? updater : () => updater);
    } else {
      setFreelancerNotifications(typeof updater === 'function' ? updater : () => updater);
    }
  };

  const addNotification = (notif, targetRole = role) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      unread: true,
      ...notif
    };
    if (targetRole === 'client') {
      setClientNotifications(prev => [newNotif, ...prev]);
    } else {
      setFreelancerNotifications(prev => [newNotif, ...prev]);
    }
  };

  // 7. Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [authRoleChoice, setAuthRoleChoice] = useState('freelancer');

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isSkillModalOnboarding, setIsSkillModalOnboarding] = useState(false);

  // 8. Assessment Simulator State
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // 9. Toast Alerts State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // 10. Browser History & Navigation Synchronization
  const getDefaultDashboard = (userRole = role) => {
    if (userRole === 'freelancer') return 'freelancer-dashboard';
    if (userRole === 'client') return 'client-dashboard';
    return 'landing';
  };

  const [viewHistory, setViewHistory] = useState(() => {
    const initial = currentUserAccount?.role === 'freelancer'
      ? 'freelancer-dashboard'
      : currentUserAccount?.role === 'client'
        ? 'client-dashboard'
        : 'landing';
    return [initial];
  });

  // Navigate to any view with browser history integration
  const navigateTo = (view, payload = null, options = {}) => {
    const { pushHistory = true, replace = false } = options;

    if (payload) {
      if (view === 'freelancer-profile') setSelectedFreelancer(payload);
      if (view === 'project-detail') setSelectedProject(payload);
      if (view === 'service-detail') setSelectedService(payload);
    }

    if (pushHistory) {
      const stateObj = { view, payload: payload ? { id: payload.id } : null };
      if (replace) {
        window.history.replaceState(stateObj, '', `#${view}`);
      } else {
        window.history.pushState(stateObj, '', `#${view}`);
      }
    }

    setViewHistory(prev => [...prev, view]);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smart in-app back navigation function
  const goBack = (fallbackView = null) => {
    // If browser has history, use standard history back to maintain natural flow
    if (window.history.state && window.history.length > 1 && viewHistory.length > 1) {
      window.history.back();
    } else {
      const targetFallback = fallbackView || getDefaultDashboard();
      navigateTo(targetFallback, null, { pushHistory: true });
    }
  };

  // Direct return to the user's dashboard (or landing for public)
  const goToDashboard = () => {
    navigateTo(getDefaultDashboard(), null, { pushHistory: true });
  };

  // Setup initial history state and listen for browser Back/Forward (popstate)
  useEffect(() => {
    const initialView = currentView;
    // Replace initial state with current view so browser knows root
    window.history.replaceState({ view: initialView, payload: null }, '', `#${initialView}`);

    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        const targetView = event.state.view;
        if (event.state.payload && event.state.payload.id) {
          if (targetView === 'service-detail') {
            const found = SERVICES.find(s => s.id === event.state.payload.id);
            if (found) setSelectedService(found);
          } else if (targetView === 'project-detail') {
            const found = PROJECTS.find(p => p.id === event.state.payload.id);
            if (found) setSelectedProject(found);
          } else if (targetView === 'freelancer-profile') {
            const found = FREELANCERS.find(f => f.id === event.state.payload.id);
            if (found) setSelectedFreelancer(found);
          }
        }
        setCurrentView(targetView);
        setViewHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : [targetView]));
      } else {
        // Fallback: If user hits back to the empty initial state, stay on dashboard rather than exiting
        const fallback = getDefaultDashboard();
        setCurrentView(fallback);
        window.history.replaceState({ view: fallback, payload: null }, '', `#${fallback}`);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleFindTalent = () => {
    if (role === 'client') {
      navigateTo('client-dashboard');
    } else {
      setAuthMode('signup');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      showToast('Sign in or create a Client account to hire verified talent.', 'info');
    }
  };

  const handleFindWork = () => {
    if (role === 'freelancer') {
      navigateTo('freelancer-dashboard');
    } else {
      setAuthMode('signup');
      setAuthRoleChoice('freelancer');
      setIsAuthModalOpen(true);
      showToast('Sign in or create a Freelancer account to verify skills and get projects.', 'info');
    }
  };

  // 11. Auth Actions (Register, Login, Switch Role, Logout)
  const registerUser = ({ name, email, password, role: userRole = 'freelancer', companyName }) => {
    const cleanEmail = email?.trim().toLowerCase() || '';
    const cleanName = name?.trim() || '';

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, message: 'Please fill in all required fields (Name, Email, Password).' };
    }

    const users = getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail && u.role === userRole)) {
      return { success: false, message: `An account with this email (${cleanEmail}) already exists. Please log in.` };
    }

    const avatarUrl = userRole === 'freelancer'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80';

    const newProfile = userRole === 'freelancer'
      ? { ...NEW_FREELANCER, id: `fl-${Date.now()}`, name: cleanName, email: cleanEmail, avatar: avatarUrl }
      : { ...CLIENT_DATA, id: `cl-${Date.now()}`, contactPerson: cleanName, name: companyName || `${cleanName} Enterprises`, email: cleanEmail, avatar: avatarUrl };

    const newUser = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password,
      role: userRole,
      avatar: avatarUrl,
      profile: newProfile
    };

    saveStoredUsers([...users, newUser]);
    saveStoredActiveUser(newUser);
    setCurrentUserAccount(newUser);
    setRole(userRole);

    if (userRole === 'freelancer') {
      setFreelancerProfile(newProfile);
      setCurrentView('freelancer-dashboard');
      showToast(`Welcome to NexLance, ${cleanName}!`, 'success');
      setTimeout(() => {
        setIsSkillModalOnboarding(true);
        setIsSkillModalOpen(true);
      }, 400);
    } else {
      setClientProfile(newProfile);
      setCurrentView('client-dashboard');
      showToast(`Welcome to NexLance, ${cleanName}!`, 'success');
    }

    return { success: true, user: newUser };
  };

  const loginUser = ({ email, password, role: targetRole }) => {
    const cleanEmail = email?.trim().toLowerCase() || '';
    const cleanPassword = password?.trim() || '';

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    const users = getStoredUsers();

    // 1. First search for exact match on email and targetRole
    let foundUser = users.find(u => u.email?.toLowerCase() === cleanEmail && (!targetRole || u.role === targetRole));

    // 2. If not found with targetRole, search by email across any role
    if (!foundUser) {
      foundUser = users.find(u => u.email?.toLowerCase() === cleanEmail);
    }

    // 3. Smart Demo Email Fallback (Role-Aware)
    if (!foundUser) {
      if (targetRole === 'client' && (cleanEmail.includes('sarah') || cleanEmail.includes('meridian'))) {
        foundUser = users.find(u => u.role === 'client' && (u.email.includes('sarah') || u.email.includes('meridian'))) || DEFAULT_USERS.find(u => u.role === 'client');
      } else if (targetRole === 'freelancer' && cleanEmail.includes('sarah')) {
        foundUser = users.find(u => u.role === 'freelancer' && u.email.includes('sarah')) || DEFAULT_USERS[0];
      } else if (cleanEmail.includes('client')) {
        foundUser = users.find(u => u.role === 'client') || DEFAULT_USERS.find(u => u.role === 'client');
      } else if (cleanEmail.includes('alex')) {
        foundUser = users.find(u => u.email.includes('alex')) || DEFAULT_USERS[1];
      } else if (cleanEmail.includes('priya')) {
        foundUser = users.find(u => u.email.includes('priya')) || DEFAULT_USERS[2];
      }
    }

    if (!foundUser) {
      return { success: false, message: `No account found for "${email}". Please click "Get Started" to sign up.` };
    }

    // 4. Flexible Password Verification (supports exact, trimmed, case-insensitive, and standard demo passwords)
    const isPasswordMatch =
      foundUser.password === password ||
      foundUser.password === cleanPassword ||
      (foundUser.password && foundUser.password.toLowerCase() === cleanPassword.toLowerCase()) ||
      cleanPassword.toLowerCase() === 'password123' ||
      cleanPassword === '123456' ||
      cleanPassword.toLowerCase() === 'client123' ||
      cleanPassword.toLowerCase() === 'demo123' ||
      cleanPassword.toLowerCase() === 'admin123';

    if (!isPasswordMatch) {
      return {
        success: false,
        message: 'Incorrect password. (For demo accounts, use Password123 or one-click demo credentials)',
        reason: 'INVALID_PASSWORD'
      };
    }

    // Update password if logging in with valid demo password
    if (foundUser.password !== password && (cleanPassword.toLowerCase() === 'password123' || cleanPassword === '123456')) {
      foundUser.password = password;
      const updatedUsers = users.map(u => u.id === foundUser.id ? foundUser : u);
      saveStoredUsers(updatedUsers);
    }

    // If logging into client tab but user was registered with client role or vice versa, sync active role
    const effectiveRole = targetRole || foundUser.role;
    if (foundUser.role !== effectiveRole) {
      foundUser = { ...foundUser, role: effectiveRole };
    }

    saveStoredActiveUser(foundUser);
    setCurrentUserAccount(foundUser);
    setRole(foundUser.role);

    if (foundUser.role === 'freelancer') {
      if (foundUser.profile) setFreelancerProfile(foundUser.profile);
      navigateTo('freelancer-dashboard');
      showToast(`Welcome back, ${foundUser.name}!`, 'success');
    } else {
      if (foundUser.profile) setClientProfile(foundUser.profile);
      navigateTo('client-dashboard');
      showToast(`Welcome back, ${foundUser.name}!`, 'success');
    }

    return { success: true, user: foundUser };
  };

  const loginAs = (userRole) => {
    const users = getStoredUsers();
    const demoUser = users.find(u => u.role === userRole) || (userRole === 'freelancer' ? DEFAULT_USERS[0] : DEFAULT_USERS[3]);

    if (demoUser) {
      saveStoredActiveUser(demoUser);
      setCurrentUserAccount(demoUser);
      setRole(userRole);
      if (userRole === 'freelancer') {
        if (demoUser.profile) setFreelancerProfile(demoUser.profile);
        setCurrentView('freelancer-dashboard');
      } else {
        if (demoUser.profile) setClientProfile(demoUser.profile);
        setCurrentView('client-dashboard');
      }
      showToast(`Logged in as ${demoUser.name}`, 'success');
    }
  };

  const logout = () => {
    saveStoredActiveUser(null);
    setCurrentUserAccount(null);
    setFreelancerProfile(NEW_FREELANCER);
    setRole('public');
    setCurrentView('landing');
    showToast('Logged out successfully.', 'info');
  };

  const switchRole = (newRole) => {
    if (newRole === 'public') {
      logout();
    } else {
      setAuthMode('login');
      setAuthRoleChoice(newRole);
      setIsAuthModalOpen(true);
      showToast(`Please sign in with your ${newRole === 'client' ? 'Client' : 'Freelancer'} account.`, 'info');
    }
  };

  // 12. Actions (Shortlist, Comparison, Proposals, Projects)
  const toggleShortlist = (freelancerId) => {
    setShortlistedFreelancers(prev =>
      prev.includes(freelancerId)
        ? prev.filter(id => id !== freelancerId)
        : [...prev, freelancerId]
    );
    showToast('Shortlist updated ⭐', 'success');
  };

  const toggleComparison = (freelancer) => {
    setComparisonList(prev => {
      const exists = prev.some(item => item.id === freelancer.id);
      if (exists) {
        showToast(`${freelancer.name} removed from comparison`, 'info');
        return prev.filter(item => item.id !== freelancer.id);
      }
      if (prev.length >= 3) {
        showToast('You can compare a maximum of 3 candidates at once.', 'warning');
        return prev;
      }
      showToast(`${freelancer.name} added to comparison`, 'success');
      return [...prev, freelancer];
    });
  };

  const submitProposal = (projectId) => {
    setAppliedProjectIds(prev => [...prev, projectId]);
    addNotification({
      category: 'Proposals & Offers',
      title: 'Proposal Submitted Successfully',
      description: 'Your verified proposal has been delivered to the client.',
      action: 'view-projects'
    }, 'freelancer');
    showToast('Proposal submitted successfully!', 'success');
  };

  const addNewProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      badge: 'Newly Posted',
      client: {
        name: clientProfile.name,
        avatar: clientProfile.avatar,
        rating: 5.0,
        spent: '$18,000+',
        verifiedPayment: true,
        country: 'United States'
      },
      matchScore: 95,
      applicantsCount: 0,
      postedAgo: 'Just now',
      status: 'Open',
      ...projectData
    };
    setActiveProjectsList(prev => [newProj, ...prev]);
    showToast('Project posted successfully!', 'success');
    navigateTo('comparison');
  };

  // 13. Skill Assessment & Profile Updating
  const completeAssessment = (score, skillName) => {
    setFreelancerProfile(prev => {
      const updatedSkills = (prev.verifiedSkills || []).map(skill => {
        if (skill.name.toLowerCase().includes(skillName.toLowerCase()) || skill.id === skillName.toLowerCase()) {
          return {
            ...skill,
            score,
            status: 'verified',
            percentile: score >= 90 ? 'Top 5% Global' : 'Top 15% Global',
            verifiedDate: 'Just Now'
          };
        }
        return skill;
      });

      const newCareerScore = prev.careerScore === 0 ? Math.round(score * 0.85) : Math.min(100, prev.careerScore + 2);
      const updated = {
        ...prev,
        verifiedSkills: updatedSkills,
        careerScore: newCareerScore,
        codeQualityRate: Math.max(prev.codeQualityRate || 0, Math.round(score * 0.95))
      };

      const active = getStoredActiveUser();
      if (active && active.role === 'freelancer') {
        active.profile = updated;
        saveStoredActiveUser(active);
      }
      return updated;
    });

    addNotification({
      category: 'Skill Verification',
      title: `Skill Verified: ${skillName} (${score}/100) 🎉`,
      description: `Skill badge is live on your profile.`,
      action: 'view-skills'
    }, 'freelancer');

    showToast(`Skill Verified! Score: ${score}/100`, 'success');
  };

  const updateFreelancerSkills = ({ role: newRole, skills: newSkills, experienceLevel: newExp }) => {
    setFreelancerProfile(prev => {
      const updated = {
        ...prev,
        role: newRole || prev.role,
        skills: newSkills || prev.skills,
        experienceLevel: newExp || prev.experienceLevel
      };
      const active = getStoredActiveUser();
      if (active && active.role === 'freelancer') {
        active.profile = updated;
        saveStoredActiveUser(active);
      }
      return updated;
    });
    showToast('Skill profile updated successfully!', 'success');
  };

  const contextValue = {
    role,
    setRole,
    switchRole,
    handleFindTalent,
    handleFindWork,
    registerUser,
    loginUser,
    loginAs,
    logout,
    currentUserAccount,
    currentView,
    setCurrentView,
    navigateTo,
    goBack,
    goToDashboard,
    viewHistory,
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
    setComparisonList,
    toggleComparison,
    shortlistedFreelancers,
    toggleShortlist,
    appliedProjectIds,
    submitProposal,
    activeProjectsList,
    addNewProject,
    notifications,
    setNotifications,
    addNotification,
    isNotificationOpen,
    setIsNotificationOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    authRoleChoice,
    setAuthRoleChoice,
    isSkillModalOpen,
    setIsSkillModalOpen,
    isSkillModalOnboarding,
    setIsSkillModalOnboarding,
    updateFreelancerSkills,
    activeAssessment,
    setActiveAssessment,
    assessmentResult,
    setAssessmentResult,
    completeAssessment,
    toastMessage,
    showToast
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
