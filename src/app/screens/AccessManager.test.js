// src/app/screens/AccessManager.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { MockSessionProvider } from '../../../test-utils/providers';
import AccessManager from './AccessManager';

// Mock Button component to avoid complexity
jest.mock('../components/ui/Button', () => {
  return function MockButton(props) {
    const { children, onClick } = props;
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  };
});

// Mock ScreenWrapper component
jest.mock('../components/ScreenWrapper', () => {
  return function MockScreenWrapper({ title, children }) {
    return (
      <div data-testid="screen-wrapper">
        <h1>{title}</h1>
        {children}
      </div>
    );
  };
});

// Mock SystemLog component
jest.mock('../components/SystemLog', () => {
  return function MockSystemLog() {
    return <div data-testid="system-log">System Log</div>;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Home: () => <div>Home Icon</div>,
  Copy: () => <div>Copy Icon</div>,
  ExternalLink: () => <div>External Link Icon</div>
}));

// Mock fetch API
global.fetch = jest.fn();

describe('AccessManager Screen', () => {
  const mockSessionData = {
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
        },
        {
          code: 'ABC123',
          label: 'John Doe',
          type: 'user',
          email: 'john@example.com'
        }
      ]
    }
  };

  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders AccessManager screen with all code sections', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Check that the screen renders
    expect(screen.getByTestId('screen-wrapper')).toBeInTheDocument();
    expect(screen.getByText('SYSTEM ACCESS CODES')).toBeInTheDocument();
  });

  test('renders with empty code sections', () => {
    const emptySessionData = {
      isMasterAccess: true,
      masterCode: 'LERUSIK',
      codes: {
        master: [],
        special: [],
        user: []
      }
    };

    render(
      <MockSessionProvider
        sessionData={emptySessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Check that sections still render even when empty
    expect(screen.getByText('MASTER ACCESS')).toBeInTheDocument();
    expect(screen.getByText('SPECIAL CODES')).toBeInTheDocument();
    expect(screen.getByText('USER CODES')).toBeInTheDocument();
  });

  test('calls navigate with MainHub when Proceed button is clicked', () => {
    const mockNavigate = jest.fn();

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={mockNavigate}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    const proceedButton = screen.getByRole('button', { name: /PROCEED TO MAIN HUB/i });
    fireEvent.click(proceedButton);

    expect(mockNavigate).toHaveBeenCalledWith('MainHub', false);
  });

  test('handles missing session data gracefully', () => {
    render(
      <MockSessionProvider
        sessionData={null}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Should render without crashing
    expect(screen.getByTestId('screen-wrapper')).toBeInTheDocument();
    expect(screen.getByText('SYSTEM ACCESS CODES')).toBeInTheDocument();
  });

  test('renders clickable special codes with ExternalLink icon', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Check that special codes are rendered as buttons with ExternalLink icon
    const specialCodeButton = screen.getByText('0XDEFI2311').closest('button');
    expect(specialCodeButton).toBeInTheDocument();
    expect(specialCodeButton).toContainHTML('External Link Icon');
  });

  test('renders clickable user codes with ExternalLink icon', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Check that user codes are rendered as buttons with ExternalLink icon
    const userCodeButton = screen.getByText('CI_USER').closest('button');
    expect(userCodeButton).toBeInTheDocument();
    expect(userCodeButton).toContainHTML('External Link Icon');
  });

  test('disables demo mode entry which has null code', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]} // Add empty log entries
      >
        <AccessManager />
      </MockSessionProvider>
    );

    // Check that demo mode entry is disabled
    const demoModeButton = screen.getByText('[none]').closest('button');
    expect(demoModeButton).toBeInTheDocument();
    expect(demoModeButton).toBeDisabled();
  });
});