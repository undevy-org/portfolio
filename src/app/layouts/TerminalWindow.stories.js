// src/app/layouts/TerminalWindow.stories.js
import TerminalWindow from './TerminalWindow';
import Button from '../components/ui/Button';
import CommandTitle from '../components/atoms/CommandTitle';
import LabelValuePair from '../components/molecules/LabelValuePair';
import { useState } from 'react';
import { ChevronRight, User, Settings } from 'lucide-react';

/**
 * TerminalWindow Story Configuration
 */
const meta = {
  title: 'Layouts/TerminalWindow',
  component: TerminalWindow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A terminal-style window layout with header navigation, breadcrumbs, and theme switching. Provides consistent structure for portfolio screens.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Window title displayed in header',
    },
    children: {
      control: 'object',
      description: 'Content to display inside the window',
    },
    fixedHeight: {
      control: 'boolean',
      description: 'Whether to use fixed height mode for scrolling content',
    },
  },
};

export default meta;

/**
 * Primary story - Default window
 */
export const Default = {
  args: {
    title: 'portfolio',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default TerminalWindow with standard header and navigation.',
      },
    },
  },
};

/**
 * With content examples
 */
export const WithBasicContent = {
  args: {
    title: 'profile',
    children: (
      <div className="p-6 space-y-4">
        <CommandTitle text="Profile Information" />
        <LabelValuePair label="Name" value="John Doe" />
        <LabelValuePair label="Role" value="Senior Developer" />
        <LabelValuePair label="Location" value="San Francisco, CA" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window with basic profile content.',
      },
    },
  },
};

export const WithDetailedContent = {
  args: {
    title: 'case-details',
    children: (
      <div className="p-6 space-y-6">
        <CommandTitle text="Project Details" />

        <div className="space-y-4">
          <LabelValuePair label="Project Name" value="E-Commerce Platform" />
          <LabelValuePair label="Technology Stack" value="React, Node.js, PostgreSQL" />
          <LabelValuePair label="Duration" value="6 months" />
          <LabelValuePair label="Team Size" value="8 developers" />
        </div>

        <div className="border-t border-primary pt-4">
          <CommandTitle level="h3" text="Key Achievements" />
          <ul className="space-y-2 text-secondary">
            <li>• Increased conversion by 45%</li>
            <li>• Reduced loading time by 60%</li>
            <li>• Improved user engagement metrics by 30%</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Button>View Live Demo</Button>
          <Button variant="icon-only" icon={Settings}>Configure</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window with detailed project information and interactive elements.',
      },
    },
  },
};

/**
 * Fixed height mode examples
 */
export const FixedHeightMode = {
  args: {
    title: 'timeline',
    fixedHeight: true,
    children: (
      <div className="p-6 space-y-6">
        <CommandTitle text="Professional Timeline" />

        {/* Long list that will require scrolling */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="border-b border-secondary pb-4">
            <div className="flex justify-between items-start">
              <div>
                <CommandTitle level="h4" text={`Role ${i + 1}`} />
                <p className="text-secondary mb-2">Company Name • {2023 - i}-{2024 - i}</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <Button>Load More</Button>
          <Button variant="inline">Filter</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Fixed height mode with scrollable timeline content.',
      },
    },
  },
};

/**
 * Different screen contexts
 */
export const OnMainHub = {
  args: {
    title: 'main-hub',
  },
  parameters: {
    docs: {
      description: {
        story: 'Window when on the main hub screen.',
      },
    },
  },
};

export const InSessionMode = {
  args: {
    title: 'active-session',
    children: (
      <div className="p-6 space-y-4">
        <CommandTitle text="Session Active" />
        <LabelValuePair label="Session ID" value="abc-123-def" />
        <LabelValuePair label="Duration" value="2 hours 15 minutes" />
        <LabelValuePair label="Screens Visited" value="8 pages" />

        <div className="flex gap-4">
          <Button variant="full">Continue Session</Button>
          <Button variant="inline">View History</Button>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window in active session mode.',
      },
    },
  },
};

/**
 * Demo mode variations
 */
export const DemoModeBanner = {
  args: {
    title: 'demo-session',
    children: (
      <div className="p-6 space-y-4">
        <CommandTitle text="Demo Content" />
        <p className="text-secondary">
          This is example content showing how the terminal window works in demo mode.
          The banner above indicates this is not a real user session.
        </p>

        <div className="bg-hover p-4 rounded">
          <LabelValuePair label="Demo Company" value="Storybook Corp" />
          <LabelValuePair label="Demo Role" value="Portfolio Viewer" />
          <LabelValuePair label="Demo ID" value="STORYBOOK-DEMO" />
        </div>

        <Button variant="full" icon={ChevronRight} iconPosition="right">
          Get Your Access Code
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window showing demo mode banner and placeholder content.',
      },
    },
  },
};

/**
 * Breadcrumb variations
 */
