'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronRight } from 'lucide-react';
import { CommandTitle } from '../components/atoms';
import { Panel } from '../components/molecules';

export default function MainHub() {
  const { sessionData, theme, navigate, addLog } = useSession();

  const menuItems = sessionData?.menu || [];

  const handleMenuSelect = (item) => {
    addLog(`MENU SELECT: ${item.label}`);
    navigate(item.screen);
  };

  return (
    <ScreenWrapper>
      <div className="space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.screen}
            onClick={() => handleMenuSelect(item)}
            className="w-full text-left transition-colors"
          >
            <Panel className="bg-hover hover:border-primary cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-base text-command">
                  {item.icon}
                </span>

                <div className="flex-1">
                  <CommandTitle text={item.label} level="h3" className="text-base" />
                  <div className="text-xs mt-1 text-secondary">
                    {item.desc}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-secondary" />
              </div>
            </Panel>
          </button>
        ))}
      </div>
    </ScreenWrapper>
  );
}
