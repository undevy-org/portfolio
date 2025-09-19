// src/app/components/ui/ThemeSwitcher.stories.js
import ThemeSwitcher from './ThemeSwitcher';
import { MockSessionProvider } from '../../../../test-utils/storybook-mocks.jsx';

/**
 * ThemeSwitcher Story Configuration
 */
const meta = {
  title: 'UI/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme switching component that allows users to cycle through different visual themes.',
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
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;

/**
 * Primary story - Default usage
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Default theme switcher component.',
      },
    },
  },
};

/**
 * Theme simulation stories - Mock different themes
 */
export const InDarkTheme = {
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{ theme: 'dark' }}>
        <div className="p-4 bg-slate-900 text-white">
          <p className="mb-2 text-sm">Current Theme: Dark</p>
          <Story />
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a dark theme context.',
      },
    },
  },
};

export const InLightTheme = {
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{ theme: 'light' }}>
        <div className="p-4 bg-white text-black border">
          <p className="mb-2 text-sm">Current Theme: Light</p>
          <Story />
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a light theme context.',
      },
    },
  },
};

export const InAmberTheme = {
  decorators: [
    (Story) => (
      <MockSessionProvider mockSession={{ theme: 'amber' }}>
        <div className="p-4 bg-amber-100 text-amber-900">
          <p className="mb-2 text-sm">Current Theme: Amber</p>
          <Story />
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within an amber theme context.',
      },
    },
  },
};

/**
 * Interactive behavior stories
 */
export const ClickableThemeSwitcher = {
  parameters: {
    docs: {
      description: {
        story: 'Clickable theme switcher that cycles through themes.',
      },
    },
  },
};

export const ThemeSwitcherWithCallback = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="space-y-2">
          <p className="text-sm">Click the button to cycle themes:</p>
          <Story />
          <p className="text-xs text-command">
            Check browser console for theme change logs
          </p>
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with visible feedback and console logging.',
      },
    },
  },
};

/**
 * Interface examples - Different placements
 */
export const InHeader = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="flex items-center justify-between p-4 bg-primary/10 border-b">
          <span className="font-semibold">Portfolio App</span>
          <Story />
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher placed in a header layout.',
      },
    },
  },
};

export const InSidebar = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="w-64 min-h-screen border-r bg-background p-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Settings</h3>
            <div className="space-y-2">
              <div>Theme Selection:</div>
              <Story />
            </div>
            <div className="pt-2 border-t text-sm text-secondary">
              <p>Current Theme</p>
              <p>Notifications</p>
              <p>Language</p>
            </div>
          </div>
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a sidebar settings menu.',
      },
    },
  },
};

export const AsDropdown = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 border rounded">
            <span>Settings</span>
            <span>▼</span>
          </button>
          <div className="absolute top-full mt-1 w-full p-2 bg-background border rounded shadow-lg">
            <div className="space-y-2">
              <span className="text-sm font-medium">Appearance</span>
              <Story />
            </div>
          </div>
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a dropdown menu.',
      },
    },
  },
};

/**
 * State visualizations
 */
export const ThemeStates = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <div className="p-3 border rounded bg-slate-900 text-white">
      <p className="text-xs mb-2">Dark Theme Context</p>
      <ThemeSwitcher />
    </div>

    <div className="p-3 border rounded bg-white text-black">
      <p className="text-xs mb-2">Light Theme Context</p>
      <ThemeSwitcher />
    </div>

    <div className="p-3 border rounded bg-amber-50 text-amber-800">
      <p className="text-xs mb-2">Amber Theme Context</p>
      <ThemeSwitcher />
    </div>
  </div>
);

ThemeStates.parameters = {
  docs: {
    description: {
      story: 'Visual demonstration of theme switcher in different theme contexts.',
    },
  },
};

/**
 * Accessibility examples
 */
export const WithLabel = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Theme:</label>
          <Story />
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with associated label for accessibility.',
      },
    },
  },
};

export const WithAriaLabel = {
  args: {
    'aria-label': 'Choose theme',
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with aria-label for screen readers.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    className: 'scale-110 border-2 border-primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with custom styling.',
      },
    },
  },
};

/**
 * Animation simulation
 */
export const FastScrolling = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="animate-pulse">
          <p className="text-xs mb-2">
            Simulating fast theme switching (animation):
          </p>
          <Story />
          <p className="text-xs mt-2 text-secondary">
            Click repeatedly to cycle through themes quickly
          </p>
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher with animation context for rapid cycling.',
      },
    },
  },
};

/**
 * User preference simulation
 */
export const ManualVsAutoIndication = {
  decorators: [
    (Story) => (
      <MockSessionProvider>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Theme Mode:</span>
            <span className="text-xs bg-primary/20 px-2 py-1 rounded">Manual</span>
          </div>
          <Story />
          <p className="text-xs text-secondary">
            Theme changes persist in localStorage
          </p>
        </div>
      </MockSessionProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher showing manual mode indication.',
      },
    },
  },
};
