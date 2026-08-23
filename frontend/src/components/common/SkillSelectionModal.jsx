import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Check,
  Plus,
  ArrowRight,
  Briefcase,
  Layers,
  Award,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateProjectMatch } from '../../utils/matchEngine';
import { PROJECTS } from '../../data/mockData';

// Suggested skill catalog by domain
export const SKILL_CATEGORIES = {
  "Frontend Engineering": [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Redux Toolkit",
    "Vue.js",
    "Framer Motion",
    "TanStack Table",
    "Jest"
  ],
  "Backend & Systems": [
    "Node.js",
    "Python",
    "GraphQL",
    "Redis",
    "PostgreSQL",
    "WebSockets",
    "Docker",
    "FastAPI",
    "TimescaleDB",
    "MongoDB"
  ],
  "AI & Data": [
    "LangChain / RAG",
    "OpenAI",
    "Vector DBs",
    "Python",
    "LlamaIndex",
    "FastAPI",
    "Pinecone / Qdrant",
    "HuggingFace",
    "SSE Streaming"
  ],
  "Design & Integrations": [
    "Figma",
    "UI/UX Design",
    "Design Systems",
    "Stripe",
    "AWS",
    "Microservices",
    "REST APIs"
  ]
};

export const POPULAR_ROLES = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "Backend & Cloud Architect",
  "UI/UX & Product Designer",
  "AI & Machine Learning Engineer",
  "Mobile App Engineer"
];

export const EXPERIENCE_LEVELS = [
  { id: "Junior", label: "Junior (1-2 yrs)", desc: "Building core projects & expanding stack" },
  { id: "Mid-Level", label: "Mid-Level (3-5 yrs)", desc: "Independent delivery of full features" },
  { id: "Senior", label: "Senior / Expert (5+ yrs)", desc: "System architecture & leadership" }
];

