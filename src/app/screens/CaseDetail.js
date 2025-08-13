'use client';

import { useSession } from '../context/SessionContext';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  const { sessionData, navigate, addLog, selectedCase } = useSession();
  
  if (!selectedCase) {
    return (
      <div className="p-4 text-center">
        <p className="key-label">
          No case selected. Please go back to Case List.
        </p>
        <button
          onClick={() => navigate('CaseList')}
          className="mt-4 px-4 py-2 rounded border transition-colors border-light-border text-light-text-secondary hover:bg-light-hover dark:border-dark-border dark:text-dark-text-secondary dark:hover:bg-dark-hover"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  const caseDetails = sessionData?.case_details?.[selectedCase.id] || {};
  const caseImages = caseDetails.images || {};
  
  // Build tabs with content as ARRAYS of objects (not pre-rendered JSX!)
  // This is what Tabs.js expects
  const tabs = [
    {
      id: 'challenge',
      label: 'challenge',
      title: 'problem_statement',
      content: [
        { type: 'text', value: caseDetails.challenge || 'No challenge description available.' },
        // Add image object if it exists - Tabs will need to handle this new type
        ...(caseImages.challenge ? [{
          type: 'image',
          src: caseImages.challenge,
          alt: 'Problem visualization',
          height: 300
        }] : [])
      ]
    },
    {
      id: 'approach',
      label: 'approach',
      title: 'methodology',
      content: caseDetails.approach?.map(item => ({ 
        type: 'list_item', 
        value: item 
      })) || []
    },
    {
      id: 'solution',
      label: 'solution',
      title: 'implementation',
      content: [
        { type: 'text', value: caseDetails.solution || 'No solution description available.' },
        ...(caseImages.solution ? [{
          type: 'image',
          src: caseImages.solution,
          alt: 'Solution implementation',
          height: 250
        }] : [])
      ]
    },
    {
      id: 'results',
      label: 'results',
      title: 'impact_metrics',
      content: [
        ...(caseDetails.results?.map(item => ({ 
          type: 'list_item', 
          value: item 
        })) || []),
        ...(caseDetails.learnings ? [
          { type: 'divider' },
          { type: 'sub_heading', value: 'key_learnings' },
          { type: 'text', value: caseDetails.learnings }
        ] : []),
        ...(caseImages.results ? [{
          type: 'image',
          src: caseImages.results,
          alt: 'Results visualization',
          height: 200
        }] : [])
      ]
    }
  ];
  
  return (
    <div className="p-4 space-y-4">
      <div className="panel-base panel-theme">
        <div className="space-y-2">
          <h2 className="title-command text-xl">{selectedCase.title}</h2>
          <p className="key-label">{selectedCase.desc}</p>
          <p className="text-sm pt-1 text-light-success dark:text-dark-success">{selectedCase.metrics}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedCase.tags?.map((tag) => (
              <span
                key={tag}
                className="tag-badge bg-gray-50 text-light-text-secondary border-light-border-lighter dark:bg-gray-900 dark:text-dark-text-secondary dark:border-dark-border-darker"
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