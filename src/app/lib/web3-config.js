// src/app/lib/web3-config.js
'use client';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { 
  mainnet,           // Ethereum mainnet
  polygon,           // Polygon (formerly Matic)
  arbitrum,          // Arbitrum L2
  avalanche,         // Avalanche C-Chain
  bsc,               // Binance Smart Chain
  optimism,          // Optimism L2
  gnosis,            // Gnosis Chain (formerly xDai)
  zkSync,            // zkSync Era
  base,              // Base (from Coinbase)
  celo,              // Celo
  aurora,            // Aurora (Near EVM)
  polygonZkEvm,      // Polygon zkEVM
  fantom,            // Fantom Opera
  klaytn,            // Klaytn
  mantle,            // Mantle Network
} from '@reown/appkit/networks';

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;

if (!projectId) {
  console.error('[Web3Config] CRITICAL: NEXT_PUBLIC_REOWN_PROJECT_ID is not set!');
  console.error('[Web3Config] Please add it to your .env.local file');
  console.error('[Web3Config] Get your Project ID from https://cloud.reown.com');
}

const metadata = {
  name: process.env.NEXT_PUBLIC_PORTFOLIO_NAME || 'Interactive Terminal Portfolio',
  description: process.env.NEXT_PUBLIC_PORTFOLIO_DESCRIPTION || 'Interactive Terminal Portfolio with Web3 Access',
  url: typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://example.com',
  icons: [typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : `${process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://example.com'}/icon.png`]
};

const networks = [
  mainnet,
  polygon,
  arbitrum,
  avalanche,
  bsc,
  optimism,
  gnosis,
  zkSync,
  base,
  celo,
  aurora,
  polygonZkEvm,
  fantom,
  klaytn,
  mantle,
];

// Only create adapter if we have a valid projectId
const wagmiAdapter = projectId ? new WagmiAdapter({
  networks,
  projectId,
  ssr: true
}) : null;

// Only create appKit if we have a valid projectId
export const appKit = projectId ? createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#4ade80', // Green color from our theme
    '--w3m-border-radius-master': '8px',
  }
}) : null;

export const web3Config = {
  projectId,
  wagmiAdapter,
  isConfigured: !!projectId // Helper flag to check if Web3 is properly configured
};
