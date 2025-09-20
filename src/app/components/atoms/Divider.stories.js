// src/app/components/atoms/Divider.stories.js
import Divider from './Divider';

/**
 * Divider Story Configuration
 */
const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A visual separator component used to divide content sections. Provides solid and dashed variants with configurable spacing.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed'],
      description: 'Visual style of the divider line',
    },
    spacing: {
      control: 'text',
      description: 'Tailwind CSS spacing classes for margin (e.g., "my-2", "mx-4")',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
  },
};

export default meta;

/**
 * Primary story - Default usage
 */
export const Default = {
  args: {
    variant: 'solid',
    spacing: 'my-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default solid divider with standard spacing.',
      },
    },
  },
};

/**
 * Variant stories - Different line styles
 */
export const Solid = {
  args: {
    variant: 'solid',
    spacing: 'my-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid divider variant (default).',
      },
    },
  },
};

export const Dashed = {
  args: {
    variant: 'dashed',
    spacing: 'my-2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashed divider variant for subtle separation.',
      },
    },
  },
};

/**
 * Variation stories - Different spacing configurations
 */
export const TightSpacing = {
  args: {
    variant: 'solid',
    spacing: 'my-1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider with tight vertical spacing.',
      },
    },
  },
};

export const WideSpacing = {
  args: {
    variant: 'solid',
    spacing: 'my-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider with wide vertical spacing for major sections.',
      },
    },
  },
};

export const HorizontalSpacing = {
  args: {
    variant: 'solid',
    spacing: 'mx-4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider with horizontal margin for inline use.',
      },
    },
  },
};

/**
 * Context examples - Usage within layouts
 */
export const InContentArea = () => (
  <div className="space-y-4 p-4 bg-background">
    <div className="text-foreground">Section One</div>
    <Divider variant="solid" spacing="my-2" />
    <div className="text-foreground">Section Two</div>
    <Divider variant="dashed" spacing="my-2" />
    <div className="text-foreground">Section Three</div>
  </div>
);

InContentArea.parameters = {
  docs: {
    description: {
      story: 'Divider in realistic content context showing multiple sections.',
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    variant: 'solid',
    spacing: 'my-2',
    className: 'border-primary opacity-50',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider with custom styling via className prop.',
      },
    },
  },
};

export const NoSpacing = {
  args: {
    variant: 'solid',
    spacing: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider without default spacing for manual control.',
      },
    },
  },
};
