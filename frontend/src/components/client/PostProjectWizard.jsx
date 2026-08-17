import React, { useState } from 'react';
import {
  PlusCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PostProjectWizard = () => {
  const { addNewProject, navigateTo } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: 'High-Scale Multi-Tenant Next.js Portal',
    category: 'Web Development',
    description: 'We need an experienced full-stack architect to build our multi-tenant SaaS frontend with role-based access control, real-time analytics dashboards, and Stripe billing.',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'PostgreSQL'],
    experienceLevel: 'Senior / Expert',
    budgetMin: '1,50,000',
    budgetMax: '2,20,000',
    budgetCurrency: '₹',
    deadline: '4 weeks',
    files: []
  });

  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !formData.requiredSkills.includes(newSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkillInput.trim()]
      }));
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProject({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      requiredSkills: formData.requiredSkills,
      experienceLevel: formData.experienceLevel,
      budget: `${formData.budgetCurrency}${formData.budgetMin} – ${formData.budgetCurrency}${formData.budgetMax}`,
      budgetType: 'Fixed Price',
      deadline: formData.deadline,
      whyMatchReasons: [
        `✓ ${formData.requiredSkills[0]} verified skill match`,
        '✓ High client satisfaction index',
        '✓ Available for immediate start'
      ]
    });
  };

  return (
    <div className="dashboard-main" style={{ maxWidth: '880px' }}>
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Post a New Project</h1>
        <p className="dashboard-subtitle">
          Define your project requirements. Our Smart Match engine will automatically match you with pre-verified talent.
        </p>
      </div>

      {/* Step Indicator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { num: 1, label: 'Basic Info' },
          { num: 2, label: 'Requirements' },
          { num: 3, label: 'Budget & Timeline' },
          { num: 4, label: 'Smart Match Preview' }
        ].map((s) => (
          <div
            key={s.num}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: step === s.num ? '#EFF6FF' : step > s.num ? '#ECFDF5' : '#FFFFFF',
              border: `1.5px solid ${step === s.num ? '#1E40AF' : step > s.num ? '#A7F3D0' : '#E2E8F0'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: step === s.num ? '#1E40AF' : step > s.num ? '#059669' : '#CBD5E1',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {step > s.num ? '✓' : s.num}
            </span>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: step === s.num ? '#1E40AF' : '#334155' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="card" style={{ padding: '2.25rem', boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.04)' }}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>1. Basic Project Information</h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Build a React E-Commerce Platform"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF' }}
              >
                <option value="Web Development">Web Development & SaaS</option>
                <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                <option value="DevOps & Cloud Architecture">DevOps & Cloud Architecture</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Mobile App Development">Mobile App Development</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Detailed Project Description & Scope
              </label>
              <textarea
                rows={5}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your deliverables, technical specifications, and milestones..."
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', resize: 'vertical' }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>2. Technical Requirements & Skills</h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Required Skills & Technologies (Verified skills prioritized)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={e => setNewSkillInput(e.target.value)}
                  placeholder="e.g. Docker, GraphQL, Tailwind CSS"
                  style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
                <button onClick={handleAddSkill} className="btn btn-secondary btn-sm">
                  Add Skill
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {formData.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#1E40AF',
                      borderRadius: '9999px',
                      fontSize: '0.825rem',
                      fontWeight: 600
                    }}
                  >
                    ✓ {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      style={{ color: '#1E40AF', marginLeft: '4px', cursor: 'pointer', fontWeight: 800 }}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Experience Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {['Intermediate', 'Senior / Expert', 'Staff / Lead'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, experienceLevel: lvl })}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '8px',
                      border: '1.5px solid',
                      borderColor: formData.experienceLevel === lvl ? '#1E40AF' : '#E2E8F0',
                      backgroundColor: formData.experienceLevel === lvl ? '#EFF6FF' : '#FFFFFF',
                      color: formData.experienceLevel === lvl ? '#1E40AF' : '#334155',
                      fontWeight: 700,
                      fontSize: '0.875rem'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget & Timeline */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>3. Budget & Delivery Timeline</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Min Budget ({formData.budgetCurrency})
                </label>
                <input
                  type="text"
                  value={formData.budgetMin}
                  onChange={e => setFormData({ ...formData, budgetMin: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Max Budget ({formData.budgetCurrency})
                </label>
                <input
                  type="text"
                  value={formData.budgetMax}
                  onChange={e => setFormData({ ...formData, budgetMax: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Estimated Delivery Deadline
              </label>
              <input
                type="text"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                placeholder="e.g. 3 weeks"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>
        )}

        {/* Step 4: Review & Live Smart Match Preview */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', backgroundColor: '#ECFDF5', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>
                Smart Match Ready! We found 18 verified candidates matching this specification.
              </span>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                {formData.category} • {formData.experienceLevel}
              </span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '0.2rem', marginBottom: '0.75rem' }}>
                {formData.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.55, marginBottom: '1rem' }}>
                {formData.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                {formData.requiredSkills.map((s, idx) => (
                  <span key={idx} className="badge badge-verified">✓ {s}</span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#0F172A', fontWeight: 700, paddingTop: '0.75rem', borderTop: '1px solid #E2E8F0' }}>
                <div>Budget: <span style={{ color: '#1E40AF' }}>{formData.budgetCurrency}{formData.budgetMin} – {formData.budgetCurrency}{formData.budgetMax}</span></div>
                <div>Deadline: <span style={{ color: '#1E40AF' }}>{formData.deadline}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn btn-primary"
            >
              Continue to Step {step + 1} <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn-lg"
            >
              <PlusCircle size={18} /> Publish Project & Find Matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
