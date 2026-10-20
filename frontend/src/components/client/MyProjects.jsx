import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FREELANCERS } from '../../data/mockData';
import { CareerScoreBadge, VerifiedSkillBadge } from './ClientBadge';

export const MyProjects = () => {
  const { activeProjectsList, addNewProject, showToast } = useApp();

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [activeProjectApplicants, setActiveProjectApplicants] = useState(null);

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Development',
    budget: '$1,500 – $2,500',
    budgetType: 'Fixed Price',
    deadline: '3 weeks',
    description: '',
    skills: 'React, TypeScript'
  });

  const filteredProjects = activeProjectsList;

  // Handle post new project submit
  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) {
      showToast('Please enter a project title and description.', 'warning');
      return;
    }

    const skillsArray = newProject.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    addNewProject({
      title: newProject.title,
      category: newProject.category,
      budget: newProject.budget,
      budgetType: newProject.budgetType,
      deadline: newProject.deadline,
      description: newProject.description,
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['React', 'Web Development'],
      status: 'Open',
      applicantsCount: 0
    });

    // Reset and close modal
    setNewProject({
      title: '',
      category: 'Web Development',
      budget: '$1,500 – $2,500',
      budgetType: 'Fixed Price',
      deadline: '3 weeks',
      description: '',
      skills: 'React, TypeScript'
    });
    setIsPostModalOpen(false);
    showToast('Your project has been posted successfully!', 'success');
  };

  // Mock applicants for the modal
  const sampleApplicants = FREELANCERS.slice(0, 4);

  return (
    <div className="dashboard-main">
      {/* 1. Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">My Projects</h1>
          <p className="dashboard-subtitle">
            View and manage all your posted listings, active contracts, and candidate proposals.
          </p>
        </div>

        <button
          onClick={() => setIsPostModalOpen(true)}
          className="btn btn-primary"
        >
          Post a New Project
        </button>
      </div>

      {/* 2. Projects Counter */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600 }}>
          Showing {filteredProjects.length} Projects
        </span>
      </div>

      {/* 3. Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredProjects.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '3rem',
              textAlign: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>No projects found in this tab</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Post a project to start receiving proposals from verified freelancers.
            </p>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              Post Your First Project
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="card"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Top row: Title, Status, and Action */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {project.title}
                    </h2>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Category: <strong>{project.category || 'Web Development'}</strong>
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setActiveProjectApplicants(project)}
                    className="btn btn-primary btn-sm"
                  >
                    View Applicants
                  </button>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                {project.description}
              </p>

              {/* Skills tags */}
              {project.requiredSkills && project.requiredSkills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: '#F1F5F9',
                        color: '#475569',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer row: Budget & Deadline info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid #F1F5F9',
                  fontSize: '0.825rem',
                  color: '#475569',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  Budget: <strong>{project.budget}</strong> ({project.budgetType || 'Fixed Price'})
                </div>
                <div>
                  Timeline: <strong>{project.deadline || '3 weeks'}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. Post New Project Modal */}
      {isPostModalOpen && (
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
          onClick={() => setIsPostModalOpen(false)}
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
              onClick={() => setIsPostModalOpen(false)}
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

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.3rem' }}>
              Post a New Project
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Describe your requirements to get matched with verified talent.
            </p>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 14 SaaS Dashboard with Stripe"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX & Product Design">UI/UX Design</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="DevOps & Cloud">DevOps & Cloud</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Budget Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $1,500 – $2,500"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Deadline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 weeks"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, Next.js, Node.js"
                    value={newProject.skills}
                    onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Project Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline your project scope, deliverables, and expectations..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Project Applicants Modal */}
      {activeProjectApplicants && (
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
          onClick={() => setActiveProjectApplicants(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '640px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProjectApplicants(null)}
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

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.2rem' }}>
              Applicants for "{activeProjectApplicants.title}"
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Review proposals from verified talent who applied to this project.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {sampleApplicants.map((applicant) => (
                <div
                  key={applicant.id}
                  style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '1rem',
                    backgroundColor: '#F8FAFC'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                        {applicant.name}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{applicant.title}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CareerScoreBadge score={applicant.careerScore} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16A34A' }}>
                        ${applicant.rawRate}/hr
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#334155', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
                    "I have built several full-stack production platforms using this exact stack and can deliver clean, tested code within your deadline."
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {applicant.topSkills.slice(0, 2).map((s, idx) => (
                        <VerifiedSkillBadge key={idx} skill={s.name} score={s.score} />
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          showToast(`Hired ${applicant.name} for this project!`, 'success');
                          setActiveProjectApplicants(null);
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        Hire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
