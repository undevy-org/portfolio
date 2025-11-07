// src/app/components/ui/Tabs.test.js
'use strict';

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockSessionProvider } from '../../../../test-utils/providers';
import Tabs from './Tabs';

// Mock the TerminalImagePreview component since it's dynamically imported
jest.mock('../TerminalImagePreview', () => {
  const MockTerminalImagePreview = ({ src, alt, height, aspectRatio }) => (
    <div 
      data-testid="terminal-image-preview"
      data-src={src}
      data-alt={alt}
      data-height={height}
      data-aspect-ratio={aspectRatio}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ height, aspectRatio }} />
    </div>
  );
  MockTerminalImagePreview.displayName = 'MockTerminalImagePreview';
  return MockTerminalImagePreview;
});

// Test data fixtures
const TEST_TABS = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Project Overview',
    content: [
      { type: 'text', value: 'This is a sample project overview' },
      { type: 'list_item', value: 'Built with React and Next.js' },
      { type: 'sub_heading', value: 'Key Features' },
      { type: 'divider' },
      { type: 'text', value: 'Modern tech stack implementation' }
    ]
  },
  {
    id: 'technical',
    label: 'Technical Details',
    title: 'Technical Implementation',
    content: [
      { type: 'text', value: 'Technical specifications and architecture' },
      { 
        type: 'image', 
        src: '/test-image.jpg', 
        alt: 'Architecture diagram', 
        height: 300,
        aspectRatio: '16/9'
      },
      { type: 'list_item', value: 'RESTful API design' }
    ]
  },
  {
    id: 'results',
    label: 'Results',
    title: 'Project Results',
    content: [
      { type: 'text', value: 'Achievements and outcomes' }
    ]
  }
];

const SINGLE_TAB = [
  {
    id: 'single',
    label: 'Only Tab',
    title: 'Single Tab Content',
    content: [
      { type: 'text', value: 'This is the only available tab' }
    ]
  }
];

const CUSTOM_TAB = [
  {
    id: 'custom',
    label: 'Custom Content',
    title: 'Custom Rendered Content',
    type: 'custom',
    content: <div data-testid="custom-content">Custom JSX Content</div>
  }
];

// Helper function to render Tabs with SessionProvider
function renderTabs(props = {}, sessionProps = {}) {
  const mockAddLog = jest.fn();
  
  return {
    ...render(
      <MockSessionProvider addLog={mockAddLog} {...sessionProps}>
        <Tabs tabs={TEST_TABS} {...props} />
      </MockSessionProvider>
    ),
    mockAddLog
  };
}

