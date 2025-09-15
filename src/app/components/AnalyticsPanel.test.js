// src/app/components/AnalyticsPanel.test.js
'use strict';

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../test-utils/providers';
import AnalyticsPanel from './AnalyticsPanel';

// Test fixtures
const MOCK_SESSION_DATA = {
  meta: {
    company: 'Acme Corp',
    depth: 'full',
    accessMethod: 'Code'
  },
  accessCode: 'TEST123',
  isWeb3User: false
};

const MOCK_WEB3_SESSION_DATA = {
  meta: {
    company: 'Web3 Company',
    depth: 'premium',
    accessMethod: 'Wallet'
  },
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7',
  isWeb3User: true
};

const MOCK_NAVIGATION_HISTORY = ['Entry', 'MainHub', 'Timeline'];

// Helper function to render AnalyticsPanel with SessionProvider
function renderAnalyticsPanel(sessionProps = {}) {
  const mockNavigate = jest.fn();
  const mockSetNavigationHistory = jest.fn();
  
  return {
    ...render(
      <MockSessionProvider
        sessionData={MOCK_SESSION_DATA}
        currentScreen="CaseDetail"
        navigationHistory={MOCK_NAVIGATION_HISTORY}
        screensVisitedCount={4}
        navigate={mockNavigate}
        setNavigationHistory={mockSetNavigationHistory}
        {...sessionProps}
      >
        <AnalyticsPanel />
      </MockSessionProvider>
    ),
    mockNavigate,
    mockSetNavigationHistory
  };
}

