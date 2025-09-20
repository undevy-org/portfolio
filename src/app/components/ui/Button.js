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
  const {} = useSession();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }

    if (showSuccessState) {
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, successDuration);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, successDuration]);

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

  // Hybrid CSS variables + Tailwind approach
  const baseClasses = [
    'p-3',
    'rounded',
    'font-normal',
    'font-mono', // Use monospace font like terminal
    'transition-all',
    'duration-200',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-primary',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:hover:bg-transparent',
    // Theme-aware styling using CSS variables via Tailwind
    'bg-btn-bg',
    'border',
    'border-border',
    'text-text',
    'hover:bg-btn-bg-hover',
    'hover:text-text',
    'hover:shadow-sm'
  ];

  const variantClasses = getVariantClasses();
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const textColorClass = isSuccess ? 'text-success' : 'text-text';
  const borderClass = variant !== 'icon-only' ? 'border' : '';

  const buttonClasses = [
    // Important: Remove conflicting Tailwind base classes and use our custom ones
    textColorClass,
    disabledClasses,
    borderClass,
    ...baseClasses.filter(cls => !['w-full', 'px-3', 'py-2', 'rounded', 'font-normal', 'font-mono', 'text-sm'].includes(cls)),
    variantClasses,
    className
  ].join(' ');

  const displayText = isSuccess && successText ? successText : children;

  const renderIcon = () => {
    if (!Icon) return null;
    return <Icon className="w-5 h-5 text-warning" />; // Use text-warning instead of text-command
  };

  const finalIcon = renderIcon();

  if (!children && finalIcon) {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={buttonClasses}
        aria-label="Icon button"
      >
        {finalIcon}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {finalIcon && iconPosition === 'left' && finalIcon}
      {displayText}
      {finalIcon && iconPosition === 'right' && finalIcon}
    </button>
  );
}
