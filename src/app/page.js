// src/app/page.js
'use client';

import { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from './context/SessionContext';
import ScreenRenderer from './components/ScreenRenderer';
import TerminalWindow from './layouts/TerminalWindow';
import AnimatedScreenTransition from './components/AnimatedScreenTransition';

function AppContent() {
  const searchParams = useSearchParams();
  const { 
    sessionData, 
    setSessionData, 
    navigate, 
    addLog, 
    endSession, 
    setAuthError,
    currentScreen,
    currentDomain,
    domainData
  } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate window title based on current screen
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
  
  useEffect(() => {
    const code = searchParams.get('code');
    const demoMode = searchParams.get('demo');

    // Handle session switching
    if (sessionData && code && code !== sessionData.accessCode) {
      addLog(`SESSION SWITCH: New code detected. Old: ${sessionData.accessCode}, New: ${code}. Terminating old session.`);
      endSession();
      return;
    }

    // If already authenticated, stop loading
    if (sessionData) {
      setIsLoading(false);
      return;
    }

    // New function to handle demo mode authentication
    const authenticateDemoMode = async () => {
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
      }
      setIsLoading(false);
    };

    // Authentication logic
    const authenticateWithCode = async (accessCode) => {
      if (!accessCode) {
        setIsLoading(false);
        navigate('Entry', false);
        return;
      }
      
      try {
        const response = await fetch(`/api/session?code=${accessCode}`);
        if (response.ok) {
          const userData = await response.json();

          const enrichedData = {
            ...userData,
            accessCode: accessCode
          };
          setSessionData(enrichedData);
          addLog(`ACCESS GRANTED: ${userData.meta?.company || 'Unknown Company'}`);
          navigate('ProfileBoot', false);
        } else {
          addLog(`ACCESS DENIED: Invalid code ${accessCode}`);
          setAuthError('Invalid access code. Please try again.');
          navigate('Entry', false);
        }
      } catch (error) {
        addLog(`ERROR: Failed to authenticate`);
        setAuthError('Connection error. Please try again.');
        navigate('Entry', false);
      }
      setIsLoading(false);
    };
    
    // Priority: demo mode > code-based auth > show Entry screen
    if (demoMode === 'true') {
      // If demo=true in URL, authenticate with demo mode
      authenticateDemoMode();
    } else if (code) {
      // Original code-based authentication
      authenticateWithCode(code);
    } else {
      // No authentication parameters, show Entry screen
      setIsLoading(false);
      navigate('Entry', false);
    }

  }, [searchParams, sessionData, setSessionData, navigate, addLog, setAuthError, endSession]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center p-8">
        <div className="text-primary">AUTHENTICATING...</div>
      </div>
    );
  }
  
  return (
    <TerminalWindow title={windowTitle} fixedHeight={true}>
      <AnimatedScreenTransition>
        <ScreenRenderer />
      </AnimatedScreenTransition>
    </TerminalWindow>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <AppContent />
    </Suspense>
  );
}