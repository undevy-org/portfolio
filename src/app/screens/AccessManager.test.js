// src/app/screens/AccessManager.test.js
// ------------------------------------
// Fully revised test for AccessManager (demo test adjusted to not rely on provider internals)
// - Comments are in English (project artifact requirement)
// - Tests handle the responsive DOM duplicate nodes (desktop + mobile)
// - All state-updating user interactions are wrapped in act(...) to avoid React warnings
// - addLog calls are asserted using robust matchers (second "level" arg may be present)

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
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
  return function MockScreenWrapper({ children }) {
    return (
      <div data-testid="screen-wrapper">
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

// Mock ALL lucide-react icons used in the component
jest.mock('lucide-react', () => ({
  Home: () => <div>Home Icon</div>,
  ChevronRight: () => <div>ChevronRight Icon</div>,
  Shield: () => <div>Shield Icon</div>,
  Key: () => <div>Key Icon</div>,
  Users: () => <div>Users Icon</div>,
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

  // Helper to click a label (first occurrence) and wait for an async condition
  async function clickLabelAndWait(label, conditionCallback) {
    const matches = screen.getAllByText(label);
    if (!matches || matches.length === 0) {
      throw new Error(`Label not found in DOM: ${label}`);
    }

    const labelEl = matches[0];
    const btn = labelEl.closest('button');
    expect(btn).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(btn);
    });

    if (conditionCallback) {
      await waitFor(conditionCallback, { timeout: 2000 });
    }

    return btn;
  }

  test('renders AccessManager screen with all code sections', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    expect(screen.getByTestId('screen-wrapper')).toBeInTheDocument();
    expect(screen.getByText('Master Access')).toBeInTheDocument();
    expect(screen.getByText('Special Access')).toBeInTheDocument();
    expect(screen.getByText(/User Codes \[2\]/)).toBeInTheDocument();

    expect(screen.getAllByText('LERUSIK').length).toBeGreaterThan(0);
    expect(screen.getAllByText('0XDEFI2311').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CI_USER').length).toBeGreaterThan(0);
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
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    expect(screen.queryByText('Master Access')).not.toBeInTheDocument();
    expect(screen.queryByText('Special Access')).not.toBeInTheDocument();
    expect(screen.queryByText(/User Codes/)).not.toBeInTheDocument();
    expect(screen.getByText('PROCEED TO MAIN HUB')).toBeInTheDocument();
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
        logEntries={[]}
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
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    expect(screen.getByTestId('screen-wrapper')).toBeInTheDocument();
    expect(screen.getByText('PROCEED TO MAIN HUB')).toBeInTheDocument();
    expect(screen.queryByText('Master Access')).not.toBeInTheDocument();
  });

  test('renders clickable special codes and handles click', async () => {
    const mockNavigate = jest.fn();
    const mockSetSessionData = jest.fn();
    const mockAddLog = jest.fn();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meta: { company: 'Web3 Company' },
        profile: { name: 'Web3 User' }
      })
    });

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={mockNavigate}
        addLog={mockAddLog}
        setSessionData={mockSetSessionData}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    await clickLabelAndWait('0XDEFI2311', () => expect(mockNavigate).toHaveBeenCalledWith('ProfileBoot', false));

    expect(mockAddLog).toHaveBeenCalledWith(
      'ACCESS SIMULATION: Using code 0XDEFI2311',
      expect.any(String)
    );

    expect(fetch).toHaveBeenCalledWith('/api/session?code=0XDEFI2311');
    expect(mockNavigate).toHaveBeenCalledWith('ProfileBoot', false);
  });

  test('renders clickable user codes and handles click', async () => {
    const mockNavigate = jest.fn();
    const mockSetSessionData = jest.fn();
    const mockAddLog = jest.fn();

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meta: { company: 'CI/CD Company' },
        profile: { name: 'CI User' }
      })
    });

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={mockNavigate}
        addLog={mockAddLog}
        setSessionData={mockSetSessionData}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    await clickLabelAndWait('CI_USER', () => expect(mockNavigate).toHaveBeenCalledWith('ProfileBoot', false));

    expect(mockAddLog).toHaveBeenCalledWith('ACCESS SIMULATION: Using code CI_USER', expect.any(String));
    expect(fetch).toHaveBeenCalledWith('/api/session?code=CI_USER');
    expect(mockNavigate).toHaveBeenCalledWith('ProfileBoot', false);
  });

  // Updated demo test: do not assume provider calls external setSessionData
  test('demo mode button is enabled and triggers demo flow', async () => {
    const mockNavigate = jest.fn();
    const mockSetSessionData = jest.fn();
    const mockAddLog = jest.fn();

    // Mock demo fetch response (no code param)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        meta: { company: 'Demo Company' },
        profile: { name: 'Demo User' }
      })
    });

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={mockNavigate}
        addLog={mockAddLog}
        setSessionData={mockSetSessionData}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    const demoLabel = screen.getAllByText('[NO CODE REQUIRED]')[0];
    const demoButton = demoLabel.closest('button');

    expect(demoButton).toBeInTheDocument();
    expect(demoButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(demoButton);
    });

    // Wait for observable effects: fetch called and navigation to ProfileBoot
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/session');
      expect(mockNavigate).toHaveBeenCalledWith('ProfileBoot', false);
    }, { timeout: 2000 });

    // Assert logs: started demo and granted demo access
    expect(mockAddLog).toHaveBeenCalledWith('DEMO MODE ACTIVATED', expect.any(String));
    expect(mockAddLog).toHaveBeenCalledWith('DEMO ACCESS GRANTED', expect.any(String));
  });

  test('handles authentication error gracefully', async () => {
    const mockAddLog = jest.fn();

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid access code' })
    });

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={mockAddLog}
        setSessionData={jest.fn()}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    const userLabel = screen.getAllByText('CI_USER')[0];
    const userButton = userLabel.closest('button');
    fireEvent.click(userButton);

    await screen.findByTestId('screen-wrapper');

    expect(mockAddLog).toHaveBeenCalledWith('ACCESS DENIED: Invalid access code', expect.any(String));
  });

  test('displays contact information for user codes', () => {
    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={jest.fn()}
        setSessionData={jest.fn()}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    expect(screen.getAllByText('ci@example.com').length).toBeGreaterThan(0);
    expect(screen.getAllByText('@ci_runner').length).toBeGreaterThan(0);
    expect(screen.getAllByText('john@example.com').length).toBeGreaterThan(0);
  });

  test('handles network error during authentication', async () => {
    const mockAddLog = jest.fn();

    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <MockSessionProvider
        sessionData={mockSessionData}
        isAuthenticated={true}
        currentScreen="AccessManager"
        navigate={jest.fn()}
        addLog={mockAddLog}
        setSessionData={jest.fn()}
        logEntries={[]}
      >
        <AccessManager />
      </MockSessionProvider>
    );

    const userLabel = screen.getAllByText('CI_USER')[0];
    const userButton = userLabel.closest('button');
    fireEvent.click(userButton);

    await screen.findByTestId('screen-wrapper');

    expect(mockAddLog).toHaveBeenCalledWith('ACCESS ERROR: Network error', expect.any(String));
  });
});
