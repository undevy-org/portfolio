'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ChevronRight, FolderGit2, Settings2 } from 'lucide-react';

export default function Timeline() {
  const { sessionData, navigate, addLog, setSelectedRole } = useSession();

  const roles = sessionData?.experience || [];

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
            className="w-full p-4 text-left border rounded transition-colors relative border-light-border-lighter hover:bg-light-hover dark:border-dark-border-darker dark:hover:bg-dark-hover"
          >
            <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
              <span className="title-command mt-1">
                [{String(index + 1).padStart(2, '0')}]
              </span>

              <div>
                <div className="title-command text-lg font-normal">
                  {role.company}
                </div>
                <div className="key-label opacity-80">
                  {role.role}
                </div>
                <div className="key-label text-xs mt-1">
                  {role.period} • {role.duration}
                </div>
                <div className="value-primary text-sm mt-1">
                  {role.highlight}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 mt-1 key-label" />
            </div>

            <div className="md:hidden">
              <div className="flex justify-between items-start">
                  <span className="title-command text-lg">
                    {role.company}
                  </span>
                  <span className="title-command mt-1 text-sm">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
              </div>
              <div className="key-label mt-1 text-sm">{role.role}</div>
              <div className="key-label mt-1 text-xs">
                {role.period} • {role.duration}
              </div>
              <div className="value-primary mt-2 text-sm text-left">
                {role.highlight}
              </div>
              
              <ChevronRight className="w-5 h-5 absolute bottom-4 right-4 key-label" />
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
