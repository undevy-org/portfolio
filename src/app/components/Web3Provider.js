// src/app/components/Web3Provider.js
'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { web3Config } from '../lib/web3-config';

const queryClient = new QueryClient();

function Web3Provider({ children }) {
  return (
    <WagmiProvider config={web3Config.wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3Provider;