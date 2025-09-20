// src/app/components/ui/ThemeSwitcher.stories.js
import ThemeSwitcher from './ThemeSwitcher';

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
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a dark theme context.',
      },
    },
  },
};

export const InLightTheme = {
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a light theme context.',
      },
    },
  },
};

export const InAmberTheme = {
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
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher placed in a header layout.',
      },
    },
  },
};

export const InSidebar = {
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher within a sidebar settings menu.',
      },
    },
  },
};

export const AsDropdown = {
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
  parameters: {
    docs: {
      description: {
        story: 'Theme switcher showing manual mode indication.',
      },
    },
  },
};
