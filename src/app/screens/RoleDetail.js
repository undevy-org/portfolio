// src/app/screens/RoleDetail.js

'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import { FolderGit2, ArrowLeft } from 'lucide-react';

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
      <div className="p-4 rounded border border-secondary">
        <div className="space-y-1">
          <h2 className="text-xl text-command">{selectedRole.company}</h2>
          <p className="text-base text-primary">{selectedRole.role}</p>
          <p className="text-sm text-secondary">{selectedRole.period} • {selectedRole.duration}</p>
        </div>
      </div>

      <Accordion sections={sections} defaultExpanded="summary" />

      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <Button
          onClick={() => {
            addLog('RETURN TO TIMELINE');
            navigate('Timeline');
          }}
            icon={ArrowLeft}
            iconPosition="left"
            variant="flex"
            className="p-2"
        >
          BACK TO TIMELINE
        </Button>
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
      </div>
    </div>
    </ScreenWrapper>
  );
}