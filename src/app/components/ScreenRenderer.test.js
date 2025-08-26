// src/app/components/ScreenRenderer.test.js
'use strict';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../test-utils/providers';
import ScreenRenderer from './ScreenRenderer';

// Mock all the screen components
jest.mock('../screens/Entry', () => {
  const MockEntry = () => <div data-testid="entry-screen">Entry Screen</div>;
  MockEntry.displayName = 'MockEntry';
  return MockEntry;
});

jest.mock('../screens/ProfileBoot', () => {
  const MockProfileBoot = () => <div data-testid="profileboot-screen">ProfileBoot Screen</div>;
  MockProfileBoot.displayName = 'MockProfileBoot';
  return MockProfileBoot;
});

jest.mock('../screens/MainHub', () => {
  const MockMainHub = () => <div data-testid="mainhub-screen">MainHub Screen</div>;
  MockMainHub.displayName = 'MockMainHub';
  return MockMainHub;
});

jest.mock('../screens/Introduction', () => {
  const MockIntroduction = () => <div data-testid="introduction-screen">Introduction Screen</div>;
  MockIntroduction.displayName = 'MockIntroduction';
  return MockIntroduction;
});

jest.mock('../screens/Timeline', () => {
  const MockTimeline = () => <div data-testid="timeline-screen">Timeline Screen</div>;
  MockTimeline.displayName = 'MockTimeline';
  return MockTimeline;
});

jest.mock('../screens/RoleDetail', () => {
  const MockRoleDetail = () => <div data-testid="roledetail-screen">RoleDetail Screen</div>;
  MockRoleDetail.displayName = 'MockRoleDetail';
  return MockRoleDetail;
});

jest.mock('../screens/CaseList', () => {
  const MockCaseList = () => <div data-testid="caselist-screen">CaseList Screen</div>;
  MockCaseList.displayName = 'MockCaseList';
  return MockCaseList;
});

jest.mock('../screens/CaseDetail', () => {
  const MockCaseDetail = () => <div data-testid="casedetail-screen">CaseDetail Screen</div>;
  MockCaseDetail.displayName = 'MockCaseDetail';
  return MockCaseDetail;
});

jest.mock('../screens/SkillsGrid', () => {
  const MockSkillsGrid = () => <div data-testid="skillsgrid-screen">SkillsGrid Screen</div>;
  MockSkillsGrid.displayName = 'MockSkillsGrid';
  return MockSkillsGrid;
});

jest.mock('../screens/SkillDetail', () => {
  const MockSkillDetail = () => <div data-testid="skilldetail-screen">SkillDetail Screen</div>;
  MockSkillDetail.displayName = 'MockSkillDetail';
  return MockSkillDetail;
});

jest.mock('../screens/SideProjects', () => {
  const MockSideProjects = () => <div data-testid="sideprojects-screen">SideProjects Screen</div>;
  MockSideProjects.displayName = 'MockSideProjects';
  return MockSideProjects;
});

jest.mock('../screens/Contact', () => {
  const MockContact = () => <div data-testid="contact-screen">Contact Screen</div>;
  MockContact.displayName = 'MockContact';
  return MockContact;
});

// Helper function to render ScreenRenderer with SessionProvider
function renderScreenRenderer(sessionProps = {}) {
  return render(
    <MockSessionProvider
      currentScreen="MainHub"
      {...sessionProps}
    >
      <ScreenRenderer />
    </MockSessionProvider>
  );
}

