import React, { useState, useEffect } from 'react';
import { X, Briefcase, UserCheck, Lock, Mail, User, ArrowRight, Building2, Sparkles, ShieldCheck } from 'lucide-react';
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

  // Reset or initialize fields when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setEmail('');
      setPassword('');
      setFullName('');
      setCompanyName('');
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const isClient = authRoleChoice === 'client';
  const isFreelancer = authRoleChoice === 'freelancer';

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithUser({
      name: fullName.trim() || (email ? email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : isClient ? 'Client Partner' : 'Developer'),
      email: email.trim(),
      role: authRoleChoice,
      companyName: companyName.trim()
    });
    setIsAuthModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div className="modal-card" style={{ maxWidth: '480px', borderRadius: '18px', padding: '2rem' }} onClick={e => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.725rem',
              fontWeight: 800,
              color: isClient ? '#1E40AF' : '#059669',
              backgroundColor: isClient ? '#EFF6FF' : '#ECFDF5',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              border: `1px solid ${isClient ? '#BFDBFE' : '#A7F3D0'}`,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}>
              {isClient ? <Briefcase size={12} /> : <UserCheck size={12} />}
              <span>{isClient ? 'Client Portal • Hire Talent' : 'Freelancer Portal • Find Work'}</span>
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {authMode === 'login'
                ? (isClient ? 'Client Sign In' : 'Freelancer Sign In')
                : (isClient ? 'Create Client Account' : 'Create Freelancer Account')}
            </h2>

            <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '0.35rem' }}>
              {isClient
                ? 'Sign in to discover pre-verified candidates & post projects.'
                : 'Sign in to access high-ticket projects & prove your skills.'}
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        {/* Role Switcher Pill (Only if user wants to switch between client/freelancer) */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#F8FAFC', padding: '0.3rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setAuthRoleChoice('client')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.5rem',
              borderRadius: '7px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: isClient ? '#1E40AF' : 'transparent',
              color: isClient ? '#FFFFFF' : '#64748B',
              boxShadow: isClient ? '0 2px 6px rgba(30, 64, 175, 0.25)' : 'none'
            }}
          >
            <Briefcase size={13} />
            <span>I want to Hire (Client)</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthRoleChoice('freelancer')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.5rem',
              borderRadius: '7px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: isFreelancer ? '#059669' : 'transparent',
              color: isFreelancer ? '#FFFFFF' : '#64748B',
              boxShadow: isFreelancer ? '0 2px 6px rgba(5, 150, 105, 0.25)' : 'none'
            }}
          >
            <UserCheck size={13} />
            <span>I want to Work (Freelancer)</span>
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
              {isClient ? 'Contact Person / Your Name' : 'Full Name'}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder={isClient ? "e.g. Vikram Sharma" : "e.g. Rahul Verma"}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Company Name (for Client) */}
          {isClient && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                Company / Organization Name
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. NexaTech Global / Freelance Project"
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.4rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.875rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
              {isClient ? 'Business Email Address' : 'Email Address'}
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={isClient ? "client@company.com" : "freelancer@example.com"}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                Password
              </label>
              {authMode === 'login' && (
                <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: 600, cursor: 'pointer' }}>
                  Forgot?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.4rem',
              fontSize: '0.925rem',
              fontWeight: 700,
              backgroundColor: isClient ? '#1E40AF' : '#059669',
              borderColor: isClient ? '#1E40AF' : '#059669'
            }}
          >
            {authMode === 'login'
              ? (isClient ? 'Log In as Client' : 'Log In as Freelancer')
              : (isClient ? 'Create Client Account & Find Talent' : 'Create Freelancer Account & Find Work')}
          </button>

          {/* Mode Switch (Login vs Signup) */}
          <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.825rem', color: '#64748B' }}>
            {authMode === 'login' ? (
              <>
                New to NexLance?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  style={{ fontWeight: 700, color: isClient ? '#1E40AF' : '#059669', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Create {isClient ? 'Client' : 'Freelancer'} Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  style={{ fontWeight: 700, color: isClient ? '#1E40AF' : '#059669', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
