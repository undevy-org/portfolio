// src/app/components/organisms/NavigationPanel.js
'use client';

import { NavigationButton } from '../molecules';

export default function NavigationPanel({
  buttons = [], // Array of button configs
  layout = 'row', // 'row' | 'column'
  className = ''
}) {
  if (buttons.length === 0) {
    return null;
  }

  const layoutClasses = layout === 'row'
    ? 'flex flex-col md:flex-row gap-3'
    : 'flex flex-col gap-3';

  return (
    <div className={`${layoutClasses} ${className}`}>
      {buttons.map((button, index) => (
        <NavigationButton
          key={button.screen || index}
          screen={button.screen}
          label={button.label}
          icon={button.icon}
          onClick={button.onClick}
          logMessage={button.logMessage}
          className={button.className}
        />
      ))}
    </div>
  );
}