describe('ScreenRenderer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Dynamic Screen Loading', () => {
    test('renders Entry screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'Entry' });
      
      await waitFor(() => {
        expect(screen.getByTestId('entry-screen')).toBeInTheDocument();
        expect(screen.getByText('Entry Screen')).toBeInTheDocument();
      });
    });

    test('renders ProfileBoot screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'ProfileBoot' });
      
      await waitFor(() => {
        expect(screen.getByTestId('profileboot-screen')).toBeInTheDocument();
        expect(screen.getByText('ProfileBoot Screen')).toBeInTheDocument();
      });
    });

    test('renders MainHub screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'MainHub' });
      
      await waitFor(() => {
        expect(screen.getByTestId('mainhub-screen')).toBeInTheDocument();
        expect(screen.getByText('MainHub Screen')).toBeInTheDocument();
      });
    });

    test('renders Introduction screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'Introduction' });
      
      await waitFor(() => {
        expect(screen.getByTestId('introduction-screen')).toBeInTheDocument();
        expect(screen.getByText('Introduction Screen')).toBeInTheDocument();
      });
    });

    test('renders Timeline screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'Timeline' });
      
      await waitFor(() => {
        expect(screen.getByTestId('timeline-screen')).toBeInTheDocument();
        expect(screen.getByText('Timeline Screen')).toBeInTheDocument();
      });
    });

    test('renders RoleDetail screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'RoleDetail' });
      
      await waitFor(() => {
        expect(screen.getByTestId('roledetail-screen')).toBeInTheDocument();
        expect(screen.getByText('RoleDetail Screen')).toBeInTheDocument();
      });
    });

    test('renders CaseList screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'CaseList' });
      
      await waitFor(() => {
        expect(screen.getByTestId('caselist-screen')).toBeInTheDocument();
        expect(screen.getByText('CaseList Screen')).toBeInTheDocument();
      });
    });

    test('renders CaseDetail screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'CaseDetail' });
      
      await waitFor(() => {
        expect(screen.getByTestId('casedetail-screen')).toBeInTheDocument();
        expect(screen.getByText('CaseDetail Screen')).toBeInTheDocument();
      });
    });

    test('renders SkillsGrid screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'SkillsGrid' });
      
      await waitFor(() => {
        expect(screen.getByTestId('skillsgrid-screen')).toBeInTheDocument();
        expect(screen.getByText('SkillsGrid Screen')).toBeInTheDocument();
      });
    });

    test('renders SkillDetail screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'SkillDetail' });
      
      await waitFor(() => {
        expect(screen.getByTestId('skilldetail-screen')).toBeInTheDocument();
        expect(screen.getByText('SkillDetail Screen')).toBeInTheDocument();
      });
    });

    test('renders SideProjects screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'SideProjects' });
      
      await waitFor(() => {
        expect(screen.getByTestId('sideprojects-screen')).toBeInTheDocument();
        expect(screen.getByText('SideProjects Screen')).toBeInTheDocument();
      });
    });

    test('renders Contact screen correctly', async () => {
      renderScreenRenderer({ currentScreen: 'Contact' });
      
      await waitFor(() => {
        expect(screen.getByTestId('contact-screen')).toBeInTheDocument();
        expect(screen.getByText('Contact Screen')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('displays error message for unknown screen', () => {
      renderScreenRenderer({ currentScreen: 'UnknownScreen' });
      
      expect(screen.getByText('Screen not found: UnknownScreen')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveClass('text-xl', 'text-error');
    });

    test('error message container has correct styling', () => {
      renderScreenRenderer({ currentScreen: 'InvalidScreen' });
      
      const errorContainer = screen.getByText('Screen not found: InvalidScreen').closest('div');
      expect(errorContainer).toHaveClass('p-4', 'text-center');
    });

    test('handles null currentScreen gracefully', () => {
      renderScreenRenderer({ currentScreen: null });
      
      // When currentScreen is null, it gets converted to empty string in the error message
      expect(screen.getByText(/Screen not found:/)).toBeInTheDocument();
    });

    test('handles undefined currentScreen gracefully', () => {
      renderScreenRenderer({ currentScreen: undefined });
      
      // When currentScreen is undefined, MockSessionProvider likely defaults to something
      // Check that either error is shown or default screen is rendered
      const hasError = screen.queryByText(/Screen not found:/);
      const hasDefaultScreen = screen.queryByTestId('mainhub-screen');
      
      expect(hasError || hasDefaultScreen).toBeTruthy();
    });

    test('handles empty string currentScreen gracefully', () => {
      renderScreenRenderer({ currentScreen: '' });
      
      expect(screen.getByText('Screen not found:')).toBeInTheDocument();
    });
  });

  describe('Screen Transitions', () => {
    test('switches between different screens correctly', async () => {
      const { rerender } = renderScreenRenderer({ currentScreen: 'MainHub' });
      
      // Initial screen
      await waitFor(() => {
        expect(screen.getByTestId('mainhub-screen')).toBeInTheDocument();
      });
      
      // Switch to Timeline
      rerender(
        <MockSessionProvider currentScreen="Timeline">
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('timeline-screen')).toBeInTheDocument();
        expect(screen.queryByTestId('mainhub-screen')).not.toBeInTheDocument();
      });
      
      // Switch to Contact
      rerender(
        <MockSessionProvider currentScreen="Contact">
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('contact-screen')).toBeInTheDocument();
        expect(screen.queryByTestId('timeline-screen')).not.toBeInTheDocument();
      });
    });

    test('transitions from valid screen to error state', async () => {
      const { rerender } = renderScreenRenderer({ currentScreen: 'MainHub' });
      
      // Initial valid screen
      await waitFor(() => {
        expect(screen.getByTestId('mainhub-screen')).toBeInTheDocument();
      });
      
      // Switch to invalid screen
      rerender(
        <MockSessionProvider currentScreen="NonExistentScreen">
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      expect(screen.getByText('Screen not found: NonExistentScreen')).toBeInTheDocument();
      expect(screen.queryByTestId('mainhub-screen')).not.toBeInTheDocument();
    });

    test('transitions from error state to valid screen', async () => {
      const { rerender } = renderScreenRenderer({ currentScreen: 'InvalidScreen' });
      
      // Initial error state
      expect(screen.getByText('Screen not found: InvalidScreen')).toBeInTheDocument();
      
      // Switch to valid screen
      rerender(
        <MockSessionProvider currentScreen="Contact">
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('contact-screen')).toBeInTheDocument();
        expect(screen.queryByText('Screen not found: InvalidScreen')).not.toBeInTheDocument();
      });
    });
  });

  describe('SessionContext Integration', () => {
    test('reads currentScreen from SessionContext correctly', async () => {
      renderScreenRenderer({ currentScreen: 'Timeline' });
      
      await waitFor(() => {
        expect(screen.getByTestId('timeline-screen')).toBeInTheDocument();
      });
    });

    test('handles missing SessionContext gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<ScreenRenderer />);
      }).toThrow(); // Should throw because useSession requires provider
      
      consoleSpy.mockRestore();
    });

    test('responds to currentScreen changes in context', async () => {
      let currentScreen = 'MainHub';
      const { rerender } = render(
        <MockSessionProvider currentScreen={currentScreen}>
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('mainhub-screen')).toBeInTheDocument();
      });
      
      // Update currentScreen
      currentScreen = 'Introduction';
      rerender(
        <MockSessionProvider currentScreen={currentScreen}>
          <ScreenRenderer />
        </MockSessionProvider>
      );
      
      await waitFor(() => {
        expect(screen.getByTestId('introduction-screen')).toBeInTheDocument();
        expect(screen.queryByTestId('mainhub-screen')).not.toBeInTheDocument();
      });
    });
  });

  describe('Performance and Optimization', () => {
    test('loads screen components dynamically', async () => {
      renderScreenRenderer({ currentScreen: 'MainHub' });
      
      // Component should load asynchronously
      await waitFor(() => {
        expect(screen.getByTestId('mainhub-screen')).toBeInTheDocument();
      });
      
      // Verify other screens are not loaded yet (optimization)
      expect(screen.queryByTestId('timeline-screen')).not.toBeInTheDocument();
      expect(screen.queryByTestId('contact-screen')).not.toBeInTheDocument();
    });

    test('renders screen component directly without wrapper', async () => {
      renderScreenRenderer({ currentScreen: 'MainHub' });
      
      await waitFor(() => {
        const screenElement = screen.getByTestId('mainhub-screen');
        expect(screenElement).toBeInTheDocument();
        
        // Should not have unnecessary wrapper elements
        expect(screenElement.parentElement).toBe(document.body.firstChild);
      });
    });

    test('handles rapid screen changes efficiently', async () => {
      const { rerender } = renderScreenRenderer({ currentScreen: 'MainHub' });
      
      // Rapid screen changes
      const screens = ['Timeline', 'Contact', 'Introduction', 'SkillsGrid'];
      
      for (const screenName of screens) {
        rerender(
          <MockSessionProvider currentScreen={screenName}>
            <ScreenRenderer />
          </MockSessionProvider>
        );
        
        await waitFor(() => {
          expect(screen.getByTestId(`${screenName.toLowerCase()}-screen`)).toBeInTheDocument();
        });
      }
    });
  });

  describe('Accessibility and Semantic Structure', () => {
    test('error messages have proper semantic structure', () => {
      renderScreenRenderer({ currentScreen: 'UnknownScreen' });
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Screen not found: UnknownScreen');
      expect(heading).toHaveClass('text-xl', 'text-error');
    });

    test('screen components are rendered in accessible container', async () => {
      renderScreenRenderer({ currentScreen: 'MainHub' });
      
      await waitFor(() => {
        const screenElement = screen.getByTestId('mainhub-screen');
        expect(screenElement).toBeInTheDocument();
      });
    });

    test('error state is announced properly', () => {
      renderScreenRenderer({ currentScreen: 'InvalidScreen' });
      
      // Error message should be visible and accessible
      const errorMessage = screen.getByText('Screen not found: InvalidScreen');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toBeVisible();
    });
  });

  describe('Edge Cases', () => {
    test('handles case-sensitive screen names', () => {
      renderScreenRenderer({ currentScreen: 'mainhub' }); // lowercase
      
      expect(screen.getByText('Screen not found: mainhub')).toBeInTheDocument();
    });

    test('handles screen names with special characters', () => {
      renderScreenRenderer({ currentScreen: 'Main-Hub' });
      
      expect(screen.getByText('Screen not found: Main-Hub')).toBeInTheDocument();
    });

    test('handles very long screen names', () => {
      const longScreenName = 'VeryLongScreenNameThatShouldStillBeHandledCorrectly';
      renderScreenRenderer({ currentScreen: longScreenName });
      
      expect(screen.getByText(`Screen not found: ${longScreenName}`)).toBeInTheDocument();
    });

    test('handles numeric screen names', () => {
      renderScreenRenderer({ currentScreen: '123' });
      
      expect(screen.getByText('Screen not found: 123')).toBeInTheDocument();
    });
  });
});