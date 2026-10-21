import {
  SARAH_FREELANCER,
  CLIENT_DATA,
  PROJECTS
} from '../data/mockData';

// Local Storage Keys
const USERS_STORAGE_KEY = 'nexlance_registered_users';
const SESSION_STORAGE_KEY = 'nexlance_active_user';
const PROJECTS_STORAGE_KEY = 'nexlance_projects_list';

// Default Demo Accounts for testing existing user login (Only Sarah Jenkins for Freelancer)
export const DEFAULT_USERS = [
  {
    id: "fl-sarah-01",
    name: "Sarah Jenkins",
    email: "sarah@nexlance.dev",
    password: "Password123",
    role: "freelancer",
    avatar: "",
    profile: SARAH_FREELANCER,
    createdAt: "2024-01-10T00:00:00.000Z"
  },
  {
    id: "cl-meridian-01",
    name: "Sarah Jenkins",
    email: "sarah@meridian.com",
    password: "Password123",
    role: "client",
    companyName: "Meridian Retail Global",
    avatar: "",
    profile: CLIENT_DATA,
    createdAt: "2024-02-01T00:00:00.000Z"
  },
  {
    id: "cl-nexlance-01",
    name: "Client Account",
    email: "client@nexlance.dev",
    password: "Password123",
    role: "client",
    companyName: "NexLance Enterprise Client",
    avatar: "",
    profile: CLIENT_DATA,
    createdAt: "2024-02-10T00:00:00.000Z"
  },
  {
    id: "cl-meridian-client",
    name: "Meridian Client",
    email: "client@meridian.com",
    password: "Password123",
    role: "client",
    companyName: "Meridian Retail Global",
    avatar: "",
    profile: CLIENT_DATA,
    createdAt: "2024-02-12T00:00:00.000Z"
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
      // Filter out removed demo accounts (alex, priya) and clear photos
      const sanitized = parsed
        .filter(u => u.email !== 'alex@nexlance.dev' && u.email !== 'priya@nexlance.dev')
        .map(u => ({
          ...u,
          avatar: "",
          profile: u.profile ? { ...u.profile, avatar: "" } : u.profile
        }));

      // Ensure all DEFAULT_USERS are present (merge by email & role)
      const existingKeys = new Set(sanitized.map(u => `${u.email?.toLowerCase()}_${u.role}`));
      const missingDefaults = DEFAULT_USERS.filter(d => !existingKeys.has(`${d.email?.toLowerCase()}_${d.role}`));
      
      // Also ensure standard default accounts have their password and profile refreshed if needed
      const CORE_ALLOWED_SKILLS = ['React', 'TypeScript', 'Node.js', 'JavaScript (ES6+)'];
      const isCoreSkill = (name) => {
        const s = (name || '').toLowerCase();
        return CORE_ALLOWED_SKILLS.some(c => c.toLowerCase().includes(s.slice(0, 4)) || s.includes(c.toLowerCase().slice(0, 4)));
      };

      const updatedParsed = sanitized.map(user => {
        const defaultMatch = DEFAULT_USERS.find(d => d.email?.toLowerCase() === user.email?.toLowerCase() && d.role === user.role);
        if (defaultMatch) {
          if (user.id === 'fl-sarah-01' || user.email === 'sarah@nexlance.dev') {
            const rawSkills = user.profile?.skills || SARAH_FREELANCER.skills;
            const cleanSkills = rawSkills.filter(isCoreSkill);

            const rawVerified = user.profile?.verifiedSkills || SARAH_FREELANCER.verifiedSkills;
            const cleanVerified = rawVerified
              .filter(v => isCoreSkill(v.name || v.id))
              .map(v => {
                if ((v.name || v.id || '').toLowerCase().includes('node')) {
                  return { ...v, id: 'nodejs', name: 'Node.js', score: v.score || 92, status: 'verified' };
                }
                return v;
              });

            return {
              ...user,
              password: defaultMatch.password,
              profile: {
                ...SARAH_FREELANCER,
                ...user.profile,
                role: 'Full Stack Developer',
                verifiedSkills: cleanVerified.length > 0 ? cleanVerified : SARAH_FREELANCER.verifiedSkills,
                skills: cleanSkills.length > 0 ? cleanSkills : SARAH_FREELANCER.skills,
                services: (user.profile?.services && user.profile.services.length > 0)
                  ? user.profile.services
                  : (SARAH_FREELANCER.services || [])
              }
            };
          }
          if (!user.password) {
            return { ...user, password: defaultMatch.password };
          }
        }
        return user;
      });

      if (missingDefaults.length > 0 || sanitized.length !== parsed.length) {
        const merged = [...updatedParsed, ...missingDefaults];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return updatedParsed;
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
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed?.email === 'alex@nexlance.dev' || parsed?.email === 'priya@nexlance.dev') {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
    if (parsed) {
      parsed.avatar = "";
      if (parsed.profile) {
        parsed.profile.avatar = "";
        if (parsed.id === 'fl-sarah-01' || parsed.email === 'sarah@nexlance.dev') {
          parsed.profile.role = 'Full Stack Developer';
          const CORE_ALLOWED_SKILLS = ['React', 'TypeScript', 'Node.js', 'JavaScript (ES6+)'];
          const isCoreSkill = (name) => {
            const s = (name || '').toLowerCase();
            return CORE_ALLOWED_SKILLS.some(c => c.toLowerCase().includes(s.slice(0, 4)) || s.includes(c.toLowerCase().slice(0, 4)));
          };

          if (parsed.profile.skills) {
            parsed.profile.skills = parsed.profile.skills.filter(isCoreSkill);
          }
          if (parsed.profile.verifiedSkills) {
            parsed.profile.verifiedSkills = parsed.profile.verifiedSkills
              .filter(v => isCoreSkill(v.name || v.id))
              .map(v => {
                if ((v.name || v.id || '').toLowerCase().includes('node')) {
                  return { ...v, id: 'nodejs', name: 'Node.js', score: v.score || 92, status: 'verified' };
                }
                return v;
              });
          }

          if (!parsed.profile.verifiedSkills || parsed.profile.verifiedSkills.length === 0) {
            parsed.profile.verifiedSkills = SARAH_FREELANCER.verifiedSkills;
          }
          if (!parsed.profile.skills || parsed.profile.skills.length === 0) {
            parsed.profile.skills = SARAH_FREELANCER.skills;
          }
          if (!parsed.profile.services || parsed.profile.services.length === 0) {
            parsed.profile.services = SARAH_FREELANCER.services;
          }
        }
      }
    }
    return parsed;
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

export const getStoredProjects = () => {
  try {
    const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(PROJECTS));
      return PROJECTS;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return PROJECTS;
  } catch (err) {
    console.error('Error reading projects from localStorage:', err);
    return PROJECTS;
  }
};

export const saveStoredProjects = (projects) => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (err) {
    console.error('Error saving projects to localStorage:', err);
  }
};