export const SkillSelectionModal = ({ isOpen, onClose, isOnboarding = false }) => {
  const { freelancerProfile, updateFreelancerSkills, showToast, activeProjectsList } = useApp();

  const [selectedRole, setSelectedRole] = useState(freelancerProfile?.role || 'Full-Stack Developer');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [selectedExperience, setSelectedExperience] = useState(freelancerProfile?.experienceLevel || 'Mid-Level');
  const [activeCategoryTab, setActiveCategoryTab] = useState('Frontend Engineering');

  // Initialize selected skills from existing freelancer profile on open
  useEffect(() => {
    if (isOpen) {
      const initialSkills = new Set();
      if (Array.isArray(freelancerProfile?.skills)) {
        freelancerProfile.skills.forEach(s => initialSkills.add(s));
      }
      if (Array.isArray(freelancerProfile?.verifiedSkills)) {
        freelancerProfile.verifiedSkills.forEach(s => {
          const name = typeof s === 'string' ? s : s.name;
          if (name) initialSkills.add(name);
        });
      }
      // If completely empty (e.g. brand new user), suggest starter skills
      if (initialSkills.size === 0) {
        setSelectedSkills(['React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js']);
      } else {
        setSelectedSkills(Array.from(initialSkills));
      }
      if (freelancerProfile?.role) setSelectedRole(freelancerProfile.role);
      if (freelancerProfile?.experienceLevel) setSelectedExperience(freelancerProfile.experienceLevel);
    }
  }, [isOpen, freelancerProfile]);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const clean = customSkillInput.trim();
    if (!clean) return;
    if (selectedSkills.some(s => s.toLowerCase() === clean.toLowerCase())) {
      showToast(`'${clean}' is already in your skill set.`, 'info');
      setCustomSkillInput('');
      return;
    }
    setSelectedSkills(prev => [...prev, clean]);
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(prev => prev.filter(s => s !== skillToRemove));
  };

  const handleSave = () => {
    if (selectedSkills.length === 0) {
      showToast('Please select at least 1 skill tag so we can recommend matched projects.', 'warning');
      return;
    }

    updateFreelancerSkills({
      role: selectedRole,
      skills: selectedSkills,
      experienceLevel: selectedExperience
    });

    showToast(`Skills profile updated! ${selectedSkills.length} skills saved.`, 'success');
    if (onClose) onClose();
  };

  // Compute live match previews with top projects
  const mockTempProfile = {
    ...freelancerProfile,
    role: selectedRole,
    skills: selectedSkills,
    experienceLevel: selectedExperience
  };

  const projectPool = activeProjectsList || PROJECTS;
  const liveMatches = projectPool.map(p => ({
    project: p,
    match: calculateProjectMatch(p, mockTempProfile)
  })).sort((a, b) => b.match.matchScore - a.match.matchScore);

  const topMatches = liveMatches.slice(0, 2);

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="modal-card"
        style={{
          maxWidth: '720px',
          width: '94%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 30px 60px -15px rgba(15, 23, 42, 0.3)',
          background: '#FFFFFF',
          overflow: 'hidden'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', flexShrink: 0 }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#1E40AF',
              backgroundColor: '#EFF6FF',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: '1px solid #BFDBFE',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              <Sparkles size={13} color="#1E40AF" />
              <span>{isOnboarding ? 'Step 2: Smart Match Onboarding' : 'Personalize Skill Profile'}</span>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {isOnboarding ? 'Select Your Skills & Technical Domain' : 'Edit Your Core Skills & Specialties'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.25rem' }}>
              Your Smart Match percentages and client project recommendations are calculated in real time from the skills you choose here.
            </p>
          </div>

          {!isOnboarding && (
            <button
              onClick={onClose}
              style={{
                padding: '0.45rem',
                borderRadius: '50%',
                backgroundColor: '#F1F5F9',
                color: '#64748B',
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* 1. Primary Role Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              1. What is your primary title / role?
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {POPULAR_ROLES.map(role => {
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1.5px solid',
                      borderColor: isSelected ? '#1E40AF' : '#E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      color: isSelected ? '#1E40AF' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Skills Selector by Category */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>
                2. Select your tech stack & skills ({selectedSkills.length} selected):
              </label>
            </div>

            {/* Category Tabs */}
            <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.4rem', marginBottom: '0.65rem' }}>
              {Object.keys(SKILL_CATEGORIES).map(cat => {
                const isActive = activeCategoryTab === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategoryTab(cat)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      border: '1px solid',
                      borderColor: isActive ? '#1E40AF' : '#E2E8F0',
                      backgroundColor: isActive ? '#1E40AF' : '#F8FAFC',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Skill Badges for active tab */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.45rem',
              padding: '0.9rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              minHeight: '80px',
              alignItems: 'center'
            }}>
              {SKILL_CATEGORIES[activeCategoryTab].map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: isSelected ? 700 : 500,
                      border: '1.5px solid',
                      borderColor: isSelected ? '#1E40AF' : '#CBD5E1',
                      backgroundColor: isSelected ? '#1E40AF' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#334155',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 2px 5px rgba(30, 64, 175, 0.2)' : 'none'
                    }}
                  >
                    {isSelected ? <Check size={13} strokeWidth={3} /> : <Plus size={13} />}
                    <span>{skill}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Skill Input */}
            <form onSubmit={handleAddCustomSkill} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
              <input
                type="text"
                value={customSkillInput}
                onChange={e => setCustomSkillInput(e.target.value)}
                placeholder="Can't find a skill? Type custom skill (e.g. Stripe, AWS, GraphQL) & press Enter..."
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.825rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Plus size={14} /> Add Skill
              </button>
            </form>

            {/* Currently Selected Pill Summary */}
            {selectedSkills.length > 0 && (
              <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.85rem', backgroundColor: '#EFF6FF', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Your Active Skill Set ({selectedSkills.length}):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {selectedSkills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.2rem 0.55rem',
                        backgroundColor: '#FFFFFF',
                        color: '#1E40AF',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        border: '1px solid #93C5FD'
                      }}
                    >
                      <span>{skill}</span>
                      <X
                        size={12}
                        style={{ cursor: 'pointer', color: '#64748B' }}
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Experience Level */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>
              3. Experience Level:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
              {EXPERIENCE_LEVELS.map(exp => {
                const isSelected = selectedExperience === exp.id;
                return (
                  <div
                    key={exp.id}
                    onClick={() => setSelectedExperience(exp.id)}
                    style={{
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1.5px solid',
                      borderColor: isSelected ? '#1E40AF' : '#E2E8F0',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, color: isSelected ? '#1E40AF' : '#0F172A' }}>
                        {exp.label}
                      </span>
                      {isSelected && <Check size={14} color="#1E40AF" strokeWidth={3} />}
                    </div>
                    <p style={{ fontSize: '0.725rem', color: '#64748B', lineHeight: 1.3, margin: 0 }}>
                      {exp.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Live Match Preview */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
              <TrendingUp size={14} color="#1E40AF" />
              <span>Live Smart Match Preview (Based on your chosen skills):</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {topMatches.map(({ project, match }) => (
                <div
                  key={project.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ flex: 1, paddingRight: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
                      {project.title}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {project.requiredSkills.map(req => {
                        const isMatched = match.matchingSkills.includes(req);
                        return (
                          <span
                            key={req}
                            style={{
                              fontSize: '0.685rem',
                              fontWeight: 600,
                              padding: '0.1rem 0.4rem',
                              borderRadius: '4px',
                              backgroundColor: isMatched ? '#ECFDF5' : '#F1F5F9',
                              color: isMatched ? '#047857' : '#64748B',
                              border: isMatched ? '1px solid #A7F3D0' : '1px solid #E2E8F0'
                            }}
                          >
                            {req} {isMatched ? '✓' : '✗'}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '75px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: match.matchScore >= 80 ? '#1E40AF' : '#64748B', lineHeight: 1 }}>
                      {match.matchScore}%
                    </div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      Match Score
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
          {!isOnboarding && (
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#1E40AF',
              fontWeight: 700
            }}
          >
            <span>{isOnboarding ? 'Save Skills & Enter Dashboard' : 'Save Updated Skills'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
