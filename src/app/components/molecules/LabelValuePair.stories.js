// src/app/components/molecules/LabelValuePair.stories.js
import LabelValuePair from './LabelValuePair';

/**
 * LabelValuePair Story Configuration
 */
const meta = {
  title: 'Molecules/LabelValuePair',
  component: LabelValuePair,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A key-value display pattern component with responsive layout support for presenting labeled information.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text (the key)',
    },
    value: {
      control: 'text',
      description: 'Value text (the data)',
    },
    responsive: {
      control: 'boolean',
      description: 'Enables responsive layout that stacks on mobile',
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
    label: 'Name',
    value: 'John Doe',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic label-value pair with default layout.',
      },
    },
  },
};

/**
 * Layout variations - Standard vs Responsive
 */
export const StandardLayout = {
  args: {
    label: 'Status',
    value: 'Active',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard 2-column layout.',
      },
    },
  },
};

export const ResponsiveLayout = {
  args: {
    label: 'Last Login',
    value: '2025-01-15 14:30:25',
    responsive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Responsive layout that stacks label above value on mobile.',
      },
    },
  },
};

/**
 * Content examples - Real-world usage patterns
 */
export const UserProfile = () => (
  <div className="space-y-2 max-w-sm">
    <LabelValuePair label="Full Name" value="Sarah Johnson" />
    <LabelValuePair label="Email" value="sarah.johnson@example.com" />
    <LabelValuePair label="Role" value="Senior Developer" />
    <LabelValuePair label="Location" value="San Francisco, CA" />
    <LabelValuePair label="Department" value="Engineering" />
  </div>
);

UserProfile.parameters = {
  docs: {
    description: {
      story: 'User profile information displayed as label-value pairs.',
    },
  },
};

export const SystemInformation = () => (
  <div className="space-y-2 max-w-sm">
    <LabelValuePair label="OS" value="macOS 14.2.1" />
    <LabelValuePair label="Node.js" value="v20.10.0" />
    <LabelValuePair label="Memory" value="16 GB" />
    <LabelValuePair label="Storage" value="512 GB SSD" />
    <LabelValuePair label="Uptime" value="127 days" />
  </div>
);

SystemInformation.parameters = {
  docs: {
    description: {
      story: 'System information displayed in a structured format.',
    },
  },
};

/**
 * Content variations - Different lengths and formats
 */
export const ShortLabel = {
  args: {
    label: 'ID',
    value: '12345',
  },
  parameters: {
    docs: {
      description: {
        story: 'Very short label with short value.',
      },
    },
  },
};

export const LongValue = {
  args: {
    label: 'Description',
    value: 'This is a very long description that should span multiple lines or wrap appropriately',
  },
  parameters: {
    docs: {
      description: {
        story: 'Long value text that may need to wrap.',
      },
    },
  },
};

export const LongLabel = {
  args: {
    label: 'Primary Contact Email Address',
    value: 'contact@company.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Very long label text.',
      },
    },
  },
};

/**
 * Mobile-specific stories - Demonstrating responsive behavior
 */
export const MobileStack = {
  args: {
    label: 'Phone Number',
    value: '+1 (555) 123-4567',
    responsive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label-value pair that will stack on mobile devices.',
      },
    },
  },
};

export const ResponsiveUserInfo = () => (
  <div className="space-y-1 max-w-xs">
    <LabelValuePair label="First Name" value="Alex" responsive />
    <LabelValuePair label="Last Name" value="Thompson" responsive />
    <LabelValuePair label="Job Title" value="UX Designer" responsive />
    <LabelValuePair label="Company Size" value="50-200 employees" responsive />
  </div>
);

ResponsiveUserInfo.parameters = {
  docs: {
    description: {
      description: 'Multiple label-value pairs in responsive mode for mobile-friendly display.',
    },
  },
};

/**
 * Technical data examples
 */
export const APIEndpoint = {
  args: {
    label: 'Endpoint',
    value: '/api/v2/users/profile',
  },
  parameters: {
    docs: {
      description: {
        story: 'API endpoint information.',
      },
    },
  },
};

export const DatabaseInfo = () => (
  <div className="space-y-2 font-mono">
    <LabelValuePair label="Host" value="db.prod.company.com" />
    <LabelValuePair label="Port" value="5432" />
    <LabelValuePair label="Database" value="analytics_db" />
    <LabelValuePair label="Prepared Statements" value="enabled" />
  </div>
);

DatabaseInfo.parameters = {
  docs: {
    description: {
      story: 'Database configuration details in monospaced font.',
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    label: 'Custom Styled',
    value: 'Styled Value',
    className: 'font-bold text-primary text-base',
  },
  parameters: {
    docs: {
      description: {
        story: 'Label-value pair with custom styling.',
      },
    },
  },
};

export const EmptyValue = {
  args: {
    label: 'Optional Field',
    value: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with empty value.',
      },
    },
  },
};

export const VeryLongContent = () => (
  <div className="max-w-sm">
    <LabelValuePair
      label="Configuration File Path"
      value="/Users/username/projects/portfolio-app/config/environment/production/settings.json"
      responsive
    />
    <LabelValuePair
      label="Last Modified"
      value="2025-01-20T09:15:30.123Z"
      responsive
    />
  </div>
);

VeryLongContent.parameters = {
  docs: {
    description: {
      story: 'Very long file path and timestamp values.',
    },
  },
};
