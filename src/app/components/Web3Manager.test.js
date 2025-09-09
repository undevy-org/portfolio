// src/app/components/Web3Manager.test.js
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React, { Suspense } from 'react';
import { Web3Manager, useWeb3Manager } from './Web3Manager';

// ADDED: Mock the Web3Provider that is lazy loaded
// This was missing and causing the "Element type is invalid" error
jest.mock('./Web3Provider', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div data-testid="web3-provider">{children}</div>
  };
});

// Mock the Web3Bridge component
jest.mock('./Web3Bridge', () => ({
  __esModule: true,
  default: ({ onWeb3StateChange }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // Simulate Web3Bridge reporting its state to the parent
      onWeb3StateChange({
        address: null,
        isConnected: false,
        open: jest.fn(),
        disconnect: jest.fn(),
        disconnectAsync: jest.fn()
      });
    }, [onWeb3StateChange]);
    return null;
  }
}));

// Test component to access the context
function TestComponent() {
  const { isWeb3Loaded, isWeb3Ready, loadWeb3, isLoading } = useWeb3Manager();
  
  return (
    <div data-testid="test-component">
      <div data-testid="loaded">{isWeb3Loaded.toString()}</div>
      <div data-testid="ready">{isWeb3Ready.toString()}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <button onClick={loadWeb3} data-testid="load-button">Load Web3</button>
    </div>
  );
}

describe('Web3Manager', () => {
  beforeEach(() => {
    // Clear any console mocks between tests
    jest.clearAllMocks();
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
    const { container } = render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    // Initially, TestComponent should be visible
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByTestId('loaded')).toHaveTextContent('false');
    
    const loadButton = screen.getByTestId('load-button');
    
    // Click to load Web3
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // After clicking, isWeb3Loaded becomes true and Web3Provider should render
    // The mocked Web3Provider renders immediately in tests (no actual async loading)
    
    // Wait for the Web3Provider to appear
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    // The TestComponent should still be in the DOM, now inside Web3Provider
    await waitFor(() => {
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByTestId('loaded')).toHaveTextContent('true');
      // Ready becomes true after Web3Bridge calls onWeb3StateChange
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    }, { timeout: 1000 });
  });
  
  test('shows loading state correctly', async () => {
    render(
      <Web3Manager>
        <TestComponent />
      </Web3Manager>
    );
    
    const loadButton = screen.getByTestId('load-button');
    
    // Initial state
    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('loaded')).toHaveTextContent('false');
    
    // Click to load
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Final state - loaded and ready
    await waitFor(() => {
      expect(screen.getByTestId('loaded')).toHaveTextContent('true');
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
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
    }, { timeout: 1000 });
    
    await waitFor(() => {
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
    }, { timeout: 1000 });
    
    // Clear console logs
    consoleSpy.mockClear();
    
    // Try to load again
    await act(async () => {
      fireEvent.click(loadButton);
    });
    
    // Should not trigger another load
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
    
    // Click multiple times rapidly
    await act(async () => {
      fireEvent.click(loadButton);
      fireEvent.click(loadButton);
      fireEvent.click(loadButton);
    });
    
    // Should still end up in a stable state
    await waitFor(() => {
      expect(screen.queryByTestId('web3-provider')).toBeInTheDocument();
    }, { timeout: 1000 });
    
    await waitFor(() => {
      expect(screen.getByTestId('ready')).toHaveTextContent('true');
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    }, { timeout: 1000 });
  });
  
  // ADDED: Test that Web3Bridge integration works correctly
  test('receives and stores Web3 state from Web3Bridge', async () => {
    // Create a custom mock for this test to verify the callback
    const mockWeb3State = {
      address: '0x1234567890',
      isConnected: true,
      open: jest.fn(),
      disconnect: jest.fn(),
      disconnectAsync: jest.fn()
    };
    
    // Override the Web3Bridge mock for this specific test
    jest.doMock('./Web3Bridge', () => ({
      __esModule: true,
      default: ({ onWeb3StateChange }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        React.useEffect(() => {
          onWeb3StateChange(mockWeb3State);
        }, [onWeb3StateChange]);
        return null;
      }
    }));
    
    // Component to test web3State from context
    function Web3StateTestComponent() {
      const { web3State } = useWeb3Manager();
      return (
        <div data-testid="web3-state">
          {web3State ? `Connected: ${web3State.isConnected}, Address: ${web3State.address}` : 'No state'}
        </div>
      );
    }
    
    render(
      <Web3Manager>
        <Web3StateTestComponent />
        <TestComponent />
      </Web3Manager>
    );
    
    // Initially no Web3 state
    expect(screen.getByTestId('web3-state')).toHaveTextContent('No state');
    
    // Trigger loading
    const loadButton = screen.getByTestId('load-button');
    fireEvent.click(loadButton);
    
    // Wait for Web3Bridge to report state
    await waitFor(() => {
      const stateElement = screen.getByTestId('web3-state');
      // The mock should have provided the state
      expect(stateElement.textContent).toContain('Connected');
    }, { timeout: 1000 });
  });
});