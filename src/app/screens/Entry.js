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
    setWeb3LogoutPending   // Function to clear the flag after disconnection
  } = useSession();
  
  // ========== NEXT.JS HOOKS ==========
  const router = useRouter();
  
  // ========== WEB3 HOOKS ==========
  const { open } = useAppKit(); // Opens the Reown modal for wallet connection
  const { address, isConnected } = useAccount(); // Tracks wallet connection state
  const { disconnectAsync } = useDisconnect(); // Async function to disconnect wallet

  // ========== REFS FOR PERSISTENT STATE ==========
  // Critical: These refs persist across renders and prevent race conditions
  const isLoggingOut = useRef(false); // Tracks if we're in the middle of a logout process
  const hasInitialized = useRef(false); // Prevents double initialization in React StrictMode
  const prevSessionRef = useRef(null); // CRITICAL: Track previous session state for logout detection
  const intentionalLogout = useRef(false); // Remember intentional logout
  
  // ========== WEB3 AUTHENTICATION HANDLER ==========
  /**
   * Handles successful Web3 wallet connection and creates a session
   * Wrapped in useCallback to prevent recreation on every render
   * This is critical for proper React Hook dependencies
   */
  const handleWeb3Success = useCallback(async (walletAddress) => {
    // CRITICAL CHECK #1: Prevent authentication during logout
    if (isLoggingOut.current) {
      console.log('[WEB3 AUTH] Blocked: Logout in progress');
      addLog('WEB3 LOGIN: Skipped - logout in progress');
      return;
    }
    
    // CRITICAL CHECK #2: Prevent double initialization in StrictMode
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
      const response = await fetch(`/api/session?code=0XDEFI2311`);
      
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
  /**
   * ENHANCED: Now uses direct state (web3LogoutPending) instead of browser events
   * This is more reliable as React guarantees state updates reach all components
   * Browser events can be missed if the component isn't mounted when fired
   */
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
  /**
   * KEPT AS BACKUP: Still listens for browser events in case something else dispatches them
   * This provides backwards compatibility but the primary mechanism is now direct state
   */
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
  /**
   * Monitors wallet disconnection and safely resets the logout lock
   * This effect ensures the lock is only released after wagmi confirms disconnection
   */
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
  /**
   * Handles traditional code-based authentication
   */
  const handleSubmit = async () => {
    if (!code.trim()) {
      addLog('ERROR: No access code provided');
      setAuthError('Please enter an access code');
      return;
    }

    setIsLoading(true);
    setAuthError(null);
    addLog(`AUTHENTICATING: ${code}`);
    
    router.push(`/?code=${code}`);
  };

  /**
   * Handles Enter key press in the code input field
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading && !isConnected) {
      handleSubmit();
    }
  };

  /**
   * Opens Telegram for getting an access code
   * Determines the correct Telegram URL based on domain
   */
  const handleGetCode = () => {
    // The telegram URL now comes entirely from domainData (loaded from domains.json)
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

  /**
   * Initiates Web3 wallet connection
   */
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

  /**
   * Opens GitHub repository
   * This links to the project's public repository
   */
  const handleGitHub = () => {
    addLog('EXTERNAL LINK: GitHub');
    window.open('https://github.com/undevy-org/portfolio', '_blank');
  };

  /**
   * Handles Demo Mode button click
   * CHANGED: Now actually initiates a demo session instead of showing an error message
   * This function makes an API request without an access code, which triggers demo mode
   */
  const handleDemoMode = async () => {
    // CHANGED: Log the start of demo mode initialization
    addLog('DEMO MODE: Initializing demo session');
    
    // CHANGED: Set loading state to show user that something is happening
    setIsLoading(true);
    setAuthError(null);
    
    try {
      // CHANGED: Make API request without code parameter to trigger demo mode
      // The API recognizes this as a demo mode request when ENABLE_DEMO_MODE=true
      const response = await fetch('/api/session');
      
      if (response.ok) {
        // CHANGED: Parse the demo data from the response
        const demoData = await response.json();
        
        // CHANGED: Enrich the session data with demo mode flags
        // This helps the application identify this as a demo session throughout
        const enrichedData = {
          ...demoData,
          isDemoMode: true,        // Flag to identify demo sessions
          accessCode: 'DEMO'       // Special code for demo mode
        };
        
        // CHANGED: Set the session data in context
        setSessionData(enrichedData);
        
        // CHANGED: Log successful demo mode initialization
        addLog('DEMO MODE: Session initialized');
        
        // CHANGED: Navigate to ProfileBoot to start the demo experience
        // The second parameter 'false' prevents adding to navigation history
        navigate('ProfileBoot', false);
        
      } else {
        // CHANGED: Handle case where demo mode is not available (e.g., ENABLE_DEMO_MODE=false)
        addLog('DEMO MODE: Failed to initialize');
        setAuthError('Demo mode is not available at this time');
      }
    } catch (error) {
      // CHANGED: Handle network errors or other exceptions
      addLog(`DEMO MODE ERROR: ${error.message}`);
      setAuthError('Failed to start demo mode. Please try again.');
    } finally {
      // CHANGED: Always reset loading state when done
      setIsLoading(false);
    }
  };

  // ========== RENDER ==========
  return (
    <div className="p-4">
      {/* Main authentication section */}
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        {/* Input field - now same size text as buttons */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}
          className={`input-base flex-1 text-sm tracking-wider ${authError ? 'input-error animate-pulse' : ''}`}
        placeholder="ENTER ACCESS CODE"
        autoFocus
        disabled={isLoading || isConnected}
      />

        {/* Authenticate button - now on same line as input on desktop */}
        <Button
          onClick={handleSubmit}
          disabled={isLoading || isConnected}
          icon={LockOpen}
          variant="inline"
          className="md:w-auto w-full"
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
          disabled={isConnected}
          icon={MessageSquare}
          className="flex-1"
        >
          {/* Icon automatically gets text-command class from Button component */}
          GET CODE
        </Button>

        <Button
          onClick={handleWeb3Login}
          disabled={isLoggingOut.current || web3Status === 'disconnecting' || web3LogoutPending}
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
        >
          GITHUB
        </Button>

        <Button
          onClick={handleDemoMode}
          icon={Sparkles}
          className="flex-1"
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