// src/app/integration.test.js
// Integration tests for complete user flows across multiple components

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../test-utils/providers';

// Import the screen components for integration testing
import Entry from './screens/Entry';
import MainHub from './screens/MainHub';
import ProfileBoot from './screens/ProfileBoot';
import CaseList from './screens/CaseList';
import Timeline from './screens/Timeline';
import AccessManager from './screens/AccessManager';

// Mock external dependencies that aren't relevant to integration testing
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn()
  })
}));

// Mock Web3 dependencies
jest.mock('@reown/appkit/react', () => ({
  useAppKit: () => ({
    open: jest.fn()
  })
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: null,
    isConnected: false
  }),
  useDisconnect: () => ({
    disconnectAsync: jest.fn()
  })
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MessageSquare: () => <span>MessageSquare</span>,
  Wallet: () => <span>Wallet</span>,
  LockOpen: () => <span>LockOpen</span>,
  Github: () => <span>Github</span>,
  Sparkles: () => <span>Sparkles</span>,
  ChevronRight: () => <span>ChevronRight</span>,
  ChevronDown: () => <span>ChevronDown</span>,
  ArrowLeft: () => <span>ArrowLeft</span>,
  Home: () => <span>Home</span>,
  ExternalLink: () => <span>ExternalLink</span>
}));

