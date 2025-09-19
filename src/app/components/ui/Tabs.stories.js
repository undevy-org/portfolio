// src/app/components/ui/Tabs.stories.js
import Tabs from './Tabs';
import { MockSessionProvider } from '../../../../test-utils/storybook-mocks.jsx';

/**
 * Tabs Story Configuration
 */
const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tabbed interface component with multiple content types and interactive navigation.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <Story />
      </MockSessionProvider>
    ),
  ],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with id, label, title, and content',
    },
    defaultTab: {
      control: 'text',
      description: 'ID of the tab to show by default',
    },
  },
};

export default meta;

/**
 * Primary story - Basic text tabs
 */
export const Default = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Project Overview',
        content: [
          { type: 'text', value: 'This project demonstrates a comprehensive React component library with Storybook integration.' },
          { type: 'text', value: 'The portfolio includes various UI atoms, molecules, and organisms designed for terminal-style applications.' }
        ]
      },
      {
        id: 'technology',
        label: 'Technology',
        title: 'Technology Stack',
        content: [
          { type: 'text', value: 'Built with modern web technologies including React, Next.js, and Tailwind CSS.' },
          { type: 'text', value: 'Features include TypeScript support, responsive design, and accessibility compliance.' }
        ]
      },
      {
        id: 'features',
        label: 'Features',
        title: 'Key Features',
        content: [
          { type: 'text', value: 'Comprehensive component library with 50+ reusable components.' },
          { type: 'text', value: 'Dark/light theme support with multiple color schemes.' },
          { type: 'text', value: 'Full accessibility support with ARIA labels and keyboard navigation.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs with text content across different categories.',
      },
    },
  },
};

/**
 * Content type variations - Mixed content types
 */
export const WithMixedContent = {
  args: {
    tabs: [
      {
        id: 'about',
        label: 'About',
        title: 'About This Project',
        content: [
          { type: 'text', value: 'This is a comprehensive React component library designed for modern web applications.' },
          { type: 'sub_heading', value: 'Key Highlights' },
          { type: 'list_item', value: 'Over 50 reusable components' },
          { type: 'list_item', value: 'Full TypeScript support' },
          { type: 'list_item', value: 'Accessibility compliant' },
          { type: 'divider' },
          { type: 'text', value: 'The library provides developers with a consistent set of UI primitives.' }
        ]
      },
      {
        id: 'usage',
        label: 'Usage',
        title: 'Getting Started',
        content: [
          { type: 'sub_heading', value: 'Installation' },
          { type: 'text', value: 'Install the package using npm or yarn.' },
          { type: 'list_item', value: 'Copy the component files to your project' },
          { type: 'list_item', value: 'Import and use in your components' },
          { type: 'list_item', value: 'Customize with Tailwind CSS classes' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs featuring mixed content types: headings, lists, dividers, and text.',
      },
    },
  },
};

/**
 * State variations - Different active tabs
 */
export const WithDefaultTab = {
  args: {
    defaultTab: 'technology',
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Overview',
        content: [{ type: 'text', value: 'This is the overview section.' }]
      },
      {
        id: 'technology',
        label: 'Technology',
        title: 'Technology Stack',
        content: [{ type: 'text', value: 'Technology details go here.' }]
      },
      {
        id: 'contact',
        label: 'Contact',
        title: 'Contact Information',
        content: [{ type: 'text', value: 'Get in touch with us.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with a specific default active tab.',
      },
    },
  },
};

/**
 * Tab count variations - Few to many tabs
 */
export const TwoTabs = {
  args: {
    tabs: [
      {
        id: 'design',
        label: 'Design',
        title: 'Design System',
        content: [{ type: 'text', value: 'Our design system ensures consistency across all components.' }]
      },
      {
        id: 'development',
        label: 'Development',
        title: 'Development Guidelines',
        content: [{ type: 'text', value: 'Coding standards and best practices for development.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal tabs setup with just two tabs.',
      },
    },
  },
};

export const ManyTabs = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Tab 1', title: 'Tab 1', content: [{ type: 'text', value: 'Content 1' }] },
      { id: 'tab2', label: 'Tab 2', title: 'Tab 2', content: [{ type: 'text', value: 'Content 2' }] },
      { id: 'tab3', label: 'Tab 3', title: 'Tab 3', content: [{ type: 'text', value: 'Content 3' }] },
      { id: 'tab4', label: 'Tab 4', title: 'Tab 4', content: [{ type: 'text', value: 'Content 4' }] },
      { id: 'tab5', label: 'Tab 5', title: 'Tab 5', content: [{ type: 'text', value: 'Content 5' }] },
      { id: 'tab6', label: 'Tab 6', title: 'Tab 6', content: [{ type: 'text', value: 'Content 6' }] }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Many tabs demonstrating horizontal scrolling if needed.',
      },
    },
  },
};

/**
 * Real-world examples
 */
