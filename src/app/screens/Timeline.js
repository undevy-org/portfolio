'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/ui/Button';
import { ChevronRight, FolderGit2, Settings2 } from 'lucide-react';
import { CommandTitle } from '../components/atoms';

export default function Timeline() {
  const { sessionData, theme, navigate, addLog, setSelectedRole } = useSession();

  const roles = sessionData?.experience || [];
  const yellowClasses = "text-command";
  const primaryClasses = "text-primary";
  const secondaryClasses = "text-secondary";

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    addLog(`ROLE SELECTED: ${role.company}`);
    navigate('RoleDetail');
  };

  return (
    <ScreenWrapper>
      <div className="space-y-3">
        {roles.map((role, index) => (
          <button
            key={`${role.id}-${index}`}
            onClick={() => handleRoleClick(role)}
            className={`w-full p-4 text-left border rounded transition-colors relative ${
              "border-secondary bg-hover"
            }`}
          >
            <div className="hidden md:grid grid-cols-[auto,1fr,auto] items-start w-full gap-x-3">
              <span className={`mt-1 text-command`}>
                [{String(index + 1).padStart(2, '0')}]
              </span>

              <div>
                <CommandTitle text={role.company} level="div" className="text-lg" />
                <div className={`text-sm opacity-80 text-secondary`}>
                  {role.role}
                </div>
                <div className={`text-xs mt-1 text-secondary`}>
                  {role.period} • {role.duration}
                </div>
                <div className={`text-sm mt-1 text-primary`}>
                  {role.highlight}
                </div>
              </div>

              <ChevronRight className={`w-5 h-5 mt-1 text-secondary`} />
            </div>

            <div className="md:hidden">
              <div className="flex justify-between items-start">
                  <CommandTitle text={role.company} level="div" className="text-lg" />
                  <span className={`mt-1 text-sm text-command`}>
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
              </div>
              <div className={`mt-1 text-sm text-secondary`}>{role.role}</div>
              <div className={`mt-1 text-xs text-secondary`}>
                {role.period} • {role.duration}
              </div>
              <div className={`mt-2 text-sm text-left text-primary`}>
                {role.highlight}
              </div>
              
              <ChevronRight className={`w-5 h-5 absolute bottom-4 right-4 text-secondary`} />
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
    </ScreenWrapper>
  );
}