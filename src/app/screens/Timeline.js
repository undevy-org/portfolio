'use client';

import { useSession } from '../context/SessionContext';
import { FolderGit2, Settings2 } from 'lucide-react';
import { ResponsiveCardGrid } from '../components/organisms';
import { StandardScreenTemplate } from '../components/templates';

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
    <StandardScreenTemplate
      title="experience"
      navigationButtons={[
        {
          screen: 'CaseList',
          label: 'READ CASES',
          icon: FolderGit2,
          logMessage: 'NAVIGATE: case studies'
        },
        {
          screen: 'SkillsGrid',
          label: 'VIEW SKILLS',
          icon: Settings2,
          logMessage: 'NAVIGATE: skills matrix'
        }
      ]}
    >
      <ResponsiveCardGrid
        items={roles}
        onItemClick={handleRoleClick}
        columns={1}
        className="mb-3"
      />
    </StandardScreenTemplate>
  );
}
