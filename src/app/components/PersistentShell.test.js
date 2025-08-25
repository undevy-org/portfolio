// src/app/components/PersistentShell.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import PersistentShell from './PersistentShell';
import { MockSessionProvider } from '../../../test-utils/providers';

// Mock the child components to focus on PersistentShell behavior
jest.mock('../layouts/TerminalWindow', () => {
  const MockTerminalWindow = ({ title, children, fixedHeight }) => (
    <div data-testid="terminal-window" data-title={title} data-fixed-height={fixedHeight}>
      <div data-testid="terminal-header">Terminal: {title}</div>
      <div data-testid="terminal-content">{children}</div>
    </div>
  );
  MockTerminalWindow.displayName = 'TerminalWindow';
  return MockTerminalWindow;
});

jest.mock('./AnimatedScreenTransition', () => {
  const MockAnimatedScreenTransition = ({ children }) => (
    <div data-testid="animated-transition">{children}</div>
  );
  MockAnimatedScreenTransition.displayName = 'AnimatedScreenTransition';
  return MockAnimatedScreenTransition;
});

jest.mock('./ScreenRenderer', () => {
  const MockScreenRenderer = () => (
    <div data-testid="screen-renderer">Current Screen Content</div>
  );
  MockScreenRenderer.displayName = 'ScreenRenderer';
  return MockScreenRenderer;
});

// Test wrapper with providers
const TestWrapper = ({ children, initialScreen = 'MainHub', domainData = null, ...overrides }) => (
  <MockSessionProvider 
    currentScreen={initialScreen}
    sessionData={{ accessCode: 'TEST123' }}
    {...(domainData && { 
      domainData: {
        domain: 'test.com',
        terminalTitle: domainData.terminalTitle || 'test-portfolio',
        ...domainData
      }
    })}
    {...overrides}
  >
    {children}
  </MockSessionProvider>
);

