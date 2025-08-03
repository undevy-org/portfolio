// src/app/screens/Timeline.js
'use client';

import { useSession } from '../context/SessionContext';
import Button from '../components/ui/Button';
import { ChevronRight, FolderGit2, Settings2 } from 'lucide-react';

export default function Timeline() {
  const { sessionData, theme, navigate, addLog, setSelectedRole } = useSession();

  const roles = sessionData?.experience || [];

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    addLog(`ROLE SELECTED: ${role.company}`);
    navigate('RoleDetail');
  };

  return (
    <div className="p-4">
      {/* Experience Items */}
      <div className="space-y-3">
        {roles.map((role, index) => (
          <Button
            key={`${role.id}-${index}`}
            onClick={() => handleRoleClick(role)}
            variant="full"
            className="p-4 text-left"
          >
            <div className="flex items-start w-full">
              {/* Index */}
              <span className={`mr-4 ${
                theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
              }`}>
                [{String(index + 1).padStart(2, '0')}]
              </span>

              {/* Info */}
              <div className="flex-1">
                <div className={`text-lg font-normal ${
                  theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
                }`}>
                  {role.company}
                </div>
                <div className={`text-sm opacity-80 ${
                  theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}>
                  {role.role}
                </div>
                <div className={`text-xs mt-1 opacity-60 ${
                  theme === 'dark' ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'
                }`}>
                  {role.period} • {role.duration}
                </div>
                <div className="text-xs mt-1">{role.highlight}</div>
              </div>

              {/* Chevron */}
              <ChevronRight className="w-4 h-4 mt-1 ml-2 opacity-60" />
            </div>
          </Button>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-5 flex gap-3">
        <Button
          onClick={() => {
            addLog('NAVIGATE: case studies');
            navigate('CaseList');
          }}
          icon={FolderGit2}
          iconPosition="left"
          variant="flex"
        >
          VIEW PROJECTS
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
