import React, { useState } from 'react';
import { X, Sparkles, Check, Plus, ArrowRight, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { calculateProjectMatch } from '../../utils/matchEngine';
import { PROJECTS } from '../../data/mockData';

const SKILL_CATEGORIES = {
  "Frontend": ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Redux Toolkit", "Vue.js"],
  "Backend": ["Node.js", "Python", "GraphQL", "Redis", "PostgreSQL", "Docker", "FastAPI", "MongoDB"],
  "AI & Data": ["LangChain", "OpenAI", "Vector DBs", "Python", "LlamaIndex", "Pinecone"],
  "Design & Cloud": ["Figma", "UI/UX Design", "Design Systems", "Stripe", "AWS"]
};

const POPULAR_ROLES = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "Backend & Cloud Architect",
  "UI/UX & Product Designer",
  "AI & Machine Learning Engineer"
];

const EXPERIENCE_LEVELS = [
  { id: "Junior", label: "Junior (1-2 yrs)", desc: "Building core features" },
  { id: "Mid-Level", label: "Mid-Level (3-5 yrs)", desc: "Independent delivery" },
  { id: "Senior", label: "Senior (5+ yrs)", desc: "Architecture & leadership" }
];

export const SkillSelectionModal = ({ isOpen, onClose, isOnboarding = false }) => {
  const { freelancerProfile, updateFreelancerSkills, showToast, activeProjectsList } = useApp();

  const [selectedRole, setSelectedRole] = useState(() => freelancerProfile?.role || 'Full-Stack Developer');
  const [selectedSkills, setSelectedSkills] = useState(() => {
    if (Array.isArray(freelancerProfile?.skills) && freelancerProfile.skills.length > 0) {
      return freelancerProfile.skills;
    }
    return ['React', 'TypeScript', 'JavaScript (ES6+)', 'Node.js'];
  });
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [selectedExperience, setSelectedExperience] = useState(() => freelancerProfile?.experienceLevel || 'Mid-Level');
  const [activeCategoryTab, setActiveCategoryTab] = useState('Frontend');

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const clean = customSkillInput.trim();
    if (!clean) return;
    if (!selectedSkills.includes(clean)) {
      setSelectedSkills(prev => [...prev, clean]);
    }
    setCustomSkillInput('');
  };

  const handleSave = () => {
    if (selectedSkills.length === 0) {
      showToast('Please select at least 1 skill tag.', 'warning');
      return;
    }
    updateFreelancerSkills({
      role: selectedRole,
      skills: selectedSkills,
      experienceLevel: selectedExperience
    });
    if (onClose) onClose();
  };

  // Preview match score with first project
  const sampleProject = (activeProjectsList || PROJECTS)[0];
  const sampleMatch = calculateProjectMatch(sampleProject, {
    ...freelancerProfile,
    role: selectedRole,
    skills: selectedSkills
  });

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="modal-card"
        style={{ maxWidth: '680px', width: '92%', maxHeight: '90vh', overflowY: 'auto', padding: '1.75rem' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '9999px', marginBottom: '0.4rem' }}>
              <Sparkles size={13} /> {isOnboarding ? 'Smart Match Onboarding' : 'Personalize Skill Profile'}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>
              {isOnboarding ? 'Choose Your Skills & Domain' : 'Edit Your Core Skills'}
            </h2>
          </div>
          {!isOnboarding && (
            <button onClick={onClose} className="btn-close" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} color="#64748B" />
            </button>
          )}
        </div>

        {/* 1. Primary Role Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
            Primary Role:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {POPULAR_ROLES.map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  border: `1.5px solid ${selectedRole === role ? '#1E40AF' : '#E2E8F0'}`,
                  backgroundColor: selectedRole === role ? '#EFF6FF' : '#FFFFFF',
                  color: selectedRole === role ? '#1E40AF' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Skills Selector by Category */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
            Select Skills ({selectedSkills.length} selected):
          </label>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', marginBottom: '0.6rem' }}>
            {Object.keys(SKILL_CATEGORIES).map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategoryTab(cat)}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  border: `1px solid ${activeCategoryTab === cat ? '#1E40AF' : '#E2E8F0'}`,
                  backgroundColor: activeCategoryTab === cat ? '#1E40AF' : '#F8FAFC',
                  color: activeCategoryTab === cat ? '#FFFFFF' : '#64748B',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
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
                    gap: '0.3rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: `1.5px solid ${isSelected ? '#1E40AF' : '#CBD5E1'}`,
                    backgroundColor: isSelected ? '#1E40AF' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={12} />}
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>

          {/* Custom Skill Input */}
          <form onSubmit={handleAddCustomSkill} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              value={customSkillInput}
              onChange={e => setCustomSkillInput(e.target.value)}
              placeholder="Add custom skill (e.g. AWS, GraphQL)..."
              style={{ flex: 1, padding: '0.45rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              <Plus size={14} /> Add
            </button>
          </form>
        </div>

        {/* 3. Experience Level */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.4rem' }}>
            Experience Level:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {EXPERIENCE_LEVELS.map(exp => (
              <div
                key={exp.id}
                onClick={() => setSelectedExperience(exp.id)}
                style={{
                  padding: '0.65rem',
                  borderRadius: '8px',
                  border: `1.5px solid ${selectedExperience === exp.id ? '#1E40AF' : '#E2E8F0'}`,
                  backgroundColor: selectedExperience === exp.id ? '#EFF6FF' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedExperience === exp.id ? '#1E40AF' : '#0F172A' }}>
                  {exp.label}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B' }}>{exp.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Live Match Preview */}
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
              <TrendingUp size={15} color="#1E40AF" /> Live Smart Match: {sampleProject?.title}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E40AF' }}>
              {sampleMatch.matchScore}% Match
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          {!isOnboarding && (
            <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
          )}
          <button type="button" onClick={handleSave} className="btn btn-primary btn-sm">
            <span>{isOnboarding ? 'Save & Continue' : 'Save Skills'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
