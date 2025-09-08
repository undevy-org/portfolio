// src/app/screens/Entry.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
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
    addLog, 
    domainData, 
    authError, 
    setAuthError, 
    sessionData,        
    setSessionData, 
    navigate,
    web3LogoutPending,     // Flag that tells us when to disconnect wallet
    setWeb3LogoutPending,   // Function to clear the flag after disconnection
    autoFillCode,
    setAutoFillCode,
    logoutInProgress
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
  const hasStartedAnimation = useRef(false); // Prevent multiple auto-fill animations
  
  // ========== CLEANUP SAFETY ==========
  // Added to prevent state updates on unmounted components
  useEffect(() => {
    console.log('[ENTRY] Component mounted');
    isMounted.current = true;
    setIsComponentReady(true); // Mark component as ready for animations

    return () => {
      console.log('[ENTRY] Component unmounting');
      isMounted.current = false;
      clearAllTimers();
    };
    // Intentionally run this effect only on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========== EFFECT 1: WEB3 PENDING LOGOUT HANDLER ==========
  useEffect(() => {
    // This handles the Web3 logout initiated from outside Entry.js
    if (web3LogoutPending && isConnected && !isLoggingOut.current) {
      console.log('[WEB3 LOGOUT] Pending logout detected, initiating wallet disconnect');
      isLoggingOut.current = true;
      
      const performDisconnect = async () => {
        try {
          console.log('[WEB3 LOGOUT] Calling disconnectAsync...');
          await disconnectAsync();
          console.log('[WEB3 LOGOUT] disconnectAsync completed successfully');
        } catch (error) {
          console.error('[WEB3 LOGOUT] Error during disconnect:', error);
        } finally {
          // Clear the pending flag regardless of success/failure
          setWeb3LogoutPending(false);
        }
      };
      
      performDisconnect();
    }
  }, [web3LogoutPending, isConnected, disconnectAsync, setWeb3LogoutPending]);

  // ========== EFFECT 2: WEB3 CONNECTION HANDLER ==========
  useEffect(() => {
    // Skip if component isn't ready
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }
    
    // Wallet just connected - attempt authentication
    if (isConnected && address && web3Status === 'connecting') {
      console.log('[WEB3] Wallet connected:', address);
      
      const performWeb3Auth = async () => {
        setIsLoading(true);
        setAuthError(null);
        
        try {
          const code = process.env.NEXT_PUBLIC_WEB3_SHARED_ACCESS_CODE || '0XDEFI2311';
          addLog(`WEB3 AUTH: Using code ${code}`);
          
          const response = await fetch(`/api/session?code=${code}`);
          
          if (response.ok) {
            const userData = await response.json();
            const enrichedData = {
              ...userData,
              accessCode: code,
              walletAddress: address
            };
            
            setSessionData(enrichedData);
            addLog(`WEB3 ACCESS GRANTED: ${userData.meta?.company || 'Unknown'}`);
            
            router.push('/');
            navigate('ProfileBoot', false);
            
            setWeb3Status('connected');
          } else {
            addLog('WEB3 ACCESS DENIED: Invalid Web3 credentials');
            setAuthError('Web3 authentication failed');
            setWeb3Status('idle');
            
            setTimeout(async () => {
              await disconnectAsync();
            }, 1000);
          }
        } catch (error) {
          addLog('WEB3 ERROR: Authentication failed');
          setAuthError('Connection error during Web3 auth');
          setWeb3Status('idle');
        } finally {
          setIsLoading(false);
        }
      };
      
      performWeb3Auth();
    }
    
    // Wallet disconnected
    if (!isConnected && web3Status !== 'idle') {
      console.log('[WEB3] Wallet disconnected');
      setWeb3Status('idle');
    }
  }, [isConnected, address, web3Status, addLog, setAuthError, setSessionData, navigate, router, disconnectAsync]);

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
  
  // Centralized timer cleanup function with memoization
  const clearAllTimers = useCallback(() => {
    console.log('[AUTO-FILL] Clearing all timers');
    animationTimersRef.current.forEach(timer => clearTimeout(timer));
    animationTimersRef.current = [];
  }, []); // Empty dependency array since it only uses refs
  
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
      
      // FIX: Check if logout is in progress and stop animation
      if (logoutInProgress) {
        console.log('[AUTO-FILL] Logout detected, stopping animation');
        clearAllTimers();
        setIsAnimating(false);
        return;
      }
      
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
            if (isMounted.current && !logoutInProgress) { // FIX: Check logout before submit
              setIsAnimating(false);
              handleAutoSubmit();  // Use error handling wrapper
            }
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
  }, [setCode, handleAutoSubmit, addLog, logoutInProgress, clearAllTimers]);
  
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
      
      // FIX: Use centralized timer cleanup
      clearAllTimers();
      
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
  }, [setCode, addLog, typeCharacter, clearAllTimers]);
  
  // Update the ref whenever startTypingAnimation changes
  useEffect(() => {
    startTypingAnimationRef.current = startTypingAnimation;
  }, [startTypingAnimation]);
  
  // FIX: Effect to trigger animation when autoFillCode is set with logout check
  useEffect(() => {
    console.log('[ENTRY] autoFillCode useEffect triggered with:', autoFillCode, 'logoutInProgress:', logoutInProgress);
    
    // FIX: Stop animation immediately if logout is in progress
    if (logoutInProgress) {
      console.log('[ENTRY] Logout in progress, clearing animation');
      clearAllTimers();
      setIsAnimating(false);
      hasStartedAnimation.current = false;
      // Remove CSS classes
      const inputElement = document.querySelector('[data-testid="auth-input"]');
      if (inputElement) {
        inputElement.classList.remove('auto-filling');
      }
      return;
    }
    
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
        if (isMounted.current && !logoutInProgress) { // FIX: Additional check
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
        hasStartedAnimation: hasStartedAnimation.current,
        logoutInProgress: logoutInProgress
      });
    }
    
    // Cleanup function
    return () => {
      console.log('[AUTO-FILL] Cleaning up animation');
      clearAllTimers(); // FIX: Use centralized cleanup
      if (isMounted.current) {
        setIsAnimating(false);
      }
      
      // Remove CSS classes
      const inputElement = document.querySelector('[data-testid="auth-input"]');
      if (inputElement) {
        inputElement.classList.remove('auto-filling');
      }
    };
  }, [autoFillCode, isComponentReady, logoutInProgress, clearAllTimers]);

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

  // FIX: New handleDemoMode that navigates to URL with demo parameter
  // This avoids duplicating the authentication logic - page.js will handle it
  const handleDemoMode = () => {
    addLog('DEMO MODE: Navigating to demo URL');
    // Navigate to the URL with demo parameter
    // page.js will detect this parameter and handle the authentication
    router.push('/?demo=true');
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