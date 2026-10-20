import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

// Simple, clear questions for each skill track
const QUESTIONS = {
  react: [
    { q: 'What is JSX in React?', options: ['JavaScript syntax extension for UI', 'A Java compiler'], answer: 0 },
    { q: 'Which React hook manages component state?', options: ['useEffect', 'useState'], answer: 1 }
  ],
  typescript: [
    { q: 'What does TypeScript add to JavaScript?', options: ['Static type checking', 'Automatic CSS styling'], answer: 0 },
    { q: 'Which keyword defines an object structure?', options: ['interface', 'record'], answer: 0 }
  ],
  nodejs: [
    { q: 'Which engine runs Node.js code?', options: ['Google Chrome V8 Engine', 'Gecko Engine'], answer: 0 },
    { q: 'Which function imports CommonJS modules in Node?', options: ['require()', 'importModule()'], answer: 0 }
  ],
  javascript: [
    { q: 'Which keywords are block-scoped in modern JavaScript?', options: ['let and const', 'var only'], answer: 0 },
    { q: 'What does "typeof []" return in JavaScript?', options: ['array', 'object'], answer: 1 }
  ]
};

const TRACKS = [
  { id: 'react', name: 'React', level: 'Advanced' },
  { id: 'typescript', name: 'TypeScript', level: 'Advanced' },
  { id: 'nodejs', name: 'Node.js', level: 'Intermediate' },
  { id: 'javascript', name: 'JavaScript (ES6+)', level: 'Intermediate' }
];

// Clean helper to match skill names like 'Node.js' with 'nodejs'
const isMatch = (str1, str2) => {
  const clean = s => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const a = clean(str1);
  const b = clean(str2);
  return a.includes(b) || b.includes(a);
};

