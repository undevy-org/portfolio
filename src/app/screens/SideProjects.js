'use client';

import { useSession } from '../context/SessionContext';
import { ExternalLink } from 'lucide-react';

export default function SideProjects() {
  const { sessionData, theme, addLog } = useSession();
  
  const panelClasses = `p-4 rounded border ${
    theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
  }`;
  const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  const labelClasses = `${
    theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
  }`;
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;
  const primaryTextClasses = `${
    theme === 'dark' ? 'text-dark-text-white' : 'text-light-text-black'
  }`;

  const projects = sessionData?.side_projects || [];
  const speaking = sessionData?.public_speaking || [];
  
  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getStatusColorClasses = (status) => {
    switch(status) {
      case 'COMPLETED':
        return theme === 'dark' ? 'border-green-700 bg-green-900/30 text-green-400' : 'border-green-600 bg-green-100 text-green-700';
      case 'IN_PROGRESS':
        return theme === 'dark' ? 'border-yellow-600 bg-yellow-900/30 text-yellow-400' : 'border-yellow-500 bg-yellow-100 text-yellow-600';
      case 'EXPERIMENTAL':
      default:
        return theme === 'dark' ? 'border-gray-600 bg-gray-900/30 text-gray-400' : 'border-gray-400 bg-gray-50 text-gray-500';
    }
  };
  
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        {projects.map((project) => (
          // WHY: This aligns with the request to make the project name the primary header and remove the redundant project ID.
          <div key={project.id} className={panelClasses}>
            <div className="flex items-start justify-between mb-2">
              <h3 className={`text-base ${yellowClasses}`}>{project.name}</h3>
              <span className={`text-xs px-2 py-0.5 border rounded-full ml-4 whitespace-nowrap ${getStatusColorClasses(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className={`text-sm mb-2 ${valueClasses}`}>{project.desc}</p>
            
            <div className={`flex flex-wrap gap-x-2 text-sm ${labelClasses}`}>
              {project.tech?.map((tech) => (
                <span key={tech}>[{tech}]</span>
              ))}
            </div>
          </div>
        ))}
      </div>

            {speaking.length > 0 && (
        <div className={panelClasses}>
          <h3 className={`text-base mb-3 ${yellowClasses}`}>$public_speaking</h3>
          <div className="space-y-2">
            {speaking.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addLog(`EXTERNAL LINK: ${item.title}`)}
                className={`flex items-center justify-between p-3 border rounded transition-colors group ${
                  theme === 'dark' 
                    ? 'border-dark-border hover:bg-dark-hover' 
                    : 'border-light-border hover:bg-light-hover'
                }`}
              >
                {/* WHY: This simplifies the layout and makes the text the primary focus, improving clarity. */}
                <div className={`text-sm ${primaryTextClasses} group-hover:underline`}>
                  {item.title}
                </div>
                {/* WHY: Unifies the visual language for external links across the component. */}
                <ExternalLink className={`w-4 h-4 transition-colors ${yellowClasses}`} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}