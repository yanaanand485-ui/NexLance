import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

// Only skills that have an Assessment Center track
const ASSESSMENT_CENTER_SKILLS = [
  'React',
  'TypeScript',
  'Node.js',
  'JavaScript (ES6+)'
];

const ROLES = [
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Developer'
];

export const SkillSelectionModal = ({ isOpen, onClose, isOnboarding }) => {
  const { freelancerProfile, updateFreelancerSkills, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState('Full Stack Developer');
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole(freelancerProfile?.role || 'Full Stack Developer');

      const clean = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const isMatch = (str1, str2) => {
        const a = clean(str1);
        const b = clean(str2);
        return a === b || a.includes(b) || b.includes(a);
      };

      const currentSkills = (freelancerProfile?.skills && freelancerProfile.skills.length > 0)
        ? freelancerProfile.skills
        : (freelancerProfile?.verifiedSkills?.map(s => s.name) || []);

      const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';

      if (currentSkills.length > 0) {
        const matched = ASSESSMENT_CENTER_SKILLS.filter(track =>
          currentSkills.some(s => isMatch(typeof s === 'string' ? s : s?.name, track))
        );
        setSelectedSkills(matched.length > 0 ? matched : ['React']);
      } else if (isSarah) {
        setSelectedSkills([...ASSESSMENT_CENTER_SKILLS]);
      } else {
        setSelectedSkills(['React']);
      }
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
      showToast('Please select your role', 'warning');
      return;
    }
    if (selectedSkills.length === 0) {
      showToast('Please select at least 1 skill', 'warning');
      return;
    }
    updateFreelancerSkills({
      role: selectedRole,
      skills: selectedSkills,
      experienceLevel: freelancerProfile?.experienceLevel || 'Senior / Expert'
    });
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="modal-card"
        style={{
          maxWidth: '460px',
          width: '90%',
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              {isOnboarding ? 'Choose Your Skills & Role' : 'Edit Skills'}
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
              Only skills with official assessment tracks
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.3rem', color: '#64748B', cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Role */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Primary Role:
          </label>
          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
          >
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Skills List (Only Assessment Center Skills) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', margin: 0 }}>
              Select Skills ({selectedSkills.length} selected):
            </label>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Assessment Center Ready
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {ASSESSMENT_CENTER_SKILLS.map(skill => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  style={{
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: isSelected ? 700 : 500,
                    border: '1px solid',
                    borderColor: isSelected ? '#1E40AF' : '#CBD5E1',
                    backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                    color: isSelected ? '#1E40AF' : '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{skill}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{isSelected ? '✓' : '+'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
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
            style={{ minWidth: '95px' }}
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
};
