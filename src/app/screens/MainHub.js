'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ChevronRight } from 'lucide-react';
import { CommandTitle } from '../components/atoms';
import { ResponsiveCardGrid } from '../components/organisms';

export default function MainHub() {
  const { sessionData, theme, navigate, addLog } = useSession();

  const menuItems = sessionData?.menu || [];

  const handleMenuSelect = (item) => {
    addLog(`MENU SELECT: ${item.label}`);
    navigate(item.screen);
  };

  // Custom render for MainHub menu items
  const renderMenuCard = (item, index) => (
    <>
      <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile layout */}
      <div className="md:hidden">
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
      </div>
    </>
  );

  return (
    <ScreenWrapper>
      <ResponsiveCardGrid
        items={menuItems}
        onItemClick={handleMenuSelect}
        renderCard={renderMenuCard}
        columns={1}
      />
    </ScreenWrapper>
  );
}
