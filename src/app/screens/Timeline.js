// src/app/screens/Timeline.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ChevronRight, FolderGit2, Settings2 } from 'lucide-react';

export default function Timeline() {
  const { sessionData, theme, navigate, addLog, setSelectedRole } = useSession();

  const roles = sessionData?.experience || [];
  const yellowClasses = theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command';
  const primaryClasses = theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary';
  const secondaryClasses = theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary';

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    addLog(`ROLE SELECTED: ${role.company}`);
    navigate('RoleDetail');
  };

  return (
    <div className="p-4">
      <div className="space-y-3">
        {roles.map((role, index) => (
          <button
            key={`${role.id}-${index}`}
            onClick={() => handleRoleClick(role)}
            className={`w-full p-4 text-left border rounded transition-colors ${
              theme === 'dark' 
                ? 'border-dark-border-darker hover:bg-dark-hover' 
                : 'border-light-border-lighter hover:bg-light-hover'
            }`}
          >
            {/* Desktop Layout: visible on medium screens and up */}
            <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
              {/* Column 1: Index */}
              <span className={`mt-1 ${yellowClasses}`}>
                [{String(index + 1).padStart(2, '0')}]
              </span>

              {/* Column 2: Main Content */}
              <div>
                <div className={`text-lg font-normal ${yellowClasses}`}>
                  {role.company}
                </div>
                <div className={`text-sm opacity-80 ${secondaryClasses}`}>
                  {role.role}
                </div>
                <div className={`text-xs mt-1 ${secondaryClasses}`}>
                  {role.period} • {role.duration}
                </div>
                <div className={`text-sm mt-1 ${primaryClasses}`}>
                  {role.highlight}
                </div>
              </div>

              {/* Column 3: Chevron */}
              <ChevronRight className={`w-5 h-5 mt-1 ${secondaryClasses}`} />
            </div>

            {/* Mobile Layout: visible only on small screens */}
            <div className="md:hidden">
              <div className="flex justify-between items-start">
                  <span className={`text-lg ${yellowClasses}`}>
                    {role.company}
                  </span>
                  <span className={`mt-1 text-sm ${yellowClasses}`}>
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
              </div>
              <div className={`mt-1 text-sm ${secondaryClasses}`}>{role.role}</div>
              <div className={`mt-1 text-xs ${secondaryClasses}`}>
                {role.period} • {role.duration}
              </div>
              <div className={`mt-2 text-sm text-left ${primaryClasses}`}>
                {role.highlight}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex mt-5 flex-col md:flex-row gap-3">
        <Button
          onClick={() => {
            addLog('NAVIGATE: case studies');
            navigate('CaseList');
          }}
          icon={FolderGit2}
          iconPosition="left"
          variant="flex"
        >
          READ CASES
        </Button>

        <Button
          onClick={() => {
            addLog('NAVIGATE: skills matrix');
            navigate('SkillsGrid');
          }}
          icon={Settings2}
          iconPosition="left"
          variant="flex"
        >
          VIEW SKILLS
        </Button>
      </div>
    </div>
  );
}
