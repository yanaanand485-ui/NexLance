import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CURRENT_USER,
  SARAH_FREELANCER,
  PRIYA_FREELANCER,
  FREELANCERS,
  PROJECTS,
  SERVICES,
  ASSESSMENTS,
  NOTIFICATIONS,
  CLIENT_DATA,
  NEW_FREELANCER
} from '../data/mockData';

// Local Storage Keys
const USERS_STORAGE_KEY = 'nexlance_registered_users';
const SESSION_STORAGE_KEY = 'nexlance_active_user';

// Default Demo Accounts for testing existing user login (Old accounts with rich history)
export const DEFAULT_USERS = [
  {
    id: "fl-sarah-01",
    name: "Sarah Jenkins",
    email: "sarah@nexlance.dev",
    password: "Password123",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    profile: SARAH_FREELANCER,
    createdAt: "2024-01-10T00:00:00.000Z"
  },
  {
    id: "fl-alex-01",
    name: "Alex Rivera",
    email: "alex@nexlance.dev",
    password: "Password123",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    profile: CURRENT_USER,
    createdAt: "2024-01-15T00:00:00.000Z"
  },
  {
    id: "fl-priya-02",
    name: "Priya Sharma",
    email: "priya@nexlance.dev",
    password: "Password123",
    role: "freelancer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    profile: PRIYA_FREELANCER,
    createdAt: "2024-02-05T00:00:00.000Z"
  },
  {
    id: "cl-meridian-01",
    name: "Sarah Jenkins",
    email: "sarah@meridian.com",
    password: "Password123",
    role: "client",
    companyName: "Meridian Retail Global",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    profile: CLIENT_DATA,
    createdAt: "2024-02-01T00:00:00.000Z"
  }
];

// Helper functions for Local Storage
export const getStoredUsers = () => {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all DEFAULT_USERS are present (merge by email)
      const existingEmails = new Set(parsed.map(u => u.email?.toLowerCase()));
      const missingDefaults = DEFAULT_USERS.filter(d => !existingEmails.has(d.email?.toLowerCase()));
      if (missingDefaults.length > 0) {
        const merged = [...parsed, ...missingDefaults];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  } catch (err) {
    console.error('Error reading registered users from localStorage:', err);
    return DEFAULT_USERS;
  }
};

export const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving users to localStorage:', err);
  }
};

