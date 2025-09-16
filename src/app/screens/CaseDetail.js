// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/ui/Tabs';
import { ArrowLeft, Zap } from 'lucide-react';
import { Tag, CommandTitle } from '../components/atoms';
import { Panel, NavigationButton } from '../components/molecules';

export default function CaseDetail() {
  const { sessionData, navigate, addLog, selectedCase } = useSession();
  
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
  <ScreenWrapper>
      <Panel>
        <CommandTitle text={selectedCase.title} level="h2" className="text-xl" />
        <p className="text-sm text-secondary">{selectedCase.desc}</p>
        <p className="text-sm pt-1 text-success">{selectedCase.metrics}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {selectedCase.tags?.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </Panel>

      <Tabs tabs={tabs} defaultTab="challenge" />

      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <NavigationButton
          screen="CaseList"
          label="BACK TO CASES"
          icon={ArrowLeft}
          logMessage="RETURN TO CASE LIST"
        />

        <NavigationButton
          screen="SkillsGrid"
          label="VIEW SKILLS"
          icon={Zap}
          logMessage="NAVIGATE: skills matrix"
        />
      </div>
  </ScreenWrapper>
  );
}
