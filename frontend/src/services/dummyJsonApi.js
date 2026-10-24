import { useState, useEffect, useCallback } from 'react';

/**
 * DummyJSON Users API Endpoint
 */
export const DUMMY_JSON_USERS_URL = 'https://dummyjson.com/users?limit=10';

/**
 * Transforms basic DummyJSON user data for the NexLance frontend
 */
export const transformDummyUser = (user) => {
  const rate = 45 + ((user.id * 5) % 45);
  const score = 80 + (user.id % 18);

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    image: user.image,
    avatar: user.image,
    title: user.company?.title || 'Freelance Specialist',
    company: user.company?.name || 'Tech Solutions',
    department: user.company?.department || 'Engineering',
    location: user.address?.city ? `${user.address.city}, ${user.address.country || 'USA'}` : 'Remote',
    careerScore: score,
    rawRate: rate,
    hourlyRate: `$${rate}/hr`,
    rating: 4.8,
    totalReviews: 12 + (user.id % 20),
    topSkills: [
      { name: 'React', score: score },
      { name: 'JavaScript', score: Math.min(99, score + 2) },
      { name: 'Node.js', score: Math.max(75, score - 3) }
    ],
    bio: `Experienced ${user.company?.title || 'specialist'} with expertise in modern web solutions.`
  };
};

/**
 * Fetches users using Promise chaining (.then, .catch, .finally).
 * No async/await.
 */
export const fetchDummyJsonUsers = () => {
  return fetch(DUMMY_JSON_USERS_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load users: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const users = (data.users || []).map(transformDummyUser);
      return { success: true, users };
    })
    .catch((err) => {
      console.error('API Error:', err);
      return { success: false, error: err.message, users: [] };
    });
};

/**
 * Reusable hook for fetching user data with .then(), .catch(), .finally()
 */
export const useDummyJsonUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = useCallback(() => {
    fetch(DUMMY_JSON_USERS_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers((data.users || []).map(transformDummyUser));
      })
      .catch((err) => {
        console.error('API Error:', err);
        setError(err.message || 'Error loading users');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, loading, error, refetch };
};
