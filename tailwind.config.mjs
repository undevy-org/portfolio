/** @type {import('tailwindcss').Config} */
const config = {
  mode: 'jit', // Explicitly enable JIT mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx}',
    './.storybook/**/*.{js,jsx}',
    // Add explicit story file patterns to ensure JIT compiler scans them
    './src/**/*.stories.{js,jsx}',
    './.storybook/preview.{js,jsx}',
    // Include test files that might contain Tailwind classes
    './src/**/*.test.{js,jsx}',
    // Enhanced content scanning for comprehensive coverage
    './**/*.{stories,stories.js,stories.jsx}',
    './src/**/*',
  ],
  safelist: [
    // Border hover states - critical for interactive components like Accordion
    {
      pattern: /border-(gray|green|blue|red|yellow)-(400|500|600|700)/,
      variants: ['hover', 'focus', 'active'],
    },
    // Background hover states for buttons and panels
    {
      pattern: /bg-(gray|green|blue|red|yellow)-(800|900|950)/,
      variants: ['hover', 'active'],
    },
    // Transform and scale utilities for animations
    'scale-105',
    { pattern: /scale-(95|105|110)/ },
    'rotate-180',
    { pattern: /rotate-(90|180|270)/ },
    'duration-200',
    { pattern: /duration-(100|200|300)/ },

    // Specific patterns identified from component analysis
    'hover:border-green-400',
    'hover:bg-gray-800',
    'hover:border-primary',
    'bg-hover',
    'border-secondary',
    'border-primary',
    'border-tertiary',
    'transition-colors',
    'transition-transform',
    'transform',

    // Focus and ring states for accessible components
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-green-400',
    'focus:border-transparent',
    'focus:ring-2',
    'focus:ring-4',

    // Opacity states
    { pattern: /opacity-(0|40|50|60|75|80|100)/ },
    'hover:opacity-100',
    'hover:opacity-80',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',

    // Cursor states
    'cursor-pointer',
    'cursor-not-allowed',
    'cursor-default',

    // Display utilities
    'hidden',
    'block',
    'inline',
    'inline-block',
    'flex',
    'grid',
  ],
  theme: {
    extend: {
      colors: {
        // This section is intentionally left empty.
        // All theme colors are handled by CSS variables in globals.css.
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
      fontFamily: {
        mono: [
          'var(--font-mono)',
          'IBM Plex Mono',
          'monospace'
        ],
      },
      borderRadius: {
        'terminal': '4px',
      },
      animation: {
        'pulse-progress': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
