import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Zap,
  Check,
  Play,
  RotateCcw,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENTS } from '../../data/mockData';

export const SkillVerification = () => {
  const { freelancerProfile, completeAssessment, showToast } = useApp();

  // Selected skill to preview / take assessment for (default 'react')
  const [selectedSkillKey, setSelectedSkillKey] = useState('react');
  
  // Test state - NOT active by default (only starts when user clicks "Start Assessment")
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Active assessment data
  const assessmentData = ASSESSMENTS[selectedSkillKey] || ASSESSMENTS.react;

  // Countdown timer - only runs when isTestActive is true
  useEffect(() => {
    if (!isTestActive) return;

    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartTest = (skillKey = selectedSkillKey) => {
    setSelectedSkillKey(skillKey);
    const targetData = ASSESSMENTS[skillKey] || ASSESSMENTS.react;
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimeLeft((targetData.durationMinutes || 20) * 60);
    setIsTestActive(true);
    showToast(`Started ${targetData.name || skillKey} assessment. Good luck!`, 'info');
  };

  const handleCancelTest = () => {
    setIsTestActive(false);
    setShowCancelConfirm(false);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    showToast('Assessment cancelled.', 'info');
  };

  const currentQ = assessmentData.questions[currentQuestionIdx] || assessmentData.questions[0];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optIdx
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < assessmentData.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    setIsTestActive(false);
    // Calculate score based on actual answers
    let correct = 0;
    assessmentData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / assessmentData.questions.length) * 100);
    setFinalScore(calculatedScore);
    setShowResultModal(true);
  };

  const handleAddToProfile = () => {
    completeAssessment(finalScore, assessmentData.name || selectedSkillKey);
    setShowResultModal(false);
  };

  // Get user's verified skills list or fallback
  const verifiedSkillsList = freelancerProfile?.verifiedSkills || [
    { id: 'react', name: 'React', score: 91, percentile: 'Top 5% Global', status: 'verified', retakeDate: 'Dec 2026' },
    { id: 'javascript', name: 'JavaScript', score: 87, percentile: 'Top 15% Global', status: 'verified', retakeDate: 'Jan 2027' },
    { id: 'nodejs', name: 'Node.js', score: null, status: 'unverified' },
    { id: 'typescript', name: 'TypeScript', score: null, status: 'unverified' }
  ];

  return (
    <div className="dashboard-main verification-container">
      {/* Top Header */}
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E40AF' }}>
            <ShieldCheck size={22} />
          </div>
          <h1 className="dashboard-title" style={{ fontSize: '2rem' }}>Skill Verification Hub</h1>
        </div>
        <p className="dashboard-subtitle" style={{ maxWidth: '720px', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Validate your technical expertise through standardized, timed assessments. Verified badges are displayed on your profile and increase your interview match rate by <strong>4.2x</strong>.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="verification-grid">
        {/* Left Column: Skill Portfolio */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              Your Skill Portfolio
            </h2>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B' }}>
              {verifiedSkillsList.filter(s => s.status === 'verified').length} Verified
            </span>
          </div>

          {/* Skill items list */}
          {verifiedSkillsList.map(skill => {
            const isVerified = skill.status === 'verified' && skill.score;
            const skillKey = skill.id?.toLowerCase().replace(/[^a-z]/g, '') || 'react';
            const isSelectedForPreview = selectedSkillKey === skillKey && !isTestActive;

            // Skill icon letter/badge helper
            const getIconBadge = (name) => {
              if (name.toLowerCase().includes('react')) return { text: '<>', bg: '#EFF6FF', color: '#1E40AF' };
              if (name.toLowerCase().includes('script') && !name.toLowerCase().includes('type')) return { text: 'JS', bg: '#FEF3C7', color: '#B45309' };
              if (name.toLowerCase().includes('type')) return { text: 'TS', bg: '#E0F2FE', color: '#0369A1' };
              if (name.toLowerCase().includes('node')) return { text: '≡', bg: '#F1F5F9', color: '#475569' };
              return { text: '⚡', bg: '#F3E8FF', color: '#7E22CE' };
            };

            const iconStyle = getIconBadge(skill.name || skill.id);

            return (
              <div
                key={skill.id || skill.name}
                className={`skill-portfolio-item ${!isVerified ? 'dashed' : ''} ${isSelectedForPreview ? 'active-preview' : ''}`}
                style={{ cursor: !isTestActive ? 'pointer' : 'default' }}
                onClick={() => {
                  if (!isTestActive && ASSESSMENTS[skillKey]) {
                    setSelectedSkillKey(skillKey);
                  }
                }}
              >
                <div className="skill-portfolio-left">
                  <div className="skill-icon-badge" style={{ backgroundColor: iconStyle.bg, color: iconStyle.color }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{iconStyle.text}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>
                      {skill.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      {isVerified ? (
                        <>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                            <Check size={12} strokeWidth={3} /> Verified
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            {skill.percentile || 'Top 5% Global'}
                          </span>
                        </>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 600, color: '#64748B', backgroundColor: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                          ○ Not Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  {isVerified ? (
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                        {skill.score}<span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>/100</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isTestActive) {
                            handleStartTest(skillKey);
                          }
                        }}
                        disabled={isTestActive}
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#1E40AF',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          marginTop: '0.25rem',
                          cursor: isTestActive ? 'not-allowed' : 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.2rem'
                        }}
                        title="Retake to improve score"
                      >
                        <RotateCcw size={10} /> Retake Test
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isTestActive) {
                          handleStartTest(skillKey);
                        }
                      }}
                      disabled={isTestActive}
                      className="btn btn-secondary btn-sm"
                      style={{ fontWeight: 700, fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                    >
                      <Play size={12} fill="currentColor" /> Take Test
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Assessment Hub (Idle Preview OR Active Session) */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
              {isTestActive ? 'Active Assessment Session' : 'Assessment Center'}
            </h2>

            {/* Quick Skill Selector Tabs when test is idle */}
            {!isTestActive && (
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {Object.keys(ASSESSMENTS).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedSkillKey(key)}
                    className={`skill-select-pill ${selectedSkillKey === key ? 'active' : ''}`}
                  >
                    {ASSESSMENTS[key].name || key}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VIEW 1: Assessment Preview / Launch Hub (When test is NOT active) */}
          {!isTestActive && (
            <div className="assessment-launcher-card">
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.2rem 0.6rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {assessmentData.difficulty} Level
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Standardized Assessment
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3 }}>
                  {assessmentData.title}
                </h3>
              </div>

              {/* Assessment Specs Grid */}
              <div className="assessment-specs-grid">
                <div className="assessment-spec-item">
                  <span className="assessment-spec-label">Time Limit</span>
                  <span className="assessment-spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#1E40AF' }}>
                    <Clock size={14} /> {assessmentData.durationMinutes || 20} Mins
                  </span>
                </div>
                <div className="assessment-spec-item">
                  <span className="assessment-spec-label">Questions</span>
                  <span className="assessment-spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FileText size={14} color="#64748B" /> {assessmentData.questions.length} MCQs
                  </span>
                </div>
                <div className="assessment-spec-item">
                  <span className="assessment-spec-label">Passing Score</span>
                  <span className="assessment-spec-val" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16A34A' }}>
                    <Award size={14} /> {assessmentData.passingScore || 75}%
                  </span>
                </div>
              </div>

              {/* Topics Covered */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.4rem' }}>
                  Topics Covered
                </span>
                <div className="assessment-topics-wrap">
                  {(assessmentData.topics || ['Core Architecture', 'Performance', 'Best Practices', 'Modern Standards']).map((topic, i) => (
                    <span key={i} className="assessment-topic-pill">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assessment Guidelines Box */}
              <div className="assessment-guidelines-box">
                <div className="assessment-guideline-item">
                  <Zap size={15} className="assessment-guideline-icon" />
                  <span>
                    <strong>Timer Starts on Click:</strong> You have {assessmentData.durationMinutes || 20} minutes to complete all {assessmentData.questions.length} questions once you start.
                  </span>
                </div>
                <div className="assessment-guideline-item">
                  <CheckCircle2 size={15} className="assessment-guideline-icon" />
                  <span>
                    <strong>Instant Profile Badge:</strong> Scoring {assessmentData.passingScore || 75}% or higher automatically grants the verified badge and boosts your Career Score.
                  </span>
                </div>
              </div>

              {/* CTA Start Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => handleStartTest(selectedSkillKey)}
                  className="btn btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                  }}
                >
                  <Play size={16} fill="currentColor" /> Start {assessmentData.name || selectedSkillKey} Assessment
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: Active Test Session (Only rendered when user clicks Start) */}
          {isTestActive && (
            <div className="assessment-active-card">
              {/* Header: Timer, Question Counter & Cancel Option */}
              <div className="assessment-header">
                <div className="assessment-timer">
                  <Clock size={16} color="#1E40AF" />
                  <span>{formatTime(timeLeft)} Remaining</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                    Question {currentQuestionIdx + 1} of {assessmentData.questions.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCancelConfirm(true)}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#94A3B8',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '4px'
                    }}
                    title="Exit test session"
                  >
                    <X size={14} /> Exit
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="question-progress-bar">
                <div
                  className="question-progress-fill"
                  style={{
                    width: `${((currentQuestionIdx + 1) / assessmentData.questions.length) * 100}%`
                  }}
                ></div>
              </div>

              {/* Skill Tag */}
              <div style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                  {assessmentData.name || selectedSkillKey} Assessment
                </span>
              </div>

              {/* Question Text */}
              <h3 className="question-title">
                {currentQ.question}
              </h3>

              {/* Radio Options List */}
              <div className="options-list">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`option-item ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="radio-circle">
                        {isSelected && <div className="radio-circle-inner"></div>}
                      </div>
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Stepper Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #F1F5F9' }}>
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIdx === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: currentQuestionIdx === 0 ? '#CBD5E1' : '#475569',
                    cursor: currentQuestionIdx === 0 ? 'not-allowed' : 'pointer',
                    background: 'none',
                    border: 'none'
                  }}
                >
                  <ArrowLeft size={16} /> Previous
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary btn-sm"
                    style={{ minWidth: '110px' }}
                  >
                    {currentQuestionIdx === assessmentData.questions.length - 1 ? (
                      'Submit Assessment'
                    ) : (
                      <>Next <ArrowRight size={15} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Why Verify? Stats Strip */}
      <div className="why-verify-strip" style={{ marginTop: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
            Why Verify Your Skills on NexLance?
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5 }}>
            Profiles with 3 or more verified skills receive <strong>4.2x more direct client invitations</strong>. Our technical verification engine provides mathematical credibility that replaces outdated resume claims.
          </p>
        </div>

        <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', paddingLeft: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            98%
          </div>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Accuracy Match
          </div>
        </div>

        <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', paddingLeft: '1.5rem' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1E40AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            &lt;15m
          </div>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Avg. Test Time
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="modal-backdrop" onClick={() => setShowCancelConfirm(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: '420px', textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#DC2626' }}>
              <AlertCircle size={26} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Exit Assessment?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              Are you sure you want to exit? Your current progress on this {assessmentData.name || selectedSkillKey} session will not be saved.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={handleCancelTest}
                className="btn btn-primary"
                style={{ flex: 1, backgroundColor: '#DC2626', borderColor: '#DC2626' }}
              >
                Exit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Results Modal */}
      {showResultModal && (
        <div className="modal-backdrop" onClick={() => setShowResultModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: finalScore >= (assessmentData.passingScore || 75) ? '#EFF6FF' : '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: finalScore >= (assessmentData.passingScore || 75) ? '#1E40AF' : '#DC2626'
              }}>
                <Award size={36} />
              </div>

              <span style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: finalScore >= (assessmentData.passingScore || 75) ? '#1E40AF' : '#DC2626',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {finalScore >= (assessmentData.passingScore || 75) ? 'Assessment Passed' : 'Assessment Completed'}
              </span>

              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif", margin: '0.25rem 0' }}>
                {finalScore} <span style={{ fontSize: '1.5rem', color: '#64748B', fontWeight: 500 }}>/ 100</span>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                backgroundColor: finalScore >= (assessmentData.passingScore || 75) ? '#EFF6FF' : '#F1F5F9',
                border: `1px solid ${finalScore >= (assessmentData.passingScore || 75) ? '#BFDBFE' : '#E2E8F0'}`,
                color: finalScore >= (assessmentData.passingScore || 75) ? '#1E40AF' : '#475569',
                fontWeight: 700,
                fontSize: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                {finalScore >= (assessmentData.passingScore || 75) ? (
                  <>
                    <CheckCircle2 size={16} /> {assessmentData.name || selectedSkillKey} Verified — {finalScore >= 90 ? 'Top 5% Global' : 'Top 15% Global'}
                  </>
                ) : (
                  <>
                    Passing threshold is {assessmentData.passingScore || 75}%. You can retake this assessment anytime.
                  </>
                )}
              </div>

              {/* Performance Breakdown Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Accuracy</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{finalScore}%</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Architecture</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{Math.min(100, Math.round(finalScore * 0.95))}%</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Best Practices</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{Math.min(100, Math.round(finalScore * 1.02))}%</div>
                </div>
              </div>

              {finalScore >= (assessmentData.passingScore || 75) ? (
                <button
                  onClick={handleAddToProfile}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                >
                  Add Verified Badge to Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setShowResultModal(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.75rem' }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowResultModal(false);
                      handleStartTest(selectedSkillKey);
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '0.75rem' }}
                  >
                    Retake Test
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
