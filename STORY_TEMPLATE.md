# Storybook Story Template Guide - Portfolio Project

*Updated: September 19, 2025*

## Overview

This guide establishes standardized conventions for creating Storybook stories across all component categories. It ensures consistency in file naming, folder organization, story structure, and documentation requirements.

## Folder Organization Structure

```
src/app/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.js
│   │   ├── Button.stories.js
│   │   ├── Button.mdx
│   │   └── Button.fixtures.js
│   └── Divider/
│       ├── Divider.js
│       ├── Divider.stories.js
│       ├── Divider.mdx
│       └── Divider.fixtures.js
├── molecules/
├── organisms/
├── ui/
├── layouts/
└── screens/
```

**Storybook stories will be created in the component's directory to maintain proximity to the component code for easier maintenance.**

## File Naming Conventions

### Primary Story Files
- **Location**: `{ComponentName}/{ComponentName}.stories.js`
- **Purpose**: Contains all story variants and configurations
- **Example**: `src/app/components/ui/Button/Button.stories.js`

### Supporting Files (Optional)
- **Documentation**: `{ComponentName}/{ComponentName}.mdx`
- **Mock Data**: `{ComponentName}/{ComponentName}.fixtures.js`
- **Test Data**: `{ComponentName}/{ComponentName}.spec.js`

### Story ID Conventions
- **Prefix**: Use component category (`atoms-`, `molecules-`, `organisms-`, `ui-`, etc.)
- **Format**: `{prefix}{ComponentName}`
- **Examples**:
  - `atoms/Button` → `atoms-button`
  - `molecules/NavigationButton` → `molecules-navigation-button`
  - `screens/Entry` → `screens-entry`

## Story File Template Structure

### Basic Story Template (React)

```javascript
// src/app/components/ui/Button/Button.stories.js
import { fn } from '@storybook/test';

// Import the component
import Button from '../Button';

// Import required providers/mocks
import { MockSessionProvider } from '../../../../test-utils/providers';

/**
 * Story Configuration Object
 */
export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered', // 'centered' | 'fullscreen' | 'padded'
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and states.',
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
    // Define argTypes for interactive controls
    variant: {
      control: { type: 'select' },
      options: ['full', 'flex', 'inline', 'icon-only'],
      description: 'Button width variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

// Story Variants

/**
 * Primary story - Default usage
 */
export const Default = {
  args: {
    children: 'Click Me',
    variant: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default button with standard styling.',
      },
    },
  },
};

/**
 * Interactive state stories
 */
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in disabled state.',
      },
    },
  },
};

/**
 * Variant stories
 */
export const PrimaryVariant = {
  args: {
    children: 'Primary Action',
    variant: 'full',
  },
};

export const SecondaryVariant = {
  args: {
    children: 'Secondary',
    variant: 'inline',
  },
};

/**
 * State-based stories
 */
export const WithIcon = {
  args: {
    children: 'With Icon',
    icon: 'CheckIcon', // Replace with actual icon
    iconPosition: 'left',
  },
};

/**
 * Edge case stories
 */
export const IconOnly = {
  args: {
    'aria-label': 'Save',
    icon: 'SaveIcon',
    variant: 'icon-only',
  },
};

/**
 * Functional stories
 */
export const LoadingState = {
  args: {
    children: 'Loading...',
    disabled: true,
  },
};

/**
 * Interaction test stories
 */
export const WithInteractions = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    // Use @storybook/test to simulate user interactions
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Expected result')).toBeInTheDocument();
  },
};
```

## Category-Specific Templates

### 📊 Category 1: Core UI Components Template

**Examples**: Button, Input, Label, Tag, CommandTitle

```javascript
// Core UI Template
export default {
  title: 'UI/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the atomic component.',
      },
    },
  },
  decorators: [
    // Minimal decorators for atomic components
    (Story) => <Story />,
  ],
  argTypes: {
    // Define all controllable props
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
};
```

### 🏗️ Category 2: Layout Components Template

**Examples**: Panel, NavigationButton, ResponsiveCardGrid, Templates

```javascript
// Layout Template with SessionContext
export default {
  title: 'UI/Molecules/NavigationButton',
  component: NavigationButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Navigation button component that integrates with routing.',
      },
    },
  },
  decorators: [
    // Required for layout components
    (Story) => (
      <MockSessionProvider>
        <Story />
      </MockSessionProvider>
    ),
  ],
};
```

