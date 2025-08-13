'use client';

import { useSession } from '../context/SessionContext';
import Panel from './ui/Panel';
import PanelTitle from './ui/PanelTitle';

export default function ConfigurationPanel() {
  const { sessionData } = useSession();

  if (!sessionData?.config) return null;

  const { timeline, depth, tone } = sessionData.config;

  return (
    <Panel className="p-3 text-sm">
      <PanelTitle className="font-bold">$configuration</PanelTitle>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <PanelTitle className="text-sm">$timeline:</PanelTitle>
        <span className="key-label">{timeline}</span>
        <PanelTitle className="text-sm">$depth:</PanelTitle>
        <span className="key-label">{depth}</span>
        <PanelTitle className="text-sm">$tone:</PanelTitle>
        <span className="key-label">{tone}</span>
      </div>
    </Panel>
  );
}