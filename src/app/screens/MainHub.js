'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';

export default function MainHub() {
  const { sessionData, theme, navigate, addLog } = useSession();

  const buttonPanelClasses = `p-4 rounded border ${
    theme === 'dark' 
      ? 'border-dark-border-darker hover:bg-dark-hover' 
      : 'border-light-border-lighter hover:bg-light-hover'
  }`;
  const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  const labelClasses = `${
    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
  }`;
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;

  const menuItems = sessionData?.menu || [];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => {
              addLog(`MENU SELECT: ${item.label}`);
              navigate(item.screen);
            }}
            className={`w-full text-left transition-colors flex items-center gap-4 ${buttonPanelClasses}`}
          >
            <span className={`text-base ${yellowClasses}`}>
              {item.icon}
            </span>
            
            <div className="flex-1">
              <div className={`text-base ${labelClasses}`}>
                {item.label}
              </div>
              <div className={`text-xs mt-1 ${valueClasses}`}>
                {item.desc}
              </div>
            </div>
            
            <ChevronRight className={`w-5 h-5 ${valueClasses}`} />
          </button>
        ))}
      </div>
    </div>
  );
}