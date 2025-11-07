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

  const buttonClasses = [
    'p-3',
    'rounded',
    'font-normal',
    'transition-colors',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    'btn-command', // This class from globals.css now handles border, color, and hover.
    isSuccess ? 'text-success' : 'text-primary', // Dynamically switch to success color if needed.
    getVariantClasses(),
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    variant !== 'icon-only' ? 'border' : '',
    className, // Append any custom classes passed in props.
  ].join(' '); // Join all classes into a single string.


  const displayText = isSuccess && successText ? successText : children;

  const renderIcon = () => {
    if (!Icon) return null;
    return <Icon className="w-5 h-5 text-command" />;
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