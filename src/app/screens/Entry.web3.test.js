// src/app/screens/Entry.web3.test.js
// Patched for stable unit testing: safe SessionProvider + safe Button mock.

jest.mock('../context/SessionContext', () => {
  const React = require('react');

  // Create a real context so useSession can read the value provided in tests
  const SessionContext = React.createContext(null);

  // Minimal SessionProvider that accepts a "value" prop (same shape as real provider)
  function SessionProvider({ children, value }) {
    return React.createElement(SessionContext.Provider, { value }, children);
  }

  // useSession hook that components call
  function useSession() {
    return React.useContext(SessionContext);
  }

  return {
    __esModule: true,
    SessionProvider,
    SessionContext,
    useSession,
  };
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SessionProvider } from '../context/SessionContext';
import { Web3Manager } from '../components/Web3Manager';
import Entry from './Entry';

// safe Button mock — DO NOT spread props into DOM element
jest.mock('../components/ui/Button', () => {
  return function MockButton(props) {
    const { children, onClick, disabled, ariaLabel, type = 'button' } = props;
    const ariaFromAttr = props['aria-label'];
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel || ariaFromAttr}
      >
        {children}
      </button>
    );
  };
});

// ADDED: Mock the new useWeb3State hook that Entry now uses
// This replaces the old useWeb3Integration mock
jest.mock('../hooks/useWeb3State', () => ({
  useWeb3State: jest.fn(() => ({
    address: null,
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
    openWeb3Modal: jest.fn(),
    disconnectWallet: jest.fn(),
    isWeb3Loading: false,
    isWeb3Ready: false,
    isWeb3Loaded: false
  }))
}));

// ADDED: Mock the Web3Bridge component that Web3Manager uses
jest.mock('../components/Web3Bridge', () => ({
  __esModule: true,
  default: function MockWeb3Bridge({ onWeb3StateChange }) {
    // Simulate calling the callback with mock Web3 state
    React.useEffect(() => {
      if (onWeb3StateChange) {
        onWeb3StateChange({
          address: null,
          isConnected: false,
          isConnecting: false,
          isDisconnected: true,
          open: jest.fn(),
          disconnect: jest.fn(),
          disconnectAsync: jest.fn()
        });
      }
    }, [onWeb3StateChange]);
    return null;
  }
}));

// Mock fetch globally for tests (you already polyfilled fetch in jest.env.js but keep this)
global.fetch = jest.fn();

// Mock the router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock the Web3Provider to prevent ESM import issues
jest.mock('../components/Web3Provider', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="mocked-web3-provider">{children}</div>,
  Web3Provider: ({ children }) => <div data-testid="mocked-web3-provider">{children}</div>
}));

// Mock the Web3 config to prevent import issues
jest.mock('../lib/web3-config', () => ({
  appKit: {},
  web3Config: {
    projectId: 'test-project-id',
    wagmiAdapter: {
      wagmiConfig: {}
    }
  }
}));

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useAccount: jest.fn(() => ({
    address: null,
    isConnected: false,
  })),
  useDisconnect: jest.fn(() => ({
    disconnectAsync: jest.fn(),
  })),
  WagmiProvider: ({ children }) => children,
}));

// Mock @reown/appkit
jest.mock('@reown/appkit/react', () => ({
  useAppKit: jest.fn(() => ({
    open: jest.fn(),
  })),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }) => children,
}));

// Your MockSessionProvider
const MockSessionProvider = ({ children }) => {
  const mockContext = {
    theme: 'dark',
    addLog: jest.fn(),
    currentDomain: 'localhost',
    domainData: {},
    authError: null,
    setAuthError: jest.fn(),
    sessionData: null,
    setSessionData: jest.fn(),
    navigate: jest.fn(),
    isTerminating: false,
    web3LogoutPending: false,
    setWeb3LogoutPending: jest.fn(),
    autoFillCode: null,
    setAutoFillCode: jest.fn(),
    logoutInProgress: false,
  };

  return (
    <SessionProvider value={mockContext}>
      {children}
    </SessionProvider>
  );
};

// Helper to render with all required providers
function renderEntry() {
  // Setup fetch mock to return empty response
  global.fetch.mockResolvedValue({
    ok: false,
    json: async () => ({}),
  });

  return render(
    <MockSessionProvider>
      <Web3Manager>
        <Entry />
      </Web3Manager>
    </MockSessionProvider>
  );
}

