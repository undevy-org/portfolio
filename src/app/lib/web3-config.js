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

const projectId = 'b75ae0dd3030e568aae32958c74eb59b';

const metadata = {
  name: 'Interactive Terminal Portfolio',
  description: 'Interactive Terminal Portfolio with Web3 Access',
  url: 'https://undevy.com', // Will change dynamically
  icons: ['https://undevy.com/icon.png'] // We can add a real icon later
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

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,

  ssr: true
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#4ade80', // Green color from our theme
    '--w3m-border-radius-master': '8px',
  }
});

export const web3Config = {
  projectId,
  wagmiAdapter
};
