// src/app/screens/Entry.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSession } from '../context/SessionContext';
import { useRouter } from 'next/navigation';
import { MessageSquare, Wallet } from 'lucide-react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';

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
    setSessionData, 
    navigate 
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
    
    console.log('[WEB3 AUTH] Starting authentication for:', walletAddress);
    hasInitialized.current = true; // Mark as initialized immediately
    
    // Update UI to show processing state
    setWeb3Status('connecting');
    addLog(`WEB3 CONNECTED: ${walletAddress}`);
    
    try {
      // Fetch session data using the dedicated Web3 access code
      // 0XDEFI2311 is a special code in content.json for Web3 users
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
            company: `Web3 User: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
            accessMethod: 'web3' // Track how user authenticated
          },
          
          // Customize profile data for Web3 users
          profile: {
            ...userData.profile,
            greeting_name: 'Web3 User',
            summary: {
              ...userData.profile?.summary,
              title: 'Web3 Authenticated User',
              specialization: `Wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
              background: 'Decentralized Access'
            }
          }
        };
        
        // Store session data in context
        setSessionData(web3SessionData);
        addLog(`WEB3 ACCESS GRANTED: ${walletAddress}`);
        
        // Update UI state
        setWeb3Status('connected');
        
        // Navigate to main hub without adding Entry to history
        navigate('MainHub', false);
        
        // Update URL to reflect Web3 authentication
        // This allows sharing the link while maintaining privacy
        router.push(`/?web3=${walletAddress}`);
        
      } else {
        // Handle failed authentication
        console.error('[WEB3 AUTH] Server returned error:', response.status);
        addLog('ERROR: Failed to create Web3 session');
        setAuthError('Failed to authenticate with Web3. Please try again.');
        setWeb3Status('idle');
        
        // Disconnect wallet on failure to reset state
        if (isConnected) {
          await disconnectAsync();
        }
        
        // Reset initialization flag on failure
        hasInitialized.current = false;
      }
    } catch (error) {
      // Handle network or other errors
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
      
      // Reset initialization flag on error
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
  
  // ========== EFFECT 1: WEB3 AUTHENTICATION MONITOR ==========
  /**
   * Monitors wallet connection state and triggers authentication
   * This effect is the main entry point for Web3 authentication
   */
  useEffect(() => {
    // Debug logging to track effect execution
    console.log(`[WEB3 MONITOR] isConnected: ${isConnected}, address: ${address}, isLoggingOut: ${isLoggingOut.current}, hasInitialized: ${hasInitialized.current}`);
    
    // CRITICAL: Check logout flag first to prevent race conditions
    if (isLoggingOut.current) {
      console.log('[WEB3 MONITOR] Skipped: Logout in progress');
      return;
    }
    
    // Trigger authentication when wallet connects
    if (isConnected && address && !hasInitialized.current) {
      console.log('[WEB3 MONITOR] Wallet connected, starting authentication');
      handleWeb3Success(address);
    }
    
    // Reset initialization flag when wallet disconnects
    // This allows re-authentication after a proper logout
    if (!isConnected && hasInitialized.current) {
      console.log('[WEB3 MONITOR] Wallet disconnected, resetting initialization flag');
      hasInitialized.current = false;
      setWeb3Status('idle');
    }
  }, [isConnected, address, handleWeb3Success]);
  
  // ========== EFFECT 2: WEB3 LOGOUT REQUEST HANDLER ==========
  /**
   * Listens for logout events from SessionContext
   * This is triggered when user clicks the X button in the header
   */
  useEffect(() => {
    const handleWeb3LogoutRequest = async () => {
      console.log('[WEB3 LOGOUT] Event received from SessionContext');
      
      // CRITICAL: Set logout flag immediately to prevent re-authentication
      // This must happen before any async operations
      isLoggingOut.current = true;
      setWeb3Status('disconnecting');
      
      if (isConnected) {
        addLog('WEB3 LOGOUT: Starting disconnect process');
        
        try {
          // Attempt to disconnect the wallet
          console.log('[WEB3 LOGOUT] Calling disconnectAsync...');
          await disconnectAsync();
          console.log('[WEB3 LOGOUT] disconnectAsync completed successfully');
          addLog('WEB3 LOGOUT: Wallet disconnected successfully');
        } catch (error) {
          // Log error but don't throw - we still want to complete logout
          console.error('[WEB3 LOGOUT] Error during disconnect:', error);
          addLog('WEB3 LOGOUT: Error during disconnect (continuing anyway)');
        }
        // DO NOT reset isLoggingOut here - wait for Effect 3 to handle it
      } else {
        // Edge case: logout requested but wallet not connected
        console.log('[WEB3 LOGOUT] Wallet already disconnected');
        
        // Reset flag after a short delay to ensure state consistency
        setTimeout(() => {
          isLoggingOut.current = false;
          setWeb3Status('idle');
          console.log('[WEB3 LOGOUT] Lock released (wallet was already disconnected)');
        }, 100);
      }
    };
    
    // Register the event listener
    window.addEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    
    // Cleanup: remove listener on unmount or dependency change
    return () => {
      window.removeEventListener('web3-logout-requested', handleWeb3LogoutRequest);
    };
  }, [isConnected, disconnectAsync, addLog]);

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
    setAuthError(null); // Clear any previous errors
    addLog(`AUTHENTICATING: ${code}`);
    
    // Navigate with the code parameter
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
    let telegramUrl;
    
    // Priority: domainData > domain detection > default
    if (domainData?.telegram) {
      telegramUrl = domainData.telegram;
    } else if (currentDomain?.includes('undevy')) {
      telegramUrl = 'https://t.me/undevy';
    } else if (currentDomain?.includes('foxous')) {
      telegramUrl = 'https://t.me/foxous';
    } else {
      // Default fallback
      telegramUrl = 'https://t.me/undevy';
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

  // ========== RENDER ==========
  return (
    <div className="p-4">
      {/* Traditional authentication input */}
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        onKeyPress={handleKeyPress}
        className={`w-full p-3 mb-3 rounded font-mono text-lg tracking-wider ${
          theme === 'dark' 
            ? 'bg-dark-input-bg text-dark-text-primary' 
            : 'bg-light-input-bg text-light-text-primary'
        } border ${
          authError
            ? (theme === 'dark' ? 'border-dark-error' : 'border-light-error')
            : (theme === 'dark' ? 'border-dark-border' : 'border-light-border')
        } ${
          authError ? 'animate-pulse' : ''
        }`}
        placeholder="ENTER ACCESS CODE"
        autoFocus
        disabled={isLoading || isConnected} // Disable when loading or Web3 connected
      />

      {/* Error message display */}
      {authError && (
        <div className={`mb-3 text-sm ${
          theme === 'dark' ? 'text-dark-error' : 'text-light-error'
        }`}>
          {authError}
        </div>
      )}

      {/* Traditional authentication button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || isConnected}
        className={`w-full p-3 mb-3 border rounded transition-colors ${
          theme === 'dark'
            ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
            : 'border-light-border hover:bg-light-hover text-light-text-primary'
        } ${(isLoading || isConnected) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
      </button>

      {/* Two-button row: Get Code and Web3 Login */}
      <div className="flex gap-3">
        {/* Get Code button with Telegram icon */}
        <button
          onClick={handleGetCode}
          disabled={isConnected}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 transition-colors ${
            theme === 'dark'
              ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
              : 'border-light-border hover:bg-light-hover text-light-text-primary'
          } ${isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          GET CODE
        </button>

        {/* Web3 Login button with Wallet icon */}
        <button
          onClick={handleWeb3Login}
          disabled={isLoggingOut.current || web3Status === 'disconnecting'}
          className={`flex-1 p-3 border rounded flex items-center justify-center gap-2 transition-colors ${
            theme === 'dark'
              ? 'border-dark-border hover:bg-dark-hover text-dark-text-primary'
              : 'border-light-border hover:bg-light-hover text-light-text-primary'
          } ${(isLoggingOut.current || web3Status === 'disconnecting') ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Wallet className="w-4 h-4" />
          {isConnected 
            ? `${address.slice(0, 6)}...${address.slice(-4)}` 
            : web3Status === 'connecting' 
              ? 'CONNECTING...' 
              : 'WEB3 LOGIN'
          }
        </button>
      </div>
      
      {/* Web3 processing indicator */}
      {isConnected && web3Status === 'connecting' && (
        <div className={`mt-2 text-center text-xs ${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          Processing Web3 authentication...
        </div>
      )}
      
      {/* Disconnecting indicator */}
      {web3Status === 'disconnecting' && (
        <div className={`mt-2 text-center text-xs ${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          Disconnecting wallet...
        </div>
      )}
    </div>
  );
}