export const getStoredActiveUser = () => {
  try {
    const saved = localStorage.getItem(SESSION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error('Error reading active session from localStorage:', err);
    return null;
  }
};

export const saveStoredActiveUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Error saving active session to localStorage:', err);
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Role State
  const [role, setRole] = useState('public'); // 'public' | 'freelancer' | 'client'
  const [currentView, setCurrentView] = useState('landing');

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
  const [authMode, setAuthMode] = useState('signup'); // 'signup' (Get Started) | 'login'
  const [authRoleChoice, setAuthRoleChoice] = useState('freelancer'); // 'freelancer' | 'client'

  // User Profile State (Default is clean new user with 0 score)
  const [freelancerProfile, setFreelancerProfile] = useState(NEW_FREELANCER);
  const [clientProfile, setClientProfile] = useState(CLIENT_DATA);
  const [currentUserAccount, setCurrentUserAccount] = useState(null);

  // Assessment Simulator State
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Toast / Alert Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Restore session from localStorage on initial mount
  useEffect(() => {
    // Make sure user repository is seeded in localStorage
    getStoredUsers();

    // Check if an active session exists
    const activeSession = getStoredActiveUser();
    if (activeSession && activeSession.role && activeSession.role !== 'public') {
      setCurrentUserAccount(activeSession);
      setRole(activeSession.role);

      if (activeSession.role === 'freelancer') {
        if (activeSession.profile) {
          setFreelancerProfile(activeSession.profile);
        } else {
          setFreelancerProfile(prev => ({
            ...prev,
            name: activeSession.name,
            email: activeSession.email,
            avatar: activeSession.avatar || prev.avatar
          }));
        }
        setCurrentView('freelancer-dashboard');
      } else if (activeSession.role === 'client') {
        if (activeSession.profile) {
          setClientProfile(activeSession.profile);
        } else {
          setClientProfile(prev => ({
            ...prev,
            contactPerson: activeSession.name,
            name: activeSession.companyName || `${activeSession.name} Enterprises`,
            email: activeSession.email,
            avatar: activeSession.avatar || prev.avatar
          }));
        }
        setCurrentView('client-dashboard');
      }
    }
  }, []);

  // Helper Navigation Functions with Role Protection
  const navigateTo = (view, payload = null) => {
    // Client-only views
    const clientOnlyViews = ['client-dashboard', 'post-project', 'smart-match', 'comparison'];
    // Freelancer-only views
    const freelancerOnlyViews = ['freelancer-dashboard', 'skill-verification', 'career-score', 'proof-of-work', 'opportunities', 'new-freelancer'];

    if (clientOnlyViews.includes(view) && role !== 'client') {
      showToast('Access restricted. Please sign in with a Client account to access this area.', 'warning');
      setAuthMode('login');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      return;
    }

    if (freelancerOnlyViews.includes(view) && role !== 'freelancer') {
      showToast('Access restricted. Please sign in with a Freelancer account to access this area.', 'warning');
      setAuthMode('login');
      setAuthRoleChoice('freelancer');
      setIsAuthModalOpen(true);
      return;
    }

    if (payload) {
      if (view === 'freelancer-profile') setSelectedFreelancer(payload);
      if (view === 'project-detail') setSelectedProject(payload);
      if (view === 'service-detail') setSelectedService(payload);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find Talent action:
  // Requires Client login/signup before entering portal/marketplace
  const handleFindTalent = () => {
    if (role === 'client') {
      setCurrentView('client-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (role === 'freelancer') {
      // Logged in as freelancer: cannot switch to client without logging in as client
      showToast('You are logged in as a Freelancer. Please sign in with a Client account to hire talent.', 'warning');
      setAuthMode('login');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
    } else {
      // Unauthenticated visitor -> Open Auth Modal in Get Started (Signup) mode for Client
      setAuthMode('signup');
      setAuthRoleChoice('client');
      setIsAuthModalOpen(true);
      showToast('Please sign in or create a Client account to hire verified talent.', 'info');
    }
  };

  // Find Work action:
  // Requires Freelancer login/signup before entering portal/projects
  const handleFindWork = () => {
    if (role === 'freelancer') {
      setCurrentView('freelancer-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (role === 'client') {
      // Logged in as client: cannot switch to freelancer without logging in as freelancer
      showToast('You are logged in as a Client. Please sign in with a Freelancer account to find work.', 'warning');
      setAuthMode('login');
      setAuthRoleChoice('freelancer');
      setIsAuthModalOpen(true);
    } else {
      // Unauthenticated visitor -> Open Auth Modal in Get Started (Signup) mode for Freelancer
      setAuthMode('signup');
      setAuthRoleChoice('freelancer');
      setIsAuthModalOpen(true);
      showToast('Please sign in or create a Freelancer account to verify skills and get projects.', 'info');
    }
  };

  // ==========================================
  // LOCAL STORAGE AUTH: REGISTER NEW USER ("Get Started")
  // ==========================================
  const registerUser = ({ name, email, password, role: chosenRole, companyName }) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';
    const cleanName = name ? name.trim() : '';
    const userRole = chosenRole || 'freelancer';

    // Required fields check
    if (!cleanName || !cleanEmail || !password) {
      return {
        success: false,
        reason: 'MISSING_FIELDS',
        message: 'Please fill in all required fields (Full Name, Email, and Password).'
      };
    }

    // Password constraints validation
    if (password.length < 6) {
      return {
        success: false,
        reason: 'PASSWORD_TOO_SHORT',
        message: 'Password must be at least 6 characters long.'
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        success: false,
        reason: 'PASSWORD_NO_UPPERCASE',
        message: 'Password must contain at least one capital letter (A-Z).'
      };
    }

    if (!/[0-9]/.test(password)) {
      return {
        success: false,
        reason: 'PASSWORD_NO_NUMBER',
        message: 'Password must contain at least one number (0-9).'
      };
    }

    const users = getStoredUsers();

    // Check if user already exists for this role
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail && u.role === userRole);
    if (existing) {
      return {
        success: false,
        reason: 'ALREADY_EXISTS',
        message: `A ${userRole === 'client' ? 'Client' : 'Freelancer'} account with this email (${cleanEmail}) already exists. Please log in.`
      };
    }

    // Build specialized profile for the new user
    let userProfile;
    let avatarUrl;

    if (userRole === 'freelancer') {
      avatarUrl = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80`;
      userProfile = {
        ...NEW_FREELANCER,
        id: `fl-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        role: "Full-Stack Developer",
        avatar: avatarUrl,
        careerScore: 0, // NEW USERS START WITH 0 CAREER SCORE
        isNew: true,
        earnedTotal: "$0",
        rating: 0,
        totalReviews: 0,
        activeProjectsCount: 0,
        completedProjectsCount: 0,
        applicationsCount: 0,
        clientSatisfactionRate: 0,
        onTimeDeliveryRate: 0,
        codeQualityRate: 0,
        communicationRate: 0,
        budgetAdherenceRate: 0,
        completionRate: 0,
        scoreHistory: [
          { month: "May", score: 0 },
          { month: "Jun", score: 0 },
          { month: "Jul", score: 0 },
          { month: "Aug", score: 0 },
          { month: "Sep", score: 0 },
          { month: "Oct", score: 0 }
        ],
        verifiedSkills: [
          { id: "react", name: "React", score: null, percentile: null, status: "unverified", note: "Assessment available" },
          { id: "javascript", name: "JavaScript (ES6+)", score: null, percentile: null, status: "unverified", note: "Assessment available" },
          { id: "typescript", name: "TypeScript", score: null, percentile: null, status: "unverified", note: "Assessment available" },
          { id: "nodejs", name: "Node.js", score: null, percentile: null, status: "unverified", note: "Assessment available" }
        ],
        proofOfWork: []
      };
      setFreelancerProfile(userProfile);
    } else {
      const compName = companyName?.trim() || `${cleanName} Ventures`;
      avatarUrl = `https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80`;
      userProfile = {
        ...CLIENT_DATA,
        id: `cl-${Date.now()}`,
        contactPerson: cleanName,
        name: compName,
        email: cleanEmail,
        avatar: avatarUrl,
        activeProjects: 0,
        hiringProjects: 0,
        applicationsReceived: 0,
        smartMatchesFound: 15
      };
      setClientProfile(userProfile);
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      role: userRole,
      companyName: userRole === 'client' ? (companyName?.trim() || `${cleanName} Ventures`) : '',
      avatar: avatarUrl,
      profile: userProfile,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    saveStoredUsers(updatedUsers);
    saveStoredActiveUser(newUser);
    setCurrentUserAccount(newUser);

    setRole(userRole);
    if (userRole === 'freelancer') {
      setCurrentView('freelancer-dashboard');
      showToast(`Account created successfully! Welcome to NexLance, ${cleanName}.`, 'success');
    } else {
      setCurrentView('client-dashboard');
      showToast(`Client account created successfully! Welcome, ${cleanName}.`, 'success');
    }

    return { success: true, user: newUser };
  };

  // ==========================================
  // LOCAL STORAGE AUTH: LOGIN EXISTING USER ("Log In")
  // ==========================================
  const loginUser = ({ email, password, role: targetRole }) => {
    const cleanEmail = email ? email.trim().toLowerCase() : '';

    if (!cleanEmail || !password) {
      return {
        success: false,
        reason: 'MISSING_FIELDS',
        message: 'Please enter both your email address and password.'
      };
    }

    const users = getStoredUsers();
    
    // Find user matching email and target role (if specified)
    let foundUser;
    if (targetRole) {
      foundUser = users.find(u => u.email.toLowerCase() === cleanEmail && u.role === targetRole);
      if (!foundUser && (cleanEmail === 'sarag@nexlance.dev' || cleanEmail === 'sarag@meridian.com')) {
        foundUser = users.find(u => u.email.toLowerCase().startsWith('sarah') && u.role === targetRole);
      }
    } else {
      foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (!foundUser && (cleanEmail === 'sarag@nexlance.dev' || cleanEmail === 'sarag@meridian.com')) {
        foundUser = users.find(u => u.email.toLowerCase().startsWith('sarah'));
      }
    }

    // If user does not exist in localStorage
    if (!foundUser) {
      // Check if they exist with the OTHER role
      const otherUser = users.find(u => u.email.toLowerCase() === cleanEmail);
      if (otherUser && targetRole && otherUser.role !== targetRole) {
        const otherRoleName = otherUser.role === 'freelancer' ? 'Freelancer' : 'Client';
        const targetRoleName = targetRole === 'client' ? 'Client' : 'Freelancer';
        return {
          success: false,
          reason: 'NOT_FOUND',
          message: `No ${targetRoleName} account found for ${cleanEmail} (you currently have a ${otherRoleName} account). Please Get Started (Sign Up) as a ${targetRoleName} first.`
        };
      }

      return {
        success: false,
        reason: 'NOT_FOUND',
        message: `No account found with this email (${cleanEmail}). Please Get Started (Sign Up) first.`
      };
    }

    // If password does not match
    if (foundUser.password !== password && foundUser.password.toLowerCase() !== password.toLowerCase()) {
      return {
        success: false,
        reason: 'WRONG_PASSWORD',
        message: 'Incorrect password. Please verify your credentials and try again.'
      };
    }

    // Valid credentials: save active session and restore state
    saveStoredActiveUser(foundUser);
    setCurrentUserAccount(foundUser);
    setRole(foundUser.role);

    if (foundUser.role === 'freelancer') {
      if (foundUser.profile) {
        setFreelancerProfile(foundUser.profile);
      } else {
        setFreelancerProfile(prev => ({
          ...prev,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar || prev.avatar
        }));
      }
      setCurrentView('freelancer-dashboard');
      showToast(`Welcome back, ${foundUser.name}! Logged in as Freelancer.`, 'success');
    } else {
      if (foundUser.profile) {
        setClientProfile(foundUser.profile);
      } else {
        setClientProfile(prev => ({
          ...prev,
          contactPerson: foundUser.name,
          name: foundUser.companyName || `${foundUser.name} Enterprises`,
          email: foundUser.email,
          avatar: foundUser.avatar || prev.avatar
        }));
      }
      setCurrentView('client-dashboard');
      showToast(`Welcome back, ${foundUser.name}! Logged in as Client.`, 'success');
    }

    return { success: true, user: foundUser };
  };

  // Helper backward-compatible loginWithUser
  const loginWithUser = ({ name, email, password, role: chosenRole, companyName }) => {
    if (authMode === 'signup') {
      return registerUser({ name, email, password, role: chosenRole, companyName });
    } else {
      return loginUser({ email, password, role: chosenRole });
    }
  };

  // Login as specific role (Demo shortcut)
  const loginAs = (userRole) => {
    const users = getStoredUsers();
    const demoUser = users.find(u => u.role === userRole) || (userRole === 'freelancer' ? DEFAULT_USERS[0] : DEFAULT_USERS[1]);

    if (demoUser) {
      saveStoredActiveUser(demoUser);
      setCurrentUserAccount(demoUser);
    }
    setRole(userRole);
    if (userRole === 'freelancer') {
      if (demoUser?.profile) setFreelancerProfile(demoUser.profile);
      setCurrentView('freelancer-dashboard');
      showToast(`Welcome back, ${demoUser?.name || freelancerProfile.name}!`, 'success');
    } else if (userRole === 'client') {
      if (demoUser?.profile) setClientProfile(demoUser.profile);
      setCurrentView('client-dashboard');
      showToast(`Welcome back, ${demoUser?.name || clientProfile.contactPerson}!`, 'success');
    } else {
      setCurrentView('landing');
    }
  };

  // Log Out -> Clears session from localStorage and returns to clean Public site
  const logout = () => {
    saveStoredActiveUser(null);
    setCurrentUserAccount(null);
    setFreelancerProfile(NEW_FREELANCER);
    setRole('public');
    setCurrentView('landing');
    showToast('Logged out successfully. Returned to public marketplace.', 'info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch Role with Authentication Verification & Guided Flow
  const switchRole = (newRole) => {
    if (newRole === 'public') {
      logout();
      return;
    }

    if (newRole === 'client') {
      if (!currentUserAccount || currentUserAccount.role !== 'client') {
        const users = getStoredUsers();
        const hasExistingClientAccount = currentUserAccount?.email
          ? users.some(u => u.email.toLowerCase() === currentUserAccount.email.toLowerCase() && u.role === 'client')
          : false;

        if (hasExistingClientAccount) {
          showToast('You are in Freelancer mode. Please log in with your Client account.', 'info');
          setAuthMode('login');
        } else {
          showToast('To switch to Client profile, please first Sign Up (Get Started) as a Client, then log in.', 'warning');
          setAuthMode('signup');
        }
        setAuthRoleChoice('client');
        setIsAuthModalOpen(true);
        return;
      }
      setRole('client');
      setCurrentView('client-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (newRole === 'freelancer') {
      if (!currentUserAccount || currentUserAccount.role !== 'freelancer') {
        const users = getStoredUsers();
        const hasExistingFreelancerAccount = currentUserAccount?.email
          ? users.some(u => u.email.toLowerCase() === currentUserAccount.email.toLowerCase() && u.role === 'freelancer')
          : false;

        if (hasExistingFreelancerAccount) {
          showToast('You are in Client mode. Please log in with your Freelancer account.', 'info');
          setAuthMode('login');
        } else {
          showToast('To switch to Freelancer profile, please first Sign Up (Get Started) as a Freelancer, then log in.', 'warning');
          setAuthMode('signup');
        }
        setAuthRoleChoice('freelancer');
        setIsAuthModalOpen(true);
        return;
      }
      setRole('freelancer');
      setCurrentView('freelancer-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
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
        spent: "$18,000+",
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
    const updatedSkills = (freelancerProfile.verifiedSkills || []).map(skill => {
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

    const currentScore = freelancerProfile.careerScore || 0;
    const newCareerScore = currentScore === 0 
      ? Math.round(score * 0.85) 
      : Math.min(100, Math.max(currentScore, Math.round(currentScore + 2)));

    const updatedProfile = {
      ...freelancerProfile,
      verifiedSkills: updatedSkills,
      careerScore: newCareerScore,
      codeQualityRate: Math.max(freelancerProfile.codeQualityRate || 0, Math.round(score * 0.95)),
      scoreHistory: (freelancerProfile.scoreHistory || []).map((item, idx, arr) => 
        idx === arr.length - 1 ? { ...item, score: newCareerScore } : item
      )
    };

    setFreelancerProfile(updatedProfile);

    // Also update in active session if logged in
    const active = getStoredActiveUser();
    if (active && active.role === 'freelancer') {
      active.profile = updatedProfile;
      saveStoredActiveUser(active);
    }

    showToast(`Skill Verified! Score: ${score}/100. Career Score updated to ${newCareerScore}.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        switchRole,
        handleFindTalent,
        handleFindWork,
        registerUser,
        loginUser,
        loginAs,
        loginWithUser,
        logout,
        currentUserAccount,
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
