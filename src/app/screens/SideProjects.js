// src/app/screens/SideProjects.js
'use client';

import { useSession } from '../context/SessionContext';
import { ExternalLink } from 'lucide-react';
import { CommandTitle, Tag } from '../components/atoms';
import { Panel } from '../components/molecules';
import { ListViewTemplate } from '../components/templates';

export default function SideProjects() {
  const { sessionData, addLog } = useSession();

  const projects = sessionData?.side_projects || [];
  const speaking = sessionData?.public_speaking || [];

  // Convert projects to the format expected by ListViewTemplate
  // Add speaking items if they exist
  const projectItems = projects.map((project, index) => ({
    id: project.id,
    name: project.name,
    status: project.status,
    desc: project.desc,
    tech: project.tech,
    type: 'project' // identify as project item
  }));

  // Add speaking items to the list
  const speakingItems = speaking.map((item, index) => ({
    id: `speaking-${index}`,
    title: item.title,
    url: item.url,
    type: 'speaking' // identify as speaking item
  }));

  const allItems = [...projectItems, ...speakingItems];

  const handleItemClick = (item) => {
    if (item.type === 'speaking' && item.url) {
      addLog(`EXTERNAL LINK: ${item.title}`);
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  // Custom render function for different item types
  const renderCard = (item, index) => {
    if (item.type === 'speaking') {
      return (
        <div className="flex items-center justify-between p-3 border rounded transition-colors group border-primary bg-hover">
          <div className="text-sm text-white-black group-hover:underline">
            {item.title}
          </div>
          <ExternalLink className="w-4 h-4 transition-colors text-command" />
        </div>
      );
    }

    // Default project rendering
    return (
      <>
        <div className="hidden md:flex justify-between items-start gap-x-3">
          <div className="space-y-1 flex-1">
            <CommandTitle text={item.name} level="h3" className="text-base" />
            <div className="text-sm text-secondary">{item.desc}</div>
            <div className={`text-sm pt-1 ${item.type === 'project' ? 'text-success' : 'text-secondary'}`}>
              {item.status || ''}
            </div>
          </div>
          <Tag text={item.status} />
        </div>
        <div className="md:hidden">
          <div className="space-y-1">
            <CommandTitle text={item.name} level="h3" className="text-base" />
            <div className="text-sm text-secondary">{item.desc}</div>
            <div className="text-sm text-secondary">{item.status}</div>
            <div className="absolute bottom-4 right-4 text-secondary"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {item.tech?.map((tech) => (
            <Tag key={tech} text={`[${tech}]`} />
          ))}
        </div>
      </>
    );
  };

  // Add speaking header as custom content if needed
  const emptyState = allItems.length === 0 ? (
    <Panel>
      <p className="text-center text-secondary">No side projects available.</p>
    </Panel>
  ) : null;

  return (
    <ListViewTemplate
      items={allItems}
      onItemClick={handleItemClick}
      renderCard={renderCard}
      emptyState={emptyState}
    />
  );
}
