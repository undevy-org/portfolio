// test-utils/mocks.js
// Centralized mock data for consistent testing across the application

/**
 * Mock global data structure that mirrors the actual content.json structure
 * Based on the existing test patterns in session.test.js
 */
export const MOCK_GLOBAL_DATA = {
  menu: {
    items: [
      { id: 'home', label: 'Home', screen: 'MainHub' },
      { id: 'cases', label: 'Case Studies', screen: 'CaseList' },
      { id: 'contact', label: 'Contact', screen: 'Contact' }
    ]
  },
  profile: {
    summary: {
      title: 'Digital Product Designer',
      specialization: 'UI/UX & Frontend',
      background: 'Creating elegant digital solutions',
      location: 'San Francisco, CA',
      availability: 'Available for projects'
    }
  },
  experience: {
    default: [
      { 
        id: 1, 
        company: 'Tech Startup',
        role: 'Lead Designer',
        period: '2022 - Present',
        description: 'Leading design initiatives'
      }
    ],
    custom: [
      { 
        id: 2, 
        company: 'Design Agency',
        role: 'Senior Designer',
        period: '2020 - 2022',
        description: 'Client projects for Fortune 500'
      }
    ],
    'scenario-a': [
      {
        id: 3,
        company: 'Innovation Lab',
        role: 'Product Designer',
        period: '2021 - Present',
        description: 'Experimental projects'
      }
    ]
  },
  case_studies: {
    'case1': { 
      id: 'case1',
      title: 'E-commerce Platform Redesign',
      description: 'Complete overhaul of retail platform',
      category: 'Web Design',
      year: '2024',
      thumbnail: '/cases/case1-thumb.jpg',
      metrics: {
        conversion_increase: '34%',
        user_satisfaction: '92%'
      },
      technologies: ['React', 'Next.js', 'Tailwind CSS']
    },
    'case2': { 
      id: 'case2',
      title: 'Mobile Banking App',
      description: 'Next-gen banking experience',
      category: 'Mobile Design',
      year: '2024',
      thumbnail: '/cases/case2-thumb.jpg',
      metrics: {
        daily_active_users: '1.2M',
        app_store_rating: '4.8'
      },
      technologies: ['React Native', 'TypeScript']
    },
    'case3': { 
      id: 'case3',
      title: 'SaaS Dashboard',
      description: 'Analytics platform for enterprises',
      category: 'Product Design',
      year: '2023',
      thumbnail: '/cases/case3-thumb.jpg',
      metrics: {
        time_to_insight: '-60%',
        user_adoption: '87%'
      },
      technologies: ['Vue.js', 'D3.js']
    }
  },
  skills: [
    { name: 'UI Design', level: 95, category: 'design' },
    { name: 'React', level: 85, category: 'development' },
    { name: 'User Research', level: 90, category: 'research' }
  ],
  skill_details: {
    design: 'Creating beautiful and functional interfaces',
    development: 'Building interactive web applications',
    research: 'Understanding user needs and behaviors'
  },
  case_details: {
    // Detailed case study content would go here
  },
  side_projects: [
    {
      id: 'project1',
      title: 'Open Source UI Kit',
      description: 'Component library for developers',
      link: 'https://github.com/example/ui-kit'
    }
  ],
  public_speaking: [
    {
      id: 'talk1',
      title: 'Design Systems at Scale',
      event: 'Design Conference 2024',
      date: '2024-03-15'
    }
  ],
  contact: {
    email: 'contact@example.com',
    linkedin: 'https://linkedin.com/in/example',
    github: 'https://github.com/example'
  }
};

/**
 * Mock user profiles with different scenarios
 */
export const MOCK_USER_PROFILES = {
  standard: {
    id: 'user-001',
    name: 'Test User',
    meta: {
      timeline: 'custom',
      cases: ['case1', 'case3'],
      theme: 'dark'
    }
  },
  
  allCases: {
    id: 'user-002',
    name: 'Power User',
    meta: {
      timeline: 'default',
      cases: ['case1', 'case2', 'case3'],
      theme: 'light'
    }
  },
  
  noCases: {
    id: 'user-003',
    name: 'New User',
    meta: {
      timeline: 'default',
      cases: [],
      theme: 'dark'
    }
  },
  
  invalidRefs: {
    id: 'user-004',
    name: 'Invalid User',
    meta: {
      timeline: 'non-existent-timeline',
      cases: ['non-existent-case'],
      theme: 'dark'
    }
  },
  
  scenarioA: {
    id: 'user-005',
    name: 'Scenario A User',
    meta: {
      timeline: 'scenario-a',
      cases: ['case1', 'case2'],
      theme: 'dark'
    }
  }
};

/**
 * Pre-merged session data for component testing
 * This matches what components would receive after mergeSessionData
 */
export const MOCK_SESSION_DATA = {
  profile: {
    ...MOCK_GLOBAL_DATA.profile,
    ...MOCK_USER_PROFILES.standard,
    summary: MOCK_GLOBAL_DATA.profile.summary
  },
  case_studies: {
    'case1': MOCK_GLOBAL_DATA.case_studies.case1,
    'case3': MOCK_GLOBAL_DATA.case_studies.case3
  },
  experience: MOCK_GLOBAL_DATA.experience.custom,
  skills: MOCK_GLOBAL_DATA.skills,
  total_case_count: 3,
  isAuthenticated: true,
  authMethod: 'code',
  currentScreen: 'MainHub'
};

/**
 * Mock Web3 session data
 */
export const MOCK_WEB3_SESSION = {
  ...MOCK_SESSION_DATA,
  isWeb3User: true,
  authMethod: 'web3',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7',
  ensName: 'testuser.eth',
  chainId: 1
};

/**
 * Mock system logs for testing log functionality
 */
