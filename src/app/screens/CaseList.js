// src/app/screens/CaseList.js
'use client';

import { useSession } from '../context/SessionContext';
import { ChevronRight } from 'lucide-react';
import TerminalProgress from '../components/ui/TerminalProgress'; // Import the progress component

export default function CaseList() {
  const { sessionData, theme, navigate, addLog, setSelectedCase } = useSession();

  const panelClasses = `p-3 border rounded ${
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

  const cases = sessionData?.case_studies || {};
  const caseIds = Object.keys(cases);
  const totalCasesCount = sessionData?.total_case_count || caseIds.length;

  // Calculate access level and progress percentage
  const accessPercentage = totalCasesCount > 0 
    ? Math.round((caseIds.length / totalCasesCount) * 100) 
    : 0;
  
  // Determine access level based on percentage
  const getAccessLevel = (percentage) => {
    if (percentage >= 90) return { level: 'Enterprise', next: null };
    if (percentage >= 70) return { level: 'Professional', next: 'Enterprise' };
    if (percentage >= 40) return { level: 'Standard', next: 'Professional' };
    return { level: 'Basic', next: 'Standard' };
  };
  
  const accessInfo = getAccessLevel(accessPercentage);
  
  // Calculate how many more cases needed for next level
  const getNextLevelRequirement = () => {
    if (accessInfo.next === null) return null;
    
    const thresholds = {
      'Standard': 40,
      'Professional': 70,
      'Enterprise': 90
    };
    
    const nextThreshold = thresholds[accessInfo.next];
    const casesNeededForNext = Math.ceil((nextThreshold / 100) * totalCasesCount) - caseIds.length;
    
    return Math.max(casesNeededForNext, 0);
  };
  
  const casesForNextLevel = getNextLevelRequirement();

  const handleCaseClick = (caseId, caseData) => {
    setSelectedCase({ id: caseId, ...caseData });
    addLog(`CASE SELECTED: ${caseData.title}`);
    navigate('CaseDetail');
  };

  return (
    <div className="p-4">
      {/* Replaced square visualization with level-based progress system */}
      <div className={`mb-4 ${panelClasses}`}>
        {/* Access level indicator with company name */}
        <div className={`mb-3 ${labelClasses}`}>
          <span className={`text-sm ${yellowClasses}`}>Access Level: </span>
          <span className={`text-sm ${successClasses}`}>{accessInfo.level}</span>
          <span className={`text-sm ml-2 ${valueClasses}`}>
            for {sessionData?.meta?.company || 'current session'}
          </span>
        </div>
        
        {/* Progress bar using TerminalProgress component */}
        <div className="mb-2">
          <TerminalProgress 
            progress={accessPercentage}
            isLoading={true}
            label={`${caseIds.length} of ${totalCasesCount} cases available`}
            showPercentage={true}
            animateProgress={true}
            height="h-3" // Slightly smaller height for compact view
          />
        </div>
        
        {/* Next level hint - only show if not at max level */}
        {accessInfo.next && casesForNextLevel > 0 && (
          <div className={`text-xs mt-2 ${valueClasses}`}>
            <span className="opacity-75">
              Unlock {casesForNextLevel} more {casesForNextLevel === 1 ? 'case ' : 'cases '} 
              to reach <span className={labelClasses}>{accessInfo.next}</span> level
            </span>
          </div>
        )}
        
        {/* Max level achievement message */}
        {!accessInfo.next && (
          <div className={`text-xs mt-2 ${successClasses}`}>
            <span>✓ Maximum access level achieved</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {caseIds.map((caseId) => {
          const caseData = cases[caseId];
          return (
            <button
              key={caseId}
              onClick={() => handleCaseClick(caseId, caseData)}
              className={`w-full p-4 border rounded text-left transition-colors flex items-start gap-4 ${
                theme === 'dark'
                  ? 'border-dark-border-darker hover:bg-dark-hover'
                  : 'border-light-border-lighter hover:bg-light-hover'
              }`}
            >
              <div className="flex-1 space-y-1">
                <div className={`text-lg ${yellowClasses}`}>
                {caseData.title}
              </div>
                <div className={`text-sm ${valueClasses}`}>
                {caseData.desc}
              </div>
                <div className={`text-sm pt-1 ${labelClasses}`}>
                {caseData.metrics}
              </div>
                <div className="flex flex-wrap gap-2 pt-2">
                {caseData.tags?.map((tag) => (
                  <span
                    key={tag}
                      className={`px-2 py-0.5 border rounded text-xs ${
                      theme === 'dark'
                          ? 'border-dark-border-darker bg-gray-900 text-dark-text-secondary'
                          : 'border-light-border-lighter bg-gray-50 text-light-text-secondary'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              </div>
              <ChevronRight className={`w-5 h-5 mt-1 ${valueClasses}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
