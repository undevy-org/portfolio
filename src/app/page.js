// src/app/page.js
'use client';

import { useEffect, useState, Suspense, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from './context/SessionContext';
import PersistentShell from './components/PersistentShell';

function AppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { 
    sessionData, 
    setSessionData, 
    navigate, 
    addLog, 
    endSession, 
    setAuthError,
    setAutoFillCode, // Added for auto-fill feature
    autoFillCode,
    currentScreen
  } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Keep default as true
  const hasProcessedInitialLoad = useRef(false); // Track if we've processed initial load
  const lastProcessedCode = useRef(null); // Track the last code we processed
  
  // Function to check for existing session
  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/session');
      if (response.ok) {
        const userData = await response.json();
        setSessionData(userData);
        addLog('SESSION: Restored existing session');
        console.log('[PAGE] Session found, navigating to MainHub');
        navigate('MainHub', false);
      } else {
        console.log('[PAGE] No session found, showing Entry');
        navigate('Entry', false);
      }
    } catch (error) {
      console.log('[PAGE] Session check error:', error.message);
      addLog(`SESSION CHECK ERROR: ${error.message}`);
      // Even if session check fails, show Entry screen
      navigate('Entry', false);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, setSessionData, addLog]);

  // Function to handle demo mode authentication
  const handleDemoMode = useCallback(async () => {
    setIsLoading(true); // Set loading state for demo mode
    addLog('DEMO MODE: Initializing from URL parameter');
    
    try {
      // Make API request without code to trigger demo mode
      const response = await fetch('/api/session');
      
      if (response.ok) {
        const demoData = await response.json();
        
        // Enrich data with demo mode flags
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
  }, [navigate, setSessionData, addLog, setAuthError]);

  // Authentication and session management logic
  useEffect(() => {
    const code = searchParams.get('code');
    const demoMode = searchParams.get('demo');
    
    // Skip if we've already processed this exact code
    if (code && lastProcessedCode.current === code) {
      console.log('[PAGE] Already processed this code, skipping');
      setIsLoading(false);
      return;
    }
    
    // Skip if we've already processed the initial load and nothing changed
    if (hasProcessedInitialLoad.current) {
      // Only process if parameters actually changed
      if (!code && !demoMode) {
        return;
      }
    }
    
    hasProcessedInitialLoad.current = true;
    
    console.log('[PAGE] useEffect triggered with:', { 
      code, 
      demoMode, 
      sessionData,
      autoFillCode,
      currentScreen,
      isLoading
    });

    // Don't trigger auto-fill if already authenticated with the same code
    if (code && sessionData && sessionData.accessCode === code) {
      console.log('[PAGE] Already authenticated with this code, skipping auto-fill');
      setIsLoading(false);
      return;
    }

    // Handle session switching - only if we have both session and code, and they're different
    if (sessionData && code && code !== sessionData.accessCode) {
      addLog(`SESSION SWITCH: New code detected. Old: ${sessionData.accessCode}, New: ${code}. Terminating old session.`);
      endSession();
      return;
    }

    // Handle URL parameters
    if (demoMode === 'true') {
      console.log('[PAGE] Demo mode requested');
      handleDemoMode();
      return;
    }
    
    if (code) {
      console.log('[PAGE] Code parameter found, setting autoFillCode and navigating to Entry');
      // Track that we've processed this code
      lastProcessedCode.current = code;
      // Immediately stop loading to show the Entry screen
      setIsLoading(false);
      // Set the code for auto-fill
      console.log('[PAGE] Setting autoFillCode to:', code);
      setAutoFillCode(code);
      // Navigate to Entry screen (synchronously, no delay needed)
      navigate('Entry', false);
      return; // Critical: exit here, don't run checkSession
    }

    // If no special parameters, check for existing session
    console.log('[PAGE] No special parameters, checking for existing session');
    checkSession();
    
  // Include all dependencies to satisfy the linter
  }, [searchParams, sessionData, autoFillCode, currentScreen, isLoading, addLog, endSession, handleDemoMode, navigate, setAutoFillCode, checkSession, setSessionData, setAuthError]);
  
  // Log when autoFillCode changes
  useEffect(() => {
    console.log('[PAGE] autoFillCode updated to:', autoFillCode);
  }, [autoFillCode]);
  
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