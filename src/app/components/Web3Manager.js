// src/app/components/Web3Manager.js
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load components without Suspense to avoid re-render
const Web3Provider = dynamic(() => import('./Web3Provider'), { 
  ssr: false,
  loading: () => null // No loading component to avoid flicker
});

const Web3Bridge = dynamic(() => import('./Web3Bridge'), { 
  ssr: false,
  loading: () => null // No loading component to avoid flicker
});

// Create a context to share Web3 loading state across the application
const Web3Context = createContext({
  isWeb3Loaded: false,
  isWeb3Ready: false,
  loadWeb3: () => {},
  isLoading: false,
  web3State: null
});

// Custom hook to access Web3 loading state from any component
export function useWeb3Manager() {
  return useContext(Web3Context);
}

export function Web3Manager({ children }) {
  // Track whether we've initiated Web3 loading
  const [isWeb3Loaded, setIsWeb3Loaded] = useState(false);
  
  // Track whether Web3 is fully ready for use
  const [isWeb3Ready, setIsWeb3Ready] = useState(false);
  
  // Track loading state for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  
  // State to hold the actual Web3 hook values received from Web3Bridge
  const [web3State, setWeb3State] = useState(null);
  
  // Function to trigger Web3 loading
  const loadWeb3 = useCallback(() => {
    if (!isWeb3Loaded && !isLoading) {
      console.log('[Web3Manager] Initiating Web3 library loading');
      setIsLoading(true);
      // Delay the actual loading to next tick to avoid immediate re-render
      setTimeout(() => {
        setIsWeb3Loaded(true);
      }, 0);
    }
  }, [isWeb3Loaded, isLoading]);
  
  // Callback handler for receiving Web3 state updates from Web3Bridge
  const handleWeb3StateChange = useCallback((newWeb3State) => {
    console.log('[Web3Manager] Web3 state updated from bridge:', {
      address: newWeb3State.address,
      isConnected: newWeb3State.isConnected,
      hasOpenFunction: !!newWeb3State.open
    });
    
    // Update the web3State with new values from Web3Bridge
    setWeb3State(newWeb3State);
    
    // When we receive valid Web3 state, mark as ready and stop loading
    if (!isWeb3Ready && newWeb3State.open) {
      setIsWeb3Ready(true);
      setIsLoading(false);
      console.log('[Web3Manager] Web3 is now fully ready');
    }
  }, [isWeb3Ready]);
  
  // Debug logging for development
  useEffect(() => {
    console.log('[Web3Manager] State:', { 
      isWeb3Loaded, 
      isWeb3Ready, 
      isLoading,
      hasWeb3State: !!web3State,
      isConnected: web3State?.isConnected 
    });
  }, [isWeb3Loaded, isWeb3Ready, isLoading, web3State]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // If Web3 was loaded, ensure clean disconnection on unmount
      if (isWeb3Ready && web3State?.disconnectAsync) {
        console.log('[Web3Manager] Cleaning up on unmount');
        web3State.disconnectAsync().catch(console.error);
      }
    };
  }, [isWeb3Ready, web3State]);

  return (
    <Web3Context.Provider value={{ 
      isWeb3Loaded, 
      isWeb3Ready,
      loadWeb3, 
      isLoading,
      web3State
    }}>
      {children}
      {/* Render Web3 components conditionally without Suspense */}
      {isWeb3Loaded && (
        <div style={{ display: 'none' }}>
          <Web3Provider>
            <Web3Bridge onWeb3StateChange={handleWeb3StateChange} />
          </Web3Provider>
        </div>
      )}
    </Web3Context.Provider>
  );
}
