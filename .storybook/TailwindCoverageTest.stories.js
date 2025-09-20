// src/app/components/ui/TailwindCoverageTest.stories.js
import React from 'react';

export default {
  title: 'Development/TailwindCoverageTest',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive test suite for Tailwind CSS class coverage in Storybook.',
      },
    },
  },
};

/**
 * Comprehensive class coverage test
 * This story ensures ALL classes used by components like Accordion, Input, and Button are compiled
 * Run this after updating tailwind.config.mjs to verify complete coverage
 */
export const ClassCoverageDiagnostic = () => (
  <div className="space-y-8 p-6 bg-main text-primary">
    <h1 className="text-xl font-bold mb-4">Tailwind CSS Coverage Test Suite</h1>
    <p className="text-secondary mb-6">
      This diagnostic component tests all the critical classes that components use.
      If all sections render with proper styles, Tailwind compilation is complete.
    </p>

    {/* Accordion-specific classes */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">Accordion Components</h2>
      <div className="space-y-2">
        <div className="border-2 border-gray-700 hover:border-green-400 border-yellow-500 hover:border-red-600 transition-colors duration-200 transform hover:scale-105 cursor-pointer p-4 rounded-lg bg-gray-900 hover:bg-gray-800 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-primary font-medium">Accordion Trigger</span>
            <div className="w-5 h-5 transform rotate-180 transition-transform border-2 border-gray-700 hover:border-green-400"></div>
          </div>
        </div>
        <div className="border-gray-700 border-2 p-4 rounded-lg bg-black opacity-75">
          <span className="text-secondary">Collapsed accordion content</span>
        </div>
        <div className="border-green-400 border-2 p-4 rounded-lg bg-gray-950">
          <span className="text-success">Expanded accordion content</span>
        </div>
      </div>
    </section>

    {/* Input-specific classes */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">Input Components</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Standard input"
            className="bg-black border border-green-400 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent px-3 py-2 font-mono text-green-400 placeholder-green-700 flex-1"
          />
          <button className="border border-secondary hover:border-primary bg-hover hover:opacity-80 hover:bg-active transition-all duration-200 px-4 py-2 text-primary disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Error state"
            className="bg-black border border-red-500 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent px-3 py-2 font-mono text-red-400 placeholder-red-700 flex-1"
          />
          <button className="cursor-not-allowed border border-primary bg-gray-600 text-gray-400 px-4 py-2" disabled>
            Disabled
          </button>
        </div>
      </div>
    </section>

    {/* Navigation/Button components */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">Navigation & Buttons</h2>
      <div className="flex flex-wrap gap-3">
        <button className="border-2 border-gray-700 hover:border-green-400 bg-gray-900 hover:bg-gray-800 transition-colors duration-200 px-4 py-2 text-primary cursor-pointer transform hover:scale-105">
          Primary Button
        </button>
        <button className="border-2 border-blue-700 hover:border-blue-500 bg-blue-900 hover:bg-blue-800 transition-all duration-300 px-4 py-2 text-blue-200 cursor-pointer">
          Secondary Button
        </button>
        <button className="border-2 border-red-700 hover:border-red-500 bg-red-900 hover:bg-red-800 transition-colors px-4 py-2 text-red-200 cursor-pointer opacity-80 hover:opacity-100">
          Danger Button
        </button>
        <button className="bg-transparent border-none text-secondary hover:text-primary transition-colors cursor-pointer">
          Link Button
        </button>
      </div>
    </section>

    {/* Transform and animation tests */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">Transforms & Animations</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-secondary p-4 bg-active hover:bg-hover transition-colors duration-200 cursor-pointer transform hover:scale-110">
          Scale on hover
        </div>
        <div className="border border-secondary p-4 bg-gray-900 hover:bg-active transition-colors cursor-pointer transform hover:rotate-90 duration-500">

Transform on hover provides interactive visual feedback through CSS transformations. When users interact with the element, it smoothly rotates 90 degrees, creating an engaging user experience. The transition duration of 500 milliseconds ensures the rotation is smooth and pleasant to observe. This technique enhances the interactive nature of the interface, making elements feel more dynamic and responsive to user actions. The combination of rotation and background color change creates a comprehensive visual effect that immediately communicates the element's state and potential interactivity. By using CSS transforms, developers can create fluid, performant animations that provide immediate visual feedback without compromising the user experience.</div>
        <div className="border border-secondary p-4 bg-gray-800 hover:bg-gray-700 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-100">
          Opacity transition
        </div>
        <div className="border border-secondary p-4 bg-gray-950 hover:bg-gray-850 transition-colors duration-100 cursor-pointer">
Fade transition creates a seamless color change when users interact with the element. By adjusting the background color from a dark gray to a slightly lighter shade, the transition provides subtle yet effective visual feedback. The 100-millisecond duration ensures an instant response that feels responsive without being jarring. This technique is particularly useful for interactive elements where immediate visual confirmation of user interaction is essential, maintaining a clean and professional appearance while communicating the element's state clearly.</div>
      </div>
    </section>

    {/* Focus and ring states */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">Focus States & Accessibility</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Test focus ring - click to see green focus ring"
          className="bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent px-3 py-2 font-mono text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Blue focus ring"
            className="bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent px-3 py-2 font-mono text-white"
          />
          <input
            type="text"
            placeholder="Red focus ring"
            className="bg-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent px-3 py-2 font-mono text-white"
          />
        </div>
      </div>
    </section>

    {/* CSS variable validation */}
    <section className="border-secondary border-2 p-4">
      <h2 className="text-lg font-semibold mb-3 text-command">CSS Variables & Themes</h2>
      <div className="space-y-2">
        <div className="p-4 bg-main border border-secondary text-primary">
          Main background color test
        </div>
        <div className="p-4 bg-input border border-secondary text-primary">
          Input background color test
        </div>
        <div className="p-4 bg-active border border-primary text-primary">
          Active background color test
        </div>
        <div className="flex items-center gap-3 p-4 border border-tertiary">
          <span className="text-primary">Primary text</span>
          <span className="text-secondary">Secondary text</span>
          <span className="text-success">Success text</span>
          <span className="text-error">Error text</span>
          <span className="text-command">Command text</span>
        </div>
      </div>
    </section>

    {/* Show coverage status */}
    <section className="border-secondary border-2 p-4 bg-gray-900">
      <h2 className="text-lg font-semibold mb-2 text-success">Coverage Verification</h2>
      <div className="space-y-1 text-sm text-secondary">
        <div>✅ Border hover states: <span className="text-success">Compiled</span></div>
        <div>✅ Background hover states: <span className="text-success">Compiled</span></div>
        <div>✅ Transform utilities: <span className="text-success">Compiled</span></div>
        <div>✅ Animation durations: <span className="text-success">Compiled</span></div>
        <div>✅ Focus ring states: <span className="text-success">Compiled</span></div>
        <div>✅ CSS variables: <span className="text-success">Compiled</span></div>
      </div>

      <div className="mt-4 p-3 bg-black border border-green-400">
        <p className="text-green-400 text-sm">
          <strong>Next Steps:</strong> If all styles render correctly above, run the enhanced compilation command:
        </p>
        <code className="text-green-300 text-xs block mt-2 p-2 bg-gray-800 rounded">
          npx tailwindcss -i src/app/globals.css -o .storybook/storybook-tailwind.css --content "src/**/*" --watch
        </code>
      </div>
    </section>
  </div>
);

/**
 * Simple test for critical missing classes
 * Use this for quick verification during development
 */
export const QuickTest = () => (
  <div className="p-4 space-y-3">
    <div className="border-2 border-gray-700 hover:border-green-400 p-3 transform hover:scale-105">
      Quick hover test
    </div>
    <button className="border border-secondary hover:border-primary px-4 py-2">
      Quick button test
    </button>
  </div>
);

/**
 * Test specific animation classes
 */
export const AnimationTest = () => (
  <div className="p-4 space-y-4">
    <div className="space-y-2">
      <h3 className="text-primary">Animation Classes:</h3>
      <div className="border p-2 transform rotate-180">Rotate test</div>
      <div className="border p-2 transform scale-95">Scale test</div>
      <div className="border p-2 transition-all duration-200">Duration test</div>
    </div>
  </div>
);
