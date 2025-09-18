// src/app/screens/CaseDetail.js
'use client';

import { useSession } from '../context/SessionContext';
import { ArrowLeft, Zap } from 'lucide-react';
import { DetailViewTemplate } from '../components/templates';

export default function CaseDetail() {
  const { sessionData, navigate, addLog, selectedCase } = useSession();

  if (!selectedCase) {
    return (
      <div className="p-4 text-center text-secondary">
        <p>No case selected. Please go back to Case List.</p>
        <button
          onClick={() => navigate('CaseList')}
          className="mt-4 px-4 py-2 rounded border border-primary text-white-black"
        >
          Back to Cases
        </button>
      </div>
    );
  }

  const caseDetails = sessionData?.case_details?.[selectedCase.id] || {};
  const caseImages = caseDetails.images || {};

  // Prepare metadata for display
  const metadata = {};
  if (caseDetails.company) metadata.company = caseDetails.company;
  if (caseDetails.timeline) metadata.timeline = caseDetails.timeline;
  if (caseDetails.team_size) metadata.team_size = caseDetails.team_size;
  if (caseDetails.budget) metadata.budget = caseDetails.budget;

  // Prepare content sections
  const content = [
    {
      label: 'challenge',
      content: (
        <div>
          <p className="text-sm text-secondary mb-4">
            {caseDetails.challenge || 'No challenge description available.'}
          </p>
          {caseImages.challenge && (
            <div className="mt-4">
              {/* Placeholder for image integration */}
              <p className="text-xs text-secondary italic">Challenge visualization would appear here</p>
            </div>
          )}
        </div>
      )
    },
    {
      label: 'approach',
      content: caseDetails.approach?.length > 0 ? (
        <div className="space-y-2">
          {caseDetails.approach.map((item, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-secondary mr-2">•</span>
              <p className="text-sm text-secondary">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-secondary">No approach details available.</p>
      )
    },
    {
      label: 'solution',
      content: (
        <div>
          <p className="text-sm text-secondary mb-4">
            {caseDetails.solution || 'No solution description available.'}
          </p>
          {caseImages.solution && (
            <div className="mt-4">
              {/* Placeholder for image integration */}
              <p className="text-xs text-secondary italic">Solution visualization would appear here</p>
            </div>
          )}
        </div>
      )
    },
    {
      label: 'results',
      content: (
        <div className="space-y-4">
          {caseDetails.results?.length > 0 && (
            <div className="space-y-2">
              {caseDetails.results.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  <p className="text-sm text-secondary">{item}</p>
                </div>
              ))}
            </div>
          )}
          {caseDetails.learnings && (
            <div>
              <p className="text-xs text-command italic mb-2">Key Learnings</p>
              <p className="text-sm text-secondary">{caseDetails.learnings}</p>
            </div>
          )}
          {caseImages.results && (
            <div className="mt-4">
              {/* Placeholder for image integration */}
              <p className="text-xs text-secondary italic">Results visualization would appear here</p>
            </div>
          )}
        </div>
      )
    }
  ];

  const additionalButtons = [
    {
      screen: 'SkillsGrid',
      label: 'VIEW SKILLS',
      icon: Zap,
      logMessage: 'NAVIGATE: skills matrix'
    }
  ];

  return (
    <DetailViewTemplate
      entityType="case"
      title={selectedCase.title}
      subtitle={selectedCase.desc}
      metadata={Object.keys(metadata).length > 0 ? metadata : null}
      tags={selectedCase.tags}
      content={content}
      displayMode="tabs"
      onBack={() => {
        addLog('RETURN TO CASE LIST');
        navigate('CaseList');
      }}
      backLabel="BACK TO CASES"
      additionalButtons={additionalButtons}
    />
  );
}
