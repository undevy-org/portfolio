'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';

export default function MainHub() {
  const { sessionData, theme, navigate, addLog } = useSession();

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
            className="w-full text-left transition-colors flex items-center gap-4 p-4 rounded border border-secondary bg-hover"
          >
            <span className="text-base text-command">
              {item.icon}
            </span>
            
            <div className="flex-1">
              <div className="text-base text-primary">
                {item.label}
              </div>
              <div className="text-xs mt-1 text-secondary">
                {item.desc}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
}