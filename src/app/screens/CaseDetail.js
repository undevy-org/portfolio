// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';
import { ArrowLeft, Zap } from 'lucide-react';

export default function CaseDetail() {
  const { sessionData, navigate, addLog, selectedCase, verifiedImages, isDemoMode } = useSession();

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
  const hiddenImages = caseDetails.hidden_images || [];

  // Helper to check if image should be shown
  const shouldShowImage = (tabId) => {
    // In demo mode, always show images (they will be templates)
    if (isDemoMode) return true;

    if (hiddenImages.includes(tabId)) return false;
    const url = `/images/projects/${selectedCase.id}_${tabId}.webp`;
    // If verification failed (false), don't show. 
    // If undefined (not checked yet) or true (verified), show it (optimistic).
    return verifiedImages[url] !== false;
  };

  // Helper to get image URL
  const getImageUrl = (tabId) => {
    if (isDemoMode) {
      return '/images/template.webp';
    }
    return `/images/projects/${selectedCase.id}_${tabId}.webp`;
  };

  const tabs = [
    {
      id: 'challenge',
      label: 'challenge',
      title: 'problem_statement',
      content: [
        { type: 'text', value: caseDetails.challenge || 'No challenge description available.' },
        ...(shouldShowImage('challenge') ? [{
          type: 'image',
          src: getImageUrl('challenge'),
          alt: 'Problem visualization',
          height: 300
        }] : [])
      ]
    },
    {
      id: 'approach',
      label: 'approach',
      title: 'methodology',
      content: [
        ...(caseDetails.approach?.map(item => ({
          type: 'list_item',
          value: item
        })) || []),
        ...(shouldShowImage('approach') ? [{
          type: 'image',
          src: getImageUrl('approach'),
          alt: 'Approach visualization',
          height: 300
        }] : [])
      ]
    },
    {
      id: 'solution',
      label: 'solution',
      title: 'implementation',
      content: [
        { type: 'text', value: caseDetails.solution || 'No solution description available.' },
        ...(shouldShowImage('solution') ? [{
          type: 'image',
          src: getImageUrl('solution'),
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
        ...(shouldShowImage('results') ? [{
          type: 'image',
          src: getImageUrl('results'),
          alt: 'Results visualization',
          height: 200
        }] : [])
      ]
    }
  ];

  return (
    <ScreenWrapper>
      {/* Main info panel */}
      <div className="p-4 rounded border border-secondary">
        <div className="space-y-2">
          <h2 className="text-xl text-command">{selectedCase.title}</h2>
          <p className="text-sm text-secondary">{selectedCase.desc}</p>
          <p className="text-sm pt-1 text-success">{selectedCase.metrics}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedCase.tags?.map((tag) => (
              <span
                key={tag}
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
    </ScreenWrapper>
  );
}