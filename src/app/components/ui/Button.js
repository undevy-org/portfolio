// src/app/components/ui/Button.js
'use client';

import { useSession } from '../../context/SessionContext';
import { useState, useEffect } from 'react';

export default function Button({
  children,
  onClick,
  // CHANGE: The 'icon' prop is now correctly destructured as 'Icon' with a capital letter.
  // This standard practice signals that it's a React component, not a simple value.
  icon: Icon,
  iconPosition = 'left',
  variant = 'full',
  disabled = false,
  className = '',
  showSuccessState = false,
  successText = null,
  successDuration = 2000
}) {
  // REMOVED: The 'theme' variable is no longer needed here.
  // All theme logic is now handled by the semantic CSS classes.
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

  // COMMENT: getVariantClasses remains unchanged as it controls layout, not theme.
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

  // CHANGE: The 'baseClasses' and 'themeClasses' logic has been completely replaced.
  // We now construct the final className by combining a few base structural classes
  // with the new, powerful semantic classes from globals.css.
  const buttonClasses = [
    'p-3',
    'rounded',
    'font-normal',
    'transition-colors',
    'flex',
    'items-center',
    'justify-center',
    'gap-2',
    // COMMENT: Add semantic classes for theming. These adapt automatically.
    'btn-command', // This class from globals.css now handles border, color, and hover.
    isSuccess ? 'text-success' : 'text-primary', // Dynamically switch to success color if needed.
    // COMMENT: Layout and state classes are added conditionally.
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