export const ProductDocumentation = {
  args: {
    tabs: [
      {
        id: 'getting-started',
        label: 'Getting Started',
        title: 'Getting Started Guide',
        content: [
          { type: 'text', value: 'Welcome to our documentation! This guide will help you get started quickly.' },
          { type: 'sub_heading', value: 'Prerequisites' },
          { type: 'list_item', value: 'Node.js 18 or higher' },
          { type: 'list_item', value: 'npm or yarn package manager' },
          { type: 'list_item', value: 'Basic React knowledge' }
        ]
      },
      {
        id: 'api-reference',
        label: 'API',
        title: 'API Reference',
        content: [
          { type: 'text', value: 'Complete API reference for all available methods and properties.' },
          { type: 'sub_heading', value: 'Core Methods' },
          { type: 'list_item', value: 'initialize() - Initialize the library' },
          { type: 'list_item', value: 'render() - Render the component' },
          { type: 'list_item', value: 'destroy() - Clean up resources' }
        ]
      },
      {
        id: 'examples',
        label: 'Examples',
        title: 'Code Examples',
        content: [
          { type: 'text', value: 'Practical examples to help you understand how to use our library.' },
          { type: 'text', value: 'All examples include working code samples you can copy and modify.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Product documentation layout with getting started, API, and examples tabs.',
      },
    },
  },
};

/**
 * User profile tabs example
 */
export const UserProfileTabs = {
  args: {
    tabs: [
      {
        id: 'profile',
        label: 'Profile',
        title: 'Profile Information',
        content: [
          { type: 'list_item', value: 'Name: John Doe' },
          { type: 'list_item', value: 'Location: San Francisco, CA' },
          { type: 'list_item', value: 'Join Date: January 2024' },
          { type: 'list_item', value: 'Last Active: Today' }
        ]
      },
      {
        id: 'preferences',
        label: 'Preferences',
        title: 'User Preferences',
        content: [
          { type: 'text', value: 'Manage your account preferences and settings.' },
          { type: 'list_item', value: 'Theme: Automatically detected' },
          { type: 'list_item', value: 'Notifications: Enabled' },
          { type: 'list_item', value: 'Language: English' }
        ]
      },
      {
        id: 'activity',
        label: 'Activity',
        title: 'Recent Activity',
        content: [
          { type: 'text', value: 'Your recent activity across the platform.' },
          { type: 'list_item', value: 'Updated profile information' },
          { type: 'list_item', value: 'Changed theme preferences' },
          { type: 'list_item', value: 'Viewed documentation' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'User profile management with profile, preferences, and activity tabs.',
      },
    },
  },
};

/**
 * Tab interaction demonstration
 */
export const InteractiveTabs = {
  args: {
    tabs: [
      {
        id: 'click-me',
        label: 'Click Me',
        title: 'Interactive Tab',
        content: [
          { type: 'text', value: 'This tab demonstrates interactive behavior. Click the tab header above to switch between tabs.' },
          { type: 'text', value: 'Notice the console logs that track tab selection events using the SessionContext.' },
          { type: 'list_item', value: 'Tab switching is logged' },
          { type: 'list_item', value: 'State is preserved between switches' },
          { type: 'list_item', value: 'Content updates dynamically' }
        ]
      },
      {
        id: 'another-tab',
        label: 'Another Tab',
        title: 'Another Interactive Tab',
        content: [
          { type: 'text', value: 'Different content loads based on which tab is selected.' },
          { type: 'text', value: 'This demonstrates the dynamic content rendering capability.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates interactive tab switching with logging.',
      },
    },
  },
};

/**
 * Content length variations
 */
export const ShortContent = {
  args: {
    tabs: [
      {
        id: 'brief',
        label: 'Brief',
        title: 'Brief Content',
        content: [{ type: 'text', value: 'Short and concise content.' }]
      },
      {
        id: 'compact',
        label: 'Compact',
        title: 'Compact Information',
        content: [{ type: 'text', value: 'Minimal information display.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with minimal content for quick scanning.',
      },
    },
  },
};

export const LongContent = {
  args: {
    tabs: [
      {
        id: 'detailed',
        label: 'Detailed Info',
        title: 'Detailed Information Section',
        content: [
          { type: 'text', value: 'This tab contains extensive information to demonstrate how the component handles long-form content within a tabbed interface.' },
          { type: 'sub_heading', value: 'Section 1: Introduction' },
          { type: 'text', value: 'The detailed content is designed to provide comprehensive information to users. It includes multiple paragraphs, subheadings, and structured elements.' },
          { type: 'list_item', value: 'Point number one with detailed explanation' },
          { type: 'list_item', value: 'Second important point with additional context' },
          { type: 'list_item', value: 'Third point highlighting key benefits' },
          { type: 'list_item', value: 'Fourth point for completeness' },
          { type: 'divider' },
          { type: 'sub_heading', value: 'Section 2: Implementation' },
          { type: 'text', value: 'Implementation details and technical specifications are provided in this section to help developers understand the underlying architecture. This includes code examples and configuration options.' },
          { type: 'list_item', value: 'Component configuration and setup' },
          { type: 'list_item', value: 'State management and data flow' },
          { type: 'list_item', value: 'Performance optimization techniques' },
          { type: 'list_item', value: 'Integration with existing systems' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with extensive content showing scrollable content areas.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const SingleTab = {
  args: {
    tabs: [
      {
        id: 'single',
        label: 'Single Tab',
        title: 'Single Tab Example',
        content: [{ type: 'text', value: 'This demonstrates tabs with only one available tab.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with only a single tab available.',
      },
    },
  },
};

export const EmptyTabs = {
  args: {
    tabs: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with empty tabs array (component hides gracefully).',
      },
    },
  },
};

export const MissingTitle = {
  args: {
    tabs: [
      {
        id: 'no-title',
        label: 'No Title Tab',
        content: [{ type: 'text', value: 'This tab has no title property, using fallback.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab without title property, should use label as fallback.',
      },
    },
  },
};
