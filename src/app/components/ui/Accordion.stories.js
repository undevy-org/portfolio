// src/app/components/ui/Accordion.stories.js
import Accordion from './Accordion';
import { MockSessionProvider } from '../../../../test-utils/storybook-mocks.jsx';

/**
 * Accordion Story Configuration
 */
const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An expandable accordion component with support for text, lists, and tags within collapsible sections.',
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
    sections: {
      control: 'object',
      description: 'Array of section objects with id, title, and content',
    },
    defaultExpanded: {
      control: 'text',
      description: 'ID of the section to expand by default',
    },
  },
};

export default meta;

/**
 * Primary story - Basic text sections
 */
export const Default = {
  args: {
    sections: [
      {
        id: 'overview',
        title: 'Project Overview',
        content: [
          { type: 'text', value: 'This project demonstrates a comprehensive React component library with Storybook integration.' },
          { type: 'text', value: 'The portfolio includes various UI atoms, molecules, and organisms designed for terminal-style applications.' }
        ]
      },
      {
        id: 'technology',
        title: 'Technology Stack',
        content: [
          { type: 'text', value: 'Built with modern web technologies including React, Next.js, and Tailwind CSS.' },
          { type: 'text', value: 'Features include TypeScript support, responsive design, and accessibility compliance.' }
        ]
      },
      {
        id: 'features',
        title: 'Key Features',
        content: [
          { type: 'text', value: 'Comprehensive component library with 50+ reusable components.' },
          { type: 'text', value: 'Dark/light theme support with multiple color schemes.' },
          { type: 'text', value: 'Full accessibility support with ARIA labels and keyboard navigation.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion with text content in expandable sections.',
      },
    },
  },
};

/**
 * Mixed content types
 */
export const WithMixedContent = {
  args: {
    sections: [
      {
        id: 'project-details',
        title: 'Project Details',
        content: [
          { type: 'text', value: 'Comprehensive details about the current project implementation.' },
          { type: 'list_item', value: 'Phase 1: Foundation and setup' },
          { type: 'list_item', value: 'Phase 2: Component development' },
          { type: 'list_item', value: 'Phase 3: Documentation and testing' },
          { type: 'list_item', value: 'Phase 4: Deployment and maintenance' }
        ]
      },
      {
        id: 'tech-skills',
        title: 'Technology Skills',
        content: [
          { type: 'tag_list', value: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'] }
        ]
      },
      {
        id: 'team-info',
        title: 'Team Information',
        content: [
          { type: 'text', value: 'Information about the development team and contact details.' },
          { type: 'list_item', value: 'Lead Developer: Available' },
          { type: 'list_item', value: 'Project Manager: Available' },
          { type: 'list_item', value: 'Designer: Available' },
          { type: 'tag_list', value: ['Remote', 'Full-time', 'Contract'] }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with mixed content types: text, lists, and tags.',
      },
    },
  },
};

/**
 * State variations - Default expanded
 */
export const WithDefaultExpanded = {
  args: {
    defaultExpanded: 'getting-started',
    sections: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: [
          { type: 'text', value: 'This section is expanded by default to provide immediate access to important information.' },
          { type: 'list_item', value: 'Welcome to the platform' },
          { type: 'list_item', value: 'Complete profile setup' },
          { type: 'list_item', value: 'Start your first project' }
        ]
      },
      {
        id: 'advanced',
        title: 'Advanced Features',
        content: [
          { type: 'text', value: 'More advanced features and capabilities.' },
          { type: 'tag_list', value: ['Premium', 'Advanced', 'Enterprise'] }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with one section expanded by default.',
      },
    },
  },
};

/**
 * Section variations - Different numbers of sections
 */
export const TwoSections = {
  args: {
    sections: [
      {
        id: 'basics',
        title: 'Basic Information',
        content: [{ type: 'text', value: 'Essential information that users need to know first.' }]
      },
      {
        id: 'details',
        title: 'Detailed Information',
        content: [{ type: 'text', value: 'Extended details for users who want to learn more.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple accordion with only two sections.',
      },
    },
  },
};

export const MultipleSections = {
  args: {
    sections: [
      { id: 'intro', title: 'Introduction', content: [{ type: 'text', value: 'Welcome to our platform.' }] },
      { id: 'features', title: 'Features', content: [{ type: 'list_item', value: 'Feature 1' }, { type: 'list_item', value: 'Feature 2' }] },
      { id: 'pricing', title: 'Pricing', content: [{ type: 'text', value: 'Flexible pricing options available.' }] },
      { id: 'contact', title: 'Contact', content: [{ type: 'text', value: 'Get in touch with our team.' }] },
      { id: 'faq', title: 'FAQ', content: [{ type: 'text', value: 'Frequently asked questions.' }] },
      { id: 'support', title: 'Support', content: [{ type: 'text', value: '24/7 technical support available.' }] }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with multiple sections for comprehensive information.',
      },
    },
  },
};

/**
 * Real-world examples
 */
export const FAQAccordion = {
  args: {
    sections: [
      {
        id: 'getting-started-faq',
        title: 'How do I get started?',
        content: [
          { type: 'text', value: 'To get started with our platform, follow these simple steps:' },
          { type: 'list_item', value: 'Create an account' },
          { type: 'list_item', value: 'Verify your email address' },
          { type: 'list_item', value: 'Complete your profile' },
          { type: 'list_item', value: 'Start exploring the features' }
        ]
      },
      {
        id: 'billing-faq',
        title: 'What are the pricing plans?',
        content: [
          { type: 'text', value: 'We offer flexible pricing plans to suit different needs and budgets.' },
          { type: 'tag_list', value: ['Free', 'Pro', 'Enterprise', 'Custom'] },
          { type: 'text', value: 'All paid plans include premium features and priority support.' }
        ]
      },
      {
        id: 'support-faq',
        title: 'How can I get support?',
        content: [
          { type: 'text', value: 'Our support team is here to help you with any questions or issues.' },
          { type: 'list_item', value: 'Email support: support@example.com' },
          { type: 'list_item', value: 'Live chat: 24/7 availability' },
          { type: 'list_item', value: 'Knowledge base: Self-service articles' },
          { type: 'list_item', value: 'Phone support: Premium plans only' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'FAQ-style accordion for customer support and information.',
      },
    },
  },
};

export const ProductSpecification = {
  args: {
    sections: [
      {
        id: 'technical-specs',
        title: 'Technical Specifications',
        content: [
          { type: 'tag_list', value: ['CPU 4-core', 'RAM 8GB', 'SSD 256GB', 'WiFi 6', 'Bluetooth 5.2'] },
          { type: 'text', value: 'Performance specifications for optimal user experience.' }
        ]
      },
      {
        id: 'compatibility',
        title: 'System Requirements',
        content: [
          { type: 'text', value: 'Ensure your system meets these minimum requirements:' },
          { type: 'list_item', value: 'Operating System: macOS 12+, Windows 10+, Linux Ubuntu 18+' },
          { type: 'list_item', value: 'Browser: Chrome 90+, Firefox 88+, Safari 14+' },
          { type: 'list_item', value: 'Internet: Broadband connection recommended' }
        ]
      },
      {
        id: 'warranty',
        title: 'Warranty & Support',
        content: [
          { type: 'text', value: 'Comprehensive warranty and support information.' },
          { type: 'tag_list', value: ['2-year warranty', '24/7 support', 'Parts replacement', 'Software updates'] },
          { type: 'text', value: 'All products come with manufacturer warranty and technical support.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Product specification accordion for technical details and requirements.',
      },
    },
  },
};

/**
 * Content variations - Long and short content
 */
export const LongContent = {
  args: {
    sections: [
      {
        id: 'comprehensive',
        title: 'Comprehensive Documentation',
        content: [
          { type: 'text', value: 'This section contains extensive documentation that demonstrates how the accordion handles long-form content within each expandable section. This type of content might include detailed explanations, multiple list items, and various content types.' },
          { type: 'list_item', value: 'Installation instructions with multiple steps' },
          { type: 'list_item', value: 'Configuration options and settings' },
          { type: 'list_item', value: 'Troubleshooting guide and common issues' },
          { type: 'list_item', value: 'Best practices and optimization tips' },
          { type: 'list_item', value: 'Integration with third-party services' },
          { type: 'list_item', value: 'Security considerations and guidelines' },
          { type: 'tag_list', value: ['Documentation', 'Guide', 'Tutorial', 'Reference', 'How-to'] },
          { type: 'text', value: 'Additional information sections can be added as needed for more complex documentation structures. Each content type provides different visual presentation options within the accordion panels.' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with extensive content showing comprehensive information structure.',
      },
    },
  },
};

export const ShortContent = {
  args: {
    sections: [
      { id: 'a', title: 'Section A', content: [{ type: 'text', value: 'Brief content.' }] },
      { id: 'b', title: 'Section B', content: [{ type: 'tag_list', value: ['Tag1', 'Tag2'] }] },
      { id: 'c', title: 'Section C', content: [{ type: 'text', value: 'Another brief section.' }] },
      { id: 'd', title: 'Section D', content: [{ type: 'list_item', value: 'Single item' }] },
      { id: 'e', title: 'Section E', content: [{ type: 'text', value: 'Final brief section.' }] }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with multiple short sections for quick scanning.',
      },
    },
  },
};

/**
 * Interactive behavior demonstration
 */
export const InteractiveAccordion = {
  args: {
    sections: [
      {
        id: 'expand-logging',
        title: 'Expandable Section (Click to Expand/Collapse)',
        content: [
          { type: 'text', value: 'This accordion demonstrates interactive behavior. Click on any section header to expand or collapse it.' },
          { type: 'text', value: 'Notice the chevron icon that rotates when expanding/collapsing, and the console logs that track interaction events using SessionContext.' },
          { type: 'list_item', value: 'Only one section can be expanded at a time' },
          { type: 'list_item', value: 'Section expansion state is maintained' },
          { type: 'list_item', value: 'All interactions are logged for analytics' }
        ]
      },
      {
        id: 'another-interactive',
        title: 'Another Interactive Section',
        content: [
          { type: 'text', value: 'Different types of content can be embedded within expanded sections.' },
          { type: 'tag_list', value: ['Interactive', 'Expandable', 'Demo'] }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accordion expand/collapse interactions with logging.',
      },
    },
  },
};

/**
 * Content structure variations
 */
export const ListHeavy = {
  args: {
    sections: [
      {
        id: 'checklist',
        title: 'Implementation Checklist',
        content: [
          { type: 'list_item', value: 'Set up project structure' },
          { type: 'list_item', value: 'Install dependencies' },
          { type: 'list_item', value: 'Configure development environment' },
          { type: 'list_item', value: 'Create component stories' },
          { type: 'list_item', value: 'Test responsive behavior' },
          { type: 'list_item', value: 'Deploy to production' },
          { type: 'list_item', value: 'Monitor and maintain' },
          { type: 'list_item', value: 'Gather user feedback' },
          { type: 'list_item', value: 'Plan next iterations' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion focused on checklist-style content with many list items.',
      },
    },
  },
};

export const TagHeavy = {
  args: {
    sections: [
      {
        id: 'skill-categories',
        title: 'Skill Categories',
        content: [
          { type: 'tag_list', value: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS'] },
          { type: 'text', value: 'Frontend development skills' }
        ]
      },
      {
        id: 'technologies',
        title: 'Technologies',
        content: [
          { type: 'tag_list', value: ['Next.js', 'Vite', 'Webpack', 'Tailwind CSS', 'Styled Components', 'Emotion'] },
          { type: 'text', value: 'Frontend build tools and styling solutions' }
        ]
      },
      {
        id: 'backend-skills',
        title: 'Backend Skills',
        content: [
          { type: 'tag_list', value: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'API Design'] },
          { type: 'text', value: 'Server-side development technologies' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with multiple tag categories for categorization and filtering.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const EmptySections = {
  args: {
    sections: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case with empty sections array.',
      },
    },
  },
};

export const SingleSection = {
  args: {
    sections: [
      {
        id: 'single',
        title: 'Single Section',
        content: [{ type: 'text', value: 'This is the only section available in this accordion.' }]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with only a single section.',
      },
    },
  },
};

export const WithStringContent = {
  args: {
    sections: [
      {
        id: 'string-content',
        title: 'String Content',
        content: 'This section has plain string content instead of structured content types.'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with plain string content (backward compatibility).',
      },
    },
  },
};
