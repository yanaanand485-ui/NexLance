import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const QUESTIONS = {
  react: [
    { q: 'What is JSX in React?', options: ['Syntax extension for JavaScript', 'A Java compiler'], answer: 0 },
    { q: 'Which hook manages component state?', options: ['useState', 'useStyles'], answer: 0 }
  ],
  typescript: [
    { q: 'What does TypeScript add to JavaScript?', options: ['Static type checking', 'Automatic CSS styling'], answer: 0 },
    { q: 'Which keyword defines an object structure?', options: ['interface', 'record'], answer: 0 }
  ],
  nodejs: [
    { q: 'Which engine runs Node.js code?', options: ['Chrome V8 Engine', 'Gecko Engine'], answer: 0 },
    { q: 'Which function imports modules in CommonJS?', options: ['require()', 'importCSS()'], answer: 0 }
  ],
  javascript: [
    { q: 'Which keyword is block-scoped?', options: ['let and const', 'var'], answer: 0 },
    { q: 'What does "typeof []" return in JavaScript?', options: ['object', 'array'], answer: 0 }
  ]
};

export const SkillVerification = () => {
  const { freelancerProfile, completeAssessment, showToast } = useApp();

  const [activeTrack, setActiveTrack] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Check if current user is Sarah Jenkins (demo user) or a new user
  const isSarah = freelancerProfile?.email === 'sarah@nexlance.dev' || freelancerProfile?.id === 'fl-sarah-01';

  // For Sarah Jenkins, show demo verified skills including JavaScript (ES6+); for new users, show their actual verified skills
  const sarahVerifiedSkills = [
    { id: 'react', name: 'React', score: 95, percentile: 'Top 2% Global', status: 'verified' },
    { id: 'typescript', name: 'TypeScript', score: 96, percentile: 'Top 1% Global', status: 'verified' },
    { id: 'nodejs', name: 'Node.js', score: 92, percentile: 'Top 5% Global', status: 'verified' },
    { id: 'javascript', name: 'JavaScript (ES6+)', score: 95, percentile: 'Top 2% Global', status: 'verified' }
  ];

  const rawSkillsList = isSarah
    ? sarahVerifiedSkills
    : (freelancerProfile?.verifiedSkills || []);

  const verifiedSkillsList = rawSkillsList.filter(s => {
    const key = (s.name || s.id || '').toLowerCase();
    return !key.includes('graphql') && !key.includes('aws') && !key.includes('devops');
  });

  const assessmentTracks = [
    {
      id: 'react',
      name: 'React',
      level: 'Advanced',
      questionsCount: 2,
      duration: '5 Mins',
      passingScore: '75%'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      level: 'Advanced',
      questionsCount: 2,
      duration: '5 Mins',
      passingScore: '75%'
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      level: 'Intermediate',
      questionsCount: 2,
      duration: '5 Mins',
      passingScore: '75%'
    },
    {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      level: 'Intermediate',
      questionsCount: 2,
      duration: '5 Mins',
      passingScore: '75%'
    }
  ];

  const handleStartAssessment = (track) => {
    setActiveTrack(track);
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (qIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const handleSubmitAssessment = (e) => {
    e.preventDefault();
    if (!activeTrack) return;

    const trackQuestions = QUESTIONS[activeTrack.id] || [];
    let correctCount = 0;
    trackQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount += 1;
      }
    });

    // Score calculation
    const score = Math.round((correctCount / trackQuestions.length) * 100) || 90;

    completeAssessment(score, activeTrack.name);
    showToast(`${activeTrack.name} assessment completed! Score: ${score}/100`, 'success');
    setActiveTrack(null);
  };

  return (
    <div className="dashboard-main verification-container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
          Skill Verification
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Validate and review your technical skills and test benchmarks.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Left Column: Skill Portfolio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
              Your Skill Portfolio
            </h2>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E40AF' }}>
              {verifiedSkillsList.filter(s => s.status === 'verified').length} Verified
            </span>
          </div>

          {/* Skill items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {verifiedSkillsList.length > 0 ? (
              verifiedSkillsList.map(skill => {
                const isVerified = skill.status === 'verified' && skill.score;

                return (
                  <div
                    key={skill.id || skill.name}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.2rem' }}>
                        {skill.name}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: isVerified ? '#1E40AF' : '#64748B', fontWeight: 600 }}>
                        {isVerified ? 'Verified' : 'Pending'}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {isVerified ? (
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
                          {skill.score}/100
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Pending</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '2rem 1.25rem',
                  textAlign: 'center'
                }}
              >
                <p style={{ margin: 0, fontWeight: 700, color: '#0F172A', fontSize: '0.95rem' }}>
                  No Skills Verified Yet
                </p>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5 }}>
                  Take an assessment on the right to test and verify your skills.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Assessment Center */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>
              Assessment Center
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Available Tracks
            </span>
          </div>

          {/* Assessment Center Overview Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
              Skill assessments evaluate technical fundamentals. Pass with 75%+ to verify a skill.
            </p>

            {/* Tracks List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {assessmentTracks.map(track => {
                const matchingSkill = verifiedSkillsList.find(s =>
                  s.status === 'verified' &&
                  s.score &&
                  (s.id === track.id || (s.name && s.name.toLowerCase().includes(track.id)))
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
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: '#0F172A' }}>{track.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.5rem' }}>
                        ({track.level})
                      </span>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                        {track.questionsCount} Questions &bull; {track.duration} &bull; Pass: {track.passingScore}
                      </div>
                    </div>

                    <div>
                      {matchingSkill ? (
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                          Verified ({matchingSkill.score}/100)
                        </span>
                      ) : !isSarah ? (
                        <button
                          type="button"
                          onClick={() => handleStartAssessment(track)}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                        >
                          Take Assessment
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.3rem 0.6rem', borderRadius: '4px' }}>
                          Verified (95/100)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Simple Assessment Modal */}
      {activeTrack && (
        <div className="modal-backdrop" onClick={() => setActiveTrack(null)} style={{ zIndex: 1050 }}>
          <div
            className="modal-card"
            style={{ maxWidth: '520px', width: '90%', padding: '1.5rem', backgroundColor: '#FFFFFF', borderRadius: '10px' }}
            onClick={e => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>
              Assessment: {activeTrack.name}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Answer the questions below to verify your {activeTrack.name} skill.
            </p>

            <form onSubmit={handleSubmitAssessment}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {(QUESTIONS[activeTrack.id] || []).map((qObj, qIdx) => (
                  <div key={qIdx} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.85rem' }}>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', marginBottom: '0.6rem' }}>
                      {qIdx + 1}. {qObj.q}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {qObj.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.85rem',
                            color: '#334155',
                            cursor: 'pointer'
                          }}
                        >
                          <input
                            type="radio"
                            name={`question-${qIdx}`}
                            checked={selectedAnswers[qIdx] === optIdx}
                            onChange={() => handleSelectAnswer(qIdx, optIdx)}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTrack(null)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                >
                  Submit & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
