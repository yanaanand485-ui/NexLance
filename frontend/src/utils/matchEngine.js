/**
 * NexLance Smart Match Engine
 * Computes dynamic match score and rationale between a project and a freelancer's actual skills.
 */

// Helper to normalize skill strings for fuzzy/case-insensitive comparison
export const normalizeSkill = (skill) => {
  if (!skill) return '';
  return skill
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '');
};

// Skill taxonomy dictionary for synonymous / related skills
const SKILL_SYNONYMS = {
  react: ['react', 'reactjs', 'react.js', 'react 18', 'react 19'],
  nextjs: ['nextjs', 'next.js', 'next 14', 'next 15', 'approuter'],
  typescript: ['typescript', 'ts'],
  javascript: ['javascript', 'js', 'es6', 'esnext'],
  nodejs: ['nodejs', 'node.js', 'node', 'express', 'expressjs', 'fastify'],
  python: ['python', 'python3', 'django', 'fastapi', 'flask'],
  graphql: ['graphql', 'apollo', 'graphqlapis'],
  redux: ['redux', 'reduxtoolkit', 'rtk', 'zustand'],
  tailwind: ['tailwind', 'tailwindcss', 'tailwind css'],
  figma: ['figma', 'uiux', 'uidesign', 'wireframing', 'designsystems'],
  ai: ['ai', 'langchain', 'llamaindex', 'rag', 'openai', 'llm', 'vectors', 'pinecone', 'qdrant'],
  docker: ['docker', 'kubernetes', 'k8s', 'containers'],
  aws: ['aws', 'cloud', 'amazonwebservices', 'lambda', 's3'],
  redis: ['redis', 'caching', 'pubsub'],
  sql: ['sql', 'postgresql', 'postgres', 'mysql', 'timescaledb']
};

/**
 * Checks if a candidate skill matches a required skill using normalization & synonyms
 */
export const isSkillMatch = (reqSkill, candidateSkill) => {
  const reqNorm = normalizeSkill(reqSkill);
  const candNorm = normalizeSkill(candidateSkill);

  if (reqNorm === candNorm) return true;
  if (reqNorm.includes(candNorm) || candNorm.includes(reqNorm)) return true;

  // Check synonym groups
  for (const group of Object.values(SKILL_SYNONYMS)) {
    const hasReq = group.some(s => reqNorm.includes(normalizeSkill(s)));
    const hasCand = group.some(s => candNorm.includes(normalizeSkill(s)));
    if (hasReq && hasCand) return true;
  }

  return false;
};

/**
 * Extract all active skills (both unverified & verified) from a freelancer profile
 */
export const getFreelancerSkillList = (freelancerProfile) => {
  if (!freelancerProfile) return [];

  const skillSet = new Set();

  // 1. Array of raw skill strings (e.g. freelancerProfile.skills)
  if (Array.isArray(freelancerProfile.skills)) {
    freelancerProfile.skills.forEach(s => {
      if (typeof s === 'string' && s.trim()) skillSet.add(s.trim());
    });
  }

  // 2. Array of verifiedSkills objects (e.g. { id, name, status, score })
  if (Array.isArray(freelancerProfile.verifiedSkills)) {
    freelancerProfile.verifiedSkills.forEach(s => {
      const name = typeof s === 'string' ? s : s.name;
      if (name && name.trim()) skillSet.add(name.trim());
    });
  }

  // 3. Fallback: derive from title / role if empty
  if (skillSet.size === 0 && freelancerProfile.role) {
    if (freelancerProfile.role.toLowerCase().includes('react')) skillSet.add('React');
    if (freelancerProfile.role.toLowerCase().includes('frontend')) {
      skillSet.add('React');
      skillSet.add('JavaScript (ES6+)');
      skillSet.add('CSS3');
    }
  }

  return Array.from(skillSet);
};

/**
 * Calculate dynamic project match percentage and whyMatch breakdown
 * @param {Object} project - The project object
 * @param {Object} freelancerProfile - The freelancer profile
 * @returns {Object} { matchScore, matchingSkills, missingSkills, verifiedMatches, whyMatchReasons, isStrongMatch }
 */
