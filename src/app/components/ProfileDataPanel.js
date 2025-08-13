'use client';

import { useSession } from '../context/SessionContext';

export default function ProfileDataPanel() {
  const { sessionData } = useSession();

  if (!sessionData?.profile?.summary) return null;

  const { title, specialization, background } = sessionData.profile.summary;
  
  const separator = <span className="text-light-border dark:text-dark-border">|</span>;

  return (
    <div className="panel-base panel-theme p-3 text-sm">
      <div className="flex flex-wrap gap-x-2">
        <span className="font-bold value-primary text-sm">{title}</span>
        {separator}
        <span className="key-label">{specialization}</span>
        {separator}
        <span className="key-label">{background}</span>
      </div>
    </div>
  );
}