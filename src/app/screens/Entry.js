// src/app/screens/Entry.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { useRouter } from 'next/navigation';
import { MessageSquare, Wallet, LockOpen, Github, Sparkles } from 'lucide-react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import Button from '../components/ui/Button';

export default function Entry() {
  // ========== LOCAL STATE ==========
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [web3Status, setWeb3Status] = useState('idle'); // Can be: 'idle', 'connecting', 'connected', 'disconnecting'
  const [isAnimating, setIsAnimating] = useState(false); // Added for auto-fill animation
  const [isComponentReady, setIsComponentReady] = useState(false); // Added for component readiness detection
  
  // ========== CONTEXT HOOKS ==========
  const { 
    theme, 
    addLog, 
    currentDomain, 
    domainData, 
    authError, 
    setAuthError, 
    sessionData,        
    setSessionData, 
    navigate,
    isTerminating,
    // These replace the unreliable browser event system
    web3LogoutPending,     // Flag that tells us when to disconnect wallet
    setWeb3LogoutPending,   // Function to clear the flag after disconnection
    // Added for auto-fill feature
    autoFillCode,
    setAutoFillCode
  } = useSession();
  
  // Use ref for code value to avoid stale closures
  const codeRef = useRef('');
  
  // Update ref when code changes
  useEffect(() => {
    codeRef.current = code;
  }, [code]);
  
  // Log when autoFillCode changes
  useEffect(() => {
    console.log('[ENTRY] Received autoFillCode:', autoFillCode);
  }, [autoFillCode]);
  
  // ========== NEXT.JS HOOKS ==========
  const router = useRouter();
  
  // ========== WEB3 HOOKS ==========
  const { open } = useAppKit(); // Opens the Reown modal for wallet connection
  const { address, isConnected } = useAccount(); // Tracks wallet connection state
  const { disconnectAsync } = useDisconnect(); // Async function to disconnect wallet

  // ========== REFS FOR PERSISTENT STATE ==========
  const animationTimersRef = useRef([]); // Added for auto-fill animation timers
  const isMounted = useRef(true); // Added for cleanup safety
  const isLoggingOut = useRef(false); // Tracks if we're in the middle of a logout process
  const hasInitialized = useRef(false); // Prevents double initialization in React StrictMode
  const prevSessionRef = useRef(null); // CRITICAL: Track previous session state for logout detection
  const intentionalLogout = useRef(false); // Remember intentional logout
  const hasStartedAnimation = useRef(false); // Prevent multiple auto-fill animations
  
  // ========== CLEANUP SAFETY ==========
  // Added to prevent state updates on unmounted components
  useEffect(() => {
    console.log('[ENTRY] Component mounted');
    isMounted.current = true;
    
    // Simple, reliable readiness check
    const timer = setTimeout(() => {
      if (isMounted.current) {
        setIsComponentReady(true);
        console.log('[ENTRY] Component is ready');
      }
    }, 100);
    
    return () => {
      console.log('[ENTRY] Component unmounting');
      isMounted.current = false;
      clearTimeout(timer);
    };
  }, []);
  
  // ========== WEB3 AUTHENTICATION HANDLER ==========
  const handleWeb3Success = useCallback(async (walletAddress) => {
    // CRITICAL CHECK #1: Prevent authentication during logout
    if (isLoggingOut.current) {
      console.log('[WEB3 AUTH] Blocked: Logout in progress');
      addLog('WEB3 LOGIN: Skipped - logout in progress');
      return;
    }
    
    // CRITICAL CHECK #2: Prevent double initialization in React StrictMode
    if (hasInitialized.current) {
      console.log('[WEB3 AUTH] Blocked: Already initialized');
      return;
    }
    
    if (intentionalLogout.current) {
      console.log('[WEB3 AUTH] Blocked: User intentionally logged out');
      return;
    }
    
    console.log('[WEB3 AUTH] Starting authentication for:', walletAddress);
    hasInitialized.current = true; // Mark as initialized immediately
    
    setWeb3Status('connecting');
    addLog(`WEB3 CONNECTED: ${walletAddress}`);
    
    try {
      const response = await fetch(
        `/api/session?code=${process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE}`
      );
      
      if (response.ok) {
        const userData = await response.json();
        
        // Enrich the session data with Web3-specific information
        const web3SessionData = {
          ...userData,
          isWeb3User: true, // Flag to identify Web3 users throughout the app
          walletAddress: walletAddress, // Store full wallet address
          
          // Override meta information with Web3 details
          meta: {
            ...userData.meta,
            company: 'Web3 User',
            accessMethod: 'web3'
          },
          
          // Customize profile data for Web3 users
          profile: {
            ...userData.profile,
            greeting_name: 'Web3 User',
            summary: {
              ...userData.profile?.summary,
              title: 'Web3 Authenticated User',
              specialization: 'Authenticated via Web3',
              background: 'Decentralized Access'
            }
          }
        };
        
        setSessionData(web3SessionData);
        addLog(`WEB3 ACCESS GRANTED: ${walletAddress}`);
        
        setWeb3Status('connected');
        
        navigate('MainHub', false);
        
        // Update URL to reflect Web3 authentication
        // This allows sharing the link while maintaining privacy
        router.push(`/?web3=${walletAddress}`);
        
      } else {
        console.error('[WEB3 AUTH] Server returned error:', response.status);
        addLog('ERROR: Failed to create Web3 session');
        setAuthError('Failed to authenticate with Web3. Please try again.');
        setWeb3Status('idle');
        
        // Disconnect wallet on failure to reset state
        if (isConnected) {
          await disconnectAsync();
        }
        
        hasInitialized.current = false;
      }
    } catch (error) {
      console.error('[WEB3 AUTH] Exception during authentication:', error);
      addLog('ERROR: Web3 session creation failed');
      setAuthError('Network error during Web3 authentication');
      setWeb3Status('idle');
      
      // Disconnect wallet on error
      if (isConnected) {
        try {
          await disconnectAsync();
        } catch (disconnectError) {
          console.error('[WEB3 AUTH] Error during cleanup disconnect:', disconnectError);
        }
      }
      
      hasInitialized.current = false;
    }
  }, [
    isConnected, 
    disconnectAsync, 
    setSessionData, 
    addLog, 
    navigate, 
    router, 
    setAuthError
  ]);
  
  // ========== EFFECT 1: WEB3 AUTHENTICATION WITH TERMINATION CHECK ==========
  useEffect(() => {

    // This helps understand the flow and catch issues early
    console.log('[WEB3 DEBUG]', {
      isTerminating,
      web3LogoutPending,
      isLoggingOut: isLoggingOut.current,
      hasInitialized: hasInitialized.current,
      intentionalLogout: intentionalLogout.current,
      isConnected,
      hasSession: !!sessionData
    });

    // CRITICAL: Check termination flag first
    if (isTerminating) {
      console.log('[WEB3 MONITOR] Session is terminating - skip all authentication');
      return;
    }
    
    // This is more reliable than checking isTerminating alone
    if (web3LogoutPending) {
      console.log('[WEB3 MONITOR] Web3 logout is pending - skip authentication');
      return;
    }
    
    // Check if logout is in progress
    if (isLoggingOut.current) {
      console.log('[WEB3 MONITOR] Logout in progress - skip authentication');
      return;
    }
    
    if (intentionalLogout.current) {
      console.log('[WEB3 MONITOR] Intentional logout detected - skip authentication');
      return;
    }
    
    // Detect if session was just cleared
    const hadSession = prevSessionRef.current !== null;
    const sessionJustCleared = hadSession && !sessionData;
    prevSessionRef.current = sessionData;
    
    if (sessionJustCleared) {
      console.log('[WEB3 MONITOR] Session was cleared - likely logout');
      return;
    }
    
    // Authenticate only if all conditions are met
    if (isConnected && address && !hasInitialized.current && !sessionData && !intentionalLogout.current) {
      console.log('[WEB3 MONITOR] All conditions met - starting authentication');
      handleWeb3Success(address);
    }
    
    // Reset flags when wallet disconnects
    if (!isConnected) {
      if (hasInitialized.current || intentionalLogout.current) {
        console.log('[WEB3 MONITOR] Wallet disconnected - resetting all flags');
      hasInitialized.current = false;
        intentionalLogout.current = false;
      setWeb3Status('idle');
      }
    }
  }, [isConnected, address, sessionData, isTerminating, web3LogoutPending, handleWeb3Success]);
  
  // ========== EFFECT 2: WEB3 LOGOUT HANDLER (ENHANCED) ==========
  useEffect(() => {
    // Only process logout when the flag is set and wallet is connected
    if (web3LogoutPending && isConnected && !isLoggingOut.current) {
      console.log('[WEB3 LOGOUT] Processing pending logout from context state');
      
      // CRITICAL: Set flags immediately to prevent re-authentication
      isLoggingOut.current = true;
      intentionalLogout.current = true;
      setWeb3Status('disconnecting');
      
      // Async function to handle the disconnection
      const performDisconnect = async () => {
        addLog('WEB3 LOGOUT: Starting disconnect process');
        
        try {
          console.log('[WEB3 LOGOUT] Calling disconnectAsync...');
          await disconnectAsync();
          console.log('[WEB3 LOGOUT] disconnectAsync completed successfully');
          addLog('WEB3 LOGOUT: Wallet disconnected successfully');
        } catch (error) {
          // Log error but don't throw - we still want to complete logout
          console.error('[WEB3 LOGOUT] Error during disconnect:', error);
          addLog('WEB3 LOGOUT: Error during disconnect (continuing anyway)');
        } finally {
          // IMPORTANT: Clear the pending flag in context
          // This tells SessionContext that we've handled the logout
          setWeb3LogoutPending(false);
          console.log('[WEB3 LOGOUT] Cleared web3LogoutPending flag');
        }
        // Note: isLoggingOut.current is cleared in Effect 3 after disconnect is confirmed
      };
      
      performDisconnect();
    }
    
    // Edge case: If logout was requested but wallet is already disconnected
    if (web3LogoutPending && !isConnected) {
      console.log('[WEB3 LOGOUT] Logout requested but wallet already disconnected');
      setWeb3LogoutPending(false);
          isLoggingOut.current = false;
          intentionalLogout.current = false;
          setWeb3Status('idle');
    }
  }, [web3LogoutPending, isConnected, disconnectAsync, addLog, setWeb3LogoutPending]);
  
  // ========== EFFECT 2B: LEGACY BROWSER EVENT LISTENER (BACKUP) ==========
  useEffect(() => {
    const handleWeb3LogoutRequest = () => {
      console.log('[WEB3 LOGOUT] Legacy browser event received - ignoring (using state-based approach)');
      // We don't process this anymore - the state-based approach handles it
    };
    
    window.addEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    return () => {
      window.removeEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    };
  }, []);

  // ========== EFFECT 3: LOGOUT COMPLETION MONITOR ==========
  useEffect(() => {
    // This effect only runs when wallet becomes disconnected during a logout
    if (!isConnected && isLoggingOut.current) {
      console.log('[WEB3 LOGOUT] Wallet disconnection confirmed by wagmi');
      
      // Add delay to ensure all state updates have propagated through React
      const timer = setTimeout(() => {
        isLoggingOut.current = false;
        setWeb3Status('idle');
        console.log('[WEB3 LOGOUT] Process completed and lock released');
        addLog('WEB3 LOGOUT: Process completed');
      }, 200); // 200ms delay for safety - can be adjusted if needed
      
      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
    }
  }, [isConnected, addLog]);

  // ========== TRADITIONAL AUTHENTICATION HANDLERS ==========
  const handleSubmit = useCallback(async () => {
    const currentCode = codeRef.current; // Use ref value, not state
    
    if (!currentCode.trim()) {
      addLog('ERROR: No access code provided');
      setAuthError('Please enter an access code');
      return;
    }
    
    setIsLoading(true);
    setAuthError(null);
    addLog(`ACCESS CODE: ${currentCode}`);
    
    try {
      const response = await fetch(`/api/session?code=${currentCode}`);
      
      if (response.ok) {
        const userData = await response.json();
        const enrichedData = {
          ...userData,
          accessCode: currentCode
        };
        
        setSessionData(enrichedData);
        addLog(`ACCESS GRANTED: ${userData.meta?.company || 'Unknown'}`);
        
        // Clear the URL after successful auth
        router.push('/'); // Clean URL, no parameters
        navigate('MainHub', false);
        
        // Clear autoFillCode after navigation
        setTimeout(() => {
          setAutoFillCode(null);
        }, 100);
        
      } else {
        addLog(`ACCESS DENIED: Invalid code ${currentCode}`);
        setAuthError('Invalid access code');
      }
    } catch (error) {
      addLog(`ERROR: Authentication failed`);
      setAuthError('Connection error');
    } finally {
      setIsLoading(false);
    }
  }, [addLog, setAuthError, setSessionData, navigate, router, setAutoFillCode]);

  // ========== AUTO-FILL ANIMATION FUNCTIONS ==========
  // Added for auto-fill feature
  
  // Function to handle auto-submit with error handling
  const handleAutoSubmit = useCallback(() => {
    try {
      // Simply call the existing handleSubmit function
      handleSubmit();
    } catch (error) {
      console.error('[AUTO-FILL] Error in handleAutoSubmit:', error);
      addLog(`AUTO-FILL ERROR: ${error.message}`);
      // Reset animation state on error
      if (isMounted.current) {
        setIsAnimating(false);
      }
    }
  }, [handleSubmit, addLog]);
  
  // Ref to store the typeCharacter function to prevent stale closures
  const typeCharacterRef = useRef();
  
  // Function to type characters with animation
  const typeCharacter = useCallback((targetCode, index = 0) => {
    try {
      console.log('[AUTO-FILL] typeCharacter called with:', targetCode, 'index:', index);
      if (index <= targetCode.length) {  // <= not < to show the complete code
        if (isMounted.current) {
          setCode(targetCode.slice(0, index));
          console.log('[AUTO-FILL] Set code to:', targetCode.slice(0, index));
        }
        
        if (index < targetCode.length) {  // Continue typing
          const delay = 100 + Math.random() * 100;
          console.log('[AUTO-FILL] Scheduling next character in', delay, 'ms');
          const timer = setTimeout(() => {
            // Use the function directly instead of the ref to avoid stale closure issues
            typeCharacter(targetCode, index + 1);
          }, delay);
          animationTimersRef.current.push(timer);
        } else {  // Typing complete
          console.log('[AUTO-FILL] Typing complete, scheduling auto-submit in 800ms');
          const timer = setTimeout(() => {
            if (isMounted.current) {
              setIsAnimating(false);
            }
            handleAutoSubmit();  // Use error handling wrapper
          }, 800);
          animationTimersRef.current.push(timer);
        }
      }
    } catch (error) {
      console.error('[AUTO-FILL] Error in typeCharacter:', error);
      addLog(`AUTO-FILL ERROR: ${error.message}`);
      // Reset animation state on error
      if (isMounted.current) {
        setIsAnimating(false);
      }
    }
  }, [setCode, handleAutoSubmit, addLog]);
  
  // Update the ref whenever typeCharacter changes
  useEffect(() => {
    typeCharacterRef.current = typeCharacter;
  }, [typeCharacter]);
  
  // Ref to store the startTypingAnimation function to prevent stale closures
  const startTypingAnimationRef = useRef();
  
  // Function to start the typing animation
  const startTypingAnimation = useCallback((codeToType) => {
    try {
      console.log('[AUTO-FILL] startTypingAnimation called with:', codeToType);
      // Clear any existing timers
      animationTimersRef.current.forEach(timer => clearTimeout(timer));
      animationTimersRef.current = [];
      
      // Reset input
      if (isMounted.current) {
        setCode('');
        setIsAnimating(true);
      }
      
      // Add visual feedback
      const inputElement = document.querySelector('[data-testid="auth-input"]');
      if (inputElement) {
        inputElement.classList.add('auto-filling');
      }
      
      // Start typing after a small delay
      const timer = setTimeout(() => {
        console.log('[AUTO-FILL] Starting character typing');
        // Use the function directly instead of the ref to avoid stale closure issues
        typeCharacter(codeToType);
      }, 500);
      animationTimersRef.current.push(timer);
    } catch (error) {
      console.error('[AUTO-FILL] Error in startTypingAnimation:', error);
      addLog(`AUTO-FILL ERROR: ${error.message}`);
      // Reset animation state on error
      if (isMounted.current) {
        setIsAnimating(false);
      }
      
      // Remove CSS classes
      const inputElement = document.querySelector('[data-testid="auth-input"]');
      if (inputElement) {
        inputElement.classList.remove('auto-filling');
      }
    }
  }, [setCode, addLog, typeCharacter]);
  
  // Update the ref whenever startTypingAnimation changes
  useEffect(() => {
    startTypingAnimationRef.current = startTypingAnimation;
  }, [startTypingAnimation]);
  
  // Effect to trigger animation when autoFillCode is set
  useEffect(() => {
    console.log('[ENTRY] autoFillCode useEffect triggered with:', autoFillCode, 'isMounted:', isMounted.current, 'isComponentReady:', isComponentReady);
    
    // Reset the flag when autoFillCode changes to null
    if (!autoFillCode) {
      hasStartedAnimation.current = false;
    }
    
    // Prevent multiple auto-fill animations
    if (autoFillCode && autoFillCode.length > 0 && isMounted.current && isComponentReady && !hasStartedAnimation.current) {
      hasStartedAnimation.current = true; // Prevent multiple starts
      console.log('[AUTO-FILL] Starting animation for code:', autoFillCode);
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        if (isMounted.current) {
          console.log('[AUTO-FILL] Calling startTypingAnimation with code:', autoFillCode);
          startTypingAnimationRef.current(autoFillCode);
        }
      }, 300); // Increased delay to ensure component is fully mounted
      
      return () => {
        clearTimeout(timer);
      };
    }
    
    // Log why the animation might not start
    if (autoFillCode && autoFillCode.length > 0) {
      console.log('[ENTRY] Auto-fill code detected but animation not started because:', {
        isMounted: isMounted.current,
        isComponentReady: isComponentReady,
        hasStartedAnimation: hasStartedAnimation.current
      });
    }
    
    // Cleanup function
    return () => {
      console.log('[AUTO-FILL] Cleaning up animation');
      animationTimersRef.current.forEach(timer => clearTimeout(timer));
      animationTimersRef.current = [];
      if (isMounted.current) {
        setIsAnimating(false);
      }
      // Don't clear autoFillCode here as it might interfere with the animation
      // setAutoFillCode(null);
      
      // Remove CSS classes
      const inputElement = document.querySelector('[data-testid="auth-input"]');
      if (inputElement) {
        inputElement.classList.remove('auto-filling');
      }
    };
  }, [autoFillCode, isComponentReady]);

  // Effect to clear autoFillCode after successful authentication
  useEffect(() => {
    if (sessionData && autoFillCode) {
      setAutoFillCode(null);
    }
  }, [sessionData, autoFillCode, setAutoFillCode]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !isConnected) {
      handleSubmit();
    }
  };

  const handleGetCode = () => {
    let telegramUrl;
    
    // This ensures the telegram link is always from configuration, not hardcoded
    if (domainData?.telegram) {
      telegramUrl = domainData.telegram;
    } else {
      // This ensures no personal data remains in the code
      telegramUrl = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_TELEGRAM || 'https://t.me/example';
    }
    
    addLog(`EXTERNAL LINK: Telegram ${telegramUrl}`);
    window.open(telegramUrl, '_blank');
  };

  const handleWeb3Login = () => {
    if (isConnected) {
      // Already connected - shouldn't happen but handle gracefully
      addLog('WEB3 LOGIN: Already connected');
      return;
    }
    
    addLog('WEB3 LOGIN: Opening wallet connection modal');
    setWeb3Status('connecting');
    open(); // Opens the Reown modal
  };

  const handleGitHub = () => {
    addLog('EXTERNAL LINK: GitHub');
    window.open('https://github.com/undevy-org/portfolio', '_blank');
  };

  const handleDemoMode = async () => {
    addLog('DEMO MODE: Initializing demo session');
    
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await fetch('/api/session');
      
      if (response.ok) {
        const demoData = await response.json();
        
        const enrichedData = {
          ...demoData,
          isDemoMode: true,        // Flag to identify demo sessions
          accessCode: 'DEMO'       // Special code for demo mode
        };
        
        setSessionData(enrichedData);
        
        addLog('DEMO MODE: Session initialized');
        
        navigate('ProfileBoot', false);
        
      } else {
        addLog('DEMO MODE: Failed to initialize');
        setAuthError('Demo mode is not available at this time');
      }
    } catch (error) {
      addLog(`DEMO MODE ERROR: ${error.message}`);
      setAuthError('Failed to start demo mode. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ========== RENDER ==========
  return (
    <div className="p-4">
      {/* Accessibility: Announce auto-fill process */}
      <div aria-live="polite" className="sr-only">
        {isAnimating ? `Auto-filling access code: ${code}` : ''}
      </div>
      
      {/* Main authentication section */}
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        {/* Input field - now same size text as buttons */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}
          className={`input-base flex-1 text-sm min-h-[3rem] tracking-wider ${authError ? 'input-error animate-pulse' : ''}`}
        placeholder="ENTER ACCESS CODE"
        autoFocus
        disabled={isLoading || isConnected || isAnimating}
        data-testid="auth-input"
      />

        {/* Authenticate button - now on same line as input on desktop */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || isConnected || isAnimating}
          icon={LockOpen}
          variant="inline"
          className="md:w-auto w-full"
          data-testid="auth-button"
        >
          {/* Icon color handled by button component */}
          <span className="flex items-center gap-2">
            {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
          </span>
        </Button>
      </div>

      {/* Error message display */}
      {authError && (
        <div className="mb-3 text-sm text-error">
          {authError}
        </div>
      )}

      {/* Primary action buttons */}
      <div className="flex gap-3 mb-4">
        <Button
          onClick={handleGetCode}
          disabled={isConnected || isAnimating}
          icon={MessageSquare}
          className="flex-1"
        >
          {/* Icon automatically gets text-command class from Button component */}
          GET CODE
        </Button>

        <Button
          onClick={handleWeb3Login}
          disabled={isLoggingOut.current || web3Status === 'disconnecting' || web3LogoutPending || isAnimating}
          icon={Wallet}
          className="flex-1"
        >
          {isConnected 
            ? `${address.slice(0, 6)}...${address.slice(-4)}` 
            : web3Status === 'connecting' 
              ? 'CONNECTING...' 
              : 'WEB3 LOGIN'
          }
        </Button>
      </div>
      
      {/* Divider - subtle border like in AnalyticsPanel */}
      <div className="border-t border-secondary opacity-50 my-4"></div>

      {/* Secondary action buttons - GitHub and Demo Mode */}
      <div className="flex gap-3">
        <Button
          onClick={handleGitHub}
          icon={Github}
          className="flex-1"
          disabled={isAnimating}
        >
          GITHUB
        </Button>

        <Button
          onClick={handleDemoMode}
          icon={Sparkles}
          className="flex-1"
          disabled={isLoading || isAnimating}
        >
          DEMO MODE
        </Button>
      </div>
      
      {/* Status messages for Web3 connection */}
      {isConnected && web3Status === 'connecting' && (
        <div className="mt-2 text-center text-xs text-secondary">
          Processing Web3 authentication...
        </div>
      )}
      
      {(web3Status === 'disconnecting' || web3LogoutPending) && (
        <div className="mt-2 text-center text-xs text-secondary">
          Disconnecting wallet...
        </div>
      )}
    </div>
  );
}