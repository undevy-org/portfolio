// src/app/components/molecules/ListItem.stories.js
import ListItem from './ListItem';
import { Star, ChevronRight, User, Clock } from 'lucide-react';

/**
 * ListItem Story Configuration
 */
const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible list item component with icon support and selectable states for navigation and content lists.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content of the list item',
    },
    icon: {
      control: 'object',
      description: 'Icon component to display (React element)',
    },
    onClick: {
      control: 'object',
      description: 'Click handler function',
    },
    primary: {
      control: 'boolean',
      description: 'Primary (selected/highlighted) state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
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
  args: {
    children: 'Default list item',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic list item with text content.',
      },
    },
  },
};

/**
 * State variations - Clickable, Primary, Disabled
 */
export const Clickable = {
  args: {
    children: 'Clickable item',
    onClick: () => console.log('Item clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with click functionality.',
      },
    },
  },
};

export const Primary = {
  args: {
    children: 'Active item',
    primary: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary/highlighted list item.',
      },
    },
  },
};

export const Disabled = {
  args: {
    children: 'Disabled item',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled list item.',
      },
    },
  },
};

/**
 * Icon variations - With different icons
 */
export const WithStarIcon = {
  args: {
    children: 'Favorites',
    icon: <Star size={16} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with star icon.',
      },
    },
  },
};

export const WithUserIcon = {
  args: {
    children: 'Profile',
    icon: <User size={16} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with user icon.',
      },
    },
  },
};

export const WithChevronIcon = {
  args: {
    children: 'Settings',
    icon: <ChevronRight size={16} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with navigation chevron.',
      },
    },
  },
};

/**
 * Navigation menu example
 */
export const NavigationMenu = () => (
  <div className="space-y-1 bg-background border border-secondary rounded p-2 max-w-xs">
    <ListItem primary>Home</ListItem>
    <ListItem icon={<User size={16} />}>Profile</ListItem>
    <ListItem icon={<Clock size={16} />}>History</ListItem>
    <ListItem icon={<Star size={16} />}>Favorites</ListItem>
    <ListItem disabled>Settings</ListItem>
  </div>
);

NavigationMenu.parameters = {
  docs: {
    description: {
      story: 'Navigation menu with mixed icon states and primary selection.',
    },
  },
};

/**
 * Content list example
 */
export const ContentList = () => (
  <div className="space-y-1 max-w-xs">
    <ListItem icon={<Star size={16} />} primary>
      Featured Article
    </ListItem>
    <ListItem>
      Technology Updates
    </ListItem>
    <ListItem>
      Product News
    </ListItem>
    <ListItem icon={<Clock size={16} />}>
      Recent Posts
    </ListItem>
  </div>
);

ContentList.parameters = {
  docs: {
    description: {
      story: 'Content list with icons and featured item.',
    },
  },
};

/**
 * Different text lengths
 */
export const ShortText = {
  args: {
    children: 'Item',
  },
  parameters: {
    docs: {
      description: {
        story: 'Very short text content.',
      },
    },
  },
};

export const LongText = {
  args: {
    children: 'Information and Support Services Available',
  },
  parameters: {
    docs: {
      description: {
        story: 'Longer text content that may need to wrap.',
      },
    },
  },
};

/**
 * Interactive combinations
 */
export const ClickableWithIcon = {
  args: {
    children: 'Notifications',
    icon: <Star size={16} />,
    onClick: () => console.log('Notifications clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Clickable list item with icon.',
      },
    },
  },
};

export const PrimaryClickable = {
  args: {
    children: 'Current Selection',
    primary: true,
    onClick: () => console.log('Selected item clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary state with click functionality.',
      },
    },
  },
};

export const DisabledWithIcon = {
  args: {
    children: 'Archived',
    icon: <Clock size={16} />,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled item with icon.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    children: 'Custom Styled',
    className: 'font-bold text-primary py-3',
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with custom styling.',
      },
    },
  },
};

export const EmptyContent = {
  args: {
    children: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with no text content.',
      },
    },
  },
};

export const OnlyIcon = {
  args: {
    children: '',
    icon: <Star size={16} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon-only list item (edge case).',
      },
    },
  },
};
