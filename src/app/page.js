// src/app/page.js
'use client';

import { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from './context/SessionContext';
import PersistentShell from './components/PersistentShell';

function AppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get logoutInProgress from context
  const { 
    sessionData, 
    setSessionData, 
    navigate, 
    addLog, 
    endSession, 
    setAuthError,
    setAutoFillCode,
    logoutInProgress,
    autoFillCode,
    currentScreen
  } = useSession();
  
  // Changed from true to false for SSR compatibility
  // This prevents hydration mismatch errors on initial page load
  const [isLoading, setIsLoading] = useState(false);
  
  // Use refs for tracking (NOT sessionStorage, NOT component state)
  const lastProcessedCodeRef = useRef(null);
  const hasProcessedInitialLoadRef = useRef(false);
  const hasProcessedDemoModeRef = useRef(false);
  
  // Global reset function for SessionContext to call during logout
  // This solves the critical bug where demo mode refs weren't being reset
  useEffect(() => {
    // Expose reset function globally for SessionContext to call
    window.__resetPageRefs = () => {
      console.log('[PAGE] Resetting all refs via global function');
      lastProcessedCodeRef.current = null;
      hasProcessedInitialLoadRef.current = false;
      hasProcessedDemoModeRef.current = false;
    };
    
    // Cleanup: remove global function when component unmounts
    return () => {
      delete window.__resetPageRefs;
    };
  }, []); // Empty deps - only run once on mount
  
  // Authentication and session management logic
  useEffect(() => {
    // Single source of truth for URL parameters
    // This prevents race conditions between useSearchParams and window.location
    const getUrlParams = () => {
      if (typeof window === 'undefined') return { code: null, demoMode: null };
      const urlParams = new URLSearchParams(window.location.search);
      return {
        code: urlParams.get('code'),
        demoMode: urlParams.get('demo')
      };
    };
    
    // Get parameters using our single source of truth
    const { code, demoMode } = getUrlParams();
    
    // Define helper functions INSIDE useEffect to avoid dependency issues
    const checkExistingSession = async () => {
      try {
        // This prevents the API from returning Demo Mode when checking for existing sessions
        const response = await fetch('/api/session?check=session');
        if (response.ok) {
          const userData = await response.json();
          setSessionData(userData);
          navigate('MainHub', false);
        } else {
          navigate('Entry', false);
        }
      } catch (error) {
        console.error('[PAGE] Session check error:', error);
        navigate('Entry', false);
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleDemoMode = async () => {
      setIsLoading(true);
      addLog('DEMO MODE: Initializing from URL parameter');
      
      try {
        const response = await fetch('/api/session');
        
        if (response.ok) {
          const demoData = await response.json();
          const enrichedData = {
            ...demoData,
            isDemoMode: true,
            accessCode: 'DEMO'
          };
          
          setSessionData(enrichedData);
          addLog('DEMO MODE: Session initialized via URL');
          navigate('ProfileBoot', false);
        } else {
          addLog('DEMO MODE: Not available');
          setAuthError('Demo mode is not available at this time');
          navigate('Entry', false);
        }
      } catch (error) {
        addLog(`DEMO MODE ERROR: ${error.message}`);
        setAuthError('Failed to start demo mode');
        navigate('Entry', false);
      } finally {
        setIsLoading(false);
      }
    };
    
    // CRITICAL: Check logout flag FIRST
    // This prevents any authentication logic from running during logout
    if (logoutInProgress) {
      console.log('[PAGE] Logout in progress, skipping all auth logic');
      setIsLoading(false);
      return; // EXIT EARLY - don't process anything during logout
    }
    
    // Reset demo mode flag when parameter is absent
    // This ensures the flag is properly managed across navigation
    if (demoMode !== 'true') {
      hasProcessedDemoModeRef.current = false;
    }
    
    // Check if we already processed this code
    if (code && lastProcessedCodeRef.current === code && hasProcessedInitialLoadRef.current) {
      setIsLoading(false);
      return;
    }
    
    // Check if already authenticated with the same code
    if (code && sessionData && sessionData.accessCode === code) {
      setIsLoading(false);
      return;
    }
    
    // Handle session switching (different code while authenticated)
    if (sessionData && code && code !== sessionData.accessCode) {
      addLog(`SESSION SWITCH: From ${sessionData.accessCode} to ${code}`);
      endSession(); // This will set logoutInProgress
      return;
    }
    
    // Handle demo mode (but only if not during logout and not already processed)
    if (demoMode === 'true' && !hasProcessedDemoModeRef.current) {
      console.log('[PAGE] Processing demo mode for the first time');
      hasProcessedDemoModeRef.current = true;
      handleDemoMode();
      return;
    }
    
    // Handle code parameter for auto-fill
    if (code && !sessionData) {
      console.log('[PAGE] Triggering auto-fill for code:', code);
      lastProcessedCodeRef.current = code;
      hasProcessedInitialLoadRef.current = true;
      
      setIsLoading(false);
      setAutoFillCode(code);
      navigate('Entry', false);
      return;
    }
    
    // No special parameters, check for existing session
    if (!sessionData) {
      console.log('[PAGE] No session data, checking for existing session');
      // Only set loading true when actually checking
      setIsLoading(true);
      checkExistingSession();
    } else {
      setIsLoading(false);
    }
    
  }, [searchParams, logoutInProgress, sessionData, router, setSessionData, navigate, addLog, setAuthError, setAutoFillCode, endSession]);
  
  // Debug logging for autoFillCode changes
  useEffect(() => {
    console.log('[PAGE] autoFillCode updated to:', autoFillCode);
  }, [autoFillCode, searchParams]);
  
  // Return PersistentShell which manages TerminalWindow mounting
  console.log('[PAGE] Rendering PersistentShell with isLoading:', isLoading, 'currentScreen:', currentScreen);
  return <PersistentShell isLoading={isLoading} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}