// src/app/components/atoms/Tag.stories.js
import Tag from './Tag';

/**
 * Tag Story Configuration
 */
const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A categorization tag component with multiple visual variants and sizes for labeling content.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Tag text content (required)',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary'],
      description: 'Visual style variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Size variant - affects padding and text size when md',
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
    text: 'JavaScript',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default tag with standard styling.',
      },
    },
  },
};

/**
 * Variant stories - Different visual styles
 */
export const DefaultVariant = {
  args: {
    text: 'Technology',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant with full opacity.',
      },
    },
  },
};

export const SecondaryVariant = {
  args: {
    text: 'Technology',
    variant: 'secondary',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant with reduced opacity.',
      },
    },
  },
};

/**
 * Size variations
 */
export const SmallSize = {
  args: {
    text: 'Tag',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small size variant (default).',
      },
    },
  },
};

export const MediumSize = {
  args: {
    text: 'Medium Tag',
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium size variant with larger padding and text.',
      },
    },
  },
};

/**
 * Content variations - Different types of tags
 */
export const TechnologyTags = () => (
  <div className="flex flex-wrap gap-2">
    <Tag text="React" />
    <Tag text="JavaScript" variant="secondary" />
    <Tag text="TypeScript" />
    <Tag text="Node.js" variant="secondary" />
    <Tag text="CSS" />
  </div>
);

TechnologyTags.parameters = {
  docs: {
    description: {
      story: 'Technology stack tags in different variants.',
    },
  },
};

export const SkillTags = () => (
  <div className="flex flex-wrap gap-2">
    <Tag text="Frontend Developer" size="md" />
    <Tag text="JavaScript" size="md" />
    <Tag text="React" size="md" />
    <Tag text="CSS" size="md" variant="secondary" />
  </div>
);

SkillTags.parameters = {
  docs: {
    description: {
      story: 'Medium-sized skill tags.',
    },
  },
};

/**
 * Content edge cases
 */
export const LongText = {
  args: {
    text: 'Full Stack JavaScript Developer',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with long text content.',
      },
    },
  },
};

export const ShortText = {
  args: {
    text: 'JS',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with very short text content.',
      },
    },
  },
};

export const WithSpaces = {
  args: {
    text: 'New Feature',
    variant: 'default',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with text containing spaces.',
      },
    },
  },
};

/**
 * Edge case stories
 */
export const WithCustomClass = {
  args: {
    text: 'Custom',
    variant: 'default',
    size: 'sm',
    className: 'border-2 border-primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag with custom styling via className prop.',
      },
    },
  },
};

export const SecondaryMedium = {
  args: {
    text: 'Combo',
    variant: 'secondary',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Combinational variant - secondary with medium size.',
      },
    },
  },
};
