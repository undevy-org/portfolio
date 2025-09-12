// src/app/components/Web3Manager.js
'use client';

import { createContext, useContext, useState, useCallback, lazy, Suspense, useEffect } from 'react';

// Lazy load the Web3Provider - this ensures it's not included in the initial bundle
// The import() function creates a separate chunk that's loaded on demand
const Web3Provider = lazy(() => import('./Web3Provider'));

// ADDED: Lazy load the Web3Bridge component that will provide Web3 hook values
// This component uses Web3 hooks normally and communicates values via callback
const Web3Bridge = lazy(() => import('./Web3Bridge'));

// Create a context to share Web3 loading state across the application
// UPDATED: Added web3State to context interface
const Web3Context = createContext({
  isWeb3Loaded: false,
  isWeb3Ready: false,
  loadWeb3: () => {},
  isLoading: false,
  web3State: null // ADDED: Holds the actual Web3 hook values (address, isConnected, etc.)
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
  
  // ADDED: State to hold the actual Web3 hook values received from Web3Bridge
  // This includes address, isConnected, open, disconnectAsync, etc.
  const [web3State, setWeb3State] = useState(null);
  
  // Function to trigger Web3 loading
  const loadWeb3 = useCallback(() => {
    if (!isWeb3Loaded && !isLoading) {
      console.log('[Web3Manager] Initiating Web3 library loading');
      setIsLoading(true);
      setIsWeb3Loaded(true);
      
      // REMOVED: The setTimeout for setIsWeb3Ready
      // The ready state is now set by handleWeb3StateChange when Web3Bridge reports values
    }
  }, [isWeb3Loaded, isLoading]);
  
  // ADDED: Callback handler for receiving Web3 state updates from Web3Bridge
  // This is called by Web3Bridge whenever Web3 hook values change
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
      web3State // ADDED: Include web3State in context value
    }}>
      {isWeb3Loaded ? (
        <Suspense fallback={
          // This fallback is hidden but helps React manage the loading state
          <div style={{ display: 'none' }}>Loading Web3 libraries...</div>
        }>
          <Web3Provider>
            {/* ADDED: Web3Bridge component that connects Web3 hooks to our context */}
            {/* It uses Web3 hooks normally and passes values up via callback */}
            <Web3Bridge onWeb3StateChange={handleWeb3StateChange} />
            {children}
          </Web3Provider>
        </Suspense>
      ) : (
        // When Web3 isn't loaded, render children directly
        children
      )}
    </Web3Context.Provider>
  );
}