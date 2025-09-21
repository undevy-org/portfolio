// src/app/components/atoms/Input.stories.js
import Input from './Input';

/**
 * Input Story Configuration
 */
const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form input component with built-in error state support and multiple input types.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type attribute',
    },
    error: {
      control: 'boolean',
      description: 'Error state that styles the input with error colors',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Input value',
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
    type: 'text',
    placeholder: 'Enter text here',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default text input with placeholder.',
      },
    },
  },
};

/**
 * Type variations - Different input types
 */
export const TextInput = {
  args: {
    type: 'text',
    placeholder: 'Enter your name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard text input.',
      },
    },
  },
};

export const EmailInput = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input with email validation.',
      },
    },
  },
};

export const PasswordInput = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input with hidden text.',
      },
    },
  },
};

export const SearchInput = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input with search icon support.',
      },
    },
  },
};

/**
 * State stories - Error and disabled states
 */
export const WithError = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
    error: true,
    value: 'invalid-email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input in error state with red styling.',
      },
    },
  },
};

export const Disabled = {
  args: {
    type: 'text',
    placeholder: 'Disabled input',
    disabled: true,
    value: 'This input is disabled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input that cannot be interacted with.',
      },
    },
  },
};

/**
 * Content variations
 */
export const WithValue = {
  args: {
    type: 'text',
    value: 'Pre-filled value',
    placeholder: 'Enter text here',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with pre-filled value.',
      },
    },
  },
};

export const LongPlaceholder = {
  args: {
    type: 'text',
    placeholder: 'Please enter your full name including middle initial',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with long, descriptive placeholder text.',
      },
    },
  },
};

/**
 * Form context examples
 */
export const LoginForm = () => (
  <div className="space-y-4 p-6 max-w-sm bg-background border border-secondary rounded">
    <div>
      <label className="block text-sm font-medium mb-1">Username</label>
      <Input type="text" placeholder="Enter username" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Password</label>
      <Input type="password" placeholder="Enter password" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <Input type="email" placeholder="Enter email" />
    </div>

    <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded">
      Login
    </button>
  </div>
);

LoginForm.parameters = {
  docs: {
    description: {
      story: 'Input components used in a complete login form.',
    },
  },
};

export const ContactForm = () => (
  <div className="space-y-4 p-6 max-w-sm bg-background border border-secondary rounded">
    <div>
      <label className="block text-sm font-medium mb-1">Name</label>
      <Input type="text" placeholder="Your full name" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Email</label>
      <Input type="email" placeholder="your.email@example.com" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Phone</label>
      <Input type="tel" placeholder="+1 (555) 123-4567" />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Website</label>
      <Input type="url" placeholder="https://your-site.com" />
    </div>

    <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded">
      Submit
    </button>
  </div>
);

ContactForm.parameters = {
  docs: {
    description: {
      story: 'Input components used in a contact form with different types.',
    },
  },
};

/**
 * Error state variations
 */
export const EmailWithError = {
  args: {
    type: 'email',
    placeholder: 'invalid.email.com',
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input with error styling.',
      },
    },
  },
};

export const PasswordWithError = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    error: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Password input with error styling.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const NumberInput = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
    value: '42',
  },
  parameters: {
    docs: {
      description: {
        story: 'Number input type.',
      },
    },
  },
};

export const UrlInput = {
  args: {
    type: 'url',
    placeholder: 'https://example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'URL input type for web addresses.',
      },
    },
  },
};

export const WithMaxLength = {
  args: {
    type: 'text',
    placeholder: 'Max 10 characters',
    maxLength: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with character length limitation.',
      },
    },
  },
};

export const WithCustomClass = {
  args: {
    type: 'text',
    placeholder: 'Custom styled input',
    className: 'text-lg font-bold px-4 py-3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with custom styling via className prop.',
      },
    },
  },
};
