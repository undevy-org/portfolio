'use client';

import { useSession } from '../context/SessionContext';
import Panel from './ui/Panel';

export default function ProfileDataPanel() {
  const { sessionData } = useSession();

  if (!sessionData?.profile?.summary) return null;

  const { title, specialization, background } = sessionData.profile.summary;
  
  const separator = <span className="text-light-border dark:text-dark-border">|</span>;

  return (
    <Panel className="p-3 text-sm">
      <div className="flex flex-wrap gap-x-2">
        <span className="font-bold value-primary text-sm">{title}</span>
        {separator}
        <span className="key-label">{specialization}</span>
        {separator}
        <span className="key-label">{background}</span>
      </div>
    </Panel>
  );
}