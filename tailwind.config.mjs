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
        // Map CSS variables to Tailwind color names for hybrid approach
        'primary': 'var(--color-text-primary)',
        'background': 'var(--color-bg)',
        'surface': 'var(--color-input-bg)',
        'border': 'var(--color-border)',
        'border-darker': 'var(--color-border-darker)',
        'text': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'accent': 'var(--color-accent)',
        'error': 'var(--color-error)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-text-command)',
        'hover': 'var(--color-hover)',
        'active': 'var(--color-active)',
        'btn-bg': 'var(--color-btn-bg)',
        'btn-bg-hover': 'var(--color-btn-bg-hover)',

        // Keep some static colors for non-themed elements
        'gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        'green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16'
        },
        'red': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a'
        },
        'blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        'yellow': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        }
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
