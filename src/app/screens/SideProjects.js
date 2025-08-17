// src/app/screens/SideProjects.js
'use client';

import { useSession } from '../context/SessionContext';
import { ExternalLink } from 'lucide-react';

export default function SideProjects() {
  // REMOVED: The 'theme' variable is no longer needed for styling this component.
  const { sessionData, addLog } = useSession();
  
  // REMOVED: All intermediate class name variables are obsolete.
  // Semantic classes from globals.css are now used directly in the JSX.

  const projects = sessionData?.side_projects || [];
  const speaking = sessionData?.public_speaking || [];
  
  const handleExternalLink = (label, url) => {
    addLog(`EXTERNAL LINK: ${label}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // CHANGE: The getStatusStyling function has been simplified.
  // Instead of returning complex style objects, it now returns a simple string
  // of semantic CSS classes, aligning the status indicators with the standard
  // tag appearance used elsewhere in the application (e.g., for tech stacks).
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
    <div className="p-4 space-y-4">
      <div className="space-y-3">
        {projects.map((project) => (
            <div key={project.id} className="p-4 rounded border border-secondary">
            <div className="flex items-start justify-between mb-2">
                <h3 className="text-base text-command">{project.name}</h3>
              {/* CHANGE: The status badge now uses the standard '.tag-badge' class as its base. */}
              {/* The dynamic color classes from the simplified getStatusColorClasses function */}
              {/* are appended to complete the consistent tag styling. */}
              <span className={`tag-badge ml-4 ${getStatusColorClasses(project.status)}`}>
                {project.status}
              </span>
            </div>
            
              <p className="text-sm mb-2 text-secondary">{project.desc}</p>
            
              <div className="flex flex-wrap gap-x-2 text-sm text-primary">
              {project.tech?.map((tech) => (
                <span key={tech}>[{tech}]</span>
              ))}
            </div>
          </div>
        ))}
      </div>

            {speaking.length > 0 && (
        // CHANGE: Applied semantic class '.border-secondary' directly.
        <div className="p-4 rounded border border-secondary">
          <h3 className="text-base mb-3 text-command">$public_speaking</h3>
          <div className="space-y-2">
            {speaking.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => addLog(`EXTERNAL LINK: ${item.title}`)}
                // CHANGE: Replaced the theme-dependent logic with semantic classes '.border-primary' and '.bg-hover'.
                // This makes the links theme-aware and consistent with other interactive elements.
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
    </div>
  );
}