export const calculateProjectMatch = (project, freelancerProfile) => {
  if (!project) {
    return {
      matchScore: 0,
      matchingSkills: [],
      missingSkills: [],
      verifiedMatches: [],
      whyMatchReasons: ['No project specified'],
      isStrongMatch: false
    };
  }

  const requiredSkills = project.requiredSkills || [];
  if (requiredSkills.length === 0) {
    return {
      matchScore: 80,
      matchingSkills: [],
      missingSkills: [],
      verifiedMatches: [],
      whyMatchReasons: ['Open requirements project'],
      isStrongMatch: true
    };
  }

  const candidateSkills = getFreelancerSkillList(freelancerProfile);
  const verifiedSkills = Array.isArray(freelancerProfile?.verifiedSkills)
    ? freelancerProfile.verifiedSkills.filter(s => s.status === 'verified')
    : [];

  const matchingSkills = [];
  const missingSkills = [];
  const verifiedMatches = [];

  // Match each required skill against candidate skills
  requiredSkills.forEach(req => {
    const matched = candidateSkills.find(cand => isSkillMatch(req, cand));
    if (matched) {
      matchingSkills.push(req);

      // Check if this matched skill has an official verified badge
      const isVerified = verifiedSkills.some(v => isSkillMatch(req, v.name || v.id));
      if (isVerified) {
        const vObj = verifiedSkills.find(v => isSkillMatch(req, v.name || v.id));
        verifiedMatches.push({ name: req, score: vObj?.score || 90 });
      }
    } else {
      missingSkills.push(req);
    }
  });

  const totalReq = requiredSkills.length;
  const matchRatio = totalReq > 0 ? matchingSkills.length / totalReq : 0;

  // Calculate Weighted Match Score
  // 1. Skill Overlap: up to 70 points
  let score = Math.round(matchRatio * 70);

  // 2. Verified Assessment Multiplier: up to 18 points
  if (verifiedMatches.length > 0) {
    const verifiedRatio = verifiedMatches.length / totalReq;
    score += Math.round(verifiedRatio * 18);
  } else if (matchingSkills.length > 0) {
    // Small baseline for unverified matching skills
    score += 4;
  }

  // 3. Experience & Career Score Alignment: up to 10 points
  const careerScore = freelancerProfile?.careerScore || 0;
  if (careerScore > 0) {
    score += Math.min(10, Math.round((careerScore / 100) * 10));
  } else {
    // New users start with baseline 5 alignment points
    score += 5;
  }

  // 4. Role Alignment: up to 5 points
  const profileRole = (freelancerProfile?.role || '').toLowerCase();
  const projectCat = (project.category || '').toLowerCase();
  if (
    (profileRole.includes('full-stack') && projectCat.includes('web')) ||
    (profileRole.includes('frontend') && projectCat.includes('frontend')) ||
    (profileRole.includes('backend') && projectCat.includes('backend')) ||
    (profileRole.includes('design') && projectCat.includes('design')) ||
    (profileRole.includes('ai') && projectCat.includes('ai'))
  ) {
    score += 5;
  }

  // Clamp score: minimum 15% (if 0 skills match) to 99%
  if (matchingSkills.length === 0) {
    score = Math.min(22, Math.max(12, score));
  } else if (matchingSkills.length === totalReq) {
    // If all skills match, ensure score is at least 88%, and if verified, up to 96-98%
    score = verifiedMatches.length > 0 ? Math.max(94, Math.min(99, score)) : Math.max(88, Math.min(93, score));
  } else {
    score = Math.max(25, Math.min(92, score));
  }

  // Dynamic Rationale Breakdown
  const whyMatchReasons = [];

  if (matchingSkills.length > 0) {
    if (matchingSkills.length === totalReq) {
      whyMatchReasons.push(`✓ 100% Skill Match: Covers all ${totalReq} required skills (${matchingSkills.join(', ')})`);
    } else {
      whyMatchReasons.push(`✓ Matches ${matchingSkills.length} of ${totalReq} required skills (${matchingSkills.join(', ')})`);
    }
  } else {
    whyMatchReasons.push(`⚠ 0 of ${totalReq} required skills found in your profile`);
  }

  if (verifiedMatches.length > 0) {
    const names = verifiedMatches.map(v => `${v.name} (${v.score}/100)`).join(', ');
    whyMatchReasons.push(`✓ Cryptographically Verified: ${names}`);
  } else if (matchingSkills.length > 0) {
    whyMatchReasons.push(`⚡ Take assessment for ${matchingSkills[0]} to boost match score to 95%+`);
  }

  if (missingSkills.length > 0) {
    whyMatchReasons.push(`⚠ Missing required skill${missingSkills.length > 1 ? 's' : ''}: ${missingSkills.join(', ')}`);
  }

  if (freelancerProfile?.onTimeDeliveryRate && freelancerProfile.onTimeDeliveryRate > 0) {
    whyMatchReasons.push(`✓ ${freelancerProfile.onTimeDeliveryRate}% on-time delivery record`);
  } else if (freelancerProfile?.isNew || careerScore === 0) {
    whyMatchReasons.push(`✓ Profile open for first client milestone delivery`);
  }

  return {
    matchScore: score,
    matchingSkills,
    missingSkills,
    verifiedMatches,
    whyMatchReasons,
    isStrongMatch: score >= 80
  };
};
