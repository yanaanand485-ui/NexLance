import React, { useState, useEffect } from 'react';
import {
  X, Briefcase, UserCheck, Lock, Mail, User,
  ArrowRight, Building2, AlertCircle, CheckCircle,
  Eye, EyeOff, Zap, LogIn, UserPlus, Check, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

// Helper: Convert email (e.g. rohit.sharma@gmail.com) into a readable name ("Rohit Sharma")
const formatNameFromEmail = (rawEmail) => {
  if (!rawEmail || !rawEmail.includes('@')) return '';
  return rawEmail
    .split('@')[0]
    .replace(/[._\-+0-9]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

// Beginner-friendly reusable Input Field with icon support
const InputField = ({ label, labelRight, icon: Icon, rightElement, ...props }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>{label}</label>
      {labelRight}
    </div>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />}
      <input
        style={{
          width: '100%',
          padding: rightElement ? '0.65rem 2.5rem 0.65rem 2.4rem' : '0.65rem 1rem 0.65rem 2.4rem',
          borderRadius: '8px',
          border: '1px solid #CBD5E1',
          fontSize: '0.875rem',
          outline: 'none'
        }}
        {...props}
      />
      {rightElement}
    </div>
  </div>
);

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

  // Form State
  const [email, setEmail] = useState(() => currentUserAccount?.email || '');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(() => currentUserAccount?.name || '');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback State
  const [errorMessage, setErrorMessage] = useState('');
  const [errorReason, setErrorReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [transferNotice, setTransferNotice] = useState('');
  const [pendingSignupTransfer, setPendingSignupTransfer] = useState(false);

  // Helpers & Derived State
  const isClient = authRoleChoice === 'client';
  const themeColor = isClient ? '#1E40AF' : '#059669';
  const themeBg = isClient ? '#EFF6FF' : '#ECFDF5';
  const themeBorder = isClient ? '#BFDBFE' : '#A7F3D0';

  // Password Validation Rules
  const hasMinLength = password.length >= 6;
  const hasCapital = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const resetAlerts = () => {
    setErrorMessage('');
    setErrorReason('');
    setSuccessMessage('');
    setTransferNotice('');
  };

  // Effect 1: Auto-transfer credentials to Sign Up if account doesn't exist
  useEffect(() => {
    if (pendingSignupTransfer) {
      setAuthMode('signup');
      if (!fullName.trim() && email.trim()) {
        const suggested = formatNameFromEmail(email);
        if (suggested) setFullName(suggested);
      }
      setTransferNotice(`No existing account found for "${email}". We've transferred your email & password to Get Started — please complete your name to create your account!`);
      setErrorMessage('');
      setErrorReason('');
      setPendingSignupTransfer(false);
    }
  }, [pendingSignupTransfer, email, fullName, setAuthMode]);

  // Effect 2: Suggest name when switching to Sign Up with email already entered
  useEffect(() => {
    if (authMode === 'signup' && email.trim() && !fullName.trim()) {
      const suggested = formatNameFromEmail(email);
      if (suggested) setFullName(suggested);
    }
  }, [authMode, email, fullName]);

  const handleSwitchMode = (mode) => {
    setAuthMode(mode);
    resetAlerts();
  };

  const handleSwitchRole = (role) => {
    setAuthRoleChoice(role);
    resetAlerts();
  };

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setPassword('');
    resetAlerts();
    setPendingSignupTransfer(false);
  };

  const handleFillDemo = (demoEmail, demoPassword, demoRole) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setAuthRoleChoice(demoRole);
    resetAlerts();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetAlerts();

    if (authMode === 'signup') {
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

      const result = registerUser({
        name: fullName.trim(),
        email: email.trim(),
        password,
        role: authRoleChoice,
        companyName: companyName.trim()
      });

      if (!result.success) {
        setErrorMessage(result.message);
        setErrorReason(result.reason);
      } else {
        setSuccessMessage('Account created successfully! Redirecting...');
        setTimeout(() => setIsAuthModalOpen(false), 500);
      }
    } else {
      const result = loginUser({
        email: email.trim(),
        password,
        role: authRoleChoice
      });

      if (!result.success) {
        if (result.reason === 'USER_NOT_FOUND') {
          setPendingSignupTransfer(true);
        } else {
          setErrorMessage(result.message);
          setErrorReason(result.reason);
        }
      } else {
        setSuccessMessage('Credentials verified! Logging you in...');
        setTimeout(() => setIsAuthModalOpen(false), 500);
      }
    }
  };

  if (!isAuthModalOpen) return null;

  // Demo accounts data
  const demoAccounts = isClient
    ? [
        { label: '🏢 Sarah Jenkins (Meridian Retail):', email: 'sarah@meridian.com' },
        { label: '💼 Enterprise Client:', email: 'client@nexlance.dev' }
      ]
    : [
        { label: '🌟 Sarah Jenkins (Full Stack Developer · Score 95):', email: 'sarah@nexlance.dev' }
      ];

  return (
    <div className="modal-backdrop" onClick={handleClose}>
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
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.725rem',
              fontWeight: 800,
              color: themeColor,
              backgroundColor: themeBg,
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              border: `1px solid ${themeBorder}`,
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
            onClick={handleClose}
            style={{
              padding: '0.45rem',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mode Switch: Get Started vs Log In */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', backgroundColor: '#F1F5F9', padding: '0.25rem', borderRadius: '12px', gap: '0.25rem', marginBottom: '1.1rem' }}>
          {[
            { id: 'signup', label: 'Get Started', icon: UserPlus },
            { id: 'login', label: 'Log In', icon: LogIn }
          ].map(({ id, label, icon: TabIcon }) => {
            const active = authMode === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSwitchMode(id)}
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
                  backgroundColor: active ? '#FFFFFF' : 'transparent',
                  color: active ? '#0F172A' : '#64748B',
                  boxShadow: active ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                <TabIcon size={15} color={active ? themeColor : '#64748B'} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Role Selector: Client vs Freelancer */}
        <div style={{ display: 'flex', gap: '0.4rem', backgroundColor: '#F8FAFC', padding: '0.25rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.1rem' }}>
          {[
            { id: 'client', label: 'I want to Hire (Client)', icon: Briefcase, color: '#1E40AF', shadow: 'rgba(30, 64, 175, 0.25)' },
            { id: 'freelancer', label: 'I want to Work (Freelancer)', icon: UserCheck, color: '#059669', shadow: 'rgba(5, 150, 105, 0.25)' }
          ].map(({ id, label, icon: RoleIcon, color, shadow }) => {
            const active = authRoleChoice === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSwitchRole(id)}
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
                  backgroundColor: active ? color : 'transparent',
                  color: active ? '#FFFFFF' : '#64748B',
                  boxShadow: active ? `0 2px 6px ${shadow}` : 'none'
                }}
              >
                <RoleIcon size={13} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Transfer Notice Banner */}
        {transferNotice && authMode === 'signup' && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1E40AF', fontSize: '0.825rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            <Sparkles size={17} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 800, color: '#1E40AF', marginBottom: '2px' }}>✨ Credentials Transferred to Get Started!</div>
              <div style={{ color: '#1E3A8A' }}>{transferNotice}</div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', fontSize: '0.825rem', marginBottom: '1rem', lineHeight: 1.4 }}>
            <AlertCircle size={17} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{errorMessage}</div>
              {(errorReason === 'NOT_FOUND' || errorReason === 'USER_NOT_FOUND') && (
                <div style={{ marginTop: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => setPendingSignupTransfer(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: themeColor, color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    <span>Transfer to Get Started (Sign Up)</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
              {errorReason === 'ALREADY_EXISTS' && (
                <div style={{ marginTop: '0.45rem' }}>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem', borderRadius: '6px', backgroundColor: '#DC2626', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    <span>Click here to Log In</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Banner */}
        {successMessage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.85rem 1rem', borderRadius: '10px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#047857', fontSize: '0.825rem', marginBottom: '1rem', fontWeight: 600 }}>
            <CheckCircle size={17} style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Full Name (Sign Up only) */}
          {authMode === 'signup' && (
            <InputField
              label={isClient ? 'Contact Person / Full Name *' : 'Full Name *'}
              icon={User}
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder={isClient ? 'e.g. Vikram Sharma' : 'e.g. Rahul Verma'}
            />
          )}

          {/* Company Name (Sign Up & Client only) */}
          {authMode === 'signup' && isClient && (
            <InputField
              label="Company / Organization Name"
              icon={Building2}
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. NexaTech Innovations"
            />
          )}

          {/* Email Address */}
          <InputField
            label={isClient ? 'Business Email Address *' : 'Email Address *'}
            icon={Mail}
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={isClient ? 'client@company.com' : 'freelancer@example.com'}
          />

          {/* Password with Requirements */}
          <div>
            <InputField
              label="Password *"
              labelRight={
                authMode === 'login' && (
                  <span
                    onClick={() => alert('For demo testing, use the pre-saved demo accounts or click "Get Started" to create a new password.')}
                    style={{ fontSize: '0.75rem', color: themeColor, fontWeight: 600, cursor: 'pointer' }}
                  >
                    Forgot?
                  </span>
                )
              }
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={authMode === 'signup' ? 'Create a strong password' : 'Enter your password'}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px', display: 'flex', alignItems: 'center' }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            {/* Password Constraints Checklist */}
            {authMode === 'signup' && (
              <div style={{ marginTop: '0.45rem', padding: '0.45rem 0.65rem', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.725rem' }}>
                <div style={{ fontWeight: 700, color: '#475569', marginBottom: '1px' }}>Password Requirements:</div>
                {[
                  { label: 'At least 6 characters', valid: hasMinLength },
                  { label: 'At least 1 uppercase / capital letter (A-Z)', valid: hasCapital },
                  { label: 'At least 1 number (0-9)', valid: hasNumber }
                ].map((req, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: req.valid ? '#059669' : '#64748B', fontWeight: req.valid ? 600 : 400 }}>
                    <Check size={13} color={req.valid ? '#059669' : '#CBD5E1'} strokeWidth={req.valid ? 3 : 2} />
                    <span>{req.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.75rem',
              marginTop: '0.3rem',
              fontSize: '0.925rem',
              fontWeight: 700,
              backgroundColor: themeColor,
              borderColor: themeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: `0 4px 12px ${isClient ? 'rgba(30, 64, 175, 0.25)' : 'rgba(5, 150, 105, 0.25)'}`
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

          {/* Demo Log In Shortcuts */}
          {authMode === 'login' && (
            <div style={{ marginTop: '0.5rem', padding: '0.7rem', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.725rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <Zap size={13} color="#F59E0B" />
                  <span>One-Click {isClient ? 'Client' : 'Freelancer'} Credentials:</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: themeColor, fontWeight: 700 }}>pass: Password123</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleFillDemo(account.email, 'Password123', authRoleChoice)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      fontSize: '0.75rem',
                      color: '#0F172A',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 700, color: themeColor }}>{account.label} </span>
                      <span>{account.email}</span>
                    </div>
                    <span style={{ color: themeColor, fontWeight: 600, fontSize: '0.7rem' }}>Use Login ➔</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Switch Mode Footer Link */}
          <div style={{ textAlign: 'center', marginTop: '0.3rem', fontSize: '0.825rem', color: '#64748B' }}>
            {authMode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('signup')}
                  style={{ fontWeight: 700, color: themeColor, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Get Started (Create Account)
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleSwitchMode('login')}
                  style={{ fontWeight: 700, color: themeColor, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
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
