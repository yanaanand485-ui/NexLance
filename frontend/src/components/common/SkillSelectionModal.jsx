import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const AVAILABLE_SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Next.js',
  'Python',
  'Tailwind CSS',
  'PostgreSQL',
  'Docker',
  'MongoDB',
  'Redux'
];

const ROLES = [
  'Full-Stack Developer',
  'Frontend Engineer',
  'Backend Developer',
  'UI/UX Designer'
];

export const SkillSelectionModal = ({ isOpen, onClose, isOnboarding }) => {
  const { freelancerProfile, updateFreelancerSkills, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState(freelancerProfile?.role || '');
  const [selectedSkills, setSelectedSkills] = useState(freelancerProfile?.skills || []);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(freelancerProfile?.role || '');
      setSelectedSkills(freelancerProfile?.skills || []);
    }
  }, [isOpen, freelancerProfile]);

  if (!isOpen) return null;

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSave = () => {
    if (!selectedRole) {
      showToast('Please select a role.', 'warning');
      return;
    }
    if (selectedSkills.length === 0) {
      showToast('Please select at least 1 skill.', 'warning');
      return;
    }
    updateFreelancerSkills({
      role: selectedRole,
      skills: selectedSkills,
      experienceLevel: freelancerProfile?.experienceLevel || 'Mid-Level'
    });
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="modal-card"
        style={{ maxWidth: '500px', width: '90%', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
          {isOnboarding ? 'Select Your Primary Skills & Role' : 'Edit Skills & Role'}
        </h2>

        {/* Role Select */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Primary Role:
          </label>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
          >
            <option value="">Select your role...</option>
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Skills List */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
            Select Skills:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {AVAILABLE_SKILLS.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: '1px solid',
                    borderColor: isSelected ? '#1E40AF' : '#CBD5E1',
                    backgroundColor: isSelected ? '#1E40AF' : '#F8FAFC',
                    color: isSelected ? '#FFFFFF' : '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {skill} {isSelected ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary btn-sm"
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
};
