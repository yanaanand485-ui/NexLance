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
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENTS } from '../../data/mockData';

export const SkillVerification = () => {
  const { freelancerProfile, completeAssessment, showToast } = useApp();

  const assessmentData = ASSESSMENTS.react;
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(6); // Question 7 of 15 (idx 6) matching screenshot
  const [selectedAnswers, setSelectedAnswers] = useState({
    0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1
  });
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 22); // 14:22 matching screenshot #3
  const [isTestActive, setIsTestActive] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const [finalScore, setFinalScore] = useState(91);

  // Countdown timer
  useEffect(() => {
    if (!isTestActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isTestActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
    // Calculate score
    let correct = 0;
    assessmentData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / assessmentData.questions.length) * 100) || 91;
    setFinalScore(calculatedScore);
    setShowResultModal(true);
  };

  const handleAddToProfile = () => {
    completeAssessment(finalScore, 'React');
    setShowResultModal(false);
  };

  return (
    <div className="dashboard-main verification-container">
      {/* Top Header */}
      <div className="dashboard-header" style={{ marginBottom: '2.5rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '2.25rem' }}>Prove Your Skills</h1>
        <p className="dashboard-subtitle" style={{ maxWidth: '720px', fontSize: '1rem', marginTop: '0.4rem' }}>
          Validate your expertise through rigorous technical assessments. Verified skills dramatically increase your visibility to premium enterprise clients.
        </p>
      </div>

      {/* Main 2-Column Grid matching Screenshot #3 */}
      <div className="verification-grid">
        {/* Left Column: Skill Portfolio */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
            Your Skill Portfolio
          </h2>

          {/* React Card */}
          <div className="skill-portfolio-item">
            <div className="skill-portfolio-left">
              <div className="skill-icon-badge">
                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>&lt;&gt;</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>React</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                    <Check size={12} strokeWidth={3} /> Verified
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Top 5% Global</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                91<span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>/100</span>
              </div>
              <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Score
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>
                Retake (Dec 2026)
              </div>
            </div>
          </div>

          {/* JavaScript Card */}
          <div className="skill-portfolio-item">
            <div className="skill-portfolio-left">
              <div className="skill-icon-badge" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
                <span style={{ fontWeight: 800 }}>JS</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>JavaScript</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 700, color: '#1E40AF', backgroundColor: '#EFF6FF', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                    <Check size={12} strokeWidth={3} /> Verified
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Top 15% Global</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                87<span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>/100</span>
              </div>
              <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Score
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>
                Retake (Jan 2027)
              </div>
            </div>
          </div>

          {/* Node.js Dashed Assessment Card */}
          <div className="skill-portfolio-item dashed">
            <div className="skill-portfolio-left">
              <div className="skill-icon-badge" style={{ backgroundColor: '#F1F5F9', color: '#64748B' }}>
                <span style={{ fontWeight: 800 }}>≡</span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>Node.js</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.725rem', fontWeight: 600, color: '#64748B', backgroundColor: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
                    ○ Not Verified
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Recommended for Full-Stack</span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  setCurrentQuestionIdx(0);
                  setIsTestActive(true);
                  showToast('Started Node.js Assessment session!', 'info');
                }}
                className="btn btn-secondary btn-sm"
                style={{ fontWeight: 700 }}
              >
                Take Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Active Session Card matching Screenshot #3 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.25rem' }}>
            Active Session
          </h2>

          <div className="assessment-active-card">
            {/* Header: Timer & Question Counter */}
            <div className="assessment-header">
              <div className="assessment-timer">
                <Clock size={16} color="#1E40AF" />
                <span>{formatTime(timeLeft)} Remaining</span>
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
                Question {currentQuestionIdx + 1} of {assessmentData.questions.length}
              </span>
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
                  cursor: currentQuestionIdx === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ArrowLeft size={16} /> Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-sm"
                style={{ minWidth: '95px' }}
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
      </div>

      {/* Bottom Section: Why Verify? Stats Strip matching Screenshot #3 */}
      <div className="why-verify-strip">
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.4rem' }}>
            Why Verify?
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
            Profiles with 3 or more verified skills receive <strong>4.2x more interview requests</strong> from enterprise clients. Our assessment engine is trusted by top tech companies globally.
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
            &lt;20m
          </div>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Avg. Test Time
          </div>
        </div>
      </div>

      {/* Assessment Results Modal (Section 16) */}
      {showResultModal && (
        <div className="modal-backdrop" onClick={() => setShowResultModal(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#1E40AF' }}>
                <Award size={36} />
              </div>

              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Assessment Complete
              </span>

              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Plus Jakarta Sans', sans-serif", margin: '0.25rem 0' }}>
                {finalScore} <span style={{ fontSize: '1.5rem', color: '#64748B', fontWeight: 500 }}>/ 100</span>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', borderRadius: '9999px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={16} /> React Verified — Top 5% Global
              </div>

              {/* Breakdown Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Hooks & State</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>96%</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Architecture</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>92%</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>Performance</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>88%</div>
                </div>
              </div>

              <button
                onClick={handleAddToProfile}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
              >
                Add Verified Badge to Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
