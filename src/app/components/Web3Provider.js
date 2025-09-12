// src/app/components/Web3Provider.js
'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { web3Config } from '../lib/web3-config';
import { useState } from 'react';

/**
 * Web3Provider wraps the application with Web3 context providers.
 * This component is lazy-loaded to avoid including Web3 libraries in the initial bundle.
 */
export default function Web3Provider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  // If Web3 is not configured, show error message
  if (!web3Config.isConfigured || !web3Config.wagmiAdapter) {
    console.error('[Web3Provider] Web3 is not properly configured!');
    return (
      <div style={{ 
        padding: '20px', 
        background: '#ff0000', 
        color: '#ffffff',
        textAlign: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }}>
        ⚠️ Web3 Configuration Error: NEXT_PUBLIC_REOWN_PROJECT_ID is missing!
      </div>
    );
  }

  return (
    <WagmiProvider config={web3Config.wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
