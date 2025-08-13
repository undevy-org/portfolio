'use client';

import { useSession } from '../context/SessionContext';

export default function ConfigurationPanel() {
  const { sessionData } = useSession();

  if (!sessionData?.config) return null;

  const { timeline, depth, tone } = sessionData.config;

  return (
    <div className="panel-base panel-theme p-3 text-sm">
      <h2 className="title-command font-bold">$configuration</h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <span className="title-command text-sm">$timeline:</span>
        <span className="key-label">{timeline}</span>
        <span className="title-command text-sm">$depth:</span>
        <span className="key-label">{depth}</span>
        <span className="title-command text-sm">$tone:</span>
        <span className="key-label">{tone}</span>
      </div>
    </div>
  );
}