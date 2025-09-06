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
    logoutInProgress,  // ADD THIS
    autoFillCode,
    currentScreen
  } = useSession();
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Use refs for tracking (NOT sessionStorage, NOT component state)
  const lastProcessedCodeRef = useRef(null);
  const hasProcessedInitialLoadRef = useRef(false);
  const hasProcessedDemoModeRef = useRef(false);
  
  // Authentication and session management logic
  useEffect(() => {
    // Get parameters directly from window.location to ensure we have the latest values
    let code = null;
    let demoMode = null;
    
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      code = urlParams.get('code');
      demoMode = urlParams.get('demo');
    }
    
    // Define helper functions INSIDE useEffect to avoid dependency issues
    const checkExistingSession = async () => {
      try {
        const response = await fetch('/api/session');
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
    if (logoutInProgress) {
      setIsLoading(false);
      return; // EXIT EARLY - don't process anything during logout
    }
    
    // Reset demo mode processing flag when there's no demo parameter
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
      hasProcessedDemoModeRef.current = true;
      handleDemoMode();
      return;
    }
    
    // Handle code parameter for auto-fill
    if (code && !sessionData) {
      lastProcessedCodeRef.current = code;
      hasProcessedInitialLoadRef.current = true;
      
      setIsLoading(false);
      setAutoFillCode(code);
      navigate('Entry', false);
      return;
    }
    
    // No special parameters, check for existing session
    if (!sessionData) {
      checkExistingSession();
    } else {
      setIsLoading(false);
    }
    
  }, [searchParams, logoutInProgress, sessionData, router, setSessionData, navigate, addLog, setAuthError, setAutoFillCode, endSession]); // Include all dependencies
  
  // Log when autoFillCode changes
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