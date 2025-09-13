// src/app/components/ScreenWrapper.js
'use client';

import { useEffect, useState } from 'react';
import { useSession } from '../context/SessionContext';

/**
 * ScreenWrapper Component
 * 
 * This component solves a critical problem identified in Phase 1:
 * inconsistent wrapper patterns across screens causing layout instability.
 * 
 * Current situation (problematic):
 * - Entry: <div className="p-4 max-w-md mx-auto">
 * - MainHub: <div className="p-4">
 * - Introduction: <div className="p-4 font-mono">
 * - CaseDetail: <div className="p-4 space-y-4">
 * 
 * Solution: ONE consistent wrapper for ALL screens.
 * 
 * Benefits:
 * 1. Predictable layout behavior
 * 2. Easier maintenance (change padding in one place)
 * 3. Consistent spacing across all screens
 * 4. No more layout recalculation due to wrapper differences
 */
export default function ScreenWrapper({ 
  children, 
  className = '', 
  noPadding = false,
  testId = 'screen-wrapper',
  title,
  subtitle,
  icon
}) {
  const { currentScreen } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  
  // Track mount state for potential animation hooks
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  /**
   * Base classes that EVERY screen gets:
   * 
   * - w-full: Take full width of container
   * - min-h-full: Minimum height of parent (prevents collapse)
   * - relative: Establish positioning context for absolute children
   * 
   * The padding is the most important part - it's what was inconsistent before.
   * We use p-4 (1rem) as the standard, matching what most screens already use.
   */
  const baseClasses = `
    screen-wrapper
    w-full
    min-h-full
    relative
    ${!noPadding ? 'p-4' : ''}
    ${className}
  `;
  
  /**
   * Screen-specific adjustments:
   * 
   * Some screens might need special treatment, but we handle this
   * through additional classes, not by changing the base structure.
   * This maintains consistency while allowing flexibility.
   */
  const getScreenSpecificClasses = () => {
    switch (currentScreen) {
      case 'Entry':
        // Entry screen needs centering for the login form
        // But we do it WITHOUT changing the wrapper structure
        return 'flex items-center justify-center';
      
      case 'ProfileBoot':
        // ProfileBoot might need full height for animation
        return 'flex flex-col justify-center';
      
      case 'CaseDetail':
      case 'SkillDetail':
      case 'RoleDetail':
        // Detail screens often have multiple sections
        // space-y-4 provides consistent spacing between sections
        return 'space-y-4';
      
      default:
        // Most screens just need the base wrapper
        return '';
    }
  };
  
  /**
   * Data attributes for testing and debugging:
   * 
   * These attributes make it easy to:
   * 1. Target the wrapper in tests
   * 2. Identify which screen is wrapped in DevTools
   * 3. Track mount state for debugging animations
   */
  const dataAttributes = {
    'data-testid': testId,
    'data-screen': currentScreen,
    'data-mounted': isMounted
  };
  
  return (
    <div 
      className={`${baseClasses} ${getScreenSpecificClasses()}`.trim()}
      {...dataAttributes}
    >
      {/* Render title, subtitle, and icon if provided */}
      {(title || subtitle || icon) && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            {icon && <span className="text-lg">{icon}</span>}
            {title && <h1 className="text-xl font-bold text-command">{title}</h1>}
          </div>
          {subtitle && <p className="text-sm text-secondary">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}