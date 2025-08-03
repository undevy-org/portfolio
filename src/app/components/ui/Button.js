// src/app/components/ui/Button.js
'use client';

import { useSession } from '../../context/SessionContext';
import { useState, useEffect } from 'react';

export default function Button({
  children,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  variant = 'full',
  disabled = false,
  className = '',
  showSuccessState = false,
  successText = null,
  successDuration = 2000
}) {
  const { theme } = useSession();
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle click with optional success state
  const handleClick = (e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }

    if (showSuccessState) {
      setIsSuccess(true);
    }
  };

  // Auto-reset success state after duration
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, successDuration);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, successDuration]);

  // Determine width classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'full':
        return 'w-full';
      case 'flex':
        return 'flex-1';
      case 'inline':
        return '';
      case 'icon-only':
        return '';
      default:
        return 'w-full';
    }
  };

  // Base button classes
  const baseClasses = `
    p-3 ${variant !== 'icon-only' ? 'border' : ''} rounded font-normal transition-colors
    flex items-center justify-center gap-2
    ${getVariantClasses()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  // Theme-based classes
  const themeClasses = theme === 'dark'
    ? `
      ${variant !== 'icon-only' ? 'border-dark-border' : ''}
      ${disabled ? '' : 'hover:bg-dark-hover'}
      ${isSuccess ? 'text-dark-success' : 'text-dark-text-primary'}
    `
  : `
      ${variant !== 'icon-only' ? 'border-light-border' : ''}
      ${disabled ? '' : 'hover:bg-light-hover'}
      ${isSuccess ? 'text-light-success' : 'text-light-text-primary'}
    `;

  // Combine all classes
  const buttonClasses = `${baseClasses} ${themeClasses} ${className}`.trim();

  // Determine what text to show
  const displayText = isSuccess && successText ? successText : children;

  // Render icon-only button
  if (!children && Icon) {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={buttonClasses}
        aria-label="Icon button"
      >
        <Icon className="w-5 h-5" />
      </button>
    );
  }

  // Render button with text (and optional icon)
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {displayText}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
}