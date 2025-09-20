// src/app/components/atoms/Label.stories.js
import Label from './Label';

/**
 * Label Story Configuration
 */
const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A form label component that associates with form inputs and shows required field indicators.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Label text content',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form element',
    },
    required: {
      control: 'boolean',
      description: 'Shows required field asterisk',
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
    text: 'Email Address',
    htmlFor: 'email-input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default label with associated input field.',
      },
    },
  },
};

/**
 * State variations - Required field indicator
 */
export const Required = {
  args: {
    text: 'Name',
    htmlFor: 'name-input',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label showing required field asterisk.',
      },
    },
  },
};

export const Optional = {
  args: {
    text: 'Phone Number',
    htmlFor: 'phone-input',
    required: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label for optional field with explicit required=false.',
      },
    },
  },
};

/**
 * Content variations - Different label types
 */
export const LongText = {
  args: {
    text: 'Company Name or Organization Affiliation',
    htmlFor: 'company-input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label with longer descriptive text.',
      },
    },
  },
};

export const ShortText = {
  args: {
    text: 'ID',
    htmlFor: 'id-input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label with very short text.',
      },
    },
  },
};

/**
 * Context examples - Usage with form inputs
 */
export const WithInput = () => (
  <div className="space-y-4 p-4 max-w-sm">
    <div>
      <Label text="Username" htmlFor="username" required />
      <input
        id="username"
        type="text"
        className="w-full mt-1 px-3 py-2 border border-secondary rounded bg-background text-foreground"
        placeholder="Enter username"
      />
    </div>

    <div>
      <Label text="Email" htmlFor="email" />
      <input
        id="email"
        type="email"
        className="w-full mt-1 px-3 py-2 border border-secondary rounded bg-background text-foreground"
        placeholder="Enter email"
      />
    </div>

    <div>
      <Label text="Password" htmlFor="password" required />
      <input
        id="password"
        type="password"
        className="w-full mt-1 px-3 py-2 border border-secondary rounded bg-background text-foreground"
        placeholder="Enter password"
      />
    </div>
  </div>
);

WithInput.parameters = {
  docs: {
    description: {
      story: 'Label component used in context with form inputs.',
    },
  },
};

/**
 * Edge case stories
 */
export const WithoutIdAssociation = {
  args: {
    text: 'Standalone Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label without htmlFor association.',
      },
    },
  },
};

export const WithCustomClass = {
  args: {
    text: 'Custom Styled Label',
    htmlFor: 'custom-input',
    className: 'font-bold text-primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label with custom styling via className prop.',
      },
    },
  },
};

export const EmptyText = {
  args: {
    text: '',
    htmlFor: 'empty-input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with empty text content.',
      },
    },
  },
};