export const SkillVerification = () => {
  const { freelancerProfile, completeAssessment, showToast, setIsSkillModalOpen } = useApp();

  const [activeTrack, setActiveTrack] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';

  // Sarah demo account default skills
  const sarahSkills = [
    { id: 'react', name: 'React', score: 95, status: 'verified' },
    { id: 'typescript', name: 'TypeScript', score: 96, status: 'verified' },
    { id: 'nodejs', name: 'Node.js', score: 92, status: 'verified' },
    { id: 'javascript', name: 'JavaScript (ES6+)', score: 95, status: 'verified' }
  ];

  // Merge verified and pending skills so unverified skills never disappear
  const getSkillsList = () => {
    const verified = freelancerProfile?.verifiedSkills || [];
    const base = freelancerProfile?.skills || [];
    const combined = [...verified];

    base.forEach(name => {
      const alreadyPresent = combined.some(v => isMatch(v.name || v.id, name));
      if (!alreadyPresent) {
        combined.push({ name, status: 'pending', score: null });
      }
    });

    return combined.length > 0 ? combined : (isSarah ? sarahSkills : []);
  };

  const skillsList = getSkillsList();

  // Filter tracks to only show what the freelancer has added
  const availableTracks = TRACKS.filter(track =>
    skillsList.some(skill => isMatch(skill.name || skill.id, track.name || track.id))
  );

  const startTest = (track) => {
    setActiveTrack(track);
    setAnswers({});
    setResult(null);
  };

  const closeTest = () => {
    setActiveTrack(null);
    setAnswers({});
    setResult(null);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const questions = QUESTIONS[activeTrack.id] || [];

    // Make sure user selected answers for all questions
    if (Object.keys(answers).length < questions.length) {
      showToast('Please answer all questions before submitting.', 'warning');
      return;
    }

    // Calculate score
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });

    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 75;

    if (passed) {
      completeAssessment(score, activeTrack.name);
      showToast(`${activeTrack.name} verified with score: ${score}/100!`, 'success');
    }

    setResult({ score, passed });
  };

  return (
    <div className="dashboard-main" style={{ maxWidth: '1050px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
          Skill Verification
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Validate your technical skills and test benchmarks.
        </p>
      </div>

      {/* Main Grid: Left (Portfolio), Right (Assessments) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem' }}>
        
        {/* Left Column: Skill Portfolio */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>Your Skill Portfolio</h2>
            <button
              type="button"
              onClick={() => setIsSkillModalOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Edit Skills
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {skillsList.length > 0 ? (
              skillsList.map((skill, idx) => {
                const isVerified = skill.status === 'verified' && skill.score;
                return (
                  <div
                    key={skill.name || idx}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '0.85rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                        {skill.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: isVerified ? '#1E40AF' : '#64748B', fontWeight: 600 }}>
                        {isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>
                      {isVerified ? `${skill.score}/100` : <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Pending</span>}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <p style={{ margin: '0 0 0.8rem', color: '#64748B', fontSize: '0.9rem' }}>No skills added yet.</p>
                <button type="button" onClick={() => setIsSkillModalOpen(true)} className="btn btn-primary btn-sm">
                  + Add Skills
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Assessment Center */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>Assessment Center</h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>{availableTracks.length} Available Tracks</span>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
              Pass with 75%+ score to verify a skill competency badge.
            </p>

            {availableTracks.length > 0 ? (
              availableTracks.map(track => {
                const verifiedMatch = skillsList.find(s =>
                  s.status === 'verified' && s.score && isMatch(s.name || s.id, track.name || track.id)
                );

                return (
                  <div
                    key={track.id}
                    style={{
                      border: '1px solid #F1F5F9',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '6px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{track.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>({track.level})</span>
                    </div>

                    <div>
                      {verifiedMatch ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>
                            Verified ({verifiedMatch.score}/100)
                          </span>
                          <button
                            type="button"
                            onClick={() => startTest(track)}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                          >
                            Retake
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startTest(track)}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                        >
                          Take Assessment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', border: '1px dashed #CBD5E1', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 0.8rem', fontSize: '0.85rem', color: '#64748B' }}>Add skills first to take their assessments.</p>
                <button type="button" onClick={() => setIsSkillModalOpen(true)} className="btn btn-primary btn-sm">
                  + Add Skills
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Assessment Modal */}
      {activeTrack && (
        <div className="modal-backdrop" onClick={closeTest} style={{ zIndex: 1050 }}>
          <div
            className="modal-card"
            style={{ maxWidth: '480px', width: '92%', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                {activeTrack.name} Assessment
              </h2>
              <button
                type="button"
                onClick={closeTest}
                style={{ background: 'none', border: 'none', fontSize: '1.3rem', color: '#64748B', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Questions State */}
            {!result ? (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {(QUESTIONS[activeTrack.id] || []).map((qObj, qIdx) => (
                    <div key={qIdx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.85rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.6rem' }}>
                        {qIdx + 1}. {qObj.q}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {qObj.options.map((opt, optIdx) => {
                          const isSelected = answers[qIdx] === optIdx;
                          return (
                            <div
                              key={optIdx}
                              onClick={() => setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                padding: '0.5rem 0.75rem',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: `1px solid ${isSelected ? '#3B82F6' : '#CBD5E1'}`,
                                color: isSelected ? '#1E40AF' : '#334155'
                              }}
                            >
                              <input
                                type="radio"
                                name={`q-${activeTrack.id}-${qIdx}`}
                                checked={isSelected}
                                onChange={() => setAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                style={{ accentColor: '#2563EB', cursor: 'pointer' }}
                              />
                              <span style={{ fontWeight: isSelected ? 600 : 400 }}>{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                  <button type="button" onClick={closeTest} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit & Verify
                  </button>
                </div>
              </form>
            ) : (
              /* Results State (Only Marks) */
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {result.passed ? '✓' : '✕'}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#0F172A' }}>
                  {result.passed ? 'Assessment Passed!' : 'Assessment Not Passed'}
                </h3>
                <div style={{
                  display: 'inline-block',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '9999px',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  marginBottom: '1.5rem',
                  backgroundColor: result.passed ? '#EFF6FF' : '#FEF2F2',
                  border: `1px solid ${result.passed ? '#BFDBFE' : '#FECACA'}`,
                  color: result.passed ? '#1E40AF' : '#DC2626'
                }}>
                  Score: {result.score}/100
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {result.passed ? (
                    <button type="button" onClick={closeTest} className="btn btn-primary btn-sm">
                      Done
                    </button>
                  ) : (
                    <>
                      <button type="button" onClick={() => { setAnswers({}); setResult(null); }} className="btn btn-primary btn-sm">
                        Try Again
                      </button>
                      <button type="button" onClick={closeTest} className="btn btn-secondary btn-sm">
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
