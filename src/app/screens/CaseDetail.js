// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  const { sessionData, theme, navigate, addLog, selectedCase } = useSession();

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
  const successClasses = `${
    theme === 'dark' ? 'text-dark-success' : 'text-light-success'
  }`;

  if (!selectedCase) {
    return (
      <div className="p-4 text-center">
        <p className={valueClasses}>
          No case selected. Please go back to Case List.
        </p>
        <button
          onClick={() => navigate('CaseList')}
          className={`mt-4 px-4 py-2 rounded border transition-colors ${
            theme === 'dark' 
              ? 'border-dark-border text-dark-text-secondary hover:bg-dark-hover' 
              : 'border-light-border text-light-text-secondary hover:bg-light-hover'
          }`}
        >
          Back to Cases
        </button>
      </div>
    );
  }

  const caseDetails = sessionData?.case_details?.[selectedCase.id] || {};

  const tabs = [
    {
      id: 'challenge',
      label: 'challenge',
      title: 'problem_statement',
      content: [
        { type: 'text', value: caseDetails.challenge || 'No challenge description available.' }
      ]
    },
    {
      id: 'approach',
      label: 'approach',
      title: 'methodology',
      content: caseDetails.approach?.map(item => ({ type: 'list_item', value: item })) || []
    },
    {
      id: 'solution',
      label: 'solution',
      title: 'implementation',
      content: [
        { type: 'text', value: caseDetails.solution || 'No solution description available.' }
      ]
    },
    {
      id: 'results',
      label: 'results',
      title: 'impact_metrics',
      content: [
        ...(caseDetails.results?.map(item => ({ type: 'list_item', value: item })) || []),
        ...(caseDetails.learnings ? [
          { type: 'divider' },
          { type: 'sub_heading', value: 'key_learnings' },
          { type: 'text', value: caseDetails.learnings }
        ] : [])
      ]
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className={panelClasses}>
        <div className="space-y-2">
          <h2 className={`text-xl ${yellowClasses}`}>{selectedCase.title}</h2>
          <p className={`text-sm ${valueClasses}`}>{selectedCase.desc}</p>
          <p className={`text-sm pt-1 ${successClasses}`}>{selectedCase.metrics}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedCase.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 border rounded text-xs ${
                  theme === 'dark'
                    ? 'border-dark-border-darker bg-gray-900 text-dark-text-secondary'
                    : 'border-light-border-lighter bg-gray-200 text-light-text-secondary'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="challenge" />

      <div className="mt-4 flex flex-col md:flex-row gap-3">
              <Button
                onClick={() => {
                  addLog('RETURN TO CASE LIST');
                  navigate('CaseList');
                }}
                  icon={ArrowLeft}
                  iconPosition="left"
                  variant="flex"
                  className="p-2"
              >
                BACK TO CASES
              </Button>
              
              <Button
                onClick={() => {
                  addLog('NAVIGATE: skills matrix');
                  navigate('SkillsGrid');
                }}
                  icon={Zap}
                  iconPosition="left"
                  variant="flex"
                  className="p-2"
              >
                VIEW SKILLS
              </Button>
            </div>
    </div>
  );
}