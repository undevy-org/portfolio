// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  const { sessionData, theme, navigate, addLog, selectedCase } = useSession();
  
  // Keep your existing style classes - they work great
  const panelClasses = `p-4 rounded border ${
    theme === 'dark' ? 'border-dark-border-darker' : 'border-light-border-lighter'
  }`;
  
  const yellowClasses = `${
    theme === 'dark' ? 'text-dark-text-command' : 'text-light-text-command'
  }`;
  
  const valueClasses = `${
    theme === 'dark' ? 'text-dark-text-secondary' : 'text-light-text-secondary'
  }`;
  
  const successClasses = `${
    theme === 'dark' ? 'text-dark-success' : 'text-light-success'
  }`;
  
  // Handle no case selected
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
  const caseImages = caseDetails.images || {}; // Support for images from content.json
  
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
      // Keep as array of objects
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
        // Add solution image if exists
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
        // Results as list items
        ...(caseDetails.results?.map(item => ({ 
          type: 'list_item', 
          value: item 
        })) || []),
        // Learnings section
        ...(caseDetails.learnings ? [
          { type: 'divider' },
          { type: 'sub_heading', value: 'key_learnings' },
          { type: 'text', value: caseDetails.learnings }
        ] : []),
        // Results image if exists
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
      {/* Case header panel - keeping your exact structure */}
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

      {/* Tabs component - it will handle rendering based on content array */}
      <Tabs tabs={tabs} defaultTab="challenge" />

      {/* Navigation buttons - keeping your Button component */}
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