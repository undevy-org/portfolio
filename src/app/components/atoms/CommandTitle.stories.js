// src/app/components/atoms/CommandTitle.stories.js
import CommandTitle from './CommandTitle';

/**
 * CommandTitle Story Configuration
 */
export default {
  title: 'Atoms/CommandTitle',
  component: CommandTitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A command-line style title component that displays text with a $ prefix. Used for terminal-style headers throughout the application.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display (automatically prefixed with $)',
    },
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Heading level for semantic HTML',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

/**
 * Primary story - Default usage
 */
export const Default = {
  args: {
    text: 'terminal',
    level: 'h3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default CommandTitle with standard styling.',
      },
    },
  },
};

/**
 * Variant stories - Different heading levels
 */
export const H1 = {
  args: {
    text: 'main-title',
    level: 'h1',
  },
  parameters: {
    docs: {
      description: {
        story: 'CommandTitle rendered as H1 heading.',
      },
    },
  },
};

export const H2 = {
  args: {
    text: 'section-title',
    level: 'h2',
  },
};

export const H4 = {
  args: {
    text: 'subsection-title',
    level: 'h4',
  },
};

/**
 * Custom styling story
 */
export const WithCustomClass = {
  args: {
    text: 'custom-styled',
    level: 'h3',
    className: 'text-green-400',
  },
  parameters: {
    docs: {
      description: {
        story: 'CommandTitle with custom CSS classes applied.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const AlreadyHasDollarPrefix = {
  args: {
    text: '$prefixed-title',
    level: 'h3',
  },
  parameters: {
    docs: {
      description: {
        story: 'CommandTitle handles text that already has a $ prefix.',
      },
    },
  },
};

/**
 * Long text story
 */
export const LongText = {
  args: {
    text: 'very-long-command-title-that-might-wrap',
    level: 'h3',
  },
  parameters: {
    docs: {
      description: {
        story: 'CommandTitle with long text content.',
      },
    },
  },
};