export const MOCK_SYSTEM_LOGS = [
  { 
    timestamp: Date.now() - 5000, 
    message: 'SESSION STARTED', 
    type: 'info' 
  },
  { 
    timestamp: Date.now() - 4000, 
    message: 'SCREEN: MainHub', 
    type: 'navigation' 
  },
  { 
    timestamp: Date.now() - 3000, 
    message: 'SECTION EXPANDED: Skills', 
    type: 'interaction' 
  },
  { 
    timestamp: Date.now() - 2000, 
    message: 'SCREEN: CaseList', 
    type: 'navigation' 
  },
  { 
    timestamp: Date.now() - 1000, 
    message: 'CASE SELECTED: case1', 
    type: 'interaction' 
  }
];

/**
 * Mock navigation stack for testing navigation context
 */
export const MOCK_NAVIGATION_STACK = [
  { screen: 'MainHub', timestamp: Date.now() - 60000 },
  { screen: 'CaseList', timestamp: Date.now() - 30000 },
  { screen: 'CaseDetail', timestamp: Date.now() }
];

/**
 * Helper to create custom mock data with deep merging
 */
export function createMockData(base, overrides) {
  // Simple deep merge implementation
  const merge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = merge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };
  
  const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };
  
  return merge(base, overrides);
}

/**
 * Enhanced test scenarios for different application states
 */
export const TEST_SCENARIOS = {
  // Authentication scenarios
  auth: {
    unauthenticated: {
      sessionData: null,
      isAuthenticated: false,
      currentScreen: 'Entry',
      authError: null
    },
    authenticated: {
      sessionData: MOCK_SESSION_DATA,
      isAuthenticated: true,
      currentScreen: 'MainHub',
      authError: null
    },
    authError: {
      sessionData: null,
      isAuthenticated: false,
      currentScreen: 'Entry',
      authError: 'Invalid access code'
    },
    web3Authenticated: {
      sessionData: MOCK_WEB3_SESSION,
      isAuthenticated: true,
      currentScreen: 'MainHub',
      authMethod: 'web3'
    }
  },

  // Navigation scenarios
  navigation: {
    atMainHub: {
      currentScreen: 'MainHub',
      navigationHistory: [],
      screensVisitedCount: 1
    },
    deepNavigation: {
      currentScreen: 'CaseDetail',
      navigationHistory: ['MainHub', 'CaseList'],
      screensVisitedCount: 3
    },
    backFromDetail: {
      currentScreen: 'CaseList',
      navigationHistory: ['MainHub'],
      screensVisitedCount: 4
    }
  },

  // Theme scenarios
  themes: {
    dark: { theme: 'dark' },
    light: { theme: 'light' },
    amber: { theme: 'amber' },
    bsod: { theme: 'bsod' },
    terminal: { theme: 'terminal' }
  },

  // Data loading scenarios
  dataStates: {
    loading: {
      sessionData: null,
      domainConfigLoading: true,
      isAuthenticated: false
    },
    loaded: {
      sessionData: MOCK_SESSION_DATA,
      domainConfigLoading: false,
      isAuthenticated: true
    },
    error: {
      sessionData: null,
      domainConfigLoading: false,
      isAuthenticated: false,
      authError: 'Failed to load configuration'
    }
  }
};

/**
 * Mock API responses for testing
 */
export const MOCK_API_RESPONSES = {
  session: {
    success: {
      ok: true,
      json: () => Promise.resolve(MOCK_SESSION_DATA)
    },
    failure: {
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'Unauthorized' })
    },
    networkError: () => Promise.reject(new Error('Network error'))
  },

  config: {
    success: {
      ok: true,
      json: () => Promise.resolve({
        domain: 'test.com',
        terminalTitle: 'Test Portfolio',
        brandName: 'Test Brand'
      })
    },
    failure: {
      ok: false,
      status: 404
    }
  }
};

/**
 * Accessibility testing helpers
 */
export const A11Y_TEST_DATA = {
  screenReaderTexts: {
    button: 'Click to activate',
    link: 'Navigate to page',
    heading: 'Section heading',
    list: 'List of items',
    navigation: 'Main navigation'
  },

  keyboardEvents: {
    enter: { key: 'Enter', code: 'Enter', keyCode: 13 },
    space: { key: ' ', code: 'Space', keyCode: 32 },
    escape: { key: 'Escape', code: 'Escape', keyCode: 27 },
    tab: { key: 'Tab', code: 'Tab', keyCode: 9 },
    arrowDown: { key: 'ArrowDown', code: 'ArrowDown', keyCode: 40 },
    arrowUp: { key: 'ArrowUp', code: 'ArrowUp', keyCode: 38 }
  },

  ariaAttributes: {
    expanded: { 'aria-expanded': 'true' },
    collapsed: { 'aria-expanded': 'false' },
    selected: { 'aria-selected': 'true' },
    pressed: { 'aria-pressed': 'true' },
    hidden: { 'aria-hidden': 'true' },
    live: { 'aria-live': 'polite' }
  }
};

/**
 * Performance testing data
 */
export const PERFORMANCE_TEST_DATA = {
  largeDatasets: {
    manyItems: Array.from({ length: 1000 }, (_, i) => ({
      id: `item-${i}`,
      title: `Test Item ${i}`,
      description: `Description for item ${i}`,
      timestamp: Date.now() - i * 1000
    })),

    deepNesting: {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                data: 'deeply nested data'
              }
            }
          }
        }
      }
    }
  },

  longStrings: {
    veryLong: 'a'.repeat(10000),
    withNewlines: Array.from({ length: 100 }, (_, i) => `Line ${i}`).join('\n'),
    withSpecialChars: '!@#$%^&*()[]{}|;:,.<>?`~'
  }
};