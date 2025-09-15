// src/app/screens/SideProjects.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { ExternalLink } from 'lucide-react';
import { CommandTitle, Tag } from '../components/atoms';

export default function SideProjects() {
  const { sessionData, addLog } = useSession();

  const projects = sessionData?.side_projects || [];
  const speaking = sessionData?.public_speaking || [];
  
  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStatusColorClasses = (status) => {
    switch(status) {
      case 'COMPLETED':
        return 'border-success text-success';
      case 'IN_PROGRESS':
        return 'border-command text-command';
      case 'EXPERIMENTAL':
      default:
        return 'border-secondary text-secondary';
    }
  };
  
  return (
    <ScreenWrapper>
      <div className="space-y-3 mb-2">
        {projects.map((project) => (
            <div key={project.id} className="p-4 rounded border border-secondary">
            <div className="flex items-start justify-between mb-2">
                <CommandTitle text={project.name} level="h3" className="text-base" />
              <Tag text={project.status} className={getStatusColorClasses(project.status)} />
            </div>
            
              <p className="text-sm mb-2 text-secondary">{project.desc}</p>
            
              <div className="flex flex-wrap gap-2">
                {project.tech?.map((tech) => (
                  <Tag key={tech} text={`[${tech}]`} />
                ))}
              </div>
          </div>
        ))}
      </div>

            {speaking.length > 0 && (
              <div className="p-4 rounded border border-secondary">
                <CommandTitle text="public_speaking" level="h3" className="text-base mb-3" />
                <div className="space-y-2">
                  {speaking.map((item, index) => (
                    <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addLog(`EXTERNAL LINK: ${item.title}`)}
                className="flex items-center justify-between p-3 border rounded transition-colors group border-primary bg-hover"
              >
                <div className="text-sm text-white-black group-hover:underline">
                  {item.title}
                </div>
                <ExternalLink className="w-4 h-4 transition-colors text-command" />
              </a>
            ))}
          </div>
        </div>
      )}
    </ScreenWrapper>
  );
}