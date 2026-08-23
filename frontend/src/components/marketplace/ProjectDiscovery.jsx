import React, { useState } from 'react';
import {
  Search,
  Filter,
  DollarSign,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SmartMatchBadge } from '../common/SmartMatchBadge';
import { calculateProjectMatch } from '../../utils/matchEngine';

export const ProjectDiscovery = () => {
  const {
    role,
    freelancerProfile,
    setIsAuthModalOpen,
    setAuthMode,
    setAuthRoleChoice,
    showToast,
    activeProjectsList,
    navigateTo,
    setSelectedProject,
    appliedProjectIds,
    submitProposal
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Web Development', 'Frontend Engineering', 'Backend & Systems', 'AI & Web Apps'];

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
    <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', color: '#1E40AF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          <Briefcase size={14} /> Project Marketplace
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: '0.4rem' }}>
          Find Projects That Match Your Skills
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B' }}>
          Browse verified client contracts ranked by your skill match score and verified competency badges.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.03)' }}>
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '14px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search projects by title, scope, or technology (e.g. React, Next.js, Redis)..."
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflowX: 'auto' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem' }}>
            <SlidersHorizontal size={14} /> Categories:
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#1E40AF' : '#E2E8F0',
                backgroundColor: selectedCategory === cat ? '#1E40AF' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List (Section 12) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredProjects.map((proj) => {
          const hasApplied = appliedProjectIds.includes(proj.id);
          const matchData = calculateProjectMatch(proj, freelancerProfile);

          return (
            <div
              key={proj.id}
              className="card card-hover"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.4fr 0.8fr',
                gap: '2rem',
                padding: '1.75rem',
                borderRadius: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                    {proj.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Posted {proj.postedAgo} • {proj.applicantsCount} proposals submitted
                  </span>
                </div>

                <h2
                  onClick={() => {
                    setSelectedProject(proj);
                    navigateTo('project-detail');
                  }}
                  style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', cursor: 'pointer', marginBottom: '0.5rem' }}
                >
                  {proj.title}
                </h2>

                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                  {proj.description}
                </p>

                {/* Required Skills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {proj.requiredSkills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#F1F5F9',
                        color: '#334155',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Client Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.825rem', color: '#64748B' }}>
                  <img
                    src={proj.client.avatar}
                    alt={proj.client.name}
                    style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>{proj.client.name}</span>
                  <span>• {proj.client.country}</span>
                  <span>• ★ {proj.client.rating} ({proj.client.spent} spent)</span>
                </div>
              </div>

              {/* Right Column: Match Score, Budget, Actions */}
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Budget</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{proj.budget}</div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Est. Timeline: {proj.deadline}</span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Skill Match</span>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: matchData.matchScore >= 80 ? '#1E40AF' : '#475569', lineHeight: 1 }}>{matchData.matchScore}%</div>
                    </div>
                  </div>

                  {/* Why Match highlights */}
                  <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                      Match Breakdown:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {matchData.whyMatchReasons.slice(0, 2).map((r, i) => (
                        <li key={i} style={{ fontSize: '0.75rem', color: r.startsWith('⚠') ? '#B45309' : '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CheckCircle2 size={12} color={r.startsWith('⚠') ? '#F59E0B' : '#059669'} />
                          <span>{r.replace(/^✓\s*/, '').replace(/^⚠\s*/, '').replace(/^⚡\s*/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSelectedProject(proj);
                      navigateTo('project-detail');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Project
                  </button>
                  <button
                    onClick={() => {
                      if (role === 'public') {
                        setAuthMode('login');
                        setAuthRoleChoice('freelancer');
                        setIsAuthModalOpen(true);
                        showToast('Please log in or create an account to submit proposals.', 'info');
                        return;
                      }
                      if (!hasApplied) {
                        submitProposal(proj.id, {});
                      }
                    }}
                    className={`btn ${hasApplied ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                    style={{ flex: 1 }}
                  >
                    {hasApplied ? 'Applied ✓' : 'Submit Proposal'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