const BreadcrumbDemo = (args) => {
  const [currentScreen, setCurrentScreen] = useState('CaseDetail');

  return (
    <div className="space-y-4">
      <div className="text-sm text-secondary mb-4">
        Current Screen: {currentScreen}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          className="px-3 py-1 bg-primary text-bg rounded text-sm"
          onClick={() => setCurrentScreen('MainHub')}
        >
          MainHub
        </button>
        <button
          className="px-3 py-1 bg-primary text-bg rounded text-sm"
          onClick={() => setCurrentScreen('CaseList')}
        >
          CaseList
        </button>
        <button
          className="px-3 py-1 bg-primary text-bg rounded text-sm"
          onClick={() => setCurrentScreen('CaseDetail')}
        >
          CaseDetail
        </button>
        <button
          className="px-3 py-1 bg-primary text-bg rounded text-sm"
          onClick={() => setCurrentScreen('SkillDetail')}
        >
          SkillDetail
        </button>
      </div>

      <TerminalWindow
        {...args}
        title={currentScreen.toLowerCase()}
      >
        <div className="p-6">
          <CommandTitle text={`${currentScreen} Content`} />
          <p className="text-secondary mt-4">
            This screen shows breadcrumb navigation. Try changing the screen above
            to see how breadcrumbs update with the navigation hierarchy.
          </p>
        </div>
      </TerminalWindow>
    </div>
  );
};

export const BreadcrumbNavigation = () => <BreadcrumbDemo />;

BreadcrumbNavigation.parameters = {
  docs: {
    description: {
      story: 'Interactive demo showing breadcrumb navigation for different screens.',
    },
  },
  layout: 'padded',
};

/**
 * Theme variations
 */
export const VariousThemes = {
  args: {
    title: 'themed-window',
    children: (
      <div className="p-6 space-y-4">
        <CommandTitle text="Theme Preview" />
        <p className="text-secondary">
          This window demonstrates consistent styling across different themes.
          The header navigation and window chrome adapt to the current theme.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <LabelValuePair label="Window Style" value="Terminal Theme" />
          <LabelValuePair label="Navigation" value="Breadcrumb Style" />
          <LabelValuePair label="Controls" value="Theme Toggle" />
          <LabelValuePair label="Header" value="Icon Navigation" />
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window showing consistent styling across different themes.',
      },
    },
  },
};

/**
 * Layout composition examples
 */
export const WithInteractiveElements = {
  args: {
    title: 'interactive-demo',
    children: (
      <div className="p-6 space-y-6">
        <CommandTitle text="Interactive Demo" />

        <div className="space-y-4">
          <LabelValuePair label="Button Variants" value="Test all button styles" />
          <div className="flex gap-2 flex-wrap">
            <Button>Primary Action</Button>
            <Button variant="inline">Secondary</Button>
            <Button variant="flex">Flexible</Button>
            <Button icon={User} iconPosition="left">Icon Left</Button>
            <Button icon={ChevronRight} iconPosition="right">Icon Right</Button>
            <Button icon={Settings} variant="icon-only" />
          </div>
        </div>

        <div className="space-y-4">
          <LabelValuePair label="Form Elements" value="Basic input examples" />
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Sample input field"
              className="w-full px-3 py-2 bg-main border border-primary rounded text-text placeholder-secondary"
            />
            <textarea
              placeholder="Sample textarea"
              rows="3"
              className="w-full px-3 py-2 bg-main border border-primary rounded text-text placeholder-secondary"
            />
          </div>
        </div>

        <LabelValuePair label="Window Behavior" value="Respects theme and session context" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window containing various interactive elements and controls.',
      },
    },
  },
};

/**
 * Error states and edge cases
 */
export const MinimalContent = {
  args: {
    title: 'minimal',
    children: (
      <div className="p-6">
        <p className="text-secondary">Minimal content for testing layout bounds.</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window with minimal content to test layout boundaries.',
      },
    },
  },
};

export const LongTitle = {
  args: {
    title: 'very-long-title-that-might-wrap-or-truncate-depending-on-screen-size',
    children: (
      <div className="p-6">
        <CommandTitle text="How Title Handles Long Text" />
        <p className="text-secondary">
          Testing how the header handles very long titles. The title should be truncated
          gracefully without breaking the layout.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Window with a very long title to test truncation behavior.',
      },
    },
  },
};

/**
 * Real-world usage examples
 */
export const CaseDetailLayout = {
  args: {
    title: 'case-react-platform',
    fixedHeight: false,
    children: (
      <div className="p-6 space-y-6">
        <CommandTitle text="React E-Commerce Platform" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelValuePair label="Duration" value="8 months" />
          <LabelValuePair label="Team Size" value="12 developers" />
          <LabelValuePair label="Stack" value="React, Node.js, AWS" />
          <LabelValuePair label="Status" value="Completed 2024" />
        </div>

        <div className="space-y-4">
          <CommandTitle level="h3" text="Challenge" />
          <p className="text-secondary">
            Create a high-performance e-commerce platform that could handle 1M+ daily users
            with complex product relationships and real-time inventory management.
          </p>
        </div>

        <div className="space-y-4">
          <CommandTitle level="h3" text="Solution" />
          <p className="text-secondary">
            Implemented a microservices architecture with GraphQL APIs, Redis caching,
            and automated deployment pipelines. Focused on performance optimization
            and developer experience.
          </p>
        </div>

        <div className="border-t border-primary pt-4">
          <div className="flex gap-4">
            <Button variant="full">View Technical Details</Button>
            <Button variant="inline">View Live Site</Button>
          </div>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world case detail screen layout.',
      },
    },
  },
};
