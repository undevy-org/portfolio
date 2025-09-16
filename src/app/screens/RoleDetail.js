// src/app/screens/RoleDetail.js

'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Accordion from '../components/ui/Accordion';
import { FolderGit2, ArrowLeft } from 'lucide-react';
import { CommandTitle } from '../components/atoms';
import { Panel, NavigationButton } from '../components/molecules';

export default function RoleDetail() {
  const { sessionData, navigate, addLog, selectedRole } = useSession();

  if (!selectedRole) {
    return (
      <div className="p-4 text-center">
        <p className="text-secondary">
          No role selected. Please go back to Timeline.
        </p>
        <button
          onClick={() => navigate('Timeline')}
          className="mt-4 px-4 py-2 rounded border transition-colors border-primary text-secondary bg-hover"
        >
          Back to Timeline
        </button>
      </div>
    );
  }

  const roleDetails = sessionData?.role_details?.[selectedRole.id] || {};

  const sections = [
    { id: 'summary', title: 'quick_summary', content: roleDetails.summary ? [{ type: 'text', value: roleDetails.summary }] : [] },
    { id: 'responsibilities', title: 'key_responsibilities', content: roleDetails.responsibilities?.map(r => ({ type: 'list_item', value: r })) || [] },
    { id: 'achievements', title: 'main_achievements', content: roleDetails.achievements?.map(a => ({ type: 'list_item', value: a })) || [] },
    { id: 'tech', title: 'tech_stack', content: roleDetails.tech ? [{ type: 'tag_list', value: roleDetails.tech }] : [] }
  ];

  return (
    <ScreenWrapper>
    <div className="space-y-4">
      <Panel>
        <CommandTitle text={selectedRole.company} level="h2" className="text-xl" />
        <p className="text-base text-primary">{selectedRole.role}</p>
        <p className="text-sm text-secondary">{selectedRole.period} • {selectedRole.duration}</p>
      </Panel>

      <Accordion sections={sections} defaultExpanded="summary" />

      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <NavigationButton
          screen="Timeline"
          label="BACK TO TIMELINE"
          icon={ArrowLeft}
          logMessage="RETURN TO TIMELINE"
        />
        <NavigationButton
          screen="CaseList"
          label="READ CASES"
          icon={FolderGit2}
          logMessage="NAVIGATE: case studies"
        />
      </div>
    </div>
    </ScreenWrapper>
  );
}