### ⚡ Category 3: Feature Components Template

**Examples**: AnalyticsPanel, Web3Manager, ThemeManager

```javascript
// Feature Component Template with complex mocking
export default {
  title: 'Feature/Web3Manager',
  component: Web3Manager,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Web3 connection management component.',
      },
    },
  },
  decorators: [
    // Complex mocking for feature components
    (Story) => (
      <MockSessionProvider>
        <MockWeb3Provider>
          <Story />
        </MockWeb3Provider>
      </MockSessionProvider>
    ),
  ],
};
```

### 🖥️ Category 4: Screen Components Template

**Examples**: Entry, ProfileBoot, Contact, CaseDetail

```javascript
// Screen Component Template
export default {
  title: 'Screens/Entry',
  component: Entry,
  parameters: {
    layout: 'fullscreen', // Screens are typically full page
    docs: {
      description: {
        component: 'Authentication entry point with Web3 integration.',
      },
    },
    // Mock router and other dependencies
    mockData: {
      session: true,
      router: true,
      web3: 'mocked',
    },
  },
  decorators: [
    // Full mock ecosystem
    (Story) => (
      <MockSessionProvider>
        <MockRouterProvider>
          <MockWeb3Provider>
            <Story />
          </MockWeb3Provider>
        </MockRouterProvider>
      </MockSessionProvider>
    ),
  ],
};
```

## Story Recipe Patterns

### 1. Basic Component Story
```javascript
export const Default = {
  args: {
    // Required props
  },
};
```

### 2. Variant Stories
```javascript
export const Primary = { args: { variant: 'primary' } };
export const Secondary = { args: { variant: 'secondary' } };
export const Large = { args: { size: 'large' } };
```

### 3. State Stories
```javascript
export const Loading = {
  args: { loading: true },
  parameters: { docs: { description: 'Story exhibiting loading state.' } },
};
```

### 4. Complex Interaction Stories
```javascript
export const Form = {
  args: {
    // Complex props
  },
  play: async ({ canvasElement }) => {
    // Complex interaction tests
  },
};
```

## Documentation Standards

### Story Documentation Template

```javascript
export default {
  // ... basic config
  parameters: {
    docs: {
      description: {
        component: `
## Overview
Brief description of component purpose and usage.

## Purpose
Detailed explanation of when and why to use this component.

## Dependencies
- SessionContext: Required for navigation
- Web3: Only for Web3-related variants
- Router: For navigation components

## Usage Examples
\`\`\`javascript
<Component prop1="value" prop2={true} />
\`\`\`

## Variants
- **Default**: Standard usage
- **Disabled**: Non-interactive state
- **Loading**: Processing state
        `,
      },
    },
  },
};
```

### MDX Documentation (Advanced)

```mdx
{/* Button.mdx */}
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

The Button component provides a flexible interface for user actions.

## Usage

<Canvas of={ButtonStories.Default} />
<Canvas of={ButtonStories.Disabled} />
<Canvas of={ButtonStories.Variants} />

## Variants

- **Full Width**: `variant="full"`
- **Flexible**: `variant="flex"`
- **Inline**: `variant="inline"`

## Accessibility

All button variants support proper ARIA attributes and keyboard navigation.
```

## Mock Data and Fixtures

### Fixtures File Structure

```javascript
// Button.fixtures.js
export const buttonFixtures = {
  default: {
    children: 'Default Button',
    variant: 'full',
  },
  disabled: {
    children: 'Disabled Button',
    disabled: true,
  },
  withIcon: {
    children: 'Save',
    icon: 'SaveIcon',
  },
};
```

### Complex Mock Data for Screens

```javascript
// Entry.fixtures.js
export const entryFixtures = {
  noSession: {
    sessionData: null,
    web3Connected: false,
  },
  web3Authenticated: {
    sessionData: {
      isWeb3User: true,
      walletAddress: '0x742d35Cc6f37B8C8B0b2b5c7a8f2b1c2a3d4e5f6',
    },
    web3Connected: true,
  },
  traditionalAuth: {
    sessionData: {
      accessCode: 'ABC123',
      company: 'Test Company',
    },
  },
};
```

## Automation and Boilerplate Generation

### Story Generation Script (Future Enhancement)

```bash
#!/bin/bash
# generate-story.sh
COMPONENT=$1
TEMPLATE_PATH="templates/story-template.js"