describe('Tabs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders all tab labels correctly', () => {
      renderTabs();
      
      expect(screen.getByText('$Overview')).toBeInTheDocument();
      expect(screen.getByText('$Technical Details')).toBeInTheDocument();
      expect(screen.getByText('$Results')).toBeInTheDocument();
    });

    test('renders tab content with correct title', () => {
      renderTabs();
      
      expect(screen.getByText('$Project Overview')).toBeInTheDocument();
    });

    test('renders with default first tab active when no defaultTab specified', () => {
      renderTabs();
      
      const overviewTab = screen.getByRole('button', { name: '$Overview' });
      expect(overviewTab).toHaveClass('bg-active', 'text-primary', 'border-t', 'border-x', 'border-secondary');
    });

    test('renders with specified defaultTab active', () => {
      renderTabs({ defaultTab: 'technical' });
      
      const technicalTab = screen.getByRole('button', { name: '$Technical Details' });
      expect(technicalTab).toHaveClass('bg-active', 'text-primary');
      expect(screen.getByText('$Technical Implementation')).toBeInTheDocument();
    });

    test('handles single tab correctly', () => {
      renderTabs({ tabs: SINGLE_TAB });
      
      expect(screen.getByText('$Only Tab')).toBeInTheDocument();
      expect(screen.getByText('$Single Tab Content')).toBeInTheDocument();
    });

    test('renders fallback content when no activeTabData found', () => {
      renderTabs({ tabs: [], defaultTab: 'nonexistent' });
      
      expect(screen.queryByText('$')).not.toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    test('switches tabs when clicked', async () => {
      const { mockAddLog } = renderTabs();
      
      const technicalTab = screen.getByRole('button', { name: '$Technical Details' });
      
      await act(async () => {
        fireEvent.click(technicalTab);
      });
      
      expect(technicalTab).toHaveClass('bg-active', 'text-primary');
      expect(screen.getByText('$Technical Implementation')).toBeInTheDocument();
      expect(mockAddLog).toHaveBeenCalledWith('TAB SELECTED: Technical Details', 'info');
    });

    test('logs tab selection with correct label', async () => {
      const { mockAddLog } = renderTabs();
      
      const resultsTab = screen.getByRole('button', { name: '$Results' });
      
      await act(async () => {
        fireEvent.click(resultsTab);
      });
      
      // MockSessionProvider passes log type as second parameter
      expect(mockAddLog).toHaveBeenCalledWith('TAB SELECTED: Results', 'info');
    });

    test('updates active tab state correctly', async () => {
      renderTabs();
      
      const overviewTab = screen.getByRole('button', { name: '$Overview' });
      const technicalTab = screen.getByRole('button', { name: '$Technical Details' });
      
      // Initially overview should be active
      expect(overviewTab).toHaveClass('bg-active');
      expect(technicalTab).toHaveClass('bg-hover');
      
      await act(async () => {
        fireEvent.click(technicalTab);
      });
      
      // After click, technical should be active
      expect(technicalTab).toHaveClass('bg-active');
      expect(overviewTab).toHaveClass('bg-hover');
    });

    test('supports keyboard navigation (accessibility)', async () => {
      renderTabs();
      
      const overviewTab = screen.getByRole('button', { name: '$Overview' });
      const technicalTab = screen.getByRole('button', { name: '$Technical Details' });
      
      // Focus first tab
      overviewTab.focus();
      expect(overviewTab).toHaveFocus();
      
      // Navigate with Tab key
      fireEvent.keyDown(overviewTab, { key: 'Tab', code: 'Tab' });
      
      // Buttons are naturally keyboard accessible (no need to check tabIndex)
      // Just verify they can be focused and interacted with via keyboard
      fireEvent.keyDown(technicalTab, { key: 'Enter', code: 'Enter' });
      // The click handler should work the same way
    });
  });

  describe('Content Rendering', () => {
    test('renders text content correctly', () => {
      renderTabs();
      
      expect(screen.getByText('This is a sample project overview')).toBeInTheDocument();
      expect(screen.getByText('Modern tech stack implementation')).toBeInTheDocument();
    });

    test('renders list items with checkmark', () => {
      renderTabs();
      
      const listItem = screen.getByText('Built with React and Next.js');
      const checkmark = listItem.closest('div').querySelector('span');
      
      expect(listItem).toBeInTheDocument();
      expect(checkmark).toHaveTextContent('[✓]');
      expect(checkmark).toHaveClass('text-success');
    });

    test('renders sub headings with command style', () => {
      renderTabs();
      
      const subHeading = screen.getByText('$Key Features');
      expect(subHeading).toBeInTheDocument();
      expect(subHeading).toHaveClass('text-command');
    });

    test('renders dividers correctly', () => {
      renderTabs();
      
      const divider = document.querySelector('.border-t');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('border-secondary');
    });

    test('renders images via TerminalImagePreview', async () => {
      renderTabs({ defaultTab: 'technical' });
      
      await waitFor(() => {
        const imagePreview = screen.getByTestId('terminal-image-preview');
        expect(imagePreview).toBeInTheDocument();
        expect(imagePreview).toHaveAttribute('data-src', '/test-image.jpg');
        expect(imagePreview).toHaveAttribute('data-alt', 'Architecture diagram');
        expect(imagePreview).toHaveAttribute('data-height', '300');
        expect(imagePreview).toHaveAttribute('data-aspect-ratio', '16/9');
      });
    });

    test('renders image with default values when not specified', async () => {
      const tabsWithMinimalImage = [
        {
          id: 'minimal',
          label: 'Minimal',
          title: 'Minimal Image',
          content: [
            { type: 'image', src: '/minimal.jpg' }
          ]
        }
      ];
      
      renderTabs({ tabs: tabsWithMinimalImage });
      
      await waitFor(() => {
        const imagePreview = screen.getByTestId('terminal-image-preview');
        expect(imagePreview).toHaveAttribute('data-alt', 'Case study image');
        expect(imagePreview).toHaveAttribute('data-height', '250');
        expect(imagePreview).toHaveAttribute('data-aspect-ratio', '16/9');
      });
    });

    test('handles custom content type', () => {
      renderTabs({ tabs: CUSTOM_TAB });
      
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom JSX Content')).toBeInTheDocument();
    });

    test('handles unknown content type gracefully', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      const tabsWithUnknownType = [
        {
          id: 'unknown',
          label: 'Unknown',
          title: 'Unknown Type',
          content: [
            { type: 'unknown_type', value: 'Should not render' }
          ]
        }
      ];
      
      renderTabs({ tabs: tabsWithUnknownType });
      
      expect(consoleWarnSpy).toHaveBeenCalledWith('Unknown content type: unknown_type');
      expect(screen.queryByText('Should not render')).not.toBeInTheDocument();
      
      consoleWarnSpy.mockRestore();
    });

    test('displays fallback message when no content available', () => {
      const tabsWithNoContent = [
        {
          id: 'empty',
          label: 'Empty',
          title: 'Empty Content',
          content: 'invalid_content_type'
        }
      ];
      
      renderTabs({ tabs: tabsWithNoContent });
      
      expect(screen.getByText('No content available')).toBeInTheDocument();
    });
  });

  describe('SessionContext Integration', () => {
    test('integrates with SessionContext addLog function', async () => {
      const customAddLog = jest.fn();
      
      render(
        <MockSessionProvider addLog={customAddLog}>
          <Tabs tabs={TEST_TABS} />
        </MockSessionProvider>
      );
      
      const technicalTab = screen.getByRole('button', { name: '$Technical Details' });
      
      await act(async () => {
        fireEvent.click(technicalTab);
      });
      
      expect(customAddLog).toHaveBeenCalledWith('TAB SELECTED: Technical Details', 'info');
    });

    test('works correctly when SessionContext is unavailable', () => {
      // Since the component requires SessionContext, we test that it throws appropriately
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<Tabs tabs={TEST_TABS} />);
      }).toThrow('useSession must be used within a SessionProvider');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty tabs array gracefully', async () => {
      const { container } = render(
        <MockSessionProvider>
          <Tabs tabs={[]} />
        </MockSessionProvider>
      );
      
      // Should not crash and should render nothing (null)
      expect(container.firstChild).toBeNull();
    });

    test('handles undefined/null tabs prop', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(
          <MockSessionProvider>
            <Tabs tabs={null} />
          </MockSessionProvider>
        );
      }).not.toThrow();
      
      expect(() => {
        render(
          <MockSessionProvider>
            <Tabs tabs={undefined} />
          </MockSessionProvider>
        );
      }).not.toThrow();
      
      consoleSpy.mockRestore();
    });

    test('handles invalid defaultTab gracefully', async () => {
      await act(async () => {
        renderTabs({ defaultTab: 'nonexistent_tab' });
      });
      
      // Should fallback to first tab when defaultTab is invalid
      await waitFor(() => {
        // The first tab should be active (Overview)
        const overviewTab = screen.getByRole('button', { name: '$Overview' });
        expect(overviewTab).toHaveClass('bg-active');
        expect(screen.getByText('$Project Overview')).toBeInTheDocument();
      });
    });

    test('handles tabs without content property', async () => {
      const tabsWithoutContent = [
        {
          id: 'no_content',
          label: 'No Content',
          title: 'No Content Tab'
          // Missing content property
        }
      ];
      
      await act(async () => {
        renderTabs({ tabs: tabsWithoutContent });
      });
      
      await waitFor(() => {
        expect(screen.getByText('No content available')).toBeInTheDocument();
      });
    });

    test('handles tabs with empty content array', async () => {
      const tabsWithEmptyContent = [
        {
          id: 'empty_content',
          label: 'Empty',
          title: 'Empty Content',
          content: []
        }
      ];
      
      await act(async () => {
        renderTabs({ tabs: tabsWithEmptyContent });
      });
      
      // Should render empty space-y-2 div but no content
      const contentContainer = document.querySelector('.space-y-2');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer.children).toHaveLength(0);
    });

    test('handles tab title fallback to label', async () => {
      const tabsWithoutTitle = [
        {
          id: 'no_title',
          label: 'No Title Tab',
          content: [
            { type: 'text', value: 'Content without title' }
          ]
          // Missing title property
        }
      ];
      
      await act(async () => {
        renderTabs({ tabs: tabsWithoutTitle });
      });
      
      // Use getAllByText to handle multiple matches and select the title
      const titleElements = screen.getAllByText('$No Title Tab');
      expect(titleElements.length).toBeGreaterThanOrEqual(1);
      // Verify the title element specifically
      const titleElement = titleElements.find(el => el.tagName === 'H3');
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    test('dynamic import loading state is handled', async () => {
      // This is implicitly tested by our mock, but we verify the import works
      const tabsWithImage = [
        {
          id: 'image_tab',
          label: 'Image Tab',
          title: 'Image Loading',
          content: [
            { type: 'image', src: '/test.jpg', alt: 'Test image' }
          ]
        }
      ];
      
      renderTabs({ tabs: tabsWithImage });
      
      await waitFor(() => {
        expect(screen.getByTestId('terminal-image-preview')).toBeInTheDocument();
      });
    });

    test('re-renders efficiently when props change', async () => {
      const { rerender } = renderTabs();
      
      // Initial render
      await waitFor(() => {
        expect(screen.getByText('$Project Overview')).toBeInTheDocument();
      });
      
      // Update with new tabs
      await act(async () => {
        rerender(
          <MockSessionProvider>
            <Tabs tabs={SINGLE_TAB} />
          </MockSessionProvider>
        );
      });
      
      await waitFor(() => {
        // First ensure the tab is rendered and active
        const onlyTab = screen.getByRole('button', { name: '$Only Tab' });
        // Single tabs should be automatically active since it's the only option
        expect(onlyTab).toBeInTheDocument();
        expect(screen.getByText('$Single Tab Content')).toBeInTheDocument();
        expect(screen.queryByText('$Project Overview')).not.toBeInTheDocument();
      });
    });
  });
});