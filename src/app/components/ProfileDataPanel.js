'use client';

import { useSession } from '../context/SessionContext';

export default function ProfileDataPanel() {
  const { sessionData, theme } = useSession();

  if (!sessionData?.profile?.summary) return null;

  const { title, specialization, background } = sessionData.profile.summary;

  const panelClasses = `border rounded p-3 text-sm ${
    theme === 'dark' ? 'border-dark-border' : 'border-light-border'
  }`;
  
  const separator = <span className={theme === 'dark' ? 'text-dark-border' : 'text-light-border'}>|</span>;

  return (
    <div className={panelClasses}>
      <div className="flex flex-wrap gap-x-2">
        <span className="font-bold">{title}</span>
        {separator}
        <span>{specialization}</span>
        {separator}
        <span>{background}</span>
      </div>
    </div>
  );
}