import React from 'react';
import { ArrowLeft, ChevronRight, LayoutDashboard, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

/**
 * Reusable Back / Back to Dashboard Navigation Header
 *
 * @param {Object} props
 * @param {string} [props.label] - Custom label for the back button (default: 'Back to Dashboard')
 * @param {string} [props.fallbackView] - Fallback view if no browser history is available
 * @param {boolean} [props.showDashboardDirect] - Whether to show an additional direct "Dashboard" shortcut button
 * @param {Array<{label: string, view?: string, onClick?: () => void}>} [props.breadcrumbs] - Optional breadcrumbs array
 * @param {Object} [props.style] - Custom wrapper style
 */
export const BackToDashboardButton = ({
  label,
  fallbackView,
  showDashboardDirect = false,
  breadcrumbs = [],
  style = {}
}) => {
  const { role, goBack, goToDashboard, navigateTo } = useApp();

  const isPublic = role === 'public';
  const defaultLabel = isPublic ? 'Back to Home' : 'Back to Dashboard';
  const buttonLabel = label || defaultLabel;

  return (
    <div
      className="back-nav-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '0.65rem 1rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)',
        ...style
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        {/* Main Smart Back Button */}
        <button
          type="button"
          onClick={() => goBack(fallbackView)}
          className="back-nav-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 0.85rem',
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            color: '#1E40AF',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none'
          }}
          title={buttonLabel}
        >
          <ArrowLeft size={16} className="back-arrow-icon" />
          <span>{buttonLabel}</span>
        </button>

        {/* Direct Dashboard Home Shortcut Pill (if on deeper detail sub-page) */}
        {showDashboardDirect && !isPublic && (
          <button
            type="button"
            onClick={goToDashboard}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#475569',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Go straight to main Dashboard"
          >
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </button>
        )}
      </div>

      {/* Breadcrumbs Navigation Trail */}
      {breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.825rem',
            color: '#64748B',
            flexWrap: 'wrap'
          }}
        >
          {/* Root Breadcrumb Item */}
          <span
            onClick={isPublic ? () => navigateTo('landing') : goToDashboard}
            style={{
              cursor: 'pointer',
              color: '#1E40AF',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            {isPublic ? <Home size={13} /> : <LayoutDashboard size={13} />}
            {isPublic ? 'Home' : 'Dashboard'}
          </span>

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                <ChevronRight size={13} color="#94A3B8" />
                {isLast ? (
                  <span
                    style={{
                      color: '#0F172A',
                      fontWeight: 700,
                      maxWidth: '240px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      if (crumb.onClick) crumb.onClick();
                      else if (crumb.view) navigateTo(crumb.view);
                    }}
                    style={{
                      cursor: crumb.view || crumb.onClick ? 'pointer' : 'default',
                      color: '#1E40AF',
                      fontWeight: 600
                    }}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </div>
  );
};
