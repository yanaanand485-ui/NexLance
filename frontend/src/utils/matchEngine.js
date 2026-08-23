/**
 * Smart Match Engine
 * Calculates match percentage and reasons between a project and a freelancer's skills.
 */

// Helper to extract all skills from a freelancer profile
export const getFreelancerSkillList = (profile) => {
  if (!profile) return [];
  const skills = new Set();

  if (Array.isArray(profile.skills)) {
    profile.skills.forEach(s => s && skills.add(s.trim()));
  }
  if (Array.isArray(profile.verifiedSkills)) {
    profile.verifiedSkills.forEach(s => {
      const name = typeof s === 'string' ? s : s?.name;
      if (name) skills.add(name.trim());
    });
  }

  // Fallback defaults if empty
  if (skills.size === 0) {
    skills.add('React');
    skills.add('JavaScript (ES6+)');
  }

  return Array.from(skills);
};

// Check if two skill names match (case-insensitive)
export const isSkillMatch = (skillA, skillB) => {
  if (!skillA || !skillB) return false;
  const a = skillA.toLowerCase().replace(/[^a-z0-9]/g, '');
  const b = skillB.toLowerCase().replace(/[^a-z0-9]/g, '');
  return a === b || a.includes(b) || b.includes(a);
};

// Main function to calculate match score and reasons
export const calculateProjectMatch = (project, freelancerProfile) => {
  if (!project) {
    return {
      matchScore: 0,
      matchingSkills: [],
      missingSkills: [],
      verifiedMatches: [],
      whyMatchReasons: ['No project selected'],
      isStrongMatch: false
    };
  }

  const requiredSkills = project.requiredSkills || [];
  const candidateSkills = getFreelancerSkillList(freelancerProfile);
  const verifiedList = Array.isArray(freelancerProfile?.verifiedSkills)
    ? freelancerProfile.verifiedSkills.filter(s => s.status === 'verified')
    : [];

  const matchingSkills = [];
  const missingSkills = [];
  const verifiedMatches = [];

  requiredSkills.forEach(req => {
    const isMatched = candidateSkills.some(cand => isSkillMatch(req, cand));
    if (isMatched) {
      matchingSkills.push(req);
      const verified = verifiedList.find(v => isSkillMatch(req, v.name || v.id));
      if (verified) {
        verifiedMatches.push({ name: req, score: verified.score || 90 });
      }
    } else {
      missingSkills.push(req);
    }
  });

  // Calculate score (base ratio + verified bonus)
  const totalReq = requiredSkills.length || 1;
  const matchRatio = matchingSkills.length / totalReq;
  let score = Math.round(matchRatio * 70) + 15; // baseline

  if (verifiedMatches.length > 0) {
    score += Math.round((verifiedMatches.length / totalReq) * 15);
  }

  // Bound score between 20% and 99%
  if (matchingSkills.length === 0) {
    score = 20;
  } else if (matchingSkills.length === totalReq) {
    score = verifiedMatches.length > 0 ? 98 : 92;
  } else {
    score = Math.max(30, Math.min(90, score));
  }

  // Build readable reasons
  const whyMatchReasons = [];
  if (matchingSkills.length > 0) {
    whyMatchReasons.push(`✓ Matches ${matchingSkills.length} of ${totalReq} required skills (${matchingSkills.join(', ')})`);
  }
  if (verifiedMatches.length > 0) {
    const names = verifiedMatches.map(v => `${v.name} (${v.score}/100)`).join(', ');
    whyMatchReasons.push(`✓ Verified Skills: ${names}`);
  }
  if (missingSkills.length > 0) {
    whyMatchReasons.push(`⚠ Missing skills: ${missingSkills.join(', ')}`);
  }
  if (freelancerProfile?.careerScore > 0) {
    whyMatchReasons.push(`✓ Career Score: ${freelancerProfile.careerScore}/100`);
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
