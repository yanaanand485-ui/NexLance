import React, { useState } from 'react';
import {
  Search,
  Filter,
  Users,
  Star,
  CheckCircle2,
  X,
  Mail,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { VerifiedSkillBadge, CareerScoreBadge } from './ClientBadge';

export const FindTalent = () => {
  const { shortlistedFreelancers, toggleShortlist, showToast } = useApp();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [minScore, setMinScore] = useState(80);
  const [activeProfile, setActiveProfile] = useState(null);

  const skillsList = ['all', 'React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Python', 'DevOps'];

  // Basic filtering directly on mockData
  const filteredFreelancers = FREELANCERS.filter((freelancer) => {
    // 1. Search term match (name, title, or skills)
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = freelancer.name.toLowerCase().includes(q);
      const matchTitle = freelancer.title.toLowerCase().includes(q);
      const matchSkills = freelancer.topSkills.some(s => s.name.toLowerCase().includes(q));
      if (!matchName && !matchTitle && !matchSkills) return false;
    }

    // 2. Skill button filter
    if (selectedSkill !== 'all') {
      const hasSkill = freelancer.topSkills.some(s =>
        s.name.toLowerCase().includes(selectedSkill.toLowerCase())
      );
      if (!hasSkill) return false;
    }

    // 3. Minimum Career Score filter
    if (freelancer.careerScore < minScore) {
      return false;
    }

    return true;
  });

  return (
    <div className="dashboard-main">
      {/* 1. Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title">Find Talent</h1>
        <p className="dashboard-subtitle">
          Search and hire vetted freelancers with verified code scores and proven delivery records.
        </p>
      </div>

      {/* 2. Search & Filter Bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search input */}
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search
              size={18}
              color="#94A3B8"
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, role (e.g. React, Python), or skill..."
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Min score filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
              Min Career Score:
            </span>
            <select
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              style={{
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                cursor: 'pointer'
              }}
            >
              <option value={70}>70+ Any Verified</option>
              <option value={80}>80+ Top Tier</option>
              <option value={85}>85+ Senior Level</option>
              <option value={90}>90+ Elite Top 5%</option>
            </select>
          </div>
        </div>

        {/* Skill category pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>
            Popular Skills:
          </span>
          {skillsList.map((skill) => {
            const isSelected = selectedSkill === skill;
            return (
              <button
                key={skill}
                onClick={() => setSelectedSkill(skill)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid #1E40AF' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#1E40AF' : '#F8FAFC',
                  color: isSelected ? '#FFFFFF' : '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {skill === 'all' ? 'All Skills' : skill}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Freelancer Results Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>
          Showing {filteredFreelancers.length} Verified Freelancers
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredFreelancers.map((freelancer) => {
          const isShortlisted = shortlistedFreelancers.includes(freelancer.id);

          return (
            <div
              key={freelancer.id}
              className="card card-hover"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Header: Avatar, Name, Title */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {freelancer.name}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0' }}>
                      {freelancer.title}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                      📍 {freelancer.location || 'Remote'}
                    </span>
                  </div>
                </div>

                {/* Badges: Score & Rate */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <CareerScoreBadge score={freelancer.careerScore} />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1E40AF',
                      backgroundColor: '#EFF6FF',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      border: '1px solid #BFDBFE'
                    }}
                  >
                    ${freelancer.rawRate || 65}/hr
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                    ★ {freelancer.rating || 4.9} ({freelancer.totalReviews || 18} reviews)
                  </span>
                </div>

                {/* Short Bio snippet */}
                <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: 1.4, marginBottom: '1rem' }}>
                  {freelancer.bio ? freelancer.bio.slice(0, 110) + '...' : 'Specialized in building performant and modern applications.'}
                </p>

                {/* Verified Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {freelancer.topSkills.slice(0, 4).map((skill, idx) => (
                    <VerifiedSkillBadge key={idx} skill={skill.name} score={skill.score} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => setActiveProfile(freelancer)}
                  className="btn btn-secondary btn-sm"
                >
                  View Profile
                </button>
                <button
                  onClick={() => toggleShortlist(freelancer.id)}
                  className={`btn ${isShortlisted ? 'btn-primary' : 'btn-outline'} btn-sm`}
                >
                  {isShortlisted ? 'Shortlisted ★' : 'Shortlist'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Freelancer Full Profile Modal */}
      {activeProfile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem'
          }}
          onClick={() => setActiveProfile(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProfile(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img
                src={activeProfile.avatar}
                alt={activeProfile.name}
                style={{ width: '68px', height: '68px', borderRadius: '14px', objectFit: 'cover' }}
              />
              <div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {activeProfile.name}
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#64748B', margin: '0.2rem 0' }}>
                  {activeProfile.title}
                </p>
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                  <CareerScoreBadge score={activeProfile.careerScore} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#16A34A' }}>
                    ${activeProfile.rawRate}/hour
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>
                About
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
                {activeProfile.bio || activeProfile.overview || 'Expert software professional with a strong track record of delivered projects on NexLance.'}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
                Verified Skill Assessments
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeProfile.topSkills.map((s, idx) => (
                  <VerifiedSkillBadge key={idx} skill={s.name} score={s.score} />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  showToast(`Direct message sent to ${activeProfile.name}!`, 'success');
                  setActiveProfile(null);
                }}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <Mail size={16} /> Hire / Contact {activeProfile.name}
              </button>
              <button
                onClick={() => {
                  toggleShortlist(activeProfile.id);
                  setActiveProfile(null);
                }}
                className="btn btn-secondary"
              >
                {shortlistedFreelancers.includes(activeProfile.id) ? 'Shortlisted ★' : 'Shortlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
