/**
 * NexLance API Service Layer
 * 
 * Handles all REST API requests, live external API fetching (DummyJSON / Google public data),
 * and dynamic project creation over HTTP.
 */

import { PROJECTS, FREELANCERS, SERVICES } from '../data/mockData';
import { fetchDummyJsonUsers } from './dummyJsonApi';

const API_BASE_URL = '/api';
const EXTERNAL_API_URL = 'https://dummyjson.com/posts?limit=3';

export const api = {
  /**
   * Fetches projects from the REST API endpoint and enriches with live public API data
   */
  async getProjects() {
    let internalProjects;

    // 1. Fetch from our REST API endpoint (/api/projects)
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        internalProjects = await response.json();
      } else {
        internalProjects = PROJECTS;
      }
    } catch (err) {
      console.warn('NexLance API /api/projects unavailable, using fallback data:', err.message);
      internalProjects = PROJECTS;
    }

    // 2. Fetch live public external data from DummyJSON / Google Public API
    let externalProjects = [];
    try {
      const extResponse = await fetch(EXTERNAL_API_URL, {
        headers: { 'Accept': 'application/json' }
      });
      if (extResponse.ok) {
        const extData = await extResponse.json();
        const posts = extData.posts || [];

        externalProjects = posts.map((post) => {
          const tags = post.tags && post.tags.length > 0 ? post.tags : ['React', 'JavaScript', 'FullStack'];
          const skillList = tags.map(t => t.charAt(0).toUpperCase() + t.slice(1));
          
          return {
            id: `ext-api-${post.id}`,
            title: post.title.length > 55 ? `${post.title.slice(0, 55)}...` : post.title,
            badge: 'Live Public API',
            client: {
              name: `Global Enterprise Client #${post.userId}`,
              avatar: `https://dummyjson.com/icon/${post.userId}/128`,
              rating: 4.9,
              spent: '$32,000+',
              verifiedPayment: true,
              country: 'United States'
            },
            budget: '₹95,000 – ₹1,60,000 ($1,200 – $2,000)',
            budgetType: 'Fixed Price',
            deadline: '3 weeks',
            deadlineDate: 'Nov 15, 2026',
            experienceLevel: 'Senior / Expert',
            category: 'Web Development',
            matchScore: 94,
            requiredSkills: skillList.length > 0 ? skillList : ['React', 'Node.js', 'API Integration'],
            verifiedSkillsRequired: ['React'],
            applicantsCount: post.reactions?.likes || 6,
            description: post.body,
            scopePoints: [
              'Build modern responsive frontend components and integrate real-time REST API feeds',
              'Implement secure token-based user verification and state management',
              'Achieve >95 Lighthouse performance and accessibility benchmarks'
            ],
            whyMatchReasons: [
              '✓ Live Public API Feed (dummyjson.com/posts)',
              '✓ Verified skills match client criteria',
              '✓ 98% positive client feedback on previous contracts'
            ],
            postedAgo: 'Live API Feed',
            status: 'Open',
            isExternalApi: true
          };
        });
      }
    } catch (extErr) {
      console.warn('External public API fetch skipped:', extErr.message);
    }

    // Combine internal projects + live external public API projects
    return [...internalProjects, ...externalProjects];
  },

  /**
   * Posts a new project via HTTP POST to /api/projects
   */
  async createProject(projectData) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        const result = await response.json();
        return result.project || projectData;
      }
    } catch (err) {
      console.warn('POST /api/projects failed, processing locally:', err.message);
    }

    // Fallback if network or server is offline
    return {
      id: `proj-${Date.now()}`,
      applicantsCount: 0,
      postedAgo: 'Just now',
      status: 'Open',
      ...projectData
    };
  },

  /**
   * Fetches freelancers from /api/freelancers
   */
  async getFreelancers() {
    try {
      const response = await fetch(`${API_BASE_URL}/freelancers`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('GET /api/freelancers fallback:', err.message);
    }
    return FREELANCERS;
  },

  /**
   * Fetches marketplace services from /api/services
   */
  async getServices() {
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('GET /api/services fallback:', err.message);
    }
    return SERVICES;
  },

  /**
   * Fetches DummyJSON users using .then() / .catch() / .finally() (no async/await)
   */
  getDummyJsonUsers() {
    return fetchDummyJsonUsers();
  }
};

export {
  DUMMY_JSON_USERS_URL,
  transformDummyUser,
  fetchDummyJsonUsers,
  useDummyJsonUsers
} from './dummyJsonApi';

