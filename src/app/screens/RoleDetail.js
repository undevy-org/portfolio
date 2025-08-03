// src/app/screens/RoleDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';
import { ChevronRight, ArrowLeft } from 'lucide-react';

export default function RoleDetail() {
  const { sessionData, theme, navigate, addLog, selectedRole } = useSession();

  // REFACTORED: Centralized theme-based classes for consistency
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

  if (!selectedRole) {
    // ... (error handling code remains the same)
    return (
      <div className="p-4 text-center">
        <p className={valueClasses}>
          No role selected. Please go back to Timeline.
        </p>
        <button
          onClick={() => navigate('Timeline')}
          className={`mt-4 px-4 py-2 rounded border transition-colors ${
            theme === 'dark' 
              ? 'border-dark-border text-dark-text-secondary hover:bg-dark-hover' 
              : 'border-light-border text-light-text-secondary hover:bg-light-hover'
          }`}
        >
          Back to Timeline
        </button>
      </div>
    );
  }

  const roleDetails = sessionData?.role_details?.[selectedRole.id] || {};

  // Structure for Accordion component, now with type safety for content
  const sections = [
    { id: 'summary', title: 'quick_summary', content: roleDetails.summary ? [{ type: 'text', value: roleDetails.summary }] : [] },
    { id: 'responsibilities', title: 'key_responsibilities', content: roleDetails.responsibilities?.map(r => ({ type: 'list_item', value: r })) || [] },
    { id: 'achievements', title: 'main_achievements', content: roleDetails.achievements?.map(a => ({ type: 'list_item', value: a })) || [] },
    { id: 'tech', title: 'tech_stack', content: roleDetails.tech ? [{ type: 'tag_list', value: roleDetails.tech }] : [] }
  ];

  return (
    <div className="p-4 space-y-4">
      {/* REFACTORED: Unified Header Panel */}
      <div className={panelClasses}>
        <div className="space-y-1">
          <h2 className={`text-xl ${yellowClasses}`}>{selectedRole.company}</h2>
          <p className={`text-base ${labelClasses}`}>{selectedRole.role}</p>
          <p className={`text-sm ${valueClasses}`}>{selectedRole.period} • {selectedRole.duration}</p>
        </div>
      </div>

      {/* Accordion Content */}
      <Accordion sections={sections} defaultExpanded="summary" />

      {/* Navigation */}
      <div className="mt-4 flex gap-2">
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
            addLog('VIEW CASE STUDIES');
            navigate('CaseList');
          }}
          icon={ChevronRight}
          iconPosition="right"
          variant="flex"
          className="p-2"
        >
          VIEW CASES
        </Button>
      </div>
    </div>
  );
}
