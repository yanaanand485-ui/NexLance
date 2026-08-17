import React, { useState } from 'react';
import { X, Briefcase, UserCheck, Lock, Mail, User, ArrowRight, Check, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    authRoleChoice,
    setAuthRoleChoice,
    loginWithUser
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [step, setStep] = useState(1); // For signup: Step 1 = role select, Step 2 = form

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithUser({
      name: fullName || (email ? email.split('@')[0].replace(/[._]/g, ' ') : ''),
      email: email,
      role: authRoleChoice,
      companyName: companyName
    });
    setIsAuthModalOpen(false);
  };

  const handleRoleSelect = (selected) => {
    setAuthRoleChoice(selected);
    setStep(2);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {authMode === 'login' ? 'Welcome Back' : 'Get Started with NexLance'}
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginTop: '0.2rem' }}>
              {authMode === 'login' ? 'Sign in to your account' : (step === 1 ? 'What are you here to do?' : 'Create your NexLance account')}
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{ padding: '0.35rem', borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#64748B', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Signup Step 1: Role Selection */}
        {authMode === 'signup' && step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '1rem 0 1.5rem' }}>
            <div
              onClick={() => handleRoleSelect('freelancer')}
              style={{
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UserCheck size={24} color="#1E40AF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>I WANT TO WORK</h3>
                  <p style={{ fontSize: '0.825rem', color: '#64748B' }}>Prove skills, build Career Score, and win high-ticket contracts.</p>
                </div>
              </div>
              <ArrowRight size={20} color="#1E40AF" />
            </div>

            <div
              onClick={() => handleRoleSelect('client')}
              style={{
                border: '2px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#1E40AF'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={24} color="#1E40AF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>I WANT TO HIRE</h3>
                  <p style={{ fontSize: '0.825rem', color: '#64748B' }}>Post projects and find pre-verified, high-reliability talent.</p>
                </div>
              </div>
              <ArrowRight size={20} color="#1E40AF" />
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#64748B' }}>Already have an account? </span>
              <button
                onClick={() => { setAuthMode('login'); setStep(1); }}
                style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {/* Form: Login or Signup Step 2 */}
        {(authMode === 'login' || (authMode === 'signup' && step === 2)) && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {authMode === 'login' && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setAuthRoleChoice('freelancer')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: authRoleChoice === 'freelancer' ? '#1E40AF' : '#E2E8F0',
                    backgroundColor: authRoleChoice === 'freelancer' ? '#EFF6FF' : '#FFFFFF',
                    color: authRoleChoice === 'freelancer' ? '#1E40AF' : '#64748B'
                  }}
                >
                  Freelancer Account
                </button>
                <button
                  type="button"
                  onClick={() => setAuthRoleChoice('client')}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '8px',
                    fontSize: '0.825rem',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: authRoleChoice === 'client' ? '#1E40AF' : '#E2E8F0',
                    backgroundColor: authRoleChoice === 'client' ? '#EFF6FF' : '#FFFFFF',
                    color: authRoleChoice === 'client' ? '#1E40AF' : '#64748B'
                  }}
                >
                  Client Account
                </button>
              </div>
            )}

            {/* Name input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                {authMode === 'login' ? 'Your Name' : 'Full Name'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder={authRoleChoice === 'freelancer' ? "e.g. Alex Rivera or your name" : "e.g. Sarah Jenkins or your name"}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Company name if signing up as Client */}
            {authRoleChoice === 'client' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Company / Organization Name
                </label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Meridian Retail Global"
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem 0.65rem 2.5rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Work Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.825rem', fontWeight: 600, color: '#334155' }}>
                  Password
                </label>
                {authMode === 'login' && (
                  <a href="#forgot" style={{ fontSize: '0.775rem', color: '#1E40AF', fontWeight: 600 }}>Forgot password?</a>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '0.95rem' }}
            >
              {authMode === 'login' ? `Log In as ${fullName ? fullName : authRoleChoice === 'freelancer' ? 'Freelancer' : 'Client'}` : 'Create Account & Continue'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.85rem', color: '#64748B' }}>
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signup'); setStep(1); }}
                    style={{ fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setStep(1); }}
                    style={{ fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
                  >
                    Log In
                  </button>
                </>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
