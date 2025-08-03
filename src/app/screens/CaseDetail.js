// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  const { sessionData, theme, navigate, addLog, selectedCase } = useSession();
  
  if (!selectedCase) {
    return (
      <div className="p-4 text-center">
        <p className={theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
          No case selected. Please go back to Case List.
        </p>
        <Button
          onClick={() => navigate('CaseList')}
          variant="inline"
          className="mt-4 px-4 py-2"
        >
          Back to Cases
        </Button>
      </div>
    );
  }

  const caseDetails = sessionData?.case_details?.[selectedCase.id] || {};

  const tabs = [
    {
      id: 'challenge',
      label: 'challenge',
      title: 'problem_statement',
      type: 'text',
      content: caseDetails.challenge || 'No challenge description available.'
    },
    {
      id: 'approach',
      label: 'approach',
      title: 'methodology',
      type: 'list',
      content: caseDetails.approach || []
    },
    {
      id: 'solution',
      label: 'solution',
      title: 'implementation',
      type: 'text',
      content: caseDetails.solution || 'No solution description available.'
    },
    {
      id: 'results',
      label: 'results',
      title: 'impact_metrics',
      type: 'custom',
      content: (
        <div>
          <div className="space-y-2 mb-4">
            {(caseDetails.results || []).map((result, idx) => (
              <div
                key={idx}
                className={`text-sm flex items-start ${
                  theme === 'dark' ? 'text-dark-success' : 'text-light-success'
                }`}
              >
                <span className="mr-2">[✓]</span>
                <span>{result}</span>
              </div>
            ))}
          </div>

          {caseDetails.learnings && (
            <div className={`border-t pt-3 mt-3 ${
              theme === 'dark' ? 'border-dark-border' : 'border-light-border'
            }`}>
              <div className={`mb-2 ${
                theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
              }`}>
                $key_learnings
              </div>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
              }`}>
                {caseDetails.learnings}
              </p>
            </div>
          )}
        </div>
      )
    }
  ];
  
  return (
    <div className="p-4">
      <div className={`mb-4 ${
        theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
      }`}>
        <h2 className="text-2xl font-bold mb-2">{selectedCase.title}</h2>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          {selectedCase.desc}
        </p>
      </div>

      <div className={`p-3 border rounded mb-3 ${
        theme === 'dark' ? 'border-dark-border' : 'border-light-border'
      }`}>
        <div className={`mb-1 ${
          theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
        }`}>
          $case_id
        </div>
        <div className={`text-sm mb-2 ${
          theme === 'dark' ? 'text-dark-text-primary' : 'text-light-text-primary'
        }`}>
          {selectedCase.id}
        </div>

        <div className={`text-sm ${
          theme === 'dark' ? 'text-dark-success' : 'text-light-success'
        }`}>
          {selectedCase.metrics}
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {selectedCase.tags?.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 border rounded text-xs ${
                theme === 'dark'
                  ? 'border-dark-border text-dark-text-secondary'
                  : 'border-light-border text-light-text-secondary'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="challenge" />

      <div className="mt-4 flex gap-2">
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
