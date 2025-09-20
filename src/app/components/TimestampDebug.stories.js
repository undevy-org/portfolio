import React from 'react';

const TailwindTestConfig = {
  title: 'Debug/TailwindTest',
  parameters: {
    layout: 'fullscreen',
  },
};

export default TailwindTestConfig;

const TailwindTestTemplate = () => (
  <div className="min-h-screen bg-black text-green-400 p-8 space-y-6">
    <h1 className="text-2xl font-mono text-primary mb-6">Tailwind CSS Test</h1>

    {/* Basic Tailwind Classes */}
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-command">Basic Classes</h2>
      <div className="bg-green-500 text-white p-4 rounded border-2 border-terminal">
        Green background with terminal border
      </div>
      <div className="text-purple-400 font-bold">
        Purple text (should be purple)
      </div>
    </div>

    {/* Theme Classes */}
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-command">Theme Classes</h2>
      <div className="bg-input text-primary p-4 border border-secondary rounded">
        Theme-aware background and text
      </div>
    </div>

    {/* Responsive Classes */}
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-command">Responsive Classes</h2>
      <div className="bg-blue-500 md:bg-red-500 p-4 text-white">
        Blue on mobile, red on desktop (check on different screen sizes)
      </div>
    </div>

    {/* Arbitrary Values (JIT) */}
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-command">Arbitrary Values (JIT Compiler)</h2>
      <div className="bg-purple-867 text-[#bada55] p-[37px] border-[3px] border-blue-500">
        Purple background with magenta text and 37px padding if JIT works!
      </div>
    </div>

    {/* Utility Classes */}
    <div className="space-y-4">
      <h2 className="text-lg font-mono text-command">Flexbox & Layout</h2>
      <div className="flex space-x-4">
        <div className="flex-1 bg-accent text-white p-4">Flex item 1</div>
        <div className="flex-1 bg-success text-black p-4">Flex item 2</div>
        <div className="flex-1 bg-error text-white p-4">Flex item 3</div>
      </div>
    </div>
  </div>
);

export const Default = TailwindTestTemplate.bind({});
Default.storyName = 'Tailwind CSS Test';

export const MinimalTest = () => (
  <div className="bg-black text-green-400 p-8">
    <h1>If this text is green on black, Tailwind is working!</h1>
  </div>
);