if [[ ! -f "src/app/components/${COMPONENT}/_${COMPONENT}.js" ]]; then
  echo "Component file not found: src/app/components/${COMPONENT}/${COMPONENT}.js"
  exit 1
fi

cp "$TEMPLATE_PATH" "src/app/components/${COMPONENT}/${COMPONENT}.stories.js"
# Replace template placeholders
sed -i "s/{{COMPONENT}}/${COMPONENT}/g" "src/app/components/${COMPONENT}/${COMPONENT}.stories.js"
```

### Story Template Generator

```javascript
// story-generator.js
export function generateStoryTemplate(componentName, category, dependencies) {
  return `// ${componentName}.stories.js
import ${componentName} from './${componentName}';

// Import mocks based on dependencies
${generateDecoratorImports(dependencies)}

export default {
  title: '${getStoryTitle(category, componentName)}',
  component: ${componentName},
  parameters: {
    layout: '${getLayoutByCategory(category)}',
  },
  decorators: [
    ${generateDecorators(dependencies)}
  ],
  argTypes: ${generateArgTypes(componentName)},
};

// Stories
export const Default = {
  args: ${generateDefaultArgs(componentName)},
};
`;
}
```

## Testing and Quality Assurance

### Story Validation Checklist

- [ ] **Title Format**: Follows `{Category}/{ComponentName}` convention
- [ ] **Decorators**: Appropriate mocks for component dependencies
- [ ] **ArgTypes**: All controllable props defined
- [ ] **Stories**: Cover primary usage, variants, states, and edge cases
- [ ] **Documentation**: Component purpose and usage examples
- [ ] **Accessibility**: ARIA labels and keyboard navigation
- [ ] **Responsiveness**: Tested across different viewport sizes
- [ ] **Interactions**: Critical user flows tested with `@storybook/test`
- [ ] **Mock Data**: Realistic data for development and testing

### Automated Quality Checks

```javascript
// story-validation.js
export function validateStory(storyConfig) {
  const errors = [];

  if (!storyConfig.title?.includes('/')) {
    errors.push('Title must follow Category/Component format');
  }

  if (!storyConfig.decorators?.length && needsDecorators(storyConfig.component)) {
    errors.push('Missing required decorators');
  }

  return { isValid: errors.length === 0, errors };
}
```

## Category-Specific Requirements

### Web3 Components
- **Additional Decorators**: `MockWeb3Provider`, `MockReownAppKit`
- **Stories Required**: Connected, disconnected, loading states
- **Mock Complexity**: High - requires wallet simulation

### Session Components
- **Mock Provider**: `MockSessionProvider` always required
- **Stories Required**: Authenticated, anonymous, admin states
- **Session Data**: Realistic user profiles and session states

### Router Components
- **Mock Router**: `MockRouterProvider`
- **Stories Required**: Navigation states, route parameters
- **Mock Complexity**: Medium - path and search params simulation

### External API Components
- **Mock Services**: Custom mocks for each external dependency
- **Stories Required**: Success, error, loading response states
- **Mock Complexity**: High - network request simulation

## Implementation Timeline

### Phase 1: Foundation Setup (Week 1)
- [ ] Story folder structure
- [ ] Template files for each category
- [ ] Basic mocks (SessionContext)
- [ ] Story validation checklist

### Phase 2: Core Implementation (Week 2)
- [ ] P1 story creation (16 stories)
- [ ] Automated template generation
- [ ] Story validation pipeline
- [ ] Initial documentation

### Phase 3: Feature Expansion (Week 3-4)
- [ ] P2-P4 story implementation (32 stories)
- [ ] Advanced mock creation
- [ ] Cross-component integration stories
- [ ] Performance optimization

### Phase 4: Polish and Maintenance (Week 5)
- [ ] Story coverage reports
- [ ] Maintenance tools and scripts
- [ ] Team training and documentation
- [ ] Long-term maintenance strategy

---

*Generated by: Story Template System | Portfolio Project*
*Guide Version: 1.0 | Date: 2025-09-19*
