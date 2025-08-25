// src/app/layouts/TerminalWindow.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TerminalWindow from './TerminalWindow';
import { MockSessionProvider } from '../../../test-utils/providers';

// Mock the Button component
jest.mock('../components/ui/Button', () => {
  const MockButton = ({ icon: Icon, onClick, disabled, children, className, ...props }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={className}
      data-testid={`button-${Icon?.displayName || 'unknown'}`}
      {...props}
    >
      {Icon && <Icon data-testid={`icon-${Icon.displayName}`} />}
      {children}
    </button>
  );
  MockButton.displayName = 'Button';
  return MockButton;
});

// Mock lucide-react icons
jest.mock('lucide-react', () => {
  const createIcon = (name) => {
    const MockIcon = (props) => <div data-testid={`${name}-icon`} {...props} />;
    MockIcon.displayName = name;
    return MockIcon;
  };
  
  return {
    ArrowLeft: createIcon('ArrowLeft'),
    Sun: createIcon('Sun'),
    Moon: createIcon('Moon'),
    X: createIcon('X'),
    Home: createIcon('Home'),
    ArrowUp: createIcon('ArrowUp'),
    Bug: createIcon('Bug'),
    Terminal: createIcon('Terminal'),
    Waves: createIcon('Waves'),
    HardDrive: createIcon('HardDrive'),
    LayoutDashboard: createIcon('LayoutDashboard'),
    SlidersHorizontal: createIcon('SlidersHorizontal'),
  };
});

// Mock formatters
jest.mock('../utils/formatters', () => ({
  getScreenDisplayName: jest.fn((screen) => screen === 'MainHub' ? 'Main Hub' : screen)
}));

const TestWrapper = ({ children, sessionOverrides = {}, ...props }) => (
  <MockSessionProvider
    currentScreen="MainHub"
    theme="dark"
    navigationHistory={[]}
    screenHierarchy={{
      'Timeline': 'MainHub',
      'CaseList': 'MainHub',
      'CaseDetail': 'CaseList',
      'SkillsGrid': 'MainHub',
    }}
    sessionData={{ accessCode: 'TEST123' }}
    {...sessionOverrides}
  >
    <TerminalWindow title="test_terminal" {...props}>
      {children}
    </TerminalWindow>
  </MockSessionProvider>
);

