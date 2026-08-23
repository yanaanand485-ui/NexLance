import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { CareerScoreBadge } from '../common/CareerScoreBadge';
import { VerifiedBadge } from '../common/VerifiedBadge';

export const TalentDiscovery = () => {
  const {
    navigateTo,
    setSelectedFreelancer,
    toggleShortlist,
    shortlistedFreelancers,
    toggleComparison,
    comparisonList
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [minScore, setMinScore] = useState(80);
  const verifiedOnly = true;

  const skillsList = ['all', 'React', 'TypeScript', 'Node.js', 'Figma UI/UX', 'Kubernetes', 'Python', 'Flutter', 'PostgreSQL'];

  const filteredFreelancers = FREELANCERS.filter(f => {
    // Search match
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchTitle = f.title.toLowerCase().includes(q);
      const matchTags = f.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchTitle && !matchTags) return false;
    }
    // Skill filter
    if (selectedSkill !== 'all') {
      const hasSkill = f.topSkills.some(s => s.name.toLowerCase().includes(selectedSkill.toLowerCase()));
      if (!hasSkill) return false;
    }
    // Score filter
    if (f.careerScore < minScore) return false;
    // Verified filter
    if (verifiedOnly && f.verifiedCount === 0) return false;
    return true;
  });

  return (
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Sparkles size={14} /> Proven & Tested Talent
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Find Proven Talent
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B' }}>
          Discover top-tier freelancers backed by verified assessments, Career Scores, and real production proof of work.
        </p>
      </div>

      {/* Search & Multi-faceted Filter Bar */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.03)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search skills, roles, or freelancers (e.g. React, Full-Stack, Figma)..."
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
            />
          </div>

          {/* Score Slider Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#F8FAFC', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#334155', whiteSpace: 'nowrap' }}>
              Min Career Score: <strong style={{ color: '#1E40AF' }}>{minScore}+</strong>
            </span>
            <input
              type="range"
              min={75}
              max={95}
              value={minScore}
              onChange={e => setMinScore(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#1E40AF' }}
            />
          </div>
        </div>

        {/* Skill Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto', paddingTop: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
            <SlidersHorizontal size={14} /> Skills:
          </span>
          {skillsList.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: selectedSkill === skill ? '#1E40AF' : '#E2E8F0',
                backgroundColor: selectedSkill === skill ? '#1E40AF' : '#FFFFFF',
                color: selectedSkill === skill ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {skill === 'all' ? 'All Skills' : skill}
            </button>
          ))}
        </div>
      </div>

      {/* Talent Cards Grid (Section 8) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem' }}>
        {filteredFreelancers.length === 0 ? (
          <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <Search size={40} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>No freelancers matched your filters</h3>
            <p style={{ color: '#64748B' }}>Try resetting your score slider or searching for a different skill term.</p>
          </div>
        ) : (
          filteredFreelancers.map((freelancer) => {
            const isShortlisted = shortlistedFreelancers.includes(freelancer.id);
            const isCompared = comparisonList.some(item => item.id === freelancer.id);

            return (
              <div
                key={freelancer.id}
                className="card card-hover"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.75rem',
                  borderRadius: '16px'
                }}
              >
                <div>
                  {/* Top Profile Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #E2E8F0' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <h3
                            onClick={() => {
                              setSelectedFreelancer(freelancer);
                              navigateTo('freelancer-profile');
                            }}
                            style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer' }}
                          >
                            {freelancer.name}
                          </h3>
                          <span style={{ fontSize: '0.725rem', fontWeight: 700, color: freelancer.available ? '#059669' : '#DC2626', backgroundColor: freelancer.available ? '#ECFDF5' : '#FEF2F2', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                            {freelancer.available ? '🟢 Available' : 'Busy'}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.1rem' }}>{freelancer.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginTop: '0.35rem', fontSize: '0.8rem', color: '#475569' }}>
                          <span style={{ fontWeight: 700, color: '#1E40AF' }}>{freelancer.hourlyRate}</span>
                          <span>• ★ {freelancer.rating} ({freelancer.reviewsCount} reviews)</span>
                          <span>• {freelancer.projectsCompleted} projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Career Score Gauge Mini */}
                    <div style={{ textAlign: 'center' }}>
                      <CareerScoreBadge score={freelancer.careerScore} size="sm" showLabel={false} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginTop: '0.2rem', display: 'block' }}>
                        Career Score
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {freelancer.bio}
                  </p>

                  {/* Verified Skills Pills */}
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                      Verified Competencies
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {freelancer.topSkills.map((s, idx) => (
                        <VerifiedBadge key={idx} skillName={s.name} score={s.score} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA Actions */}
                <div style={{ paddingTop: '1rem', borderTop: '1px solid #F1F5F9', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedFreelancer(freelancer);
                      navigateTo('freelancer-profile');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    View Profile & Work
                  </button>
                  <button
                    onClick={() => toggleShortlist(freelancer.id)}
                    className={`btn ${isShortlisted ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  >
                    {isShortlisted ? 'Shortlisted ⭐' : 'Shortlist'}
                  </button>
                  <button
                    onClick={() => toggleComparison(freelancer)}
                    className={`btn ${isCompared ? 'btn-primary' : 'btn-outline'} btn-sm`}
                  >
                    {isCompared ? 'Comparing' : 'Compare'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};