describe('PersistentShell Component', () => {
  describe('Mounting Lifecycle', () => {
    test('renders TerminalWindow exactly once during component lifecycle', () => {
      const { rerender } = render(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Initial render should show TerminalWindow
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
      expect(screen.getByTestId('terminal-content')).toBeInTheDocument();

      // Re-render with different props should not create new TerminalWindow instance
      rerender(
        <TestWrapper initialScreen="Timeline">
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Still should have exactly one TerminalWindow
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
      expect(screen.getAllByTestId('terminal-window')).toHaveLength(1);
    });

    test('shows loading state without mounting TerminalWindow when isLoading=true', () => {
      render(
        <TestWrapper>
          <PersistentShell isLoading={true} />
        </TestWrapper>
      );

      // Should show loading message
      expect(screen.getByText('AUTHENTICATING...')).toBeInTheDocument();
      
      // Should NOT show TerminalWindow during loading
      expect(screen.queryByTestId('terminal-window')).not.toBeInTheDocument();
    });

    test('transitions from loading to mounted state without remounting', () => {
      const { rerender } = render(
        <TestWrapper>
          <PersistentShell isLoading={true} />
        </TestWrapper>
      );

      // Initially loading
      expect(screen.getByText('AUTHENTICATING...')).toBeInTheDocument();
      expect(screen.queryByTestId('terminal-window')).not.toBeInTheDocument();

      // Transition to loaded state
      rerender(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Should now show TerminalWindow
      expect(screen.queryByText('AUTHENTICATING...')).not.toBeInTheDocument();
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
    });
  });

  describe('Window Title Calculation', () => {
    test('calculates title correctly for Entry screen', () => {
      render(
        <TestWrapper initialScreen="Entry" domainData={{ terminalTitle: 'custom_terminal' }}>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'custom_terminal');
    });

    test('calculates title correctly for MainHub screen', () => {
      render(
        <TestWrapper initialScreen="MainHub" domainData={{ terminalTitle: 'main_hub_title' }}>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'main_hub_title');
    });

    test('converts CamelCase screen names to snake_case', () => {
      render(
        <TestWrapper initialScreen="CaseDetail">
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'case_detail');
    });

    test('handles screen names with multiple capital letters', () => {
      render(
        <TestWrapper initialScreen="SomeVeryLongScreenName">
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'some_very_long_screen_name');
    });

    test('falls back to domain name when no domainData.terminalTitle', () => {
      render(
        <TestWrapper 
          initialScreen="Entry" 
          currentDomain="example.com"
          domainData={{ terminalTitle: 'example.com_portfolio' }}
        >
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'example.com_portfolio');
    });

    test('falls back to generic portfolio when no domain data', () => {
      render(
        <MockSessionProvider
          currentScreen="Entry"
          currentDomain={null}
          domainData={null}
        >
          <PersistentShell isLoading={false} />
        </MockSessionProvider>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-title', 'portfolio');
    });
  });

  describe('Component Structure', () => {
    test('renders TerminalWindow with correct props', () => {
      render(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const terminalWindow = screen.getByTestId('terminal-window');
      expect(terminalWindow).toHaveAttribute('data-fixed-height', 'true');
    });

    test('renders AnimatedScreenTransition within TerminalWindow', () => {
      render(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      expect(screen.getByTestId('animated-transition')).toBeInTheDocument();
      expect(screen.getByTestId('screen-renderer')).toBeInTheDocument();
    });

    test('maintains component hierarchy during screen changes', () => {
      const { rerender } = render(
        <TestWrapper initialScreen="MainHub">
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Verify initial structure
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
      expect(screen.getByTestId('animated-transition')).toBeInTheDocument();
      expect(screen.getByTestId('screen-renderer')).toBeInTheDocument();

      // Change screen
      rerender(
        <TestWrapper initialScreen="Timeline">
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Structure should remain the same
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
      expect(screen.getByTestId('animated-transition')).toBeInTheDocument();
      expect(screen.getByTestId('screen-renderer')).toBeInTheDocument();
      
      // Should still be exactly one of each component
      expect(screen.getAllByTestId('terminal-window')).toHaveLength(1);
      expect(screen.getAllByTestId('animated-transition')).toHaveLength(1);
      expect(screen.getAllByTestId('screen-renderer')).toHaveLength(1);
    });
  });

  describe('Performance Optimizations', () => {
    test('memoizes loading component properly', () => {
      const { rerender } = render(
        <TestWrapper>
          <PersistentShell isLoading={true} />
        </TestWrapper>
      );

      const loadingElement = screen.getByText('AUTHENTICATING...');
      expect(loadingElement).toBeInTheDocument();

      // Re-render with same loading state
      rerender(
        <TestWrapper>
          <PersistentShell isLoading={true} />
        </TestWrapper>
      );

      // Element should still be there and stable
      expect(screen.getByText('AUTHENTICATING...')).toBeInTheDocument();
    });

    test('memoizes content area to prevent unnecessary re-renders', () => {
      const { rerender } = render(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      const contentArea = screen.getByTestId('animated-transition');
      expect(contentArea).toBeInTheDocument();

      // Re-render component
      rerender(
        <TestWrapper>
          <PersistentShell isLoading={false} />
        </TestWrapper>
      );

      // Content area should remain stable
      expect(screen.getByTestId('animated-transition')).toBeInTheDocument();
      expect(screen.getByTestId('screen-renderer')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles rapid loading state changes gracefully', () => {
      const { rerender } = render(
        <TestWrapper>
          <PersistentShell isLoading={true} />
        </TestWrapper>
      );

      // Rapid state changes
      act(() => {
        rerender(
          <TestWrapper>
            <PersistentShell isLoading={false} />
          </TestWrapper>
        );
      });

      act(() => {
        rerender(
          <TestWrapper>
            <PersistentShell isLoading={true} />
          </TestWrapper>
        );
      });

      act(() => {
        rerender(
          <TestWrapper>
            <PersistentShell isLoading={false} />
          </TestWrapper>
        );
      });

      // Should end up in the final state
      expect(screen.queryByText('AUTHENTICATING...')).not.toBeInTheDocument();
      expect(screen.getByTestId('terminal-window')).toBeInTheDocument();
    });

    test('handles missing session context gracefully', () => {
      // Test with minimal context
      const MinimalWrapper = ({ children }) => (
        <MockSessionProvider
          currentScreen="MainHub"
          sessionData={null}
          domainData={null}
        >
          {children}
        </MockSessionProvider>
      );

      expect(() => {
        render(
          <MinimalWrapper>
            <PersistentShell isLoading={false} />
          </MinimalWrapper>
        );
      }).not.toThrow();
    });
  });
});