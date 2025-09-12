// src/app/components/Web3Manager.test.js
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Web3Manager, useWeb3Manager } from './Web3Manager';

// Mock the Web3Provider that is lazy loaded
// This prevents "Element type is invalid" errors
jest.mock('./Web3Provider', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div data-testid="web3-provider">{children}</div>
  };
});

// Variable to control Web3Bridge mock behavior from tests
let mockWeb3BridgeCallback = null;
let mockWeb3BridgeState = {
  address: null,
  isConnected: false,
  open: jest.fn(),
  disconnect: jest.fn(),
  disconnectAsync: jest.fn(() => Promise.resolve()) // Fixed: Returns Promise instead of undefined
};

// Mock the Web3Bridge component with controllable behavior
jest.mock('./Web3Bridge', () => ({
  __esModule: true,
  default: ({ onWeb3StateChange }) => {
    // Store the callback for test manipulation
    mockWeb3BridgeCallback = onWeb3StateChange;
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // Report the current mock state to the parent
      if (onWeb3StateChange) {
        onWeb3StateChange(mockWeb3BridgeState);
      }
    }, [onWeb3StateChange]);
    return null;
  }
}));

// Test component to access the context
function TestComponent() {
  const { isWeb3Loaded, isWeb3Ready, loadWeb3, isLoading, web3State } = useWeb3Manager();
  
  return (
    <div data-testid="test-component">
      <div data-testid="loaded">{isWeb3Loaded.toString()}</div>
      <div data-testid="ready">{isWeb3Ready.toString()}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <button onClick={loadWeb3} data-testid="load-button">Load Web3</button>
      <div data-testid="web3-state">
        {web3State ? `Connected: ${web3State.isConnected}, Address: ${web3State.address}` : 'No state'}
      </div>
    </div>
  );
}

describe('Web3Manager', () => {
  beforeEach(() => {
    // Clear any console mocks between tests
    jest.clearAllMocks();
    jest.clearAllTimers();
    
    // Reset the mock state to default
    mockWeb3BridgeCallback = null;
    mockWeb3BridgeState = {
      address: null,
      isConnected: false,
      open: jest.fn(),
      disconnect: jest.fn(),
      disconnectAsync: jest.fn(() => Promise.resolve()) // Fixed: Returns Promise
    };
  });

  afterEach(async () => {
    // Wait for any pending microtasks to complete
    await new Promise(resolve => setTimeout(resolve, 0));
  });

  test('initially does not load Web3 libraries', () => {
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    expect(screen.getByTestId('loaded')).toHaveTextContent('false');
    expect(screen.getByTestId('ready')).toHaveTextContent('false');
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.queryByTestId('web3-provider')).not.toBeInTheDocument();
  });
  
  test('loads Web3 libraries when loadWeb3 is called', async () => {
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    // Initially not loaded
    expect(screen.getByTestId('loaded')).toHaveTextContent('false');
    
    const loadButton = screen.getByTestId('load-button');
    
    // Wrap the click and all subsequent state updates in act
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Now wait for the actual loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // The TestComponent should still be in the DOM, now inside Web3Provider
    await waitFor(() => {
      expect(screen.getByTestId('loaded')).toHaveTextContent('true');
      // Ready becomes true after Web3Bridge calls onWeb3StateChange
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
    }, { timeout: 2000 });
  });
  
  test('shows loading state correctly', async () => {
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    const loadButton = screen.getByTestId('load-button');
    
    // Initial state should not be loading
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    
    // Click to trigger loading
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Wait for the final state after loading completes
    await waitFor(() => {
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    }, { timeout: 2000 });
  });
  
  test('does not reload if already loaded', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    const loadButton = screen.getByTestId('load-button');
    
    // First load
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Wait for Web3 to be ready
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
    }, { timeout: 2000 });
    
    // Clear console logs
    consoleSpy.mockClear();
    
    // Try to load again - should not trigger another load
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Should not log the initiating message again
    expect(consoleSpy).not.toHaveBeenCalledWith('[Web3Manager] Initiating Web3 library loading');
    
    consoleSpy.mockRestore();
  });
  
  test('handles rapid clicks correctly', async () => {
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    const loadButton = screen.getByTestId('load-button');
    
    // Click multiple times rapidly within act
    await act(async () => {
      fireEvent.click(loadButton);
      fireEvent.click(loadButton);
      fireEvent.click(loadButton);
    });
    
    // Should still end up in a stable state
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    await waitFor(() => {
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    }, { timeout: 2000 });
  });
  
  test('receives and stores Web3 state from Web3Bridge', async () => {
    // Render the component with default mock state
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    // Initially no Web3 state
    expect(screen.getByTestId('web3-state')).toHaveTextContent('No state');
    
    // Trigger loading
    const loadButton = screen.getByTestId('load-button');
    
    await act(async () => {
    fireEvent.click(loadButton);
    });
    
    // Wait for Web3Provider to be loaded
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Now simulate a change in Web3 state (like wallet connection)
    const connectedState = {
      address: '0x1234567890',
      isConnected: true,
      open: jest.fn(),
      disconnect: jest.fn(),
      disconnectAsync: jest.fn(() => Promise.resolve()) // Fixed: Returns Promise
    };
    
    // Update the mock state and trigger the callback
    await act(async () => {
      mockWeb3BridgeState = connectedState;
      if (mockWeb3BridgeCallback) {
        mockWeb3BridgeCallback(connectedState);
      }
    });
    
    // Wait for the state to be reflected in the UI
    await waitFor(() => {
      const stateElement = screen.getByTestId('web3-state');
      expect(stateElement.textContent).toContain('Connected: true');
      expect(stateElement.textContent).toContain('Address: 0x1234567890');
    }, { timeout: 2000 });
  });
});