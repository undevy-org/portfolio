'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { web3Config } from '../lib/web3-config';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={web3Config.wagmiAdapter.wagmiConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
}