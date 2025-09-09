// __mocks__/wagmi.js
module.exports = {
  useAccount: jest.fn(() => ({
    address: null,
    isConnected: false,
  })),
  useDisconnect: jest.fn(() => ({
    disconnectAsync: jest.fn(),
    disconnect: jest.fn(),
  })),
  WagmiProvider: ({ children }) => children,
  createConfig: jest.fn(),
};