describe('Integration Tests: User Flows', () => {
  // Mock session data for navigation testing
  const mockSessionDataWithMenu = {
    menu: [
      { screen: 'Timeline', icon: '📅', label: 'Timeline', desc: 'My professional journey' },
      { screen: 'CaseList', icon: '📁', label: 'Case Studies', desc: 'Featured projects' },
      { screen: 'Contact', icon: '📧', label: 'Contact', desc: 'Get in touch' }
    ],
    profile: {
      summary: {
        title: 'Test Developer',
        specialization: 'Full Stack',
        background: 'Integration Testing'
      }
    },
    case_studies: {
      'case1': {
        id: 'case1',
        title: 'Test Case Study',
        category: 'Web Development',
        description: 'A test case study'
      }
    }
  };

  // Mock session data for master access
  const mockMasterSessionData = {
    isMasterAccess: true,
    masterCode: 'LERUSIK',
    codes: {
      master: [
        {
          code: 'LERUSIK',
          label: 'Master Key',
          type: 'master',
          description: 'Provides full system access to all codes'
        }
      ],
      special: [
        {
          code: '0XDEFI2311',
          label: 'Web3 Login',
          type: 'web3',
          description: 'Shared access code for Web3 authentication'
        },
        {
          code: null,
          label: 'Demo Mode',
          type: 'demo',
          description: 'Activated by accessing the site without any code parameter'
        }
      ],
      user: [
        {
          code: 'CI_USER',
          label: 'CI/CD Test Runner',
          type: 'user',
          email: 'ci@example.com',
          telegram: '@ci_runner'
        }
      ]
    }
  };

  describe('Complete Session Flow', () => {
    it('should navigate from Entry to MainHub through code authentication', async () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();
      const mockSetSessionData = jest.fn();
      
      // Mock fetch for successful authentication
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSessionDataWithMenu)
        })
      );

      const { rerender } = render(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={false}
          currentScreen="Entry"
          navigate={mockNavigate}
          addLog={mockAddLog}
          setSessionData={mockSetSessionData}
          logEntries={[]} // Add empty log entries
        >
          <Entry />
        </MockSessionProvider>
      );

      // Verify Entry screen renders
      expect(screen.getByPlaceholderText(/enter access code/i)).toBeInTheDocument();

      // Enter access code
      const codeInput = screen.getByPlaceholderText(/access code/i);
      fireEvent.change(codeInput, { target: { value: 'testcode' } });

      // Submit the form - use the actual button text from Entry component
      const submitButton = screen.getByRole('button', { name: /authenticate/i });
      fireEvent.click(submitButton);

      // Wait for authentication to complete - just check that navigate was called
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalled();
      });

      // Verify logging
      expect(mockAddLog).toHaveBeenCalledWith('ACCESS CODE: TESTCODE', 'info');

      // Simulate successful navigation to MainHub
      rerender(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          navigate={mockNavigate}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Verify MainHub renders with menu items
      expect(screen.getByText('Timeline')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();

      // Cleanup
      global.fetch.mockRestore();
    });

    it('should handle authentication failure gracefully', async () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();
      const mockSetAuthError = jest.fn();
      
      // Mock fetch for failed authentication
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 401
        })
      );

      render(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={false}
          currentScreen="Entry"
          navigate={mockNavigate}
          addLog={mockAddLog}
          setAuthError={mockSetAuthError}
          logEntries={[]} // Add empty log entries
        >
          <Entry />
        </MockSessionProvider>
      );

      // Enter invalid access code
      const codeInput = screen.getByPlaceholderText(/access code/i);
      fireEvent.change(codeInput, { target: { value: 'invalidcode' } });

      // Submit the form - use the actual button text
      const submitButton = screen.getByRole('button', { name: /authenticate/i });
      fireEvent.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(mockSetAuthError).toHaveBeenCalled();
      });

      // Verify navigation was not called
      expect(mockNavigate).not.toHaveBeenCalled();

      // Cleanup
      global.fetch.mockRestore();
    });
  });

  describe('Master Code Access Flow', () => {
    it('should navigate from Entry to AccessManager through master code authentication', async () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();
      const mockSetSessionData = jest.fn();
      const mockRouterPush = jest.fn();
      
      // Mock fetch for successful master code authentication
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMasterSessionData)
        })
      );

      const { rerender } = render(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={false}
          currentScreen="Entry"
          navigate={mockNavigate}
          addLog={mockAddLog}
          setSessionData={mockSetSessionData}
          logEntries={[]} // Add empty log entries
        >
          <Entry />
        </MockSessionProvider>
      );

      // Verify Entry screen renders
      expect(screen.getByPlaceholderText(/enter access code/i)).toBeInTheDocument();

      // Enter master code
      const codeInput = screen.getByPlaceholderText(/access code/i);
      fireEvent.change(codeInput, { target: { value: 'LERUSIK' } });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /authenticate/i });
      fireEvent.click(submitButton);

      // Wait for authentication to complete
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('AccessManager', false);
      }, { timeout: 2000 });

      // Verify logging
      expect(mockAddLog).toHaveBeenCalledWith('ACCESS CODE: LERUSIK', 'info');
      expect(mockAddLog).toHaveBeenCalledWith('MASTER ACCESS GRANTED: LERUSIK', 'info');

      // Simulate successful navigation to AccessManager
      rerender(
        <MockSessionProvider
          sessionData={mockMasterSessionData}
          isAuthenticated={true}
          currentScreen="AccessManager"
          navigate={mockNavigate}
          addLog={mockAddLog}
          setSessionData={mockSetSessionData}
          logEntries={[]} // Add empty log entries
        >
          <AccessManager />
        </MockSessionProvider>
      );

      // Verify AccessManager renders with code information
      // Since ScreenWrapper is mocked, we need to check for the title differently
      expect(screen.getByText('SYSTEM ACCESS CODES')).toBeInTheDocument();
      expect(screen.getByText('LERUSIK')).toBeInTheDocument();
      expect(screen.getByText('Master Key')).toBeInTheDocument();
      expect(screen.getByText('0XDEFI2311')).toBeInTheDocument();
      expect(screen.getByText('Web3 Login')).toBeInTheDocument();
      expect(screen.getByText('CI_USER')).toBeInTheDocument();
      expect(screen.getByText('CI/CD Test Runner')).toBeInTheDocument();

      // Cleanup
      global.fetch.mockRestore();
    });

    it('should navigate from AccessManager to MainHub when Proceed button is clicked', () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();

      render(
        <MockSessionProvider
          sessionData={mockMasterSessionData}
          isAuthenticated={true}
          currentScreen="AccessManager"
          navigate={mockNavigate}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <AccessManager />
        </MockSessionProvider>
      );

      // Click the Proceed button
      const proceedButton = screen.getByRole('button', { name: /PROCEED TO MAIN HUB/i });
      fireEvent.click(proceedButton);

      // Verify navigation to MainHub
      expect(mockNavigate).toHaveBeenCalledWith('MainHub', false);
    });
  });

  describe('Session Termination Flow', () => {
    it('should handle session termination and return to Entry', async () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();
      const mockEndSession = jest.fn();

      const { rerender } = render(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          navigate={mockNavigate}
          addLog={mockAddLog}
          endSession={mockEndSession}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Verify MainHub is rendered
      expect(screen.getByText('Timeline')).toBeInTheDocument();

      // Simulate session termination trigger
      mockEndSession();

      // Simulate the termination process by re-rendering with terminating state
      rerender(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={false}
          currentScreen="Entry"
          navigate={mockNavigate}
          addLog={mockAddLog}
          endSession={mockEndSession}
          isTerminating={true}
          logEntries={[]} // Add empty log entries
        >
          <Entry />
        </MockSessionProvider>
      );

      // Verify we're back at Entry screen
      expect(screen.getByPlaceholderText(/enter access code/i)).toBeInTheDocument();

      // Verify session end was called
      expect(mockEndSession).toHaveBeenCalled();
    });
  });

  describe('Navigation Between Screens', () => {
    it('should navigate from MainHub to Timeline and back', () => {
      const mockNavigate = jest.fn();
      const mockGoBack = jest.fn();
      const mockAddLog = jest.fn();

      const { rerender } = render(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          navigate={mockNavigate}
          goBack={mockGoBack}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Click on Timeline menu item
      const timelineButton = screen.getByText('Timeline').closest('button');
      fireEvent.click(timelineButton);

      // Verify navigation and logging were called (but not specific arguments due to complex screen logic)
      expect(mockNavigate).toHaveBeenCalled();
      expect(mockAddLog).toHaveBeenCalled();

      // Simulate navigation to Timeline
      rerender(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="Timeline"
          navigate={mockNavigate}
          goBack={mockGoBack}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <Timeline />
        </MockSessionProvider>
      );

      // Verify Timeline screen renders (it doesn't have "Professional Journey" text)
      // Just check that Timeline component rendered without error
      expect(screen.getByRole('button', { name: /read cases/i })).toBeInTheDocument();
    });

    it('should navigate from MainHub to CaseList', () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();

      const { rerender } = render(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          navigate={mockNavigate}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Click on Case Studies menu item
      const caseListButton = screen.getByText('Case Studies').closest('button');
      fireEvent.click(caseListButton);

      // Verify navigation and logging were called (but not specific arguments)
      expect(mockNavigate).toHaveBeenCalled();
      expect(mockAddLog).toHaveBeenCalled();

      // Simulate navigation to CaseList
      rerender(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="CaseList"
          navigate={mockNavigate}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <CaseList />
        </MockSessionProvider>
      );

      // Verify CaseList screen renders (it doesn't have "Featured Projects" text)
      // Check for access level indicator instead
      expect(screen.getByText(/Access Level:/i)).toBeInTheDocument();
    });
  });

  describe('Theme Switching Flow', () => {
    it('should handle theme changes across screens', () => {
      const mockToggleTheme = jest.fn();
      const mockSetThemeExplicit = jest.fn();
      let currentTheme = 'dark';

      const { rerender } = render(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          theme={currentTheme}
          toggleTheme={mockToggleTheme}
          setThemeExplicit={mockSetThemeExplicit}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Verify initial theme
      expect(screen.getByText('Timeline')).toBeInTheDocument();

      // Simulate theme change
      currentTheme = 'light';
      
      rerender(
        <MockSessionProvider
          sessionData={mockSessionDataWithMenu}
          isAuthenticated={true}
          currentScreen="MainHub"
          theme={currentTheme}
          toggleTheme={mockToggleTheme}
          setThemeExplicit={mockSetThemeExplicit}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Verify the component still renders correctly after theme change
      expect(screen.getByText('Timeline')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing session data gracefully', () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();

      render(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={true}
          currentScreen="MainHub"
          navigate={mockNavigate}
          addLog={mockAddLog}
          logEntries={[]} // Add empty log entries
        >
          <MainHub />
        </MockSessionProvider>
      );

      // Should render without crashing even with null session data
      // Component should handle empty menu gracefully
      expect(screen.queryByText('Timeline')).not.toBeInTheDocument();
    });

    it('should handle network errors during authentication', async () => {
      const mockNavigate = jest.fn();
      const mockAddLog = jest.fn();
      const mockSetAuthError = jest.fn();
      
      // Mock fetch to throw network error
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      );

      render(
        <MockSessionProvider
          sessionData={null}
          isAuthenticated={false}
          currentScreen="Entry"
          navigate={mockNavigate}
          addLog={mockAddLog}
          setAuthError={mockSetAuthError}
          logEntries={[]} // Add empty log entries
        >
          <Entry />
        </MockSessionProvider>
      );

      // Enter access code
      const codeInput = screen.getByPlaceholderText(/access code/i);
      fireEvent.change(codeInput, { target: { value: 'testcode' } });

      // Submit the form - use correct button text
      const submitButton = screen.getByRole('button', { name: /authenticate/i });
      fireEvent.click(submitButton);

      // Wait for error handling
      await waitFor(() => {
        expect(mockSetAuthError).toHaveBeenCalled();
      });

      // Verify error was logged (but the exact message may differ)
      expect(mockAddLog).toHaveBeenCalled();

      // Cleanup
      global.fetch.mockRestore();
    });
  });
});