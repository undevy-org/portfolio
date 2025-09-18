'use client';

import { useSession } from '../context/SessionContext';
import { ListViewTemplate } from '../components/templates';

export default function MainHub() {
  const { sessionData, navigate, addLog } = useSession();

  const menuItems = sessionData?.menu || [];

  const handleMenuSelect = (item) => {
    addLog(`MENU SELECT: ${item.label}`);
    navigate(item.screen);
  };

  return (
    <ListViewTemplate
      items={menuItems}
      onItemClick={handleMenuSelect}
      variant="menu"
    />
  );
}
