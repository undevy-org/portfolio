// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  // REMOVED: The 'theme' variable is no longer needed for styling this component.
  const { sessionData, navigate, addLog, selectedCase } = useSession();
  
  // REMOVED: All intermediate class name variables are now obsolete.
  // Semantic classes will be applied directly in the JSX.
  
  if (!selectedCase) {
    return (
      <div className="p-4 text-center">
        <p className="text-secondary">
          No case selected. Please go back to Case List.
        </p>
        <button
          onClick={() => navigate('CaseList')}
          className="mt-4 btn-command"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  const caseDetails = sessionData?.case_details?.[selectedCase.id] || {};
  const caseImages = caseDetails.images || {};
  
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
      {/* CHANGE: Replaced 'panelClasses' with semantic classes for the main info panel. */}
      <div className="p-4 rounded border border-secondary">
        <div className="space-y-2">
          {/* CHANGE: Applied semantic classes directly for consistent styling. */}
          <h2 className="text-xl text-command">{selectedCase.title}</h2>
          <p className="text-sm text-secondary">{selectedCase.desc}</p>
          <p className="text-sm pt-1 text-success">{selectedCase.metrics}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedCase.tags?.map((tag) => (
              <span
                key={tag}
                // CHANGE: Replaced the final piece of theme-dependent logic with our standard tag styling.
                // This fixes potential hydration errors and aligns with the new design system.
                className="tag-badge border-secondary text-secondary bg-main"
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