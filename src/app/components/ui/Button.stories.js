// src/app/components/ui/Button.stories.js
import Button from './Button';
import { MockSessionProvider } from '../../../../test-utils/storybook-mocks.jsx';
import { Star, ChevronRight, User, Plus, X } from 'lucide-react';

/**
 * Button Story Configuration
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, success states, and icon support.',
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
    children: {
      control: 'text',
      description: 'Button text content',
    },
    onClick: {
      control: 'object',
      description: 'Click handler function',
    },
    icon: {
      control: 'object',
      description: 'Icon component to display',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to text',
    },
    variant: {
      control: { type: 'select' },
      options: ['full', 'flex', 'inline', 'icon-only'],
      description: 'Button width variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    showSuccessState: {
      control: 'boolean',
      description: 'Show success state after click',
    },
    successText: {
      control: 'text',
      description: 'Text to display in success state',
    },
    successDuration: {
      control: 'number',
      description: 'Duration of success state in milliseconds',
    },
  },
};

export default meta;

/**
 * Primary story - Default usage
 */
export const Default = {
  args: {
    children: 'Continue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default full-width button.',
      },
    },
  },
};

/**
 * Variant variations - Different widths and styles
 */
export const FullWidth = {
  args: {
    children: 'Save Changes',
    variant: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width button variant.',
      },
    },
  },
};

export const Flexible = {
  args: {
    children: 'Flexible Button',
    variant: 'flex',
  },
  parameters: {
    docs: {
      description: {
        story: 'Flexible width button in larger layout.',
      },
    },
  },
};

export const Inline = {
  args: {
    children: 'Cancel',
    variant: 'inline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Inline width button variant.',
      },
    },
  },
};

export const IconOnly = {
  args: {
    icon: Plus,
    variant: 'icon-only',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only button without text.',
      },
    },
  },
};

/**
 * Icon variations - Different icons and positions
 */
export const WithLeftIcon = {
  args: {
    children: 'Add Item',
    icon: Plus,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the left.',
      },
    },
  },
};

export const WithRightIcon = {
  args: {
    children: 'Go to Profile',
    icon: ChevronRight,
    iconPosition: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icon on the right.',
      },
    },
  },
};

export const DifferentIcons = {
  args: {
    children: 'User Profile',
    icon: User,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with user icon.',
      },
    },
  },
};

/**
 * State variations - Interactive states
 */
export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in disabled state.',
      },
    },
  },
};

export const DisabledWithIcon = {
  args: {
    children: 'Delete',
    icon: X,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button with icon.',
      },
    },
  },
};

export const ClickableWithIcon = {
  args: {
    children: 'Favorites',
    icon: Star,
    onClick: () => console.log('Button clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable button with icon and console logging.',
      },
    },
  },
};

/**
 * Success state variations
 */
export const WithSuccessState = {
  args: {
    children: 'Save Profile',
    showSuccessState: true,
    successText: 'Saved!',
    onClick: () => console.log('Profile saved'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with success state and custom success text.',
      },
    },
  },
};

export const SuccessWithIcon = {
  args: {
    icon: Star,
    children: 'Add Favorite',
    showSuccessState: true,
    successText: 'Added!',
    onClick: () => console.log('Added to favorites'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon button with success state.',
      },
    },
  },
};

export const LongSuccessDuration = {
  args: {
    children: 'Save with Long Feedback',
    showSuccessState: true,
    successText: 'Success! Changes saved.',
    successDuration: 5000,
    onClick: () => console.log('Saved with long success duration'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with extended success state duration.',
      },
    },
  },
};

/**
 * Real-world examples
 */
export const NavigationButton = {
  args: {
    children: 'Next Step',
    icon: ChevronRight,
    iconPosition: 'right',
    onClick: () => console.log('Navigate to next step'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation button with right-positioned chevron.',
      },
    },
  },
};

export const ActionButton = {
  args: {
    children: 'Create New',
    icon: Plus,
    variant: 'inline',
    onClick: () => console.log('Create new item'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Action button for creating new items.',
      },
    },
  },
};

export const ConfirmationButton = {
  args: {
    children: 'Confirm',
    showSuccessState: true,
    successText: 'Confirmed!',
    onClick: () => console.log('Confirmation completed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Confirmation button with success feedback.',
      },
    },
  },
};

/**
 * Complex button layout example
 */
export const ButtonGroup = () => (
  <div className="space-y-4 p-6 max-w-sm">
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Action Buttons</h3>

      <Button
        variant="full"
        showSuccessState
        successText="Saved!"
        onClick={() => console.log('Main action clicked')}
      >
        Save Changes
      </Button>

      <div className="flex gap-2">
        <Button
          variant="flex"
          onClick={() => console.log('Cancel clicked')}
        >
          Cancel
        </Button>

        <Button
          variant="flex"
          disabled
        >
          Archive
        </Button>
      </div>

      <Button
        icon={Plus}
        variant="icon-only"
        onClick={() => console.log('Add clicked')}
      />
    </div>

    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Icon Buttons</h3>
      <div className="flex gap-2">
        <Button
          icon={User}
          variant="icon-only"
          onClick={() => console.log('User clicked')}
        />
        <Button
          icon={Star}
          variant="icon-only"
          onClick={() => console.log('Star clicked')}
        />
        <Button
          icon={X}
          variant="icon-only"
          disabled
          onClick={() => console.log('Delete clicked')}
        />
      </div>
    </div>
  </div>
);

ButtonGroup.parameters = {
  docs: {
    description: {
      story: 'Complete button layout with different variants used together.',
    },
  },
};

/**
 * Text variations - Button content lengths
 */
export const ShortText = {
  args: {
    children: 'OK',
    onClick: () => console.log('OK clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with short text content.',
      },
    },
  },
};

export const LongText = {
  args: {
    children: 'Submit Application for Review',
    onClick: () => console.log('Long text button clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with long, descriptive text.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    children: 'Custom Styled Button',
    className: 'font-bold text-lg py-4',
    onClick: () => console.log('Custom styled button clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with custom CSS classes.',
      },
    },
  },
};

export const EmptyIconOnly = {
  args: {
    children: '',
    icon: null,
    variant: 'icon-only',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case: icon-only variant without icon.',
      },
    },
  },
};

export const SuccessWithoutText = {
  args: {
    children: 'Click for Success',
    showSuccessState: true,
    successText: '',
    onClick: () => console.log('Success without text'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state without success text.',
      },
    },
  },
};
