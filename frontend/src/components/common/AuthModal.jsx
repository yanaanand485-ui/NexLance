import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  UserCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  Building2,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Zap,
  LogIn,
  UserPlus,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    authRoleChoice,
    setAuthRoleChoice,
    registerUser,
    loginUser,
    currentUserAccount
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorReason, setErrorReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Password Constraint Checks
  const hasMinLength = password.length >= 6;
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasCapital && hasNumber;

  // Reset or clear errors when modal opens or mode changes
  useEffect(() => {
    setErrorMessage('');
    setErrorReason('');
    setSuccessMessage('');
  }, [isAuthModalOpen, authMode, authRoleChoice]);

  // Reset password field and optionally pre-fill name/email when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setPassword('');
      setErrorMessage('');
      setErrorReason('');
      setSuccessMessage('');
      if (currentUserAccount) {
        if (!fullName) setFullName(currentUserAccount.name || '');
        if (!email) setEmail(currentUserAccount.email || '');
      }
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const isClient = authRoleChoice === 'client';
  const isFreelancer = authRoleChoice === 'freelancer';

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorReason('');
    setSuccessMessage('');

    if (authMode === 'signup') {
      // Validate password constraints first
      if (!hasMinLength) {
        setErrorMessage('Password must be at least 6 characters long.');
        setErrorReason('PASSWORD_TOO_SHORT');
        return;
      }
      if (!hasCapital) {
        setErrorMessage('Password must contain at least one capital letter (A-Z).');
        setErrorReason('PASSWORD_NO_UPPERCASE');
        return;
      }
      if (!hasNumber) {
        setErrorMessage('Password must contain at least one number (0-9).');
        setErrorReason('PASSWORD_NO_NUMBER');
        return;
      }

      // Sign Up / Get Started Flow
      const result = registerUser({
        name: fullName.trim(),
        email: email.trim(),
        password: password,
        role: authRoleChoice,
        companyName: companyName.trim()
      });

      if (!result.success) {
        setErrorMessage(result.message);
        setErrorReason(result.reason);
      } else {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 500);
      }
    } else {
      // Log In Flow
      const result = loginUser({
        email: email.trim(),
        password: password,
        role: authRoleChoice
      });

      if (!result.success) {
        setErrorMessage(result.message);
        setErrorReason(result.reason);
      } else {
        setSuccessMessage('Credentials verified! Logging you in...');
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 500);
      }
    }
  };

  // Quick Demo Auto-Filler for testing existing users
  const handleFillDemo = (demoEmail, demoPassword, demoRole) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setAuthRoleChoice(demoRole);
    setErrorMessage('');
    setErrorReason('');
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="modal-card"
        style={{
          maxWidth: '480px',
          width: '92%',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          background: '#FFFFFF'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.725rem',
              fontWeight: 800,
              color: isClient ? '#1E40AF' : '#059669',
              backgroundColor: isClient ? '#EFF6FF' : '#ECFDF5',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: `1px solid ${isClient ? '#BFDBFE' : '#A7F3D0'}`,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              {isClient ? <Briefcase size={12} /> : <UserCheck size={12} />}
              <span>{isClient ? 'Client Portal • Hire Talent' : 'Freelancer Portal • Find Work'}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
              {authMode === 'signup'
                ? (isClient ? 'Get Started as Client' : 'Get Started as Freelancer')
                : (isClient ? 'Sign In to Client Account' : 'Sign In to Freelancer Account')}
            </h2>

            <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '0.3rem' }}>
              {authMode === 'signup'
                ? (isClient
                  ? 'Create a free client account to post projects and hire verified talent.'
                  : 'Create a free freelancer account to verify skills and get high-paying projects.')
                : (isClient
                  ? 'Sign in to access your client dashboard and candidate matches.'
                  : 'Sign in to access your career score, skills, and projects.')}
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              padding: '0.45rem',
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
            <X size={18} />
          </button>
        </div>

        {/* Single Main Switch: Get Started vs Log In */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          backgroundColor: '#F1F5F9',
          padding: '0.25rem',
          borderRadius: '12px',
          gap: '0.25rem',
          marginBottom: '1.1rem'
        }}>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              padding: '0.55rem 0.5rem',
              borderRadius: '9px',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: authMode === 'signup' ? '#FFFFFF' : 'transparent',
              color: authMode === 'signup' ? '#0F172A' : '#64748B',
              boxShadow: authMode === 'signup' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <UserPlus size={15} color={authMode === 'signup' ? (isClient ? '#1E40AF' : '#059669') : '#64748B'} />
            <span>Get Started</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              padding: '0.55rem 0.5rem',
              borderRadius: '9px',
              fontSize: '0.85rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: authMode === 'login' ? '#FFFFFF' : 'transparent',
              color: authMode === 'login' ? '#0F172A' : '#64748B',
              boxShadow: authMode === 'login' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            <LogIn size={15} color={authMode === 'login' ? (isClient ? '#1E40AF' : '#059669') : '#64748B'} />
            <span>Log In</span>
          </button>
        </div>

        {/* Role Selector */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#F8FAFC', padding: '0.25rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.1rem' }}>
          <button
            type="button"
            onClick={() => setAuthRoleChoice('client')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              padding: '0.45rem',
              borderRadius: '7px',
              fontSize: '0.785rem',
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
              padding: '0.45rem',
              borderRadius: '7px',
              fontSize: '0.785rem',
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

        {/* Error Alert Banner */}
        {errorMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            fontSize: '0.825rem',
            marginBottom: '1rem',
            lineHeight: 1.4
          }}>
            <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{errorMessage}</div>
              {errorReason === 'NOT_FOUND' && (
                <div style={{ marginTop: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage('');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Click here to Get Started (Sign Up)</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
              {errorReason === 'ALREADY_EXISTS' && (
                <div style={{ marginTop: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage('');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#DC2626',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Click here to Log In</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {successMessage && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.85rem 1rem',
            borderRadius: '10px',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            color: '#047857',
            fontSize: '0.825rem',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            <CheckCircle size={17} style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Full Name (Sign Up only) */}
          {authMode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                {isClient ? 'Contact Person / Full Name *' : 'Full Name *'}
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
          )}

          {/* Company Name (Sign Up & Client only) */}
          {authMode === 'signup' && isClient && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                Company / Organization Name
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. NexaTech Innovations"
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

          {/* Email Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
              {isClient ? 'Business Email Address *' : 'Email Address *'}
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                Password *
              </label>
              {authMode === 'login' && (
                <span
                  onClick={() => alert('For demo testing, use the pre-saved demo accounts or click "Get Started" to create a new password.')}
                  style={{ fontSize: '0.75rem', color: isClient ? '#1E40AF' : '#059669', fontWeight: 600, cursor: 'pointer' }}
                >
                  Forgot?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={authMode === 'signup' ? "Create a strong password" : "Enter your password"}
                style={{
                  width: '100%',
                  padding: '0.65rem 2.5rem 0.65rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Constraints Checklist for Sign Up */}
            {authMode === 'signup' && (
              <div style={{
                marginTop: '0.45rem',
                padding: '0.45rem 0.65rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                fontSize: '0.725rem'
              }}>
                <div style={{ fontWeight: 700, color: '#475569', marginBottom: '1px' }}>
                  Password Requirements:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: hasMinLength ? '#059669' : '#64748B', fontWeight: hasMinLength ? 600 : 400 }}>
                  <Check size={13} color={hasMinLength ? '#059669' : '#CBD5E1'} strokeWidth={hasMinLength ? 3 : 2} />
                  <span>At least 6 characters</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: hasCapital ? '#059669' : '#64748B', fontWeight: hasCapital ? 600 : 400 }}>
                  <Check size={13} color={hasCapital ? '#059669' : '#CBD5E1'} strokeWidth={hasCapital ? 3 : 2} />
                  <span>At least 1 uppercase / capital letter (A-Z)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: hasNumber ? '#059669' : '#64748B', fontWeight: hasNumber ? 600 : 400 }}>
                  <Check size={13} color={hasNumber ? '#059669' : '#CBD5E1'} strokeWidth={hasNumber ? 3 : 2} />
                  <span>At least 1 number (0-9)</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.3rem',
              fontSize: '0.925rem',
              fontWeight: 700,
              backgroundColor: isClient ? '#1E40AF' : '#059669',
              borderColor: isClient ? '#1E40AF' : '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: isClient ? '0 4px 12px rgba(30, 64, 175, 0.25)' : '0 4px 12px rgba(5, 150, 105, 0.25)'
            }}
          >
            {authMode === 'signup' ? (
              <>
                <UserPlus size={16} />
                <span>{isClient ? 'Create Client Account' : 'Create Freelancer Account'}</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>{isClient ? 'Sign In as Client' : 'Sign In as Freelancer'}</span>
              </>
            )}
          </button>

          {/* Quick Demo Test Fillers (Available on Log In tab) */}
          {authMode === 'login' && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.7rem',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px dashed #CBD5E1'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem' }}>
                <Zap size={13} color="#F59E0B" />
                <span>One-Click Demo Credentials:</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <button
                  type="button"
                  onClick={() => handleFillDemo('sarah@nexlance.dev', 'Password123', 'freelancer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.75rem',
                    color: '#0F172A',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#059669' }}>🌟 Sarah (Old Freelancer · Score 95):</span> sarah@nexlance.dev
                  </div>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>pass: Password123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo('alex@nexlance.dev', 'Password123', 'freelancer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.75rem',
                    color: '#0F172A',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#059669' }}>💻 Alex (Old Freelancer · Score 91):</span> alex@nexlance.dev
                  </div>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>pass: Password123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo('priya@nexlance.dev', 'Password123', 'freelancer')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.75rem',
                    color: '#0F172A',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#059669'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#059669' }}>🎨 Priya (Old Freelancer · Score 94):</span> priya@nexlance.dev
                  </div>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>pass: Password123</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFillDemo('sarah@meridian.com', 'Password123', 'client')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.75rem',
                    color: '#0F172A',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1E40AF'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: '#1E40AF' }}>Client:</span> sarah@meridian.com
                  </div>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>pass: Password123</span>
                </button>
              </div>
            </div>
          )}

          {/* Mode Switch Helper Link */}
          <div style={{ textAlign: 'center', marginTop: '0.3rem', fontSize: '0.825rem', color: '#64748B' }}>
            {authMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  style={{ fontWeight: 700, color: isClient ? '#1E40AF' : '#059669', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Get Started (Create Account)
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  style={{ fontWeight: 700, color: isClient ? '#1E40AF' : '#059669', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Log In directly
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
