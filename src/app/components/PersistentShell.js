// src/app/components/PersistentShell.js
'use client';

import { useMemo, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import TerminalWindow from '../layouts/TerminalWindow';
import AnimatedScreenTransition from './AnimatedScreenTransition';
import ScreenRenderer from './ScreenRenderer';

/**
 * PersistentShell - Ensures TerminalWindow remains mounted throughout the session
 * 
 * This component implements the persistent application shell pattern where:
 * - TerminalWindow mounts exactly once per session
 * - Only inner content changes during navigation
 * - Header, breadcrumbs, and shell UI update reactively without remounting
 * - Provides smooth UX without visual "flashing" or layout shifts
 */
export default function PersistentShell({ isLoading }) {
  const { 
    currentScreen, 
    currentDomain, 
    domainData,
    sessionData
  } = useSession();

  // Calculate window title with stable memoization to prevent unnecessary re-renders
  const windowTitle = useMemo(() => {
    // For Entry and MainHub, use domain-specific title
    if (currentScreen === 'Entry' || currentScreen === 'MainHub') {
      // Priority: domainData > currentDomain > fallback
      if (domainData?.terminalTitle) {
        return domainData.terminalTitle;
      }
      if (currentDomain) {
        return `${currentDomain}_portfolio`;
      }
      return 'portfolio';
    }
    
    // For other screens, convert CamelCase to snake_case
    return currentScreen.replace(/([A-Z])/g, (match, p1, offset) => 
      offset > 0 ? '_' + p1.toLowerCase() : p1.toLowerCase()
    );
  }, [currentScreen, currentDomain, domainData]);

  // Memoize the loading component to prevent unnecessary re-renders
  const loadingComponent = useMemo(() => {
    if (!isLoading) return null;
    
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8">
        <div className="text-primary">AUTHENTICATING...</div>
      </div>
    );
  }, [isLoading]);

  // Memoize the content area to prevent unnecessary re-renders when shell props haven't changed
  const contentArea = useMemo(() => {
    return (
      <AnimatedScreenTransition>
        <ScreenRenderer />
      </AnimatedScreenTransition>
    );
  }, []); // Empty dependency array because ScreenRenderer manages its own state

  // Show loading state without mounting TerminalWindow
  if (isLoading) {
    return loadingComponent;
  }

  // CRITICAL: TerminalWindow mounts here exactly once per session
  // All subsequent navigation changes only affect the content area
  return (
    <TerminalWindow title={windowTitle} fixedHeight={true}>
      {contentArea}
    </TerminalWindow>
  );
}