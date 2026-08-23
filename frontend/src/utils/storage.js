import {
  CURRENT_USER,
  SARAH_FREELANCER,
  PRIYA_FREELANCER,
  CLIENT_DATA
} from '../data/mockData';

// Local Storage Keys
const USERS_STORAGE_KEY = 'nexlance_registered_users';
const SESSION_STORAGE_KEY = 'nexlance_active_user';

// Default Demo Accounts for testing existing user login
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
  },
  {
    id: "cl-nexlance-01",
    name: "Client Account",
    email: "client@nexlance.dev",
    password: "Password123",
    role: "client",
    companyName: "NexLance Enterprise Client",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80",
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
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
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
      // Ensure all DEFAULT_USERS are present (merge by email & role)
      const existingKeys = new Set(parsed.map(u => `${u.email?.toLowerCase()}_${u.role}`));
      const missingDefaults = DEFAULT_USERS.filter(d => !existingKeys.has(`${d.email?.toLowerCase()}_${d.role}`));
      
      // Also ensure standard default accounts have their password refreshed if needed
      const updatedParsed = parsed.map(user => {
        const defaultMatch = DEFAULT_USERS.find(d => d.email?.toLowerCase() === user.email?.toLowerCase() && d.role === user.role);
        if (defaultMatch && !user.password) {
          return { ...user, password: defaultMatch.password };
        }
        return user;
      });

      if (missingDefaults.length > 0) {
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
