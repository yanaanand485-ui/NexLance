import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const ProjectDiscovery = () => {
  const {
    activeProjectsList,
    navigateTo,
    setSelectedProject,
    role,
    freelancerProfile,
    setIsSkillModalOpen,
    setIsSkillModalOnboarding
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Web Development', 'Frontend Engineering', 'Backend & Systems', 'AI & Web Apps'];

  const hasNoSkills = role === 'freelancer' && (!freelancerProfile?.skills || freelancerProfile.skills.length === 0);

  const filteredProjects = activeProjectsList.filter(p => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchSkills = p.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchSkills) return false;
    }
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem 4rem', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
            Find Projects
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
            Browse available client projects matching your skills.
          </p>
          {!hasNoSkills && role === 'freelancer' && freelancerProfile?.skills?.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Your Skills:</span>
              {freelancerProfile.skills.map(s => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#EFF6FF',
                    color: '#1E40AF',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {!hasNoSkills && role === 'freelancer' && (
          <button
            type="button"
            onClick={() => {
              setIsSkillModalOnboarding(false);
              setIsSkillModalOpen(true);
            }}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            Edit Skills
          </button>
        )}
      </div>

      {hasNoSkills ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '3rem 1.5rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
            No Skills Added Yet
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 1.5rem auto', lineHeight: 1.5 }}>
            Please add your skills first. Once you add your skills, available projects matching your skill set will be displayed here.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSkillModalOnboarding(false);
              setIsSkillModalOpen(true);
            }}
            className="btn btn-primary btn-sm"
          >
            Add Skills
          </button>
        </div>
      ) : (
        <>
          {/* Simple Search & Category Filter Bar */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search projects by title, scope, or skill..."
              style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', border: '1px solid #CBD5E1', outline: 'none', marginBottom: '0.85rem' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Category:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#1E40AF' : '#E2E8F0',
                    backgroundColor: selectedCategory === cat ? '#1E40AF' : '#FFFFFF',
                    color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

      {/* Simple Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}
          >
            <h3
              onClick={() => {
                setSelectedProject(proj);
                navigateTo('project-detail');
              }}
              style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', cursor: 'pointer', marginBottom: '0.4rem' }}
            >
              {proj.title}
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.75rem' }}>
              {proj.description}
            </p>

            <div style={{ fontSize: '0.85rem', color: '#334155', marginBottom: '0.4rem' }}>
              <strong>Skills:</strong> {proj.requiredSkills.join(', ')}
            </div>

            <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
              <strong>Budget:</strong> {proj.budget} &bull; <strong>Timeline:</strong> {proj.deadline}
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedProject(proj);
                navigateTo('project-detail');
              }}
              className="btn btn-primary btn-sm"
            >
              View Project
            </button>
          </div>
        ))}
      </div>
      </>
      )}
    </main>
  );
};
