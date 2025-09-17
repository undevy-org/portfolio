'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import { FolderGit2, Settings2 } from 'lucide-react';
import { NavigationPanel, ResponsiveCardGrid } from '../components/organisms';

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
      <ResponsiveCardGrid
        items={roles}
        onItemClick={handleRoleClick}
        columns={1}
      />

      <NavigationPanel buttons={[
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
      ]} layout="row" />
    </ScreenWrapper>
  );
}
