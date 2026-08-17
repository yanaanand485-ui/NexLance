import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const iconMap = {
    success: <CheckCircle2 size={18} color="#059669" />,
    error: <AlertCircle size={18} color="#DC2626" />,
    warning: <AlertCircle size={18} color="#D97706" />,
    info: <Info size={18} color="#2563EB" />
  };

  const bgMap = {
    success: '#ECFDF5',
    error: '#FEF2F2',
    warning: '#FFFBEB',
    info: '#EFF6FF'
  };

  const borderMap = {
    success: '#A7F3D0',
    error: '#FECACA',
    warning: '#FDE68A',
    info: '#BFDBFE'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 120,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.85rem 1.25rem',
        borderRadius: '10px',
        backgroundColor: bgMap[toastMessage.type] || '#FFFFFF',
        border: `1px solid ${borderMap[toastMessage.type] || '#E2E8F0'}`,
        boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.12)',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: '#0F172A',
        animation: 'slideUp 0.25s ease-out',
        maxWidth: '420px'
      }}
    >
      {iconMap[toastMessage.type] || iconMap.info}
      <span>{toastMessage.message}</span>
    </div>
  );
};