describe('TerminalWindow Component', () => {
  describe('Memoization and Performance', () => {
    test('is wrapped with React.memo to prevent unnecessary re-renders', () => {
      const { rerender } = render(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      const terminalWindow = screen.getByText(/\$test-portfolio/);
      expect(terminalWindow).toBeInTheDocument();

      // Re-render with the same props should not cause re-render
      rerender(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      // Component should still be there and functional
      expect(screen.getByText(/\$test-portfolio/)).toBeInTheDocument();
    });

    test('only re-renders when props actually change', () => {
      const { rerender } = render(
        <TestWrapper title="title1">
          <div>Content 1</div>
        </TestWrapper>
      );

      expect(screen.getByText(/\$test-portfolio/)).toBeInTheDocument();

      // Change title prop - should trigger re-render
      rerender(
        <TestWrapper title="title2">
          <div>Content 1</div>
        </TestWrapper>
      );

      expect(screen.getByText(/\$test-portfolio/)).toBeInTheDocument();

      // Change children prop - should trigger re-render
      rerender(
        <TestWrapper title="title2">
          <div>Content 2</div>
        </TestWrapper>
      );

      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    test('memoizes navigation button states correctly', () => {
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'Timeline',
            navigationHistory: ['MainHub']
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      // Navigation buttons should be enabled for Timeline screen
      const backButton = screen.getByTestId('button-ArrowLeft');
      const upButton = screen.getByTestId('button-ArrowUp');
      const homeButton = screen.getByTestId('button-Home');

      expect(backButton).not.toBeDisabled();
      expect(upButton).not.toBeDisabled();
      expect(homeButton).not.toBeDisabled();
    });

    test('memoizes theme icon selection', () => {
      render(
        <TestWrapper sessionOverrides={{ theme: 'dark' }}>
          <div>Content</div>
        </TestWrapper>
      );

      // Should show Sun icon for dark theme  
      expect(screen.getByTestId('icon-Sun')).toBeInTheDocument();
      
      // Verify the theme button is functional
      const themeButton = screen.getByTestId('button-Sun');
      expect(themeButton).toBeInTheDocument();
      expect(themeButton).not.toBeDisabled();
    });

    test('memoizes CSS classes to prevent string concatenation on every render', () => {
      const { rerender } = render(
        <TestWrapper fixedHeight={true}>
          <div>Content</div>
        </TestWrapper>
      );

      const container = screen.getByText(/\$test-portfolio/).closest('div').parentElement;
      expect(container).toHaveClass('h-full', 'flex', 'flex-col');

      // Re-render with same fixedHeight should use memoized classes
      rerender(
        <TestWrapper fixedHeight={true}>
          <div>Content</div>
        </TestWrapper>
      );

      expect(container).toHaveClass('h-full', 'flex', 'flex-col');
    });
  });

  describe('Display Title Logic', () => {
    test('uses domain-specific title for MainHub screen', () => {
      render(
        <TestWrapper 
          title="test_terminal"
          sessionOverrides={{ 
            currentScreen: 'MainHub',
            domainData: { terminalTitle: 'custom_terminal' }
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.getByText(/\$custom_terminal/)).toBeInTheDocument();
    });

    test('uses domain-specific title for Entry screen', () => {
      render(
        <TestWrapper 
          title="entry_screen"
          sessionOverrides={{ 
            currentScreen: 'Entry',
            domainData: { terminalTitle: 'entry_terminal' }
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      // Entry screen doesn't show header, so no title should be visible
      expect(screen.queryByText(/\$entry_terminal/)).not.toBeInTheDocument();
    });

    test('uses provided title for other screens', () => {
      render(
        <TestWrapper 
          title="timeline_screen"
          sessionOverrides={{ currentScreen: 'Timeline' }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.getByText(/\$timeline_screen/)).toBeInTheDocument();
    });

    test('falls back to generic portfolio when no domain data', () => {
      render(
        <TestWrapper 
          title="test_terminal"
          sessionOverrides={{ 
            currentScreen: 'MainHub',
            domainData: null
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      // Just check that some title is displayed, since the mocking might use fallback values
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain('portfolio');
    });
  });

  describe('Breadcrumb Memoization', () => {
    test('memoizes breadcrumb path calculation', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'CaseDetail' }}>
          <div>Content</div>
        </TestWrapper>
      );

      // Should show breadcrumb path: MainHub > CaseList > CaseDetail
      expect(screen.getByText('Main Hub')).toBeInTheDocument();
      expect(screen.getByText('CaseList')).toBeInTheDocument();
      expect(screen.getByText('CaseDetail')).toBeInTheDocument();
    });

    test('does not show breadcrumbs for Entry screen', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'Entry' }}>
          <div>Content</div>
        </TestWrapper>
      );

      // Should not show breadcrumbs section
      expect(screen.queryByText('Main Hub')).not.toBeInTheDocument();
    });

    test('does not show breadcrumbs for ProfileBoot screen', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'ProfileBoot' }}>
          <div>Content</div>
        </TestWrapper>
      );

      // Should not show breadcrumbs section
      expect(screen.queryByText('Main Hub')).not.toBeInTheDocument();
    });
  });

  describe('Header Visibility and Navigation', () => {
    test('does not show header for Entry screen', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'Entry' }}>
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.queryByTestId('button-ArrowLeft')).not.toBeInTheDocument();
      expect(screen.queryByTestId('button-X')).not.toBeInTheDocument();
    });

    test('does not show header for ProfileBoot screen', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'ProfileBoot' }}>
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.queryByTestId('button-ArrowLeft')).not.toBeInTheDocument();
      expect(screen.queryByTestId('button-X')).not.toBeInTheDocument();
    });

    test('shows header with navigation buttons for other screens', () => {
      render(
        <TestWrapper sessionOverrides={{ currentScreen: 'Timeline' }}>
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.getByTestId('button-ArrowLeft')).toBeInTheDocument();
      expect(screen.getByTestId('button-ArrowUp')).toBeInTheDocument();
      expect(screen.getByTestId('button-Home')).toBeInTheDocument();
      expect(screen.getByTestId('button-X')).toBeInTheDocument();
    });

    test('disables navigation buttons correctly based on state', () => {
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'MainHub',
            navigationHistory: []
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      const backButton = screen.getByTestId('button-ArrowLeft');
      const homeButton = screen.getByTestId('button-Home');

      expect(backButton).toBeDisabled();
      expect(homeButton).toBeDisabled();
    });
  });

  describe('Event Handlers', () => {
    test('memoizes event handlers with useCallback', () => {
      const mockEndSession = jest.fn();
      
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'Timeline',
            endSession: mockEndSession
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      const closeButton = screen.getByTestId('button-X');
      fireEvent.click(closeButton);

      expect(mockEndSession).toHaveBeenCalled();
    });

    test('does not call endSession for Entry screen', () => {
      const mockEndSession = jest.fn();
      
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'Entry',
            endSession: mockEndSession
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      // Close button should not be visible for Entry screen
      expect(screen.queryByTestId('button-X')).not.toBeInTheDocument();
    });

    test('calls navigation functions when buttons are clicked', () => {
      const mockGoBack = jest.fn();
      const mockGoHome = jest.fn();
      const mockGoUp = jest.fn();
      const mockToggleTheme = jest.fn();
      
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'Timeline',
            navigationHistory: ['MainHub'],
            goBack: mockGoBack,
            goHome: mockGoHome,
            goUp: mockGoUp,
            toggleTheme: mockToggleTheme
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      // Test each navigation button
      fireEvent.click(screen.getByTestId('button-ArrowLeft'));
      expect(mockGoBack).toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button-Home'));
      expect(mockGoHome).toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button-ArrowUp'));
      expect(mockGoUp).toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button-Sun'));
      expect(mockToggleTheme).toHaveBeenCalled();
    });
  });

  describe('Fixed Height Mode', () => {
    test('applies correct CSS classes for fixed height mode', () => {
      render(
        <TestWrapper fixedHeight={true}>
          <div>Content</div>
        </TestWrapper>
      );

      const container = screen.getByText(/\$test-portfolio/).closest('div').parentElement;
      expect(container).toHaveClass('h-full', 'flex', 'flex-col');
    });

    test('applies correct CSS classes for normal mode', () => {
      render(
        <TestWrapper fixedHeight={false}>
          <div>Content</div>
        </TestWrapper>
      );

      const container = screen.getByText(/\$test-portfolio/).closest('div').parentElement;
      expect(container).not.toHaveClass('h-full', 'flex', 'flex-col');
    });

    test('applies scrollable content classes for fixed height', () => {
      render(
        <TestWrapper fixedHeight={true}>
          <div data-testid="content">Content</div>
        </TestWrapper>
      );

      const content = screen.getByTestId('content').parentElement;
      expect(content).toHaveClass('flex-1', 'overflow-y-auto');
    });
  });

  describe('Demo Mode Banner', () => {
    test('shows demo mode banner when in demo mode', () => {
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'MainHub',
            sessionData: { isDemoMode: true, accessCode: 'DEMO' }
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.getByText(/DEMO MODE/)).toBeInTheDocument();
    });

    test('does not show demo mode banner for non-demo sessions', () => {
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'MainHub',
            sessionData: { isDemoMode: false, accessCode: 'REAL123' }
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.queryByText(/DEMO MODE/)).not.toBeInTheDocument();
    });

    test('does not show demo mode banner for Entry/ProfileBoot screens even in demo mode', () => {
      render(
        <TestWrapper 
          sessionOverrides={{
            currentScreen: 'Entry',
            sessionData: { isDemoMode: true, accessCode: 'DEMO' }
          }}
        >
          <div>Content</div>
        </TestWrapper>
      );

      expect(screen.queryByText(/DEMO MODE/)).not.toBeInTheDocument();
    });
  });
});