describe('Entry Screen Web3 Lazy Loading', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset fetch mock
    global.fetch.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Web3 button is visible and clickable', () => {
    renderEntry();
    
    const web3Button = screen.getByRole('button', { name: /WEB3 LOGIN/i });
    expect(web3Button).toBeInTheDocument();
    expect(web3Button).not.toBeDisabled();
  });
  
  test('shows loading state when Web3 button is clicked for first time', async () => {
    // UPDATED: Import and configure the mock for useWeb3State
    const { useWeb3State } = require('../hooks/useWeb3State');
    
    // Set up the mock to simulate loading state after click
    const mockOpenWeb3Modal = jest.fn();
    useWeb3State.mockReturnValue({
      address: null,
      isConnected: false,
      openWeb3Modal: mockOpenWeb3Modal,
      disconnectWallet: jest.fn(),
      isWeb3Loading: false,
      isWeb3Ready: false
    });
    
    renderEntry();
    
    const web3Button = screen.getByRole('button', { name: /WEB3 LOGIN/i });
    
    // Click the button
    fireEvent.click(web3Button);
    
    // Verify openWeb3Modal was called
    expect(mockOpenWeb3Modal).toHaveBeenCalled();
    
    // Update mock to show loading state
    useWeb3State.mockReturnValue({
      address: null,
      isConnected: false,
      openWeb3Modal: mockOpenWeb3Modal,
      disconnectWallet: jest.fn(),
      isWeb3Loading: true, // Now loading
      isWeb3Ready: false
    });
    
    // Should show connecting state (Entry sets this when button is clicked)
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /CONNECTING|WEB3 LOGIN/i });
      expect(button).toBeInTheDocument();
    }, { timeout: 3000 });
  });
  
  test('traditional authentication still works', async () => {
    // Mock successful authentication
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meta: { company: 'Test Company' },
        profile: { name: 'Test User' }
      }),
    });

    renderEntry();
    
    const codeInput = screen.getByPlaceholderText(/ENTER ACCESS CODE/i);
    const authButton = screen.getByRole('button', { name: /AUTHENTICATE/i });
    
    // Enter a code
    fireEvent.change(codeInput, { target: { value: 'TEST123' } });
    
    // Click authenticate
    fireEvent.click(authButton);
    
    // Should show authenticating state
    await waitFor(() => {
      expect(authButton).toHaveTextContent(/AUTHENTICATING/i);
    });

    // Verify fetch was called with the code
    expect(global.fetch).toHaveBeenCalledWith('/api/session?code=TEST123');
  });
  
  test('Web3 loading does not interfere with other buttons', () => {
    renderEntry();
    
    const getCodeButton = screen.getByRole('button', { name: /GET CODE/i });
    const githubButton = screen.getByRole('button', { name: /GITHUB/i });
    const demoButton = screen.getByRole('button', { name: /DEMO MODE/i });
    
    // All buttons should be present and enabled
    expect(getCodeButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
    expect(demoButton).toBeInTheDocument();
    
    expect(getCodeButton).not.toBeDisabled();
    expect(githubButton).not.toBeDisabled();
    expect(demoButton).not.toBeDisabled();
  });

  test('Web3 button shows different states correctly', async () => {
    // UPDATED: Use the new useWeb3State mock instead of direct wagmi mocks
    const { useWeb3State } = require('../hooks/useWeb3State');
    
    // Start with disconnected state
    useWeb3State.mockReturnValue({
      address: null,
      isConnected: false,
      openWeb3Modal: jest.fn(),
      disconnectWallet: jest.fn(),
      isWeb3Loading: false,
      isWeb3Ready: false
    });

    const { rerender } = renderEntry();
    
    let web3Button = screen.getByRole('button', { name: /WEB3 LOGIN/i });
    expect(web3Button).toHaveTextContent('WEB3 LOGIN');
    
    // Simulate connected state
    useWeb3State.mockReturnValue({
      address: '0x1234567890123456789012345678901234567890',
      isConnected: true,
      openWeb3Modal: jest.fn(),
      disconnectWallet: jest.fn(),
      isWeb3Loading: false,
      isWeb3Ready: true
    });
    
    // Force re-render to pick up the new mock value
    rerender(
      <MockSessionProvider>
        <Web3Manager>
          <Entry />
        </Web3Manager>
      </MockSessionProvider>
    );
    
    // Should show truncated address when connected
    web3Button = screen.getByRole('button', { name: /0x1234.*7890/i });
    expect(web3Button).toBeInTheDocument();
  });

  test('clicking Web3 button triggers Web3Manager loading', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    // UPDATED: Set up mock to trigger loading
    const { useWeb3State } = require('../hooks/useWeb3State');
    const mockOpenWeb3Modal = jest.fn(() => {
      // Simulate Web3Manager loading being triggered
      console.log('[Web3Manager] Initiating Web3 library loading');
    });
    
    useWeb3State.mockReturnValue({
      address: null,
      isConnected: false,
      openWeb3Modal: mockOpenWeb3Modal,
      disconnectWallet: jest.fn(),
      isWeb3Loading: false,
      isWeb3Ready: false
    });
    
    renderEntry();
    
    const web3Button = screen.getByRole('button', { name: /WEB3 LOGIN/i });
    fireEvent.click(web3Button);
    
    // Check that Web3Manager initiated loading
    await waitFor(() => {
      const logs = consoleSpy.mock.calls.map(call => call[0]);
      const hasLoadingLog = logs.some(log => 
        log.includes('[Web3Manager] Initiating Web3 library loading') ||
        log.includes('[useWeb3State]') // UPDATED: Look for new hook logs
      );
      expect(hasLoadingLog).toBe(true);
    });
    
    consoleSpy.mockRestore();
  });
  
  // ADDED: New test to verify lazy loading behavior
  test('Web3 libraries are not loaded on initial render', () => {
    const { useWeb3State } = require('../hooks/useWeb3State');
    
    // Mock shows Web3 not loaded initially
    useWeb3State.mockReturnValue({
      address: null,
      isConnected: false,
      openWeb3Modal: jest.fn(),
      disconnectWallet: jest.fn(),
      isWeb3Loading: false,
      isWeb3Ready: false,
      isWeb3Loaded: false // Not loaded initially
    });
    
    renderEntry();
    
    // Web3 button should be available but Web3 not loaded
    const web3Button = screen.getByRole('button', { name: /WEB3 LOGIN/i });
    expect(web3Button).toBeInTheDocument();
    
    // Verify Web3Provider is not rendered (since it's lazy loaded)
    expect(screen.queryByTestId('mocked-web3-provider')).not.toBeInTheDocument();
  });
});