describe('AnalyticsPanel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    test('renders analytics panel with correct title', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$analytics')).toBeInTheDocument();
      expect(screen.getByText('$analytics')).toHaveClass('title-command');
    });

    test('renders in correct container with proper styling', () => {
      renderAnalyticsPanel();
      
      const container = screen.getByText('$analytics').closest('div');
      expect(container).toHaveClass(
        'w-full', 'max-w-2xl', 'border', 'rounded', 'p-3', 
        'text-sm', 'bg-main', 'border-primary'
      );
    });

    test('does not render when sessionData is null', () => {
      renderAnalyticsPanel({ sessionData: null });
      
      expect(screen.queryByText('$analytics')).not.toBeInTheDocument();
    });

    test('does not render when currentScreen is ProfileBoot', () => {
      renderAnalyticsPanel({ currentScreen: 'ProfileBoot' });
      
      expect(screen.queryByText('$analytics')).not.toBeInTheDocument();
    });
  });

  describe('Session Statistics Display', () => {
    test('displays company information correctly', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$company:')).toBeInTheDocument();
      expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    });

    test('displays access level correctly', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$access_level:')).toBeInTheDocument();
      expect(screen.getByText('full')).toBeInTheDocument();
    });

    test('displays default access level when depth is missing', () => {
      const sessionDataWithoutDepth = {
        ...MOCK_SESSION_DATA,
        meta: { ...MOCK_SESSION_DATA.meta, depth: undefined }
      };
      
      renderAnalyticsPanel({ sessionData: sessionDataWithoutDepth });
      
      expect(screen.getByText('$access_level:')).toBeInTheDocument();
      expect(screen.getByText('standard')).toBeInTheDocument();
    });

    test('displays access method correctly', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$access_method:')).toBeInTheDocument();
      expect(screen.getByText('Code')).toBeInTheDocument();
    });

    test('displays default access method when not specified', () => {
      const sessionDataWithoutMethod = {
        ...MOCK_SESSION_DATA,
        meta: { ...MOCK_SESSION_DATA.meta, accessMethod: undefined }
      };
      
      renderAnalyticsPanel({ sessionData: sessionDataWithoutMethod });
      
      expect(screen.getByText('$access_method:')).toBeInTheDocument();
      expect(screen.getByText('Code')).toBeInTheDocument();
    });

    test('displays current screen correctly', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$current_screen:')).toBeInTheDocument();
      // CaseDetail appears in multiple places - verify it exists in the stats section
      const caseDetailElements = screen.getAllByText('CaseDetail');
      expect(caseDetailElements.length).toBeGreaterThanOrEqual(1);
    });

    test('displays screens visited count correctly', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$screens_visited:')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('Traditional User Display', () => {
    test('displays access code for traditional users', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$access_code:')).toBeInTheDocument();
      expect(screen.getByText('TEST123')).toBeInTheDocument();
      expect(screen.queryByText('$wallet_address:')).not.toBeInTheDocument();
    });
  });

  describe('Web3 User Display', () => {
    test('displays wallet address for Web3 users', () => {
      renderAnalyticsPanel({ 
        sessionData: MOCK_WEB3_SESSION_DATA 
      });
      
      expect(screen.getByText('$wallet_address:')).toBeInTheDocument();
      expect(screen.getByText('0x742d...bEb7')).toBeInTheDocument();
      expect(screen.queryByText('$access_code:')).not.toBeInTheDocument();
    });

    test('truncates wallet address correctly', () => {
      const customWeb3Data = {
        ...MOCK_WEB3_SESSION_DATA,
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678'
      };
      
      renderAnalyticsPanel({ sessionData: customWeb3Data });
      
      expect(screen.getByText('0x1234...5678')).toBeInTheDocument();
    });
  });

  describe('Navigation History and Breadcrumbs', () => {
    test('renders session trace section', () => {
      renderAnalyticsPanel();
      
      expect(screen.getByText('$session_trace')).toBeInTheDocument();
      expect(screen.getByText('$session_trace')).toHaveClass('title-command');
    });

    test('displays navigation history with correct indexing', () => {
      renderAnalyticsPanel();
      
      // Check breadcrumb items
      expect(screen.getByText('[0]')).toBeInTheDocument();
      expect(screen.getByText('Entry')).toBeInTheDocument();
      expect(screen.getByText('[1]')).toBeInTheDocument();
      expect(screen.getByText('MainHub')).toBeInTheDocument();
      expect(screen.getByText('[2]')).toBeInTheDocument();
      expect(screen.getByText('Timeline')).toBeInTheDocument();
      expect(screen.getByText('[3]')).toBeInTheDocument();
      // CaseDetail appears in multiple places - verify it exists
      const caseDetailElements = screen.getAllByText('CaseDetail');
      expect(caseDetailElements.length).toBeGreaterThanOrEqual(1);
    });

    test('displays arrows between navigation items', () => {
      renderAnalyticsPanel();
      
      const arrows = screen.getAllByText('→');
      expect(arrows).toHaveLength(3); // One arrow after each history item
    });

    test('current screen is highlighted with command class', () => {
      renderAnalyticsPanel();
      
      // Find the current screen in the trace section - look for text-command that's not the heading
      const traceSection = screen.getByText('$session_trace').parentElement;
      // The current screen should have the text-command class
      const currentScreenElement = traceSection.querySelector('.text-command');
      expect(currentScreenElement).toBeTruthy();
      expect(currentScreenElement.textContent).toBe('CaseDetail');
    });

    test('handles empty navigation history', () => {
      renderAnalyticsPanel({ navigationHistory: [] });
      
      expect(screen.getByText('[0]')).toBeInTheDocument();
      // CaseDetail appears in both current screen stats and trace - use getAllByText
      const caseDetailElements = screen.getAllByText('CaseDetail');
      expect(caseDetailElements.length).toBeGreaterThanOrEqual(1);
      expect(screen.queryByText('→')).not.toBeInTheDocument();
    });

    test('breadcrumb buttons are clickable and styled correctly', () => {
      renderAnalyticsPanel();
      
      const entryButton = screen.getByRole('button', { name: 'Entry' });
      expect(entryButton).toHaveClass('text-secondary', 'hover:underline', 'hover:text-primary');
      
      const mainHubButton = screen.getByRole('button', { name: 'MainHub' });
      expect(mainHubButton).toHaveClass('text-secondary', 'hover:underline', 'hover:text-primary');
    });
  });

  describe('Navigation Interaction', () => {
    test('clicking breadcrumb navigates to correct screen', async () => {
      const { mockNavigate, mockSetNavigationHistory } = renderAnalyticsPanel();
      
      const entryButton = screen.getByRole('button', { name: 'Entry' });
      fireEvent.click(entryButton);
      
      expect(mockSetNavigationHistory).toHaveBeenCalledWith([]);
      expect(mockNavigate).toHaveBeenCalledWith('Entry', false);
    });

    test('clicking middle breadcrumb updates history correctly', async () => {
      const { mockNavigate, mockSetNavigationHistory } = renderAnalyticsPanel();
      
      const mainHubButton = screen.getByRole('button', { name: 'MainHub' });
      fireEvent.click(mainHubButton);
      
      expect(mockSetNavigationHistory).toHaveBeenCalledWith(['Entry']);
      expect(mockNavigate).toHaveBeenCalledWith('MainHub', false);
    });

    test('clicking last breadcrumb clears most of history', async () => {
      const { mockNavigate, mockSetNavigationHistory } = renderAnalyticsPanel();
      
      const timelineButton = screen.getByRole('button', { name: 'Timeline' });
      fireEvent.click(timelineButton);
      
      expect(mockSetNavigationHistory).toHaveBeenCalledWith(['Entry', 'MainHub']);
      expect(mockNavigate).toHaveBeenCalledWith('Timeline', false);
    });

    test('navigation calls use correct parameters', async () => {
      const { mockNavigate } = renderAnalyticsPanel();
      
      const entryButton = screen.getByRole('button', { name: 'Entry' });
      fireEvent.click(entryButton);
      
      // Should not add to history (false parameter)
      expect(mockNavigate).toHaveBeenCalledWith('Entry', false);
    });
  });

  describe('Responsive Layout', () => {
    test('uses responsive grid layout for statistics', () => {
      renderAnalyticsPanel();
      
      const statsGrid = screen.getByText('$company:').closest('div').parentElement;
      expect(statsGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-x-4', 'gap-y-1', 'text-sm');
    });

    test('session trace section has proper border styling', () => {
      renderAnalyticsPanel();
      
      // Find the divider element instead of the div with border classes
      const divider = document.querySelector('.border-t');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('border-secondary');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('handles missing meta object gracefully', () => {
      const sessionDataWithoutMeta = {
        ...MOCK_SESSION_DATA,
        meta: null
      };
      
      renderAnalyticsPanel({ sessionData: sessionDataWithoutMeta });
      
      expect(screen.getByText('$company:')).toBeInTheDocument();
      expect(screen.getByText('standard')).toBeInTheDocument(); // Default depth
      expect(screen.getByText('Code')).toBeInTheDocument(); // Default method
    });

    test('handles undefined sessionData properties gracefully', () => {
      const partialSessionData = {
        meta: {
          company: 'Test Company'
          // Missing depth and accessMethod
        },
        isWeb3User: false
        // Missing accessCode
      };
      
      renderAnalyticsPanel({ sessionData: partialSessionData });
      
      expect(screen.getByText('Test Company')).toBeInTheDocument();
      expect(screen.getByText('standard')).toBeInTheDocument();
      expect(screen.getByText('Code')).toBeInTheDocument();
    });

    test('handles very long navigation history', () => {
      const longHistory = Array.from({ length: 10 }, (_, i) => `Screen${i}`);
      
      renderAnalyticsPanel({ navigationHistory: longHistory });
      
      // Should render all breadcrumbs
      expect(screen.getByText('[0]')).toBeInTheDocument();
      expect(screen.getByText('[9]')).toBeInTheDocument();
      expect(screen.getByText('Screen0')).toBeInTheDocument();
      expect(screen.getByText('Screen9')).toBeInTheDocument();
    });

    test('handles missing session context gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<AnalyticsPanel />);
      }).toThrow(); // Should throw because useSession requires provider
      
      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    test('has proper semantic structure', () => {
      renderAnalyticsPanel();
      
      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings).toHaveLength(1);
      expect(headings[0]).toHaveTextContent('$analytics');
      
      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(subHeadings).toHaveLength(1);
      expect(subHeadings[0]).toHaveTextContent('$session_trace');
    });

    test('breadcrumb buttons are keyboard accessible', () => {
      renderAnalyticsPanel();
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
        // Buttons should be focusable by default
      });
    });

    test('maintains proper text color classes for accessibility', () => {
      renderAnalyticsPanel();
      
      const primaryLabels = screen.getAllByText(/\$\w+:/);
      primaryLabels.forEach(label => {
        expect(label).toHaveClass('text-primary');
      });
      
      const companyValue = screen.getByText('Acme Corp');
      expect(companyValue).toHaveClass('text-secondary');
    });
  });
});